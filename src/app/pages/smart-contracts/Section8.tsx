import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { KeywordText } from '../../components/shared/KeywordText';
import { FirstTransactionWizard } from '../../components/first-tx/FirstTransactionWizard';
import { RegistryBoard } from '../../components/first-tx/RegistryBoard';
import { CHAIN, CONTRACT_ADDRESS, CONTRACT_READY, explorerAddressUrl } from '../../components/first-tx/config';
import {
  ETHERSCAN_ADDRESS, REAL_CONTRACTS, PRACTICE_CONTRACT, PRACTICE_CODE_LINES, shortAddress,
} from '../../data/realContracts';
import {
  Rocket, ClipboardList, Send, Search, Wallet, ArrowDown, ChevronRight, ExternalLink, Check,
  FileCode2, Eye, ShieldAlert, BadgeCheck, FlaskConical, MessageCircle, TriangleAlert, ListChecks,
} from 'lucide-react';

const NS = 'smart-contracts/section-8';

// Language-neutral shape — IDs + kind only. Labels come from t() at render time.
// The three groups are the section's arc: the assignment → do it → optional exploring.
const chapterShape = [
  { kind: 'group' as const, id: 'g-assignment' },
  { id: 's8-brief' },

  { kind: 'group' as const, id: 'g-do' },
  { id: 's8-first-tx' },
  { id: 's8-board' },

  { kind: 'group' as const, id: 'g-optional' },
  { id: 's8-explore' },
] as const;

const INDIGO = '#6366f1';
const VIOLET = '#8b5cf6';
const SKY = '#0ea5e9';
const GREEN = '#39B54A';
const AMBER = '#f59e0b';
const RED = '#ef4444';

// The arc: the assignment, doing it (the wizard, then the board that checks the result), the optional extra.
// `key` indexes `arc.*` in the locale files.
const ARC = [
  { key: 'assignment', id: 's8-brief',    Icon: ClipboardList, color: INDIGO },
  { key: 'do',         id: 's8-first-tx', Icon: Send,          color: GREEN },
  { key: 'optional',   id: 's8-explore',  Icon: Search,        color: SKY },
] as const;

// The whole assignment, in three steps. Same order as `brief.steps` in the locale files.
// Colours mirror the wizard's rail: set-up steps are indigo, the send step amber, the proof green.
const STEP_META = [
  { Icon: Wallet,     color: INDIGO },
  { Icon: Send,       color: AMBER },
  { Icon: BadgeCheck, color: GREEN },
];

// The contract · privacy · safety, in the order of `brief.notes`.
const NOTE_META = [
  { Icon: FileCode2,   color: INDIGO },
  { Icon: Eye,         color: AMBER },
  { Icon: ShieldAlert, color: RED },
];

// Explore: four questions to ask of any real contract (`explore.questions`).
const QUESTION_COLORS = [INDIGO, GREEN, AMBER, RED];
// Colours for the annotated lines of the practice contract: state · open function · event.
const CODE_PART_COLORS = [INDIGO, GREEN, VIOLET];

interface LabelDesc { label: string; desc: string }
interface StepCopy { tag: string; title: string; where: string; lead: string; items: string[]; result: string }
interface ContractCopy { look: string }

function scrollToSlide(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Shared bits ─────────────────────────────────────────────────────────────

/** assignment → do it → optional, with the current stop filled in. Each stop jumps to its slide. */
function ArcPills({ active }: { active: number }) {
  const { t } = useTranslation(NS);
  return (
    <div className="flex items-center gap-1" aria-label={t('arc.label')}>
      {ARC.map((a, i) => {
        const on = i === active;
        return (
          <span key={a.id} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3.5 text-muted-foreground" />}
            <button
              type="button"
              onClick={() => scrollToSlide(a.id)}
              aria-current={on ? 'step' : undefined}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer hover:opacity-80"
              style={{
                borderColor: on ? a.color : a.color + '55',
                backgroundColor: on ? a.color : 'transparent',
                color: on ? 'white' : a.color,
              }}
            >
              <a.Icon className="size-3.5" />{t(`arc.${a.key}`)}
            </button>
          </span>
        );
      })}
    </div>
  );
}

function SlideHeader({ kicker, heading, subtitle, active, color, icon, badge }: {
  kicker: string; heading: string; subtitle: string; active: number; color: string; icon?: ReactNode; badge?: string;
}) {
  return (
    <div className="shrink-0 mb-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color }}>{icon}{kicker}</span>
          {badge && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-dashed whitespace-nowrap" style={{ color, borderColor: color, backgroundColor: color + '14' }}>{badge}</span>
          )}
        </span>
        <ArcPills active={active} />
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1.5">{heading}</h2>
      <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{subtitle}</p>
    </div>
  );
}

// ─── Slide 1 · THE ASSIGNMENT: three steps, one transaction ──────────────────

function BriefSlide() {
  const { t } = useTranslation(NS);
  const steps = t('brief.steps', { returnObjects: true }) as StepCopy[];
  const notes = t('brief.notes', { returnObjects: true }) as string[];

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader
        kicker={t('brief.kicker')} heading={t('brief.heading')} subtitle={t('brief.subtitle')}
        active={0} color={INDIGO} icon={<ClipboardList className="size-4" />}
      />

      {/* Set up → Register → Verify */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
        {steps.map((s, i) => {
          const m = STEP_META[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}
              className="relative min-h-0 rounded-2xl border-2 bg-card p-4 lg:p-5 flex flex-col gap-3" style={{ borderColor: m.color + '77' }}
            >
              {/* The arrow into the next step */}
              {i > 0 && (
                <span className="hidden lg:flex absolute -left-[19px] top-7 size-6 rounded-full border border-border bg-background items-center justify-center z-10">
                  <ChevronRight className="size-4 text-muted-foreground" />
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: m.color }}>
                  <m.Icon className="size-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: m.color }}>{s.tag}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: m.color + '1f', color: m.color }}>{s.where}</span>
                  </div>
                  <div className="font-black text-xl text-foreground leading-tight">{s.title}</div>
                </div>
              </div>
              <p className="text-[15px] font-semibold text-foreground leading-snug"><KeywordText text={s.lead} /></p>
              <ol className="flex-1 min-h-0 flex flex-col gap-2">
                {s.items.map((item, ii) => (
                  <li key={ii} className="flex-1 min-h-0 flex items-center gap-3 px-3 py-1.5 rounded-xl border border-border bg-muted/30 text-sm text-foreground leading-snug">
                    <span className="shrink-0 size-6 rounded-full text-xs font-black flex items-center justify-center" style={{ backgroundColor: m.color + '22', color: m.color }}>{ii + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <div className="shrink-0 flex items-start gap-2 rounded-xl px-3 py-2" style={{ backgroundColor: m.color + '12' }}>
                <Check className="size-4 shrink-0 mt-0.5" style={{ color: m.color }} strokeWidth={3} />
                <p className="text-xs text-foreground leading-snug">
                  <span className="font-black" style={{ color: m.color }}>{t('brief.resultLabel')}</span>{s.result}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Where to do it, and what is optional */}
      <div className="shrink-0 mt-3 flex items-center justify-center gap-x-4 gap-y-2 flex-wrap">
        <button
          type="button"
          onClick={() => scrollToSlide('s8-first-tx')}
          className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer hover:opacity-90"
          style={{ backgroundColor: GREEN }}
        >
          {t('brief.cta')}<ArrowDown className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollToSlide('s8-explore')}
          className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors cursor-pointer hover:text-foreground"
        >
          <Search className="size-3.5" />{t('brief.optional')}
        </button>
      </div>

      {/* The contract · privacy · safety. lg:pr-20 keeps the last one clear of the floating slide-nav buttons */}
      <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-3 gap-2 lg:pr-20">
        {notes.map((n, i) => {
          const m = NOTE_META[i];
          return (
            <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-xl border" style={{ borderColor: m.color + '55', backgroundColor: m.color + '0d' }}>
              <m.Icon className="size-4 shrink-0 mt-0.5" style={{ color: m.color }} />
              <p className="text-xs text-foreground leading-snug">
                {n}
                {/* Once the Academy's contract is deployed, the first note links to it */}
                {i === 0 && CONTRACT_READY && (
                  <>
                    {' '}
                    <a
                      href={explorerAddressUrl(CONTRACT_ADDRESS)} title={CONTRACT_ADDRESS} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono font-bold whitespace-nowrap hover:opacity-75 transition-opacity" style={{ color: m.color }}
                    >
                      {shortAddress(CONTRACT_ADDRESS)}<ExternalLink className="size-3" />
                    </a>
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Slide 3 · CHECK: every registered hash, read live, plus a student-number lookup ──

function BoardSlide() {
  const { t } = useTranslation(NS);
  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader
        kicker={t('board.kicker')} heading={t('board.heading')} subtitle={t('board.subtitle')}
        active={1} color={GREEN} icon={<ListChecks className="size-4" />} badge={t('board.badge')}
      />
      <RegistryBoard />
      <KeyPointBar text={t('keyPoints.s8-board')} className="mt-3" />
    </div>
  );
}

// ─── Slide 4 · OPTIONAL: read real contracts, then poke a live one ───────────

function LinkPill({ href, color, title, children }: { href: string; color: string; title?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap hover:opacity-75 transition-opacity"
      style={{ backgroundColor: color + '1f', color }}
    >
      {children}<ExternalLink className="size-3" />
    </a>
  );
}

function ExploreSlide() {
  const { t } = useTranslation(NS);
  const contractCopy = t('explore.read.contracts', { returnObjects: true }) as Record<string, ContractCopy>;
  const questions = t('explore.questions', { returnObjects: true }) as LabelDesc[];
  const pokeSteps = t('explore.poke.steps', { returnObjects: true }) as string[];
  const legend = t('explore.poke.legend', { returnObjects: true }) as string[];
  const practiceUrl = explorerAddressUrl(PRACTICE_CONTRACT.address);

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader
        kicker={t('explore.kicker')} heading={t('explore.heading')} subtitle={t('explore.subtitle')}
        active={2} color={SKY} icon={<Search className="size-4" />} badge={t('explore.badge')}
      />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-3">
        <div className="min-h-0 flex flex-col gap-3 min-w-0">
          {/* Read: contracts that hold real money, opened live on Etherscan */}
          <div className="shrink-0 rounded-2xl border-2 bg-card p-3 flex flex-col gap-2" style={{ borderColor: SKY + '77' }}>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color: SKY }}>
                <BadgeCheck className="size-4 shrink-0" style={{ color: GREEN }} />{t('explore.read.label')}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white whitespace-nowrap" style={{ backgroundColor: SKY }}>{t('explore.read.badge')}</span>
            </div>
            {REAL_CONTRACTS.map(c => {
              const code = c.links.find(l => l.label === 'code') ?? { address: c.address, tab: 'code' };
              // USDC is a proxy, so its state is read through "Read as Proxy"; the others have a plain Read tab.
              const read = c.links.find(l => l.label === 'readProxy') ?? { address: c.address, tab: 'readContract' };
              return (
                <div key={c.id} className="rounded-xl border border-border bg-muted/30 px-3 py-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm text-foreground">{c.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap" title={c.address}>{shortAddress(c.address)}</span>
                    <span className="ml-auto flex items-center gap-1.5">
                      <LinkPill href={`${ETHERSCAN_ADDRESS}${code.address}#${code.tab}`} title={code.address} color={SKY}>{t('explore.read.code')}</LinkPill>
                      <LinkPill href={`${ETHERSCAN_ADDRESS}${read.address}#${read.tab}`} title={read.address} color={SKY}>{t('explore.read.readTab')}</LinkPill>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug mt-1">{contractCopy[c.id].look}</p>
                </div>
              );
            })}
          </div>

          {/* Talk it through: four questions to ask of any real contract */}
          <div className="flex-1 min-h-0 rounded-2xl border border-border bg-card/50 p-3 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-muted-foreground">
              <MessageCircle className="size-4" style={{ color: INDIGO }} />{t('explore.questionsLabel')}
            </div>
            <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {questions.map((q, i) => {
                const color = QUESTION_COLORS[i];
                return (
                  <div key={i} className="flex items-start gap-2.5 px-3 py-1.5 rounded-xl border-l-4 bg-muted/30" style={{ borderColor: color }}>
                    <span className="size-6 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-white" style={{ backgroundColor: color }}>{i + 1}</span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{q.label}</div>
                      <p className="text-[13px] text-foreground leading-snug">{q.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Poke: a tiny contract on the testnet that anyone can write to */}
        <div className="min-h-0 rounded-2xl border-2 bg-card p-3 flex flex-col gap-2 min-w-0" style={{ borderColor: GREEN + '99' }}>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color: GREEN }}>
              <FlaskConical className="size-4 shrink-0" />{t('explore.poke.label')}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white whitespace-nowrap" style={{ backgroundColor: GREEN }}>
              {CHAIN.name} · {t('explore.poke.badge')}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-base text-foreground">{PRACTICE_CONTRACT.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap" title={PRACTICE_CONTRACT.address}>{shortAddress(PRACTICE_CONTRACT.address)}</span>
            <span className="ml-auto flex items-center gap-1.5 flex-wrap">
              <LinkPill href={`${practiceUrl}#readContract`} title={PRACTICE_CONTRACT.address} color={GREEN}>Read Contract</LinkPill>
              <LinkPill href={`${practiceUrl}#writeContract`} title={PRACTICE_CONTRACT.address} color={GREEN}>Write Contract</LinkPill>
              <LinkPill href={`${practiceUrl}#code`} title={PRACTICE_CONTRACT.address} color={GREEN}>{t('explore.read.code')}</LinkPill>
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-snug -mt-1">{t('explore.poke.what')}</p>

          {/* The heart of the contract, straight from its verified source */}
          <div className="shrink-0 rounded-xl border border-border bg-muted px-3 py-2 overflow-x-auto">
            <div className="font-mono text-xs leading-snug text-foreground whitespace-pre">
              {PRACTICE_CODE_LINES.map((l, i) => (
                <div
                  key={i}
                  className="border-l-2 pl-2"
                  style={{ borderColor: l.part !== undefined ? CODE_PART_COLORS[l.part] : 'transparent' }}
                >
                  {l.text || ' '}
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
              {legend.map((text, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                  <span className="w-0.5 h-3 rounded-full" style={{ backgroundColor: CODE_PART_COLORS[i] }} />{text}
                </span>
              ))}
            </div>
          </div>

          <ol className="flex-1 flex flex-col justify-center gap-1.5">
            {pokeSteps.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-foreground leading-snug">
                <span className="shrink-0 size-5 rounded-full text-[10px] font-black flex items-center justify-center" style={{ backgroundColor: GREEN + '22', color: GREEN }}>{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>

          {/* lg:pr-20 keeps the text clear of the floating slide-nav buttons */}
          <div className="flex items-start gap-2 px-3 py-1.5 lg:pr-20 rounded-xl border" style={{ borderColor: RED + '55', backgroundColor: RED + '10' }}>
            <TriangleAlert className="size-4 shrink-0 mt-0.5" style={{ color: RED }} />
            <p className="text-xs text-foreground leading-snug">{t('explore.poke.warning')}</p>
          </div>
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s8-explore')} className="mt-3" />
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function SC_Section8() {
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
            icon={<Rocket className="size-20 text-[#6366f1]" />}
            gradient="from-[#39B54A] to-[#6366f1]"
          />
        </div>

        {/* ═══════ 1 · THE ASSIGNMENT: SET UP → REGISTER → VERIFY ═══════ */}
        <div id="s8-brief" className="h-full"><BriefSlide /></div>

        {/* ═══════ 2 · DO IT: YOUR FIRST TRANSACTION (the wizard walks all three steps: real wallet, real testnet) ═══════ */}
        <div id="s8-first-tx" className="h-full"><FirstTransactionWizard keyPoint={t('keyPoints.s8-first-tx')} /></div>

        {/* ═══════ 3 · CHECK: THE CLASS LIST, READ LIVE FROM THE CONTRACT (read-only: no wallet, no transaction) ═══════ */}
        <div id="s8-board" className="h-full"><BoardSlide /></div>

        {/* ═══════ 4 · OPTIONAL: READ REAL CONTRACTS, POKE A LIVE ONE (not part of the assignment) ═══════ */}
        <div id="s8-explore" className="h-full"><ExploreSlide /></div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
