import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { DeepDiveBadge } from '../../components/shared/DeepDiveBadge';
import { RecapHandoff } from '../../components/shared/RecapHandoff';
import { Cog, Check, X, Server, ShieldCheck, Activity, Database, Coins, Ban } from 'lucide-react';
import {
  OracleWhySlide, OracleWhatSlide, OracleHowSlide, OracleRisksSlide, OracleParisSlide, OracleAttackSlide,
} from './Section2Oracles';
import { LiquidityPoolSlide, FlashLoanSlide } from './Section2Capabilities';

import imgDisintermediation from '../../../assets/sc/disintermediation.png';

// Language-neutral shape — only IDs. Labels come from t() at render time.
const chapterShape = [
  { kind: 'group' as const, id: 'g-s2-stack' },
  { id: 's2-web3' },
  { id: 's2-dapp' },
  { id: 's2-ex-stack' },
  { id: 's2-vs' },

  { kind: 'group' as const, id: 'g-s2-inside' },
  { id: 's2-components' },
  { id: 's2-workflow' },
  { id: 's2-run' },
  { id: 's2-solidity' },

  { kind: 'group' as const, id: 'g-s2-engine' },
  { id: 's2-execution' },
  { id: 's2-gas' },
  { id: 's2-standards' },

  { kind: 'group' as const, id: 'g-s2-business' },
  { id: 's2-reshape' },

  { kind: 'group' as const, id: 'g-s2-capabilities' },
  { id: 's2-capabilities' },
  { id: 's2-liquidity' },
  { id: 's2-flash' },

  { kind: 'group' as const, id: 'g-s2-oracles' },
  { id: 's2-oracle-why' },
  { id: 's2-oracle-what' },
  { id: 's2-oracle-how' },
  { id: 's2-oracle-risks' },
  { id: 's2-oracle-paris' },
  { id: 's2-oracle-attack' },

  { kind: 'group' as const, id: 'g-s2-wrap' },
  { id: 's2-quiz' },
  { id: 's2-quiz-2' },
  { id: 's2-quiz-3' },
  { id: 's2-quiz-4' },
  { id: 's2-takeaways' },
] as const;

// ─── Gas recap: tap-to-reveal cost ladder ────────────────────────────────────

// Language-neutral data — bar width (illustrative, not to scale) + color. Text via t().
const GAS_OPS = [
  { id: 0, width: 5,   color: '#39B54A' },
  { id: 1, width: 20,  color: '#6366f1' },
  { id: 2, width: 58,  color: '#f59e0b' },
  { id: 3, width: 62,  color: '#ED1C24' },
  { id: 4, width: 100, color: '#8b5cf6' },
];
const GAS_SORTED = [0, 1, 2, 3, 4];
// Shuffled display order so the answer isn't already obvious
const GAS_SHUFFLED = [3, 0, 4, 1, 2];
const GAS_PRICIEST = 4;

interface GasOpText { label: string; gasLabel: string; }

function GasLadder() {
  const { t } = useTranslation('smart-contracts/section-2');
  const opText = t('gas.ops', { returnObjects: true }) as GasOpText[];
  const [guess, setGuess] = useState<number | null>(null);
  const revealed = guess !== null;
  const order = revealed ? GAS_SORTED : GAS_SHUFFLED;
  const right = guess === GAS_PRICIEST;

  return (
    <div className="h-full flex flex-col rounded-2xl border border-border bg-card p-5">
      <div className="shrink-0 flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">{t('gas.ladderLabel')}</div>
          <div className="text-sm font-bold text-foreground mt-0.5">{revealed ? t('gas.ladderRevealed') : t('gas.ladderPrompt')}</div>
        </div>
        {revealed && (
          <button type="button" onClick={() => setGuess(null)} className="shrink-0 px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer">{t('gas.tryAgain')}</button>
        )}
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-2">
        {order.map(id => {
          const op = GAS_OPS[id];
          const picked = guess === id;
          return (
            <motion.button
              key={id}
              layout
              type="button"
              onClick={() => { if (!revealed) setGuess(id); }}
              transition={{ layout: { duration: 0.45, ease: 'easeInOut' } }}
              className="relative overflow-hidden rounded-xl border-2 px-3.5 py-2.5 text-left"
              style={{
                borderColor: revealed ? (picked ? (right ? '#39B54A' : '#ED1C24') : op.color + '40') : 'var(--border)',
                cursor: revealed ? 'default' : 'pointer',
              }}
              whileHover={!revealed ? { x: 4 } : undefined}
            >
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ backgroundColor: op.color + '26' }}
                initial={false}
                animate={{ width: revealed ? `${op.width}%` : '0%' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: revealed ? 0.25 : 0 }}
              />
              <div className="relative flex items-center gap-3">
                <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: revealed ? op.color : 'var(--muted-foreground)' }} />
                <span className="flex-1 text-sm font-semibold text-foreground">{opText[id].label}</span>
                {revealed && picked && (right
                  ? <Check className="size-4 text-[#39B54A] shrink-0" strokeWidth={3} />
                  : <X className="size-4 text-[#ED1C24] shrink-0" strokeWidth={3} />)}
                <span className="text-xs font-black font-mono shrink-0 w-24 text-right" style={{ color: revealed ? op.color : 'var(--muted-foreground)' }}>
                  {revealed ? opText[id].gasLabel : '?'}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="shrink-0 mt-3 min-h-[2.75rem] flex items-center text-xs text-muted-foreground leading-snug">
        {revealed ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="font-bold" style={{ color: right ? '#39B54A' : '#f59e0b' }}>{right ? t('gas.guessRight') : t('gas.guessWrong')}</span>
            {t('gas.ladderExplain')}
          </motion.p>
        ) : (
          <p className="italic">{t('gas.ladderNote')}</p>
        )}
      </div>
    </div>
  );
}

// ─── Centerpiece: watch a contract execute ───────────────────────────────────

// Language-neutral stage data — emoji/color + the on-chain numbers at each stage. Text via t().
type RunStatus = 'awaiting' | 'funded' | 'complete';
const RUN_STAGES: { emoji: string; color: string; buyer: number; held: number; seller: number; status: RunStatus; events: number; gas: number }[] = [
  { emoji: '📤', color: '#6366f1', buyer: 5, held: 0, seller: 0, status: 'awaiting', events: 0, gas: 1 },
  { emoji: '✍️', color: '#8b5cf6', buyer: 5, held: 0, seller: 0, status: 'awaiting', events: 0, gas: 1 },
  { emoji: '⚙️', color: '#39B54A', buyer: 5, held: 0, seller: 0, status: 'awaiting', events: 0, gas: 2 },
  { emoji: '💾', color: '#f59e0b', buyer: 3, held: 2, seller: 0, status: 'funded',   events: 0, gas: 2 },
  { emoji: '📡', color: '#ED1C24', buyer: 3, held: 2, seller: 0, status: 'funded',   events: 1, gas: 2 },
  { emoji: '🏁', color: '#22d3ee', buyer: 3, held: 0, seller: 2, status: 'complete', events: 2, gas: 3 },
];
const RUN_STATUS_COLOR: Record<RunStatus, string> = { awaiting: '#f59e0b', funded: '#6366f1', complete: '#39B54A' };
const RUN_GRADIENT = 'linear-gradient(90deg, #6366f1, #8b5cf6, #39B54A, #f59e0b, #ED1C24, #22d3ee)';

interface RunStageText { label: string; who: string; what: string; biz: string; }

/** A labelled chip travelling along a dashed lane between two actors. */
function RunPacket({ label, color, reverse = false }: { label: string; color: string; reverse?: boolean }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap shadow-md z-10"
      style={{ backgroundColor: color }}
      initial={{ left: reverse ? '88%' : '12%', opacity: 0 }}
      animate={{ left: reverse ? '12%' : '88%', opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4, times: [0, 0.15, 0.8, 1] }}
    >
      {label}
    </motion.div>
  );
}

function RunLane({ children, active, color }: { children?: React.ReactNode; active: boolean; color: string }) {
  return (
    <div className="relative h-full min-w-0">
      <div
        className="absolute inset-x-1 top-1/2 border-t-2 border-dashed transition-colors duration-300"
        style={{ borderColor: active ? color + 'aa' : 'var(--border)' }}
      />
      {children}
    </div>
  );
}

function RunBalance({ value, color }: { value: number; color: string }) {
  return (
    <motion.div
      key={value}
      initial={{ scale: 1.25, color }}
      animate={{ scale: 1, color: 'var(--foreground)' }}
      transition={{ duration: 0.6 }}
      className="text-2xl font-black leading-none origin-left"
    >
      {value} <span className="text-sm font-bold">ETH</span>
    </motion.div>
  );
}

function ContractRunWalkthrough() {
  const { t } = useTranslation('smart-contracts/section-2');
  const stageText = t('run.stages', { returnObjects: true }) as RunStageText[];
  const gasRows = t('run.gasRows', { returnObjects: true }) as string[];
  const [active, setActive] = useState(0);
  const [stranger, setStranger] = useState(false);
  const [playing, setPlaying] = useState(false);

  const last = RUN_STAGES.length - 1;
  const stage = RUN_STAGES[active];
  const text = stageText[active];
  const isLast = active === last;
  const isRun = active === 2;
  const reverted = isRun && stranger;
  const trackPos = (i: number) => `${(i / last) * 100}%`;

  const go = (i: number) => { setStranger(false); setActive(i); };

  // Auto-play: advance one stage at a time, then stop on the last one.
  useEffect(() => {
    if (!playing) return;
    if (active >= last) { setPlaying(false); return; }
    const id = setTimeout(() => { setStranger(false); setActive(a => Math.min(a + 1, last)); }, 2800);
    return () => clearTimeout(id);
  }, [playing, active, last]);

  const events = [t('run.events.deposited'), t('run.events.released')].slice(0, stage.events);
  const statusColor = reverted ? '#ED1C24' : RUN_STATUS_COLOR[stage.status];

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('run.kicker')}</span>
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{t('run.heading')}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t('run.subtitle')}</p>
      </div>

      {/* Stage track */}
      <div className="shrink-0 rounded-2xl border border-border bg-card/50 px-8 pt-6 pb-3 mb-3">
        <div className="relative h-1.5 rounded-full bg-border mx-8">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ background: RUN_GRADIENT }}
            initial={false}
            animate={{ width: trackPos(active) }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
          {RUN_STAGES.map((st, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setPlaying(false); go(i); }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
              style={{ left: trackPos(i) }}
            >
              <span
                className="size-10 rounded-full border-2 flex items-center justify-center text-lg bg-card transition-all duration-300"
                style={{
                  borderColor: i <= active ? st.color : 'var(--border)',
                  boxShadow: i === active ? `0 0 0 4px ${st.color}33` : undefined,
                  opacity: i <= active ? 1 : 0.55,
                  transform: i === active ? 'scale(1.12)' : undefined,
                }}
              >
                {st.emoji}
              </span>
              <span className="text-[11px] font-bold whitespace-nowrap transition-colors" style={{ color: i === active ? st.color : 'var(--muted-foreground)' }}>
                {i + 1}. {stageText[i].label}
              </span>
            </button>
          ))}
        </div>
        <div className="h-11" />
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_17rem] gap-4">
        <div className="min-h-0 flex flex-col gap-3">

          {/* Scene: buyer ⇄ contract ⇄ seller */}
          <div className="shrink-0 h-48 grid grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)_minmax(0,2fr)_minmax(0,0.75fr)_minmax(0,1fr)] items-stretch rounded-2xl border border-border bg-card/50 p-3">
            {/* Buyer */}
            <div className="rounded-xl border border-border bg-card p-3 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none">👩‍💼</span>
                <div className="min-w-0">
                  <div className="text-xs font-black text-foreground leading-tight">{t('run.actors.buyer')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('run.actors.wallet')}</div>
                </div>
              </div>
              <RunBalance value={stage.buyer} color="#ED1C24" />
            </div>

            {/* Lane: buyer ⇄ contract */}
            <RunLane active={active === 1 || isLast} color={stage.color}>
              {active === 1 && <RunPacket key="deposit" label={t('run.packets.deposit')} color={stage.color} />}
              {isLast && <RunPacket key="confirm" label={t('run.packets.confirm')} color="#8b5cf6" />}
            </RunLane>

            {/* Contract */}
            <motion.div
              className="rounded-xl border-2 p-3 flex flex-col gap-1.5 bg-card"
              initial={false}
              animate={{
                borderColor: reverted ? '#ED1C24' : stage.color,
                boxShadow: active === 0 || isRun || active === 3 ? `0 0 0 5px ${(reverted ? '#ED1C24' : stage.color)}22` : '0 0 0 0px rgba(0,0,0,0)',
              }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none">📜</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-black text-foreground leading-tight">{t('run.actors.contract')}</div>
                  <div className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">0xE5c0…91a7</div>
                </div>
                <motion.span
                  key={reverted ? 'reverted' : stage.status}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="shrink-0 self-start text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{ backgroundColor: statusColor + '22', color: statusColor }}
                >
                  {reverted ? t('run.status.reverted') : t(`run.status.${stage.status}`)}
                </motion.span>
              </div>

              {isRun ? (
                <div className="flex-1 min-h-0 flex flex-col justify-center gap-1">
                  {[
                    { label: t('run.checks.caller'), ok: !stranger, skipped: false },
                    { label: t('run.checks.amount'), ok: true, skipped: stranger },
                  ].map((c, i) => (
                    <motion.div
                      key={`${c.label}-${stranger}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: c.skipped ? 0.35 : 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.3, duration: 0.25 }}
                      className="flex items-center gap-1.5 text-xs font-semibold text-foreground"
                    >
                      {c.skipped
                        ? <span className="size-3.5 shrink-0 text-center leading-none text-muted-foreground">–</span>
                        : c.ok
                          ? <Check className="size-3.5 shrink-0 text-[#39B54A]" strokeWidth={3} />
                          : <X className="size-3.5 shrink-0 text-[#ED1C24]" strokeWidth={3} />}
                      <span className="font-mono text-[11px]">{c.label}</span>
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-1 mt-0.5">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(n => (
                      <motion.span
                        key={`${n}-${stranger}`}
                        className="size-2 rounded-sm"
                        initial={{ backgroundColor: 'var(--border)' }}
                        animate={{ backgroundColor: reverted ? '#ED1C24' : '#39B54A' }}
                        transition={{ delay: 0.7 + n * 0.07, duration: 0.2 }}
                      />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1 whitespace-nowrap">{t('run.checks.nodes')}</span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 min-h-0 flex items-end justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 whitespace-nowrap">🔒 {t('run.actors.held')}</div>
                    <RunBalance value={stage.held} color="#f59e0b" />
                  </div>
                  {active === 0 && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                      className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#6366f1] text-white whitespace-nowrap"
                    >
                      {t('run.newBadge')}
                    </motion.span>
                  )}
                </div>
              )}
            </motion.div>

            {/* Lane: contract ⇄ seller */}
            <RunLane active={active === 0 || active === 4 || isLast} color={stage.color}>
              {active === 0 && <RunPacket key="code" label={t('run.packets.code')} color={stage.color} reverse />}
              {active === 4 && <RunPacket key="deposited" label={`📡 ${t('run.packets.deposited')}`} color={stage.color} />}
              {isLast && <RunPacket key="payout" label={t('run.packets.payout')} color="#39B54A" />}
            </RunLane>

            {/* Seller */}
            <div className="rounded-xl border border-border bg-card p-3 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none">🏭</span>
                <div className="min-w-0">
                  <div className="text-xs font-black text-foreground leading-tight">{t('run.actors.seller')}</div>
                  <div className="text-[10px] text-muted-foreground">{t('run.actors.wallet')}</div>
                </div>
              </div>
              <RunBalance value={stage.seller} color="#39B54A" />
            </div>
          </div>

          {/* Narration */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 min-h-0 rounded-2xl border-2 p-4 flex flex-col gap-3"
            style={{ borderColor: stage.color + '60', backgroundColor: stage.color + '0a' }}
          >
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-3xl leading-none">{stage.emoji}</span>
                  <h3 className="text-lg font-black text-foreground">{active + 1}. {text.label}</h3>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('run.whoLabel')}</div>
                <p className="text-sm font-semibold text-foreground mt-0.5">{text.who}</p>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">{t('run.whatLabel')}</div>
                <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{text.what}</p>
              </div>
              <div className="min-w-0 flex flex-col gap-2">
                <div className="rounded-xl border p-3 bg-card" style={{ borderColor: stage.color + '40' }}>
                  <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: stage.color }}>💼 {t('run.bizLabel')}</div>
                  <p className="text-sm text-foreground mt-1 leading-snug">{text.biz}</p>
                </div>
                {isRun && (
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{t('run.tryLabel')}</div>
                    <div className="flex gap-1.5">
                      {[false, true].map(s => (
                        <button
                          key={String(s)}
                          type="button"
                          onClick={() => { setPlaying(false); setStranger(s); }}
                          className="flex-1 px-2 py-1 rounded-lg border-2 text-xs font-bold transition-colors cursor-pointer"
                          style={{
                            borderColor: stranger === s ? (s ? '#ED1C24' : '#39B54A') : 'var(--border)',
                            backgroundColor: stranger === s ? (s ? '#ED1C2414' : '#39B54A14') : 'transparent',
                            color: stranger === s ? (s ? '#ED1C24' : '#39B54A') : 'var(--muted-foreground)',
                          }}
                        >
                          {s ? `🕵️ ${t('run.callerStranger')}` : `👩‍💼 ${t('run.callerBuyer')}`}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] font-semibold mt-1.5 leading-snug" style={{ color: stranger ? '#ED1C24' : '#39B54A' }}>
                      {stranger ? t('run.checks.revert') : t('run.checks.pass')}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <button
                type="button"
                disabled={active === 0}
                onClick={() => { setPlaying(false); go(active - 1); }}
                className="shrink-0 whitespace-nowrap px-3 py-2 rounded-xl text-sm font-bold border border-border bg-card text-muted-foreground disabled:opacity-40 cursor-pointer disabled:cursor-default"
              >
                {t('run.back')}
              </button>
              <button
                type="button"
                onClick={() => { setPlaying(false); go(isLast ? 0 : active + 1); }}
                className="shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer transition-colors"
                style={{ backgroundColor: stage.color }}
              >
                {isLast ? t('run.restart') : t('run.next')}
              </button>
              <button
                type="button"
                onClick={() => { if (!playing && isLast) go(0); setPlaying(p => !p); }}
                className="shrink-0 whitespace-nowrap px-3 py-2 rounded-xl text-sm font-bold border border-border bg-card text-foreground cursor-pointer"
              >
                {playing ? t('run.pause') : t('run.play')}
              </button>
              <UnderTheHood items={t('run.hood', { returnObjects: true }) as string[]} className="ml-auto justify-end min-w-0" />
            </div>
          </motion.div>
        </div>

        {/* On-chain record */}
        <div className="min-h-0 flex flex-col gap-3">
          <div className="flex-1 min-h-0 rounded-2xl border border-border bg-card p-4 flex flex-col">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#ED1C24] mb-2">📡 {t('run.logLabel')}</div>
            <div className="flex-1 min-h-0 flex flex-col gap-1.5">
              <AnimatePresence initial={false}>
                {events.map(e => (
                  <motion.div
                    key={e}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-2.5 py-1.5 rounded-lg border border-[#ED1C24]/30 bg-[#ED1C24]/10 text-[11px] font-mono font-semibold text-foreground"
                  >
                    {e}
                  </motion.div>
                ))}
              </AnimatePresence>
              {events.length === 0 && <div className="text-xs text-muted-foreground italic">{t('run.logEmpty')}</div>}
            </div>
          </div>
          <div className="shrink-0 rounded-2xl border border-border bg-card p-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b] mb-2">⛽ {t('run.gasLabel')}</div>
            <div className="flex flex-col gap-1">
              {gasRows.map((g, i) => (
                <div key={g} className="flex items-center gap-2 text-xs transition-opacity duration-300" style={{ opacity: i < stage.gas ? 1 : 0.3 }}>
                  <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: i < stage.gas ? '#f59e0b' : 'var(--border)' }} />
                  <span className="font-mono text-foreground">{g}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 leading-snug">{t('run.gasNote')} <span className="italic">{t('run.footnote')}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Small language-neutral glyphs ───────────────────────────────────────────

/** Web2 = one hub everyone depends on; Web3 = a mesh with no centre. */
function NetGlyph({ mesh, color }: { mesh: boolean; color: string }) {
  const pts = [[10, 8], [54, 8], [6, 26], [58, 26], [18, 42], [46, 42]];
  return (
    <svg viewBox="0 0 64 48" className="h-9 w-12 shrink-0" aria-hidden>
      {mesh
        ? pts.map((a, i) => pts.slice(i + 1).map((b, j) => (
            <line key={`${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth="0.8" opacity="0.45" />
          )))
        : pts.map((a, i) => <line key={i} x1={a[0]} y1={a[1]} x2={32} y2={25} stroke={color} strokeWidth="1" opacity="0.55" />)}
      {pts.map((a, i) => <circle key={i} cx={a[0]} cy={a[1]} r={mesh ? 4 : 2.6} fill={color} />)}
      {!mesh && <rect x="24" y="17" width="16" height="16" rx="3" fill={color} />}
    </svg>
  );
}

/** Trust path: two people with either a middleman or shared code between them. */
function TrustPath({ centre, centreLabel, color, pause }: { centre: string; centreLabel: string; color: string; pause: boolean }) {
  return (
    <div className="relative flex items-center justify-between px-2 py-3">
      <div className="absolute inset-x-10 top-1/2 border-t-2 border-dashed" style={{ borderColor: color + '70' }} />
      <motion.span
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-2.5 rounded-full z-10"
        style={{ backgroundColor: color }}
        animate={{ left: pause ? ['12%', '50%', '50%', '88%'] : ['12%', '88%'] }}
        transition={{ duration: pause ? 3.2 : 1.6, times: pause ? [0, 0.3, 0.7, 1] : [0, 1], repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
      />
      <span className="relative z-20 size-10 rounded-full bg-card border border-border flex items-center justify-center text-xl">👤</span>
      <span className="relative z-20 flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl border-2 bg-card" style={{ borderColor: color }}>
        <span className="text-2xl leading-none">{centre}</span>
        <span className="text-[10px] font-black uppercase tracking-wider" style={{ color }}>{centreLabel}</span>
      </span>
      <span className="relative z-20 size-10 rounded-full bg-card border border-border flex items-center justify-center text-xl">👤</span>
    </div>
  );
}

/** One tiny picture per execution-environment property. */
function ExecMiniViz({ kind, color }: { kind: number; color: string }) {
  if (kind === 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-dashed" style={{ borderColor: color, backgroundColor: color + '10' }}>
          <span className="text-lg leading-none">📜</span>
          <span className="text-[10px] font-black font-mono" style={{ color }}>VM</span>
        </div>
        {['📁', '🌐', '🕒'].map(e => (
          <div key={e} className="relative size-9 rounded-lg bg-muted flex items-center justify-center text-base">
            <span className="opacity-50">{e}</span>
            <X className="absolute size-7 text-[#ED1C24]" strokeWidth={2.5} />
          </div>
        ))}
      </div>
    );
  }
  if (kind === 1) {
    return (
      <div className="grid grid-cols-8 gap-1.5">
        {Array.from({ length: 16 }, (_, i) => (
          <motion.span
            key={i}
            className="size-4 rounded"
            style={{ backgroundColor: color }}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: (i % 8) * 0.12 + Math.floor(i / 8) * 0.2 }}
          />
        ))}
      </div>
    );
  }
  if (kind === 2) {
    return (
      <div className="flex flex-col gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono">
            <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">2 + 2</span>
            <span className="text-muted-foreground">→ 🖥️ →</span>
            <span className="px-1.5 py-0.5 rounded font-black" style={{ backgroundColor: color + '22', color }}>4</span>
            <Check className="size-3 text-[#39B54A]" strokeWidth={3} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="size-5 rounded flex items-center justify-center" style={{ backgroundColor: i < 7 ? '#39B54A' : 'var(--muted)' }}>
            {i < 7 && <Check className="size-3 text-white" strokeWidth={3} />}
          </span>
        ))}
      </div>
      <div className="relative h-1.5 rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 rounded-full bg-[#39B54A]" style={{ width: '78%' }} />
        <div className="absolute -top-1 h-3.5 w-0.5" style={{ left: '66.6%', backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-black font-mono" style={{ color }}>≥ ⅔ ✓</span>
    </div>
  );
}

/** One tiny picture per new capability. */
function CapMiniViz({ kind, color }: { kind: number; color: string }) {
  if (kind === 0) {
    return (
      <div className="flex items-center">
        {['A', 'B', 'C'].map((l, i) => (
          <span key={l} className="relative h-8 w-9 flex items-center justify-center text-xs font-black text-white rounded-md -ml-1 first:ml-0 border-2 border-card"
            style={{ backgroundColor: [color, '#8b5cf6', '#22d3ee'][i] }}>{l}</span>
        ))}
      </div>
    );
  }
  if (kind === 1) {
    return (
      <div className="flex flex-col gap-1 text-[10px] font-mono font-black">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map(i => <span key={i} className="size-4 rounded bg-[#39B54A] flex items-center justify-center"><Check className="size-3 text-white" strokeWidth={3} /></span>)}
          <span className="text-[#39B54A] ml-1">→ ✓</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="size-4 rounded bg-muted" />
          <span className="size-4 rounded bg-[#ED1C24] flex items-center justify-center"><X className="size-3 text-white" strokeWidth={3} /></span>
          <span className="size-4 rounded bg-muted" />
          <span className="text-[#ED1C24] ml-1">→ ↩</span>
        </div>
      </div>
    );
  }
  if (kind === 2) return <NetGlyph mesh color={color} />;
  if (kind === 3) {
    return (
      <div className="w-24">
        <div className="relative h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: color + '25' }}>
          <motion.div
            className="absolute inset-y-0 w-1/3 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ left: ['-35%', '100%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <div className="flex justify-between text-sm mt-1"><span>🏢</span><span>👤</span></div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-mono font-black">
      <span className="relative size-8 rounded-lg bg-muted flex items-center justify-center text-base">
        <span className="opacity-60">🏛️</span>
        <Ban className="absolute size-7 text-[#ED1C24]" strokeWidth={2} />
      </span>
      <span className="text-muted-foreground">tx →</span>
      <span className="size-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#39B54A' }}><Check className="size-3.5 text-white" strokeWidth={3} /></span>
    </div>
  );
}

// Lucide icon per Web2-vs-Web3 row (language-neutral).
const VS_ROW_ICONS = [Server, ShieldCheck, Activity, Database, Coins, Ban];

// dApp stack diagram — which pillar (0 contracts · 1 frontend · 2 off-chain) each layer belongs to.
const DAPP_LAYERS = [
  { id: 'user',      emoji: '👤', pillar: -1, badge: null },
  { id: 'wallet',    emoji: '👛', pillar: 1,  badge: 'device' },
  { id: 'frontend',  emoji: '🖥️', pillar: 1,  badge: 'server' },
  { id: 'contracts', emoji: '📜', pillar: 0,  badge: 'chain' },
  { id: 'evm',       emoji: '⚙️', pillar: 0,  badge: 'chain' },
  { id: 'chain',     emoji: '⛓️', pillar: 0,  badge: 'chain' },
] as const;
const DAPP_BADGE_COLOR = { device: '#6366f1', server: '#f59e0b', chain: '#39B54A' } as const;

// Reading Solidity — code lines; `g` = annotation group, `note` = badge shown on the group's first line.
const SOLIDITY_LINES: { line: string; color: string; g: string | null; note: string | null }[] = [
  { line: '// SPDX-License-Identifier: MIT',               color: '#6a737d', g: null, note: null },
  { line: 'pragma solidity ^0.8.20;',                        color: '#6a737d', g: null, note: null },
  { line: '',                                                color: '',        g: null, note: null },
  { line: 'contract SimpleToken {',                          color: '#f0f4f8', g: 'A',  note: 'A' },
  { line: '  string public name;',                           color: '#79c0ff', g: 'B',  note: 'B' },
  { line: '  string public symbol;',                         color: '#79c0ff', g: 'B',  note: null },
  { line: '  uint256 public totalSupply;',                   color: '#79c0ff', g: 'B',  note: null },
  { line: '',                                                color: '',        g: null, note: null },
  { line: '  mapping(address => uint256) public balances;',  color: '#ffa657', g: 'C',  note: 'C' },
  { line: '',                                                color: '',        g: null, note: null },
  { line: '  event Transfer(',                               color: '#d2a8ff', g: 'D',  note: 'D' },
  { line: '    address indexed from,',                       color: '#d2a8ff', g: 'D',  note: null },
  { line: '    address indexed to,',                         color: '#d2a8ff', g: 'D',  note: null },
  { line: '    uint256 amount',                              color: '#d2a8ff', g: 'D',  note: null },
  { line: '  );',                                            color: '#d2a8ff', g: 'D',  note: null },
  { line: '',                                                color: '',        g: null, note: null },
  { line: '  constructor(string memory _name,',              color: '#f0f4f8', g: 'E',  note: 'E' },
  { line: '    string memory _symbol, uint256 _supply) {',   color: '#f0f4f8', g: 'E',  note: null },
  { line: '    name = _name; symbol = _symbol;',             color: '#f0f4f8', g: 'E',  note: null },
  { line: '    totalSupply = _supply;',                      color: '#f0f4f8', g: 'E',  note: null },
  { line: '    balances[msg.sender] = _supply;',             color: '#39B54A', g: 'F',  note: 'F' },
  { line: '  }',                                             color: '#f0f4f8', g: 'E',  note: null },
  { line: '',                                                color: '',        g: null, note: null },
  { line: '  function transfer(address to,',                 color: '#f0f4f8', g: 'G',  note: 'G' },
  { line: '    uint256 amount) external {',                  color: '#f0f4f8', g: 'G',  note: null },
  { line: '    require(balances[msg.sender] >= amount);',    color: '#ED1C24', g: 'H',  note: 'H' },
  { line: '    balances[msg.sender] -= amount;',             color: '#f0f4f8', g: 'G',  note: null },
  { line: '    balances[to] += amount;',                     color: '#f0f4f8', g: 'G',  note: null },
  { line: '    emit Transfer(msg.sender, to, amount);',      color: '#d2a8ff', g: 'G',  note: null },
  { line: '  }',                                             color: '#f0f4f8', g: 'G',  note: null },
  { line: '}',                                               color: '#f0f4f8', g: 'A',  note: null },
];

// ─── Exercise: dApp Stack ────────────────────────────────────────────────────

// Language-neutral data — IDs / emoji / color / correct-layer only. Text via t().
const LAYERS = [
  { id: 'frontend',   color: '#6366f1' },
  { id: 'blockchain', color: '#f59e0b' },
  { id: 'offchain',   color: '#39B54A' },
];

const STACK_ITEMS = [
  { id: 'metamask',  emoji: '👛', layer: 'frontend'   },
  { id: 'react',     emoji: '⚛️', layer: 'frontend'   },
  { id: 'infura',    emoji: '🔌', layer: 'blockchain' },
  { id: 'solidity',  emoji: '📜', layer: 'blockchain' },
  { id: 'evm',       emoji: '⚙️', layer: 'blockchain' },
  { id: 'pos',       emoji: '🏦', layer: 'blockchain' },
  { id: 'ipfs',      emoji: '📦', layer: 'offchain'   },
  { id: 'thegraph',  emoji: '📊', layer: 'offchain'   },
  { id: 'chainlink', emoji: '🌉', layer: 'offchain'   },
];

function DAppStackExercise() {
  const { t } = useTranslation('smart-contracts/section-2');
  const itemLabel = (id: string) => t(`stackExercise.items.${id}.label`);
  const itemInfo  = (id: string) => t(`stackExercise.items.${id}.info`);
  // One-line definition shown on the chip itself, so no component is met cold.
  const itemGloss = (id: string) => t(`stackExercise.items.${id}.gloss`);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [revealed,   setRevealed]   = useState(false);
  const [selected,   setSelected]   = useState<string | null>(null);
  const [hover,      setHover]      = useState<string | null>(null);

  const placed   = Object.keys(placements);
  const unplaced = STACK_ITEMS.filter(i => !placed.includes(i.id));
  const allDone  = placed.length === STACK_ITEMS.length;

  const handleItemClick = (id: string) => {
    if (revealed) return;
    setSelected(id === selected ? null : id);
  };

  const handleLayerClick = (layerId: string) => {
    if (!selected || revealed) return;
    setPlacements(prev => ({ ...prev, [selected]: layerId }));
    setSelected(null);
  };

  const handleRemove = (itemId: string) => {
    if (revealed) return;
    setPlacements(prev => { const n = { ...prev }; delete n[itemId]; return n; });
  };

  const reset = () => { setPlacements({}); setRevealed(false); setSelected(null); setHover(null); };

  const score = Object.entries(placements).filter(([id, layer]) => STACK_ITEMS.find(i => i.id === id)?.layer === layer).length;

  // While placing, the clicked component's info shows; after Check answers, the hovered chip's info shows.
  const infoItem = STACK_ITEMS.find(i => i.id === (revealed ? hover : (selected ?? hover))) ?? null;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 flex items-center justify-between mb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">{t('stackExercise.badge')}</span>
          <h2 className="text-2xl font-bold text-foreground mt-1">{t('stackExercise.heading')}</h2>
          <p className="text-muted-foreground text-sm">
            {selected ? <span className="text-[#6366f1] font-semibold">{t('stackExercise.promptSelectedA')}<span className="font-black">{itemLabel(selected)}</span></span>
              : t('stackExercise.promptIdle')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {allDone && !revealed && (
            <button onClick={() => setRevealed(true)} className="px-3 py-1.5 rounded-lg bg-[#6366f1] text-white text-xs font-bold hover:bg-[#6366f1]/90 transition-colors">{t('stackExercise.checkAnswers')}</button>
          )}
          {revealed && <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 transition-colors">{t('stackExercise.tryAgain')}</button>}
          {revealed && <div className="font-black text-lg" style={{ color: score === STACK_ITEMS.length ? '#39B54A' : score >= 6 ? '#f59e0b' : '#ED1C24' }}>{score}/{STACK_ITEMS.length}</div>}
        </div>
      </div>

      {/* Info tip — click a component (or hover a placed one after checking) */}
      <div className="shrink-0 mb-3 rounded-xl border border-border bg-card px-4 py-2.5 min-h-[3.25rem] flex items-center">
        {infoItem ? (
          <p className="text-xs leading-snug">
            <span className="font-bold text-[#6366f1]">{infoItem.emoji} {itemLabel(infoItem.id)} — </span>
            <span className="text-muted-foreground">{itemInfo(infoItem.id)}</span>
          </p>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            {revealed
              ? t('stackExercise.infoHovered')
              : t('stackExercise.infoIdle')}
          </p>
        )}
      </div>

      <div className="flex-1 min-h-0 flex gap-4">

        {/* Unplaced items */}
        <div className="w-96 shrink-0 flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">{t('stackExercise.componentsLabel')}</p>
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1">
            {unplaced.map(item => (
              <motion.button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => setHover(item.id)}
                onMouseLeave={() => setHover(null)}
                title={itemInfo(item.id)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 flex items-center gap-2.5 px-2.5 py-1 rounded-lg border-2 text-left transition-colors"
                style={{
                  borderColor: selected === item.id ? '#6366f1' : 'var(--border)',
                  backgroundColor: selected === item.id ? '#6366f115' : 'var(--card)',
                }}
              >
                <span className="text-base shrink-0">{item.emoji}</span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-foreground truncate">{itemLabel(item.id)}</span>
                  <span className="block text-[10px] text-muted-foreground leading-tight">{itemGloss(item.id)}</span>
                </span>
              </motion.button>
            ))}
            {unplaced.length === 0 && <div className="text-xs text-muted-foreground italic text-center mt-4">{t('stackExercise.allPlaced')}</div>}
          </div>
        </div>

        {/* Drop zones */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {LAYERS.map(layer => {
            const items = STACK_ITEMS.filter(i => placements[i.id] === layer.id);
            return (
              <motion.div
                key={layer.id}
                onClick={() => handleLayerClick(layer.id)}
                className="flex-1 rounded-xl border-2 p-3 transition-colors flex flex-col gap-2"
                style={{
                  borderColor: selected ? layer.color + '80' : layer.color + '30',
                  backgroundColor: selected ? layer.color + '08' : 'var(--card)',
                  cursor: selected ? 'pointer' : 'default',
                }}
                whileHover={selected ? { scale: 1.01 } : {}}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
                  <span className="text-xs font-bold" style={{ color: layer.color }}>{t(`stackExercise.layers.${layer.id}.label`)}</span>
                  <span className="text-[10px] text-muted-foreground">{t(`stackExercise.layers.${layer.id}.desc`)}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <AnimatePresence>
                    {items.map(item => {
                      const correct = item.layer === layer.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={e => { e.stopPropagation(); handleRemove(item.id); }}
                          onMouseEnter={() => setHover(item.id)}
                          onMouseLeave={() => setHover(null)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold cursor-pointer"
                          style={{
                            borderColor: !revealed ? layer.color + '50' : correct ? '#39B54A' : '#ED1C24',
                            backgroundColor: !revealed ? layer.color + '12' : correct ? '#39B54A12' : '#ED1C2412',
                            color: !revealed ? 'var(--foreground)' : correct ? '#39B54A' : '#ED1C24',
                          }}
                          title={revealed ? itemInfo(item.id) : t('stackExercise.clickToUnplace')}
                        >
                          <span>{item.emoji}</span> {itemLabel(item.id)}
                          {revealed && (correct ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" strokeWidth={3} />)}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  {items.length === 0 && (
                    <div className="text-[10px] text-muted-foreground italic">{selected ? t('stackExercise.clickHereToPlace') : t('stackExercise.empty')}</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export function SC_Section2() {
  const { t } = useTranslation('smart-contracts/section-2');

  const chapters = useMemo(
    () => chapterShape.map((c) =>
      'kind' in c
        ? { kind: 'group' as const, id: c.id, label: t(`groups.${c.id}`) }
        : { id: c.id, label: t(`chapters.${c.id}`) }
    ),
    [t]
  );

  // Which item is in focus on the click-to-explore slides.
  const [pillar, setPillar] = useState(0);
  const [component, setComponent] = useState(1);
  const [note, setNote] = useState('A');
  const [execProp, setExecProp] = useState(1);
  const [viaContract, setViaContract] = useState(false);

  const web3Before = t('web3.before.points', { returnObjects: true }) as string[];
  const web3After = t('web3.after.points', { returnObjects: true }) as string[];
  const web3Blocks = t('web3.buildingBlocks', { returnObjects: true }) as { label: string; desc: string }[];
  const web3BlockMeta = [
    { emoji: '📱', color: '#6366f1' },
    { emoji: '📜', color: '#8b5cf6' },
    { emoji: '🔗', color: '#39B54A' },
    { emoji: '👛', color: '#f59e0b' },
    { emoji: '🔮', color: '#ED1C24' },
  ];

  const dappPillars = t('dapp.pillars', { returnObjects: true }) as { title: string; subtitle: string; items: string[] }[];
  const dappPillarMeta = [
    { color: '#6366f1', emoji: '📜' },
    { color: '#f59e0b', emoji: '🖥️' },
    { color: '#39B54A', emoji: '🗄️' },
  ];

  const vsAppRows = t('vsApp.rows', { returnObjects: true }) as { prop: string; a: string; b: string }[];

  const componentCards = t('components.cards', { returnObjects: true }) as { title: string; desc: string }[];
  const componentCardMeta = [
    { color: '#6366f1', emoji: '📋' },
    { color: '#8b5cf6', emoji: '💾' },
    { color: '#39B54A', emoji: '⚙️' },
    { color: '#f59e0b', emoji: '📡' },
    { color: '#ED1C24', emoji: '🌐' },
  ];
  // Code block focus: 0 Code lights everything; 1 State · 2 Functions · 3 Events light one block; 4 Platform lights the note.
  const codeDim = (block: number) => (component === 0 || component === 4 || component === block ? 1 : 0.3);
  const codeRing = (block: number, color: string) => (component === block ? { boxShadow: `0 0 0 2px ${color}`, backgroundColor: color + '14' } : {});

  const workflowSteps = t('workflow.steps', { returnObjects: true }) as { label: string; who: string; desc: string }[];
  const workflowStepMeta = [
    { step: '01', emoji: '📤', color: '#6366f1' },
    { step: '02', emoji: '⚡', color: '#8b5cf6' },
    { step: '03', emoji: '⚙️', color: '#39B54A' },
    { step: '04', emoji: '🔗', color: '#f59e0b' },
    { step: '05', emoji: '📡', color: '#ED1C24' },
  ];

  const solidityAnnotations = t('solidity.annotations', { returnObjects: true }) as { title: string; desc: string }[];
  const solidityAnnotationMeta = [
    { key: 'A', color: '#6366f1' },
    { key: 'B', color: '#3b82f6' },
    { key: 'C', color: '#f97316' },
    { key: 'D', color: '#a855f7' },
    { key: 'E', color: '#64748b' },
    { key: 'F', color: '#39B54A' },
    { key: 'G', color: '#0ea5e9' },
    { key: 'H', color: '#ED1C24' },
  ];
  const noteIndex = solidityAnnotationMeta.findIndex(m => m.key === note);

  const executionProps = t('execution.properties', { returnObjects: true }) as { title: string; subtitle: string; desc: string; examples: string[] }[];
  const executionPropMeta = [
    { color: '#6366f1', emoji: '🖥️' },
    { color: '#39B54A', emoji: '🌐' },
    { color: '#f59e0b', emoji: '📐' },
    { color: '#ED1C24', emoji: '🤝' },
  ];

  const capabilityItems = t('capabilities.items', { returnObjects: true }) as { title: string; tagline: string; example: string }[];
  const capabilityMeta = [
    { color: '#6366f1', emoji: '🧩' },
    { color: '#39B54A', emoji: '⚛️' },
    { color: '#f59e0b', emoji: '🌍' },
    { color: '#8b5cf6', emoji: '💸' },
    { color: '#ED1C24', emoji: '🛡️' },
  ];

  const gasLevers = t('gas.levers', { returnObjects: true }) as { label: string; desc: string }[];
  const gasLeverMeta = [
    { color: '#ED1C24', emoji: '📈' },
    { color: '#39B54A', emoji: '🚀' },
  ];

  const reshapeCards = t('reshape.cards', { returnObjects: true }) as { title: string; desc: string }[];
  const reshapeCardMeta = [
    { num: '01', emoji: '🔓', color: '#6366f1', src: 'IBM (2019)' },
    { num: '02', emoji: '⚙️', color: '#8b5cf6', src: 'Akinsola & Mary (2025)' },
    { num: '03', emoji: '🔍', color: '#22d3ee', src: 'Nzuva (2019)' },
    { num: '04', emoji: '💰', color: '#39B54A', src: 'Perlman (2019)' },
    { num: '05', emoji: '🌐', color: '#f59e0b', src: 'Dal Mas et al. (2019)' },
  ];
  const reshapeMiddlemen = t('reshape.viz.middlemen', { returnObjects: true }) as string[];
  const reshapeMiddlemanEmoji = ['🏦', '🤝', '🔐', '🖋️'];
  const reshapeStats = t(viaContract ? 'reshape.viz.statsSc' : 'reshape.viz.statsTrad', { returnObjects: true }) as string[];
  const reshapeColor = viaContract ? '#39B54A' : '#ED1C24';

  const quizOptionsText = t('quiz.options', { returnObjects: true }) as string[];
  const quizOptions = quizOptionsText.map((text, i) => ({ text, correct: i === 1 }));
  const quiz2OptionsText = t('quiz2.options', { returnObjects: true }) as string[];
  const quiz2Options = quiz2OptionsText.map((text, i) => ({ text, correct: i === 2 }));
  const quiz3OptionsText = t('quiz3.options', { returnObjects: true }) as string[];
  const quiz3Options = quiz3OptionsText.map((text, i) => ({ text, correct: i === 0 }));
  const quiz4OptionsText = t('quiz4.options', { returnObjects: true }) as string[];
  const quiz4Options = quiz4OptionsText.map((text, i) => ({ text, correct: i === 3 }));

  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

  const scrollToRun = () => document.getElementById('s2-run')?.scrollIntoView({ behavior: 'smooth' });

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
            icon={<Cog className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ WEB3 LANDSCAPE ═══════ */}
        <div id="s2-web3" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('web3.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('web3.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">

            {/* Paradigm shift — who sits in the middle? */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'before', color: '#ED1C24', centre: '🏦', points: web3Before, pause: true },
                { key: 'after',  color: '#39B54A', centre: '📜', points: web3After,  pause: false },
              ].map(side => (
                <div key={side.key} className="p-4 rounded-xl border" style={{ borderColor: side.color + '4d', background: `linear-gradient(135deg, ${side.color}1f, transparent)` }}>
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: side.color }}>{t(`web3.${side.key}.tag`)}</div>
                  <div className="font-black text-lg text-foreground mt-1">{t(`web3.${side.key}.title`)}</div>
                  <TrustPath centre={side.centre} centreLabel={t(`web3.${side.key}.centre`)} color={side.color} pause={side.pause} />
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {side.points.map(line => (
                      <span key={line} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-card border text-foreground" style={{ borderColor: side.color + '40' }}>{line}</span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground italic border-t pt-2" style={{ borderColor: side.color + '33' }}>
                    {t(`web3.${side.key}.note`)}
                  </div>
                </div>
              ))}
            </div>

            {/* Implication */}
            <div className="p-3.5 bg-gradient-to-r from-[#6366f1]/15 to-[#8b5cf6]/10 border border-[#6366f1]/40 rounded-xl flex items-center gap-4">
              <div className="size-11 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-2xl shrink-0">⚡</div>
              <div>
                <div className="font-black text-base text-foreground">{t('web3.implication.title')}</div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t('web3.implication.body')}
                </p>
              </div>
            </div>

            {/* Web3 stack preview */}
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{t('web3.buildingBlocksLabel')}</div>
              <div className="flex gap-3">
                {web3Blocks.map((b, i) => (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.25 }}
                    className="flex-1 p-3 bg-card border border-border rounded-xl text-center"
                    style={{ borderColor: web3BlockMeta[i].color + '30' }}
                  >
                    <div className="text-2xl mb-1">{web3BlockMeta[i].emoji}</div>
                    <div className="font-bold text-xs mb-1" style={{ color: web3BlockMeta[i].color }}>{b.label}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">{b.desc}</div>
                  </motion.div>
                ))}
              </div>
              <UnderTheHood terms={['node', 'RPC', 'wallet signature', 'oracle']} className="mt-3" />
            </div>

          </div>
          <KeyPointBar text={t('keyPoints.s2-web3')} className="mt-3" />
        </div>

        {/* ═══════ dAPPS ═══════ */}
        <div id="s2-dapp" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('dapp.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('dapp.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Left: three pillars — click one to light up its layers */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('dapp.pickHint')}</div>
              {dappPillars.map((p, i) => {
                const on = pillar === i;
                const color = dappPillarMeta[i].color;
                return (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setPillar(i)}
                    className="p-4 rounded-xl border-2 text-left transition-colors cursor-pointer"
                    style={{ borderColor: on ? color : color + '30', backgroundColor: on ? color + '10' : 'var(--card)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{dappPillarMeta[i].emoji}</span>
                      <div>
                        <div className="font-black text-sm text-foreground">{p.title}</div>
                        <div className="text-xs font-semibold" style={{ color }}>{p.subtitle}</div>
                      </div>
                    </div>
                    <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: on ? '1fr' : '0fr' }}>
                      <ul className="overflow-hidden space-y-1">
                        {p.items.map((item, k) => (
                          <li key={item} className={`text-xs text-muted-foreground flex gap-1.5 ${k === 0 ? 'pt-2.5' : ''}`}>
                            <span style={{ color }} className="shrink-0">›</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: dApp stack diagram */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('dapp.stackLabel')}</div>
              <div className="grid grid-cols-[1fr_auto_9rem] gap-x-2 items-center p-4 bg-card rounded-xl border border-border">
                <div className="flex flex-col">
                  {DAPP_LAYERS.map((l, i) => {
                    const color = l.pillar >= 0 ? dappPillarMeta[l.pillar].color : '#64748b';
                    const on = l.pillar === pillar;
                    return (
                      <div key={l.id}>
                        {i > 0 && <div className="text-center text-muted-foreground text-xs leading-none py-0.5">↓</div>}
                        <div
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg border-2 transition-all duration-300"
                          style={{
                            borderColor: on ? color : 'var(--border)',
                            backgroundColor: on ? color + '14' : 'transparent',
                            opacity: on || l.pillar < 0 ? 1 : 0.55,
                          }}
                        >
                          <span className="text-lg leading-none">{l.emoji}</span>
                          <span className="flex-1 text-sm font-bold text-foreground">{t(`dapp.layers.${l.id}`)}</span>
                          {l.badge && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: DAPP_BADGE_COLOR[l.badge] + '20', color: DAPP_BADGE_COLOR[l.badge] }}>
                              {t(`dapp.badges.${l.badge}`)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-muted-foreground text-sm">↔</div>
                <div
                  className="flex flex-col items-center gap-1.5 px-3 py-4 rounded-lg border-2 text-center transition-all duration-300"
                  style={{
                    borderColor: pillar === 2 ? dappPillarMeta[2].color : 'var(--border)',
                    backgroundColor: pillar === 2 ? dappPillarMeta[2].color + '14' : 'transparent',
                    opacity: pillar === 2 ? 1 : 0.55,
                  }}
                >
                  <span className="text-2xl leading-none">🗄️</span>
                  <span className="text-sm font-bold text-foreground">{t('dapp.layers.offchain')}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight">{t('dapp.layers.offchainSub')}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: DAPP_BADGE_COLOR.server + '20', color: DAPP_BADGE_COLOR.server }}>
                    {t('dapp.badges.server')}
                  </span>
                </div>
              </div>
              <div className="shrink-0 p-2.5 bg-[#6366f1]/10 border border-[#6366f1]/25 rounded-lg text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t('dapp.insightLabel')}</span>{t('dapp.insightBody')}
              </div>
              <UnderTheHood terms={['RPC (Infura / Alchemy)', 'IPFS', 'indexer (The Graph)', 'oracle (Chainlink)']} className="shrink-0" />
            </div>

          </div>
          <KeyPointBar text={t('keyPoints.s2-dapp')} className="mt-3" />
        </div>

        {/* ═══════ EXERCISE: dAPP STACK ═══════ */}
        <div id="s2-ex-stack" className="h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <DAppStackExercise />
          </div>
          <div className="shrink-0 px-6 lg:px-8 pb-6 -mt-3"><KeyPointBar text={t('keyPoints.s2-ex-stack')} /></div>
        </div>

        {/* ═══════ WEB2 vs WEB3 — APP INFRASTRUCTURE ═══════ */}
        <div id="s2-vs" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('vsApp.kicker')}</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{t('vsApp.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('vsApp.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center">
            <div className="w-full max-w-4xl rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="grid grid-cols-[1.15fr_1fr_1fr]">
                <div className="p-3.5 flex items-end text-[11px] font-black uppercase tracking-widest text-muted-foreground bg-muted">{t('vsApp.propertyLabel')}</div>
                <div className="p-3.5 flex flex-col items-center gap-1 text-sm font-black text-[#ED1C24] bg-[#ED1C24]/10 border-l border-border">
                  <NetGlyph mesh={false} color="#ED1C24" />
                  {t('vsApp.colA')}
                </div>
                <div className="p-3.5 flex flex-col items-center gap-1 text-sm font-black text-[#39B54A] bg-[#39B54A]/10 border-l border-border">
                  <NetGlyph mesh color="#39B54A" />
                  {t('vsApp.colB')}
                </div>
              </div>
              {vsAppRows.map((r, i) => {
                const Icon = VS_ROW_ICONS[i];
                return (
                  <motion.div
                    key={r.prop}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className={`grid grid-cols-[1.15fr_1fr_1fr] border-t border-border ${i % 2 ? 'bg-muted/30' : ''}`}
                  >
                    <div className="px-3.5 py-3 flex items-center gap-2.5 font-semibold text-sm text-foreground">
                      <span className="size-7 rounded-lg bg-[#6366f1]/12 flex items-center justify-center shrink-0"><Icon className="size-4 text-[#6366f1]" /></span>
                      {r.prop}
                    </div>
                    <div className="px-3.5 py-3 flex items-center justify-center text-sm text-muted-foreground text-center border-l border-border">{r.a}</div>
                    <div className="px-3.5 py-3 flex items-center justify-center text-sm text-foreground font-medium text-center border-l border-border" style={{ backgroundColor: 'rgba(57,181,74,0.05)' }}>{r.b}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="shrink-0 mt-4 rounded-xl border border-[#39B54A]/30 px-4 py-2.5 text-center text-sm" style={{ backgroundColor: 'rgba(57,181,74,0.07)' }}>
            <span className="font-bold text-[#39B54A]">{t('vsApp.takeawayLabel')}</span>
            <span className="text-muted-foreground">{t('vsApp.takeaway')}</span>
          </div>
          <KeyPointBar text={t('keyPoints.s2-vs')} className="mt-3" />
        </div>

        {/* ═══════ ANATOMY ═══════ */}
        <div id="s2-components" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('components.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('components.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Left: pick a building block */}
            <div className="flex flex-col gap-2.5">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('components.pickHint')}</div>
              {componentCards.map((c, i) => {
                const on = component === i;
                const color = componentCardMeta[i].color;
                return (
                  <button
                    key={c.title}
                    type="button"
                    onClick={() => setComponent(i)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-colors cursor-pointer"
                    style={{ borderColor: on ? color : color + '30', backgroundColor: on ? color + '12' : 'var(--card)' }}
                  >
                    <div className="size-9 rounded-lg flex items-center justify-center shrink-0 text-lg" style={{ backgroundColor: color + '20' }}>{componentCardMeta[i].emoji}</div>
                    <div className="font-bold text-sm flex-1" style={{ color }}>{c.title}</div>
                    <span className="text-xs font-black" style={{ color: on ? color : 'var(--muted-foreground)' }}>{on ? '●' : '○'}</span>
                  </button>
                );
              })}
              <motion.div
                key={component}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="min-h-[6.5rem] p-3.5 rounded-xl border"
                style={{ borderColor: componentCardMeta[component].color + '50', backgroundColor: componentCardMeta[component].color + '0d' }}
              >
                <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: componentCardMeta[component].color }}>
                  {componentCardMeta[component].emoji} {componentCards[component].title}
                </div>
                <p className="text-sm text-foreground leading-snug">{componentCards[component].desc}</p>
              </motion.div>
            </div>

            {/* Right: annotated code — the picked block lights up */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('components.annotatedLabel')}</div>
              <div
                className="p-4 bg-card border border-border rounded-xl font-mono text-[11px] leading-relaxed transition-shadow duration-300"
                style={component === 0 ? { boxShadow: '0 0 0 2px #6366f1' } : undefined}
              >
                <div className="space-y-1">
                  <div className="text-muted-foreground">{'// SPDX-License-Identifier: MIT'}</div>
                  <div><span className="text-[#8b5cf6]">pragma solidity</span> ^0.8.0;</div>
                  <div className="mt-2"><span className="text-[#8b5cf6]">contract</span> <span className="text-[#6366f1]">Voting</span> {'{'}</div>

                  <div className="mt-1.5 ml-3 px-2 py-1 rounded-lg flex items-start gap-2 transition-all duration-300" style={{ opacity: codeDim(1), ...codeRing(1, '#8b5cf6') }}>
                    <div className="flex-1">
                      <div><span className="text-[#8b5cf6]">mapping</span>(<span className="text-[#f59e0b]">address</span> =&gt; <span className="text-[#f59e0b]">bool</span>) <span className="text-muted-foreground">public</span> hasVoted;</div>
                      <div><span className="text-[#f59e0b]">uint</span> <span className="text-muted-foreground">public</span> yesCount;</div>
                    </div>
                    <div className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-[#8b5cf6]/20 text-[#8b5cf6] font-bold whitespace-nowrap self-start">{t('components.tags.state')}</div>
                  </div>

                  <div className="mt-1.5 ml-3 px-2 py-1 rounded-lg flex items-start gap-2 transition-all duration-300" style={{ opacity: codeDim(3), ...codeRing(3, '#f59e0b') }}>
                    <div className="flex-1">
                      <div><span className="text-[#39B54A]">event</span> <span className="text-[#6366f1]">Voted</span>(<span className="text-[#f59e0b]">address</span> voter, <span className="text-[#f59e0b]">bool</span> vote);</div>
                    </div>
                    <div className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] font-bold whitespace-nowrap self-start">{t('components.tags.event')}</div>
                  </div>

                  <div className="mt-1.5 ml-3 px-2 py-1 rounded-lg flex items-start gap-2 transition-all duration-300" style={{ opacity: codeDim(2), ...codeRing(2, '#39B54A') }}>
                    <div className="flex-1">
                      <div><span className="text-[#8b5cf6]">function</span> <span className="text-[#6366f1]">vote</span>(<span className="text-[#f59e0b]">bool</span> inFavor) <span className="text-muted-foreground">external</span> {'{'}</div>
                      <div className="pl-4"><span className="text-[#ED1C24]">require</span>(!hasVoted[msg.sender]);</div>
                      <div className="pl-4">hasVoted[msg.sender] = <span className="text-[#39B54A]">true</span>;</div>
                      <div className="pl-4"><span className="text-[#8b5cf6]">if</span> (inFavor) yesCount++;</div>
                      <div className="pl-4"><span className="text-[#ED1C24]">emit</span> Voted(msg.sender, inFavor);</div>
                      <div>{'}'}</div>
                    </div>
                    <div className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-[#39B54A]/20 text-[#39B54A] font-bold whitespace-nowrap self-start">{t('components.tags.function')}</div>
                  </div>

                  <div>{'}'}</div>
                </div>
              </div>

              <div
                className="p-3 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl text-xs text-muted-foreground transition-shadow duration-300"
                style={component === 4 ? { boxShadow: '0 0 0 2px #ED1C24' } : undefined}
              >
                <span className="font-semibold text-foreground">{t('components.platformLabel')}</span>{t('components.platformBody')}
              </div>
              <UnderTheHood terms={['mapping', 'require()', 'emit', 'msg.sender', 'ABI']} />
            </div>

          </div>
          <KeyPointBar text={t('keyPoints.s2-components')} className="mt-3" />
        </div>

        {/* ═══════ WORKFLOW ═══════ */}
        <div id="s2-workflow" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('workflow.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('workflow.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center">
            <div className="w-full max-w-5xl">
              {/* Pipeline: a pulse travels through the five steps */}
              <div className="relative mb-5">
                <div className="absolute inset-x-[10%] top-8 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #39B54A, #f59e0b, #ED1C24)', opacity: 0.35 }} />
                <motion.span
                  className="absolute top-8 -translate-y-[calc(50%-2px)] -translate-x-1/2 size-3.5 rounded-full bg-[#6366f1] shadow-lg z-10"
                  animate={{ left: ['10%', '90%'], backgroundColor: ['#6366f1', '#8b5cf6', '#39B54A', '#f59e0b', '#ED1C24'] }}
                  transition={{ duration: 4.5, ease: 'linear', repeat: Infinity, repeatDelay: 0.6 }}
                />
                <div className="relative grid grid-cols-5 gap-3">
                  {workflowSteps.map((s, i) => {
                    const m = workflowStepMeta[i];
                    return (
                      <motion.div
                        key={m.step}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="relative z-20 size-16 rounded-full border-2 bg-card flex items-center justify-center text-3xl" style={{ borderColor: m.color, boxShadow: `0 0 0 5px ${m.color}1f` }}>
                          {m.emoji}
                        </div>
                        <div className="mt-3 w-full flex-1 p-3.5 rounded-xl border-2 flex flex-col gap-1.5" style={{ borderColor: m.color + '50', backgroundColor: m.color + '0d' }}>
                          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: m.color }}>{m.step}</span>
                          <div className="font-black text-base text-foreground">{s.label}</div>
                          <span className="self-center text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: m.color + '20', color: m.color }}>{s.who}</span>
                          <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bridge to the walkthrough */}
              <div className="p-4 rounded-xl border border-[#6366f1]/40 bg-gradient-to-r from-[#6366f1]/15 to-[#8b5cf6]/10 flex items-center gap-4">
                <div className="size-11 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-xl shrink-0">▶</div>
                <p className="flex-1 text-sm text-foreground font-medium">{t('workflow.bridge')}</p>
                <button type="button" onClick={scrollToRun} className="shrink-0 px-4 py-2 rounded-xl bg-[#6366f1] text-white text-sm font-bold hover:bg-[#6366f1]/90 transition-colors cursor-pointer">
                  {t('workflow.bridgeCta')}
                </button>
              </div>
              <UnderTheHood terms={['bytecode', 'contract address', 'ABI', 'event log']} className="mt-3" />
            </div>
          </div>
          <KeyPointBar text={t('keyPoints.s2-workflow')} className="mt-3" />
        </div>

        {/* ═══════ WATCH A CONTRACT EXECUTE (centerpiece) ═══════ */}
        <div id="s2-run" className="h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <ContractRunWalkthrough />
          </div>
          <div className="shrink-0 px-6 lg:pl-8 lg:pr-28 pb-6 -mt-3"><KeyPointBar text={t('keyPoints.s2-run')} /></div>
        </div>

        {/* ═══════ READING SOLIDITY ═══════ */}
        <div id="s2-solidity" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('solidity.kicker')}</span>
              <DeepDiveBadge label={t('optionalAdvanced', { ns: 'common' })} />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">{t('solidity.heading')}</h2>
            <p className="text-sm text-muted-foreground">{t('solidity.subtitle')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-[1.15fr_1fr] gap-5">
            {/* Code block — lines of the picked annotation light up */}
            <div className="min-h-0 bg-[#0d1117] rounded-xl overflow-auto p-4 font-mono text-[13px] leading-[1.45] border border-border">
              {SOLIDITY_LINES.map((l, i) => {
                const on = l.g === note;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => { if (l.g) setNote(l.g); }}
                    className="flex items-start gap-2 px-1 rounded transition-all duration-200"
                    style={{ backgroundColor: on ? '#6366f140' : 'transparent', opacity: on || !l.line ? 1 : 0.72 }}
                  >
                    <span className="text-[#444d56] text-xs w-5 shrink-0 select-none">{l.line ? i + 1 : ''}</span>
                    <span style={{ color: l.color || 'transparent' }} className="flex-1 whitespace-pre">{l.line || ' '}</span>
                    {l.note && (
                      <span className="shrink-0 size-4 rounded-full text-white text-[9px] font-black flex items-center justify-center" style={{ backgroundColor: solidityAnnotationMeta.find(m => m.key === l.note)?.color }}>{l.note}</span>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Annotations — pick a letter */}
            <div className="min-h-0 flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('solidity.pickHint')}</div>
              <div className="grid grid-cols-2 gap-2">
                {solidityAnnotations.map((a, i) => {
                  const m = solidityAnnotationMeta[i];
                  const on = note === m.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setNote(m.key)}
                      onMouseEnter={() => setNote(m.key)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left transition-colors cursor-pointer"
                      style={{ borderColor: on ? m.color : 'var(--border)', backgroundColor: on ? m.color + '14' : 'var(--card)' }}
                    >
                      <span className="shrink-0 size-6 rounded-full flex items-center justify-center text-white text-[11px] font-black" style={{ backgroundColor: m.color }}>{m.key}</span>
                      <span className="font-bold text-xs text-foreground leading-tight">{a.title}</span>
                    </button>
                  );
                })}
              </div>
              <motion.div
                key={note}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-h-0 p-4 rounded-xl border-2"
                style={{ borderColor: solidityAnnotationMeta[noteIndex].color + '60', backgroundColor: solidityAnnotationMeta[noteIndex].color + '0d' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="shrink-0 size-7 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: solidityAnnotationMeta[noteIndex].color }}>{note}</span>
                  <span className="font-black text-base text-foreground">{solidityAnnotations[noteIndex].title}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{solidityAnnotations[noteIndex].desc}</p>
              </motion.div>
            </div>
          </div>
          <KeyPointBar text={t('keyPoints.s2-solidity')} className="mt-3" />
        </div>

        {/* ═══════ EXECUTION ENVIRONMENT ═══════ */}
        <div id="s2-execution" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('execution.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('execution.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Left: four properties — pick one */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2.5">
                {executionProps.map((p, i) => {
                  const m = executionPropMeta[i];
                  const on = execProp === i;
                  return (
                    <button
                      key={p.title}
                      type="button"
                      onClick={() => setExecProp(i)}
                      className="p-3 rounded-xl border-2 text-left flex items-center gap-2.5 transition-colors cursor-pointer"
                      style={{ borderColor: on ? m.color : m.color + '30', backgroundColor: on ? m.color + '12' : 'var(--card)' }}
                    >
                      <div className="size-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: m.color + '15' }}>{m.emoji}</div>
                      <div className="min-w-0">
                        <div className="font-black text-sm text-foreground leading-tight">{p.title}</div>
                        <div className="text-[11px] font-semibold leading-tight mt-0.5" style={{ color: m.color }}>{p.subtitle}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={execProp}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-h-[17rem] p-4 rounded-xl border-2 flex flex-col gap-3"
                style={{ borderColor: executionPropMeta[execProp].color + '60', backgroundColor: executionPropMeta[execProp].color + '0a' }}
              >
                <div className="h-28 flex items-center justify-center rounded-lg bg-card border border-border">
                  <ExecMiniViz kind={execProp} color={executionPropMeta[execProp].color} />
                </div>
                <p className="text-sm text-foreground leading-snug">{executionProps[execProp].desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {executionProps[execProp].examples.map(e => (
                    <span key={e} className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: executionPropMeta[execProp].color + '18', color: executionPropMeta[execProp].color }}>{e}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: EVM landscape diagram */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('execution.ecosystemLabel')}</div>

              <div className="flex-1 flex flex-col gap-2 p-4 bg-card border border-border rounded-xl">
                {/* Core EVM */}
                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/10 border-2 border-[#6366f1]/50">
                  <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-1">{t('execution.evmCore.title')}</div>
                  <div className="text-xs text-muted-foreground">{t('execution.evmCore.desc')}</div>
                </div>

                <div className="text-center text-muted-foreground text-sm">{t('execution.compatibleWith')}</div>

                {/* L1 EVM chains */}
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">{t('execution.l1Label')}</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['BNB Chain', 'Avalanche C-Chain', 'Fantom', 'Cronos', 'Celo', 'Gnosis'].map(c => (
                      <div key={c} className="text-center py-1.5 px-2 bg-[#6366f1]/08 border border-[#6366f1]/20 rounded-lg text-[11px] text-muted-foreground">{c}</div>
                    ))}
                  </div>
                </div>

                {/* L2 */}
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">{t('execution.l2Label')}</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Arbitrum', 'Optimism', 'Base', 'Polygon', 'zkSync', 'Scroll'].map(c => (
                      <div key={c} className="text-center py-1.5 px-2 bg-[#39B54A]/08 border border-[#39B54A]/20 rounded-lg text-[11px] text-muted-foreground">{c}</div>
                    ))}
                  </div>
                </div>

                {/* Non-EVM */}
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">{t('execution.nonEvmLabel')}</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { name: 'SVM', chain: 'Solana', color: '#9945FF' },
                      { name: 'MoveVM', chain: 'Aptos / Sui', color: '#00D4AA' },
                      { name: 'CosmWasm', chain: 'Cosmos chains', color: '#6366f1' },
                      { name: 'Ink! / WASM', chain: 'Polkadot', color: '#E6007A' },
                    ].map(v => (
                      <div key={v.name} className="py-1.5 px-2 bg-muted border border-border rounded-lg flex items-center gap-1.5">
                        <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: v.color }} />
                        <span className="text-[11px] font-bold text-foreground">{v.name}</span>
                        <span className="text-[10px] text-muted-foreground ml-auto">{v.chain}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto p-2 bg-[#6366f1]/08 border border-[#6366f1]/20 rounded-lg text-xs text-muted-foreground text-center">
                  <span className="font-semibold text-foreground">{t('execution.deployLabel')}</span>{t('execution.deployBody')}
                </div>
              </div>
              <UnderTheHood terms={['EVM opcode', 'bytecode', 'finality', 'validator attestation']} />
            </div>

          </div>
          <KeyPointBar text={t('keyPoints.s2-execution')} className="mt-3" />
        </div>

        {/* ═══════ GAS — 10-SECOND RECAP ═══════ */}
        <div id="s2-gas" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('gas.kicker')}</span>
              <RecapHandoff label={t('recapLabel')} text={t('gas.recapWhere')} to="/blockchain-platforms/section-2" color="#39B54A" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1.5">{t('gas.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('gas.lead')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-[1fr_1.05fr] gap-5 items-stretch max-h-[30rem] my-auto">

            {/* Left: the whole idea in one picture */}
            <div className="flex flex-col gap-3 justify-center">
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-2">
                {[
                  { emoji: '⚙️', color: '#f59e0b', k: 'work' },
                  { emoji: '💲', color: '#6366f1', k: 'price' },
                  { emoji: '🧾', color: '#ED1C24', k: 'fee' },
                ].flatMap((f, i) => [
                  ...(i > 0 ? [<div key={`op-${f.k}`} className="flex items-center text-2xl font-black text-muted-foreground">{i === 1 ? '×' : '='}</div>] : []),
                  <motion.div
                    key={f.k}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.3 }}
                    className="p-3.5 rounded-2xl border-2 bg-card text-center flex flex-col items-center gap-1"
                    style={{ borderColor: f.color + '55' }}
                  >
                    <span className="text-3xl leading-none">{f.emoji}</span>
                    <span className="font-black text-sm" style={{ color: f.color }}>{t(`gas.formula.${f.k}`)}</span>
                    <span className="text-[11px] text-muted-foreground leading-tight">{t(`gas.formula.${f.k}Sub`)}</span>
                  </motion.div>,
                ])}
              </div>
              <div className="text-center text-xs font-mono text-muted-foreground">{t('gas.formulaExample')}</div>

              <div className="grid grid-cols-2 gap-2.5">
                {gasLevers.map((l, i) => (
                  <div key={l.label} className="flex gap-2.5 p-3 rounded-xl border bg-card" style={{ borderColor: gasLeverMeta[i].color + '40' }}>
                    <span className="text-xl shrink-0 leading-none">{gasLeverMeta[i].emoji}</span>
                    <div>
                      <div className="font-bold text-xs" style={{ color: gasLeverMeta[i].color }}>{l.label}</div>
                      <div className="text-xs text-muted-foreground leading-snug mt-0.5">{l.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <UnderTheHood terms={['gwei', 'base fee', 'priority tip', 'EIP-1559', 'L2 rollup']} />
            </div>

            {/* Right: the old ranking exercise, as a one-tap reveal */}
            <GasLadder />

          </div>
          <KeyPointBar text={t('keyPoints.s2-gas')} className="mt-3" />
        </div>

        {/* ═══════ TOKENS — 10-SECOND RECAP ═══════ */}
        <div id="s2-standards" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{t('standards.kicker')}</span>
              <RecapHandoff label={t('recapLabel')} text={t('standards.recapWhere')} to="/blockchain-fundamentals/section-3" color="#ED1C24" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1.5">{t('standards.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('standards.lead')}</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-5xl w-full mx-auto">
              {[
                {
                  name: 'ERC-20', emoji: '🪙', color: '#6366f1', k: 'erc20', tags: ['USDC', 'DAI', 'UNI', 'WETH'],
                  glyph: [0, 1, 2, 3, 4].map(k => <div key={k} className="size-9 rounded-full bg-[#6366f1] text-white text-[10px] font-black flex items-center justify-center">1</div>),
                },
                {
                  name: 'ERC-721', emoji: '🖼️', color: '#f97316', k: 'erc721', tags: ['CryptoPunks', 'ENS', t('standards.erc721.tagTitleDeeds')],
                  glyph: [{ n: '#1', c: '#f97316' }, { n: '#2', c: '#8b5cf6' }, { n: '#3', c: '#39B54A' }].map(b => <div key={b.n} className="size-11 rounded-lg text-white text-xs font-black flex items-center justify-center" style={{ backgroundColor: b.c }}>{b.n}</div>),
                },
                {
                  name: 'ERC-1155', emoji: '🎮', color: '#39B54A', k: 'erc1155', tags: [t('standards.erc1155.tagGameItems'), t('standards.erc1155.tagTickets'), t('standards.erc1155.tagEditions')],
                  glyph: [
                    ...[0, 1, 2].map(k => <div key={k} className="size-8 rounded-full bg-[#39B54A] text-white text-[9px] font-black flex items-center justify-center">x99</div>),
                    <div key="star" className="size-10 rounded-lg bg-[#f97316] text-white text-sm font-black flex items-center justify-center">★</div>,
                  ],
                },
              ].map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex flex-col rounded-2xl border-2 bg-card overflow-hidden"
                  style={{ borderColor: s.color + '40' }}
                >
                  <div className="h-1.5" style={{ backgroundColor: s.color }} />
                  <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{s.emoji}</span>
                      <div>
                        <div className="font-black text-lg" style={{ color: s.color }}>{s.name}</div>
                        <div className="text-xs font-semibold text-muted-foreground">{t(`standards.${s.k}.title`)}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 py-5 rounded-xl" style={{ backgroundColor: s.color + '0f' }}>
                      {s.glyph}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map(tag => <span key={tag} className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: s.color + '15', color: s.color }}>{tag}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="max-w-5xl w-full mx-auto p-3 rounded-xl border border-[#6366f1]/30 text-center text-sm" style={{ backgroundColor: '#6366f10f' }}>
              <span className="font-bold text-[#6366f1]">{t('standards.bridgeLabel')}</span>
              <span className="text-muted-foreground">{t('standards.bridge')}</span>
            </div>
          </div>
          <KeyPointBar text={t('keyPoints.s2-standards')} className="mt-3" />
        </div>

        {/* ═══════ RESHAPE BUSINESS ═══════ */}
        <div id="s2-reshape" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4 flex items-start gap-4">
            <img src={imgDisintermediation} alt={t('reshape.imgAlt')} className="hidden lg:block h-16 object-contain shrink-0" />
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('reshape.heading')}</h2>
              <p className="text-muted-foreground text-sm mt-1">{t('reshape.subtitle')}</p>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">
            {/* One deal, two routes */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('reshape.viz.label')}</div>
                <div className="flex p-0.5 rounded-lg bg-muted">
                  {[false, true].map(v => (
                    <button
                      key={String(v)}
                      type="button"
                      onClick={() => setViaContract(v)}
                      className="px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer"
                      style={{
                        backgroundColor: viaContract === v ? (v ? '#39B54A' : '#ED1C24') : 'transparent',
                        color: viaContract === v ? 'white' : 'var(--muted-foreground)',
                      }}
                    >
                      {v ? t('reshape.viz.sc') : t('reshape.viz.trad')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-20 flex items-center gap-2">
                <div className="shrink-0 w-24 flex flex-col items-center gap-1">
                  <span className="size-11 rounded-full bg-muted flex items-center justify-center text-xl">👩‍💼</span>
                  <span className="text-[11px] font-bold text-foreground">{t('reshape.viz.buyer')}</span>
                </div>
                <div className="flex-1 min-w-0 h-full relative">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={String(viaContract)}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.22 }}
                      className="absolute inset-0 flex items-center gap-2"
                    >
                      {viaContract ? (
                        <>
                          <div className="flex-1 border-t-2 border-dashed border-[#39B54A]/60" />
                          <div className="flex flex-col items-center gap-1 px-5 py-2 rounded-xl border-2 border-[#39B54A] bg-[#39B54A]/10">
                            <span className="text-2xl leading-none">📜</span>
                            <span className="text-[11px] font-black text-[#39B54A]">{t('reshape.viz.contract')}</span>
                          </div>
                          <div className="flex-1 border-t-2 border-dashed border-[#39B54A]/60" />
                        </>
                      ) : (
                        reshapeMiddlemen.flatMap((m, i) => [
                          <div key={`l-${m}`} className="flex-1 border-t-2 border-dashed border-[#ED1C24]/50" />,
                          <div key={m} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border border-[#ED1C24]/40 bg-[#ED1C24]/08" style={{ backgroundColor: '#ED1C2412' }}>
                            <span className="text-xl leading-none">{reshapeMiddlemanEmoji[i]}</span>
                            <span className="text-[11px] font-bold text-foreground whitespace-nowrap">{m}</span>
                          </div>,
                          ...(i === reshapeMiddlemen.length - 1 ? [<div key="l-end" className="flex-1 border-t-2 border-dashed border-[#ED1C24]/50" />] : []),
                        ])
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="shrink-0 w-24 flex flex-col items-center gap-1">
                  <span className="size-11 rounded-full bg-muted flex items-center justify-center text-xl">🏭</span>
                  <span className="text-[11px] font-bold text-foreground">{t('reshape.viz.seller')}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-3">
                {reshapeStats.map(s => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: reshapeColor + '18', color: reshapeColor }}
                  >
                    {s}
                  </motion.span>
                ))}
                <span className="text-[10px] text-muted-foreground italic ml-1">{t('reshape.viz.note')}</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {reshapeCards.map((c, i) => (
                <div key={reshapeCardMeta[i].num} className="p-3.5 bg-card border rounded-xl flex flex-col gap-1.5"
                  style={{ borderColor: reshapeCardMeta[i].color + '40' }}>
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-lg flex items-center justify-center text-white text-[11px] font-black" style={{ backgroundColor: reshapeCardMeta[i].color }}>{reshapeCardMeta[i].num}</div>
                    <div className="text-xl">{reshapeCardMeta[i].emoji}</div>
                  </div>
                  <div className="font-bold text-sm text-foreground">{c.title}</div>
                  <div className="text-xs text-muted-foreground leading-snug flex-1">{c.desc}</div>
                  <div className="text-[10px] italic text-muted-foreground">{reshapeCardMeta[i].src}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 mt-3 p-3 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{t('reshape.patternLabel')}</span>{t('reshape.patternBody')}
          </div>
          <KeyPointBar text={t('keyPoints.s2-reshape')} className="mt-3" />
        </div>

        {/* ═══════ NEW CAPABILITIES ═══════ */}
        <div id="s2-capabilities" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('capabilities.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('capabilities.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-2">
            {capabilityItems.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex items-center gap-4 p-3 rounded-xl border-2 bg-card"
                style={{ borderColor: capabilityMeta[i].color + '40' }}
              >
                <div className="size-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: capabilityMeta[i].color + '18' }}>{capabilityMeta[i].emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-base text-foreground">{c.title}</div>
                  <div className="text-sm font-semibold mt-0.5" style={{ color: capabilityMeta[i].color }}>{c.tagline}</div>
                </div>
                <div className="hidden lg:flex w-32 shrink-0 items-center justify-center">
                  <CapMiniViz kind={i} color={capabilityMeta[i].color} />
                </div>
                <div className="hidden lg:block w-[30%] shrink-0">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t('capabilities.realExample')}</div>
                  <div className="text-sm text-muted-foreground italic leading-snug p-2 rounded-lg" style={{ backgroundColor: capabilityMeta[i].color + '0d' }}>{c.example}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="shrink-0 mt-3 p-2.5 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{t('capabilities.whyLabel')}</span>{t('capabilities.whyBody')}
          </div>
          <KeyPointBar text={t('keyPoints.s2-capabilities')} className="mt-3" />
        </div>

        {/* ═══════ NEW CAPABILITIES IN ACTION — a lending pool, then the flash loan that borrows from it ═══════ */}
        <div id="s2-liquidity" className="h-full"><LiquidityPoolSlide /></div>
        <div id="s2-flash" className="h-full"><FlashLoanSlide /></div>

        {/* ═══════ ORACLES — why · what · how · risks · two real cases ═══════ */}
        <div id="s2-oracle-why" className="h-full"><OracleWhySlide /></div>
        <div id="s2-oracle-what" className="h-full"><OracleWhatSlide /></div>
        <div id="s2-oracle-how" className="h-full"><OracleHowSlide /></div>
        <div id="s2-oracle-risks" className="h-full"><OracleRisksSlide /></div>
        <div id="s2-oracle-paris" className="h-full"><OracleParisSlide /></div>
        <div id="s2-oracle-attack" className="h-full"><OracleAttackSlide /></div>

        {/* Quiz 1: what triggers a contract */}
        <div id="s2-quiz" className="h-full">
          <QuizSlide
            compact
            question={t('quiz.question')}
            options={quizOptions}
            explanation={t('quiz.explanation')}
          />
        </div>

        {/* Quiz 2: a failed check in the escrow run */}
        <div id="s2-quiz-2" className="h-full">
          <QuizSlide
            compact
            question={t('quiz2.question')}
            options={quiz2Options}
            explanation={t('quiz2.explanation')}
          />
        </div>

        {/* Quiz 3: why a contract needs an oracle */}
        <div id="s2-quiz-3" className="h-full">
          <QuizSlide
            compact
            question={t('quiz3.question')}
            options={quiz3Options}
            explanation={t('quiz3.explanation')}
          />
        </div>

        {/* Quiz 4: the root weakness in a price-feed attack */}
        <div id="s2-quiz-4" className="h-full">
          <QuizSlide
            compact
            question={t('quiz4.question')}
            options={quiz4Options}
            explanation={t('quiz4.explanation')}
          />
        </div>

        <div id="s2-takeaways" className="h-full">
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
