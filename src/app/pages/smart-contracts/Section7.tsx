import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { GroupedQuiz } from '../../components/templates/GroupedQuiz';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { RecapHandoff } from '../../components/shared/RecapHandoff';
import { EyeOff } from 'lucide-react';
import { PageLabelRow } from '../../components/shared/PageLabel';

const NS = 'smart-contracts/section-7';

/* One arc: public chains leak → the ZK idea → what it does for a business →
   its two jobs and where it stops → how privacy met the law → selective
   disclosure as the way through. */
const chapterShape = [
  { kind: 'group' as const, id: 'g-s7-problem' },
  { id: 's7-public' },

  { kind: 'group' as const, id: 'g-s7-idea' },
  { id: 's7-zk' },
  { id: 's7-waldo' },
  { id: 's7-envelopes' },

  { kind: 'group' as const, id: 'g-s7-business' },
  { id: 's7-kyc' },
  { id: 's7-live' },

  { kind: 'group' as const, id: 'g-s7-scope' },
  { id: 's7-jobs' },
  { id: 's7-limits' },

  { kind: 'group' as const, id: 'g-s7-law' },
  { id: 's7-approaches' },
  { id: 's7-tornado' },
  { id: 's7-disclosure' },

  { kind: 'group' as const, id: 'g-s7-wrap' },
  { id: 's7-quiz' },
  { id: 's7-takeaways' },
] as const;

interface QuizItem { question: string; options: string[]; explanation: string }

// The section quiz, in the order it is asked (it follows the slides): locale block +
// index of its correct option. Question and option text live in the locale files.
const QUIZ = [
  { key: 'quizMore.public', correct: 2 },
  { key: 'quiz', correct: 1 },
  { key: 'quizMore.jobs', correct: 0 },
  { key: 'quizMore.issuer', correct: 3 },
  { key: 'quizMore.crowd', correct: 1 },
  { key: 'quizMore.tornado', correct: 2 },
] as const;

/* ──────────── ZK bouncer demo — pick passport or proof, watch what leaks ──────────── */
function ZkBouncerDemo() {
  const { t } = useTranslation(NS);
  const [mode, setMode] = useState<'idle' | 'passport' | 'proof'>('idle');
  const leaked = t('zkp.demo.leaked', { returnObjects: true }) as string[];
  const accent = mode === 'passport' ? '#ef4444' : mode === 'proof' ? '#39B54A' : '#8b5cf6';
  const optionCls = (active: boolean) =>
    `text-left rounded-xl border-2 px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md font-bold text-sm text-foreground ${active ? 'shadow-md' : ''}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-0">
      {/* You */}
      <div className="rounded-xl border-2 p-4 flex flex-col gap-3 min-h-0" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf608' }}>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-3xl">🧍</span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6]">{t('zkp.demo.youLabel')}</p>
            <p className="text-sm text-muted-foreground">{t('zkp.demo.pick')}</p>
          </div>
        </div>
        <button
          onClick={() => setMode('passport')}
          className={optionCls(mode === 'passport')}
          style={{ borderColor: mode === 'passport' ? '#ef4444' : '#ef444455', backgroundColor: mode === 'passport' ? '#ef444414' : 'var(--card)' }}
        >{t('zkp.demo.passportBtn')}</button>
        <button
          onClick={() => setMode('proof')}
          className={optionCls(mode === 'proof')}
          style={{ borderColor: mode === 'proof' ? '#39B54A' : '#39B54A55', backgroundColor: mode === 'proof' ? '#39B54A14' : 'var(--card)' }}
        >{t('zkp.demo.proofBtn')}</button>
      </div>

      {/* Bouncer */}
      <div className="rounded-xl border-2 p-4 flex flex-col gap-3 min-h-0 transition-colors" style={{ borderColor: accent + '66', backgroundColor: accent + '0a' }}>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-3xl">🕴️</span>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>{t('zkp.demo.bouncerLabel')}</p>
        </div>
        {mode === 'idle' ? (
          <p className="text-sm text-muted-foreground italic">{t('zkp.demo.idle')}</p>
        ) : (
          <>
            <motion.div
              key={`verdict-${mode}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="shrink-0 rounded-lg border-2 px-3 py-2 text-sm font-black"
              style={{ borderColor: '#39B54A', backgroundColor: '#39B54A14', color: '#39B54A' }}
            >{t('zkp.demo.verdict')}</motion.div>
            <div className="flex flex-wrap gap-1.5">
              {leaked.map((f, i) => (
                <motion.span
                  key={`${mode}-${f}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className={`text-xs px-2 py-1 rounded-md border ${mode === 'proof' ? 'line-through text-muted-foreground/60 border-dashed border-border' : 'font-semibold'}`}
                  style={mode === 'passport' ? { borderColor: '#ef444480', backgroundColor: '#ef444414', color: '#ef4444' } : undefined}
                >{mode === 'passport' ? f : `${f} ${t('zkp.demo.hidden')}`}</motion.span>
              ))}
            </div>
            <p className="mt-auto text-xs font-black" style={{ color: accent }}>
              {mode === 'passport' ? t('zkp.demo.leakedCountPassport') : t('zkp.demo.leakedCountProof')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────── Where's Waldo — a four-beat step-through ────────────
   0 claim: the crowded page in plain view · 1 cover: a sheet far bigger than the page
   drops over it and the page is slid somewhere underneath · 2 hole: one small hole,
   Waldo shows through · 3 verdict: convinced he was found, no idea where on the page.
   The sheet is twice the page in each direction with the hole at its centre, so wherever
   Waldo stands the page stays fully hidden and the hole's position gives nothing away. */
const VIEW = { w: 360, h: 300 };
const PAGE = { w: 180, h: 150 };
const HOLE = { x: VIEW.w / 2, y: VIEW.h / 2, r: 17 };
const SHEET = { x: -400, y: -400, w: 1160, h: 1100 }; // bleeds far past the view on every side
const SKIN = ['#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#ffdbac'];
const SHIRT = ['#64748b', '#0891b2', '#f59e0b', '#10b981', '#6366f1', '#a16207', '#dc2626', '#94a3b8'];

interface Person { x: number; y: number; skin: string; shirt: string; waldo: boolean }

// A fixed crowd (seeded, so it is the same on every render): two interleaved rows of people.
const CROWD: Person[] = (() => {
  const out: Person[] = [];
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const layer = (cols: number, rows: number, x0: number, y0: number, waldoAt?: [number, number]) => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        out.push({
          x: x0 + c * 21.5 + (rnd() - 0.5) * 4,
          y: y0 + r * 22.5 + (rnd() - 0.5) * 4,
          skin: SKIN[Math.floor(rnd() * SKIN.length)],
          shirt: SHIRT[Math.floor(rnd() * SHIRT.length)],
          waldo: !!waldoAt && waldoAt[0] === c && waldoAt[1] === r,
        });
      }
    }
  };
  layer(8, 6, 14.75, 15, [6, 1]);
  layer(7, 5, 25.5, 26.25);
  return out.sort((a, b) => a.y - b.y); // people lower on the page overlap those behind
})();
const WALDO = CROWD.find((p) => p.waldo)!;
// Centre of Waldo's figure (head + body), in page coordinates.
const WALDO_C = { x: WALDO.x, y: WALDO.y + 5.5 };
// Where the page could be lying, as far as the verifier can tell (each contains the hole).
const GHOSTS = [
  { x: 10, y: 14, qx: 30, qy: 46 },
  { x: 150, y: 42, qx: 310, qy: 74 },
  { x: 70, y: 118, qx: 230, qy: 252 },
];

function CrowdPerson({ p }: { p: Person }) {
  return (
    <g>
      <rect x={p.x - 4.5} y={p.y + 3.2} width="9" height="11" rx="3" fill={p.waldo ? '#ffffff' : p.shirt} stroke={p.waldo ? '#ED1C24' : '#0f172a'} strokeOpacity={p.waldo ? 1 : 0.25} strokeWidth="0.5" />
      {p.waldo && (
        <>
          <rect x={p.x - 4.5} y={p.y + 6} width="9" height="2" fill="#ED1C24" />
          <rect x={p.x - 4.5} y={p.y + 10} width="9" height="2" fill="#ED1C24" />
        </>
      )}
      <circle cx={p.x} cy={p.y} r="3.6" fill={p.skin} stroke="#0f172a" strokeOpacity="0.25" strokeWidth="0.5" />
      {p.waldo && (
        <>
          <path d={`M${p.x - 3.8} ${p.y - 1.2} a3.8 3.8 0 0 1 7.6 0 z`} fill="#ED1C24" />
          <circle cx={p.x} cy={p.y - 5.3} r="1.2" fill="#ffffff" stroke="#ED1C24" strokeWidth="0.5" />
        </>
      )}
    </g>
  );
}

function WaldoScene({ step, peek, label }: { step: number; peek: boolean; label: string }) {
  const maskId = `waldo-hole-${useId().replace(/:/g, '')}`;
  const covered = step >= 1;
  const holed = step >= 2;
  const verdict = step >= 3;
  // In plain view the page sits in the middle; under the sheet it is slid so Waldo meets the hole.
  const pageX = covered ? HOLE.x - WALDO_C.x : (VIEW.w - PAGE.w) / 2;
  const pageY = covered ? HOLE.y - WALDO_C.y : (VIEW.h - PAGE.h) / 2;
  const grow = { transformOrigin: `${HOLE.x}px ${HOLE.y}px`, transform: `scale(${holed ? 1 : 0})`, transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' };

  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full" role="img" aria-label={label}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h}>
          <rect x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h} fill="#fff" />
          <circle cx={HOLE.x} cy={HOLE.y} r={HOLE.r} fill="#000" style={grow} />
        </mask>
        <pattern id={`${maskId}-weave`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="14" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="5" />
        </pattern>
      </defs>

      {/* The page — it moves only once the sheet has landed, so nobody sees where it goes */}
      <g data-waldo-page style={{ transform: `translate(${pageX}px, ${pageY}px)`, transition: `transform 0.7s ease ${covered ? '0.55s' : '0s'}` }}>
        <rect width={PAGE.w} height={PAGE.h} rx="4" fill="#fffaf0" stroke="#d6c9a8" strokeWidth="1.2" />
        {CROWD.map((p, i) => <CrowdPerson key={i} p={p} />)}
      </g>

      {/* The sheet drops in from above; the hole is part of it */}
      <g data-waldo-sheet style={{ transform: `translateY(${covered ? 0 : -(SHEET.h + SHEET.y + 40)}px)`, transition: 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
        <rect x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h} fill="#312e81" mask={`url(#${maskId})`} style={{ opacity: peek ? 0.28 : 1, transition: 'opacity 0.35s ease' }} />
        <rect x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h} fill={`url(#${maskId}-weave)`} mask={`url(#${maskId})`} pointerEvents="none" />
        <circle cx={HOLE.x} cy={HOLE.y} r={HOLE.r} fill="none" stroke="#22d3ee" strokeWidth="2.2" style={grow} />
        {step === 2 && (
          <motion.circle
            cx={HOLE.x}
            cy={HOLE.y}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            initial={{ r: HOLE.r, opacity: 0 }}
            animate={{ r: [HOLE.r, HOLE.r + 14], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
        )}
        {/* What the verifier is left with: the page could be anywhere under here */}
        <g style={{ opacity: verdict && !peek ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          {GHOSTS.map((g, i) => (
            <g key={i}>
              <rect x={g.x} y={g.y} width={PAGE.w} height={PAGE.h} rx="4" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="6 5" />
              <text x={g.qx} y={g.qy} textAnchor="middle" fontSize="24" fontWeight="900" fill="#ffffff" fillOpacity="0.7">?</text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

const WALDO_STEP_META = [
  { emoji: '🗣️', color: '#6366f1' },
  { emoji: '📄', color: '#8b5cf6' },
  { emoji: '🕳️', color: '#0891b2' },
  { emoji: '✅', color: '#39B54A' },
];

function WaldoStepper() {
  const { t } = useTranslation(NS);
  const steps = t('zkpCave.steps', { returnObjects: true }) as { pill: string; title: string; text: string; caption: string }[];
  const [step, setStep] = useState(0);
  const [peek, setPeek] = useState(false);
  const last = steps.length - 1;
  const isLast = step === last;
  const { emoji, color } = WALDO_STEP_META[step];
  const go = (n: number) => {
    setStep(n);
    if (n === 0) setPeek(false);
  };
  const seen = step >= 2; // the verifier has looked through the hole
  const onSheet = 'rounded-lg bg-black/55 px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm';

  return (
    <div className="h-full min-h-0 grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-4" data-waldo-step={step}>
      {/* The scene */}
      <div className="relative min-h-[240px] rounded-xl border-2 overflow-hidden bg-muted/60 transition-colors" style={{ borderColor: color + '80' }}>
        <WaldoScene step={step} peek={peek} label={t('zkpCave.sceneLabel')} />

        {step === 0 && (
          <>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="absolute left-3 bottom-3 max-w-[45%] rounded-2xl rounded-bl-sm border-2 bg-card px-3 py-2 shadow-md" style={{ borderColor: '#6366f1' }}>
              <p className="text-sm font-black text-foreground leading-tight"><span aria-hidden>🧑 </span>{t('zkpCave.bubbleProver')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute right-3 top-3 max-w-[45%] rounded-2xl rounded-tr-sm border-2 border-border bg-card px-3 py-2 shadow-md">
              <p className="text-sm font-black text-foreground leading-tight"><span aria-hidden>🤨 </span>{t('zkpCave.bubbleVerifier')}</p>
            </motion.div>
          </>
        )}

        {step > 0 && (
          <>
            <motion.p key={`cap-${step}-${peek}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className={`absolute left-3 top-3 max-w-[58%] ${onSheet}`}>
              {peek ? t('zkpCave.peekNote') : steps[step].caption}
            </motion.p>
            <button
              type="button"
              onClick={() => setPeek((p) => !p)}
              aria-pressed={peek}
              className="absolute right-3 top-3 rounded-lg border border-white/40 bg-black/55 px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-black/75 transition-colors cursor-pointer"
            >{peek ? t('zkpCave.peekOff') : t('zkpCave.peek')}</button>
          </>
        )}

        {isLast && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-lg px-3 py-1.5 text-sm font-black text-white shadow-md" style={{ backgroundColor: '#39B54A' }}>{t('zkpCave.verdictFound')}</span>
            <span className="rounded-lg border border-white/50 bg-black/55 px-3 py-1.5 text-sm font-black text-white backdrop-blur-sm">📍 {t('zkpCave.verdictWhere')}</span>
          </motion.div>
        )}
      </div>

      {/* The telling */}
      <div className="flex flex-col gap-3 min-h-0">
        <div className="shrink-0 grid grid-cols-4 gap-1.5">
          {steps.map((s, i) => {
            const on = i === step;
            const c = WALDO_STEP_META[i].color;
            return (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-current={on ? 'step' : undefined}
                className="flex items-center justify-center gap-1.5 px-1.5 py-1.5 rounded-lg border-2 text-xs font-bold transition-colors cursor-pointer min-w-0"
                style={{
                  borderColor: on ? c : i < step ? c + '55' : 'var(--border)',
                  backgroundColor: on ? c + '18' : 'var(--card)',
                  color: on ? c : 'var(--muted-foreground)',
                }}
              >
                <span className="shrink-0">{i + 1}</span>
                <span className="truncate">{s.pill}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 min-h-0 rounded-xl border-2 p-4 flex flex-col justify-center gap-2"
          style={{ borderColor: color + '66', backgroundColor: color + '0d' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none" aria-hidden>{emoji}</span>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{t('zkpCave.stepOf', { n: step + 1, total: steps.length })}</p>
              <h3 className="text-xl font-bold text-foreground leading-tight">{steps[step].title}</h3>
            </div>
          </div>
          <p className="text-lg text-foreground leading-relaxed">{steps[step].text}</p>
        </motion.div>

        {/* The verifier's notebook: one line changes, the other never does */}
        <div className="shrink-0 rounded-xl border border-border bg-card p-3 flex flex-col gap-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground"><span aria-hidden>🤨 </span>{t('zkpCave.notebook.label')}</p>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-foreground leading-snug">{t('zkpCave.notebook.foundQ')}</p>
            <motion.span
              key={`found-${seen}`}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="shrink-0 rounded-md border px-2 py-0.5 text-xs font-black whitespace-nowrap"
              style={seen ? { borderColor: '#39B54A', backgroundColor: '#39B54A1a', color: '#39B54A' } : { borderColor: '#f59e0b80', backgroundColor: '#f59e0b14', color: '#d97706' }}
            >{seen ? t('zkpCave.notebook.foundYes') : t('zkpCave.notebook.foundNo')}</motion.span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-foreground leading-snug">{t('zkpCave.notebook.whereQ')}</p>
            <motion.span
              key={`where-${isLast}`}
              initial={{ scale: isLast ? 1.25 : 1 }}
              animate={{ scale: 1 }}
              className="shrink-0 rounded-md border px-2 py-0.5 text-xs font-black whitespace-nowrap"
              style={{ borderColor: isLast ? '#8b5cf6' : '#8b5cf666', backgroundColor: isLast ? '#8b5cf626' : '#8b5cf60d', color: '#8b5cf6' }}
            >🙈 {t('zkpCave.notebook.whereNo')}</motion.span>
          </div>
        </div>

        {/* Right padding keeps the controls clear of the floating slide-nav arrows. */}
        <div className="shrink-0 flex items-center gap-2 lg:pr-12">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => go(step - 1)}
            className="shrink-0 whitespace-nowrap px-3 py-2 rounded-xl text-sm font-bold border border-border bg-card text-muted-foreground disabled:opacity-40 cursor-pointer disabled:cursor-default"
          >{t('zkpCave.back')}</button>
          <button
            type="button"
            data-waldo-next
            onClick={() => go(isLast ? 0 : step + 1)}
            className="flex-1 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer transition-colors"
            style={{ backgroundColor: color }}
          >{isLast ? t('zkpCave.restart') : t('zkpCave.next')}</button>
        </div>
      </div>
    </div>
  );
}

/* ──────────── 100 envelopes — near-certainty from random spot-checks ────────────
   The prover seals 100 envelopes and claims each holds a $100 bill. The verifier opens 99,
   picked at random, and leaves one sealed. If exactly one envelope were empty, the chance it
   is still among the unopened ones after k random picks is (100 − k) / 100, so a cheater
   survives all 99 picks 1 time in 100. Two or more empty envelopes are always caught. */
const ENV_TOTAL = 100;
const ENV_OPENABLE = ENV_TOTAL - 1;
const shuffledEnvelopes = () => {
  const a = Array.from({ length: ENV_TOTAL }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const randomEnvelope = () => Math.floor(Math.random() * ENV_TOTAL);

type EnvelopeState = 'sealed' | 'good' | 'empty' | 'kept' | 'keptEmpty';
const ENVELOPE_STYLE: Record<EnvelopeState, { borderColor: string; backgroundColor: string; borderStyle?: string }> = {
  sealed: { borderColor: 'var(--border)', backgroundColor: 'var(--card)' },
  good: { borderColor: '#39B54A99', backgroundColor: '#39B54A1f' },
  empty: { borderColor: '#ef4444', backgroundColor: '#ef444433' },
  kept: { borderColor: '#8b5cf6', backgroundColor: '#8b5cf626' },
  keptEmpty: { borderColor: '#ef4444', backgroundColor: '#ef44441a', borderStyle: 'dashed' },
};

function EnvelopesDemo() {
  const { t } = useTranslation(NS);
  const why = t('zkProb.why', { returnObjects: true }) as { t: string; d: string }[];
  const [order, setOrder] = useState(shuffledEnvelopes); // the verifier's random picking order
  const [bad, setBad] = useState(randomEnvelope); // the empty envelope, when the prover cheats
  const [cheat, setCheat] = useState(false);
  const [opened, setOpened] = useState(0);
  const [target, setTarget] = useState(0);
  const [tries, setTries] = useState({ caught: 0, total: 0 });
  const counted = useRef(false);

  const posOf = useMemo(() => {
    const p = new Array<number>(ENV_TOTAL);
    order.forEach((env, pos) => { p[env] = pos; });
    return p;
  }, [order]);
  const badPos = cheat ? posOf[bad] : ENV_TOTAL;
  // A run ends at the empty envelope, or after 99 picks.
  const limit = Math.min(ENV_OPENABLE, badPos + 1);
  const caught = opened > badPos;
  const finished = opened >= limit;
  const escaped = cheat && finished && !caught;
  const running = opened < Math.min(target, limit);

  useEffect(() => {
    if (opened >= Math.min(target, limit)) return;
    const id = window.setTimeout(() => setOpened((o) => o + 1), target - opened > 10 ? 30 : 110);
    return () => window.clearTimeout(id);
  }, [opened, target, limit]);

  useEffect(() => {
    if (!cheat || !finished || counted.current) return;
    counted.current = true;
    setTries((s) => ({ caught: s.caught + (caught ? 1 : 0), total: s.total + 1 }));
  }, [cheat, finished, caught]);

  const restart = (nextCheat = cheat) => {
    counted.current = false;
    setOrder(shuffledEnvelopes());
    setBad(randomEnvelope());
    setOpened(0);
    setTarget(0);
    setCheat(nextCheat);
  };
  const openMore = (n: number) => setTarget(Math.min(limit, opened + n));

  const missChance = ENV_TOTAL - opened; // % chance a single empty envelope is still unopened
  const tone = caught ? '#ef4444' : escaped ? '#f59e0b' : finished ? '#39B54A' : '#8b5cf6';
  const status = caught
    ? t('zkProb.status.caught', { n: opened })
    : escaped
    ? t('zkProb.status.escaped')
    : finished
    ? t('zkProb.status.honestDone')
    : opened === 0
    ? t('zkProb.status.idle')
    : t('zkProb.status.progress', { n: opened });
  const openBtn = 'rounded-lg border-2 border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground hover:border-[#8b5cf6] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default disabled:hover:border-border';

  return (
    <div className="h-full min-h-0 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4" data-env-opened={opened} data-env-state={caught ? 'caught' : escaped ? 'escaped' : finished ? 'done' : running ? 'running' : 'idle'}>
      {/* The table of envelopes */}
      <div className="rounded-xl border-2 p-4 flex flex-col gap-3 min-h-0" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf608' }}>
        <div className="shrink-0 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex-1 min-w-[14rem] flex items-center gap-2.5">
            <span className="text-3xl leading-none" aria-hidden>🧑‍💼</span>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6]">{t('zkProb.claimLabel')}</p>
              <p className="text-base font-bold text-foreground leading-tight">{t('zkProb.claim')}</p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1.5" role="group" aria-label={t('zkProb.modeLabel')}>
            {[false, true].map((v) => {
              const c = v ? '#ef4444' : '#39B54A';
              return (
                <button
                  key={String(v)}
                  type="button"
                  aria-pressed={cheat === v}
                  onClick={() => restart(v)}
                  className="rounded-lg border-2 px-2.5 py-1.5 text-xs font-bold transition-colors cursor-pointer leading-tight"
                  style={{
                    borderColor: cheat === v ? c : 'var(--border)',
                    backgroundColor: cheat === v ? c + '14' : 'var(--card)',
                    color: cheat === v ? c : 'var(--muted-foreground)',
                  }}
                >{v ? t('zkProb.cheat') : t('zkProb.honest')}</button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-h-[220px] grid grid-cols-10 gap-1" style={{ gridAutoRows: 'minmax(0, 1fr)' }} role="img" aria-label={t('zkProb.gridLabel', { n: opened })}>
          {posOf.map((pos, i) => {
            const isBad = cheat && i === bad;
            const state: EnvelopeState = pos < opened ? (isBad ? 'empty' : 'good') : finished && !caught ? (isBad ? 'keptEmpty' : 'kept') : 'sealed';
            const closed = state === 'sealed' || state === 'kept' || state === 'keptEmpty';
            return (
              <div key={i} data-env={state} className="relative rounded-[5px] border flex items-center justify-center overflow-hidden transition-colors duration-200" style={{ ...ENVELOPE_STYLE[state], borderWidth: state === 'sealed' || state === 'good' ? 1 : 2 }}>
                {closed && (
                  <svg viewBox="0 0 40 26" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-muted-foreground" aria-hidden>
                    <path d="M0 0 L20 15 L40 0" fill="none" stroke="currentColor" strokeOpacity={state === 'sealed' ? 0.45 : 0.3} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
                {state === 'good' && (
                  <motion.span initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.18 }} className="text-[10px] font-black leading-none text-[#39B54A]">{t('zkProb.bill')}</motion.span>
                )}
                {state === 'empty' && (
                  <motion.span initial={{ scale: 2.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-sm font-black leading-none text-[#ef4444]">✗</motion.span>
                )}
                {state === 'kept' && (
                  <motion.span initial={{ scale: 0.4 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="relative text-sm leading-none" aria-hidden>🔒</motion.span>
                )}
                {state === 'keptEmpty' && <span className="relative text-sm leading-none" aria-hidden>😈</span>}
              </div>
            );
          })}
        </div>

        <div className="shrink-0 flex flex-wrap items-center gap-2">
          <button type="button" data-env-open="1" disabled={finished || running} onClick={() => openMore(1)} className={openBtn}>{t('zkProb.open1')}</button>
          <button type="button" data-env-open="10" disabled={finished || running} onClick={() => openMore(10)} className={openBtn}>{t('zkProb.open10')}</button>
          <button
            type="button"
            data-env-open="all"
            disabled={finished || running}
            onClick={() => openMore(ENV_TOTAL)}
            className="rounded-lg px-3.5 py-1.5 text-xs font-bold text-white cursor-pointer transition-opacity disabled:opacity-40 disabled:cursor-default"
            style={{ backgroundColor: '#8b5cf6' }}
          >▶ {t('zkProb.openAll')}</button>
          {cheat && tries.total > 0 && (
            <p data-env-tries className="text-xs font-black" style={{ color: '#ef4444' }}>😈 {t('zkProb.tries', tries)}</p>
          )}
          <button type="button" data-env-reset onClick={() => restart()} className="ml-auto text-xs font-semibold text-muted-foreground hover:text-foreground underline underline-offset-2 cursor-pointer">{t('zkProb.reset')}</button>
        </div>
      </div>

      {/* What the verifier can conclude */}
      <div className="flex flex-col gap-3 min-h-0">
        <div className="shrink-0 rounded-xl border-2 p-3.5 flex flex-col gap-2 transition-colors" style={{ borderColor: tone + '80', backgroundColor: tone + '0d' }}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: tone }}><span aria-hidden>🤨 </span>{t('zkProb.tallyLabel')}</p>
            <p className="text-sm font-black text-foreground tabular-nums">{t('zkProb.openedValue', { n: opened })}</p>
          </div>
          <div>
            <div className="flex items-end justify-between gap-3">
              <p className="text-xs text-muted-foreground leading-snug">{t('zkProb.riskLabel')}</p>
              <p className="shrink-0 text-2xl font-black leading-none tabular-nums" style={{ color: tone }}>{caught ? '—' : `${missChance}%`}</p>
            </div>
            <div className="mt-1.5 h-2.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${caught ? 100 : missChance}%`, backgroundColor: tone, transition: 'width 0.15s linear, background-color 0.2s' }} />
            </div>
          </div>
          {/* Two lines reserved so the panel never jumps while envelopes open. */}
          <p className="text-sm font-semibold text-foreground leading-snug min-h-[2.75rem]">{status}</p>
        </div>

        <div className="flex-1 min-h-0 rounded-xl border border-border bg-card px-3.5 py-3 flex flex-col justify-center gap-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('zkProb.whyLabel')}</p>
          {why.map((w, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="size-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0" style={{ backgroundColor: '#8b5cf6' }}>{i + 1}</span>
              <p className="text-sm text-muted-foreground leading-snug"><span className="font-bold text-foreground">{w.t}. </span>{w.d}</p>
            </div>
          ))}
        </div>

        <div className="shrink-0 rounded-xl border-2 p-3.5" style={{ borderColor: '#0891b266', backgroundColor: '#0891b20d' }}>
          <p className="text-sm text-foreground leading-snug"><span className="font-black text-[#0891b2]">{t('zkProb.bridgeLabel')}</span>{t('zkProb.bridge')}</p>
        </div>
      </div>
    </div>
  );
}

/* ──────────── Two jobs of ZK — same proof, two different questions ────────────
   privacy: the checker never sees the data · scale: the checker never redoes the work
   (a validity proof — nothing is hidden). */
const JOB_COLORS = { privacy: '#8b5cf6', scale: '#0891b2' } as const;
type Job = keyof typeof JOB_COLORS;
const JOBS: Job[] = ['privacy', 'scale'];
const JOB_ICONS: Record<Job, string> = { privacy: '🙈', scale: '🗜️' };
// Which job each "which job is it?" scenario shows, by index (language-neutral).
const SORT_ANSWERS: Job[] = ['privacy', 'scale', 'privacy', 'scale'];
const TX_DOTS = Array.from({ length: 40 }, (_, i) => i);

function JobPanel({ job }: { job: Job }) {
  const { t } = useTranslation(NS);
  const color = JOB_COLORS[job];
  const rows = t(`zkJobs.${job}.rows`, { returnObjects: true }) as { k: string; v: string }[];
  const secrets = t('zkJobs.privacy.secrets', { returnObjects: true }) as string[];

  return (
    <div className="rounded-xl border-2 px-4 py-3 flex flex-col gap-2.5 min-h-0" style={{ borderColor: color + '66', backgroundColor: color + '0a' }}>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-3xl leading-none">{JOB_ICONS[job]}</span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{t(`zkJobs.${job}.label`)}</p>
          <p className="text-lg font-bold text-foreground leading-tight">{t(`zkJobs.${job}.title`)}</p>
        </div>
      </div>

      {/* who proves → one small proof → who checks */}
      <div className="flex-1 min-h-0 flex items-stretch gap-2">
        <div className="flex-1 min-w-0 rounded-lg border bg-card px-3 py-2 flex flex-col items-center justify-center gap-1.5 text-center" style={{ borderColor: color + '55' }}>
          {job === 'privacy' ? (
            <div className="flex flex-col gap-0.5 w-full max-w-[11rem]">
              {secrets.map((s) => (
                <div key={s} className="flex items-center justify-between gap-2 rounded-md border border-dashed px-2 text-[11px] leading-5 text-muted-foreground" style={{ borderColor: color + '70' }}>
                  <span className="truncate">{s}</span>
                  <span aria-hidden>🔒</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-10 gap-1" aria-hidden>
              {TX_DOTS.map((i) => (
                <span key={i} className="size-2 rounded-sm" style={{ backgroundColor: color, opacity: 0.35 + (i % 3) * 0.2 }} />
              ))}
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-foreground leading-tight">{t(`zkJobs.${job}.from`)}</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{t(`zkJobs.${job}.fromNote`)}</p>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center justify-center gap-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="rounded-lg border-2 px-2.5 py-1.5 text-xs font-black whitespace-nowrap"
            style={{ borderColor: color, backgroundColor: color + '1a', color }}
          >📄 {t('zkJobs.proofChip')}</motion.div>
          <span className="text-xl leading-none text-muted-foreground" aria-hidden>→</span>
        </div>

        <div className="flex-1 min-w-0 rounded-lg border bg-card px-3 py-2 flex flex-col items-center justify-center gap-1 text-center" style={{ borderColor: color + '55' }}>
          <span className="text-xl leading-none" aria-hidden>{job === 'privacy' ? '🏦' : '⛓️'}</span>
          <p className="text-sm font-bold text-foreground leading-tight">{t(`zkJobs.${job}.to`)}</p>
          <p className="text-xs font-black text-[#39B54A] leading-tight">{t(`zkJobs.${job}.toVerdict`)}</p>
          <p className="text-[11px] text-muted-foreground leading-snug">{t(`zkJobs.${job}.toNote`)}</p>
        </div>
      </div>

      <dl className="shrink-0 flex flex-col gap-1">
        {rows.map((r) => (
          <div key={r.k} className="flex gap-2.5 items-baseline">
            <dt className="shrink-0 w-28 text-[10px] font-black uppercase tracking-widest" style={{ color }}>{r.k}</dt>
            <dd className="text-sm text-foreground leading-snug">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* Four everyday scenarios; the student says which of the two jobs ZK is doing. */
function JobSorter() {
  const { t } = useTranslation(NS);
  const items = t('zkJobs.sort.items', { returnObjects: true }) as { text: string; why: string }[];
  const [picked, setPicked] = useState<Record<number, Job>>({});
  const anyPicked = Object.keys(picked).length > 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2.5">
        <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#8b5cf6] text-[10px] font-bold">{t('zkp.demo.badge')}</span>
        <p className="text-sm font-bold text-foreground">{t('zkJobs.sort.label')}</p>
        {anyPicked && (
          <button type="button" onClick={() => setPicked({})} className="ml-auto text-xs font-semibold text-muted-foreground hover:text-foreground underline underline-offset-2 cursor-pointer">
            {t('zkJobs.sort.reset')}
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2.5">
        {items.map((it, i) => {
          const answer = SORT_ANSWERS[i];
          const pick = picked[i];
          const done = pick !== undefined;
          return (
            <div key={i} className="rounded-xl border border-border bg-card px-3 py-2.5 flex flex-col gap-2">
              <p className="text-sm text-foreground leading-snug flex-1">{it.text}</p>
              <div className="grid grid-cols-2 gap-1.5">
                {JOBS.map((job) => {
                  const state = !done
                    ? 'border-border hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/5 cursor-pointer'
                    : job === answer
                    ? 'ex-correct border-transparent cursor-default'
                    : job === pick
                    ? 'ex-wrong border-transparent cursor-default'
                    : 'border-border opacity-50 cursor-default';
                  return (
                    <button
                      key={job}
                      type="button"
                      disabled={done}
                      onClick={() => setPicked((prev) => ({ ...prev, [i]: job }))}
                      className={`rounded-lg border-2 px-2 py-1 text-xs font-bold text-foreground transition-all ${state}`}
                    >{JOB_ICONS[job]} {t(`zkJobs.sort.${job}`)}</button>
                  );
                })}
              </div>
              {/* Space is reserved so answering never shifts the slide. */}
              <p className="text-xs leading-snug min-h-[2.25rem]" style={{ color: done ? (pick === answer ? '#10b981' : '#ef4444') : undefined }}>
                {done && (
                  <>
                    <span className="font-black">{pick === answer ? '✓ ' : '✗ '}</span>
                    <span className="text-foreground">{it.why}</span>
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────── What ZK does not do — tap a claim to see where it stops ──────────── */
const LIMIT_ICONS = ['🙈', '🧾', '🕵️', '⚖️'];

function ZkLimits() {
  const { t } = useTranslation(NS);
  const items = t('zkLimits.items', { returnObjects: true }) as { claim: string; reality: string; tag: string }[];
  const [open, setOpen] = useState<number[]>([]);
  const allOpen = open.length === items.length;
  const toggle = (i: number) => setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <div className="h-full min-h-0 flex flex-col gap-3">
      <div className="shrink-0 flex items-center gap-2.5">
        <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#8b5cf6] text-[10px] font-bold">{t('zkp.demo.badge')}</span>
        <p className="text-sm text-muted-foreground">{t('zkLimits.hint')}</p>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? [] : items.map((_, i) => i))}
          className="ml-auto shrink-0 rounded-lg border-2 border-border bg-card px-3 py-1 text-xs font-bold text-foreground hover:border-[#8b5cf6] transition-colors cursor-pointer"
        >{allOpen ? t('zkLimits.reset') : t('zkLimits.revealAll')}</button>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 auto-rows-fr gap-4">
        {items.map((it, i) => {
          const isOpen = open.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="text-left rounded-xl border-2 p-5 flex flex-col justify-center gap-3 min-h-0 transition-colors hover:shadow-md cursor-pointer"
              style={{ borderColor: isOpen ? '#f59e0b90' : '#8b5cf655', backgroundColor: isOpen ? '#f59e0b0d' : '#8b5cf608' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl leading-none shrink-0" aria-hidden>{LIMIT_ICONS[i % LIMIT_ICONS.length]}</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6]">{t('zkLimits.claimLabel')} {i + 1}</p>
                  <p className={`text-lg font-bold leading-tight ${isOpen ? 'text-muted-foreground line-through decoration-[#ef4444] decoration-2' : 'text-foreground'}`}>“{it.claim}”</p>
                </div>
              </div>
              {isOpen ? (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1.5">
                  <p className="text-sm text-foreground leading-relaxed">
                    <span className="font-black text-[#d97706]">{t('zkLimits.realityLabel')}</span>{it.reality}
                  </p>
                  <p className="text-sm font-black text-foreground"><span className="text-[#d97706]">→ </span>{it.tag}</p>
                </motion.div>
              ) : (
                <p className="text-sm text-muted-foreground italic">{t('zkLimits.tapHint')}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SC_Section7() {
  const { t } = useTranslation(NS);

  const chapters = useMemo(
    () =>
      chapterShape.map((c) =>
        'kind' in c
          ? { kind: 'group' as const, id: c.id, label: t(`groups.${c.id}`) }
          : { id: c.id, label: t(`chapters.${c.id}`) }
      ),
    [t]
  );

  const hoodLabel = t('ui.hood');
  const recapLabel = t('ui.recap');
  const keyLabel = t('ui.keyPoint');
  const kp = (id: string, color = '#8b5cf6') => <KeyPointBar label={keyLabel} text={t(`keyPoints.${id}`)} color={color} className="mt-3" />;

  // ── Array data resolved via t() ──
  const privacyTrace = t('privacy.trace', { returnObjects: true }) as { who: string; note: string }[];
  const privacyBusiness = t('privacy.business', { returnObjects: true }) as string[];
  const zkMore = t('zkp.more', { returnObjects: true }) as { icon: string; text: string }[];
  const kycActors = t('zkIdentity.actors', { returnObjects: true }) as string[];
  const kycSteps = t('zkIdentity.steps', { returnObjects: true }) as { label: string; desc: string }[];
  const kycBusiness = t('zkIdentity.business', { returnObjects: true }) as string[];
  const zkProps = t('zkApps.props', { returnObjects: true }) as { t: string; d: string }[];
  const zkItems = t('zkApps.items', { returnObjects: true }) as { name: string; who: string; does: string; since: string }[];
  const approaches = t('privacyApproaches.items', { returnObjects: true }) as { name: string; sub: string; mech: string; trade: string }[];
  const story = t('privacyRegulation.story', { returnObjects: true }) as { yr: string; t: string; d: string }[];
  const unlocks = t('privacyFuture.items', { returnObjects: true }) as { title: string; d: string }[];
  const quizQuestions = QUIZ.map(({ key, correct }) => {
    const q = t(key, { returnObjects: true }) as QuizItem;
    return {
      question: q.question,
      options: q.options.map((text, i) => ({ text, correct: i === correct })),
      explanation: q.explanation,
    };
  });
  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

  // ── Static visual data, paired with the translated arrays by index ──
  const traceIcons = ['🏦', '👛', '🏠', '❤️'];
  const kycMeta = [
    { icon: '🏦', color: '#6366f1' },
    { icon: '👛', color: '#8b5cf6' },
    { icon: '🖥️', color: '#39B54A' },
  ];
  const zkPropMeta = [
    { emoji: '✅', color: '#39B54A' },
    { emoji: '🔒', color: '#ED1C24' },
    { emoji: '🙈', color: '#8b5cf6' },
  ];
  const zkItemMeta = [
    { icon: '🛡️', color: '#f59e0b' },
    { icon: '🏦', color: '#6366f1' },
    { icon: '🧑', color: '#10b981' },
    { icon: '✅', color: '#f97316' },
    { icon: '🗳️', color: '#39B54A' },
    { icon: '🌐', color: '#06b6d4' },
  ];
  const approachMeta = [
    { icon: '🛡️', color: '#f59e0b' },
    { icon: '👁️‍🗨️', color: '#ef4444' },
    { icon: '🧬', color: '#10b981' },
    { icon: '🔀', color: '#6b7280' },
  ];
  const storyColors = ['#6366f1', '#ef4444', '#f59e0b', '#39B54A', '#8b5cf6'];
  const unlockMeta = [
    { icon: '🏦', color: '#6366f1' },
    { icon: '🪪', color: '#10b981' },
    { icon: '📊', color: '#f59e0b' },
    { icon: '🤖', color: '#ec4899' },
  ];

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
            icon={<EyeOff className="size-20 text-[#8b5cf6]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ S7-PUBLIC — the problem: a public chain is not private ═══════ */}
        <div id="s7-public" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('privacy.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('privacy.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left — what a normal vs shielded transaction exposes */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex-1 rounded-xl border-2 p-4 flex flex-col justify-center" style={{ borderColor: '#ef444450', backgroundColor: '#ef44440a' }}>
                <p className="text-xs font-black uppercase tracking-widest text-[#ef4444] mb-2">{t('privacy.normalLabel')}</p>
                <div className="font-mono text-sm text-foreground space-y-0.5">
                  <div>from <span className="text-[#ef4444]">0xA1b2…</span></div>
                  <div>to&nbsp;&nbsp; <span className="text-[#ef4444]">0xC3d4…</span></div>
                  <div>value <span className="text-[#ef4444]">12.5 ETH</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{t('privacy.normalCaption')}</p>
              </div>
              <div className="flex-1 rounded-xl border-2 p-4 flex flex-col justify-center" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0a' }}>
                <p className="text-xs font-black uppercase tracking-widest text-[#39B54A] mb-2">{t('privacy.shieldedLabel')}</p>
                <div className="font-mono text-sm text-foreground space-y-0.5">
                  <div>from <span className="text-[#39B54A]">••••••</span></div>
                  <div>to&nbsp;&nbsp; <span className="text-[#39B54A]">••••••</span></div>
                  <div>value <span className="text-[#39B54A]">••••••</span> <span className="text-[#39B54A]">{t('privacy.shieldedProof')}</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{t('privacy.shieldedCaption')}</p>
              </div>
            </div>

            {/* Right — the trail, and why a business cares */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex-1 rounded-xl border border-border bg-card p-4 flex flex-col">
                <p className="text-xs font-black uppercase tracking-widest text-[#8b5cf6] mb-2">{t('privacy.traceLabel')}</p>
                <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-1.5">
                  {privacyTrace.map((n, i) => (
                    <div key={n.who} className="flex-1 flex items-center gap-1.5 min-w-0">
                      <div className="flex-1 self-stretch rounded-lg border px-2.5 py-2 min-w-0 flex flex-col justify-center" style={{ borderColor: i === 0 ? '#ef444480' : '#8b5cf640', backgroundColor: i === 0 ? '#ef44440d' : 'transparent' }}>
                        <div className="text-xl leading-none">{traceIcons[i % traceIcons.length]}</div>
                        <div className="text-xs font-bold text-foreground leading-tight mt-1.5">{n.who}</div>
                        <div className="text-[11px] text-muted-foreground leading-snug">{n.note}</div>
                      </div>
                      {i < privacyTrace.length - 1 && <span className="hidden lg:block text-muted-foreground shrink-0">→</span>}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-snug">{t('privacy.traceCaption')}</p>
              </div>
              <div className="shrink-0 rounded-xl border p-4" style={{ borderColor: '#f59e0b50', backgroundColor: '#f59e0b0a' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b] mb-1.5">{t('privacy.businessLabel')}</p>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                  {privacyBusiness.map((b) => (
                    <li key={b} className="text-sm text-foreground leading-snug flex gap-1.5"><span className="text-[#f59e0b]">•</span>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* The way out — hands over to the ZK idea */}
          <div className="shrink-0 mt-4 rounded-xl border-2 p-3.5 flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-4" style={{ borderColor: '#8b5cf680', backgroundColor: '#8b5cf60d' }}>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6] shrink-0">{t('privacy.trickLabel')}</span>
            <p className="text-sm text-foreground leading-snug">
              {t('privacy.trickA')}<span className="font-semibold text-[#8b5cf6]">{t('privacy.trickStrong1')}</span>{t('privacy.trickB')}<span className="font-semibold">{t('privacy.trickStrong2')}</span>{t('privacy.trickC')}<span className="font-semibold">{t('privacy.trickStrong3')}</span>{t('privacy.trickD')}<span className="font-semibold">{t('privacy.trickStrong4')}</span>{t('privacy.trickE')}{' '}
              <span className="text-muted-foreground">{t('privacy.trickCaption')}</span>
            </p>
          </div>
          {kp('s7-public')}
        </div>

        {/* ═══════ S7-ZK — the one idea ═══════ */}
        <div id="s7-zk" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkp.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('zkp.subtitle')}</p>
          </div>

          <div className="shrink-0 mb-5 rounded-2xl border-2 p-5 text-center" style={{ borderColor: '#8b5cf680', backgroundColor: '#8b5cf60d' }}>
            <p className="text-lg lg:text-xl font-semibold text-foreground leading-snug">
              {t('zkp.oneLinerA')}<span style={{ color: '#8b5cf6' }}>{t('zkp.oneLinerB')}</span>
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            <div className="shrink-0 flex items-center gap-2.5">
              <span className="text-3xl">🍺</span>
              <div>
                <p className="font-bold text-foreground text-lg">{t('zkp.exampleTitle')} <span className="ml-1 px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#8b5cf6] text-[10px] font-bold align-middle">{t('zkp.demo.badge')}</span></p>
                <p className="text-sm text-muted-foreground">{t('zkp.exampleSubtitle')}</p>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ZkBouncerDemo />
            </div>
          </div>

          {/* Same trick, other doors */}
          <div className="shrink-0 mt-4 flex flex-col lg:flex-row gap-3 lg:items-stretch">
            <div className="flex-1 rounded-xl border border-border bg-card p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{t('zkp.moreLabel')}</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {zkMore.map((m) => (
                  <div key={m.text} className="flex gap-2 items-start text-xs text-foreground leading-snug">
                    <span className="text-base leading-none shrink-0">{m.icon}</span>
                    <span>{m.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <UnderTheHood label={hoodLabel} terms={['prover', 'verifier', 'statement', 'witness']} className="self-start lg:self-center" />
          </div>
          {kp('s7-zk')}
        </div>

        {/* ═══════ S7-WALDO — the same idea, stepped through ═══════ */}
        <div id="s7-waldo" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkpCave.heading')} <span className="ml-1 px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#8b5cf6] text-[10px] font-bold align-middle">{t('zkp.demo.badge')}</span></h2>
            <p className="text-sm text-muted-foreground mt-1">{t('zkpCave.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0">
            <WaldoStepper />
          </div>
          {kp('s7-waldo', '#0891b2')}
        </div>

        {/* ═══════ S7-ENVELOPES — why a proof can be "almost certain" ═══════ */}
        <div id="s7-envelopes" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkProb.heading')} <span className="ml-1 px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#8b5cf6] text-[10px] font-bold align-middle">{t('zkp.demo.badge')}</span></h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('zkProb.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0">
            <EnvelopesDemo />
          </div>

          <div className="shrink-0 mt-3 flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="flex-1 rounded-xl border p-3" style={{ borderColor: '#6366f140', backgroundColor: '#6366f10d' }}>
              <p className="text-sm text-foreground leading-snug"><span className="font-bold text-[#6366f1]">{t('zkProb.classicLabel')}</span>{t('zkProb.classicBody')}</p>
            </div>
            <UnderTheHood label={hoodLabel} terms={['interactive proof', 'random challenge', 'soundness error', 'commitment']} className="lg:max-w-[24rem] lg:pr-12" />
          </div>
          {kp('s7-envelopes')}
        </div>

        {/* ═══════ S7-KYC — KYC without handing over identity ═══════ */}
        <div id="s7-kyc" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkIdentity.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('zkIdentity.subtitle')}</p>
          </div>

          {/* Three actors, three steps */}
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-stretch gap-2">
            {kycSteps.map((s, i) => {
              const { icon, color } = kycMeta[i % kycMeta.length];
              return (
                <div key={i} className="flex-1 flex items-center gap-2 min-h-0">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex-1 self-stretch rounded-xl border-2 bg-card p-5 flex flex-col justify-center gap-2.5"
                    style={{ borderColor: color + '70' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-4xl leading-none">{icon}</span>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{i + 1} · {kycActors[i]}</p>
                        <p className="text-lg font-bold text-foreground leading-tight">{s.label}</p>
                      </div>
                    </div>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                  </motion.div>
                  {i < kycSteps.length - 1 && <span className="hidden lg:block text-2xl text-muted-foreground shrink-0">→</span>}
                </div>
              );
            })}
          </div>

          <div className="shrink-0 mt-4 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-3">
            <div className="rounded-xl border p-3.5" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0a' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#39B54A] mb-1.5">{t('zkIdentity.businessLabel')}</p>
              <ul className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {kycBusiness.map((b) => (
                  <li key={b} className="text-xs text-foreground leading-snug flex gap-1.5"><span className="text-[#39B54A]">✓</span>{b}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <p className="text-xs text-muted-foreground italic leading-snug">
                {t('zkIdentity.footA')}<span className="font-medium text-foreground">{t('zkIdentity.footStrong')}</span>{t('zkIdentity.footB')}
              </p>
              <UnderTheHood label={hoodLabel} terms={['verifiable credential', 'selective disclosure', 'issuer signature']} className="self-start" />
            </div>
          </div>
          {kp('s7-kyc')}
        </div>

        {/* ═══════ S7-LIVE — ZK in production ═══════ */}
        <div id="s7-live" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkApps.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('zkApps.subtitle')}</p>
          </div>

          {/* Three promises — plain words */}
          <div className="shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-2 mb-3">
            {zkProps.map((p, i) => (
              <div key={p.t} className="flex gap-2.5 items-center rounded-lg border px-3 py-2 bg-card" style={{ borderColor: zkPropMeta[i].color + '50' }}>
                <span className="text-xl shrink-0 leading-none">{zkPropMeta[i].emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-black leading-tight" style={{ color: zkPropMeta[i].color }}>{p.t}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{p.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Six live products — 3×2 */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 auto-rows-fr gap-3">
            {zkItems.map((u, i) => {
              const { icon, color } = zkItemMeta[i % zkItemMeta.length];
              return (
                <motion.div
                  key={u.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="rounded-xl border-2 p-4 bg-card flex flex-col gap-2 min-h-0"
                  style={{ borderColor: color + '55' }}
                >
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-2xl leading-none">{icon}</span>
                    <div className="min-w-0">
                      <p className="font-black text-base leading-tight" style={{ color }}>{u.name}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight truncate">{u.who}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-snug flex-1"><span className="font-black text-[9px] uppercase tracking-widest mr-1" style={{ color }}>{t('zkApps.doesLabel')}</span>{u.does}</p>
                  <p className="text-[11px] font-semibold shrink-0" style={{ color }}>{u.since}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="shrink-0 mt-3">
            <UnderTheHood label={hoodLabel} terms={['SNARK', 'STARK', 'trusted setup', 'prover cost']} />
          </div>
          {kp('s7-live')}
        </div>

        {/* ═══════ S7-JOBS — one proof, two jobs: privacy and scale ═══════ */}
        <div id="s7-jobs" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkJobs.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('zkJobs.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <JobPanel job="privacy" />
            <JobPanel job="scale" />
          </div>

          <div className="shrink-0 mt-3">
            <JobSorter />
          </div>

          <div className="shrink-0 mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <UnderTheHood label={hoodLabel} terms={['validity proof', 'ZK rollup', 'succinct proof']} />
            <RecapHandoff label={t('ui.deeper')} text={t('zkJobs.deeper')} to="/blockchain-platforms/section-2" color="#39B54A" />
          </div>
          {kp('s7-jobs', '#0891b2')}
        </div>

        {/* ═══════ S7-LIMITS — what a ZK proof does not do ═══════ */}
        <div id="s7-limits" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkLimits.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('zkLimits.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0">
            <ZkLimits />
          </div>

          <div className="shrink-0 mt-4 rounded-xl border-2 p-3.5 flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-4" style={{ borderColor: '#39B54A66', backgroundColor: '#39B54A0d' }}>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#39B54A] shrink-0">{t('zkLimits.givesLabel')}</span>
            <p className="text-sm text-foreground leading-snug">
              <span className="font-semibold">{t('zkLimits.givesStrong')}</span>{t('zkLimits.givesBody')}
            </p>
          </div>
          <div className="shrink-0 mt-3">
            <UnderTheHood label={hoodLabel} terms={['trusted issuer', 'metadata', 'anonymity set', 'prover cost']} />
          </div>
          {kp('s7-limits', '#f59e0b')}
        </div>

        {/* ═══════ S7-APPROACHES — four ways to get privacy on-chain ═══════ */}
        <div id="s7-approaches" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <PageLabelRow kind="optional" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('privacyApproaches.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('privacyApproaches.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {approaches.map((p, i) => {
              const { icon, color } = approachMeta[i % approachMeta.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2.5 rounded-xl border-2 p-4 justify-center"
                  style={{ borderColor: color + '50', backgroundColor: color + '0a' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{icon}</span>
                    <div>
                      <div className="font-black text-lg" style={{ color }}>{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.sub}</div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed"><span className="font-semibold" style={{ color }}>{t('privacyApproaches.howLabel')}</span>{p.mech}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed"><span className="font-semibold">{t('privacyApproaches.tradeLabel')}</span>{p.trade}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="shrink-0 mt-3">
            <UnderTheHood label={hoodLabel} terms={['zk-SNARK', 'ring signature', 'stealth address', 'anonymity set']} />
          </div>
          {kp('s7-approaches')}
        </div>

        {/* ═══════ S7-TORNADO — when privacy code met the law ═══════ */}
        <div id="s7-tornado" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <PageLabelRow kind="reference" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('privacyRegulation.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('privacyRegulation.subtitle')}</p>
            <div className="mt-2">
              <RecapHandoff label={recapLabel} text={t('privacyRegulation.recapFreedom')} to="/blockchain-fundamentals/prologue" color="#ED1C24" />
            </div>
          </div>

          {/* Timeline — five beats */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-2.5">
            {story.map((s, i) => {
              const c = storyColors[i % storyColors.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex flex-col gap-1.5 rounded-xl border-2 p-3 min-h-0"
                  style={{ borderColor: c + '55', backgroundColor: c + '0a' }}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: c }}>{s.yr}</span>
                  <p className="font-bold text-foreground text-base leading-tight">{s.t}</p>
                  <p className="text-sm text-muted-foreground leading-snug flex-1">{s.d}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Two truths + the cypherpunk tie-back */}
          <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="rounded-xl border-2 p-3 flex flex-col gap-1" style={{ borderColor: '#ef444450', backgroundColor: '#ef44440a' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ef4444]">{t('privacyRegulation.truthsLabel')} · 1</p>
              <p className="text-xs text-foreground leading-snug">{t('privacyRegulation.truthA')}</p>
            </div>
            <div className="rounded-xl border-2 p-3 flex flex-col gap-1" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0a' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#39B54A]">{t('privacyRegulation.truthsLabel')} · 2</p>
              <p className="text-xs text-foreground leading-snug">{t('privacyRegulation.truthB')}</p>
            </div>
            <div className="rounded-xl border-2 p-3 flex flex-col gap-1" style={{ borderColor: '#ED1C2460', backgroundColor: '#ED1C240a' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ED1C24]">{t('privacyRegulation.cypherpunkLabel')}</p>
              <p className="text-xs text-foreground leading-snug">{t('privacyRegulation.cypherpunk')}</p>
            </div>
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0d' }}>
            <p className="text-xs text-foreground leading-snug">
              <span className="font-bold text-[#39B54A]">{t('privacyRegulation.guidanceLabel')}</span>
              {t('privacyRegulation.guidanceA')}<span className="font-semibold">{t('privacyRegulation.guidanceStrong1')}</span>{t('privacyRegulation.guidanceB')}<span className="font-semibold">{t('privacyRegulation.guidanceStrong2')}</span>{t('privacyRegulation.guidanceC')}
            </p>
          </div>
          {kp('s7-tornado', '#f59e0b')}
        </div>

        {/* ═══════ S7-DISCLOSURE — what this unlocks for business ═══════ */}
        <div id="s7-disclosure" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('privacyFuture.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('privacyFuture.subtitleA')}<span className="font-semibold">{t('privacyFuture.subtitleStrong')}</span>{t('privacyFuture.subtitleB')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {unlocks.map((c, i) => {
              const { icon, color } = unlockMeta[i % unlockMeta.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 items-start rounded-xl border-2 p-5 justify-center flex-col"
                  style={{ borderColor: color + '50', backgroundColor: color + '0a' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{icon}</span>
                    <p className="font-black text-lg" style={{ color }}>{c.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="shrink-0 mt-4 rounded-xl border-2 p-4 text-center" style={{ borderColor: '#8b5cf680', backgroundColor: '#8b5cf60d' }}>
            <p className="text-base text-foreground leading-snug">
              {t('privacyFuture.bannerA')}<span className="font-semibold">{t('privacyFuture.bannerStrong1')}</span>{t('privacyFuture.bannerB')}<span className="font-semibold text-[#8b5cf6]">{t('privacyFuture.bannerStrong2')}</span>{t('privacyFuture.bannerC')}
            </p>
          </div>
          {kp('s7-disclosure')}
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s7-quiz" className="h-full">
          {/* One slide, stepped question by question.
              compact: the scenario questions are long enough to be clipped in the roomy layout. */}
          <GroupedQuiz questions={quizQuestions} compact />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s7-takeaways" className="h-full">
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
