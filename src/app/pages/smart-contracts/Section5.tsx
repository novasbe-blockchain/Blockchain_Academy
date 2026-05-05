import { useState } from 'react';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { ShieldAlert } from 'lucide-react';

const chapters = [
  { id: 's5-oracle',           label: 'The Oracle Problem' },
  { id: 's5-challenges',       label: 'Challenges & Limits' },
  { id: 's5-technical',        label: 'Technical Challenges' },
  { id: 's5-ex-oracle',        label: '🎯 Oracle Attack' },
  { id: 's5-risks-security',   label: 'Security Risks' },
  { id: 's5-risks-cost',       label: 'Cost Risks' },
  { id: 's5-risks-regulatory', label: 'Regulatory Risks' },
  { id: 's5-quiz',             label: 'Quiz' },
  { id: 's5-takeaways',        label: 'Takeaways' },
  { id: 's5-summary',          label: 'Summary' },
];

// ─── Exercise: Oracle Attack Scenario ───────────────────────────────────────

const ORACLE_ROWS = [
  {
    emoji: '🌾', actor: 'Farmer',           color: '#39B54A',
    event: 'Pays $500 premium into smart contract',
    consequence: 'Contract stores: if rainfall < 50mm in June → pay out $5,000 automatically.',
    mitigation: null,
  },
  {
    emoji: '🏢', actor: 'Oracle Provider',  color: '#6366f1',
    event: 'A single company runs the only weather oracle',
    consequence: "The smart contract trusts this oracle completely. It's the only source of truth for rainfall data.",
    mitigation: { title: 'Decentralised Oracle (Chainlink)', desc: 'Aggregate from 15+ independent nodes — attacker must compromise a majority simultaneously.' },
  },
  {
    emoji: '🔓', actor: 'Attacker',         color: '#ED1C24',
    event: "Hacker compromises the oracle's API key",
    consequence: "The attacker can now submit any rainfall figure they want — the blockchain has no way to verify it.",
    mitigation: { title: 'Multiple Data Sources', desc: 'Cross-check NOAA + Weather.com + satellite data — one compromised source is caught by the others.' },
  },
  {
    emoji: '📡', actor: 'Attacker',         color: '#ED1C24',
    event: 'Submits fake data: "rainfall = 10mm"',
    consequence: 'The smart contract reads this value, sees the condition is met (10 < 50), and executes automatically.',
    mitigation: { title: 'Dispute Window', desc: 'Add a 24h challenge period before payout — observers can flag suspicious oracle data.' },
  },
  {
    emoji: '💸', actor: 'Smart Contract',   color: '#f59e0b',
    event: "Releases $5,000 to the attacker's wallet",
    consequence: "The contract behaved exactly as coded. It did nothing wrong. The vulnerability was the oracle — not the contract.",
    mitigation: { title: 'Multisig Oracle Control', desc: 'Require 3-of-5 oracle operators to sign the data — no single point of control.' },
  },
  {
    emoji: '🔒', actor: 'Farmer',           color: '#ED1C24',
    event: 'Tries to dispute the payout',
    consequence: 'The transaction is immutable. The code has already executed. There is no appeals process, no reversal.',
    mitigation: null,
  },
];

function OracleAttackExercise() {
  const [revealed, setRevealed] = useState(0);
  const allDone = revealed >= ORACLE_ROWS.length;
  const reset = () => setRevealed(0);

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 flex items-center justify-between mb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ED1C24]/15 border border-[#ED1C24]/40 text-[#ED1C24] text-xs font-bold">🎯 Exercise</span>
          <h2 className="text-2xl font-bold text-foreground mt-1">Oracle Attack — Step by Step</h2>
          <p className="text-muted-foreground text-sm">A crop insurance contract is hacked via its oracle. Click through each step — and see how to prevent it.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-muted-foreground">{Math.min(revealed, ORACLE_ROWS.length)} / {ORACLE_ROWS.length} steps</div>
          {allDone && <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 transition-colors">↺ Reset</button>}
        </div>
      </div>

      <div className="shrink-0 grid grid-cols-2 gap-4 mb-2 px-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">What happened</p>
        <p className="text-xs font-semibold text-[#39B54A] uppercase tracking-widest">How to prevent it</p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-2">
        {ORACLE_ROWS.map((row, i) => (
          <motion.div
            key={i}
            className="flex-1 grid grid-cols-2 gap-4 min-h-0"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: i < revealed ? 1 : 0.15 }}
          >
            <div
              className="flex items-start gap-2.5 p-3 rounded-xl border transition-colors"
              style={{
                borderColor: i < revealed ? row.color + '40' : 'var(--border)',
                backgroundColor: i < revealed ? row.color + '08' : 'transparent',
              }}
            >
              <div className="size-7 rounded-full flex items-center justify-center text-base shrink-0"
                style={{ backgroundColor: i < revealed ? row.color + '20' : 'var(--muted)' }}>
                {i < revealed ? row.emoji : '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span className="text-xs font-bold shrink-0" style={{ color: i < revealed ? row.color : 'var(--muted-foreground)' }}>{row.actor}</span>
                  <span className="text-xs font-semibold text-foreground">{i < revealed ? row.event : '···'}</span>
                </div>
                {i < revealed && <div className="text-xs text-muted-foreground leading-snug">{row.consequence}</div>}
              </div>
            </div>

            <div className="p-3 rounded-xl border transition-colors"
              style={{
                borderColor: row.mitigation && allDone ? '#39B54A40' : 'transparent',
                backgroundColor: row.mitigation && allDone ? '#39B54A08' : 'transparent',
              }}
            >
              {row.mitigation && allDone && (
                <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <div className="font-bold text-xs text-[#39B54A] mb-1">✓ {row.mitigation.title}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{row.mitigation.desc}</div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {!allDone && (
        <div className="shrink-0 mt-3">
          <button
            onClick={() => setRevealed(r => r + 1)}
            className="px-4 py-2 rounded-lg bg-[#ED1C24] text-white text-xs font-bold hover:bg-[#ED1C24]/90 transition-colors"
          >
            Reveal next step →
          </button>
        </div>
      )}
    </div>
  );
}

export function SC_Section5() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={chapters} accentColor="#6366f1" />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 05"
            title="Limitations & Risks"
            subtitle="An honest look at the oracle problem, real limitations, and where smart contracts fall short"
            icon={<ShieldAlert className="size-20 text-[#6366f1]" />}
            gradient="from-[#ED1C24] to-[#6366f1]"
          />
        </div>

        {/* ═══════ THE ORACLE PROBLEM ═══════ */}
        <div id="s5-oracle" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">The Oracle Problem</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contracts are deterministic and closed — they cannot reach outside the blockchain on their own.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            <div className="flex flex-col gap-3">
              {[
                {
                  color: '#ED1C24', emoji: '🔒', label: 'The Problem',
                  content: 'Blockchains are closed, deterministic systems. A smart contract cannot fetch stock prices, check the weather, verify a sports score, or confirm a package delivery. Any external call would produce different results on different nodes — breaking consensus.',
                  sub: 'The blockchain knows nothing about the world outside itself.',
                },
                {
                  color: '#6366f1', emoji: '🌉', label: 'The Solution: Oracles',
                  content: 'Oracles are off-chain services that fetch real-world data and submit it on-chain as a signed transaction. The smart contract reads oracle-provided data just like any other on-chain value. Chainlink is the dominant oracle network.',
                  sub: 'Oracle = a trusted data bridge between the real world and the blockchain.',
                },
                {
                  color: '#f59e0b', emoji: '⚠️', label: 'The Risk: New Centralization',
                  content: 'By introducing an oracle, you reintroduce trust. If the oracle is controlled by one entity, it becomes a centralized point of failure — and the single source of manipulation. A corrupt or hacked oracle can drain millions from dependent contracts.',
                  sub: '"A smart contract is only as decentralized as its weakest data source."',
                },
              ].map(p => (
                <div key={p.label} className="flex-1 p-4 bg-card border border-border rounded-xl flex gap-3" style={{ borderColor: p.color + '30' }}>
                  <div className="size-9 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: p.color + '18' }}>{p.emoji}</div>
                  <div>
                    <div className="font-black text-sm mb-1" style={{ color: p.color }}>{p.label}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">{p.content}</p>
                    <p className="text-xs italic text-muted-foreground border-l-2 pl-2" style={{ borderColor: p.color + '50' }}>{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Real-world example</div>

              <div className="p-5 bg-gradient-to-br from-[#6366f1]/12 to-transparent border border-[#6366f1]/30 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🌾</span>
                  <div>
                    <div className="font-black text-sm text-foreground">Crop Insurance Smart Contract</div>
                    <div className="text-xs text-[#6366f1]">parametric insurance — no claims adjuster needed</div>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  {[
                    { step: '1', desc: 'Farmer pays premium into smart contract' },
                    { step: '2', desc: 'Contract stores: if rainfall < X mm in region Y by date Z → pay out $5,000' },
                    { step: '3', desc: 'Oracle (Chainlink + NOAA weather data) submits daily rainfall figures on-chain' },
                    { step: '4', desc: 'Contract reads oracle data → condition met → payout released automatically' },
                  ].map(s => (
                    <div key={s.step} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="size-4 rounded-full bg-[#6366f1]/20 flex items-center justify-center font-bold text-[#6366f1] shrink-0">{s.step}</span>
                      {s.desc}
                    </div>
                  ))}
                </div>
                <div className="p-2 bg-[#ED1C24]/10 border border-[#ED1C24]/20 rounded-lg text-xs text-muted-foreground">
                  <span className="font-bold text-[#ED1C24]">Risk:</span> if the weather oracle is compromised or goes offline, the contract can't execute. The oracle is now the single point of trust.
                </div>
              </div>

              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Oracle solutions in practice</div>
              <div className="flex flex-col gap-2">
                {[
                  { name: 'Chainlink', color: '#375BD2', desc: 'Decentralised oracle network — aggregates from many independent nodes, reducing manipulation risk' },
                  { name: 'Pyth Network', color: '#E6DAFE', darkColor: '#8b5cf6', desc: 'High-frequency financial data from institutional providers (exchanges, market makers) — 400ms latency' },
                  { name: 'API3', color: '#6366f1', desc: 'First-party oracles — data providers run their own oracle nodes, removing the middleman layer entirely' },
                  { name: 'UMA Optimistic', color: '#f59e0b', desc: 'Assume data is correct unless disputed within a window — cheaper but slower for edge cases' },
                ].map(o => (
                  <div key={o.name} className="flex items-start gap-2 p-2.5 bg-card border border-border rounded-lg">
                    <div className="px-2 py-0.5 rounded font-bold text-xs shrink-0 text-white" style={{ backgroundColor: o.darkColor ?? o.color }}>{o.name}</div>
                    <div className="text-xs text-muted-foreground">{o.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ CHALLENGES & LIMITATIONS ═══════ */}
        <div id="s5-challenges" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Challenges & Limitations</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contracts inherit the constraints of their underlying blockchain — and those constraints are significant.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            <div className="flex flex-col gap-4">
              <div className="flex-1 p-4 bg-card border border-[#ED1C24]/30 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🚦</span>
                  <div>
                    <div className="font-black text-sm text-foreground">Throughput</div>
                    <div className="text-xs text-[#ED1C24]">Blockchain can't match Web2 transaction volume</div>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  {[
                    { label: 'Bitcoin', tps: 7, max: 24000, color: '#f59e0b' },
                    { label: 'Ethereum', tps: 15, max: 24000, color: '#627EEA' },
                    { label: 'Solana', tps: 5000, max: 24000, color: '#9945FF' },
                    { label: 'Visa', tps: 24000, max: 24000, color: '#39B54A' },
                  ].map(c => (
                    <div key={c.label} className="flex items-center gap-2">
                      <div className="w-20 text-xs font-medium text-muted-foreground shrink-0">{c.label}</div>
                      <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full flex items-center justify-end pr-1.5 transition-all"
                          style={{ width: `${Math.max(2, (c.tps / c.max) * 100)}%`, backgroundColor: c.color }}
                        >
                          {c.tps >= 1000 && <span className="text-[9px] font-bold text-white">{c.tps.toLocaleString()}</span>}
                        </div>
                      </div>
                      <div className="text-xs font-bold w-16 text-right shrink-0" style={{ color: c.color }}>{c.tps.toLocaleString()} TPS</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground p-2 bg-muted rounded-lg">
                  Bitcoin and Ethereum L1 are 1,600–3,400× slower than Visa. L2s narrow this gap significantly but don't fully close it.
                </div>
              </div>

              <div className="flex-1 p-4 bg-card border border-[#f59e0b]/30 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">⏱️</span>
                  <div>
                    <div className="font-black text-sm text-foreground">Latency</div>
                    <div className="text-xs text-[#f59e0b]">Block times vs. millisecond web responses</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Ethereum block time', value: '12 seconds', sub: 'Per block — finality takes 2–3 blocks', color: '#627EEA' },
                    { label: 'Bitcoin block time', value: '~10 minutes', sub: '6 confirmations for high-value tx = 1 hour', color: '#f59e0b' },
                    { label: 'Web2 API response', value: '<100ms', sub: 'REST APIs, CDN-backed — imperceptible to user', color: '#39B54A' },
                    { label: 'L2 (Arbitrum)', value: '~250ms', sub: 'Near-instant UX, final on L1 in ~7 days', color: '#6366f1' },
                  ].map(l => (
                    <div key={l.label} className="p-2 bg-muted rounded-lg">
                      <div className="font-bold text-sm" style={{ color: l.color }}>{l.value}</div>
                      <div className="text-[10px] font-semibold text-foreground">{l.label}</div>
                      <div className="text-[10px] text-muted-foreground">{l.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex-1 p-4 bg-card border border-[#8b5cf6]/30 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">💾</span>
                  <div>
                    <div className="font-black text-sm text-foreground">Storage Costs</div>
                    <div className="text-xs text-[#8b5cf6]">On-chain storage is extraordinarily expensive</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 bg-[#ED1C24]/10 border border-[#ED1C24]/20 rounded-xl text-center">
                    <div className="text-2xl font-black text-[#ED1C24]">~$1,000</div>
                    <div className="text-xs text-muted-foreground mt-0.5">per MB on-chain (Ethereum)</div>
                  </div>
                  <div className="p-3 bg-[#39B54A]/10 border border-[#39B54A]/20 rounded-xl text-center">
                    <div className="text-2xl font-black text-[#39B54A]">~$0.02</div>
                    <div className="text-xs text-muted-foreground mt-0.5">per MB on AWS S3</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground p-2 bg-muted rounded-lg">
                  <span className="font-semibold text-foreground">50,000× more expensive.</span> This is why NFT metadata is stored on IPFS, not on-chain. Smart contracts only store the minimum required state — everything else lives off-chain.
                </div>
              </div>

              <div className="flex-1 p-4 bg-card border border-[#6366f1]/30 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">⚙️</span>
                  <div>
                    <div className="font-black text-sm text-foreground">Computation Limits</div>
                    <div className="text-xs text-[#6366f1]">Gas limits cap what contracts can calculate</div>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground mb-3">
                  {[
                    'Every block has a gas limit (~30M gas on Ethereum) — no transaction can exceed this',
                    'Complex machine learning inference, large sorting algorithms, or image processing: impossible on-chain',
                    'Deep recursive loops will either hit gas limits and revert, or drain user wallets',
                    'On-chain computation is ~1,000,000× more expensive than off-chain for equivalent work',
                  ].map(l => (
                    <li key={l} className="flex gap-2"><span className="text-[#6366f1] shrink-0 mt-0.5">›</span>{l}</li>
                  ))}
                </ul>
                <div className="p-2 bg-[#6366f1]/10 rounded-lg text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Pattern:</span> move heavy computation off-chain, submit only the result + proof on-chain. Zero-knowledge proofs (ZK-SNARKs) make this verifiable.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ TECHNICAL CHALLENGES ═══════ */}
        <div id="s5-technical" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Technical Challenges & Limitations</h2>
            <p className="text-muted-foreground text-sm mt-1">Four structural problems that define the frontier of blockchain engineering.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            <div className="p-5 bg-card border border-[#ED1C24]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-[#ED1C24]/15 flex items-center justify-center text-xl shrink-0">🤖</div>
                <div>
                  <div className="font-black text-sm text-foreground">MEV — Maximal Extractable Value</div>
                  <div className="text-xs font-semibold text-[#ED1C24]">Validators (and anyone) can reorder transactions for profit</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Block producers choose which transactions to include and in what order. This gives them the power to front-run users — seeing a profitable trade in the mempool and inserting their own transaction first to capture the price difference.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {[
                  'Front-running: validator sees your DEX trade → inserts same trade before yours → sells into your transaction',
                  'Sandwich attacks: buy before you, sell after you — you get a worse price, they profit',
                  '$1.3B+ extracted from Ethereum users since 2020 (Flashbots data)',
                ].map(l => (
                  <li key={l} className="flex gap-1.5"><span className="text-[#ED1C24] shrink-0">›</span>{l}</li>
                ))}
              </ul>
              <div className="mt-auto p-2 bg-[#ED1C24]/08 rounded-lg text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Mitigation:</span> Flashbots SUAVE, private mempools, commit-reveal schemes, and MEV-aware DEX designs (e.g. CoW Protocol).
              </div>
            </div>

            <div className="p-5 bg-card border border-[#f59e0b]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center text-xl shrink-0">🔧</div>
                <div>
                  <div className="font-black text-sm text-foreground">Upgradability</div>
                  <div className="text-xs font-semibold text-[#f59e0b]">Immutable code makes fixing bugs extremely difficult</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Once deployed, a smart contract's code cannot be changed. A bug discovered post-deployment — even a critical one — cannot be patched directly. Adding upgrade patterns reintroduces centralisation and complexity.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-[#ED1C24]/08 border border-[#ED1C24]/20 rounded-lg">
                  <div className="font-bold text-[#ED1C24] mb-1">Immutable risk</div>
                  <div className="text-muted-foreground">Bug = permanent. The DAO hack: $60M lost, required Ethereum hard fork to recover.</div>
                </div>
                <div className="p-2 bg-[#f59e0b]/08 border border-[#f59e0b]/20 rounded-lg">
                  <div className="font-bold text-[#f59e0b] mb-1">Proxy pattern risk</div>
                  <div className="text-muted-foreground">Upgradeable contracts require an admin key — making the protocol only as decentralised as that key holder.</div>
                </div>
              </div>
              <div className="mt-auto p-2 bg-[#f59e0b]/08 rounded-lg text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Best practice:</span> immutable core logic + audits before deployment. Upgrade patterns only where strictly necessary, with timelocks and multisig governance.
              </div>
            </div>

            <div className="p-5 bg-card border border-[#6366f1]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-[#6366f1]/15 flex items-center justify-center text-xl shrink-0">🔺</div>
                <div>
                  <div className="font-black text-sm text-foreground">The Blockchain Trilemma</div>
                  <div className="text-xs font-semibold text-[#6366f1]">Cannot optimise security, scalability, and decentralisation simultaneously</div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-48 h-36">
                  <svg viewBox="0 0 200 160" className="w-full h-full">
                    <polygon points="100,10 190,150 10,150" fill="none" stroke="#6366f180" strokeWidth="2" />
                    <circle cx="100" cy="10" r="5" fill="#ED1C24" />
                    <circle cx="190" cy="150" r="5" fill="#39B54A" />
                    <circle cx="10" cy="150" r="5" fill="#f59e0b" />
                    <text x="100" y="6" textAnchor="middle" className="text-[10px]" fill="#ED1C24" fontSize="10">Security</text>
                    <text x="196" y="148" textAnchor="start" fill="#39B54A" fontSize="9">Scalability</text>
                    <text x="4" y="148" textAnchor="end" fill="#f59e0b" fontSize="9">Decentralisation</text>
                    <text x="100" y="95" textAnchor="middle" fill="#6366f180" fontSize="9">pick 2</text>
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center">
                {[
                  { name: 'Bitcoin', sacrifice: 'Scalability (7 TPS)', color: '#f59e0b' },
                  { name: 'Ethereum L1', sacrifice: 'Scalability → L2s solve this', color: '#627EEA' },
                  { name: 'Solana', sacrifice: 'Decentralisation (fewer validators)', color: '#9945FF' },
                ].map(t => (
                  <div key={t.name} className="p-1.5 bg-muted rounded-lg">
                    <div className="font-bold" style={{ color: t.color }}>{t.name}</div>
                    <div className="text-muted-foreground leading-tight">{t.sacrifice}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-card border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-[#39B54A]/15 flex items-center justify-center text-xl shrink-0">📈</div>
                <div>
                  <div className="font-black text-sm text-foreground">State Growth</div>
                  <div className="text-xs font-semibold text-[#39B54A]">Blockchain size grows 50 GB+ annually — forever</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every transaction ever executed is stored permanently on every full node. The blockchain is append-only — nothing is ever deleted. As adoption grows, so does the burden of running a full node.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'Bitcoin full chain', value: '~600 GB', color: '#f59e0b', note: 'Growing ~50 GB/year' },
                  { label: 'Ethereum full chain', value: '~1.2 TB', color: '#627EEA', note: 'Archive node: 15+ TB' },
                  { label: 'Pruned node', value: '~10 GB', color: '#39B54A', note: 'Stores only recent state' },
                  { label: 'State growth risk', value: 'Centralisation', color: '#ED1C24', note: 'Only datacenters can run full nodes' },
                ].map(s => (
                  <div key={s.label} className="p-2 bg-muted rounded-lg">
                    <div className="font-black text-sm" style={{ color: s.color }}>{s.value}</div>
                    <div className="font-semibold text-[10px] text-foreground">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.note}</div>
                  </div>
                ))}
              </div>
              <div className="mt-auto p-2 bg-[#39B54A]/08 rounded-lg text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Mitigation:</span> EIP-4444 (Ethereum history expiry), stateless clients, and Verkle trees aim to decouple state storage from full node requirements.
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ EXERCISE: ORACLE ATTACK ═══════ */}
        <div id="s5-ex-oracle" className="h-full">
          <OracleAttackExercise />
        </div>

        {/* ═══════ SECURITY RISKS DEEP-DIVE ═══════ */}
        <div id="s5-risks-security" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Security Risks</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contract vulnerabilities are public, permanent, and exploited within hours of deployment if missed.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { title: 'Reentrancy', emoji: '🔁', color: '#ED1C24',
                desc: 'A function calls an external contract before updating its own state. The external contract calls back into the original — repeating the original action with stale state. The DAO (2016): $60M.',
                fix: 'Checks-Effects-Interactions pattern; OpenZeppelin ReentrancyGuard.' },
              { title: 'Flash Loan Attacks', emoji: '⚡', color: '#f59e0b',
                desc: 'Borrow $100M with no collateral, manipulate an on-chain price oracle, exploit a dependent protocol, repay the loan — all atomic in one transaction. Harvest Finance (2020): $34M.',
                fix: 'Time-weighted average prices (TWAP); decentralised oracles; multi-source pricing.' },
              { title: 'Access Control', emoji: '🔑', color: '#8b5cf6',
                desc: 'Critical functions (mint, withdraw, upgrade) lack proper modifiers. Parity multisig (2017): $30M frozen because anyone could call the kill function and self-destruct the library.',
                fix: 'Role-based access control (OpenZeppelin AccessControl); thorough testing; audit by experts.' },
              { title: 'Integer Over/Underflow', emoji: '🧮', color: '#6366f1',
                desc: 'In Solidity <0.8, arithmetic wraps silently: balance - withdraw can underflow to MAX_UINT, granting attacker huge balance. Mitigated by default in Solidity 0.8+.',
                fix: 'Use Solidity ≥0.8 for built-in checks, or SafeMath library in older code.' },
              { title: 'Logic Bugs', emoji: '🐛', color: '#39B54A',
                desc: 'Code does what it says, but what it says is wrong. Off-by-one errors, incorrect price calculations, mis-named function arguments. Often missed by automated tools — only caught by careful audit.',
                fix: 'Multiple independent audits; formal verification for critical contracts; bug bounties.' },
              { title: 'Cumulative Loss', emoji: '💸', color: '#ED1C24',
                desc: '$6B+ stolen from smart contracts since 2016 across thousands of incidents. The most expensive bugs are the simplest ones — a missing modifier, a wrong sign in an inequality, a copy-paste error.',
                fix: 'Treat audits as non-optional. Smart Contract Security audits are a discipline — not a checkbox.' },
            ].map(r => (
              <div key={r.title} className="p-4 bg-card border rounded-xl flex flex-col gap-2" style={{ borderColor: r.color + '30' }}>
                <div className="flex items-center gap-2">
                  <div className="size-9 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: r.color + '15' }}>{r.emoji}</div>
                  <div className="font-bold text-sm text-foreground">{r.title}</div>
                </div>
                <div className="text-xs text-muted-foreground leading-snug flex-1">{r.desc}</div>
                <div className="text-xs p-2 rounded-lg" style={{ backgroundColor: r.color + '08' }}>
                  <span className="font-semibold" style={{ color: r.color }}>Fix:</span> <span className="text-muted-foreground">{r.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ COST RISKS ═══════ */}
        <div id="s5-risks-cost" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Cost Risks</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contracts are not plug-and-play — significant upfront investment is required and ongoing costs must be planned for.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            {[
              { title: 'Immutability & Redeployment', color: '#ED1C24',
                points: [
                  'Contracts cannot be modified once deployed.',
                  'Fixing bugs requires terminating the broken contract and redeploying — costly and risky.',
                  'Demands thorough testing and secure design upfront — ship-and-iterate doesn\'t apply here.',
                  'Migration of users and state from v1 to v2 is its own engineering project.',
                ] },
              { title: 'Development & Maintenance', color: '#f59e0b',
                points: [
                  'Solidity (and other on-chain languages) are complex and rapidly evolving.',
                  'Bugs are introduced unintentionally — even by experienced developers.',
                  'Maintainability is hard precisely because immutability blocks normal patching workflows.',
                  'Specialised hires (auditors, security engineers) command premium rates.',
                ] },
              { title: 'Gas & Execution', color: '#8b5cf6',
                points: [
                  'Execution costs vary with network congestion — fees can spike 10–100× during high demand.',
                  'Inefficient code = higher gas fees forever for every user.',
                  'Optimisation discipline: limit storage writes, reduce external calls, use compact data structures.',
                  'High fees can undermine the economic viability of micro-transactions and small payments.',
                ] },
              { title: 'Security vs Performance', color: '#6366f1',
                points: [
                  'Defensive checks (require statements, access modifiers) all consume gas.',
                  'Developers must balance security (more checks) against efficiency (fewer checks) and cost.',
                  'Audit costs scale with code complexity — a $50K audit for 500 lines is normal.',
                  'Bug bounty programs add ongoing operational cost but reduce catastrophic risk.',
                ] },
            ].map(b => (
              <div key={b.title} className="p-5 bg-card border rounded-xl flex flex-col gap-3" style={{ borderColor: b.color + '30' }}>
                <div className="font-black text-sm" style={{ color: b.color }}>{b.title}</div>
                <ul className="space-y-2 text-xs text-muted-foreground flex-1">
                  {b.points.map(p => (
                    <li key={p} className="flex gap-2"><span style={{ color: b.color }} className="shrink-0 mt-0.5">›</span>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ REGULATORY RISKS ═══════ */}
        <div id="s5-risks-regulatory" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Regulatory Risks</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contracts blur the boundary between code and law — and law has not yet caught up.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">

            <div className="p-5 bg-card border border-[#ED1C24]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-xl bg-[#ED1C24]/15 flex items-center justify-center text-xl">⚖️</div>
                <div className="font-black text-sm text-foreground">Legal Adjudication</div>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>Smart contracts often lack traditional legal form (signatures, mutual assent, considered terms).</li>
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>May not fulfil legal standards for a valid contract in many jurisdictions.</li>
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>Court enforcement is uncertain — especially in regulated sectors like finance, insurance, healthcare.</li>
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>"Code is law" is rejected by courts when stakes are high — see The DAO and the Ethereum hard fork.</li>
              </ul>
            </div>

            <div className="p-5 bg-card border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-xl bg-[#8b5cf6]/15 flex items-center justify-center text-xl">🔍</div>
                <div className="font-black text-sm text-foreground">Privacy vs Transparency</div>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Public blockchains expose every transaction to all nodes — by design.</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>This conflicts directly with GDPR ("right to be forgotten"), HIPAA, and sector-specific confidentiality laws.</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Even hashed data can leak personal information through metadata, timing, or linkability.</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Mitigation: zero-knowledge proofs, permissioned chains, on-chain hashes + off-chain encrypted data.</li>
              </ul>
            </div>

            <div className="p-5 bg-card border border-[#f59e0b]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center text-xl">🏃</div>
                <div className="font-black text-sm text-foreground">Tech Outpacing Law</div>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-1.5"><span className="text-[#f59e0b]">›</span>Legal frameworks evolve in years; smart contract use cases evolve in months.</li>
                <li className="flex gap-1.5"><span className="text-[#f59e0b]">›</span>By the time regulations are written, the industry has moved to a different paradigm.</li>
                <li className="flex gap-1.5"><span className="text-[#f59e0b]">›</span>Cross-jurisdictional conflicts: a contract legal in Singapore may be illegal in the US.</li>
                <li className="flex gap-1.5"><span className="text-[#f59e0b]">›</span>EU's MiCA (2024) is a notable exception — first comprehensive crypto regulation.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s5-quiz" className="h-full">
          <QuizSlide
            question="A DeFi lending protocol uses a single on-chain DEX spot price as its collateral oracle. An attacker takes a $50M flash loan, manipulates the DEX price, borrows against inflated collateral, and repays the loan — all in one transaction. Which property of flash loans makes this attack unique compared to a standard market manipulation?"
            options={[
              { text: 'Flash loans are anonymous — the attacker cannot be traced or prosecuted.', correct: false },
              { text: 'Flash loans require no capital — the entire attack is atomic and self-financing within a single block, leaving no trace between blocks.', correct: true },
              { text: 'Flash loans exploit a bug in the Ethereum protocol itself, making them impossible to prevent at the contract level.', correct: false },
              { text: 'Flash loans allow attackers to bypass gas fees, making the attack economically viable even for small protocols.', correct: false },
            ]}
            explanation="Traditional market manipulation requires large capital held at risk over time. Flash loans change the economics completely: the attacker borrows an enormous amount, executes the attack, and repays everything within a single atomic transaction. If any step fails, the entire transaction reverts — the attacker risks only gas fees. This means any protocol using a single on-chain spot price is vulnerable to an adversary with virtually zero capital. The fix: time-weighted average prices (TWAP) cannot be manipulated within a single block, and decentralized oracle networks aggregate from multiple independent sources."
          />
        </div>

        <div id="s5-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 05 — Key Takeaways"
            takeaways={[
              'The oracle problem: smart contracts cannot access external data trustlessly — bridges introduce new attack surfaces',
              'Immutability is a double-edged sword — bugs are permanent unless upgrade patterns are used',
              '"Code is law" means users have no recourse when code behaves correctly but harmfully',
              'Gas costs make complex on-chain logic economically impractical for many use cases',
              'Smart contracts are not always the answer — a database is faster, cheaper, and easier in many contexts',
              'Security audits are not optional — $6B+ lost since 2016; treat smart contract security as a discipline',
              'Regulatory uncertainty: laws move in years, contracts move in months — privacy, enforceability, and jurisdiction all matter',
            ]}
          />
        </div>

        <div id="s5-summary" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Section Summary</h2>
            <p className="text-sm text-muted-foreground mt-1">Limitations and risks — at a glance</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-start">
            {[
              { icon: '🔒', title: 'Reentrancy', summary: 'Attacker re-enters function before state updates — The DAO hack ($60M, 2016). Fix: Checks-Effects-Interactions pattern' },
              { icon: '🔮', title: 'Oracle Attacks', summary: 'Flash loan → manipulate AMM price → drain protocol — Harvest Finance ($34M, 2020). Fix: multi-oracle, TWAP' },
              { icon: '⛽', title: 'Gas & Scale', summary: 'Computation is metered and expensive on L1 — L2 rollups (Arbitrum, Optimism) reduce cost 10–100×' },
              { icon: '⚖️', title: 'Legal & Regulatory', summary: 'Enforceability uncertain · GDPR conflicts · jurisdictional differences · "code is law" rejected by courts' },
              { icon: '💸', title: 'Cost Realities', summary: 'Audit costs · gas optimisation discipline · maintenance is expensive · migrations are projects' },
              { icon: '🛡️', title: 'Mitigations', summary: 'Audits + formal verification · multi-oracle design · timelocks · upgrade proxy patterns · bug bounties' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex flex-col gap-2 p-4 rounded-2xl border bg-card"
                style={{ borderColor: '#6366f130' }}
              >
                <div className="text-3xl">{card.icon}</div>
                <div className="font-bold text-sm text-foreground">{card.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{card.summary}</div>
              </motion.div>
            ))}
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
