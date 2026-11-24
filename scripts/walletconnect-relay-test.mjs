/**
 * WalletConnect relay smoke test — run with:  node scripts/walletconnect-relay-test.mjs [projectId]
 *
 * Does what the wizard's "scan with phone" path does, without a browser: starts a WalletConnect
 * SignClient with the project id, opens the relay socket and asks for a pairing. Getting a
 * `wc:` URI back means the relay accepted the project id and the QR code can be drawn.
 *
 * Node sends no Origin header, so a plain run checks the project id and the relay, NOT the
 * Reown domain allow-list (that one only applies to browsers). To check the allow-list too:
 *   node scripts/walletconnect-relay-test.mjs --origin=https://blockchainacademy.online
 */
import { readFileSync } from 'node:fs';

const fromConfig = () => {
  const source = readFileSync(new URL('../src/app/components/first-tx/config.ts', import.meta.url), 'utf8');
  return source.match(/DEFAULT_WALLETCONNECT_PROJECT_ID = '([^']*)'/)?.[1] ?? '';
};

const args = process.argv.slice(2);
const origin = args.find((arg) => arg.startsWith('--origin='))?.slice('--origin='.length);
const projectId = args.find((arg) => !arg.startsWith('--')) ?? process.env.VITE_WALLETCONNECT_PROJECT_ID ?? fromConfig();
if (!projectId) {
  console.error('No WalletConnect project id (pass one as the first argument).');
  process.exit(2);
}

// --origin=https://site: open the relay socket the way a browser on that site would, with an
// Origin header, so the relay applies the project's domain allow-list to this run too.
if (origin) {
  const { default: NodeWebSocket } = await import('ws');
  globalThis.WebSocket = class extends NodeWebSocket {
    constructor(url, protocols) {
      super(url, protocols, { origin });
    }
  };
}
console.log(`test  project ${projectId}, origin ${origin ?? '(none, like a server)'}`);

const { SignClient } = await import('@walletconnect/sign-client');
const started = Date.now();
const elapsed = () => `${Date.now() - started} ms`;
const timeout = setTimeout(() => {
  console.error(`FAIL  no answer from the relay after ${elapsed()}`);
  process.exit(1);
}, 30_000);

try {
  const client = await SignClient.init({
    projectId,
    logger: process.env.WC_LOG ?? 'error',
    metadata: {
      name: 'Blockchain Academy',
      description: 'Your First Transaction — WalletConnect relay smoke test',
      url: 'https://blockchainacademy.online',
      icons: ['https://blockchainacademy.online/favicon.svg'],
    },
  });
  console.log(`init  ok (${elapsed()})  relay ${client.core.relayUrl}`);

  const { uri } = await client.connect({
    requiredNamespaces: {
      eip155: {
        chains: ['eip155:11155111'],
        methods: ['eth_sendTransaction'],
        events: ['chainChanged', 'accountsChanged'],
      },
    },
  });

  if (!uri) throw new Error('connect() returned no pairing URI');
  console.log(`PASS  relay connected, pairing URI received (${elapsed()})`);
  console.log(`      ${uri.slice(0, 60)}…`);
  clearTimeout(timeout);
  process.exit(0);
} catch (err) {
  console.error(`FAIL  ${err?.message ?? err} (${elapsed()})`);
  clearTimeout(timeout);
  process.exit(1);
}
