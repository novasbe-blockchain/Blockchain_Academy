import { Fragment, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { ShieldAlert, KeyRound, ArrowRight, ArrowDown } from 'lucide-react';

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
  's5-quiz-2',
  's5-quiz-3',
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

// ─── Exercise: Defend the Oracle ────────────────────────────────────────────
// Section 2 already steps through the attack itself; here students work the defence side.
const DEFENCE_META = [
  { emoji: '🏢', color: '#6366f1' },
  { emoji: '🌡️', color: '#8b5cf6' },
  { emoji: '⚡', color: '#ED1C24' },
  { emoji: '🕒', color: '#f59e0b' },
] as const;

interface DefenceItem {
  title: string;
  desc: string;
  defence: string;
  defenceDesc: string;
  residual: string;
}

interface QuizItem { question: string; options: string[]; explanation: string }

// Correct-option index per extra quiz (language-neutral; text lives in the locale files).
const EXTRA_QUIZ = [
  { id: 's5-quiz-2', key: 'adminKey', correct: 2 },
  { id: 's5-quiz-3', key: 'pattern', correct: 0 },
] as const;

interface CardItem {
  label: string;
  what: string;
  body: string;
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

interface FailureItem {
  name: string;
  date: string;
  loss: string;
  category: string;
  what: string;
  lesson: string;
}

const FAILURE_META = [
  { emoji: '🔑', color: '#ED1C24' },
  { emoji: '🗳️', color: '#8b5cf6' },
  { emoji: '📡', color: '#f59e0b' },
  { emoji: '🐛', color: '#6366f1' },
  { emoji: '🧊', color: '#22d3ee' },
  { emoji: '📉', color: '#7c2d12' },
];

function DefendOracleExercise() {
  const { t } = useTranslation('smart-contracts/section-5');
  const items = t('exercise.items', { returnObjects: true }) as DefenceItem[];
  const [open, setOpen] = useState<boolean[]>(() => DEFENCE_META.map(() => false));
  const shown = open.filter(Boolean).length;
  const allDone = shown === DEFENCE_META.length;

  return (
    <>
      <div className="shrink-0 flex items-start justify-between gap-4 mb-4">
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

      <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4">
        {DEFENCE_META.map((meta, i) => {
          const item = items[i];
          const isOpen = open[i];
          return (
            <div
              key={i}
              className="min-h-0 flex flex-col gap-2.5 rounded-xl border-2 p-4"
              style={{ borderColor: meta.color + '50', backgroundColor: meta.color + '08' }}
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: meta.color + '18' }}>{meta.emoji}</div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: meta.color }}>{t('exercise.weakLabel')} {i + 1}</div>
                  <div className="font-black text-base text-foreground leading-tight">{item.title}</div>
                </div>
              </div>
              <p className="text-sm text-foreground leading-snug">{item.desc}</p>

              {isOpen ? (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="mt-auto grid grid-cols-2 gap-2.5">
                  <div className="rounded-lg border bg-card p-2.5" style={{ borderColor: '#39B54A55' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#39B54A]">🛡️ {t('exercise.defenceLabel')}</div>
                    <div className="text-xs font-bold text-foreground mt-1 leading-tight">{item.defence}</div>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{item.defenceDesc}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-2.5" style={{ borderColor: '#f59e0b55' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">⚠ {t('exercise.residualLabel')}</div>
                    <p className="text-xs text-foreground leading-snug mt-1">{item.residual}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="mt-auto flex items-center justify-between gap-3 rounded-lg border border-dashed border-border px-3 py-2.5">
                  <span className="text-sm italic text-muted-foreground">{t('exercise.prompt')}</span>
                  <button
                    type="button"
                    onClick={() => setOpen(o => o.map((v, k) => (k === i ? true : v)))}
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
        className="shrink-0 mt-3 px-3.5 py-2 rounded-xl border text-sm text-foreground"
        style={{ borderColor: '#6366f140', backgroundColor: '#6366f10f' }}
      >
        <span className="font-bold text-[#6366f1]">{t('exercise.verdictLabel')}</span>{t('exercise.verdict')}
      </motion.div>
    </>
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

  const securityItems = t('security.items', { returnObjects: true }) as SecurityItem[];
  const securityMeta = [
    { emoji: '🔁', color: '#ED1C24' },
    { emoji: '⚡', color: '#f59e0b' },
    { emoji: '🔑', color: '#8b5cf6' },
    { emoji: '🧮', color: '#6366f1' },
    { emoji: '🐛', color: '#39B54A' },
    { emoji: '💸', color: '#ED1C24' },
  ];

  const failureItems = t('failures.items', { returnObjects: true }) as FailureItem[];

  const costItems = t('cost.items', { returnObjects: true }) as WhyFixItem[];
  const costMeta = [
    { emoji: '🧱', color: '#ED1C24' },
    { emoji: '🛠️', color: '#f59e0b' },
    { emoji: '⛽', color: '#8b5cf6' },
    { emoji: '⚖️', color: '#6366f1' },
  ];

  const regulatoryItems = t('regulatory.items', { returnObjects: true }) as CardItem[];
  const regulatoryMeta = [
    { emoji: '⚖️', color: '#ED1C24' },
    { emoji: '🔍', color: '#8b5cf6' },
    { emoji: '🏃', color: '#f59e0b' },
  ];

  const quizOptions = (t('quiz.options', { returnObjects: true }) as string[]).map((text, i) => ({ text, correct: i === 1 }));
  const extraQuiz = t('quizMore', { returnObjects: true }) as Record<string, QuizItem>;
  const quizTotal = EXTRA_QUIZ.length + 1;

  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

  const adminPoints = t('adminKey.points', { returnObjects: true }) as { title: string; desc: string }[];

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

            {/* Chain of trust: the weakest link sits off-chain */}
            <div className="lg:col-span-3 rounded-2xl border border-border bg-card/50 p-5 flex flex-col gap-4 justify-center">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('oracle.chainLabel')}</div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-2">
                {ORACLE_LINK_META.map((m, i) => (
                  <Fragment key={i}>
                    {i > 0 && <ArrowRight className="size-5 text-muted-foreground self-center shrink-0" />}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="rounded-xl border-2 bg-card px-3 py-4 flex flex-col items-center gap-1.5 text-center"
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
                  </Fragment>
                ))}
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
          <KeyPointBar text={t('keyPoints.s5-oracle')} className="mt-3" />
        </div>

        {/* ═══════ EXERCISE: DEFEND THE ORACLE ═══════ */}
        <div id="s5-ex-oracle" className="h-full flex flex-col p-6 lg:p-10">
          <DefendOracleExercise />
          <KeyPointBar text={t('keyPoints.s5-ex-oracle')} className="mt-3" />
        </div>

        {/* ═══════ CHALLENGES & LIMITATIONS ═══════ */}
        <div id="s5-challenges" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('challenges.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('challenges.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4">
            {challengeItems.map((c, i) => {
              const color = challengeMeta[i].color;
              return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="min-h-0 flex flex-col gap-2 rounded-xl border-2 px-5 py-3 justify-center"
                style={{ borderColor: color + '50', backgroundColor: color + '08' }}
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: color + '18' }}>{challengeMeta[i].emoji}</div>
                  <div>
                    <div className="font-black text-base text-foreground leading-tight">{c.title}</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color }}>{c.what}</div>
                  </div>
                </div>
                <div className="rounded-lg bg-card border px-3 py-2" style={{ borderColor: color + '25' }}>
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('challenges.whyLabel')}</span>
                  <p className="text-sm text-foreground leading-snug mt-0.5">{c.why}</p>
                </div>
                <div className="rounded-lg px-3 py-2 border-l-2" style={{ borderColor: color, backgroundColor: color + '12' }}>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color }}>{t('challenges.fixLabel')}</span>
                  <p className="text-sm text-foreground leading-snug mt-0.5">{c.fix}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="px-2 py-1 rounded-md font-bold" style={{ backgroundColor: '#ED1C2414', color: '#ED1C24' }}>
                    <span className="font-black uppercase tracking-wider text-[10px] opacity-80 mr-1.5">{t('challenges.onChainLabel')}</span>{c.chain}
                  </span>
                  <span className="text-muted-foreground font-semibold">{t('challenges.vs')}</span>
                  <span className="px-2 py-1 rounded-md font-bold" style={{ backgroundColor: '#39B54A14', color: '#39B54A' }}>
                    <span className="font-black uppercase tracking-wider text-[10px] opacity-80 mr-1.5">{t('challenges.offChainLabel')}</span>{c.web}
                  </span>
                </div>
              </motion.div>
              );
            })}
          </div>
          <KeyPointBar text={t('keyPoints.s5-challenges')} className="mt-3" />
        </div>

        {/* ═══════ TECHNICAL CHALLENGES ═══════ */}
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
                className="flex flex-col gap-3 rounded-xl border-2 p-5 justify-center"
                style={{ borderColor: color + '50', backgroundColor: color + '08' }}
              >
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: color + '18' }}>{technicalMeta[i].emoji}</div>
                  <div>
                    <div className="font-black text-base text-foreground leading-tight">{c.title}</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color }}>{c.what}</div>
                  </div>
                </div>
                <div className="rounded-lg bg-card border p-3" style={{ borderColor: color + '25' }}>
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('technical.whyLabel')}</span>
                  <p className="text-sm text-foreground leading-snug mt-0.5">{c.why}</p>
                </div>
                <div className="rounded-lg p-3 border-l-2" style={{ borderColor: color, backgroundColor: color + '12' }}>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color }}>{t('technical.fixLabel')}</span>
                  <p className="text-sm text-foreground leading-snug mt-0.5">{c.fix}</p>
                </div>
                <p className="text-xs text-muted-foreground italic">{c.stat}</p>
              </motion.div>
              );
            })}
          </div>
          <KeyPointBar text={t('keyPoints.s5-technical')} className="mt-3" />
        </div>

        {/* ═══════ SECURITY RISKS ═══════ */}
        <div id="s5-risks-security" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('security.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('security.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-4">
            {securityItems.map((r, i) => {
              const color = securityMeta[i].color;
              return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-2.5 rounded-xl border-2 p-4 justify-center"
                style={{ borderColor: color + '50', backgroundColor: color + '08' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: color + '18' }}>{securityMeta[i].emoji}</div>
                  <div className="font-black text-base text-foreground leading-tight">{r.title}</div>
                </div>
                <p className="text-sm text-foreground leading-snug flex-1">{r.what}</p>
                <div className="rounded-lg p-2 border-l-2" style={{ borderColor: color, backgroundColor: color + '12' }}>
                  <span className="text-[11px] font-bold" style={{ color }}>{t('security.fixLabel')}</span>
                  <span className="text-[11px] text-muted-foreground">{r.fix}</span>
                </div>
                <p className="text-xs text-muted-foreground italic">{r.stat}</p>
              </motion.div>
              );
            })}
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

            {/* Three plain points */}
            <div className="col-span-2 flex flex-col gap-3 justify-center">
              {adminPoints.map((p) => (
                <div key={p.title} className="p-3 bg-card border border-border rounded-xl">
                  <div className="font-bold text-sm text-foreground">{p.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{p.desc}</div>
                </div>
              ))}
              <div className="p-3 rounded-xl border border-[#f59e0b]/30 text-xs text-muted-foreground" style={{ backgroundColor: '#f59e0b0f' }}>
                <span className="font-bold text-[#f59e0b]">{t('adminKey.askLabel')}</span>{t('adminKey.askBody')}
              </div>
            </div>

          </div>
          <UnderTheHood terms={['proxy pattern', 'delegatecall', 'timelock', 'multisig', 'renounceOwnership']} className="shrink-0 mt-3" />
          <KeyPointBar text={t('keyPoints.s5-admin-key')} className="mt-3" />
        </div>

        {/* ═══════ FAILURES GALLERY ═══════ */}
        <div id="s5-failures" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('failures.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('failures.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-3">
            {failureItems.map((f, i) => {
              const m = FAILURE_META[i];
              return (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="flex flex-col gap-2 rounded-xl border-2 p-3.5 min-h-0"
                  style={{ borderColor: m.color + '50', backgroundColor: m.color + '08' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xl shrink-0">{m.emoji}</span>
                      <div className="min-w-0">
                        <div className="font-black text-sm text-foreground leading-tight">{f.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">{f.date}</div>
                      </div>
                    </div>
                    <div className="font-mono font-black text-sm shrink-0" style={{ color: m.color }}>{f.loss}</div>
                  </div>
                  <span className="self-start text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ backgroundColor: m.color + '18', color: m.color }}>{f.category}</span>
                  <p className="text-xs text-foreground/90 leading-snug flex-1">{f.what}</p>
                  <div className="text-[11px] text-muted-foreground p-2 rounded-lg border-l-2" style={{ borderColor: m.color, backgroundColor: m.color + '10' }}>
                    <span className="font-bold" style={{ color: m.color }}>{t('failures.lessonLabel')}</span>{f.lesson}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="shrink-0 mt-3 flex items-center justify-between gap-4 flex-wrap pr-16">
            <p className="text-xs text-muted-foreground italic flex-1">{t('failures.footer')}</p>
            <UnderTheHood terms={['validator keys', 'flash loan', 'oracle manipulation', 'selfdestruct', 'reflexivity']} />
          </div>
          <KeyPointBar text={t('keyPoints.s5-failures')} className="mt-3" />
        </div>

        {/* ═══════ COST RISKS ═══════ */}
        <div id="s5-risks-cost" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('cost.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('cost.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4">
            {costItems.map((c, i) => {
              const color = costMeta[i].color;
              return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3 rounded-xl border-2 p-5 justify-center"
                style={{ borderColor: color + '50', backgroundColor: color + '08' }}
              >
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: color + '18' }}>{costMeta[i].emoji}</div>
                  <div>
                    <div className="font-black text-base text-foreground leading-tight">{c.title}</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color }}>{c.what}</div>
                  </div>
                </div>
                <div className="rounded-lg bg-card border p-3" style={{ borderColor: color + '25' }}>
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('cost.whyLabel')}</span>
                  <p className="text-sm text-foreground leading-snug mt-0.5">{c.why}</p>
                </div>
                <div className="rounded-lg p-3 border-l-2" style={{ borderColor: color, backgroundColor: color + '12' }}>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color }}>{t('cost.fixLabel')}</span>
                  <p className="text-sm text-foreground leading-snug mt-0.5">{c.fix}</p>
                </div>
              </motion.div>
              );
            })}
          </div>
          <KeyPointBar text={t('keyPoints.s5-risks-cost')} className="mt-3" />
        </div>

        {/* ═══════ REGULATORY RISKS ═══════ */}
        <div id="s5-risks-regulatory" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('regulatory.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('regulatory.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
            {regulatoryItems.map((c, i) => {
              const color = regulatoryMeta[i].color;
              return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3 rounded-xl border-2 p-5 justify-center"
                style={{ borderColor: color + '50', backgroundColor: color + '08' }}
              >
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: color + '18' }}>{regulatoryMeta[i].emoji}</div>
                  <div>
                    <div className="font-black text-base text-foreground leading-tight">{c.title}</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color }}>{c.what}</div>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed flex-1">{c.body}</p>
                <p className="text-xs italic text-muted-foreground border-l-2 pl-2" style={{ borderColor: color }}>{c.tag}</p>
              </motion.div>
              );
            })}
          </div>
          <KeyPointBar text={t('keyPoints.s5-risks-regulatory')} className="mt-3" />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s5-quiz" className="h-full">
          <QuizSlide
            compact
            label={`Quiz · 1 / ${quizTotal}`}
            question={t('quiz.question')}
            options={quizOptions}
            explanation={t('quiz.explanation')}
          />
        </div>
        {EXTRA_QUIZ.map((q, i) => (
          <div key={q.id} id={q.id} className="h-full">
            <QuizSlide
              compact
              label={`Quiz · ${i + 2} / ${quizTotal}`}
              question={extraQuiz[q.key].question}
              options={extraQuiz[q.key].options.map((text, k) => ({ text, correct: k === q.correct }))}
              explanation={extraQuiz[q.key].explanation}
            />
          </div>
        ))}

        <div id="s5-takeaways" className="h-full">
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
