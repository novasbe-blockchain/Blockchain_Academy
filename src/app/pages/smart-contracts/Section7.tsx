import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { UnderTheHood } from '../../components/shared/UnderTheHood';
import { RecapHandoff } from '../../components/shared/RecapHandoff';
import { EyeOff } from 'lucide-react';

const NS = 'smart-contracts/section-7';

/* One arc: public chains leak → the ZK idea → what it does for a business →
   how privacy met the law → selective disclosure as the way through. */
const chapterShape = [
  { kind: 'group' as const, id: 'g-s7-problem' },
  { id: 's7-public' },

  { kind: 'group' as const, id: 'g-s7-idea' },
  { id: 's7-zk' },
  { id: 's7-waldo' },

  { kind: 'group' as const, id: 'g-s7-business' },
  { id: 's7-kyc' },
  { id: 's7-live' },

  { kind: 'group' as const, id: 'g-s7-law' },
  { id: 's7-approaches' },
  { id: 's7-tornado' },
  { id: 's7-disclosure' },

  { kind: 'group' as const, id: 'g-s7-wrap' },
  { id: 's7-quiz' },
  { id: 's7-takeaways' },
] as const;

/* ──────────── ZK bouncer demo — pick passport or proof, watch what leaks ──────────── */
function ZkBouncerDemo() {
  const { t } = useTranslation(NS);
  const [mode, setMode] = useState<'idle' | 'passport' | 'proof'>('idle');
  const leaked = t('zkp.demo.leaked', { returnObjects: true }) as string[];
  const accent = mode === 'passport' ? '#ef4444' : mode === 'proof' ? '#39B54A' : '#8b5cf6';
  const optionCls = (active: boolean) =>
    `text-left rounded-xl border-2 px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md font-bold text-sm text-foreground ${active ? 'shadow-md' : ''}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-0">
      {/* You */}
      <div className="rounded-xl border-2 p-4 flex flex-col gap-3 min-h-0" style={{ borderColor: '#8b5cf655', backgroundColor: '#8b5cf608' }}>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-3xl">🧍</span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6]">{t('zkp.demo.youLabel')}</p>
            <p className="text-sm text-muted-foreground">{t('zkp.demo.pick')}</p>
          </div>
        </div>
        <button
          onClick={() => setMode('passport')}
          className={optionCls(mode === 'passport')}
          style={{ borderColor: mode === 'passport' ? '#ef4444' : '#ef444455', backgroundColor: mode === 'passport' ? '#ef444414' : 'var(--card)' }}
        >{t('zkp.demo.passportBtn')}</button>
        <button
          onClick={() => setMode('proof')}
          className={optionCls(mode === 'proof')}
          style={{ borderColor: mode === 'proof' ? '#39B54A' : '#39B54A55', backgroundColor: mode === 'proof' ? '#39B54A14' : 'var(--card)' }}
        >{t('zkp.demo.proofBtn')}</button>
      </div>

      {/* Bouncer */}
      <div className="rounded-xl border-2 p-4 flex flex-col gap-3 min-h-0 transition-colors" style={{ borderColor: accent + '66', backgroundColor: accent + '0a' }}>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-3xl">🕴️</span>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>{t('zkp.demo.bouncerLabel')}</p>
        </div>
        {mode === 'idle' ? (
          <p className="text-sm text-muted-foreground italic">{t('zkp.demo.idle')}</p>
        ) : (
          <>
            <motion.div
              key={`verdict-${mode}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="shrink-0 rounded-lg border-2 px-3 py-2 text-sm font-black"
              style={{ borderColor: '#39B54A', backgroundColor: '#39B54A14', color: '#39B54A' }}
            >{t('zkp.demo.verdict')}</motion.div>
            <div className="flex flex-wrap gap-1.5">
              {leaked.map((f, i) => (
                <motion.span
                  key={`${mode}-${f}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className={`text-xs px-2 py-1 rounded-md border ${mode === 'proof' ? 'line-through text-muted-foreground/60 border-dashed border-border' : 'font-semibold'}`}
                  style={mode === 'passport' ? { borderColor: '#ef444480', backgroundColor: '#ef444414', color: '#ef4444' } : undefined}
                >{mode === 'passport' ? f : `${f} ${t('zkp.demo.hidden')}`}</motion.span>
              ))}
            </div>
            <p className="mt-auto text-xs font-black" style={{ color: accent }}>
              {mode === 'passport' ? t('zkp.demo.leakedCountPassport') : t('zkp.demo.leakedCountProof')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────── Where's Waldo — one scene per step ────────────
   0: a crowded page, Waldo lost in it · 1: an opaque sheet with one hole over him ·
   2: same sheet, verifier convinced, location still unknown. */
const WALDO = { x: 132, y: 58 };
const CROWD = Array.from({ length: 72 }, (_, i) => {
  const col = i % 12, row = Math.floor(i / 12);
  return { x: 16 + col * 15.4 + ((i * 7) % 5) - 2, y: 18 + row * 16.5 + ((i * 11) % 5) - 2, tone: i % 3 };
});

function WaldoScene({ stage, pageLabel, sheetLabel }: { stage: 0 | 1 | 2; pageLabel: string; sheetLabel: string }) {
  const covered = stage > 0;
  const maskId = `waldo-hole-${stage}`;
  return (
    <svg viewBox="0 0 200 124" className="w-full h-full" role="img" aria-label={covered ? sheetLabel : pageLabel}>
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="200" height="124" fill="#fff" />
          <circle cx={WALDO.x} cy={WALDO.y} r="11" fill="#000" />
        </mask>
      </defs>
      {/* The page */}
      <rect x="6" y="6" width="188" height="104" rx="6" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      {CROWD.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4.2" fill="var(--muted-foreground)" fillOpacity={[0.28, 0.42, 0.56][p.tone]} />
      ))}
      {/* Waldo — red and white stripes */}
      <g>
        <circle cx={WALDO.x} cy={WALDO.y} r="6.5" fill="#fff" stroke="#ED1C24" strokeWidth="1.2" />
        <rect x={WALDO.x - 6} y={WALDO.y - 3.4} width="12" height="2.2" fill="#ED1C24" />
        <rect x={WALDO.x - 6} y={WALDO.y + 1.2} width="12" height="2.2" fill="#ED1C24" />
      </g>
      {/* The opaque sheet with one hole */}
      {covered && (
        <>
          <rect x="2" y="2" width="196" height="112" rx="7" fill="#312e81" mask={`url(#${maskId})`} />
          <circle cx={WALDO.x} cy={WALDO.y} r="11" fill="none" stroke="#22d3ee" strokeWidth="2" />
          {stage === 2 && (
            <g>
              <circle cx="34" cy="34" r="15" fill="#39B54A" />
              <path d="M26 34.5l5.5 5.5 10-11" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              <text x="70" y="96" fontSize="22" fontWeight="900" fill="#fff" fillOpacity="0.35">?</text>
              <text x="160" y="40" fontSize="22" fontWeight="900" fill="#fff" fillOpacity="0.35">?</text>
            </g>
          )}
        </>
      )}
      <text x="100" y="121" textAnchor="middle" fontSize="7.5" fontWeight="800" letterSpacing="1" fill="var(--muted-foreground)">
        {(covered ? sheetLabel : pageLabel).toUpperCase()}
      </text>
    </svg>
  );
}

export function SC_Section7() {
  const { t } = useTranslation(NS);

  const chapters = useMemo(
    () =>
      chapterShape.map((c) =>
        'kind' in c
          ? { kind: 'group' as const, id: c.id, label: t(`groups.${c.id}`) }
          : { id: c.id, label: t(`chapters.${c.id}`) }
      ),
    [t]
  );

  const hoodLabel = t('ui.hood');
  const recapLabel = t('ui.recap');
  const keyLabel = t('ui.keyPoint');
  const kp = (id: string, color = '#8b5cf6') => <KeyPointBar label={keyLabel} text={t(`keyPoints.${id}`)} color={color} className="mt-3" />;

  // ── Array data resolved via t() ──
  const privacyTrace = t('privacy.trace', { returnObjects: true }) as { who: string; note: string }[];
  const privacyBusiness = t('privacy.business', { returnObjects: true }) as string[];
  const zkMore = t('zkp.more', { returnObjects: true }) as { icon: string; text: string }[];
  const waldoSteps = t('zkpCave.steps', { returnObjects: true }) as { title: string; text: string }[];
  const kycActors = t('zkIdentity.actors', { returnObjects: true }) as string[];
  const kycSteps = t('zkIdentity.steps', { returnObjects: true }) as { label: string; desc: string }[];
  const kycBusiness = t('zkIdentity.business', { returnObjects: true }) as string[];
  const zkProps = t('zkApps.props', { returnObjects: true }) as { t: string; d: string }[];
  const zkItems = t('zkApps.items', { returnObjects: true }) as { name: string; who: string; does: string; since: string }[];
  const approaches = t('privacyApproaches.items', { returnObjects: true }) as { name: string; sub: string; mech: string; trade: string }[];
  const story = t('privacyRegulation.story', { returnObjects: true }) as { yr: string; t: string; d: string }[];
  const unlocks = t('privacyFuture.items', { returnObjects: true }) as { title: string; d: string }[];
  const quizOptions = t('quiz.options', { returnObjects: true }) as string[];
  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

  // ── Static visual data, paired with the translated arrays by index ──
  const traceIcons = ['🏦', '👛', '🏠', '❤️'];
  const kycMeta = [
    { icon: '🏦', color: '#6366f1' },
    { icon: '👛', color: '#8b5cf6' },
    { icon: '🖥️', color: '#39B54A' },
  ];
  const zkPropMeta = [
    { emoji: '✅', color: '#39B54A' },
    { emoji: '🔒', color: '#ED1C24' },
    { emoji: '🙈', color: '#8b5cf6' },
  ];
  const zkItemMeta = [
    { icon: '🛡️', color: '#f59e0b' },
    { icon: '🏦', color: '#6366f1' },
    { icon: '🧑', color: '#10b981' },
    { icon: '✅', color: '#f97316' },
    { icon: '🗳️', color: '#39B54A' },
    { icon: '🌐', color: '#06b6d4' },
  ];
  const approachMeta = [
    { icon: '🛡️', color: '#f59e0b' },
    { icon: '👁️‍🗨️', color: '#ef4444' },
    { icon: '🧬', color: '#10b981' },
    { icon: '🔀', color: '#6b7280' },
  ];
  const storyColors = ['#6366f1', '#ef4444', '#f59e0b', '#39B54A', '#8b5cf6'];
  const unlockMeta = [
    { icon: '🏦', color: '#6366f1' },
    { icon: '🪪', color: '#10b981' },
    { icon: '📊', color: '#f59e0b' },
    { icon: '🤖', color: '#ec4899' },
  ];

  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber={t('title.sectionNumber')}
            title={t('title.title')}
            subtitle={t('title.subtitle')}
            icon={<EyeOff className="size-20 text-[#8b5cf6]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ S7-PUBLIC — the problem: a public chain is not private ═══════ */}
        <div id="s7-public" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('privacy.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('privacy.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left — what a normal vs shielded transaction exposes */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex-1 rounded-xl border-2 p-4 flex flex-col justify-center" style={{ borderColor: '#ef444450', backgroundColor: '#ef44440a' }}>
                <p className="text-xs font-black uppercase tracking-widest text-[#ef4444] mb-2">{t('privacy.normalLabel')}</p>
                <div className="font-mono text-sm text-foreground space-y-0.5">
                  <div>from <span className="text-[#ef4444]">0xA1b2…</span></div>
                  <div>to&nbsp;&nbsp; <span className="text-[#ef4444]">0xC3d4…</span></div>
                  <div>value <span className="text-[#ef4444]">12.5 ETH</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{t('privacy.normalCaption')}</p>
              </div>
              <div className="flex-1 rounded-xl border-2 p-4 flex flex-col justify-center" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0a' }}>
                <p className="text-xs font-black uppercase tracking-widest text-[#39B54A] mb-2">{t('privacy.shieldedLabel')}</p>
                <div className="font-mono text-sm text-foreground space-y-0.5">
                  <div>from <span className="text-[#39B54A]">••••••</span></div>
                  <div>to&nbsp;&nbsp; <span className="text-[#39B54A]">••••••</span></div>
                  <div>value <span className="text-[#39B54A]">••••••</span> <span className="text-[#39B54A]">{t('privacy.shieldedProof')}</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{t('privacy.shieldedCaption')}</p>
              </div>
            </div>

            {/* Right — the trail, and why a business cares */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex-1 rounded-xl border border-border bg-card p-4 flex flex-col">
                <p className="text-xs font-black uppercase tracking-widest text-[#8b5cf6] mb-2">{t('privacy.traceLabel')}</p>
                <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-1.5">
                  {privacyTrace.map((n, i) => (
                    <div key={n.who} className="flex-1 flex items-center gap-1.5 min-w-0">
                      <div className="flex-1 self-stretch rounded-lg border px-2.5 py-2 min-w-0 flex flex-col justify-center" style={{ borderColor: i === 0 ? '#ef444480' : '#8b5cf640', backgroundColor: i === 0 ? '#ef44440d' : 'transparent' }}>
                        <div className="text-xl leading-none">{traceIcons[i % traceIcons.length]}</div>
                        <div className="text-xs font-bold text-foreground leading-tight mt-1.5">{n.who}</div>
                        <div className="text-[11px] text-muted-foreground leading-snug">{n.note}</div>
                      </div>
                      {i < privacyTrace.length - 1 && <span className="hidden lg:block text-muted-foreground shrink-0">→</span>}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-snug">{t('privacy.traceCaption')}</p>
              </div>
              <div className="shrink-0 rounded-xl border p-4" style={{ borderColor: '#f59e0b50', backgroundColor: '#f59e0b0a' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b] mb-1.5">{t('privacy.businessLabel')}</p>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                  {privacyBusiness.map((b) => (
                    <li key={b} className="text-sm text-foreground leading-snug flex gap-1.5"><span className="text-[#f59e0b]">•</span>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* The way out — hands over to the ZK idea */}
          <div className="shrink-0 mt-4 rounded-xl border-2 p-3.5 flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-4" style={{ borderColor: '#8b5cf680', backgroundColor: '#8b5cf60d' }}>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6] shrink-0">{t('privacy.trickLabel')}</span>
            <p className="text-sm text-foreground leading-snug">
              {t('privacy.trickA')}<span className="font-semibold text-[#8b5cf6]">{t('privacy.trickStrong1')}</span>{t('privacy.trickB')}<span className="font-semibold">{t('privacy.trickStrong2')}</span>{t('privacy.trickC')}<span className="font-semibold">{t('privacy.trickStrong3')}</span>{t('privacy.trickD')}<span className="font-semibold">{t('privacy.trickStrong4')}</span>{t('privacy.trickE')}{' '}
              <span className="text-muted-foreground">{t('privacy.trickCaption')}</span>
            </p>
          </div>
          {kp('s7-public')}
        </div>

        {/* ═══════ S7-ZK — the one idea ═══════ */}
        <div id="s7-zk" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkp.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('zkp.subtitle')}</p>
          </div>

          <div className="shrink-0 mb-5 rounded-2xl border-2 p-5 text-center" style={{ borderColor: '#8b5cf680', backgroundColor: '#8b5cf60d' }}>
            <p className="text-lg lg:text-xl font-semibold text-foreground leading-snug">
              {t('zkp.oneLinerA')}<span style={{ color: '#8b5cf6' }}>{t('zkp.oneLinerB')}</span>
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            <div className="shrink-0 flex items-center gap-2.5">
              <span className="text-3xl">🍺</span>
              <div>
                <p className="font-bold text-foreground text-lg">{t('zkp.exampleTitle')} <span className="ml-1 px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#8b5cf6] text-[10px] font-bold align-middle">{t('zkp.demo.badge')}</span></p>
                <p className="text-sm text-muted-foreground">{t('zkp.exampleSubtitle')}</p>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ZkBouncerDemo />
            </div>
          </div>

          {/* Same trick, other doors */}
          <div className="shrink-0 mt-4 flex flex-col lg:flex-row gap-3 lg:items-stretch">
            <div className="flex-1 rounded-xl border border-border bg-card p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{t('zkp.moreLabel')}</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {zkMore.map((m) => (
                  <div key={m.text} className="flex gap-2 items-start text-xs text-foreground leading-snug">
                    <span className="text-base leading-none shrink-0">{m.icon}</span>
                    <span>{m.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <UnderTheHood label={hoodLabel} terms={['prover', 'verifier', 'statement', 'witness']} className="self-start lg:self-center" />
          </div>
          {kp('s7-zk')}
        </div>

        {/* ═══════ S7-WALDO — the same idea, visually ═══════ */}
        <div id="s7-waldo" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkpCave.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('zkpCave.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {waldoSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex flex-col gap-3 rounded-xl border-2 p-4 min-h-0"
                style={{ borderColor: '#22d3ee45', backgroundColor: '#22d3ee0a' }}
              >
                <div className="flex-1 min-h-[110px]">
                  <WaldoScene stage={i as 0 | 1 | 2} pageLabel={t('zkpCave.pageLabel')} sheetLabel={t('zkpCave.sheetLabel')} />
                </div>
                <div className="shrink-0 flex items-center gap-2.5">
                  <div className="size-8 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" style={{ backgroundColor: '#0891b2' }}>{i + 1}</div>
                  <p className="font-bold text-foreground text-lg leading-tight">{s.title}</p>
                </div>
                <p className="shrink-0 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="rounded-xl border p-3.5" style={{ borderColor: '#22d3ee40', backgroundColor: '#22d3ee0d' }}>
              <p className="text-sm text-foreground leading-snug"><span className="font-bold text-[#0891b2]">{t('zkpCave.punchlineLabel')}</span>{t('zkpCave.punchlineA')}<span className="font-semibold">{t('zkpCave.punchlineStrong')}</span>{t('zkpCave.punchlineB')}</p>
            </div>
            <div className="rounded-xl border p-3.5" style={{ borderColor: '#6366f140', backgroundColor: '#6366f10d' }}>
              <p className="text-sm text-foreground leading-snug"><span className="font-bold text-[#6366f1]">{t('zkpCave.classicLabel')}</span>{t('zkpCave.classicBody')}</p>
            </div>
          </div>
          {kp('s7-waldo', '#0891b2')}
        </div>

        {/* ═══════ S7-KYC — KYC without handing over identity ═══════ */}
        <div id="s7-kyc" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkIdentity.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('zkIdentity.subtitle')}</p>
          </div>

          {/* Three actors, three steps */}
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-stretch gap-2">
            {kycSteps.map((s, i) => {
              const { icon, color } = kycMeta[i % kycMeta.length];
              return (
                <div key={i} className="flex-1 flex items-center gap-2 min-h-0">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex-1 self-stretch rounded-xl border-2 bg-card p-5 flex flex-col justify-center gap-2.5"
                    style={{ borderColor: color + '70' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-4xl leading-none">{icon}</span>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{i + 1} · {kycActors[i]}</p>
                        <p className="text-lg font-bold text-foreground leading-tight">{s.label}</p>
                      </div>
                    </div>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                  </motion.div>
                  {i < kycSteps.length - 1 && <span className="hidden lg:block text-2xl text-muted-foreground shrink-0">→</span>}
                </div>
              );
            })}
          </div>

          <div className="shrink-0 mt-4 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-3">
            <div className="rounded-xl border p-3.5" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0a' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#39B54A] mb-1.5">{t('zkIdentity.businessLabel')}</p>
              <ul className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {kycBusiness.map((b) => (
                  <li key={b} className="text-xs text-foreground leading-snug flex gap-1.5"><span className="text-[#39B54A]">✓</span>{b}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <p className="text-xs text-muted-foreground italic leading-snug">
                {t('zkIdentity.footA')}<span className="font-medium text-foreground">{t('zkIdentity.footStrong')}</span>{t('zkIdentity.footB')}
              </p>
              <UnderTheHood label={hoodLabel} terms={['verifiable credential', 'selective disclosure', 'issuer signature']} className="self-start" />
            </div>
          </div>
          {kp('s7-kyc')}
        </div>

        {/* ═══════ S7-LIVE — ZK in production ═══════ */}
        <div id="s7-live" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('zkApps.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{t('zkApps.subtitle')}</p>
          </div>

          {/* Three promises — plain words */}
          <div className="shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-2 mb-3">
            {zkProps.map((p, i) => (
              <div key={p.t} className="flex gap-2.5 items-center rounded-lg border px-3 py-2 bg-card" style={{ borderColor: zkPropMeta[i].color + '50' }}>
                <span className="text-xl shrink-0 leading-none">{zkPropMeta[i].emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-black leading-tight" style={{ color: zkPropMeta[i].color }}>{p.t}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{p.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Six live products — 3×2 */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 auto-rows-fr gap-3">
            {zkItems.map((u, i) => {
              const { icon, color } = zkItemMeta[i % zkItemMeta.length];
              return (
                <motion.div
                  key={u.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="rounded-xl border-2 p-4 bg-card flex flex-col gap-2 min-h-0"
                  style={{ borderColor: color + '55' }}
                >
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-2xl leading-none">{icon}</span>
                    <div className="min-w-0">
                      <p className="font-black text-base leading-tight" style={{ color }}>{u.name}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight truncate">{u.who}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-snug flex-1"><span className="font-black text-[9px] uppercase tracking-widest mr-1" style={{ color }}>{t('zkApps.doesLabel')}</span>{u.does}</p>
                  <p className="text-[11px] font-semibold shrink-0" style={{ color }}>{u.since}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="shrink-0 mt-3">
            <UnderTheHood label={hoodLabel} terms={['SNARK', 'STARK', 'trusted setup', 'prover cost']} />
          </div>
          {kp('s7-live')}
        </div>

        {/* ═══════ S7-APPROACHES — four ways to get privacy on-chain ═══════ */}
        <div id="s7-approaches" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('privacyApproaches.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('privacyApproaches.subtitle')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {approaches.map((p, i) => {
              const { icon, color } = approachMeta[i % approachMeta.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2.5 rounded-xl border-2 p-4 justify-center"
                  style={{ borderColor: color + '50', backgroundColor: color + '0a' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{icon}</span>
                    <div>
                      <div className="font-black text-lg" style={{ color }}>{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.sub}</div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed"><span className="font-semibold" style={{ color }}>{t('privacyApproaches.howLabel')}</span>{p.mech}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed"><span className="font-semibold">{t('privacyApproaches.tradeLabel')}</span>{p.trade}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="shrink-0 mt-3">
            <UnderTheHood label={hoodLabel} terms={['zk-SNARK', 'ring signature', 'stealth address', 'anonymity set']} />
          </div>
          {kp('s7-approaches')}
        </div>

        {/* ═══════ S7-TORNADO — when privacy code met the law ═══════ */}
        <div id="s7-tornado" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('privacyRegulation.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('privacyRegulation.subtitle')}</p>
            <div className="mt-2">
              <RecapHandoff label={recapLabel} text={t('privacyRegulation.recapFreedom')} to="/blockchain-fundamentals/prologue" color="#ED1C24" />
            </div>
          </div>

          {/* Timeline — five beats */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-5 gap-2.5">
            {story.map((s, i) => {
              const c = storyColors[i % storyColors.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex flex-col gap-1.5 rounded-xl border-2 p-3 min-h-0"
                  style={{ borderColor: c + '55', backgroundColor: c + '0a' }}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: c }}>{s.yr}</span>
                  <p className="font-bold text-foreground text-base leading-tight">{s.t}</p>
                  <p className="text-sm text-muted-foreground leading-snug flex-1">{s.d}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Two truths + the cypherpunk tie-back */}
          <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="rounded-xl border-2 p-3 flex flex-col gap-1" style={{ borderColor: '#ef444450', backgroundColor: '#ef44440a' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ef4444]">{t('privacyRegulation.truthsLabel')} · 1</p>
              <p className="text-xs text-foreground leading-snug">{t('privacyRegulation.truthA')}</p>
            </div>
            <div className="rounded-xl border-2 p-3 flex flex-col gap-1" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0a' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#39B54A]">{t('privacyRegulation.truthsLabel')} · 2</p>
              <p className="text-xs text-foreground leading-snug">{t('privacyRegulation.truthB')}</p>
            </div>
            <div className="rounded-xl border-2 p-3 flex flex-col gap-1" style={{ borderColor: '#ED1C2460', backgroundColor: '#ED1C240a' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ED1C24]">{t('privacyRegulation.cypherpunkLabel')}</p>
              <p className="text-xs text-foreground leading-snug">{t('privacyRegulation.cypherpunk')}</p>
            </div>
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0d' }}>
            <p className="text-xs text-foreground leading-snug">
              <span className="font-bold text-[#39B54A]">{t('privacyRegulation.guidanceLabel')}</span>
              {t('privacyRegulation.guidanceA')}<span className="font-semibold">{t('privacyRegulation.guidanceStrong1')}</span>{t('privacyRegulation.guidanceB')}<span className="font-semibold">{t('privacyRegulation.guidanceStrong2')}</span>{t('privacyRegulation.guidanceC')}
            </p>
          </div>
          {kp('s7-tornado', '#f59e0b')}
        </div>

        {/* ═══════ S7-DISCLOSURE — what this unlocks for business ═══════ */}
        <div id="s7-disclosure" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('privacyFuture.heading')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('privacyFuture.subtitleA')}<span className="font-semibold">{t('privacyFuture.subtitleStrong')}</span>{t('privacyFuture.subtitleB')}</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {unlocks.map((c, i) => {
              const { icon, color } = unlockMeta[i % unlockMeta.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 items-start rounded-xl border-2 p-5 justify-center flex-col"
                  style={{ borderColor: color + '50', backgroundColor: color + '0a' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{icon}</span>
                    <p className="font-black text-lg" style={{ color }}>{c.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="shrink-0 mt-4 rounded-xl border-2 p-4 text-center" style={{ borderColor: '#8b5cf680', backgroundColor: '#8b5cf60d' }}>
            <p className="text-base text-foreground leading-snug">
              {t('privacyFuture.bannerA')}<span className="font-semibold">{t('privacyFuture.bannerStrong1')}</span>{t('privacyFuture.bannerB')}<span className="font-semibold text-[#8b5cf6]">{t('privacyFuture.bannerStrong2')}</span>{t('privacyFuture.bannerC')}
            </p>
          </div>
          {kp('s7-disclosure')}
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s7-quiz" className="h-full">
          <QuizSlide
            question={t('quiz.question')}
            options={quizOptions.map((text, i) => ({ text, correct: i === 1 }))}
            explanation={t('quiz.explanation')}
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s7-takeaways" className="h-full">
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
