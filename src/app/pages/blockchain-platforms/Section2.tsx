import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { ComparisonSlide } from '../../components/templates/ComparisonSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Layers } from 'lucide-react';
import { GasCalculator } from '../../components/ethereum/GasCalculator';
import { Eip1559Demo } from '../../components/ethereum/Eip1559Demo';

const chapters = [
  { kind: 'group' as const, id: 'g-s2-intro',     label: '🚪 Why Ethereum?' },
  { id: 's2-why', label: 'Why Ethereum?' },

  { kind: 'group' as const, id: 'g-s2-accounts',  label: '👤 Accounts' },
  { id: 's2-accounts-visual', label: 'Accounts Visual' },
  { id: 's2-accounts', label: 'Accounts' },

  { kind: 'group' as const, id: 'g-s2-machine',   label: '⚙️ The Machine' },
  { id: 's2-evm', label: 'EVM' },
  { id: 's2-transaction', label: 'Transaction' },
  { id: 's2-gas', label: '🧩 Gas' },
  { id: 's2-eip1559', label: '🧩 EIP-1559' },
  { id: 's2-smartcontracts', label: 'Smart Contracts' },

  { kind: 'group' as const, id: 'g-s2-consensus', label: '🔄 Consensus & Ecosystem' },
  { id: 's2-consensus', label: 'PoW → PoS' },
  { id: 's2-evmecosystem', label: 'EVM Everywhere' },

  { kind: 'group' as const, id: 'g-s2-scaling',   label: '📈 Scaling' },
  { id: 's2-rollups',     label: 'Rollups & L2s' },
  { id: 's2-rollups-anim',label: '🧩 L1 ↔ L2 Flow' },

  { kind: 'group' as const, id: 'g-s2-apps',      label: '💰 DeFi & Apps' },
  { id: 's2-defi',        label: 'DeFi Mechanics' },
  { id: 's2-stablecoins', label: 'Stablecoins' },
  { id: 's2-apps',        label: 'Apps Beyond DeFi (1)' },
  { id: 's2-apps-2',      label: 'Apps Beyond DeFi (2)' },

  { kind: 'group' as const, id: 'g-s2-compare',   label: '🆚 Comparison' },
  { id: 's2-comparison',  label: 'BTC vs ETH' },

  { kind: 'group' as const, id: 'g-s2-fit',       label: '🎯 Fit Analysis' },
  { id: 's2-bestfits',    label: '🎯 Best Fits' },
  { id: 's2-worstfits',   label: '🚫 Worst Fits' },

  { kind: 'group' as const, id: 'g-s2-wrap',      label: '✅ Wrap Up' },
  { id: 's2-quiz', label: 'Quiz' },
  { id: 's2-takeaways', label: 'Takeaways' },
  { id: 's2-summary', label: 'Summary' },
];

/* ──────────────────── Rollups L1 ↔ L2 — animated flow ─────────────────────
   Visualises what happens between Layer 1 and a Layer 2 rollup:
     1. Users send many small txs on L2
     2. The sequencer orders + executes them in a batch
     3. The batch is COMPRESSED into a small blob
     4. The blob is posted to L1 along with the new state root (+ proof)
     5. L1 verifies and finalises — L2 inherits L1 security
   Auto-plays on scroll-in + manual replay.
   ──────────────────────────────────────────────────────────────────────────── */

function RollupsL1L2Animation() {
  const rootRef     = useRef<HTMLDivElement | null>(null);
  const stepRef     = useRef<HTMLDivElement | null>(null);
  const userTxRefs  = useRef<(SVGGElement | null)[]>([]);
  const batchBoxRef = useRef<SVGGElement | null>(null);
  const blobRef     = useRef<SVGGElement | null>(null);
  const l1BlockRef  = useRef<SVGGElement | null>(null);
  const [phase, setPhase] = useState<'idle' | 'playing'>('idle');
  const playedRef   = useRef(false);

  const STEPS = [
    { label: '1. Users send L2 transactions — fast, cheap, confirmed in ~1 s',                  color: '#8b5cf6' },
    { label: '2. The Sequencer orders + executes them in a batch',                              color: '#f59e0b' },
    { label: '3. The batch is COMPRESSED (calldata → blob) ~10–100× smaller',                   color: '#06b6d4' },
    { label: '4. Compressed blob + new state root posted to L1 (EIP-4844 blob lane)',           color: '#3b82f6' },
    { label: '5. L1 verifies the proof and finalises — L2 inherits Ethereum security',          color: '#10b981' },
  ];

  const setStep = (i: number) => {
    if (!stepRef.current) return;
    stepRef.current.textContent = STEPS[i].label;
    stepRef.current.style.color = STEPS[i].color;
    stepRef.current.style.borderColor = STEPS[i].color + 'AA';
    stepRef.current.style.backgroundColor = STEPS[i].color + '14';
  };

  const play = () => {
    if (phase === 'playing') return;
    setPhase('playing');

    userTxRefs.current.forEach(t => {
      if (!t) return;
      t.style.opacity = '0';
      t.style.transform = 'translate(0, 0)';
    });
    if (batchBoxRef.current) batchBoxRef.current.style.opacity = '0';
    if (blobRef.current)     { blobRef.current.style.opacity = '0'; blobRef.current.style.transform = 'translate(0, 0) scale(1)'; }
    if (l1BlockRef.current)  l1BlockRef.current.style.opacity = '0';

    const tl = anime.timeline({ easing: 'easeInOutCubic', complete: () => setPhase('idle') });

    tl.add({
      targets: userTxRefs.current.filter(Boolean),
      opacity: [0, 1],
      translateY: [-12, 0],
      duration: 350,
      delay: anime.stagger(80),
      changeBegin: () => setStep(0),
    })
    .add({
      targets: userTxRefs.current.filter(Boolean),
      translateY: 30,
      scale: 0.85,
      duration: 600,
      delay: anime.stagger(60),
      changeBegin: () => setStep(1),
    })
    .add({
      targets: batchBoxRef.current,
      opacity: [0, 1],
      scale: [0.6, 1],
      duration: 500,
      easing: 'easeOutQuad',
      changeBegin: () => setStep(2),
    })
    .add({
      targets: userTxRefs.current.filter(Boolean),
      opacity: 0,
      duration: 250,
    }, '-=250')
    .add({
      targets: batchBoxRef.current,
      scale: [1, 0.45],
      duration: 600,
      easing: 'easeInQuad',
    })
    .add({
      targets: batchBoxRef.current,
      opacity: 0,
      duration: 200,
    }, '-=100')
    .add({
      targets: blobRef.current,
      opacity: [0, 1],
      scale: [0.4, 1],
      duration: 350,
      easing: 'easeOutQuad',
    }, '-=100')
    .add({
      targets: blobRef.current,
      translateY: 110,
      duration: 900,
      changeBegin: () => setStep(3),
    })
    .add({
      targets: l1BlockRef.current,
      opacity: [0, 1],
      scale: [0.6, 1.15, 1],
      duration: 700,
      easing: 'easeOutQuad',
      changeBegin: () => setStep(4),
    })
    .add({
      targets: blobRef.current,
      opacity: [1, 0],
      duration: 300,
    }, '-=300');
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(es => {
      for (const e of es) {
        if (e.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          setTimeout(play, 350);
          break;
        }
      }
    }, { threshold: 0.35 });
    obs.observe(rootRef.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-3 min-h-0 h-full">
      <div className="shrink-0 flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6]">Live animation</div>
          <div className="text-sm font-bold text-foreground">L2 user txs → Sequencer → Compression → L1 finalisation</div>
        </div>
        <button
          onClick={play}
          disabled={phase === 'playing'}
          className="text-[11px] px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground font-semibold disabled:opacity-50 transition-colors shrink-0"
        >↻ Replay</button>
      </div>

      <div ref={stepRef} className="shrink-0 px-3 py-2 rounded-lg border-2 text-xs font-bold transition-all" style={{ borderColor: STEPS[0].color + 'AA', backgroundColor: STEPS[0].color + '14', color: STEPS[0].color }}>
        {STEPS[0].label}
      </div>

      <div className="flex-1 min-h-[280px] rounded-xl border border-border bg-card/40 p-3">
        <svg viewBox="0 0 520 280" className="w-full h-full" style={{ overflow: 'visible' }}>
          <rect x="20" y="20" width="480" height="80" rx="8" fill="#8b5cf615" stroke="#8b5cf6" strokeWidth="1.2" />
          <text x="40" y="42" fontSize="11" fontWeight="900" fill="#8b5cf6">LAYER 2 — ROLLUP</text>
          <text x="40" y="56" fontSize="9" fill="hsl(var(--muted-foreground))">Where your txs actually run · fast · cheap</text>

          {[0, 1, 2, 3].map(i => (
            <g key={i} ref={el => { userTxRefs.current[i] = el; }} style={{ opacity: 0, transformBox: 'fill-box' as React.CSSProperties['transformBox'], transformOrigin: `${100 + i * 50}px 78px` }}>
              <rect x={85 + i * 50} y="68" width="30" height="22" rx="3" fill="#8b5cf6" stroke="#4c1d95" strokeWidth="0.7" />
              <text x={100 + i * 50} y="83" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">tx{i + 1}</text>
            </g>
          ))}

          <rect x="320" y="60" width="80" height="34" rx="4" fill="#f59e0b22" stroke="#f59e0b" strokeWidth="1.3" />
          <text x="360" y="78" textAnchor="middle" fontSize="9" fontWeight="900" fill="#f59e0b">SEQUENCER</text>
          <text x="360" y="89" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">orders + executes</text>

          <g ref={batchBoxRef} style={{ opacity: 0, transformBox: 'fill-box' as React.CSSProperties['transformBox'], transformOrigin: '420px 78px' }}>
            <rect x="406" y="64" width="58" height="28" rx="3" fill="#06b6d422" stroke="#06b6d4" strokeWidth="1.3" />
            <text x="435" y="82" textAnchor="middle" fontSize="9" fontWeight="900" fill="#06b6d4">BATCH</text>
          </g>

          <g ref={blobRef} style={{ opacity: 0, transformBox: 'fill-box' as React.CSSProperties['transformBox'], transformOrigin: '420px 78px' }}>
            <rect x="408" y="68" width="24" height="20" rx="3" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.2" />
            <text x="420" y="82" textAnchor="middle" fontSize="7" fontWeight="900" fill="#fff">blob</text>
          </g>

          <text x="260" y="135" textAnchor="middle" fontSize="9" fontWeight="700" fill="hsl(var(--muted-foreground))" opacity="0.6">↓ compress + post ↓</text>

          <rect x="20" y="170" width="480" height="80" rx="8" fill="#627EEA15" stroke="#627EEA" strokeWidth="1.2" />
          <text x="40" y="192" fontSize="11" fontWeight="900" fill="#627EEA">LAYER 1 — ETHEREUM</text>
          <text x="40" y="206" fontSize="9" fill="hsl(var(--muted-foreground))">Settlement + data availability · slow · expensive · secure</text>

          {[1, 2, 3, 4].map(i => (
            <g key={i}>
              <rect x={140 + i * 50} y="216" width="34" height="26" rx="2" fill="#627EEA25" stroke="#627EEA" strokeWidth="0.8" />
              <text x={157 + i * 50} y="232" textAnchor="middle" fontSize="7" fontWeight="800" fill="#627EEA">#L1</text>
            </g>
          ))}
          <g ref={l1BlockRef} style={{ opacity: 0, transformBox: 'fill-box' as React.CSSProperties['transformBox'], transformOrigin: '375px 229px' }}>
            <rect x="358" y="216" width="34" height="26" rx="2" fill="#10b98140" stroke="#10b981" strokeWidth="1.4" />
            <text x="375" y="232" textAnchor="middle" fontSize="7" fontWeight="800" fill="#10b981">✓ blob</text>
          </g>
        </svg>
      </div>

      <div className="shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-2 text-[10px]">
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf610' }}>
          <span className="font-black text-[#8b5cf6]">L2 tx</span> <span className="text-muted-foreground">— user op on the rollup</span>
        </div>
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b10' }}>
          <span className="font-black text-[#f59e0b]">Sequencer</span> <span className="text-muted-foreground">— orders + batches</span>
        </div>
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#06b6d455', backgroundColor: '#06b6d410' }}>
          <span className="font-black text-[#06b6d4]">Compress</span> <span className="text-muted-foreground">— blob, ~10-100× smaller</span>
        </div>
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#10b98155', backgroundColor: '#10b98110' }}>
          <span className="font-black text-[#10b981]">L1 finalise</span> <span className="text-muted-foreground">— inherits Ethereum security</span>
        </div>
      </div>
    </div>
  );
}

export function BP_Section2() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 02"
            title="Ethereum: From Money to Programmable Blockchain"
            subtitle="Accounts, EVM, smart contracts, consensus evolution, and the EVM ecosystem"
            icon={<Layers className="size-20 text-[#627EEA]" />}
            gradient="from-[#627EEA] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ S2-WHY ═══════ */}
        <div id="s2-why" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Why Ethereum?</h2>
            <p className="text-muted-foreground text-sm mt-1">Bitcoin's Limits → Vitalik's Insight</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — What Bitcoin couldn't do */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">What Bitcoin couldn't do</h3>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { title: 'No loops in Script', detail: 'Intentional — prevents infinite loops but limits expressiveness' },
                  { title: 'No state beyond UTXO', detail: "Can't store arbitrary data or run stateful applications" },
                  { title: 'No custom logic', detail: 'Every transaction follows the same spend-output model' },
                  { title: 'Every dApp needs its own chain', detail: 'No shared environment — each project must bootstrap security from scratch' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
                    className="flex-1 p-3 rounded-xl border-2 border-red-500/30 bg-red-500/08 flex flex-col justify-center"
                    style={{ backgroundColor: 'rgba(239,68,68,0.07)' }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-black text-sm shrink-0 mt-0.5">✕</span>
                      <div>
                        <div className="font-bold text-sm text-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.detail}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Vitalik's Insight */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">Vitalik's insight <span className="text-muted-foreground font-normal">(2013, age 19)</span></h3>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-xl border-2 p-4"
                style={{ borderColor: '#627EEA60', backgroundColor: '#627EEA12' }}
              >
                <p className="text-sm lg:text-base font-semibold text-foreground italic leading-relaxed">
                  "What if we built a blockchain that could run <span style={{ color: '#627EEA' }}>ANY program</span>?"
                </p>
              </motion.div>

              {/* Key properties */}
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { label: 'Turing-complete scripting language', desc: 'Smart contracts can express any computation' },
                  { label: 'Global shared state (accounts)', desc: 'One universal ledger for all addresses and contracts' },
                  { label: 'Ethereum Virtual Machine (EVM)', desc: 'A sandboxed runtime replicated on every node worldwide' },
                ].map((prop, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: 'easeOut' }}
                    className="flex-1 flex items-center gap-3 p-3 rounded-xl border bg-card"
                    style={{ borderColor: '#627EEA40' }}
                  >
                    <div
                      className="size-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                      style={{ backgroundColor: '#627EEA' }}
                    >{i + 1}</div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{prop.label}</div>
                      <div className="text-xs text-muted-foreground">{prop.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom callout */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="rounded-xl p-3 text-center text-sm font-bold shrink-0"
                style={{ backgroundColor: '#627EEA20', color: '#627EEA', border: '1px solid #627EEA40' }}
              >
                Ethereum = Bitcoin's security model + programmable state machine
              </motion.div>
            </div>

          </div>

          {/* ─── PoW → PoS energy teaser ─── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="shrink-0 mt-4 rounded-xl border border-border bg-card px-4 py-3"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="text-xs font-semibold text-foreground">
                …and in 2022, Ethereum did something Bitcoin can't: <span className="text-[#10b981]">switched off mining entirely.</span>
              </div>
              <span className="text-[10px] text-muted-foreground italic shrink-0">we'll cover The Merge in detail later ↓</span>
            </div>

            {/* Energy bars */}
            <div className="grid grid-cols-[max-content_1fr_max-content] gap-x-3 gap-y-1.5 items-center text-xs">
              {/* PoW row */}
              <span className="font-bold text-[#f59e0b]">⛏️ PoW (pre-2022)</span>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444]"
                />
              </div>
              <span className="font-mono font-bold text-foreground">~73 TWh/yr</span>

              {/* PoS row */}
              <span className="font-bold text-[#10b981]">🌿 PoS (since Sep 2022)</span>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '0.014%' }}
                  transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded-full bg-[#10b981]"
                />
              </div>
              <span className="font-mono font-bold text-foreground">~0.01 TWh/yr <span className="text-[#10b981]">(−99.95%)</span></span>
            </div>
          </motion.div>
        </div>

        {/* ═══════ S2-ACCOUNTS-VISUAL ═══════ */}
        <div id="s2-accounts-visual" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">EOA vs Contract Account</h2>
            <p className="text-sm text-muted-foreground mt-1">The key architectural difference — who initiates, who responds</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* EOA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4 p-6 rounded-2xl border-2"
              style={{ borderColor: '#627EEA60', backgroundColor: '#627EEA08' }}
            >
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-2xl flex items-center justify-center text-4xl" style={{ backgroundColor: '#627EEA18' }}>🔑</div>
                <div>
                  <div className="font-black text-xl text-foreground flex items-baseline gap-2">
                    EOA
                    <span className="text-sm font-bold text-[#627EEA]">= your Wallet 👛</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Externally Owned Account — the MetaMask / hardware wallet you use day-to-day</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { icon: '👤', text: 'Controlled by a private key (a human or software)' },
                  { icon: '🚀', text: 'The ONLY type that can initiate a transaction' },
                  { icon: '💰', text: 'Holds ETH balance — no code, no storage' },
                  { icon: '⛽', text: 'Always pays the gas fee' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: '#627EEA0d' }}
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-3 rounded-xl border border-[#627EEA]/40 text-center">
                <div className="text-xs font-bold text-[#627EEA]">Examples</div>
                <div className="text-xs text-muted-foreground mt-1">MetaMask wallet · Hardware wallet · Exchange hot wallet</div>
              </div>
            </motion.div>

            {/* Contract Account */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-4 p-6 rounded-2xl border-2"
              style={{ borderColor: '#39B54A60', backgroundColor: '#39B54A08' }}
            >
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-2xl flex items-center justify-center text-4xl" style={{ backgroundColor: '#39B54A18' }}>📜</div>
                <div>
                  <div className="font-black text-xl text-foreground">Contract Account</div>
                  <div className="text-sm text-muted-foreground">Smart Contract</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { icon: '⚙️', text: 'Controlled by code — no private key exists' },
                  { icon: '📩', text: 'Can ONLY respond to incoming calls (never initiates)' },
                  { icon: '🗄️', text: 'Has ETH balance + executable code + persistent storage' },
                  { icon: '🔄', text: 'Gas is paid by the EOA that triggered it' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: '#39B54A0d' }}
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-3 rounded-xl border border-[#39B54A]/40 text-center">
                <div className="text-xs font-bold text-[#39B54A]">Examples</div>
                <div className="text-xs text-muted-foreground mt-1">Uniswap pool · USDC token · NFT collection · DAO treasury</div>
              </div>
            </motion.div>
          </div>

          {/* Interaction flow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="shrink-0 mt-4 flex items-center gap-3 p-4 rounded-xl border border-border bg-card"
          >
            <div className="text-sm font-bold text-foreground shrink-0">How they interact:</div>
            <div className="flex items-center gap-2 flex-1 overflow-x-auto">
              {[
                { label: '🔑 EOA', sub: 'signs & sends tx' },
                { label: '→' },
                { label: '📜 Contract', sub: 'executes code' },
                { label: '→' },
                { label: '📜 Contract B', sub: 'calls another contract' },
                { label: '→' },
                { label: '🔑 EOA', sub: 'receives ETH/token' },
              ].map((item, i) =>
                item.label === '→'
                  ? <span key={i} className="text-muted-foreground font-bold shrink-0">→</span>
                  : (
                    <div key={i} className="flex flex-col items-center shrink-0 px-2">
                      <span className="text-sm font-bold text-foreground">{item.label}</span>
                      {item.sub && <span className="text-xs text-muted-foreground">{item.sub}</span>}
                    </div>
                  )
              )}
            </div>
          </motion.div>
        </div>

        {/* ═══════ S2-ACCOUNTS ═══════ */}
        <div id="s2-accounts" className="h-full">
          <ComparisonSlide
            title="Two Types of Accounts"
            featureLabel="Property"
            option1Label="EOA (Externally Owned)"
            option2Label="Contract Account"
            items={[
              { feature: 'Controlled by', option1: 'Private key', option2: 'Code / logic' },
              { feature: 'Has ETH balance', option1: 'Yes', option2: 'Yes' },
              { feature: 'Has code', option1: 'No', option2: 'Yes' },
              { feature: 'Has storage', option1: 'No', option2: 'Yes' },
              { feature: 'Created by', option1: 'Generating a key pair', option2: 'Deploying a transaction' },
              { feature: 'Can initiate tx', option1: 'Yes', option2: 'No — only respond' },
              { feature: 'Gas payer', option1: 'The EOA', option2: 'The calling EOA' },
            ]}
          />
        </div>

        {/* ═══════ S2-EVM ═══════ */}
        <div id="s2-evm" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">The Ethereum Virtual Machine</h2>
            <p className="text-muted-foreground text-sm mt-1">A deterministic, sandboxed runtime replicated on every Ethereum node</p>
          </div>

          {/* JVM analogy banner — anchor the concept in something familiar before EVM-specifics */}
          <div className="shrink-0 mb-4 rounded-xl border-2 p-3" style={{ borderColor: '#627EEAAA', backgroundColor: '#627EEA0d' }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">☕</span>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#627EEA]">Before EVM, there was…</div>
                <div className="text-sm text-foreground leading-snug mt-0.5">
                  Remember the <strong>Java Virtual Machine</strong>? Since the 90s, Java's promise has been <em>write once, run anywhere</em> — you compile your <code className="text-[#627EEA] font-mono">.java</code> file to bytecode, and any device with a JVM runs it identically. Windows, Mac, Linux, ATMs, set-top boxes — same bytecode, same result.
                </div>
                <div className="text-sm text-foreground leading-snug mt-1.5">
                  The <strong className="text-[#627EEA]">EVM is exactly the same idea — but every node in the world is the JVM, and the program is your smart contract.</strong> You compile Solidity to EVM bytecode, the network runs it identically on tens of thousands of machines, and they all agree on the result. JVM solved portability; EVM adds <em>trustless consensus</em> on top.
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — What is the EVM */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">What is the EVM?</h3>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { icon: '🏖️', label: 'Sandboxed', detail: 'Completely isolated from the host machine — no file system, no network access' },
                  { icon: '⚙️', label: 'Deterministic', detail: 'Same input → same output everywhere, on every node, every time' },
                  { icon: '🔄', label: 'Turing-complete', detail: 'Can run any computable program (within gas limits)' },
                  { icon: '📏', label: 'Gas-metered', detail: 'Every opcode has a fixed gas cost — prevents infinite loops and spam' },
                ].map((prop, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
                    className="flex-1 flex items-start gap-3 p-3 rounded-xl border bg-card"
                    style={{ borderColor: '#627EEA30' }}
                  >
                    <span className="text-2xl shrink-0">{prop.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-foreground">{prop.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">{prop.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — EVM Stack + compatibility */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">EVM Stack</h3>

              {/* Stack diagram */}
              <div className="flex flex-col gap-1 flex-1">
                {[
                  { label: 'Solidity Code', sub: '.sol source file', color: '#8b5cf6' },
                  { label: 'Bytecode', sub: 'compiled output', color: '#627EEA' },
                  { label: 'Opcodes', sub: 'PUSH, ADD, SSTORE, CALL…', color: '#3b82f6' },
                  { label: 'EVM Execution', sub: 'stack machine processes opcodes', color: '#06b6d4' },
                  { label: 'State Change', sub: 'account balances + storage updated', color: '#10b981' },
                ].map((layer, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0.7 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.35 }}
                      className="w-full rounded-lg px-4 py-2 text-center border"
                      style={{ borderColor: layer.color + '50', backgroundColor: layer.color + '15' }}
                    >
                      <div className="font-bold text-sm" style={{ color: layer.color }}>{layer.label}</div>
                      <div className="text-xs text-muted-foreground">{layer.sub}</div>
                    </motion.div>
                    {i < 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                        className="text-muted-foreground text-sm leading-none py-0.5"
                      >↓</motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* EVM Compatibility */}
              <div className="shrink-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">EVM-compatible chains</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Polygon', 'BNB Chain', 'Arbitrum', 'Optimism', 'Base', 'zkSync', 'Avalanche C-Chain'].map(chain => (
                    <span
                      key={chain}
                      className="px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{ color: '#627EEA', borderColor: '#627EEA40', backgroundColor: '#627EEA12' }}
                    >{chain}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-TRANSACTION ═══════ */}
        <div id="s2-transaction" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Ethereum Transaction Anatomy</h2>
            <p className="text-muted-foreground text-sm mt-1">Every state change in Ethereum is triggered by a transaction</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — Receipt */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex items-center justify-between shrink-0">
                <h3 className="text-base font-bold text-foreground">Transaction fields</h3>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ backgroundColor: '#627EEA20', color: '#627EEA' }}
                >
                  Type 2 · EIP-1559
                </span>
              </div>
              <div
                className="flex-1 min-h-0 rounded-xl border p-4 font-mono text-[11px] flex flex-col gap-1 overflow-y-auto"
                style={{ backgroundColor: 'var(--card)', borderColor: '#627EEA40' }}
              >
                {[
                  { field: 'type',                 value: '0x02',         comment: '// EIP-1559 (default since London, Aug 2021)' },
                  { field: 'chainId',              value: '1',            comment: '// mainnet · EIP-155 replay protection' },
                  { field: 'nonce',                value: '42',           comment: '// tx count from this address' },
                  { field: 'maxPriorityFeePerGas', value: '1.5 Gwei',     comment: '// tip paid to the validator' },
                  { field: 'maxFeePerGas',         value: '25 Gwei',      comment: '// total cap = base fee + tip cap' },
                  { field: 'gasLimit',             value: '21,000',       comment: '// max gas units to consume' },
                  { field: 'to',                   value: '0xAbC…F1d2',   comment: '// recipient (null = contract deployment)' },
                  { field: 'value',                value: '1.5 ETH',      comment: '// ETH to transfer' },
                  { field: 'data',                 value: '0x',           comment: '// calldata (empty for plain transfer)' },
                  { field: 'accessList',           value: '[]',           comment: '// EIP-2930 storage hint (optional)' },
                  { field: 'yParity, r, s',        value: '…',            comment: '// ECDSA signature' },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05 }}
                    className="flex items-baseline gap-2 py-1 border-b last:border-b-0"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <span className="text-[#627EEA] font-bold w-36 shrink-0 truncate">{row.field}</span>
                    <span className="text-foreground shrink-0">{row.value}</span>
                    <span className="text-muted-foreground ml-auto hidden lg:inline truncate">{row.comment}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Transaction types */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">Transaction types</h3>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  {
                    icon: '💸',
                    label: 'Simple ETH Transfer',
                    detail: 'to = EOA · data empty · 21,000 gas (fixed cost)',
                    color: '#10b981',
                  },
                  {
                    icon: '📜',
                    label: 'Contract Call',
                    detail: 'to = contract address · data = function selector + encoded params',
                    color: '#627EEA',
                  },
                  {
                    icon: '🏗️',
                    label: 'Contract Deployment',
                    detail: 'to = null · data = compiled bytecode · higher gas cost',
                    color: '#8b5cf6',
                  },
                ].map((type, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.12 }}
                    className="flex-1 flex items-start gap-3 p-3 rounded-xl border bg-card"
                    style={{ borderColor: type.color + '40' }}
                  >
                    <span className="text-2xl shrink-0">{type.icon}</span>
                    <div>
                      <div className="font-bold text-sm" style={{ color: type.color }}>{type.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed mt-0.5 font-mono">{type.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Account model note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="shrink-0 rounded-xl p-3 text-xs leading-relaxed"
                style={{ backgroundColor: '#627EEA12', border: '1px solid #627EEA30', color: 'var(--muted-foreground)' }}
              >
                <span className="font-bold" style={{ color: '#627EEA' }}>Account model vs UTXO — </span>
                Ethereum tracks balance directly on each account. No input/output chains — just add/subtract from a global state.
              </motion.div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-GAS ═══════ */}
        <div id="s2-gas" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Gas — Paying for Computation</h2>
            <p className="text-muted-foreground text-sm mt-1">Every operation costs gas. Gas links computation to economics — and stops infinite loops cold.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — explanation */}
            <div className="flex flex-col gap-3 min-h-0">

              {/* What is gas */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#627EEA] mb-1">What is gas?</div>
                <p className="text-sm text-foreground leading-relaxed">
                  A <span className="font-bold">unit of computational work.</span> Every EVM opcode has a fixed gas price: <span className="font-mono">ADD</span> costs 3, <span className="font-mono">SSTORE</span> costs ~20,000. The harder the work, the more gas it burns.
                </p>
              </motion.div>

              {/* Why */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#10b981] mb-1">Why gas exists</div>
                <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                  <li><span className="text-foreground font-semibold">Halts the halting problem:</span> the EVM is Turing-complete — gas guarantees every transaction terminates.</li>
                  <li><span className="text-foreground font-semibold">Anti-spam:</span> a free chain would be flooded instantly.</li>
                  <li><span className="text-foreground font-semibold">Prices scarce block space:</span> only ~30M gas per block.</li>
                </ul>
              </motion.div>

              {/* Formula */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="rounded-xl border-2 border-[#627EEA]/40 bg-[#627EEA]/08 p-4"
                style={{ backgroundColor: '#627EEA10' }}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#627EEA] mb-2">The formula</div>
                <div className="font-mono text-center text-base lg:text-lg font-black text-foreground mb-2 leading-snug">
                  cost = gasUsed × (baseFee + tip)
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
                  <div>
                    <div className="font-bold text-foreground">gasUsed</div>
                    <div className="text-muted-foreground">work done</div>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">baseFee 🔥</div>
                    <div className="text-muted-foreground">set by network, burned</div>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">tip</div>
                    <div className="text-muted-foreground">paid to validator</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="text-[11px] text-muted-foreground italic shrink-0"
              >
                Gas is measured in <span className="font-mono font-bold text-foreground">Gwei</span> (10⁻⁹ ETH). Run out mid-execution and your tx <span className="text-foreground font-semibold">reverts</span> — but you still pay for the gas already burned.
              </motion.div>
            </div>

            {/* Right — interactive calculator */}
            <div className="flex flex-col min-h-0">
              <GasCalculator />
            </div>

          </div>
        </div>

        {/* ═══════ S2-EIP1559 ═══════ */}
        <div id="s2-eip1559" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">EIP-1559 — Making Fees Predictable</h2>
            <p className="text-muted-foreground text-sm mt-1">London hard fork · August 2021 · the upgrade that fixed Ethereum's fee market</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — the problem & the fix */}
            <div className="flex flex-col gap-3 min-h-0">

              {/* The Problem */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border-2 border-[#ef4444]/40 bg-[#ef4444]/05 p-4"
                style={{ backgroundColor: '#ef444410' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⚠️</span>
                  <h3 className="font-black text-sm text-[#ef4444]">Before — First-Price Auction</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                  Users blindly guessed how much to bid. The top fees won block space. Everyone overpaid out of fear of being stuck.
                </p>
                <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                  <div className="rounded-lg bg-card border border-[#ef4444]/30 p-1.5 text-center">
                    <div className="font-bold text-foreground">😰 Overpay</div>
                    <div className="text-muted-foreground">"better safe…"</div>
                  </div>
                  <div className="rounded-lg bg-card border border-[#ef4444]/30 p-1.5 text-center">
                    <div className="font-bold text-foreground">⏳ Stuck</div>
                    <div className="text-muted-foreground">bid too low</div>
                  </div>
                  <div className="rounded-lg bg-card border border-[#ef4444]/30 p-1.5 text-center">
                    <div className="font-bold text-foreground">💸 Miner-only</div>
                    <div className="text-muted-foreground">100% to miner</div>
                  </div>
                </div>
              </motion.div>

              {/* The Fix */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="rounded-xl border-2 border-[#10b981]/40 bg-[#10b981]/05 p-4 flex-1 min-h-0 flex flex-col"
                style={{ backgroundColor: '#10b98110' }}
              >
                <div className="flex items-center gap-2 mb-2 shrink-0">
                  <span className="text-lg">✅</span>
                  <h3 className="font-black text-sm text-[#10b981]">After — Base Fee + Tip</h3>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 shrink-0">
                  <div className="rounded-lg bg-card border-2 border-[#627EEA]/40 p-2.5">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm">🔥</span>
                      <span className="font-black text-xs text-[#627EEA]">Base fee</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Set by the protocol. Auto-adjusts <span className="font-mono font-bold text-foreground">±12.5%</span> per block to hit 50% fullness. <span className="text-foreground font-semibold">Burned</span> — no one collects it.
                    </p>
                  </div>
                  <div className="rounded-lg bg-card border-2 border-[#10b981]/40 p-2.5">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm">💰</span>
                      <span className="font-black text-xs text-[#10b981]">Priority tip</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Optional. Paid by user, kept by the <span className="text-foreground font-semibold">validator</span>. Usually 1–2 Gwei — only spikes for urgent inclusion.
                    </p>
                  </div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col gap-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Why it works</div>
                  <ul className="text-[11px] text-muted-foreground space-y-1 leading-relaxed">
                    <li>✓ <span className="text-foreground font-semibold">Predictable:</span> wallets show base fee in real time — no blind bidding.</li>
                    <li>✓ <span className="text-foreground font-semibold">Deflationary pressure:</span> burned ETH offsets new issuance — sometimes net negative.</li>
                    <li>✓ <span className="text-foreground font-semibold">Validators stay honest:</span> can't pocket base fee, so no incentive to manipulate it.</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right — interactive demo */}
            <div className="flex flex-col min-h-0">
              <Eip1559Demo />
            </div>

          </div>
        </div>

        {/* ═══════ S2-SMARTCONTRACTS ═══════ */}
        <div id="s2-smartcontracts" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Smart Contracts on Ethereum</h2>
            <p className="text-muted-foreground text-sm mt-1">Programs stored on-chain that execute deterministically when triggered</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — Solidity code block */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-foreground shrink-0">Solidity — Simple Escrow</h3>
              <div
                className="flex-1 rounded-xl p-4 font-mono text-xs leading-relaxed overflow-auto"
                style={{ backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }}
              >
                <div><span style={{ color: '#ff7b72' }}>pragma solidity</span> <span style={{ color: '#79c0ff' }}>^0.8.0</span>;</div>
                <div className="mt-2"><span style={{ color: '#ff7b72' }}>contract</span> <span style={{ color: '#ffa657' }}>Escrow</span> {'{'}</div>
                <div className="ml-4 mt-1"><span style={{ color: '#79c0ff' }}>address</span> <span style={{ color: '#ff7b72' }}>public</span> depositor;</div>
                <div className="ml-4"><span style={{ color: '#79c0ff' }}>address</span> <span style={{ color: '#ff7b72' }}>public</span> beneficiary;</div>
                <div className="ml-4"><span style={{ color: '#79c0ff' }}>uint256</span> <span style={{ color: '#ff7b72' }}>public</span> amount;</div>
                <div className="ml-4"><span style={{ color: '#79c0ff' }}>bool</span>    <span style={{ color: '#ff7b72' }}>public</span> released;</div>
                <div className="ml-4 mt-2"><span style={{ color: '#d2a8ff' }}>event</span> <span style={{ color: '#ffa657' }}>Released</span>(<span style={{ color: '#79c0ff' }}>address</span> to, <span style={{ color: '#79c0ff' }}>uint256</span> value);</div>
                <div className="ml-4 mt-2">
                  <span style={{ color: '#ff7b72' }}>constructor</span>(<span style={{ color: '#79c0ff' }}>address</span> _beneficiary) <span style={{ color: '#ff7b72' }}>payable</span> {'{'}
                </div>
                <div className="ml-8">depositor   = <span style={{ color: '#79c0ff' }}>msg</span>.sender;</div>
                <div className="ml-8">beneficiary = _beneficiary;</div>
                <div className="ml-8">amount      = <span style={{ color: '#79c0ff' }}>msg</span>.value;</div>
                <div className="ml-4">{'}'}</div>
                <div className="ml-4 mt-2">
                  <span style={{ color: '#ff7b72' }}>function</span> <span style={{ color: '#d2a8ff' }}>release</span>() <span style={{ color: '#ff7b72' }}>external</span> {'{'}
                </div>
                <div className="ml-8">
                  <span style={{ color: '#ff7b72' }}>require</span>(<span style={{ color: '#79c0ff' }}>msg</span>.sender == depositor, <span style={{ color: '#a5d6ff' }}>"not depositor"</span>);
                </div>
                <div className="ml-8">
                  <span style={{ color: '#ff7b72' }}>require</span>(!released, <span style={{ color: '#a5d6ff' }}>"already released"</span>);
                </div>
                <div className="ml-8">released = <span style={{ color: '#79c0ff' }}>true</span>;</div>
                <div className="ml-8">
                  <span style={{ color: '#ff7b72' }}>payable</span>(beneficiary).<span style={{ color: '#d2a8ff' }}>transfer</span>(amount);
                </div>
                <div className="ml-8">
                  <span style={{ color: '#ff7b72' }}>emit</span> <span style={{ color: '#ffa657' }}>Released</span>(beneficiary, amount);
                </div>
                <div className="ml-4">{'}'}</div>
                <div>{'}'}</div>
              </div>
            </div>

            {/* Right — Lifecycle + properties */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">Contract lifecycle</h3>
              <div className="flex flex-col gap-2">
                {[
                  { step: '1', label: 'Write', detail: 'Author code in Solidity (or Vyper, Huff…)', color: '#8b5cf6' },
                  { step: '2', label: 'Compile', detail: 'solc → ABI (interface description) + bytecode', color: '#627EEA' },
                  { step: '3', label: 'Deploy', detail: 'Send tx to null address with bytecode as data', color: '#3b82f6' },
                  { step: '4', label: 'Interact', detail: 'Anyone calls functions via the ABI', color: '#10b981' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl border bg-card"
                    style={{ borderColor: item.color + '40' }}
                  >
                    <div
                      className="size-8 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                      style={{ backgroundColor: item.color }}
                    >{item.step}</div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Key properties</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    { icon: '🔒', text: 'Immutable after deploy — code cannot be changed once on-chain' },
                    { icon: '⚙️', text: 'Deterministic — same inputs always produce same outputs' },
                    { icon: '🔍', text: 'Transparent — source code verifiable on Etherscan' },
                  ].map((prop, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{prop.icon}</span>
                      <span>{prop.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-CONSENSUS ═══════ */}
        <div id="s2-consensus" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">The Merge: PoW → PoS</h2>
            <p className="text-muted-foreground text-sm mt-1">September 15, 2022 — Ethereum's biggest upgrade</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-4">

            {/* Top — Before / After */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              {[
                {
                  title: 'Before (Proof of Work)',
                  color: '#f59e0b',
                  items: [
                    { icon: '⛏️', label: 'Participants', value: 'Miners' },
                    { icon: '🔢', label: 'Mechanism', value: 'SHA-256 hash race' },
                    { icon: '⚡', label: 'Energy', value: '~73 TWh / year' },
                    { icon: '🖥️', label: 'Requirement', value: 'Anyone with hardware' },
                  ],
                },
                {
                  title: 'After (Proof of Stake)',
                  color: '#10b981',
                  items: [
                    { icon: '🏦', label: 'Participants', value: 'Validators' },
                    { icon: '💎', label: 'Mechanism', value: '32 ETH stake' },
                    { icon: '🌿', label: 'Energy', value: '~0.01 TWh / year (−99.95%)' },
                    { icon: '👤', label: 'Requirement', value: 'Anyone with 32 ETH' },
                  ],
                },
              ].map((col, ci) => (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.15, duration: 0.4 }}
                  className="rounded-xl border-2 p-4"
                  style={{ borderColor: col.color + '50', backgroundColor: col.color + '10' }}
                >
                  <h3 className="font-bold text-sm mb-3" style={{ color: col.color }}>{col.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {col.items.map((item, ii) => (
                      <div key={ii} className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground">{item.icon} {item.label}</span>
                        <span className="text-xs font-bold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom — How PoS works */}
            <div className="flex-1 min-h-0 flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">How Proof of Stake works</h3>
              <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    step: '1', label: 'Deposit', color: '#627EEA',
                    detail: 'Validator locks 32 ETH in the official beacon-chain deposit contract. Each validator runs its own keys and client.',
                    metric: '32 ETH min · withdrawals live since Shapella (Apr 2023)',
                  },
                  {
                    step: '2', label: 'Propose', color: '#8b5cf6',
                    detail: 'Pseudo-randomly selected via RANDAO to build the next block. Slots run on a fixed 12-second clock — 32 slots = 1 epoch.',
                    metric: '1 slot = 12s · 1 epoch ≈ 6.4 min',
                  },
                  {
                    step: '3', label: 'Attest', color: '#3b82f6',
                    detail: 'Committees of ~128 validators sign BLS-aggregated votes on the head of the chain and on the epoch checkpoint.',
                    metric: 'Supermajority ≥ 2/3 required',
                  },
                  {
                    step: '4', label: 'Finalize', color: '#10b981',
                    detail: 'Casper FFG finalises a checkpoint after two consecutive justified epochs. Reverting it would require slashing ≥ 1/3 of all staked ETH.',
                    metric: 'Finality ≈ 12.8 min · economically irreversible',
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex flex-col gap-2 p-3 rounded-xl border bg-card min-h-0"
                    style={{ borderColor: step.color + '40' }}
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <div
                        className="size-8 rounded-full flex items-center justify-center text-white font-black text-sm"
                        style={{ backgroundColor: step.color }}
                      >{step.step}</div>
                      <div className="font-bold text-sm text-foreground">{step.label}</div>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed flex-1">{step.detail}</div>
                    <div className="text-[10px] font-mono px-2 py-1 rounded leading-snug shrink-0" style={{ backgroundColor: step.color + '15', color: step.color }}>
                      {step.metric}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Key numbers strip */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-2 rounded-xl border border-border bg-card px-3 py-2.5"
              >
                {[
                  { value: '~1M+',     label: 'active validators' },
                  { value: '~3–5%',    label: 'staking APR' },
                  { value: '~28% of supply', label: 'ETH staked (~34M ETH)' },
                  { value: '−99.95%',  label: 'energy vs PoW' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5 text-center">
                    <div className="text-base lg:text-lg font-black text-foreground leading-none">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider leading-snug">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Slashing + Liquid Staking */}
              <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                  className="rounded-xl p-3 text-xs leading-relaxed flex items-start gap-2.5"
                  style={{ backgroundColor: '#ef444412', border: '1px solid #ef444440' }}
                >
                  <span className="text-xl shrink-0 leading-none">⚔️</span>
                  <div>
                    <div className="font-bold mb-0.5" style={{ color: '#ef4444' }}>Slashing</div>
                    <div className="text-muted-foreground">Double-signing or surround voting triggers an immediate burn (1 ETH minimum) plus a correlation penalty proportional to other slashings nearby — making coordinated attacks economically catastrophic.</div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                  className="rounded-xl p-3 text-xs leading-relaxed flex items-start gap-2.5"
                  style={{ backgroundColor: '#06b6d412', border: '1px solid #06b6d440' }}
                >
                  <span className="text-xl shrink-0 leading-none">💧</span>
                  <div>
                    <div className="font-bold mb-0.5" style={{ color: '#06b6d4' }}>Liquid Staking</div>
                    <div className="text-muted-foreground">Lido (stETH), Rocket Pool (rETH) and others let users stake any ETH amount via derivative tokens. Lido alone secures ~30% of all staked ETH — boosting access at the cost of validator-set concentration.</div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-EVMECOSYSTEM ═══════ */}
        <div id="s2-evmecosystem" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">EVM Everywhere</h2>
            <p className="text-muted-foreground text-sm mt-1">The EVM has become the de-facto standard virtual machine for blockchains</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — Why EVM won */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">Why EVM won</h3>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  {
                    icon: '🌐',
                    label: 'Network effects',
                    detail: 'Largest developer community in the blockchain space — millions of Solidity developers, the most audited contracts, the richest ecosystem of protocols',
                    color: '#627EEA',
                  },
                  {
                    icon: '🛠️',
                    label: 'Tooling',
                    detail: 'Hardhat, Foundry, Remix, MetaMask, Ethers.js, Viem, OpenZeppelin — a complete, mature developer stack',
                    color: '#8b5cf6',
                  },
                  {
                    icon: '🔗',
                    label: 'Composability',
                    detail: 'All EVM chains share open standards: ERC-20 (tokens), ERC-721 (NFTs), ERC-4626 (vaults) — protocols can interoperate seamlessly',
                    color: '#10b981',
                  },
                ].map((reason, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                    className="flex-1 flex items-start gap-3 p-4 rounded-xl border bg-card"
                    style={{ borderColor: reason.color + '40' }}
                  >
                    <span className="text-2xl shrink-0">{reason.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-foreground">{reason.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">{reason.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Chain map */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-foreground shrink-0">The EVM ecosystem</h3>

              {/* Layer 2 Rollups */}
              <div className="flex-1 rounded-xl border bg-card p-4" style={{ borderColor: '#627EEA40' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#627EEA' }}>Layer 2 Rollups</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Arbitrum', color: '#12AAFF' },
                    { name: 'Optimism', color: '#FF0420' },
                    { name: 'Base', color: '#0052FF' },
                    { name: 'zkSync', color: '#8C8DFC' },
                    { name: 'Starknet', color: '#EC796B' },
                  ].map(chain => (
                    <span
                      key={chain.name}
                      className="px-3 py-1.5 rounded-full text-xs font-bold border"
                      style={{ color: chain.color, borderColor: chain.color + '50', backgroundColor: chain.color + '15' }}
                    >{chain.name}</span>
                  ))}
                </div>
              </div>

              {/* EVM-compatible L1s */}
              <div className="flex-1 rounded-xl border bg-card p-4" style={{ borderColor: '#10b98140' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#10b981' }}>EVM-Compatible L1s</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Polygon', color: '#8247E5' },
                    { name: 'BNB Chain', color: '#F3BA2F' },
                    { name: 'Avalanche C-Chain', color: '#E84142' },
                    { name: 'Fantom', color: '#1969FF' },
                    { name: 'Cronos', color: '#002D74' },
                  ].map(chain => (
                    <span
                      key={chain.name}
                      className="px-3 py-1.5 rounded-full text-xs font-bold border"
                      style={{ color: chain.color, borderColor: chain.color + '50', backgroundColor: chain.color + '15' }}
                    >{chain.name}</span>
                  ))}
                </div>
              </div>

              {/* Bottom callout */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="shrink-0 rounded-xl p-3 text-xs font-medium text-center leading-relaxed"
                style={{ backgroundColor: '#627EEA15', border: '1px solid #627EEA40', color: '#627EEA' }}
              >
                "The EVM is becoming the standard instruction set for blockchains — like x86 for computers"
              </motion.div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-ROLLUPS ═══════ */}
        <div id="s2-rollups" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Rollups — Scaling Without Trusting</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Ethereum's L1 caps at ~15–30 TPS. <span className="text-foreground font-semibold">Rollups</span> batch thousands of transactions off-chain and post a single compressed update to L1 — inheriting its security.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Left — How a rollup works */}
            <div className="flex flex-col gap-3 min-h-0">
              <h3 className="text-base font-bold text-foreground shrink-0">How a rollup works</h3>

              <div className="flex-1 min-h-0 flex flex-col gap-2">
                {[
                  {
                    n: 1, label: 'Users transact on L2',
                    detail: 'You send a transaction to the rollup — same wallet, same UX. Confirmed in ~1–2 seconds. Fees: cents.',
                    color: '#627EEA',
                  },
                  {
                    n: 2, label: 'Sequencer batches them',
                    detail: 'Hundreds-to-thousands of L2 transactions get ordered and executed by the rollup\'s sequencer.',
                    color: '#8b5cf6',
                  },
                  {
                    n: 3, label: 'Compressed data posted to L1',
                    detail: 'Compressed batch + new state root → posted to Ethereum (via blobs since EIP-4844). L1 stores the data so anyone can verify.',
                    color: '#f59e0b',
                  },
                  {
                    n: 4, label: 'L1 verifies and finalises',
                    detail: 'A proof (validity / fraud) tells L1 the batch is correct. Once accepted on L1, the rollup state is as secure as Ethereum itself.',
                    color: '#10b981',
                  },
                ].map((s, i) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className="flex-1 flex items-start gap-3 p-3 rounded-xl border bg-card"
                    style={{ borderColor: s.color + '40' }}
                  >
                    <div
                      className="size-8 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0"
                      style={{ backgroundColor: s.color }}
                    >{s.n}</div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-foreground">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="shrink-0 rounded-xl border border-[#627EEA]/30 px-3 py-2 text-[11px] text-center"
                style={{ backgroundColor: '#627EEA12', color: '#627EEA' }}
              >
                <span className="font-bold">Security inherited from L1</span> · execution moved off-chain · data still on-chain
              </motion.div>
            </div>

            {/* Right — Optimistic vs ZK + Tradeoffs */}
            <div className="flex flex-col gap-3 min-h-0">
              <h3 className="text-base font-bold text-foreground shrink-0">Two flavors: optimistic vs ZK</h3>

              <div className="grid grid-cols-2 gap-3 shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-xl border-2 border-[#FF0420]/40 bg-[#FF0420]/05 p-3"
                  style={{ backgroundColor: '#FF042010' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🤝</span>
                    <div className="font-black text-sm text-[#FF0420]">Optimistic</div>
                  </div>
                  <ul className="text-[11px] text-muted-foreground space-y-1 leading-relaxed">
                    <li><span className="text-foreground font-semibold">Assumes valid</span> by default</li>
                    <li>Challenge window: <span className="font-mono font-bold text-foreground">~7 days</span></li>
                    <li>If fraud: anyone submits a <span className="text-foreground font-semibold">fraud proof</span></li>
                    <li>EVM-equivalent — easy migration</li>
                  </ul>
                  <div className="mt-2 pt-2 border-t border-border text-[10px] text-muted-foreground">
                    <span className="font-bold text-foreground">Live:</span> Arbitrum · Optimism · Base
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-xl border-2 border-[#8C8DFC]/40 bg-[#8C8DFC]/05 p-3"
                  style={{ backgroundColor: '#8C8DFC10' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🔐</span>
                    <div className="font-black text-sm text-[#8C8DFC]">ZK (validity)</div>
                  </div>
                  <ul className="text-[11px] text-muted-foreground space-y-1 leading-relaxed">
                    <li>Each batch carries a <span className="text-foreground font-semibold">zero-knowledge proof</span></li>
                    <li>Withdrawal: <span className="font-mono font-bold text-foreground">~hours</span> (proof-bound)</li>
                    <li>L1 verifies math — no challenge needed</li>
                    <li>Heavier prover · cutting-edge cryptography</li>
                  </ul>
                  <div className="mt-2 pt-2 border-t border-border text-[10px] text-muted-foreground">
                    <span className="font-bold text-foreground">Live:</span> zkSync · Starknet · Linea · Scroll
                  </div>
                </motion.div>
              </div>

              {/* L1 vs L2 metrics */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="rounded-xl border border-border bg-card p-3 flex-1 min-h-0 flex flex-col"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">L1 vs L2 — what changes for users</div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] flex-1">
                  <div className="rounded-lg bg-muted/40 border border-border p-2 flex flex-col justify-center">
                    <div className="text-muted-foreground text-[10px]">Throughput</div>
                    <div className="font-bold text-foreground">~15–30 TPS</div>
                    <div className="text-[#10b981] font-mono">→ thousands</div>
                  </div>
                  <div className="rounded-lg bg-muted/40 border border-border p-2 flex flex-col justify-center">
                    <div className="text-muted-foreground text-[10px]">Tx fee</div>
                    <div className="font-bold text-foreground">~$1–20</div>
                    <div className="text-[#10b981] font-mono">→ ¢</div>
                  </div>
                  <div className="rounded-lg bg-muted/40 border border-border p-2 flex flex-col justify-center">
                    <div className="text-muted-foreground text-[10px]">Finality</div>
                    <div className="font-bold text-foreground">~12 min</div>
                    <div className="text-[#10b981] font-mono">→ ~1–2 s soft</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="shrink-0 rounded-xl border border-[#f59e0b]/30 px-3 py-2 text-[11px] leading-relaxed"
                style={{ backgroundColor: '#f59e0b12', color: 'var(--muted-foreground)' }}
              >
                <span className="font-bold text-[#f59e0b]">EIP-4844 (Dencun, Mar 2024) </span>
                introduced <span className="font-mono text-foreground">blob</span> data — a cheap, ephemeral lane on L1 dedicated to rollups. L2 fees dropped ~10× overnight.
              </motion.div>
            </div>

          </div>
        </div>

        {/* ═══════ S2-ROLLUPS ANIMATION — animated L1 ↔ L2 flow ═══════ */}
        <div id="s2-rollups-anim" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#8b5cf6] text-xs font-bold">🧩 Animated</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">What Actually Happens Between L1 and L2</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              You just read the steps. Now watch them: user tx → sequencer → batch → compressed blob → L1 finalisation.
            </p>
          </div>
          <div className="flex-1 min-h-0">
            <RollupsL1L2Animation />
          </div>
        </div>

        {/* ═══════ DEFI MECHANICS ═══════ */}
        <div id="s2-defi" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#627EEA]">Section 02</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">DeFi — Three Primitives, One Idea</h2>
            <p className="text-sm text-muted-foreground">
              DeFi replaces financial intermediaries with smart contracts. Three primitives explain ~90% of what's out there.{' '}
              <span className="text-[#627EEA] font-semibold">We'll go deeper in Course 03 (Smart Contracts) — this is the lay of the land.</span>
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">

            {/* AMM */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col rounded-xl border-2 border-[#39B54A]/40 bg-card overflow-hidden"
            >
              <div className="h-1.5 bg-[#39B54A] shrink-0" />
              <div className="flex flex-col flex-1 p-4 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <div className="font-black text-base text-[#39B54A]">AMM</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Automated Market Maker</div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/40 border border-border px-2.5 py-1.5 text-[11px]">
                  <span className="text-muted-foreground">Replaces </span>
                  <span className="font-semibold text-foreground">order-book exchanges</span>
                </div>

                <p className="text-sm text-muted-foreground flex-1">
                  Two tokens sit in a pool. A formula sets the price automatically — no buyers and sellers to match.
                </p>

                <div className="p-3 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-xl text-center">
                  <div className="font-mono text-xl font-black text-foreground">x · y = k</div>
                  <div className="text-[10px] text-muted-foreground mt-1">constant-product formula</div>
                </div>

                <div className="text-[11px] text-muted-foreground pt-2 border-t border-border">
                  <span className="font-semibold text-foreground">Live: </span>Uniswap · Curve · Balancer
                </div>
              </div>
            </motion.div>

            {/* Lending */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col rounded-xl border-2 border-[#f97316]/40 bg-card overflow-hidden"
            >
              <div className="h-1.5 bg-[#f97316] shrink-0" />
              <div className="flex flex-col flex-1 p-4 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏦</span>
                  <div>
                    <div className="font-black text-base text-[#f97316]">Lending</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Over-Collateralised Loans</div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/40 border border-border px-2.5 py-1.5 text-[11px]">
                  <span className="text-muted-foreground">Replaces </span>
                  <span className="font-semibold text-foreground">banks (savings + loans)</span>
                </div>

                <p className="text-sm text-muted-foreground flex-1">
                  Supply crypto to earn interest. Borrow against collateral worth more than your loan. No credit score, no KYC. If your collateral falls below threshold, a bot liquidates you.
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-lg bg-[#39B54A]/10 border border-[#39B54A]/30 px-2 py-1.5 text-center">
                    <div className="font-bold text-[#39B54A]">Supply</div>
                    <div className="text-muted-foreground">earn yield</div>
                  </div>
                  <div className="rounded-lg bg-[#f97316]/10 border border-[#f97316]/30 px-2 py-1.5 text-center">
                    <div className="font-bold text-[#f97316]">Borrow</div>
                    <div className="text-muted-foreground">post collateral</div>
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground pt-2 border-t border-border">
                  <span className="font-semibold text-foreground">Live: </span>Aave · Compound · MakerDAO
                </div>
              </div>
            </motion.div>

            {/* Yield / LP */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col rounded-xl border-2 border-[#6366f1]/40 bg-card overflow-hidden"
            >
              <div className="h-1.5 bg-[#6366f1] shrink-0" />
              <div className="flex flex-col flex-1 p-4 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌾</span>
                  <div>
                    <div className="font-black text-base text-[#6366f1]">Yield</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">LP tokens · Staking · Vaults</div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/40 border border-border px-2.5 py-1.5 text-[11px]">
                  <span className="text-muted-foreground">Replaces </span>
                  <span className="font-semibold text-foreground">market-makers + asset managers</span>
                </div>

                <p className="text-sm text-muted-foreground flex-1">
                  Anyone can <span className="font-semibold text-foreground">provide liquidity</span> to an AMM, stake ETH for validator rewards, or deposit into auto-compounding vaults — earning a share of the fees.
                </p>

                <div className="rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 px-2.5 py-1.5 text-[11px] flex items-start gap-2">
                  <span>⚠️</span>
                  <div>
                    <span className="font-bold text-[#ef4444]">Impermanent loss</span>
                    <span className="text-muted-foreground"> · price divergence can leave LPs worse off than just holding.</span>
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground pt-2 border-t border-border">
                  <span className="font-semibold text-foreground">Live: </span>Lido · Yearn · Convex
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom hook */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="shrink-0 mt-4 rounded-xl border border-[#627EEA]/30 bg-[#627EEA]/08 px-4 py-2.5 text-xs text-center text-muted-foreground"
            style={{ backgroundColor: '#627EEA0F' }}
          >
            Almost every DeFi product you'll hear about is a composition of these three. Course 03 covers the contract-level mechanics, attacks, and case studies.
          </motion.div>
        </div>

        {/* ═══════ STABLECOINS ═══════ */}
        <div id="s2-stablecoins" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Stablecoins — the most-used app category</h2>
            <p className="text-sm text-muted-foreground mt-1">Tokens engineered to track a stable reference (almost always 1 USD). Quietly the largest dApp category by volume — and the bridge between traditional finance and crypto.</p>
          </div>

          <div className="shrink-0 mb-4 rounded-xl border p-3" style={{ borderColor: '#10b98155', backgroundColor: '#10b9810d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#10b981' }}>What is a stablecoin?</p>
            <p className="text-sm text-foreground mt-0.5 leading-snug">
              An on-chain token whose value tracks an external reference — almost always the US dollar. The interesting question is <span className="font-semibold">what backs the peg</span>: actual dollars in a bank, on-chain crypto collateral, or pure algorithm. Each model fails differently.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
            {[
              {
                icon: '🏦',
                title: 'Fiat-backed',
                sub: 'Custodial · 1:1 reserve',
                color: '#3b82f6',
                mechanism: 'A regulated issuer holds USD (or short-dated treasuries) 1:1 in a bank account. Users mint tokens by depositing fiat; redeem by burning tokens. Pegged because the issuer guarantees redemption.',
                examples: 'USDT (Tether) · ~$140B — largest, opaque attestations · USDC (Circle) · ~$60B — monthly Big-Four attestations · PYUSD (PayPal) · ~$1B — newer, regulated.',
                logos: [
                  { sym: 'USDT', color: '#26A17B', tag: '~$140B' },
                  { sym: 'USDC', color: '#2775CA', tag: '~$60B'  },
                  { sym: 'RLUSD', color: '#00AAE4', tag: 'Ripple' },
                  { sym: 'PYUSD', color: '#003087', tag: 'PayPal' },
                ],
                risk: 'You\'re trusting the issuer. USDC briefly depegged to $0.87 in March 2023 when Circle had $3.3B locked in collapsed Silicon Valley Bank. Tether has settled multiple lawsuits over reserve disclosures.',
              },
              {
                icon: '⚖️',
                title: 'Crypto-backed',
                sub: 'Decentralised · over-collateralised',
                color: '#8b5cf6',
                mechanism: 'Users lock crypto (ETH, wBTC) into a smart contract at a 150-200% collateral ratio and mint stablecoins. If collateral value drops, the contract auto-liquidates positions. No human issuer.',
                examples: 'DAI (MakerDAO/Sky) · ~$5B — the original, since 2017 · GHO (Aave) · LUSD (Liquity) · crvUSD (Curve) — each with slightly different liquidation mechanics.',
                logos: [
                  { sym: 'DAI',   color: '#F4B731', tag: 'MakerDAO' },
                  { sym: 'GHO',   color: '#B6509E', tag: 'Aave' },
                  { sym: 'LUSD',  color: '#745DDF', tag: 'Liquity' },
                  { sym: 'crvUSD',color: '#40649F', tag: 'Curve' },
                ],
                risk: 'Capital-inefficient (need $150 of crypto to mint $100). Collateral itself is volatile — a fast crash can outrun liquidations (DAI briefly traded over $1 in March 2020). Modern DAI now holds significant USDC reserves, partially re-introducing custodial risk.',
              },
              {
                icon: '⚙️',
                title: 'Algorithmic & hybrid',
                sub: 'No (or partial) collateral',
                color: '#ED1C24',
                mechanism: 'Maintain the peg via supply-mint/burn algorithms or delta-neutral derivatives positions. Pure algorithmic versions have a documented failure mode; hybrids (Frax, Ethena) blend collateral with synthetic strategies.',
                examples: 'TerraUSD (UST) · collapsed May 2022, wiped out ~$60B — death-spiral case study · Frax · ~$650M, partially-collateralised hybrid · Ethena USDe · synthetic delta-neutral, ~$5B+ in 2024.',
                logos: [
                  { sym: 'UST',   color: '#172852', tag: '💀 collapsed' },
                  { sym: 'FRAX',  color: '#000000', tag: 'hybrid' },
                  { sym: 'USDe',  color: '#0E1313', tag: 'Ethena' },
                ],
                risk: 'Pure algorithmic: every prior attempt has failed. Hybrid: Ethena depends on ETH-perp funding rates staying positive — works in bull markets, untested through a sustained bear cycle. Treat with extra caution.',
              },
            ].map(s => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border-2 p-3 flex flex-col gap-2 min-h-0"
                style={{ borderColor: s.color + '50', backgroundColor: s.color + '08' }}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xl shrink-0 leading-none">{s.icon}</span>
                  <div className="min-w-0">
                    <div className="font-black text-sm leading-tight" style={{ color: s.color }}>{s.title}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">{s.sub}</div>
                  </div>
                </div>
                {/* Logo strip — branded badges per token in this category */}
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {s.logos.map(l => (
                    <div
                      key={l.sym}
                      className="flex items-center gap-1.5 rounded-md border bg-card px-1.5 py-1"
                      style={{ borderColor: l.color + '55' }}
                      title={`${l.sym} · ${l.tag}`}
                    >
                      <div
                        className="size-5 rounded-full flex items-center justify-center text-[7px] font-black text-white shrink-0"
                        style={{ background: l.color }}
                      >$</div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-black" style={{ color: l.color }}>{l.sym}</span>
                        <span className="text-[8px] text-muted-foreground">{l.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border bg-card/60 px-2 py-1.5" style={{ borderColor: s.color + '30' }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: s.color }}>How the peg works</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{s.mechanism}</div>
                </div>
                <div className="rounded-lg border bg-card/60 px-2 py-1.5 flex-1 min-h-0" style={{ borderColor: s.color + '30' }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Real examples</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{s.examples}</div>
                </div>
                <div className="rounded-lg p-2 border-l-2" style={{ borderColor: '#ED1C24', backgroundColor: '#ED1C2410' }}>
                  <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#ED1C24' }}>How it can break</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{s.risk}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Market scale + regulation strip */}
          <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="rounded-xl border p-2.5" style={{ borderColor: '#10b98155', backgroundColor: '#10b9810d' }}>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#10b981' }}>Scale</p>
              <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                Total stablecoin supply: <span className="font-semibold text-foreground">~$200B</span> · daily settlement volume rivals Visa · USDT alone settles more on-chain volume than Bitcoin some days. Stablecoins are the most-used dApp by transaction count.
              </p>
            </div>
            <div className="rounded-xl border p-2.5" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b0d' }}>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f59e0b' }}>Regulation tightening</p>
              <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                EU MiCA (live 2024) restricts non-euro algorithmic stablecoins · US frameworks debated in Congress · Hong Kong sandbox active. Issuer transparency, reserve audits, and licensing are the new baseline.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════ APPS — Beyond DeFi (1/2) ═══════ */}
        <div id="s2-apps" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Beyond DeFi — what else runs on Ethereum</h2>
            <p className="text-sm text-muted-foreground mt-1">DeFi is the most-discussed app category — but not the only one. The same EVM hosts ownership, governance, identity, and games at meaningful scale.</p>
          </div>

          <div className="shrink-0 mb-4 rounded-xl border p-3" style={{ borderColor: '#627EEA55', backgroundColor: '#627EEA0d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#627EEA' }}>The token standards under everything</p>
            <p className="text-sm text-foreground mt-0.5 leading-snug">
              Most non-DeFi apps boil down to three token standards: <span className="font-semibold">ERC-20</span> (fungible — coins, shares, governance), <span className="font-semibold">ERC-721</span> (unique — NFTs, identity, deeds), <span className="font-semibold">ERC-1155</span> (mixed — game items). The "app" is really a smart contract that mints, transfers, or queries these tokens.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                icon: '🎨',
                title: 'NFTs & digital ownership',
                sub: 'ERC-721 / ERC-1155',
                color: '#8b5cf6',
                what: 'A unique on-chain token whose tokenURI points to off-chain metadata (image, JSON). The token proves provenance; the bytes typically live on IPFS or a centralised server.',
                examples: 'CryptoPunks (2017) · Bored Ape (2021) · Tickets: Liverpool FC, Coachella · Music: Sound.xyz · Brand IP: Nike RTFKT, Disney pilots.',
                projects: [
                  { sym: '🟧 OpenSea',   tag: 'largest marketplace' },
                  { sym: '🐵 BAYC',       tag: 'PFPs · culture' },
                  { sym: '🟪 Sound.xyz',  tag: 'music NFTs' },
                  { sym: '👟 Nike RTFKT', tag: 'brand-IP' },
                  { sym: '🎟️ POAP',       tag: 'attendance proofs' },
                ],
                limit: 'Most metadata is off-chain — if the URL or IPFS pin disappears, the "NFT" is a broken pointer. The 2021-22 speculation cycle collapsed; survivors pivoted to utility (tickets, rights, identity) rather than JPEG flipping.',
              },
              {
                icon: '🏛️',
                title: 'DAOs & on-chain governance',
                sub: 'ERC-20 voting · contract-controlled treasury',
                color: '#10b981',
                what: 'A Decentralized Autonomous Organization is a smart contract that controls a treasury and executes proposals approved by token-holder votes. The contract — not a CEO — moves the funds.',
                examples: 'MakerDAO (DAI issuance) · Uniswap DAO (controls $7B+ in UNI) · ENS DAO (.eth registry) · Optimism Citizen House · Gitcoin grants.',
                projects: [
                  { sym: '🦄 Uniswap DAO', tag: '$7B treasury' },
                  { sym: '⚖️ MakerDAO',    tag: 'DAI issuance' },
                  { sym: '🌐 ENS DAO',     tag: '.eth registry' },
                  { sym: '🔴 Optimism',    tag: 'Citizen House' },
                  { sym: '💚 Gitcoin',     tag: 'public-goods grants' },
                ],
                limit: 'Voter turnout often 1–5%. Token-weighted votes mean whales decide. Most "DAOs" delegate decisions to small core teams. Legal status of DAOs is unsettled in most jurisdictions.',
              },
            ].map(app => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border-2 p-4 flex flex-col gap-3 min-h-0"
                style={{ borderColor: app.color + '50', backgroundColor: app.color + '08' }}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-2xl shrink-0 leading-none">{app.icon}</span>
                  <div className="min-w-0">
                    <div className="font-black text-base leading-tight" style={{ color: app.color }}>{app.title}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{app.sub}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{app.what}</p>
                {/* Project badges — replace the empty visual area with real names */}
                <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                  {app.projects.map(p => (
                    <div
                      key={p.sym}
                      className="rounded-md border bg-card px-2 py-1 flex flex-col leading-tight"
                      style={{ borderColor: app.color + '55' }}
                    >
                      <span className="text-[11px] font-bold text-foreground">{p.sym}</span>
                      <span className="text-[9px] text-muted-foreground">{p.tag}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border bg-card/60 px-3 py-1.5 text-xs leading-snug" style={{ borderColor: app.color + '40' }}>
                  <span className="font-bold" style={{ color: app.color }}>More examples: </span>
                  <span className="text-muted-foreground">{app.examples}</span>
                </div>
                <div className="rounded-lg border bg-card/60 px-3 py-1.5 text-xs leading-snug" style={{ borderColor: '#ED1C2440' }}>
                  <span className="font-bold" style={{ color: '#ED1C24' }}>Honest limit: </span>
                  <span className="text-muted-foreground">{app.limit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══════ APPS — Beyond DeFi (2/2) ═══════ */}
        <div id="s2-apps-2" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Beyond DeFi — Identity & Gaming</h2>
            <p className="text-sm text-muted-foreground mt-1">Two more verticals where Ethereum's programmability opens possibilities that centralised systems cannot replicate — yet.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                icon: '🆔',
                title: 'Identity & decentralized social',
                sub: 'ENS · SIWE · Lens · Farcaster',
                color: '#f59e0b',
                what: 'Replace email logins with wallet-based identity. ENS gives you a human name (alice.eth) for your address. Sign-In With Ethereum (SIWE) authenticates without passwords. Lens and Farcaster build social graphs on-chain.',
                examples: 'ENS: 3M+ names registered · SIWE: 200+ apps integrated · Farcaster: ~300k DAU (2024) · Worldcoin: 7M+ verified humans · Lens: built around composable feed graphs.',
                projects: [
                  { sym: '🌐 ENS',        tag: '3M+ .eth names' },
                  { sym: '🔑 SIWE',       tag: 'wallet sign-in' },
                  { sym: '🌿 Lens',       tag: 'social graph' },
                  { sym: '🟪 Farcaster',  tag: '~300k DAU' },
                  { sym: '🌍 Worldcoin',  tag: '7M+ verified' },
                ],
                limit: 'Still niche vs Web2 social. Wallet-and-gas onboarding blocks most users. ENS names cost gas to mint. Decentralised social hasn\'t solved spam or moderation as well as centralised platforms — yet.',
              },
              {
                icon: '🎮',
                title: 'On-chain gaming & metaverse',
                sub: 'Most assets now live on L2s',
                color: '#ED1C24',
                what: 'Game assets (skins, characters, items) as tokens players actually own and can trade. Ranges from "off-chain game with NFT cosmetics" to "fully on-chain games" where every game state lives in contracts (Dojo engine).',
                examples: 'Immutable (zkEVM for games) · Ronin (Axie Infinity peaked $3B GMV in 2021) · Decentraland · Realms / Loot Survivor on Starknet · DFK Chain (Avalanche L1).',
                projects: [
                  { sym: '🟦 Immutable',    tag: 'zkEVM for games' },
                  { sym: '🐉 Axie · Ronin', tag: '$3B GMV peak' },
                  { sym: '🏝️ Decentraland', tag: 'metaverse / land' },
                  { sym: '⚔️ Loot Survivor', tag: 'fully on-chain' },
                  { sym: '🌌 The Sandbox',   tag: 'voxel UGC' },
                ],
                limit: 'Most "Web3 games" failed (poor gameplay, predatory tokenomics, Ponzi-shaped incentives). Wallet UX still blocks mainstream gaming. Serious studios increasingly land on "game first, blockchain optional".',
              },
            ].map(app => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border-2 p-4 flex flex-col gap-3 min-h-0"
                style={{ borderColor: app.color + '50', backgroundColor: app.color + '08' }}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-2xl shrink-0 leading-none">{app.icon}</span>
                  <div className="min-w-0">
                    <div className="font-black text-base leading-tight" style={{ color: app.color }}>{app.title}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{app.sub}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{app.what}</p>
                <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                  {app.projects.map(p => (
                    <div
                      key={p.sym}
                      className="rounded-md border bg-card px-2 py-1 flex flex-col leading-tight"
                      style={{ borderColor: app.color + '55' }}
                    >
                      <span className="text-[11px] font-bold text-foreground">{p.sym}</span>
                      <span className="text-[9px] text-muted-foreground">{p.tag}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border bg-card/60 px-3 py-1.5 text-xs leading-snug" style={{ borderColor: app.color + '40' }}>
                  <span className="font-bold" style={{ color: app.color }}>More examples: </span>
                  <span className="text-muted-foreground">{app.examples}</span>
                </div>
                <div className="rounded-lg border bg-card/60 px-3 py-1.5 text-xs leading-snug" style={{ borderColor: '#ED1C2440' }}>
                  <span className="font-bold" style={{ color: '#ED1C24' }}>Honest limit: </span>
                  <span className="text-muted-foreground">{app.limit}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-4 rounded-xl border p-3" style={{ borderColor: '#627EEA55', backgroundColor: '#627EEA0d' }}>
            <p className="text-sm text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#627EEA' }}>The URI gotcha — </span>
              ERC-721 NFTs typically store only a URL pointing to off-chain metadata. The token on-chain proves you own a pointer; the actual image/asset lives on IPFS, Arweave, or — too often — a single web server. If the host disappears, your NFT renders blank. Always check where the metadata is pinned before buying.
            </p>
          </div>
        </div>

        {/* ═══════ S2-COMPARISON ═══════ */}
        <div id="s2-comparison" className="h-full">
          <ComparisonSlide
            title="Bitcoin vs Ethereum"
            featureLabel="Property"
            option1Label="Bitcoin ₿"
            option2Label="Ethereum Ξ"
            items={[
              { feature: 'Created', option1: '2009', option2: '2015' },
              { feature: 'Creator', option1: 'Satoshi Nakamoto', option2: 'Vitalik Buterin' },
              { feature: 'Purpose', option1: 'Digital gold / store of value', option2: 'Programmable blockchain / world computer' },
              { feature: 'Supply', option1: '21M cap', option2: 'No hard cap, ~120M circulating' },
              { feature: 'Consensus', option1: 'Proof of Work', option2: 'Proof of Stake since 2022' },
              { feature: 'Smart contracts', option1: 'Limited Script', option2: 'Full Turing-complete EVM' },
              { feature: 'Block time', option1: '~10 min', option2: '~12 seconds' },
              { feature: 'TPS', option1: '7', option2: '~15 L1 + thousands on L2' },
              { feature: 'Token', option1: 'BTC', option2: 'ETH' },
              { feature: 'Main L2', option1: 'Lightning Network', option2: 'Arbitrum / Optimism / Base' },
            ]}
          />
        </div>

        {/* ═══════ BEST FITS — WHERE ETHEREUM WINS ═══════ */}
        <div id="s2-bestfits" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#627EEA]/15 border border-[#627EEA]/40 text-[#627EEA] text-xs font-bold">🎯 Best Fits</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Where Ethereum Wins — The Use Cases It Actually Owns</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              Ethereum's design choices (Turing-complete EVM, account model, deep liquidity, ERC standards, the L2 stack) make it the default for anything that needs <strong className="text-foreground">programmable state + composability + an open developer ecosystem</strong>.
            </p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {[
              { emoji: '💰', name: 'DeFi & on-chain finance',          why: 'Composable money legos — Uniswap, Aave, Compound interoperate by default. ~$50B TVL across L1 + L2.', example: 'Uniswap (DEX), Aave (lending), MakerDAO (DAI), Lido (staking), Curve (stable swaps).' },
              { emoji: '🖼️', name: 'NFTs & creator economy',           why: 'ERC-721 / ERC-1155 are the de-facto standards. Royalty enforcement + provable provenance built in.', example: 'OpenSea, Blur, Sotheby\'s on-chain auctions · ENS domains · POAPs · proof-of-attendance.' },
              { emoji: '🏛️', name: 'DAOs & on-chain governance',       why: 'Token-weighted voting, programmable treasuries, transparent proposals — battle-tested governance kits.', example: 'Uniswap DAO ($6B treasury), MakerDAO, Arbitrum DAO, Optimism, Gitcoin grants.' },
              { emoji: '🪙', name: 'Stablecoins & tokenised RWAs',    why: 'Deepest liquidity for USD-backed tokens; RWA issuance via institutional rails (BlackRock BUIDL, Franklin Templeton).', example: 'USDC, USDT, DAI, RLUSD, PYUSD on Ethereum · BlackRock BUIDL ($2B+ AUM) · Ondo Finance.' },
            ].map(uc => (
              <div key={uc.name} className="rounded-xl border-2 p-3 flex flex-col gap-2" style={{ borderColor: '#627EEA55', backgroundColor: '#627EEA08' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl shrink-0">{uc.emoji}</span>
                  <div className="font-black text-foreground text-base leading-tight">{uc.name}</div>
                </div>
                <div className="text-xs text-muted-foreground leading-snug">
                  <span className="font-bold text-[#627EEA] uppercase tracking-widest text-[9px] mr-1">Why</span>
                  {uc.why}
                </div>
                <div className="mt-auto text-[11px] text-foreground bg-card border border-border rounded-md px-2 py-1.5 leading-snug">
                  <span className="font-bold text-[#627EEA] uppercase tracking-widest text-[9px] mr-1">In the wild</span>
                  {uc.example}
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-3 p-2.5 bg-[#ef4444]/08 border border-[#ef4444]/30 rounded-lg text-[11px] text-muted-foreground">
            <strong className="text-[#ef4444]">Not a fit for:</strong> pure store-of-value at Bitcoin-level neutrality (use BTC), high-throughput retail payments without L2 (gas spikes), private enterprise consortia where data must stay off public view (use Fabric), use cases that don't need programmability or composability — extra cost for no benefit.
          </div>
        </div>

        {/* ═══════ WORST FITS — WHERE ETHEREUM IS WRONG ═══════ */}
        <div id="s2-worstfits" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ef4444]/15 border border-[#ef4444]/40 text-[#ef4444] text-xs font-bold">🚫 Worst Fits</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Where Ethereum is the <em>Wrong</em> Tool</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              Ethereum is the default for anything programmable — but defaults aren't free. There are jobs where its open programmability is the problem, not the solution.
            </p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {[
              { emoji: '₿', name: 'Pure store of value / digital gold', why: 'ETH has no hard cap, monetary policy changes (Merge, EIP-1559), and a much smaller "sound money" credibility budget vs Bitcoin.', alt: 'Use Bitcoin for neutral, scarce, time-tested SoV.' },
              { emoji: '🏢', name: 'Private B2B consortia, regulated data', why: 'Mainnet Ethereum is fully public — bad for KYC data, supplier contracts, healthcare records. Privacy layers (Aztec) help but add complexity and trust assumptions.', alt: 'Use Hyperledger Fabric · Quorum · R3 Corda for permissioned channels.' },
              { emoji: '🚀', name: 'Consumer-grade payments on L1', why: 'L1 finalises in ~12 min and fees spike on demand. Even with L2s, withdrawal latency and bridge UX still bite for retail.',     alt: 'Use Bitcoin Lightning · Solana · XRPL · Stellar for sub-second payment UX.' },
              { emoji: '🎮', name: 'Latency-critical games / real-time apps', why: '~12-second blocks on L1, ~1-2 s on most rollups — still too slow for tick-based gaming or live trading. Order-book matching at gas cost is brutal.',                                alt: 'Use Solana · Sui · Aptos · purpose-built order-book chains (dYdX v4) for latency-bound apps.' },
            ].map(uc => (
              <div key={uc.name} className="rounded-xl border-2 p-3 flex flex-col gap-2" style={{ borderColor: '#ef444455', backgroundColor: '#ef444408' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl shrink-0">{uc.emoji}</span>
                  <div className="font-black text-foreground text-base leading-tight">{uc.name}</div>
                </div>
                <div className="text-xs text-muted-foreground leading-snug">
                  <span className="font-bold text-[#ef4444] uppercase tracking-widest text-[9px] mr-1">Why not</span>
                  {uc.why}
                </div>
                <div className="mt-auto text-[11px] text-foreground bg-card border border-border rounded-md px-2 py-1.5 leading-snug">
                  <span className="font-bold text-[#10b981] uppercase tracking-widest text-[9px] mr-1">Use instead</span>
                  {uc.alt}
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-3 p-2.5 bg-[#10b981]/08 border border-[#10b981]/30 rounded-lg text-[11px] text-muted-foreground">
            <strong className="text-[#10b981]">Right tool, right job:</strong> Ethereum is unmatched for composable on-chain finance, NFTs, DAOs, identity, and stablecoin issuance. For anything else, ask whether you really need a public global VM — sometimes you don't.
          </div>
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s2-quiz" className="h-full">
          <QuizSlide
            question="What is the fundamental difference between an Externally Owned Account (EOA) and a Contract Account on Ethereum?"
            options={[
              { text: 'EOAs can store ETH; Contract Accounts can only store code and cannot hold a balance.', correct: false },
              { text: 'Contract Accounts can initiate transactions independently; EOAs can only respond when called by a contract.', correct: false },
              { text: 'EOAs are controlled by a private key and can initiate transactions; Contract Accounts are controlled by code and only execute when triggered by an EOA or another contract.', correct: true },
              { text: 'EOAs exist only on Ethereum mainnet; Contract Accounts work across all EVM-compatible chains automatically.', correct: false },
            ]}
            explanation="This is the foundational distinction of Ethereum's account model. An EOA is what a human controls — it has a private key, can initiate transactions, and pays gas. A Contract Account has no private key — it is pure code deployed at a deterministic address, and it only runs when another account sends it a transaction. This means a Contract Account cannot spontaneously act on a schedule — it needs an EOA (or a keeper bot using an EOA) to trigger it. Every transaction on Ethereum ultimately originates from an EOA."
          />
        </div>

        {/* ═══════ QUIZ 2 — EIP-1559 fee mechanics ═══════ */}
        <div id="s2-quiz-2" className="h-full">
          <QuizSlide
            question="An EIP-1559 transaction sets maxFeePerGas = 30 Gwei and maxPriorityFeePerGas = 2 Gwei. The current base fee is 25 Gwei. What does the sender actually pay per gas, and where does each part go?"
            options={[
              { text: '30 Gwei per gas, all of which is paid to the validator who includes the transaction.', correct: false },
              { text: '25 Gwei base fee (burned, removed from supply) + 2 Gwei tip (paid to the validator) = 27 Gwei per gas. The remaining 3 Gwei of headroom in maxFeePerGas is refunded to the sender.', correct: true },
              { text: '25 Gwei base fee paid to the validator + 2 Gwei priority fee burned. Total 27 Gwei per gas.', correct: false },
              { text: '30 Gwei (max fee) + 2 Gwei (priority fee) = 32 Gwei per gas, paid entirely to the validator.', correct: false },
            ]}
            explanation="EIP-1559 split the gas price into two components. The protocol-determined base fee is BURNED (permanently destroyed — this is what makes ETH deflationary when activity is high). The priority fee is the tip the user offers the validator. Effective price per gas is min(maxFeePerGas, baseFee + maxPriorityFeePerGas) — here min(30, 25 + 2) = 27 Gwei. Any unused headroom is refunded. So the sender pays 27 Gwei × gasUsed: 25 burned, 2 to the validator. maxFeePerGas is a cap, not a target."
          />
        </div>

        {/* ═══════ QUIZ 3 — Contract deployment address ═══════ */}
        <div id="s2-quiz-3" className="h-full">
          <QuizSlide
            question="Bob deploys a smart contract by sending a transaction with to = null and the compiled bytecode in the data field. How is the new contract's address determined?"
            options={[
              { text: 'Bob picks any unused 20-byte address and includes it in the transaction\'s value field.', correct: false },
              { text: 'The Ethereum protocol generates a random 20-byte address at deployment time, so the address is unpredictable until the transaction is mined.', correct: false },
              { text: 'For a regular CREATE deployment, the address is derived deterministically from keccak256(senderAddress, senderNonce) — Bob can compute the future contract address before sending the transaction.', correct: true },
              { text: 'The address equals keccak256(bytecode), so two deployments of identical contracts always share the same address.', correct: false },
            ]}
            explanation="CREATE derives the contract address from rlp(senderAddress, senderNonce), then takes the last 20 bytes of its keccak256 hash. This means anyone can predict the future contract address before deployment — useful for state channels and counterfactual instantiation. CREATE2 (introduced in Constantinople) uses keccak256(0xff, deployer, salt, keccak256(initCode)) so the address depends on a salt and the init code, decoupling it from nonce — enabling address pre-commitment regardless of deployment order. Identical bytecode does NOT share an address with CREATE; CREATE2 distinguishes by salt."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s2-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 02 — Key Takeaways"
            takeaways={[
              'Ethereum extends Bitcoin by adding a Turing-complete virtual machine — the EVM',
              'Two account types: Externally Owned Accounts (EOAs) and Contract Accounts',
              'Smart contracts are programs stored on-chain that execute deterministically when triggered',
              'The Merge (2022) replaced Proof of Work with Proof of Stake — cutting energy use by 99.95%',
              'The EVM has become an industry standard — Polygon, Arbitrum, Base, Optimism, and more are EVM-compatible',
              'Bitcoin is digital money; Ethereum is a programmable settlement layer',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
