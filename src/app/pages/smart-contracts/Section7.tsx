import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionNav } from '../../components/navigation/SectionNav';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Users } from 'lucide-react';

// Language-neutral shape — IDs + kind only. Labels come from t() at render time.
const chapterShape = [
  { kind: 'group' as const, id: 'g-brief' },
  { id: 's7-overview' },

  { kind: 'group' as const, id: 'g-plan' },
  { id: 's7-p1-analysis' },
  { id: 's7-p2-technical' },
  { id: 's7-p3-governance' },
  { id: 's7-p4-roadmap' },

  { kind: 'group' as const, id: 'g-submit' },
  { id: 's7-evaluation' },
  { id: 's7-quiz' },
] as const;

// Online sessions calendar — colors are language-neutral; dates/labels come from t().
const TIMELINE_COLORS = ['#6366f1', '#8b5cf6', '#22d3ee', '#f59e0b', '#39B54A'];

// Part 1 — card accent colors (language-neutral). Numbers stay module-side.
const P1_CARDS = [
  { num: '1.1', color: '#6366f1' },
  { num: '1.2', color: '#8b5cf6' },
  { num: '1.3', color: '#22d3ee' },
  { num: '1.4', color: '#39B54A' },
];

// Part 3 — card accent colors (language-neutral).
const P3_CARDS = [
  { num: '3.1', color: '#6366f1' },
  { num: '3.2', color: '#8b5cf6' },
  { num: '3.3', color: '#ED1C24' },
];

// Part 4 — phase accent colors (language-neutral).
const P4_PHASE_COLORS = ['#6366f1', '#8b5cf6', '#39B54A'];

// Evaluation — criteria accent colors (language-neutral).
const EVAL_COLORS = ['#6366f1', '#8b5cf6', '#39B54A', '#22d3ee', '#f59e0b', '#ec4899'];

interface TimelineItem {
  date: string;
  label: string;
}

interface P1Card {
  title: string;
  items: string[];
}

interface P3Card {
  title: string;
  intro: string;
  points: string[];
}

interface P4Phase {
  tag: string;
  desc: string;
}

interface EvalCriterion {
  label: string;
  weight: string;
  sub: string;
}

export function SC_Section7() {
  const { t } = useTranslation('smart-contracts/section-7');

  const chapters = useMemo(
    () =>
      chapterShape.map((c) =>
        'kind' in c
          ? { kind: 'group' as const, id: c.id, label: t(`groups.${c.id}`) }
          : { id: c.id, label: t(`chapters.${c.id}`) }
      ),
    [t]
  );

  const timelineItems = t('timeline.items', { returnObjects: true }) as TimelineItem[];
  const timeline = timelineItems.map((item, i) => ({ ...item, color: TIMELINE_COLORS[i] }));

  const integrates = t('overview.integrates', { returnObjects: true }) as string[];

  const p1Cards = t('p1.cards', { returnObjects: true }) as P1Card[];
  const p3Cards = t('p3.cards', { returnObjects: true }) as P3Card[];
  const p4Phases = t('p4.phases', { returnObjects: true }) as P4Phase[];
  const p4Metrics = t('p4.metrics', { returnObjects: true }) as string[];

  const evalCriteria = t('evaluation.criteria', { returnObjects: true }) as EvalCriterion[];
  const collaboration = t('evaluation.collaboration', { returnObjects: true }) as string[];

  const quizOptionsRaw = t('quiz.options', { returnObjects: true }) as string[];
  const quizOptions = quizOptionsRaw.map((text, i) => ({ text, correct: i === 1 }));

  // Part 1, card 1.3, second bullet — rich inline markup resolved from t().
  const valueFramework = (
    <>
      {t('p1.valueFramework.lead')}
      <strong>{t('p1.valueFramework.trustless')}</strong>
      {t('p1.valueFramework.sep1')}
      <strong>{t('p1.valueFramework.transparency')}</strong>
      {t('p1.valueFramework.sep2')}
      <strong>{t('p1.valueFramework.immutability')}</strong>
      {t('p1.valueFramework.sep3')}
      <strong>{t('p1.valueFramework.automated')}</strong>
      {t('p1.valueFramework.tail')}
    </>
  );

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
            icon={<Users className="size-20 text-[#6366f1]" />}
            gradient="from-[#39B54A] to-[#6366f1]"
          />
        </div>

        {/* ═══════ OVERVIEW + TIMELINE ═══════ */}
        <div id="s7-overview" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('overview.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('overview.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-[1.1fr_1fr] gap-5">

            {/* Left — what / who / how */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-card border border-[#6366f1]/30 rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#6366f1]">{t('overview.teamSizeLabel')}</div>
                  <div className="font-black text-xl text-foreground mt-1">{t('overview.teamSizeValue')}</div>
                </div>
                <div className="p-3 bg-card border border-[#6366f1]/30 rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#6366f1]">{t('overview.deliverableLabel')}</div>
                  <div className="font-black text-xl text-foreground mt-1">{t('overview.deliverableValue')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('overview.deliverableNote')}</div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border rounded-xl flex-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{t('overview.integratesTitle')}</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {integrates.map(c => (
                    <li key={c} className="flex gap-2"><span className="text-[#6366f1] shrink-0 mt-0.5">›</span>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t('overview.mindsetLabel')}</span>{t('overview.mindsetBody')}
              </div>
            </div>

            {/* Right — timeline */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('overview.sessionsLabel')}</div>
              <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto">
                {timeline.map((item) => (
                  <div key={item.date} className="flex items-stretch gap-3 p-3 bg-card border rounded-lg"
                    style={{ borderColor: item.color + '40' }}>
                    <div className="w-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <div className="font-bold text-sm text-foreground" style={{ color: item.color }}>{item.label}</div>
                        <div className="text-[11px] text-muted-foreground font-mono shrink-0">{item.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="shrink-0 p-2.5 bg-[#ED1C24]/10 border border-[#ED1C24]/30 rounded-lg text-xs text-muted-foreground">
                <span className="font-bold text-[#ED1C24]">{t('overview.deadlineLabel')}</span>{t('overview.deadlineBodyA')}<span className="font-mono">{t('overview.deadlineDate')}</span>{t('overview.deadlineBodyB')}
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ PART 1 — ANALYSIS ═══════ */}
        <div id="s7-p1-analysis" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-1">{t('p1.partLabel')}</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('p1.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('p1.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 content-center">
            {p1Cards.map((card, ci) => {
              const meta = P1_CARDS[ci];
              return (
                <div key={meta.num} className="p-4 bg-card border rounded-xl flex flex-col gap-2" style={{ borderColor: meta.color + '40' }}>
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: meta.color }}>{meta.num}</div>
                    <div className="font-black text-sm text-foreground">{card.title}</div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex gap-1.5"><span style={{ color: meta.color }} className="shrink-0 mt-0.5">›</span><span>{item === 'valueFramework' ? valueFramework : item}</span></li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════ PART 2 — TECHNICAL DESIGN ═══════ */}
        <div id="s7-p2-technical" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest mb-1">{t('p2.partLabel')}</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('p2.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('p2.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            <div className="p-5 bg-card border-2 rounded-xl flex flex-col gap-3" style={{ borderColor: '#8b5cf650' }}>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black bg-[#8b5cf6]">2.1</div>
                <div className="font-black text-foreground">{t('p2.platform.title')}</div>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground flex-1">
                <li className="flex gap-1.5"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>{t('p2.platform.item1')}</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span><strong className="text-foreground">{t('p2.platform.item2Strong')}</strong>{t('p2.platform.item2')}</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>{t('p2.platform.item3A')}<em>{t('p2.platform.item3Em')}</em>{t('p2.platform.item3B')}</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>{t('p2.platform.item4A')}<em>{t('p2.platform.item4Em')}</em>{t('p2.platform.item4B')}</li>
              </ul>
              <div className="p-2 bg-[#8b5cf6]/10 rounded-lg text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">{t('p2.platform.tipLabel')}</span>{t('p2.platform.tipBody')}
              </div>
            </div>

            <div className="p-5 bg-card border-2 rounded-xl flex flex-col gap-3" style={{ borderColor: '#22d3ee50' }}>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black bg-[#22d3ee]">2.2</div>
                <div className="font-black text-foreground">{t('p2.architecture.title')}</div>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground flex-1">
                <li className="flex gap-1.5"><span className="text-[#22d3ee] shrink-0 mt-0.5">›</span>{t('p2.architecture.item1A')}<strong className="text-foreground">{t('p2.architecture.item1Strong')}</strong>{t('p2.architecture.item1B')}</li>
                <li className="flex gap-1.5"><span className="text-[#22d3ee] shrink-0 mt-0.5">›</span>{t('p2.architecture.item2')}</li>
                <li className="flex gap-1.5"><span className="text-[#22d3ee] shrink-0 mt-0.5">›</span>{t('p2.architecture.item3')}</li>
                <li className="flex gap-1.5"><span className="text-[#22d3ee] shrink-0 mt-0.5">›</span>{t('p2.architecture.item4')}</li>
              </ul>
              <div className="p-2 bg-[#22d3ee]/10 rounded-lg text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">{t('p2.architecture.bonusLabel')}</span>{t('p2.architecture.bonusBody')}
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ PART 3 — GOVERNANCE & COMPLIANCE ═══════ */}
        <div id="s7-p3-governance" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-widest mb-1">{t('p3.partLabel')}</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('p3.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('p3.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">

            {p3Cards.map((card, ci) => {
              const meta = P3_CARDS[ci];
              return (
                <div key={meta.num} className="p-5 bg-card border-2 rounded-xl flex flex-col gap-3" style={{ borderColor: meta.color + '50' }}>
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: meta.color }}>{meta.num}</div>
                    <div className="font-black text-sm text-foreground">{card.title}</div>
                  </div>
                  <div className="text-xs text-muted-foreground italic">{card.intro}</div>
                  <ul className="space-y-2 text-xs text-foreground/90 flex-1">
                    {card.points.map((p, i) => (
                      <li key={i} className="flex gap-2 leading-snug">
                        <span style={{ color: meta.color }} className="shrink-0 mt-0.5 font-bold">›</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

          </div>
        </div>

        {/* ═══════ PART 4 — ROADMAP ═══════ */}
        <div id="s7-p4-roadmap" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest mb-1">{t('p4.partLabel')}</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('p4.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('p4.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-[1.6fr_1fr] gap-5 content-center">

            {/* Phases */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('p4.phasedPlanLabel')}</div>
              {p4Phases.map((p, i) => {
                const color = P4_PHASE_COLORS[i];
                return (
                  <div key={p.tag} className="flex items-center gap-3 p-3 bg-card border rounded-xl" style={{ borderColor: color + '40' }}>
                    <div className="px-3 py-1 rounded-full font-black text-xs text-white shrink-0" style={{ backgroundColor: color }}>{p.tag}</div>
                    <div className="flex-1 text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                );
              })}
              <div className="p-3 bg-muted/40 border border-border rounded-xl text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t('p4.eachPhaseLabel')}</span>{t('p4.eachPhaseBodyA')}<strong className="text-foreground">{t('p4.eachPhaseStrong')}</strong>{t('p4.eachPhaseBodyB')}
              </div>
            </div>

            {/* Success metrics */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('p4.metricsLabel')}</div>
              <div className="p-4 bg-card border border-[#39B54A]/40 rounded-xl flex-1 flex flex-col gap-2">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('p4.metricsIntro')}
                </p>
                <ul className="space-y-1.5 text-xs text-muted-foreground mt-2">
                  {p4Metrics.map(m => <li key={m} className="flex gap-1.5"><span className="text-[#39B54A] shrink-0">›</span>{m}</li>)}
                </ul>
                <div className="mt-auto p-2 bg-[#39B54A]/10 rounded-lg text-[11px] text-muted-foreground">
                  {t('p4.metricsTip')}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ EVALUATION + SUBMISSION ═══════ */}
        <div id="s7-evaluation" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('evaluation.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('evaluation.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Eval criteria */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('evaluation.criteriaLabel')}</div>
              {evalCriteria.map((c, i) => {
                const color = EVAL_COLORS[i];
                return (
                  <div key={c.label} className="flex items-center gap-3 p-2.5 bg-card border border-border rounded-xl">
                    <div className="w-2 self-stretch rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-xs text-foreground">{c.label}</div>
                        <div className="font-black text-xs shrink-0" style={{ color }}>{c.weight}</div>
                      </div>
                      <div className="text-[10px] text-muted-foreground">{c.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submission */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('evaluation.submissionLabel')}</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-card border border-border rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('evaluation.formatLabel')}</div>
                  <div className="font-bold text-sm text-foreground mt-1">{t('evaluation.formatValue')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('evaluation.formatNote')}</div>
                </div>
                <div className="p-3 bg-card border border-border rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('evaluation.lengthLabel')}</div>
                  <div className="font-bold text-sm text-foreground mt-1">{t('evaluation.lengthValue')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('evaluation.lengthNote')}</div>
                </div>
                <div className="p-3 bg-card border border-border rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('evaluation.presentationLabel')}</div>
                  <div className="font-bold text-sm text-foreground mt-1">{t('evaluation.presentationValue')}</div>
                </div>
                <div className="p-3 bg-card border border-border rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('evaluation.appendicesLabel')}</div>
                  <div className="font-bold text-sm text-foreground mt-1">{t('evaluation.appendicesValue')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('evaluation.appendicesNote')}</div>
                </div>
              </div>

              <div className="p-4 bg-card border border-[#6366f1]/30 rounded-xl flex-1">
                <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-2">{t('evaluation.collaborationLabel')}</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {collaboration.map((item, i) => (
                    <li key={i} className="flex gap-1.5"><span className="text-[#6366f1] shrink-0">›</span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#ED1C24]/10 border border-[#ED1C24]/30 rounded-xl text-xs text-muted-foreground">
                <span className="font-bold text-[#ED1C24]">{t('evaluation.deadlineLabel')}</span>{t('evaluation.deadlineBody')}
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s7-quiz" className="h-full">
          <QuizSlide
            question={t('quiz.question')}
            options={quizOptions}
            explanation={t('quiz.explanation')}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
