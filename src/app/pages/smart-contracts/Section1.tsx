import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { TimelineSlide } from '../../components/templates/TimelineSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { FileCode2, Check, X } from 'lucide-react';

import imgSzaboVending from '../../../assets/sc/szabo-vending-machine.png';

const chapters = [
  { id: 's1-warmup',   label: '🧩 BTC vs ETH' },
  { id: 's1-recap',    label: 'Ethereum Recap' },
  { id: 's1-what',     label: 'What is a Smart Contract?' },
  { id: 's1-szabo',    label: 'Nick Szabo\'s Vending Machine' },
  { id: 's1-history',    label: 'Historical Evolution' },
  { id: 's1-exercise',   label: '🧩 Exercise' },
  { id: 's1-quiz',     label: 'Quiz' },
  { id: 's1-takeaways', label: 'Takeaways' },
  { id: 's1-summary', label: 'Summary' },
];


// ─── Exercise: Is this a Smart Contract? ────────────────────────────────────

const SCENARIOS = [
  { title: 'Vending Machine', desc: 'Insert coins → get snack automatically', answer: true,  reason: 'Self-executing logic with automatic conditional payout — the original analogy Szabo used.' },
  { title: 'Airbnb Escrow',   desc: 'Platform holds payment until host confirms check-in', answer: true,  reason: 'Conditional fund release based on a confirmed event — a textbook smart contract use case.' },
  { title: 'Hospital Records', desc: 'Store & share medical history across doctors', answer: false, reason: 'Data is private, frequently updated, and legally sensitive. On-chain storage is 50,000× more expensive than a database.' },
  { title: 'Concert Ticket Resale', desc: 'NFT tickets — artist royalty enforced on every resale', answer: true,  reason: 'Automatic royalty on every transfer is impossible in traditional ticketing — smart contracts enforce it natively.' },
  { title: 'Company Expenses', desc: 'Submit receipts for manager approval', answer: false, reason: 'Internal process, single trusted party. No decentralisation needed — a simple approval workflow is cheaper and faster.' },
  { title: 'Crop Insurance',  desc: 'Auto-payout when rainfall falls below threshold', answer: true,  reason: 'Parametric insurance: oracle provides data, contract executes payout. No claims adjuster, no delay.' },
  { title: 'Social Media Likes', desc: 'Track likes and followers in real-time', answer: false, reason: 'Millisecond updates + massive data volume. Gas costs alone would make each like cost dollars.' },
  { title: 'DAO Treasury',    desc: 'Token holders vote; funds released if proposal passes', answer: true,  reason: 'Multi-party conditional payment with no board or legal entity needed. This is exactly what DAOs do.' },
  { title: 'Streaming Service', desc: 'Pay monthly fee to access video library', answer: false, reason: 'Storing a 2-hour movie on-chain would cost billions. Off-chain storage + access token is the right model.' },
  { title: 'Trade Finance',   desc: 'Letter of credit: pay importer when goods are confirmed delivered', answer: true,  reason: 'Multiple untrusting parties + conditional cross-border payment. Banks already pilot this with Hyperledger.' },
];

function SmartContractSortingExercise() {
  const [answers, setAnswers]   = useState<Record<number, boolean | null>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const total   = SCENARIOS.length;
  const done    = Object.keys(revealed).length;
  const correct = Object.entries(answers).filter(([i, a]) => a === SCENARIOS[+i].answer).length;

  const handlePick = (i: number, pick: boolean) => {
    if (revealed[i]) return;
    setAnswers(prev => ({ ...prev, [i]: pick }));
    setRevealed(prev => ({ ...prev, [i]: true }));
  };

  const reset = () => { setAnswers({}); setRevealed({}); };

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🧩 Exercise</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Is this a Smart Contract?</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Click YES or NO for each scenario, then see the explanation.</p>
        </div>
        <div className="flex items-center gap-4">
          {done > 0 && (
            <div className="text-right">
              <div className="text-2xl font-black" style={{ color: correct === done ? '#39B54A' : '#f59e0b' }}>{correct}/{done}</div>
              <div className="text-xs text-muted-foreground">correct so far</div>
            </div>
          )}
          {done === total && (
            <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-xs font-semibold text-muted-foreground transition-colors">↺ Reset</button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-5 grid-rows-2 gap-3">
        {SCENARIOS.map((s, i) => {
          const picked  = answers[i];
          const isRight = picked === s.answer;
          const isOpen  = !!revealed[i];
          return (
            <motion.div
              key={i}
              layout
              className="relative rounded-xl border-2 overflow-hidden flex flex-col transition-colors"
              style={{
                borderColor: !isOpen ? 'var(--border)' : isRight ? '#39B54A' : '#ED1C24',
                backgroundColor: !isOpen ? 'var(--card)' : isRight ? '#39B54A10' : '#ED1C2410',
              }}
            >
              {/* Card body */}
              <div className="flex-1 p-4 flex flex-col gap-2">
                <div className="font-black text-sm text-foreground leading-tight">{s.title}</div>
                <div className="text-xs text-muted-foreground leading-snug flex-1">{s.desc}</div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs leading-snug font-medium"
                      style={{ color: isRight ? '#39B54A' : '#ED1C24' }}
                    >
                      {isRight ? '✓ ' : '✗ '}{s.reason}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Buttons or result badge */}
              {!isOpen ? (
                <div className="flex border-t border-border shrink-0">
                  <button
                    onClick={() => handlePick(i, true)}
                    className="flex-1 py-2 text-sm font-black text-[#39B54A] hover:bg-[#39B54A]/15 transition-colors border-r border-border"
                  >YES</button>
                  <button
                    onClick={() => handlePick(i, false)}
                    className="flex-1 py-2 text-sm font-black text-[#ED1C24] hover:bg-[#ED1C24]/15 transition-colors"
                  >NO</button>
                </div>
              ) : (
                <div className="shrink-0 flex items-center justify-center py-2 gap-1.5 border-t" style={{ borderColor: isRight ? '#39B54A40' : '#ED1C2440' }}>
                  {isRight
                    ? <Check className="size-4 text-[#39B54A]" strokeWidth={3} />
                    : <X     className="size-4 text-[#ED1C24]" strokeWidth={3} />}
                  <span className="text-xs font-bold" style={{ color: isRight ? '#39B54A' : '#ED1C24' }}>
                    {s.answer ? 'Smart Contract' : 'Not a SC'}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Warm-up: Bitcoin or Ethereum? (recap from Course 02) ───────────────────

type Chain = 'btc' | 'eth' | 'both';

const BTC_ETH: { stmt: string; answer: Chain; why: string }[] = [
  { stmt: 'Launched in 2009 by Satoshi Nakamoto', answer: 'btc',  why: 'Bitcoin was the first blockchain. Ethereum came in 2015.' },
  { stmt: 'Launched in 2015 by Vitalik Buterin & co.', answer: 'eth',  why: 'Ethereum mainnet went live July 2015 with the Solidity language.' },
  { stmt: 'Hard cap of 21 million coins', answer: 'btc',  why: 'Bitcoin has a fixed 21M supply. ETH has no hard cap (~120M circulating).' },
  { stmt: 'Turing-complete smart contracts (the EVM)', answer: 'eth',  why: 'Ethereum runs arbitrary logic on the EVM. Bitcoin Script is intentionally limited.' },
  { stmt: 'Tracks funds with the UTXO model', answer: 'btc',  why: 'Bitcoin spends discrete unspent outputs. Ethereum uses account balances.' },
  { stmt: 'Tracks funds with account balances', answer: 'eth',  why: 'Ethereum mutates a balance per account. Bitcoin uses UTXOs.' },
  { stmt: 'Switched to Proof of Stake in 2022', answer: 'eth',  why: 'The Merge moved Ethereum to PoS. Bitcoin still uses Proof of Work.' },
  { stmt: 'A public, decentralised ledger where the native coin pays fees', answer: 'both', why: 'True of both — BTC pays Bitcoin fees, ETH pays Ethereum gas.' },
];

const CHAIN_META: Record<Chain, { label: string; color: string; glyph: string }> = {
  btc:  { label: 'Bitcoin',  color: '#f59e0b', glyph: '₿' },
  eth:  { label: 'Ethereum', color: '#6366f1', glyph: 'Ξ' },
  both: { label: 'Both',     color: '#8b5cf6', glyph: '⇋' },
};

function BitcoinEthereumWarmup() {
  const [picks, setPicks] = useState<Record<number, Chain>>({});
  const total = BTC_ETH.length;
  const done = Object.keys(picks).length;
  const correct = Object.entries(picks).filter(([i, p]) => p === BTC_ETH[+i].answer).length;

  const pick = (i: number, c: Chain) => {
    if (picks[i]) return;
    setPicks(prev => ({ ...prev, [i]: c }));
  };
  const reset = () => setPicks({});

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 flex items-center justify-between mb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🧩 Warm-up · from Course 02</span>
          <h2 className="text-2xl font-bold text-foreground mt-1">Bitcoin or Ethereum?</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Recall before we build. Tag each statement, then see the answer.</p>
        </div>
        <div className="flex items-center gap-4">
          {done > 0 && (
            <div className="text-right">
              <div className="text-2xl font-black" style={{ color: correct === done ? '#39B54A' : '#f59e0b' }}>{correct}/{done}</div>
              <div className="text-xs text-muted-foreground">correct</div>
            </div>
          )}
          {done === total && (
            <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-xs font-semibold text-muted-foreground transition-colors">↺ Reset</button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3">
        {BTC_ETH.map((q, i) => {
          const picked = picks[i];
          const open = !!picked;
          const right = picked === q.answer;
          const ans = CHAIN_META[q.answer];
          return (
            <motion.div
              key={i}
              layout
              className="relative rounded-xl border-2 overflow-hidden flex flex-col"
              style={{
                borderColor: !open ? 'var(--border)' : right ? '#39B54A' : '#ED1C24',
                backgroundColor: !open ? 'var(--card)' : right ? '#39B54A10' : '#ED1C2410',
              }}
            >
              <div className="flex-1 p-3 flex flex-col gap-2">
                <div className="text-sm font-semibold text-foreground leading-snug flex-1">{q.stmt}</div>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] leading-snug"
                    >
                      <span className="font-black" style={{ color: ans.color }}>{ans.glyph} {ans.label}</span>
                      <span className="text-muted-foreground"> — {q.why}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {!open ? (
                <div className="flex border-t border-border shrink-0">
                  {(['btc','eth','both'] as Chain[]).map((c, ci) => {
                    const m = CHAIN_META[c];
                    return (
                      <button
                        key={c}
                        onClick={() => pick(i, c)}
                        className={`flex-1 py-2 text-xs font-black transition-colors ${ci < 2 ? 'border-r border-border' : ''}`}
                        style={{ color: m.color }}
                      >
                        {m.glyph} {m.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="shrink-0 flex items-center justify-center py-2 gap-1.5 border-t" style={{ borderColor: right ? '#39B54A40' : '#ED1C2440' }}>
                  {right
                    ? <Check className="size-4 text-[#39B54A]" strokeWidth={3} />
                    : <X className="size-4 text-[#ED1C24]" strokeWidth={3} />}
                  <span className="text-xs font-bold" style={{ color: right ? '#39B54A' : '#ED1C24' }}>
                    {right ? 'Correct' : `You said ${CHAIN_META[picked].label}`}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function SC_Section1() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} accentColor="#6366f1" />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 01"
            title="Introduction to Smart Contracts"
            subtitle="Fundamentals, history, and the essential blockchain knowledge you need"
            icon={<FileCode2 className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ 0a. WARM-UP: BITCOIN vs ETHEREUM ═══════ */}
        <div id="s1-warmup" className="h-full">
          <BitcoinEthereumWarmup />
        </div>

        {/* ═══════ 0b. ETHEREUM RECAP (warm-up) ═══════ */}
        <div id="s1-recap" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">Warm-up · from Course 02</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Quick Recap — Ethereum, the World Computer</h2>
            <p className="text-sm text-muted-foreground mt-1">
              You met all of this in <span className="font-semibold text-foreground">Course 02 → Ethereum</span>. A 60-second refresher before we go deeper into the contracts themselves.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-4 content-center">
            {[
              {
                emoji: '👤', color: '#6366f1', title: 'Accounts',
                desc: 'Two kinds: EOAs controlled by a private key (people), and contract accounts controlled by their code.',
                tag: 'EOA vs Contract',
              },
              {
                emoji: '🖥️', color: '#8b5cf6', title: 'The EVM',
                desc: 'Every node runs the same Ethereum Virtual Machine, so a program produces the same result everywhere.',
                tag: 'Deterministic',
              },
              {
                emoji: '⛽', color: '#f59e0b', title: 'Gas',
                desc: 'You pay for computation. Gas prices each step and guarantees programs always halt — no infinite loops.',
                tag: 'Pay per step',
              },
              {
                emoji: '✍️', color: '#39B54A', title: 'Transactions',
                desc: 'Signed messages that change global state. Only an EOA can start one; it can call a contract.',
                tag: 'State change',
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex flex-col gap-2 p-4 rounded-2xl border bg-card"
                style={{ borderColor: c.color + '40' }}
              >
                <div className="text-3xl">{c.emoji}</div>
                <div className="font-black text-base" style={{ color: c.color }}>{c.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed flex-1">{c.desc}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest rounded-md px-2 py-1 self-start" style={{ backgroundColor: c.color + '15', color: c.color }}>{c.tag}</div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-4 p-3 rounded-xl border border-[#6366f1]/30 bg-[#6366f1]/08 text-center text-sm" style={{ backgroundColor: '#6366f10f' }}>
            <span className="font-bold text-[#6366f1]">Where this course picks up: </span>
            <span className="text-muted-foreground">a contract account <em>is</em> a smart contract. The next sections are all about what that code can do, how to read it, and when it's the right tool.</span>
          </div>
        </div>

        {/* ═══════ 1. WHAT IS A SMART CONTRACT ═══════ */}
        <div id="s1-what" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What is a Smart Contract?</h2>
            <p className="text-muted-foreground text-sm mt-1">A program that lives on a blockchain — and runs exactly as written, every time.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Left: definition + analogy */}
            <div className="flex flex-col gap-4">
              <div className="p-5 bg-gradient-to-br from-[#6366f1]/15 to-transparent border border-[#6366f1]/40 rounded-xl">
                <div className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest mb-2">Definition</div>
                <p className="text-base text-foreground font-medium leading-relaxed">
                  A <span className="font-black text-[#6366f1]">smart contract</span> is a self-executing program stored on a blockchain whose terms are written directly in code — not in natural language.
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  When predefined conditions are met, the contract executes automatically. No intermediary. No manual trigger. No possibility of censorship or tampering.
                </p>
              </div>

              <div className="p-4 bg-card border border-border rounded-xl">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Traditional contract vs Smart contract</div>
                <div className="space-y-2">
                  {[
                    { trad: 'Written in legal language', smart: 'Written in code (Solidity, Rust…)' },
                    { trad: 'Enforced by courts & lawyers', smart: 'Enforced by the blockchain protocol' },
                    { trad: 'Requires trust between parties', smart: 'Trustless — math enforces terms' },
                    { trad: 'Can be misinterpreted', smart: 'Deterministic — one execution path' },
                    { trad: 'Paper trail, slow disputes', smart: 'On-chain, instant, irreversible' },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2 text-xs">
                      <div className="px-2 py-1.5 rounded bg-[#ED1C24]/10 text-muted-foreground border border-[#ED1C24]/20">❌ {row.trad}</div>
                      <div className="px-2 py-1.5 rounded bg-[#39B54A]/10 text-muted-foreground border border-[#39B54A]/20">✅ {row.smart}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: key properties */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Key properties</div>
              {[
                { color: '#6366f1', emoji: '⚙️', title: 'Autonomous', desc: 'Executes automatically when conditions are satisfied. No human needs to trigger or approve anything after deployment.' },
                { color: '#8b5cf6', emoji: '🔒', title: 'Immutable', desc: 'Once deployed to the blockchain, the code cannot be changed. What you deploy is what runs — forever.' },
                { color: '#39B54A', emoji: '🌐', title: 'Transparent', desc: 'Anyone can read the contract code on-chain. There are no hidden clauses — the logic is fully public and auditable.' },
                { color: '#f59e0b', emoji: '📐', title: 'Deterministic', desc: 'Given the same inputs, a smart contract always produces the same output. Every node on the network agrees on the result.' },
                { color: '#ED1C24', emoji: '🛡️', title: 'Trustless', desc: 'Parties do not need to trust each other — they only need to trust the code. The protocol enforces every term.' },
              ].map(p => (
                <div key={p.title} className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl flex-1" style={{ borderColor: p.color + '30' }}>
                  <div className="text-xl shrink-0">{p.emoji}</div>
                  <div>
                    <div className="font-bold text-sm mb-0.5" style={{ color: p.color }}>{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ═══════ 2. NICK SZABO'S VENDING MACHINE ═══════ */}
        <div id="s1-szabo" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Nick Szabo's Vending Machine</h2>
            <p className="text-muted-foreground text-sm mt-1">The original analogy — and the mind behind the concept, 30 years before DeFi.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-6 content-center">

            {/* Left: Szabo bio + quote */}
            <div className="flex flex-col gap-4">
              <div className="p-5 bg-gradient-to-br from-[#6366f1]/15 to-transparent border border-[#6366f1]/40 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-black shrink-0">NS</div>
                  <div>
                    <div className="font-black text-foreground">Nick Szabo</div>
                    <div className="text-xs text-muted-foreground">Computer Scientist · Legal Scholar · Cryptographer</div>
                  </div>
                </div>
                <blockquote className="border-l-2 border-[#6366f1] pl-4 italic text-sm text-muted-foreground">
                  "A smart contract is a set of promises, specified in digital form, including protocols within which the parties perform on these promises."
                </blockquote>
                <div className="mt-2 text-right text-xs text-muted-foreground">— Nick Szabo, 1994</div>
              </div>

              <div className="p-4 bg-card border border-border rounded-xl flex-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Why it matters</div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Szabo coined "smart contract" in <span className="text-foreground font-semibold">1994</span> — 15 years before Bitcoin</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>He understood that contracts are fundamentally <span className="text-foreground font-semibold">algorithms</span></li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>The missing piece was a <span className="text-foreground font-semibold">trusted execution environment</span> — which blockchain finally provides</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Szabo also created <span className="text-foreground font-semibold">Bit Gold</span> (1998) — a direct precursor to Bitcoin's design</li>
                </ul>
              </div>
            </div>

            {/* Right: Vending machine diagram */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">The vending machine model</div>

              <div className="shrink-0 flex items-center justify-center bg-white rounded-xl border border-border p-3">
                <img src={imgSzaboVending} alt="Smart contract metaphor: a vending machine. Insert conditions → automated result. No middleman." className="max-h-64 w-auto object-contain" />
              </div>

              <div className="shrink-0 flex flex-wrap gap-2">
                {[
                  { label: 'Customer inserts',  detail: 'Coins + selection',                       color: '#6366f1' },
                  { label: 'Contract checks',   detail: 'Enough coins? Item in stock?',           color: '#8b5cf6' },
                  { label: 'Condition met',     detail: 'Dispenses item · returns change',         color: '#39B54A' },
                  { label: 'Condition not met', detail: 'Returns coins · no item',                 color: '#ED1C24' },
                ].map(s => (
                  <div key={s.label} className="flex-1 min-w-[140px] px-2 py-1.5 rounded-lg border text-xs" style={{ borderColor: s.color + '40', backgroundColor: s.color + '0c' }}>
                    <span className="font-bold" style={{ color: s.color }}>{s.label}: </span>
                    <span className="text-muted-foreground">{s.detail}</span>
                  </div>
                ))}
              </div>

              <div className="shrink-0 p-2.5 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-lg text-xs text-muted-foreground text-center">
                <span className="font-semibold text-foreground">Key insight:</span> the machine doesn't care who you are. No trust, no negotiation, no middleman. The code <em>is</em> the contract.
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ 3. HISTORICAL EVOLUTION ═══════ */}
        <div id="s1-history" className="h-full">
          <TimelineSlide
            title="Historical Evolution of Smart Contracts"
            events={[
              {
                year: '1994',
                title: 'Szabo coins "smart contract"',
                description: 'Nick Szabo defines a smart contract as promises enforced by code, using the vending machine analogy. The idea exists 15 years before any chain can run it.',
              },
              {
                year: '2009',
                title: 'Bitcoin — the first on-chain contracts',
                description: 'Bitcoin Script can express conditional spending: multisig, timelocks, HTLCs. Deliberately non-Turing-complete, so contract logic stays narrow and payment-focused.',
              },
              {
                year: '2015',
                title: 'Ethereum + Solidity — general-purpose contracts',
                description: 'The Turing-complete EVM ships. For the first time, developers can deploy arbitrary contract logic to a shared, trustless computer.',
              },
              {
                year: '2016',
                title: 'The DAO — the first contract crisis',
                description: 'A reentrancy bug drains $60M from a single contract. Ethereum hard-forks (ETH / ETC) to recover funds. Smart-contract security becomes a discipline.',
              },
              {
                year: '2017',
                title: 'ERC-20 — token contracts standardised',
                description: 'A shared token interface lets any contract issue fungible tokens that every wallet and exchange understands. The ICO boom follows.',
              },
              {
                year: '2018',
                title: 'ERC-721 — NFT contracts standardised',
                description: 'A standard for unique, owned tokens. Contracts can now represent one-of-a-kind assets and enforce royalties on every transfer.',
              },
              {
                year: '2020',
                title: 'DeFi Summer — composable contracts',
                description: 'Uniswap, Aave and Compound show contracts calling contracts — "money legos." Lending, trading and yield run entirely in code, no intermediary.',
              },
              {
                year: 'Today',
                title: 'Audited, multi-chain, high-stakes',
                description: 'Contracts hold $100B+ across Ethereum, L2s and other chains. Auditing is mandatory practice — $6B+ has been lost to contract exploits since 2016.',
              },
            ]}
          />
        </div>

        {/* ═══════ EXERCISE ═══════ */}
        <div id="s1-exercise" className="h-full">
          <SmartContractSortingExercise />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s1-quiz" className="h-full">
          <QuizSlide
            question="Nick Szabo introduced the concept of smart contracts in 1994. Which real-world object did he use as the foundational analogy to explain how they work?"
            options={[
              { text: 'A notary office — a trusted third party that validates and records agreements between parties.', correct: false },
              { text: 'A vending machine — a mechanism that autonomously enforces the terms of a transaction without a human intermediary.', correct: true },
              { text: 'A court of law — an authority that resolves disputes and enforces contractual obligations after the fact.', correct: false },
              { text: 'A bank vault — a secure system that holds assets until conditions agreed by both parties are met.', correct: false },
            ]}
            explanation="Szabo used the vending machine as his canonical analogy: you insert money, select an item, and the machine automatically verifies the payment and delivers the product — no cashier, no trust, no dispute. The machine's logic is the contract. Szabo's insight was that this same principle — conditional logic enforced by a mechanism rather than a person — could be embedded in digital protocols. This became the intellectual foundation for Ethereum's smart contract model two decades later."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s1-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 01 — Key Takeaways"
            takeaways={[
              'A smart contract is self-executing code on a blockchain — no intermediary can stop or alter it',
              'Nick Szabo described the concept in 1994; Bitcoin (2009) and Ethereum (2015) made it real',
              'Key properties: autonomous, immutable, transparent, deterministic, trustless',
              'The vending machine model: conditions → automatic execution, no human judgment needed',
              'DeFi, NFTs, and DAOs are all smart contracts at different scales',
              '$6B+ lost to exploits — the power of smart contracts comes with serious security responsibility',
            ]}
          />
        </div>

        {/* ═══════ SUMMARY ═══════ */}
        <div id="s1-summary" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Section Summary</h2>
            <p className="text-sm text-muted-foreground mt-1">Everything covered in this section — at a glance</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-start">
            {[
              { icon: '📜', title: 'Nick Szabo (1994)', summary: '"Contractual clauses embedded in hardware and software" — the original idea, 20 years before Ethereum' },
              { icon: '⛓️', title: 'Bitcoin Scripts', summary: 'Limited but valid smart contracts: multi-sig, time locks, HTLCs — intentionally not Turing-complete' },
              { icon: '🌐', title: 'Ethereum (2015)', summary: 'Turing-complete EVM enabled arbitrary smart contracts, opening DeFi, NFTs, and DAOs' },
              { icon: '✅', title: 'Key Properties', summary: 'Immutable, autonomous, transparent, trust-minimized, deterministic — all enforced by the protocol' },
              { icon: '⚠️', title: 'Code is Law Limits', summary: 'Bugs (The DAO: $60M), oracle failure, no legal standing — code is law until it isn\'t' },
              { icon: '🎯', title: 'When to Use', summary: 'Multiple untrusting parties + conditional logic + no trusted intermediary = smart contract territory' },
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
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-border bg-card/50 text-center">
            <span className="text-xs text-muted-foreground">Proceed to Section 2 to explore the Smart Contract ecosystem →</span>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
