import { useState, useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { Brain, Target, Scale, ShieldAlert, Check, X, ArrowUpRight, Lightbulb } from 'lucide-react';
import { ClassDiscussion } from '../../components/shared/ClassDiscussion';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';

import imgDaoTimeline   from '../../../assets/sc/dao-timeline.png';
import imgAsxAsic       from '../../../assets/sc/asx-asic.jpg';
import imgDecisionChart from '../../../assets/sc/decision-flowchart.png';

// Language-neutral shape — IDs + kind only. Labels resolved via t() at render time.
const chapterShape = [
  { kind: 'group' as const, id: 'g-decide' },
  { id: 's4-decision-intro' },
  { id: 's4-decision-chart' },
  { id: 's4-decision-flow' },
  { id: 's4-discussion' },
  { id: 's4-decision-yes' },
  { id: 's4-decision-no' },

  { kind: 'group' as const, id: 'g-cases' },
  { id: 's4-case-success' },
  { id: 's4-case-sc-fail' },
  { id: 's4-case-org-fail' },
  { id: 's4-case-est-quiz' },
  { id: 's4-case-dao-quiz' },
  { id: 's4-case-asx-quiz' },

  { kind: 'group' as const, id: 'g-adopt' },
  { id: 's4-adoption' },

  { kind: 'group' as const, id: 'g-close' },
  { id: 's4-quiz-tree' },
  { id: 's4-quiz-fit' },
  { id: 's4-quiz-checks' },
  { id: 's4-quiz-cases' },
  { id: 's4-quiz' },
  { id: 's4-takeaways' },
] as const;

// ─── Interactive Decision Flow ───────────────────────────────────────────────

type Verdict = 'sc' | 'hybrid' | 'db';

// Language-neutral: question ids + branch targets. Prompt text resolved via t().
const QUESTIONS = [
  { id: 'parties', yes: 'sc',     no: 'db' },
  { id: 'auto',    yes: 'sc',     no: 'db' },
  { id: 'inter',   yes: 'sc',     no: 'db' },
  { id: 'immut',   yes: 'sc',     no: 'hybrid' },
  { id: 'trans',   yes: 'sc',     no: 'hybrid' },
  { id: 'priv',    yes: 'hybrid', no: 'sc' },
  { id: 'reg',     yes: 'hybrid', no: 'sc' },
  { id: 'flex',    yes: 'db',     no: 'sc' },
] as const;

const VERDICT_META: Record<Verdict, { emoji: string; color: string }> = {
  sc:     { emoji: '✅', color: '#39B54A' },
  hybrid: { emoji: '⚠️', color: '#f59e0b' },
  db:     { emoji: '❌', color: '#ED1C24' },
};

function DecisionFlow() {
  const { t } = useTranslation('smart-contracts/section-4');
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no'>>({});
  const [done,    setDone]    = useState(false);
  const idx = Object.keys(answers).length;
  const current = QUESTIONS[idx];

  const verdict: Verdict | null = (() => {
    if (!done) return null;
    const counts: Record<Verdict, number> = { sc: 0, hybrid: 0, db: 0 };
    QUESTIONS.forEach(q => {
      const a = answers[q.id];
      if (!a) return;
      const v = (a === 'yes' ? q.yes : q.no) as Verdict;
      counts[v]++;
    });
    // Prefer most-frequent; tie-break: hybrid > db > sc
    const max = Math.max(counts.sc, counts.hybrid, counts.db);
    if (counts.hybrid >= 3) return 'hybrid';
    if (counts.db >= 4)     return 'db';
    if (counts.sc >= 4)     return 'sc';
    return 'hybrid';
  })();

  const answer = (a: 'yes' | 'no') => {
    const next = { ...answers, [current.id]: a };
    setAnswers(next);
    if (Object.keys(next).length === QUESTIONS.length) setDone(true);
  };

  const reset = () => { setAnswers({}); setDone(false); };

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">{t('decisionFlow.badge')}</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">{t('decisionFlow.heading')}</h2>
        <p className="text-muted-foreground text-sm">{t('decisionFlow.subtitle')}</p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4">

        {/* Progress */}
        <div className="shrink-0 flex items-center gap-1.5">
          {QUESTIONS.map((q, i) => (
            <div key={q.id} className="flex-1 h-1.5 rounded-full transition-colors"
              style={{ backgroundColor: i < idx || done ? '#6366f1' : 'var(--muted)' }} />
          ))}
          <div className="text-xs text-muted-foreground ml-2 w-12 text-right">{Math.min(idx + 1, QUESTIONS.length)} / {QUESTIONS.length}</div>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center">
          {!done && current ? (
            <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl w-full p-6 bg-card border border-[#6366f1]/30 rounded-2xl flex flex-col gap-5">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">{t('decisionFlow.questionLabel', { num: idx + 1 })}</div>
              <div className="text-2xl font-bold text-foreground">{t(`decisionFlow.questions.${current.id}`)}</div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => answer('yes')}
                  className="px-5 py-3 rounded-xl bg-[#39B54A] text-white font-bold hover:bg-[#39B54A]/90 transition-colors">
                  {t('decisionFlow.yes')}
                </button>
                <button onClick={() => answer('no')}
                  className="px-5 py-3 rounded-xl bg-[#ED1C24] text-white font-bold hover:bg-[#ED1C24]/90 transition-colors">
                  {t('decisionFlow.no')}
                </button>
              </div>
            </motion.div>
          ) : verdict ? (
            <AnimatePresence>
              <motion.div key="verdict" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl w-full p-8 bg-card border-4 rounded-2xl flex flex-col gap-4 text-center"
                style={{ borderColor: VERDICT_META[verdict].color }}>
                <div className="text-6xl">{VERDICT_META[verdict].emoji}</div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: VERDICT_META[verdict].color }}>{t('decisionFlow.verdictLabel')}</div>
                <div className="text-3xl font-black text-foreground">{t(`decisionFlow.verdicts.${verdict}.title`)}</div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">{t(`decisionFlow.verdicts.${verdict}.desc`)}</p>
                <button onClick={reset}
                  className="self-center mt-3 px-5 py-2 rounded-xl bg-muted text-sm font-semibold text-muted-foreground hover:bg-muted/80 transition-colors">
                  {t('decisionFlow.startOver')}
                </button>
              </motion.div>
            </AnimatePresence>
          ) : null}
        </div>

      </div>
    </div>
  );
}

interface TitleDesc { title: string; desc: string }
interface ChartStep { q: string; verdict: string }
interface ResultStat { value: string; label: string }
interface CheckItem { title: string; question: string; points: string[]; caseName: string; caseNote: string }
const YES_EMOJI = ['👥', '⚡', '🔍', '💰', '🔓', '🔒', '🌍'];
const NO_EMOJI = ['🏢', '⚡', '🔄', '📦', '🤐', '⚖️', '🧑', '💸'];

// ─── Adoption: three checks before you build ─────────────────────────────────
// Language-neutral: icon, colour and the case slide each check points back to.
const CHECK_META = [
  { id: 'fit',   Icon: Target,      color: '#6366f1', caseId: 's4-case-org-fail' },
  { id: 'legal', Icon: Scale,       color: '#22d3ee', caseId: 's4-case-success' },
  { id: 'risk',  Icon: ShieldAlert, color: '#f59e0b', caseId: 's4-case-sc-fail' },
] as const;
const PASS = '#39B54A';
const FAIL = '#ED1C24';

function AdoptionChecks() {
  const { t } = useTranslation('smart-contracts/section-4');
  const items = t('adoption.items', { returnObjects: true }) as CheckItem[];
  const [marks, setMarks] = useState<Record<string, 'pass' | 'fail'>>({});

  const mark = (id: string, v: 'pass' | 'fail') =>
    setMarks((m) => {
      const next = { ...m };
      if (next[id] === v) delete next[id]; else next[id] = v;
      return next;
    });

  const answered = Object.keys(marks).length;
  const failing = CHECK_META.map((m, i) => ({ m, item: items[i] })).filter(({ m }) => marks[m.id] === 'fail');
  const state: 'idle' | 'progress' | 'stop' | 'go' =
    failing.length > 0 ? 'stop' : answered === CHECK_META.length ? 'go' : answered > 0 ? 'progress' : 'idle';
  const stateColor = state === 'stop' ? FAIL : state === 'go' ? PASS : '#6366f1';

  const goToCase = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
        {CHECK_META.map((meta, i) => {
          const item = items[i];
          const m = marks[meta.id];
          const border = m === 'pass' ? PASS : m === 'fail' ? FAIL : meta.color + '40';
          return (
            <div key={meta.id} className="p-4 lg:p-5 bg-card border-2 rounded-xl flex flex-col gap-3 transition-colors" style={{ borderColor: border }}>
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: meta.color + '1f' }}>
                  <meta.Icon className="size-6" style={{ color: meta.color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: meta.color }}>{t('adoption.checkLabel', { num: i + 1 })}</div>
                  <div className="font-bold text-base text-foreground leading-tight">{item.title}</div>
                </div>
              </div>
              <div className="text-lg lg:text-xl font-black text-foreground leading-snug">{item.question}</div>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                {item.points.map((pt, j) => (
                  <li key={j} className="flex gap-1.5"><span style={{ color: meta.color }}>›</span>{pt}</li>
                ))}
              </ul>
              <button type="button" onClick={() => goToCase(meta.caseId)}
                className="mt-auto p-2 rounded-lg text-left text-xs text-muted-foreground hover:brightness-110 transition"
                style={{ backgroundColor: meta.color + '1a' }}>
                <span className="font-semibold text-foreground inline-flex items-center gap-1">
                  {t('adoption.seenIn')} {item.caseName}<ArrowUpRight className="size-3" />
                </span>
                <span className="block mt-0.5">{item.caseNote}</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" aria-pressed={m === 'pass'} onClick={() => mark(meta.id, 'pass')}
                  className="px-3 py-1.5 rounded-lg border text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                  style={m === 'pass' ? { backgroundColor: PASS, borderColor: PASS, color: '#fff' } : { borderColor: PASS + '66', color: PASS }}>
                  <Check className="size-3.5" strokeWidth={3} />{t('adoption.pass')}
                </button>
                <button type="button" aria-pressed={m === 'fail'} onClick={() => mark(meta.id, 'fail')}
                  className="px-3 py-1.5 rounded-lg border text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                  style={m === 'fail' ? { backgroundColor: FAIL, borderColor: FAIL, color: '#fff' } : { borderColor: FAIL + '66', color: FAIL }}>
                  <X className="size-3.5" strokeWidth={3} />{t('adoption.fail')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verdict strip — updates as the class marks each check for its own idea */}
      <div className="shrink-0 mt-4 px-4 py-2.5 rounded-xl border-2 flex items-center gap-3 transition-colors"
        style={{ borderColor: stateColor + '80', backgroundColor: stateColor + '14' }}>
        <div className="flex items-center gap-1.5 shrink-0">
          {CHECK_META.map((meta) => {
            const m = marks[meta.id];
            return (
              <span key={meta.id} className="size-3 rounded-full border-2"
                style={{ borderColor: m === 'pass' ? PASS : m === 'fail' ? FAIL : 'var(--border)', backgroundColor: m === 'pass' ? PASS : m === 'fail' ? FAIL : 'transparent' }} />
            );
          })}
        </div>
        <div className="text-sm text-foreground">
          <span className="font-black" style={{ color: stateColor }}>{t(`adoption.verdict.${state}.label`)}</span>{' '}
          {state === 'stop' && <span className="font-semibold">{failing.map(({ item }) => item.title).join(' · ')}. </span>}
          <span className="text-muted-foreground">{t(`adoption.verdict.${state}.body`)}</span>
        </div>
      </div>
    </>
  );
}

// ─── Case-study slide ────────────────────────────────────────────────────────
// One layout for all three field cases: header, three full-height panels
// (context / what happened / outcome), then the lesson as its own band.
interface CasePanel { label: string; color: string; items?: string[]; stats?: ResultStat[] }
interface QuizItem { question: string; options: string[]; explanation: string }

function CaseSlide({ id, accent, kicker, heading, subtitle, image, panels, lessonLabel, lessonBody, keyPoint }: {
  id: string; accent: string; kicker: string; heading: string; subtitle: string; image?: ReactNode;
  panels: CasePanel[]; lessonLabel: string; lessonBody: string; keyPoint: string;
}) {
  // Longer copy (mostly the PT strings) steps the bullets down one size so every panel still fits.
  const dense = panels.some((p) => (p.items ?? []).join('').length > 260);
  return (
    <div id={id} className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 flex items-center gap-5">
        {image}
        <div className="min-w-0">
          <div className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: accent }}>{kicker}</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">{heading}</h2>
          <p className="text-muted-foreground text-base lg:text-lg mt-1">{subtitle}</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mt-5">
        {panels.map((panel, i) => (
          <div key={panel.label} className="min-h-0 p-5 lg:p-6 border-2 rounded-2xl flex flex-col"
            style={{ borderColor: panel.color + '4d', background: `linear-gradient(135deg, ${panel.color}1a, transparent 70%)` }}>
            <div className="shrink-0 flex items-center gap-2.5 pb-3 mb-1 border-b" style={{ borderColor: panel.color + '33' }}>
              <span className="size-7 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" style={{ backgroundColor: panel.color }}>{i + 1}</span>
              <span className="text-base font-black uppercase tracking-wider" style={{ color: panel.color }}>{panel.label}</span>
            </div>
            {panel.items && (
              <ul className={`flex-1 min-h-0 flex flex-col justify-evenly gap-2 text-foreground leading-snug ${dense ? 'text-base' : 'text-base lg:text-lg'}`}>
                {panel.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="font-black shrink-0" style={{ color: panel.color }}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {panel.stats && (
              <div className="flex-1 min-h-0 flex flex-col justify-evenly gap-2">
                {panel.stats.map((r, j) => (
                  <div key={j} className="px-4 py-3 bg-card border border-border rounded-xl">
                    <div className="font-mono font-black text-3xl lg:text-4xl leading-none" style={{ color: panel.color }}>{r.value}</div>
                    <div className="text-base text-muted-foreground mt-1.5 leading-snug">{r.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="shrink-0 mt-4 px-5 py-3 rounded-2xl border-2 flex items-center gap-3.5"
        style={{ borderColor: accent + '80', backgroundColor: accent + '14' }}>
        <Lightbulb className="size-7 shrink-0" style={{ color: accent }} />
        <p className="text-lg lg:text-xl text-foreground leading-snug">
          <span className="font-black" style={{ color: accent }}>{lessonLabel}</span>{lessonBody}
        </p>
      </div>
      <KeyPointBar text={keyPoint} className="mt-3" />
    </div>
  );
}

// Correct-option index per quiz (language-neutral; option text lives in the locale files).
const EXTRA_QUIZ = [
  { id: 's4-quiz-tree',   key: 'tree',   correct: 3 },
  { id: 's4-quiz-fit',    key: 'fit',    correct: 1 },
  { id: 's4-quiz-checks', key: 'checks', correct: 0 },
  { id: 's4-quiz-cases',  key: 'cases',  correct: 2 },
] as const;

export function SC_Section4() {
  const { t } = useTranslation('smart-contracts/section-4');

  const chapters = useMemo(
    () => chapterShape.map((c) =>
      'kind' in c
        ? { kind: 'group' as const, id: c.id, label: t(`groups.${c.id}`) }
        : { id: c.id, label: t(`chapters.${c.id}`) }
    ),
    [t]
  );

  const chartSteps   = t('decisionChart.steps', { returnObjects: true }) as ChartStep[];
  const yesItems     = t('decisionYes.items', { returnObjects: true }) as TitleDesc[];
  const noItems      = t('decisionNo.items', { returnObjects: true }) as TitleDesc[];

  const successBg    = t('caseSuccess.background', { returnObjects: true }) as string[];
  const successUse   = t('caseSuccess.useCases', { returnObjects: true }) as string[];
  const successRes   = t('caseSuccess.results', { returnObjects: true }) as ResultStat[];

  const scFailVision   = t('caseScFail.vision', { returnObjects: true }) as string[];
  const scFailHack     = t('caseScFail.hack', { returnObjects: true }) as string[];
  const scFailResponse = t('caseScFail.response', { returnObjects: true }) as string[];

  const orgFailBg       = t('caseOrgFail.background', { returnObjects: true }) as string[];
  const orgFailHappened = t('caseOrgFail.happened', { returnObjects: true }) as string[];
  const orgFailWhy      = t('caseOrgFail.why', { returnObjects: true }) as string[];

  const daoQuizOptions = t('daoQuiz.options', { returnObjects: true }) as string[];
  const asxQuizOptions = t('asxQuiz.options', { returnObjects: true }) as string[];

  const estQuizOptionsTyped = (t('estQuiz.options', { returnObjects: true }) as string[]).map((text, i) => ({ text, correct: i === 1 }));
  const extraQuiz = t('quizMore', { returnObjects: true }) as Record<string, QuizItem>;
  const daoQuizOptionsTyped = daoQuizOptions.map((text, i) => ({ text, correct: i === 0 }));
  const asxQuizOptionsTyped = asxQuizOptions.map((text, i) => ({ text, correct: i === 2 }));
  const mainQuizOptions = (t('quiz.options', { returnObjects: true }) as string[]).map((text, i) => ({ text, correct: i === 1 }));

  const takeaways = t('takeaways.items', { returnObjects: true }) as string[];

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
            icon={<Brain className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ DECISION INTRO ═══════ */}
        <div id="s4-decision-intro" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('decisionIntro.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('decisionIntro.subtitle')}</p>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <div className="max-w-3xl text-center space-y-6">
              <div className="text-5xl lg:text-6xl font-black text-foreground leading-tight">
                {t('decisionIntro.bigA')}<br/>
                <span className="text-[#6366f1]">{t('decisionIntro.bigEmph')}</span> {t('decisionIntro.bigB')}<br/>
                {t('decisionIntro.bigC')}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-5 bg-card border border-[#6366f1]/30 rounded-xl">
                  <div className="text-2xl mb-2">🚫</div>
                  <div className="font-bold text-foreground mb-1">{t('decisionIntro.card1')}</div>
                </div>
                <div className="p-5 bg-card border border-[#8b5cf6]/30 rounded-xl">
                  <div className="text-2xl mb-2">🚫</div>
                  <div className="font-bold text-foreground mb-1">{t('decisionIntro.card2')}</div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm italic">
                {t('decisionIntro.footnote')}
              </p>
            </div>
          </div>
          <KeyPointBar text={t('keyPoints.s4-decision-intro')} className="mt-3" />
        </div>

        {/* ═══════ DECISION TREE — CANONICAL CHART ═══════ */}
        <div id="s4-decision-chart" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('decisionChart.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('decisionChart.subtitle')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-[2fr_1fr] gap-5">
            {/* Chart */}
            <div className="flex items-center justify-center bg-white rounded-xl border border-border p-3 min-h-0">
              <img
                src={imgDecisionChart}
                alt={t('decisionChart.imgAlt')}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {/* Walkthrough */}
            <div className="flex flex-col gap-2 overflow-y-auto">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">{t('decisionChart.howToRead')}</div>
              {chartSteps.map((step, i) => {
                const color = ['#ED1C24', '#ED1C24', '#f59e0b', '#f59e0b', '#22d3ee', '#39B54A'][i];
                return (
                  <div key={i} className="px-2 py-1 bg-card border border-border rounded-lg" style={{ borderColor: color + '40' }}>
                    <div className="text-[10px] text-muted-foreground">Q{i + 1}</div>
                    <div className="font-semibold text-xs text-foreground">{step.q}</div>
                    <div className="text-[10px] font-bold mt-0.5" style={{ color }}>{step.verdict}</div>
                  </div>
                );
              })}
              <div className="mt-auto p-2 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-lg text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">{t('decisionChart.pointLabel')}</span>{t('decisionChart.pointBody')}
              </div>
              <UnderTheHood terms={['permissioned vs public', 'access control', 'Bitcoin-like ledger']} />
            </div>
          </div>
          <KeyPointBar text={t('keyPoints.s4-decision-chart')} className="mt-3" />
        </div>

        {/* ═══════ INTERACTIVE DECISION FLOW ═══════ */}
        <div id="s4-decision-flow" className="h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <DecisionFlow />
          </div>
          <div className="shrink-0 px-6 lg:px-8 pb-6 -mt-3">
            <KeyPointBar text={t('keyPoints.s4-decision-flow')} />
          </div>
        </div>

        {/* ═══════ DISCUSSION — RUN THE FRAMEWORK TOGETHER ═══════ */}
        <div id="s4-discussion" className="h-full">
          <ClassDiscussion
            badge={t('discussion.badge')}
            duration={t('discussion.duration')}
            title={t('discussion.title')}
            lead={t('discussion.lead')}
            questions={t('discussion.questions', { returnObjects: true }) as string[]}
            note={t('discussion.note')}
          />
        </div>

        {/* ═══════ WHEN SC MAKE SENSE ═══════ */}
        <div id="s4-decision-yes" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('decisionYes.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('decisionYes.subtitle')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 content-center">
            {yesItems.map((p, i) => (
              <div key={p.title} className="flex items-start gap-3 p-4 bg-card border border-[#39B54A]/25 rounded-xl">
                <div className="size-10 rounded-xl bg-[#39B54A]/15 flex items-center justify-center text-2xl shrink-0">{YES_EMOJI[i]}</div>
                <div>
                  <div className="font-bold text-sm text-foreground mb-1">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <KeyPointBar text={t('keyPoints.s4-decision-yes')} className="mt-3" />
        </div>

        {/* ═══════ WHEN TO RETHINK ═══════ */}
        <div id="s4-decision-no" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('decisionNo.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('decisionNo.subtitle')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 content-center">
            {noItems.map((p, i) => (
              <div key={p.title} className="flex items-start gap-3 p-4 bg-card border border-[#ED1C24]/25 rounded-xl">
                <div className="size-10 rounded-xl bg-[#ED1C24]/15 flex items-center justify-center text-2xl shrink-0">{NO_EMOJI[i]}</div>
                <div>
                  <div className="font-bold text-sm text-foreground mb-1">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <KeyPointBar text={t('keyPoints.s4-decision-no')} className="mt-3" />
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* THREE LESSONS FROM THE FIELD                                */}
        {/* ═══════════════════════════════════════════════════════════ */}


        {/* ═══════ CASE: ESTONIA — SUCCESS ═══════ */}
        <CaseSlide
          id="s4-case-success"
          accent="#39B54A"
          kicker={t('caseSuccess.kicker')}
          heading={t('caseSuccess.heading')}
          subtitle={t('caseSuccess.subtitle')}
          panels={[
            { label: t('caseSuccess.backgroundLabel'), color: '#22d3ee', items: successBg },
            { label: t('caseSuccess.useCasesLabel'),   color: '#6366f1', items: successUse },
            { label: t('caseSuccess.resultsLabel'),    color: '#39B54A', stats: successRes },
          ]}
          lessonLabel={t('caseSuccess.whyLabel')}
          lessonBody={t('caseSuccess.whyBody')}
          keyPoint={t('keyPoints.s4-case-success')}
        />

        {/* ═══════ CASE: THE DAO — SMART CONTRACT FAILURE ═══════ */}
        <CaseSlide
          id="s4-case-sc-fail"
          accent="#f59e0b"
          kicker={t('caseScFail.kicker')}
          heading={t('caseScFail.heading')}
          subtitle={t('caseScFail.subtitle')}
          image={<img src={imgDaoTimeline} alt={t('caseScFail.imgAlt')} className="hidden lg:block h-28 rounded-xl object-contain shrink-0 bg-white p-1.5" />}
          panels={[
            { label: t('caseScFail.visionLabel'),   color: '#6366f1', items: scFailVision },
            { label: t('caseScFail.hackLabel'),     color: '#ED1C24', items: scFailHack },
            { label: t('caseScFail.responseLabel'), color: '#f59e0b', items: scFailResponse },
          ]}
          lessonLabel={t('caseScFail.lessonsLabel')}
          lessonBody={t('caseScFail.lessonsBody')}
          keyPoint={t('keyPoints.s4-case-sc-fail')}
        />

        {/* ═══════ CASE: ASX — ORGANISATIONAL FAILURE ═══════ */}
        <CaseSlide
          id="s4-case-org-fail"
          accent="#ED1C24"
          kicker={t('caseOrgFail.kicker')}
          heading={t('caseOrgFail.heading')}
          subtitle={t('caseOrgFail.subtitle')}
          image={<img src={imgAsxAsic} alt={t('caseOrgFail.imgAlt')} className="hidden lg:block h-28 rounded-xl object-cover shrink-0" />}
          panels={[
            { label: t('caseOrgFail.backgroundLabel'), color: '#6366f1', items: orgFailBg },
            { label: t('caseOrgFail.happenedLabel'),   color: '#ED1C24', items: orgFailHappened },
            { label: t('caseOrgFail.whyLabel'),        color: '#f59e0b', items: orgFailWhy },
          ]}
          lessonLabel={t('caseOrgFail.lessonLabel')}
          lessonBody={t('caseOrgFail.lessonBody')}
          keyPoint={t('keyPoints.s4-case-org-fail')}
        />

        {/* ═══════ QUIZ — ESTONIA ═══════ */}
        <div id="s4-case-est-quiz" className="h-full">
          <QuizSlide
            compact
            question={t('estQuiz.question')}
            options={estQuizOptionsTyped}
            explanation={t('estQuiz.explanation')}
          />
        </div>

        {/* ═══════ QUIZ — DAO ═══════ */}
        <div id="s4-case-dao-quiz" className="h-full">
          <QuizSlide
            compact
            question={t('daoQuiz.question')}
            options={daoQuizOptionsTyped}
            explanation={t('daoQuiz.explanation')}
          />
        </div>

        {/* ═══════ QUIZ — ASX ═══════ */}
        <div id="s4-case-asx-quiz" className="h-full">
          <QuizSlide
            compact
            question={t('asxQuiz.question')}
            options={asxQuizOptionsTyped}
            explanation={t('asxQuiz.explanation')}
          />
        </div>

        {/* ═══════ ADOPTION — THREE CHECKS BEFORE YOU BUILD ═══════ */}
        <div id="s4-adoption" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-1">{t('adoption.kicker')}</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('adoption.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('adoption.subtitle')}</p>
          </div>
          <AdoptionChecks />
          <KeyPointBar text={t('keyPoints.s4-adoption')} className="mt-3" />
        </div>

        {/* ═══════ QUIZ — section review (decision tree, fit, three checks, cases) ═══════ */}
        {EXTRA_QUIZ.map((q) => (
          <div key={q.id} id={q.id} className="h-full">
            <QuizSlide
              compact
              question={extraQuiz[q.key].question}
              options={extraQuiz[q.key].options.map((text, i) => ({ text, correct: i === q.correct }))}
              explanation={extraQuiz[q.key].explanation}
            />
          </div>
        ))}

        {/* ═══════ QUIZ — bank bond ═══════ */}
        <div id="s4-quiz" className="h-full">
          <QuizSlide
            compact
            question={t('quiz.question')}
            options={mainQuizOptions}
            explanation={t('quiz.explanation')}
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s4-takeaways" className="h-full">
          <TakeawaySlide
            title={t('takeaways.title')}
            takeaways={takeaways}
          />
        </div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
