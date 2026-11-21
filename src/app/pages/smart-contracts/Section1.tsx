import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { GroupedQuiz } from '../../components/templates/GroupedQuiz';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { RecapHandoff } from '../../components/shared/RecapHandoff';
import {
  FileCode2, Check, X, Scale, Handshake, Database, User, Store, TriangleAlert, Timer, ShieldCheck,
  Network, UserX, ArrowRight, Lightbulb, Rocket, Bug, Coins, Blocks, ChevronLeft, ChevronRight,
} from 'lucide-react';

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

// Language-neutral data: true = good fit for a smart contract, false = better without one
// (one trusted owner → a database wins; a judgement call → a person decides).
const SCENARIO_ANSWERS = [true, false, false, true, true, false];

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

interface WhyOption { tag: string; title: string; role: string; middle: string; trust: string; time: string; cheat: string; weak: string; }
interface RecapCard { title: string; desc: string; }
interface HistoryEvent { year: string; tag: string; title: string; desc: string; lesson: string; }
interface HypeClaim { claim: string; verdict: string; why: string; }

const ACCENT = '#6366f1';
const GOOD = '#39B54A';
const BAD = '#ED1C24';

// ─── Interactive: one deal, four ways to make it stick ──────────────────────

// The three incumbents a smart contract competes with, then the challenger itself.
// timePct = how long the deal takes to settle (bar length); coin = seconds for the money dot to cross (slower = slower option);
// cheats = which of [buyer, seller, the party in the middle] could break or bend the deal.
const WHY_META = [
  { Icon: Scale,     color: '#ED1C24', timePct: 100, coin: 5.5, cheats: [true, true, false] },
  { Icon: Handshake, color: '#f59e0b', timePct: 42,  coin: 3.2, cheats: [false, false, true] },
  { Icon: Database,  color: '#8b5cf6', timePct: 4,   coin: 0.8, cheats: [false, false, true] },
  { Icon: FileCode2, color: '#6366f1', timePct: 10,  coin: 1.3, cheats: [false, false, false] },
];

/** Money dot travelling along a line — its speed is the option's settlement speed. */
function MoneyTrack({ color, seconds, delay = 0 }: { color: string; seconds: number; delay?: number }) {
  return (
    <div className="relative flex-1 h-8 min-w-10">
      <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full" style={{ backgroundColor: color + '55' }} />
      <motion.span
        key={seconds}
        className="absolute top-1/2 -mt-2.5 -ml-2.5 size-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow"
        style={{ backgroundColor: color }}
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{ duration: seconds, delay, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >€</motion.span>
    </div>
  );
}

function WhyCompare() {
  const { t } = useTranslation('smart-contracts/section-1');
  const text = t('why.options', { returnObjects: true }) as WhyOption[];
  const options = text.map((o, i) => ({ ...o, ...WHY_META[i] }));
  const [sel, setSel] = useState(0);
  const o = options[sel];
  const partyLabels = [t('why.deal.buyer'), t('why.deal.seller'), o.middle];

  return (
    <div className="flex-1 min-h-0 grid grid-cols-[minmax(0,17rem)_minmax(0,1fr)] gap-5 items-stretch">
      {/* Left: pick an option */}
      <div className="flex flex-col gap-2.5 justify-center" role="tablist" aria-label={t('why.heading')}>
        {options.map((opt, i) => {
          const active = i === sel;
          return (
            <button
              key={opt.title}
              role="tab"
              aria-selected={active}
              onClick={() => setSel(i)}
              className="relative text-left flex items-center gap-3 p-3 rounded-2xl border-2 transition-colors duration-200 cursor-pointer"
              style={{
                borderColor: active ? opt.color : opt.color + '35',
                backgroundColor: active ? opt.color + '16' : 'var(--card)',
              }}
            >
              <div className="size-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: opt.color + (active ? '30' : '18') }}>
                <opt.Icon className="size-6" style={{ color: opt.color }} />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: opt.color }}>{opt.tag}</div>
                <div className="font-black text-base text-foreground leading-tight">{opt.title}</div>
              </div>
              {active && <ChevronRight className="size-5 ml-auto shrink-0" style={{ color: opt.color }} />}
            </button>
          );
        })}
        <div className="text-[11px] text-muted-foreground text-center mt-1">{t('why.hint')}</div>
      </div>

      {/* Right: the same deal, run through the chosen option */}
      <div className="min-w-0 rounded-2xl border-2 p-5 flex flex-col gap-4 justify-center transition-colors duration-300" style={{ borderColor: o.color + '55', backgroundColor: o.color + '0a' }}>
        {/* Deal flow */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-28 rounded-xl border border-border bg-card p-2.5 flex flex-col items-center text-center gap-1">
            <User className="size-6 text-foreground/70" />
            <div className="font-bold text-sm text-foreground leading-tight">{t('why.deal.buyer')}</div>
            <div className="text-[10px] text-muted-foreground">{t('why.deal.buyerSub')}</div>
          </div>
          <MoneyTrack color={o.color} seconds={o.coin} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sel}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.16 }}
              className="shrink-0 w-64 rounded-xl border-2 p-3 flex items-center gap-3 bg-card"
              style={{ borderColor: o.color }}
            >
              <div className="size-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: o.color + '20' }}>
                <o.Icon className="size-7" style={{ color: o.color }} />
              </div>
              <div className="min-w-0">
                <div className="font-black text-base leading-tight" style={{ color: o.color }}>{o.title}</div>
                <div className="text-xs text-muted-foreground leading-snug mt-0.5">{o.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <MoneyTrack color={o.color} seconds={o.coin} delay={o.coin / 2} />
          <div className="shrink-0 w-28 rounded-xl border border-border bg-card p-2.5 flex flex-col items-center text-center gap-1">
            <Store className="size-6 text-foreground/70" />
            <div className="font-bold text-sm text-foreground leading-tight">{t('why.deal.seller')}</div>
            <div className="text-[10px] text-muted-foreground">{t('why.deal.sellerSub')}</div>
          </div>
        </div>

        {/* Three read-outs */}
        <div className="grid grid-cols-3 gap-3">
          {/* Trust */}
          <div className="rounded-xl border border-border bg-card p-3.5 flex flex-col gap-2 min-h-[9.5rem]">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest" style={{ color: o.color }}>
              <ShieldCheck className="size-3.5" />{t('why.rowLabels.trust')}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={sel} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="text-base font-bold text-foreground leading-snug">
                {o.trust}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Time */}
          <div className="rounded-xl border border-border bg-card p-3.5 flex flex-col gap-2 min-h-[9.5rem]">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest" style={{ color: o.color }}>
              <Timer className="size-3.5" />{t('why.rowLabels.time')}
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={false}
                animate={{ width: `${o.timePct}%`, backgroundColor: o.color }}
                transition={{ type: 'spring', stiffness: 140, damping: 22 }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-muted-foreground -mt-1">
              <span>{t('why.timeScale.fast')}</span><span>{t('why.timeScale.slow')}</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={sel} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="text-base font-bold text-foreground leading-snug">
                {o.time}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Who could cheat */}
          <div className="rounded-xl border border-border bg-card p-3.5 flex flex-col gap-2 min-h-[9.5rem]">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest" style={{ color: o.color }}>
              <TriangleAlert className="size-3.5" />{t('why.rowLabels.cheat')}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {partyLabels.map((label, i) => {
                const risky = o.cheats[i];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold transition-colors duration-300"
                    style={{
                      borderColor: (risky ? BAD : GOOD) + '66',
                      backgroundColor: (risky ? BAD : GOOD) + '14',
                      color: risky ? BAD : GOOD,
                    }}
                  >
                    {risky ? <TriangleAlert className="size-3" /> : <Check className="size-3" strokeWidth={3} />}
                    {label}
                  </span>
                );
              })}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={sel} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="text-sm font-semibold text-foreground leading-snug">
                {o.cheat}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Weak spot */}
        <div className="rounded-xl border px-3.5 py-2.5 flex items-baseline gap-2 min-h-[3.25rem]" style={{ borderColor: o.color + '40', backgroundColor: 'var(--card)' }}>
          <span className="text-[10px] font-black uppercase tracking-widest shrink-0" style={{ color: o.color }}>{t('why.rowLabels.weak')}</span>
          <span className="text-sm text-foreground/90 leading-snug">{o.weak}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive: the vending machine (Szabo's analogy), light version ──────

function VendingMachine() {
  const { t } = useTranslation('smart-contracts/section-1');
  const [state, setState] = useState<{ mode: 'idle' | 'paid' | 'refund'; run: number }>({ mode: 'idle', run: 0 });
  const { mode, run } = state;
  const press = (m: 'paid' | 'refund') => setState(s => ({ mode: m, run: s.run + 1 }));
  const fg = 'var(--foreground)';
  const muted = 'var(--muted-foreground)';

  return (
    <div className="h-full rounded-2xl border border-[#6366f1]/40 bg-gradient-to-br from-[#6366f1]/12 to-transparent p-4 flex gap-4 items-center">
      <svg viewBox="0 0 200 260" className="h-full max-h-[21rem] w-auto shrink-0" role="img" aria-label={t('recap.imgAlt')}>
        {/* body */}
        <rect x="14" y="6" width="172" height="248" rx="14" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="2" />
        {/* window with snacks */}
        <rect x="28" y="20" width="100" height="150" rx="8" fill="var(--card)" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1.5" />
        {[['🥤', '🍫'], ['🍪', '🥨'], ['🍿', '🍬']].map((row, r) => (
          <g key={r}>
            {row.map((e, c) => (
              // the bottom-left snack is the one that drops when the right coins go in
              (r === 2 && c === 0 && mode === 'paid') ? null : <text key={c} x={54 + c * 48} y={56 + r * 46} textAnchor="middle" fontSize="24">{e}</text>
            ))}
            <line x1="32" y1={66 + r * 46} x2="124" y2={66 + r * 46} stroke={muted} strokeOpacity="0.5" strokeWidth="1.5" />
          </g>
        ))}
        {/* price display */}
        <rect x="138" y="20" width="38" height="34" rx="5" fill="var(--card)" stroke={ACCENT} strokeOpacity="0.5" />
        <text x="157" y="34" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={muted}>{t('recap.vending.price')}</text>
        <text x="157" y="48" textAnchor="middle" fontSize="13" fontWeight="900" fill={fg}>€2</text>
        {/* coin slot */}
        <rect x="151" y="70" width="12" height="30" rx="4" fill={fg} fillOpacity="0.75" />
        {/* status light */}
        <circle cx="157" cy="124" r="7" fill={mode === 'paid' ? GOOD : mode === 'refund' ? '#f59e0b' : muted} fillOpacity={mode === 'idle' ? 0.35 : 1} />
        {/* coin return */}
        <rect x="143" y="146" width="28" height="22" rx="5" fill={fg} fillOpacity="0.18" />
        {/* tray */}
        <rect x="28" y="188" width="144" height="50" rx="8" fill={fg} fillOpacity="0.18" />

        {/* coin going in */}
        {mode !== 'idle' && (
          <motion.g key={`in-${run}`} initial={{ y: -34, opacity: 1 }} animate={{ y: 14, opacity: 0 }} transition={{ duration: 0.45, ease: 'easeIn' }}>
            <circle cx="157" cy="70" r="9" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
            <text x="157" y="73.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">€</text>
          </motion.g>
        )}
        {/* right coins: the snack drops into the tray */}
        {mode === 'paid' && (
          <motion.text
            key={`snack-${run}`} x="54" y="148" textAnchor="middle" fontSize="24"
            initial={{ y: 0 }} animate={{ y: 76 }}
            transition={{ delay: 0.45, type: 'spring', stiffness: 180, damping: 14 }}
          >🍿</motion.text>
        )}
        {/* wrong coins: the coin comes straight back */}
        {mode === 'refund' && (
          <motion.g key={`out-${run}`} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45, type: 'spring', stiffness: 200, damping: 16 }}>
            <circle cx="157" cy="157" r="9" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
            <text x="157" y="160.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">€</text>
          </motion.g>
        )}
      </svg>

      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-[#6366f1]">{t('recap.vending.tryLabel')}</div>
          <div className="font-black text-lg text-foreground leading-tight mt-0.5">{t('recap.vendingLabel')}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => press('paid')} className="px-3 py-1.5 rounded-lg border-2 text-sm font-black transition-colors cursor-pointer hover:bg-[#39B54A]/15" style={{ borderColor: GOOD + '80', color: GOOD }}>
            {t('recap.vending.payRight')}
          </button>
          <button onClick={() => press('refund')} className="px-3 py-1.5 rounded-lg border-2 text-sm font-black transition-colors cursor-pointer hover:bg-[#f59e0b]/15" style={{ borderColor: '#f59e0b80', color: '#f59e0b' }}>
            {t('recap.vending.payWrong')}
          </button>
        </div>
        {/* the rule, lit up by whichever branch just ran */}
        <div className="rounded-xl border border-border bg-card p-3 font-mono text-[13px] leading-relaxed">
          <div className="rounded px-1.5 transition-colors duration-300" style={{ backgroundColor: mode === 'paid' ? GOOD + '22' : 'transparent', color: mode === 'paid' ? GOOD : fg }}>
            <span className="font-black">{t('recap.vending.if')}</span> {t('recap.vending.ifBody')}
          </div>
          <div className="rounded px-1.5 transition-colors duration-300" style={{ backgroundColor: mode === 'refund' ? '#f59e0b22' : 'transparent', color: mode === 'refund' ? '#f59e0b' : fg }}>
            <span className="font-black">{t('recap.vending.else')}</span> {t('recap.vending.elseBody')}
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-snug">{t('recap.vendingBody')}</p>
      </div>
    </div>
  );
}

// ─── Interactive: hype or genuine value? ────────────────────────────────────

// Language-neutral: true = hype, false = genuine value. Order matches hype.claims in the locale files.
const CLAIM_IS_HYPE = [true, false, true, true, false, true, false];
const CLAIM_EMOJI = ['⚖️', '🤝', '🤖', '⛽', '🔒', '🔌', '🌍'];

function HypeSorter() {
  const { t } = useTranslation('smart-contracts/section-1');
  const claims = (t('hype.claims', { returnObjects: true }) as HypeClaim[]).map((c, i) => ({ ...c, hype: CLAIM_IS_HYPE[i], emoji: CLAIM_EMOJI[i], i }));
  // guesses[i] = what the student picked for claim i (true = hype)
  const [guesses, setGuesses] = useState<boolean[]>([]);
  const idx = guesses.length;
  const done = idx >= claims.length;
  const current = claims[idx];
  const correct = guesses.filter((g, i) => g === claims[i].hype).length;
  const sorted = claims.slice(0, idx);

  const bin = (hype: boolean) => {
    const color = hype ? BAD : GOOD;
    const items = sorted.filter(c => c.hype === hype);
    return (
      <div className="min-w-0 rounded-2xl border-2 border-dashed p-3 flex flex-col gap-2" style={{ borderColor: color + '55', backgroundColor: color + '08' }}>
        <div className="flex items-center justify-between shrink-0">
          <div className="font-black text-base uppercase tracking-wider" style={{ color }}>{hype ? t('hype.binHype') : t('hype.binValue')}</div>
          <div className="text-xs font-mono font-bold text-muted-foreground">{items.length}/{claims.filter(c => c.hype === hype).length}</div>
        </div>
        {items.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground text-center px-4">{hype ? t('hype.binHypeEmpty') : t('hype.binValueEmpty')}</div>
        )}
        {items.map(c => {
          const right = guesses[c.i] === c.hype;
          return (
            <motion.div
              key={c.i}
              initial={{ opacity: 0, x: hype ? 48 : -48, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="rounded-xl border bg-card p-2.5"
              style={{ borderColor: color + '50' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">{c.emoji}</span>
                <span className="font-black text-sm leading-tight" style={{ color }}>{c.verdict}</span>
                <span
                  className="ml-auto shrink-0 size-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: (right ? GOOD : '#f59e0b') + '22', color: right ? GOOD : '#f59e0b' }}
                  title={right ? t('hype.guessRight') : t('hype.guessWrong')}
                >
                  {right ? <Check className="size-3" strokeWidth={3.5} /> : <X className="size-3" strokeWidth={3.5} />}
                </span>
              </div>
              <div className="text-xs text-muted-foreground leading-snug mt-1">{c.why}</div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 min-h-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1fr)] gap-4">
      {bin(true)}

      {/* Centre: the claim on the table */}
      <div className="min-w-0 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-1.5">
          {claims.map((c, i) => (
            <span key={i} className="h-1.5 w-7 rounded-full transition-colors duration-300" style={{ backgroundColor: i < idx ? (c.hype ? BAD : GOOD) : i === idx ? ACCENT : 'var(--border)' }} />
          ))}
        </div>

        <div className="w-full h-[15rem] relative">
          <AnimatePresence mode="wait" initial={false}>
            {!done ? (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: current.hype ? -70 : 70, scale: 0.92 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 rounded-2xl border-2 border-[#6366f1]/50 bg-card shadow-lg p-5 flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-[#6366f1]">{t('hype.claimLabel')} {idx + 1}/{claims.length}</div>
                <div className="text-4xl leading-none">{current.emoji}</div>
                <div className="text-xl font-black text-foreground leading-snug">“{current.claim}”</div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-2xl border-2 border-[#39B54A]/50 bg-gradient-to-br from-[#39B54A]/12 to-transparent p-5 flex flex-col items-center justify-center text-center gap-2"
              >
                <div className="text-4xl font-black" style={{ color: correct === claims.length ? GOOD : '#f59e0b' }}>{correct}/{claims.length}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('hype.scoreLabel')}</div>
                <div className="text-sm font-semibold text-foreground leading-snug mt-1">{t('hype.footer')}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!done ? (
          <div className="w-full grid grid-cols-2 gap-3">
            <button onClick={() => setGuesses(g => [...g, true])} className="py-2.5 rounded-xl border-2 font-black text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer hover:bg-[#ED1C24]/15" style={{ borderColor: BAD + '80', color: BAD }}>
              <ChevronLeft className="size-4" strokeWidth={3} />{t('hype.btnHype')}
            </button>
            <button onClick={() => setGuesses(g => [...g, false])} className="py-2.5 rounded-xl border-2 font-black text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer hover:bg-[#39B54A]/15" style={{ borderColor: GOOD + '80', color: GOOD }}>
              {t('hype.btnValue')}<ChevronRight className="size-4" strokeWidth={3} />
            </button>
          </div>
        ) : (
          <button onClick={() => setGuesses([])} className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-xs font-semibold text-muted-foreground transition-colors cursor-pointer">{t('hype.reset')}</button>
        )}
        <UnderTheHood terms={['legal wrapper', 'oracle', 'admin key', 'front-end vs contract']} className="justify-center" />
      </div>

      {bin(false)}
    </div>
  );
}

// ─── Interactive: thirty years on one line ──────────────────────────────────

const HISTORY_META = [
  { Icon: Lightbulb,   color: '#8b5cf6' },
  { Icon: Rocket,      color: '#6366f1' },
  { Icon: Bug,         color: '#ED1C24' },
  { Icon: Coins,       color: '#f59e0b' },
  { Icon: Blocks,      color: '#39B54A' },
  { Icon: ShieldCheck, color: '#0ea5e9' },
];

function LessonsTimeline() {
  const { t } = useTranslation('smart-contracts/section-1');
  const events = (t('history.events', { returnObjects: true }) as HistoryEvent[]).map((e, i) => ({ ...e, ...HISTORY_META[i] }));
  const [sel, setSel] = useState(0);
  const n = events.length;
  const e = events[sel];
  // Node centres sit at (i + 0.5) / n of the track width.
  const pct = (i: number) => ((i + 0.5) / n) * 100;

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-center gap-6">
      {/* The line */}
      <div className="relative">
        <div className="absolute h-1 rounded-full bg-border" style={{ top: '3.25rem', left: `${pct(0)}%`, right: `${100 - pct(n - 1)}%` }} />
        <motion.div
          className="absolute h-1 rounded-full"
          style={{ top: '3.25rem', left: `${pct(0)}%`, background: `linear-gradient(90deg, ${events[0].color}, ${e.color})` }}
          initial={false}
          animate={{ width: `${pct(sel) - pct(0)}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        />
        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {events.map((ev, i) => {
            const active = i === sel;
            const reached = i <= sel;
            return (
              <button key={ev.year} onClick={() => setSel(i)} aria-pressed={active} className="group flex flex-col items-center gap-1.5 cursor-pointer">
                <span className="font-mono font-black text-base leading-none h-5" style={{ color: reached ? ev.color : 'var(--muted-foreground)' }}>{ev.year}</span>
                <motion.span
                  className="size-14 rounded-full border-[3px] flex items-center justify-center bg-background transition-colors duration-300"
                  style={{ borderColor: reached ? ev.color : 'var(--border)', backgroundColor: active ? ev.color : undefined }}
                  animate={{ scale: active ? 1.14 : 1 }}
                  whileHover={{ scale: active ? 1.14 : 1.06 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <ev.Icon className="size-6" style={{ color: active ? '#ffffff' : reached ? ev.color : 'var(--muted-foreground)' }} />
                </motion.span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: reached ? ev.color : 'var(--muted-foreground)' }}>{ev.tag}</span>
                <span className={`text-xs leading-tight text-center px-1 ${active ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>{ev.title}</span>
              </button>
            );
          })}
        </div>
        {/* the 21-year gap between the idea and a computer that could run it */}
        <div className="absolute z-10 pointer-events-none -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full border border-dashed border-border bg-background text-[10px] font-bold text-muted-foreground whitespace-nowrap" style={{ top: '3.375rem', left: `${(pct(0) + pct(1)) / 2}%` }}>
          {t('history.gap')}
        </div>
      </div>

      {/* The selected moment */}
      <div className="flex items-stretch gap-3">
        <button onClick={() => setSel(s => Math.max(0, s - 1))} disabled={sel === 0} aria-label={t('history.prev')} className="shrink-0 w-10 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-default">
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex-1 min-w-0 h-[11.5rem] relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sel}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 rounded-2xl border-2 bg-card overflow-hidden grid grid-cols-[auto_minmax(0,1.25fr)_minmax(0,1fr)]"
              style={{ borderColor: e.color + '66' }}
            >
              <div className="w-40 flex flex-col items-center justify-center gap-2" style={{ backgroundColor: e.color + '16' }}>
                <e.Icon className="size-10" style={{ color: e.color }} />
                <div className="font-mono font-black text-2xl leading-none" style={{ color: e.color }}>{e.year}</div>
              </div>
              <div className="p-5 flex flex-col justify-center gap-1.5">
                <div className="font-black text-xl text-foreground leading-tight">{e.title}</div>
                <div className="text-sm text-muted-foreground leading-snug">{e.desc}</div>
              </div>
              <div className="p-5 flex flex-col justify-center gap-1.5 border-l" style={{ borderColor: e.color + '40', backgroundColor: e.color + '0a' }}>
                <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: e.color }}>{t('history.lessonLabel')}</div>
                <div className="text-base font-bold text-foreground leading-snug">{e.lesson}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={() => setSel(s => Math.min(n - 1, s + 1))} disabled={sel === n - 1} aria-label={t('history.next')} className="shrink-0 w-10 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-default">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

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
  const recapParts = t('recap.parts', { returnObjects: true }) as string[];

  // The section quiz, in order: locale block + index of its correct option (language-neutral).
  const quizQuestions = ([['quiz', 1], ['quiz2', 2], ['quiz3', 0]] as const).map(([key, correctIndex]) => ({
    question: t(`${key}.question`),
    options: (t(`${key}.options`, { returnObjects: true }) as string[]).map((text, i) => ({ text, correct: i === correctIndex })),
    explanation: t(`${key}.explanation`),
  }));

  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

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

        {/* ═══════ 1. OPENER: WHY A SMART CONTRACT AT ALL? (interactive: one deal, four ways) ═══════ */}
        <div id="s1-why" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('why.badge')}</span>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground mt-1">{t('why.heading')}</h2>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#6366f1]/40 bg-[#6366f1]/10 px-3 py-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6366f1]">{t('why.deal.label')}</span>
              <span className="text-sm font-semibold text-foreground">{t('why.deal.text')}</span>
            </div>
          </div>

          <WhyCompare />
          <KeyPointBar text={t('keyPoints.s1-why')} className="mt-4" />
        </div>

        {/* ═══════ 2. THE 20-SECOND RECAP — a visual on-ramp from Fundamentals §3 + Platforms §2 ═══════ */}
        <div id="s1-recap" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('recap.badge')}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{t('recap.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t('recap.leadA')}<span className="font-semibold text-foreground">{t('recap.leadStrong')}</span>{t('recap.leadB')}
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-5 content-center items-stretch">
            {/* Left: the vending machine, to press */}
            <div className="min-h-0 max-h-[24rem] self-center w-full h-full">
              <VendingMachine />
            </div>

            {/* Right: the definition as a picture + what you already know */}
            <div className="flex flex-col gap-3 justify-center">
              <div className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest">{t('recap.definitionLabel')}</div>
              <div className="flex items-stretch gap-2">
                {[FileCode2, Network, UserX].map((Icon, i) => (
                  <div key={i} className="contents">
                    {i > 0 && <div className="self-center text-xl font-black text-[#6366f1]">+</div>}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="flex-1 min-w-0 rounded-2xl border border-[#6366f1]/40 bg-gradient-to-br from-[#6366f1]/15 to-transparent p-3 flex flex-col items-center text-center gap-2"
                    >
                      <div className="size-12 rounded-xl flex items-center justify-center bg-[#6366f1]/20">
                        <Icon className="size-7 text-[#6366f1]" />
                      </div>
                      <div className="font-black text-sm text-foreground leading-tight">{recapParts[i]}</div>
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">{t('recap.knowLabel')}</div>
              <div className="grid grid-cols-2 gap-2.5">
                {recapCards.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.3 }}
                    className="flex items-start gap-2.5 p-2.5 bg-card border rounded-xl"
                    style={{ borderColor: c.color + '40' }}
                  >
                    <div className="text-2xl shrink-0 leading-none mt-0.5">{c.emoji}</div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm leading-tight" style={{ color: c.color }}>{c.title}</div>
                      <div className="text-xs text-muted-foreground leading-snug mt-0.5">{c.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* The bridge: where you saw it → where this course takes it */}
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-[#6366f1]/30 flex flex-wrap items-center justify-center gap-x-3 gap-y-2" style={{ backgroundColor: '#6366f10f' }}>
            <RecapHandoff label={t('recap.sawLabel')} text={t('recap.sawFundamentals')} to="/blockchain-fundamentals/section-3" color="#ED1C24" />
            <RecapHandoff label={t('recap.sawLabel')} text={t('recap.sawPlatforms')} to="/blockchain-platforms/section-2" color="#39B54A" />
            <ArrowRight className="size-5 text-[#6366f1] shrink-0" />
            <span className="text-sm">
              <span className="font-bold text-[#6366f1]">{t('recap.footerLabel')}</span>
              <span className="text-foreground/90">{t('recap.footerText')}</span>
            </span>
          </div>
          <UnderTheHood terms={['contract account', 'EVM', 'gas', 'Solidity', 'deterministic']} className="shrink-0 mt-2 justify-center" />
          <KeyPointBar text={t('keyPoints.s1-recap')} className="mt-3" />
        </div>

        {/* ═══════ 3. HYPE vs VALUE (interactive sorter) ═══════ */}
        <div id="s1-hype" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">{t('hype.badge')}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{t('hype.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('hype.subtitle')}</p>
          </div>

          <HypeSorter />
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

        {/* ═══════ 5. HISTORICAL EVOLUTION (clickable timeline) ═══════ */}
        <div id="s1-history" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('history.badge')}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{t('history.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('history.subtitle')}</p>
          </div>

          <LessonsTimeline />
          <UnderTheHood terms={['EVM', 'reentrancy', 'ERC-20', 'ERC-721', 'audit']} className="shrink-0 mt-3" />
          <KeyPointBar text={t('keyPoints.s1-history')} className="mt-3" />
        </div>

        {/* ═══════ QUIZ — one slide, stepped question by question ═══════ */}
        <div id="s1-quiz" className="h-full">
          <GroupedQuiz questions={quizQuestions} compact />
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
