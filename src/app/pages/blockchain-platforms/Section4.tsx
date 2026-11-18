import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import anime from 'animejs';
import { motion, useReducedMotion } from 'motion/react';
import { ConceptSlide } from '../../components/templates/ConceptSlide';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { RecapHandoff } from '../../components/shared/RecapHandoff';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { Network, ShieldCheck } from 'lucide-react';

// Language-neutral shape — IDs + kind only. Labels resolved via t() at render time.
const chapterShape = [
  { kind: 'group' as const, id: 'g-s4-problem' },
  { id: 's4-closed' },
  { id: 's4-interop' },
  { id: 's4-usecases' },

  { kind: 'group' as const, id: 'g-s4-ways' },
  { id: 's4-ways' },
  { id: 's4-chooser' },

  { kind: 'group' as const, id: 'g-s4-bridges' },
  { id: 's4-bridges' },
  { id: 's4-wrapped' },
  { id: 's4-bridge-risk' },
  { id: 's4-bridge-hacks' },

  { kind: 'group' as const, id: 'g-s4-l0' },
  { id: 's4-layer0' },
  { id: 's4-layer0-2' },

  { kind: 'group' as const, id: 'g-s4-cosmos' },
  { id: 's4-cosmos' },

  { kind: 'group' as const, id: 'g-s4-xrp' },
  { id: 's4-xrp' },
  { id: 's4-xrp-how' },

  { kind: 'group' as const, id: 'g-s4-layers' },
  { id: 's4-layers' },

  { kind: 'group' as const, id: 'g-s4-wrap' },
  { id: 's4-quiz' },
  { id: 's4-takeaways' },
] as const;

/* ──────────────────────── Animated Layer 0 stack ─────────────────────────
   Shows a tx packet rising from L2 → L1, crossing through the L0 hub, and
   landing on a DIFFERENT L1 (which can then hand it down to its own L2).
   Driven by anime.js timelines. Auto-plays on scroll-in + manual replay.
   ───────────────────────────────────────────────────────────────────────── */

function Layer0AnimatedStack() {
  const { t } = useTranslation('blockchain-platforms/section-4');
  const rootRef     = useRef<HTMLDivElement | null>(null);
  const packetRef   = useRef<SVGGElement | null>(null);
  const stepRef     = useRef<HTMLDivElement | null>(null);
  const pathRef     = useRef<SVGPathElement | null>(null);
  const [phase, setPhase] = useState<'idle' | 'playing'>('idle');
  const playedRef   = useRef(false);

  const STEP_COLORS = ['#8b5cf6', '#6366f1', '#22d3ee', '#10b981'];
  const stepLabels = t('layer0Anim.steps', { returnObjects: true }) as string[];
  const STEPS = STEP_COLORS.map((color, i) => ({ label: stepLabels[i], color }));

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
          <div className="text-sm font-bold text-foreground">{t('layer0Anim.headline')}</div>
        </div>
        <button
          onClick={play}
          disabled={phase === 'playing'}
          className="text-[11px] px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground font-semibold disabled:opacity-50 transition-colors shrink-0"
        >{t('layer0Anim.replay')}</button>
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
          <text x="240" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#22d3ee">{t('layer0Anim.svg.l0Title')}</text>
          <text x="240" y="62" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">{t('layer0Anim.svg.l0Sub')}</text>

          {/* L1 left */}
          <rect x="30" y="110" width="100" height="50" rx="5" fill="#6366f115" stroke="#6366f1" strokeWidth="1.2" />
          <text x="80" y="130" textAnchor="middle" fontSize="11" fontWeight="800" fill="#6366f1">{t('layer0Anim.svg.l1aTitle')}</text>
          <text x="80" y="146" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">{t('layer0Anim.svg.l1aSub')}</text>

          {/* L1 right */}
          <rect x="350" y="110" width="100" height="50" rx="5" fill="#6366f115" stroke="#6366f1" strokeWidth="1.2" />
          <text x="400" y="130" textAnchor="middle" fontSize="11" fontWeight="800" fill="#6366f1">{t('layer0Anim.svg.l1bTitle')}</text>
          <text x="400" y="146" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">{t('layer0Anim.svg.l1bSub')}</text>

          {/* L2 left */}
          <rect x="30" y="200" width="100" height="50" rx="5" fill="#8b5cf615" stroke="#8b5cf6" strokeWidth="1.2" />
          <text x="80" y="220" textAnchor="middle" fontSize="11" fontWeight="800" fill="#8b5cf6">{t('layer0Anim.svg.l2aTitle')}</text>
          <text x="80" y="236" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">{t('layer0Anim.svg.l2aSub')}</text>

          {/* L2 right */}
          <rect x="350" y="200" width="100" height="50" rx="5" fill="#10b98115" stroke="#10b981" strokeWidth="1.2" />
          <text x="400" y="220" textAnchor="middle" fontSize="11" fontWeight="800" fill="#10b981">{t('layer0Anim.svg.l2bTitle')}</text>
          <text x="400" y="236" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)">{t('layer0Anim.svg.l2bSub')}</text>

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
          <span className="font-black text-[#22d3ee]">L0</span> <span className="text-muted-foreground">{t('layer0Anim.legend.l0')}</span>
        </div>
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#6366f155', backgroundColor: '#6366f110' }}>
          <span className="font-black text-[#6366f1]">L1</span> <span className="text-muted-foreground">{t('layer0Anim.legend.l1')}</span>
        </div>
        <div className="rounded-md p-1.5 border" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf610' }}>
          <span className="font-black text-[#8b5cf6]">L2</span> <span className="text-muted-foreground">{t('layer0Anim.legend.l2')}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────── "How should these two chains talk?" — tiny chooser ─────────────
   Pick a scenario, pick a route (bridge / IBC / Layer 0), get fit + main risk. */
type RouteId = 'bridge' | 'ibc' | 'l0';
type Verdict = 'best' | 'ok' | 'poor';
const CHOOSER_ROUTES: { id: RouteId; color: string; emoji: string }[] = [
  { id: 'bridge', color: '#f59e0b', emoji: '🌉' },
  { id: 'ibc',    color: '#22d3ee', emoji: '🔁' },
  { id: 'l0',     color: '#6366f1', emoji: '🏛️' },
];
const CHOOSER_VERDICT: Record<Verdict, { color: string; emoji: string }> = {
  best: { color: '#39B54A', emoji: '✅' },
  ok:   { color: '#f59e0b', emoji: '🟡' },
  poor: { color: '#ef4444', emoji: '❌' },
};

function InteropChooser() {
  const { t } = useTranslation('blockchain-platforms/section-4');
  const [scenario, setScenario] = useState(0);
  const [route, setRoute] = useState<RouteId | null>(null);
  const scenarios = t('chooser.scenarios', { returnObjects: true }) as { title: string; desc: string }[];
  const options = t('chooser.options', { returnObjects: true }) as Record<RouteId, { label: string; sub: string }>;
  const fb = route ? (t(`chooser.feedback.s${scenario}.${route}`, { returnObjects: true }) as { verdict: Verdict; text: string; risk: string }) : null;
  const v = fb ? CHOOSER_VERDICT[fb.verdict] : null;

  return (
    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* 1 — scenario */}
      <div className="flex flex-col gap-2 min-h-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground shrink-0">{t('chooser.scenarioLabel')}</p>
        {scenarios.map((sc, i) => {
          const active = scenario === i;
          return (
            <button
              key={sc.title}
              onClick={() => { setScenario(i); setRoute(null); }}
              className={`text-left rounded-xl border-2 p-3 transition-all hover:-translate-y-0.5 flex-1 min-h-0 ${active ? 'shadow-md' : ''}`}
              style={{ borderColor: active ? '#22d3ee' : '#22d3ee40', backgroundColor: active ? '#22d3ee12' : 'hsl(var(--card))' }}
            >
              <p className="text-sm font-bold text-foreground leading-tight">{sc.title}</p>
              <p className="text-xs text-muted-foreground leading-snug mt-1">{sc.desc}</p>
            </button>
          );
        })}
      </div>

      {/* 2 — route */}
      <div className="flex flex-col gap-2 min-h-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground shrink-0">{t('chooser.optionLabel')}</p>
        {CHOOSER_ROUTES.map((r) => {
          const active = route === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setRoute(r.id)}
              className={`text-left rounded-xl border-2 p-3 transition-all hover:-translate-y-0.5 flex-1 min-h-0 flex items-center gap-3 ${active ? 'shadow-md' : ''}`}
              style={{ borderColor: active ? r.color : r.color + '55', backgroundColor: active ? r.color + '14' : 'hsl(var(--card))' }}
            >
              <span className="text-2xl leading-none">{r.emoji}</span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight" style={{ color: r.color }}>{options[r.id].label}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{options[r.id].sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3 — feedback */}
      <div className="flex flex-col gap-2 min-h-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground shrink-0">{t('chooser.feedbackLabel')}</p>
        <div className="flex-1 min-h-0 rounded-xl border-2 p-4 flex flex-col gap-3 transition-colors" style={{ borderColor: (v?.color ?? '#6b7280') + '66', backgroundColor: (v?.color ?? '#6b7280') + '0a' }}>
          {!fb || !v ? (
            <p className="text-sm text-muted-foreground italic">{t('chooser.idle')}</p>
          ) : (
            <motion.div key={`${scenario}-${route}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 min-h-0">
              <div className="inline-flex items-center gap-2 self-start rounded-lg border-2 px-3 py-1.5 text-sm font-black" style={{ borderColor: v.color, backgroundColor: v.color + '14', color: v.color }}>
                <span>{v.emoji}</span>{t(`chooser.verdicts.${fb.verdict}`)}
              </div>
              <p className="text-sm text-foreground leading-snug">{fb.text}</p>
              <div className="rounded-lg border p-2.5 mt-auto" style={{ borderColor: '#ef444450', backgroundColor: '#ef44440a' }}>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#ef4444]">⚠️ {t('chooser.riskLabel')}</p>
                <p className="text-xs text-foreground leading-snug mt-0.5">{fb.risk}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Shared SVG bits ─────────────
   Theme tokens are plain colours (not HSL triplets), so SVG paints use var(--token). */
const INK = 'var(--foreground)';
const MUTED = 'var(--muted-foreground)';

function StepDot({ x, y, n, color }: { x: number; y: number; n: number; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill={color} />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff">{n}</text>
    </g>
  );
}

/** Row of small "validator" dots centred on cx. */
function ValidatorDots({ cx, y, n, color, r = 4, gap = 13 }: { cx: number; y: number; n: number; color: string; r?: number; gap?: number }) {
  const x0 = cx - ((n - 1) * gap) / 2;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x0 + i * gap} cy={y} r={r} fill={color + '55'} stroke={color} strokeWidth="1" />
      ))}
    </g>
  );
}

/* "Three ways to connect" overview — one wordless glyph per route.
   At-a-glance only: the mechanism is drawn in each route's own deep-dive slide. */
type WayKind = 'bridge' | 'ibc' | 'l0';

function WayGlyph({ kind, color }: { kind: WayKind; color: string }) {
  const OK = '#10b981';
  const chain = (x: number) => <rect x={x} y="20" width="68" height="56" rx="9" fill={color + '14'} stroke={color} strokeWidth="1.5" />;
  const arrow = (x1: number, x2: number, y: number, c: string) => {
    const d = x2 > x1 ? 1 : -1;
    return (
      <g>
        <line x1={x1} y1={y} x2={x2 - d * 6} y2={y} stroke={c} strokeWidth="1.5" />
        <polygon points={`${x2 - d * 7},${y - 4} ${x2},${y} ${x2 - d * 7},${y + 4}`} fill={c} />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 240 96" className="w-full h-full max-h-[150px]" aria-hidden="true">
      {kind === 'bridge' && (
        <g>
          {/* coin locked on A → operator with the keys → claim ticket on B */}
          {chain(6)}
          <text x="40" y="57" textAnchor="middle" fontSize="24">🔒</text>
          {arrow(78, 98, 48, MUTED)}
          <circle cx="120" cy="48" r="20" fill="#ef444414" stroke="#ef4444" strokeWidth="1.5" />
          <text x="120" y="55" textAnchor="middle" fontSize="18">🔑</text>
          {arrow(142, 162, 48, MUTED)}
          {chain(166)}
          <text x="200" y="57" textAnchor="middle" fontSize="24">🎟️</text>
        </g>
      )}
      {kind === 'ibc' && (
        <g>
          {/* nobody in the middle: each chain holds the other's block headers and checks for itself */}
          {[6, 166].map((x) => (
            <g key={x}>
              {chain(x)}
              {[0, 1, 2].map((i) => (
                <rect key={i} x={x + 9 + i * 18} y="32" width="14" height="10" rx="2" fill="var(--card)" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
              ))}
              <text x={x + 34} y="66" textAnchor="middle" fontSize="15" fontWeight="900" fill={OK}>✓</text>
            </g>
          ))}
          {arrow(80, 160, 40, color)}
          {arrow(160, 80, 58, color)}
        </g>
      )}
      {kind === 'l0' && (
        <g>
          {/* one shared validator set on top, member chains underneath */}
          <rect x="6" y="8" width="228" height="30" rx="9" fill={color + '14'} stroke={color} strokeWidth="1.5" />
          <ValidatorDots cx={120} y={23} n={11} color={color} gap={18} />
          {[6, 88, 170].map((x) => (
            <g key={x}>
              <line x1={x + 32} y1="38" x2={x + 32} y2="56" stroke={color} strokeWidth="1.5" />
              <rect x={x} y="56" width="64" height="32" rx="8" fill="#22d3ee14" stroke="#22d3ee" strokeWidth="1.5" />
            </g>
          ))}
          {arrow(72, 86, 72, OK)}
          {arrow(168, 154, 72, OK)}
        </g>
      )}
    </svg>
  );
}

/** Compact "who you trust / where it breaks" pair shown on a route's deep-dive slide. */
function TrustRisk({ trust, risk }: { trust: string; risk: string }) {
  const { t } = useTranslation('blockchain-platforms/section-4');
  const cells = [
    { label: t('ui.trustLabel'), text: trust, color: '#10b981' },
    { label: t('ui.riskLabel'), text: risk, color: '#f59e0b' },
  ];
  return (
    <div className="shrink-0 grid grid-cols-2 gap-2">
      {cells.map((c) => (
        <div key={c.label} className="rounded-lg border bg-card px-2.5 py-2" style={{ borderColor: c.color + '55' }}>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: c.color }}>{c.label}</p>
          <p className="text-xs text-foreground leading-snug mt-0.5">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

/* Why bridges are hack targets — everyone's coins in one vault, a few keys open it (Ronin's numbers). */
function HoneypotDiagram() {
  const { t } = useTranslation('blockchain-platforms/section-4');
  const s = (k: string) => t(`bridgeHacks.why.svg.${k}`);
  const users = Array.from({ length: 15 }, (_, i) => ({ x: 22 + (i % 5) * 17, y: 38 + Math.floor(i / 5) * 24 }));
  return (
    <svg viewBox="0 0 560 150" className="w-full h-full">
      {/* Users */}
      {users.map((u, i) => (
        <g key={i}>
          <circle cx={u.x} cy={u.y - 5} r="3.5" fill={MUTED} />
          <path d={`M ${u.x - 6} ${u.y + 8} Q ${u.x} ${u.y - 4} ${u.x + 6} ${u.y + 8} Z`} fill={MUTED} />
        </g>
      ))}
      <text x="56" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill={INK}>{s('users')}</text>
      <text x="56" y="136" textAnchor="middle" fontSize="9" fill={MUTED}>{s('usersNote')}</text>

      {/* Deposits all flow into one vault */}
      {[40, 64, 88].map((y) => (
        <line key={y} x1="112" y1={y} x2="176" y2="66" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
      ))}
      <polygon points="175,60 186,66 175,72" fill="#f59e0b" />

      {/* The vault */}
      <rect x="188" y="12" width="150" height="108" rx="12" fill="#f59e0b1c" stroke="#f59e0b" strokeWidth="2" />
      <text x="263" y="34" textAnchor="middle" fontSize="10" fontWeight="900" fill="#f59e0b">🍯 {s('vault')}</text>
      <text x="263" y="76" textAnchor="middle" fontSize="30" fontWeight="900" fill={INK}>$625M</text>
      <text x="263" y="96" textAnchor="middle" fontSize="9.5" fill={MUTED}>{s('vaultNote')}</text>
      <text x="263" y="110" textAnchor="middle" fontSize="8.5" fill={MUTED}>{s('vaultExample')}</text>
      <text x="263" y="136" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f59e0b">{s('grows')}</text>

      {/* The keys */}
      <line x1="340" y1="66" x2="374" y2="66" stroke="#ef4444" strokeWidth="1.5" />
      <polygon points="349,61 339,66 349,71" fill="#ef4444" />
      <text x="464" y="28" textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>{s('keys')}</text>
      {Array.from({ length: 9 }, (_, i) => {
        const stolen = i < 5;
        const x = 384 + i * 20;
        return (
          <g key={i}>
            <circle cx={x} cy="66" r="8.5" fill={stolen ? '#ef4444' : 'var(--card)'} stroke={stolen ? '#ef4444' : MUTED} strokeWidth="1.2" />
            <text x={x} y="69.5" textAnchor="middle" fontSize="9">🔑</text>
          </g>
        );
      })}
      <path d="M 376 82 V 88 H 472 V 82" fill="none" stroke="#ef4444" strokeWidth="1.2" />
      <text x="424" y="104" textAnchor="middle" fontSize="10" fontWeight="900" fill="#ef4444">{s('stolen')}</text>
      <text x="464" y="126" textAnchor="middle" fontSize="9.5" fill={MUTED}>{s('stolenNote')}</text>
    </svg>
  );
}

interface CardItem { emoji: string; title: string; desc: string; }
interface IconCard { icon: string; title: string; desc: string; }
interface TitledCard { title: string; desc: string; }
interface EmojiCard { emoji: string; title: string; desc: string; }
interface SolutionItem { label: string; sub: string; }
interface PlatformItem { name: string; tagline: string; }
interface ZoneItem { label: string; purpose: string; }
interface MetricItem { metric: string; label: string; }
interface HackItem { name: string; amount: string; year: string; chain: string; method: string; }
interface WayItem { name: string; how: string; trust: string; analogy: string; }
interface UseCaseItem { title: string; scenario: string; how: string; }

const NS = 'blockchain-platforms/section-4';

/** True while the element is on screen — used to run looping demos only on the visible slide. */
function useInView<T extends Element>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ──────────────────── How a bridge works: lock-and-mint, step by step ────────────────────
   One token travels the active step (lock → approve → mint → burn-to-return).
   Steps auto-advance while the slide is visible; clicking a step pauses on it. */
const BRIDGE_STEP_COLORS = ['#f59e0b', '#ef4444', '#6366f1', '#10b981'];
const BRIDGE_TOKEN_PATHS: { x: number[]; y: number[]; kind: 'coin' | 'note' | 'ticket' }[] = [
  { x: [100, 100], y: [56, 130], kind: 'coin' },
  { x: [176, 226], y: [132, 132], kind: 'note' },
  { x: [334, 392], y: [132, 132], kind: 'ticket' },
  { x: [460, 460, 100, 100], y: [198, 234, 234, 198], kind: 'coin' },
];

function BridgeFlowDiagram({ step }: { step: number }) {
  const { t } = useTranslation(NS);
  const s = (k: string) => t(`bridges.flow.${k}`);
  const [c1, c2, c3, c4] = BRIDGE_STEP_COLORS;
  const dim = (i: number) => ({ opacity: step === i ? 1 : 0.4, transition: 'opacity 0.3s' });
  const token = BRIDGE_TOKEN_PATHS[step];
  return (
    <svg viewBox="0 0 560 262" className="w-full flex-1 min-h-0">
      {/* Chain A — you, and the vault */}
      <text x="100" y="18" textAnchor="middle" fontSize="11" fontWeight="900" fill={c1}>{s('chainA')}</text>
      <rect x="10" y="26" width="180" height="178" rx="10" fill={c1 + '12'} stroke={c1} strokeWidth="1.5" />
      <rect x="52" y="36" width="96" height="30" rx="15" fill="var(--card)" stroke={MUTED} strokeWidth="1" />
      <text x="100" y="56" textAnchor="middle" fontSize="11" fontWeight="800" fill={INK}>🧑 {s('you')}</text>
      <rect x="30" y="106" width="140" height="88" rx="8" fill={c1 + '22'} stroke={c1} strokeWidth={step === 0 || step === 3 ? 2.5 : 1.2} />
      <text x="100" y="134" textAnchor="middle" fontSize="20">🔒</text>
      <text x="100" y="158" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>{s('locked')}</text>
      <text x="100" y="176" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={c1}>{s('vault')}</text>
      <g style={dim(0)}>
        <line x1="100" y1="68" x2="100" y2="96" stroke={c1} strokeWidth="1.5" />
        <polygon points="95,96 100,105 105,96" fill={c1} />
        <StepDot x={124} y={86} n={1} color={c1} />
      </g>

      {/* Operator — the signers */}
      <rect x="215" y="62" width="130" height="106" rx="10" fill={c2 + '12'} stroke={c2} strokeWidth={step === 1 ? 2.5 : 1.5} />
      <text x="280" y="86" textAnchor="middle" fontSize="11" fontWeight="900" fill={c2}>{s('operator')}</text>
      <text x="280" y="112" textAnchor="middle" fontSize="16">🔑🔑🔑</text>
      <text x="280" y="148" textAnchor="middle" fontSize="9" fill={MUTED}>{s('operatorNote1')}</text>
      <text x="280" y="160" textAnchor="middle" fontSize="9" fill={MUTED}>{s('operatorNote2')}</text>
      <g style={dim(1)}>
        <line x1="191" y1="132" x2="206" y2="132" stroke={c2} strokeWidth="1.5" />
        <polygon points="206,128 214,132 206,136" fill={c2} />
        <StepDot x={202} y={112} n={2} color={c2} />
      </g>

      {/* Chain B — the wrapped copy */}
      <text x="460" y="18" textAnchor="middle" fontSize="11" fontWeight="900" fill={c3}>{s('chainB')}</text>
      <rect x="370" y="26" width="180" height="178" rx="10" fill={c3 + '12'} stroke={c3} strokeWidth={step === 2 ? 2.5 : 1.5} />
      <text x="460" y="86" textAnchor="middle" fontSize="30">🎟️</text>
      <text x="460" y="120" textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>{s('minted')}</text>
      <text x="460" y="138" textAnchor="middle" fontSize="9.5" fill={MUTED}>{s('mintedNote')}</text>
      <rect x="412" y="156" width="96" height="30" rx="15" fill="var(--card)" stroke={MUTED} strokeWidth="1" />
      <text x="460" y="176" textAnchor="middle" fontSize="11" fontWeight="800" fill={INK}>🧑 {s('you')}</text>
      <g style={dim(2)}>
        <line x1="346" y1="132" x2="361" y2="132" stroke={c3} strokeWidth="1.5" />
        <polygon points="361,128 369,132 361,136" fill={c3} />
        <StepDot x={357} y={112} n={3} color={c3} />
      </g>

      {/* Way back: burn the copy → release the original */}
      <g style={dim(3)}>
        <path d="M 460 206 V 234 H 100 V 214" fill="none" stroke={c4} strokeWidth="1.5" strokeDasharray="4 3" />
        <polygon points="95,214 100,205 105,214" fill={c4} />
        <StepDot x={280} y={234} n={4} color={c4} />
        <text x="280" y="256" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={c4}>{s('back')}</text>
      </g>

      {/* The thing that travels on the active step */}
      <motion.g
        key={step}
        initial={{ x: token.x[0], y: token.y[0], opacity: 0 }}
        animate={{ x: token.x, y: token.y, opacity: 1 }}
        transition={{ duration: 1.3, ease: 'easeInOut', opacity: { duration: 0.2 } }}
      >
        {token.kind === 'coin' && (
          <>
            <circle r="10" fill="#facc15" stroke="#a16207" strokeWidth="1.4" />
            <text y="4" textAnchor="middle" fontSize="11" fontWeight="900" fill="#7c2d12">Ξ</text>
          </>
        )}
        {token.kind === 'note' && <text y="5" textAnchor="middle" fontSize="15">✉️</text>}
        {token.kind === 'ticket' && <text y="5" textAnchor="middle" fontSize="15">🎟️</text>}
      </motion.g>
    </svg>
  );
}

function BridgeHowSlide({ hoodLabel, keyPoint }: { hoodLabel: string; keyPoint: ReactNode }) {
  const { t } = useTranslation(NS);
  const reduced = !!useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const steps = t('bridges.steps', { returnObjects: true }) as TitledCard[];

  useEffect(() => {
    if (!playing || !inView) return;
    const id = setInterval(() => setStep((v) => (v + 1) % 4), 2600);
    return () => clearInterval(id);
  }, [playing, inView]);

  return (
    <div id="s4-bridges" ref={ref} className="h-full flex flex-col p-5 lg:p-8">
      <div className="shrink-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t('bridges.heading')}</h2>
        <p className="text-sm text-muted-foreground max-w-4xl">{t('bridges.subtitle')}</p>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4">
        {/* Left — the mechanism, drawn */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="shrink-0 flex items-center justify-between gap-2">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('bridges.flow.label')}</p>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="text-[11px] px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground font-semibold transition-colors"
            >{playing ? t('bridges.flow.pause') : t('bridges.flow.play')}</button>
          </div>
          <div className="flex-1 min-h-[240px] rounded-xl border border-border bg-card/40 p-3 flex flex-col">
            <BridgeFlowDiagram step={step} />
            <p className="text-xs font-semibold text-foreground text-center shrink-0 mt-1">🔒 {t('bridges.flow.stays')}</p>
          </div>
          <div className="shrink-0 p-3 rounded-xl border-2" style={{ borderColor: '#f59e0b70', backgroundColor: '#f59e0b12' }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">{t('bridges.analogyLabel')}</p>
            <p className="text-sm lg:text-base font-semibold text-foreground leading-snug mt-0.5">{t('bridges.analogy')}</p>
          </div>
        </div>

        {/* Right — definition, then the four steps */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="shrink-0 rounded-xl border p-3" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee0d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#22d3ee]">{t('bridges.definitionLabel')}</p>
            <p className="text-sm lg:text-base text-foreground leading-snug mt-0.5">
              <span className="font-black">{t('bridges.definitionTerm')}</span> — {t('bridges.definition')}
            </p>
          </div>
          <p className="shrink-0 text-xs font-black uppercase tracking-widest text-muted-foreground mt-1">{t('bridges.stepsLabel')}</p>
          <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
            {steps.map((st, i) => {
              const color = BRIDGE_STEP_COLORS[i];
              const on = step === i;
              return (
                <button
                  key={st.title}
                  onClick={() => { setStep(i); setPlaying(false); }}
                  aria-pressed={on}
                  className="min-h-0 text-left flex gap-3 items-center px-3 py-2 rounded-xl border-2 transition-colors"
                  style={{ borderColor: on ? color : color + '40', backgroundColor: on ? color + '14' : 'var(--card)' }}
                >
                  <span className="size-7 shrink-0 rounded-full flex items-center justify-center text-sm font-black text-white" style={{ backgroundColor: color }}>{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-sm lg:text-base font-bold leading-tight" style={{ color }}>{st.title}</span>
                    <span className="block text-xs lg:text-sm text-muted-foreground leading-snug">{st.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="shrink-0 rounded-xl border px-3 py-2" style={{ borderColor: '#ef444455', backgroundColor: '#ef44440d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#ef4444]">{t('bridges.operatorLabel')}</p>
            <p className="text-xs lg:text-sm text-foreground leading-snug mt-0.5">{t('bridges.operatorBody')}</p>
          </div>
          <UnderTheHood label={hoodLabel} terms={['lock-and-mint', 'wrapped token', 'multisig', 'custodian', 'burn']} className="self-start" />
        </div>
      </div>
      {keyPoint}
    </div>
  );
}

/* Bridge risk — the same vault at scale: everyone's coins behind a few keys, backing every copy. */
function BridgeVaultRiskDiagram() {
  const { t } = useTranslation(NS);
  const s = (k: string) => t(`bridgeRisk.vault.${k}`);
  return (
    <svg viewBox="0 0 300 200" className="w-full flex-1 min-h-0">
      <text x="68" y="24" textAnchor="middle" fontSize="11" fontWeight="900" fill="#f59e0b">{s('chainA')}</text>
      <rect x="12" y="34" width="112" height="130" rx="10" fill="#f59e0b14" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="68" y="64" textAnchor="middle" fontSize="22">🔒</text>
      <text x="68" y="90" textAnchor="middle" fontSize="15" fontWeight="900" fill={INK}>1,000 ETH</text>
      <text x="68" y="104" textAnchor="middle" fontSize="8.5" fill={MUTED}>{s('locked')}</text>
      <text x="68" y="118" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f59e0b">{s('grows')}</text>
      <text x="68" y="140" textAnchor="middle" fontSize="11">🔑🔑🔑</text>
      <text x="68" y="154" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ef4444">{s('keys')}</text>

      <line x1="128" y1="99" x2="164" y2="99" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="164,94 174,99 164,104" fill={MUTED} />
      <text x="150" y="90" textAnchor="middle" fontSize="8.5" fill={MUTED}>{s('backs')}</text>

      <text x="232" y="24" textAnchor="middle" fontSize="11" fontWeight="900" fill="#6366f1">{s('chainB')}</text>
      <rect x="176" y="34" width="112" height="130" rx="10" fill="#6366f114" stroke="#6366f1" strokeWidth="1.5" />
      <text x="232" y="74" textAnchor="middle" fontSize="26">🎟️</text>
      <text x="232" y="108" textAnchor="middle" fontSize="15" fontWeight="900" fill={INK}>1,000 wETH</text>
      <text x="232" y="124" textAnchor="middle" fontSize="8.5" fill={MUTED}>{s('minted')}</text>

      <text x="150" y="188" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#ef4444">🍯 {s('drained')}</text>
    </svg>
  );
}

/* Layer 0 trade-off pictograms: one validator set over three chains, or one set per chain. */
function ModelPictogram({ kind, color }: { kind: 'shared' | 'sovereign'; color: string }) {
  const xs = [26, 86, 146];
  return (
    <svg viewBox="0 0 220 86" className="w-full h-[92px] shrink-0" aria-hidden>
      {kind === 'shared' && (
        <>
          <rect x="26" y="4" width="168" height="24" rx="7" fill={color + '22'} stroke={color} strokeWidth="1.5" />
          <ValidatorDots cx={110} y={16} n={9} color={color} gap={16} r={4} />
        </>
      )}
      {xs.map((x, i) => (
        <g key={x}>
          {kind === 'shared' && <line x1={x + 24} y1="28" x2={x + 24} y2="46" stroke={color} strokeWidth="1.5" />}
          <rect x={x} y={kind === 'shared' ? 46 : 14} width="48" height={kind === 'shared' ? 36 : 58} rx="6" fill="var(--card)" stroke={kind === 'shared' ? MUTED : color} strokeWidth="1.5" />
          {kind === 'sovereign' && <ValidatorDots cx={x + 24} y={43} n={3} color={color} gap={13} r={4} />}
          {kind === 'sovereign' && i > 0 && <text x={x - 6} y="47" textAnchor="middle" fontSize="11" fontWeight="700" fill={MUTED}>⇄</text>}
        </g>
      ))}
    </svg>
  );
}

/* ──────────────────── XRPL consensus: one voting round ────────────────────
   Trusted validators switch to "agree" until the 80% line is crossed and the ledger closes. */
const XRPL_VOTE_SEQ = [4, 9, 13, 15, 17, 19, 19, 19];
const XRPL_VOTE_ORDER = [3, 11, 17, 6, 0, 14, 9, 19, 5, 12, 1, 16, 8, 4, 13, 18, 2, 10, 7, 15];

function XrplConsensusDiagram({ active }: { active: boolean }) {
  const { t } = useTranslation(NS);
  const s = (k: string) => t(`xrpHow.svg.${k}`);
  const reduced = !!useReducedMotion();
  const [idx, setIdx] = useState(reduced ? 5 : 0);
  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setIdx((v) => (v + 1) % XRPL_VOTE_SEQ.length), 800);
    return () => clearInterval(id);
  }, [active, reduced]);

  const N = 20;
  const agree = XRPL_VOTE_SEQ[idx];
  const pct = Math.round((agree / N) * 100);
  const closed = pct >= 80;
  const OK = '#10b981', WAIT = '#f59e0b';
  const tone = closed ? OK : WAIT;
  const cx = 135, cy = 126, R = 100;
  const BAR_X = 292, BAR_W = 186;
  return (
    <svg viewBox="0 0 490 268" className="w-full flex-1 min-h-0">
      {/* The validators a node trusts */}
      {Array.from({ length: N }, (_, i) => {
        const a = ((i * 360) / N - 90) * (Math.PI / 180);
        const on = XRPL_VOTE_ORDER.indexOf(i) < agree;
        return (
          <circle
            key={i}
            cx={cx + R * Math.cos(a)} cy={cy + R * Math.sin(a)} r="11"
            fill={on ? OK : 'var(--card)'} stroke={on ? OK : MUTED} strokeWidth="1.5"
            style={{ transition: 'fill 0.3s, stroke 0.3s' }}
          />
        );
      })}
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="38" fontWeight="900" fill={closed ? OK : INK}>{pct}%</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fontSize="12.5" fill={MUTED}>{s('agree')}</text>
      <text x={cx} y="258" textAnchor="middle" fontSize="10" fill={MUTED}>{s('unl')}</text>

      {/* Progress to the 80% line */}
      <text x={BAR_X + BAR_W / 2} y="52" textAnchor="middle" fontSize="16" fontWeight="900" fill={tone}>{closed ? s('closed') : s('open')}</text>
      <rect x={BAR_X} y="68" width={BAR_W} height="18" rx="9" fill="var(--muted)" />
      <rect x={BAR_X} y="68" width={(BAR_W * pct) / 100} height="18" rx="9" fill={tone} style={{ transition: 'width 0.4s, fill 0.3s' }} />
      <line x1={BAR_X + BAR_W * 0.8} y1="62" x2={BAR_X + BAR_W * 0.8} y2="92" stroke={INK} strokeWidth="1.5" strokeDasharray="3 2" />
      <text x={BAR_X + BAR_W * 0.8} y="107" textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK}>{s('threshold')}</text>

      {/* The ledger chain: the newest one closes when the vote passes */}
      {[0, 1, 2].map((b) => {
        const x = BAR_X + b * 65;
        const done = b < 2 || closed;
        const c = done ? OK : WAIT;
        return (
          <g key={b}>
            {b > 0 && <line x1={x - 9} y1="165" x2={x} y2="165" stroke={MUTED} strokeWidth="1.2" />}
            <rect x={x} y="138" width="56" height="54" rx="7" fill={c + '1c'} stroke={c} strokeWidth="1.5" strokeDasharray={done ? undefined : '4 3'} style={{ transition: 'fill 0.3s, stroke 0.3s' }} />
            <text x={x + 28} y="157" textAnchor="middle" fontSize="9.5" fill={MUTED}>{s('ledger')}</text>
            <text x={x + 28} y="179" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>{done ? '✓' : '…'} #{101 + b}</text>
          </g>
        );
      })}
      <text x={BAR_X + BAR_W / 2} y="216" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={MUTED}>⏱ 3–5 s</text>
    </svg>
  );
}

function XrplHowSlide({ hoodLabel, keyPoint }: { hoodLabel: string; keyPoint: ReactNode }) {
  const { t } = useTranslation(NS);
  const [ref, inView] = useInView<HTMLDivElement>();
  const steps = t('xrpHow.steps', { returnObjects: true }) as TitledCard[];
  const uses = t('xrpHow.uses', { returnObjects: true }) as EmojiCard[];
  return (
    <div id="s4-xrp-how" ref={ref} className="h-full flex flex-col p-5 lg:p-8">
      <div className="shrink-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t('xrpHow.heading')}</h2>
        <p className="text-sm text-muted-foreground max-w-4xl">{t('xrpHow.subtitle')}</p>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4">
        {/* Left — consensus, drawn */}
        <div className="flex flex-col gap-2 min-h-0">
          <p className="shrink-0 text-xs font-black uppercase tracking-widest text-muted-foreground">{t('xrpHow.consensusLabel')}</p>
          <div className="flex-1 min-h-[230px] rounded-xl border border-border bg-card/40 p-3 flex flex-col">
            <XrplConsensusDiagram active={inView} />
            <p className="text-xs text-muted-foreground leading-snug shrink-0 mt-1.5 text-center">{t('xrpHow.svg.caption')}</p>
          </div>
          <div className="shrink-0 grid grid-cols-3 gap-2">
            {steps.map((st, i) => (
              <div key={st.title} className="rounded-xl border border-[#06b6d4]/35 bg-card p-2.5">
                <p className="text-sm font-bold text-foreground leading-tight">
                  <span className="inline-flex size-5 mr-1.5 rounded-full bg-[#06b6d4] text-white text-[11px] font-black items-center justify-center align-middle">{i + 1}</span>
                  {st.title}
                </p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — what it is used for */}
        <div className="flex flex-col gap-2 min-h-0">
          <p className="shrink-0 text-xs font-black uppercase tracking-widest text-muted-foreground">{t('xrpHow.usesLabel')}</p>
          <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
            {uses.map((u) => (
              <div key={u.title} className="min-h-0 flex gap-3 items-start p-2.5 bg-card rounded-xl border border-[#06b6d4]/25">
                <span className="text-xl shrink-0 leading-none mt-0.5">{u.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm lg:text-base font-bold text-foreground leading-tight">{u.title}</p>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-snug mt-0.5">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 p-2.5 rounded-lg border" style={{ borderColor: '#f59e0b66', backgroundColor: '#f59e0b10' }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">{t('xrpHow.honestTitle')}</p>
            <p className="text-xs text-foreground leading-snug mt-0.5">{t('xrpHow.honestBody')}</p>
          </div>
          <UnderTheHood label={hoodLabel} terms={['UNL', 'federated consensus', 'Trust Lines', 'bridge currency', 'XLS-30 AMM']} className="self-start" />
        </div>
      </div>
      {keyPoint}
    </div>
  );
}

/* ──────────────────── The Layers: L0 · L1 · L2 overview ────────────────────
   One structural picture: L2s standing on Bitcoin and Ethereum, Solana scaling
   on its own (none of the three has a Layer 0 beneath it), and three Polkadot
   parachains standing on a shared Layer 0. A light dashed strip shows that
   Bitcoin (Babylon) and Ethereum (EigenLayer) now also lend their security out.
   Moving dots are transactions — the busier the lane, the faster the layer.
   Animation is SVG-native (SMIL), so React does no per-frame work. */
const LAYER_COLORS: Record<string, string> = { L2: '#39B54A', L1: '#627EEA', L0: '#0891b2' };
const BTC_ORANGE = '#f7931a';
const SOL_PURPLE = '#9945FF';

interface NamedSub { name: string; sub: string }
interface SpeedItem { layer: string; name: string; value: string; note: string }

function TxLane({ x1, x2, y, dur, n, color, r = 3, still }: { x1: number; x2: number; y: number; dur: number; n: number; color: string; r?: number; still: boolean }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth="1" strokeOpacity="0.28" strokeLinecap="round" />
      {Array.from({ length: n }, (_, i) => {
        if (still) return <circle key={i} cx={x1 + ((i + 0.5) * (x2 - x1)) / n} cy={y} r={r} fill={color} />;
        const begin = `${(-(i * dur) / n).toFixed(2)}s`;
        return (
          <circle key={i} cx={x1} cy={y} r={r} fill={color} opacity="0">
            <animate attributeName="cx" from={x1} to={x2} dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
          </circle>
        );
      })}
    </g>
  );
}

function LayerStackDiagram({ still }: { still: boolean }) {
  const { t } = useTranslation(NS);
  const s = (k: string) => t(`layers.svg.${k}`);
  const list = (k: string) => t(`layers.svg.${k}`, { returnObjects: true }) as NamedSub[];
  const { L2, L1, L0 } = LAYER_COLORS;
  const Y2 = 14, Y1 = 156, Y0 = 273, H = 92; // row tops + box height
  const GAP = 12;
  const towers = [
    { x: 72, w: 240, items: list('btcL2') },
    { x: 326, w: 240, items: list('ethL2') },
  ];
  const SOL_X = 580, SOL_W = 100; // an L1 with no L2s on top
  const SOLO_END = SOL_X + SOL_W; // right edge of the self-securing L1s
  const L0_X = 700, L0_W = 292;
  const appChains = list('appChains').map((c, i) => ({ ...c, x: L0_X + i * 102, w: 88 }));
  const firstCx = appChains[0].x + 44, lastCx = appChains[appChains.length - 1].x + 44;
  const l0Cx = L0_X + L0_W / 2;
  const rows: [string, number][] = [['L2', Y2], ['L1', Y1], ['L0', Y0]];
  const msgPath = `M ${firstCx} ${Y1 + H - 6} V ${Y0 + 14} H ${lastCx} V ${Y1 + H - 6}`;

  return (
    <svg viewBox="0 0 1000 402" className="w-full h-full" role="img" aria-label={t('layers.aria')}>
      {/* Row tiles */}
      {rows.map(([id, y]) => (
        <g key={id}>
          <rect x="8" y={y + 14} width="48" height="42" rx="9" fill={LAYER_COLORS[id]} />
          <text x="32" y={y + 42} textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff">{id}</text>
          <text x="32" y={y + 73} textAnchor="middle" fontSize="11" fontWeight="800" fill={LAYER_COLORS[id]}>{t(`layers.roles.${id}`)}</text>
        </g>
      ))}
      <text x="32" y={Y2 + H + 30} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={L2}>{s('settle')}</text>

      {/* L2s — several per L1, each settling down onto it */}
      {towers.map((tw, ti) => {
        const w = (tw.w - GAP * (tw.items.length - 1)) / tw.items.length;
        return tw.items.map((it, i) => {
          const x = tw.x + i * (w + GAP);
          const cx = x + w / 2;
          const begin = `${(-(ti * 2 + i) * 1.1).toFixed(1)}s`;
          return (
            <g key={it.name}>
              <rect x={x} y={Y2} width={w} height={H} rx="8" fill={L2 + '1c'} stroke={L2} strokeWidth="1.5" />
              <text x={cx} y={Y2 + 30} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={INK}>{it.name}</text>
              <text x={cx} y={Y2 + 48} textAnchor="middle" fontSize="10.5" fill={MUTED}>{it.sub}</text>
              <TxLane x1={x + 10} x2={x + w - 10} y={Y2 + 71} dur={1.3} n={4} color={L2} r={2.6} still={still} />
              <line x1={cx} y1={Y2 + H} x2={cx} y2={Y1} stroke={L2} strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.6" />
              <rect x={cx - 6} y={still ? (Y2 + H + Y1) / 2 - 3 : Y2 + H + 2} width="12" height="7" rx="2" fill={L2} opacity={still ? 1 : 0}>
                {!still && (
                  <>
                    <animate attributeName="y" values={`${Y2 + H + 2};${Y1 - 9};${Y1 - 9}`} keyTimes="0;0.35;1" dur="4.5s" begin={begin} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.05;0.3;0.36;1" dur="4.5s" begin={begin} repeatCount="indefinite" />
                  </>
                )}
              </rect>
            </g>
          );
        });
      })}

      {/* L1s that stand alone */}
      <rect x="72" y={Y1} width="240" height={H} rx="10" fill={L1 + '1c'} stroke={L1} strokeWidth="1.8" />
      <text x="88" y={Y1 + 33} fontSize="19" fontWeight="900" fill={BTC_ORANGE}>₿ Bitcoin</text>
      <text x="88" y={Y1 + 53} fontSize="11.5" fill={MUTED}>{s('btcSub')}</text>
      <TxLane x1={88} x2={296} y={Y1 + 74} dur={9} n={2} color={BTC_ORANGE} r={3.2} still={still} />

      <rect x="326" y={Y1} width="240" height={H} rx="10" fill={L1 + '1c'} stroke={L1} strokeWidth="1.8" />
      <text x="342" y={Y1 + 33} fontSize="19" fontWeight="900" fill={L1}>Ξ Ethereum</text>
      <text x="342" y={Y1 + 53} fontSize="11.5" fill={MUTED}>{s('ethSub')}</text>
      <TxLane x1={342} x2={550} y={Y1 + 74} dur={6} n={3} color={L1} r={3.2} still={still} />

      {/* An L1 that scales on its own — nothing stacked on top */}
      <rect x={SOL_X} y={Y1} width={SOL_W} height={H} rx="10" fill={L1 + '1c'} stroke={L1} strokeWidth="1.8" />
      <text x={SOL_X + SOL_W / 2} y={Y1 + 33} textAnchor="middle" fontSize="17" fontWeight="900" fill={SOL_PURPLE}>Solana</text>
      <text x={SOL_X + SOL_W / 2} y={Y1 + 53} textAnchor="middle" fontSize="11" fill={MUTED}>{s('solSub')}</text>
      <TxLane x1={SOL_X + 12} x2={SOL_X + SOL_W - 12} y={Y1 + 74} dur={1.6} n={4} color={SOL_PURPLE} r={2.8} still={still} />
      <text x={SOL_X + SOL_W / 2} y={Y2 + H / 2 + 4} textAnchor="middle" fontSize="10.5" fill={MUTED} opacity="0.8">{s('solNoL2')}</text>

      {/* No Layer 0 under these three… */}
      <rect x="72" y={Y0} width={SOLO_END - 72} height={H} rx="10" fill="none" stroke={MUTED} strokeWidth="1.3" strokeDasharray="6 5" strokeOpacity="0.7" />
      <text x={(72 + SOLO_END) / 2} y={Y0 + 25} textAnchor="middle" fontSize="15" fontWeight="800" fill={MUTED}>{s('noL0Title')}</text>
      <text x={(72 + SOLO_END) / 2} y={Y0 + 44} textAnchor="middle" fontSize="11.5" fill={MUTED}>{s('noL0Sub')}</text>
      {/* …yet Bitcoin and Ethereum are starting to lend their security out: a soft overlap into Layer 0, not a wall */}
      <rect x="84" y={Y0 + 56} width={L0_X - 84 - 8} height="26" rx="13" fill={L0 + '10'} stroke={L0} strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.75" />
      <text x="98" y={Y0 + 73} fontSize="11" fill={INK}>{s('restakers')}</text>
      <text x={L0_X - 22} y={Y0 + 73} textAnchor="end" fontSize="11" fontWeight="800" fill={L0}>{s('alsoShared')}</text>
      <line x1={L0_X - 8} y1={Y0 + 69} x2={L0_X - 2} y2={Y0 + 69} stroke={L0} strokeWidth="1" strokeDasharray="2 2" />

      {/* L1s that stand on a shared Layer 0 */}
      {appChains.map((c) => {
        const cx = c.x + c.w / 2;
        return (
          <g key={c.name}>
            <rect x={c.x} y={Y1} width={c.w} height={H} rx="8" fill={L1 + '1c'} stroke={L1} strokeWidth="1.5" />
            <text x={cx} y={Y1 + 30} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={INK}>{c.name}</text>
            <text x={cx} y={Y1 + 48} textAnchor="middle" fontSize="10.5" fill={MUTED}>{c.sub}</text>
            <TxLane x1={c.x + 10} x2={c.x + c.w - 10} y={Y1 + 71} dur={2.6} n={2} color={L1} r={2.6} still={still} />
            <line x1={cx} y1={Y1 + H + 7} x2={cx} y2={Y0} stroke={L0} strokeWidth="1.5" />
            <polygon points={`${cx - 4},${Y1 + H + 8} ${cx},${Y1 + H + 1} ${cx + 4},${Y1 + H + 8}`} fill={L0} />
          </g>
        );
      })}
      <text x={(firstCx + l0Cx) / 2} y={Y1 + H + 17} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={L0}>{s('secures')}</text>

      <rect x={L0_X} y={Y0} width={L0_W} height={H} rx="10" fill={L0 + '22'} stroke={L0} strokeWidth="2" />
      <line x1={firstCx} y1={Y0 + 14} x2={lastCx} y2={Y0 + 14} stroke={L0} strokeWidth="1" strokeOpacity="0.35" />
      <text x={l0Cx} y={Y0 + 43} textAnchor="middle" fontSize="13.5" fontWeight="900" fill={L0}>{s('l0Title')}</text>
      <text x={l0Cx} y={Y0 + 61} textAnchor="middle" fontSize="10.5" fill={MUTED}>{s('l0Sub')}</text>
      <text x={l0Cx} y={Y0 + 79} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>{s('l0Examples')}</text>

      {/* A message hopping chain → Layer 0 → chain */}
      <g transform={still ? `translate(${l0Cx} ${Y0 + 14})` : undefined} opacity={still ? 1 : 0}>
        <rect x="-5" y="-5" width="10" height="10" rx="2" transform="rotate(45)" fill="#f59e0b" stroke="#a16207" strokeWidth="1" />
        {!still && (
          <>
            <animateMotion path={msgPath} dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="5s" repeatCount="indefinite" />
          </>
        )}
      </g>

      {/* Legend */}
      <circle cx="78" cy={Y0 + H + 23} r="3.5" fill={L2} />
      <text x="88" y={Y0 + H + 27} fontSize="11" fill={MUTED}>{s('legendTx')}</text>
      <rect x="400" y={Y0 + H + 19.5} width="12" height="7" rx="2" fill={L2} />
      <text x="418" y={Y0 + H + 27} fontSize="11" fill={MUTED}>{s('legendBatch')}</text>
      <rect x="-5" y="-5" width="10" height="10" rx="2" transform={`translate(700 ${Y0 + H + 23}) rotate(45)`} fill="#f59e0b" stroke="#a16207" strokeWidth="1" />
      <text x="712" y={Y0 + H + 27} fontSize="11" fill={MUTED}>{s('legendMsg')}</text>
    </svg>
  );
}

// Lane shape per speed tile: one slow dot (Bitcoin) … a busy lane (rollups) … parallel lanes (Layer 0).
const SPEED_META = [
  { color: BTC_ORANGE, dur: 9, n: 1, lanes: 1 },
  { color: LAYER_COLORS.L1, dur: 6, n: 2, lanes: 1 },
  { color: LAYER_COLORS.L2, dur: 1.3, n: 7, lanes: 1 },
  { color: LAYER_COLORS.L0, dur: 2.6, n: 2, lanes: 3 },
];

function LayersOverview({ recapLabel, keyPoint }: { recapLabel: string; keyPoint: ReactNode }) {
  const { t } = useTranslation(NS);
  const still = !!useReducedMotion();
  const speed = t('layers.speed.items', { returnObjects: true }) as SpeedItem[];
  return (
    <div id="s4-layers" className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('layers.heading')}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t('layers.subtitle')}</p>
        </div>
        <RecapHandoff label={recapLabel} text={t('layers.recap')} to="/blockchain-platforms/section-2" color="#39B54A" />
      </div>

      <div className="flex-1 min-h-[220px] rounded-xl border border-border bg-card/40 p-3">
        <LayerStackDiagram still={still} />
      </div>

      <div className="shrink-0 mt-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{t('layers.speed.title')}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {speed.map((it, i) => {
            const m = SPEED_META[i % SPEED_META.length];
            const ys = m.lanes === 1 ? [9] : [3, 9, 15];
            return (
              <div key={it.name} className="rounded-xl border bg-card px-3 py-2" style={{ borderColor: m.color + '55' }}>
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-black text-white rounded px-1.5 py-0.5 self-center" style={{ backgroundColor: LAYER_COLORS[it.layer] }}>{it.layer}</span>
                  <span className="text-sm font-bold text-foreground whitespace-nowrap">{it.name}</span>
                  <span className="ml-auto text-sm font-black whitespace-nowrap" style={{ color: m.color }}>{it.value}</span>
                </div>
                <svg viewBox="0 0 240 18" className="w-full h-auto mt-1.5" aria-hidden>
                  {ys.map((y, k) => (
                    <TxLane key={k} x1={4} x2={236} y={y} dur={m.dur + k * 0.4} n={m.n} color={m.color} r={m.lanes === 1 ? 3 : 2.2} still={still} />
                  ))}
                </svg>
                <p className="text-[11px] text-muted-foreground mt-1">{it.note}</p>
              </div>
            );
          })}
        </div>
      </div>
      {keyPoint}
    </div>
  );
}

export function BP_Section4() {
  const { t } = useTranslation('blockchain-platforms/section-4');

  const chapters = useMemo(
    () =>
      chapterShape.map((c) =>
        'kind' in c
          ? { kind: 'group' as const, id: c.id, label: t(`groups.${c.id}`) }
          : { id: c.id, label: t(`chapters.${c.id}`) }
      ),
    [t]
  );

  const islandCards = t('interop.islands.cards', { returnObjects: true }) as CardItem[];
  const mattersSolutions = t('interop.matters.solutions', { returnObjects: true }) as SolutionItem[];
  const closedCards = t('closed.cards', { returnObjects: true }) as CardItem[];
  const bridgeWhyPoints = t('bridgeHacks.why.points', { returnObjects: true }) as IconCard[];
  const useCases = t('usecases.items', { returnObjects: true }) as UseCaseItem[];
  const hoodLabel = t('ui.hood');
  const recapLabel = t('ui.recap');
  const keyLabel = t('ui.keyPoint');
  const kp = (id: string) => <KeyPointBar label={keyLabel} text={t(`keyPoints.${id}`)} color="#22d3ee" className="mt-3" />;

  const layer0Provides = t('layer0.provides', { returnObjects: true }) as IconCard[];
  const layer0Platforms = t('layer02.platforms', { returnObjects: true }) as PlatformItem[];
  const layer0Models = t('layer02.models', { returnObjects: true }) as Array<{ title: string; sub: string; pros: string[]; con: string; examples: string }>;

  const bridgeHacks = t('bridges.hacks', { returnObjects: true }) as HackItem[];
  const bridgeDangers = t('bridgeRisk.dangers', { returnObjects: true }) as IconCard[];
  const bridgeSafer = t('bridgeRisk.safer', { returnObjects: true }) as TitledCard[];
  const wrappedCards = t('wrapped.cards', { returnObjects: true }) as TitledCard[];

  const cosmosZones = t('cosmos.zones', { returnObjects: true }) as ZoneItem[];
  const cosmosMetrics = t('cosmos.metrics', { returnObjects: true }) as MetricItem[];
  const cosmosProperties = t('cosmos.properties', { returnObjects: true }) as EmojiCard[];

  const xrpWhy = t('xrp.why', { returnObjects: true }) as EmojiCard[];
  const xrpStats = t('xrp.stats', { returnObjects: true }) as MetricItem[];

  const quizOptions = t('quiz.options', { returnObjects: true }) as string[];
  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

  // Color/style data kept language-neutral; merged with translated text below.
  // Order matches layer02.platforms: shared-security first, sovereign last.
  const platformMeta: { emoji: string; token: string; color: string; model: 'shared' | 'sovereign' }[] = [
    { emoji: '🔴', token: 'DOT',  color: '#e6007a', model: 'shared' },
    { emoji: '₿',  token: 'BABY', color: '#f59e0b', model: 'shared' },
    { emoji: '🔺', token: 'AVAX', color: '#e84142', model: 'sovereign' },
    { emoji: '⚛️', token: 'ATOM', color: '#6366f1', model: 'sovereign' },
  ];
  const modelColors = { shared: '#0891b2', sovereign: '#8b5cf6' };
  const spectrumPos = [10, 36, 66, 90]; // % along the shared → sovereign line
  const generalItemColors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#94a3b8'];
  const hackColors = ['#ef4444', '#f97316', '#eab308', '#6366f1'];
  const saferColors = ['#39B54A', '#6366f1', '#ef4444'];
  const wrappedColors = ['#f7931a', '#6366f1', '#ef4444'];
  const zoneMeta = [
    { angle: -90,  color: '#f59e0b' },
    { angle: -30,  color: '#6366f1' },
    { angle: 30,   color: '#8b5cf6' },
    { angle: 90,   color: '#ec4899' },
    { angle: 150,  color: '#ef4444' },
    { angle: -150, color: '#10b981' },
  ];
  const useCaseMeta = [
    { emoji: '💱', color: '#6366f1' },
    { emoji: '₿',  color: '#f7931a' },
    { emoji: '💵', color: '#10b981' },
    { emoji: '🎮', color: '#ec4899' },
    { emoji: '🏢', color: '#0EA5E9' },
    { emoji: '🌍', color: '#f59e0b' },
  ];
  // Island map for the opening slide — positions in a 480×240 viewBox.
  const islands = [
    { name: 'Bitcoin',  x: 80,  y: 62,  color: '#f7931a' },
    { name: 'Ethereum', x: 240, y: 62,  color: '#627EEA' },
    { name: 'Solana',   x: 400, y: 62,  color: '#9945FF' },
    { name: 'Fabric',   x: 160, y: 160, color: '#0EA5E9' },
    { name: 'XRPL',     x: 320, y: 160, color: '#06b6d4' },
  ];
  const islandGaps: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4]];
  const problemColors = ['#f7931a', '#ef4444', '#8b5cf6'];
  // The three ways to connect chains — one at-a-glance card each; `to` is the slide where the detail lives.
  const ways: { kind: WayKind; accent: string; to: string; group: string }[] = [
    { kind: 'bridge', accent: '#f59e0b', to: 's4-bridges', group: 'g-s4-bridges' },
    { kind: 'ibc', accent: '#22d3ee', to: 's4-cosmos', group: 'g-s4-cosmos' },
    { kind: 'l0', accent: '#6366f1', to: 's4-layer0', group: 'g-s4-l0' },
  ];
  const wayCards = t('interopCompare.ways', { returnObjects: true }) as WayItem[];

  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber={t('title.sectionNumber')}
            title={t('title.title')}
            subtitle={t('title.subtitle')}
            icon={<Network className="size-20 text-[#22d3ee]" />}
            gradient="from-[#22d3ee] to-[#6366f1]"
          />
        </div>

        {/* ═══════ S4-CLOSED — every chain is a closed system, even on the internet ═══════ */}
        <div id="s4-closed" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-1">{t('closed.heading')}</h2>
            <p className="text-sm lg:text-base text-muted-foreground max-w-4xl">{t('closed.subtitle')}</p>
            <div className="mt-2">
              <RecapHandoff label={recapLabel} text={t('interop.recap')} color="#39B54A" />
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 min-h-0">
            {/* Left — island map (all online, none linked) + analogy */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex-1 min-h-[220px] rounded-xl border border-border bg-card/40 p-3 flex flex-col">
                <svg viewBox="0 0 480 256" className="w-full flex-1 min-h-0">
                  {/* Every island is plugged into the same internet… */}
                  {islands.map((isl) => (
                    <line key={isl.name} x1={isl.x} y1={isl.y + 30} x2={isl.x} y2="222" stroke="var(--muted-foreground)" strokeWidth="1" opacity="0.45" />
                  ))}
                  <rect x="20" y="222" width="440" height="26" rx="6" fill="var(--muted)" stroke="var(--muted-foreground)" strokeWidth="1" strokeOpacity="0.5" />
                  <text x="240" y="239" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--foreground)">🌐 {t('closed.svg.internet')}</text>

                  {/* …but there is no link between any two of them */}
                  {islandGaps.map(([a, b], i) => {
                    const A = islands[a], B = islands[b];
                    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
                    return (
                      <g key={i}>
                        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
                        <circle cx={mx} cy={my} r="8" fill="var(--card)" stroke="#ef4444" strokeWidth="1" />
                        <text x={mx} y={my + 3.5} textAnchor="middle" fontSize="9" fontWeight="900" fill="#ef4444">✕</text>
                      </g>
                    );
                  })}
                  {islands.map((isl) => (
                    <g key={isl.name}>
                      <circle cx={isl.x} cy={isl.y} r="30" fill="var(--card)" />
                      <circle cx={isl.x} cy={isl.y} r="30" fill={isl.color + '22'} stroke={isl.color} strokeWidth="1.5" />
                      {/* its own validators, on its own shore */}
                      {[0, 1, 2, 3, 4, 5].map((k) => {
                        const a = (k * 60 - 90) * (Math.PI / 180);
                        return <circle key={k} cx={isl.x + 30 * Math.cos(a)} cy={isl.y + 30 * Math.sin(a)} r="3.2" fill={isl.color} stroke="var(--card)" strokeWidth="1" />;
                      })}
                      <text x={isl.x} y={isl.y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill={isl.color}>{isl.name}</text>
                    </g>
                  ))}
                  {/* A coin trying — and failing — to swim across */}
                  <motion.g animate={{ x: [0, 20, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}>
                    <circle cx="124" cy="62" r="7.5" fill="#facc15" stroke="#a16207" strokeWidth="1.2" />
                    <text x="124" y="65.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#7c2d12">₿</text>
                  </motion.g>
                </svg>
                <p className="text-[11px] text-muted-foreground text-center shrink-0 mt-1">
                  <span className="font-bold">●</span> {t('closed.svg.validators')} · <span className="font-bold text-[#ef4444]">✕</span> {t('interop.svg.noLink')} — {t('interop.svg.caption')}
                </p>
              </div>
              <div className="shrink-0 rounded-xl border-2 px-3 py-2 flex items-center gap-3" style={{ borderColor: '#f59e0b80', backgroundColor: '#f59e0b12' }}>
                <span className="text-xl leading-none shrink-0">🌐</span>
                <p className="text-sm lg:text-base font-black text-foreground leading-tight">{t('closed.notEqual')}</p>
                <p className="text-xs text-muted-foreground leading-snug">{t('closed.notEqualSub')}</p>
              </div>
              <div className="shrink-0 rounded-xl border p-3" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee0d' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#22d3ee]">{t('interop.analogyLabel')}</p>
                <p className="text-sm text-foreground mt-1 leading-snug">{t('interop.analogy')}</p>
              </div>
            </div>

            {/* Right — how a chain stays closed, and why */}
            <div className="flex flex-col gap-2.5 min-h-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground shrink-0">{t('closed.howLabel')}</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {closedCards.map((card) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3 p-3 bg-card rounded-xl border border-[#22d3ee]/20 min-h-0 items-start"
                  >
                    <span className="text-xl lg:text-2xl flex-shrink-0">{card.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-sm lg:text-base font-semibold text-foreground">{card.title}</p>
                      <p className="text-xs lg:text-sm text-muted-foreground mt-0.5 leading-snug">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="shrink-0 rounded-xl border p-3" style={{ borderColor: '#39B54A60', backgroundColor: '#39B54A10' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#39B54A]">{t('closed.whyLabel')}</p>
                <p className="text-sm text-foreground mt-1 leading-snug">{t('closed.why')}</p>
              </div>
              <UnderTheHood label={hoodLabel} terms={['validator set', 'consensus', 'state', 'finality']} className="self-start" />
            </div>
          </div>
          {kp('s4-closed')}
        </div>

        {/* ═══════ S4-INTEROP — why they must talk: the three problems that follow ═══════ */}
        <div id="s4-interop" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-1">{t('interop.heading')}</h2>
            <p className="text-sm lg:text-base text-muted-foreground max-w-4xl">{t('interop.subtitle')}</p>
          </div>

          <div className="shrink-0 mb-2">
            <h3 className="text-base lg:text-lg font-semibold text-foreground">{t('interop.islands.title')}</h3>
            <p className="text-xs lg:text-sm text-muted-foreground">{t('interop.islands.intro')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {islandCards.map((card, i) => {
              const color = problemColors[i];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="min-h-0 rounded-xl border-2 p-4 flex flex-col gap-3"
                  style={{ borderColor: color + '55', backgroundColor: color + '08' }}
                >
                  <div className="flex-1 min-h-[110px] rounded-lg border border-border bg-card/60 p-2">
                    <svg viewBox="0 0 240 120" className="w-full h-full">
                      {i === 0 && (
                        <>
                          {/* a bitcoin that cannot reach an Ethereum app */}
                          <text x="55" y="16" textAnchor="middle" fontSize="10" fontWeight="900" fill="#f7931a">Bitcoin</text>
                          <rect x="10" y="24" width="90" height="84" rx="8" fill="#f7931a14" stroke="#f7931a" strokeWidth="1.5" />
                          <circle cx="55" cy="66" r="16" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
                          <text x="55" y="72" textAnchor="middle" fontSize="17" fontWeight="900" fill="#7c2d12">₿</text>
                          <text x="185" y="16" textAnchor="middle" fontSize="10" fontWeight="900" fill="#627EEA">{t('interop.visuals.ethApp')}</text>
                          <rect x="140" y="24" width="90" height="84" rx="8" fill="#627EEA14" stroke="#627EEA" strokeWidth="1.5" />
                          <text x="185" y="76" textAnchor="middle" fontSize="28">🏦</text>
                          <line x1="76" y1="66" x2="108" y2="66" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="4 3" />
                          <circle cx="120" cy="66" r="10" fill="var(--card)" stroke="#ef4444" strokeWidth="1.5" />
                          <text x="120" y="70" textAnchor="middle" fontSize="11" fontWeight="900" fill="#ef4444">✕</text>
                        </>
                      )}
                      {i === 1 && (
                        <>
                          {/* a connector between two chains, with a hole in the middle */}
                          <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="900" fill="#ef4444">{t('interop.visuals.lost')}</text>
                          <rect x="10" y="58" width="56" height="50" rx="6" fill="#f59e0b14" stroke="#f59e0b" strokeWidth="1.5" />
                          <text x="38" y="87" textAnchor="middle" fontSize="10" fontWeight="900" fill="#f59e0b">{t('interop.visuals.chainA')}</text>
                          <rect x="174" y="58" width="56" height="50" rx="6" fill="#6366f114" stroke="#6366f1" strokeWidth="1.5" />
                          <text x="202" y="87" textAnchor="middle" fontSize="10" fontWeight="900" fill="#6366f1">{t('interop.visuals.chainB')}</text>
                          <path d="M 66 66 H 104 l 4 6" fill="none" stroke="var(--muted-foreground)" strokeWidth="3" strokeLinecap="round" />
                          <path d="M 174 66 H 136 l -4 6" fill="none" stroke="var(--muted-foreground)" strokeWidth="3" strokeLinecap="round" />
                          <path d="M 66 66 Q 86 38 104 66 M 174 66 Q 154 38 136 66" fill="none" stroke="var(--muted-foreground)" strokeWidth="1" />
                          {[[120, 74], [114, 90], [127, 102]].map(([cx, cy]) => (
                            <circle key={cy} cx={cx} cy={cy} r="5" fill="#facc15" stroke="#a16207" strokeWidth="1" />
                          ))}
                        </>
                      )}
                      {i === 2 && (
                        <>
                          {/* the same token, priced differently on two chains */}
                          <text x="58" y="16" textAnchor="middle" fontSize="10" fontWeight="900" fill="#22d3ee">{t('interop.visuals.marketA')}</text>
                          <rect x="10" y="24" width="96" height="62" rx="8" fill="#22d3ee14" stroke="#22d3ee" strokeWidth="1.5" />
                          <text x="58" y="63" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--foreground)">$1.00</text>
                          <text x="182" y="16" textAnchor="middle" fontSize="10" fontWeight="900" fill="#8b5cf6">{t('interop.visuals.marketB')}</text>
                          <rect x="134" y="24" width="96" height="62" rx="8" fill="#8b5cf614" stroke="#8b5cf6" strokeWidth="1.5" />
                          <text x="182" y="63" textAnchor="middle" fontSize="20" fontWeight="900" fill="var(--foreground)">$1.03</text>
                          <text x="120" y="62" textAnchor="middle" fontSize="18" fontWeight="900" fill="#ef4444">≠</text>
                          <text x="120" y="106" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">{t('interop.visuals.sameToken')}</text>
                        </>
                      )}
                    </svg>
                  </div>
                  <div className="shrink-0 lg:min-h-[156px]">
                    <p className="text-lg font-bold text-foreground leading-tight"><span className="mr-2">{card.emoji}</span>{card.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="shrink-0 mt-3">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{t('interop.matters.solutionsLabel')}</p>
            <div className="grid grid-cols-3 gap-2">
              {mattersSolutions.map((s, i) => {
                const color = ['#f59e0b', '#22d3ee', '#6366f1'][i];
                return (
                  <div key={s.label} className="p-2 bg-card rounded-lg border text-center" style={{ borderColor: `${color}40` }}>
                    <p className="text-xs lg:text-sm font-semibold" style={{ color }}>{s.label}</p>
                    <p className="text-[10px] lg:text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {kp('s4-interop')}
        </div>

        {/* ═══════ S4-USECASES — real-world situations ═══════ */}
        <div id="s4-usecases" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('usecases.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('usecases.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
            {useCases.map((u, i) => {
              const { emoji, color } = useCaseMeta[i % useCaseMeta.length];
              return (
                <motion.div
                  key={u.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl border-2 p-4 flex flex-col gap-2 min-h-0"
                  style={{ borderColor: color + '50', backgroundColor: color + '08' }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl leading-none">{emoji}</span>
                    <p className="font-bold text-lg text-foreground leading-tight">{u.title}</p>
                  </div>
                  <p className="text-base text-muted-foreground leading-snug flex-1">{u.scenario}</p>
                  <div className="shrink-0 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>{t('usecases.howLabel')}</span>
                    <span className="text-[11px] font-semibold text-foreground">{u.how}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {kp('s4-usecases')}
        </div>

        {/* ═══════ S4-WAYS — three ways to connect, at a glance (the detail lives in each deep dive) ═══════ */}
        <div id="s4-ways" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('interopCompare.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('interopCompare.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
            {ways.map((w, i) => {
              const c = wayCards[i];
              return (
                <motion.div
                  key={w.kind}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="min-h-0 rounded-xl border-2 p-5 flex flex-col gap-4"
                  style={{ borderColor: w.accent + '60', backgroundColor: w.accent + '0a' }}
                >
                  <div className="shrink-0 flex items-center gap-2.5">
                    <span className="size-7 shrink-0 rounded-full border flex items-center justify-center text-sm font-black" style={{ color: w.accent, borderColor: w.accent, backgroundColor: w.accent + '1f' }}>{i + 1}</span>
                    <p className="text-xl lg:text-2xl font-black text-foreground leading-tight">{c.name}</p>
                  </div>
                  <div className="flex-1 min-h-[80px] rounded-lg border border-border bg-card/60 p-3 flex items-center justify-center">
                    <WayGlyph kind={w.kind} color={w.accent} />
                  </div>
                  <div className="shrink-0">
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: w.accent }}>{t('interopCompare.howLabel')}</p>
                    <p className="text-base lg:text-lg text-foreground leading-snug mt-0.5">{c.how}</p>
                  </div>
                  <div className="shrink-0 rounded-lg border px-3 py-2.5" style={{ borderColor: w.accent + '55', backgroundColor: w.accent + '14' }}>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: w.accent }}>{t('interopCompare.trustLabel')}</p>
                    <p className="text-base font-semibold text-foreground leading-snug mt-0.5">{c.trust}</p>
                  </div>
                  <p className="shrink-0 text-sm italic text-muted-foreground leading-snug">{c.analogy}</p>
                  <button
                    type="button"
                    onClick={() => document.getElementById(w.to)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="shrink-0 self-start text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {t('interopCompare.moreLabel')} · <span className="font-bold text-foreground">{t(`groups.${w.group}`)}</span> →
                  </button>
                </motion.div>
              );
            })}
          </div>
          {kp('s4-ways')}
        </div>

        {/* ═══════ S4-CHOOSER — interactive: how should these two chains talk? ═══════ */}
        <div id="s4-chooser" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#22d3ee]/15 border border-[#22d3ee]/40 text-[#22d3ee] text-xs font-bold">{t('chooser.badge')}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{t('chooser.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('chooser.subtitle')}</p>
          </div>
          <InteropChooser />
          {kp('s4-chooser')}
        </div>

        {/* ═══════ S4-BRIDGES — what a bridge is & how it works (concept + animated mechanism) ═══════ */}
        <BridgeHowSlide hoodLabel={hoodLabel} keyPoint={kp('s4-bridges')} />

        {/* ═══════ S4-WRAPPED — what a wrapped token is ═══════ */}
        <div id="s4-wrapped" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t('wrapped.heading')}</h2>
            <p className="text-sm text-muted-foreground max-w-4xl">{t('wrapped.subtitle')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">

            {/* Visual — real coin, issuer in the middle, IOU on the other chain */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="flex-1 min-h-[220px] rounded-xl border border-border bg-card/40 p-3 flex flex-col">
                <svg viewBox="0 0 480 220" className="w-full flex-1">
                  {/* Source chain — the real coin */}
                  <rect x="15" y="60" width="130" height="130" rx="10" fill="#f7931a14" stroke="#f7931a" strokeWidth="1.5" />
                  <text x="80" y="50" textAnchor="middle" fontSize="11" fontWeight="900" fill="#f7931a">{t('wrapped.svg.sourceChain')}</text>
                  <text x="80" y="104" textAnchor="middle" fontSize="26">🔒</text>
                  <text x="80" y="138" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--foreground)">{t('wrapped.svg.sourceAsset')}</text>
                  <text x="80" y="156" textAnchor="middle" fontSize="8.5" fill="var(--muted-foreground)">{t('wrapped.svg.sourceNote')}</text>

                  {/* Issuer — controls mint, burn and pause */}
                  <rect x="170" y="22" width="140" height="68" rx="10" fill="#ef444412" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="240" y="44" textAnchor="middle" fontSize="11" fontWeight="900" fill="#ef4444">{t('wrapped.svg.issuer')}</text>
                  <text x="240" y="60" textAnchor="middle" fontSize="8.5" fill="var(--muted-foreground)">{t('wrapped.svg.issuerNote')}</text>
                  <text x="240" y="78" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ef4444">{t('wrapped.svg.issuerPowers')}</text>
                  <line x1="240" y1="90" x2="240" y2="108" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 3" />

                  {/* deposit → mint */}
                  <line x1="150" y1="118" x2="324" y2="118" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
                  <polygon points="324,113 334,118 324,123" fill="#10b981" />
                  <text x="240" y="131" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981">{t('wrapped.svg.mint')}</text>
                  {/* burn → withdraw */}
                  <line x1="330" y1="160" x2="156" y2="160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
                  <polygon points="156,155 146,160 156,165" fill="#f59e0b" />
                  <text x="240" y="173" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f59e0b">{t('wrapped.svg.burn')}</text>

                  {/* Target chain — the IOU */}
                  <rect x="335" y="60" width="130" height="130" rx="10" fill="#6366f114" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="400" y="50" textAnchor="middle" fontSize="11" fontWeight="900" fill="#6366f1">{t('wrapped.svg.targetChain')}</text>
                  <text x="400" y="104" textAnchor="middle" fontSize="26">🎟️</text>
                  <text x="400" y="138" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--foreground)">{t('wrapped.svg.targetAsset')}</text>
                  <text x="400" y="156" textAnchor="middle" fontSize="8.5" fill="var(--muted-foreground)">{t('wrapped.svg.targetNote')}</text>
                </svg>
                <p className="text-[11px] text-muted-foreground leading-snug shrink-0 mt-1">{t('wrapped.svg.caption')}</p>
              </div>
              <div className="shrink-0 rounded-lg border p-2.5" style={{ borderColor: '#22d3ee60', backgroundColor: '#22d3ee10' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#22d3ee]">{t('wrapped.noteLabel')}</p>
                <p className="text-xs text-foreground leading-snug mt-0.5">{t('wrapped.note')}</p>
              </div>
            </div>

            {/* What it is · who can redeem · who can freeze */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {wrappedCards.map((c, i) => {
                  const color = wrappedColors[i];
                  return (
                    <div key={c.title} className="min-h-0 flex gap-3 p-3 bg-card border rounded-xl items-start" style={{ borderColor: color + '40' }}>
                      <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <div className="min-w-0">
                        <div className="font-bold text-sm mb-0.5" style={{ color }}>{c.title}</div>
                        <div className="text-xs lg:text-sm text-muted-foreground leading-snug">{c.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <UnderTheHood label={hoodLabel} terms={['custodian', 'mint / burn', 'merchant', 'pausable contract', 'proof of reserves']} className="self-start" />
            </div>
          </div>
          {kp('s4-wrapped')}
        </div>

        {/* ═══════ S4-BRIDGE-RISK — why the design is risky, and what safer looks like ═══════ */}
        <div id="s4-bridge-risk" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t('bridgeRisk.heading')}</h2>
            <p className="text-sm text-muted-foreground max-w-4xl">{t('bridgeRisk.subA')}<span className="font-semibold text-foreground">{t('bridgeRisk.subAmount')}</span>{t('bridgeRisk.subB')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* The honeypot — one vault backs every copy */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground shrink-0">{t('bridgeRisk.vault.label')}</div>
              <div className="flex-1 min-h-[220px] rounded-xl border border-border bg-card/40 p-3 flex flex-col">
                <BridgeVaultRiskDiagram />
                <p className="text-xs text-muted-foreground leading-snug shrink-0 mt-1 text-center">{t('bridgeRisk.vault.caption')}</p>
              </div>
              <div className="shrink-0 rounded-lg border p-2.5" style={{ borderColor: '#f59e0b60', backgroundColor: '#f59e0b10' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">{t('bridgeRisk.honestLabel')}</p>
                <p className="text-xs lg:text-sm text-foreground leading-snug mt-0.5">{t('bridgeRisk.honest')}</p>
              </div>
            </div>

            {/* Why risky (3) + what safer looks like (3) */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground shrink-0">{t('bridgeRisk.dangerLabel')}</div>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {bridgeDangers.slice(0, 3).map(r => (
                  <div key={r.title} className="min-h-0 p-2.5 bg-card border border-border rounded-xl flex gap-2.5 items-start">
                    <span className="text-xl shrink-0 leading-none">{r.icon}</span>
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-foreground mb-0.5">{r.title}</div>
                      <div className="text-xs text-muted-foreground leading-snug">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground shrink-0 mt-1">{t('bridgeRisk.saferLabel')}</div>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {[0, 1, 2].map((idx) => {
                  const p = bridgeSafer[idx];
                  if (!p) return null;
                  const color = saferColors[idx];
                  return (
                    <div key={p.title} className={`min-h-0 flex gap-2.5 p-2.5 bg-card border rounded-xl items-start ${idx === 2 ? 'lg:pr-14' : ''}`} style={{ borderColor: color + '30' }}>
                      <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <div className="min-w-0">
                        <div className="font-bold text-sm mb-0.5" style={{ color }}>{p.title}</div>
                        <div className="text-xs text-muted-foreground leading-snug">{p.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {kp('s4-bridge-risk')}
        </div>

        {/* ═══════ S4-BRIDGE-HACKS — why bridges are targets (visual), then the four largest as evidence ═══════ */}
        <div id="s4-bridge-hacks" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t('bridgeHacks.heading')}</h2>
            <p className="text-sm text-muted-foreground max-w-4xl">{t('bridgeHacks.subtitle')}</p>
          </div>

          {/* WHY — one vault, a few keys */}
          <div className="shrink-0 rounded-xl border-2 p-3 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4 items-center" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b08' }}>
            <div className="h-[215px] min-w-0">
              <HoneypotDiagram />
            </div>
            <div className="flex flex-col gap-2 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">{t('bridgeHacks.why.label')}</p>
              {bridgeWhyPoints.map((p) => (
                <div key={p.title} className="flex gap-2.5 items-start">
                  <span className="text-xl leading-none shrink-0">{p.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground leading-tight">{p.title}</p>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EVIDENCE — the four largest */}
          <p className="shrink-0 mt-3 mb-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('bridgeHacks.evidenceLabel')}</p>
          <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {bridgeHacks.map((h, i) => {
              const color = hackColors[i];
              return (
                <motion.div
                  key={h.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="min-h-0 rounded-xl border-2 p-3.5 flex flex-col gap-1"
                  style={{ borderColor: color + '55', backgroundColor: color + '08' }}
                >
                  <div className="flex items-baseline justify-between gap-2 shrink-0">
                    <p className="text-base font-bold text-foreground leading-tight">{h.name}</p>
                    <p className="text-2xl font-black shrink-0" style={{ color }}>{h.amount}</p>
                  </div>
                  <p className="text-xs text-muted-foreground shrink-0">{h.year} · {h.chain}</p>
                  <div className="flex-1 min-h-0 mt-1.5 rounded-lg border bg-card p-3 flex flex-col justify-center gap-1" style={{ borderColor: color + '40' }}>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{t('bridgeHacks.whatWentWrong')}</p>
                    <p className="text-sm lg:text-base text-foreground leading-snug">{h.method}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* Safety takeaway — closes the bridge → wrapped token → risk → hacks arc */}
          <div className="shrink-0 mt-3 flex items-center gap-3 pl-4 pr-14 py-2.5 rounded-xl border-2" style={{ borderColor: '#39B54A80', backgroundColor: '#39B54A14' }}>
            <ShieldCheck className="w-6 h-6 shrink-0 text-[#39B54A]" aria-hidden />
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#39B54A]">{t('bridgeHacks.takeawayLabel')}</p>
              <p className="text-base font-bold text-foreground leading-snug">{t('bridgeHacks.takeaway')}</p>
            </div>
          </div>
          {kp('s4-bridge-hacks')}
        </div>

        {/* ═══════ S4-LAYER0 (1/2) — Animated Concept ═══════ */}
        <div id="s4-layer0" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('layer0.heading')}</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              {t('layer0.leadA')}<strong className="text-foreground">{t('layer0.leadStrong')}</strong>{t('layer0.leadB')}<em>{t('layer0.leadEm')}</em>{t('layer0.leadC')}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <RecapHandoff label={recapLabel} text="Section 02 · Rollups & L2s" to="/blockchain-platforms/section-2" color="#39B54A" />
              <UnderTheHood label={hoodLabel} terms={['relay chain', 'parachain', 'XCM', 'Warp', 'restaking']} />
            </div>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
            {/* Left: animated stack */}
            <Layer0AnimatedStack />

            {/* Right: what L0 provides */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="rounded-xl border p-3" style={{ borderColor: '#22d3ee55', backgroundColor: '#22d3ee0d' }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#22d3ee' }}>{t('layer0.inOneLineLabel')}</p>
                <p className="text-sm text-foreground mt-1 leading-snug">
                  {t('layer0.inOneLine')}
                </p>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">{t('layer0.providesLabel')}</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {layer0Provides.map(c => (
                  <div key={c.title} className="rounded-lg border border-[#22d3ee]/30 bg-card p-2.5 flex items-start gap-2.5 min-h-0">
                    <span className="text-lg shrink-0 leading-none mt-0.5">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground">{c.title}</p>
                      <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <TrustRisk trust={t('layer0.trust')} risk={t('layer0.risk')} />
            </div>
          </div>
          {kp('s4-layer0')}
        </div>

        {/* ═══════ S4-LAYER0 (2/2) — Platforms & the shared-vs-sovereign trade-off ═══════ */}
        <div id="s4-layer0-2" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('layer02.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('layer02.subtitle')}</p>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-5 min-h-0">

            {/* Left — the platforms, each tagged with its model */}
            <div className="flex flex-col gap-2.5 min-h-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground shrink-0">{t('layer02.platformsLabel')}</p>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2.5">
                {layer0Platforms.map((p, i) => {
                  const meta = platformMeta[i];
                  const mc = modelColors[meta.model];
                  return (
                    <div key={p.name} className="rounded-xl px-4 py-3 min-h-0 flex flex-col justify-center gap-1.5 border" style={{ borderColor: meta.color + '55', backgroundColor: meta.color + '08' }}>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-base">{meta.emoji}</span>
                        <p className="text-base font-bold text-foreground">{p.name}</p>
                        <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: meta.color + '18', color: meta.color, border: `1px solid ${meta.color}35` }}>{meta.token}</span>
                        <span className="ml-auto text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap" style={{ color: mc, borderColor: mc + '66', backgroundColor: mc + '14' }}>{t(`layer02.modelTags.${meta.model}`)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-snug">{p.tagline}</p>
                    </div>
                  );
                })}
              </div>
              <div className="shrink-0 rounded-lg border border-border bg-muted/30 px-3 py-2">
                <p className="text-xs text-muted-foreground leading-snug"><span className="font-black uppercase tracking-wider text-[10px] text-foreground mr-1.5">⚠️ {t('layer02.notL0Label')}</span>{t('layer02.notL0')}</p>
              </div>
            </div>

            {/* Right — the trade-off: two models side by side, then where each platform sits */}
            <div className="flex flex-col gap-2.5 min-h-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground shrink-0">{t('layer02.tradeoffLabel')}</p>
              <div className="flex-1 min-h-0 grid grid-cols-2 gap-3">
                {layer0Models.map((m, i) => {
                  const c = i === 0 ? modelColors.shared : modelColors.sovereign;
                  return (
                    <div key={m.title} className="min-h-0 rounded-xl border-2 p-4 flex flex-col gap-3" style={{ borderColor: c + '80', backgroundColor: c + '0d' }}>
                      <div className="shrink-0">
                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: c }}>{m.sub}</p>
                        <p className="text-xl font-black text-foreground leading-tight mt-0.5"><span className="mr-1.5">{i === 0 ? '🏢' : '🏗️'}</span>{m.title}</p>
                      </div>
                      <ModelPictogram kind={i === 0 ? 'shared' : 'sovereign'} color={c} />
                      <ul className="flex-1 min-h-0 flex flex-col justify-center gap-2.5">
                        {m.pros.map((pro) => (
                          <li key={pro} className="flex gap-2 text-sm text-foreground leading-snug"><span className="font-black text-[#10b981] shrink-0">✓</span>{pro}</li>
                        ))}
                        <li className="flex gap-2 text-sm text-foreground leading-snug"><span className="font-black text-[#ef4444] shrink-0">✕</span>{m.con}</li>
                      </ul>
                      <div className="shrink-0 rounded-lg border bg-card px-2.5 py-2" style={{ borderColor: c + '40' }}>
                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: c }}>{t('layer02.examplesLabel')}</p>
                        <p className="text-sm font-semibold text-foreground leading-snug mt-0.5">{m.examples}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="shrink-0 rounded-xl border border-border bg-card px-5 pt-4 pb-2.5">
                <div className="relative h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${modelColors.shared}, ${modelColors.sovereign})` }}>
                  {layer0Platforms.map((p, i) => (
                    <span key={p.name} className="absolute top-1/2 size-3.5 rounded-full border-2 border-card -translate-x-1/2 -translate-y-1/2" style={{ left: `${spectrumPos[i]}%`, backgroundColor: platformMeta[i].color }} />
                  ))}
                </div>
                <div className="relative h-5 mt-2">
                  {layer0Platforms.map((p, i) => (
                    <span key={p.name} className="absolute -translate-x-1/2 text-xs font-bold text-foreground whitespace-nowrap" style={{ left: `${spectrumPos[i]}%` }}>{p.name}</span>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mt-1 lg:pr-12">
                  <span style={{ color: modelColors.shared }}>← {t('layer02.spectrum.left')}</span>
                  <span style={{ color: modelColors.sovereign }}>{t('layer02.spectrum.right')} →</span>
                </div>
              </div>
            </div>
          </div>
          {kp('s4-layer0-2')}
        </div>

        {/* ═══════ S4-COSMOS ═══════ */}
        <div id="s4-cosmos" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              {t('cosmos.heading')}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t('cosmos.subtitle')}
            </p>
            <UnderTheHood label={hoodLabel} terms={['light client', 'block header', 'Merkle proof', 'relayer']} className="mt-2" />
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0">

            {/* Left — Architecture visual */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="flex items-center gap-2 shrink-0">
                <div className="size-2 rounded-full bg-[#22d3ee]" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground">{t('cosmos.archTitle')}</h3>
                <span className="ml-auto text-xs text-muted-foreground italic">{t('cosmos.archNote')}</span>
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
                    <span className="text-[11px] lg:text-xs font-black text-[#22d3ee] leading-tight">{t('cosmos.hubName1')}</span>
                    <span className="text-[11px] lg:text-xs font-black text-[#22d3ee] leading-tight">{t('cosmos.hubName2')}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">{t('cosmos.hubToken')}</p>
                </div>

                {/* Zone satellites */}
                {cosmosZones.map(({ label, purpose }, zi) => {
                  const { angle, color } = zoneMeta[zi];
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
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap font-medium">{purpose}</span>
                    </div>
                  );
                })}
              </div>

              {/* Metric strip */}
              <div className="grid grid-cols-3 gap-2 shrink-0">
                {cosmosMetrics.map(s => (
                  <div key={s.label} className="px-2 py-1.5 rounded-lg border border-[#22d3ee]/30 bg-[#22d3ee]/5 text-center">
                    <div className="text-sm font-black text-[#22d3ee] leading-none">{s.metric}</div>
                    <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* IBC: who you trust, and where it breaks */}
              <TrustRisk trust={t('cosmos.trust')} risk={t('cosmos.risk')} />
            </div>

            {/* Right — Properties + token role + IBC reach */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="flex items-center gap-2 shrink-0">
                <div className="size-2 rounded-full bg-[#6366f1]" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground">{t('cosmos.propertiesTitle')}</h3>
              </div>

              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {cosmosProperties.map((card) => (
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
                      <p className="text-sm lg:text-base font-semibold text-foreground leading-tight">{card.title}</p>
                      <p className="text-xs lg:text-[13px] text-muted-foreground mt-0.5 leading-snug">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* One example + IBC reach beyond Cosmos */}
              <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#22d3ee]/5 rounded-lg border border-[#22d3ee]/30">
                  <p className="text-xs font-bold text-[#22d3ee] mb-1">{t('cosmos.dydxLabel')}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{t('cosmos.dydx')}</p>
                </div>
                <div className="p-2.5 bg-[#6366f1]/5 rounded-lg border border-[#6366f1]/30">
                  <p className="text-xs font-bold text-[#6366f1] mb-1 flex items-center gap-1.5">
                    <span>🔗</span> {t('cosmos.beyondTitle')}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {t('cosmos.beyondBodyA')}<span className="font-semibold text-foreground">{t('cosmos.beyondBodyStrong')}</span>{t('cosmos.beyondBodyB')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {kp('s4-cosmos')}
        </div>

        {/* ═══════ S4-XRP (1/2) — what XRPL is & why it is different ═══════ */}
        <div id="s4-xrp" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#06b6d4]/15 border border-[#06b6d4]/40 text-[#06b6d4] text-xs font-bold">{t('xrp.badgePartner')}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">{t('xrp.heading')}</h2>
            <p className="text-sm text-muted-foreground max-w-4xl">{t('xrp.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
            {/* Left — general-purpose platform vs purpose-built rail */}
            <div className="flex flex-col gap-2 min-h-0">
              <p className="shrink-0 text-xs font-black uppercase tracking-widest text-muted-foreground">{t('xrp.compareLabel')}</p>
              <div className="flex-1 min-h-0 grid grid-cols-2 gap-3">
                {(['general', 'rail'] as const).map((side) => {
                  const rail = side === 'rail';
                  const c = rail ? '#06b6d4' : '#8b5cf6';
                  const items = t(`xrp.${side}.items`, { returnObjects: true }) as string[];
                  return (
                    <div key={side} className="min-h-0 rounded-xl border-2 p-3.5 flex flex-col gap-2" style={{ borderColor: c + (rail ? 'AA' : '55'), backgroundColor: c + '0d' }}>
                      <div className="shrink-0">
                        <p className="text-base lg:text-lg font-black leading-tight" style={{ color: c }}>{t(`xrp.${side}.title`)}</p>
                        <p className="text-xs text-muted-foreground">{t(`xrp.${side}.example`)}</p>
                      </div>
                      <p className="shrink-0 text-sm text-foreground leading-snug">{t(`xrp.${side}.body`)}</p>
                      {rail ? (
                        <div className="flex-1 min-h-0 flex flex-col justify-center gap-1.5">
                          {items.map((it) => (
                            <div key={it} className="flex items-center gap-2 rounded-md px-2.5 py-1 text-sm font-bold text-white" style={{ backgroundColor: c }}>
                              <span aria-hidden>▸</span>{it}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex-1 min-h-0 flex flex-wrap content-center gap-1.5">
                          {items.map((it, i) => {
                            const ic = generalItemColors[i % generalItemColors.length];
                            return (
                              <span key={it} className="rounded-md border border-dashed px-2 py-1 text-xs font-semibold" style={{ borderColor: ic, color: ic, backgroundColor: ic + '12' }}>
                                <span className="font-mono opacity-70 mr-1" aria-hidden>{'{ }'}</span>{it}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <p className="shrink-0 text-xs font-semibold text-foreground leading-snug">{t(`xrp.${side}.foot`)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="shrink-0 rounded-xl border p-3" style={{ borderColor: '#06b6d455', backgroundColor: '#06b6d40d' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#06b6d4]">{t('xrp.analogyLabel')}</p>
                <p className="text-sm text-foreground mt-0.5 leading-snug">{t('xrp.analogy')}</p>
              </div>
            </div>

            {/* Right — why it is different + four numbers */}
            <div className="flex flex-col gap-2 min-h-0">
              <p className="shrink-0 text-xs font-black uppercase tracking-widest text-muted-foreground">{t('xrp.whyLabel')}</p>
              <div className="shrink-0 grid grid-cols-4 gap-2">
                {xrpStats.map((st) => (
                  <div key={st.label} className="px-2 py-1.5 rounded-lg border border-[#06b6d4]/30 bg-[#06b6d4]/5 text-center">
                    <div className="text-base font-black text-[#06b6d4] leading-none whitespace-nowrap">{st.metric}</div>
                    <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider leading-tight">{st.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
                {xrpWhy.map((card) => (
                  <div key={card.title} className="min-h-0 flex gap-3 items-start p-3 bg-card rounded-xl border border-[#06b6d4]/25">
                    <span className="text-xl shrink-0 leading-none mt-0.5">{card.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-base lg:text-lg font-bold text-foreground leading-tight">{card.title}</p>
                      <p className="text-sm lg:text-base text-muted-foreground leading-snug mt-1">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {kp('s4-xrp')}
        </div>

        {/* ═══════ S4-XRP (2/2) — how it works: consensus by vote + what it is used for ═══════ */}
        <XrplHowSlide hoodLabel={hoodLabel} keyPoint={kp('s4-xrp-how')} />

        {/* ═══════ S4-LAYERS — the L0 · L1 · L2 stack at a glance ═══════ */}
        <LayersOverview recapLabel={recapLabel} keyPoint={kp('s4-layers')} />

        {/* ═══════ QUIZ ═══════ */}
        <div id="s4-quiz" className="h-full">
          <QuizSlide
            question={t('quiz.question')}
            options={quizOptions.map((text, i) => ({ text, correct: i === 2 }))}
            explanation={t('quiz.explanation')}
            compact
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s4-takeaways" className="h-full">
          <TakeawaySlide
            title={t('takeaways.title')}
            takeaways={takeawayItems}
          />
        </div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
