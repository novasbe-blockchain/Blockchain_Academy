import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Lock } from 'lucide-react';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { DefinitionBox } from '../../components/shared/DefinitionBox';
import { PageLabel } from '../../components/shared/PageLabel';

// Section 2 — Oracles block: why · what · how · the oracle problem · two real cases.
// Text lives in smart-contracts/section-2.json under `oracle`; this file holds layout + language-neutral data.

const NS = 'smart-contracts/section-2';

const INDIGO = '#6366f1';
const VIOLET = '#8b5cf6';
const GREEN = '#39B54A';
const AMBER = '#f59e0b';
const RED = '#ED1C24';
const CYAN = '#22d3ee';

function SlideHeader({ kicker, heading, subtitle, aside }: { kicker?: string; heading: string; subtitle: string; aside?: ReactNode }) {
  return (
    <div className="shrink-0 mb-4">
      {aside ? (
        <div className="flex items-center gap-3 flex-wrap">
          {kicker && <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{kicker}</span>}
          {aside}
        </div>
      ) : (
        kicker && <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">{kicker}</span>
      )}
      <h2 className={`text-2xl lg:text-3xl font-bold text-foreground ${aside ? 'mt-1.5' : kicker ? 'mt-1' : ''}`}>{heading}</h2>
      <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
    </div>
  );
}

/** A labelled chip travelling left → right along a lane, on repeat. */
function FlowChip({ label, color, from = '10%', to = '90%' }: { label: string; color: string; from?: string; to?: string }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap shadow-md z-10"
      style={{ backgroundColor: color }}
      initial={{ left: from, opacity: 0 }}
      animate={{ left: to, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5, times: [0, 0.15, 0.8, 1] }}
    >
      {label}
    </motion.div>
  );
}

// ─── A · Why do we even need oracles? ────────────────────────────────────────

const WHY_EMOJI = ['🌧️', '💱', '⚽', '✈️', '🌐'];
const WHY_NODE_COLOR = [AMBER, VIOLET, RED];

export function OracleWhySlide() {
  const { t } = useTranslation(NS);
  const items = t('oracle.why.items', { returnObjects: true }) as string[];
  const nodeAnswers = t('oracle.why.nodes', { returnObjects: true }) as string[];
  const [picked, setPicked] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const [tried, setTried] = useState<number[]>([]);

  const ask = (i: number) => {
    setPicked(i);
    setNonce(n => n + 1);
    setTried(p => (p.includes(i) ? p : [...p, i]));
  };

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader kicker={t('oracle.kicker')} heading={t('oracle.why.heading')} subtitle={t('oracle.why.subtitle')} />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-5 content-center">

        {/* Left: the contract reaches for the real world and hits the wall */}
        <div className="rounded-2xl border border-border bg-card/50 p-4 flex flex-col gap-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('oracle.why.pickHint')}</div>
          <div className="flex items-stretch gap-2 h-64">
            <div className="w-[34%] shrink-0 rounded-xl border-2 border-dashed p-3 flex flex-col justify-center gap-2" style={{ borderColor: INDIGO + '80', backgroundColor: INDIGO + '0d' }}>
              <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: INDIGO }}>⛓️ {t('oracle.onChain')}</div>
              <div className="rounded-lg border-2 bg-card p-2.5" style={{ borderColor: INDIGO }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl leading-none">📜</span>
                  <div className="text-sm font-black text-foreground leading-tight">{t('oracle.why.contract')}</div>
                </div>
                <div className="mt-1.5 font-mono text-[11px] text-muted-foreground leading-snug">{t('oracle.why.rule')}</div>
                <div className="mt-1.5 text-[11px] font-bold" style={{ color: picked === null ? 'var(--muted-foreground)' : RED }}>
                  {picked === null ? t('oracle.why.waiting') : t('oracle.why.noAnswer')}
                </div>
              </div>
            </div>

            {/* Lane + wall */}
            <div className="relative flex-1 min-w-0">
              <div className="absolute left-0 right-7 top-1/2 border-t-2 border-dashed" style={{ borderColor: picked === null ? 'var(--border)' : INDIGO + '80' }} />
              {picked !== null && (
                <motion.div
                  key={nonce}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap shadow-md z-10"
                  initial={{ left: '18%', opacity: 0, backgroundColor: INDIGO }}
                  animate={{ left: ['18%', '62%', '50%', '18%'], opacity: [0, 1, 1, 0], backgroundColor: [INDIGO, INDIGO, RED, RED] }}
                  transition={{ duration: 1.9, times: [0, 0.4, 0.55, 1], ease: 'easeInOut' }}
                >
                  {WHY_EMOJI[picked]} ?
                </motion.div>
              )}
              <motion.div
                key={`wall-${nonce}`}
                className="absolute right-0 inset-y-1 w-7 rounded-md border-2 flex items-center justify-center"
                style={{ borderColor: RED, backgroundImage: `repeating-linear-gradient(45deg, ${RED}33 0 6px, transparent 6px 12px)` }}
                animate={nonce > 0 ? { x: [0, 5, -3, 2, 0] } : undefined}
                transition={{ delay: 0.72, duration: 0.4 }}
              >
                <span className="text-[9px] font-black tracking-widest [writing-mode:vertical-rl] rotate-180" style={{ color: RED }}>{t('oracle.why.wall')}</span>
              </motion.div>
            </div>

            <div className="w-[36%] shrink-0 rounded-xl border border-border bg-card p-3 flex flex-col gap-1.5">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">🌍 {t('oracle.realWorld')}</div>
              {items.map((label, i) => {
                const on = picked === i;
                const wasTried = tried.includes(i);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => ask(i)}
                    className="flex-1 min-h-0 flex items-center gap-2 px-2.5 rounded-lg border-2 text-left transition-colors cursor-pointer"
                    style={{ borderColor: on ? RED : 'var(--border)', backgroundColor: on ? RED + '10' : 'transparent' }}
                  >
                    <span className="text-base leading-none shrink-0">{WHY_EMOJI[i]}</span>
                    <span className="flex-1 min-w-0 text-xs font-semibold text-foreground truncate">{label}</span>
                    {wasTried && <X className="size-3.5 shrink-0 text-[#ED1C24]" strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>
          <div
            className="min-h-[3.25rem] rounded-xl border px-3.5 py-2 flex items-center text-xs leading-snug"
            style={{ borderColor: picked === null ? 'var(--border)' : RED + '50', backgroundColor: picked === null ? 'transparent' : RED + '0d' }}
          >
            {picked === null
              ? <span className="italic text-muted-foreground">{t('oracle.why.idle')}</span>
              : <span className="text-foreground"><span className="font-black" style={{ color: RED }}>🚫 {items[picked]}: </span>{t('oracle.why.blocked')}</span>}
          </div>
        </div>

        {/* Right: why the wall is there on purpose */}
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: AMBER }}>{t('oracle.why.thoughtLabel')}</div>
            <div className="text-base font-black text-foreground mt-0.5">{t('oracle.why.thoughtTitle')}</div>
          </div>
          <div className="flex flex-col gap-1.5">
            {nodeAnswers.map((answer, i) => (
              <motion.div
                key={answer}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.25, duration: 0.25 }}
                className="flex items-center gap-2 text-xs font-mono"
              >
                <span className="px-2 py-1 rounded bg-muted text-muted-foreground whitespace-nowrap">🖥️ {t('oracle.why.node')} {i + 1}</span>
                <span className="text-muted-foreground whitespace-nowrap">→ 🌐 →</span>
                <span className="px-2 py-1 rounded font-black whitespace-nowrap" style={{ backgroundColor: WHY_NODE_COLOR[i] + '22', color: WHY_NODE_COLOR[i] }}>{answer}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold" style={{ backgroundColor: RED + '14', color: RED }}>
            <X className="size-4 shrink-0" strokeWidth={3} />
            {t('oracle.why.noConsensus')}
          </div>
          <p className="text-sm text-muted-foreground leading-snug">{t('oracle.why.thoughtBody')}</p>
          <div className="mt-auto p-3 rounded-xl border text-sm font-semibold text-foreground" style={{ borderColor: INDIGO + '40', backgroundColor: INDIGO + '10' }}>
            {t('oracle.why.bridge')} <span style={{ color: INDIGO }}>{t('oracle.why.bridgeCta')}</span>
          </div>
        </div>

      </div>
      <KeyPointBar text={t('keyPoints.s2-oracle-why')} className="mt-3" />
    </div>
  );
}

// ─── B · What is an oracle? ──────────────────────────────────────────────────

const DELIVERS_EMOJI = ['💱', '🌧️', '⚽', '✈️', '🎲', '🏦'];

export function OracleWhatSlide() {
  const { t } = useTranslation(NS);
  const delivers = t('oracle.what.delivers', { returnObjects: true }) as string[];
  const [on, setOn] = useState(false);
  const color = on ? GREEN : RED;

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader heading={t('oracle.what.heading')} subtitle={t('oracle.what.subtitle')} />

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">

        {/* The bridge */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('oracle.what.toggleLabel')}</div>
            <div className="flex p-0.5 rounded-lg bg-muted">
              {[false, true].map(v => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setOn(v)}
                  className="px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer"
                  style={{ backgroundColor: on === v ? (v ? GREEN : RED) : 'transparent', color: on === v ? 'white' : 'var(--muted-foreground)' }}
                >
                  {v ? t('oracle.what.with') : t('oracle.what.without')}
                </button>
              ))}
            </div>
          </div>

          <div className="h-44 grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.3fr)] items-stretch gap-2">
            {/* Real world */}
            <div className="rounded-xl border border-border bg-muted/40 p-3 flex flex-col justify-between">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">🌍 {t('oracle.offChain')}</div>
              <div className="flex items-center gap-2.5">
                <span className="text-3xl leading-none">🌧️</span>
                <div>
                  <div className="text-2xl font-black text-foreground leading-none">{t('oracle.what.stationValue')}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{t('oracle.what.stationSub')}</div>
                </div>
              </div>
              <div className="text-xs font-bold text-foreground">{t('oracle.what.station')}</div>
            </div>

            {/* Gap or bridge */}
            <div className="relative min-w-0">
              <AnimatePresence mode="wait" initial={false}>
                {on ? (
                  <motion.div key="bridge" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0">
                    <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed" style={{ borderColor: GREEN + 'aa' }} />
                    <FlowChip label={t('oracle.what.packet')} color={GREEN} from="6%" to="94%" />
                    <div className="absolute left-1/2 top-2 -translate-x-1/2 flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl border-2 bg-card" style={{ borderColor: GREEN }}>
                      <span className="text-2xl leading-none">🔮</span>
                      <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: GREEN }}>{t('oracle.what.oracle')}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="gap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                    <div
                      className="w-7 flex-1 rounded-md border-2"
                      style={{ borderColor: RED, backgroundImage: `repeating-linear-gradient(45deg, ${RED}33 0 6px, transparent 6px 12px)` }}
                    />
                    <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: RED }}>{t('oracle.what.gap')}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blockchain */}
            <div className="rounded-xl border-2 border-dashed p-3 flex flex-col justify-between" style={{ borderColor: INDIGO + '80', backgroundColor: INDIGO + '0d' }}>
              <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: INDIGO }}>⛓️ {t('oracle.onChain')}</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none">📜</span>
                <div className="text-sm font-black text-foreground leading-tight">{t('oracle.what.contract')}</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-muted-foreground">{t('oracle.what.slotLabel')}:</span>
                <motion.span
                  key={String(on)}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: on ? 1.4 : 0, duration: 0.3 }}
                  className="px-2 py-0.5 rounded font-mono font-black"
                  style={{ backgroundColor: color + '22', color }}
                >
                  {on ? t('oracle.what.slotFilled') : t('oracle.what.slotEmpty')}
                </motion.span>
              </div>
              <motion.div
                key={`act-${on}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: on ? 1.7 : 0.1, duration: 0.3 }}
                className="flex items-center gap-1.5 text-xs font-bold"
                style={{ color }}
              >
                {on ? <Check className="size-3.5 shrink-0" strokeWidth={3} /> : <X className="size-3.5 shrink-0" strokeWidth={3} />}
                {on ? t('oracle.what.acts') : t('oracle.what.stuck')}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Definition + the subtle part */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DefinitionBox term={t('oracle.what.defTerm')} definition={t('oracle.what.def')} />
          <div className="rounded-xl border p-4" style={{ borderColor: AMBER + '55', backgroundColor: AMBER + '10' }}>
            <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: AMBER }}>💡 {t('oracle.what.nuanceLabel')}</div>
            <p className="text-sm text-foreground leading-snug">{t('oracle.what.nuance')}</p>
          </div>
        </div>

        {/* What oracles deliver */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mr-1">{t('oracle.what.deliversLabel')}</span>
          {delivers.map((d, i) => (
            <span key={d} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-card border border-border text-foreground">{DELIVERS_EMOJI[i]} {d}</span>
          ))}
        </div>

      </div>
      <KeyPointBar text={t('keyPoints.s2-oracle-what')} className="mt-3" />
    </div>
  );
}

// ─── C · How oracles work ────────────────────────────────────────────────────

const HOW_STEP_META = [
  { emoji: '🌐', color: INDIGO },
  { emoji: '✍️', color: VIOLET },
  { emoji: '🧮', color: AMBER },
  { emoji: '📜', color: GREEN },
];
// Numeric twin of oracle.how.reports — only used to find the median.
const HOW_HONEST = [3001, 2999, 3000, 3002, 2998];
const HOW_LIE = 9999;

export function OracleHowSlide() {
  const { t } = useTranslation(NS);
  const steps = t('oracle.how.steps', { returnObjects: true }) as { label: string; desc: string }[];
  const reportText = t('oracle.how.reports', { returnObjects: true }) as string[];
  const [network, setNetwork] = useState(true);
  const [bad, setBad] = useState<boolean[]>([false, false, false, false, false]);

  const count = network ? 5 : 1;
  const ids = Array.from({ length: count }, (_, i) => i);
  const value = (i: number) => (bad[i] ? HOW_LIE : HOW_HONEST[i]);
  // Median reporter: sort the node ids by what they report and take the middle one.
  const medianId = [...ids].sort((a, b) => value(a) - value(b))[Math.floor(count / 2)];
  const liars = ids.filter(i => bad[i]).length;
  const wrong = bad[medianId];
  const text = (i: number) => (bad[i] ? t('oracle.how.lie') : reportText[i]);

  const status = !network
    ? (wrong ? t('oracle.how.status.singleBad') : t('oracle.how.status.singleOk'))
    : liars === 0
      ? t('oracle.how.status.honest')
      : wrong
        ? t('oracle.how.status.captured')
        : t('oracle.how.status.tolerated', { n: liars });
  const statusColor = wrong ? RED : liars > 0 ? AMBER : GREEN;

  const setMode = (v: boolean) => { setNetwork(v); setBad([false, false, false, false, false]); };
  const toggle = (i: number) => setBad(b => b.map((x, k) => (k === i ? !x : x)));

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader heading={t('oracle.how.heading')} subtitle={t('oracle.how.subtitle')} />

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-4">

        {/* The four-step pipeline */}
        <div className="relative">
          <div className="absolute inset-x-[12%] top-6 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${INDIGO}, ${VIOLET}, ${AMBER}, ${GREEN})`, opacity: 0.35 }} />
          <motion.span
            className="absolute top-6 -translate-y-[calc(50%-2px)] -translate-x-1/2 size-3 rounded-full shadow-lg z-10"
            animate={{ left: ['12%', '88%'], backgroundColor: [INDIGO, VIOLET, AMBER, GREEN] }}
            transition={{ duration: 3.6, ease: 'linear', repeat: Infinity, repeatDelay: 0.6 }}
          />
          <div className="relative grid grid-cols-4 gap-3">
            {steps.map((s, i) => {
              const m = HOW_STEP_META[i];
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-20 size-12 rounded-full border-2 bg-card flex items-center justify-center text-2xl" style={{ borderColor: m.color, boxShadow: `0 0 0 4px ${m.color}1f` }}>{m.emoji}</div>
                  <div className="mt-2 w-full flex-1 px-3 py-2.5 rounded-xl border-2" style={{ borderColor: m.color + '50', backgroundColor: m.color + '0d' }}>
                    <div className="font-black text-sm text-foreground"><span style={{ color: m.color }}>{i + 1}.</span> {s.label}</div>
                    <p className="text-xs text-muted-foreground leading-snug mt-1">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lab: corrupt a node, watch the median */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: AMBER }}>{t('oracle.how.labLabel')}</div>
              <div className="text-sm font-bold text-foreground mt-0.5">{t('oracle.how.labPrompt')}</div>
            </div>
            <div className="shrink-0 flex p-0.5 rounded-lg bg-muted">
              {[false, true].map(v => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setMode(v)}
                  className="px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: network === v ? INDIGO : 'transparent', color: network === v ? 'white' : 'var(--muted-foreground)' }}
                >
                  {v ? t('oracle.how.modeNetwork') : t('oracle.how.modeSingle')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1.6fr)_auto_minmax(0,1fr)] items-center gap-3">
            <div className="flex justify-center gap-2">
              {ids.map(i => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => toggle(i)}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 max-w-[7.5rem] rounded-xl border-2 px-2 py-2 flex flex-col items-center gap-0.5 cursor-pointer transition-colors"
                  style={{
                    borderColor: bad[i] ? RED : medianId === i ? GREEN : 'var(--border)',
                    backgroundColor: bad[i] ? RED + '14' : 'var(--card)',
                    boxShadow: medianId === i && count > 1 ? `0 0 0 3px ${(bad[i] ? RED : GREEN)}33` : undefined,
                  }}
                >
                  <span className="text-xl leading-none">{bad[i] ? '😈' : '🖥️'}</span>
                  <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">{t('oracle.how.node')} {i + 1}</span>
                  <span className="font-mono text-xs font-black" style={{ color: bad[i] ? RED : 'var(--foreground)' }}>{text(i)}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col items-center text-muted-foreground">
              <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">{count > 1 ? t('oracle.how.median') : t('oracle.how.onlyReport')}</span>
              <span className="text-xl leading-none">→</span>
            </div>

            <div className="rounded-xl border-2 p-3 text-center transition-colors" style={{ borderColor: wrong ? RED : GREEN, backgroundColor: (wrong ? RED : GREEN) + '10' }}>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">📦 {t('oracle.how.feedLabel')}</div>
              <motion.div key={text(medianId)} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-black font-mono leading-tight" style={{ color: wrong ? RED : GREEN }}>
                {text(medianId)}
              </motion.div>
              <div className="text-[11px] text-muted-foreground">📜 {t('oracle.how.contractReads')}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold" style={{ backgroundColor: statusColor + '14', color: statusColor }}>
            {wrong ? <X className="size-4 shrink-0" strokeWidth={3} /> : <Check className="size-4 shrink-0" strokeWidth={3} />}
            {status}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground leading-snug"><span className="font-semibold text-foreground">Chainlink: </span>{t('oracle.how.note')}</p>
          <UnderTheHood items={t('oracle.how.hood', { returnObjects: true }) as string[]} />
        </div>

      </div>
      <KeyPointBar text={t('keyPoints.s2-oracle-how')} className="mt-3" />
    </div>
  );
}

// ─── D · The oracle problem ──────────────────────────────────────────────────

// Which link of source → oracle → contract each failure breaks.
const RISK_META = [
  { emoji: '🔌', color: RED,    breaks: 'oracle' },
  { emoji: '🕒', color: AMBER,  breaks: 'feed' },
  { emoji: '🎭', color: VIOLET, breaks: 'source' },
] as const;

interface RiskText { title: string; tagline: string; tag: string; desc: string; effect: string; defense: string }

function ChainLink({ emoji, label, guard, color, broken, tag, locked = false }: { emoji: string; label: string; guard: string; color: string; broken: boolean; tag?: string; locked?: boolean }) {
  return (
    <motion.div
      className="relative rounded-xl border-2 bg-card px-2 py-3 flex flex-col items-center gap-1 text-center"
      initial={false}
      animate={{ borderColor: broken ? color : locked ? GREEN : '#94a3b8', boxShadow: broken ? `0 0 0 5px ${color}22` : '0 0 0 0px rgba(0,0,0,0)' }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-3xl leading-none">{emoji}</span>
      <span className="text-sm font-black text-foreground leading-tight">{label}</span>
      <span className="flex items-center gap-1 text-[10px] font-semibold leading-tight" style={{ color: locked ? GREEN : 'var(--muted-foreground)' }}>
        {locked && <Lock className="size-3 shrink-0" />}
        {guard}
      </span>
      {broken && tag && (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-2.5 right-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white whitespace-nowrap"
          style={{ backgroundColor: color }}
        >
          {tag}
        </motion.span>
      )}
    </motion.div>
  );
}

/** Connector between two links: a moving dot (data flowing), a frozen clock (stale) or a cut line (nothing arrives). */
function ChainWire({ state, color, tag }: { state: 'flow' | 'stale' | 'cut'; color: string; tag?: string }) {
  return (
    <div className="relative h-full min-w-0">
      <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed" style={{ borderColor: state === 'cut' ? 'var(--border)' : color + 'aa' }} />
      {state === 'flow' && (
        <motion.span
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3 rounded-full z-10"
          style={{ backgroundColor: color }}
          animate={{ left: ['8%', '92%'] }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.3, ease: 'easeInOut' }}
        />
      )}
      {state === 'stale' && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 z-10">
          <span className="text-xl leading-none">🕒</span>
          {tag && <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full text-white whitespace-nowrap" style={{ backgroundColor: color }}>{tag}</span>}
        </span>
      )}
      {state === 'cut' && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-6 rounded-full bg-card border-2 flex items-center justify-center z-10" style={{ borderColor: color }}>
          <X className="size-3.5" style={{ color }} strokeWidth={3} />
        </span>
      )}
    </div>
  );
}

export function OracleRisksSlide() {
  const { t } = useTranslation(NS);
  const risks = t('oracle.risks.items', { returnObjects: true }) as RiskText[];
  const [risk, setRisk] = useState(0);
  const m = RISK_META[risk];
  const r = risks[risk];

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader heading={t('oracle.risks.heading')} subtitle={t('oracle.risks.subtitle')} />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-5 content-center">

        {/* Left: pick a failure */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('oracle.risks.pickHint')}</div>
          {risks.map((x, i) => {
            const on = risk === i;
            const c = RISK_META[i].color;
            return (
              <button
                key={x.title}
                type="button"
                onClick={() => setRisk(i)}
                className="p-3.5 rounded-xl border-2 text-left flex items-center gap-3 transition-colors cursor-pointer"
                style={{ borderColor: on ? c : c + '30', backgroundColor: on ? c + '12' : 'var(--card)' }}
              >
                <div className="size-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: c + '18' }}>{RISK_META[i].emoji}</div>
                <div className="min-w-0">
                  <div className="font-black text-sm text-foreground leading-tight">{x.title}</div>
                  <div className="text-xs font-semibold leading-tight mt-0.5" style={{ color: c }}>{x.tagline}</div>
                </div>
              </button>
            );
          })}
          <div className="p-3.5 rounded-xl border bg-gradient-to-r from-[#6366f1]/15 to-[#8b5cf6]/10 border-[#6366f1]/40">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#6366f1] mb-1">⚖️ {t('oracle.risks.paradoxLabel')}</div>
            <p className="text-sm text-foreground leading-snug">{t('oracle.risks.paradox')}</p>
          </div>
        </div>

        {/* Right: the chain of trust, with the broken link lit */}
        <div className="rounded-2xl border border-border bg-card/50 p-4 flex flex-col gap-3">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.45fr)_minmax(0,1fr)_minmax(0,0.45fr)_minmax(0,1.1fr)] items-stretch pt-2">
            <ChainLink emoji="🌍" label={t('oracle.risks.links.source.label')} guard={t('oracle.risks.links.source.guard')} color={m.color} broken={m.breaks === 'source'} tag={r.tag} />
            <ChainWire state="flow" color={m.breaks === 'source' ? m.color : GREEN} />
            <ChainLink emoji="🔮" label={t('oracle.risks.links.oracle.label')} guard={t('oracle.risks.links.oracle.guard')} color={m.color} broken={m.breaks === 'oracle'} tag={r.tag} />
            <ChainWire
              state={m.breaks === 'oracle' ? 'cut' : m.breaks === 'feed' ? 'stale' : 'flow'}
              color={m.color}
              tag={r.tag}
            />
            <ChainLink emoji="📜" label={t('oracle.risks.links.contract.label')} guard={t('oracle.risks.links.contract.guard')} color={m.color} broken={false} locked />
          </div>

          <motion.div
            key={risk}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-h-0 rounded-xl border-2 p-4 flex flex-col gap-3"
            style={{ borderColor: m.color + '60', backgroundColor: m.color + '0a' }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl leading-none">{m.emoji}</span>
              <h3 className="text-lg font-black text-foreground">{r.title}</h3>
            </div>
            <p className="text-sm text-foreground leading-snug">{r.desc}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 mt-auto">
              <div className="rounded-lg border bg-card p-2.5" style={{ borderColor: m.color + '40' }}>
                <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: m.color }}>📜 {t('oracle.risks.effectLabel')}</div>
                <p className="text-xs text-foreground leading-snug mt-1">{r.effect}</p>
              </div>
              <div className="rounded-lg border bg-card p-2.5" style={{ borderColor: GREEN + '40' }}>
                <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: GREEN }}>🛡️ {t('oracle.risks.defenseLabel')}</div>
                <p className="text-xs text-foreground leading-snug mt-1">{r.defense}</p>
              </div>
            </div>
          </motion.div>
          <p className="text-xs text-muted-foreground italic">{t('oracle.risks.next')}</p>
        </div>

      </div>
      <KeyPointBar text={t('keyPoints.s2-oracle-risks')} className="mt-3" />
    </div>
  );
}

// ─── E · Real case 1: one thermometer decides a market ───────────────────────

// Illustrative curve shapes. y = 130 − (°C − 16) / 7 × 110, so 18°C ≈ 99 and 22°C ≈ 36.
const PARIS_NEARBY = '20,97 80,96 140,98 185,100 222,103 250,106 310,112';
const PARIS_SENSOR = '20,97 80,96 140,98 185,100 196,36 210,38 222,103 250,106 310,112';
const PARIS_FACT_EMOJI = ['📜', '📈', '💰', '🚔'];

export function OracleParisSlide() {
  const { t } = useTranslation(NS);
  const facts = t('oracle.paris.facts', { returnObjects: true }) as { label: string; text: string }[];
  const [sensor, setSensor] = useState(true);
  const color = sensor ? RED : GREEN;

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader kicker={t('oracle.paris.kicker')} heading={t('oracle.paris.heading')} subtitle={t('oracle.paris.subtitle')} aside={<PageLabel kind="optional" />} />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5 content-center">

        {/* Left: same evening, two sources, two outcomes */}
        <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('oracle.paris.chartLabel')}</div>
            <div className="flex p-0.5 rounded-lg bg-muted">
              {[true, false].map(v => (
                <button
                  key={String(v)}
                  type="button"
                  onClick={() => setSensor(v)}
                  className="px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: sensor === v ? (v ? RED : GREEN) : 'transparent', color: sensor === v ? 'white' : 'var(--muted-foreground)' }}
                >
                  {v ? t('oracle.paris.sourceSensor') : t('oracle.paris.sourceNearby')}
                </button>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 345 150" className="w-full flex-1 min-h-[12rem] text-muted-foreground" role="img" aria-label={t('oracle.paris.chartLabel')}>
            {/* gridlines at 18°C and 22°C */}
            {[{ y: 99, label: '18°C' }, { y: 36, label: '22°C' }].map(g => (
              <g key={g.label}>
                <line x1="20" x2="310" y1={g.y} y2={g.y} stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.5" />
                <text x="314" y={g.y + 3} fontSize="8" fontWeight="700" fill="currentColor">{g.label}</text>
              </g>
            ))}
            <line x1="20" x2="310" y1="132" y2="132" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <text x="20" y="144" fontSize="8" fill="currentColor">{t('oracle.paris.chart.afternoon')}</text>
            <text x="310" y="144" fontSize="8" textAnchor="end" fill="currentColor">{t('oracle.paris.chart.evening')}</text>

            {/* nearby stations */}
            <polyline points={PARIS_NEARBY} fill="none" stroke={GREEN} strokeWidth={sensor ? 1.5 : 3} strokeLinejoin="round" strokeLinecap="round" opacity={sensor ? 0.55 : 1} />
            {/* the named sensor */}
            <polyline points={PARIS_SENSOR} fill="none" stroke={RED} strokeWidth={sensor ? 3 : 1.5} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={sensor ? undefined : '4 3'} opacity={sensor ? 1 : 0.55} />

            <text x="24" y="86" fontSize="8" fontWeight="700" fill={GREEN}>{t('oracle.paris.chart.nearbyLine')}</text>
            <text x="188" y="26" fontSize="8" fontWeight="700" textAnchor="end" fill={RED}>{t('oracle.paris.chart.sensorLine')}</text>

            {/* the daily high the market would settle on */}
            <motion.circle
              r="5"
              fill={color}
              stroke="white"
              strokeWidth="1.5"
              initial={false}
              animate={{ cx: sensor ? 196 : 80, cy: sensor ? 36 : 96 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            />
            <motion.text
              fontSize="8"
              fontWeight="800"
              fill={color}
              initial={false}
              animate={{ x: sensor ? 204 : 88, y: sensor ? 30 : 112 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              {t('oracle.paris.chart.high')}
            </motion.text>
          </svg>

          <motion.div
            key={String(sensor)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold"
            style={{ backgroundColor: color + '14', color }}
          >
            <span className="text-lg leading-none">{sensor ? '🎯' : '🌡️'}</span>
            {sensor ? t('oracle.paris.outcomeSensor') : t('oracle.paris.outcomeNearby')}
          </motion.div>
          <p className="text-[11px] text-muted-foreground italic leading-snug">{t('oracle.paris.chartNote')}</p>
          <UnderTheHood items={t('oracle.paris.hood', { returnObjects: true }) as string[]} />
        </div>

        {/* Right: what happened, and what it teaches */}
        <div className="flex flex-col justify-center gap-2">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.25 }}
              className="flex items-start gap-3 px-3 py-2.5 rounded-xl border border-border bg-card"
            >
              <span className="text-xl leading-none shrink-0 mt-0.5">{PARIS_FACT_EMOJI[i]}</span>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#6366f1]">{f.label}</div>
                <p className="text-xs text-foreground leading-snug mt-0.5">{f.text}</p>
              </div>
            </motion.div>
          ))}
          <p className="text-[11px] text-muted-foreground leading-snug">
            <span className="font-bold" style={{ color: AMBER }}>⚠ </span>{t('oracle.paris.status')} <span className="italic">{t('oracle.paris.sources')}</span>
          </p>
          <div className="px-3.5 py-3 rounded-xl border bg-gradient-to-r from-[#6366f1]/15 to-[#8b5cf6]/10 border-[#6366f1]/40">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#6366f1] mb-1">🎓 {t('oracle.paris.lessonLabel')}</div>
            <p className="text-sm text-foreground leading-snug">{t('oracle.paris.lesson')}</p>
          </div>
        </div>

      </div>
      <KeyPointBar text={t('keyPoints.s2-oracle-paris')} className="mt-3" />
    </div>
  );
}

// ─── F · Real case 2: price-feed manipulation, step by step ──────────────────

// One row per step. Money in $M, TOKEN in millions. Pool follows x·y = k: 2M TOKEN + $2M, then 1M TOKEN + $4M after the buy.
interface AttackState { price: number; poolToken: number; poolUsd: number; vault: number; collateral: number | null; loan: number | null; cash: number; tokens: number; owed: boolean }
const ATTACK_COMMON: AttackState[] = [
  { price: 1, poolToken: 2, poolUsd: 2, vault: 50, collateral: null, loan: null, cash: 0, tokens: 0, owed: false },
  { price: 1, poolToken: 2, poolUsd: 2, vault: 50, collateral: null, loan: null, cash: 2, tokens: 0, owed: true },
  { price: 4, poolToken: 1, poolUsd: 4, vault: 50, collateral: null, loan: null, cash: 0, tokens: 1, owed: true },
];
// Market B trusts Market A's live price.
const ATTACK_SPOT: AttackState[] = [
  ...ATTACK_COMMON,
  { price: 4, poolToken: 1, poolUsd: 4, vault: 50, collateral: 4, loan: null, cash: 0, tokens: 0, owed: true },
  { price: 4, poolToken: 1, poolUsd: 4, vault: 47, collateral: 4, loan: 3,    cash: 3, tokens: 0, owed: true },
  { price: 1, poolToken: 2, poolUsd: 2, vault: 47, collateral: 1, loan: 3,    cash: 1, tokens: 0, owed: false },
];
// Market B trusts an aggregated, time-averaged feed: the attack cannot repay its flash loan and reverts.
const ATTACK_SAFE: AttackState[] = [
  ...ATTACK_COMMON,
  { price: 4, poolToken: 1, poolUsd: 4, vault: 50,    collateral: 1, loan: null, cash: 0,    tokens: 0, owed: true },
  { price: 4, poolToken: 1, poolUsd: 4, vault: 49.25, collateral: 1, loan: 0.75, cash: 0.75, tokens: 0, owed: true },
  { price: 1, poolToken: 2, poolUsd: 2, vault: 50,    collateral: null, loan: null, cash: 0, tokens: 0, owed: false },
];
const ATTACK_STEP_META = [
  { emoji: '🧩', color: INDIGO },
  { emoji: '⚡', color: VIOLET },
  { emoji: '📈', color: AMBER },
  { emoji: '🤝', color: RED },
  { emoji: '🏧', color: RED },
  { emoji: '🏃', color: CYAN },
];

function AttackStat({ label, value, color, pulseKey }: { label: string; value: string; color?: string; pulseKey: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground truncate">{label}</div>
      <motion.div
        key={pulseKey}
        initial={{ scale: 1.25 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.45 }}
        className="text-lg font-black leading-tight origin-left whitespace-nowrap"
        style={{ color: color ?? 'var(--foreground)' }}
      >
        {value}
      </motion.div>
    </div>
  );
}

export function OracleAttackSlide() {
  const { t } = useTranslation(NS);
  const steps = t('oracle.attack.steps', { returnObjects: true }) as { label: string; what: string }[];
  const safeSteps = t('oracle.attack.safeSteps', { returnObjects: true }) as string[];
  const [step, setStep] = useState(0);
  const [safe, setSafe] = useState(false);

  const last = steps.length - 1;
  const s = (safe ? ATTACK_SAFE : ATTACK_SPOT)[step];
  const meta = ATTACK_STEP_META[step];
  const isLast = step === last;
  const what = safe && step >= 3 ? safeSteps[step - 3] : steps[step].what;

  const num = (v: number, digits = 0) => v.toFixed(digits).replace('.', t('oracle.attack.decimal'));
  const usd = (v: number) => t('oracle.attack.usd', { v: num(v, 2) });
  const usdM = (v: number) => (v === 0 ? t('oracle.attack.usd', { v: '0' }) : t('oracle.attack.usdM', { v: num(v, Number.isInteger(v) ? 0 : 2) }));
  const tokM = (v: number) => t('oracle.attack.tokM', { v: num(v) });

  // What Market B believes TOKEN is worth, and whether that belief is the manipulated number.
  const feedPrice = safe ? 1 : s.price;
  const fooled = !safe && step >= 3 && step <= 4;
  const feedColor = fooled ? RED : step >= 3 ? GREEN : '#94a3b8';
  const reverted = safe && isLast;
  const badDebt = !safe && isLast;
  const stepColor = safe && step >= 3 ? GREEN : meta.color;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader kicker={t('oracle.attack.kicker')} heading={t('oracle.attack.heading')} subtitle={t('oracle.attack.subtitle')} aside={<PageLabel kind="optional" />} />

      {/* Step pills */}
      <div className="shrink-0 flex items-center gap-1.5 mb-3">
        {steps.map((st, i) => {
          const on = i === step;
          const c = ATTACK_STEP_META[i].color;
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
              <span>{ATTACK_STEP_META[i].emoji}</span>
              <span className="hidden lg:inline">{i + 1}. {st.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-3">

        {/* Scene: Market A → price feed → Market B */}
        <div className="shrink-0 grid grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)_minmax(0,1.15fr)] items-stretch rounded-2xl border border-border bg-card/50 p-3">
          {/* Market A */}
          <motion.div
            className="rounded-xl border-2 bg-card p-3 flex flex-col gap-2"
            initial={false}
            animate={{ borderColor: step === 2 ? AMBER : '#94a3b8', boxShadow: step === 2 ? `0 0 0 5px ${AMBER}22` : '0 0 0 0px rgba(0,0,0,0)' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl leading-none">🏊</span>
              <div className="min-w-0">
                <div className="text-sm font-black text-foreground leading-tight">{t('oracle.attack.marketA')}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{t('oracle.attack.marketASub')}</div>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('oracle.attack.spot')}</div>
                <motion.div
                  key={s.price}
                  initial={{ scale: 1.35 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-black leading-none origin-left"
                  style={{ color: s.price > 1 ? RED : 'var(--foreground)' }}
                >
                  {usd(s.price)}
                </motion.div>
              </div>
              <div className="text-right text-[10px] font-mono text-muted-foreground leading-snug">
                <div>{tokM(s.poolToken)}</div>
                <div>{usdM(s.poolUsd)} USDC</div>
              </div>
            </div>
            {/* pool balance bar: the TOKEN side shrinks as the attacker buys it up */}
            <div className="h-2 rounded-full overflow-hidden flex bg-muted">
              <motion.div className="h-full" style={{ backgroundColor: VIOLET }} initial={false} animate={{ width: `${(s.poolToken / (s.poolToken + s.poolUsd)) * 100}%` }} transition={{ duration: 0.5 }} />
              <div className="h-full flex-1" style={{ backgroundColor: GREEN + '99' }} />
            </div>
            <div className="text-[10px] font-semibold" style={{ color: AMBER }}>⚠ {t('oracle.attack.thin')}</div>
          </motion.div>

          {/* Price feed */}
          <div className="relative min-w-0 flex flex-col items-center justify-between py-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">🔮 {t('oracle.attack.feed')}</div>
            <div className="relative w-full flex-1">
              <div className="absolute inset-x-1 top-1/2 border-t-2 border-dashed transition-colors" style={{ borderColor: feedColor + 'aa' }} />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm leading-none" style={{ color: feedColor }}>▶</span>
              {step >= 3 && !reverted && <FlowChip key={`${safe}-${step}`} label={usd(feedPrice)} color={feedColor} from="14%" to="84%" />}
            </div>
            <div className="text-[10px] font-semibold text-center leading-tight px-1" style={{ color: safe ? GREEN : 'var(--muted-foreground)' }}>
              {safe ? t('oracle.attack.feedSafe') : t('oracle.attack.feedSpot')}
            </div>
          </div>

          {/* Market B */}
          <motion.div
            className="rounded-xl border-2 bg-card p-3 flex flex-col gap-2"
            initial={false}
            animate={{
              borderColor: fooled || badDebt ? RED : safe && step >= 3 ? GREEN : '#94a3b8',
              boxShadow: step >= 3 ? `0 0 0 5px ${(fooled || badDebt ? RED : safe ? GREEN : '#94a3b8')}22` : '0 0 0 0px rgba(0,0,0,0)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl leading-none">🏦</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black text-foreground leading-tight">{t('oracle.attack.marketB')}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{t('oracle.attack.marketBSub')}</div>
              </div>
              {isLast && (
                <motion.span
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="shrink-0 self-start text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white whitespace-nowrap"
                  style={{ backgroundColor: badDebt ? RED : GREEN }}
                >
                  {badDebt ? t('oracle.attack.result.badDebt') : t('oracle.attack.result.safe')}
                </motion.span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <AttackStat label={t('oracle.attack.vault')} value={usdM(s.vault)} pulseKey={`v-${s.vault}`} color={s.vault < 50 ? RED : undefined} />
              <AttackStat
                label={t('oracle.attack.collateral')}
                value={s.collateral === null ? '–' : usdM(s.collateral)}
                pulseKey={`c-${s.collateral}`}
                color={s.collateral === null ? 'var(--muted-foreground)' : fooled ? RED : undefined}
              />
              <AttackStat label={t('oracle.attack.loan')} value={s.loan === null ? '–' : usdM(s.loan)} pulseKey={`l-${s.loan}`} color={s.loan === null ? 'var(--muted-foreground)' : undefined} />
            </div>
            <div className="text-[10px] font-semibold min-h-[1.1rem]" style={{ color: fooled || badDebt ? RED : GREEN }}>
              {fooled && t('oracle.attack.paper')}
              {badDebt && t('oracle.attack.hole')}
              {safe && step >= 3 && !isLast && t('oracle.attack.fair')}
            </div>
          </motion.div>
        </div>

        {/* Attacker */}
        <div className="shrink-0 flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-2">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl leading-none">🕵️</span>
            <span className="text-sm font-black text-foreground">{t('oracle.attack.attacker')}</span>
          </div>
          <AttackStat label={t('oracle.attack.cash')} value={usdM(s.cash)} pulseKey={`cash-${s.cash}`} />
          <AttackStat label="TOKEN" value={s.tokens ? tokM(s.tokens) : '–'} pulseKey={`tok-${s.tokens}`} color={s.tokens ? VIOLET : 'var(--muted-foreground)'} />
          <AttackStat label={t('oracle.attack.owes')} value={s.owed ? usdM(2) : '–'} pulseKey={`owe-${s.owed}`} color={s.owed ? AMBER : 'var(--muted-foreground)'} />
          {isLast && (
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="ml-auto text-xs font-black px-3 py-1 rounded-full text-white whitespace-nowrap"
              style={{ backgroundColor: reverted ? GREEN : RED }}
            >
              {reverted ? t('oracle.attack.result.reverted') : t('oracle.attack.result.profit')}
            </motion.span>
          )}
        </div>

        {/* Narration + the one design choice that decides everything */}
        <motion.div
          key={`${step}-${safe}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="flex-1 min-h-0 rounded-2xl border-2 p-4 flex flex-col gap-3"
          style={{ borderColor: stepColor + '60', backgroundColor: stepColor + '0a' }}
        >
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-3xl leading-none">{meta.emoji}</span>
                <h3 className="text-lg font-black text-foreground">{step + 1}. {steps[step].label}</h3>
              </div>
              <p className="text-sm text-foreground leading-snug">{what}</p>
            </div>
            <div className="min-w-0 flex flex-col gap-2.5">
            <div className="rounded-xl border border-border bg-card p-3">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{t('oracle.attack.toggleLabel')}</div>
              <div className="flex gap-1.5">
                {[false, true].map(v => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => setSafe(v)}
                    className="flex-1 px-2 py-1.5 rounded-lg border-2 text-xs font-bold transition-colors cursor-pointer leading-tight"
                    style={{
                      borderColor: safe === v ? (v ? GREEN : RED) : 'var(--border)',
                      backgroundColor: safe === v ? (v ? GREEN : RED) + '14' : 'transparent',
                      color: safe === v ? (v ? GREEN : RED) : 'var(--muted-foreground)',
                    }}
                  >
                    {v ? `🔗 ${t('oracle.attack.toggleSafe')}` : `🏊 ${t('oracle.attack.toggleSpot')}`}
                  </button>
                ))}
              </div>
            </div>
            <UnderTheHood items={t('oracle.attack.hood', { returnObjects: true }) as string[]} />
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              className="shrink-0 whitespace-nowrap px-3 py-2 rounded-xl text-sm font-bold border border-border bg-card text-muted-foreground disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              {t('oracle.attack.back')}
            </button>
            <button
              type="button"
              onClick={() => setStep(isLast ? 0 : step + 1)}
              className="shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer transition-colors"
              style={{ backgroundColor: stepColor }}
            >
              {isLast ? t('oracle.attack.restart') : t('oracle.attack.next')}
            </button>
            <p className="flex-1 min-w-[14rem] lg:pr-16 text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold text-foreground">{t('oracle.attack.realLabel')} </span>{t('oracle.attack.real')} <span className="italic">{t('oracle.attack.footnote')}</span>
            </p>
          </div>
        </motion.div>
      </div>

      <KeyPointBar text={t('keyPoints.s2-oracle-attack')} className="mt-3" />
    </div>
  );
}
