import { useState } from 'react';
import { motion } from 'motion/react';
import { ConceptSlide } from '../../components/templates/ConceptSlide';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Network } from 'lucide-react';

const chapters = [
  { id: 's4-interop',         label: 'Interoperability' },
  { id: 's4-interop-compare', label: 'Approaches Compared' },
  { id: 's4-bridges',         label: 'Bridge Security' },
  { id: 's4-cosmos',          label: 'Cosmos' },
  { id: 's4-cosmos-eco',      label: 'Cosmos Apps' },
  { id: 's4-layer0',          label: 'Layer 0: Concept' },
  { id: 's4-layer0-2',        label: 'Layer 0: Platforms' },
  { id: 's4-polkadot',        label: 'Polkadot' },
  { id: 's4-polkadot-eco',   label: 'Polkadot Apps' },
  { id: 's4-avalanche',       label: 'Avalanche' },
  { id: 's4-avalanche-eco',  label: 'Avalanche Apps' },
  { id: 's4-xrp',             label: 'XRP Ledger' },
  { id: 's4-xrp-eco',         label: 'XRP Apps' },
  { id: 's4-quiz',            label: 'Quiz' },
  { id: 's4-takeaways',       label: 'Takeaways' },
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
            title="Interoperability"
            subtitle="Cross-chain bridges, Cosmos IBC, Layer 0, and XRP"
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

        {/* ═══════ S4-INTEROP-COMPARE ═══════ */}
        <div id="s4-interop-compare" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Interoperability Approaches — Compared</h2>
            <p className="text-sm text-muted-foreground mt-1">Three fundamentally different answers to the same question: how do two blockchains exchange value or messages without trusting a third party?</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Column 1 — Bridges & Wrapped Tokens */}
            <div className="flex flex-col gap-2 min-h-0 rounded-xl border-2 p-4" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b05' }}>
              <div className="shrink-0">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#f59e0b' }}>Approach 1</div>
                <div className="text-lg font-black text-foreground leading-tight">Bridges &amp; Wrapped Tokens</div>
                <div className="text-xs text-muted-foreground mt-0.5">Lock-and-mint · smart-contract based</div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col gap-2">
                {[
                  { label: 'Mechanism', value: 'Lock native asset in a smart contract on the source chain → mint a wrapped representation on the destination chain', color: '#f59e0b' },
                  { label: 'Trust model', value: 'Multisig validators or MPC — a set of off-chain operators must agree before releasing funds', color: '#f97316' },
                  { label: 'Risk', value: 'Locked assets accumulate in one contract — a $500M TVL bridge is a $500M bug bounty', color: '#ef4444' },
                  { label: 'Finality', value: 'Minutes to hours depending on source-chain confirmation depth', color: '#6b7280' },
                  { label: 'Compatibility', value: 'Works between any two chains with no shared infrastructure required', color: '#10b981' },
                ].map(r => (
                  <div key={r.label} className="flex flex-col gap-0.5 p-2 rounded-lg bg-card border border-border">
                    <div className="text-[9px] font-black uppercase tracking-wider" style={{ color: r.color }}>{r.label}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{r.value}</div>
                  </div>
                ))}
                <div className="mt-auto p-2 rounded-lg border" style={{ borderColor: '#f59e0b40', backgroundColor: '#f59e0b08' }}>
                  <div className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: '#f59e0b' }}>Examples</div>
                  <div className="text-[11px] text-muted-foreground">WBTC · Ronin · Wormhole · Hop Protocol · LayerZero · Stargate</div>
                </div>
              </div>
            </div>

            {/* Column 2 — Protocol-native / IBC */}
            <div className="flex flex-col gap-2 min-h-0 rounded-xl border-2 p-4" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee05' }}>
              <div className="shrink-0">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#22d3ee' }}>Approach 2</div>
                <div className="text-lg font-black text-foreground leading-tight">Protocol-native / IBC</div>
                <div className="text-xs text-muted-foreground mt-0.5">Light clients · trust-minimized messaging</div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col gap-2">
                {[
                  { label: 'Mechanism', value: 'Each chain runs a light client of the other — proofs of state transitions are verified on-chain, not by an external operator', color: '#22d3ee' },
                  { label: 'Trust model', value: 'Cryptographic — the sending chain\'s consensus is the source of truth. No separate validator set needed', color: '#10b981' },
                  { label: 'Risk', value: 'No honeypot contract — messages, not locked assets, flow across. Zero IBC hacks to date', color: '#10b981' },
                  { label: 'Finality', value: 'As fast as both chains\' consensus — typically 1–6 seconds end-to-end', color: '#22d3ee' },
                  { label: 'Compatibility', value: 'Requires both chains to implement the IBC standard — limited to the IBC ecosystem today', color: '#f59e0b' },
                ].map(r => (
                  <div key={r.label} className="flex flex-col gap-0.5 p-2 rounded-lg bg-card border border-border">
                    <div className="text-[9px] font-black uppercase tracking-wider" style={{ color: r.color }}>{r.label}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{r.value}</div>
                  </div>
                ))}
                <div className="mt-auto p-2 rounded-lg border" style={{ borderColor: '#22d3ee40', backgroundColor: '#22d3ee08' }}>
                  <div className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: '#22d3ee' }}>Examples</div>
                  <div className="text-[11px] text-muted-foreground">Cosmos IBC · IBC Eureka (Ethereum) · Polkadot XCM (within parachains)</div>
                </div>
              </div>
            </div>

            {/* Column 3 — Layer 0 Network */}
            <div className="flex flex-col gap-2 min-h-0 rounded-xl border-2 p-4" style={{ borderColor: '#6366f155', backgroundColor: '#6366f105' }}>
              <div className="shrink-0">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#6366f1' }}>Approach 3</div>
                <div className="text-lg font-black text-foreground leading-tight">Layer 0 Network</div>
                <div className="text-xs text-muted-foreground mt-0.5">Shared validators · native cross-chain calls</div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col gap-2">
                {[
                  { label: 'Mechanism', value: 'A shared validator set (Relay Chain / Primary Network) secures all connected L1s — cross-chain messaging is a native protocol operation, not a smart contract', color: '#6366f1' },
                  { label: 'Trust model', value: 'The L0\'s own validators — the same set that finalises blocks also validates cross-chain messages', color: '#10b981' },
                  { label: 'Risk', value: 'Within-L0 messaging is as secure as the L0 itself. External bridges still needed for chains outside the ecosystem', color: '#f59e0b' },
                  { label: 'Finality', value: 'Native — cross-chain calls settle in the same block production cycle as regular transactions', color: '#10b981' },
                  { label: 'Compatibility', value: 'Chains must plug into the L0 and conform to its runtime rules — maximum security, minimum flexibility', color: '#ef4444' },
                ].map(r => (
                  <div key={r.label} className="flex flex-col gap-0.5 p-2 rounded-lg bg-card border border-border">
                    <div className="text-[9px] font-black uppercase tracking-wider" style={{ color: r.color }}>{r.label}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{r.value}</div>
                  </div>
                ))}
                <div className="mt-auto p-2 rounded-lg border" style={{ borderColor: '#6366f140', backgroundColor: '#6366f108' }}>
                  <div className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: '#6366f1' }}>Examples</div>
                  <div className="text-[11px] text-muted-foreground">Polkadot (Relay Chain + XCM) · Avalanche (Primary Network + Warp) · Babylon (BTC security layer)</div>
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
        {/* ═══════ S4-LAYER0 (1/2) — Concept ═══════ */}
        <div id="s4-layer0" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Layer 0: Infrastructure for Blockchains
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              The substrate beneath Layer 1 chains — a shared validator set, security, and messaging fabric that multiple L1s plug into.
            </p>
          </div>

          {/* One-line definition with analogy */}
          <div className="shrink-0 mb-5 rounded-xl border p-4" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee0d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#22d3ee' }}>In one line</p>
            <p className="text-sm text-foreground mt-1 leading-snug">
              A Layer 0 leases <span className="font-semibold">validators, security, and messaging</span> to many L1s at once — so a new chain doesn't need to bootstrap its own validator set from scratch.
            </p>
            <p className="text-xs text-muted-foreground italic mt-2">
              Think of it as the internet backbone: many ISPs (L1s) plug into shared cables (L0) instead of each laying their own.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">

            {/* Left — Stack visual */}
            <div className="flex flex-col gap-4 min-h-0">
              <div className="flex-1 p-4 bg-card/50 rounded-xl border border-border flex flex-col justify-center">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">The stack — read bottom-up</p>
                <div className="flex flex-col-reverse gap-2">
                  {[
                    { num: '0', label: 'Layer 0',  sub: 'Relay / Primary Network · shared validators',  border: '#22d3ee' },
                    { num: '1', label: 'Layer 1',  sub: 'App-specific chains plugged into L0',          border: '#6366f1' },
                    { num: '2', label: 'Layer 2',  sub: 'Rollups built on top of an L1',                border: '#8b5cf6' },
                  ].map(layer => (
                    <div
                      key={layer.label}
                      className="p-3 rounded-lg flex items-center gap-3"
                      style={{ backgroundColor: layer.border + '20', border: `1px solid ${layer.border}` }}
                    >
                      <div
                        className="size-8 rounded-md flex items-center justify-center text-sm font-black shrink-0"
                        style={{ backgroundColor: layer.border + '30', color: layer.border }}
                      >L{layer.num}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-tight" style={{ color: layer.border }}>{layer.label}</p>
                        <p className="text-xs text-muted-foreground leading-tight mt-0.5">{layer.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — What L0 provides */}
            <div className="flex flex-col gap-3 min-h-0">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">What Layer 0 provides</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-3">
                {[
                  { icon: '🔐', title: 'Shared security',          desc: 'A pooled validator set secures every L1 connected to it. New chains inherit security on day 1 — no need to find their own validators.' },
                  { icon: '📨', title: 'Native cross-chain messaging', desc: 'L0 defines the message format and trust model for inter-L1 communication (XCM, Warp) — no third-party bridge needed.' },
                  { icon: '⚙️', title: 'Shared infrastructure',     desc: 'Block production, finality, governance and upgrades live at L0. L1s focus only on application logic and tokenomics.' },
                ].map(c => (
                  <div key={c.title} className="rounded-xl border border-[#22d3ee]/30 bg-card p-4 flex items-start gap-3 min-h-0">
                    <span className="text-2xl shrink-0 leading-none mt-0.5">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground">{c.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ S4-LAYER0 (2/2) — Platforms ═══════ */}
        <div id="s4-layer0-2" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Layer 0: Known Platforms & Trade-offs</h2>
            <p className="text-sm text-muted-foreground mt-1">The three active L0 networks today — and how the L0 model compares to Cosmos's sovereign-chain approach.</p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">

            {/* Left — L0 platforms */}
            <div className="flex flex-col gap-3 min-h-0">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">Known Layer 0 platforms</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-3">
                {[
                  { emoji: '🔴', name: 'Polkadot', token: 'DOT', consensus: 'BABE + GRANDPA', color: '#e6007a', tagline: 'Relay Chain + Parachains · XCM native messaging · Coretime model (2024)' },
                  { emoji: '🔺', name: 'Avalanche', token: 'AVAX', consensus: 'Snowman (sub-1s)', color: '#e84142', tagline: 'Primary Network (X/P/C-Chain) + sovereign Avalanche L1s · Warp messaging' },
                  { emoji: '₿', name: 'Babylon', token: 'BABY', consensus: 'BTC-staked PoS', color: '#f59e0b', tagline: 'Uses Bitcoin staking to provide shared security to any PoS chain — no new token needed' },
                ].map(p => (
                  <div key={p.name} className="rounded-xl p-4 min-h-0 flex flex-col gap-2" style={{ borderWidth: '1px', borderColor: p.color + '55', backgroundColor: p.color + '08' }}>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-base">{p.emoji}</span>
                      <p className="text-base font-bold text-foreground">{p.name}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: p.color + '18', color: p.color, border: `1px solid ${p.color}35` }}>{p.token}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{p.consensus}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">{p.tagline}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Trade-off vs Cosmos */}
            <div className="flex flex-col justify-center min-h-0">
              <div className="rounded-xl p-6" style={{ borderWidth: '1px', borderColor: '#6366f155', backgroundColor: '#6366f10d' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: '#6366f1' }}>The design trade-off</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-bold text-foreground mb-2">Layer 0 model</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-[#10b981]">↑</span> shared security on day 1<br/>
                      <span className="text-[#10b981]">↑</span> native cross-chain messaging<br/>
                      <span className="text-[#ef4444]">↓</span> chains must follow L0 rules
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-2">Cosmos model</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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

        {/* ═══════ S4-POLKADOT ═══════ */}
        <div id="s4-polkadot" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Polkadot — shared security for sovereign parachains</h2>
            <p className="text-sm text-muted-foreground mt-1">A Relay Chain that pools ~300 validators to secure all connected parachains simultaneously. Cross-chain calls between parachains use XCM — no bridge contract, no wrapped token.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left — Architecture cards */}
            <div className="flex flex-col gap-2 min-h-0">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">Architecture</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  { icon: '🔗', title: 'Relay Chain', color: '#e6007a', desc: 'The L0 backbone. ~300 validators (BABE block production + GRANDPA finality) secure every parachain slot simultaneously. Validators rotate across parachains, so no single chain can be attacked in isolation.' },
                  { icon: '🧩', title: 'Parachains & Coretime', color: '#8b5cf6', desc: 'Parachains are L1s that rent block-production time (Coretime) on the Relay Chain — replacing the old slot-auction model in 2024. Each parachain gets shared security without bootstrapping its own validator set.' },
                  { icon: '📨', title: 'XCM — Cross-Consensus Messaging', color: '#10b981', desc: 'A native message format for calls between parachains. Assets and instructions travel trustlessly — verified by the Relay Chain validators, not a bridge multisig. No lock-and-mint, no honeypot.' },
                  { icon: '🌉', title: 'Bridges to external chains', color: '#f59e0b', desc: 'Snowbridge (Ethereum ↔ Polkadot) and other dedicated bridge parachains connect to chains outside the Relay Chain. These use traditional bridge security, distinct from XCM.' },
                ].map(c => (
                  <div key={c.title} className="rounded-xl border bg-card p-2.5 flex items-start gap-2.5 min-h-0" style={{ borderColor: c.color + '40' }}>
                    <span className="text-base shrink-0 leading-none mt-0.5">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight" style={{ color: c.color }}>{c.title}</p>
                      <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Key metrics + DOT economics + 2024 */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="grid grid-cols-3 gap-2 shrink-0">
                {[
                  { metric: '~300', label: 'active validators' },
                  { metric: '6 s', label: 'epoch finality' },
                  { metric: '50+', label: 'active parachains' },
                ].map(s => (
                  <div key={s.label} className="px-2 py-1.5 rounded-lg border border-[#e6007a]/30 bg-[#e6007a]/05 text-center">
                    <div className="text-xs font-black text-[#e6007a] leading-none">{s.metric}</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="shrink-0 p-3 rounded-xl border" style={{ borderColor: '#e6007a40', backgroundColor: '#e6007a08' }}>
                <p className="text-[10px] font-bold text-[#e6007a] mb-1.5 flex items-center gap-1.5"><span>💎</span> DOT economics</p>
                <ul className="space-y-1 text-[11px] text-muted-foreground leading-snug">
                  <li>· Staked DOT secures the Relay Chain — validators are slashed for misbehaviour</li>
                  <li>· Coretime is purchased with DOT (on-demand or bulk) — replaces slot auctions</li>
                  <li>· Governance: OpenGov lets any DOT holder propose and vote on referenda</li>
                </ul>
              </div>

              <div className="flex-1 min-h-0 p-3 rounded-xl border" style={{ borderColor: '#8b5cf640', backgroundColor: '#8b5cf608' }}>
                <p className="text-[10px] font-bold text-[#8b5cf6] mb-1.5">2024–2025 developments</p>
                <ul className="space-y-1.5 text-[11px] text-muted-foreground leading-snug">
                  <li>· <span className="font-medium text-foreground">Coretime launch</span> — slot auctions replaced by flexible block-time marketplace</li>
                  <li>· <span className="font-medium text-foreground">Agile Coretime</span> — chains can buy seconds of block-time rather than full parachain slots</li>
                  <li>· <span className="font-medium text-foreground">JAM Protocol</span> — next-gen Relay Chain redesign (proposed by Gavin Wood) for more general-purpose compute</li>
                  <li>· <span className="font-medium text-foreground">Snowbridge live</span> — trustless Ethereum ↔ Polkadot bridge using on-chain light clients</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ S4-POLKADOT-ECO ═══════ */}
        <div id="s4-polkadot-eco" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Polkadot ecosystem — apps across parachains</h2>
            <p className="text-sm text-muted-foreground mt-1">Each parachain is sovereign — they specialise. EVM compatibility, DeFi hubs, enterprise smart contracts, trustless Bitcoin wrapping: the DOT ecosystem covers the full stack.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-2.5">
            {[
              {
                emoji: '🌕',
                name: 'Moonbeam',
                category: 'EVM Parachain',
                color: '#53cbc8',
                tag: 'Ethereum compatibility layer',
                stats: 'Full EVM — Solidity deploys unchanged',
                apps: [
                  { name: 'StellaSwap',       kind: 'Leading Moonbeam DEX, stable + volatile pairs' },
                  { name: 'Moonwell',          kind: 'Lending market, forked from Compound' },
                  { name: 'Connected contracts', kind: 'XCM calls into EVM — Polkadot ↔ Ethereum flows' },
                  { name: 'Entry point',       kind: 'EVM users access DOT ecosystem via Moonbeam' },
                ],
              },
              {
                emoji: '🏦',
                name: 'Acala',
                category: 'DeFi Hub',
                color: '#e6007a',
                tag: 'DEX · liquid staking · stablecoin',
                stats: 'Polkadot\'s native DeFi anchor',
                apps: [
                  { name: 'aUSD stablecoin',  kind: 'CDP stablecoin backed by DOT/BTC/ETH (post-2022 relaunch)' },
                  { name: 'LDOT',             kind: 'Liquid staking — stake DOT, keep liquidity' },
                  { name: 'Acala DEX',        kind: 'Native AMM with XCM-native asset support' },
                  { name: 'Case study',       kind: '2022 exploit (erroneous aUSD mint) — upgrade governance lessons' },
                ],
              },
              {
                emoji: '⭐',
                name: 'Astar',
                category: 'Smart Contracts',
                color: '#1b6dc1',
                tag: 'EVM + WASM runtimes',
                stats: 'Japan enterprise blockchain leader',
                apps: [
                  { name: 'dApp staking',     kind: 'Developers stake ASTR to earn protocol rewards' },
                  { name: 'Toyota pilot',     kind: 'Vehicle data provenance on Astar zkEVM' },
                  { name: 'Sony x Startale',  kind: 'Sony Network Communications blockchain initiative' },
                  { name: 'Astar zkEVM',      kind: 'Polygon CDK-based zk layer — Ethereum L2 strategy' },
                ],
              },
              {
                emoji: '💧',
                name: 'HydraDX',
                category: 'DEX · Omnipool',
                color: '#00bcd4',
                tag: 'single-pool for all assets',
                stats: 'Unified liquidity model — no fragmentation',
                apps: [
                  { name: 'Omnipool',         kind: 'All assets in one pool — trade any→any in one hop' },
                  { name: 'HDX token',        kind: 'Protocol governance + LP incentive token' },
                  { name: 'Stableswap',       kind: 'Low-slippage curve for stablecoin pairs' },
                  { name: 'DCA orders',       kind: 'On-chain dollar-cost averaging, native to protocol' },
                ],
              },
              {
                emoji: '₿',
                name: 'Interlay · iBTC',
                category: 'Bitcoin DeFi',
                color: '#f7931a',
                tag: 'trustless wrapped Bitcoin',
                stats: 'Vault-backed, no multisig custodian',
                apps: [
                  { name: 'iBTC',             kind: '1:1 BTC-backed token, vault collateral model' },
                  { name: 'Vault collateral', kind: 'Vaults post DOT/ETH — slashed if BTC stolen' },
                  { name: 'No custodian',     kind: 'Different model from WBTC (BitGo) — fully on-chain' },
                  { name: 'Cross-chain use',  kind: 'iBTC usable across Acala, HydraDX via XCM' },
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
                    <div key={item.name} className="rounded-md border bg-card/60 px-1.5 py-1 min-h-0" style={{ borderColor: app.color + '35' }}>
                      <div className="text-[10px] font-bold leading-tight" style={{ color: app.color }}>{item.name}</div>
                      <div className="text-[9px] text-muted-foreground leading-snug mt-0.5">{item.kind}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#e6007a55', backgroundColor: '#e6007a0d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#e6007a' }}>Also worth knowing — </span>
              <span className="font-medium text-foreground">Bifrost</span> (liquid staking hub) · <span className="font-medium text-foreground">Centrifuge</span> (RWA tokenisation, DeFi for real assets) · <span className="font-medium text-foreground">Phala</span> (confidential compute via TEEs) · <span className="font-medium text-foreground">Unique Network</span> (NFT infrastructure) · <span className="font-medium text-foreground">Parallel Finance</span> (money markets) · <span className="font-medium text-foreground">Pendulum</span> (fiat-pegged assets, forex DeFi).
            </p>
          </div>
        </div>

        {/* ═══════ S4-AVALANCHE ═══════ */}
        <div id="s4-avalanche" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Avalanche — sub-second L0 with sovereign L1s</h2>
            <p className="text-sm text-muted-foreground mt-1">A three-chain Primary Network (X, P, C) with Snowman consensus achieving sub-second finality. Avalanche L1s (ex-Subnets) let teams deploy sovereign chains with their own validator subsets while retaining native Warp messaging.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left — Architecture cards */}
            <div className="flex flex-col gap-2 min-h-0">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">Architecture</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  { icon: '🔺', title: 'Primary Network', color: '#e84142', desc: 'Three built-in chains: X-Chain (UTXO asset transfers), P-Chain (validator coordination, L1 creation), C-Chain (EVM — where most DeFi lives). All validators must validate the Primary Network.' },
                  { icon: '🏔️', title: 'Avalanche L1s (ex-Subnets)', color: '#f97316', desc: 'Custom chains with their own validator subsets. Renamed via ACP-13/77 in 2024 — chains no longer need to validate the Primary Network, reducing the AVAX stake requirement dramatically. Powers gaming chains, institutional deployments.' },
                  { icon: '⚡', title: 'Snowman Consensus', color: '#f59e0b', desc: 'Probabilistic consensus where each validator samples a small random subset of peers. Converges in < 1 second with high confidence. Unlike BFT it scales well with validator count — 1,000+ validators without performance loss.' },
                  { icon: '📡', title: 'Avalanche Warp Messaging', color: '#10b981', desc: 'Native L1↔L1 messaging. The source L1\'s validator set signs the message; the destination verifies against the P-Chain\'s record of that validator set. No third-party bridge relayer needed.' },
                ].map(c => (
                  <div key={c.title} className="rounded-xl border bg-card p-2.5 flex items-start gap-2.5 min-h-0" style={{ borderColor: c.color + '40' }}>
                    <span className="text-base shrink-0 leading-none mt-0.5">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight" style={{ color: c.color }}>{c.title}</p>
                      <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Key metrics + AVAX economics + 2024 */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="grid grid-cols-3 gap-2 shrink-0">
                {[
                  { metric: '<1 s', label: 'finality (Snowman)' },
                  { metric: '4,500+', label: 'TPS (C-Chain peak)' },
                  { metric: '70+', label: 'Avalanche L1s live' },
                ].map(s => (
                  <div key={s.label} className="px-2 py-1.5 rounded-lg border border-[#e84142]/30 bg-[#e84142]/05 text-center">
                    <div className="text-xs font-black text-[#e84142] leading-none">{s.metric}</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="shrink-0 p-3 rounded-xl border" style={{ borderColor: '#e8414240', backgroundColor: '#e8414208' }}>
                <p className="text-[10px] font-bold text-[#e84142] mb-1.5 flex items-center gap-1.5"><span>💎</span> AVAX economics</p>
                <ul className="space-y-1 text-[11px] text-muted-foreground leading-snug">
                  <li>· All C-Chain gas fees are burned in AVAX — deflationary pressure with network usage</li>
                  <li>· Validators must stake ≥ 2,000 AVAX on the Primary Network</li>
                  <li>· Avalanche L1s pay validators in any token — AVAX no longer required (ACP-77)</li>
                </ul>
              </div>

              <div className="flex-1 min-h-0 p-3 rounded-xl border" style={{ borderColor: '#f9731640', backgroundColor: '#f9731608' }}>
                <p className="text-[10px] font-bold text-[#f97316] mb-1.5">2024–2025 developments</p>
                <ul className="space-y-1.5 text-[11px] text-muted-foreground leading-snug">
                  <li>· <span className="font-medium text-foreground">ACP-77 (Subnet → L1)</span> — chains no longer need to validate Primary Network; opens sovereign deployment at lower cost</li>
                  <li>· <span className="font-medium text-foreground">Avalanche9000</span> — major fee reduction upgrade, making L1 deployment 99%+ cheaper</li>
                  <li>· <span className="font-medium text-foreground">Etna upgrade</span> — dynamic fees and EIP-1559-style base fee on C-Chain</li>
                  <li>· <span className="font-medium text-foreground">Warp + Teleporter</span> — production-ready cross-L1 messaging SDK for teams building multi-chain apps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ S4-AVALANCHE-ECO ═══════ */}
        <div id="s4-avalanche-eco" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Avalanche ecosystem — apps &amp; sovereign L1s</h2>
            <p className="text-sm text-muted-foreground mt-1">The C-Chain hosts DeFi; sovereign L1s host games, institutional rails, and enterprise applications — each with its own validator set and economics, connected back via Warp.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-2.5">
            {[
              {
                emoji: '🍵',
                name: 'Trader Joe',
                category: 'DEX',
                color: '#f59e0b',
                tag: 'Liquidity Book AMM',
                stats: 'Largest Avalanche DEX · multi-chain',
                apps: [
                  { name: 'Liquidity Book', kind: 'Discrete price-bin AMM — LPs choose exact ranges' },
                  { name: 'Auto-pools',     kind: 'Managed LB positions that rebalance automatically' },
                  { name: 'Multi-chain',    kind: 'Also live on Arbitrum, BNB Chain, Ethereum' },
                  { name: 'JOE token',      kind: 'Governance + fee-sharing via veJOE' },
                ],
              },
              {
                emoji: '🏦',
                name: 'BENQI',
                category: 'Lending · LST',
                color: '#10b981',
                tag: 'money market + liquid staking',
                stats: '~$200M TVL at peak · since 2021',
                apps: [
                  { name: 'Supply & borrow', kind: 'AVAX, USDC, BTC.b, ETH.e as collateral/debt' },
                  { name: 'qiAVAX (sAVAX)', kind: 'Liquid staking — stake AVAX, receive yield-bearing LST' },
                  { name: 'QI governance',   kind: 'Token controls risk parameters and new markets' },
                  { name: 'Ignite program',  kind: 'Delegated AVAX to help validators reach minimum stake' },
                ],
              },
              {
                emoji: '🏟️',
                name: 'Pharaoh',
                category: 've-AMM',
                color: '#ec4899',
                tag: 'vote-escrow DEX · PHAR',
                stats: 'Dominant Avax ve(3,3) DEX in 2024',
                apps: [
                  { name: 'veNFT model',    kind: 'Lock PHAR → veNFT → direct emissions to pools' },
                  { name: 'Bribes market',  kind: 'Protocols bribe veNFT holders to direct liquidity' },
                  { name: 'Concentrated',   kind: 'Uniswap v3-style CL pools alongside stable pools' },
                  { name: 'Ra stablecoin',  kind: 'Ecosystem stablecoin integrated with Pharaoh liquidity' },
                ],
              },
              {
                emoji: '🎮',
                name: 'Gaming L1s',
                category: 'Sovereign L1s',
                color: '#8b5cf6',
                tag: 'DFK · Gunzilla · Shrapnel',
                stats: 'First major gaming L1 use-case',
                apps: [
                  { name: 'DFK Chain',      kind: 'DeFi Kingdoms — first major gaming Subnet (2022)' },
                  { name: 'Off The Grid',   kind: 'Gunzilla AAA battle royale — custom L1 for in-game economy' },
                  { name: 'Shrapnel',       kind: 'Extraction shooter, tokenised skins / maps on L1' },
                  { name: 'Warp bridge',    kind: 'Game assets move back to C-Chain via Avalanche Warp' },
                ],
              },
              {
                emoji: '🏢',
                name: 'Institutional L1s',
                category: 'Enterprise',
                color: '#6366f1',
                tag: 'private validator sets',
                stats: 'JP Morgan · T. Rowe Price · Deloitte',
                apps: [
                  { name: 'Onyx (JPM)',     kind: 'Repo agreements + tokenised fund settlement' },
                  { name: 'Spruce',         kind: 'Permissioned L1 for institutional asset tokenisation' },
                  { name: 'EVM-compatible', kind: 'Leverage existing Solidity tooling with permissioned access' },
                  { name: 'Custom gas',     kind: 'Fees paid in stablecoin or custom token, not AVAX' },
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
                    <div key={item.name} className="rounded-md border bg-card/60 px-1.5 py-1 min-h-0" style={{ borderColor: app.color + '35' }}>
                      <div className="text-[10px] font-bold leading-tight" style={{ color: app.color }}>{item.name}</div>
                      <div className="text-[9px] text-muted-foreground leading-snug mt-0.5">{item.kind}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#e8414255', backgroundColor: '#e841420d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#e84142' }}>Also worth knowing — </span>
              <span className="font-medium text-foreground">Steakhut</span> (automated LB position management) · <span className="font-medium text-foreground">GoGoPool</span> (minipool liquid staking for validators) · <span className="font-medium text-foreground">Yield Yak</span> (auto-compounder) · <span className="font-medium text-foreground">Arena-Z</span> (esports L1) · <span className="font-medium text-foreground">MapleStory Universe</span> (Nexon gaming L1, 2025) · <span className="font-medium text-foreground">Core DAO bridge</span> (BTC-staked PoS via Avalanche Warp).
            </p>
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

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s4-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 04 — Key Takeaways"
            takeaways={[
              'Blockchain islands cannot natively transfer assets or data — interoperability is an active area of engineering',
              'Bridges concentrate locked assets in a single contract, making them high-value attack targets (Ronin $625M, Wormhole $320M)',
              'Cosmos IBC achieves trust-minimized cross-chain communication without a centralized bridge contract',
              'Layer 0 protocols (Polkadot, Avalanche) provide shared security infrastructure for sovereign chains',
              'XRP Ledger is payments-optimised with a native DEX, Trust Lines, and federated sidechain support',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
