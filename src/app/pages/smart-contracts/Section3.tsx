import { useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { GroupedQuiz } from '../../components/templates/GroupedQuiz';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import {
  Building2, Check, GraduationCap, Minus, ShieldAlert, ShieldCheck, UserX, X, type LucideIcon,
} from 'lucide-react';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { ClassDiscussion } from '../../components/shared/ClassDiscussion';
import { sha256Hex } from '../../utils/sha256';
import {
  NftUtilitySlide, TokenGateDemo, NftHonestSlide,
  GovernanceBlocksExplorer, VotingPowerSim, DaoExamplesSlide,
  TradeLensCase,
} from './Section3Extras';
import {
  HookHeader, WinsBreaksSlide, FamilyDivider, DefiWhySlide, DefiProductionSlide, NftWhySlide, DaoWhySlide,
  type RecapBridge,
} from './Section3Family';

import imgRwaProcess     from '../../../assets/sc/rwa-process.png';
import imgSupplyProv     from '../../../assets/sc/supply-provenance.png';
import imgCertDecent     from '../../../assets/sc/cert-decentralization.png';
import { PageLabelRow, type PageLabelKind } from '../../components/shared/PageLabel';

// Language-neutral shape — IDs + kind only. Labels resolved via t() at render time.
const chapterShape = [
  { id: 's3-discussion' },
  { id: 's3-industries-intro' },

  { kind: 'group' as const, id: 'g-defi' },
  { id: 's3-defi-title' },
  { id: 's3-defi-intro' },
  { id: 's3-defi-real' },
  { id: 's3-defi-amm' },
  { id: 's3-defi-stablecoins' },
  { id: 's3-defi-prosCons' },

  { kind: 'group' as const, id: 'g-nft' },
  { id: 's3-nft-title' },
  { id: 's3-nft-intro' },
  { id: 's3-nft-real' },
  { id: 's3-nft-utility' },
  { id: 's3-nft-gate' },
  { id: 's3-nft-honest' },
  { id: 's3-nft-prosCons' },

  { kind: 'group' as const, id: 'g-dao' },
  { id: 's3-dao-title' },
  { id: 's3-dao-intro' },
  { id: 's3-dao-structures' },
  { id: 's3-dao-vote' },
  { id: 's3-dao-examples' },
  { id: 's3-dao-broke' },
  { id: 's3-dao-prosCons' },

  { kind: 'group' as const, id: 'g-rwa' },
  { id: 's3-rwa-title' },
  { id: 's3-rwa-spectrum' },
  { id: 's3-rwa-real' },
  { id: 's3-rwa-prosCons' },

  { kind: 'group' as const, id: 'g-sc' },
  { id: 's3-sc-title' },
  { id: 's3-sc-provenance' },
  { id: 's3-sc-real' },
  { id: 's3-sc-prosCons' },

  { kind: 'group' as const, id: 'g-cert' },
  { id: 's3-cert-title' },
  { id: 's3-cert-howitworks' },
  { id: 's3-cert-real' },
  { id: 's3-cert-prosCons' },

  { kind: 'group' as const, id: 'g-cases' },
  { id: 's3-case-gallery' },
  { id: 's3-tradelens' },

  { kind: 'group' as const, id: 'g-close' },
  { id: 's3-exercise' },
  { id: 's3-quiz' },
  { id: 's3-takeaways' },
];

// Every family follows the same frame: a title divider (FamilyDivider), a one-line recap bridge
// and a "why do we even need this?" hook (HookHeader), then the interactive / real cases, then
// one WinsBreaksSlide.

// Index of the correct option for each quiz.items[] entry, in the same order as the locale files.
const QUIZ_ANSWERS = [1, 2, 3, 0, 2, 1];

// ─── Interactive AMM Bonding Curve ───────────────────────────────────────────

function InteractiveAMM() {
  const { t } = useTranslation('smart-contracts/section-3');
  // Initial pool: 1000 ETH × 1000 USDC (k = 1,000,000)
  const X0 = 1000;
  const Y0 = 1000;
  const k  = X0 * Y0;

  // Trade size in ETH (X). Negative = sell ETH (add X), positive = buy ETH (remove X).
  const [dx, setDx] = useState(0);

  // After-trade reserves
  const newX = Math.max(1, X0 - dx); // buy: remove dx ETH; sell: add |dx|
  const newY = k / newX;
  const dyAbs = Math.abs(newY - Y0);
  const action = dx > 0 ? 'buy' : dx < 0 ? 'sell' : 'idle';

  // Effective price per ETH paid/received
  const effectivePrice = dx !== 0 ? dyAbs / Math.abs(dx) : Y0 / X0;
  // Spot price before trade
  const spotPrice = Y0 / X0; // = 1.000 USDC per ETH initially
  const slippage = dx !== 0 ? ((effectivePrice / spotPrice) - 1) * 100 : 0;

  // Build curve points for SVG (x from 100 to 5000, y = k/x)
  const W = 360, H = 220;
  const xMin = 100, xMax = 5000;
  const yMin = k / xMax, yMax = k / xMin;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * (W - 30) + 22;
  const sy = (y: number) => H - 24 - ((y - yMin) / (yMax - yMin)) * (H - 36);

  const points: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = xMin + (i / 60) * (xMax - xMin);
    const y = k / x;
    points.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <HookHeader color="#6366f1" badge={t('interactiveBadge')} hook={t('hooks.amm')}
        title={<>{t('amm.title')}<code className="text-[#6366f1]">x · y = k</code></>} subtitle={t('amm.subtitle')}>
        <UnderTheHood terms={['constant product', 'liquidity pool', 'slippage', 'LP fee']} className="mt-1.5" />
      </HookHeader>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">

        {/* Left: chart + slider */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="p-3 bg-card border border-border rounded-xl flex-1 min-h-0 flex flex-col">
            <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center justify-between">
              <span>{t('amm.curveTitle')}</span>
              <span className="font-mono text-[#6366f1]">k = {k.toLocaleString()}</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full flex-1">
              {/* Axes */}
              <line x1="22" y1={H - 24} x2={W - 8} y2={H - 24} stroke="currentColor" strokeOpacity="0.2" />
              <line x1="22" y1="6"        x2="22"     y2={H - 24} stroke="currentColor" strokeOpacity="0.2" />
              <text x="22" y={H - 4} fontSize="9" fill="currentColor" opacity="0.5">{t('amm.axisX')}</text>
              <text x="27" y="14" fontSize="9" fill="currentColor" opacity="0.5">{t('amm.axisY')}</text>

              {/* Curve */}
              <polyline points={points.join(' ')} fill="none" stroke="#6366f1" strokeWidth="2" />

              {/* Initial point (X0, Y0) */}
              <circle cx={sx(X0)} cy={sy(Y0)} r="5" fill="#9ca3af" />
              <text x={sx(X0) + 8} y={sy(Y0) - 6} fontSize="9" fill="#9ca3af">{t('amm.startLabel')}</text>

              {/* Current point */}
              <circle cx={sx(newX)} cy={sy(newY)} r="6" fill={action === 'buy' ? '#ED1C24' : action === 'sell' ? '#39B54A' : '#9ca3af'} />
              <text x={sx(newX) + 9} y={sy(newY) + 4} fontSize="10" fontWeight="bold"
                fill={action === 'buy' ? '#ED1C24' : action === 'sell' ? '#39B54A' : '#9ca3af'}>
                {t('amm.nowLabel')}
              </text>

              {/* Trade arrow */}
              {dx !== 0 && (
                <line
                  x1={sx(X0)} y1={sy(Y0)}
                  x2={sx(newX)} y2={sy(newY)}
                  stroke={action === 'buy' ? '#ED1C24' : '#39B54A'}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              )}
            </svg>
          </div>

          {/* Slider */}
          <div className="shrink-0 p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('amm.yourTrade')}</div>
              <button
                onClick={() => setDx(0)}
                className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground hover:bg-muted/70"
              >
                {t('amm.reset')}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#39B54A] font-semibold w-20 text-right">{t('amm.sellEth')}</span>
              <input
                type="range"
                min={-500}
                max={500}
                step={10}
                value={dx}
                onChange={e => setDx(Number(e.target.value))}
                className="flex-1 accent-[#6366f1]"
              />
              <span className="text-xs text-[#ED1C24] font-semibold w-20">{t('amm.buyEth')}</span>
            </div>
            <div className="text-center mt-1 text-sm font-mono">
              {dx === 0 ? <span className="text-muted-foreground">{t('amm.noTrade')}</span>
                : dx > 0 ? <span className="text-[#ED1C24]">{t('amm.buying', { amount: dx })}</span>
                : <span className="text-[#39B54A]">{t('amm.selling', { amount: -dx })}</span>}
            </div>
          </div>
        </div>

        {/* Right: numbers */}
        <div className="flex flex-col gap-3 min-h-0 overflow-y-auto">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('amm.poolReserves')}</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] text-muted-foreground">{t('amm.ethLabel')}</div>
              <div className="font-mono font-black text-base text-foreground">{newX.toFixed(2)}</div>
              <div className="text-[10px] text-muted-foreground">{t('amm.was', { value: X0 })}</div>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] text-muted-foreground">{t('amm.usdcLabel')}</div>
              <div className="font-mono font-black text-base text-foreground">{newY.toFixed(2)}</div>
              <div className="text-[10px] text-muted-foreground">{t('amm.was', { value: Y0 })}</div>
            </div>
          </div>

          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">{t('amm.pricing')}</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] text-muted-foreground">{t('amm.spotPrice')}</div>
              <div className="font-mono font-black text-base text-[#6366f1]">{spotPrice.toFixed(4)}</div>
              <div className="text-[10px] text-muted-foreground">{t('amm.usdcPerEth')}</div>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] text-muted-foreground">{t('amm.effectivePrice')}</div>
              <div className="font-mono font-black text-base" style={{ color: action === 'buy' ? '#ED1C24' : action === 'sell' ? '#39B54A' : '#9ca3af' }}>
                {effectivePrice.toFixed(4)}
              </div>
              <div className="text-[10px] text-muted-foreground">{t('amm.usdcPerEth')}</div>
            </div>
          </div>

          <div className="p-3 bg-card border-2 rounded-xl"
            style={{ borderColor: Math.abs(slippage) > 5 ? '#ED1C24' : Math.abs(slippage) > 1 ? '#f59e0b' : '#39B54A' }}>
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-foreground">{t('amm.slippage')}</div>
              <div className="font-mono font-black text-lg"
                style={{ color: Math.abs(slippage) > 5 ? '#ED1C24' : Math.abs(slippage) > 1 ? '#f59e0b' : '#39B54A' }}>
                {slippage > 0 ? '+' : ''}{slippage.toFixed(2)}%
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {Math.abs(slippage) > 10
                ? t('amm.slippageMassive')
                : Math.abs(slippage) > 1
                ? t('amm.slippageNoticeable')
                : t('amm.slippageMinimal')}
            </p>
          </div>

          <div className="p-3 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl text-xs text-muted-foreground">
            <div className="font-bold text-[#6366f1] mb-1">{t('amm.invariantTitle')}</div>
            <p>{t('amm.invariantA')}<code className="text-foreground">x · y</code>{t('amm.invariantB')}<code className="text-foreground">{k.toLocaleString()}</code>{t('amm.invariantC')}</p>
          </div>
        </div>

      </div>
      <KeyPointBar text={t('keyPoints.s3-defi-amm')} className="mt-3" />
    </div>
  );
}

// ─── Interactive RWA Spectrum ────────────────────────────────────────────────

const RWA_TIERS = [
  { id: 'sov',      complexity: 1, color: '#39B54A' },
  { id: 'pubeq',    complexity: 2, color: '#22d3ee' },
  { id: 'corpbond', complexity: 3, color: '#6366f1' },
  { id: 'credit',   complexity: 4, color: '#8b5cf6' },
  { id: 'struct',   complexity: 5, color: '#a855f7' },
  { id: 'funds',    complexity: 6, color: '#d946ef' },
  { id: 'commod',   complexity: 6, color: '#ec4899' },
  { id: 'trade',    complexity: 7, color: '#f43f5e' },
  { id: 'realest',  complexity: 8, color: '#f59e0b' },
  { id: 'infra',    complexity: 9, color: '#ED1C24' },
];

function RWASpectrum({ recap }: { recap: RecapBridge }) {
  const { t } = useTranslation('smart-contracts/section-3');
  const [selected, setSelected] = useState<string>('sov');
  const tier = RWA_TIERS.find(t => t.id === selected)!;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <HookHeader color="#39B54A" badge={t('interactiveBadge')} hook={t('family.rwa.hook')} recap={recap}
        title={t('rwaSpectrum.title')} subtitle={t('rwaSpectrum.subtitle')} />

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        {/* Left: spectrum bars */}
        <div className="col-span-2 flex flex-col gap-2 overflow-y-auto pr-2">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span>{t('rwaSpectrum.easier')}</span>
            <span>{t('rwaSpectrum.harder')}</span>
          </div>
          {RWA_TIERS.map(tr => (
            <button
              key={tr.id}
              onClick={() => setSelected(tr.id)}
              className="text-left p-2 rounded-xl border-2 transition-all hover:scale-[1.01]"
              style={{
                borderColor: selected === tr.id ? tr.color : 'transparent',
                backgroundColor: selected === tr.id ? tr.color + '12' : 'var(--card)',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="font-bold text-sm shrink-0 w-44 text-foreground">{t(`rwaSpectrum.tiers.${tr.id}.label`)}</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${tr.complexity * 10}%`, backgroundColor: tr.color }} />
                </div>
                <div className="font-mono font-bold text-xs w-10 text-right" style={{ color: tr.color }}>{t('rwaSpectrum.complexityUnit', { value: tr.complexity })}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: details */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-5 bg-card border-2 rounded-xl flex flex-col gap-3"
          style={{ borderColor: tier.color + '60' }}
        >
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-xl flex items-center justify-center font-black text-white" style={{ backgroundColor: tier.color }}>
              {tier.complexity}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: tier.color }}>{t('rwaSpectrum.assetClass')}</div>
              <div className="font-black text-foreground">{t(`rwaSpectrum.tiers.${tier.id}.label`)}</div>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-xs font-semibold text-foreground mb-1">{t('rwaSpectrum.whyScore')}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t(`rwaSpectrum.tiers.${tier.id}.desc`)}</p>
          </div>
          <div className="p-3 rounded-lg flex-1" style={{ backgroundColor: tier.color + '10' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: tier.color }}>{t('rwaSpectrum.adoptionToday')}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t(`rwaSpectrum.tiers.${tier.id}.adoption`)}</p>
          </div>
        </motion.div>
      </div>
      <KeyPointBar text={t('keyPoints.s3-rwa-spectrum')} className="mt-3" />
    </div>
  );
}

// ─── Interactive Proof-of-Existence (SHA-256) ────────────────────────────────

// Hashing is done by a synchronous pure-JS SHA-256 (utils/sha256) rather than crypto.subtle:
// Web Crypto only exists in secure contexts, so over plain HTTP on a LAN address the demo used
// to show a placeholder for every input — and a tampered document would have "matched".

// A matching hash only proves the document is unchanged. Anyone can write a hash on-chain, so the
// verifier also checks WHO wrote the record: the university's known issuer contract, or someone else.

type IssuerId = 'uni' | 'rogue';
type CheckState = 'pass' | 'fail' | 'skip';

// Language-neutral: illustrative addresses + colour + icon. Names come from t().
const ISSUERS: Record<IssuerId, { address: string; color: string; Icon: LucideIcon }> = {
  uni:   { address: '0x71C7…E3a9', color: '#39B54A', Icon: GraduationCap },
  rogue: { address: '0xBAD0…51f0', color: '#ED1C24', Icon: UserX },
};

const CHECK_STYLE: Record<CheckState, { color: string; Icon: LucideIcon }> = {
  pass: { color: '#39B54A', Icon: Check },
  fail: { color: '#ED1C24', Icon: X },
  skip: { color: '#9ca3af', Icon: Minus },
};

function VerifyCheck({ n, state, title, delay, testId, children }: {
  n: number; state: CheckState; title: string; delay: number; testId: string; children: ReactNode;
}) {
  const s = CHECK_STYLE[state];
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}
      data-testid={testId} data-state={state}
      className="flex items-start gap-2.5 p-2.5 rounded-xl border-2 bg-card"
      style={{ borderColor: s.color + '70' }}
    >
      <div className="size-7 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: s.color }}>
        <s.Icon className="size-4" strokeWidth={3} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-bold text-foreground leading-tight">
          <span className="font-mono mr-1.5" style={{ color: s.color }}>{n}</span>{title}
        </div>
        <div className="font-mono text-[10px] text-muted-foreground break-all leading-relaxed mt-0.5">{children}</div>
      </div>
    </motion.div>
  );
}

function ProofOfExistenceDemo({ recap }: { recap: RecapBridge }) {
  const { t } = useTranslation('smart-contracts/section-3');
  const [doc, setDoc]   = useState(t('poe.defaultDoc'));
  const [issuer, setIssuer] = useState<IssuerId>('uni');
  const [anchored, setAnchored] = useState<{ hash: string; ts: number; issuer: IssuerId } | null>(null);
  const [verifyDoc, setVerifyDoc] = useState('');
  const [verifyHash, setVerifyHash] = useState('');

  // Live fingerprint of whatever is in the credential box.
  const hash = useMemo(() => sha256Hex(doc), [doc]);

  const onDocChange = (v: string) => setDoc(v);

  // A verdict belongs to one (document, anchor) pair: drop it when either side changes.
  const anchor = () => { setAnchored({ hash, ts: Date.now(), issuer }); setVerifyHash(''); };
  const onVerifyDocChange = (v: string) => { setVerifyDoc(v); setVerifyHash(''); };

  const verify = () => setVerifyHash(sha256Hex(verifyDoc));

  // Check 1: the document's hash equals the on-chain record.
  const hashOk = !!anchored && verifyHash !== '' && verifyHash === anchored.hash;
  // Check 2: that record was written by the university's issuer contract. With no matching record
  // there is no writer to look at, so the check is skipped rather than failed.
  const issuerOk = hashOk && anchored?.issuer === 'uni';
  const issuerState: CheckState = !hashOk ? 'skip' : issuerOk ? 'pass' : 'fail';
  const verdict = !hashOk ? 'altered' : issuerOk ? 'authentic' : 'forged';
  const verdictColor = verdict === 'authentic' ? '#39B54A' : '#ED1C24';
  const VerdictIcon = verdict === 'authentic' ? ShieldCheck : ShieldAlert;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <HookHeader color="#22d3ee" badge={t('interactiveBadge')} hook={t('family.cert.hook')} recap={recap}
        title={t('poe.title')} subtitle={t('poe.subtitle')} />

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">

        {/* Issue */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-widest">{t('poe.issueStep')}</div>
          <div className="p-3 bg-card border border-border rounded-xl flex flex-col gap-2">
            <div className="text-[10px] font-semibold text-muted-foreground">{t('poe.credentialText')}</div>
            <textarea
              value={doc}
              onChange={e => onDocChange(e.target.value)}
              rows={2}
              className="w-full p-2 bg-muted rounded-lg text-xs font-mono text-foreground resize-none border border-border focus:outline-none focus:ring-1 focus:ring-[#22d3ee]"
            />
          </div>
          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="text-[10px] font-semibold text-muted-foreground mb-1">{t('poe.hashLabel')}</div>
            <div className="font-mono text-[10px] text-[#6366f1] break-all leading-relaxed" data-testid="poe-hash">{hash}</div>
          </div>

          {/* Who writes the record: the chain accepts either, which is the point of check 2 */}
          <div>
            <div className="text-[10px] font-semibold text-muted-foreground mb-1">{t('poe.writerLabel')}</div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(ISSUERS) as IssuerId[]).map(id => {
                const m = ISSUERS[id];
                const active = id === issuer;
                return (
                  <button key={id} onClick={() => setIssuer(id)} aria-pressed={active} data-testid={`poe-issuer-${id}`}
                    className="flex items-center gap-2 p-2 rounded-xl border-2 text-left transition-colors"
                    style={{ borderColor: active ? m.color : 'var(--border)', backgroundColor: active ? m.color + '12' : 'var(--card)' }}>
                    <m.Icon className="size-4 shrink-0" style={{ color: m.color }} />
                    <span className="min-w-0 leading-tight">
                      <span className="block text-[11px] font-bold text-foreground">{t(`poe.writers.${id}.name`)}</span>
                      <span className="block font-mono text-[10px] text-muted-foreground">{m.address}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={anchor}
            data-testid="poe-anchor"
            className="px-4 py-2.5 rounded-xl bg-[#22d3ee] text-white text-xs font-black hover:bg-[#22d3ee]/90 disabled:opacity-40 transition-colors"
          >
            {t('poe.anchorButton')}
          </button>
          {anchored && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} data-testid="poe-record"
              className="p-3 bg-[#22d3ee]/10 border border-[#22d3ee]/30 rounded-xl">
              <div className="font-bold text-xs text-[#22d3ee] mb-1">{t('poe.anchored')}</div>
              <div className="text-[10px] text-muted-foreground">{t('poe.blockTimestamp', { ts: new Date(anchored.ts).toISOString() })}</div>
              <div className="text-[10px] text-muted-foreground">{t('poe.anchoredHash')}<span className="font-mono">{anchored.hash.slice(0, 24)}…</span></div>
              <div className="text-[10px] text-muted-foreground">
                {t('poe.writtenByLabel')}
                <span className="font-mono font-bold" style={{ color: ISSUERS[anchored.issuer].color }}>{ISSUERS[anchored.issuer].address}</span>
                {' · '}{t(`poe.writers.${anchored.issuer}.name`)}
              </div>
              {anchored.issuer === 'rogue' && (
                <div className="text-[10px] font-semibold text-[#ED1C24] mt-0.5">{t('poe.chainAccepts')}</div>
              )}
            </motion.div>
          )}
        </div>

        {/* Verify */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">{t('poe.verifyStep')}</div>
          {/* The verifier's reference point: the issuer address the university publishes */}
          <div className="flex items-center gap-2 flex-wrap px-2.5 py-1.5 rounded-lg border border-[#39B54A]/40 bg-[#39B54A]/10 text-[11px]">
            <GraduationCap className="size-4 shrink-0 text-[#39B54A]" />
            <span className="text-muted-foreground">{t('poe.knownIssuerLabel')}</span>
            <span className="font-mono font-bold text-foreground">{ISSUERS.uni.address}</span>
          </div>
          {!anchored ? (
            <div className="p-4 rounded-xl border border-dashed border-border flex-1 flex items-center justify-center text-center">
              <p className="text-xs text-muted-foreground italic">{t('poe.verifyPlaceholderPrompt')}</p>
            </div>
          ) : (
            <>
              <div className="p-3 bg-card border border-border rounded-xl flex flex-col gap-2">
                <div className="text-[10px] font-semibold text-muted-foreground">{t('poe.reenterCredential')}</div>
                <textarea
                  value={verifyDoc}
                  onChange={e => onVerifyDocChange(e.target.value)}
                  placeholder={t('poe.verifyTextareaPlaceholder')}
                  rows={2}
                  data-testid="poe-verify-input"
                  className="w-full p-2 bg-muted rounded-lg text-xs font-mono text-foreground resize-none border border-border focus:outline-none focus:ring-1 focus:ring-[#39B54A]"
                />
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={verify}
                    disabled={!verifyDoc}
                    data-testid="poe-verify"
                    className="px-3 py-1.5 rounded-lg bg-[#39B54A] text-white text-xs font-bold hover:bg-[#39B54A]/90 disabled:opacity-40 transition-colors"
                  >
                    {t('poe.computeHash')}
                  </button>
                  <button
                    onClick={() => onVerifyDocChange(doc)}
                    data-testid="poe-paste"
                    className="text-[11px] font-semibold text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    {t('poe.pasteIssued')}
                  </button>
                </div>
              </div>

              {/* Two checks, in order: is the document unchanged, and did the right contract write the record? */}
              {verifyHash && (
                <div key={`${verifyHash}-${anchored.ts}`} className="flex flex-col gap-2" data-testid="poe-result" data-verdict={verdict}>
                  <VerifyCheck n={1} state={hashOk ? 'pass' : 'fail'} title={t('poe.checkHash')} delay={0} testId="poe-check-hash">
                    {t('poe.computedLabel')}{verifyHash.slice(0, 24)}…<br />
                    {hashOk ? '= ' : '≠ '}{t('poe.anchoredLabelShort')}{anchored.hash.slice(0, 24)}…
                  </VerifyCheck>
                  <VerifyCheck n={2} state={issuerState} title={t('poe.checkIssuer')} delay={0.3} testId="poe-check-issuer">
                    {issuerState === 'skip' ? t('poe.issuerSkipped') : (
                      <>
                        {t('poe.writtenByLabel')}
                        <span className="font-bold" style={{ color: ISSUERS[anchored.issuer].color }}>{ISSUERS[anchored.issuer].address}</span><br />
                        {issuerOk ? '= ' : '≠ '}{t('poe.knownIssuerLabel')} {ISSUERS.uni.address}
                      </>
                    )}
                  </VerifyCheck>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    data-testid="poe-verdict"
                    className="p-2.5 rounded-xl border-2"
                    style={{ borderColor: verdictColor, backgroundColor: verdictColor + '12' }}
                  >
                    <div className="flex items-center gap-2 font-black text-sm leading-tight" style={{ color: verdictColor }}>
                      <VerdictIcon className="size-4 shrink-0" />{t(`poe.verdict.${verdict}.title`)}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{t(`poe.verdict.${verdict}.body`)}</div>
                  </motion.div>
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* lg:pr-16 keeps the note clear of the floating slide-nav buttons */}
      <div className="shrink-0 mt-3 p-2 lg:pr-16 bg-muted/50 rounded-lg text-[11px] text-muted-foreground">
        <span className="font-semibold text-foreground">{t('poe.whyWorksLabel')}</span>{t('poe.whyWorksBody')}
      </div>
      <KeyPointBar text={t('keyPoints.s3-cert-howitworks')} className="mt-3" />
    </div>
  );
}

// ─── Exercise: Design Your Own Mini-Brief ────────────────────────────────────

// Language-neutral industry IDs — display labels and example text come from t().
const INDUSTRIES = ['Finance', 'Supply Chain', 'Healthcare', 'Real Estate', 'Government', 'Entertainment', 'Insurance', 'Gaming'];

// ─── Interactive Peg-Stability Simulator ────────────────────────────────────

type PegType = 'fiat' | 'crypto' | 'algo';

// Language-neutral: numeric controls + ticker examples + color. Text via t() by key.
const PEG_TYPES: Record<PegType, { example: string; color: string; controlMin: number; controlMax: number; controlDefault: number; controlUnit: string }> = {
  fiat:   { example: 'USDC · USDT',  color: '#6366f1', controlMin: 50, controlMax: 100, controlDefault: 100, controlUnit: '%' },
  crypto: { example: 'DAI · LUSD',   color: '#8b5cf6', controlMin: 80, controlMax: 250, controlDefault: 150, controlUnit: '%' },
  algo:   { example: 'UST (defunct)', color: '#f59e0b', controlMin: 0,  controlMax: 100, controlDefault: 30,  controlUnit: '%' },
};

function PegSimulator() {
  const { t } = useTranslation('smart-contracts/section-3');
  const [type, setType]     = useState<PegType>('crypto');
  const [control, setCtl]   = useState(PEG_TYPES.crypto.controlDefault);
  const [shock, setShock]   = useState(20); // % of supply being sold

  // When the type changes, reset its control to default
  const setTypeAndDefault = (t: PegType) => {
    setType(t);
    setCtl(PEG_TYPES[t].controlDefault);
  };

  // Compute peg deviation (cents off $1)
  let dev = 0;
  let regime: 'stable' | 'wobble' | 'depeg' | 'collapse' = 'stable';
  if (type === 'fiat') {
    const gap = Math.max(0, 100 - control);    // unbacked %
    dev = (gap / 100) * (shock / 100) * 35;
  } else if (type === 'crypto') {
    const cushion = Math.max(0, control - 100); // over-collateralisation above $1
    const stress  = Math.max(0, shock - cushion * 0.7);
    dev = (stress / 100) * 25 + (control < 100 ? (100 - control) * 0.5 : 0);
  } else {
    // algo — exponential below cushion
    const ratio = (shock / Math.max(1, control));
    dev = Math.min(100, Math.pow(ratio, 1.8) * 20);
  }

  const peg = Math.max(0, 1 - dev / 100);
  if      (dev < 1)   regime = 'stable';
  else if (dev < 5)   regime = 'wobble';
  else if (dev < 30)  regime = 'depeg';
  else                regime = 'collapse';

  const regimeColor = regime === 'stable'   ? '#39B54A'
                    : regime === 'wobble'   ? '#f59e0b'
                    : regime === 'depeg'    ? '#ED1C24'
                    :                          '#7c2d12';
  const regimeLabel = t(`pegSim.regime.${regime}`);

  const lesson = type === 'fiat'
    ? t('pegSim.lessons.fiat')
    : type === 'crypto'
    ? t('pegSim.lessons.crypto')
    : t('pegSim.lessons.algo');

  const cfg = PEG_TYPES[type];

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <HookHeader color="#6366f1" badge={t('interactiveBadge')} hook={t('hooks.peg')}
        title={t('stablecoinsIntro.heading')} subtitle={t('pegSim.subtitle')} />

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
        {/* Controls */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('pegSim.design')}</div>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(PEG_TYPES) as PegType[]).map(pt => {
              const tcfg = PEG_TYPES[pt];
              const active = pt === type;
              return (
                <button key={pt} onClick={() => setTypeAndDefault(pt)}
                  className="p-2.5 rounded-xl border-2 text-left transition-colors"
                  style={{
                    borderColor: active ? tcfg.color : 'var(--border)',
                    backgroundColor: active ? tcfg.color + '15' : 'var(--card)',
                  }}>
                  <div className="font-bold text-xs" style={{ color: active ? tcfg.color : 'var(--foreground)' }}>{t(`pegSim.types.${pt}.name`)}</div>
                  <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{tcfg.example}</div>
                </button>
              );
            })}
          </div>
          <div className="p-2.5 rounded-lg border text-[11px] leading-snug" style={{ borderColor: cfg.color + '40', backgroundColor: cfg.color + '0a' }}>
            <span className="text-foreground">{t(`stablecoinsIntro.cards.${type}.how`)}</span>{' '}
            <span className="text-muted-foreground"><span className="font-semibold" style={{ color: cfg.color }}>{t('stablecoinsIntro.riskLabel')}</span>{t(`stablecoinsIntro.cards.${type}.risk`)}</span>
          </div>

          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-foreground">{t(`pegSim.types.${type}.control`)}</div>
              <div className="font-mono font-bold text-sm" style={{ color: cfg.color }}>{control}{cfg.controlUnit}</div>
            </div>
            <input type="range" min={cfg.controlMin} max={cfg.controlMax} step={1} value={control}
              onChange={e => setCtl(Number(e.target.value))}
              className="w-full" style={{ accentColor: cfg.color }} />
            <div className="text-[10px] text-muted-foreground mt-1">{t(`pegSim.types.${type}.controlDesc`)}</div>
          </div>

          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-foreground">{t('pegSim.shockLabel')}</div>
              <div className="font-mono font-bold text-sm text-[#ED1C24]">{shock}%</div>
            </div>
            <input type="range" min={0} max={100} step={1} value={shock}
              onChange={e => setShock(Number(e.target.value))}
              className="w-full accent-[#ED1C24]" />
            <div className="text-[10px] text-muted-foreground mt-1">{t('pegSim.shockDesc')}</div>
          </div>

          <div className="mt-auto p-3 rounded-xl border" style={{ borderColor: cfg.color + '40', backgroundColor: cfg.color + '0c' }}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: cfg.color }}>{t('pegSim.lessonLabel')}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{lesson}</p>
          </div>
        </div>

        {/* Peg display */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('pegSim.currentPeg')}</div>

          <div className="flex-1 min-h-0 p-5 rounded-2xl border-4 flex flex-col items-center justify-center gap-3" style={{ borderColor: regimeColor + '60', backgroundColor: regimeColor + '0c' }}>
            <div className="text-xs text-muted-foreground">{t('pegSim.target')}</div>
            <div className="font-mono font-black text-6xl lg:text-7xl" style={{ color: regimeColor }}>
              ${peg.toFixed(peg < 0.5 ? 4 : 3)}
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: regimeColor + '20', color: regimeColor }}>
              {regimeLabel}
            </div>

            {/* Peg gauge bar */}
            <div className="w-full mt-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                {/* target marker at right */}
                <div className="absolute right-0 top-0 h-full w-0.5 bg-foreground/40" />
                <div className="h-full transition-all duration-300" style={{ width: `${peg * 100}%`, backgroundColor: regimeColor }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>$0</span><span>{t('pegSim.pegRange')}</span>
              </div>
            </div>

            <div className="text-xs text-center text-muted-foreground">
              {t('pegSim.deviation')}<span className="font-mono font-bold" style={{ color: regimeColor }}>−{dev.toFixed(2)}¢</span>
            </div>
          </div>

          <div className="shrink-0 p-2.5 bg-muted/30 border border-border rounded-lg text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">{t('pegSim.noteLabel')}</span>{t('pegSim.noteBody')}<span className="italic">{t('pegSim.noteEmphasis')}</span>.
          </div>
        </div>
      </div>
      <KeyPointBar text={t('keyPoints.s3-defi-stablecoins')} className="mt-3" />
    </div>
  );
}

// ─── Interactive Provenance QR-Scan Trail ────────────────────────────────────

// Language-neutral: emoji, who (proper names/places), ts, sig. label & detail via t() by index.
const PROVENANCE_STEPS = [
  { emoji: '🐔', who: 'Ferme Bio Sud-Ouest, FR',     ts: '2026-03-15 06:24', sig: '0x8a3f…91c4' },
  { emoji: '🌾', who: 'Ferme Bio Sud-Ouest, FR',     ts: '2026-05-02 18:00', sig: '0x8a3f…91c4' },
  { emoji: '🚛', who: 'CoolChain Logistique',        ts: '2026-05-05 04:11', sig: '0x4d12…77ae' },
  { emoji: '🏭', who: 'Abattoir Toulouse SARL',      ts: '2026-05-05 09:48', sig: '0x91bc…2f08' },
  { emoji: '📦', who: 'Carrefour BIO line, Lyon',    ts: '2026-05-05 14:22', sig: '0xc7e2…b41d' },
  { emoji: '🚚', who: 'Carrefour Logistics',         ts: '2026-05-06 02:30', sig: '0x4d12…77ae' },
  { emoji: '🛒', who: 'Carrefour Lyon Part-Dieu',    ts: '2026-05-06 08:15', sig: '0xa1f5…3e90' },
];

function ProvenanceQR({ recap }: { recap: RecapBridge }) {
  const { t } = useTranslation('smart-contracts/section-3');
  const [scanned, setScanned] = useState(false);
  const [active, setActive]   = useState(0);

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <HookHeader color="#f59e0b" badge={t('interactiveBadge')} hook={t('family.sc.hook')} recap={recap}
        title={t('provenance.title')} subtitle={t('provenance.subtitle')} />

      <div className="flex-1 min-h-0 grid grid-cols-[260px_1fr] gap-5">

        {/* QR + product card */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="shrink-0 p-4 bg-card border-2 border-border rounded-xl text-center">
            <div className="text-xs text-muted-foreground mb-1">{t('provenance.productLabel')}</div>
            <div className="font-bold text-sm text-foreground">{t('provenance.batchLabel')}</div>
          </div>

          <button onClick={() => setScanned(s => !s)}
            className="shrink-0 relative p-4 rounded-xl border-2 transition-colors group"
            style={{
              borderColor: scanned ? '#39B54A' : '#f59e0b',
              backgroundColor: scanned ? '#39B54A08' : '#f59e0b08',
            }}>
            {/* Fake QR — checker pattern */}
            <svg viewBox="0 0 21 21" className="w-full h-auto" style={{ imageRendering: 'pixelated' }}>
              {Array.from({ length: 21 }).map((_, y) =>
                Array.from({ length: 21 }).map((_, x) => {
                  // Corner finder patterns + pseudo-random fill
                  const isCorner = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
                  const cornerRing = isCorner && (
                    x === 0 || x === 6 || x === 14 || x === 20 ||
                    y === 0 || y === 6 || y === 14 || y === 20 ||
                    ((x >= 2 && x <= 4 && y >= 2 && y <= 4)) ||
                    ((x >= 16 && x <= 18 && y >= 2 && y <= 4)) ||
                    ((x >= 2 && x <= 4 && y >= 16 && y <= 18))
                  );
                  if (isCorner && !cornerRing) return null;
                  const fill = isCorner ? true : ((x * 7 + y * 13 + 3) % 5 < 2);
                  if (!fill) return null;
                  return <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />;
                })
              )}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {!scanned && (
                <span className="px-3 py-1.5 rounded-full bg-[#f59e0b] text-white text-xs font-bold shadow-lg group-hover:scale-105 transition-transform">
                  {t('provenance.tapToScan')}
                </span>
              )}
              {scanned && (
                <span className="px-3 py-1.5 rounded-full bg-[#39B54A] text-white text-xs font-bold shadow-lg">
                  {t('provenance.trailLoaded')}
                </span>
              )}
            </div>
          </button>

          {scanned && (
            <div className="shrink-0 p-2.5 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-lg text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">{t('provenance.handoffsLabel')}</span>{t('provenance.handoffsRest')}
            </div>
          )}
        </div>

        {/* Trail */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="shrink-0 text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('provenance.trailTitle')}</div>

          {!scanned ? (
            <div className="flex-1 flex items-center justify-center text-center text-sm text-muted-foreground border border-dashed border-border rounded-xl">
              {t('provenance.scanPrompt')}
            </div>
          ) : (
            <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-y-auto pr-1">
              {PROVENANCE_STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <motion.button key={i}
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-left p-2.5 rounded-lg border transition-colors"
                    style={{
                      borderColor: isActive ? '#f59e0b' : 'var(--border)',
                      backgroundColor: isActive ? '#f59e0b12' : 'var(--card)',
                    }}>
                    <div className="flex items-center gap-2">
                      <div className="text-xl shrink-0">{s.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-bold text-sm text-foreground">{t('provenance.stepLabel', { number: i + 1, label: t(`provenance.steps.${i}.label`) })}</div>
                          <div className="text-[10px] font-mono text-muted-foreground">{s.ts}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{s.who}</div>
                        {isActive && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            className="mt-1.5 pt-1.5 border-t border-[#f59e0b]/30">
                            <div className="text-xs text-foreground">{t(`provenance.steps.${i}.detail`)}</div>
                            <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{t('provenance.signedBy', { sig: s.sig })}</div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

      </div>
      <KeyPointBar text={t('keyPoints.s3-sc-provenance')} className="mt-3" />
    </div>
  );
}

function DesignYourOwnExercise() {
  const { t } = useTranslation('smart-contracts/section-3');
  const [selected,  setSelected]  = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  // Step shape is language-neutral: emoji + label key + example field key.
  const stepShape = [
    { labelKey: 'pain',    emoji: '🩹', field: 'pain' },
    { labelKey: 'parties', emoji: '👥', field: 'parties' },
    { labelKey: 'trigger', emoji: '⚡', field: 'trigger' },
    { labelKey: 'output',  emoji: '✅', field: 'output' },
    { labelKey: 'risk',    emoji: '⚠️', field: 'risk' },
  ];
  const steps = selected ? stepShape.map(s => ({
    label: t(`exercise.stepLabels.${s.labelKey}`),
    emoji: s.emoji,
    value: t(`exercise.examples.${selected}.${s.field}`),
  })) : [];

  const handleSelect = (ind: string) => { setSelected(ind); setStepIndex(0); };
  const next = () => setStepIndex(i => Math.min(i + 1, steps.length - 1));
  const prev = () => setStepIndex(i => Math.max(i - 1, 0));

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-4">
        <span className="px-2.5 py-0.5 rounded-full bg-[#39B54A]/15 border border-[#39B54A]/40 text-[#39B54A] text-xs font-bold">{t('exerciseBadge')}</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">{t('exercise.title')}</h2>
        <p className="text-muted-foreground text-sm">{t('exercise.subtitle')}</p>
      </div>

      <div className="flex-1 min-h-0 flex gap-6">

        {/* Industry selector */}
        <div className="flex flex-col gap-2 w-44 shrink-0 justify-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{t('exercise.chooseIndustry')}</p>
          {INDUSTRIES.map(ind => (
            <motion.button key={ind} onClick={() => handleSelect(ind)} whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
              className="px-3 py-2 rounded-xl border-2 text-left text-xs font-semibold transition-colors"
              style={{
                borderColor: selected === ind ? '#39B54A' : 'var(--border)',
                backgroundColor: selected === ind ? '#39B54A18' : 'var(--card)',
                color: selected === ind ? '#39B54A' : 'var(--foreground)',
              }}>
              {t(`exercise.industries.${ind}`)}
            </motion.button>
          ))}
        </div>

        {/* Step-through panel */}
        <div className="flex-1 min-w-0 flex flex-col">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-5xl mb-3">👈</div>
                <p className="text-sm">{t('exercise.selectPrompt')}</p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={selected} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="flex-1 flex flex-col gap-4">

                {/* Progress dots */}
                <div className="flex items-center gap-2 shrink-0">
                  {steps.map((s, i) => (
                    <button key={i} onClick={() => setStepIndex(i)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors"
                      style={{
                        backgroundColor: i <= stepIndex ? '#39B54A20' : 'var(--muted)',
                        color: i <= stepIndex ? '#39B54A' : 'var(--muted-foreground)',
                        border: `1px solid ${i === stepIndex ? '#39B54A' : 'transparent'}`,
                      }}>
                      {s.emoji} {s.label}
                    </button>
                  ))}
                </div>

                {/* Prompt card — show question first, reveal on click */}
                <motion.div key={stepIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="flex-1 flex flex-col gap-4">

                  <div className="p-5 rounded-xl border-2 border-[#39B54A]/30 bg-[#39B54A]/06 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{steps[stepIndex].emoji}</span>
                      <div className="font-black text-lg text-foreground">{steps[stepIndex].label}</div>
                      <span className="ml-auto text-xs text-muted-foreground">{t('exercise.stepCounter', { current: stepIndex + 1, total: steps.length })}</span>
                    </div>

                    {/* Question prompt */}
                    <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground italic">
                      {t(`exercise.prompts.${stepIndex}`, { industry: t(`exercise.industries.${selected}`) })}
                    </div>

                    {/* Example answer */}
                    <div className="p-3 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-lg">
                      <div className="text-[10px] font-bold text-[#39B54A] uppercase tracking-widest mb-1">{t('exercise.exampleAnswer', { industry: t(`exercise.industries.${selected}`) })}</div>
                      <div className="text-sm text-foreground">{steps[stepIndex].value}</div>
                    </div>
                  </div>

                  {/* Nav */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button onClick={prev} disabled={stepIndex === 0}
                      className="px-4 py-2 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 disabled:opacity-30 transition-colors">{t('exercise.previous')}</button>
                    <button onClick={next} disabled={stepIndex === steps.length - 1}
                      className="px-4 py-2 rounded-lg bg-[#39B54A] text-white text-xs font-bold hover:bg-[#39B54A]/90 disabled:opacity-30 transition-colors">{t('exercise.next')}</button>
                    {stepIndex === steps.length - 1 && (
                      <span className="text-xs text-[#39B54A] font-semibold ml-2">{t('exercise.complete')}</span>
                    )}
                  </div>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
      <KeyPointBar text={t('keyPoints.s3-exercise')} className="mt-3" />
    </div>
  );
}

interface RealColumn { kicker: string; title: string; tag: string; points: string[]; footnote: string }
interface QuizItem { question: string; options: string[]; explanation: string }
interface CaseCard { industry: string; name: string; problem: string; solution: string; metric: string; metricLabel: string; platform: string }

const CASE_META = [
  { emoji: '🏠', color: '#f59e0b' },
  { emoji: '🏡', color: '#8b5cf6' },
  { emoji: '🚗', color: '#22d3ee' },
  { emoji: '🥬', color: '#39B54A' },
  { emoji: '💼', color: '#6366f1' },
];

// ─── "In production" slide: 2–3 real deployments side by side ────────────────

function RealWorldSlide({
  heading, subtitle, image, columns, colors, terms, keyPoint, label,
}: {
  heading: string; subtitle: string; image?: string; label?: PageLabelKind;
  columns: RealColumn[]; colors: string[]; terms: string[]; keyPoint: string;
}) {
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-4 flex items-start gap-4">
        {image && <img src={image} alt="" className="hidden lg:block h-16 object-contain shrink-0" />}
        <div>
          {label && <PageLabelRow kind={label} />}
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{heading}</h2>
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="flex-1 min-h-0 grid gap-4" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((c, i) => {
          const color = colors[i];
          return (
            <div key={c.title} className="flex flex-col rounded-2xl border-2 bg-card overflow-hidden min-h-0" style={{ borderColor: color + '50' }}>
              <div className="h-1.5 shrink-0" style={{ backgroundColor: color }} />
              <div className="flex-1 min-h-0 flex flex-col gap-2 p-4 overflow-y-auto">
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>{c.kicker}</div>
                <div className="font-black text-base text-foreground leading-tight">{c.title}</div>
                <div className="text-xs text-muted-foreground">{c.tag}</div>
                <ul className="space-y-1.5 mt-1 flex-1">
                  {c.points.map((p, j) => (
                    <li key={j} className="flex gap-2 text-sm text-foreground/90 leading-snug"><span className="shrink-0 mt-0.5 font-bold" style={{ color }}>›</span>{p}</li>
                  ))}
                </ul>
                <div className="mt-auto p-2.5 rounded-lg text-xs text-muted-foreground leading-snug" style={{ backgroundColor: color + '12' }}>{c.footnote}</div>
              </div>
            </div>
          );
        })}
      </div>
      <UnderTheHood terms={terms} className="shrink-0 mt-3" />
      <KeyPointBar text={keyPoint} className="mt-2" />
    </div>
  );
}

export function SC_Section3() {
  const { t } = useTranslation('smart-contracts/section-3');

  const chapters = useMemo(
    () =>
      chapterShape.map((c) =>
        'kind' in c
          ? { kind: 'group' as const, id: c.id, label: t(`groups.${c.id}`) }
          : { id: c.id, label: t(`chapters.${c.id}`) }
      ),
    [t]
  );
  const kp = (id: string) => t(`keyPoints.${id}`);

  // One-line recap bridge per family: where it was first taught + the 10-second version.
  const bridge = (fam: string, to: string, color: string): RecapBridge => ({
    where: t(`family.${fam}.where`), line: t(`family.${fam}.recap`), to, color,
  });
  const F3 = '/blockchain-fundamentals/section-3';

  // Language-neutral presentation data
  const industryVerticals = [
    { key: 'defi', emoji: '💸', color: '#6366f1' },
    { key: 'nft',  emoji: '🎮', color: '#8b5cf6' },
    { key: 'rwa',  emoji: '🏢', color: '#39B54A' },
    { key: 'sc',   emoji: '🚚', color: '#f59e0b' },
    { key: 'cert', emoji: '📜', color: '#22d3ee' },
  ];

  // "In production" columns
  const nftReal  = t('nftReal.columns',  { returnObjects: true }) as RealColumn[];
  const rwaReal  = t('rwaReal.columns',  { returnObjects: true }) as RealColumn[];
  const scReal   = t('scReal.columns',   { returnObjects: true }) as RealColumn[];
  const certReal = t('certReal.columns', { returnObjects: true }) as RealColumn[];
  const cases    = t('caseGallery.items', { returnObjects: true }) as CaseCard[];

  // Closing
  const quizQuestions = (t('quiz.items', { returnObjects: true }) as QuizItem[]).map((q, qi) => ({
    question: q.question,
    options: q.options.map((text, i) => ({ text, correct: i === QUIZ_ANSWERS[qi] })),
    explanation: q.explanation,
  }));
  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

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
            icon={<Building2 className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#22d3ee]"
          />
        </div>

        {/* ═══════ DISCUSSION — WHICH INDUSTRY HURTS MOST? ═══════ */}
        <div id="s3-discussion" className="h-full">
          <ClassDiscussion
            badge={t('discussion.badge')}
            duration={t('discussion.duration')}
            title={t('discussion.title')}
            lead={t('discussion.lead')}
            questions={t('discussion.questions', { returnObjects: true }) as string[]}
            note={t('discussion.note')}
          />
        </div>

        {/* ═══════ INDUSTRIES OVERVIEW ═══════ */}
        <div id="s3-industries-intro" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('industriesIntro.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('industriesIntro.subtitle')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-5 gap-3 content-center">
            {industryVerticals.map(v => (
              <div key={v.key} className="p-4 bg-card border rounded-xl flex flex-col gap-2"
                style={{ borderColor: v.color + '40' }}>
                <div className="text-4xl">{v.emoji}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: v.color }}>{t(`industriesIntro.verticals.${v.key}.tag`)}</div>
                <div className="font-bold text-sm text-foreground">{t(`industriesIntro.verticals.${v.key}.name`)}</div>
                <div className="text-xs text-muted-foreground leading-snug">{t(`industriesIntro.verticals.${v.key}.desc`)}</div>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{t('industriesIntro.commonThreadLabel')}</span>{t('industriesIntro.commonThreadBody')}
          </div>
          <KeyPointBar text={kp('s3-industries-intro')} className="mt-3" />
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* DeFi                                                        */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-defi-title" className="h-full"><FamilyDivider family="defi" /></div>

        {/* DeFi: recap → why → two rails + the bank unbundled; then what runs today, on its own slide */}
        <div id="s3-defi-intro" className="h-full">
          <DefiWhySlide recap={bridge('defi', '/blockchain-platforms/section-2', '#39B54A')} />
        </div>
        <div id="s3-defi-real" className="h-full"><DefiProductionSlide /></div>
        <div id="s3-defi-amm" className="h-full"><InteractiveAMM /></div>
        <div id="s3-defi-stablecoins" className="h-full"><PegSimulator /></div>
        <div id="s3-defi-prosCons" className="h-full"><WinsBreaksSlide family="defi" keyPoint={kp('s3-defi-prosCons')} /></div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Gaming & NFTs                                               */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-nft-title" className="h-full"><FamilyDivider family="nft" /></div>

        {/* NFTs: recap → why → database row vs token in your wallet */}
        <div id="s3-nft-intro" className="h-full">
          <NftWhySlide recap={bridge('nft', F3, '#ED1C24')} />
        </div>
        <div id="s3-nft-real" className="h-full">
          <RealWorldSlide
            heading={t('nftReal.heading')} subtitle={t('nftReal.subtitle')}
            columns={nftReal} colors={['#8b5cf6', '#22d3ee']}
            terms={['ERC-721', 'royalty (ERC-2981)', 'NFT collateral', 'liquidation']}
            keyPoint={kp('s3-nft-real')}
          />
        </div>
        <div id="s3-nft-utility" className="h-full"><NftUtilitySlide /></div>
        <div id="s3-nft-gate" className="h-full"><TokenGateDemo /></div>
        <div id="s3-nft-honest" className="h-full"><NftHonestSlide /></div>
        <div id="s3-nft-prosCons" className="h-full"><WinsBreaksSlide family="nft" keyPoint={kp('s3-nft-prosCons')} /></div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* DAOs                                                        */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-dao-title" className="h-full"><FamilyDivider family="dao" /></div>

        {/* DAOs: recap → why → one payment through a company and through a DAO */}
        <div id="s3-dao-intro" className="h-full">
          <DaoWhySlide recap={bridge('dao', F3, '#ED1C24')} />
        </div>
        <div id="s3-dao-structures" className="h-full"><GovernanceBlocksExplorer /></div>
        <div id="s3-dao-vote" className="h-full"><VotingPowerSim /></div>
        <div id="s3-dao-examples" className="h-full"><DaoExamplesSlide variant="works" /></div>
        <div id="s3-dao-broke" className="h-full"><DaoExamplesSlide variant="broke" /></div>
        <div id="s3-dao-prosCons" className="h-full"><WinsBreaksSlide family="dao" keyPoint={kp('s3-dao-prosCons')} /></div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Real-World Assets                                           */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-rwa-title" className="h-full"><FamilyDivider family="rwa" /></div>

        <div id="s3-rwa-spectrum" className="h-full">
          <RWASpectrum recap={bridge('rwa', '/smart-contracts/section-2', '#6366f1')} />
        </div>
        <div id="s3-rwa-real" className="h-full">
          <RealWorldSlide
            heading={t('rwaReal.heading')} subtitle={t('rwaReal.subtitle')} image={imgRwaProcess}
            columns={rwaReal} colors={['#39B54A', '#6366f1', '#8b5cf6']}
            terms={['transfer restrictions', 'whitelist', 'ERC-1400 / ERC-3643', 'on-chain KYC']}
            keyPoint={kp('s3-rwa-real')}
          />
        </div>
        <div id="s3-rwa-prosCons" className="h-full"><WinsBreaksSlide family="rwa" keyPoint={kp('s3-rwa-prosCons')} /></div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Supply Chain                                                */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-sc-title" className="h-full"><FamilyDivider family="sc" /></div>

        <div id="s3-sc-provenance" className="h-full">
          <ProvenanceQR recap={bridge('sc', F3, '#ED1C24')} />
        </div>
        <div id="s3-sc-real" className="h-full">
          <RealWorldSlide
            heading={t('scReal.heading')} subtitle={t('scReal.subtitle')} image={imgSupplyProv}
            columns={scReal} colors={['#f59e0b', '#39B54A', '#6366f1']}
            terms={['permissioned ledger', 'hash anchoring', 'IoT oracle', 'NFC / QR', 'eBL']}
            keyPoint={kp('s3-sc-real')}
          />
        </div>
        <div id="s3-sc-prosCons" className="h-full"><WinsBreaksSlide family="sc" keyPoint={kp('s3-sc-prosCons')} /></div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Digital Certification                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-cert-title" className="h-full"><FamilyDivider family="cert" /></div>

        <div id="s3-cert-howitworks" className="h-full">
          <ProofOfExistenceDemo recap={bridge('cert', '/blockchain-fundamentals/section-1', '#ED1C24')} />
        </div>
        <div id="s3-cert-real" className="h-full">
          <RealWorldSlide
            heading={t('certReal.heading')} subtitle={t('certReal.subtitle')} image={imgCertDecent} label="optional"
            columns={certReal} colors={['#22d3ee', '#8b5cf6', '#f59e0b']}
            terms={['hash chain', 'KSI', 'Merkle tree', 'timestamping', 'verifiable credential']}
            keyPoint={kp('s3-cert-real')}
          />
        </div>
        <div id="s3-cert-prosCons" className="h-full"><WinsBreaksSlide family="cert" keyPoint={kp('s3-cert-prosCons')} /></div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Case gallery + the one that was shut down                   */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-case-gallery" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <PageLabelRow kind="reference" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('caseGallery.heading')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('caseGallery.subtitle')}</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-5 gap-3">
            {cases.map((c, i) => {
              const m = CASE_META[i];
              return (
                <div key={c.name} className="flex flex-col rounded-2xl border-2 bg-card overflow-hidden min-h-0" style={{ borderColor: m.color + '50' }}>
                  <div className="h-1.5 shrink-0" style={{ backgroundColor: m.color }} />
                  <div className="flex-1 min-h-0 flex flex-col gap-2 p-3 overflow-y-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.emoji}</span>
                      <div className="min-w-0">
                        <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: m.color }}>{c.industry}</div>
                        <div className="font-black text-sm text-foreground leading-tight">{c.name}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#ED1C24]">{t('caseGallery.problemLabel')}</div>
                      <p className="text-xs text-muted-foreground leading-snug">{c.problem}</p>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#6366f1]">{t('caseGallery.solutionLabel')}</div>
                      <p className="text-xs text-foreground/90 leading-snug">{c.solution}</p>
                    </div>
                    <div className="mt-auto p-2 rounded-lg" style={{ backgroundColor: m.color + '14' }}>
                      <div className="font-mono font-black text-sm leading-tight" style={{ color: m.color }}>{c.metric}</div>
                      <div className="text-[10px] text-muted-foreground leading-snug">{c.metricLabel}</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground leading-snug"><span className="font-semibold text-foreground">{t('caseGallery.platformLabel')}: </span>{c.platform}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <KeyPointBar text={kp('s3-case-gallery')} className="mt-3" />
        </div>

        <div id="s3-tradelens" className="h-full"><TradeLensCase /></div>

        {/* ═══════ WRAP UP ═══════ */}
        <div id="s3-exercise" className="h-full"><DesignYourOwnExercise /></div>

        {/* Quiz — one slide, stepped question by question */}
        <div id="s3-quiz" className="h-full">
          <GroupedQuiz questions={quizQuestions} compact />
        </div>

        <div id="s3-takeaways" className="h-full">
          <TakeawaySlide title={t('takeaways.title')} takeaways={takeawayItems} />
        </div>


        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
