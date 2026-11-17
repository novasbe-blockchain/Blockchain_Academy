import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Pause, Play, RotateCcw, ShieldAlert } from 'lucide-react';

/* ──────────────────── Staking flow — the validator loop ────────────────────
   Proof-of-Stake counterpart of the Proof-of-Work "mining race":
     1. picking    — the protocol picks one validator at random
     2. proposing  — that validator proposes the next block
     3. attesting  — the others check it and vote
     4. rewarded   — proposer and voters earn new ETH
     (slashed)     — a validator that signs two conflicting blocks loses stake and is ejected
   Left of the loop: the two ways IN (solo, liquid staking).
   Right of the loop: the spot ETF, which stays OUTSIDE (off-chain, custodial price exposure).
   ──────────────────────────────────────────────────────────────────────────── */

const VALIDATORS = [
  { key: 'you', color: '#627EEA', angle: 288, icon: '🧑' },
  { key: 'b', color: '#8b5cf6', angle: 0, icon: '🖥️' },
  { key: 'c', color: '#f59e0b', angle: 72, icon: '🖥️' },
  { key: 'd', color: '#ec4899', angle: 144, icon: '🖥️' },
  { key: 'pool', color: '#06b6d4', angle: 216, icon: '👥' },
] as const;
const CHEATER = 3;
const RING_RADIUS = 39; // % of the square arena
const STAKE = 32;
// Exaggerated so the balances visibly move; the caption says so.
const PROPOSER_REWARD = 0.04;
const ATTESTER_REWARD = 0.004;
const TX_SLOTS = 6;
const SOLO_COLOR = '#627EEA';
const POOL_COLOR = '#06b6d4';
const ETF_COLOR = '#8b5cf6';
const OK = '#10b981';
const BAD = '#ef4444';

type Phase = 'idle' | 'picking' | 'proposing' | 'attesting' | 'rewarded' | 'slashed';

export function StakingFlow() {
  const { t } = useTranslation('blockchain-platforms/section-2');
  const [phase, setPhase] = useState<Phase>('idle');
  const [running, setRunning] = useState(false);
  const [slot, setSlot] = useState(1);
  const [cursor, setCursor] = useState<number | null>(null);
  const [proposer, setProposer] = useState<number | null>(null);
  const [votes, setVotes] = useState<number[]>([]);
  const [balances, setBalances] = useState<number[]>(() => VALIDATORS.map(() => STAKE));
  const [ejected, setEjected] = useState(false);
  const [cheatArmed, setCheatArmed] = useState(false);
  const [cheating, setCheating] = useState(false);

  // Refs mirror the flags the timer chain reads, so a round never sees stale state.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const runningRef = useRef(false);
  const ejectedRef = useRef(false);
  const cheatRef = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };

  function runRound() {
    timers.current = [];
    const active = VALIDATORS.map((_, i) => i).filter(i => !(ejectedRef.current && i === CHEATER));
    const cheat = cheatRef.current && !ejectedRef.current;
    const chosen = cheat ? CHEATER : active[Math.floor(Math.random() * active.length)];
    const others = active.filter(i => i !== chosen);

    setPhase('picking');
    setProposer(null);
    setVotes([]);
    setCheating(cheat);

    // 1 · the random pick: a highlight hops around the ring, then lands
    const hops = 8;
    for (let k = 0; k < hops; k++) later(k * 140, () => setCursor(active[k % active.length]));
    const tPropose = hops * 140;
    later(tPropose, () => {
      setCursor(null);
      setProposer(chosen);
      setPhase('proposing');
    });

    if (cheat) {
      // the cheater signs two conflicting blocks → slashed and ejected
      later(tPropose + 1300, () => {
        cheatRef.current = false;
        ejectedRef.current = true;
        setCheatArmed(false);
        setEjected(true);
        setPhase('slashed');
      });
      later(tPropose + 1300 + 3200, nextSlot);
      return;
    }

    // 3 · the others attest one by one
    const tAttest = tPropose + 1100;
    later(tAttest, () => setPhase('attesting'));
    others.forEach((v, order) => later(tAttest + (order + 1) * 300, () => setVotes(prev => [...prev, v])));

    // 4 · rewards
    const tReward = tAttest + others.length * 300 + 500;
    later(tReward, () => {
      setPhase('rewarded');
      setBalances(prev => prev.map((b, i) => (i === chosen ? b + PROPOSER_REWARD : others.includes(i) ? b + ATTESTER_REWARD : b)));
    });
    later(tReward + 1900, nextSlot);
  }

  function nextSlot() {
    setSlot(s => s + 1);
    setProposer(null);
    setVotes([]);
    setCheating(false);
    if (runningRef.current) runRound();
    else setPhase('idle');
  }

  function start() {
    if (runningRef.current) return;
    runningRef.current = true;
    setRunning(true);
    if (phase === 'idle') runRound();
  }

  function pause() {
    runningRef.current = false;
    setRunning(false);
  }

  function armCheat() {
    cheatRef.current = true;
    setCheatArmed(true);
    start();
  }

  function reset() {
    clearTimers();
    runningRef.current = false;
    ejectedRef.current = false;
    cheatRef.current = false;
    setRunning(false);
    setEjected(false);
    setCheatArmed(false);
    setCheating(false);
    setPhase('idle');
    setSlot(1);
    setCursor(null);
    setProposer(null);
    setVotes([]);
    setBalances(VALIDATORS.map(() => STAKE));
  }

  const name = (i: number) => t(`stakingFlow.validators.${VALIDATORS[i].key}.name`);
  const activeCount = VALIDATORS.length - (ejected ? 1 : 0);
  const voteCount = proposer === null || phase === 'picking' || phase === 'slashed' ? 0 : votes.length + 1; // the proposer backs its own block
  const votePct = (voteCount / activeCount) * 100;
  const blockColor = phase === 'slashed' || (cheating && phase === 'proposing') ? BAD : phase === 'rewarded' ? OK : phase === 'idle' ? 'var(--border)' : '#f59e0b';
  const blockFilled = phase === 'proposing' || phase === 'attesting' || phase === 'rewarded' || phase === 'slashed';
  const pristine = phase === 'idle' && slot === 1 && !running;

  const statusText =
    phase === 'picking' ? t('stakingFlow.status.picking', { n: slot })
      : phase === 'proposing' && proposer !== null ? t(cheating ? 'stakingFlow.status.proposingCheat' : 'stakingFlow.status.proposing', { name: name(proposer) })
        : phase === 'attesting' ? t('stakingFlow.status.attesting', { votes: voteCount, total: activeCount })
          : phase === 'rewarded' ? t('stakingFlow.status.rewarded')
            : phase === 'slashed' ? t('stakingFlow.status.slashed', { name: name(CHEATER) })
              : pristine ? t('stakingFlow.status.idle') : t('stakingFlow.status.paused');
  const statusColor = phase === 'slashed' || (cheating && phase === 'proposing') ? BAD : phase === 'rewarded' ? OK : phase === 'idle' ? 'var(--muted-foreground)' : '#f59e0b';

  const zoneLabel = 'text-[10px] font-black uppercase tracking-wider whitespace-nowrap';
  const btn = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs lg:text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2.5">
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)_248px] gap-3">

        {/* ── Ways in: solo · liquid staking ── */}
        <div className="min-h-0 flex flex-col gap-2.5">
          <div className={`${zoneLabel} text-muted-foreground shrink-0`}>{t('stakingFlow.waysIn')}</div>

          <div className="relative flex-1 min-h-0 rounded-xl border-2 p-3 flex flex-col justify-center gap-1.5" style={{ borderColor: SOLO_COLOR + '70', backgroundColor: SOLO_COLOR + '0D' }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl leading-none">🧑</span>
              <div className="font-black text-sm" style={{ color: SOLO_COLOR }}>{t('stakingFlow.solo.title')}</div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold">
              <span className="rounded-md border px-1.5 py-0.5 bg-card" style={{ borderColor: SOLO_COLOR + '70', color: SOLO_COLOR }}>🔒 32 ETH</span>
              <span className="text-muted-foreground">→</span>
              <span className="rounded-md border px-1.5 py-0.5 bg-card text-foreground border-border">🖥️ ×1</span>
            </div>
            <div className="text-xs text-muted-foreground leading-snug">{t('stakingFlow.solo.body')}</div>
            <span className="hidden lg:flex absolute -right-[15px] top-1/2 -translate-y-1/2 size-6 rounded-full items-center justify-center text-white text-sm font-black z-10" style={{ backgroundColor: SOLO_COLOR }}>→</span>
          </div>

          <div className="relative flex-[1.5] min-h-0 rounded-xl border-2 p-3 flex flex-col justify-center gap-1.5" style={{ borderColor: POOL_COLOR + '70', backgroundColor: POOL_COLOR + '0D' }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl leading-none">👥</span>
              <div className="font-black text-sm" style={{ color: POOL_COLOR }}>{t('stakingFlow.liquid.title')}</div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono font-bold flex-wrap">
              {['0.5', '2', '10'].map(a => (
                <span key={a} className="rounded-md border px-1.5 py-0.5 bg-card" style={{ borderColor: POOL_COLOR + '70', color: POOL_COLOR }}>{a}</span>
              ))}
              <span className="text-muted-foreground">ETH →</span>
              <span className="rounded-md border px-1.5 py-0.5 bg-card text-foreground border-border">{t('stakingFlow.liquid.pool')}</span>
            </div>
            <div className="text-xs text-muted-foreground leading-snug">{t('stakingFlow.liquid.body')}</div>
            <div className="rounded-lg border border-dashed px-2 py-1.5 mt-0.5" style={{ borderColor: POOL_COLOR + '90' }}>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
                <span style={{ color: POOL_COLOR }}>↩</span>
                <span className="rounded-full px-1.5 py-0.5 text-[10px] font-mono font-black text-white" style={{ backgroundColor: POOL_COLOR }}>stETH</span>
                {t('stakingFlow.liquid.receipt')}
              </div>
              <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{t('stakingFlow.liquid.receiptSub')}</div>
            </div>
            <span className="hidden lg:flex absolute -right-[15px] top-1/2 -translate-y-1/2 size-6 rounded-full items-center justify-center text-white text-sm font-black z-10" style={{ backgroundColor: POOL_COLOR }}>→</span>
          </div>
        </div>

        {/* ── The loop: validators around the next block ── */}
        <div className="relative min-h-[380px] lg:min-h-0 rounded-2xl border-2 border-dashed border-border/70 bg-muted/20 overflow-hidden">
          <div className={`${zoneLabel} absolute top-2 left-3 text-[#627EEA]`}>{t('stakingFlow.arenaLabel')}</div>
          <div className="absolute top-2 right-3 text-[10px] font-mono text-muted-foreground">{t('stakingFlow.block.every')}</div>
          <div className="absolute bottom-2 inset-x-3 text-center text-[10px] text-muted-foreground italic">{t('stakingFlow.caption')}</div>

          <div className="relative h-full aspect-square max-w-full mx-auto">
            {/* the loop itself */}
            <div
              className="absolute rounded-full border-2 border-dashed transition-colors duration-500"
              style={{ inset: `${50 - RING_RADIUS}%`, borderColor: (phase === 'idle' ? '#627EEA' : statusColor) + (phase === 'idle' ? '55' : '90') }}
            />

            {/* centre: the block being decided */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[172px] rounded-xl border-2 bg-card shadow-lg transition-colors duration-300"
              style={{ borderColor: blockColor, borderStyle: phase === 'rewarded' ? 'solid' : 'dashed' }}
            >
              <div className="px-2.5 py-1.5 border-b border-border/70 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-muted-foreground">{t('stakingFlow.block.slot', { n: slot })}</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-right leading-tight" style={{ color: statusColor }}>
                  {t(`stakingFlow.block.status.${cheating && phase === 'proposing' ? 'conflict' : phase}`)}
                </span>
              </div>
              <div className="p-2 grid grid-cols-6 gap-1">
                {Array.from({ length: TX_SLOTS }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 rounded-sm transition-all duration-300"
                    style={{
                      transitionDelay: blockFilled ? `${i * 60}ms` : '0ms',
                      backgroundColor: blockFilled ? blockColor + '30' : 'transparent',
                      border: blockFilled ? `1px solid ${blockColor}` : '1px dashed rgba(115,115,115,0.35)',
                    }}
                  />
                ))}
              </div>
              <div className="px-2.5 pb-2">
                <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground mb-1">
                  <span>{t('stakingFlow.block.votes')} {voteCount}/{activeCount}</span>
                  <span>{t('stakingFlow.block.threshold')}</span>
                </div>
                <div className="relative h-1.5 rounded-full bg-muted/60">
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${votePct}%`, backgroundColor: votePct >= 66.6 ? OK : '#f59e0b' }} />
                  <div className="absolute -top-0.5 -bottom-0.5 w-0.5 bg-foreground/70" style={{ left: '66.6%' }} />
                </div>
              </div>
            </div>

            {/* validators on the ring */}
            {VALIDATORS.map((v, i) => {
              const rad = (v.angle * Math.PI) / 180;
              const left = 50 + RING_RADIUS * Math.sin(rad);
              const top = 50 - RING_RADIUS * Math.cos(rad);
              const out = ejected && i === CHEATER;
              const isCursor = cursor === i;
              const isProposer = proposer === i && phase !== 'idle';
              const hasVoted = votes.includes(i);
              const paid = phase === 'rewarded' && !out;
              const border = out || (isProposer && cheating) ? BAD : hasVoted || (isProposer && phase === 'rewarded') ? OK : v.color + (isCursor || isProposer ? 'FF' : '80');
              const line = out ? t('stakingFlow.badge.ejected')
                : isProposer ? t(cheating ? 'stakingFlow.badge.double' : 'stakingFlow.badge.proposes')
                  : hasVoted ? t('stakingFlow.badge.attests')
                    : t(`stakingFlow.validators.${v.key}.tag`);
              return (
                <div
                  key={v.key}
                  className={`absolute w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 bg-card px-2.5 py-1.5 transition-all duration-300 ${out ? 'opacity-60' : ''}`}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    borderColor: border,
                    boxShadow: isCursor || isProposer ? `0 0 0 4px ${(isProposer && cheating ? BAD : v.color)}35` : undefined,
                    scale: isCursor || isProposer ? '1.06' : '1',
                  }}
                >
                  {hasVoted && !out && (
                    <div className="absolute -top-2 -right-2 size-5 rounded-full text-white text-[11px] flex items-center justify-center font-bold shadow-md" style={{ backgroundColor: OK }}>✓</div>
                  )}
                  {isCursor && <div className="absolute -top-2.5 -right-2.5 text-lg leading-none">🎲</div>}
                  {paid && (
                    <motion.div
                      key={slot}
                      initial={{ opacity: 0, y: 0, scale: 0.6 }}
                      animate={{ opacity: 1, y: -6, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-white text-[10px] font-mono font-bold shadow-md whitespace-nowrap pointer-events-none"
                      style={{ backgroundColor: OK }}
                    >
                      +{(isProposer ? PROPOSER_REWARD : ATTESTER_REWARD).toFixed(3)} ETH
                    </motion.div>
                  )}
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm leading-none">{out ? '⛔' : v.icon}</span>
                    <span className="text-[10px] font-bold truncate" style={{ color: out ? BAD : v.color }}>{name(i)}</span>
                  </div>
                  <div className={`font-mono text-xs font-bold tabular-nums mt-0.5 ${out ? 'text-[#ef4444]' : 'text-foreground'}`}>
                    {out ? `🔥 < ${STAKE} ETH` : `${balances[i].toFixed(3)} ETH`}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider font-bold truncate" style={{ color: out || (isProposer && cheating) ? BAD : isProposer ? '#f59e0b' : hasVoted ? OK : 'var(--muted-foreground)' }}>
                    {line}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Outside the loop: the spot ETF ── */}
        <div className="relative min-h-0 flex flex-col gap-2.5">
          <div className={`${zoneLabel} shrink-0`} style={{ color: ETF_COLOR }}>{t('stakingFlow.etf.zone')}</div>
          <div
            className="relative flex-1 min-h-0 rounded-xl border-2 border-dashed py-3 pr-3 pl-5 flex flex-col justify-center gap-1.5"
            style={{ borderColor: ETF_COLOR + '70', backgroundImage: `repeating-linear-gradient(135deg, ${ETF_COLOR}0A 0 8px, transparent 8px 16px)` }}
          >
            <span className="hidden lg:flex absolute -left-[15px] top-1/2 -translate-y-1/2 size-6 rounded-full items-center justify-center bg-card border-2 text-xs font-black z-10" style={{ borderColor: BAD, color: BAD }}>✕</span>

            {[
              { icon: '🏛️', title: t('stakingFlow.etf.investor'), sub: t('stakingFlow.etf.investorSub') },
              { icon: '📈', title: t('stakingFlow.etf.fund'), sub: t('stakingFlow.etf.fundSub') },
              { icon: '🔐', title: t('stakingFlow.etf.custodian'), sub: t('stakingFlow.etf.custodianSub') },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                {i > 0 && <span className="text-xs leading-none font-bold" style={{ color: ETF_COLOR }}>↓</span>}
                <div className="w-full rounded-lg border bg-card px-2.5 py-1.5 flex items-center gap-2" style={{ borderColor: ETF_COLOR + '55' }}>
                  <span className="text-xl leading-none shrink-0">{b.icon}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-black leading-tight" style={{ color: ETF_COLOR }}>{b.title}</div>
                    <div className="text-[11px] text-muted-foreground leading-tight">{b.sub}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-1 flex flex-col gap-1 text-[11px] font-semibold leading-snug">
              <div className="flex gap-1.5"><span style={{ color: OK }}>✓</span><span className="text-foreground">{t('stakingFlow.etf.gets')}</span></div>
              <div className="flex gap-1.5"><span style={{ color: BAD }}>✗</span><span className="text-foreground">{t('stakingFlow.etf.lacks')}</span></div>
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug border-t border-border pt-1.5 mt-0.5">{t('stakingFlow.etf.note')}</p>
          </div>
        </div>
      </div>

      {/* ── Status + controls ── */}
      <div className="shrink-0 flex items-center justify-center gap-2.5 flex-wrap min-h-[38px]">
        <div className="px-4 py-1.5 rounded-xl border text-xs lg:text-sm font-bold text-center" style={{ color: statusColor, borderColor: phase === 'idle' ? 'var(--border)' : statusColor + '60', backgroundColor: phase === 'idle' ? 'transparent' : statusColor + '14' }}>
          {statusText}
        </div>
        {running ? (
          <button onClick={pause} className={`${btn} border-border text-muted-foreground hover:text-foreground hover:border-foreground`}>
            <Pause className="size-3.5" />{t('stakingFlow.controls.pause')}
          </button>
        ) : (
          <button onClick={start} disabled={phase !== 'idle'} className={`${btn} border-[#627EEA] bg-[#627EEA] text-white hover:opacity-90`}>
            <Play className="size-3.5" />{pristine ? t('stakingFlow.controls.start') : t('stakingFlow.controls.resume')}
          </button>
        )}
        <button onClick={armCheat} disabled={ejected || cheatArmed} className={`${btn} border-[#ef4444]/50 bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/15`}>
          <ShieldAlert className="size-3.5" />{cheatArmed ? t('stakingFlow.controls.cheatArmed') : t('stakingFlow.controls.cheat')}
        </button>
        {!pristine && (
          <button onClick={reset} className={`${btn} border-border text-muted-foreground hover:text-foreground hover:border-foreground`}>
            <RotateCcw className="size-3.5" />{t('stakingFlow.controls.reset')}
          </button>
        )}
      </div>
    </div>
  );
}
