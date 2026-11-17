import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { Pause, Play, RotateCcw, ShieldAlert } from 'lucide-react';

/* ──────────────────── Staking flow — the validator loop ────────────────────
   Proof-of-Stake counterpart of the Proof-of-Work "mining race":
     1. picking    — a random-draw beam spins round the validator set and lands on one
     2. proposing  — that validator proposes the next block
     3. attesting  — the others check it and vote, one after another
     4. rewarded   — proposer and voters earn new ETH
     (slashed)     — a validator that signs two conflicting blocks loses stake and is ejected
     (churn)       — between slots: one validator leaves through the exit queue,
                     the head of the entry queue is activated in its place
   Left of the loop: the two ways IN (solo, liquid staking).
   Right of the loop: the spot ETF, which stays OUTSIDE (off-chain, custodial price exposure).
   ──────────────────────────────────────────────────────────────────────────── */

type Kind = 'you' | 'pool' | 'other';
interface Validator { id: number; kind: Kind; }
interface World { ring: Validator[]; entry: Validator[]; exit: Validator[]; }
interface Pos { left: number; top: number; }

const RING_SIZE = 20;
const RING_RADIUS = 40; // % of the square arena
const YOU_SLOT = 17;
const POOL_SLOTS = [2, 5, 9, 12, 15];
const STAKE = 32;
// Exaggerated so the balance visibly moves; the caption says so.
const PROPOSER_REWARD = 0.04;
const ATTESTER_REWARD = 0.004;
const TX_SLOTS = 6;

// Pacing (ms) — slow enough to follow every step; one full round ≈ one real 12 s slot.
const SPIN_MS = 3000;
const LAND_HOLD = 1100;
const PROPOSE_HOLD = 2400;
const VOTE_STEP = 140;
const VOTE_HOLD = 900;
const REWARD_HOLD = 3200;
const SLASH_HOLD = 4500;
const CHURN_MS = 3000;
const CHURN_EVERY = 2; // slots

const KIND_COLOR: Record<Kind, string> = { you: '#627EEA', pool: '#06b6d4', other: '#94a3b8' };
const SOLO_COLOR = '#627EEA';
const POOL_COLOR = '#06b6d4';
const ETF_COLOR = '#8b5cf6';
const PICK = '#f59e0b';
const OK = '#10b981';
const BAD = '#ef4444';

const polar = (deg: number, radius: number): Pos => {
  const rad = (deg * Math.PI) / 180;
  return { left: 50 + radius * Math.sin(rad), top: 50 - radius * Math.cos(rad) };
};
const slotAngle = (k: number) => (k * 360) / RING_SIZE;
// Queues sit in the two bottom corners of the arena, head nearest the ring.
const ENTRY_POS: Pos[] = [{ left: 6, top: 77 }, { left: 6, top: 83 }, { left: 6, top: 89 }];
const EXIT_POS: Pos[] = [{ left: 94, top: 77 }, { left: 94, top: 83 }];

const initialWorld = (): World => ({
  ring: Array.from({ length: RING_SIZE }, (_, k) => ({
    id: 1203 + k * 317,
    kind: k === YOU_SLOT ? 'you' : POOL_SLOTS.includes(k) ? 'pool' : 'other',
  })),
  entry: [{ id: 8104, kind: 'other' }, { id: 8105, kind: 'pool' }, { id: 8106, kind: 'other' }],
  exit: [{ id: 411, kind: 'other' }],
});

type Phase = 'idle' | 'picking' | 'proposing' | 'attesting' | 'rewarded' | 'slashed' | 'churn';

export function StakingFlow() {
  const { t } = useTranslation('blockchain-platforms/section-2');
  const [phase, setPhase] = useState<Phase>('idle');
  const [running, setRunning] = useState(false);
  const [slot, setSlot] = useState(1);
  const [world, setWorld] = useState<World>(initialWorld);
  const [beam, setBeam] = useState(-90); // degrees; -90 points at ring slot 0 (top)
  const [proposer, setProposer] = useState<number | null>(null); // ring slot
  const [votes, setVotes] = useState<number[]>([]); // ring slots
  const [youBalance, setYouBalance] = useState(STAKE);
  const [slashedId, setSlashedId] = useState<number | null>(null);
  const [cheatArmed, setCheatArmed] = useState(false);
  const [cheating, setCheating] = useState(false);

  // Refs mirror what the timer chain reads, so a round never sees stale state.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const runningRef = useRef(false);
  const cheatRef = useRef(false);
  const worldRef = useRef(world);
  const slotRef = useRef(1);
  const beamRef = useRef(-90);
  const slashedRef = useRef<number | null>(null);
  const nextId = useRef(8107);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const later = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };
  const commitWorld = (w: World) => {
    worldRef.current = w;
    setWorld(w);
  };

  function runRound() {
    timers.current = [];
    const ring = worldRef.current.ring;
    const cheat = cheatRef.current;
    const pool = ring.map((_, k) => k).filter(k => !cheat || ring[k].kind === 'other');
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    const others = Array.from({ length: RING_SIZE - 1 }, (_, n) => (chosen + 1 + n) % RING_SIZE);

    setPhase('picking');
    setProposer(null);
    setVotes([]);
    setCheating(cheat);

    // 1 · the random draw: the beam makes two full turns, slows down and lands on one validator
    const target = slotAngle(chosen) - 90;
    const ahead = (((target - beamRef.current) % 360) + 360) % 360;
    beamRef.current += 720 + ahead;
    setBeam(beamRef.current);
    later(SPIN_MS, () => setProposer(chosen));

    // 2 · it proposes the next block
    const tPropose = SPIN_MS + LAND_HOLD;
    later(tPropose, () => setPhase('proposing'));

    if (cheat) {
      // the cheater signs two conflicting blocks → slashed, then pushed out through the exit queue
      later(tPropose + PROPOSE_HOLD, () => {
        cheatRef.current = false;
        slashedRef.current = ring[chosen].id;
        setCheatArmed(false);
        setSlashedId(ring[chosen].id);
        setPhase('slashed');
      });
      later(tPropose + PROPOSE_HOLD + SLASH_HOLD, endSlot);
      return;
    }

    // 3 · the others attest, sweeping round the ring from the proposer
    const tAttest = tPropose + PROPOSE_HOLD;
    later(tAttest, () => setPhase('attesting'));
    others.forEach((k, order) => later(tAttest + (order + 1) * VOTE_STEP, () => setVotes(prev => [...prev, k])));

    // 4 · rewards
    const tReward = tAttest + others.length * VOTE_STEP + VOTE_HOLD;
    later(tReward, () => {
      setPhase('rewarded');
      setYouBalance(b => b + (chosen === YOU_SLOT ? PROPOSER_REWARD : ATTESTER_REWARD));
    });
    later(tReward + REWARD_HOLD, endSlot);
  }

  function endSlot() {
    timers.current = [];
    setProposer(null);
    setVotes([]);
    setCheating(false);

    // Between slots the set changes a little: a slashed validator is forced out at once,
    // otherwise one validator leaves voluntarily every couple of slots.
    const w = worldRef.current;
    const slashedSlot = w.ring.findIndex(v => v.id === slashedRef.current);
    if (slashedSlot < 0 && slotRef.current % CHURN_EVERY !== 0) {
      nextSlot();
      return;
    }
    const leavers = w.ring.map((_, k) => k).filter(k => k !== YOU_SLOT);
    const leaverSlot = slashedSlot >= 0 ? slashedSlot : leavers[Math.floor(Math.random() * leavers.length)];
    const [joiner, ...waiting] = w.entry;
    const id = nextId.current++;
    const ring = w.ring.slice();
    ring[leaverSlot] = joiner;
    setPhase('churn');
    commitWorld({
      ring,
      entry: [...waiting, { id, kind: id % 3 === 0 ? 'pool' : 'other' }],
      exit: [w.ring[leaverSlot], ...w.exit].slice(0, EXIT_POS.length),
    });
    later(CHURN_MS, () => {
      slashedRef.current = null;
      setSlashedId(null);
      nextSlot();
    });
  }

  function nextSlot() {
    slotRef.current += 1;
    setSlot(slotRef.current);
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
    cheatRef.current = false;
    slashedRef.current = null;
    slotRef.current = 1;
    setRunning(false);
    setSlashedId(null);
    setCheatArmed(false);
    setCheating(false);
    setPhase('idle');
    setSlot(1);
    setProposer(null);
    setVotes([]);
    setYouBalance(STAKE);
    commitWorld(initialWorld());
  }

  const name = (v: Validator) => (v.kind === 'you' ? t('stakingFlow.validators.you') : `${t(`stakingFlow.validators.${v.kind}`)} #${v.id}`);
  const proposerV = proposer === null ? null : world.ring[proposer];
  const slashedV = world.ring.find(v => v.id === slashedId) ?? world.exit.find(v => v.id === slashedId) ?? null;
  const landed = phase === 'picking' && proposer !== null;
  const voting = phase === 'proposing' || phase === 'attesting' || phase === 'rewarded';
  const voteCount = voting && proposer !== null ? votes.length + 1 : 0; // the proposer backs its own block
  const votePct = (voteCount / RING_SIZE) * 100;
  const conflict = cheating && phase === 'proposing';
  const quiet = phase === 'idle' || phase === 'churn';
  const blockColor = phase === 'slashed' || conflict ? BAD : phase === 'rewarded' ? OK : quiet ? 'var(--border)' : PICK;
  const blockFilled = phase === 'proposing' || phase === 'attesting' || phase === 'rewarded' || phase === 'slashed';
  const pristine = phase === 'idle' && slot === 1 && !running;

  const statusText =
    phase === 'picking' ? (landed && proposerV ? t('stakingFlow.status.picked', { name: name(proposerV) }) : t('stakingFlow.status.picking', { n: slot }))
      : phase === 'proposing' && proposerV ? t(cheating ? 'stakingFlow.status.proposingCheat' : 'stakingFlow.status.proposing', { name: name(proposerV) })
        : phase === 'attesting' ? t('stakingFlow.status.attesting', { votes: voteCount, total: RING_SIZE })
          : phase === 'rewarded' ? t('stakingFlow.status.rewarded')
            : phase === 'slashed' && slashedV ? t('stakingFlow.status.slashed', { name: name(slashedV) })
              : phase === 'churn' ? t(slashedId !== null ? 'stakingFlow.status.churnSlashed' : 'stakingFlow.status.churn')
                : pristine ? t('stakingFlow.status.idle') : t('stakingFlow.status.paused');
  const statusColor = phase === 'slashed' || conflict ? BAD : phase === 'rewarded' ? OK : phase === 'idle' ? 'var(--muted-foreground)' : phase === 'churn' ? '#627EEA' : PICK;

  const beamColor = cheating && phase !== 'picking' ? BAD : PICK;
  const beamOpacity = phase === 'picking' || phase === 'proposing' ? 1 : phase === 'attesting' || phase === 'rewarded' || phase === 'slashed' ? 0.3 : 0;

  // Every validator on screen, keyed by id, so one that changes place glides there.
  const placed: { v: Validator; pos: Pos; where: 'ring' | 'entry' | 'exit'; k: number }[] = [
    ...world.ring.map((v, k) => ({ v, pos: polar(slotAngle(k), RING_RADIUS), where: 'ring' as const, k })),
    ...world.entry.map((v, k) => ({ v, pos: ENTRY_POS[k], where: 'entry' as const, k })),
    ...world.exit.map((v, k) => ({ v, pos: EXIT_POS[k], where: 'exit' as const, k })),
  ];

  const zoneLabel = 'text-[10px] font-black uppercase tracking-wider whitespace-nowrap';
  const queueLabel = 'absolute -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-wider whitespace-nowrap text-muted-foreground';
  const chip = 'absolute -translate-x-1/2 -translate-y-1/2 z-[6] py-0.5 rounded-full text-white font-mono font-bold shadow-md whitespace-nowrap pointer-events-none';
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

        {/* ── The loop: the validator set around the next block ── */}
        <div className="relative min-h-[380px] lg:min-h-0 rounded-2xl border-2 border-dashed border-border/70 bg-muted/20 overflow-hidden">
          <div className="absolute top-2 left-3 z-[7]">
            <div className={`${zoneLabel} text-[#627EEA]`}>{t('stakingFlow.arenaLabel')}</div>
            <div className="mt-1 flex flex-col gap-0.5 text-[9px] font-semibold text-muted-foreground leading-tight">
              {(['you', 'pool', 'other'] as const).map(kind => (
                <span key={kind} className="flex items-center gap-1">
                  <span className="size-2 rounded-full border" style={{ borderColor: KIND_COLOR[kind], backgroundColor: KIND_COLOR[kind] + (kind === 'you' ? '' : '40') }} />
                  {t(`stakingFlow.legend.${kind}`)}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute top-2 right-3 z-[7] text-right">
            <div className="text-[10px] font-mono text-muted-foreground">{t('stakingFlow.block.every')}</div>
            <div className="text-[9px] text-muted-foreground italic leading-tight mt-0.5 max-w-[150px] ml-auto">{t('stakingFlow.caption')}</div>
          </div>

          <div className="relative h-full aspect-square max-w-full mx-auto">
            {/* the loop itself */}
            <div
              className="absolute rounded-full border-2 border-dashed transition-colors duration-500"
              style={{ inset: `${50 - RING_RADIUS}%`, borderColor: (quiet ? '#627EEA' : statusColor) + (quiet ? '45' : '70') }}
            />

            {/* the random draw: a beam from the centre that spins, slows and lands on one validator */}
            <div
              className="absolute left-1/2 top-1/2 h-[3px] -mt-[1.5px] rounded-full pointer-events-none"
              style={{
                width: `${RING_RADIUS}%`,
                transformOrigin: '0 50%',
                transform: `rotate(${beam}deg)`,
                opacity: beamOpacity,
                background: `linear-gradient(90deg, transparent 18%, ${beamColor})`,
                boxShadow: beamOpacity === 1 ? `0 0 10px ${beamColor}90` : 'none',
                transition: `transform ${SPIN_MS}ms cubic-bezier(0.16, 0.6, 0.12, 1), opacity 500ms ease`,
                willChange: 'transform',
              }}
            />

            {/* centre: the block being decided */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[172px] rounded-xl border-2 bg-card shadow-lg transition-colors duration-300"
              style={{ borderColor: blockColor, borderStyle: phase === 'rewarded' ? 'solid' : 'dashed' }}
            >
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 size-8 rounded-full border-2 bg-card flex items-center justify-center text-base leading-none shadow-md transition-colors duration-300"
                style={{ borderColor: phase === 'picking' ? PICK : 'var(--border)' }}
                title={t('stakingFlow.drawLabel')}
              >
                <motion.span
                  animate={phase === 'picking' && !landed ? { rotate: [0, 360] } : { rotate: 0 }}
                  transition={phase === 'picking' && !landed ? { duration: 0.9, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
                  className="inline-block"
                >🎲</motion.span>
              </div>
              <div className="px-2.5 pt-4 pb-1.5 border-b border-border/70 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-muted-foreground">{t('stakingFlow.block.slot', { n: slot })}</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-right leading-tight" style={{ color: statusColor }}>
                  {t(`stakingFlow.block.status.${conflict ? 'conflict' : phase === 'churn' ? 'idle' : phase}`)}
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
                  <span>{t('stakingFlow.block.votes')} {voteCount}/{RING_SIZE}</span>
                  <span>{t('stakingFlow.block.threshold')}</span>
                </div>
                <div className="relative h-1.5 rounded-full bg-muted/60">
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${votePct}%`, backgroundColor: votePct >= 66.6 ? OK : PICK }} />
                  <div className="absolute -top-0.5 -bottom-0.5 w-0.5 bg-foreground/70" style={{ left: '66.6%' }} />
                </div>
              </div>
            </div>

            {/* entry + exit queues (the validators in them are drawn below, with the rest of the set) */}
            <div className={queueLabel} style={{ left: '8%', top: '94.5%' }}>↑ {t('stakingFlow.queues.entry')}</div>
            <div className={queueLabel} style={{ left: '92%', top: '94.5%' }}>{t('stakingFlow.queues.exit')} ↓</div>

            {/* the validator set: 20 on the ring, a few waiting to join, a few on their way out */}
            <AnimatePresence>
              {placed.map(({ v, pos, where, k }) => {
                const onRing = where === 'ring';
                const out = v.id === slashedId;
                const isProposer = onRing && proposer === k;
                const hasVoted = onRing && votes.includes(k);
                const color = KIND_COLOR[v.kind];
                const border = out || (isProposer && cheating) ? BAD : isProposer ? (phase === 'rewarded' ? OK : PICK) : hasVoted ? OK : color;
                const fill = out ? BAD + '30' : hasVoted || (isProposer && phase === 'rewarded') ? OK + '35' : v.kind === 'you' ? color : color + '40';
                return (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: onRing ? 1 : where === 'entry' ? 0.6 : 0.45 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      zIndex: isProposer ? 6 : 5,
                      transition: 'left 1400ms cubic-bezier(0.4, 0, 0.2, 1), top 1400ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    title={name(v)}
                  >
                    {isProposer && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ border: `2px solid ${cheating ? BAD : PICK}` }}
                        animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <div
                      className="relative size-[30px] rounded-full border-2 bg-card flex items-center justify-center text-[13px] leading-none font-black"
                      style={{
                        borderColor: border,
                        boxShadow: isProposer ? `0 0 0 4px ${(cheating ? BAD : PICK)}40` : undefined,
                        transform: `scale(${isProposer ? 1.3 : onRing ? 1 : 0.62})`,
                        transition: 'transform 500ms ease, border-color 300ms ease, box-shadow 300ms ease',
                      }}
                    >
                      <span className="absolute inset-0 rounded-full transition-colors duration-300" style={{ backgroundColor: fill }} />
                      <span className="relative" style={{ color: OK }}>
                        {out ? '⛔' : v.kind === 'you' ? '🧑' : hasVoted ? '✓' : ''}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* your validator: always labelled, with its balance */}
            {(() => {
              const p = polar(slotAngle(YOU_SLOT), RING_RADIUS - 9.5);
              return (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 z-[6] rounded-md border bg-card px-1.5 py-0.5 text-center leading-tight pointer-events-none" style={{ left: `${p.left}%`, top: `${p.top}%`, borderColor: SOLO_COLOR + '70' }}>
                  <div className="text-[9px] font-black" style={{ color: SOLO_COLOR }}>{t('stakingFlow.validators.you')}</div>
                  <div className="font-mono text-[10px] font-bold tabular-nums text-foreground">{youBalance.toFixed(3)} ETH</div>
                </div>
              );
            })()}

            {/* who was drawn / who was slashed */}
            {proposer !== null && phase !== 'rewarded' && (() => {
              const p = polar(slotAngle(proposer), RING_RADIUS + 7);
              const bad = cheating && phase !== 'picking';
              return (
                <motion.div
                  key={`tag-${slot}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className={`${chip} px-1.5 text-[9px] uppercase tracking-wider`}
                  style={{ left: `${p.left}%`, top: `${p.top}%`, backgroundColor: bad ? BAD : PICK }}
                >
                  {phase === 'slashed' ? t('stakingFlow.badge.ejected') : bad ? t('stakingFlow.badge.double') : landed ? `🎲 ${t('stakingFlow.badge.picked')}` : t('stakingFlow.badge.proposes')}
                </motion.div>
              );
            })()}

            {/* rewards: a big one for the proposer, a small one for every voter */}
            {phase === 'rewarded' && proposer !== null && world.ring.map((v, k) => {
              const p = polar(slotAngle(k), RING_RADIUS + (k === proposer ? 7 : 6));
              return (
                <motion.div
                  key={`reward-${slot}-${v.id}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: k === proposer ? 0 : 0.25 }}
                  className={`${chip} ${k === proposer ? 'px-1.5 text-[10px]' : 'px-1 text-[8px]'}`}
                  style={{ left: `${p.left}%`, top: `${p.top}%`, backgroundColor: OK }}
                >
                  +{(k === proposer ? PROPOSER_REWARD : ATTESTER_REWARD).toFixed(3)}{k === proposer ? ' ETH' : ''}
                </motion.div>
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
        <div className="px-4 py-1.5 rounded-xl border text-xs lg:text-sm font-bold text-center transition-colors duration-300" style={{ color: statusColor, borderColor: phase === 'idle' ? 'var(--border)' : statusColor + '60', backgroundColor: phase === 'idle' ? 'transparent' : statusColor + '14' }}>
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
        <button onClick={armCheat} disabled={cheatArmed || slashedId !== null} className={`${btn} border-[#ef4444]/50 bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/15`}>
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
