#!/usr/bin/env node
/**
 * Compile and deploy contracts/ClassRegistry.sol to Ethereum Sepolia (testnet, chainId 11155111).
 *
 *   npm run contract:compile    compile only + refresh the ABI the wizard imports (no network, no key)
 *   npm run contract:address    print the deployer address and its Sepolia balance (so you can fund it)
 *   npm run contract:deploy     deploy, wait for the receipt, print the contract address
 *
 * Deployer key (NEVER commit it, NEVER paste it in a chat or a ticket) is read from, in order:
 *   1. env DEPLOYER_PRIVATE_KEY
 *   2. the file named by env WIZARD_DEPLOYER_KEY_FILE
 *   3. ../wizard-deployer.key  (one folder ABOVE the repo, so it cannot be committed by accident)
 *
 * RPC: env SEPOLIA_RPC_URL, otherwise the public endpoints in src/app/components/first-tx/config.ts.
 *
 * Needs Node >= 22.18 (it imports the wizard's config.ts directly, using Node's built-in type stripping).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_FILE = path.join(ROOT, 'contracts', 'ClassRegistry.sol');
const ABI_FILE = path.join(ROOT, 'src', 'app', 'components', 'first-tx', 'ClassRegistry.abi.json');
const CONFIG_FILE = path.join(ROOT, 'src', 'app', 'components', 'first-tx', 'config.ts');
const DEFAULT_KEY_FILE = path.resolve(ROOT, '..', 'wizard-deployer.key');

/** Compile ClassRegistry.sol with solc-js. Returns { abi, bytecode }. */
export function compile() {
  const solc = createRequire(import.meta.url)('solc');
  const input = {
    language: 'Solidity',
    sources: { 'ClassRegistry.sol': { content: readFileSync(SOURCE_FILE, 'utf8') } },
    settings: {
      optimizer: { enabled: true, runs: 200 },
      // "paris" avoids newer opcodes, so the same bytecode runs on any EVM testnet.
      evmVersion: 'paris',
      outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object'] } },
    },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const problems = output.errors ?? [];
  for (const p of problems) console.error(p.formattedMessage);
  if (problems.some((p) => p.severity === 'error')) throw new Error('Solidity compilation failed.');
  const contract = output.contracts['ClassRegistry.sol'].ClassRegistry;
  return { abi: contract.abi, bytecode: `0x${contract.evm.bytecode.object}`, compiler: solc.version() };
}

/** Load the chain settings from the wizard's single config file. */
async function loadChain() {
  const { defineChain } = await import('viem');
  let CHAIN;
  try {
    ({ CHAIN } = await import(pathToFileURL(CONFIG_FILE).href));
  } catch (err) {
    throw new Error(`Could not import ${path.relative(ROOT, CONFIG_FILE)} (Node >= 22.18 is required, you have ${process.version}).\n${err.message}`);
  }
  const rpcUrls = process.env.SEPOLIA_RPC_URL ? [process.env.SEPOLIA_RPC_URL] : [...CHAIN.rpcUrls];
  const chain = defineChain({
    id: CHAIN.id,
    name: CHAIN.name,
    nativeCurrency: CHAIN.nativeCurrency,
    rpcUrls: { default: { http: rpcUrls } },
    blockExplorers: { default: { name: CHAIN.explorerName, url: CHAIN.explorerUrl } },
    testnet: true,
  });
  return { chain, rpcUrls, explorerUrl: CHAIN.explorerUrl };
}

/** Read the deployer key without ever echoing it. */
async function loadAccount() {
  const { privateKeyToAccount } = await import('viem/accounts');
  let raw = process.env.DEPLOYER_PRIVATE_KEY;
  let source = 'env DEPLOYER_PRIVATE_KEY';
  if (!raw) {
    const file = process.env.WIZARD_DEPLOYER_KEY_FILE ?? DEFAULT_KEY_FILE;
    if (!existsSync(file)) {
      throw new Error(`No deployer key. Set DEPLOYER_PRIVATE_KEY, or put the key in ${file} (outside the repo).`);
    }
    raw = readFileSync(file, 'utf8');
    source = file;
  }
  const key = raw.trim();
  if (!/^0x[0-9a-fA-F]{64}$/.test(key)) throw new Error(`The deployer key from ${source} is not a 0x-prefixed 32-byte hex string.`);
  return { account: privateKeyToAccount(key), source };
}

async function connect() {
  const { createPublicClient, fallback, http } = await import('viem');
  const { chain, rpcUrls, explorerUrl } = await loadChain();
  const transport = fallback(rpcUrls.map((url) => http(url)));
  const publicClient = createPublicClient({ chain, transport });
  const remoteId = await publicClient.getChainId();
  if (remoteId !== chain.id) throw new Error(`RPC answered chainId ${remoteId}, expected ${chain.id} (${chain.name}). Refusing to continue.`);
  return { chain, transport, publicClient, explorerUrl };
}

/** Deploy the compiled contract and wait until it is mined. Returns { address, hash, blockNumber }. */
export async function deploy({ walletClient, publicClient, abi, bytecode }) {
  const hash = await walletClient.deployContract({ abi, bytecode });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  if (receipt.status !== 'success' || !receipt.contractAddress) throw new Error(`Deployment transaction ${hash} failed.`);
  return { address: receipt.contractAddress, hash, blockNumber: receipt.blockNumber, gasUsed: receipt.gasUsed };
}

async function main() {
  const mode = process.argv[2] ?? 'deploy';
  const { formatEther } = await import('viem');

  if (mode === 'compile') {
    const { abi, bytecode, compiler } = compile();
    writeFileSync(ABI_FILE, `${JSON.stringify(abi, null, 2)}\n`);
    console.log(`Compiled ClassRegistry with solc ${compiler}`);
    console.log(`  bytecode: ${(bytecode.length - 2) / 2} bytes`);
    console.log(`  ABI:      ${abi.filter((x) => x.type === 'function').map((x) => x.name).join(', ')}`);
    console.log(`  wrote     ${path.relative(ROOT, ABI_FILE)}`);
    return;
  }

  if (mode === 'address') {
    const { account } = await loadAccount();
    const { chain, publicClient, explorerUrl } = await connect();
    const balance = await publicClient.getBalance({ address: account.address });
    console.log(`Deployer address: ${account.address}`);
    console.log(`Balance on ${chain.name}: ${formatEther(balance)} ETH`);
    console.log(`${explorerUrl}/address/${account.address}`);
    return;
  }

  if (mode !== 'deploy') throw new Error(`Unknown mode "${mode}". Use: compile | address | deploy`);

  const { createWalletClient, encodeDeployData } = await import('viem');
  const { abi, bytecode, compiler } = compile();
  const { account } = await loadAccount();
  const { chain, transport, publicClient, explorerUrl } = await connect();
  const walletClient = createWalletClient({ account, chain, transport });

  const [balance, gas, fees] = await Promise.all([
    publicClient.getBalance({ address: account.address }),
    publicClient.estimateGas({ account: account.address, data: encodeDeployData({ abi, bytecode }) }),
    publicClient.estimateFeesPerGas(),
  ]);
  const worstCase = gas * (fees.maxFeePerGas ?? fees.gasPrice ?? 0n);
  console.log(`Network:   ${chain.name} (chainId ${chain.id})`);
  console.log(`Compiler:  solc ${compiler}`);
  console.log(`Deployer:  ${account.address}`);
  console.log(`Balance:   ${formatEther(balance)} ETH   (deploy needs up to ~${formatEther(worstCase)} ETH)`);
  if (balance < worstCase) {
    throw new Error(`Not enough test ETH. Fund ${account.address} from a Sepolia faucet (e.g. https://sepolia-faucet.pk910.de), then run this again.`);
  }

  console.log('Deploying… (waiting for the transaction to be mined)');
  const result = await deploy({ walletClient, publicClient, abi, bytecode });
  console.log('');
  console.log(`ClassRegistry deployed at ${result.address}`);
  console.log(`  block ${result.blockNumber}, gas used ${result.gasUsed}`);
  console.log(`  ${explorerUrl}/tx/${result.hash}`);
  console.log(`  ${explorerUrl}/address/${result.address}`);
  console.log('');
  console.log('Next: paste that address into DEPLOYED_CONTRACT_ADDRESS in');
  console.log(`  ${path.relative(ROOT, CONFIG_FILE)}   (look for "TODO: set after deploy")`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(`\n✖ ${err.message}`);
    process.exit(1);
  });
}
