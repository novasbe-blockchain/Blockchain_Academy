/**
 * "Your First Transaction" wizard — THE one place for network + contract settings.
 *
 * Read by the wizard UI (through Vite) and by scripts/deploy-class-registry.mjs
 * (through Node), so keep this file free of imports and of non-erasable TypeScript.
 *
 * Every setting can be overridden at build time with a VITE_* variable, e.g.
 *   VITE_CLASS_REGISTRY_ADDRESS=0x… npm run build
 */

const ENV: Record<string, string | undefined> = (import.meta as any).env ?? {};

/**
 * Public, key-less RPC endpoints, tried in order. Checked 2026-11: both answer
 * eth_chainId = 0xaa36a7 and allow browser CORS. A whole class shares their rate
 * limits, so build with VITE_SEPOLIA_RPC_URL=https://… to put a dedicated endpoint first.
 */
const PUBLIC_RPC_URLS = [
  'https://ethereum-sepolia-rpc.publicnode.com',
  'https://sepolia.gateway.tenderly.co',
];

/** The network the wizard talks to. Ethereum Sepolia is a TESTNET: its ETH has no value. */
export const CHAIN = {
  id: 11155111,
  name: 'Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ENV.VITE_SEPOLIA_RPC_URL ? [ENV.VITE_SEPOLIA_RPC_URL, ...PUBLIC_RPC_URLS] : PUBLIC_RPC_URLS,
  explorerName: 'Etherscan',
  explorerUrl: 'https://sepolia.etherscan.io',
} as const;

/**
 * Address of the deployed ClassRegistry contract (contracts/ClassRegistry.sol).
 * While it is empty the wizard still renders, but the "Send" step stays locked.
 */
// TODO: set after deploy — paste the address printed by `npm run contract:deploy`.
const DEPLOYED_CONTRACT_ADDRESS = '0xc5d9e9baa2bb206d0cc40aa1d02c58a0931d0327';

export const CONTRACT_ADDRESS: string = (ENV.VITE_CLASS_REGISTRY_ADDRESS ?? DEPLOYED_CONTRACT_ADDRESS).trim();

/** True once a plausible contract address has been filled in. */
export const CONTRACT_READY = /^0x[0-9a-fA-F]{40}$/.test(CONTRACT_ADDRESS);

/**
 * Build-time flag, DEFAULT TRUE: hash the student number in the browser (keccak256)
 * and send only the hash. Set VITE_HASH_IDENTIFIER=false to send the raw text instead
 * (do that only for identifiers that are not personal data: whatever is sent is public forever).
 */
export const HASH_IDENTIFIER: boolean = ENV.VITE_HASH_IDENTIFIER !== 'false';

/**
 * WalletConnect (Reown) project id — needed for the QR-code / mobile-wallet connection.
 * It is a public identifier, not a secret. Create one for free at https://cloud.reown.com
 * and add the site's domain to its allow-list. While empty, only browser-extension
 * (injected) wallets and wallet in-app browsers can connect.
 */
// TODO: set a WalletConnect project id (or build with VITE_WALLETCONNECT_PROJECT_ID).
const DEFAULT_WALLETCONNECT_PROJECT_ID = 'cee4447d3f9a73c710644ec093d843c0';

export const WALLETCONNECT_PROJECT_ID: string = (ENV.VITE_WALLETCONNECT_PROJECT_ID ?? DEFAULT_WALLETCONNECT_PROJECT_ID).trim();

/**
 * How the site introduces itself to a wallet during a WalletConnect pairing: the name,
 * address and icon on the wallet's "connect to this site?" screen. `url` must be the address
 * the site is really served from, because wallets compare the two and warn about a mismatch
 * (build with VITE_APP_URL=https://… when deploying somewhere else). `icon` is a PNG served
 * by the site itself (public/app-icon.png), since not every wallet draws SVG icons.
 */
const DEFAULT_APP_URL = 'https://blockchainacademy.online';
const APP_URL = (ENV.VITE_APP_URL ?? DEFAULT_APP_URL).trim().replace(/\/+$/, '');

export const APP_METADATA = {
  name: 'Blockchain Academy',
  description: 'Your First Transaction: register on the class contract on the Sepolia testnet.',
  url: APP_URL,
  icon: `${APP_URL}/app-icon.png`,
} as const;

/** The contract refuses identifiers longer than this (see `register` in ClassRegistry.sol). */
export const MAX_ID_LENGTH = 100;

/** Outside links used by the wizard steps. `highlight` marks the option we lead with. */
export const WALLET_LINKS = [
  { id: 'rabby', name: 'Rabby', url: 'https://rabby.io', highlight: true },
  { id: 'zerion', name: 'Zerion', url: 'https://zerion.io', highlight: true },
  { id: 'metamask', name: 'MetaMask', url: 'https://metamask.io', highlight: false },
] as const;

export const FAUCET_LINKS = [
  { id: 'pk910', name: 'pk910 PoW Faucet', url: 'https://sepolia-faucet.pk910.de', highlight: true },
  { id: 'google', name: 'Google Cloud Web3 Faucet', url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia', highlight: false },
  { id: 'alchemy', name: 'Alchemy Sepolia Faucet', url: 'https://www.alchemy.com/faucets/ethereum-sepolia', highlight: false },
] as const;

export const explorerTxUrl = (hash: string) => `${CHAIN.explorerUrl}/tx/${hash}`;
export const explorerAddressUrl = (address: string) => `${CHAIN.explorerUrl}/address/${address}`;
