import { useState } from 'react';
import { TitleSlide } from '../components/templates/TitleSlide';
import { ConceptSlide } from '../components/templates/ConceptSlide';
import { ComparisonSlide } from '../components/templates/ComparisonSlide';
import { DiscussionSlide } from '../components/templates/DiscussionSlide';
import { TakeawaySlide } from '../components/templates/TakeawaySlide';
import { QuizSlide } from '../components/templates/QuizSlide';
import { CalloutBox } from '../components/shared/CalloutBox';
import { Rocket, ExternalLink } from 'lucide-react';
import { SectionNav } from '../components/navigation/SectionNav';
import { TeamCheckpoint } from '../components/TeamCheckpoint';
import ethereumLogo from '../../ethereum-eth-logo.svg';
import vitalikPhoto from '../../vitalik-buterin.jpg';
import amazonLogo from '../../amazon.png';
import msnLogo from '../../msn.png';
import netscapeLogo from '../../netscape.png';
import tiktokLogo from '../../tiktok.jpg';
import youtubeLogo from '../../youtube.png';
import xLogo from '../../x-logo.jpg';
import bitcoinLogo from '../../bitcoin-btc-logo.svg';
import uniswapLogo from '../../uniswap-uni-logo.svg';
import usdcLogo from '../../usd-coin-usdc-logo.svg';

const section3Chapters = [
  { kind: 'group' as const, id: 'g-s3-eth',     label: '🦄 Ethereum' },
  { id: 's3-ethereum',  label: 'Ethereum' },
  { id: 's3-eth-accounts', label: 'Accounts & Gas' },
  { id: 's3-eth-apps',     label: 'DeFi · NFTs · DAOs' },

  { kind: 'group' as const, id: 'g-s3-world',   label: '🌍 Real World' },
  { id: 's3-usecases', label: 'Use Cases' },
  { id: 's3-ecosystem', label: 'Web3 Ecosystem' },

  { kind: 'group' as const, id: 'g-s3-evol',    label: '📜 Web Evolution' },
  { id: 's3-web3', label: 'Web1 → Web3' },
  { id: 's3-dapp', label: 'App vs dApp' },

  { kind: 'group' as const, id: 'g-s3-reflect', label: '⚖️ Reflection' },
  { id: 's3-ethics', label: 'Ethics' },
  { id: 's3-future', label: 'Future Trends' },
  { id: 's3-discussion', label: 'Discussion' },

  { kind: 'group' as const, id: 'g-s3-wrap',    label: '✅ Wrap Up' },
  { id: 's3-quiz', label: 'Quizzes' },
  { id: 's3-takeaways', label: 'Takeaways' },
  { id: 's3-recap', label: '🧱 Knowledge Wall' },
  { id: 's3-team-checkpoint', label: '🤝 Team Checkpoint' },
];

// ─── Knowledge Wall — recap of all Course 1 vocabulary ──────────────────────

interface Brick { term: string; defn: string; section: 1 | 2 | 3 }
interface ThemeGroup { theme: string; color: string; bricks: Brick[] }

const KNOWLEDGE_WALL: ThemeGroup[] = [
  {
    theme: 'Foundations', color: '#ED1C24',
    bricks: [
      { term: 'DLT',                 section: 1, defn: 'Distributed Ledger Technology — a database replicated across many independent computers, with no central authority.' },
      { term: 'Hash',                section: 1, defn: 'A one-way function that turns any input into a fixed-size fingerprint. You can\'t reverse it; tiny input changes flip the output completely.' },
      { term: 'SHA-256',             section: 1, defn: 'The specific hash function Bitcoin uses. Always produces 64 hex characters.' },
      { term: 'Avalanche effect',    section: 1, defn: 'Changing one bit of input completely changes the hash output. The "spread" property that makes hashing useful.' },
      { term: 'Immutability',        section: 2, defn: 'Once written into the chain, a record can\'t be silently altered without leaving evidence everywhere downstream.' },
      { term: 'Tamper-evidence',     section: 2, defn: 'Stronger than "tamper-proof": any change breaks visible cryptographic links, so the tampering can\'t hide.' },
      { term: 'Trust-minimization',  section: 1, defn: 'Replacing trust in people or institutions with trust in math, code, and incentives.' },
    ],
  },
  {
    theme: 'Structure', color: '#f59e0b',
    bricks: [
      { term: 'Block',           section: 1, defn: 'A container of transactions with a header that cryptographically links to the previous block.' },
      { term: 'Chain',           section: 1, defn: 'The sequence of blocks, each tied to its predecessor through a hash pointer.' },
      { term: 'Genesis block',   section: 1, defn: 'The very first block. Has no predecessor — its prev-hash field is conventionally all zeros.' },
      { term: 'Block header',    section: 2, defn: 'A block\'s metadata: version, prev hash, merkle root, timestamp, bits (difficulty), and nonce.' },
      { term: 'Merkle tree',     section: 2, defn: 'A binary tree of hashes. Pairs are hashed together repeatedly until one root remains.' },
      { term: 'Merkle root',     section: 2, defn: 'A single hash that summarises every transaction in a block. Change any tx → root changes.' },
      { term: 'Nonce',           section: 2, defn: 'A number a miner cycles through until the block\'s hash meets the difficulty target.' },
      { term: 'Difficulty / Bits', section: 2, defn: 'How many leading zeros the hash must have. Adjusts every 2,016 blocks to keep ~10 min block time.' },
      { term: 'Timestamp',       section: 2, defn: 'Approximate time the miner stamped the block. Lives inside the header.' },
    ],
  },
  {
    theme: 'Identity & Custody', color: '#39B54A',
    bricks: [
      { term: 'Wallet',       section: 2, defn: 'Software that holds your keys. It does NOT hold coins — coins live on-chain. The keys prove the coins are yours.' },
      { term: 'Private key',  section: 2, defn: 'The one secret that authorises spending. Like a PIN, like a house key. Lose it = lose the funds.' },
      { term: 'Public key',   section: 2, defn: 'Derived from the private key one-way. Used by others to verify your signatures. Safe to share.' },
      { term: 'Address',      section: 2, defn: 'A short hash of the public key. Like an IBAN or a mailbox slot — anyone can send to it.' },
      { term: 'Seed phrase',  section: 2, defn: '12 or 24 ordinary English words encoding the master secret. Regenerates the entire wallet on any device.' },
      { term: 'Signature',    section: 2, defn: 'Cryptographic proof a message was approved by the holder of a specific private key, without revealing the key.' },
    ],
  },
  {
    theme: 'Network & Consensus', color: '#6366f1',
    bricks: [
      { term: 'Node',           section: 1, defn: 'A computer running the blockchain software, storing the chain and validating new transactions/blocks.' },
      { term: 'P2P',            section: 1, defn: 'Peer-to-peer. No central server — every node talks directly to other nodes.' },
      { term: 'Consensus',      section: 1, defn: 'How thousands of independent nodes agree on the same state of the chain.' },
      { term: 'Proof of Work',  section: 2, defn: 'Miners spend electricity guessing nonces. Whoever finds a valid hash first wins the right to add a block.' },
      { term: 'Proof of Stake', section: 3, defn: 'Validators stake tokens as collateral. Misbehave and the stake is slashed. Ethereum switched to PoS in 2022.' },
      { term: 'Mining',         section: 2, defn: 'Running computers to solve PoW puzzles in exchange for newly minted coins + transaction fees.' },
      { term: '51% attack',     section: 1, defn: 'If one entity controls majority hash power, they can rewrite recent history. The reason chains want many nodes.' },
      { term: 'Byzantine Generals', section: 2, defn: 'The classic problem: how to reach agreement across a network where some participants may lie or fail.' },
      { term: 'Fork',           section: 2, defn: 'A split in the chain. Soft fork = backward-compatible; hard fork = creates two incompatible chains.' },
      { term: 'Double-spend',   section: 2, defn: 'Trying to send the same coin twice. Consensus + the longest-chain rule prevents it.' },
    ],
  },
  {
    theme: 'Bitcoin', color: '#f7931a',
    bricks: [
      { term: 'Satoshi Nakamoto', section: 2, defn: 'The pseudonymous creator of Bitcoin. Published the whitepaper Oct 2008, mined the genesis block Jan 2009, vanished 2010.' },
      { term: 'Whitepaper',       section: 2, defn: 'Bitcoin\'s 9-page founding document. Surprisingly readable. Linked in the Bibliography.' },
      { term: '21M cap',          section: 2, defn: 'The absolute maximum number of bitcoins that will ever exist. Hard-coded by every full node.' },
      { term: 'Halving',          section: 2, defn: 'Every ~4 years the block reward halves. Schedules supply decay; last halving expected around 2140.' },
      { term: 'UTXO',             section: 2, defn: 'Unspent Transaction Output. Bitcoin tracks "unspent coin chunks", not account balances.' },
      { term: 'Bitcoin Script',   section: 2, defn: 'Bitcoin\'s intentionally limited scripting language. Not Turing-complete — no loops, no persistent state.' },
      { term: 'Lightning Network',section: 2, defn: 'A Layer-2 network on top of Bitcoin for fast, cheap micropayments. Settles back to L1 periodically.' },
      { term: 'SPV',              section: 2, defn: 'Simplified Payment Verification. Light clients use Merkle proofs to verify a tx is in a block without storing the chain.' },
    ],
  },
  {
    theme: 'Ethereum', color: '#627EEA',
    bricks: [
      { term: 'Ethereum',       section: 3, defn: 'The first programmable blockchain. Launched 2015 by Vitalik Buterin. Where smart contracts became practical.' },
      { term: 'EVM',            section: 3, defn: 'Ethereum Virtual Machine. The global computer that executes smart contracts identically on every node.' },
      { term: 'Smart contract', section: 3, defn: 'Code stored on a blockchain that runs deterministically when called. The data IS the code IS the rules.' },
      { term: 'Gas',            section: 3, defn: 'The unit measuring computational work on the EVM. Every operation costs gas; you pay for what you use.' },
      { term: 'Gwei',           section: 3, defn: '1 gwei = 0.000 000 001 ETH. The unit gas prices are quoted in.' },
      { term: 'EOA',            section: 3, defn: 'Externally Owned Account. An account controlled by a private key — your MetaMask wallet is one.' },
      { term: 'Contract Account', section: 3, defn: 'An account controlled by code, not a key. Holds a smart contract\'s state. Can\'t initiate transactions on its own.' },
      { term: 'EIP-1559',       section: 3, defn: 'The 2021 fee market upgrade. Base fee is burned, optional priority tip goes to the validator.' },
      { term: 'The Merge',      section: 3, defn: 'Sept 2022 — Ethereum switched from PoW to PoS. Cut its energy use by 99.95%.' },
    ],
  },
  {
    theme: 'Web3 Ecosystem', color: '#8b5cf6',
    bricks: [
      { term: 'dApp',          section: 3, defn: 'Decentralised application — a frontend talking to smart contracts on-chain instead of a company server.' },
      { term: 'DeFi',          section: 3, defn: 'Decentralised Finance. Lending, trading, derivatives running entirely in smart contracts.' },
      { term: 'NFT',           section: 3, defn: 'Non-Fungible Token. A unique on-chain asset (ERC-721) with a permanent ownership history.' },
      { term: 'DAO',           section: 3, defn: 'Decentralised Autonomous Organisation. Governance by smart contract + token votes instead of a board.' },
      { term: 'ERC-20',        section: 3, defn: 'The Ethereum standard for fungible tokens (every USDC, every DAI, every LINK).' },
      { term: 'ERC-721',       section: 3, defn: 'The Ethereum standard for non-fungible tokens (NFTs).' },
      { term: 'Stablecoin',    section: 3, defn: 'A token pegged to a stable asset, usually the US dollar. USDC, USDT, DAI.' },
      { term: 'Oracle',        section: 3, defn: 'A service that brings off-chain data on-chain (prices, sports scores, weather). Chainlink is the leading provider.' },
      { term: 'IPFS',          section: 3, defn: 'InterPlanetary File System. Content-addressed decentralised storage often used to host NFT metadata.' },
    ],
  },
  {
    theme: 'Future Trends', color: '#22d3ee',
    bricks: [
      { term: 'Layer 1',          section: 3, defn: 'A base-layer blockchain (Bitcoin, Ethereum, Solana). Where consensus + final settlement happens.' },
      { term: 'Layer 2',          section: 3, defn: 'A network built on top of an L1 to scale throughput while inheriting its security. Arbitrum, Optimism, Base.' },
      { term: 'Rollup',           section: 3, defn: 'An L2 that batches transactions off-chain and posts a compressed proof back to L1.' },
      { term: 'ZK proof',         section: 3, defn: 'Zero-Knowledge Proof. Prove a statement is true without revealing the underlying data.' },
      { term: 'Account Abstraction', section: 3, defn: 'Wallets that behave like smart contracts: social recovery, gasless txs, session keys. UX upgrade.' },
      { term: 'RWA',              section: 3, defn: 'Real-World Assets. Tokenising real estate, bonds, commodities on-chain. BlackRock, Franklin Templeton are early.' },
      { term: 'CBDC',             section: 3, defn: 'Central Bank Digital Currency. State-issued digital money — programmable, traceable, sometimes restrictable.' },
      { term: 'DID',              section: 3, defn: 'Decentralised Identity. User-controlled digital identity, no central registry to revoke you.' },
    ],
  },
];

function sectionColor(s: 1 | 2 | 3): string {
  return s === 1 ? '#ED1C24' : s === 2 ? '#f59e0b' : '#39B54A';
}

function KnowledgeWall() {
  const [selected, setSelected] = useState<Brick | null>(KNOWLEDGE_WALL[0].bricks[0]);

  const totalBricks = KNOWLEDGE_WALL.reduce((n, g) => n + g.bricks.length, 0);

  return (
    <div className="h-full flex flex-col p-5 lg:p-8">
      {/* Header */}
      <div className="shrink-0 mb-3 flex items-start justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#39B54A]/15 border border-[#39B54A]/40 text-[#39B54A] text-xs font-bold">🧱 Recap</span>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Knowledge Wall</h2>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Every term you've met across Sections 1, 2, and 3 — in one place. Hover any brick to recall its meaning. <span className="text-foreground font-semibold">{totalBricks} bricks total.</span>
          </p>
        </div>
        {/* Legend */}
        <div className="shrink-0 flex flex-col gap-1 text-[10px]">
          <div className="font-bold uppercase tracking-widest text-muted-foreground mb-0.5">First met in</div>
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: sectionColor(s as 1|2|3) }}></span>
              <span>§{s} — {s === 1 ? 'Intro' : s === 2 ? 'Bitcoin' : "What's Next"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Definition tray */}
      <div
        className="shrink-0 mb-3 p-4 bg-card border-2 rounded-xl transition-colors min-h-[88px]"
        style={{ borderColor: selected ? sectionColor(selected.section) + 'AA' : 'var(--border)' }}
      >
        {selected ? (
          <>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg lg:text-xl font-black" style={{ color: sectionColor(selected.section) }}>
                {selected.term}
              </span>
              <span
                className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded"
                style={{ color: sectionColor(selected.section), backgroundColor: sectionColor(selected.section) + '20' }}
              >
                §{selected.section}
              </span>
            </div>
            <p className="text-sm text-foreground leading-snug">{selected.defn}</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground italic">Hover or tap a brick below to read its definition.</p>
        )}
      </div>

      {/* Themed brick groups */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-3">
        {KNOWLEDGE_WALL.map(group => (
          <div key={group.theme}>
            <div className="flex items-baseline gap-2 mb-1.5 sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-10">
              <span className="size-2 rounded-full shrink-0" style={{ background: group.color }}></span>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: group.color }}>
                {group.theme}
              </span>
              <span className="text-[10px] text-muted-foreground">· {group.bricks.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.bricks.map(b => {
                const isSelected = selected?.term === b.term;
                return (
                  <button
                    key={b.term}
                    type="button"
                    onClick={() => setSelected(b)}
                    onMouseEnter={() => setSelected(b)}
                    onFocus={() => setSelected(b)}
                    className="relative px-2.5 py-1 rounded-md text-xs font-mono font-bold border transition-all hover:-translate-y-0.5"
                    style={{
                      color: isSelected ? '#fff' : group.color,
                      backgroundColor: isSelected ? group.color : group.color + '12',
                      borderColor: isSelected ? group.color : group.color + '45',
                      boxShadow: isSelected ? `0 2px 8px ${group.color}55` : undefined,
                    }}
                  >
                    {b.term}
                    {/* tiny source-section dot */}
                    <span
                      className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full ring-1 ring-background"
                      style={{ background: sectionColor(b.section) }}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Section3() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={section3Chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 03"
            title="What's Next for Blockchain?"
            subtitle="Applications, ecosystem, evolution of the web, and the future of decentralized technology"
            icon={<Rocket className="size-20 text-[#39B54A]" />}
            gradient="from-[#39B54A] to-[#22d3ee]"
          />
        </div>

        {/* ═══════ 1. ETHEREUM & VITALIK BUTERIN ═══════ */}
        <div id="s3-ethereum" className="h-full flex flex-col p-5 lg:p-8">

          <div className="shrink-0 mb-4">
            <div className="flex items-center gap-2 mb-1.5 text-[10px] text-muted-foreground">
              <span className="px-1.5 py-0.5 rounded bg-[#f59e0b]/15 text-[#f59e0b] font-bold">↩ §2</span>
              <span>Bitcoin Script was <strong className="text-foreground">intentionally limited</strong>. Vitalik's response: don't patch Bitcoin — build a new chain with a real virtual machine.</span>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <img src={ethereumLogo} alt="Ethereum" className="h-8 object-contain" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Ethereum — The Programmable Blockchain</h2>
            </div>
            <p className="text-sm text-muted-foreground">Bitcoin proved decentralised money was possible. Ethereum asked: what if you could run <em>any</em> program on a blockchain?</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">

            {/* Vitalik card */}
            <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
              <img src={vitalikPhoto} alt="Vitalik Buterin" className="w-full object-cover object-top flex-1 min-h-0" />
              <div className="p-4 shrink-0">
                <div className="font-black text-foreground text-lg leading-tight">Vitalik Buterin</div>
                <div className="text-xs text-[#627EEA] font-medium mt-0.5">Co-founder of Ethereum</div>
                <div className="text-xs text-muted-foreground mt-2">Born 1994 in Russia, raised in Canada. Published the Ethereum whitepaper in late 2013 — aged <span className="text-foreground font-bold">19</span>.</div>
              </div>
            </div>

            {/* Timeline + why */}
            <div className="col-span-2 flex flex-col gap-3 min-h-0">

              <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
                <h3 className="font-bold text-foreground text-sm">Why Ethereum Existed</h3>
                <p className="text-sm text-muted-foreground">
                  Vitalik was an early Bitcoin contributor and journalist. He saw that Bitcoin's scripting language was <span className="text-foreground font-medium">deliberately limited</span> — great for currency, useless for building applications. Several projects had tried to layer features on top of Bitcoin (Colored Coins, Mastercoin) but all hit the same ceiling.
                </p>
                <p className="text-sm text-muted-foreground">
                  His proposal: a new blockchain with a <span className="text-foreground font-medium">Turing-complete virtual machine</span> (the EVM) that could execute any arbitrary program — called a <span className="text-foreground font-medium">smart contract</span>. Developers would finally be able to build decentralised applications without a trusted server.
                </p>
              </div>

              <div className="flex gap-3 flex-1 min-h-0">

                <div className="flex flex-col gap-2 flex-1">
                  {[
                    { year: '2013', label: 'Whitepaper published', color: '#627EEA' },
                    { year: '2014', label: 'Crowdsale raises $18M — largest at the time', color: '#627EEA' },
                    { year: '2015', label: 'Ethereum mainnet launches (Frontier)', color: '#39B54A' },
                    { year: '2016', label: 'The DAO hack — first major test of governance', color: '#ED1C24' },
                    { year: '2022', label: 'The Merge — switches from PoW to Proof of Stake', color: '#8b5cf6' },
                    { year: '2025', label: 'Pectra upgrade — smart accounts, higher validator limits, blob scaling', color: '#8b5cf6' },
                    { year: '2026 →', label: 'Fusaka upgrade — full PeerDAS, EOF, and deeper L2 scaling', color: '#22d3ee', soon: true },
                  ].map(ev => (
                    <div key={ev.year} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${'soon' in ev && ev.soon ? 'bg-[#22d3ee]/10 border border-dashed border-[#22d3ee]/50' : 'bg-card border border-border'}`}>
                      <span className="font-black text-sm shrink-0" style={{ color: ev.color }}>{ev.year}</span>
                      <span className="text-sm text-muted-foreground flex-1">{ev.label}</span>
                      {'soon' in ev && ev.soon && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22d3ee]/20 text-[#22d3ee] shrink-0">SOON</span>
                      )}
                    </div>
                  ))}
                  <a
                    href="https://metamask.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 bg-[#F6851B]/10 border border-[#F6851B]/40 rounded-lg hover:bg-[#F6851B]/20 hover:border-[#F6851B]/70 transition-all group mt-1"
                  >
                    <span className="text-xl shrink-0">🦊</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-[#F6851B]">Create your first wallet</div>
                      <div className="text-xs text-muted-foreground">metamask.io</div>
                    </div>
                    <ExternalLink className="size-4 text-[#F6851B]/60 group-hover:text-[#F6851B] transition-colors shrink-0" />
                  </a>
                </div>

                <div className="w-40 shrink-0 flex flex-col gap-2">
                  <div className="bg-gradient-to-br from-[#627EEA]/20 to-transparent border border-[#627EEA]/40 rounded-xl p-3 flex flex-col items-center text-center flex-1">
                    <img src={ethereumLogo} alt="ETH" className="h-10 object-contain mb-2" />
                    <div className="text-xl font-black text-[#627EEA]">#2</div>
                    <div className="text-xs text-muted-foreground mt-1">Largest blockchain by market cap and developer activity</div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-foreground">4,000+</div>
                    <div className="text-xs text-muted-foreground">dApps live on Ethereum today</div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ═══════ ETH ACCOUNTS & GAS ═══════ */}
        <div id="s3-eth-accounts" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <div className="flex items-center gap-2 mb-1.5 text-[10px] text-muted-foreground">
              <span className="px-1.5 py-0.5 rounded bg-[#f59e0b]/15 text-[#f59e0b] font-bold">↩ §2</span>
              <span>Remember — a wallet holds keys, not coins. Ethereum runs the same idea, but with <strong className="text-foreground">two flavours</strong> of account: one human-controlled, one code-controlled.</span>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <img src={ethereumLogo} alt="Ethereum" className="h-7 object-contain" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Ethereum: Accounts & Gas</h2>
            </div>
            <p className="text-sm text-muted-foreground">Two concepts you must understand before touching any Ethereum application. Everything else is built on top of these.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
            {/* Accounts */}
            <div className="flex flex-col gap-3">
              <div className="font-bold text-sm text-foreground">Two Types of Account</div>
              <div className="flex-1 grid grid-rows-2 gap-3">
                <div className="p-4 bg-[#627EEA]/8 border border-[#627EEA]/30 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🧑</span>
                    <div className="font-bold text-[#627EEA]">Externally Owned Account (EOA)</div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Controlled by a <span className="font-semibold text-foreground">private key</span> — whoever holds the key owns the account</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Can <span className="font-semibold text-foreground">initiate transactions</span> — send ETH, deploy contracts, call functions</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Has a balance in ETH. No code stored.</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Examples: your MetaMask wallet, a hardware wallet, an exchange hot wallet</li>
                  </ul>
                </div>
                <div className="p-4 bg-[#39B54A]/8 border border-[#39B54A]/30 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📄</span>
                    <div className="font-bold text-[#39B54A]">Contract Account</div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Controlled by <span className="font-semibold text-foreground">code</span> — no private key, no human owner</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span><span className="font-semibold text-foreground">Cannot initiate</span> transactions — only executes when called by an EOA or another contract</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Has a balance in ETH + stores code and state permanently on-chain</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Examples: Uniswap DEX, USDC token, an NFT collection</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg text-xs text-muted-foreground">
                <span className="font-bold text-[#f59e0b]">Key rule:</span> Every transaction on Ethereum originates from an EOA. Smart contracts cannot act spontaneously — they need a human (or a keeper bot) to trigger them.
              </div>
            </div>
            {/* Gas */}
            <div className="flex flex-col gap-3">
              <div className="font-bold text-sm text-foreground">Gas — The Fuel of the EVM</div>
              <div className="p-4 bg-card border border-border rounded-xl text-sm text-muted-foreground leading-relaxed">
                Every operation on Ethereum costs <span className="font-semibold text-foreground">gas</span> — a unit that measures computational work. Gas prevents infinite loops and spam: you must pay for every instruction executed by the EVM.
              </div>
              <div className="flex-1 grid grid-rows-2 gap-3">
                <div className="p-4 bg-card border border-border rounded-xl">
                  <div className="font-bold text-sm text-foreground mb-2">Gas cost examples</div>
                  {[
                    { op: 'Read a public variable',     gas: 'FREE',      note: 'View call — never hits the chain', color: '#39B54A' },
                    { op: 'Emit an event',              gas: '~375 gas',  note: 'Cheap — stored in logs, not state', color: '#6366f1' },
                    { op: 'Transfer ETH',               gas: '21,000 gas',note: 'Base cost for every ETH transfer', color: '#f59e0b' },
                    { op: 'Write to storage',           gas: '~22,100 gas',note: 'Most expensive common operation', color: '#ED1C24' },
                    { op: 'Deploy a contract',          gas: '500k+ gas', note: 'Pays for every byte of bytecode', color: '#8b5cf6' },
                  ].map(r => (
                    <div key={r.op} className="flex items-center gap-2 py-1 border-b border-border/50 last:border-0">
                      <span className="text-xs text-muted-foreground flex-1">{r.op}</span>
                      <span className="text-xs font-black shrink-0" style={{ color: r.color }}>{r.gas}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-[#627EEA]/8 border border-[#627EEA]/30 rounded-xl">
                  <div className="font-bold text-sm text-[#627EEA] mb-2">Gas = Gas Units × Gas Price</div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span><span className="font-semibold text-foreground">Base fee:</span> Set by the protocol, burned (EIP-1559, since 2021)</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span><span className="font-semibold text-foreground">Priority fee (tip):</span> You pay the validator to include your transaction faster</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Gas price is denominated in <span className="font-semibold text-foreground">gwei</span> (1 gwei = 0.000000001 ETH)</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>If a transaction runs out of gas mid-execution — it reverts, but <em>you still pay for the work done</em></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ ETH APPLICATIONS: DeFi · NFTs · DAOs ═══════ */}
        <div id="s3-eth-apps" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <div className="flex items-center gap-2 mb-1.5 text-[10px] text-muted-foreground">
              <span className="px-1.5 py-0.5 rounded bg-[#627EEA]/15 text-[#627EEA] font-bold">↩ just covered</span>
              <span>You've seen gas pay for computation. Time to look at what people actually build with it — every example below is a smart contract holding ETH and following rules.</span>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <img src={ethereumLogo} alt="Ethereum" className="h-7 object-contain" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What Ethereum Enables: DeFi, NFTs, DAOs</h2>
            </div>
            <p className="text-sm text-muted-foreground">Three categories of applications that did not exist before programmable blockchains — each replacing or disrupting a traditional institution.</p>
          </div>
          <div className="flex-1 min-h-0 flex gap-4">
            {([
              {
                icon: '🏦', title: 'DeFi', subtitle: 'Decentralised Finance',
                color: '#39B54A',
                replaces: 'Banks, brokers, exchanges',
                description: 'Financial services — lending, borrowing, trading, earning yield — running entirely in smart contracts. No KYC, no opening hours, no intermediary taking a cut.',
                examples: [
                  { name: 'Uniswap', desc: 'Decentralised exchange — swap any ERC-20 token via automated market maker (AMM)' },
                  { name: 'Aave', desc: 'Lend and borrow crypto — interest rates set algorithmically by supply/demand' },
                  { name: 'MakerDAO / DAI', desc: 'Algorithmic stablecoin — mint DAI by locking ETH as collateral in a smart contract' },
                ],
                risk: 'Smart contract bugs, oracle manipulation, liquidation cascades',
                stat: '$40B+ Total Value Locked in DeFi protocols',
              },
              {
                icon: '🖼️', title: 'NFTs', subtitle: 'Non-Fungible Tokens',
                color: '#f97316',
                replaces: 'Art dealers, certificate authorities, notaries',
                description: 'Provable, transferable digital ownership on-chain. Each NFT is a unique token (ERC-721) whose ownership history is permanently recorded. No one can deny ownership — the blockchain is the title deed.',
                examples: [
                  { name: 'ENS (.eth domains)', desc: 'Blockchain-native usernames — pay once, own forever. No renewal extortion.' },
                  { name: 'Proof of attendance (POAPs)', desc: 'On-chain badges proving you attended events — cryptographic credentials' },
                  { name: 'Real estate deeds', desc: 'Propy sold the first NFT property — immutable ownership transfer on-chain' },
                ],
                risk: 'Metadata stored off-chain (IPFS) can disappear — "you don\'t own the image, you own the receipt"',
                stat: '$41B traded in NFTs in 2021 — peak. Now utility-focused.',
              },
              {
                icon: '🏛️', title: 'DAOs', subtitle: 'Decentralised Autonomous Organisations',
                color: '#6366f1',
                replaces: 'Companies, NGOs, cooperatives, funds',
                description: 'An organisation governed by smart contracts and token votes instead of a board of directors. Anyone holding governance tokens can propose and vote on decisions — the outcome executes automatically on-chain.',
                examples: [
                  { name: 'MakerDAO', desc: 'MKR holders vote on DAI stability parameters — billions in protocol policy decided on-chain' },
                  { name: 'Uniswap DAO', desc: 'UNI holders control the $6B+ Uniswap treasury — voted to deploy to new chains' },
                  { name: 'Gitcoin DAO', desc: 'Funds open-source development via quadratic voting — community decides who gets grants' },
                ],
                risk: 'Voter apathy, whale capture, slow governance for emergencies',
                stat: 'DAOs collectively hold $20B+ in treasuries',
              },
            ] as const).map(app => (
              <div key={app.title} className="flex-1 flex flex-col rounded-xl border-2 bg-card overflow-hidden" style={{ borderColor: app.color + '40' }}>
                <div className="h-1.5 shrink-0" style={{ backgroundColor: app.color }} />
                <div className="flex flex-col flex-1 p-4 gap-3 min-h-0">
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-2xl">{app.icon}</span>
                    <div>
                      <div className="font-black text-lg leading-none" style={{ color: app.color }}>{app.title}</div>
                      <div className="text-xs font-semibold text-foreground">{app.subtitle}</div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground italic">Replaces: {app.replaces}</div>
                  </div>
                  <p className="text-sm text-muted-foreground shrink-0">{app.description}</p>
                  <div className="flex-1 min-h-0 space-y-2">
                    {app.examples.map(ex => (
                      <div key={ex.name} className="p-2.5 rounded-lg bg-muted/40 border border-border">
                        <div className="font-bold text-xs text-foreground mb-0.5">{ex.name}</div>
                        <div className="text-xs text-muted-foreground">{ex.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="shrink-0 pt-3 border-t border-border space-y-1.5">
                    <div className="text-xs text-muted-foreground"><span className="font-semibold text-[#ef4444]">Risk: </span>{app.risk}</div>
                    <div className="text-xs font-semibold" style={{ color: app.color }}>{app.stat}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 2. BLOCKCHAIN USE CASES — GROUPED BY PATTERN ═══════ */}
        <div id="s3-usecases" className="h-full flex flex-col p-5 lg:p-8">

          <div className="shrink-0 mb-3">
            <div className="flex items-center gap-2 mb-1.5 text-[10px] text-muted-foreground">
              <span className="px-1.5 py-0.5 rounded bg-[#ED1C24]/15 text-[#ED1C24] font-bold">↩ §1</span>
              <span>Remember the village ledger — every trust problem you saw there shows up again, at industry scale.</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Blockchain Use Cases — Three Patterns, Twelve Industries</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              Zoom out from DeFi · NFTs · DAOs. The same <strong className="text-foreground">three patterns</strong> show up across every sector — wherever there are middlemen, paper trails, or coordination headaches.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-3">
            {([
              {
                key: 'trust',
                emoji: '🤝',
                pattern: 'Trust without intermediaries',
                color: '#f59e0b',
                tagline: 'Money, claims, and contracts settle directly between parties — banks, brokers, and clearing houses become optional.',
                industries: [
                  { emoji: '💰', name: 'Finance & DeFi',     hook: 'Lending, trading, payments — no bank, open 24/7' },
                  { emoji: '📈', name: 'Capital Markets',     hook: 'Tokenised securities settle in seconds, not T+2 days' },
                  { emoji: '🏦', name: 'Insurance',           hook: 'Parametric policies auto-pay on verified events' },
                  { emoji: '🪙', name: 'CBDCs',               hook: 'Programmable state money — power and peril (see Ethics)' },
                ],
              },
              {
                key: 'provenance',
                emoji: '🔗',
                pattern: 'Verifiable provenance',
                color: '#39B54A',
                tagline: 'Anything that needs an unbroken chain of custody gets one — built in, not bolted on.',
                industries: [
                  { emoji: '🚚', name: 'Supply Chain',         hook: 'Track & trace from raw material to consumer' },
                  { emoji: '🌐', name: 'Global Trade',         hook: 'Digital letters of credit replace 5-day paper trails' },
                  { emoji: '🏥', name: 'Healthcare',           hook: 'Drug-pack authentication, clinical trial integrity' },
                  { emoji: '🎬', name: 'Media & Entertainment', hook: 'Royalties to collaborators on every play, automatically' },
                ],
              },
              {
                key: 'coordination',
                emoji: '🌐',
                pattern: 'Self-sovereign coordination',
                color: '#6366f1',
                tagline: 'People and organisations coordinate without a single platform or registrar in the middle.',
                industries: [
                  { emoji: '🪪', name: 'Digital Identity',           hook: 'You own your credentials, prove age without revealing birthdate' },
                  { emoji: '🗳️', name: 'Government',                hook: 'Verifiable voting, immutable land registry, transparent procurement' },
                  { emoji: '🌍', name: 'Energy & Sustainability',    hook: 'Carbon credits without double-counting, P2P energy trading' },
                  { emoji: '⚖️', name: 'Law & Real Estate',         hook: 'Escrow + title transfers auto-executed, fractional ownership' },
                ],
              },
            ] as const).map(group => (
              <div key={group.key} className="flex flex-col rounded-xl border-2 bg-card overflow-hidden" style={{ borderColor: group.color + '55' }}>
                {/* Top stripe */}
                <div className="h-1.5 shrink-0" style={{ backgroundColor: group.color }} />
                <div className="flex flex-col flex-1 p-4 gap-3 min-h-0">
                  {/* Pattern header */}
                  <div className="shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{group.emoji}</span>
                      <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: group.color }}>Pattern</div>
                    </div>
                    <h3 className="font-black text-base lg:text-lg leading-tight text-foreground">{group.pattern}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">{group.tagline}</p>
                  </div>
                  {/* Industry list */}
                  <div className="flex-1 min-h-0 flex flex-col gap-1.5">
                    <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Shows up in</div>
                    {group.industries.map(ind => (
                      <div
                        key={ind.name}
                        className="rounded-lg border bg-card/60 p-2"
                        style={{ borderColor: group.color + '30' }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base shrink-0">{ind.emoji}</span>
                          <span className="font-bold text-xs text-foreground">{ind.name}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{ind.hook}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="shrink-0 mt-3 p-2.5 bg-muted/40 border border-border rounded-lg text-[11px] text-muted-foreground">
            <strong className="text-foreground">Notice:</strong> the same pattern (e.g. <em>verifiable provenance</em>) shows up across supply chain, healthcare, and media. Industries are different surfaces; the underlying primitive is the same — which is why a Course-2 platform choice can serve multiple Course-3 business cases.
          </div>
        </div>

        {/* ═══════ 2. BLOCKCHAIN & WEB3 ECOSYSTEM MAP ═══════ */}
        <div id="s3-ecosystem" className="h-full flex items-center justify-center p-8">
          <div className="max-w-4xl w-full">
            <div className="flex items-center justify-center gap-2 mb-2 text-[10px] text-muted-foreground">
              <span className="px-1.5 py-0.5 rounded bg-[#6366f1]/15 text-[#6366f1] font-bold">↩ §1 + §2</span>
              <span>Each use case you just saw lives somewhere in this stack — same nodes from §1 at the bottom, same contracts as DeFi/NFTs in the middle, you at the top.</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-1 text-center">The Blockchain & Web3 Ecosystem</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              A layered stack — from raw infrastructure at the bottom to end users at the top.
            </p>

            <div className="space-y-2">

              {/* Layer: Users */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#39B54A]/20 to-transparent border border-[#39B54A]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">👤</span>
                  <span className="font-bold text-[#39B54A] text-xs uppercase tracking-widest">Users</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Developers', 'Traders', 'Creators', 'Institutions', 'Individuals'].map(u => (
                    <span key={u} className="px-3 py-1 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

              {/* Layer: Interfaces */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#6366f1]/20 to-transparent border border-[#6366f1]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">🖥️</span>
                  <span className="font-bold text-[#6366f1] text-xs uppercase tracking-widest">Interfaces</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Wallets (MetaMask, Phantom)', 'dApps', 'Exchanges (Uniswap, Binance)', 'NFT Marketplaces', 'Bridges'].map(u => (
                    <span key={u} className="px-3 py-1 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

              {/* Layer: Applications */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#f59e0b]/20 to-transparent border border-[#f59e0b]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">⚙️</span>
                  <span className="font-bold text-[#f59e0b] text-xs uppercase tracking-widest">Applications & Protocols</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['DeFi (Aave, Compound)', 'NFTs (ERC-721)', 'DAOs (Snapshot, Aragon)', 'Gaming (Axie Infinity)', 'Stablecoins (USDC, DAI)'].map(u => (
                    <span key={u} className="px-3 py-1 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

              {/* Layer: Blockchains */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#ED1C24]/20 to-transparent border border-[#ED1C24]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">⛓️</span>
                  <span className="font-bold text-[#ED1C24] text-xs uppercase tracking-widest">Blockchain Layer (L1 / L2)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Bitcoin', 'Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche'].map(u => (
                    <span key={u} className="px-3 py-1 bg-[#ED1C24]/10 border border-[#ED1C24]/30 rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

              {/* Layer: Infrastructure */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#9ca3af]/10 to-transparent border border-[#9ca3af]/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">🖧</span>
                  <span className="font-bold text-muted-foreground text-xs uppercase tracking-widest">Infrastructure</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Nodes', 'Validators / Miners', 'P2P Network', 'Cryptography', 'Consensus Mechanisms'].map(u => (
                    <span key={u} className="px-3 py-1 bg-muted border border-border rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════ 3. EVOLUTION OF THE INTERNET — WEB1 / WEB2 / WEB3 ═══════ */}
        <div id="s3-web3" className="h-full flex flex-col items-center p-8">
          <div className="max-w-5xl w-full flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-center gap-2 mb-2 text-[10px] text-muted-foreground shrink-0">
              <span className="px-1.5 py-0.5 rounded bg-[#39B54A]/15 text-[#39B54A] font-bold">zoom out</span>
              <span>Quick historical context: how the web's <strong className="text-foreground">ownership model</strong> has shifted in 30 years — and why Web3 looks different from what came before.</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-1 text-center shrink-0">The Evolution of the Internet</h2>
            <p className="text-sm text-muted-foreground text-center mb-4 shrink-0">
              Each era defined by what users could do — and who owned the data.
            </p>

            <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">

              {/* Web1 */}
              <div className="p-6 bg-card rounded-2xl border-2 border-[#9ca3af]/40 flex flex-col gap-3 h-full overflow-y-auto">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#9ca3af]/20 border border-[#9ca3af]/40 flex items-center justify-center text-lg">🌐</div>
                  <div>
                    <div className="font-black text-foreground text-lg">Web 1.0</div>
                    <div className="text-xs text-muted-foreground">1991 – 2004</div>
                  </div>
                </div>
                <div className="flex items-center justify-around gap-2 py-2 px-3 bg-[#9ca3af]/10 rounded-xl">
                  <img src={amazonLogo} alt="Amazon" className="h-7 object-contain" />
                  <img src={msnLogo} alt="MSN" className="h-7 object-contain" />
                  <img src={netscapeLogo} alt="Netscape" className="h-7 object-contain" />
                </div>
                <div className="px-3 py-1.5 bg-[#9ca3af]/20 rounded-full text-center text-xs font-bold text-muted-foreground tracking-widest">📖 READ ONLY</div>
                <ul className="space-y-1.5 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>Static HTML pages</li>
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>No user interaction or accounts</li>
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>Information flows one-way</li>
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>Content owned by publishers only</li>
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>Yahoo, GeoCities, early forums</li>
                </ul>
                <div className="mt-auto p-3 bg-muted rounded-lg text-xs text-muted-foreground italic">
                  "The internet was a library. You could only look."
                </div>
              </div>

              {/* Web2 */}
              <div className="p-6 bg-card rounded-2xl border-2 border-[#6366f1]/50 flex flex-col gap-3 h-full overflow-y-auto">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#6366f1]/20 border border-[#6366f1]/40 flex items-center justify-center text-lg">📱</div>
                  <div>
                    <div className="font-black text-foreground text-lg">Web 2.0</div>
                    <div className="text-xs text-muted-foreground">2004 – Present</div>
                  </div>
                </div>
                <div className="flex items-center justify-around gap-2 py-2 px-3 bg-[#6366f1]/10 rounded-xl">
                  <img src={tiktokLogo} alt="TikTok" className="h-7 object-contain" />
                  <img src={youtubeLogo} alt="YouTube" className="h-7 object-contain" />
                  <img src={xLogo} alt="X" className="h-7 object-contain rounded" />
                </div>
                <div className="px-3 py-1.5 bg-[#6366f1]/20 rounded-full text-center text-xs font-bold text-[#6366f1] tracking-widest">✏️ READ + WRITE</div>
                <ul className="space-y-1.5 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Social media & user-generated content</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Platforms own and monetize your data</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Free services — you are the product</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Centralized cloud infrastructure</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Google, Facebook, YouTube, Amazon</li>
                </ul>
                <div className="mt-auto p-3 bg-muted rounded-lg text-xs text-muted-foreground italic">
                  "The internet became interactive. But platforms kept the keys."
                </div>
              </div>

              {/* Web3 */}
              <div className="p-6 bg-card rounded-2xl border-2 border-[#39B54A]/60 flex flex-col gap-3 shadow-[0_0_20px_rgba(57,181,74,0.1)] h-full overflow-y-auto">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#39B54A]/20 border border-[#39B54A]/50 flex items-center justify-center text-lg">🔐</div>
                  <div>
                    <div className="font-black text-foreground text-lg">Web 3.0</div>
                    <div className="text-xs text-[#39B54A]">Now → Future</div>
                  </div>
                </div>
                <div className="flex items-center justify-around gap-2 py-2 px-3 bg-[#39B54A]/10 rounded-xl">
                  <img src={bitcoinLogo} alt="Bitcoin" className="h-7 object-contain" />
                  <img src={uniswapLogo} alt="Uniswap" className="h-7 object-contain" />
                  <img src={usdcLogo} alt="USDC" className="h-7 object-contain" />
                </div>
                <div className="px-3 py-1.5 bg-[#39B54A]/20 rounded-full text-center text-xs font-bold text-[#39B54A] tracking-widest">🔑 READ + WRITE + OWN</div>
                <ul className="space-y-1.5 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>User-owned data & assets via wallets</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Decentralized applications (dApps)</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Token-based economies & governance</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Self-sovereign identity</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Ethereum, Solana, IPFS, DAOs</li>
                </ul>
                <div className="mt-auto p-3 bg-[#39B54A]/10 rounded-lg border border-[#39B54A]/20 text-xs text-muted-foreground italic">
                  "The internet becomes owned by its users. No platform can take it away."
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════ 4. TODAY'S APP vs DAPP ═══════ */}
        <div id="s3-dapp" className="h-full">
          <ComparisonSlide
            title="Today's App vs dApp"
            option1Label="Traditional App"
            option2Label="Decentralized App (dApp)"
            items={[
              {
                feature: "Architecture",
                option1: "Centralized servers controlled by a company",
                option2: "Smart contracts on a blockchain + decentralized storage"
              },
              {
                feature: "Data Ownership",
                option1: "Company owns and controls user data",
                option2: "Users own their data and assets"
              },
              {
                feature: "Downtime",
                option1: "Server outage = entire service offline",
                option2: "No single point of failure — runs as long as the network exists"
              },
              {
                feature: "Censorship",
                option1: "Company can ban users, remove content, change terms",
                option2: "No entity can censor transactions once on-chain"
              },
              {
                feature: "Revenue Model",
                option1: "Ads, subscriptions, data monetization",
                option2: "Token incentives, protocol fees, community governance"
              },
              {
                feature: "Example",
                option1: "Spotify — company controls catalog, pays artists pennies",
                option2: "Audius — artists upload directly, fans pay via $AUDIO tokens"
              }
            ]}
          />
        </div>

        {/* ═══════ 5. ETHICAL CONSIDERATIONS ═══════ */}
        <div id="s3-ethics" className="h-full flex flex-col p-5 lg:p-8">

          {/* Header */}
          <div className="shrink-0 mb-3">
            <div className="flex items-center gap-2 mb-1.5 text-[10px] text-muted-foreground">
              <span className="px-1.5 py-0.5 rounded bg-[#ED1C24]/15 text-[#ED1C24] font-bold">↩ §2</span>
              <span>The same <strong className="text-foreground">immutability</strong> that protects the chain from tampering also protects bad rules from being undone. Same property, two faces.</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Ethical Considerations</h2>
            <p className="text-sm text-muted-foreground">Blockchain is not inherently good or bad — its impact depends on how it is designed, governed, and used.</p>
          </div>

          {/* Top row — 4 compact ethical themes */}
          <div className="grid grid-cols-4 gap-3 shrink-0 mb-3">
            <div className="p-5 bg-gradient-to-br from-[#ED1C24]/15 to-transparent rounded-xl border border-[#ED1C24]/30">
              <div className="font-bold text-[#ED1C24] text-sm mb-2">⚡ Energy</div>
              <p className="text-sm text-muted-foreground">Bitcoin PoW uses as much power as some countries. Ethereum's PoS cut its footprint by 99.95%.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/15 to-transparent rounded-xl border border-[#8b5cf6]/30">
              <div className="font-bold text-[#8b5cf6] text-sm mb-2">👁️ Surveillance vs Privacy</div>
              <p className="text-sm text-muted-foreground">Public chains are transparent forever — accountability and privacy are in direct tension.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#f59e0b]/15 to-transparent rounded-xl border border-[#f59e0b]/30">
              <div className="font-bold text-[#f59e0b] text-sm mb-2">🔒 Irreversibility</div>
              <p className="text-sm text-muted-foreground">"Code is law" has limits. Transactions can't be reversed, even when real people are harmed.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#39B54A]/15 to-transparent rounded-xl border border-[#39B54A]/30">
              <div className="font-bold text-[#39B54A] text-sm mb-2">🌍 Access & Inclusion</div>
              <p className="text-sm text-muted-foreground">1.4 billion unbanked adults could access financial services with just a smartphone and a wallet.</p>
            </div>
          </div>

          {/* Bottom row — Promise vs Peril with real projects */}
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">

            {/* Positive projects */}
            <div className="flex flex-col min-h-0">
              <div className="flex items-center gap-2 mb-2 shrink-0">
                <div className="size-5 rounded-full bg-[#39B54A] flex items-center justify-center text-white text-xs font-black">+</div>
                <h3 className="font-bold text-[#39B54A] text-sm tracking-wide">BLOCKCHAIN FOR GOOD</h3>
              </div>

              <div className="bg-card border border-[#39B54A]/40 rounded-xl p-4 flex flex-col flex-1 min-h-0 gap-0">

                <div className="flex-1 flex flex-col min-h-0 pb-3">
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <span className="text-xl shrink-0">🌍</span>
                    <div className="font-bold text-foreground text-sm">GiveDirectly — Transparent Humanitarian Aid</div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>NGO operating in Kenya and Uganda — sends cash <span className="text-foreground font-medium ml-1">directly</span> to people in extreme poverty via blockchain wallets</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Zero intermediaries — every transfer is <span className="text-foreground font-medium ml-1">traceable on-chain</span>; donors can verify their money arrived</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>In traditional aid, up to <span className="text-foreground font-medium mx-1">30%</span> is lost to administration, NGO salaries, and corruption — blockchain cuts this to near zero</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Recipients spend freely — no government or NGO can dictate what the money is used for</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Smart contracts automate disbursements — no bank account required, just a mobile wallet</li>
                  </ul>
                </div>

                <div className="flex-1 flex flex-col min-h-0 border-t border-border pt-3">
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <span className="text-xl shrink-0">🤝</span>
                    <div className="font-bold text-foreground text-sm">Proof of Humanity — Identity Without Institutions</div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Ethereum-based registry: prove you are a real human via a short video + vouching by existing members</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>No government, bank, or company controls the list — <span className="text-foreground font-medium ml-1">no one can delete you</span></li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Foundation for UBI experiments: verified humans receive a monthly <span className="text-foreground font-medium ml-1">UBI token</span> airdrop automatically</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Enables bot-free social networks and one-person-one-vote governance on-chain</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Used by Kleros (decentralised court) and other dApps as a sybil-resistance layer</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Negative / concerning projects */}
            <div className="flex flex-col min-h-0">
              <div className="flex items-center gap-2 mb-2 shrink-0">
                <div className="size-5 rounded-full bg-[#ED1C24] flex items-center justify-center text-white text-xs font-black">!</div>
                <h3 className="font-bold text-[#ED1C24] text-sm tracking-wide">BLOCKCHAIN AS CONTROL</h3>
              </div>

              <div className="bg-card border border-[#ED1C24]/40 rounded-xl p-4 flex flex-col flex-1 min-h-0 gap-0">

                <div className="flex-1 flex flex-col min-h-0 pb-3">
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <span className="text-xl shrink-0">🇨🇳</span>
                    <div className="font-bold text-foreground text-sm">Digital Yuan (e-CNY) — Programmable Money, Programmable Control</div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span><span className="text-foreground font-medium">Expiry dates</span> — government stimulus yuan must be spent within a deadline or it disappears</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span><span className="text-foreground font-medium">Geographic restrictions</span> — funds can be locked to specific regions or districts</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span><span className="text-foreground font-medium">Category bans</span> — purchases like alcohol, gambling, or political donations can be auto-blocked</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span><span className="text-foreground font-medium">Instant freezing</span> — any wallet disabled in seconds, no court order needed</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Full real-time surveillance — every transaction visible to the state by design</li>
                  </ul>
                </div>

                <div className="flex-1 flex flex-col min-h-0 border-t border-border pt-3">
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <span className="text-xl shrink-0">🇪🇺</span>
                    <div className="font-bold text-foreground text-sm">Digital Euro — Coming Soon, Questions Remain</div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>ECB plans to launch a CBDC — marketed as a convenient, modern form of cash</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Proposed <span className="text-foreground font-medium ml-1">€3,000 holding cap</span> prevents using it as savings — steering behaviour by design</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Unlike physical cash — <span className="text-foreground font-medium ml-1">anonymous and unconditional</span> — every CBDC transaction is permanently logged</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Infrastructure built for "features" today can silently add restrictions tomorrow</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Civil society groups and MEPs have raised formal concerns about financial sovereignty</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ═══════ 6. FUTURE TRENDS ═══════ */}
        <div id="s3-future" className="h-full">
          <ConceptSlide
            title="Future Trends"
            description="The next decade of blockchain will be shaped by convergence with other technologies and solutions to current limitations."
            visual={
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                  <h4 className="font-bold text-[#ED1C24] mb-2">🤖 AI + Blockchain</h4>
                  <p className="text-sm text-muted-foreground">Verifiable AI outputs, decentralized training data, provenance tracking for AI-generated content. Blockchain can prove what is real.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                  <h4 className="font-bold text-[#6366f1] mb-2">🔮 Zero-Knowledge Proofs</h4>
                  <p className="text-sm text-muted-foreground">Prove something is true without revealing the underlying data. Enables privacy-preserving identity, voting, and transactions at scale.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                  <h4 className="font-bold text-[#39B54A] mb-2">🔗 Layer 0 & Interoperability</h4>
                  <p className="text-sm text-muted-foreground">Protocols like Polkadot and Cosmos connect different blockchains. The future is a network of networks, not one chain to rule them all.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                  <h4 className="font-bold text-[#f59e0b] mb-2">🪪 Decentralized Identity (DID)</h4>
                  <p className="text-sm text-muted-foreground">Self-sovereign identity lets you prove credentials without sharing personal data. One identity across all services, owned by you.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent rounded-xl border border-[#8b5cf6]/30">
                  <h4 className="font-bold text-[#8b5cf6] mb-2">🧾 Account Abstraction</h4>
                  <p className="text-sm text-muted-foreground">Makes crypto wallets work like normal accounts: social recovery, gas sponsoring, session keys. The UX revolution blockchain needs.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#22d3ee]/20 to-transparent rounded-xl border border-[#22d3ee]/30">
                  <h4 className="font-bold text-[#22d3ee] mb-2">🏗️ Real-World Assets (RWAs)</h4>
                  <p className="text-sm text-muted-foreground">Tokenizing real estate, bonds, commodities on-chain. BlackRock, Franklin Templeton, and others are already doing this at scale.</p>
                </div>
              </div>
            }
            keyPoints={[
              "AI + blockchain solves the provenance and trust problem for digital content",
              "ZK proofs unlock privacy without sacrificing verifiability",
              "Interoperability protocols will connect isolated blockchain ecosystems",
              "Account abstraction will make crypto accessible to mainstream users"
            ]}
          />
        </div>

        {/* ═══════ DISCUSSION ═══════ */}
        <div id="s3-discussion" className="h-full">
          <DiscussionSlide
            prompt="What industry do you think could benefit most from blockchain technology in the next 10 years?"
            guidingQuestions={[
              "What problems exist in that industry that blockchain could solve?",
              "What are the potential challenges to adoption?",
              "How would blockchain improve transparency or efficiency?",
              "What stakeholders might resist this change and why?"
            ]}
          />
        </div>

        {/* ═══════ QUIZZES ═══════ */}
        <div id="s3-quiz" className="h-full">
          <QuizSlide
            question="What is the fundamental shift that Web3 represents compared to Web2?"
            options={[
              { text: "Faster internet speeds and better streaming quality", correct: false },
              { text: "Users own their data, identity, and digital assets instead of platforms", correct: true },
              { text: "Free access to all premium content and services", correct: false },
              { text: "Government control and regulation of all internet content", correct: false }
            ]}
            explanation="Web3 shifts ownership from platforms to users through decentralization and cryptographic keys. Instead of companies owning your data, you control your identity and assets via wallets and on-chain protocols."
          />
        </div>

        <div className="h-full">
          <QuizSlide
            question="What is a key advantage of a dApp over a traditional centralized application?"
            options={[
              { text: "dApps are always faster and cheaper to use", correct: false },
              { text: "dApps have no single point of failure — they run as long as the blockchain network exists", correct: true },
              { text: "dApps don't require an internet connection to function", correct: false },
              { text: "dApps are always free and generate no revenue", correct: false }
            ]}
            explanation="Because dApps run on decentralized blockchain networks via smart contracts, they have no central server that can fail or be shut down. As long as the underlying blockchain network operates, the dApp continues to function."
          />
        </div>

        <div className="h-full">
          <QuizSlide
            question="Which layer of the Web3 ecosystem contains protocols like Ethereum, Solana, and Polygon?"
            options={[
              { text: "The Interface layer (wallets and dApps)", correct: false },
              { text: "The Application layer (DeFi, NFTs, DAOs)", correct: false },
              { text: "The Blockchain Layer (L1 / L2)", correct: true },
              { text: "The Infrastructure layer (nodes and validators)", correct: false }
            ]}
            explanation="Ethereum, Solana, and Polygon are L1 blockchains or L2 scaling solutions. They sit between raw infrastructure (nodes, validators, P2P network) and the application protocols (DeFi, NFTs, DAOs) built on top of them."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s3-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 3 — Key Takeaways"
            takeaways={[
              "Blockchain use cases span 8+ industries: finance, healthcare, supply chain, voting, identity, real estate, sustainability, and digital art",
              "The Web3 ecosystem is a layered stack — from nodes and validators at the bottom to wallets, dApps, and users at the top",
              "Web3 = Read + Write + Own: the key shift is that users own their data and digital assets instead of platforms",
              "dApps replace centralized servers with smart contracts — removing single points of failure and platform control",
              "Ethical trade-offs are real: energy consumption, privacy vs transparency, irreversibility, and dual-use potential",
              "Future trends — ZK proofs, AI integration, DID, account abstraction — will define blockchain's next decade"
            ]}
          />
        </div>

        {/* ═══════ KNOWLEDGE WALL — RECAP OF EVERYTHING ═══════ */}
        <div id="s3-recap" className="h-full">
          <KnowledgeWall />
        </div>

        {/* ═══════ TEAM CHECKPOINT — DAY 1 WRAP ═══════ */}
        <div id="s3-team-checkpoint" className="h-full">
          <TeamCheckpoint
            contextLabel="Day 1 wrap · Course 01 → Course 02 / 03"
            title="Form your team"
            subtitle="The team project runs across all five courses. Find your teammates now — you'll start using the team in Day 2 and Day 3."
            duration="10–15 min"
            sections={[
              {
                label: 'Do now',
                color: '#39B54A',
                items: [
                  <>Form a team of <strong>3–4 members</strong>. Mix backgrounds where you can.</>,
                  <>Exchange contact details — WhatsApp / Telegram / email — so you can coordinate between sessions.</>,
                  <>Pick a working name for your team and a primary point of contact.</>,
                ],
              },
              {
                label: 'Discuss together',
                color: '#6366f1',
                items: [
                  <>Each member shares <strong>one industry</strong> you find interesting or work in.</>,
                  <>Note any business pain points you've personally experienced — paper-heavy processes, slow settlements, trust gaps, etc.</>,
                  <>Sketch a few candidate problems freely. You can refine — or completely change direction — as you learn more across Days 2 and 3.</>,
                ],
              },
              {
                label: 'Bring to Day 2',
                color: '#8b5cf6',
                items: [
                  <>Your team's contact list — everyone in one chat group.</>,
                  <>A short list (~3) of pain points worth exploring.</>,
                  <>Curiosity about which blockchain platforms could fit them.</>,
                ],
              },
            ]}
            footnote={
              <span className="text-muted-foreground">
                <strong className="text-foreground">What's next →</strong> Day 2 (Blockchain Platforms) will introduce platform trade-offs you'll need to choose between. Day 3 (Smart Contracts) is where your team's idea becomes a concrete design.
              </span>
            }
          />
        </div>

      </div>
      </div>
    </div>
  );
}
