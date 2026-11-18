import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { FileCode2, Check, X, Scale, Handshake, Database } from 'lucide-react';

import imgSzaboVending from '../../../assets/sc/szabo-vending-machine.png';

// Language-neutral shape — only IDs. Labels come from t() at render time.
const chapterIds = [
  's1-why',
  's1-recap',
  's1-hype',
  's1-exercise',
  's1-history',
  's1-quiz',
  's1-takeaways',
] as const;


// ─── Interactive: Contract or not? ──────────────────────────────────────────

// Language-neutral data: true = could run as a smart contract, false = needs a human / institution.
const SCENARIO_ANSWERS = [true, false, true, false, false, true];

interface Scenario { title: string; desc: string; reason: string; }

function ContractOrNotExercise() {
  const { t } = useTranslation('smart-contracts/section-1');
  const scenarioText = t('exercise.scenarios', { returnObjects: true }) as Scenario[];
  const SCENARIOS = scenarioText.map((s, i) => ({ ...s, answer: SCENARIO_ANSWERS[i] }));

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
      <div className="shrink-0 flex items-center justify-between mb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">{t('exercise.badge')}</span>
          <h2 className="text-2xl font-bold text-foreground mt-1">{t('exercise.heading')}</h2>
          <p className="text-muted-foreground text-sm mt-0.5">{t('exercise.subtitle')}</p>
        </div>
        <div className="flex items-center gap-4">
          {done > 0 && (
            <div className="text-right">
              <div className="text-2xl font-black" style={{ color: correct === done ? '#39B54A' : '#f59e0b' }}>{correct}/{done}</div>
              <div className="text-xs text-muted-foreground">{t('exercise.scoreLabel')}</div>
            </div>
          )}
          {done === total && (
            <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-xs font-semibold text-muted-foreground transition-colors">{t('exercise.reset')}</button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-3">
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
              <div className="flex-1 p-4 flex flex-col gap-1.5">
                <div className="font-black text-lg text-foreground leading-tight">{s.title}</div>
                <div className="text-sm text-muted-foreground leading-snug">{s.desc}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm leading-snug font-medium mt-auto"
                      style={{ color: isRight ? '#39B54A' : '#ED1C24' }}
                    >
                      {isRight ? '✓ ' : '✗ '}{s.reason}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!isOpen ? (
                <div className="flex border-t border-border shrink-0">
                  <button
                    onClick={() => handlePick(i, true)}
                    className="flex-1 py-2 px-1 text-xs font-black text-[#39B54A] hover:bg-[#39B54A]/15 transition-colors border-r border-border"
                  >{t('exercise.yes')}</button>
                  <button
                    onClick={() => handlePick(i, false)}
                    className="flex-1 py-2 px-1 text-xs font-black text-[#ED1C24] hover:bg-[#ED1C24]/15 transition-colors"
                  >{t('exercise.no')}</button>
                </div>
              ) : (
                <div className="shrink-0 flex items-center justify-center py-2 gap-1.5 border-t" style={{ borderColor: isRight ? '#39B54A40' : '#ED1C2440' }}>
                  {isRight
                    ? <Check className="size-4 text-[#39B54A]" strokeWidth={3} />
                    : <X     className="size-4 text-[#ED1C24]" strokeWidth={3} />}
                  <span className="text-xs font-bold" style={{ color: isRight ? '#39B54A' : '#ED1C24' }}>
                    {s.answer ? t('exercise.resultSc') : t('exercise.resultNotSc')}
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

interface WhyOption { tag: string; title: string; role: string; trust: string; cost: string; weak: string; }
interface RecapCard { title: string; desc: string; }
interface HistoryEvent { year: string; tag: string; title: string; desc: string; }
interface HypeCard { title: string; body: string; }

// The three incumbents a smart contract competes with, then the challenger itself.
const WHY_META = [
  { Icon: Scale,     color: '#ED1C24' },
  { Icon: Handshake, color: '#f59e0b' },
  { Icon: Database,  color: '#8b5cf6' },
  { Icon: FileCode2, color: '#6366f1' },
];

const HYPE_META = [
  { emoji: '⚖️', color: '#ED1C24' },
  { emoji: '🤖', color: '#f59e0b' },
  { emoji: '⛽', color: '#8b5cf6' },
  { emoji: '🔌', color: '#6366f1' },
];

export function SC_Section1() {
  const { t } = useTranslation('smart-contracts/section-1');

  const chapters = useMemo(
    () => chapterIds.map((id) => ({ id, label: t(`chapters.${id}`) })),
    [t]
  );

  // Language-neutral presentation data merged with translated text.
  const recapColors = ['#6366f1', '#8b5cf6', '#f59e0b', '#39B54A'];
  const recapEmojis = ['🖥️', '🔒', '⛽', '✍️'];
  const recapText = t('recap.cards', { returnObjects: true }) as RecapCard[];
  const recapCards = recapText.map((c, i) => ({ ...c, color: recapColors[i], emoji: recapEmojis[i] }));

  const whyText = t('why.options', { returnObjects: true }) as WhyOption[];
  const whyOptions = whyText.map((o, i) => ({ ...o, ...WHY_META[i] }));

  const eventColors = ['#8b5cf6', '#6366f1', '#ED1C24', '#f59e0b', '#39B54A', '#22d3ee'];
  const eventText = t('history.events', { returnObjects: true }) as HistoryEvent[];
  const historyEvents = eventText.map((e, i) => ({ ...e, color: eventColors[i] }));

  const quizOptionTexts = t('quiz.options', { returnObjects: true }) as string[];
  const quizOptions = quizOptionTexts.map((text, i) => ({ text, correct: i === 1 }));

  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

  const hypeCards = t('hype.cards', { returnObjects: true }) as HypeCard[];
  const hypeValue = t('hype.value', { returnObjects: true }) as string[];

  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} accentColor="#6366f1" />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber={t('title.sectionNumber')}
            title={t('title.title')}
            subtitle={t('title.subtitle')}
            icon={<FileCode2 className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ 1. OPENER: WHY A SMART CONTRACT AT ALL? ═══════ */}
        <div id="s1-why" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('why.badge')}</span>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-1">{t('why.heading')}</h2>
            <p className="text-muted-foreground text-base mt-1.5">{t('why.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-4 content-center">
            {whyOptions.map((o, i) => {
              const challenger = i === whyOptions.length - 1;
              return (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className={`flex flex-col gap-3 p-4 rounded-2xl border-2 ${challenger ? 'bg-gradient-to-br from-[#6366f1]/15 to-transparent' : 'bg-card'}`}
                  style={{ borderColor: o.color + (challenger ? '' : '40') }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="size-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: o.color + '18' }}>
                      <o.Icon className="size-6" style={{ color: o.color }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest rounded-md px-2 py-1" style={{ backgroundColor: o.color + '15', color: o.color }}>{o.tag}</span>
                  </div>
                  <div>
                    <div className="font-black text-lg text-foreground leading-tight">{o.title}</div>
                    <div className="text-xs text-muted-foreground leading-snug mt-0.5">{o.role}</div>
                  </div>
                  <div className="flex flex-col gap-2.5 border-t pt-3" style={{ borderColor: o.color + '30' }}>
                    {(['trust', 'cost', 'weak'] as const).map(row => (
                      <div key={row}>
                        <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: o.color }}>{t(`why.rowLabels.${row}`)}</div>
                        <div className="text-sm text-foreground/90 leading-snug">{o[row]}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <KeyPointBar text={t('keyPoints.s1-why')} className="mt-4" />
        </div>

        {/* ═══════ 2. THE 20-SECOND RECAP (replaces BTC vs ETH, Ethereum recap, definition, Szabo) ═══════ */}
        <div id="s1-recap" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('recap.badge')}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{t('recap.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t('recap.leadA')}<span className="font-semibold text-foreground">{t('recap.leadStrong')}</span>{t('recap.leadB')}
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-6 content-center">
            {/* Left: one-sentence definition + one-line vending-machine analogy */}
            <div className="flex flex-col gap-4">
              <div className="p-6 bg-gradient-to-br from-[#6366f1]/15 to-transparent border border-[#6366f1]/40 rounded-2xl">
                <div className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest mb-2">{t('recap.definitionLabel')}</div>
                <p className="text-2xl text-foreground font-bold leading-snug">
                  {t('recap.defLeadA')}<span className="font-black text-[#6366f1]">{t('recap.defTerm')}</span>{t('recap.defLeadB')}
                </p>
              </div>
              <div className="p-4 bg-card border border-border rounded-2xl flex items-center gap-4">
                <div className="shrink-0 bg-white rounded-xl border border-border p-1.5">
                  <img src={imgSzaboVending} alt={t('recap.imgAlt')} className="h-24 w-auto object-contain" />
                </div>
                <div>
                  <div className="font-black text-base text-foreground">{t('recap.vendingLabel')}</div>
                  <p className="text-sm text-muted-foreground leading-snug mt-1">{t('recap.vendingBody')}</p>
                </div>
              </div>
            </div>

            {/* Right: four one-liners students already know */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('recap.knowLabel')}</div>
              {recapCards.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  className="flex items-center gap-3 p-3 bg-card border rounded-xl"
                  style={{ borderColor: c.color + '40' }}
                >
                  <div className="text-2xl shrink-0">{c.emoji}</div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: c.color }}>{c.title}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{c.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="shrink-0 mt-4 p-3 rounded-xl border border-[#6366f1]/30 text-center text-sm" style={{ backgroundColor: '#6366f10f' }}>
            <span className="font-bold text-[#6366f1]">{t('recap.footerLabel')}</span>
            <span className="text-muted-foreground">{t('recap.footerText')}</span>
          </div>
          <UnderTheHood terms={['contract account', 'EVM', 'gas', 'Solidity', 'deterministic']} className="shrink-0 mt-2 justify-center" />
          <KeyPointBar text={t('keyPoints.s1-recap')} className="mt-3" />
        </div>

        {/* ═══════ 3. HYPE vs VALUE ═══════ */}
        <div id="s1-hype" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('hype.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('hype.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-[1.5fr_1fr] gap-5">
            <div className="grid grid-cols-2 gap-3 content-center">
              {hypeCards.map((c, i) => {
                const m = HYPE_META[i];
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="p-4 rounded-xl border-2 flex flex-col gap-2"
                    style={{ borderColor: m.color + '50', backgroundColor: m.color + '08' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{m.emoji}</span>
                      <div className="font-black text-base text-foreground">{c.title}</div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <div className="p-5 rounded-2xl border-2 border-[#39B54A]/50 bg-gradient-to-br from-[#39B54A]/12 to-transparent flex flex-col gap-4">
                <div className="font-black text-xl text-[#39B54A]">{t('hype.valueLabel')}</div>
                <ul className="space-y-3.5 text-base text-foreground/90">
                  {hypeValue.map((v, i) => (
                    <li key={i} className="flex gap-3 leading-snug"><span className="text-[#39B54A] shrink-0 font-black text-lg leading-snug">{i + 1}</span><span>{v}</span></li>
                  ))}
                </ul>
                <div className="text-sm text-muted-foreground italic border-t border-[#39B54A]/30 pt-3">{t('hype.footer')}</div>
              </div>
              <UnderTheHood terms={['legal wrapper', 'oracle', 'admin key', 'front-end vs contract']} />
            </div>
          </div>
          <KeyPointBar text={t('keyPoints.s1-hype')} className="mt-3" />
        </div>

        {/* ═══════ 4. INTERACTIVE: CONTRACT OR NOT? ═══════ */}
        <div id="s1-exercise" className="h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <ContractOrNotExercise />
          </div>
          {/* Padding wrapper (not margins on the bar): the bar is full-width, so margins pushed it past the slide edge. */}
          <div className="shrink-0 px-6 lg:px-8 pb-6 -mt-3">
            <KeyPointBar text={t('keyPoints.s1-exercise')} />
          </div>
        </div>

        {/* ═══════ 5. HISTORICAL EVOLUTION (brief) ═══════ */}
        <div id="s1-history" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('history.badge')}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{t('history.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('history.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-3 gap-4 content-center">
            {historyEvents.map((e, i) => (
              <motion.div
                key={e.year}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="flex flex-col rounded-xl border bg-card overflow-hidden"
                style={{ borderColor: e.color + '40' }}
              >
                <div className="h-1.5 shrink-0" style={{ backgroundColor: e.color }} />
                <div className="flex-1 flex flex-col gap-1.5 p-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono font-black text-lg" style={{ color: e.color }}>{e.year}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ backgroundColor: e.color + '18', color: e.color }}>{e.tag}</span>
                  </div>
                  <div className="font-bold text-sm text-foreground leading-tight">{e.title}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{e.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <UnderTheHood terms={['EVM', 'reentrancy', 'ERC-20', 'ERC-721', 'audit']} className="shrink-0 mt-3" />
          <KeyPointBar text={t('keyPoints.s1-history')} className="mt-3" />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s1-quiz" className="h-full">
          <QuizSlide
            question={t('quiz.question')}
            options={quizOptions}
            explanation={t('quiz.explanation')}
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s1-takeaways" className="h-full">
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
