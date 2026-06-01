import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { motion } from 'motion/react';
import { ConceptSlide } from '../../components/templates/ConceptSlide';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Network } from 'lucide-react';

const chapters = [
  { kind: 'group' as const, id: 'g-s4-problem',  label: '🌉 The Problem' },
  { id: 's4-interop',         label: 'Interoperability' },
  { id: 's4-interop-compare', label: 'Approaches Compared' },

  { kind: 'group' as const, id: 'g-s4-l0',       label: '🏛️ Layer 0' },
  { id: 's4-layer0',          label: '🧩 Layer 0: Concept' },
  { id: 's4-layer0-2',        label: 'Layer 0: Platforms' },

  { kind: 'group' as const, id: 'g-s4-bridges',  label: '🔥 Bridge Security' },
  { id: 's4-bridges',         label: 'Bridge Security' },

  { kind: 'group' as const, id: 'g-s4-cosmos',   label: '⚛ Cosmos' },
  { id: 's4-cosmos',          label: 'Cosmos' },
  { id: 's4-cosmos-eco',      label: 'Cosmos Apps' },

  { kind: 'group' as const, id: 'g-s4-xrp',      label: '✕ XRP Ledger' },
  { id: 's4-xrp',             label: 'XRP Ledger' },
  { id: 's4-xrp-anim',        label: '🧩 XRPL ↔ Axelar' },
  { id: 's4-xrp-eco',         label: 'XRP Apps' },

  { kind: 'group' as const, id: 'g-s4-wrap',     label: '✅ Wrap Up' },
  { id: 's4-quiz',            label: 'Quiz' },
  { id: 's4-takeaways',       label: 'Takeaways' },
];

/* ──────────────────────── Animated Layer 0 stack ─────────────────────────
   Shows a tx packet rising from L2 → L1, crossing through the L0 hub, and
   landing on a DIFFERENT L1 (which can then hand it down to its own L2).
   Driven by anime.js timelines. Auto-plays on scroll-in + manual replay.
   ───────────────────────────────────────────────────────────────────────── */

function Layer0AnimatedStack() {
  const rootRef     = useRef<HTMLDivElement | null>(null);
  const packetRef   = useRef<SVGGElement | null>(null);
  const stepRef     = useRef<HTMLDivElement | null>(null);
  const pathRef     = useRef<SVGPathElement | null>(null);
  const [phase, setPhase] = useState<'idle' | 'playing'>('idle');
  const playedRef   = useRef(false);

  const STEPS = [
    { label: '1. L2 rollup posts a batch back to L1 (settlement)',                color: '#8b5cf6' },
    { label: '2. L1 sends a cross-chain message through the Layer 0 hub',          color: '#6366f1' },
    { label: '3. Layer 0 relays it to a different L1 (XCM / Warp / IBC)',          color: '#22d3ee' },
    { label: '4. Destination L1 delivers it down to its own L2',                   color: '#10b981' },
  ];

  function setStep(i: number) {
    if (!stepRef.current) return;
    stepRef.current.textContent = STEPS[i].label;
    stepRef.current.style.color = STEPS[i].color;
    stepRef.current.style.borderColor = STEPS[i].color + 'AA';
    stepRef.current.style.backgroundColor = STEPS[i].color + '14';
  }

  const play = () => {
    if (phase === 'playing') return;
    setPhase('playing');

    // Reset
    if (packetRef.current) {
      packetRef.current.style.opacity = '0';
      packetRef.current.style.transform = 'translate(0px, 0px)';
    }
    setStep(0);

    // Waypoints in SVG coords (viewBox 0 0 480 280):
    //   L2A (left bottom) → L1A (left mid) → L0 hub (centre top) → L1B (right mid) → L2B (right bottom)
    const W = [
      { x: 80,  y: 230 }, // L2 A
      { x: 80,  y: 145 }, // L1 A
      { x: 240, y: 50  }, // L0 hub
      { x: 400, y: 145 }, // L1 B
      { x: 400, y: 230 }, // L2 B
    ];

    const tl = anime.timeline({
      easing: 'easeInOutCubic',
      complete: () => setPhase('idle'),
    });

    tl.add({
      targets: packetRef.current,
      opacity: [0, 1],
      translateX: [W[0].x - W[0].x, 0],
      translateY: [W[0].y - W[0].y + 12, 0],
      duration: 300,
      easing: 'easeOutQuad',
    })
    // Step 1: L2 A → L1 A (up)
    .add({
      targets: packetRef.current,
      translateY: W[1].y - W[0].y,
      duration: 850,
      changeBegin: () => setStep(0),
    })
    // Step 2: L1 A → L0 hub (up + right curve)
    .add({
      targets: packetRef.current,
      translateX: W[2].x - W[0].x,
      translateY: W[2].y - W[0].y,
      duration: 1000,
      changeBegin: () => setStep(1),
    })
    // Step 3: L0 → L1 B (down + right)
    .add({
      targets: packetRef.current,
      translateX: W[3].x - W[0].x,
      translateY: W[3].y - W[0].y,
      duration: 1000,
      changeBegin: () => setStep(2),
    })
    // Step 4: L1 B → L2 B (down)
    .add({
      targets: packetRef.current,
      translateY: W[4].y - W[0].y,
      duration: 700,
      changeBegin: () => setStep(3),
    })
    // Settle pulse
    .add({
      targets: packetRef.current,
      scale: [1, 1.4, 1],
      duration: 500,
      easing: 'easeOutQuad',
    });

    // Animate the trail path drawing
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = String(len);
      pathRef.current.style.strokeDashoffset = String(len);
      anime({
        targets: pathRef.current,
        strokeDashoffset: [len, 0],
        duration: 3500,
        easing: 'easeInOutCubic',
      });
    }
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
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
      {/* Header + replay */}
      <div className="flex items-start justify-between gap-2 shrink-0">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-[#22d3ee]">Live animation</div>
          <div className="text-sm font-bold text-foreground">A tx travelling L2 → L1 → L0 → L1 → L2</div>
        </div>
        <button
          onClick={play}
          disabled={phase === 'playing'}
          className="text-[11px] px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground font-semibold disabled:opacity-50 transition-colors shrink-0"
        >↻ Replay</button>
      </div>

      {/* Step caption */}
      <div
        ref={stepRef}
        className="shrink-0 px-3 py-2 rounded-lg border-2 text-xs font-bold transition-all"
        style={{ borderColor: STEPS[0].color + 'AA', backgroundColor: STEPS[0].color + '14', color: STEPS[0].color }}
      >
        {STEPS[0].label}
      </div>

      {/* SVG stage */}
      <div className="flex-1 min-h-[260px] rounded-xl border border-border bg-card/40 p-3">
        <svg viewBox="0 0 480 280" className="w-full h-full" style={{ overflow: 'visible' }}>
          {/* L0 hub band */}
          <rect x="120" y="30" width="240" height="40" rx="6" fill="#22d3ee15" stroke="#22d3ee" strokeWidth="1.2" />
          <text x="240" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#22d3ee">LAYER 0 — Shared Hub</text>
          <text x="240" y="62" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Polkadot Relay · Avalanche P-Chain · Babylon</text>

          {/* L1 left */}
          <rect x="30" y="110" width="100" height="50" rx="5" fill="#6366f115" stroke="#6366f1" strokeWidth="1.2" />
          <text x="80" y="130" textAnchor="middle" fontSize="11" fontWeight="800" fill="#6366f1">L1 · App A</text>
          <text x="80" y="146" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">e.g. DeFi parachain</text>

          {/* L1 right */}
          <rect x="350" y="110" width="100" height="50" rx="5" fill="#6366f115" stroke="#6366f1" strokeWidth="1.2" />
          <text x="400" y="130" textAnchor="middle" fontSize="11" fontWeight="800" fill="#6366f1">L1 · App B</text>
          <text x="400" y="146" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">e.g. Game parachain</text>

          {/* L2 left */}
          <rect x="30" y="200" width="100" height="50" rx="5" fill="#8b5cf615" stroke="#8b5cf6" strokeWidth="1.2" />
          <text x="80" y="220" textAnchor="middle" fontSize="11" fontWeight="800" fill="#8b5cf6">L2 · Rollup A</text>
          <text x="80" y="236" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">user starts here →</text>

          {/* L2 right */}
          <rect x="350" y="200" width="100" height="50" rx="5" fill="#10b98115" stroke="#10b981" strokeWidth="1.2" />
          <text x="400" y="220" textAnchor="middle" fontSize="11" fontWeight="800" fill="#10b981">L2 · Rollup B</text>
          <text x="400" y="236" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">→ delivered here</text>

          {/* Static link cues (lines) */}
          <line x1="80" y1="200" x2="80" y2="160" stroke="#8b5cf680" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="80" y1="110" x2="160" y2="70"  stroke="#6366f180" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="320" y1="70" x2="400" y2="110" stroke="#6366f180" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="400" y1="160" x2="400" y2="200" stroke="#10b98180" strokeWidth="1" strokeDasharray="3 3" />

          {/* Animated trail (drawn as packet travels) */}
          <path
            ref={pathRef}
            d="M 80 230 L 80 145 Q 80 100 240 50 Q 400 100 400 145 L 400 230"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeOpacity="0.85"
          />

          {/* The tx packet (animated by anime.js) */}
          <g ref={packetRef} style={{ opacity: 0, transformBox: 'fill-box' as React.CSSProperties['transformBox'], transformOrigin: '80px 230px' }}>
            <circle cx="80" cy="230" r="9" fill="#facc15" stroke="#a16207" strokeWidth="1.4" />
            <text x="80" y="234" textAnchor="middle" fontSize="9" fontWeight="900" fill="#7c2d12">tx</text>
          </g>
        </svg>
      </div>

      {/* Mini-legend */}
      <div className="shrink-0 grid grid-cols-3 gap-2 text-[10px]">
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee10' }}>
          <span className="font-black text-[#22d3ee]">L0</span> <span className="text-muted-foreground">— shared validators, message bus</span>
        </div>
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#6366f155', backgroundColor: '#6366f110' }}>
          <span className="font-black text-[#6366f1]">L1</span> <span className="text-muted-foreground">— app chain plugged into L0</span>
        </div>
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf610' }}>
          <span className="font-black text-[#8b5cf6]">L2</span> <span className="text-muted-foreground">— rollup on a specific L1</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Animated XRPL ↔ Axelar interop ─────────────────────
   Shows a GMP (General Message Passing) call leaving XRPL, hitting the
   Axelar validator network, and landing on an EVM chain. Auto-plays.
   ───────────────────────────────────────────────────────────────────────── */

function XrplAxelarFlow() {
  const rootRef    = useRef<HTMLDivElement | null>(null);
  const packetRef  = useRef<SVGGElement | null>(null);
  const stepRef    = useRef<HTMLDivElement | null>(null);
  const validatorRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [phase, setPhase] = useState<'idle' | 'playing'>('idle');
  const playedRef  = useRef(false);

  const STEPS = [
    { label: '1. User triggers a cross-chain call from XRPL (e.g. send RLUSD to Ethereum)', color: '#06b6d4' },
    { label: '2. Axelar gateway picks up the message; validators vote on the payload',     color: '#f59e0b' },
    { label: '3. ≥ 2/3 of Axelar validators sign — the message is admitted on the hub',    color: '#10b981' },
    { label: '4. Axelar relayer delivers to the destination chain; recipient receives it', color: '#6366f1' },
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
    setStep(0);

    // Reset
    if (packetRef.current) {
      packetRef.current.style.opacity = '0';
      packetRef.current.style.transform = 'translate(0, 0)';
    }
    validatorRefs.current.forEach(c => {
      if (c) { c.setAttribute('fill', '#f59e0b22'); c.setAttribute('stroke', '#f59e0b'); }
    });

    // Waypoints (viewBox 0 0 520 240): XRPL → Axelar hub centre → EVM chain
    const W = [
      { x: 75,  y: 130 },  // XRPL
      { x: 260, y: 130 },  // Axelar hub
      { x: 445, y: 130 },  // EVM chain
    ];

    const tl = anime.timeline({ easing: 'easeInOutCubic', complete: () => setPhase('idle') });

    tl.add({
      targets: packetRef.current,
      opacity: [0, 1],
      duration: 250,
      easing: 'easeOutQuad',
    })
    .add({
      targets: packetRef.current,
      translateX: W[1].x - W[0].x,
      duration: 1100,
      changeBegin: () => setStep(0),
    })
    // Validators flash one by one (consensus)
    .add({
      targets: { i: 0 },
      i: 4,
      duration: 1200,
      easing: 'linear',
      changeBegin: () => setStep(1),
      update: (a) => {
        const n = Math.floor((a.animations[0].currentValue as unknown) as number);
        for (let k = 0; k <= n && k < validatorRefs.current.length; k++) {
          const c = validatorRefs.current[k];
          if (c) {
            c.setAttribute('fill', '#10b98140');
            c.setAttribute('stroke', '#10b981');
          }
        }
      },
    })
    .add({
      targets: packetRef.current,
      scale: [1, 1.4, 1],
      duration: 400,
      easing: 'easeOutQuad',
      changeBegin: () => setStep(2),
    })
    .add({
      targets: packetRef.current,
      translateX: W[2].x - W[0].x,
      duration: 1100,
      changeBegin: () => setStep(3),
    })
    .add({
      targets: packetRef.current,
      scale: [1, 1.4, 1],
      duration: 400,
      easing: 'easeOutQuad',
    });
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
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
      {/* Header + replay */}
      <div className="flex items-start justify-between gap-2 shrink-0">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-[#06b6d4]">Live animation</div>
          <div className="text-sm font-bold text-foreground">XRPL → Axelar → another blockchain</div>
        </div>
        <button
          onClick={play}
          disabled={phase === 'playing'}
          className="text-[11px] px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground font-semibold disabled:opacity-50 transition-colors shrink-0"
        >↻ Replay</button>
      </div>

      {/* Step caption */}
      <div
        ref={stepRef}
        className="shrink-0 px-3 py-2 rounded-lg border-2 text-xs font-bold transition-all"
        style={{ borderColor: STEPS[0].color + 'AA', backgroundColor: STEPS[0].color + '14', color: STEPS[0].color }}
      >
        {STEPS[0].label}
      </div>

      {/* SVG stage */}
      <div className="flex-1 min-h-[200px] rounded-xl border border-border bg-card/40 p-3">
        <svg viewBox="0 0 520 240" className="w-full h-full" style={{ overflow: 'visible' }}>
          {/* XRPL node */}
          <rect x="15" y="80" width="120" height="100" rx="8" fill="#06b6d418" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="75" y="105" textAnchor="middle" fontSize="11" fontWeight="900" fill="#06b6d4">XRP LEDGER</text>
          <text x="75" y="123" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Source chain</text>
          <text x="75" y="148" textAnchor="middle" fontSize="9" fontWeight="700" fill="hsl(var(--foreground))">send RLUSD</text>
          <text x="75" y="164" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">to 0x… on Ethereum</text>

          {/* Axelar hub (centre) */}
          <rect x="200" y="55" width="120" height="150" rx="8" fill="#f59e0b14" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="260" y="78" textAnchor="middle" fontSize="11" fontWeight="900" fill="#f59e0b">AXELAR NETWORK</text>
          <text x="260" y="92" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">PoS hub · GMP gateway</text>

          {/* Validator ring inside the Axelar box */}
          {[
            { x: 230, y: 130 },
            { x: 260, y: 115 },
            { x: 290, y: 130 },
            { x: 275, y: 165 },
            { x: 245, y: 165 },
          ].map((v, i) => (
            <g key={i}>
              <circle
                ref={el => { validatorRefs.current[i] = el; }}
                cx={v.x} cy={v.y} r={9}
                fill="#f59e0b22" stroke="#f59e0b" strokeWidth={1.2}
              />
              <text x={v.x} y={v.y + 3} textAnchor="middle" fontSize={7} fontWeight="800" fill="hsl(var(--foreground))">v{i+1}</text>
            </g>
          ))}
          <text x="260" y="195" textAnchor="middle" fontSize="8" fontWeight="700" fill="hsl(var(--muted-foreground))">≥ 2/3 sign</text>

          {/* EVM chain */}
          <rect x="385" y="80" width="120" height="100" rx="8" fill="#6366f118" stroke="#6366f1" strokeWidth="1.5" />
          <text x="445" y="105" textAnchor="middle" fontSize="11" fontWeight="900" fill="#6366f1">ETHEREUM</text>
          <text x="445" y="123" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Destination chain</text>
          <text x="445" y="148" textAnchor="middle" fontSize="9" fontWeight="700" fill="hsl(var(--foreground))">RLUSD received</text>
          <text x="445" y="164" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">+ message delivered</text>

          {/* Static channel cues */}
          <line x1="135" y1="130" x2="200" y2="130" stroke="#06b6d460" strokeWidth="1.4" strokeDasharray="4 3" />
          <line x1="320" y1="130" x2="385" y2="130" stroke="#6366f160" strokeWidth="1.4" strokeDasharray="4 3" />

          {/* Animated packet */}
          <g ref={packetRef} style={{ opacity: 0, transformBox: 'fill-box' as React.CSSProperties['transformBox'], transformOrigin: '75px 130px' }}>
            <rect x="60" y="118" width="30" height="22" rx="3" fill="#facc15" stroke="#a16207" strokeWidth="1.3" />
            <text x="75" y="133" textAnchor="middle" fontSize="9" fontWeight="900" fill="#7c2d12">GMP</text>
          </g>
        </svg>
      </div>

      {/* Mini-legend */}
      <div className="shrink-0 grid grid-cols-3 gap-2 text-[10px]">
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#06b6d455', backgroundColor: '#06b6d410' }}>
          <span className="font-black text-[#06b6d4]">XRPL</span> <span className="text-muted-foreground">— source: payment-optimised L1</span>
        </div>
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b10' }}>
          <span className="font-black text-[#f59e0b]">Axelar</span> <span className="text-muted-foreground">— PoS hub network + GMP</span>
        </div>
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#6366f155', backgroundColor: '#6366f110' }}>
          <span className="font-black text-[#6366f1]">EVM</span> <span className="text-muted-foreground">— destination: any chain Axelar covers</span>
        </div>
      </div>
    </div>
  );
}

export function BP_Section4() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
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

        {/* ═══════ S4-LAYER0 (1/2) — Animated Concept ═══════ */}
        <div id="s4-layer0" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#22d3ee]/15 border border-[#22d3ee]/40 text-[#22d3ee] text-xs font-bold">🧩 Animated</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Layer 0 — The Substrate Beneath the L1s</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              An L0 leases <strong className="text-foreground">validators, security, and a messaging fabric</strong> to many L1s at once — and the cross-chain call you saw in <em>Approaches Compared</em> is a native protocol operation, not a bridge contract.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
            {/* Left: animated stack */}
            <Layer0AnimatedStack />

            {/* Right: what L0 provides */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="rounded-xl border p-3" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee0d' }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#22d3ee' }}>In one line</p>
                <p className="text-sm text-foreground mt-1 leading-snug">
                  Internet backbone analogy: many ISPs (L1s) plug into shared cables (L0) instead of each laying their own.
                </p>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">What Layer 0 provides</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  { icon: '🔐', title: 'Shared security',           desc: 'A pooled validator set secures every L1 connected to it. New chains inherit security on day 1.' },
                  { icon: '📨', title: 'Native cross-chain messaging', desc: 'L0 defines the message format and trust model (XCM, Warp) — no third-party bridge needed.' },
                  { icon: '⚙️', title: 'Shared infrastructure',      desc: 'Block production, finality, governance and upgrades live at L0. L1s focus on application logic.' },
                ].map(c => (
                  <div key={c.title} className="rounded-lg border border-[#22d3ee]/30 bg-card p-2.5 flex items-start gap-2.5 min-h-0">
                    <span className="text-lg shrink-0 leading-none mt-0.5">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground">{c.title}</p>
                      <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ S4-LAYER0 (2/2) — Platforms & Trade-off vs Cosmos ═══════ */}
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
                  { emoji: '🔴', name: 'Polkadot',  token: 'DOT',  consensus: 'BABE + GRANDPA',   color: '#e6007a', tagline: 'Relay Chain + Parachains · XCM native messaging · Coretime model (2024)' },
                  { emoji: '🔺', name: 'Avalanche', token: 'AVAX', consensus: 'Snowman (sub-1s)', color: '#e84142', tagline: 'Primary Network (X/P/C-Chain) + sovereign Avalanche L1s · Warp messaging' },
                  { emoji: '₿',  name: 'Babylon',   token: 'BABY', consensus: 'BTC-staked PoS',   color: '#f59e0b', tagline: 'Uses Bitcoin staking to provide shared security to any PoS chain — no new token needed' },
                ].map(p => (
                  <div key={p.name} className="rounded-xl p-4 min-h-0 flex flex-col gap-2 border" style={{ borderColor: p.color + '55', backgroundColor: p.color + '08' }}>
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
              <div className="rounded-xl border p-6" style={{ borderColor: '#6366f155', backgroundColor: '#6366f10d' }}>
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
            {/* Two-pill emphasis: cross-chain + app-specific */}
            <div className="mt-2 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee0d' }}>
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#22d3ee' }}>Network-shape</span>
                <span className="text-xs text-foreground"><strong>Cross-chain by design</strong> — IBC is the native protocol, not a bridge bolted on top</span>
              </div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border" style={{ borderColor: '#6366f155', backgroundColor: '#6366f10d' }}>
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: '#6366f1' }}>Chain-shape</span>
                <span className="text-xs text-foreground"><strong>App-specific L1s</strong> — every zone is a purpose-built chain (DEX, perps, GPU compute…)</span>
              </div>
            </div>
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

        {/* (Layer 0 slides moved to after Approaches Compared — see s4-layer0 and s4-layer0-2 above) */}

        {/* ═══════ S4-XRP — XRP Ledger (redone) ═══════ */}
        <div id="s4-xrp" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#06b6d4]/15 border border-[#06b6d4]/40 text-[#06b6d4] text-xs font-bold">🧩 Partner platform</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold">Animated</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">XRP Ledger — A Low-Level Payments Rail with Cross-Chain Reach</h2>
            <p className="text-sm text-muted-foreground max-w-4xl">
              Live since 2012 — one of the longest-running blockchains. Its design is deliberately <strong className="text-foreground">low-level and purpose-built</strong>: DEX, payments, FX, and token issuance are <em>native protocol operations</em>, not smart contracts. That's the trade — faster, cheaper, more predictable; not as freely programmable as the EVM.
            </p>
          </div>

          {/* Three premise pillars */}
          <div className="shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-2.5 mb-3">
            <div className="rounded-xl border-2 p-3" style={{ borderColor: '#06b6d4AA', backgroundColor: '#06b6d40d' }}>
              <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#06b6d4' }}>Pillar 1 — Native ops</div>
              <div className="text-sm font-bold text-foreground mt-0.5">DEX & payments are first-class</div>
              <div className="text-[11px] text-muted-foreground leading-snug mt-1">
                Order-book DEX has been in the protocol since 2012 (no smart contract). AMM (XLS-30) joined natively in 2024. Path payments auto-route across multi-asset hops. <strong className="text-foreground">Optimised, but the rule-set is fixed.</strong>
              </div>
            </div>
            <div className="rounded-xl border-2 p-3" style={{ borderColor: '#f59e0bAA', backgroundColor: '#f59e0b0d' }}>
              <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f59e0b' }}>Pillar 2 — Half-public</div>
              <div className="text-sm font-bold text-foreground mt-0.5">UNL — operators pick their validators</div>
              <div className="text-[11px] text-muted-foreground leading-snug mt-1">
                Anyone can read the chain, but each node maintains a <strong className="text-foreground">Unique Node List</strong> of validators it trusts. Federated Byzantine Agreement, ≥ 80% UNL agree per round. <strong className="text-foreground">Permissionless to use, federated to validate.</strong>
              </div>
            </div>
            <div className="rounded-xl border-2 p-3" style={{ borderColor: '#10b981AA', backgroundColor: '#10b9810d' }}>
              <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#10b981' }}>Pillar 3 — Cross-chain</div>
              <div className="text-sm font-bold text-foreground mt-0.5">XRPL ↔ Axelar ↔ any chain</div>
              <div className="text-[11px] text-muted-foreground leading-snug mt-1">
                Axelar GMP gives XRPL apps a single API to reach 50+ chains (EVM, Cosmos, Sui, Stellar) — payment + message in one call. <strong className="text-foreground">No bespoke bridge contract per pair.</strong>
              </div>
            </div>
          </div>

          {/* Main row: design properties (no animation here — moved to next slide) */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Why-the-low-level-design-pays-off panel, expanded across full width */}
            <div className="flex flex-col gap-2 min-h-0 overflow-y-auto">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">Why the low-level design pays off</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[
                  { emoji: '⚡', title: '~1,500 TPS · ~3-5 s finality', desc: 'Deterministic consensus rounds. No fee market spikes; XRP burn (~$0.0002 / tx) makes spam economically unviable.' },
                  { emoji: '🔗', title: 'Trust Lines / IOUs',           desc: 'Issued tokens (RLUSD, stablecoins, RWA) live as balances on a Trust Line — a permission the holder grants the issuer. Different mental model from ERC-20.' },
                  { emoji: '🪝', title: 'Hooks — light WASM contracts', desc: 'Account-level hooks fire before / after transactions. Gas-metered, intentionally limited surface — predictable fees over Turing-complete freedom.' },
                  { emoji: '🔷', title: 'EVM sidechain (2025)',          desc: 'A separate EVM-compatible chain bridged to XRPL so Solidity dApps can settle to XRPL and use XRP for gas. Widens the dev surface without changing the base L1.' },
                ].map(card => (
                  <div key={card.title} className="flex gap-2.5 p-2.5 bg-card rounded-lg border border-[#06b6d4]/25 min-h-0">
                    <span className="text-base shrink-0 leading-none mt-0.5">{card.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground leading-tight">{card.title}</p>
                      <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer — partnership + honest context */}
          <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="p-2.5 bg-[#06b6d4]/08 rounded-lg border border-[#06b6d4]/40">
              <p className="text-[11px] font-bold text-[#06b6d4] mb-1 flex items-center gap-1.5">
                <span>🤝</span> Where XRPL actually shines (partner footprint)
              </p>
              <p className="text-[11px] text-muted-foreground leading-snug">
                Cross-border payments, FX corridors, RWA tokenisation. <span className="text-foreground font-medium">RippleNet ODL</span> uses XRP as a bridge currency; <span className="text-foreground font-medium">RLUSD</span> (NYDFS-regulated, live Dec 2024) settles on XRPL and Ethereum. Central-bank pilots (Bhutan, Palau, Colombia) run on XRPL tech.
              </p>
            </div>
            <div className="p-2.5 bg-[#f59e0b]/08 rounded-lg border border-[#f59e0b]/40">
              <p className="text-[11px] font-bold text-[#f59e0b] mb-1 flex items-center gap-1.5">
                <span>⚖️</span> Honest context — what you give up
              </p>
              <p className="text-[11px] text-muted-foreground leading-snug">
                Smaller smart-contract surface than EVM. UNL is federated — anyone can run a node but the default validator set ships with the software. The bet is <strong className="text-foreground">payments + RWA + cross-chain settlement</strong>, not general-purpose dApps.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════ XRPL ↔ AXELAR — dedicated animation slide ═══════ */}
        <div id="s4-xrp-anim" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold">🧩 Animated</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">XRPL ↔ Axelar — One API to Reach Every Chain</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              You just saw what XRPL is good at (payments, native DEX, RWA). Here's how it talks to the rest of the multi-chain world — without writing a bespoke bridge contract per pair.
            </p>
          </div>
          <div className="flex-1 min-h-0">
            <XrplAxelarFlow />
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
              'XRP Ledger is payments-optimised with a native DEX, Trust Lines, and federated sidechain support',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
