/**
 * Real, source-verified contracts the Smart Contracts course opens live on Etherscan.
 * Used by the AI slide in Section 6 and the "Explore a real contract" slide in Section 8.
 */

// ── Ethereum mainnet: contracts that hold real money ─────────────────────────
// Each was checked on 2026-11-23: source code verified on Etherscan. Re-check before reuse;
// if one ever loses its verified source, replace it here and in the section-6.json and
// section-8.json locale files.
//   USDC · the address everyone uses is FiatTokenProxy, which holds no token logic: it
//          forwards every call to an implementation contract (FiatTokenV2_2). So "Code"
//          opens the IMPLEMENTATION, and "Read as Proxy" opens the main (proxy) address.
//          The implementation address was read from the proxy's implementation slot on
//          mainnet on 2026-11-23; if Circle upgrades USDC, update USDC_IMPLEMENTATION.
//   WETH · WETH9 (solc 0.4.19): the contract itself is 60 lines, with no owner or admin.
//   DAI  · Dai (solc 0.5.12): one file; mint() is guarded by `auth` (the wards mapping).
// WETH and DAI are not proxies, so their Code tab is all a student needs.
// The slides print a shortened address; the links (and the hover title) carry the full one.
export const ETHERSCAN_ADDRESS = 'https://etherscan.io/address/';
const USDC_PROXY = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const USDC_IMPLEMENTATION = '0x43506849D7C04F9138D1A2050bbF3A0c054402dd';
// `address` is the one printed on the slide; each link names the address and the Etherscan tab it opens.
export const REAL_CONTRACTS: {
  id: 'usdc' | 'weth' | 'dai'; name: string; address: string;
  links: { label: 'code' | 'readProxy'; address: string; tab: string }[];
}[] = [
  {
    id: 'usdc', name: 'USDC', address: USDC_PROXY,
    links: [
      { label: 'code',      address: USDC_IMPLEMENTATION, tab: 'code' },
      { label: 'readProxy', address: USDC_PROXY,          tab: 'readProxyContract' },
    ],
  },
  {
    id: 'weth', name: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    links: [{ label: 'code', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', tab: 'code' }],
  },
  {
    id: 'dai', name: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    links: [{ label: 'code', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', tab: 'code' }],
  },
];

export const shortAddress = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

// ── Ethereum Sepolia: a practice contract anyone can write to ────────────────
// A third-party "Greeter" (not deployed by this course, and not ours to control).
// Checked on 2026-11-23:
//   · sepolia.etherscan.io shows "Source Code Verified · Exact Match", with Read and Write tabs
//   · the whole source is under 30 lines: two state variables, one event, and
//     setGreeting(string), which has no access control, so any address can call it
//   · live reads over a public RPC: greeting() returned a string, counter() returned 58
// Anyone can overwrite the greeting with any text, so the slide tells students to write
// nothing personal. Re-check before each course run; if it loses its verified source or
// fills up with abuse, swap the address here (the snippet below must match the new source).
export const PRACTICE_CONTRACT = {
  name: 'Greeter',
  address: '0xCDF7Dcb129691257363524E90dC80CeA10A27dC0',
} as const;

// The heart of the Greeter, copied line for line from its verified source.
// part: 0 = state · 1 = a function anyone can call · 2 = the event it emits
export const PRACTICE_CODE_LINES: { text: string; part?: 0 | 1 | 2 }[] = [
  { text: 'string public greeting;', part: 0 },
  { text: 'uint256 public counter;', part: 0 },
  { text: '' },
  { text: 'function setGreeting(string memory _greeting) public {', part: 1 },
  { text: '    greeting = _greeting;' },
  { text: '    counter++;' },
  { text: '    emit GreetingChanged(msg.sender, _greeting);', part: 2 },
  { text: '}' },
];
