import { Fragment, useState, useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { GroupedQuiz } from '../../components/templates/GroupedQuiz';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import {
  ShieldAlert, ShieldCheck, KeyRound, ArrowRight, ArrowDown, ArrowUp, BookOpen, ExternalLink,
  Link2, Cloud, Check, X, Scale, Rocket, Repeat, Lock, Users, Timer, Ban, Bug, CircleCheck,
  Zap, CornerUpLeft,
} from 'lucide-react';

// Language-neutral shape — only IDs. Labels come from t() at render time.
const chapterIds = [
  's5-oracle',
  's5-ex-oracle',
  's5-challenges',
  's5-technical',
  's5-risks-security',
  's5-admin-key',
  's5-failures',
  's5-risks-cost',
  's5-risks-regulatory',
  's5-quiz',
  's5-takeaways',
] as const;

// ─── Oracle recap: the chain of trust from Section 2, read as a risk ─────────
// Language-neutral: emoji, colour and how many of three strength pips are lit.
const ORACLE_LINK_META = [
  { emoji: '🌍', color: '#ED1C24', strength: 1 },
  { emoji: '🔮', color: '#f59e0b', strength: 2 },
  { emoji: '📜', color: '#39B54A', strength: 3 },
] as const;

interface OracleLinkText { label: string; guard: string; level: string }

// Further reading for the oracle material. Bibliographic data is language-neutral
// (verified against the arXiv record); only the label and the one-line note are translated.
const ORACLE_PAPER = {
  url: 'https://arxiv.org/abs/2106.00667',
  authors: 'Eskandari, Salehi, Gu & Clark (2021)',
  title: 'SoK: Oracles from the Ground Truth to Market Manipulation',
  venue: "ACM Advances in Financial Technologies (AFT '21)",
  linkText: 'arxiv.org/abs/2106.00667',
} as const;

// ─── Exercise: Defend the Oracle ────────────────────────────────────────────
// Section 2 already steps through the attack itself; here students work the defence side.
// Order follows the number's journey: source → operator → contract → payout.
const DEFENCE_META = [
  { emoji: '🌡️', color: '#8b5cf6' },
  { emoji: '🏢', color: '#6366f1' },
  { emoji: '🕒', color: '#f59e0b' },
  { emoji: '⚡', color: '#ED1C24' },
] as const;

interface DefenceItem {
  title: string;
  desc: string;
  defence: string;
  defenceDesc: string;
  residual: string;
}

interface QuizItem { question: string; options: string[]; explanation: string }

// The section quiz, in the order it is asked: locale block + index of its correct option
// (language-neutral; question and option text live in the locale files).
const QUIZ = [
  { key: 'quiz', correct: 1 },
  { key: 'quizMore.adminKey', correct: 2 },
  { key: 'quizMore.pattern', correct: 0 },
  { key: 'quizMore.sameSource', correct: 3 },
  { key: 'quizMore.proxyGuard', correct: 1 },
  { key: 'quizMore.budget', correct: 0 },
  { key: 'quizMore.erasure', correct: 2 },
  { key: 'quizMore.audited', correct: 3 },
] as const;

interface RegulatoryItem {
  title: string;
  what: string;
  code: string;
  law: string;
  note: string;
  tag: string;
}

interface WhyFixItem {
  title: string;
  what: string;
  why: string;
  fix: string;
  stat?: string;
}

interface SecurityItem {
  title: string;
  what: string;
  fix: string;
  stat: string;
}

interface SecurityTotal { title: string; big: string; sub: string; what: string; fix: string }

interface FailureItem {
  name: string;
  date: string;
  loss: string;
  category: string;
  what: string;
  lesson: string;
}

// codeOk: the contract did what it was written to do; the failure sat in keys, votes, data or design.
const FAILURE_META = [
  { emoji: '🔑', color: '#ED1C24', codeOk: true },
  { emoji: '🗳️', color: '#8b5cf6', codeOk: true },
  { emoji: '📡', color: '#f59e0b', codeOk: true },
  { emoji: '🐛', color: '#6366f1', codeOk: false },
  { emoji: '🧊', color: '#22d3ee', codeOk: false },
  { emoji: '📉', color: '#ec4899', codeOk: true },
];

// Column templates (literal strings so Tailwind can see them).
const CHALLENGE_GRID = 'grid grid-cols-[1.3fr_1fr_1fr_1.4fr_1.4fr]';
const SECURITY_GRID = 'grid grid-cols-[1.1fr_1.85fr_1.45fr_1.1fr] gap-3';

// Takeaways: emoji + the slide each one summarises (language-neutral).
const TAKEAWAY_META = [
  { emoji: '🔮', to: 's5-oracle' },
  { emoji: '🔑', to: 's5-admin-key' },
  { emoji: '⚖️', to: 's5-risks-regulatory' },
  { emoji: '🚦', to: 's5-challenges' },
  { emoji: '📉', to: 's5-failures' },
  { emoji: '🛡️', to: 's5-risks-security' },
  { emoji: '🏛️', to: 's5-risks-regulatory' },
] as const;

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function DefendOracleExercise() {
  const { t } = useTranslation('smart-contracts/section-5');
  const items = t('exercise.items', { returnObjects: true }) as DefenceItem[];
  const stages = t('exercise.stages', { returnObjects: true }) as string[];
  const [open, setOpen] = useState<boolean[]>(() => DEFENCE_META.map(() => false));
  const shown = open.filter(Boolean).length;
  const allDone = shown === DEFENCE_META.length;
  const reveal = (i: number) => setOpen(o => o.map((v, k) => (k === i ? true : v)));

  return (
    <>
      <div className="shrink-0 flex items-start justify-between gap-4 mb-2.5">
        <div className="min-w-0">
          <span className="px-2.5 py-0.5 rounded-full bg-[#ED1C24]/15 border border-[#ED1C24]/40 text-[#ED1C24] text-xs font-bold">{t('exercise.badge')}</span>
          <h2 className="text-2xl font-bold text-foreground mt-1">{t('exercise.title')}</h2>
          <p className="text-muted-foreground text-sm max-w-4xl">{t('exercise.subtitle')}</p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <div className="text-xs text-muted-foreground whitespace-nowrap">{t('exercise.progress', { n: shown, total: DEFENCE_META.length })}</div>
          {shown > 0 && (
            <button
              type="button"
              onClick={() => setOpen(DEFENCE_META.map(() => false))}
              className="px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer whitespace-nowrap"
            >
              {t('exercise.reset')}
            </button>
          )}
        </div>
      </div>

      {/* The number's journey: each weak point pinned to the stage it sits on */}
      <div className="shrink-0 mb-2.5 flex items-center gap-3 rounded-xl border border-border bg-card/50 px-3.5 py-1.5">
        <span className="shrink-0 w-24 text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight">{t('exercise.journeyLabel')}</span>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          {DEFENCE_META.map((meta, i) => {
            const done = open[i];
            const tone = done ? '#39B54A' : meta.color;
            return (
              <Fragment key={i}>
                {i > 0 && <ArrowRight className="size-4 text-muted-foreground shrink-0" />}
                <button
                  type="button"
                  onClick={() => reveal(i)}
                  aria-pressed={done}
                  className="flex-1 min-w-0 flex items-center gap-2 rounded-lg border-2 px-2.5 py-1.5 text-left cursor-pointer transition-colors"
                  style={{ borderColor: tone + (done ? '' : '70'), backgroundColor: tone + '10' }}
                >
                  <span className="text-lg leading-none shrink-0">{meta.emoji}</span>
                  <span className="min-w-0 flex-1 text-xs font-bold text-foreground leading-tight">{stages[i]}</span>
                  <span className="size-6 shrink-0 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: tone }}>
                    {done ? <ShieldCheck className="size-3.5" /> : i + 1}
                  </span>
                </button>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-3">
        {DEFENCE_META.map((meta, i) => {
          const item = items[i];
          const isOpen = open[i];
          return (
            <div
              key={i}
              className="min-h-0 flex flex-col gap-1.5 rounded-xl border-2 px-3.5 py-3"
              style={{ borderColor: meta.color + '50', backgroundColor: meta.color + '08' }}
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" style={{ backgroundColor: meta.color }}>{i + 1}</div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: meta.color }}>{t('exercise.weakLabel')} · {stages[i]}</div>
                  <div className="font-black text-base text-foreground leading-tight">{item.title}</div>
                </div>
              </div>
              <p className="text-sm text-foreground leading-snug">{item.desc}</p>

              {isOpen ? (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="mt-auto grid grid-cols-2 gap-2.5">
                  <div className="rounded-lg border bg-card px-2.5 py-2" style={{ borderColor: '#39B54A55' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#39B54A]">🛡️ {t('exercise.defenceLabel')}</div>
                    <div className="text-xs font-bold text-foreground mt-1 leading-tight">{item.defence}</div>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{item.defenceDesc}</p>
                  </div>
                  <div className="rounded-lg border bg-card px-2.5 py-2" style={{ borderColor: '#f59e0b55' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">⚠ {t('exercise.residualLabel')}</div>
                    <p className="text-xs text-foreground leading-snug mt-1">{item.residual}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="mt-auto flex items-center justify-between gap-3 rounded-lg border border-dashed border-border px-3 py-2">
                  <span className="text-sm italic text-muted-foreground">{t('exercise.prompt')}</span>
                  <button
                    type="button"
                    data-reveal
                    onClick={() => reveal(i)}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-white text-xs font-bold cursor-pointer whitespace-nowrap"
                    style={{ backgroundColor: meta.color }}
                  >
                    {t('exercise.reveal')}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: allDone ? 1 : 0.35 }}
        className="shrink-0 mt-2.5 px-3.5 py-1.5 rounded-xl border text-sm text-foreground"
        style={{ borderColor: '#6366f140', backgroundColor: '#6366f10f' }}
      >
        <span className="font-bold text-[#6366f1]">{t('exercise.verdictLabel')}</span>{t('exercise.verdict')}
      </motion.div>
    </>
  );
}

// ─── Failures: six case files, one open at a time ───────────────────────────
function FailureCaseFiles() {
  const { t } = useTranslation('smart-contracts/section-5');
  const items = t('failures.items', { returnObjects: true }) as FailureItem[];
  const [sel, setSel] = useState(0);
  const f = items[sel];
  const m = FAILURE_META[sel];
  const okCount = FAILURE_META.filter(x => x.codeOk).length;

  return (
    <div className="flex-1 min-h-0 grid grid-cols-5 gap-4">
      {/* Case index */}
      <div className="col-span-2 min-h-0 flex flex-col gap-2">
        <div className="shrink-0 text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('failures.pickLabel')}</div>
        {items.map((it, i) => {
          const meta = FAILURE_META[i];
          const active = i === sel;
          return (
            <button
              key={it.name}
              type="button"
              onClick={() => setSel(i)}
              aria-pressed={active}
              className={`flex-1 min-h-0 flex items-center gap-3 rounded-xl border-2 px-3 text-left cursor-pointer transition-colors ${active ? '' : 'border-border bg-card/40 hover:bg-card'}`}
              style={active ? { borderColor: meta.color, backgroundColor: meta.color + '14' } : undefined}
            >
              <span className="text-xl shrink-0">{meta.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-black text-sm text-foreground leading-tight">{it.name}</span>
                <span className="block text-[10px] font-bold uppercase tracking-wider leading-tight mt-0.5" style={{ color: meta.color }}>{it.category}</span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block font-mono font-black text-sm" style={{ color: meta.color }}>{it.loss}</span>
                <span className="block text-[10px] font-mono text-muted-foreground">{it.date}</span>
              </span>
            </button>
          );
        })}
        <div className="shrink-0 flex items-center gap-2 pt-0.5">
          <span className="flex items-center gap-1" aria-hidden>
            {FAILURE_META.map((meta, i) => (
              <span
                key={i}
                className="size-2.5 rounded-full border-2"
                style={{ borderColor: meta.codeOk ? '#6366f1' : '#ED1C24', backgroundColor: meta.codeOk ? '#6366f1' : 'transparent' }}
              />
            ))}
          </span>
          <span className="text-xs font-semibold text-foreground">{t('failures.tally', { n: okCount, total: FAILURE_META.length })}</span>
        </div>
      </div>

      {/* Open case file */}
      <motion.div
        key={sel}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="col-span-3 min-h-0 flex flex-col gap-3 rounded-2xl border-2 p-5"
        style={{ borderColor: m.color + '70', backgroundColor: m.color + '08' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">{t('failures.caseLabel')} {String(sel + 1).padStart(2, '0')} · {f.date}</div>
            <div className="text-2xl font-black text-foreground leading-tight mt-0.5">{m.emoji} {f.name}</div>
            <span className="inline-block mt-1.5 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border-2" style={{ borderColor: m.color, color: m.color }}>{f.category}</span>
          </div>
          <div className={`shrink-0 font-mono font-black leading-none whitespace-nowrap ${f.loss.length > 8 ? 'text-2xl' : 'text-4xl'}`} style={{ color: m.color }}>{f.loss}</div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
          <div className="rounded-xl bg-card border border-border p-3.5">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('failures.whatLabel')}</div>
            <p className="text-base text-foreground leading-snug mt-1">{f.what}</p>
          </div>
          <div className="rounded-xl p-3.5 border-l-4" style={{ borderColor: m.color, backgroundColor: m.color + '12' }}>
            <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: m.color }}>{t('failures.lessonLabel')}</div>
            <p className="text-base font-semibold text-foreground leading-snug mt-1">{f.lesson}</p>
          </div>
        </div>

        <div
          className="self-start inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold"
          style={m.codeOk ? { borderColor: '#6366f166', color: '#6366f1', backgroundColor: '#6366f10f' } : { borderColor: '#ED1C2466', color: '#ED1C24', backgroundColor: '#ED1C240f' }}
        >
          {m.codeOk ? <CircleCheck className="size-3.5" /> : <Bug className="size-3.5" />}
          {m.codeOk ? t('failures.codeOk') : t('failures.codeBug')}
        </div>
      </motion.div>
    </div>
  );
}

export function SC_Section5() {
  const { t } = useTranslation('smart-contracts/section-5');

  const chapters = useMemo(
    () => chapterIds.map((id) => ({ id, label: t(`chapters.${id}`) })),
    [t]
  );

  const oracleLinks = t('oracle.links', { returnObjects: true }) as OracleLinkText[];
  const oracleSeen = t('oracle.seen', { returnObjects: true }) as string[];
  const oracleAsks = t('oracle.asks', { returnObjects: true }) as { q: string; a: string }[];

  const challengeItems = t('challenges.items', { returnObjects: true }) as (WhyFixItem & { chain: string; web: string })[];
  const challengeMeta = [
    { emoji: '🚦', color: '#ED1C24' },
    { emoji: '⏱️', color: '#f59e0b' },
    { emoji: '💾', color: '#8b5cf6' },
    { emoji: '⚙️', color: '#6366f1' },
  ];

  const technicalItems = t('technical.items', { returnObjects: true }) as WhyFixItem[];
  const technicalMeta = [
    { emoji: '🤖', color: '#ED1C24' },
    { emoji: '🔧', color: '#f59e0b' },
    { emoji: '🔺', color: '#6366f1' },
    { emoji: '📈', color: '#39B54A' },
  ];
  const dg = t('technical.diagrams', { returnObjects: true }) as {
    mevCaption: string; mev: string[]; upgrade: string[]; trilemma: string[]; growth: string[];
  };

  // One small labelled diagram per structural problem (same order as technical.items).
  const technicalDiagrams: ReactNode[] = [
    // MEV: a sandwich, shown as the order of three transactions inside one block
    <div key="mev" className="w-full flex flex-col gap-1.5">
      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">{dg.mevCaption}</div>
      {dg.mev.map((label, k) => {
        const bot = k !== 1;
        return (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${bot ? '' : 'border-border bg-muted/40'}`}
            style={bot ? { borderColor: '#ED1C2470', backgroundColor: '#ED1C2412' } : undefined}
          >
            <span className="size-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: bot ? '#ED1C24' : '#64748b' }}>{k + 1}</span>
            <span className="text-sm leading-none shrink-0">{bot ? '🤖' : '🧑'}</span>
            <span className="text-xs font-bold text-foreground leading-tight">{label}</span>
          </div>
        );
      })}
    </div>,
    // Upgradability: deployed code is locked; the patch bounces off
    <div key="upgrade" className="w-full flex flex-col items-center gap-1.5">
      <div className="relative mt-2 flex items-center gap-2 rounded-lg border-2 bg-card px-3.5 py-2.5" style={{ borderColor: '#f59e0b' }}>
        <Lock className="size-4 shrink-0 text-[#f59e0b]" />
        <span className="text-sm font-black text-foreground whitespace-nowrap">{dg.upgrade[0]}</span>
        <span className="absolute -top-3 -right-3 px-1.5 py-0.5 rounded-full bg-[#ED1C24] text-white text-[10px] font-black whitespace-nowrap">🐛 {dg.upgrade[1]}</span>
      </div>
      <div className="flex flex-col items-center text-[#ED1C24]">
        <X className="size-4" strokeWidth={3} />
        <ArrowUp className="size-4 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-1.5 rounded-md border-2 border-dashed border-border px-2.5 py-1 text-xs font-bold text-muted-foreground">
        <Ban className="size-3.5 text-[#ED1C24]" />
        <span className="line-through">{dg.upgrade[2]}</span>
      </div>
    </div>,
    // Trilemma: Ethereum's choice — security + decentralisation held, scalability traded away
    <div key="trilemma" className="w-[calc(100%+0.75rem)] -mx-1.5 flex flex-col items-center gap-1" role="img" aria-label={dg.trilemma.join(' · ')}>
      <span className="text-xs font-bold text-muted-foreground leading-tight">{dg.trilemma[1]}</span>
      <svg viewBox="0 0 200 92" className="w-full max-w-[190px] text-foreground" aria-hidden>
        <line x1="100" y1="10" x2="16" y2="80" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="5 5" />
        <line x1="100" y1="10" x2="184" y2="80" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="5 5" />
        <line x1="16" y1="80" x2="184" y2="80" stroke="#6366f1" strokeWidth="5" strokeLinecap="round" />
        <circle cx="16" cy="80" r="8" fill="#6366f1" />
        <circle cx="184" cy="80" r="8" fill="#6366f1" />
        <circle cx="100" cy="10" r="7" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
      <div className="w-full flex items-start justify-between gap-2 text-xs font-black text-[#6366f1] leading-tight">
        <span>{dg.trilemma[0]}</span>
        <span className="text-right">{dg.trilemma[2]}</span>
      </div>
    </div>,
    // State growth: the stack only gets taller
    <div key="growth" className="w-full flex flex-col items-center gap-1.5">
      <div className="flex items-end gap-2">
        {[1, 2, 3, 5, 7].map((n, col) => (
          <div key={n} className="flex flex-col-reverse gap-0.5">
            {Array.from({ length: n }).map((_, k) => (
              <span key={k} className="h-2.5 w-6 rounded-sm" style={{ backgroundColor: '#39B54A', opacity: 0.35 + col * 0.16 }} />
            ))}
          </div>
        ))}
      </div>
      <div className="w-full max-w-[170px] flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
        <span>{dg.growth[0]}</span>
        <span className="flex-1 h-px bg-border" />
        <ArrowRight className="size-3.5 -ml-1.5" />
        <span>{dg.growth[1]}</span>
      </div>
    </div>,
  ];

  const securityItems = t('security.items', { returnObjects: true }) as SecurityItem[];
  const securityTotal = t('security.total', { returnObjects: true }) as SecurityTotal;
  const securityMeta = [
    { emoji: '🔁', color: '#ED1C24' },
    { emoji: '⚡', color: '#f59e0b' },
    { emoji: '🔑', color: '#8b5cf6' },
    { emoji: '🧮', color: '#6366f1' },
    { emoji: '🐛', color: '#39B54A' },
  ];

  const costItems = t('cost.items', { returnObjects: true }) as WhyFixItem[];
  const costMeta = [
    { emoji: '🧱', color: '#ED1C24' },
    { emoji: '🛠️', color: '#f59e0b' },
    { emoji: '⛽', color: '#8b5cf6' },
    { emoji: '⚖️', color: '#6366f1' },
  ];
  // Reading order on the lifecycle: left column = upfront, right column = ongoing.
  const COST_LAYOUT = [
    { item: 1, phase: '#f59e0b' },
    { item: 2, phase: '#6366f1' },
    { item: 3, phase: '#f59e0b' },
    { item: 0, phase: '#6366f1' },
  ];

  const regulatoryItems = t('regulatory.items', { returnObjects: true }) as RegulatoryItem[];
  const regulatoryMeta = [
    { emoji: '⚖️', color: '#ED1C24' },
    { emoji: '🔍', color: '#8b5cf6' },
    { emoji: '🏃', color: '#f59e0b' },
  ];

  const quizQuestions = QUIZ.map(({ key, correct }) => {
    const q = t(key, { returnObjects: true }) as QuizItem;
    return {
      question: q.question,
      options: q.options.map((text, i) => ({ text, correct: i === correct })),
      explanation: q.explanation,
    };
  });

  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

  const adminPoints = t('adminKey.points', { returnObjects: true }) as { title: string; desc: string }[];
  const adminChecks = t('adminKey.checks', { returnObjects: true }) as string[];
  const adminCheckIcons = [KeyRound, Users, Timer, Ban];

  const oracleNode = (i: number) => {
    const m = ORACLE_LINK_META[i];
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
        className="h-full rounded-xl border-2 bg-card px-3 py-3.5 flex flex-col items-center gap-1.5 text-center"
        style={{ borderColor: m.color }}
      >
        <span className="text-3xl leading-none">{m.emoji}</span>
        <span className="text-sm font-black text-foreground leading-tight">{oracleLinks[i].label}</span>
        <span className="text-xs text-muted-foreground leading-tight">{oracleLinks[i].guard}</span>
        <div className="mt-auto pt-2 flex gap-1" role="img" aria-label={`${t('oracle.strengthLabel')}: ${oracleLinks[i].level}`}>
          {[1, 2, 3].map((n) => (
            <span key={n} className="h-1.5 w-7 rounded-full" style={{ backgroundColor: n <= m.strength ? m.color : 'var(--muted)' }} />
          ))}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: m.color }}>{oracleLinks[i].level}</span>
      </motion.div>
    );
  };

  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} accentColor="#6366f1" />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        <div className="h-full">
          <TitleSlide
            sectionNumber={t('title.sectionNumber')}
            title={t('title.title')}
            subtitle={t('title.subtitle')}
            icon={<ShieldAlert className="size-20 text-[#6366f1]" />}
            gradient="from-[#ED1C24] to-[#6366f1]"
          />
        </div>

        {/* ═══════ ORACLE RISK — recap bridge from Section 2 ═══════ */}
        <div id="s5-oracle" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('oracle.kicker')}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{t('oracle.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('oracle.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-5 content-center">

            {/* Chain of trust: two off-chain links, one trust boundary, one on-chain link */}
            <div className="lg:col-span-3 rounded-2xl border border-border bg-card/50 p-5 flex flex-col gap-4 justify-center">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('oracle.chainLabel')}</div>
              <div className="flex items-stretch gap-1.5">
                <div className="flex-[2.15] min-w-0 flex flex-col gap-2 rounded-xl border-2 border-dashed p-2.5" style={{ borderColor: '#f59e0b99', backgroundColor: '#f59e0b0d' }}>
                  <div className="h-8 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest leading-tight text-[#f59e0b]">
                    <Cloud className="size-3.5 shrink-0" />{t('oracle.zoneOff')}
                  </div>
                  <div className="flex-1 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-2">
                    {oracleNode(0)}
                    <ArrowRight className="size-5 text-muted-foreground self-center shrink-0" />
                    {oracleNode(1)}
                  </div>
                </div>
                <div className="shrink-0 w-[4.5rem] flex flex-col items-center justify-center gap-1 text-[#6366f1]">
                  <ArrowRight className="size-6" strokeWidth={2.5} />
                  <span className="text-[10px] font-black uppercase tracking-wider text-center leading-tight">{t('oracle.boundary')}</span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-2 rounded-xl border-2 p-2.5" style={{ borderColor: '#39B54A99', backgroundColor: '#39B54A0d' }}>
                  <div className="h-8 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest leading-tight text-[#39B54A]">
                    <Link2 className="size-3.5 shrink-0" />{t('oracle.zoneOn')}
                  </div>
                  <div className="flex-1">{oracleNode(2)}</div>
                </div>
              </div>
              <p className="text-sm text-foreground leading-snug">{t('oracle.chainNote')}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mr-1">{t('oracle.seenLabel')}</span>
                {oracleSeen.map((x) => (
                  <span key={x} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-card border border-border text-foreground">{x}</span>
                ))}
              </div>
            </div>

            {/* The risk lens: three questions */}
            <div className="lg:col-span-2 flex flex-col gap-3 justify-center">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('oracle.askLabel')}</div>
              {oracleAsks.map((x, i) => (
                <div key={x.q} className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl">
                  <span className="size-7 shrink-0 rounded-full flex items-center justify-center text-xs font-black text-white bg-[#6366f1]">{i + 1}</span>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-foreground leading-tight">{x.q}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-snug">{x.a}</div>
                  </div>
                </div>
              ))}
              <div className="p-3 rounded-xl border border-[#f59e0b]/30 text-sm text-foreground" style={{ backgroundColor: '#f59e0b0f' }}>
                <span className="font-bold text-[#f59e0b]">{t('oracle.limitLabel')}</span>{t('oracle.limit')}
              </div>
            </div>

          </div>

          {/* Further reading: the SoK paper this oracle material maps onto */}
          <div className="shrink-0 mt-3 pr-16">
          <a
            href={ORACLE_PAPER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-3.5 py-2 hover:border-[#6366f1]/60 transition-colors"
          >
            <BookOpen className="size-4 shrink-0 text-[#6366f1]" />
            <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-[#6366f1]">{t('oracle.reading.label')}</span>
            <span className="min-w-0 flex-1 text-xs text-muted-foreground leading-snug">
              <span className="font-semibold text-foreground">{ORACLE_PAPER.authors}.</span>{' '}
              <cite className="italic text-foreground">{ORACLE_PAPER.title}</cite>. {ORACLE_PAPER.venue}. {t('oracle.reading.note')}
            </span>
            <span className="shrink-0 inline-flex items-center gap-1 font-mono text-xs text-[#6366f1] underline underline-offset-2 group-hover:no-underline">
              {ORACLE_PAPER.linkText}<ExternalLink className="size-3" />
            </span>
          </a>
          </div>
          <KeyPointBar text={t('keyPoints.s5-oracle')} className="mt-3" />
        </div>

        {/* ═══════ EXERCISE: DEFEND THE ORACLE ═══════ */}
        <div id="s5-ex-oracle" className="h-full flex flex-col p-6 lg:px-10 lg:py-6">
          <DefendOracleExercise />
          <KeyPointBar text={t('keyPoints.s5-ex-oracle')} className="mt-2.5" />
        </div>

        {/* ═══════ CHALLENGES & LIMITATIONS — on-chain vs off-chain comparison table ═══════ */}
        <div id="s5-challenges" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('challenges.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('challenges.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col rounded-2xl border border-border bg-card/40 overflow-hidden">
            <div className={`${CHALLENGE_GRID} shrink-0 border-b border-border bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground`}>
              <div className="px-4 py-2.5">{t('challenges.colLabel')}</div>
              <div className="px-4 py-2.5 flex items-center gap-1.5 text-[#ED1C24]" style={{ backgroundColor: '#ED1C2414' }}><Link2 className="size-3.5" />{t('challenges.onChainLabel')}</div>
              <div className="px-4 py-2.5 flex items-center gap-1.5 text-[#39B54A]" style={{ backgroundColor: '#39B54A14' }}><Cloud className="size-3.5" />{t('challenges.offChainLabel')}</div>
              <div className="px-4 py-2.5">{t('challenges.whyLabel')}</div>
              <div className="px-4 py-2.5">{t('challenges.fixLabel')}</div>
            </div>
            {challengeItems.map((c, i) => {
              const color = challengeMeta[i].color;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className={`${CHALLENGE_GRID} flex-1 min-h-0 border-b border-border last:border-b-0`}
                >
                  <div className="px-4 flex items-center gap-3">
                    <div className="size-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: color + '18' }}>{challengeMeta[i].emoji}</div>
                    <div className="min-w-0">
                      <div className="font-black text-base text-foreground leading-tight">{c.title}</div>
                      <div className="text-xs font-semibold mt-0.5 leading-snug" style={{ color }}>{c.what}</div>
                    </div>
                  </div>
                  <div className="relative pl-4 pr-6 flex flex-col justify-center gap-1" style={{ backgroundColor: '#ED1C240d' }}>
                    {c.chain.split(' · ').map((line) => (
                      <div key={line} className="font-black text-base text-[#ED1C24] leading-tight">{line}</div>
                    ))}
                    <span className="absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 size-7 rounded-full border border-border bg-card flex items-center justify-center text-[10px] font-black uppercase text-muted-foreground">{t('challenges.vs')}</span>
                  </div>
                  <div className="pl-6 pr-4 flex flex-col justify-center" style={{ backgroundColor: '#39B54A0d' }}>
                    <div className="font-black text-base text-[#39B54A] leading-tight">{c.web}</div>
                  </div>
                  <div className="px-4 flex items-center">
                    <p className="text-sm text-foreground leading-snug">{c.why}</p>
                  </div>
                  <div className="pl-4 pr-12 flex items-center gap-2.5">
                    <span className="size-5 shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: color + '22' }}>
                      <Check className="size-3" strokeWidth={3.5} style={{ color }} />
                    </span>
                    <p className="text-sm text-foreground leading-snug">{c.fix}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <KeyPointBar text={t('keyPoints.s5-challenges')} className="mt-3" />
        </div>

        {/* ═══════ TECHNICAL CHALLENGES — one small labelled diagram per problem ═══════ */}
        <div id="s5-technical" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('technical.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('technical.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4">
            {technicalItems.map((c, i) => {
              const color = technicalMeta[i].color;
              return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="min-h-0 flex gap-4 rounded-xl border-2 p-4"
                style={{ borderColor: color + '50', backgroundColor: color + '08' }}
              >
                <div className="w-[38%] shrink-0 min-h-0 flex flex-col rounded-lg border bg-card" style={{ borderColor: color + '30' }}>
                  <div className="flex-1 min-h-0 flex items-center justify-center p-3">{technicalDiagrams[i]}</div>
                  <p className="shrink-0 px-2.5 pb-2 text-xs text-muted-foreground italic text-center leading-snug">{c.stat}</p>
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-2 justify-center">
                  <div>
                    <div className="font-black text-base text-foreground leading-tight">{c.title}</div>
                    <div className="text-sm font-semibold mt-0.5 leading-snug" style={{ color }}>{c.what}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('technical.whyLabel')}</span>
                    <p className="text-sm text-foreground leading-snug">{c.why}</p>
                  </div>
                  <div className="rounded-lg px-3 py-2 border-l-2" style={{ borderColor: color, backgroundColor: color + '12' }}>
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{t('technical.fixLabel')}</span>
                    <p className="text-sm text-foreground leading-snug">{c.fix}</p>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
          <KeyPointBar text={t('keyPoints.s5-technical')} className="mt-3" />
        </div>

        {/* ═══════ SECURITY RISKS — mistake vs fix ledger + the running total ═══════ */}
        <div id="s5-risks-security" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('security.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('security.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-4 gap-5">
            <div className="col-span-3 min-h-0 flex flex-col gap-2">
              <div className={`${SECURITY_GRID} shrink-0 px-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground`}>
                <div>{t('security.cols.bug')}</div>
                <div className="flex items-center gap-1.5 text-[#ED1C24]"><X className="size-3.5" strokeWidth={3.5} />{t('security.cols.dont')}</div>
                <div className="flex items-center gap-1.5 text-[#39B54A]"><Check className="size-3.5" strokeWidth={3.5} />{t('security.cols.do')}</div>
                <div>{t('security.cols.wild')}</div>
              </div>
              {securityItems.map((r, i) => {
                const color = securityMeta[i].color;
                return (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className={`${SECURITY_GRID} flex-1 min-h-0 items-stretch`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="size-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: color + '18' }}>{securityMeta[i].emoji}</div>
                      <div className="min-w-0 font-black text-sm text-foreground leading-tight">{r.title.replace('/', '/\u200b')}</div>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-l-xl rounded-r-sm px-3 border-l-4" style={{ borderColor: '#ED1C24', backgroundColor: '#ED1C240f' }}>
                      <p className="text-sm text-foreground leading-snug">{r.what}</p>
                    </div>
                    <div className="relative flex items-center gap-2 rounded-r-xl rounded-l-sm pl-5 pr-3" style={{ backgroundColor: '#39B54A14' }}>
                      <ArrowRight className="absolute -left-3.5 top-1/2 -translate-y-1/2 size-5 rounded-full bg-card border border-border p-0.5 text-muted-foreground" />
                      <p className="text-sm font-semibold text-foreground leading-snug">{r.fix}</p>
                    </div>
                    <div className="flex items-center min-w-0">
                      <span className="text-xs italic text-muted-foreground leading-snug border-l-2 pl-2.5" style={{ borderColor: color }}>{r.stat}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* The running total */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="col-span-1 min-h-0 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-5 text-center"
              style={{ borderColor: '#ED1C2460', backgroundColor: '#ED1C240a' }}
            >
              <div className="text-3xl leading-none">💸</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#ED1C24]">{securityTotal.title}</div>
              <div>
                <div className="text-5xl font-black text-[#ED1C24] leading-none whitespace-nowrap">{securityTotal.big}</div>
                <div className="text-sm font-semibold text-muted-foreground mt-1.5">{securityTotal.sub}</div>
              </div>
              <p className="text-sm text-foreground leading-snug">{securityTotal.what}</p>
              <div className="w-full flex items-start gap-2 rounded-lg px-3 py-2 text-left" style={{ backgroundColor: '#39B54A14' }}>
                <Check className="size-4 shrink-0 mt-0.5 text-[#39B54A]" strokeWidth={3.5} />
                <span className="text-sm font-semibold text-foreground leading-snug">{securityTotal.fix}</span>
              </div>
            </motion.div>
          </div>
          <KeyPointBar text={t('keyPoints.s5-risks-security')} className="mt-3" />
        </div>

        {/* ═══════ ADMIN KEYS & UPGRADEABLE PROXIES ═══════ */}
        <div id="s5-admin-key" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('adminKey.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('adminKey.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-5 gap-6 content-center">

            {/* Diagram: admin key → proxy → swappable logic */}
            <div className="col-span-3 flex flex-col gap-3 justify-center">
              <div className="flex justify-center">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 border-dashed border-[#f59e0b] bg-[#f59e0b]/10">
                  <KeyRound className="size-5 text-[#f59e0b] shrink-0" />
                  <div>
                    <div className="font-black text-sm text-foreground leading-tight">{t('adminKey.diagram.admin')}</div>
                    <div className="text-xs text-muted-foreground">{t('adminKey.diagram.adminNote')}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center"><ArrowDown className="size-5 text-[#f59e0b]" /></div>
              <div className="flex items-stretch gap-3">
                <div className="flex-1 flex flex-col justify-center p-4 rounded-xl border border-border bg-card text-center">
                  <div className="font-black text-sm text-foreground">{t('adminKey.diagram.user')}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t('adminKey.diagram.userNote')}</div>
                </div>
                <ArrowRight className="size-5 text-muted-foreground self-center shrink-0" />
                <div className="flex-[1.4] flex flex-col justify-center p-4 rounded-xl border-2 border-[#6366f1] text-center" style={{ backgroundColor: '#6366f10d' }}>
                  <div className="font-black text-sm text-[#6366f1]">{t('adminKey.diagram.proxy')}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t('adminKey.diagram.proxyNote')}</div>
                </div>
                <ArrowRight className="size-5 text-muted-foreground self-center shrink-0" />
                <div className="flex-1 flex flex-col gap-2 justify-center">
                  <div className="p-3 rounded-xl border border-border bg-muted/40 text-center text-sm font-bold text-muted-foreground line-through">{t('adminKey.diagram.logicOld')}</div>
                  <div className="p-3 rounded-xl border-2 border-[#39B54A] text-center text-sm font-black text-foreground" style={{ backgroundColor: '#39B54A14' }}>{t('adminKey.diagram.logicNew')}</div>
                  <div className="text-xs text-muted-foreground text-center">{t('adminKey.diagram.logicNote')}</div>
                </div>
              </div>
            </div>

            {/* Three plain points + the due-diligence checklist */}
            <div className="col-span-2 flex flex-col gap-3 justify-center">
              {adminPoints.map((p) => (
                <div key={p.title} className="p-3 bg-card border border-border rounded-xl">
                  <div className="font-bold text-sm text-foreground">{p.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{p.desc}</div>
                </div>
              ))}
              <div className="p-3 rounded-xl border border-[#f59e0b]/30" style={{ backgroundColor: '#f59e0b0f' }}>
                <div className="text-xs font-bold text-[#f59e0b]">{t('adminKey.askLabel')}</div>
                <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {adminChecks.map((c, i) => {
                    const Icon = adminCheckIcons[i];
                    return (
                      <div key={c} className="flex items-center gap-1.5 text-xs font-semibold text-foreground leading-tight">
                        <Icon className="size-3.5 shrink-0 text-[#f59e0b]" />{c}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
          <UnderTheHood terms={['proxy pattern', 'delegatecall', 'timelock', 'multisig', 'renounceOwnership']} className="shrink-0 mt-3" />
          <KeyPointBar text={t('keyPoints.s5-admin-key')} className="mt-3" />
        </div>

        {/* ═══════ FAILURES — six case files ═══════ */}
        <div id="s5-failures" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('failures.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('failures.subtitle')}</p>
          </div>

          <FailureCaseFiles />

          <div className="shrink-0 mt-3 flex items-center justify-between gap-4 flex-wrap pr-16">
            <p className="text-xs text-muted-foreground italic flex-1">{t('failures.footer')}</p>
            <UnderTheHood terms={['validator keys', 'flash loan', 'oracle manipulation', 'selfdestruct', 'reflexivity']} />
          </div>
          <KeyPointBar text={t('keyPoints.s5-failures')} className="mt-3" />
        </div>

        {/* ═══════ COST RISKS — a budget checklist along the contract's lifecycle ═══════ */}
        <div id="s5-risks-cost" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('cost.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('cost.subtitle')}</p>
          </div>

          {/* Lifecycle rail: upfront ── deploy ── ongoing */}
          <div className="shrink-0 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="shrink-0 text-sm font-black uppercase tracking-widest text-[#f59e0b]">{t('cost.phases.upfront')}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{t('cost.phases.upfrontNote')}</span>
              <span className="flex-1 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #f59e0b33, #f59e0b)' }} />
            </div>
            <div className="flex items-center gap-2 rounded-full border-2 border-[#39B54A] px-3.5 py-1.5" style={{ backgroundColor: '#39B54A14' }}>
              <Rocket className="size-4 text-[#39B54A]" />
              <span className="text-sm font-black text-foreground">{t('cost.phases.deploy')}</span>
              <span className="text-xs text-muted-foreground">· {t('cost.phases.deployNote')}</span>
            </div>
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex-1 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #6366f133)' }} />
              <Repeat className="size-4 shrink-0 text-[#6366f1]" />
              <span className="shrink-0 text-sm font-black uppercase tracking-widest text-[#6366f1]">{t('cost.phases.ongoing')}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{t('cost.phases.ongoingNote')}</span>
            </div>
          </div>

          <div className="relative flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-3">
            <span className="absolute left-1/2 top-0 bottom-0 border-l-2 border-dashed" style={{ borderColor: '#39B54A80' }} aria-hidden />
            {COST_LAYOUT.map(({ item, phase }) => {
              const c = costItems[item];
              return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="min-h-0 flex flex-col gap-2.5 justify-center rounded-xl border border-border border-l-4 bg-card/60 px-5 py-3"
                style={{ borderLeftColor: phase }}
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: phase + '18' }}>{costMeta[item].emoji}</div>
                  <div className="min-w-0">
                    <div className="font-black text-base text-foreground leading-tight">{c.title}</div>
                    <div className="text-sm font-semibold mt-0.5 leading-snug" style={{ color: phase }}>{c.what}</div>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-snug">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-2">{t('cost.whyLabel')}</span>{c.why}
                </p>
                <div className="flex items-start gap-2.5 rounded-lg px-3 py-2" style={{ backgroundColor: '#39B54A12' }}>
                  <span className="mt-0.5 size-4 shrink-0 rounded border-2 border-[#39B54A] flex items-center justify-center">
                    <Check className="size-3 text-[#39B54A]" strokeWidth={4} />
                  </span>
                  <p className="text-sm text-foreground leading-snug">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#39B54A] mr-2">{t('cost.fixLabel')}</span>{c.fix}
                  </p>
                </div>
              </motion.div>
              );
            })}
          </div>
          <KeyPointBar text={t('keyPoints.s5-risks-cost')} className="mt-3" />
        </div>

        {/* ═══════ REGULATORY RISKS — where on-chain reality collides with the law ═══════ */}
        <div id="s5-risks-regulatory" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('regulatory.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('regulatory.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-6 content-center">
            {regulatoryItems.map((c, i) => {
              const color = regulatoryMeta[i].color;
              return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="min-h-0 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: color + '18' }}>{regulatoryMeta[i].emoji}</div>
                  <div className="min-w-0">
                    <div className="font-black text-base text-foreground leading-tight">{c.title}</div>
                    <div className="text-sm font-semibold mt-0.5 leading-snug" style={{ color }}>{c.what}</div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="min-h-[7.75rem] rounded-xl border-2 border-dashed px-4 pt-3 pb-5" style={{ borderColor: '#6366f190', backgroundColor: '#6366f10d' }}>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#6366f1]"><Link2 className="size-3.5" />{t('regulatory.codeLabel')}</div>
                    <p className="text-base font-semibold text-foreground leading-snug mt-1.5">{c.code}</p>
                  </div>
                  <div className="-my-3.5 z-10 self-center size-8 rounded-full border-2 border-[#ED1C24] bg-card flex items-center justify-center">
                    <Zap className="size-4 text-[#ED1C24]" fill="currentColor" />
                  </div>
                  <div className="min-h-[7.75rem] rounded-xl border-2 px-4 pt-5 pb-3" style={{ borderColor: '#f59e0b90', backgroundColor: '#f59e0b0d' }}>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#f59e0b]"><Scale className="size-3.5" />{t('regulatory.lawLabel')}</div>
                    <p className="text-base font-semibold text-foreground leading-snug mt-1.5">{c.law}</p>
                  </div>
                </div>

                <p className="min-h-[2.75rem] flex items-center text-sm text-foreground leading-snug border-l-2 pl-3" style={{ borderColor: color }}>{c.note}</p>
                <div className="flex items-start gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <ArrowRight className="size-4 shrink-0 mt-0.5" style={{ color }} />
                  <span className="text-xs font-semibold text-muted-foreground leading-snug">{c.tag}</span>
                </div>
              </motion.div>
              );
            })}
          </div>
          <KeyPointBar text={t('keyPoints.s5-risks-regulatory')} className="mt-3" />
        </div>

        {/* ═══════ QUIZ — one slide, stepped question by question ═══════ */}
        <div id="s5-quiz" className="h-full">
          <GroupedQuiz questions={quizQuestions} compact />
        </div>

        {/* ═══════ TAKEAWAYS — each one links back to the slide it summarises ═══════ */}
        <div id="s5-takeaways" className="h-full flex flex-col p-6 lg:p-10">
          <h2 className="shrink-0 text-2xl lg:text-3xl font-bold text-center text-foreground mb-5">{t('takeaways.title')}</h2>
          <div className="flex-1 min-h-0 w-full max-w-6xl mx-auto grid grid-cols-2 gap-3 content-center">
            {takeawayItems.map((text, i) => {
              const meta = TAKEAWAY_META[i];
              const wide = i === takeawayItems.length - 1 && takeawayItems.length % 2 === 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className={`flex items-start gap-3 rounded-xl border border-border border-l-4 border-l-[#10b981] bg-card p-3.5 ${wide ? 'col-span-2' : ''}`}
                >
                  <div className="relative size-11 shrink-0 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#10b98118' }}>
                    {meta?.emoji}
                    <span className="absolute -bottom-1 -right-1 size-4 rounded-full bg-[#10b981] flex items-center justify-center">
                      <Check className="size-2.5 text-white" strokeWidth={4} />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm lg:text-base text-foreground leading-snug">{text}</p>
                    {meta && (
                      <button
                        type="button"
                        onClick={() => jumpTo(meta.to)}
                        title={t('takeaways.jumpLabel')}
                        className="mt-2 inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs font-semibold text-muted-foreground hover:text-[#6366f1] hover:border-[#6366f1] transition-colors cursor-pointer"
                      >
                        <CornerUpLeft className="size-3" />{t(`chapters.${meta.to}`)}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>


        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
