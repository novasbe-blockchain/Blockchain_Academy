import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Zap } from 'lucide-react';
import { TeamCheckpoint } from '../../components/TeamCheckpoint';

const chapters = [
  { id: 's5-zkp',              label: 'ZK: The Idea' },
  { id: 's5-zkp-cave',         label: 'ZK: The Cave' },
  { id: 's5-zkp-props',        label: 'ZK: Properties & Uses' },
  { id: 's5-starknet',         label: 'Starknet' },
  { id: 's5-starknet-compare', label: 'Starknet: ZK in Practice' },
  { id: 's5-starknet-eco',     label: 'Starknet Apps' },
  { id: 's5-l2-why',           label: 'L2: Why Needed' },
  { id: 's5-layer2',           label: 'L2: Optimistic vs ZK' },
  { id: 's5-l2apps',           label: 'L2 App Landscape' },
  { id: 's5-polkadot',         label: 'Polkadot' },
  { id: 's5-polkadot-eco',     label: 'Polkadot Apps' },
  { id: 's5-avalanche',        label: 'Avalanche' },
  { id: 's5-avalanche-eco',    label: 'Avalanche Apps' },
  { id: 's5-privacy',          label: 'Privacy: Why Hard' },
  { id: 's5-privacy-approaches', label: 'Privacy: Approaches' },
  { id: 's5-privacy-regulation', label: 'Privacy: Regulation' },
  { id: 's5-evaluate',         label: 'Evaluate (1/2)' },
  { id: 's5-evaluate-2',       label: 'Evaluate (2/2)' },
  { id: 's5-decision',          label: 'Decision Framework' },
  { id: 's5-decision-examples', label: 'Platform Examples' },
  { id: 's5-quiz',              label: 'Quiz' },
  { id: 's5-takeaways',    label: 'Takeaways' },
  { id: 's5-team-checkpoint', label: '🤝 Team Checkpoint' },
];

export function BP_Section5() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 05"
            title="New Trends"
            subtitle="ZK rollups, Layer 2 scaling, privacy primitives, and choosing the right platform"
            icon={<Zap className="size-20 text-[#8b5cf6]" />}
            gradient="from-[#8b5cf6] to-[#ec4899]"
          />
        </div>

        {/* ═══════ S5-ZKP — the one idea ═══════ */}
        <div id="s5-zkp" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#8b5cf6]">Section 05 · Zero-Knowledge</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Zero-Knowledge Proofs — the one idea</h2>
            <p className="text-sm text-muted-foreground mt-1">Forget the maths. One sentence and one everyday example are enough to get it.</p>
          </div>

          <div className="shrink-0 mb-5 rounded-2xl border-2 p-5 text-center" style={{ borderColor: '#8b5cf680', backgroundColor: '#8b5cf60d' }}>
            <p className="text-lg lg:text-xl font-semibold text-foreground leading-snug">
              Prove a statement is true — <span style={{ color: '#8b5cf6' }}>without revealing anything that makes it true.</span>
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            <div className="shrink-0 flex items-center gap-2.5">
              <span className="text-3xl">🍺</span>
              <div>
                <p className="font-bold text-foreground text-lg">Example — proving you're over 18</p>
                <p className="text-sm text-muted-foreground">Same goal, two ways. Watch what the bouncer learns.</p>
              </div>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl border-2 p-5 flex flex-col gap-3 justify-center" style={{ borderColor: '#ef444450', backgroundColor: '#ef44440a' }}>
                <p className="text-xs font-black uppercase tracking-widest text-[#ef4444]">Without ZK — show your passport</p>
                <p className="text-base text-foreground leading-relaxed">The bouncer now knows your <span className="font-semibold">name, address, nationality and exact birth date</span>.</p>
                <p className="text-sm text-muted-foreground">You proved one fact and leaked five.</p>
              </div>
              <div className="rounded-xl border-2 p-5 flex flex-col gap-3 justify-center" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0a' }}>
                <p className="text-xs font-black uppercase tracking-widest text-[#39B54A]">With ZK — show a proof</p>
                <p className="text-base text-foreground leading-relaxed">"I was born before <span className="font-semibold">today − 18 years</span>." The bouncer checks ✓.</p>
                <p className="text-sm text-muted-foreground">Verified — and they learned <span className="italic">nothing else about you</span>.</p>
              </div>
            </div>
          </div>

          <div className="shrink-0 mt-4 text-center text-sm text-muted-foreground italic">Next: a thought experiment that makes it click →</div>
        </div>

        {/* ═══════ S5-ZKP-CAVE — the classic thought experiment ═══════ */}
        <div id="s5-zkp-cave" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#22d3ee]">Section 05 · Zero-Knowledge</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">The magic cave — ZK made visual</h2>
            <p className="text-sm text-muted-foreground mt-1">The classic thought experiment. Alice knows a secret password; she proves it to Bob without ever saying it.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { n: '1', emoji: '🚪', title: 'The setup', text: 'A ring-shaped cave with a locked door in the middle. Only the password opens it. Alice walks in; Bob waits outside and cannot see which way she went.' },
              { n: '2', emoji: '📣', title: 'The challenge', text: 'Bob shouts a random side — "come out the LEFT!" If Alice truly knows the password she can always comply, whichever side he picks.' },
              { n: '3', emoji: '🔁', title: 'Repeat', text: 'Do it 20 times. Guessing right every time without the password is a 1-in-a-million fluke. Bob is convinced — and never heard the password.' },
            ].map(s => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3 rounded-xl border-2 p-5"
                style={{ borderColor: '#22d3ee45', backgroundColor: '#22d3ee0a' }}
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full flex items-center justify-center text-base font-black text-white shrink-0" style={{ backgroundColor: '#22d3ee' }}>{s.n}</div>
                  <span className="text-3xl">{s.emoji}</span>
                </div>
                <p className="font-bold text-foreground text-lg">{s.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="rounded-xl border p-3.5" style={{ borderColor: '#22d3ee40', backgroundColor: '#22d3ee0d' }}>
              <p className="text-sm text-foreground leading-snug"><span className="font-bold text-[#22d3ee]">The punchline — </span>Bob ends 100% convinced and learns <span className="font-semibold">zero</span> about the password itself. That gap is "zero-knowledge".</p>
            </div>
            <div className="rounded-xl border p-3.5" style={{ borderColor: '#6366f140', backgroundColor: '#6366f10d' }}>
              <p className="text-sm text-foreground leading-snug"><span className="font-bold text-[#6366f1]">Same trick — "Where's Waldo?" </span>Cover the page with a sheet that has one tiny hole over Waldo. You prove you found him, revealing nothing about <span className="italic">where</span> he is.</p>
            </div>
          </div>
        </div>

        {/* ═══════ S5-ZKP-PROPS — Properties & Blockchain Uses ═══════ */}
        <div id="s5-zkp-props" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              ZKP: Three Formal Properties & Blockchain Applications
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Once you have the intuition, these properties formalise it. The blockchain use cases follow directly from the third property — zero-knowledge.
            </p>
          </div>

          {/* Three properties — horizontal row */}
          <div className="shrink-0 grid grid-cols-3 gap-4 mb-5">
            {[
              { emoji: '✅', prop: 'Completeness',   color: '#39B54A', desc: 'If the statement is true and Alice is honest, she will always be able to convince Bob. A valid proof always passes.' },
              { emoji: '🔒', prop: 'Soundness',      color: '#ED1C24', desc: 'If the statement is false, Alice cannot cheat and convince Bob — no matter how clever she is. A fake proof always fails.' },
              { emoji: '🙈', prop: 'Zero-Knowledge', color: '#8b5cf6', desc: 'Bob learns nothing beyond "the statement is true." No extra information leaks — not accidentally, not even in theory.' },
            ].map(p => (
              <div key={p.prop} className="flex gap-4 items-start rounded-xl border p-4 bg-card" style={{ borderColor: p.color + '50' }}>
                <span className="text-3xl shrink-0">{p.emoji}</span>
                <div>
                  <p className="font-black text-lg mb-1.5" style={{ color: p.color }}>{p.prop}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Four blockchain uses — 2×2 */}
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">
            {[
              { icon: '🪪', title: 'Private identity & KYC',   color: '#6366f1', desc: 'Prove your passport is valid, your sanctions check passed, and your age is ≥ 18 — without showing any document. One ZK credential, verifiable by any dApp anywhere.' },
              { icon: '🗳️', title: 'Private voting',            color: '#39B54A', desc: 'Prove your vote was counted in the final tally, and that you only voted once — without revealing which candidate you chose. Fully auditable election, fully private ballot.' },
              { icon: '🏦', title: 'Proof of solvency',         color: '#f59e0b', desc: 'A bank or exchange proves it holds enough assets to cover all liabilities — without disclosing individual account balances, trading positions, or counterparty identities.' },
              { icon: '⚡', title: 'ZK rollups (Starknet ↗)', color: '#8b5cf6', desc: 'Prove that 10,000 transactions are all valid — with a single compact STARK proof that Ethereum L1 verifies in one block. No waiting, no challenge window, no trust in the sequencer.' },
            ].map(u => (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border p-4 bg-card flex gap-4 items-start"
                style={{ borderColor: u.color + '40' }}
              >
                <span className="text-3xl shrink-0">{u.icon}</span>
                <div>
                  <p className="font-bold text-base mb-1.5" style={{ color: u.color }}>{u.title}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{u.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SNARK vs STARK */}
          <div className="shrink-0 mt-4 rounded-xl border p-3 grid grid-cols-2 gap-6" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf60d' }}>
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#8b5cf6' }}>ZK-SNARK — Succinct Non-interactive ARgument of Knowledge</p>
              <p className="text-sm text-muted-foreground leading-snug">Tiny proofs, extremely fast to verify. Requires a one-time trusted setup ceremony. Used by Zcash, Polygon zkEVM, early zkSync.</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#8b5cf6' }}>ZK-STARK — Scalable Transparent ARgument of Knowledge</p>
              <p className="text-sm text-muted-foreground leading-snug">No trusted setup, quantum-resistant. Proofs are larger but fully transparent and more scalable. Used by <span className="font-semibold text-foreground">Starknet</span> — next section.</p>
            </div>
          </div>
        </div>

        {/* ═══════ S5-STARKNET ═══════ */}
        <div id="s5-starknet" className="h-full flex flex-col p-6 lg:p-10">
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

          {/* 4 core properties — 2×2 */}
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 mb-4">
            {[
              { emoji: '⚡', title: 'Throughput',     color: '#8b5cf6', desc: '500–1,000 TPS vs ~15 TPS on Ethereum L1. Transactions execute off-chain in batches — the STARK prover is the bottleneck, not the EVM.' },
              { emoji: '💸', title: 'Cost',           color: '#39B54A', desc: '10–100× cheaper for end users. One STARK proof amortises the L1 settlement cost across thousands of transactions in the same batch.' },
              { emoji: '🔒', title: 'Security model', color: '#22d3ee', desc: 'Inherits Ethereum L1 security via validity proofs. No fraud window, no trust in the sequencer — if the proof is invalid, Ethereum rejects it outright.' },
              { emoji: '🛡️', title: 'Cairo language', color: '#ec4899', desc: "Starknet's native language, compiled to Sierra IR. Far more efficient than Solidity/EVM for STARK proving — ZK-friendly logic without low-level circuit expertise." },
            ].map(card => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 p-4 bg-card rounded-xl border"
                style={{ borderColor: card.color + '40' }}
              >
                <span className="text-3xl shrink-0 leading-none mt-0.5">{card.emoji}</span>
                <div>
                  <p className="font-bold text-lg mb-1.5" style={{ color: card.color }}>{card.title}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 2024–2025 news */}
          <div className="shrink-0 p-3 bg-[#8b5cf6]/5 rounded-xl border border-[#8b5cf6]/20">
            <p className="text-xs font-semibold text-[#8b5cf6] mb-2">Starknet in 2024–2025</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'STRK Token',     sub: 'Token launch & community airdrop' },
                { label: 'v0.13+',         sub: '1,000+ TPS throughput milestone' },
                { label: 'AI Agents',      sub: 'On-chain AI agent integration experiments' },
                { label: 'Onchain Gaming', sub: 'Dojo engine — fully on-chain games in Cairo' },
              ].map(item => (
                <div key={item.label} className="p-2 bg-card rounded-lg border border-border">
                  <p className="text-xs font-semibold text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ S5-STARKNET-COMPARE — ZK in Practice ═══════ */}
        <div id="s5-starknet-compare" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Starknet: ZK in Practice
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              A concrete KYC walkthrough using Starknet's ZK credentials, then a head-to-head with optimistic rollups — the most common comparison when evaluating L2s.
            </p>
          </div>

          {/* KYC walkthrough — full width */}
          <div className="shrink-0 mb-4 rounded-xl border p-4" style={{ borderColor: '#8b5cf660', backgroundColor: '#8b5cf608' }}>
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#8b5cf6' }}>
              🔐 Concrete example — KYC without sharing your identity
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { n: '1', label: 'Bank issues a credential', desc: 'Your bank verifies you once and signs a ZK credential containing { name, DOB, residency, sanctions check }. This credential lives in your wallet — only you hold it.' },
                { n: '2', label: 'You generate a proof',     desc: 'In your wallet, you build a STARK proof: "credential is signed by Bank · age ≥ 18 · residency = EU · sanctions = false." No raw data is included in the proof itself.' },
                { n: '3', label: 'Cairo contract verifies',  desc: "The dApp's Cairo contract on Starknet verifies the proof and grants access. Your name and birth date never leave your wallet — not even the dApp operator can read them." },
              ].map(s => (
                <div key={s.n} className="rounded-xl border bg-card p-4 flex flex-col gap-2" style={{ borderColor: '#8b5cf640' }}>
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" style={{ backgroundColor: '#8b5cf6' }}>{s.n}</div>
                    <p className="text-sm font-bold text-foreground leading-tight">{s.label}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              Same pattern: <span className="font-medium text-foreground">private voting · proof of solvency · medical records · sanctions screening</span> — anywhere the question is "is this true?" without "who are you?".
            </p>
          </div>

          {/* ZK vs Optimistic — full-width comparison */}
          <div className="flex-1 min-h-0 bg-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-border h-full">
              <div className="p-5 flex flex-col gap-3 min-h-0">
                <div className="shrink-0">
                  <p className="text-xl font-black text-[#8b5cf6]">ZK Rollup</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Starknet · zkSync · Polygon zkEVM · Scroll</p>
                </div>
                <p className="text-sm text-muted-foreground leading-snug shrink-0">Each batch ships with a <span className="font-semibold text-foreground">validity proof</span> that Ethereum L1 verifies mathematically. No trust in the operator required.</p>
                <div className="flex-1 min-h-0 flex flex-col gap-2.5">
                  {[
                    { label: 'Proof type',        value: 'Validity proof — mathematically proven', color: '#8b5cf6' },
                    { label: 'Finality',          value: '⚡ Minutes — one L1 block to verify the proof', color: '#39B54A' },
                    { label: 'Compute overhead',  value: 'High — STARK/SNARK generation is expensive', color: '#ef4444' },
                    { label: 'EVM compatibility', value: '⚠️ Partial — zkEVM spectrum still maturing', color: '#f97316' },
                    { label: 'Trust model',       value: 'Trustless — math is the arbiter, not watchers', color: '#39B54A' },
                    { label: 'Best for',          value: 'Payments, privacy apps, high-security finance', color: '#6366f1' },
                  ].map(r => (
                    <div key={r.label} className="flex gap-2 items-baseline">
                      <span className="text-muted-foreground w-36 shrink-0 text-xs">{r.label}</span>
                      <span style={{ color: r.color }} className="font-medium text-sm">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 min-h-0">
                <div className="shrink-0">
                  <p className="text-xl font-black text-[#f59e0b]">Optimistic Rollup</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Arbitrum · Optimism · Base</p>
                </div>
                <p className="text-sm text-muted-foreground leading-snug shrink-0">Posts transactions with an <span className="font-semibold text-foreground">optimistic assumption</span> of validity. A 7-day challenge window lets anyone submit a fraud proof.</p>
                <div className="flex-1 min-h-0 flex flex-col gap-2.5">
                  {[
                    { label: 'Proof type',        value: 'Fraud proof — only if fraud detected', color: '#f59e0b' },
                    { label: 'Finality',          value: '7-day withdrawal delay (challenge window)', color: '#ef4444' },
                    { label: 'Compute overhead',  value: 'Low — no proof generation overhead at all', color: '#39B54A' },
                    { label: 'EVM compatibility', value: '✅ Full EVM equivalence — deploy existing Solidity', color: '#39B54A' },
                    { label: 'Trust model',       value: 'At least 1 honest watcher must monitor the chain', color: '#f59e0b' },
                    { label: 'Best for',          value: 'DeFi, general dApps needing EVM compatibility', color: '#6366f1' },
                  ].map(r => (
                    <div key={r.label} className="flex gap-2 items-baseline">
                      <span className="text-muted-foreground w-36 shrink-0 text-xs">{r.label}</span>
                      <span style={{ color: r.color }} className="font-medium text-sm">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ STARKNET APPS — ecosystem ═══════ */}
        <div id="s5-starknet-eco" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Starknet ecosystem — apps native to Cairo</h2>
            <p className="text-sm text-muted-foreground mt-1">Starknet&apos;s app character has shifted distinctly toward fully-on-chain games, native AA wallets, and AI-agent experiments — areas where the Cairo VM&apos;s ZK-friendliness is genuinely useful.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-3">
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

        {/* ═══════ S5-L2-WHY — what an L2 is & why we need it ═══════ */}
        <div id="s5-l2-why" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#39B54A]">Section 05 · Scaling</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Layer 2 — what it is and why we need it</h2>
            <p className="text-sm text-muted-foreground mt-1">Ethereum L1 is secure but small. A Layer 2 keeps that security while doing the heavy lifting somewhere cheaper.</p>
          </div>

          <div className="shrink-0 mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border-2 p-4" style={{ borderColor: '#ef444450', backgroundColor: '#ef44440a' }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#ef4444] mb-1">The problem</p>
              <p className="text-base text-foreground leading-snug">Ethereum L1 settles only <span className="font-semibold">~15 transactions/second</span>. When demand spikes, a simple swap can cost <span className="font-semibold">$20–100+</span>. Consumer apps, games and micro-payments simply can't live there.</p>
            </div>
            <div className="rounded-xl border-2 p-4" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0a' }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#39B54A] mb-1">The idea</p>
              <p className="text-base text-foreground leading-snug">Execute transactions <span className="font-semibold">off-chain</span>, then post a compressed summary <span className="font-semibold">+ a proof</span> back to L1. Ethereum stays the judge; the work happens where it's cheap.</p>
            </div>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { n: '1', emoji: '⚡', title: 'Execute off-chain', text: 'Thousands of users transact on the L2 — fast and near-free. The L2 sequencer orders and runs them.' },
              { n: '2', emoji: '📦', title: 'Batch & prove', text: 'The L2 compresses the batch and produces a proof of what happened (a fraud proof window, or a validity proof).' },
              { n: '3', emoji: '⚖️', title: 'Settle on L1', text: 'The batch + proof is posted to Ethereum. L1 enforces correctness, so the L2 inherits L1-grade security.' },
            ].map(s => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3 rounded-xl border-2 p-5"
                style={{ borderColor: '#6366f145', backgroundColor: '#6366f10a' }}
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full flex items-center justify-center text-base font-black text-white shrink-0" style={{ backgroundColor: '#6366f1' }}>{s.n}</div>
                  <span className="text-3xl">{s.emoji}</span>
                </div>
                <p className="font-bold text-foreground text-lg">{s.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-4 rounded-xl border bg-card p-3 grid grid-cols-3 gap-3 text-center">
            {[
              { k: 'Throughput', l1: '~15 TPS', l2: '1,000s TPS' },
              { k: 'Typical fee', l1: '$1–100', l2: 'cents' },
              { k: 'Security', l1: 'native', l2: 'inherited from L1' },
            ].map(m => (
              <div key={m.k} className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{m.k}</span>
                <span className="text-sm text-[#ef4444] font-semibold mt-0.5">L1 {m.l1}</span>
                <span className="text-sm text-[#39B54A] font-semibold">L2 {m.l2}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ LAYER 2: OPTIMISTIC VS ZK ═══════ */}
        <div id="s5-layer2" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#39B54A]">Section 05</span>
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
        <div id="s5-l2apps" className="h-full flex flex-col p-6 lg:p-10">
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
              DeFi-mature builder → Arbitrum. Public goods or rollup-as-a-service → Optimism / OP Stack. Consumer &amp; social with Coinbase reach → Base. Games or proof-heavy compute → Starknet. The mechanism (optimistic vs ZK) increasingly matters less than the ecosystem fit.
            </p>
          </div>
        </div>

        {/* ═══════ S5-POLKADOT ═══════ */}
        <div id="s5-polkadot" className="h-full flex flex-col p-6 lg:p-10">
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

        {/* ═══════ S5-POLKADOT-ECO ═══════ */}
        <div id="s5-polkadot-eco" className="h-full flex flex-col p-6 lg:p-10">
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

        {/* ═══════ S5-AVALANCHE ═══════ */}
        <div id="s5-avalanche" className="h-full flex flex-col p-6 lg:p-10">
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

        {/* ═══════ S5-AVALANCHE-ECO ═══════ */}
        <div id="s5-avalanche-eco" className="h-full flex flex-col p-6 lg:p-10">
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

        {/* ═══════ PRIVACY PRIMITIVES ═══════ */}
        {/* ═══════ S5-PRIVACY — why it is hard ═══════ */}
        <div id="s5-privacy" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#8b5cf6]">Section 05 · Privacy</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Privacy on a public ledger — why it's hard</h2>
            <p className="text-sm text-muted-foreground mt-1">Public chains are transparent by default: every address, balance and transfer is visible to anyone, forever.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3 justify-center">
              <div className="rounded-xl border-2 p-4" style={{ borderColor: '#ef444450', backgroundColor: '#ef44440a' }}>
                <p className="text-xs font-black uppercase tracking-widest text-[#ef4444] mb-2">A normal public transaction</p>
                <div className="font-mono text-sm text-foreground space-y-1">
                  <div>from <span className="text-[#ef4444]">0xA1b2…</span></div>
                  <div>to&nbsp;&nbsp; <span className="text-[#ef4444]">0xC3d4…</span></div>
                  <div>value <span className="text-[#ef4444]">12.5 ETH</span></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Anyone can read who paid whom, how much, and trace it backwards forever.</p>
              </div>
              <div className="rounded-xl border-2 p-4" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0a' }}>
                <p className="text-xs font-black uppercase tracking-widest text-[#39B54A] mb-2">A shielded transaction</p>
                <div className="font-mono text-sm text-foreground space-y-1">
                  <div>from <span className="text-[#39B54A]">••••••</span></div>
                  <div>to&nbsp;&nbsp; <span className="text-[#39B54A]">••••••</span></div>
                  <div>value <span className="text-[#39B54A]">••••••</span></div>
                  <div className="text-[#39B54A]">proof ✓ valid</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Hidden — yet still provably valid.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-center">
              <div className="rounded-xl border-2 p-5" style={{ borderColor: '#8b5cf680', backgroundColor: '#8b5cf60d' }}>
                <p className="text-xs font-black uppercase tracking-widest text-[#8b5cf6] mb-2">The core difficulty</p>
                <p className="text-base text-foreground leading-relaxed">You can't just "encrypt the chain" — every validator must still <span className="font-semibold">verify</span> each transaction.</p>
              </div>
              <div className="rounded-xl border p-5 bg-card">
                <p className="text-base text-foreground leading-relaxed">
                  The trick: let validators confirm a transaction is <span className="font-semibold text-[#8b5cf6]">valid</span> without learning <span className="font-semibold">who</span>, <span className="font-semibold">what</span>, or <span className="font-semibold">how much</span>.
                </p>
                <p className="text-sm text-muted-foreground mt-2">Every privacy project is a different recipe of cryptography to pull this off — next slide.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ S5-PRIVACY-APPROACHES — the four families ═══════ */}
        <div id="s5-privacy-approaches" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#8b5cf6]">Section 05 · Privacy</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Four ways to get privacy on-chain</h2>
            <p className="text-sm text-muted-foreground mt-1">Each makes a different trade-off between strength, flexibility, and how regulators treat it.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              { icon: '🛡️', name: 'Zcash', sub: 'L1 · zk-SNARKs · 2016', color: '#f59e0b',
                mech: 'Optional shielded transactions use zk-SNARKs to prove ownership and value conservation without revealing sender, recipient or amount.',
                trade: 'Privacy is opt-in, so most volume stays transparent — weakening the anonymity set.' },
              { icon: '👁️‍🗨️', name: 'Monero', sub: 'L1 · ring sigs + stealth · 2014', color: '#ef4444',
                mech: 'Mandatory privacy: ring signatures hide the sender, stealth addresses hide the recipient, RingCT hides the amount.',
                trade: 'No transparency option — auditing is hard, so many exchanges have delisted it.' },
              { icon: '🧬', name: 'Aztec · Aleo', sub: 'Programmable ZK privacy · 2023+', color: '#10b981',
                mech: 'Smart contracts with private state and inputs — build any confidential dApp, not just private payments.',
                trade: 'Far more flexible, but newer tooling (Noir, Leo) and privacy lives at the contract level.' },
              { icon: '🔀', name: 'Mixers', sub: 'Tornado Cash · cautionary case', color: '#6b7280',
                mech: 'Pool many deposits, withdraw to fresh addresses — breaking the on-chain link between sender and receiver.',
                trade: 'Credibly neutral and immutable — which is exactly why they became a sanctions target.' },
            ].map(p => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2.5 rounded-xl border-2 p-4 justify-center"
                style={{ borderColor: p.color + '50', backgroundColor: p.color + '0a' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <div className="font-black text-lg" style={{ color: p.color }}>{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.sub}</div>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed"><span className="font-semibold" style={{ color: p.color }}>How: </span>{p.mech}</p>
                <p className="text-sm text-muted-foreground leading-relaxed"><span className="font-semibold">Trade-off: </span>{p.trade}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══════ S5-PRIVACY-REGULATION — the contested frontier ═══════ */}
        <div id="s5-privacy-regulation" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#f59e0b]">Section 05 · Privacy</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Privacy is the most contested area in crypto</h2>
            <p className="text-sm text-muted-foreground mt-1">Non-custodial privacy code is being tested in court right now. Build with this reality in mind.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { yr: 'Aug 2022', t: 'Tornado Cash sanctioned', d: 'OFAC sanctioned an immutable smart contract — not a company. Legitimate users were caught alongside launderers.', c: '#ef4444' },
              { yr: '2024', t: 'Samourai Wallet arrests', d: 'Co-founders of a non-custodial privacy wallet were arrested. Writing privacy software became a legal flashpoint.', c: '#f59e0b' },
              { yr: 'Now', t: 'The line is being drawn', d: 'Courts are deciding where "privacy tool" ends and "money-laundering infrastructure" begins. No settled answer yet.', c: '#8b5cf6' },
            ].map(s => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2 rounded-xl border-2 p-5 justify-center"
                style={{ borderColor: s.c + '50', backgroundColor: s.c + '0a' }}
              >
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: s.c }}>{s.yr}</span>
                <p className="font-bold text-foreground text-lg">{s.t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-4 rounded-xl border-2 p-4" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0d' }}>
            <p className="text-base text-foreground leading-snug">
              <span className="font-bold text-[#39B54A]">Design guidance — </span>
              where regulation matters, prefer <span className="font-semibold">selective disclosure</span> and <span className="font-semibold">proof-of-compliance</span> (e.g. prove "not on a sanctions list" without revealing identity) over all-or-nothing anonymity.
            </p>
          </div>
        </div>

        {/* ═══════ EVALUATE A PROJECT ═══════ */}
        {/* ═══════ EVALUATE A PROJECT — part 1 ═══════ */}
        <div id="s5-evaluate" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#06b6d4]">Section 05 · Due Diligence · 1 of 2</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Evaluating a project — the team & the money</h2>
            <p className="text-sm text-muted-foreground mt-1">Three of six axes. Glance at the green vs red column — most failures are visible here first.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { icon: '👥', title: 'Team & track record', color: '#6366f1',
                green: ['Doxxed founders, verifiable history', 'Shipped products before', 'Active GitHub, not just a whitepaper'],
                red:   ['Anon team, no on-chain history', 'Founders linked to past rugs', 'LinkedIns created last month'] },
              { icon: '🔍', title: 'Contracts & audits', color: '#10b981',
                green: ['Audited by reputable firms', 'Findings publicly fixed', 'Verified source on Etherscan'],
                red:   ['No audit, or stale vs current code', 'Audit by an unknown firm', 'Upgradeable proxy, single-key admin'] },
              { icon: '💰', title: 'Token distribution', color: '#f59e0b',
                green: ['Clear team/investor vesting', 'Top 10 holders < 30%', 'Treasury in multisig / DAO'],
                red:   ['Unlock cliffs that dump on retail', 'One wallet holds > 50%', '"Treasury" is one anon EOA'] },
            ].map(c => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}
                className="flex flex-col gap-3 rounded-xl border-2 p-4" style={{ borderColor: c.color + '50', backgroundColor: c.color + '08' }}>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="font-black text-base leading-tight" style={{ color: c.color }}>{c.title}</div>
                </div>
                <div className="flex-1 rounded-lg border p-3" style={{ borderColor: '#39B54A40', backgroundColor: '#39B54A08' }}>
                  <div className="text-xs font-black uppercase tracking-widest mb-1.5 text-[#39B54A]">✓ Green flags</div>
                  <ul className="space-y-1">{c.green.map((g,i)=>(<li key={i} className="text-sm text-muted-foreground leading-snug flex gap-1.5"><span className="text-[#39B54A]">·</span>{g}</li>))}</ul>
                </div>
                <div className="flex-1 rounded-lg border p-3" style={{ borderColor: '#ED1C2440', backgroundColor: '#ED1C2408' }}>
                  <div className="text-xs font-black uppercase tracking-widest mb-1.5 text-[#ED1C24]">✗ Red flags</div>
                  <ul className="space-y-1">{c.red.map((r,i)=>(<li key={i} className="text-sm text-muted-foreground leading-snug flex gap-1.5"><span className="text-[#ED1C24]">·</span>{r}</li>))}</ul>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="shrink-0 mt-4 text-center text-sm text-muted-foreground italic">Three more axes next — liquidity, marketing, and on-chain reality →</div>
        </div>

        {/* ═══════ EVALUATE A PROJECT — part 2 ═══════ */}
        <div id="s5-evaluate-2" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#06b6d4]">Section 05 · Due Diligence · 2 of 2</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Evaluating a project — liquidity & reality check</h2>
            <p className="text-sm text-muted-foreground mt-1">The last three axes. Most can be checked in ten minutes with free tools.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { icon: '🌊', title: 'Liquidity & lock-ups', color: '#8b5cf6',
                green: ['LP tokens locked 6–12+ months', 'Deep pools across DEXes', 'Buy/sell pressure symmetric'],
                red:   ['Team LP with no lock', 'One thin pool — pull & it collapses', 'Asymmetric tax-on-transfer'] },
              { icon: '📣', title: 'Marketing & promises', color: '#ec4899',
                green: ['Docs explain trade-offs honestly', 'Realistic roadmap', 'Engages critical questions'],
                red:   ['"Risk-free yield", "100x"', 'Influencer pump campaigns', '"Next Bitcoin / ETH killer"'] },
              { icon: '🔬', title: 'On-chain analysis', color: '#06b6d4',
                green: ['Organic unique-address growth', 'TVL & volume verifiable', 'Diverse holder base'],
                red:   ['Wash volume between few wallets', 'TVL inflated by recursive lending', 'Suspiciously round daily actives'] },
            ].map(c => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}
                className="flex flex-col gap-3 rounded-xl border-2 p-4" style={{ borderColor: c.color + '50', backgroundColor: c.color + '08' }}>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="font-black text-base leading-tight" style={{ color: c.color }}>{c.title}</div>
                </div>
                <div className="flex-1 rounded-lg border p-3" style={{ borderColor: '#39B54A40', backgroundColor: '#39B54A08' }}>
                  <div className="text-xs font-black uppercase tracking-widest mb-1.5 text-[#39B54A]">✓ Green flags</div>
                  <ul className="space-y-1">{c.green.map((g,i)=>(<li key={i} className="text-sm text-muted-foreground leading-snug flex gap-1.5"><span className="text-[#39B54A]">·</span>{g}</li>))}</ul>
                </div>
                <div className="flex-1 rounded-lg border p-3" style={{ borderColor: '#ED1C2440', backgroundColor: '#ED1C2408' }}>
                  <div className="text-xs font-black uppercase tracking-widest mb-1.5 text-[#ED1C24]">✗ Red flags</div>
                  <ul className="space-y-1">{c.red.map((r,i)=>(<li key={i} className="text-sm text-muted-foreground leading-snug flex gap-1.5"><span className="text-[#ED1C24]">·</span>{r}</li>))}</ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-4 rounded-xl border p-3" style={{ borderColor: '#06b6d455', backgroundColor: '#06b6d40d' }}>
            <p className="text-sm text-muted-foreground leading-snug">
              <span className="font-bold text-[#06b6d4]">Free tools — </span>
              <span className="font-medium text-foreground">Etherscan</span> (contracts, holders) · <span className="font-medium text-foreground">DeFiLlama</span> (TVL, volume) · <span className="font-medium text-foreground">Token Terminal</span> (revenue) · <span className="font-medium text-foreground">Nansen / Arkham</span> (wallet flows) · <span className="font-medium text-foreground">Dune</span> (custom analytics).
            </p>
          </div>
        </div>

        {/* ═══════ DECISION FRAMEWORK — Five Questions ═══════ */}
        <div id="s5-decision" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">Section 05 · Decision Framework</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Choosing a platform — five questions, in order</h2>
            <p className="text-sm text-muted-foreground mt-1">Answer them sequentially. The order matters: each answer narrows the next.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3 auto-rows-fr">
            {[
              { n: '1', q: 'Permission model', ask: 'Anyone reads & writes, or only known parties?',
                a: { tag: 'Permissionless', recs: 'Bitcoin · Ethereum · L2s · Solana', color: '#6366f1' },
                b: { tag: 'Permissioned', recs: 'Hyperledger Fabric · Corda · Quorum', color: '#39B54A' } },
              { n: '2', q: 'Programmability', ask: 'Just move value, or run logic on-chain?',
                a: { tag: 'Value transfer only', recs: 'Bitcoin L1 · Lightning', color: '#f59e0b' },
                b: { tag: 'Smart contracts', recs: 'Ethereum/EVM · Cosmos SDK · Starknet', color: '#6366f1' } },
              { n: '3', q: 'Throughput & cost', ask: 'How sensitive to gas cost and latency?',
                a: { tag: 'Low — settlement', recs: 'Ethereum L1 (max security)', color: '#627EEA' },
                b: { tag: 'High — consumer/DeFi', recs: 'Arbitrum · Base · Solana · Avalanche', color: '#ec4899' } },
              { n: '4', q: 'Privacy needs', ask: 'Selective or full data confidentiality?',
                a: { tag: 'None', recs: 'Default to your Q3 chain', color: '#6b7280' },
                b: { tag: 'Privacy required', recs: 'Aztec · Starknet ZK · Fabric channels', color: '#8b5cf6' } },
              { n: '5', q: 'Sovereignty vs shared security', ask: 'Own the validator set, or inherit security?',
                a: { tag: 'Sovereign', recs: 'Cosmos zone · Avalanche L1', color: '#22d3ee' },
                b: { tag: 'Shared security', recs: 'Polkadot parachain · Ethereum rollup', color: '#ED1C24' } },
            ].map(s => (
              <div key={s.n} className="rounded-xl border bg-card p-4 flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" style={{ backgroundColor: '#6366f1' }}>{s.n}</div>
                  <div>
                    <div className="font-bold text-base text-foreground leading-tight">{s.q}</div>
                    <div className="text-xs text-muted-foreground">{s.ask}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[s.a, s.b].map((o, i) => (
                    <div key={i} className="rounded-lg border px-3 py-2" style={{ borderColor: o.color + '45', backgroundColor: o.color + '0d' }}>
                      <div className="text-xs font-black uppercase tracking-wider" style={{ color: o.color }}>{o.tag}</div>
                      <div className="text-xs text-muted-foreground leading-snug mt-0.5">{o.recs}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-xl border-2 p-4 flex flex-col justify-center gap-2" style={{ borderColor: '#6366f155', backgroundColor: '#6366f10d' }}>
              <p className="text-sm font-black uppercase tracking-widest text-[#6366f1]">The honest meta-answer</p>
              <p className="text-sm text-foreground leading-snug">
                Don't pick a platform then force the use case onto it. And if it doesn't truly need a blockchain — a Postgres DB with signed rows is often the right tool.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════ DECISION EXAMPLES — Worked Examples ═══════ */}
        <div id="s5-decision-examples" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Platform selection — worked examples</h2>
            <p className="text-sm text-muted-foreground mt-1">Seven use cases walked through the five-question framework to a concrete recommendation. Read the "why" column to understand which axis drove the decision.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-3">
            {[
              { use: 'Cross-border remittance, low value',        rec: 'Bitcoin Lightning · USDC on Base / Solana',         why: 'Low cost · sub-second finality · users already trust USD-denominated value',                     color: '#f59e0b' },
              { use: 'High-value DeFi protocol',                  rec: 'Ethereum L1 + L2 deployment',                      why: 'L1 for vault security, L2 for user flow · deepest liquidity · most auditors available',          color: '#627EEA' },
              { use: 'Multi-company supply chain',                 rec: 'Hyperledger Fabric channel',                       why: 'Permissioned access · selective data sharing per channel · no token economics required',          color: '#39B54A' },
              { use: 'Privacy-preserving identity / KYC',         rec: 'Starknet (Cairo + ZK creds) · Aztec',              why: 'Programmable ZK privacy · verifiable claims without disclosure · Ethereum L1 settlement',         color: '#8b5cf6' },
              { use: 'On-chain game with tradable assets',         rec: 'Immutable · Ronin · Starknet (Dojo) · Base',       why: 'High throughput · low gas per action · gaming-focused tooling · existing player ecosystems',      color: '#ec4899' },
              { use: 'Sovereign app-chain, custom consensus',      rec: 'Cosmos zone via Cosmos SDK',                       why: 'Full control over VM, gas token, governance · trade-off: bootstrap your own validator set',       color: '#22d3ee' },
              { use: 'Cross-border government credentials',        rec: 'EU EBSI (Fabric-based) · purpose-built consortium', why: 'Regulator-mandated participation · interop required at policy level · no public token needed',  color: '#6366f1' },
            ].map((c, i, arr) => (
              <div
                key={c.use}
                className={`rounded-xl border p-4 min-h-0 flex flex-col gap-1.5${i === arr.length - 1 && arr.length % 2 !== 0 ? ' col-span-2' : ''}`}
                style={{ borderColor: c.color + '50', backgroundColor: c.color + '08' }}
              >
                <div className="text-xs font-black uppercase tracking-wider leading-tight" style={{ color: c.color }}>{c.use}</div>
                <div className="text-base font-bold text-foreground leading-snug">→ {c.rec}</div>
                <div className="text-sm text-muted-foreground italic leading-snug">{c.why}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ QUIZ — Optimistic vs ZK withdrawal latency ═══════ */}
        <div id="s5-quiz" className="h-full">
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

        {/* ═══════ QUIZ 2 — Sovereignty vs shared security ═══════ */}
        <div id="s5-quiz-2" className="h-full">
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
        <div id="s5-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 05 — Key Takeaways"
            takeaways={[
              'ZK rollups use cryptographic validity proofs — no challenge window, instant finality, and the foundation for verifiable privacy',
              'Optimistic rollups (Arbitrum, Base, Optimism) offer full EVM compatibility with lower computation cost — at the price of a 7-day withdrawal delay',
              'Each L2 has a distinct culture: Arbitrum for DeFi depth, Base for consumer apps, Starknet for games and ZK-native compute',
              'Privacy on public chains requires extra cryptographic machinery — the regulatory line for "privacy tooling" is still being drawn',
              'Run five questions before picking a platform: permission, programmability, throughput, privacy, and sovereignty',
            ]}
          />
        </div>

        {/* ═══════ TEAM CHECKPOINT — DAY 2 WRAP ═══════ */}
        <div id="s5-team-checkpoint" className="h-full">
          <TeamCheckpoint
            contextLabel="Day 2 wrap · Course 03 → Course 02 (Day 3)"
            title="Find your problem statement"
            subtitle="You've now seen the platform landscape. Time to converge on the specific problem your team wants to tackle — before Day 3 turns it into a concrete smart-contract design."
            duration="15–20 min"
            sections={[
              {
                label: 'What you have',
                color: '#22d3ee',
                items: [
                  <>Your team of <strong>3–4 members</strong> from Day 1 (find them now if you skipped it).</>,
                  <>The pain points each member brought into Day 2.</>,
                  <>An understanding of platform trade-offs — public vs permissioned, L1 vs L2, throughput vs cost.</>,
                ],
              },
              {
                label: 'Do now together',
                color: '#39B54A',
                items: [
                  <>Each member pitches their top pain point (60 seconds each, no debate yet).</>,
                  <>As a team, pick <strong>one problem statement</strong> — specific enough to design for, broad enough that everyone is engaged.</>,
                  <>Write it as <em>"Today, &lt;who&gt; struggles with &lt;what&gt; because &lt;why&gt;. We want to design a smart-contract solution that …"</em></>,
                  <>Capture three current pain metrics if you can — cost, time, error rate, trust gap, etc.</>,
                ],
              },
              {
                label: 'Bring to Day 3',
                color: '#8b5cf6',
                items: [
                  <>Your one-sentence problem statement.</>,
                  <>A first guess at the industry (you'll refine it Day 3 morning).</>,
                  <>An open mind — the Day 3 decision framework may tell you blockchain isn't the right tool.</>,
                ],
              },
            ]}
            footnote={
              <span className="text-muted-foreground">
                <strong className="text-foreground">Day 3 preview →</strong> Business Applications for Smart Contracts will run your problem through a structured decision framework, walk you through five industry verticals, then have you sketch a full design as a team. The project deliverable starts there.
              </span>
            }
          />
        </div>

        </div>
      </div>
    </div>
  );
}
