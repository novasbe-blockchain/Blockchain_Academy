import { useState } from 'react';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { Wrench } from 'lucide-react';

const chapters = [
  { id: 's6-standards-intro',    label: 'Standards Intro' },
  { id: 's6-erc-explain',        label: 'What is an ERC' },
  { id: 's6-erc-table',          label: '🧩 ERC Explorer' },
  { id: 's6-erc-evolve',         label: 'Why Standards Evolve' },
  { id: 's6-eip-process',        label: '🧩 EIP Process' },
  { id: 's6-erc-example',        label: 'OpenZeppelin Example' },
  { id: 's6-frameworks-intro',   label: 'Frameworks Intro' },
  { id: 's6-frameworks-table',   label: '🧩 Frameworks Compare' },
  { id: 's6-tools',              label: 'Useful Tools' },
  { id: 's6-platform-checklist', label: '🧩 Platform Checklist' },
  { id: 's6-platform-table',     label: '🧩 Platforms' },
  { id: 's6-platform-usecase',   label: 'Use Case → Platform' },
  { id: 's6-integration-intro',  label: 'Integration Intro' },
  { id: 's6-integration-nodes',  label: 'Node Infrastructure' },
  { id: 's6-integration-api',    label: 'API & Middleware' },
  { id: 's6-integration-events', label: 'Event-Driven' },
  { id: 's6-integration-oracles',label: 'Oracles' },
  { id: 's6-integration-data',   label: 'On vs Off-Chain' },
  { id: 's6-ai-dev',             label: 'AI-Driven Dev' },
  { id: 's6-takeaways',          label: 'Takeaways' },
  { id: 's6-final-quiz',         label: 'Final Quiz' },
];

// ═══ DATA ═══════════════════════════════════════════════════════════════════

const ERC_DATA = [
  {
    id: 'erc-20', name: 'ERC-20', kind: 'Fungible Token', color: '#6366f1',
    purpose: 'Cryptocurrencies, DeFi tokens, governance tokens, stablecoins.',
    functions: ['transfer(to, amount)', 'approve(spender, amount)', 'transferFrom(from, to, amount)', 'balanceOf(account)', 'totalSupply()'],
    events: ['Transfer(from, to, amount)', 'Approval(owner, spender, amount)'],
    examples: 'USDC · USDT · UNI · LINK · DAI',
    takeaway: 'The "standard money" of Ethereum — every wallet and exchange supports it.',
  },
  {
    id: 'erc-721', name: 'ERC-721', kind: 'Non-Fungible Token', color: '#8b5cf6',
    purpose: 'Unique digital items: art, collectibles, tickets, in-game assets, real-estate deeds.',
    functions: ['ownerOf(tokenId)', 'transferFrom(from, to, tokenId)', 'approve(to, tokenId)', 'tokenURI(tokenId)'],
    events: ['Transfer(from, to, tokenId)', 'Approval(owner, approved, tokenId)'],
    examples: 'CryptoPunks · BAYC · ENS · Propy real-estate deeds',
    takeaway: 'Enables NFTs — one-of-a-kind, ownable digital assets.',
  },
  {
    id: 'erc-777', name: 'ERC-777', kind: 'Advanced Fungible Token', color: '#22d3ee',
    purpose: 'Complex DeFi apps and tokens needing smart-contract receive hooks.',
    functions: ['send(recipient, amount, data)', 'authorizeOperator(operator)', 'tokensReceived hook'],
    events: ['Sent', 'Minted', 'Burned', 'AuthorizedOperator'],
    examples: 'Used in some advanced DeFi protocols',
    takeaway: 'Smarter version of ERC-20 — more flexible for contract-to-contract use. Adoption limited; ERC-20 dominates.',
  },
  {
    id: 'erc-2981', name: 'ERC-2981', kind: 'NFT Royalty Standard', color: '#f59e0b',
    purpose: 'Provide royalty payout info to NFT marketplaces in a standardized way.',
    functions: ['royaltyInfo(tokenId, salePrice) → (receiver, royaltyAmount)'],
    events: ['(no required events)'],
    examples: 'Most major NFT marketplaces (OpenSea, Blur, Rarible) read this',
    takeaway: 'Standard way to support artist and creator royalties on resales — fixes a gap in ERC-721.',
  },
  {
    id: 'erc-1155', name: 'ERC-1155', kind: 'Multi-Token Standard', color: '#39B54A',
    purpose: 'Both fungible and non-fungible tokens in a single contract; ideal for gaming and batch transfers.',
    functions: ['balanceOfBatch', 'safeBatchTransferFrom', 'setApprovalForAll', 'uri(id)'],
    events: ['TransferSingle', 'TransferBatch', 'ApprovalForAll'],
    examples: 'Gaming items · event tickets · fractional NFTs',
    takeaway: 'Efficient and flexible — batch transfers cut gas costs by 80–90%. Common in gaming/NFTs.',
  },
];

const EIP_STEPS = [
  { i: 1,  label: 'Community discussion',        actor: 'Community',         desc: 'Idea proposed informally on forums, social media, conferences.', color: '#6366f1' },
  { i: 2,  label: 'Ethereum Magicians',          actor: 'Magicians forum',   desc: 'Informal feedback from technical contributors. Discussion thread refines the proposal.', color: '#8b5cf6' },
  { i: 3,  label: 'Draft EIP on GitHub',         actor: 'Author',            desc: 'PR submitted to ethereum/EIPs repository in standardized format.', color: '#22d3ee' },
  { i: 4,  label: 'EIP Editors review format',   actor: 'EIP Editors',       desc: 'Editors review for completeness and adherence to template — not technical merit.', color: '#39B54A' },
  { i: 5,  label: 'Repository assigns number',   actor: 'Repository',        desc: 'EIP assigned a unique number and merged in Draft status.', color: '#f59e0b' },
  { i: 6,  label: 'Public discussion',           actor: 'Community',         desc: 'Wider technical and economic review. Proposal evolves through revisions.', color: '#ec4899' },
  { i: 7,  label: 'Client teams review feasibility', actor: 'Client devs',   desc: 'Geth, Nethermind, Besu, Reth, Erigon teams assess implementation feasibility.', color: '#a855f7' },
  { i: 8,  label: 'AllCoreDevs decision',        actor: 'AllCoreDevs call',  desc: 'For protocol-level EIPs: rough consensus among core developers across clients.', color: '#0ea5e9' },
  { i: 9,  label: 'EIP Status: Final / Accepted', actor: 'EIP process',     desc: 'Status updated to Final. Specification frozen — no further edits.', color: '#84cc16' },
  { i: 10, label: 'Clients implement',           actor: 'Client devs',       desc: 'Each Ethereum client implements the EIP in code, tests across testnets.', color: '#06b6d4' },
  { i: 11, label: 'Network activates (fork)',    actor: 'Network',           desc: 'Hard fork at scheduled block height activates the change for everyone.', color: '#ED1C24' },
];

const FRAMEWORKS = [
  { id: 'hardhat',  name: 'Hardhat',  language: 'TypeScript / JS',  chains: 'Ethereum + EVM',     testing: 'Mocha + Chai',     deploy: 'Hardhat Deploy', plugins: 'Rich (gas reporter, etherscan)', strengths: 'Popular, extensible, fast local network', cons: 'Can be overkill for small projects', ideal: 'Pro EVM developers', color: '#6366f1' },
  { id: 'foundry',  name: 'Foundry',  language: 'Solidity (tests)', chains: 'EVM-compatible',     testing: 'Native (Forge)',   deploy: 'Forge script CLI', plugins: 'Native via CLI',                   strengths: 'Fastest, Rust-based, minimal deps',     cons: 'Less IDE-friendly, newer',          ideal: 'Speed-focused power users',   color: '#f59e0b' },
  { id: 'truffle',  name: 'Truffle (deprecated)', language: 'JavaScript',     chains: 'Ethereum + EVM',     testing: 'Mocha + Chai',     deploy: 'Truffle CLI', plugins: 'Many legacy plugins',           strengths: 'Mature, early leader, good tutorials',  cons: 'Heavier, slower, discontinued',     ideal: 'Beginners, educational use',  color: '#8b5cf6' },
  { id: 'brownie',  name: 'Brownie',  language: 'Python (Solidity/Vyper)', chains: 'Ethereum + EVM',     testing: 'pytest',           deploy: 'CLI + scripts', plugins: 'Moderate',                       strengths: 'Pythonic workflow, easy scripting',     cons: 'Slower updates, Python-only devs',  ideal: 'Python devs, scripting',      color: '#22d3ee' },
  { id: 'anchor',   name: 'Anchor',   language: 'Rust',             chains: 'Solana',            testing: 'Built-in (cargo test)', deploy: 'Anchor CLI', plugins: 'Some',                          strengths: 'Structured Solana dev, Rust-native',    cons: 'Steeper curve, Solana-specific',    ideal: 'Rust devs on Solana',         color: '#39B54A' },
];

const PLATFORMS = [
  { id: 'eth',     name: 'Ethereum (mainnet)', type: 'Public L1',   evm: true,  permissioned: false, language: 'Solidity, Vyper', erc: 'Full',    desc: 'Global consensus (PoS). Most mature ecosystem; high gas, broad tooling.', color: '#627EEA' },
  { id: 'fabric',  name: 'Hyperledger Fabric', type: 'Permissioned', evm: false, permissioned: true,  language: 'Go, Java, JS',    erc: 'None',    desc: 'Pluggable consensus, channel-based privacy. No gas. Enterprise-grade.', color: '#2F6BAC' },
  { id: 'sol',     name: 'Solana',             type: 'Public L1',   evm: false, permissioned: false, language: 'Rust',           erc: 'None',    desc: 'PoH + PoS. High throughput. Rust required; Sealevel parallel runtime.', color: '#9945FF' },
  { id: 'cardano', name: 'Cardano',            type: 'Public L1',   evm: false, permissioned: false, language: 'Plutus (Haskell), Marlowe', erc: 'None', desc: 'UTxO-based, Ouroboros PoS. Formal verification focus.', color: '#0033AD' },
  { id: 'bnb',     name: 'BNB Chain',          type: 'Public L1',   evm: true,  permissioned: false, language: 'Solidity',       erc: 'Full',    desc: 'EVM-compatible fork. Fast, low-cost, broad tool support.', color: '#F0B90B' },
  { id: 'polygon', name: 'Polygon',            type: 'Public L2/sidechain', evm: true, permissioned: false, language: 'Solidity', erc: 'Full', desc: 'EVM. Low fees, Ethereum-compatible bridges.', color: '#8247E5' },
  { id: 'avax',    name: 'Avalanche C-Chain',  type: 'Public L1 + subnets', evm: true, permissioned: false, language: 'Solidity', erc: 'Full', desc: 'EVM-compatible subnets supported. Custom chains possible.', color: '#E84142' },
  { id: 'arb',     name: 'Arbitrum',           type: 'Public L2 (Optimistic)', evm: true, permissioned: false, language: 'Solidity', erc: 'Full', desc: 'Lower fees, uses Ethereum L1 for security. Mature L2.', color: '#28A0F0' },
  { id: 'op',      name: 'Optimism',           type: 'Public L2 (Optimistic)', evm: true, permissioned: false, language: 'Solidity', erc: 'Full', desc: 'Near-identical to Ethereum dev flow. OP Stack used by Base.', color: '#FF0420' },
  { id: 'base',    name: 'Base',               type: 'Public L2 (OP Stack)',   evm: true, permissioned: false, language: 'Solidity', erc: 'Full', desc: 'Coinbase-hosted L2. Same stack as Optimism, friendly UX.', color: '#0052FF' },
  { id: 'near',    name: 'Near Protocol',      type: 'Public L1 (non-EVM)',    evm: false, permissioned: false, language: 'Rust, AssemblyScript', erc: 'Partial (Aurora bridge)', desc: 'Custom toolchain (NEAR CLI), WebAssembly-based.', color: '#000000' },
  { id: 'starknet',name: 'StarkNet',           type: 'Public L2 (ZK-STARK)',   evm: false, permissioned: false, language: 'Cairo',          erc: 'None native',             desc: 'ZK-rollup with custom VM. Cairo language. Growing ecosystem.', color: '#EC796B' },
  { id: 'zksync',  name: 'zkSync Era',         type: 'Public L2 (ZK-EVM)',     evm: true, permissioned: false, language: 'Solidity (ZK-EVM)', erc: 'Full',                  desc: 'Mostly Ethereum-compatible. Verify edge-case compatibility.', color: '#8C8DFC' },
  { id: 'dot',     name: 'Polkadot',           type: 'L0 relay + parachains',  evm: false, permissioned: false, language: 'Ink! (Rust), Solidity via Moonbeam', erc: 'Partial (via Moonbeam)', desc: 'Modular setup, high customisation across parachains.', color: '#E6007A' },
  { id: 'algo',    name: 'Algorand',           type: 'Public L1',              evm: false, permissioned: false, language: 'PyTeal, Reach',  erc: 'None',                    desc: 'Layer-1 logic. Fast finality, pure PoS.', color: '#000000' },
  { id: 'aleo',    name: 'Aleo',               type: 'Public ZK-L1',           evm: false, permissioned: false, language: 'Leo',            erc: 'None',                    desc: 'Privacy-first, ZK-focused. Still emerging.', color: '#005AFF' },
  { id: 'corda',   name: 'Corda',              type: 'Permissioned',           evm: false, permissioned: true,  language: 'Kotlin, Java',   erc: 'No ERC concept',          desc: 'Finance-oriented. State machines, no global gossip.', color: '#FF0F00' },
];

// ═══ INTERACTIVE: ERC EXPLORER ══════════════════════════════════════════════

function ERCExplorer() {
  const [active, setActive] = useState(ERC_DATA[0].id);
  const erc = ERC_DATA.find(e => e.id === active)!;
  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">ERC Standards Explorer</h2>
        <p className="text-muted-foreground text-sm">Click any ERC to see its functions, events, and where it's used in the wild.</p>
      </div>

      <div className="flex-1 min-h-0 flex gap-5">
        {/* Tabs */}
        <div className="flex flex-col gap-2 w-44 shrink-0">
          {ERC_DATA.map(e => (
            <button key={e.id}
              onClick={() => setActive(e.id)}
              className="text-left p-3 rounded-xl border-2 transition-all hover:scale-[1.02]"
              style={{
                borderColor: active === e.id ? e.color : 'transparent',
                backgroundColor: active === e.id ? e.color + '15' : 'var(--card)',
              }}>
              <div className="font-mono font-black text-sm" style={{ color: e.color }}>{e.name}</div>
              <div className="text-[10px] text-muted-foreground">{e.kind}</div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <motion.div key={erc.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="flex-1 grid grid-cols-2 gap-4 min-h-0 overflow-hidden">

          <div className="flex flex-col gap-3 overflow-y-auto">
            <div className="p-3 rounded-xl" style={{ backgroundColor: erc.color + '12' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: erc.color }}>Purpose</div>
              <p className="text-sm text-foreground">{erc.purpose}</p>
            </div>

            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Core functions</div>
              <ul className="space-y-1.5">
                {erc.functions.map(f => (
                  <li key={f} className="font-mono text-xs text-foreground bg-muted px-2 py-1 rounded">{f}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Events</div>
              <ul className="space-y-1.5">
                {erc.events.map(e => (
                  <li key={e} className="font-mono text-xs text-foreground bg-muted px-2 py-1 rounded">{e}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto">
            <div className="p-4 bg-card border rounded-xl" style={{ borderColor: erc.color + '40' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: erc.color }}>Real examples in production</div>
              <div className="text-sm font-semibold text-foreground">{erc.examples}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-card to-transparent border rounded-xl flex-1" style={{ borderColor: erc.color + '40' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: erc.color }}>Key takeaway</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{erc.takeaway}</p>
            </div>
            <a href={`https://eips.ethereum.org/EIPS/${erc.id.replace('erc-', 'eip-')}`}
              target="_blank" rel="noreferrer"
              className="px-3 py-2 rounded-lg text-xs font-bold text-center transition-colors"
              style={{ backgroundColor: erc.color + '15', color: erc.color }}>
              📄 Read the full {erc.name} spec ↗
            </a>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

// ═══ INTERACTIVE: EIP PROCESS FLOW ═══════════════════════════════════════════

function EIPProcessFlow() {
  const [active, setActive] = useState(1);
  const step = EIP_STEPS.find(s => s.i === active)!;
  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#22d3ee]/15 border border-[#22d3ee]/40 text-[#22d3ee] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">How an EIP becomes a standard</h2>
        <p className="text-muted-foreground text-sm">From idea to network upgrade — click any step to see what happens.</p>
      </div>

      <div className="flex-1 min-h-0 flex gap-5">
        {/* Steps column */}
        <div className="flex flex-col gap-1.5 w-72 shrink-0 overflow-y-auto">
          {EIP_STEPS.map(s => (
            <button key={s.i} onClick={() => setActive(s.i)}
              className="text-left p-2 rounded-lg border transition-all flex items-center gap-2"
              style={{
                borderColor: active === s.i ? s.color : 'transparent',
                backgroundColor: active === s.i ? s.color + '12' : 'var(--card)',
              }}>
              <div className="size-7 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                style={{ backgroundColor: s.color }}>
                {s.i}
              </div>
              <div className="font-bold text-xs text-foreground">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <motion.div key={step.i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="flex-1 p-6 bg-card border-2 rounded-2xl flex flex-col gap-4"
          style={{ borderColor: step.color + '50' }}>
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl flex items-center justify-center text-white text-lg font-black"
              style={{ backgroundColor: step.color }}>
              {step.i}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: step.color }}>{step.actor}</div>
              <div className="font-black text-foreground text-xl">{step.label}</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

          {/* Mini timeline */}
          <div className="mt-auto">
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Process timeline</div>
            <div className="flex items-center gap-1">
              {EIP_STEPS.map(s => (
                <div key={s.i}
                  onClick={() => setActive(s.i)}
                  className="flex-1 h-2 rounded-full cursor-pointer transition-colors"
                  style={{ backgroundColor: s.i === active ? s.color : s.i < active ? s.color + '60' : 'var(--muted)' }} />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>idea</span>
              <span>network upgrade</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ═══ INTERACTIVE: FRAMEWORKS COMPARE ════════════════════════════════════════

const FW_ROWS = [
  { key: 'language',  label: 'Language' },
  { key: 'chains',    label: 'Chains supported' },
  { key: 'testing',   label: 'Testing approach' },
  { key: 'deploy',    label: 'Deployment' },
  { key: 'plugins',   label: 'Plugin ecosystem' },
  { key: 'strengths', label: 'Strengths' },
  { key: 'cons',      label: 'Cons' },
  { key: 'ideal',     label: 'Ideal for' },
] as const;

function FrameworksCompare() {
  const [activeRow, setActiveRow] = useState<string>('strengths');
  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">Smart Contract Frameworks · Side by Side</h2>
        <p className="text-muted-foreground text-sm">Click a row label to highlight that comparison dimension across all frameworks.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-[140px_repeat(5,1fr)] gap-2 text-xs overflow-y-auto">
        {/* Header row */}
        <div></div>
        {FRAMEWORKS.map(f => (
          <div key={f.id} className="font-black text-center p-2 rounded-lg" style={{ backgroundColor: f.color + '15', color: f.color }}>
            {f.name}
          </div>
        ))}

        {/* Data rows */}
        {FW_ROWS.map(row => (
          <FwRow key={row.key} row={row} active={activeRow === row.key} onSelect={() => setActiveRow(row.key)} />
        ))}
      </div>
    </div>
  );
}

function FwRow({ row, active, onSelect }: { row: { key: string; label: string }; active: boolean; onSelect: () => void }) {
  return (
    <>
      <button onClick={onSelect}
        className="text-right p-2 font-semibold rounded-lg transition-colors"
        style={{ color: active ? '#6366f1' : 'var(--muted-foreground)', backgroundColor: active ? '#6366f110' : 'transparent' }}>
        {row.label}
      </button>
      {FRAMEWORKS.map(f => (
        <div key={f.id} className="p-2 rounded-lg transition-colors"
          style={{ backgroundColor: active ? f.color + '10' : 'var(--card)', border: '1px solid var(--border)' }}>
          <span className="text-foreground">{(f as any)[row.key]}</span>
        </div>
      ))}
    </>
  );
}

// ═══ INTERACTIVE: PLATFORM CHECKLIST ════════════════════════════════════════

const CHECKLIST = [
  { id: 'evm',       q: 'Need EVM compatibility (broad tooling, audited contracts)?' },
  { id: 'public',    q: 'Public, permissionless network (vs permissioned consortium)?' },
  { id: 'cheap',     q: 'Low transaction fees critical?' },
  { id: 'fast',      q: 'High throughput / low latency required?' },
  { id: 'erc',       q: 'Need full ERC standard support?' },
  { id: 'privacy',   q: 'Privacy-focused (zero-knowledge or permissioned)?' },
  { id: 'enterprise',q: 'Enterprise / regulated industry?' },
  { id: 'devs',      q: 'Large existing developer ecosystem important?' },
];

function PlatformChecklist() {
  const [picks, setPicks] = useState<Record<string, boolean>>({});
  const score = (p: typeof PLATFORMS[number]) => {
    let s = 0;
    if (picks.evm        && p.evm)                                  s += 1;
    if (picks.public     && !p.permissioned)                        s += 1;
    if (picks.cheap      && /L2|Polygon|BNB|Avalanche|Solana|Algo/i.test(p.type + ' ' + p.name)) s += 1;
    if (picks.fast       && /Solana|Algorand|Avalanche|Near|Polygon|L2/i.test(p.type + ' ' + p.name)) s += 1;
    if (picks.erc        && /Full/i.test(p.erc))                    s += 1;
    if (picks.privacy    && (p.permissioned || /Aleo|StarkNet/.test(p.name))) s += 1;
    if (picks.enterprise && (p.permissioned || /Hyperledger|Corda/.test(p.name))) s += 1;
    if (picks.devs       && /Ethereum|Polygon|Arbitrum|BNB|Solana/.test(p.name)) s += 1;
    return s;
  };
  const ranked = [...PLATFORMS].map(p => ({ p, score: score(p) })).sort((a, b) => b.score - a.score);
  const top    = ranked.slice(0, 5);
  const anyPicked = Object.values(picks).some(Boolean);

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#39B54A]/15 border border-[#39B54A]/40 text-[#39B54A] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">Platform Selection Checklist</h2>
        <p className="text-muted-foreground text-sm">Toggle the requirements that matter for your use case. The top 5 matching platforms surface live.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
        {/* Checklist */}
        <div className="flex flex-col gap-2 overflow-y-auto pr-2">
          {CHECKLIST.map(c => (
            <button key={c.id} onClick={() => setPicks(p => ({ ...p, [c.id]: !p[c.id] }))}
              className="flex items-center gap-3 p-3 bg-card border-2 rounded-xl text-left transition-colors hover:bg-muted/30"
              style={{ borderColor: picks[c.id] ? '#39B54A' : 'var(--border)' }}>
              <div className="size-5 rounded border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: picks[c.id] ? '#39B54A' : 'var(--muted-foreground)', backgroundColor: picks[c.id] ? '#39B54A' : 'transparent' }}>
                {picks[c.id] && <span className="text-white text-xs font-black">✓</span>}
              </div>
              <span className="text-sm font-medium text-foreground">{c.q}</span>
            </button>
          ))}
        </div>

        {/* Top matches */}
        <div className="flex flex-col gap-2 overflow-y-auto">
          <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">Top matches</div>
          {!anyPicked ? (
            <div className="p-4 rounded-xl border border-dashed border-border flex-1 flex items-center justify-center">
              <p className="text-xs text-muted-foreground italic text-center">Toggle some requirements on the left to see ranked recommendations.</p>
            </div>
          ) : top.map(({ p, score }, i) => (
            <div key={p.id} className="p-3 bg-card border rounded-xl flex items-center gap-3"
              style={{ borderColor: p.color + '40' }}>
              <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0" style={{ backgroundColor: p.color }}>{i + 1}</div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-sm text-foreground">{p.name}</div>
                <div className="text-[10px] text-muted-foreground">{p.type}</div>
              </div>
              <div className="font-mono font-black text-sm" style={{ color: p.color }}>{score}/{Object.values(picks).filter(Boolean).length}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══ INTERACTIVE: PLATFORMS TABLE ════════════════════════════════════════════

function PlatformsTable() {
  const [filter, setFilter] = useState<'all' | 'evm' | 'public' | 'permissioned' | 'l2'>('all');

  const filtered = PLATFORMS.filter(p => {
    if (filter === 'evm')          return p.evm;
    if (filter === 'public')       return !p.permissioned;
    if (filter === 'permissioned') return p.permissioned;
    if (filter === 'l2')           return /L2/.test(p.type);
    return true;
  });

  const filterButton = (key: typeof filter, label: string) => (
    <button onClick={() => setFilter(key)}
      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
      style={{
        backgroundColor: filter === key ? '#6366f1' : 'var(--muted)',
        color: filter === key ? 'white' : 'var(--muted-foreground)',
      }}>
      {label}
    </button>
  );

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3 flex items-start justify-between gap-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🧩 Interactive</span>
          <h2 className="text-2xl font-bold text-foreground mt-1">Platforms · Filter & Compare</h2>
          <p className="text-muted-foreground text-sm">17 production platforms — filter by capability.</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filterButton('all',          'All')}
          {filterButton('evm',          'EVM')}
          {filterButton('public',       'Public')}
          {filterButton('permissioned', 'Permissioned')}
          {filterButton('l2',           'L2')}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-background">
            <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
              <th className="p-2 font-semibold">Platform</th>
              <th className="p-2 font-semibold">Type</th>
              <th className="p-2 font-semibold">EVM</th>
              <th className="p-2 font-semibold">Language</th>
              <th className="p-2 font-semibold">ERC</th>
              <th className="p-2 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                <td className="p-2 font-bold text-foreground" style={{ color: p.color }}>{p.name}</td>
                <td className="p-2 text-muted-foreground">{p.type}</td>
                <td className="p-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                    style={{ backgroundColor: p.evm ? '#39B54A20' : '#ED1C2420', color: p.evm ? '#39B54A' : '#ED1C24' }}>
                    {p.evm ? 'YES' : 'NO'}
                  </span>
                </td>
                <td className="p-2 font-mono text-[11px] text-muted-foreground">{p.language}</td>
                <td className="p-2 text-muted-foreground">{p.erc}</td>
                <td className="p-2 text-muted-foreground leading-snug">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══ MAIN ═══════════════════════════════════════════════════════════════════

export function SC_Section6() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={chapters} accentColor="#6366f1" />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 06"
            title="Build & Integration"
            subtitle="Standards, frameworks, platforms, and integration patterns for taking smart contracts to production"
            icon={<Wrench className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#22d3ee]"
          />
        </div>

        {/* ═══════ STANDARDS INTRO ═══════ */}
        <div id="s6-standards-intro" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Smart Contract Standards</h2>
            <p className="text-muted-foreground text-sm mt-1">Formalised guidelines that make smart contracts interoperable, secure, and predictable across platforms.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { name: 'Token standards (ERCs)', emoji: '🪙', color: '#6366f1', items: ['ERC-20 (fungible)', 'ERC-721 (NFTs)', 'ERC-1155 (multi-token)'] },
              { name: 'Identity standards',     emoji: '🆔', color: '#8b5cf6', items: ['DID (Decentralized Identifiers)', 'Verifiable Credentials', 'EUDI Wallet (EU)', 'W3C VC standard'] },
              { name: 'Governance modules',     emoji: '🏛', color: '#39B54A', items: ['Standard voting contracts', 'Proposal patterns', 'OpenZeppelin Governor'] },
            ].map(c => (
              <div key={c.name} className="p-5 bg-card border rounded-xl flex flex-col gap-3" style={{ borderColor: c.color + '40' }}>
                <div className="text-4xl">{c.emoji}</div>
                <div className="font-black text-foreground">{c.name}</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {c.items.map(i => (
                    <li key={i} className="flex gap-1.5"><span style={{ color: c.color }}>›</span>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Why standards matter:</span> they enable interoperability with wallets, exchanges (CEX/DEX), DeFi protocols, marketplaces, and other dApps — by ensuring consistent behaviors and interfaces. Inheriting from a standard means your contract works "out of the box" with the entire ecosystem.
          </div>
        </div>

        {/* ═══════ ERC EXPLAIN ═══════ */}
        <div id="s6-erc-explain" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What is an ERC?</h2>
            <p className="text-muted-foreground text-sm mt-1">"Ethereum Request for Comments" — community-driven proposals that become standards.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#6366f1]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#6366f1]">Definition</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                An <span className="font-semibold text-foreground">ERC</span> is a set of proposals from the Ethereum community suggesting new features and improvements to the Ethereum network. Each ERC defines specific functions, interfaces, and behaviors enabling compatibility across wallets, exchanges, and other Ethereum-based tools.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The naming follows other open standards bodies — IETF RFCs, Python PEPs, Bitcoin BIPs. Ethereum took inspiration from all of them to create the EIP/ERC process.
              </p>
            </div>
            <div className="p-5 bg-card border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#8b5cf6]">EIPs vs ERCs</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#8b5cf6]">›</span><span className="font-semibold text-foreground">EIP</span> = Ethereum Improvement Proposal — covers protocol-level, networking, ERC, and informational changes</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6]">›</span><span className="font-semibold text-foreground">ERC</span> = a sub-category of EIPs specifically for application-level standards (tokens, contracts, conventions)</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6]">›</span>All ERCs are EIPs, but not all EIPs are ERCs</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6]">›</span>Both follow the same standardization process</li>
              </ul>
              <a href="https://eips.ethereum.org/erc" target="_blank" rel="noreferrer"
                className="self-start px-3 py-1.5 rounded-lg bg-[#8b5cf6]/15 text-[#8b5cf6] text-xs font-bold hover:bg-[#8b5cf6]/25 transition-colors">
                📚 Browse all ERCs ↗
              </a>
            </div>
          </div>
        </div>

        {/* ═══════ INTERACTIVE: ERC EXPLORER ═══════ */}
        <div id="s6-erc-table" className="h-full">
          <ERCExplorer />
        </div>

        {/* ═══════ WHY STANDARDS EVOLVE ═══════ */}
        <div id="s6-erc-evolve" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Why Standards Evolve</h2>
            <p className="text-muted-foreground text-sm mt-1">New use cases emerge; old standards expose limitations; community innovation drives proposals forward.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { emoji: '🚀', title: 'New use cases', color: '#6366f1', desc: 'DAOs, decentralized identity, gaming, DePIN — each expansion of the ecosystem reveals patterns that benefit from formal standardization.' },
              { emoji: '🔍', title: 'Limitations exposed', color: '#ED1C24', desc: 'ERC-721 had no royalty mechanism — leading to ERC-2981. Marketplaces ignored royalties → led to operator filters → led to renewed efforts.' },
              { emoji: '💡', title: 'Community innovation', color: '#39B54A', desc: 'Anyone can submit an EIP. Community discussion through Magicians forum, GitHub, AllCoreDevs calls drives proposals to maturity.' },
            ].map(c => (
              <div key={c.title} className="p-5 bg-card border rounded-xl flex flex-col gap-3" style={{ borderColor: c.color + '30' }}>
                <div className="text-4xl">{c.emoji}</div>
                <div className="font-black text-sm" style={{ color: c.color }}>{c.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/06 text-xs text-muted-foreground">
            <span className="font-bold text-[#f59e0b]">Real example:</span> ERC-2981 (NFT royalty standard) was created because ERC-721 had no built-in mechanism for royalty enforcement. Artists were not getting paid on secondary sales. ERC-2981 standardized the royaltyInfo function so marketplaces could query and respect royalties automatically. The standard process took ~2 years from proposal to widespread adoption.
          </div>
        </div>

        {/* ═══════ INTERACTIVE: EIP PROCESS ═══════ */}
        <div id="s6-eip-process" className="h-full">
          <EIPProcessFlow />
        </div>

        {/* ═══════ ERC-20 OPENZEPPELIN EXAMPLE ═══════ */}
        <div id="s6-erc-example" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">ERC-20 in Solidity · OpenZeppelin</h2>
            <p className="text-muted-foreground text-sm mt-1">The audited, battle-tested way to deploy a fungible token.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#6366f1]/30 rounded-xl flex flex-col">
              <div className="text-xs font-semibold text-muted-foreground mb-2">MyToken.sol</div>
              <pre className="flex-1 bg-muted p-3 rounded-lg text-[11px] font-mono text-foreground overflow-auto leading-relaxed">{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Pull in the audited ERC-20 base from OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        // Mint to the deployer, scaled by 18 decimals
        _mint(msg.sender, initialSupply * (10 ** uint256(decimals())));
    }
}`}</pre>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">What this code gives you</div>
              {[
                { label: 'Importing', desc: 'import "@openzeppelin/contracts/…/ERC20.sol"; brings in all the audited functions, events, and behaviors of the ERC-20 standard.', color: '#6366f1' },
                { label: 'Inheriting', desc: 'contract MyToken is ERC20 — your contract follows the standard interface. Wallets, DEXs, block explorers all recognise it without configuration.', color: '#8b5cf6' },
                { label: 'Extending', desc: 'You can add custom logic on top — burn(), pause(), mint controls, transfer fees — by inheriting more OpenZeppelin modules.', color: '#22d3ee' },
                { label: 'Compatibility', desc: 'Because you inherit ERC-20 from OpenZeppelin, your token works out-of-the-box with wallets, DEXs, and indexers — no integrations to write.', color: '#39B54A' },
              ].map(p => (
                <div key={p.label} className="p-3 bg-card border rounded-xl" style={{ borderColor: p.color + '30' }}>
                  <div className="font-bold text-sm" style={{ color: p.color }}>{p.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
                </div>
              ))}
              <div className="p-3 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-xl text-xs text-muted-foreground mt-auto">
                <span className="font-bold text-[#39B54A]">Why use OpenZeppelin?</span> The contracts are audited, battle-tested in billions of dollars of value. Writing your own ERC-20 from scratch is a security risk you almost never need to take.
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ FRAMEWORKS INTRO ═══════ */}
        <div id="s6-frameworks-intro" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Smart Contract Frameworks</h2>
            <p className="text-muted-foreground text-sm mt-1">Developer toolkits for the entire contract lifecycle — write, compile, test, deploy, upgrade.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">Project lifecycle</div>
              {[
                { emoji: '📁', label: 'Project scaffolding', desc: 'Folder structure, config files, sensible defaults' },
                { emoji: '⚙️', label: 'Compilation', desc: 'Compile Solidity → bytecode + ABI; manage compiler versions' },
                { emoji: '🧪', label: 'Local blockchain simulation', desc: 'Spin up an in-memory chain with funded test accounts' },
                { emoji: '📜', label: 'Scriptable deployments', desc: 'Reproducible deploys to testnets and mainnets' },
                { emoji: '🔬', label: 'Testing frameworks', desc: 'Unit and integration tests with assertions and fixtures' },
              ].map(f => (
                <div key={f.label} className="p-2.5 bg-card border border-border rounded-lg flex items-start gap-3">
                  <div className="text-xl shrink-0">{f.emoji}</div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{f.label}</div>
                    <div className="text-xs text-muted-foreground">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest">Production capabilities</div>
              {[
                { emoji: '⛽', label: 'Gas analysis', desc: 'Per-function gas usage; optimise hot paths before deployment' },
                { emoji: '✅', label: 'Contract verification', desc: 'Submit source to Etherscan/Sourcify — increases user trust' },
                { emoji: '🌐', label: 'Frontend integration', desc: 'ABI generation, TypeScript types, wagmi/ethers helpers' },
                { emoji: '🧩', label: 'Plugin ecosystem', desc: 'Extend with linting, deployment helpers, security scanners' },
                { emoji: '🔄', label: 'Upgradeable contracts', desc: 'Proxy patterns (UUPS, Transparent) for live upgrades' },
              ].map(f => (
                <div key={f.label} className="p-2.5 bg-card border border-border rounded-lg flex items-start gap-3">
                  <div className="text-xl shrink-0">{f.emoji}</div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{f.label}</div>
                    <div className="text-xs text-muted-foreground">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ INTERACTIVE: FRAMEWORKS COMPARE ═══════ */}
        <div id="s6-frameworks-table" className="h-full">
          <FrameworksCompare />
        </div>

        {/* ═══════ TOOLS GRID ═══════ */}
        <div id="s6-tools" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Useful Tools</h2>
            <p className="text-muted-foreground text-sm mt-1">Web-based playgrounds and learning resources every smart contract developer should know.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 content-center">
            {[
              { name: 'Remix IDE',          url: 'remix.ethereum.org',     emoji: '🧪', color: '#6366f1', desc: 'Browser-based Solidity IDE — write, compile, deploy, debug, all in your browser. Ideal for prototyping.' },
              { name: 'Eth.build',          url: 'eth.build',              emoji: '🛠', color: '#8b5cf6', desc: 'Visual sandbox for understanding Ethereum mechanics — drag-and-drop building of contract interactions.' },
              { name: 'SpeedRun Ethereum',  url: 'speedrunethereum.com',   emoji: '🏃', color: '#22d3ee', desc: 'Curriculum of progressively harder challenges — staker, vendor, dice game, multi-sig — gives you portfolio projects.' },
              { name: 'Scaffold-ETH',       url: 'scaffoldeth.io',         emoji: '🏗', color: '#39B54A', desc: 'Open-source toolkit for building dApps on Ethereum. Comes with Hardhat, Next.js, ethers, debug UI — full stack.' },
            ].map(t => (
              <a key={t.name} href={`https://${t.url}`} target="_blank" rel="noreferrer"
                className="p-5 bg-card border rounded-xl flex flex-col gap-3 hover:scale-[1.02] transition-transform"
                style={{ borderColor: t.color + '40' }}>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: t.color + '15' }}>{t.emoji}</div>
                  <div>
                    <div className="font-black text-base" style={{ color: t.color }}>{t.name}</div>
                    <div className="text-xs font-mono text-muted-foreground">{t.url} ↗</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* ═══════ INTERACTIVE: PLATFORM CHECKLIST ═══════ */}
        <div id="s6-platform-checklist" className="h-full">
          <PlatformChecklist />
        </div>

        {/* ═══════ INTERACTIVE: PLATFORMS TABLE ═══════ */}
        <div id="s6-platform-table" className="h-full">
          <PlatformsTable />
        </div>

        {/* ═══════ USE CASE → PLATFORM ═══════ */}
        <div id="s6-platform-usecase" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Use Case → Recommended Platforms</h2>
            <p className="text-muted-foreground text-sm mt-1">Quick-reference mapping from common use cases to platforms that fit them.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 content-center">
            {[
              { use: 'DeFi / NFT',                 platforms: 'Ethereum · Arbitrum · Optimism · Polygon · BNB Chain · zkSync', color: '#6366f1' },
              { use: 'Low-Cost dApps',             platforms: 'Polygon · BNB Chain · Avalanche · zkSync · Base',              color: '#8b5cf6' },
              { use: 'High Throughput / Gaming',   platforms: 'Solana · Near · Polygon · Arbitrum · Avalanche subnets',       color: '#39B54A' },
              { use: 'Privacy-focused',            platforms: 'Aleo · StarkNet · Secret Network (Cosmos) · zkSync',          color: '#22d3ee' },
              { use: 'Enterprise / Consortium',    platforms: 'Hyperledger Fabric · Corda · Quorum',                          color: '#f59e0b' },
              { use: 'Multi-chain / Interoperable',platforms: 'Cosmos · Near · Polkadot (via Moonbeam) · LayerZero',         color: '#ec4899' },
            ].map(c => (
              <div key={c.use} className="p-4 bg-card border rounded-xl" style={{ borderColor: c.color + '30' }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: c.color }}>{c.use}</div>
                <div className="text-sm font-semibold text-foreground">{c.platforms}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ INTEGRATION INTRO ═══════ */}
        <div id="s6-integration-intro" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Integration Best Practices</h2>
            <p className="text-muted-foreground text-sm mt-1">Connecting smart contracts to existing systems without breaking either side.</p>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <div className="max-w-3xl text-center space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                Seamless integration is essential — existing software systems should keep operating efficiently while harnessing the benefits of automation, transparency, and trust. Five integration patterns dominate production deployments:
              </p>
              <div className="grid grid-cols-5 gap-3 mt-6">
                {[
                  { num: '01', label: 'Node infrastructure',    color: '#6366f1' },
                  { num: '02', label: 'API & middleware',       color: '#8b5cf6' },
                  { num: '03', label: 'Event-driven architecture', color: '#22d3ee' },
                  { num: '04', label: 'Oracle orchestration',   color: '#f59e0b' },
                  { num: '05', label: 'On vs off-chain data',   color: '#39B54A' },
                ].map(p => (
                  <div key={p.num} className="p-3 bg-card border rounded-xl" style={{ borderColor: p.color + '40' }}>
                    <div className="font-mono font-black text-xl" style={{ color: p.color }}>{p.num}</div>
                    <div className="text-xs font-semibold text-foreground mt-1">{p.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ NODES ═══════ */}
        <div id="s6-integration-nodes" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-1">Pattern 01</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Node Infrastructure</h2>
            <p className="text-muted-foreground text-sm mt-1">Every interaction with a smart contract passes through a node. Choose carefully.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { title: 'Run your own node', emoji: '🏠', color: '#39B54A',
                pros: ['Full control', 'Compliance-friendly (no third-party logs)', 'Lower latency for high-volume apps', 'No rate limits'],
                cons: ['Operational overhead', 'Hardware + bandwidth cost', 'Sync time (hours to days)', 'Pager duty for outages'] },
              { title: 'Managed providers', emoji: '☁️', color: '#6366f1',
                pros: ['Zero ops burden', 'Multi-region SLA', 'Scales automatically', 'Fast to start'],
                cons: ['Rate limits / pricing tiers', 'Trust the provider', 'Dependency on a third party', 'Possible single point of failure'] },
              { title: 'Hybrid', emoji: '🔄', color: '#8b5cf6',
                pros: ['Best of both worlds', 'Provider for dev/staging', 'Self-hosted for production validation', 'Resilience via redundancy'],
                cons: ['Two systems to maintain', 'More complex deployment', 'Sync logic between sources', 'Higher initial setup cost'] },
            ].map(c => (
              <div key={c.title} className="p-4 bg-card border rounded-xl flex flex-col gap-3" style={{ borderColor: c.color + '30' }}>
                <div className="flex items-center gap-2">
                  <div className="text-3xl">{c.emoji}</div>
                  <div className="font-black text-sm" style={{ color: c.color }}>{c.title}</div>
                </div>
                <div className="text-[10px] font-bold text-[#39B54A] uppercase tracking-widest">Pros</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {c.pros.map(p => <li key={p} className="flex gap-1.5"><span className="text-[#39B54A]">›</span>{p}</li>)}
                </ul>
                <div className="text-[10px] font-bold text-[#ED1C24] uppercase tracking-widest mt-2">Cons</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {c.cons.map(p => <li key={p} className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-3 p-2 rounded-lg bg-muted/40 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Common providers:</span> Infura · Alchemy · QuickNode · Ankr · Blast API · Tenderly. <span className="font-semibold text-foreground">Self-host:</span> Geth · Nethermind · Besu · Erigon · Reth.
          </div>
        </div>

        {/* ═══════ API & MIDDLEWARE ═══════ */}
        <div id="s6-integration-api" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest mb-1">Pattern 02</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">API & Middleware</h2>
            <p className="text-muted-foreground text-sm mt-1">Bridges between smart contracts and legacy systems (ERPs, CRMs, databases).</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest">What middleware does</div>
              {[
                { emoji: '🔧', label: 'Trigger contract functions', desc: 'Off-chain backend calls a contract method without manual blockchain knowledge' },
                { emoji: '📊', label: 'Pull data for dashboards', desc: 'Index events and state for analytics, reporting, user-facing UIs' },
                { emoji: '🎭', label: 'Abstract complexity', desc: 'Wallet connection, gas estimation, RPC retries — handled by the library' },
              ].map(p => (
                <div key={p.label} className="p-3 bg-card border border-border rounded-xl flex items-start gap-3">
                  <div className="text-2xl shrink-0">{p.emoji}</div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{p.label}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest">Common stacks</div>
              {[
                { name: 'Ethers.js / viem', desc: 'Direct contract interaction libraries — closest to the metal. Most production dApps use these.', color: '#6366f1' },
                { name: 'The Graph', desc: 'Decentralized indexer — write a "subgraph" that turns on-chain events into a queryable GraphQL API.', color: '#8b5cf6' },
                { name: 'Moralis', desc: 'Web3-as-a-service: indexed data, cross-chain APIs, auth. Faster to start, but more vendor lock-in.', color: '#22d3ee' },
                { name: 'Alchemy SDK / Infura SDK', desc: 'Provider-specific SDKs with batching, websockets, and enriched APIs (NFT metadata, transaction history).', color: '#39B54A' },
              ].map(s => (
                <div key={s.name} className="p-3 bg-card border rounded-xl" style={{ borderColor: s.color + '30' }}>
                  <div className="font-bold text-sm" style={{ color: s.color }}>{s.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ EVENTS ═══════ */}
        <div id="s6-integration-events" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-widest mb-1">Pattern 03</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Event-Driven Architecture</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contracts emit events. Off-chain services listen and act on them — like webhooks for the blockchain.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#22d3ee]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#22d3ee]">How it flows</div>
              <ol className="text-xs text-muted-foreground space-y-2 flex-1 list-decimal list-inside">
                <li>Smart contract executes a function and emits an event (e.g. <code className="text-foreground">PaymentReceived(buyer, amount)</code>)</li>
                <li>Off-chain service subscribes to that event via Web3 WebSocket / The Graph / Moralis</li>
                <li>On event arrival, the service triggers downstream actions: update CRM, send email, generate document, update dashboard</li>
                <li>State stays in sync between blockchain and traditional systems</li>
              </ol>
            </div>
            <div className="p-5 bg-card border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#39B54A]">Real-world examples</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span><span className="font-semibold text-foreground">Supply chain:</span> Delivery confirmed event → ERP marks invoice as paid → notify finance</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span><span className="font-semibold text-foreground">DeFi:</span> Liquidity added event → analytics dashboard updates → user gets push notification</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span><span className="font-semibold text-foreground">Compliance:</span> Large transfer event → AML system creates suspicious activity report</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span><span className="font-semibold text-foreground">Gaming:</span> Item minted event → Discord bot announces in player guild channel</li>
              </ul>
              <div className="p-2 bg-[#39B54A]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                <span className="font-semibold text-foreground">Why it matters:</span> real-time responsiveness for dynamic workflows like supply chain updates, DeFi flows, or compliance alerts.
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ ORACLES ═══════ */}
        <div id="s6-integration-oracles" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest mb-1">Pattern 04</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Orchestration with Oracles</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contracts can't natively access real-world data. Oracles are the bridges.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#f59e0b]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#f59e0b]">What oracles do</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#f59e0b]">›</span><span className="font-semibold text-foreground">Pull data:</span> weather, stock prices, sports scores, ID verification, IoT sensor readings</li>
                <li className="flex gap-2"><span className="text-[#f59e0b]">›</span><span className="font-semibold text-foreground">Push events:</span> trigger an IoT actuator, notify a user via Telegram, send a text message</li>
                <li className="flex gap-2"><span className="text-[#f59e0b]">›</span><span className="font-semibold text-foreground">Compute off-chain:</span> run heavy computation, submit only the result on-chain</li>
                <li className="flex gap-2"><span className="text-[#f59e0b]">›</span><span className="font-semibold text-foreground">Cross-chain:</span> bridge state between blockchains</li>
              </ul>
              <div className="p-2 bg-[#ED1C24]/10 rounded-lg text-xs text-muted-foreground">
                <span className="font-semibold text-[#ED1C24]">Critical:</span> a single oracle = a single point of failure. Use decentralized oracle networks for any value-bearing contract.
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest">Choose by use case</div>
              {[
                { name: 'Chainlink',     desc: 'Industry standard. Decentralized network, broad data feeds, strong security track record.', color: '#375BD2' },
                { name: 'Pyth Network',  desc: 'High-frequency financial data — direct from exchanges and market makers. ~400ms latency.', color: '#8b5cf6' },
                { name: 'API3',          desc: 'First-party oracles — data providers run their own nodes. No middleman.', color: '#6366f1' },
                { name: 'UMA Optimistic',desc: 'Assume data correct unless disputed within a window. Cheaper, slower for edge cases.', color: '#f59e0b' },
              ].map(o => (
                <div key={o.name} className="p-3 bg-card border border-border rounded-xl flex items-start gap-2">
                  <div className="px-2 py-0.5 rounded font-bold text-xs shrink-0 text-white" style={{ backgroundColor: o.color }}>{o.name}</div>
                  <div className="text-xs text-muted-foreground">{o.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ DATA ON/OFF-CHAIN ═══════ */}
        <div id="s6-integration-data" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest mb-1">Pattern 05</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Data Management · On-chain vs Off-chain</h2>
            <p className="text-muted-foreground text-sm mt-1">Blockchain is not designed for large-scale, mutable, or sensitive data. Be deliberate.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#39B54A]">Store on-chain</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Hashes (proof of existence, integrity anchors)</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Identifiers / IDs / minimal metadata</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>State transitions and ownership records</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Permissions and access rules</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Anything that NEEDS the trust guarantees of the chain</li>
              </ul>
            </div>
            <div className="p-5 bg-card border border-[#ED1C24]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#ED1C24]">Keep off-chain</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span>Documents, images, video — too expensive on-chain</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span>PII (names, emails, health data) — privacy / GDPR risk</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span>Mutable data (frequently changing values, indexes)</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span>Bulk historical data (move to archive nodes / data lakes)</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span>Anything you might need to delete (right to be forgotten)</li>
              </ul>
            </div>
          </div>
          <div className="shrink-0 mt-4 grid grid-cols-4 gap-3">
            {[
              { name: 'IPFS',     desc: 'Content-addressed; pin via Pinata or Filebase', color: '#65C2CB' },
              { name: 'Filecoin', desc: 'IPFS + paid persistence with crypto-economic guarantees', color: '#0090FF' },
              { name: 'Arweave',  desc: 'One-time payment for permanent storage', color: '#000000' },
              { name: 'BTFS',     desc: 'BitTorrent-based decentralized storage on TRON', color: '#FF0021' },
            ].map(s => (
              <div key={s.name} className="p-3 bg-card border border-border rounded-xl text-center">
                <div className="font-mono font-black text-sm" style={{ color: s.color }}>{s.name}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ AI-DRIVEN DEV ═══════ */}
        <div id="s6-ai-dev" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">AI-Driven Smart Contract Development</h2>
            <p className="text-muted-foreground text-sm mt-1">Use AI tools where they shine — and know where they don't belong.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#39B54A]">✓ Where AI helps</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span><span className="font-semibold text-foreground">Ideation:</span> brainstorm contract designs, explore alternatives</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span><span className="font-semibold text-foreground">Documentation:</span> generate NatSpec, README, function docs</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span><span className="font-semibold text-foreground">Project overview / business plan:</span> structure, edit, polish</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span><span className="font-semibold text-foreground">Prototyping:</span> Remix + ChatGPT for quick PoCs and learning</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span><span className="font-semibold text-foreground">Coding agents</span> (Codex, Claude Code) for actual implementation work — much better than chat</li>
              </ul>
              <div className="p-2 bg-[#39B54A]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                Use AI as a faster way to learn, prototype, and document. Treat its output as a draft.
              </div>
            </div>
            <div className="p-5 bg-card border border-[#ED1C24]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#ED1C24]">✗ Where AI does NOT belong</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span><span className="font-semibold text-foreground">Production smart contracts</span> without expert review and audit</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span><span className="font-semibold text-foreground">Security-critical logic</span> — AI hallucinates plausible-looking but vulnerable code</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span><span className="font-semibold text-foreground">Trusting outputs blindly</span> — verify every line, especially around access control and arithmetic</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span><span className="font-semibold text-foreground">Replacing audits</span> — AI cannot reliably catch reentrancy, oracle manipulation, MEV, or flash-loan attacks</li>
              </ul>
              <div className="p-2 bg-[#ED1C24]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                <span className="font-bold text-[#ED1C24]">Bottom line:</span> AI accelerates prototyping and learning. Production contracts still require human expertise, peer review, and professional audit.
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s6-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 06 — Key Takeaways"
            takeaways={[
              'Standards (ERC-20/721/777/1155/2981) make contracts interoperable with the entire wallet/exchange/marketplace ecosystem',
              'EIP process is open: anyone can propose; community + clients + AllCoreDevs decide. From idea to network upgrade can take months to years',
              'Use OpenZeppelin contracts as your base — audited, battle-tested, save you from rolling your own ERC-20',
              'Hardhat / Foundry are the dominant frameworks for EVM. Foundry is fastest; Hardhat is most extensible. Brownie/Truffle are legacy. Anchor for Solana',
              'Free tools to know: remix.ethereum.org · eth.build · speedrunethereum.com · scaffoldeth.io',
              'Platform selection is multi-dimensional: EVM compatibility · public vs permissioned · throughput · cost · ecosystem · regulatory fit',
              'Integration patterns: nodes (own/managed/hybrid) · APIs (Ethers, viem) · events (subscribe + react) · oracles (Chainlink/Pyth) · on/off-chain split',
              'AI helps with ideation, prototyping, documentation. AI does NOT replace audits, security review, or expert engineering for production code',
            ]}
          />
        </div>

        {/* ═══════ FINAL QUIZ ═══════ */}
        <div id="s6-final-quiz" className="h-full">
          <QuizSlide
            question="Your team is building a tokenized real-estate platform. You need: (a) full ERC-20 and ERC-721 support, (b) low gas fees for frequent rent distributions, (c) the ability to deploy proven smart contracts (OpenZeppelin), (d) a regulated EU market presence. Which platform stack fits BEST?"
            options={[
              { text: 'Hyperledger Fabric — permissioned, enterprise-grade, no gas fees.', correct: false },
              { text: 'Solana — high throughput, low cost, fast finality.', correct: false },
              { text: 'Polygon (or Arbitrum / Base) — EVM-compatible L2 with full ERC support, low gas fees, OpenZeppelin compatibility, and EU MiCA framework awareness.', correct: true },
              { text: 'Cardano — formal verification focus, Plutus/Marlowe for finance.', correct: false },
            ]}
            explanation="The use case has 4 specific constraints: full ERC support (rules out non-EVM Solana, Cardano, Hyperledger Fabric), low gas (rules out Ethereum L1 mainnet for frequent distributions), OpenZeppelin compatibility (favors EVM), and EU regulatory fit (favors public chains with MiCA-compliant pathways). Polygon, Arbitrum, and Base all check every box. Hyperledger Fabric is great for enterprise but has zero ERC support and would force you to rebuild every standard. Solana is fast but requires Rust + custom token standards. Cardano's tooling is less mature for tokenized real-estate. The answer is an EVM-compatible L2."
          />
        </div>

        </div>
      </div>
    </div>
  );
}
