import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeftRight, ArrowRight, BadgeCheck, Ban, Banknote, Blocks, Bug, Cable, CandlestickChart, Check,
  CircleHelp, Clock, Coins, Crown, Database, DoorOpen, Droplets, Eraser, Eye, FileCheck, FileWarning,
  Fingerprint, Gavel, HandCoins, Handshake, KeyRound, Landmark, Network, Package, PieChart, Play, Puzzle,
  Repeat, RotateCcw, Scale, ScanSearch, SearchCheck, ServerOff, ShieldAlert, Stamp, Store, ThumbsUp,
  Trash2, TrendingDown, TrendingUp, TriangleAlert, Unlink, UserCheck, Users, Wallet, X, Zap,
  type LucideIcon,
} from 'lucide-react';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { RecapHandoff } from '../../components/shared/RecapHandoff';

// Section 3 — the per-family frame: one-line recap → "why do we even need this?" hook → visual,
// closed by one "where it wins / where it breaks" card. Text lives in smart-contracts/section-3.json;
// this file holds layout + language-neutral data.

const NS = 'smart-contracts/section-3';

const WIN = '#39B54A';
const BREAK = '#ED1C24';
const WARN = '#f59e0b';

// ─── Shared header: optional recap bridge + the "why" hook as the headline ───

export interface RecapBridge {
  /** Where the topic was first taught, shown in the hand-off pill. */
  where: string;
  /** The one-line recap itself. */
  line: string;
  /** Locale-less route of the section that taught it. */
  to: string;
  /** Accent of the course being linked to. */
  color: string;
}

interface HookHeaderProps {
  color: string;
  /** The provocative question — rendered as the slide headline. */
  hook: string;
  /** Optional pill (e.g. "Interactive"). */
  badge?: string;
  /** What the slide is, shown as a quiet label before the subtitle. */
  title?: ReactNode;
  subtitle?: string;
  recap?: RecapBridge;
  size?: 'md' | 'lg';
  className?: string;
  children?: ReactNode;
}

export function HookHeader({ color, hook, badge, title, subtitle, recap, size = 'md', className = 'mb-3', children }: HookHeaderProps) {
  const { t } = useTranslation(NS);
  return (
    <div className={`shrink-0 ${className}`}>
      {recap && (
        <div className="flex items-center gap-2.5 flex-wrap mb-2">
          <RecapHandoff label={t('recapLabel')} text={recap.where} to={recap.to} color={recap.color} />
          <span className="text-xs text-muted-foreground leading-snug flex-1 min-w-[16rem]">{recap.line}</span>
        </div>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        {badge && (
          <span className="px-2.5 py-0.5 rounded-full border text-xs font-bold" style={{ color, borderColor: color + '66', backgroundColor: color + '26' }}>{badge}</span>
        )}
        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest" style={{ color }}>
          <CircleHelp className="size-3.5 shrink-0" />{t('whyLabel')}
        </span>
      </div>
      <h2 className={`${size === 'lg' ? 'text-2xl lg:text-3xl font-black' : 'text-2xl font-bold'} text-foreground mt-1 leading-tight`}>{hook}</h2>
      {(title || subtitle) && (
        <p className="text-muted-foreground text-sm mt-1">
          {title && <><span className="font-semibold text-foreground">{title}</span>{subtitle && <span className="mx-2 text-border" aria-hidden>|</span>}</>}
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

// ─── "Where it wins / where it breaks" — one compact card per family ─────────

export type Family = 'defi' | 'nft' | 'dao' | 'rwa' | 'sc' | 'cert';

interface WBPoint { label: string; desc: string; proof: string }

const WB_META: Record<Family, { emoji: string; accent: string; wins: LucideIcon[]; breaks: LucideIcon[] }> = {
  defi: { emoji: '💸', accent: '#6366f1', wins: [Clock, DoorOpen, Blocks],          breaks: [Bug, TrendingDown, Landmark] },
  nft:  { emoji: '🎮', accent: '#8b5cf6', wins: [BadgeCheck, KeyRound, Puzzle],      breaks: [HandCoins, Unlink, TrendingDown] },
  dao:  { emoji: '🏛️', accent: '#a855f7', wins: [Eye, Coins, Users],                 breaks: [Crown, ShieldAlert, Gavel] },
  rwa:  { emoji: '🏢', accent: '#39B54A', wins: [Zap, PieChart, Repeat],             breaks: [Package, Gavel, Droplets] },
  sc:   { emoji: '🚚', accent: '#f59e0b', wins: [Network, ScanSearch, FileCheck],    breaks: [Trash2, Handshake, Cable] },
  cert: { emoji: '📜', accent: '#22d3ee', wins: [SearchCheck, Fingerprint, UserCheck], breaks: [FileWarning, Eraser, Stamp] },
};

function WBPanel({ color, Icon, label, points, icons, from }: {
  color: string; Icon: LucideIcon; label: string; points: WBPoint[]; icons: LucideIcon[]; from: number;
}) {
  return (
    <div className="flex-1 min-w-0 flex flex-col rounded-2xl border-2 overflow-hidden" style={{ borderColor: color + '55', backgroundColor: color + '0a' }}>
      <div className="shrink-0 flex items-center gap-2.5 px-4 py-2.5" style={{ backgroundColor: color + '1f' }}>
        <div className="size-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: color }}>
          <Icon className="size-4" strokeWidth={2.5} />
        </div>
        <div className="text-sm font-black uppercase tracking-widest" style={{ color }}>{label}</div>
      </div>
      <div className="flex-1 min-h-0 flex flex-col justify-around gap-3 p-4">
        {points.map((p, i) => {
          const PIcon = icons[i] ?? Icon;
          return (
            <motion.div key={p.label}
              initial={{ opacity: 0, x: from }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.1 + i * 0.12 }}
              className="flex items-start gap-3">
              <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '1f' }}>
                <PIcon className="size-5" style={{ color }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="font-bold text-lg text-foreground leading-tight">{p.label}</div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border bg-card shrink-0" style={{ color, borderColor: color + '55' }}>{p.proof}</span>
                </div>
                <div className="text-[15px] text-muted-foreground leading-snug mt-0.5">{p.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function WinsBreaksSlide({ family, keyPoint }: { family: Family; keyPoint: string }) {
  const { t } = useTranslation(NS);
  const m = WB_META[family];
  const wins = t(`winsBreaks.${family}.wins`, { returnObjects: true }) as WBPoint[];
  const breaks = t(`winsBreaks.${family}.breaks`, { returnObjects: true }) as WBPoint[];
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-4 flex items-center gap-3">
        <div className="size-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: m.accent + '1f' }} aria-hidden>{m.emoji}</div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: m.accent }}>{t('winsBreaks.kicker')}</div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
            {t(`winsBreaks.${family}.title`)}: <span style={{ color: WIN }}>{t('winsBreaks.headWins')}</span>
            <span className="text-muted-foreground font-normal"> · </span>
            <span style={{ color: BREAK }}>{t('winsBreaks.headBreaks')}</span>
          </h2>
        </div>
      </div>
      <div className="flex-1 min-h-0 flex items-stretch gap-3 max-h-[28rem] my-auto">
        <WBPanel color={WIN} Icon={ThumbsUp} label={t('winsBreaks.winsLabel')} points={wins} icons={m.wins} from={-12} />
        <div className="shrink-0 w-10 flex flex-col items-center gap-2" aria-hidden>
          <div className="flex-1 w-px bg-border" />
          <div className="size-10 rounded-full border-2 border-border bg-card flex items-center justify-center">
            <Scale className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1 w-px bg-border" />
        </div>
        <WBPanel color={BREAK} Icon={TriangleAlert} label={t('winsBreaks.breaksLabel')} points={breaks} icons={m.breaks} from={12} />
      </div>
      <KeyPointBar text={keyPoint} className="mt-4" />
    </div>
  );
}

// ─── DeFi opener: one payment on two rails + the bank, unbundled ─────────────

const RAIL_STAT_ICONS = [Clock, Banknote, DoorOpen];

function Rail({ color, name, hops, stats, seconds }: { color: string; name: string; hops: string[]; stats: string[]; seconds: number }) {
  const edge = 50 / hops.length; // % from each side to the centre of the first / last hop
  return (
    <div className="rounded-xl border-2 p-3 flex flex-col gap-2.5" style={{ borderColor: color + '50', backgroundColor: color + '0a' }}>
      <div className="text-[11px] font-black uppercase tracking-widest" style={{ color }}>{name}</div>
      <div className="relative">
        <div className="absolute top-[9px] h-0.5 rounded" style={{ left: `${edge}%`, right: `${edge}%`, backgroundColor: color + '55' }} aria-hidden>
          <motion.div className="absolute -top-[3px] size-2 rounded-full" style={{ backgroundColor: color }}
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: seconds, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 }} />
        </div>
        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${hops.length}, minmax(0, 1fr))` }}>
          {hops.map((h, i) => {
            const end = i === 0 || i === hops.length - 1;
            return (
              <div key={h} className="flex flex-col items-center gap-1 min-w-0">
                <div className="size-5 rounded-full border-2 bg-card" style={{ borderColor: color, backgroundColor: end ? color : undefined }} />
                <div className="text-[10px] text-center leading-tight text-foreground/80 px-0.5">{h}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => {
          const SIcon = RAIL_STAT_ICONS[i];
          return (
            <div key={s} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-card border border-border min-w-0">
              <SIcon className="size-3.5 shrink-0" style={{ color }} />
              <span className="font-mono font-bold text-[11px] text-foreground leading-tight">{s}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type DeskId = 'dex' | 'lending' | 'stablecoins' | 'yield' | 'derivatives';
const DESKS: { key: DeskId; color: string; Icon: LucideIcon; next: boolean }[] = [
  { key: 'dex',         color: '#6366f1', Icon: ArrowLeftRight,   next: true },
  { key: 'lending',     color: '#8b5cf6', Icon: HandCoins,        next: false },
  { key: 'stablecoins', color: '#39B54A', Icon: Banknote,         next: true },
  { key: 'yield',       color: '#f59e0b', Icon: TrendingUp,       next: false },
  { key: 'derivatives', color: '#22d3ee', Icon: CandlestickChart, next: false },
];
const DEFI_EXAMPLE_COLORS = ['#6366f1', '#8b5cf6', '#39B54A'];

interface ExampleChip { name: string; tag: string; stat: string; desc: string }

export function DefiWhySlide({ recap }: { recap: RecapBridge }) {
  const { t } = useTranslation(NS);
  const [sel, setSel] = useState<DeskId>('dex');
  const desk = DESKS.find(d => d.key === sel)!;
  const examples = t('defiIntro.examples', { returnObjects: true }) as ExampleChip[];
  const wireHops = t('defiWhy.wire.hops', { returnObjects: true }) as string[];
  const wireStats = t('defiWhy.wire.stats', { returnObjects: true }) as string[];
  const chainHops = t('defiWhy.chain.hops', { returnObjects: true }) as string[];
  const chainStats = t('defiWhy.chain.stats', { returnObjects: true }) as string[];

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <HookHeader color="#6366f1" size="lg" hook={t('family.defi.hook')} recap={recap} className="mb-4" />

      <div className="flex-1 min-h-0 grid grid-cols-[1fr_1.05fr] gap-5">
        {/* Left: the hook, answered in one picture */}
        <div className="flex flex-col gap-2.5 justify-center min-h-0">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('defiWhy.railsLabel')}</div>
          <Rail color={BREAK} name={t('defiWhy.wire.name')} hops={wireHops} stats={wireStats} seconds={7} />
          <Rail color="#6366f1" name={t('defiWhy.chain.name')} hops={chainHops} stats={chainStats} seconds={1.4} />
          <div className="text-[11px] text-muted-foreground leading-snug">
            <span className="font-semibold text-foreground">{t('defiWhy.catchLabel')}</span>{t('defiWhy.catchBody')}
          </div>
        </div>

        {/* Right: the bank, unbundled into contracts */}
        <div className="flex flex-col gap-2 justify-center min-h-0">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('defiWhy.desksLabel')}</div>
          {DESKS.map(d => {
            const active = d.key === sel;
            return (
              <button key={d.key} onClick={() => setSel(d.key)} aria-pressed={active}
                className="w-full grid grid-cols-[1fr_auto_1.2fr] items-center gap-2 px-2.5 py-2 rounded-xl border-2 text-left transition-colors"
                style={{ borderColor: active ? d.color : 'var(--border)', backgroundColor: active ? d.color + '12' : 'var(--card)' }}>
                <span className="flex items-center gap-2 min-w-0">
                  <d.Icon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground leading-tight">{t(`defiWhy.desks.${d.key}.bank`)}</span>
                </span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
                <span className="flex items-center justify-between gap-2 min-w-0">
                  <span className="px-2 py-0.5 rounded font-bold text-xs text-white" style={{ backgroundColor: d.color }}>{t(`defiWhy.desks.${d.key}.name`)}</span>
                  {d.next && <span className="text-[9px] font-black uppercase tracking-widest shrink-0" style={{ color: d.color }}>🧩 {t('defiWhy.nextTag')}</span>}
                </span>
              </button>
            );
          })}
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="p-2.5 rounded-xl border-l-4 text-xs leading-snug" style={{ borderColor: desk.color, backgroundColor: desk.color + '10' }}>
              <span className="text-foreground">{t(`defiWhy.desks.${sel}.desc`)}</span>{' '}
              <span className="font-mono text-[11px] text-muted-foreground">{t(`defiWhy.desks.${sel}.live`)}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* pr-14 keeps the last card clear of the floating slide-nav buttons */}
      <div className="shrink-0 mt-3 pr-14">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">{t('defiIntro.examplesLabel')}</div>
        <div className="grid grid-cols-3 gap-3">
          {examples.map((e, i) => (
            <div key={e.name} className="p-2.5 rounded-xl border bg-card flex flex-col gap-0.5" style={{ borderColor: DEFI_EXAMPLE_COLORS[i] + '40' }}>
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-black text-sm text-foreground">{e.name}</div>
                <div className="font-mono text-[11px] font-bold shrink-0" style={{ color: DEFI_EXAMPLE_COLORS[i] }}>{e.stat}</div>
              </div>
              <div className="text-[10px] font-semibold" style={{ color: DEFI_EXAMPLE_COLORS[i] }}>{e.tag}</div>
              <div className="text-[11px] text-muted-foreground leading-snug">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <KeyPointBar text={t('keyPoints.s3-defi-intro')} className="mt-3" />
    </div>
  );
}

// ─── NFT opener: the same item as a database row vs a token in your wallet ───

type ScenarioId = 'ban' | 'shutdown' | 'resell';
type Verdict = 'ok' | 'warn' | 'bad';
const SCENARIOS: { id: ScenarioId; Icon: LucideIcon; db: Verdict; token: Verdict }[] = [
  { id: 'ban',      Icon: Ban,       db: 'bad', token: 'ok' },
  { id: 'shutdown', Icon: ServerOff, db: 'bad', token: 'warn' },
  { id: 'resell',   Icon: Store,     db: 'bad', token: 'ok' },
];
const VERDICT: Record<Verdict, { color: string; Icon: LucideIcon }> = {
  ok:   { color: WIN,   Icon: Check },
  warn: { color: WARN,  Icon: TriangleAlert },
  bad:  { color: BREAK, Icon: X },
};
const UNLOCK_ICONS: LucideIcon[] = [Store, Repeat, HandCoins, PieChart];

function OwnershipCard({ color, Icon, tag, title, rows, verdict, outcome, struck, scenario }: {
  color: string; Icon: LucideIcon; tag: string; title: string;
  rows: { k: string; v: string }[]; verdict: Verdict; outcome: string; struck: boolean; scenario: ScenarioId;
}) {
  const v = VERDICT[verdict];
  return (
    <div className="flex flex-col rounded-2xl border-2 bg-card overflow-hidden min-h-0" style={{ borderColor: color + '55' }}>
      <div className="shrink-0 flex items-center gap-2.5 px-4 py-2.5" style={{ backgroundColor: color + '14' }}>
        <div className="size-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: color }}><Icon className="size-4" /></div>
        <div className="min-w-0">
          <div className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{tag}</div>
          <div className="font-bold text-sm text-foreground leading-tight">{title}</div>
        </div>
      </div>
      <div className="flex-1 min-h-0 flex flex-col gap-3 p-4 justify-center">
        <div className="rounded-lg border border-border overflow-hidden transition-opacity" style={{ opacity: struck ? 0.45 : 1 }}>
          {rows.map((r, i) => (
            <div key={r.k} className={`grid grid-cols-[9.5rem_1fr] text-sm ${i > 0 ? 'border-t border-border' : ''}`}>
              <div className="px-2.5 py-2 bg-muted font-mono text-[10px] uppercase tracking-wide text-muted-foreground flex items-center">{r.k}</div>
              <div className={`px-2.5 py-2 font-mono text-foreground ${struck ? 'line-through' : ''}`}>{r.v}</div>
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={scenario} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
            className="flex items-start gap-2.5 p-3 rounded-xl border-2" style={{ borderColor: v.color + '70', backgroundColor: v.color + '10' }}>
            <div className="size-7 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: v.color }}>
              <v.Icon className="size-4" strokeWidth={3} />
            </div>
            <div className="text-sm font-semibold text-foreground leading-snug">{outcome}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function NftWhySlide({ recap }: { recap: RecapBridge }) {
  const { t } = useTranslation(NS);
  const [scn, setScn] = useState<ScenarioId>('ban');
  const s = SCENARIOS.find(x => x.id === scn)!;
  const unlocks = t('nftWhy.unlocks', { returnObjects: true }) as { label: string; like: string }[];
  const cols = [t('nftWhy.cols.item'), t('nftWhy.cols.owner'), t('nftWhy.cols.control')];
  const dbRows = [t('nftWhy.item'), t('nftWhy.db.owner'), t('nftWhy.db.control')].map((v, i) => ({ k: cols[i], v }));
  const tokenRows = [`${t('nftWhy.item')} #0421`, t('nftWhy.token.owner'), t('nftWhy.token.control')].map((v, i) => ({ k: cols[i], v }));

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <HookHeader color="#8b5cf6" size="lg" hook={t('family.nft.hook')} recap={recap} className="mb-4" />

      <div className="shrink-0 mb-3 flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mr-1">{t('nftWhy.scenarioLabel')}</span>
        {SCENARIOS.map(x => {
          const active = x.id === scn;
          return (
            <button key={x.id} onClick={() => setScn(x.id)} aria-pressed={active}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-colors"
              style={{ borderColor: active ? '#8b5cf6' : 'var(--border)', backgroundColor: active ? '#8b5cf61f' : 'var(--card)', color: active ? '#8b5cf6' : 'var(--foreground)' }}>
              <x.Icon className="size-3.5" />{t(`nftWhy.scenarios.${x.id}`)}
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 max-h-[21rem] my-auto">
        <OwnershipCard color={BREAK} Icon={Database} tag={t('nftWhy.db.tag')} title={t('nftWhy.db.title')}
          rows={dbRows} verdict={s.db} outcome={t(`nftWhy.db.outcomes.${scn}`)} struck={scn !== 'resell'} scenario={scn} />
        <OwnershipCard color="#8b5cf6" Icon={Wallet} tag={t('nftWhy.token.tag')} title={t('nftWhy.token.title')}
          rows={tokenRows} verdict={s.token} outcome={t(`nftWhy.token.outcomes.${scn}`)} struck={false} scenario={scn} />
      </div>

      <div className="shrink-0 mt-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">{t('nftWhy.unlocksLabel')}</div>
        <div className="grid grid-cols-4 gap-2.5">
          {unlocks.map((u, i) => {
            const UIcon = UNLOCK_ICONS[i];
            return (
              <div key={u.label} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#8b5cf6]/30 bg-card min-w-0">
                <UIcon className="size-4 shrink-0 text-[#8b5cf6]" />
                <div className="min-w-0 leading-tight">
                  <div className="font-bold text-xs text-foreground">{u.label}</div>
                  <div className="text-[11px] text-muted-foreground">{u.like}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <UnderTheHood terms={['ERC-721', 'ERC-1155', 'tokenId', 'tokenURI', 'IPFS']} className="shrink-0 mt-2.5" />
      <KeyPointBar text={t('keyPoints.s3-nft-intro')} className="mt-3" />
    </div>
  );
}

// ─── DAO opener: one payment through a company and through a DAO ─────────────

interface ChainStep { label: string; sub: string }

function DecisionChain({ items, color, label, note, step }: { items: ChainStep[]; color: string; label: string; note: string; step: number }) {
  const running = step >= 0 && step < items.length;
  return (
    <div className="flex-1 flex flex-col rounded-2xl border-2 bg-card p-4 min-h-0" style={{ borderColor: color + '50' }}>
      <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color }}>{label}</div>
      <div className="flex-1 flex flex-col justify-center gap-1">
        {items.map((it, i) => {
          const active = running && i === step;
          const dim = running && i > step;
          return (
            <Fragment key={it.label}>
              <motion.div animate={{ opacity: dim ? 0.35 : 1, scale: active ? 1.03 : 1 }}
                className="w-full px-3 py-2 rounded-lg border-2 text-center"
                style={{ borderColor: active ? color : color + '40', backgroundColor: color + (active || (!running && i === items.length - 1) ? '24' : '0c') }}>
                <div className="font-bold text-sm text-foreground leading-tight">{it.label}</div>
                <div className="text-[10px] text-muted-foreground">{it.sub}</div>
              </motion.div>
              {i < items.length - 1 && <div className="text-lg leading-none text-center" style={{ color, opacity: dim ? 0.35 : 1 }}>↓</div>}
            </Fragment>
          );
        })}
      </div>
      <div className="mt-3 text-[11px] leading-snug rounded-lg px-2 py-1.5 transition-colors"
        style={{ backgroundColor: step >= items.length ? color + '1f' : 'transparent', color: step >= items.length ? 'var(--foreground)' : 'var(--muted-foreground)' }}>
        {note}
      </div>
    </div>
  );
}

export function DaoWhySlide({ recap }: { recap: RecapBridge }) {
  const { t } = useTranslation(NS);
  const trad = t('daoIntro.tradChain', { returnObjects: true }) as ChainStep[];
  const dao = t('daoIntro.daoChain', { returnObjects: true }) as ChainStep[];
  const [step, setStep] = useState(-1); // -1 idle · 0–3 walking the chain · 4 done

  useEffect(() => {
    if (step < 0 || step >= trad.length) return;
    const id = setTimeout(() => setStep(s => s + 1), 950);
    return () => clearTimeout(id);
  }, [step, trad.length]);

  const running = step >= 0 && step < trad.length;

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <HookHeader color="#8b5cf6" size="lg" hook={t('family.dao.hook')} recap={recap} className="mb-4" />

      <div className="flex-1 min-h-0 grid grid-cols-[1fr_1fr_1.25fr] gap-4 max-h-[27rem] my-auto">
        <DecisionChain items={trad} color={BREAK} label={t('daoIntro.tradLabel')} note={t('daoIntro.tradEnforced')} step={step} />
        <DecisionChain items={dao} color="#8b5cf6" label={t('daoIntro.daoLabel')} note={t('daoIntro.daoEnforced')} step={step} />
        <div className="flex flex-col gap-3 min-h-0">
          <button onClick={() => setStep(0)} disabled={running}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8b5cf6] text-white text-sm font-black hover:bg-[#8b5cf6]/90 disabled:opacity-50 transition-colors">
            {step >= trad.length ? <RotateCcw className="size-4" /> : <Play className="size-4" />}
            {step >= trad.length ? t('daoIntro.runAgain') : t('daoIntro.run')}
          </button>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('daoIntro.twoLabel')}</div>
          <div className="flex-1 p-3.5 rounded-xl border bg-card flex flex-col gap-1.5 justify-center" style={{ borderColor: '#6366f140' }}>
            <div className="flex items-center gap-2"><span className="text-xl">🏢</span><div className="font-bold text-sm text-[#6366f1]">{t('daoIntro.mimicTitle')}</div></div>
            <p className="text-xs text-muted-foreground leading-snug">{t('daoIntro.mimicBody')}</p>
          </div>
          <div className="flex-1 p-3.5 rounded-xl border bg-card flex flex-col gap-1.5 justify-center" style={{ borderColor: '#39B54A40' }}>
            <div className="flex items-center gap-2"><span className="text-xl">🧬</span><div className="font-bold text-sm text-[#39B54A]">{t('daoIntro.newTitle')}</div></div>
            <p className="text-xs text-muted-foreground leading-snug">{t('daoIntro.newBody')}</p>
          </div>
          <div className="shrink-0 p-2.5 rounded-xl border border-[#8b5cf6]/30 text-[11px] text-muted-foreground leading-snug" style={{ backgroundColor: '#8b5cf60f' }}>
            <span className="font-bold text-[#8b5cf6]">{t('daoIntro.noteLabel')}</span>{t('daoIntro.noteBody')}
          </div>
        </div>
      </div>
      <UnderTheHood terms={['Governor contract', 'proposal', 'quorum', 'timelock', 'Safe multisig']} className="shrink-0 mt-3" />
      <KeyPointBar text={t('keyPoints.s3-dao-intro')} className="mt-3" />
    </div>
  );
}
