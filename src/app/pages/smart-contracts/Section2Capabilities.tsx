import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Check, X, Undo2 } from 'lucide-react';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';

// Section 2 — New Capabilities in action: a lending pool, then the flash loan that borrows from it.
// Text lives in smart-contracts/section-2.json under `liquidity`, `flash` and `money`; this file holds layout + language-neutral data.

const NS = 'smart-contracts/section-2';

const INDIGO = '#6366f1';
const VIOLET = '#8b5cf6';
const GREEN = '#39B54A';
const AMBER = '#f59e0b';
const RED = '#ED1C24';
const SKY = '#0ea5e9';
const SLATE = '#94a3b8';

function SlideHeader({ kicker, heading, subtitle }: { kicker: string; heading: string; subtitle: string }) {
  return (
    <div className="shrink-0 mb-4">
      <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{kicker}</span>
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{heading}</h2>
      <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
    </div>
  );
}

/** Locale-aware amounts: separators and the currency pattern come from the `money` block of the copy file. */
function useMoney() {
  const { t } = useTranslation(NS);
  const group = (v: number) => Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, t('money.thousands'));
  const usd = (v: number) => t('money.usd', { v: group(v) });
  /** `m` is an amount in millions of dollars; below one million it falls back to the full figure. */
  const usdM = (m: number) => (m >= 1 ? t('money.usdM', { v: String(m).replace('.', t('money.decimal')) }) : usd(m * 1e6));
  return { group, usd, usdM };
}

function Stat({ label, value, color, pulseKey }: { label: string; value: string; color?: string; pulseKey: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight">{label}</div>
      <motion.div
        key={pulseKey}
        initial={{ scale: 1.25 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.45 }}
        className="text-base font-black leading-tight origin-left whitespace-nowrap"
        style={{ color: color ?? 'var(--foreground)' }}
      >
        {value}
      </motion.div>
    </div>
  );
}

function StepControls({ step, last, color, onStep, back, next, restart }: { step: number; last: number; color: string; onStep: (s: number) => void; back: string; next: string; restart: string }) {
  return (
    <>
      <button
        type="button"
        disabled={step === 0}
        onClick={() => onStep(step - 1)}
        className="shrink-0 whitespace-nowrap px-3 py-2 rounded-xl text-sm font-bold border border-border bg-card text-muted-foreground disabled:opacity-40 cursor-pointer disabled:cursor-default"
      >
        {back}
      </button>
      <button
        type="button"
        onClick={() => onStep(step === last ? 0 : step + 1)}
        className="shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer transition-colors"
        style={{ backgroundColor: color }}
      >
        {step === last ? restart : next}
      </button>
    </>
  );
}

// ─── A · Provide liquidity → earn yield; others borrow ───────────────────────

// One row per step, amounts in USDC. The holder owns 10% of the pool: 10,000 of 100,000.
// Borrower: 40,000 at 5% against ETH worth 60,000 (150%). Interest 2,000 → pool 102,000 → the 10% share is 10,200.
interface PoolState { wallet: number; share: number | null; available: number; lent: number; borrowing: boolean }
const POOL_STATES: PoolState[] = [
  { wallet: 10000, share: null,  available: 90000,  lent: 0,     borrowing: false },
  { wallet: 0,     share: 10000, available: 100000, lent: 0,     borrowing: false },
  { wallet: 0,     share: 10000, available: 60000,  lent: 40000, borrowing: true },
  { wallet: 0,     share: 10200, available: 102000, lent: 0,     borrowing: false },
  { wallet: 10200, share: null,  available: 91800,  lent: 0,     borrowing: false },
];
const POOL_STEP_META = [
  { emoji: '💤', color: SLATE },
  { emoji: '📥', color: INDIGO },
  { emoji: '🤲', color: AMBER },
  { emoji: '💸', color: VIOLET },
  { emoji: '🌱', color: GREEN },
];
const POOL_WHY_EMOJI = ['📈', '🚪', '🔒'];

interface LaneRow { label: string; color: string; reverse?: boolean }

/** The gap between two actors: one labelled, animated track per flow; a quiet dashed line when nothing moves. */
function PoolLane({ rows }: { rows: LaneRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="min-w-0 flex items-center px-1.5">
        <div className="w-full border-t-2 border-dashed border-border" />
      </div>
    );
  }
  return (
    <div className="min-w-0 flex flex-col justify-center gap-3 px-1.5">
      {rows.map(r => (
        <div key={r.label} className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-black whitespace-nowrap leading-none" style={{ color: r.color }}>{r.label}</span>
          <div className="relative w-full h-3">
            <div className="absolute inset-x-1 top-1/2 border-t-2 border-dashed" style={{ borderColor: r.color + '99' }} />
            <span className={`absolute top-1/2 -translate-y-1/2 text-[10px] leading-none ${r.reverse ? 'left-0' : 'right-0'}`} style={{ color: r.color }}>{r.reverse ? '◀' : '▶'}</span>
            <motion.span
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-2.5 rounded-full shadow"
              style={{ backgroundColor: r.color }}
              initial={{ left: r.reverse ? '88%' : '12%', opacity: 0 }}
              animate={{ left: r.reverse ? '12%' : '88%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.3, times: [0, 0.15, 0.8, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PoolActor({ emoji, title, sub, color, active, status, children }: { emoji: string; title: string; sub: string; color: string; active: boolean; status: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="min-w-0 rounded-xl border-2 bg-card p-3 flex flex-col gap-2"
      initial={false}
      animate={{ borderColor: active ? color : SLATE, boxShadow: active ? `0 0 0 5px ${color}22` : '0 0 0 0px rgba(0,0,0,0)' }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl leading-none">{emoji}</span>
        <div className="min-w-0">
          <div className="text-sm font-black text-foreground leading-tight">{title}</div>
          <div className="text-[10px] text-muted-foreground leading-tight">{sub}</div>
        </div>
      </div>
      {children}
      <div className="text-[10px] font-semibold leading-tight min-h-[1.1rem]" style={{ color: active ? color : 'var(--muted-foreground)' }}>{status}</div>
    </motion.div>
  );
}

export function LiquidityPoolSlide() {
  const { t } = useTranslation(NS);
  const { group, usd } = useMoney();
  const steps = t('liquidity.steps', { returnObjects: true }) as { label: string; what: string }[];
  const whys = t('liquidity.why', { returnObjects: true }) as { title: string; desc: string }[];
  const holderStatus = t('liquidity.holderStatus', { returnObjects: true }) as string[];
  const poolStatus = t('liquidity.poolStatus', { returnObjects: true }) as string[];
  const borrowerStatus = t('liquidity.borrowerStatus', { returnObjects: true }) as string[];
  const [step, setStep] = useState(0);

  const last = steps.length - 1;
  const s = POOL_STATES[step];
  const meta = POOL_STEP_META[step];
  const usdc = (v: number) => `${group(v)} USDC`;
  const collateral = t('liquidity.lane.collateral');

  const holderLane: LaneRow[] =
    step === 1 ? [{ label: usdc(10000), color: INDIGO }]
    : step === 4 ? [{ label: usdc(10200), color: GREEN, reverse: true }]
    : [];
  const borrowerLane: LaneRow[] =
    step === 2 ? [{ label: usdc(40000), color: AMBER }, { label: `🔒 ${collateral}`, color: VIOLET, reverse: true }]
    : step === 3 ? [{ label: `${group(40000)} + ${group(2000)} USDC`, color: GREEN, reverse: true }, { label: `🔓 ${collateral}`, color: VIOLET }]
    : [];

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader kicker={t('liquidity.kicker')} heading={t('liquidity.heading')} subtitle={t('liquidity.subtitle')} />

      {/* Step pills */}
      <div className="shrink-0 flex items-center gap-1.5 mb-3">
        {steps.map((st, i) => {
          const on = i === step;
          const c = POOL_STEP_META[i].color;
          return (
            <button
              key={st.label}
              type="button"
              onClick={() => setStep(i)}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg border-2 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
              style={{
                borderColor: on ? c : i < step ? c + '55' : 'var(--border)',
                backgroundColor: on ? c + '18' : 'var(--card)',
                color: on ? c : 'var(--muted-foreground)',
              }}
            >
              <span>{POOL_STEP_META[i].emoji}</span>
              <span className="hidden lg:inline">{i + 1}. {st.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-3">

        {/* Scene: holder ⇄ pool ⇄ borrower */}
        <div className="shrink-0 grid grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)_minmax(0,1.15fr)_minmax(0,0.75fr)_minmax(0,1fr)] items-stretch rounded-2xl border border-border bg-card/50 p-3">

          <PoolActor emoji="👩" title={t('liquidity.holder')} sub={t('liquidity.holderSub')} color={step === 0 ? SLATE : step === 4 ? GREEN : INDIGO} active={step === 0 || step === 1 || step === 4} status={holderStatus[step]}>
            <div className="grid grid-cols-2 gap-2">
              <Stat label={t('liquidity.wallet')} value={group(s.wallet)} pulseKey={`w-${s.wallet}`} color={step === 4 ? GREEN : undefined} />
              <Stat label={t('liquidity.share')} value={s.share === null ? '–' : group(s.share)} pulseKey={`s-${s.share}`} color={s.share === null ? 'var(--muted-foreground)' : s.share > 10000 ? GREEN : INDIGO} />
            </div>
          </PoolActor>

          <PoolLane key={`h-${step}`} rows={holderLane} />

          <PoolActor emoji="🏊" title={t('liquidity.pool')} sub={t('liquidity.poolSub')} color={meta.color} active={step > 0} status={poolStatus[step]}>
            <div className="grid grid-cols-2 gap-2">
              <Stat label={t('liquidity.available')} value={group(s.available)} pulseKey={`a-${s.available}`} color={step === 3 ? GREEN : undefined} />
              <Stat label={t('liquidity.lent')} value={s.lent ? group(s.lent) : '–'} pulseKey={`l-${s.lent}`} color={s.lent ? AMBER : 'var(--muted-foreground)'} />
            </div>
            {/* pool gauge: what is still in the pot vs what is out on loan */}
            <div className="h-2 rounded-full overflow-hidden flex bg-muted">
              <motion.div className="h-full" style={{ backgroundColor: GREEN + 'cc' }} initial={false} animate={{ width: `${(s.available / (s.available + s.lent)) * 100}%` }} transition={{ duration: 0.5 }} />
              <div className="h-full flex-1" style={{ backgroundColor: AMBER }} />
            </div>
          </PoolActor>

          <PoolLane key={`b-${step}`} rows={borrowerLane} />

          <PoolActor emoji="🧑‍💼" title={t('liquidity.borrower')} sub={t('liquidity.borrowerSub')} color={step === 3 ? VIOLET : AMBER} active={step === 2 || step === 3} status={borrowerStatus[step]}>
            <div className="grid grid-cols-2 gap-2">
              <Stat label={t('liquidity.locked')} value={s.borrowing ? usd(60000) : '–'} pulseKey={`c-${s.borrowing}`} color={s.borrowing ? VIOLET : 'var(--muted-foreground)'} />
              <Stat label={t('liquidity.owes')} value={s.borrowing ? group(40000) : '–'} pulseKey={`o-${s.borrowing}`} color={s.borrowing ? AMBER : 'var(--muted-foreground)'} />
            </div>
          </PoolActor>
        </div>

        {/* Narration + why it matters */}
        <div className="flex-1 min-h-0 rounded-2xl border-2 p-4 flex flex-col gap-3 transition-colors" style={{ borderColor: meta.color + '60', backgroundColor: meta.color + '0a' }}>
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
            <div className="min-w-0 flex flex-col gap-2">
              <motion.div key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="flex-1 min-h-0">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-3xl leading-none">{meta.emoji}</span>
                  <h3 className="text-lg font-black text-foreground">{step + 1}. {steps[step].label}</h3>
                </div>
                <p className="text-sm text-foreground leading-snug">{steps[step].what}</p>
              </motion.div>
              <UnderTheHood className="shrink-0" items={t('liquidity.hood', { returnObjects: true }) as string[]} />
            </div>
            <div className="min-w-0 flex flex-col gap-1.5">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('liquidity.whyLabel')}</div>
              {whys.map((w, i) => (
                <div key={w.title} className="flex items-start gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5">
                  <span className="text-base leading-none mt-0.5">{POOL_WHY_EMOJI[i]}</span>
                  <p className="text-xs text-muted-foreground leading-snug"><span className="font-bold text-foreground">{w.title} </span>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 flex-wrap">
            <StepControls step={step} last={last} color={meta.color === SLATE ? INDIGO : meta.color} onStep={setStep} back={t('liquidity.back')} next={t('liquidity.next')} restart={t('liquidity.restart')} />
            <p className="flex-1 min-w-[14rem] text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: AMBER }}>⚠ {t('liquidity.riskLabel')} </span>{t('liquidity.risk')} <span className="italic">{t('liquidity.footnote')}</span>
            </p>
          </div>
        </div>

        {/* Bridge to the flash-loan slide */}
        <div className="shrink-0 px-3.5 py-2 lg:pr-16 rounded-xl border border-[#6366f1]/40 bg-gradient-to-r from-[#6366f1]/15 to-[#8b5cf6]/10">
          <span className="text-sm text-foreground leading-snug"><span className="font-black text-[#6366f1]">⚡ {t('liquidity.bridgeLabel')} </span>{t('liquidity.bridge')}</span>
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s2-liquidity')} className="mt-3" />
    </div>
  );
}

// ─── B · Flash loans: composability + atomicity in one transaction ───────────

// One row per step, dollars in millions. Borrow 10M → buy 5,000 ETH at $2,000 on DEX A → sell at $2,010 on DEX B
// for 10.05M → repay 10M + 0.05% fee (5,000) → keep 45,000. In the failing run the sale fetches only 9.98M,
// the repayment check fails and every row falls back to the starting state.
interface FlashState { vault: number; cash: number; eth: number; owed: boolean }
const FLASH_START: FlashState = { vault: 50, cash: 0, eth: 0, owed: false };
const FLASH_COMMON: FlashState[] = [
  FLASH_START,
  { vault: 40, cash: 10, eth: 0,    owed: true },
  { vault: 40, cash: 0,  eth: 5000, owed: true },
];
const FLASH_OK: FlashState[] = [
  ...FLASH_COMMON,
  { vault: 40,     cash: 10.05, eth: 0, owed: true },
  { vault: 50.005, cash: 0.045, eth: 0, owed: false },
];
const FLASH_FAIL: FlashState[] = [
  ...FLASH_COMMON,
  { vault: 40, cash: 9.98, eth: 0, owed: true },
  FLASH_START,
];
// Three independent protocols; the lending pool is called twice (borrow, repay).
const FLASH_PROTO = [
  { emoji: '🏊', color: INDIGO },
  { emoji: '🔄', color: VIOLET },
  { emoji: '💱', color: SKY },
];
const FLASH_CALLS = [
  { emoji: '⚡', proto: 0 },
  { emoji: '🛒', proto: 1 },
  { emoji: '💰', proto: 2 },
  { emoji: '↩️', proto: 0 },
];
const FLASH_LAST = FLASH_CALLS.length;

export function FlashLoanSlide() {
  const { t } = useTranslation(NS);
  const { group, usdM } = useMoney();
  const steps = t('flash.steps', { returnObjects: true }) as { label: string; what: string; whatFail?: string }[];
  const calls = t('flash.calls', { returnObjects: true }) as { label: string; effect: string; effectFail?: string }[];
  const protos = t('flash.protocols', { returnObjects: true }) as string[];
  const [step, setStep] = useState(0);
  const [fail, setFail] = useState(false);

  const s = (fail ? FLASH_FAIL : FLASH_OK)[step];
  const done = step === FLASH_LAST;
  const reverted = fail && done;
  const confirmed = !fail && done;
  const what = fail && steps[step].whatFail ? steps[step].whatFail : steps[step].what;

  const txColor = reverted ? RED : confirmed ? GREEN : step === 0 ? SLATE : INDIGO;
  const stepColor = reverted ? RED : confirmed ? GREEN : step === 0 ? INDIGO : FLASH_PROTO[FLASH_CALLS[step - 1].proto].color;
  const txStatus = reverted ? t('flash.status.reverted') : confirmed ? t('flash.status.confirmed') : step === 0 ? t('flash.status.idle') : t('flash.status.running', { n: step, total: FLASH_LAST });

  // How many distinct protocols have been called so far (pool, DEX A, DEX B).
  const protosCalled = reverted ? 0 : Math.min(step, FLASH_PROTO.length);

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader kicker={t('flash.kicker')} heading={t('flash.heading')} subtitle={t('flash.subtitle')} />

      <div className="flex-1 min-h-0 flex flex-col gap-3">

        {/* The transaction: one container, four ordered calls */}
        <motion.div
          className="shrink-0 rounded-2xl border-2 border-dashed p-3 flex flex-col gap-2.5"
          initial={false}
          animate={{ borderColor: txColor, backgroundColor: txColor + '0d' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl leading-none">📦</span>
            <span className="text-sm font-black uppercase tracking-wider text-foreground">{t('flash.txLabel')}</span>
            <span className="text-[11px] text-muted-foreground">{t('flash.txSub')}</span>
            <motion.span
              key={txStatus}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: reverted ? 0.9 : 0, duration: 0.25 }}
              className="ml-auto text-xs font-black px-3 py-1 rounded-full text-white whitespace-nowrap"
              style={{ backgroundColor: txColor }}
            >
              {txStatus}
            </motion.span>
          </div>

          <div className="flex items-stretch gap-1.5">
            {FLASH_CALLS.flatMap((c, idx) => {
              const n = idx + 1;
              const proto = FLASH_PROTO[c.proto];
              const failed = reverted && n === FLASH_LAST;
              const undone = reverted && n < FLASH_LAST;
              const active = !done && n === step;
              const ok = !reverted && (n < step || confirmed);
              const pending = n > step;
              // On revert the failure shows first, then the earlier calls unwind last-to-first.
              const unwind = undone ? 0.25 + (FLASH_LAST - 1 - n) * 0.22 : 0;
              const border = failed ? RED : undone ? SLATE : active ? proto.color : ok ? proto.color + '88' : 'var(--border)';
              const effect = fail && calls[idx].effectFail && step >= n ? calls[idx].effectFail : calls[idx].effect;
              return [
                ...(idx > 0 ? [
                  <div key={`arrow-${n}`} className="shrink-0 self-center text-base font-black transition-colors" style={{ color: reverted ? RED : n <= step ? FLASH_PROTO[FLASH_CALLS[idx - 1].proto].color : 'var(--muted-foreground)', transitionDelay: `${unwind}s` }}>
                    {reverted ? '←' : '→'}
                  </div>,
                ] : []),
                <button
                  key={n}
                  type="button"
                  onClick={() => setStep(n)}
                  className="relative flex-1 min-w-0 rounded-xl border-2 bg-card p-2.5 text-left cursor-pointer flex flex-col gap-1.5 transition-all duration-300"
                  style={{
                    borderColor: border,
                    borderStyle: pending ? 'dashed' : 'solid',
                    opacity: undone ? 0.55 : pending ? 0.6 : 1,
                    boxShadow: active ? `0 0 0 5px ${proto.color}22` : failed ? `0 0 0 5px ${RED}22` : 'none',
                    transitionDelay: `${unwind}s`,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap truncate" style={{ backgroundColor: proto.color + '1f', color: proto.color }}>
                      {proto.emoji} {protos[c.proto]}
                    </span>
                    <span className="ml-auto shrink-0 flex items-center">
                      {ok && (
                        <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} className="size-5 rounded-full flex items-center justify-center" style={{ backgroundColor: GREEN }}>
                          <Check className="size-3.5 text-white" strokeWidth={3} />
                        </motion.span>
                      )}
                      {active && (
                        <motion.span key="run" className="size-3 rounded-full" style={{ backgroundColor: proto.color }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                      )}
                    </span>
                  </div>
                  {failed && (
                    <motion.span key="fail" initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2.5 -right-1.5 z-10 flex items-center gap-0.5 text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full text-white whitespace-nowrap shadow" style={{ backgroundColor: RED }}>
                      <X className="size-3" strokeWidth={3} />{t('flash.badge.failed')}
                    </motion.span>
                  )}
                  {undone && (
                    <motion.span key="undo" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: unwind }} className="absolute -top-2.5 -right-1.5 z-10 flex items-center gap-0.5 text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full text-white whitespace-nowrap shadow" style={{ backgroundColor: '#64748b' }}>
                      <Undo2 className="size-3" strokeWidth={3} />{t('flash.badge.undone')}
                    </motion.span>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl leading-none">{c.emoji}</span>
                    <span className="text-sm font-black text-foreground leading-tight">{n}. {calls[idx].label}</span>
                  </div>
                  <div
                    className={`text-[11px] font-mono font-bold leading-tight transition-colors ${undone ? 'line-through' : ''}`}
                    style={{ color: failed ? RED : undone || pending ? 'var(--muted-foreground)' : 'var(--foreground)', transitionDelay: `${unwind}s` }}
                  >
                    {effect}
                  </div>
                </button>,
              ];
            })}
          </div>

          {/* Who holds what, before / during / after */}
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-2">
            <Stat label={`🏊 ${t('flash.vault')}`} value={usdM(s.vault)} pulseKey={`v-${s.vault}-${reverted}`} color={s.vault < 50 ? AMBER : s.vault > 50 ? GREEN : undefined} />
            <Stat label={`🧑‍💻 ${t('flash.holds')}`} value={s.eth ? `${group(s.eth)} ETH` : usdM(s.cash)} pulseKey={`c-${s.cash}-${s.eth}-${reverted}`} color={confirmed ? GREEN : s.eth ? VIOLET : undefined} />
            <Stat label={t('flash.owes')} value={s.owed ? t('flash.owesValue') : '–'} pulseKey={`o-${s.owed}`} color={s.owed ? AMBER : 'var(--muted-foreground)'} />
            <div className="min-w-[11rem] flex justify-end">
              {done && (
                <motion.span
                  key={String(fail)}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: reverted ? 1 : 0.2 }}
                  className="text-xs font-black px-3 py-1 rounded-full text-white whitespace-nowrap"
                  style={{ backgroundColor: reverted ? RED : GREEN }}
                >
                  {reverted ? t('flash.result.reverted') : t('flash.result.profit')}
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Narration · the toggle · the two capabilities this makes visible */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-3">
          <div className="min-w-0 rounded-2xl border-2 p-4 flex flex-col gap-3 transition-colors" style={{ borderColor: stepColor + '60', backgroundColor: stepColor + '0a' }}>
            <motion.div key={`${step}-${fail}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="flex-1 min-h-0">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-3xl leading-none">{step === 0 ? '👀' : reverted ? '⛔' : FLASH_CALLS[step - 1].emoji}</span>
                <h3 className="text-lg font-black text-foreground">{step === 0 ? steps[0].label : `${step}. ${steps[step].label}`}</h3>
              </div>
              <p className="text-sm text-foreground leading-snug">{what}</p>
            </motion.div>
            <UnderTheHood className="shrink-0" items={t('flash.hood', { returnObjects: true }) as string[]} />
            <div className="shrink-0 flex items-center gap-2 flex-wrap">
              <StepControls step={step} last={FLASH_LAST} color={stepColor} onStep={setStep} back={t('flash.back')} next={step === 0 ? t('flash.start') : t('flash.next')} restart={t('flash.restart')} />
              <p className="flex-1 min-w-[10rem] text-[11px] text-muted-foreground leading-snug italic">{t('flash.footnote')}</p>
            </div>
          </div>

          <div className="min-w-0 flex flex-col gap-2">
            {/* The toggle: does the repayment arrive? */}
            <div className="rounded-xl border border-border bg-card p-2.5">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{t('flash.toggleLabel')}</div>
              <div className="flex gap-1.5">
                {[false, true].map(v => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => { setFail(v); setStep(FLASH_LAST); }}
                    className="flex-1 px-2 py-1.5 rounded-lg border-2 text-xs font-bold transition-colors cursor-pointer leading-tight"
                    style={{
                      borderColor: fail === v ? (v ? RED : GREEN) : 'var(--border)',
                      backgroundColor: fail === v ? (v ? RED : GREEN) + '14' : 'transparent',
                      color: fail === v ? (v ? RED : GREEN) : 'var(--muted-foreground)',
                    }}
                  >
                    {v ? `✕ ${t('flash.toggleFail')}` : `✓ ${t('flash.toggleOk')}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Composability: three protocols snap together as they are called */}
            <div className="flex-1 rounded-xl border-2 px-3 py-2 transition-colors" style={{ borderColor: protosCalled > 0 ? INDIGO : 'var(--border)', backgroundColor: protosCalled > 0 ? INDIGO + '0f' : 'var(--card)' }}>
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">🧩</span>
                <span className="text-sm font-black text-foreground">{t('flash.composability.title')}</span>
                <span className="ml-auto flex items-center">
                  {FLASH_PROTO.map((p, i) => (
                    <span
                      key={p.color}
                      className="h-6 w-7 -ml-1 first:ml-0 rounded-md border-2 border-card flex items-center justify-center text-xs transition-all duration-300"
                      style={{ backgroundColor: i < protosCalled ? p.color : 'var(--muted)', opacity: i < protosCalled ? 1 : 0.55 }}
                    >
                      {p.emoji}
                    </span>
                  ))}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug mt-1">{t('flash.composability.desc')}</p>
            </div>

            {/* Atomicity: four calls, kept together or undone together */}
            <div className="flex-1 rounded-xl border-2 px-3 py-2 transition-colors" style={{ borderColor: reverted ? RED : confirmed ? GREEN : 'var(--border)', backgroundColor: reverted ? RED + '0f' : confirmed ? GREEN + '0f' : 'var(--card)' }}>
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">⚛️</span>
                <span className="text-sm font-black text-foreground">{t('flash.atomicity.title')}</span>
                <span className="ml-auto flex items-center gap-1">
                  {FLASH_CALLS.map((_, i) => {
                    const n = i + 1;
                    const kept = !reverted && (n < step || confirmed);
                    return (
                      <span key={n} className="size-5 rounded flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: reverted ? RED : kept ? GREEN : 'var(--muted)' }}>
                        {reverted ? <Undo2 className="size-3 text-white" strokeWidth={3} /> : kept ? <Check className="size-3 text-white" strokeWidth={3} /> : null}
                      </span>
                    );
                  })}
                  <span className="text-[10px] font-black font-mono ml-1 whitespace-nowrap" style={{ color: reverted ? RED : confirmed ? GREEN : 'var(--muted-foreground)' }}>
                    {reverted ? t('flash.atomicity.none') : confirmed ? t('flash.atomicity.all') : t('flash.atomicity.pending')}
                  </span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug mt-1">{t('flash.atomicity.desc')}</p>
            </div>
          </div>
        </div>

        {/* Bridge into the Oracles chapter */}
        <div className="shrink-0 px-3.5 py-2 lg:pr-16 rounded-xl border" style={{ borderColor: RED + '55', backgroundColor: RED + '0d' }}>
          <span className="text-sm text-foreground leading-snug"><span className="font-black" style={{ color: RED }}>⚠ {t('flash.bridgeLabel')} </span>{t('flash.bridge')}</span>
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s2-flash')} className="mt-3" />
    </div>
  );
}
