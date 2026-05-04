import { useState } from 'react';
import { motion } from 'motion/react';
import { ConceptSlide } from '../../components/templates/ConceptSlide';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Network } from 'lucide-react';

const chapters = [
  { id: 's4-interop',  label: 'Interoperability' },
  { id: 's4-bridges',  label: 'Bridge Security' },
  { id: 's4-cosmos',   label: 'Cosmos' },
  { id: 's4-cosmos-eco', label: 'Cosmos Apps' },
  { id: 's4-layer0', label: 'Layer 0' },
  { id: 's4-xrp', label: 'XRP Ledger' },
  { id: 's4-xrp-eco', label: 'XRP Apps' },
  { id: 's4-starknet', label: 'Starknet' },
  { id: 's4-starknet-eco', label: 'Starknet Apps' },
  { id: 's4-layer2',   label: 'Layer 2: Optimistic vs ZK' },
  { id: 's4-l2apps',   label: 'L2 App Landscape' },
  { id: 's4-privacy',  label: 'Privacy' },
  { id: 's4-evaluate', label: 'Evaluate a Project' },
  { id: 's4-decision', label: 'Decision Framework' },
  { id: 's4-quiz',     label: 'Quiz' },
  { id: 's4-takeaways', label: 'Takeaways' },
];

export function BP_Section4() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={chapters} />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 04"
            title="Interoperability & New Trends"
            subtitle="Connecting blockchains — Cosmos, Layer 0, and Starknet"
            icon={<Network className="size-20 text-[#22d3ee]" />}
            gradient="from-[#22d3ee] to-[#6366f1]"
          />
        </div>

        {/* ═══════ S4-INTEROP ═══════ */}
        <div id="s4-interop" className="h-full flex flex-col p-6 lg:p-10">
          <div className="mb-4 lg:mb-6">
            <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-1 lg:mb-2">
              The Interoperability Problem
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground">
              Bitcoin, Ethereum, Solana, and Hyperledger Fabric each operate as isolated networks — they cannot natively communicate with each other.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-0">
            {/* Left — Blockchain Islands */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="size-2 rounded-full bg-[#22d3ee]" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground">Blockchain Islands</h3>
              </div>
              <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                Each major blockchain — Bitcoin, Ethereum, Solana, Hyperledger Fabric — is a sovereign network with its own consensus, tokens, and state. They do not speak to each other natively. The result is fragmented ecosystems that cannot collaborate without external infrastructure.
              </p>

              {/* Problem cards */}
              {[
                {
                  emoji: '🏝️',
                  title: 'Asset Silos',
                  desc: 'BTC is locked on the Bitcoin network. It cannot be used natively in Ethereum DeFi protocols — you need a wrapped token (WBTC) which introduces custodial risk.',
                },
                {
                  emoji: '🌉',
                  title: 'Bridge Hacks',
                  desc: 'Cross-chain bridges are high-value attack vectors. Over $2B+ stolen: Ronin $625M, Wormhole $320M, Nomad $190M. Bridges are the weakest link in interoperability.',
                },
                {
                  emoji: '🔄',
                  title: 'Fragmented Liquidity',
                  desc: 'Each chain has its own DEXs, liquidity pools, and markets. Capital cannot flow freely — a trader on Ethereum cannot access a better price on Solana without friction.',
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 p-3 lg:p-4 bg-card rounded-xl border border-[#22d3ee]/20 hover:border-[#22d3ee]/60 transition-colors"
                >
                  <span className="text-xl lg:text-2xl flex-shrink-0">{card.emoji}</span>
                  <div>
                    <p className="text-sm lg:text-base font-semibold text-foreground">{card.title}</p>
                    <p className="text-xs lg:text-sm text-muted-foreground mt-0.5 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right — Why it matters */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="size-2 rounded-full bg-[#6366f1]" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground">Why It Matters</h3>
              </div>

              <div className="p-3 lg:p-4 bg-card/50 rounded-xl border border-border">
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed mb-3">
                  True interoperability unlocks a multi-chain world where assets and messages flow freely:
                </p>
                <ul className="space-y-2">
                  {[
                    'Pay with BTC inside an Ethereum DeFi protocol — trustlessly',
                    'Transfer an NFT from Ethereum to Solana while keeping provenance',
                    'An enterprise Hyperledger Fabric network settling final state on Ethereum',
                    'A single user interface accessing liquidity across 10 chains simultaneously',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs lg:text-sm text-foreground">
                      <span className="text-[#22d3ee] flex-shrink-0 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Solutions Emerging</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Bridges', sub: 'Risky but widely used', color: '#f59e0b' },
                    { label: 'Cosmos IBC', sub: 'Native protocol standard', color: '#22d3ee' },
                    { label: 'Layer 0', sub: 'Polkadot · Avalanche', color: '#6366f1' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="p-2 lg:p-3 bg-card rounded-lg border text-center"
                      style={{ borderColor: `${s.color}40` }}
                    >
                      <p className="text-xs lg:text-sm font-semibold" style={{ color: s.color }}>{s.label}</p>
                      <p className="text-[10px] lg:text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ BRIDGE SECURITY ═══════ */}
        <div id="s4-bridges" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#ef4444]">Section 04</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Cross-Chain Bridge Security</h2>
            <p className="text-sm text-muted-foreground">Bridges are the most exploited category in blockchain. Over <span className="font-semibold text-foreground">$2.5B</span> was stolen from bridges in 2022 alone — more than all other DeFi hacks combined.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">

            {/* Hall of shame */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground shrink-0">Largest Bridge Hacks</div>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  { name: 'Ronin Bridge', amount: '$625M', year: '2022', chain: 'Axie Infinity ↔ Ethereum', method: 'Attacker compromised 5 of 9 validator private keys — met the 5/9 multisig threshold and drained the entire lock-up contract.', color: '#ef4444' },
                  { name: 'Wormhole Bridge', amount: '$320M', year: '2022', chain: 'Solana ↔ Ethereum', method: 'Signature verification bypass — attacker forged a guardian signature to mint 120,000 wETH on Solana without locking real ETH.', color: '#f97316' },
                  { name: 'Nomad Bridge', amount: '$190M', year: '2022', chain: 'Multi-chain', method: 'Initialization bug — a root hash was set to 0x0, which is truthy in the verify function. Anyone could replay any message. Hundreds of copycats drained it simultaneously.', color: '#eab308' },
                  { name: 'Harmony Horizon', amount: '$100M', year: '2022', chain: 'Harmony ↔ Ethereum', method: '2-of-5 multisig with only 4 active signers — attacker compromised 2 keys, meeting the threshold with minimal effort.', color: '#6366f1' },
                ].map(h => (
                  <div key={h.name} className="min-h-0 p-3 bg-card border rounded-xl flex flex-col gap-1" style={{ borderColor: h.color + '40' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-foreground">{h.name}</span>
                      <span className="font-black text-sm" style={{ color: h.color }}>{h.amount}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{h.year} · {h.chain}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{h.method}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why bridges are risky */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground shrink-0">Why Bridges Are Structurally Dangerous</div>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  { icon: '🍯', title: 'Honeypot Architecture', desc: 'To bridge 1 ETH from Ethereum to another chain, you lock 1 ETH in a smart contract and mint wrapped ETH on the destination. Every user adds to the same pot — creating a target that grows with adoption. A bridge with $500M TVL is a $500M bug bounty.' },
                  { icon: '🔑', title: 'Centralized Trust Assumptions', desc: 'Most bridges rely on a multisig of validators to confirm cross-chain events. This is inherently centralized. If the validator key set is small (2-of-5) or the keys are stored insecurely, the entire TVL is at risk from a single coordinated key compromise.' },
                  { icon: '⚠️', title: 'Cross-Chain Complexity', desc: 'Bridges must reason about the state of two different blockchains simultaneously. Message passing, signature verification, and finality assumptions differ per chain. This surface area is enormous — and bugs in any layer can be fatal.' },
                  { icon: '⏱️', title: 'Finality Mismatch', desc: 'Optimistic bridges release funds before finality is confirmed on the source chain. If a transaction is later reorganized (reorged), the bridge may have already minted assets on the destination with no backing.' },
                ].map(r => (
                  <div key={r.title} className="min-h-0 p-3 bg-card border border-border rounded-xl flex gap-2.5 items-start">
                    <span className="text-xl shrink-0 leading-none">{r.icon}</span>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-foreground mb-0.5">{r.title}</div>
                      <div className="text-xs text-muted-foreground leading-snug">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safer alternatives + best practices */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground shrink-0">Safer Design Patterns</div>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  { title: 'Native IBC (Cosmos)', color: '#39B54A', desc: 'Inter-Blockchain Communication is baked into the protocol — no external multisig, no lock-up contract. Light client verification on both sides. Zero bridge hacks via IBC to date.' },
                  { title: 'Canonical Bridges', color: '#6366f1', desc: "Ethereum's official rollup bridges (Arbitrum, Optimism, Base) use the rollup's own fraud/validity proof system — inherited L1 security, not a separate trust set." },
                  { title: 'Large Multisig Thresholds', color: '#f97316', desc: '5-of-9 is the minimum acceptable. Ronin used 5-of-9 but had only 4 real signers. Hardware security modules (HSMs) for key storage are mandatory.' },
                  { title: 'Formal Verification', color: '#eab308', desc: 'Message passing logic and signature verification code should be formally verified — not just audited. Wormhole\'s bug passed manual audit.' },
                  { title: 'Rate Limits & Circuit Breakers', color: '#ef4444', desc: 'Cap how much can be withdrawn per hour. Nomad\'s $190M was drained by hundreds of copycats within minutes — a rate limiter would have saved $180M.' },
                ].map(p => (
                  <div key={p.title} className="min-h-0 flex gap-2.5 p-3 bg-card border rounded-xl items-start" style={{ borderColor: p.color + '30' }}>
                    <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                    <div className="min-w-0">
                      <div className="font-bold text-xs mb-0.5" style={{ color: p.color }}>{p.title}</div>
                      <div className="text-xs text-muted-foreground leading-snug">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ S4-COSMOS ═══════ */}
        <div id="s4-cosmos" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Cosmos: The Internet of Blockchains
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              A network of sovereign, interoperable chains connected by the IBC protocol — each one optimised for its specific use case.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0">

            {/* Left — Architecture visual */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="flex items-center gap-2 shrink-0">
                <div className="size-2 rounded-full bg-[#22d3ee]" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground">Hub & Zone Architecture</h3>
                <span className="ml-auto text-[10px] text-muted-foreground italic">Zones can also IBC each other directly (mesh)</span>
              </div>

              {/* Hub visual */}
              <div className="relative flex-1 min-h-[260px] flex items-center justify-center bg-card/50 rounded-xl border border-border p-4">
                {/* IBC mesh lines (drawn behind everything) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  {/* Hub-to-zone (solid-ish) */}
                  {[-90, -30, 30, 90, 150, -150].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const r = 38;
                    const ex = 50 + Math.cos(rad) * r;
                    const ey = 50 + Math.sin(rad) * r;
                    return (
                      <line
                        key={`spoke-${i}`}
                        x1="50%" y1="50%"
                        x2={`${ex}%`} y2={`${ey}%`}
                        stroke="#22d3ee"
                        strokeWidth="1.2"
                        strokeDasharray="4 3"
                        opacity="0.5"
                      />
                    );
                  })}
                  {/* A few zone-to-zone arcs to suggest the mesh */}
                  {[
                    { a: -90, b: -30 },
                    { a: -30, b: 90 },
                    { a: 90, b: 150 },
                    { a: 150, b: -150 },
                  ].map(({ a, b }, i) => {
                    const ra = (a * Math.PI) / 180;
                    const rb = (b * Math.PI) / 180;
                    const r = 38;
                    return (
                      <line
                        key={`mesh-${i}`}
                        x1={`${50 + Math.cos(ra) * r}%`} y1={`${50 + Math.sin(ra) * r}%`}
                        x2={`${50 + Math.cos(rb) * r}%`} y2={`${50 + Math.sin(rb) * r}%`}
                        stroke="#22d3ee"
                        strokeWidth="0.8"
                        strokeDasharray="2 4"
                        opacity="0.25"
                      />
                    );
                  })}
                </svg>

                {/* Central hub */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="size-16 lg:size-20 rounded-full bg-[#22d3ee]/15 border-2 border-[#22d3ee] flex flex-col items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                    <span className="text-[11px] lg:text-xs font-black text-[#22d3ee] leading-tight">Cosmos</span>
                    <span className="text-[11px] lg:text-xs font-black text-[#22d3ee] leading-tight">Hub</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">ATOM</p>
                </div>

                {/* Zone satellites */}
                {[
                  { label: 'Osmosis',   purpose: 'DEX',           angle: -90,  color: '#f59e0b' },
                  { label: 'dYdX',      purpose: 'perps DEX',     angle: -30,  color: '#6366f1' },
                  { label: 'Injective', purpose: 'finance L1',    angle: 30,   color: '#8b5cf6' },
                  { label: 'Celestia',  purpose: 'data avail.',   angle: 90,   color: '#ec4899' },
                  { label: 'Akash',     purpose: 'GPU compute',   angle: 150,  color: '#ef4444' },
                  { label: 'Stride',    purpose: 'liquid staking', angle: -150, color: '#10b981' },
                ].map(({ label, purpose, angle, color }) => {
                  const rad = (angle * Math.PI) / 180;
                  const rPct = 38;
                  return (
                    <div
                      key={label}
                      className="absolute flex flex-col items-center gap-0.5 z-10"
                      style={{
                        left: `calc(50% + ${Math.cos(rad) * rPct}%)`,
                        top: `calc(50% + ${Math.sin(rad) * rPct}%)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div
                        className="size-11 lg:size-12 rounded-full flex items-center justify-center text-[9px] lg:text-[10px] font-black text-center px-1 leading-none"
                        style={{ backgroundColor: `${color}20`, border: `1.5px solid ${color}`, color }}
                      >
                        {label}
                      </div>
                      <span className="text-[9px] text-muted-foreground whitespace-nowrap font-medium">{purpose}</span>
                    </div>
                  );
                })}
              </div>

              {/* Metric strip */}
              <div className="grid grid-cols-3 gap-2 shrink-0">
                {[
                  { metric: '110+',     label: 'IBC-enabled chains' },
                  { metric: '~1 s',     label: 'finality (CometBFT)' },
                  { metric: '$XB+ / yr',label: 'IBC volume transferred' },
                ].map(s => (
                  <div key={s.label} className="px-2 py-1.5 rounded-lg border border-[#22d3ee]/30 bg-[#22d3ee]/5 text-center">
                    <div className="text-xs font-black text-[#22d3ee] leading-none">{s.metric}</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Properties + token role + IBC reach */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="flex items-center gap-2 shrink-0">
                <div className="size-2 rounded-full bg-[#6366f1]" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground">Core Properties</h3>
              </div>

              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  {
                    emoji: '🌐',
                    title: 'IBC Protocol',
                    desc: 'Inter-Blockchain Communication — TCP/IP for blockchains. Light-client verification on each side; trustless messaging and asset transfer between any IBC-enabled chain.',
                  },
                  {
                    emoji: '🔧',
                    title: 'Cosmos SDK',
                    desc: 'Go framework to build app-specific chains in weeks, not years. Modular (staking, governance, IBC, auth, bank…) — battle-tested by Osmosis, dYdX v4, Celestia, and 100+ chains.',
                  },
                  {
                    emoji: '⚛️',
                    title: 'CometBFT (ex-Tendermint)',
                    desc: 'BFT engine renamed in 2023. Instant finality, ~1-second blocks, no forks. Known validator set per zone — secure as long as < 1/3 are Byzantine.',
                  },
                  {
                    emoji: '⚡',
                    title: 'App-Specific Sovereignty',
                    desc: 'Each chain tunes gas, governance, and upgrades to its own use case — no shared block space competition, no need to fit inside someone else\'s VM.',
                  },
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3 p-2.5 bg-card rounded-lg border border-[#22d3ee]/25 hover:border-[#22d3ee]/55 transition-colors min-h-0"
                  >
                    <span className="text-lg lg:text-xl flex-shrink-0 leading-none mt-0.5">{card.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs lg:text-sm font-semibold text-foreground">{card.title}</p>
                      <p className="text-[10px] lg:text-xs text-muted-foreground mt-0.5 leading-relaxed">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Two side-by-side panels: ATOM economics + IBC reach */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 shrink-0">
                <div className="p-2.5 bg-[#22d3ee]/5 rounded-lg border border-[#22d3ee]/30">
                  <p className="text-[11px] font-bold text-[#22d3ee] mb-1 flex items-center gap-1.5">
                    <span>💎</span> ATOM economics
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Hub security via staking · governance votes · Interchain Security lets opt-in chains rent the Hub validator set instead of bootstrapping their own.
                  </p>
                </div>
                <div className="p-2.5 bg-[#6366f1]/5 rounded-lg border border-[#6366f1]/30">
                  <p className="text-[11px] font-bold text-[#6366f1] mb-1 flex items-center gap-1.5">
                    <span>🔗</span> Beyond Cosmos
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    IBC <span className="font-semibold text-foreground">Eureka</span> (2024+) extends IBC to Ethereum and other non-Cosmos chains — trust-minimised messaging, no centralised bridge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ COSMOS APPS — ecosystem ═══════ */}
        <div id="s4-cosmos-eco" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Cosmos ecosystem — what runs across IBC</h2>
            <p className="text-sm text-muted-foreground mt-1">The IBC graph connects 110+ chains. Each one specialised — and the most-used app on Cosmos isn't on the Hub itself, it's on the zones.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-2.5">
            {[
              {
                emoji: '🌊',
                name: 'Osmosis',
                category: 'DEX',
                color: '#7B2BF9',
                tag: 'leading IBC DEX',
                stats: '~$200M TVL · since 2021',
                apps: [
                  { name: 'Concentrated liquidity', kind: 'Uniswap-v3-style ranges' },
                  { name: 'Superfluid staking',     kind: 'LP tokens that also stake' },
                  { name: 'IBC-native swaps',       kind: 'Any IBC asset, no bridge' },
                  { name: 'Trade as IBC msg',       kind: 'Cross-chain swap in one tx' },
                ],
              },
              {
                emoji: '📈',
                name: 'dYdX v4',
                category: 'Perps DEX',
                color: '#6966FF',
                tag: 'migrated off StarkEx (2023)',
                stats: 'Daily vol in $100Ms · Cosmos SDK',
                apps: [
                  { name: 'Order-book perps',  kind: 'Off-chain matching, on-chain settlement' },
                  { name: 'Sovereign chain',   kind: 'Validators paid in trading fees' },
                  { name: 'Custom matching',   kind: 'Built specifically for derivatives' },
                  { name: 'Cosmos SDK proof',  kind: 'Largest sovereign-zone migration to date' },
                ],
              },
              {
                emoji: '🧊',
                name: 'Celestia',
                category: 'Modular DA',
                color: '#7E5CF7',
                tag: 'pioneer of modular thesis',
                stats: 'Mainnet 2023 · TIA token',
                apps: [
                  { name: 'Data availability',   kind: 'Sells blob space to rollups' },
                  { name: 'Data sampling',       kind: 'Light clients verify w/o full state' },
                  { name: 'Powers RaaS',         kind: 'Manta, Eclipse, Movement use it' },
                  { name: 'Modular blockchain',  kind: 'Separates execution / DA / settlement' },
                ],
              },
              {
                emoji: '☁️',
                name: 'Akash',
                category: 'GPU Compute',
                color: '#FF414C',
                tag: 'decentralised cloud',
                stats: 'Major AI-workload growth in 2024',
                apps: [
                  { name: 'GPU rentals',     kind: 'A100s, H100s for ML training' },
                  { name: 'Reverse auction', kind: 'Buyers post jobs, providers bid' },
                  { name: 'AKT payments',    kind: 'Settle in token or any IBC asset' },
                  { name: 'Open-source ML',  kind: 'Llama / Mistral hosting' },
                ],
              },
              {
                emoji: '🌀',
                name: 'Stride',
                category: 'Liquid Staking',
                color: '#E91E63',
                tag: 'IBC LST leader',
                stats: 'Liquid stakes ATOM, OSMO, INJ, TIA…',
                apps: [
                  { name: 'stATOM, stTIA…',  kind: 'Liquid staking tokens, IBC-portable' },
                  { name: 'Auto-compound',   kind: 'Rewards re-staked automatically' },
                  { name: 'IBC-native LST',  kind: 'Use stTokens across all IBC chains' },
                  { name: 'Stride Hub',      kind: 'Now an Interchain Security consumer chain' },
                ],
              },
            ].map(app => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl border-2 min-h-0"
                style={{ borderColor: app.color + '55', backgroundColor: app.color + '0a' }}
              >
                <div className="shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base shrink-0 leading-none">{app.emoji}</span>
                    <div className="font-black text-[12px] leading-tight" style={{ color: app.color }}>{app.name}</div>
                  </div>
                  <span
                    className="inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded mt-1"
                    style={{ backgroundColor: app.color + '20', color: app.color, border: `1px solid ${app.color}40` }}
                  >
                    {app.category}
                  </span>
                </div>

                <div className="shrink-0">
                  <div className="text-[10px] text-foreground font-medium leading-tight">{app.tag}</div>
                  <div className="text-[9px] text-muted-foreground italic leading-snug mt-0.5">{app.stats}</div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col gap-1">
                  {app.apps.map(item => (
                    <div
                      key={item.name}
                      className="rounded-md border bg-card/60 px-1.5 py-1 min-h-0"
                      style={{ borderColor: app.color + '35' }}
                    >
                      <div className="text-[10px] font-bold leading-tight" style={{ color: app.color }}>{item.name}</div>
                      <div className="text-[9px] text-muted-foreground leading-snug mt-0.5">{item.kind}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee0d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#22d3ee' }}>Also worth knowing — </span>
              <span className="font-medium text-foreground">Injective</span> (finance-focused L1) · <span className="font-medium text-foreground">Sei</span> (orderbook L1) · <span className="font-medium text-foreground">Mantra</span> (RWA tokenisation) · <span className="font-medium text-foreground">Stargaze</span> (NFTs) · <span className="font-medium text-foreground">Secret Network</span> (privacy) · <span className="font-medium text-foreground">Fetch.ai / ASI</span> (AI agents) · <span className="font-medium text-foreground">Neutron</span> (smart-contract platform secured by ATOM).
            </p>
          </div>
        </div>

        {/* ═══════ S4-LAYER0 ═══════ */}
        <div id="s4-layer0" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Layer 0: Infrastructure for Blockchains
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              The substrate beneath Layer 1 chains — a shared validator set, security, and messaging fabric that multiple L1s plug into.
            </p>
          </div>

          {/* One-line definition with analogy */}
          <div className="shrink-0 mb-4 rounded-xl border p-3" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee0d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#22d3ee' }}>In one line</p>
            <p className="text-sm text-foreground mt-0.5 leading-snug">
              A Layer 0 leases <span className="font-semibold">validators, security, and messaging</span> to many L1s at once — so a new chain doesn't need to bootstrap its own validator set from scratch.
            </p>
            <p className="text-[11px] text-muted-foreground italic mt-1.5">
              Think of it as the internet backbone: many ISPs (L1s) plug into shared cables (L0) instead of each laying their own.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0">

            {/* Left — Concept: stack + capabilities */}
            <div className="flex flex-col gap-3 min-h-0">
              {/* Stack visual — foundation-up */}
              <div className="shrink-0 p-3 bg-card/50 rounded-xl border border-border">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">The stack — read bottom-up</p>
                <div className="flex flex-col-reverse gap-1.5">
                  {[
                    { num: '0', label: 'Layer 0',  sub: 'Relay / Primary Network · shared validators',  border: '#22d3ee' },
                    { num: '1', label: 'Layer 1',  sub: 'App-specific chains plugged into L0',          border: '#6366f1' },
                    { num: '2', label: 'Layer 2',  sub: 'Rollups built on top of an L1',                border: '#8b5cf6' },
                  ].map(layer => (
                    <div
                      key={layer.label}
                      className="p-2 lg:p-2.5 rounded-lg flex items-center gap-3"
                      style={{ backgroundColor: layer.border + '20', border: `1px solid ${layer.border}` }}
                    >
                      <div
                        className="size-7 rounded-md flex items-center justify-center text-sm font-black shrink-0"
                        style={{ backgroundColor: layer.border + '30', color: layer.border }}
                      >L{layer.num}</div>
                      <div className="min-w-0">
                        <p className="text-xs lg:text-sm font-semibold leading-tight" style={{ color: layer.border }}>{layer.label}</p>
                        <p className="text-[10px] lg:text-xs text-muted-foreground leading-tight">{layer.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What L0 provides — 3 capability cards */}
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">What Layer 0 provides</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  { icon: '🔐', title: 'Shared security',          desc: 'A pooled validator set secures every L1 connected to it. New chains inherit security on day 1 — no need to find their own validators.' },
                  { icon: '📨', title: 'Native cross-chain messaging', desc: 'L0 defines the message format and trust model for inter-L1 communication (XCM, Warp) — no third-party bridge needed.' },
                  { icon: '⚙️', title: 'Shared infrastructure',     desc: 'Block production, finality, governance and upgrades live at L0. L1s focus only on application logic and tokenomics.' },
                ].map(c => (
                  <div key={c.title} className="rounded-xl border border-[#22d3ee]/30 bg-card p-2.5 flex items-start gap-2.5 min-h-0">
                    <span className="text-lg shrink-0 leading-none mt-0.5">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground">{c.title}</p>
                      <p className="text-[10px] lg:text-xs text-muted-foreground leading-relaxed mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Implementations + trade-off */}
            <div className="flex flex-col gap-3 min-h-0">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">Implementations in production</p>

              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2.5">
                {/* Polkadot */}
                <div className="rounded-xl p-3 min-h-0 flex flex-col gap-1.5" style={{ borderWidth: '1px', borderColor: '#e6007a55', backgroundColor: '#e6007a08' }}>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-base">🔴</span>
                    <p className="text-sm font-bold text-foreground">Polkadot</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: '#e6007a18', color: '#e6007a', border: '1px solid #e6007a35' }}>DOT</span>
                    <span className="ml-auto text-[10px] text-muted-foreground">BABE + GRANDPA</span>
                  </div>
                  <ul className="space-y-0.5 text-[11px] text-muted-foreground leading-snug">
                    <li>· <span className="text-foreground font-medium">Relay Chain</span> — pooled validator set securing every connected chain</li>
                    <li>· <span className="text-foreground font-medium">Parachains</span> — L1s that buy <span className="text-foreground font-medium">Coretime</span> (replaced slot auctions in 2024) on the relay</li>
                    <li>· <span className="text-foreground font-medium">XCM v3</span> — Cross-Consensus Messaging for native inter-parachain calls</li>
                  </ul>
                </div>

                {/* Avalanche */}
                <div className="rounded-xl p-3 min-h-0 flex flex-col gap-1.5" style={{ borderWidth: '1px', borderColor: '#e8414255', backgroundColor: '#e8414208' }}>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-base">🔺</span>
                    <p className="text-sm font-bold text-foreground">Avalanche</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: '#e8414218', color: '#e84142', border: '1px solid #e8414235' }}>AVAX</span>
                    <span className="ml-auto text-[10px] text-muted-foreground">Snowman (sub-1s)</span>
                  </div>
                  <ul className="space-y-0.5 text-[11px] text-muted-foreground leading-snug">
                    <li>· <span className="text-foreground font-medium">Primary Network</span> — X-Chain (assets), P-Chain (validators), C-Chain (EVM)</li>
                    <li>· <span className="text-foreground font-medium">Avalanche L1s</span> — ex-Subnets, renamed via ACP-13/77 in 2024 — sovereign chains using their own validator subset</li>
                    <li>· <span className="text-foreground font-medium">Avalanche Warp</span> — native L1↔L1 messaging signed by the source validator set</li>
                  </ul>
                </div>
              </div>

              {/* Trade-off vs Cosmos */}
              <div className="shrink-0 rounded-xl p-3" style={{ borderWidth: '1px', borderColor: '#6366f155', backgroundColor: '#6366f10d' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>The design trade-off</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-bold text-foreground mb-1">Layer 0 model</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      <span className="text-[#10b981]">↑</span> shared security on day 1<br/>
                      <span className="text-[#10b981]">↑</span> native cross-chain messaging<br/>
                      <span className="text-[#ef4444]">↓</span> chains must follow L0 rules
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground mb-1">Cosmos model</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      <span className="text-[#10b981]">↑</span> full sovereignty per chain<br/>
                      <span className="text-[#10b981]">↑</span> any consensus, any VM, any rules<br/>
                      <span className="text-[#ef4444]">↓</span> each chain bootstraps own validators
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ S4-XRP — XRP Ledger ═══════ */}
        <div id="s4-xrp" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              XRP Ledger: payments-optimised L1
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              One of the longest-running blockchains (live since 2012). Designed specifically for fast, cheap payments and FX — with a built-in DEX and a consensus model that is neither Proof of Work nor Proof of Stake.
            </p>
          </div>

          {/* Definition strip */}
          <div className="shrink-0 mb-3 rounded-xl border p-3" style={{ borderColor: '#06b6d455', backgroundColor: '#06b6d40d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#06b6d4' }}>What's distinct about XRPL</p>
            <p className="text-sm text-foreground mt-0.5 leading-snug">
              XRPL doesn't use mining or staking. Validators agree on transaction order via <span className="font-semibold">Federated Byzantine Agreement</span>: each node picks a Unique Node List (UNL) of validators it trusts, and consensus rounds (~3-5 s) propagate proposals until ≥ 80% of UNL agrees. Tokens beyond XRP itself live as <span className="font-semibold">Trust Lines / IOUs</span> — a permission a holder grants to receive a particular issuer's asset.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0">

            {/* Left: Architecture visual + history */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex items-center gap-2 shrink-0">
                <div className="size-2 rounded-full bg-[#06b6d4]" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground">Consensus — UNL voting</h3>
              </div>

              {/* Visual */}
              <div className="flex-1 min-h-[260px] rounded-xl border border-border bg-card/50 p-4 relative">
                <svg viewBox="0 0 480 280" className="w-full h-full">
                  <defs>
                    <marker id="xrp-arrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
                      <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                    </marker>
                  </defs>
                  {/* Validator ring */}
                  {[
                    { x: 240, y: 50 },
                    { x: 380, y: 100 },
                    { x: 400, y: 200 },
                    { x: 280, y: 240 },
                    { x: 140, y: 240 },
                    { x: 60,  y: 180 },
                    { x: 90,  y: 90  },
                  ].map((v, i) => (
                    <g key={i}>
                      <circle cx={v.x} cy={v.y} r={16} fill="#06b6d420" stroke="#06b6d4" strokeWidth={1.5} />
                      <text x={v.x} y={v.y + 4} textAnchor="middle" fontSize={10} fontWeight="700" fill="#06b6d4">V{i + 1}</text>
                    </g>
                  ))}
                  {/* Inter-validator agreement lines (mesh) */}
                  {[
                    [240, 50, 380, 100],
                    [240, 50, 90,  90],
                    [380, 100, 400, 200],
                    [400, 200, 280, 240],
                    [280, 240, 140, 240],
                    [140, 240, 60, 180],
                    [60, 180, 90, 90],
                    [240, 50, 280, 240],
                    [380, 100, 60, 180],
                  ].map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#06b6d4" strokeWidth={0.6} opacity={0.35} strokeDasharray="3 3" />
                  ))}
                  {/* Center label */}
                  <text x={240} y={150} textAnchor="middle" fontSize={11} fontWeight="800" className="fill-foreground">≥ 80% UNL agree</text>
                  <text x={240} y={166} textAnchor="middle" fontSize={9} className="fill-muted-foreground">~3-5 s consensus rounds</text>
                </svg>
              </div>

              {/* Quick history strip */}
              <div className="shrink-0 grid grid-cols-3 gap-2">
                {[
                  { metric: '2012', label: 'launched · pre-Ethereum' },
                  { metric: '~1,500', label: 'TPS sustained' },
                  { metric: '~$0.0002', label: 'avg tx fee · burned' },
                ].map(s => (
                  <div key={s.label} className="px-2 py-1.5 rounded-lg border border-[#06b6d4]/30 bg-[#06b6d4]/05 text-center">
                    <div className="text-xs font-black text-[#06b6d4] leading-none">{s.metric}</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Properties */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="flex items-center gap-2 shrink-0">
                <div className="size-2 rounded-full bg-[#6366f1]" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground">Core properties</h3>
              </div>

              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  {
                    emoji: '💱',
                    title: 'Native DEX since day one',
                    desc: 'Order-book DEX has been part of the protocol since 2012 — no smart contract required. AMM (XLS-30) added natively in 2024 alongside the orderbook.',
                  },
                  {
                    emoji: '🔗',
                    title: 'Trust Lines / IOUs',
                    desc: 'Issued assets (USD-pegged tokens, fiat IOUs, RWA) live as a balance on a Trust Line — a permissioned link a holder opens to a specific issuer. Different mental model from ERC-20.',
                  },
                  {
                    emoji: '🪝',
                    title: 'Hooks · light smart contracts',
                    desc: 'Lightweight, gas-metered WebAssembly hooks that fire before / after transactions on an account. Limited surface vs full smart contracts — trade-off for predictable fees.',
                  },
                  {
                    emoji: '🔷',
                    title: 'EVM Sidechain',
                    desc: 'A separate, EVM-compatible sidechain bridged to XRPL (mainnet 2025) so Solidity dApps can settle to XRPL and use XRP for gas. Aimed at expanding the dev surface beyond XRPL\'s native model.',
                  },
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3 p-2.5 bg-card rounded-lg border border-[#06b6d4]/25 min-h-0"
                  >
                    <span className="text-lg lg:text-xl flex-shrink-0 leading-none mt-0.5">{card.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs lg:text-sm font-semibold text-foreground">{card.title}</p>
                      <p className="text-[10px] lg:text-xs text-muted-foreground mt-0.5 leading-relaxed">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Honest context panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 shrink-0">
                <div className="p-2.5 bg-[#06b6d4]/05 rounded-lg border border-[#06b6d4]/30">
                  <p className="text-[11px] font-bold text-[#06b6d4] mb-1 flex items-center gap-1.5">
                    <span>🏦</span> Where it actually shines
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Cross-border payments, FX, RWA tokenisation. Ripple&apos;s ODL (On-Demand Liquidity) uses XRP as a bridge currency; central-bank pilots (Bhutan, Palau, Colombia) use XRPL tech for CBDC experiments.
                  </p>
                </div>
                <div className="p-2.5 bg-[#f59e0b]/05 rounded-lg border border-[#f59e0b]/30">
                  <p className="text-[11px] font-bold text-[#f59e0b] mb-1 flex items-center gap-1.5">
                    <span>⚖️</span> Honest context
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    SEC sued Ripple in 2020 over XRP sales; 2023 ruling found programmatic sales weren&apos;t securities, institutional sales were. Smaller smart-contract footprint than EVM ecosystems — the bet is on payments + RWA, not general-purpose dApps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ XRP APPS — ecosystem ═══════ */}
        <div id="s4-xrp-eco" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">XRP Ledger ecosystem — apps and partnerships</h2>
            <p className="text-sm text-muted-foreground mt-1">XRPL&apos;s footprint skews more toward enterprise rails and tokenised real-world assets than retail DeFi. Recent additions (AMM, RLUSD, EVM sidechain) are widening that footprint into 2024-26.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-2.5">
            {[
              {
                emoji: '💸',
                name: 'RippleNet · ODL',
                category: 'Payments',
                color: '#06b6d4',
                tag: 'cross-border settlement',
                stats: 'Banking partners worldwide · since 2018',
                apps: [
                  { name: 'On-Demand Liquidity',  kind: 'XRP as bridge currency for FX' },
                  { name: 'RippleNet',            kind: 'Banking corridor messaging + settlement' },
                  { name: 'Travelex · SBI',       kind: 'Live remittance integrations' },
                  { name: 'Central-bank pilots',  kind: 'Bhutan, Palau, Colombia CBDC trials' },
                ],
              },
              {
                emoji: '🪙',
                name: 'RLUSD',
                category: 'Stablecoin',
                color: '#3b82f6',
                tag: 'Ripple\'s regulated stablecoin',
                stats: 'Live Dec 2024 · USD-backed · NYDFS',
                apps: [
                  { name: 'NYDFS-regulated', kind: 'New York Trust company issuance' },
                  { name: 'On both XRPL + ETH', kind: 'Mints natively on XRPL and Ethereum' },
                  { name: 'Treasury-backed', kind: 'Reserves: cash + short-dated US treasuries' },
                  { name: 'RippleNet integration', kind: 'Settles cross-border payments alongside XRP' },
                ],
              },
              {
                emoji: '📈',
                name: 'Sologenic',
                category: 'RWA · tokenised stocks',
                color: '#10b981',
                tag: 'tokenised equities & metals',
                stats: 'Live since 2020 · SOLO token',
                apps: [
                  { name: 'Tokenised stocks', kind: 'Apple, Tesla shares as XRPL IOUs' },
                  { name: 'Sologenic DEX',    kind: 'Front-end on the native XRPL DEX' },
                  { name: 'Coinfield',        kind: 'Sister exchange · tokenised metals' },
                  { name: 'NFT marketplace',  kind: 'XLS-20 NFT trading' },
                ],
              },
              {
                emoji: '👛',
                name: 'Xaman (ex-Xumm)',
                category: 'Wallet',
                color: '#8b5cf6',
                tag: 'leading XRPL wallet',
                stats: 'Built by XRPL Labs · iOS / Android',
                apps: [
                  { name: 'Self-custody',     kind: 'Keys stay on the device' },
                  { name: 'xApps',            kind: 'Mini-apps (DEX, NFT, payments) inside the wallet' },
                  { name: 'Hooks support',    kind: 'Manage account-level hook code' },
                  { name: 'PayString',        kind: 'Human-readable address aliases' },
                ],
              },
              {
                emoji: '🔄',
                name: 'Native DEX & AMM',
                category: 'On-protocol DeFi',
                color: '#ec4899',
                tag: 'order book + AMM',
                stats: 'DEX since 2012 · AMM (XLS-30) live 2024',
                apps: [
                  { name: 'Order-book DEX', kind: 'Native, no smart contract needed' },
                  { name: 'AMM (XLS-30)',   kind: 'Constant-product pools on protocol' },
                  { name: 'Path payments',  kind: 'Auto-route through multi-asset hops' },
                  { name: 'Issued assets',  kind: 'Trade any IOU side-by-side with XRP' },
                ],
              },
            ].map(app => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl border-2 min-h-0"
                style={{ borderColor: app.color + '55', backgroundColor: app.color + '0a' }}
              >
                <div className="shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base shrink-0 leading-none">{app.emoji}</span>
                    <div className="font-black text-[12px] leading-tight" style={{ color: app.color }}>{app.name}</div>
                  </div>
                  <span
                    className="inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded mt-1"
                    style={{ backgroundColor: app.color + '20', color: app.color, border: `1px solid ${app.color}40` }}
                  >
                    {app.category}
                  </span>
                </div>

                <div className="shrink-0">
                  <div className="text-[10px] text-foreground font-medium leading-tight">{app.tag}</div>
                  <div className="text-[9px] text-muted-foreground italic leading-snug mt-0.5">{app.stats}</div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col gap-1">
                  {app.apps.map(item => (
                    <div
                      key={item.name}
                      className="rounded-md border bg-card/60 px-1.5 py-1 min-h-0"
                      style={{ borderColor: app.color + '35' }}
                    >
                      <div className="text-[10px] font-bold leading-tight" style={{ color: app.color }}>{item.name}</div>
                      <div className="text-[9px] text-muted-foreground leading-snug mt-0.5">{item.kind}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#06b6d455', backgroundColor: '#06b6d40d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#06b6d4' }}>Also worth knowing — </span>
              <span className="font-medium text-foreground">Bitstamp</span> integrated XRP since 2017 · <span className="font-medium text-foreground">XRPL Hooks</span> mainnet activation expanded contract surface · <span className="font-medium text-foreground">Coreum</span> spun out of XRPL family with a Cosmos-SDK chain · <span className="font-medium text-foreground">Flare</span> connects to XRPL via FAssets · <span className="font-medium text-foreground">EVM sidechain</span> opening a Solidity-compatible footprint in 2025.
            </p>
          </div>
        </div>

        {/* ═══════ S4-STARKNET ═══════ */}
        <div id="s4-starknet" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Starknet: ZK-Rollup on Ethereum
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Batches thousands of transactions off-chain, generates a cryptographic STARK proof, and posts only that proof to Ethereum L1.
            </p>
          </div>

          {/* Why ZK is the next step */}
          <div className="shrink-0 mb-3 rounded-xl border p-3" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf60d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#8b5cf6' }}>
              Why ZK has to be the next step
            </p>
            <p className="text-sm text-foreground mt-0.5 leading-snug">
              Ethereum L1 can't host applications that need <span className="font-semibold">cheap throughput</span> AND <span className="font-semibold">privacy</span>. Optimistic rollups solve cost only; ZK rollups also unlock <span className="font-semibold">verifiable privacy</span> — a user can prove a fact <span className="italic">without revealing the underlying data</span>.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0">
            {/* Left — KYC use case + Core Properties */}
            <div className="flex flex-col gap-3 min-h-0">

              {/* KYC use case walkthrough */}
              <div className="shrink-0 rounded-xl border p-3" style={{ borderColor: '#8b5cf660', backgroundColor: '#8b5cf608' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#8b5cf6' }}>
                  🔐 Concrete example — KYC without sharing your identity
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { n: '1', label: 'Bank issues credential', desc: 'Your bank verifies you once and signs a ZK credential containing { name, DOB, residency, sanctions check }.' },
                    { n: '2', label: 'You generate a proof',   desc: 'In your wallet, build a STARK proof: "credential is signed by Bank · age ≥ 18 · residency = EU · sanctions = false".' },
                    { n: '3', label: 'Cairo contract verifies', desc: 'On Starknet, the dApp\'s Cairo contract verifies the proof and grants access. Your name and DOB never leave your wallet.' },
                  ].map(s => (
                    <div key={s.n} className="rounded-lg border bg-card p-2 flex flex-col gap-1" style={{ borderColor: '#8b5cf640' }}>
                      <div className="flex items-center gap-1.5">
                        <div className="size-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: '#8b5cf6' }}>{s.n}</div>
                        <p className="text-[11px] font-bold text-foreground leading-tight">{s.label}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-snug">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground italic mt-2 leading-snug">
                  Same pattern applies to <span className="font-medium text-foreground">private voting · proof of solvency · medical-record access · sanctions screening</span> — anywhere the question is "is this true?" without "who are you exactly?".
                </p>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">Core properties</p>
              <div className="flex-1 min-h-0 grid grid-cols-2 auto-rows-fr gap-2">
                {[
                  { emoji: '⚡', title: 'Speed',         desc: '500–1,000 TPS · vs ~15 TPS on Ethereum L1. Transactions settle off-chain and are proven in batches.' },
                  { emoji: '💸', title: 'Cost',          desc: '10–100× cheaper than L1. One STARK proof amortises the L1 settlement cost over thousands of txs.' },
                  { emoji: '🔒', title: 'Security',      desc: 'Inherits L1 security via validity proofs — no fraud window, no trust in the operator.' },
                  { emoji: '🛡️', title: 'Cairo language', desc: 'Native ZK-friendly language. Compiles to Sierra IR — far more efficient than EVM for STARK proving.' },
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-2 p-2.5 bg-card rounded-lg border border-[#8b5cf6]/30 hover:border-[#8b5cf6]/55 transition-colors min-h-0"
                  >
                    <span className="text-base flex-shrink-0 leading-none mt-0.5">{card.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground">{card.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — ZK vs Optimistic + 2024 news */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-[#8b5cf6]" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground">ZK-Rollup vs Optimistic Rollup</h3>
              </div>

              {/* Comparison */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="p-3 lg:p-4">
                    <p className="text-xs lg:text-sm font-semibold text-[#8b5cf6] mb-2">ZK-Rollup</p>
                    <p className="text-[10px] text-muted-foreground mb-1.5">Starknet · zkSync · Polygon zkEVM</p>
                    <ul className="space-y-1.5">
                      {[
                        'Validity proof submitted immediately',
                        'Instant withdrawal (no waiting)',
                        'Heavier off-chain computation',
                        'No fraud window needed',
                        'Mathematically proven correctness',
                      ].map((p) => (
                        <li key={p} className="flex items-start gap-1.5 text-[10px] lg:text-xs text-foreground">
                          <span className="text-[#8b5cf6] flex-shrink-0">✓</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 lg:p-4">
                    <p className="text-xs lg:text-sm font-semibold text-[#f59e0b] mb-2">Optimistic Rollup</p>
                    <p className="text-[10px] text-muted-foreground mb-1.5">Arbitrum · Optimism · Base</p>
                    <ul className="space-y-1.5">
                      {[
                        'Assume valid by default',
                        '7-day fraud window for withdrawals',
                        'Lighter off-chain computation',
                        'Anyone can challenge with fraud proof',
                        'Simpler to build EVM-compatible',
                      ].map((p) => (
                        <li key={p} className="flex items-start gap-1.5 text-[10px] lg:text-xs text-foreground">
                          <span className="text-[#f59e0b] flex-shrink-0">→</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Starknet 2024-2025 */}
              <div className="p-3 lg:p-4 bg-[#8b5cf6]/5 rounded-xl border border-[#8b5cf6]/20">
                <p className="text-xs font-semibold text-[#8b5cf6] mb-2">Starknet in 2024–2025</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'STRK Token', sub: 'Token launch & community airdrop' },
                    { label: 'v0.13+', sub: '1,000+ TPS throughput milestone' },
                    { label: 'AI Agents', sub: 'On-chain AI agent integration experiments' },
                    { label: 'Onchain Gaming', sub: 'Dojo engine — fully on-chain games' },
                  ].map((item) => (
                    <div key={item.label} className="p-2 bg-card rounded-lg border border-border">
                      <p className="text-xs font-semibold text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ STARKNET APPS — ecosystem ═══════ */}
        <div id="s4-starknet-eco" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Starknet ecosystem — apps native to Cairo</h2>
            <p className="text-sm text-muted-foreground mt-1">Starknet&apos;s app character has shifted distinctly toward fully-on-chain games, native AA wallets, and AI-agent experiments — areas where the Cairo VM&apos;s ZK-friendliness is genuinely useful.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-2.5">
            {[
              {
                emoji: '💧',
                name: 'Ekubo',
                category: 'Native AMM',
                color: '#8b5cf6',
                tag: 'concentrated liquidity',
                stats: 'Built by the Uniswap v3 author',
                apps: [
                  { name: 'Singleton design',    kind: 'One contract for all pools (gas-efficient)' },
                  { name: 'Concentrated LPs',    kind: 'Range positions, like Uni v3' },
                  { name: 'Extensions',          kind: 'Programmable hooks per pool' },
                  { name: 'STRK / ETH base',     kind: 'Deepest liquidity on Starknet' },
                ],
              },
              {
                emoji: '🎮',
                name: 'Realms · Dojo',
                category: 'Onchain Games',
                color: '#ec4899',
                tag: 'fully on-chain games',
                stats: 'Loot Survivor, Eternum, Loot universe',
                apps: [
                  { name: 'Dojo engine',     kind: 'ECS framework for fully on-chain games' },
                  { name: 'Loot Survivor',   kind: 'Roguelike fully on Starknet' },
                  { name: 'Realms · Eternum', kind: 'On-chain MMO economy' },
                  { name: 'Cairo for state', kind: 'Every move is a verified transaction' },
                ],
              },
              {
                emoji: '🏦',
                name: 'ZKLend · Nostra · Vesu',
                category: 'Lending',
                color: '#10b981',
                tag: 'money markets',
                stats: 'Aave-style on Starknet',
                apps: [
                  { name: 'ZKLend',  kind: 'Earliest Starknet lending market' },
                  { name: 'Nostra',  kind: 'Lending + LST + stablecoin' },
                  { name: 'Vesu',    kind: 'Modular lending pools (2024)' },
                  { name: 'Lending receipts',  kind: 'STRK / ETH deposits earn yield' },
                ],
              },
              {
                emoji: '👛',
                name: 'Argent X · Braavos · Ready',
                category: 'Smart Wallets',
                color: '#f59e0b',
                tag: 'native account abstraction',
                stats: 'Every wallet is a smart contract',
                apps: [
                  { name: 'Argent X',          kind: 'Default Starknet wallet, social recovery' },
                  { name: 'Braavos',           kind: 'Multi-sig + biometric signing' },
                  { name: 'Session keys',      kind: 'Sign once, play many in-game' },
                  { name: 'Multi-call',        kind: 'Approve + swap + stake in one tx' },
                ],
              },
              {
                emoji: '🤖',
                name: 'AI agents',
                category: 'Autonomous Agents',
                color: '#06b6d4',
                tag: 'on-chain AI experiments',
                stats: 'Frame in Cairo · agents w/ on-chain wallets',
                apps: [
                  { name: 'Eliza framework',   kind: 'Open-source agent runtime supports Starknet' },
                  { name: 'Agent wallets',     kind: 'Smart accounts AI can fund and act from' },
                  { name: 'On-chain AI infra', kind: 'Verifiable inference using STARK proofs' },
                  { name: 'Reasoning ✓ proofs', kind: 'Cairo enables proving model output' },
                ],
              },
            ].map(app => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl border-2 min-h-0"
                style={{ borderColor: app.color + '55', backgroundColor: app.color + '0a' }}
              >
                <div className="shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base shrink-0 leading-none">{app.emoji}</span>
                    <div className="font-black text-[12px] leading-tight" style={{ color: app.color }}>{app.name}</div>
                  </div>
                  <span
                    className="inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded mt-1"
                    style={{ backgroundColor: app.color + '20', color: app.color, border: `1px solid ${app.color}40` }}
                  >
                    {app.category}
                  </span>
                </div>

                <div className="shrink-0">
                  <div className="text-[10px] text-foreground font-medium leading-tight">{app.tag}</div>
                  <div className="text-[9px] text-muted-foreground italic leading-snug mt-0.5">{app.stats}</div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col gap-1">
                  {app.apps.map(item => (
                    <div
                      key={item.name}
                      className="rounded-md border bg-card/60 px-1.5 py-1 min-h-0"
                      style={{ borderColor: app.color + '35' }}
                    >
                      <div className="text-[10px] font-bold leading-tight" style={{ color: app.color }}>{item.name}</div>
                      <div className="text-[9px] text-muted-foreground leading-snug mt-0.5">{item.kind}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf60d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#8b5cf6' }}>Also worth knowing — </span>
              <span className="font-medium text-foreground">JediSwap</span>, <span className="font-medium text-foreground">mySwap</span> (alternative AMMs) · <span className="font-medium text-foreground">Mintsquare</span>, <span className="font-medium text-foreground">Briq</span> (NFT marketplaces) · <span className="font-medium text-foreground">Influence</span> (on-chain space MMO) · <span className="font-medium text-foreground">Ethereal / Topology</span> (game studios) · <span className="font-medium text-foreground">Voyager</span> · <span className="font-medium text-foreground">Starkscan</span> (block explorers) · <span className="font-medium text-foreground">Layerswap</span>, <span className="font-medium text-foreground">Orbiter</span> (bridges).
            </p>
          </div>
        </div>

        {/* ═══════ LAYER 2: OPTIMISTIC VS ZK ═══════ */}
        <div id="s4-layer2" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#39B54A]">Section 04</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Layer 2 Scaling: Optimistic vs ZK Rollups</h2>
            <p className="text-sm text-muted-foreground">Both rollup types execute transactions off-chain and post results to Ethereum L1 — but they differ fundamentally in <em>how they prove correctness</em>.</p>
          </div>
          <div className="flex-1 min-h-0 flex flex-col gap-4">
            {/* Head-to-head cards */}
            <div className="flex gap-4 flex-1 min-h-0">
              {/* Optimistic */}
              <div className="flex-1 flex flex-col rounded-xl border-2 border-[#f97316]/40 bg-card overflow-hidden">
                <div className="h-1.5 bg-[#f97316] shrink-0" />
                <div className="flex flex-col flex-1 p-4 gap-3 min-h-0">
                  <div className="shrink-0">
                    <div className="font-black text-lg text-[#f97316]">Optimistic Rollups</div>
                    <div className="text-xs text-muted-foreground font-medium">Assume valid until proven otherwise</div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">Transactions are posted to L1 with an <span className="font-semibold text-foreground">optimistic assumption</span> that they are valid. A 7-day challenge window allows anyone to submit a <span className="font-semibold text-[#f97316]">fraud proof</span> if they detect an invalid state transition.</div>
                  {[
                    { label: 'Proof type', value: 'Fraud proof (submitted if fraud detected)', color: '#f97316' },
                    { label: 'Finality', value: '~7-day withdrawal delay (challenge window)', color: '#ef4444' },
                    { label: 'Compute cost', value: 'Low — no proof generation overhead', color: '#39B54A' },
                    { label: 'EVM compatibility', value: '✅ Full EVM equivalence — deploy existing Solidity', color: '#39B54A' },
                    { label: 'Trust model', value: 'At least 1 honest verifier must watch the chain', color: '#f97316' },
                    { label: 'Main chains', value: 'Arbitrum One, Optimism, Base', color: '#f97316' },
                    { label: 'Best for', value: 'General DeFi, DApps needing EVM compatibility', color: '#6366f1' },
                  ].map(r => (
                    <div key={r.label} className="flex gap-2 text-xs shrink-0">
                      <span className="text-muted-foreground w-28 shrink-0">{r.label}</span>
                      <span style={{ color: r.color }} className="font-medium">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ZK */}
              <div className="flex-1 flex flex-col rounded-xl border-2 border-[#6366f1]/40 bg-card overflow-hidden">
                <div className="h-1.5 bg-[#6366f1] shrink-0" />
                <div className="flex flex-col flex-1 p-4 gap-3 min-h-0">
                  <div className="shrink-0">
                    <div className="font-black text-lg text-[#6366f1]">ZK Rollups</div>
                    <div className="text-xs text-muted-foreground font-medium">Cryptographic validity proof — no trust required</div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">Each batch of transactions is accompanied by a <span className="font-semibold text-foreground">zero-knowledge validity proof</span> (SNARK or STARK) that mathematically proves correctness. L1 verifies the proof — no challenge window needed.</div>
                  {[
                    { label: 'Proof type', value: 'Validity proof (ZK-SNARK or ZK-STARK)', color: '#6366f1' },
                    { label: 'Finality', value: '⚡ Minutes — as soon as L1 verifies the proof', color: '#39B54A' },
                    { label: 'Compute cost', value: 'High — proof generation is computationally intensive', color: '#ef4444' },
                    { label: 'EVM compatibility', value: '⚠️ Partial — zkEVM still maturing (Type 1–4 spectrum)', color: '#f97316' },
                    { label: 'Trust model', value: 'Trustless — math proves correctness, not watchers', color: '#39B54A' },
                    { label: 'Main chains', value: 'zkSync Era, Starknet, Polygon zkEVM, Scroll', color: '#6366f1' },
                    { label: 'Best for', value: 'Payments, exchanges, privacy apps, high-security finance', color: '#6366f1' },
                  ].map(r => (
                    <div key={r.label} className="flex gap-2 text-xs shrink-0">
                      <span className="text-muted-foreground w-28 shrink-0">{r.label}</span>
                      <span style={{ color: r.color }} className="font-medium">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shared mechanics + decision rule */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              <div className="p-4 bg-card border border-border rounded-xl">
                <div className="font-bold text-sm text-foreground mb-2">What both share</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex gap-2"><span className="text-[#39B54A]">•</span>Execute transactions off-chain, post compressed data to Ethereum L1</li>
                  <li className="flex gap-2"><span className="text-[#39B54A]">•</span>Inherit Ethereum's security — L1 is the final arbiter</li>
                  <li className="flex gap-2"><span className="text-[#39B54A]">•</span>10–100× cheaper than L1 for end users</li>
                  <li className="flex gap-2"><span className="text-[#39B54A]">•</span>Native bridges back to L1 (with different withdrawal times)</li>
                  <li className="flex gap-2"><span className="text-[#39B54A]">•</span>ERC-20 tokens and ETH work on both</li>
                </ul>
              </div>
              <div className="p-4 bg-[#6366f1]/8 border border-[#6366f1]/30 rounded-xl">
                <div className="font-bold text-sm text-[#6366f1] mb-2">How to choose</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex gap-2"><span className="text-[#f97316]">→</span><span><span className="font-semibold text-foreground">Need EVM compatibility today?</span> Use Arbitrum or Optimism — fastest path to deploy existing Solidity.</span></li>
                  <li className="flex gap-2"><span className="text-[#6366f1]">→</span><span><span className="font-semibold text-foreground">Need instant finality for payments/exchange?</span> Use a ZK rollup — users don't want to wait 7 days to withdraw.</span></li>
                  <li className="flex gap-2"><span className="text-[#6366f1]">→</span><span><span className="font-semibold text-foreground">Building privacy features?</span> ZK proofs are foundational — only ZK rollups enable transaction privacy by design.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ L2 APPS — what runs on each rollup ═══════ */}
        <div id="s4-l2apps" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What runs on each rollup</h2>
            <p className="text-sm text-muted-foreground mt-1">Mechanism (optimistic vs ZK) is one axis. Culture is another — each major rollup has developed a distinct app character that often matters more than the proving system.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-2.5">
            {[
              {
                emoji: '🟦',
                name: 'Arbitrum One',
                type: 'Optimistic',
                typeColor: '#f97316',
                color: '#28A0F0',
                culture: 'DeFi-heavy · mature ecosystem',
                tvl: '~$13B TVL — highest of any L2',
                apps: [
                  { name: 'GMX',     kind: 'Decentralised perpetuals' },
                  { name: 'Camelot', kind: 'Native DEX, concentrated liquidity' },
                  { name: 'Pendle',  kind: 'Yield-tokenisation primitive' },
                  { name: 'Radiant', kind: 'Cross-chain lending' },
                ],
              },
              {
                emoji: '🔴',
                name: 'Optimism · OP Stack',
                type: 'Optimistic',
                typeColor: '#f97316',
                color: '#FF0420',
                culture: 'Public-goods · modular framework',
                tvl: 'OP Stack also powers Base, Worldchain, Mode, opBNB',
                apps: [
                  { name: 'Velodrome',   kind: 'Vote-escrow DEX, cornerstone of OP DeFi' },
                  { name: 'Synthetix',   kind: 'Synthetic assets and on-chain perps' },
                  { name: 'Worldcoin',   kind: 'Iris-scan identity, $WLD' },
                  { name: 'Retro Funding', kind: 'Public-goods grants via OP DAO' },
                ],
              },
              {
                emoji: '🔵',
                name: 'Base (Coinbase)',
                type: 'OP Stack',
                typeColor: '#f97316',
                color: '#0052FF',
                culture: 'Consumer & social-first',
                tvl: '~$5B TVL · fastest user growth in 2024',
                apps: [
                  { name: 'Aerodrome',        kind: 'Velodrome fork, dominant Base DEX' },
                  { name: 'Zora',             kind: 'Mint-anything creator economy' },
                  { name: 'Farcaster Frames', kind: 'Mini-apps inside social posts' },
                  { name: 'friend.tech',      kind: '2023 hype-and-bust — honest case study' },
                ],
              },
              {
                emoji: '⬛',
                name: 'zkSync Era',
                type: 'ZK',
                typeColor: '#8b5cf6',
                color: '#1E69FF',
                culture: 'Native account abstraction',
                tvl: 'Earlier zkRollup · ZK Stack now powers other ZK chains',
                apps: [
                  { name: 'SyncSwap',  kind: 'Native AMM' },
                  { name: 'Maverick',  kind: 'Directional liquidity AMM' },
                  { name: 'ZeroLend',  kind: 'Lending market' },
                  { name: 'Native AA', kind: 'Every wallet is a smart contract by default' },
                ],
              },
              {
                emoji: '🟪',
                name: 'Starknet',
                type: 'ZK · Cairo',
                typeColor: '#8b5cf6',
                color: '#EC796B',
                culture: 'Gaming · AI agents · on-chain compute',
                tvl: 'Cairo-native VM · STARK proofs · STRK token',
                apps: [
                  { name: 'Realms / Loot Survivor', kind: 'Fully on-chain games (Dojo engine)' },
                  { name: 'Ekubo',                  kind: 'Starknet-native concentrated AMM' },
                  { name: 'Influence',              kind: 'On-chain space MMO' },
                  { name: 'AI Agent experiments',   kind: 'Autonomous agents with on-chain state' },
                ],
              },
            ].map(rollup => (
              <motion.div
                key={rollup.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl border-2 min-h-0"
                style={{ borderColor: rollup.color + '55', backgroundColor: rollup.color + '0a' }}
              >
                <div className="shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base shrink-0 leading-none">{rollup.emoji}</span>
                    <div className="font-black text-[12px] leading-tight" style={{ color: rollup.color }}>{rollup.name}</div>
                  </div>
                  <span
                    className="inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded mt-1"
                    style={{ backgroundColor: rollup.typeColor + '20', color: rollup.typeColor, border: `1px solid ${rollup.typeColor}40` }}
                  >
                    {rollup.type}
                  </span>
                </div>

                <div className="shrink-0">
                  <div className="text-[10px] text-foreground font-medium leading-tight">{rollup.culture}</div>
                  <div className="text-[9px] text-muted-foreground italic leading-snug mt-0.5">{rollup.tvl}</div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col gap-1">
                  {rollup.apps.map(app => (
                    <div
                      key={app.name}
                      className="rounded-md border bg-card/60 px-1.5 py-1 min-h-0"
                      style={{ borderColor: rollup.color + '35' }}
                    >
                      <div className="text-[10px] font-bold leading-tight" style={{ color: rollup.color }}>{app.name}</div>
                      <div className="text-[9px] text-muted-foreground leading-snug mt-0.5">{app.kind}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf60d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#8b5cf6' }}>How to choose — </span>
              DeFi-mature builder → Arbitrum or Base. Public goods or rollup-as-a-service → Optimism / OP Stack. Consumer & social with Coinbase reach → Base. Account-abstraction native → zkSync. Games or proof-heavy compute → Starknet. The mechanism (optimistic vs ZK) increasingly matters less than the ecosystem fit.
            </p>
          </div>
        </div>

        {/* ═══════ PRIVACY PRIMITIVES ═══════ */}
        <div id="s4-privacy" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Privacy on a public ledger</h2>
            <p className="text-sm text-muted-foreground mt-1">Public blockchains are radically transparent by default — every address, every balance, every transaction. Privacy requires extra cryptographic machinery, and each approach makes a different trade-off.</p>
          </div>

          <div className="shrink-0 mb-4 rounded-xl border p-3" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf60d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#8b5cf6' }}>Why this is hard</p>
            <p className="text-sm text-foreground mt-0.5 leading-snug">
              You cannot just "encrypt" a blockchain — validators must verify state transitions. The trick is letting them verify that <span className="italic">a transaction is valid</span> without learning <span className="italic">who, what, or how much</span>. Different projects pick different combinations of cryptography to achieve this.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-2.5">
            {[
              {
                icon: '🛡️',
                name: 'Zcash',
                sub: 'L1 · zk-SNARKs · 2016',
                color: '#f59e0b',
                mechanism: 'Two transaction types: transparent (like Bitcoin) and shielded (zero-knowledge). Shielded txs use zk-SNARKs to prove ownership and conservation of value without revealing sender, recipient, or amount.',
                tradeoff: 'Privacy is opt-in — most Zcash volume is transparent, weakening the anonymity set. Earlier shielded scheme required a one-time trusted setup ceremony.',
                today: 'Halo arc removed trusted setup · still active · lost ground to mandatory-privacy chains.',
              },
              {
                icon: '👁️‍🗨️',
                name: 'Monero',
                sub: 'L1 · ring sigs + stealth · 2014',
                color: '#ef4444',
                mechanism: 'Mandatory privacy by combining three techniques: ring signatures (sender hidden in a group of N), stealth addresses (recipient gets a fresh one-time address), and RingCT (amount hidden via Pedersen commitments).',
                tradeoff: 'No optional transparency — auditing or compliance is genuinely hard, which is why exchanges have delisted XMR in many jurisdictions. Larger transaction size, slower verification.',
                today: 'Most-used privacy coin · target of sustained regulator pressure · removed from major centralised exchanges since 2024.',
              },
              {
                icon: '🧬',
                name: 'Aztec · Aleo',
                sub: 'ZK app-layer privacy · 2023+',
                color: '#10b981',
                mechanism: 'Programmable privacy. Aztec is a ZK rollup on Ethereum where smart contracts can have private state and inputs. Aleo is its own L1 with the same idea. Both use zk-SNARKs to prove arbitrary private computation.',
                tradeoff: 'Much more flexible than fixed-purpose privacy coins (build any private dApp), but the dev tooling is newer and more complex (Noir, Leo languages). Privacy is at the contract level, not always at the chain level.',
                today: 'Aztec mainnet rolled out 2024-25 · target use cases: private DeFi, KYC-without-disclosure, confidential payroll.',
              },
              {
                icon: '🔀',
                name: 'Mixers · sanctioned',
                sub: 'Tornado Cash · cautionary case',
                color: '#6b7280',
                mechanism: 'Pool deposits from many users, then let each withdraw to a fresh address — breaking the on-chain link between sender and recipient. Used both for legitimate privacy and for laundering hacked funds.',
                tradeoff: 'Smart-contract mixers (no operator) are immutable and credibly neutral, but exactly that property made them a regulator target. Users who deposited legitimately have struggled to withdraw to compliant exchanges.',
                today: 'OFAC sanctioned Tornado Cash (Aug 2022) · Samourai Wallet co-founders arrested 2024 · regulatory line for "privacy tooling" still being drawn.',
              },
            ].map(p => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5 p-2.5 rounded-xl border-2 min-h-0"
                style={{ borderColor: p.color + '55', backgroundColor: p.color + '0a' }}
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-lg shrink-0 leading-none">{p.icon}</span>
                  <div className="min-w-0">
                    <div className="font-black text-[12px] leading-tight" style={{ color: p.color }}>{p.name}</div>
                    <div className="text-[9px] text-muted-foreground leading-tight">{p.sub}</div>
                  </div>
                </div>

                <div className="rounded-md border bg-card/60 p-1.5" style={{ borderColor: p.color + '30' }}>
                  <div className="text-[8px] font-bold uppercase tracking-wider" style={{ color: p.color }}>Mechanism</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{p.mechanism}</div>
                </div>

                <div className="rounded-md border bg-card/60 p-1.5 flex-1 min-h-0" style={{ borderColor: p.color + '30' }}>
                  <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">Trade-off</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{p.tradeoff}</div>
                </div>

                <div className="rounded-md p-1.5 border-l-2" style={{ borderColor: p.color, backgroundColor: p.color + '12' }}>
                  <div className="text-[8px] font-black uppercase tracking-widest" style={{ color: p.color }}>Today</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{p.today}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b0d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#f59e0b' }}>The regulatory frontier — </span>
              Privacy on public chains is the most contested area in crypto. OFAC sanctioned Tornado Cash in 2022 and the Samourai Wallet team was arrested in 2024 — both for non-custodial code. The line between "privacy tool" and "money-laundering infrastructure" is being drawn in court right now. Build with this in mind, and design with selective-disclosure or proof-of-compliance options where regulation matters.
            </p>
          </div>
        </div>

        {/* ═══════ EVALUATE A PROJECT ═══════ */}
        <div id="s4-evaluate" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How to evaluate a project — a working checklist</h2>
            <p className="text-sm text-muted-foreground mt-1">Before you trust a protocol with your funds — or build on top of one — run through these six axes. The best projects pass most of them. Most fail at least one.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-2.5">
            {[
              {
                icon: '👥',
                title: 'Team & track record',
                color: '#6366f1',
                green: ['Doxxed founders with verifiable history', 'Prior shipped products in the space', 'Active GitHub commits, not just whitepapers'],
                red:   ['Anonymous team with no on-chain history', 'Founders previously linked to rugged projects', 'LinkedIn profiles created last month'],
              },
              {
                icon: '🔍',
                title: 'Smart contract & audits',
                color: '#10b981',
                green: ['Multiple audits from reputable firms (Trail of Bits, ConsenSys Diligence, OpenZeppelin)', 'Findings publicly addressed', 'Verified source on Etherscan'],
                red:   ['No audits, or audits older than the current code', '"Audit" by an unknown firm', 'Upgradeable proxy with single-key admin · no timelock'],
              },
              {
                icon: '💰',
                title: 'Token distribution',
                color: '#f59e0b',
                green: ['Clear vesting schedule for team & investors', 'Top 10 holders < 30% of supply', 'On-chain treasury controlled by multisig or DAO'],
                red:   ['Team unlock cliffs that dump on retail', 'Top wallet holds > 50% of supply', '"Treasury" is one EOA controlled by anon dev'],
              },
              {
                icon: '🌊',
                title: 'Liquidity & lock-ups',
                color: '#8b5cf6',
                green: ['LP tokens locked for 6-12+ months', 'Deep pools across multiple DEXes', 'Buy/sell pressure roughly symmetric'],
                red:   ['Liquidity provided by team without lock', 'Single thin pool · withdraw and the price collapses', 'Tax-on-transfer tokens (especially asymmetric)'],
              },
              {
                icon: '📣',
                title: 'Marketing & promises',
                color: '#ec4899',
                green: ['Documentation that explains trade-offs honestly', 'Clear roadmap with realistic timelines', 'Engagement with critical questions'],
                red:   ['Guaranteed APY · "risk-free yield" · "100x potential"', 'Celebrity / influencer pump campaigns', 'Banned-word use: "next Bitcoin", "Ethereum killer"'],
              },
              {
                icon: '🔬',
                title: 'On-chain analysis',
                color: '#06b6d4',
                green: ['Real users (unique addresses growing organically)', 'TVL and volume verifiable on DeFiLlama', 'Diverse holder base across cohorts'],
                red:   ['Volume from a few wallets cycling each other (wash trading)', 'TVL inflated by recursive lending of one asset', 'Snapshot of daily active addresses suspiciously round'],
              },
            ].map(c => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2 p-3 rounded-xl border-2 min-h-0"
                style={{ borderColor: c.color + '50', backgroundColor: c.color + '08' }}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-lg shrink-0 leading-none">{c.icon}</span>
                  <div className="font-black text-sm leading-tight" style={{ color: c.color }}>{c.title}</div>
                </div>

                <div className="rounded-md border bg-card/60 p-1.5 flex-1 min-h-0" style={{ borderColor: '#39B54A40' }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: '#39B54A' }}>✓ Green flags</div>
                  {c.green.map((item, i) => (
                    <div key={i} className="text-[10px] text-muted-foreground leading-snug">· {item}</div>
                  ))}
                </div>

                <div className="rounded-md border bg-card/60 p-1.5 flex-1 min-h-0" style={{ borderColor: '#ED1C2440' }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: '#ED1C24' }}>✗ Red flags</div>
                  {c.red.map((item, i) => (
                    <div key={i} className="text-[10px] text-muted-foreground leading-snug">· {item}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#06b6d455', backgroundColor: '#06b6d40d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#06b6d4' }}>Tools you can use today — </span>
              <span className="font-medium text-foreground">Etherscan / block explorers</span> (verify contracts, read holders) · <span className="font-medium text-foreground">DeFiLlama</span> (TVL, real volumes) · <span className="font-medium text-foreground">Token Terminal</span> (revenue, P/E equivalents) · <span className="font-medium text-foreground">Nansen / Arkham</span> (wallet labelling, smart-money flows) · <span className="font-medium text-foreground">Dune dashboards</span> (custom on-chain analytics). Most red flags above are visible in 10 minutes if you know where to look.
            </p>
          </div>
        </div>

        {/* ═══════ DECISION FRAMEWORK ═══════ */}
        <div id="s4-decision" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Choosing a platform — a decision framework</h2>
            <p className="text-sm text-muted-foreground mt-1">The course's promise was: compare, evaluate, and select platforms based on architecture and trade-offs. This is the synthesis — answer five questions in order, and the platform space narrows fast.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: 5-question decision tree */}
            <div className="flex flex-col gap-2 min-h-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">Five questions, in order</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  {
                    n: '1',
                    q: 'Permission model',
                    ask: 'Should anyone be able to read & write, or only known parties?',
                    answers: [
                      { tag: 'Anyone', recs: 'Bitcoin · Ethereum · L2s · Cosmos · Solana', color: '#6366f1' },
                      { tag: 'Known parties only', recs: 'Hyperledger Fabric · Corda · Quorum / Besu', color: '#39B54A' },
                    ],
                  },
                  {
                    n: '2',
                    q: 'Programmability',
                    ask: 'Just transfer value, or run application logic on-chain?',
                    answers: [
                      { tag: 'Value transfer only', recs: 'Bitcoin L1 · Lightning for retail payments', color: '#f59e0b' },
                      { tag: 'Smart contracts', recs: 'Ethereum + EVM family · Cosmos SDK · Cairo / Starknet', color: '#6366f1' },
                    ],
                  },
                  {
                    n: '3',
                    q: 'Throughput & cost ceiling',
                    ask: 'How sensitive is the app to gas costs and confirmation latency?',
                    answers: [
                      { tag: 'Low — settlement / high-value', recs: 'Ethereum L1', color: '#627EEA' },
                      { tag: 'High — consumer / DeFi', recs: 'Arbitrum · Base · Optimism · Solana', color: '#ec4899' },
                    ],
                  },
                  {
                    n: '4',
                    q: 'Privacy needs',
                    ask: 'Does the app require selective or full data confidentiality?',
                    answers: [
                      { tag: 'No', recs: 'Default chain choice', color: '#6b7280' },
                      { tag: 'Yes', recs: 'Aztec · Starknet (ZK creds) · Zcash · Fabric channels', color: '#8b5cf6' },
                    ],
                  },
                  {
                    n: '5',
                    q: 'Sovereignty vs shared security',
                    ask: 'Need full control over consensus, gas, upgrades — or to inherit security from day one?',
                    answers: [
                      { tag: 'Sovereignty', recs: 'Cosmos zone · Avalanche L1', color: '#22d3ee' },
                      { tag: 'Shared security', recs: 'Polkadot parachain · Ethereum rollup · Babylon-secured chain', color: '#ED1C24' },
                    ],
                  },
                ].map(step => (
                  <div key={step.n} className="rounded-xl border p-2.5 bg-card min-h-0" style={{ borderColor: 'hsl(var(--border))' }}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <div className="size-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: '#6366f1' }}>{step.n}</div>
                      <div className="font-bold text-xs text-foreground leading-tight">{step.q}</div>
                      <div className="text-[10px] text-muted-foreground italic leading-tight ml-auto">{step.ask}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 ml-7">
                      {step.answers.map((a, i) => (
                        <div key={i} className="rounded-md border px-1.5 py-1" style={{ borderColor: a.color + '40', backgroundColor: a.color + '0d' }}>
                          <div className="text-[9px] font-black uppercase tracking-wider" style={{ color: a.color }}>{a.tag}</div>
                          <div className="text-[10px] text-muted-foreground leading-snug">{a.recs}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: use-case → platform map */}
            <div className="flex flex-col gap-2 min-h-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">Worked examples — use case to platform</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  { use: 'Cross-border remittance, low value', rec: 'Bitcoin Lightning · USDC on Base / Solana', why: 'Low cost · sub-second finality · users already trust USD-denominated value', color: '#f59e0b' },
                  { use: 'High-value DeFi protocol', rec: 'Ethereum L1 + L2 deployment', why: 'L1 for vault security, L2 for user flow · deepest liquidity · audits available', color: '#627EEA' },
                  { use: 'Multi-company supply chain', rec: 'Hyperledger Fabric channel', why: 'Permissioned access control · selective data sharing · no token economics needed', color: '#39B54A' },
                  { use: 'Privacy-preserving identity / KYC', rec: 'Starknet (Cairo + ZK creds) · Aztec', why: 'Programmable privacy · verifiable claims without disclosure · L1 settlement', color: '#8b5cf6' },
                  { use: 'On-chain game with tradable assets', rec: 'Immutable · Ronin · Starknet (Dojo) · Base', why: 'Throughput · low gas · gaming-focused tooling · existing player ecosystems', color: '#ec4899' },
                  { use: 'Sovereign app-chain with custom consensus', rec: 'Cosmos zone via Cosmos SDK', why: 'Pick your VM, gas token, governance · trade-off: bootstrap your own validators', color: '#22d3ee' },
                  { use: 'Cross-border govt credentials', rec: 'EU EBSI (Fabric-based) · purpose-built consortium', why: 'Regulator-mandated participation · interop required at policy level', color: '#6366f1' },
                ].map(c => (
                  <div key={c.use} className="rounded-lg border p-2 min-h-0 flex flex-col gap-0.5" style={{ borderColor: c.color + '40', backgroundColor: c.color + '08' }}>
                    <div className="text-[10px] font-bold leading-tight" style={{ color: c.color }}>{c.use}</div>
                    <div className="text-[11px] font-semibold text-foreground leading-snug">→ {c.rec}</div>
                    <div className="text-[10px] text-muted-foreground italic leading-snug">{c.why}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#6366f155', backgroundColor: '#6366f10d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#6366f1' }}>The honest meta-answer — </span>
              Most projects get this wrong by picking a platform first and forcing the use case onto it. Run through these five questions before naming a chain. If the use case doesn't actually need a blockchain at all, that's a valid answer too — a Postgres database with row-level signatures is often the right tool.
            </p>
          </div>
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s4-quiz" className="h-full">
          <QuizSlide
            question="Cross-chain bridges have been responsible for the largest hacks in crypto history — Ronin ($625M), Wormhole ($320M), Nomad ($190M). What architectural property makes bridges such high-value targets?"
            options={[
              { text: 'Bridges use proof-of-authority consensus controlled by a single company, making them easy to corrupt.', correct: false },
              { text: 'Bridges require KYC verification, creating a centralized identity database attackers can exploit.', correct: false },
              { text: 'Bridges concentrate large amounts of locked assets in a single smart contract on one chain while issuing representations on another — creating a honeypot with a single point of failure.', correct: true },
              { text: 'Bridges are slower than direct transactions, giving attackers more time to execute front-running attacks during the transfer window.', correct: false },
            ]}
            explanation="To bridge 1 ETH from Ethereum to another chain, you lock the ETH in a smart contract on Ethereum and mint a wrapped version on the destination chain. Every user who bridges concentrates their locked assets in that one contract — making it an increasingly valuable target. The Ronin bridge held $625M in locked ETH and USDC before attackers compromised 5 of 9 validator keys and drained it. The fundamental tension is that bridges require centralization (trusted validators or multisig) to operate efficiently, which directly conflicts with blockchain's trust minimization principle. Native interoperability protocols like IBC avoid this by design."
          />
        </div>

        {/* ═══════ QUIZ 2 — Optimistic vs ZK withdrawal latency ═══════ */}
        <div id="s4-quiz-2" className="h-full">
          <QuizSlide
            question="A user withdraws funds from Arbitrum (an optimistic rollup) back to Ethereum L1. The standard withdrawal takes ~7 days. Why?"
            options={[
              { text: 'L1 block time is slower than L2 block time, so L1 must catch up before processing the withdrawal.', correct: false },
              { text: 'Optimistic rollups assume transactions valid by default. The 7-day "challenge window" lets anyone submit a fraud proof if the L2 state is invalid; until that window closes, withdrawals can\'t be safely finalised on L1.', correct: true },
              { text: 'Arbitrum batches withdrawals weekly to amortise gas costs across users.', correct: false },
              { text: 'Ethereum L1 deliberately rate-limits L2 withdrawals to prevent rollup-induced congestion.', correct: false },
            ]}
            explanation="The 7-day delay is structural to the optimistic rollup model. The L2 sequencer posts state roots to L1 with the assumption they're valid; anyone watching the chain can challenge an invalid root by submitting a fraud proof during the challenge window. Until that window expires, L1 cannot trust the state root enough to release withdrawals. ZK rollups don't have this delay — each batch ships with a validity proof that L1 verifies cryptographically, so withdrawals can finalise in one L1 block. Third-party fast bridges (Across, Hop, Stargate) let users skip the wait by paying liquidity providers a small premium up front."
          />
        </div>

        {/* ═══════ QUIZ 3 — Sovereignty vs shared security ═══════ */}
        <div id="s4-quiz-3" className="h-full">
          <QuizSlide
            question="A team is launching a new app-specific blockchain. They need full control over consensus algorithm, gas token, and upgrade governance. Which model best fits — and what's the trade-off?"
            options={[
              { text: 'Polkadot parachain via Coretime — sovereignty within the relay chain\'s shared security envelope, no trade-off.', correct: false },
              { text: 'Cosmos zone via Cosmos SDK — full sovereignty over consensus, gas, and upgrades; the trade-off is bootstrapping their own validator set without inheriting any external security.', correct: true },
              { text: 'Avalanche L1 — sovereign chains, but they must use Snowman consensus and pay AVAX-denominated subscription fees.', correct: false },
              { text: 'All three give equal sovereignty; the decision is purely cost-driven.', correct: false },
            ]}
            explanation="Cosmos zones are sovereign by design. Each chain picks its own consensus engine (CometBFT is default, but anything goes), its own gas token, its own governance and upgrade rules. The trade-off is real: the team must recruit validators, design economic security, and bootstrap a token of value to pay them — no shared security comes for free. Polkadot parachains share the relay chain's validator set (great), but must conform to the relay's runtime model and Coretime schedule (less sovereignty than Cosmos). Avalanche L1s (formerly Subnets, renamed via ACP-13/77 in 2024) do allow custom VMs and validator subsets, but in practice most run Snowman variants and pay validator fees in AVAX. The honest framing: shared security versus sovereignty is a trade-off, not a tier list."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s4-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 04 — Key Takeaways"
            takeaways={[
              'Blockchain interoperability allows assets and data to move across separate chains',
              'Cosmos uses IBC (Inter-Blockchain Communication) to connect sovereign application-specific blockchains',
              'Layer 0 protocols provide shared security and communication infrastructure for multiple chains',
              'Starknet uses ZK-Rollups and the Cairo VM to scale Ethereum with cryptographic proofs',
              'The future of blockchain is a network of networks — not a single chain to rule them all',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
