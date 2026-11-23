/**
 * Read-only access to the ClassRegistry contract, plus the hashing shared by the wizard's
 * "Send" step and the board's student-number lookup.
 *
 * Imports viem only (no wallet libraries) and is reached only through dynamic imports
 * (FirstTxWeb3.tsx and RegistryBoard.tsx), so none of it lands in the main bundle.
 */
import { createPublicClient, defineChain, fallback, http, keccak256, stringToBytes, type Address } from 'viem';
import classRegistryAbi from './ClassRegistry.abi.json';
import { CHAIN, CONTRACT_ADDRESS, CONTRACT_READY, HASH_IDENTIFIER } from './config';

export const abi = classRegistryAbi;

export const chain = defineChain({
  id: CHAIN.id,
  name: CHAIN.name,
  nativeCurrency: CHAIN.nativeCurrency,
  rpcUrls: { default: { http: [...CHAIN.rpcUrls] } },
  blockExplorers: { default: { name: CHAIN.explorerName, url: CHAIN.explorerUrl } },
  testnet: true,
});

/** What `register` receives: the keccak256 hash of the trimmed text (default), or the text itself. */
export function toPayload(raw: string): string {
  const text = raw.trim();
  if (!text) return '';
  return HASH_IDENTIFIER ? keccak256(stringToBytes(text)) : text;
}

/** One line of the class list, as stored on-chain. */
export interface RegistryEntry {
  /** Position on the list, 0 = first wallet to register. */
  index: number;
  /** The wallet that signed the registration. */
  who: string;
  /** The identifier it holds now (the hash, by default). */
  id: string;
  /** How many times that wallet called `register` (2+ means it replaced its identifier). */
  times: number;
}

// A plain public client: reading needs no wallet, no signature and no gas.
const publicClient = createPublicClient({ chain, transport: fallback(CHAIN.rpcUrls.map((url) => http(url))) });

/** Read the whole class list with ONE call to the contract's `allEntries()`. */
export async function readEntries(): Promise<RegistryEntry[]> {
  if (!CONTRACT_READY) return [];
  const [who, ids, times] = (await publicClient.readContract({
    address: CONTRACT_ADDRESS as Address,
    abi,
    functionName: 'allEntries',
  })) as [readonly string[], readonly string[], readonly bigint[]];
  return who.map((address, index) => ({ index, who: address, id: ids[index], times: Number(times[index]) }));
}
