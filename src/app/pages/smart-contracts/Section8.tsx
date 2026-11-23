import { useMemo, type ReactNode } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { KeywordText } from '../../components/shared/KeywordText';
import { FirstTransactionWizard } from '../../components/first-tx/FirstTransactionWizard';
import { CHAIN, explorerAddressUrl } from '../../components/first-tx/config';
import {
  ETHERSCAN_ADDRESS, REAL_CONTRACTS, PRACTICE_CONTRACT, PRACTICE_CODE_LINES, shortAddress,
} from '../../data/realContracts';
import { useLocalizedPath } from '../../../i18n/useLang';
import {
  Rocket, ClipboardList, Send, Search, PencilRuler, Database, MousePointerClick, KeyRound, Ban,
  Wallet, Droplets, ReceiptText, ArrowDown, ChevronRight, ExternalLink, Check, FileText, Sparkles,
  ShieldAlert, BadgeCheck, FlaskConical, MessageCircle, TriangleAlert, Lightbulb,
} from 'lucide-react';

const NS = 'smart-contracts/section-8';

// Language-neutral shape — IDs + kind only. Labels come from t() at render time.
// The three groups are the section's arc: understand → do → explore.
const chapterShape = [
  { kind: 'group' as const, id: 'g-understand' },
  { id: 's8-brief' },

  { kind: 'group' as const, id: 'g-do' },
  { id: 's8-first-tx' },

  { kind: 'group' as const, id: 'g-explore' },
  { id: 's8-explore' },
] as const;

const INDIGO = '#6366f1';
const VIOLET = '#8b5cf6';
const SKY = '#0ea5e9';
const GREEN = '#39B54A';
const AMBER = '#f59e0b';
const RED = '#ef4444';

// The arc, one stop per slide. `key` indexes `arc.*` in the locale files.
const ARC = [
  { key: 'understand', id: 's8-brief',    Icon: ClipboardList, color: INDIGO },
  { key: 'do',         id: 's8-first-tx', Icon: Send,          color: GREEN },
  { key: 'explore',    id: 's8-explore',  Icon: Search,        color: SKY },
] as const;

// Part A: the four design questions, in the order of `brief.partA.rows` in the locale files.
const DESIGN_ICONS = [Database, MousePointerClick, KeyRound, Ban];
// Part B: the four moves of the wizard, in the order of `brief.partB.steps`.
const TX_STEP_ICONS = [Wallet, Droplets, Send, ReceiptText];

// Rubric weights from the Assignment 3 brief (percent). `key` indexes `brief.grading.labels`.
const GRADING = [
  { key: 'design',  weight: 40, color: INDIGO },
  { key: 'tx',      weight: 35, color: GREEN },
  { key: 'explain', weight: 15, color: SKY },
  { key: 'writing', weight: 10, color: VIOLET },
] as const;
const BONUS_WEIGHT = 10;

// Deliverable · AI policy · safety, in the order of `brief.rules`.
const RULE_META = [
  { Icon: FileText,    color: INDIGO },
  { Icon: Sparkles,    color: VIOLET },
  { Icon: ShieldAlert, color: RED },
];

// Explore: the four Part A questions again, asked of a real contract (`explore.questions`).
const QUESTION_COLORS = [INDIGO, GREEN, AMBER, RED];
// Colours for the annotated lines of the practice contract: state · open function · event.
const CODE_PART_COLORS = [INDIGO, GREEN, VIOLET];

interface LabelDesc { label: string; desc: string }
interface ContractCopy { look: string }

function scrollToSlide(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Shared bits ─────────────────────────────────────────────────────────────

/** understand → do → explore, with the current stop filled in. Each stop jumps to its slide. */
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
              <a.Icon className="size-3.5" />{i + 1} · {t(`arc.${a.key}`)}
            </button>
          </span>
        );
      })}
    </div>
  );
}

function SlideHeader({ kicker, heading, subtitle, active, color, icon }: {
  kicker: string; heading: string; subtitle: string; active: number; color: string; icon?: ReactNode;
}) {
  return (
    <div className="shrink-0 mb-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color }}>{icon}{kicker}</span>
        <ArcPills active={active} />
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1.5">{heading}</h2>
      <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{subtitle}</p>
    </div>
  );
}

/** The coloured top of a brief card: icon tile, "Part A · required" tag, chip, title. */
function PartHead({ Icon, color, tag, chip, title }: { Icon: typeof Rocket; color: string; tag: string; chip: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-11 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: color }}>
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{tag}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: color + '1f', color }}>{chip}</span>
        </div>
        <div className="font-black text-lg text-foreground leading-tight">{title}</div>
      </div>
    </div>
  );
}

function SubmitBox({ color, label, items }: { color: string; label: string; items: string[] }) {
  return (
    <div className="rounded-xl px-3 py-2" style={{ backgroundColor: color + '10' }}>
      <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color }}>{label}</div>
      <ul className="space-y-1">
        {items.map((s, i) => (
          <li key={i} className="flex gap-2 text-xs text-foreground leading-snug">
            <Check className="size-3.5 shrink-0 mt-0.5" style={{ color }} strokeWidth={3} />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Slide 1 · UNDERSTAND: the Assignment 3 brief ────────────────────────────

function BriefSlide() {
  const { t } = useTranslation(NS);
  const localize = useLocalizedPath();
  const designRows = t('brief.partA.rows', { returnObjects: true }) as LabelDesc[];
  const txSteps = t('brief.partB.steps', { returnObjects: true }) as string[];
  const txSubmit = t('brief.partB.submit', { returnObjects: true }) as string[];
  const bonusSubmit = t('brief.bonus.submit', { returnObjects: true }) as string[];
  const rules = t('brief.rules', { returnObjects: true }) as string[];

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader
        kicker={t('brief.kicker')} heading={t('brief.heading')} subtitle={t('brief.subtitle')}
        active={0} color={INDIGO} icon={<ClipboardList className="size-4" />}
      />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.1fr)_minmax(0,0.9fr)] gap-3">
        {/* Part A · design the contract */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}
          className="min-h-0 rounded-2xl border-2 bg-card p-4 flex flex-col gap-3" style={{ borderColor: INDIGO + '77' }}
        >
          <PartHead Icon={PencilRuler} color={INDIGO} tag={t('brief.partA.tag')} chip={t('brief.partA.chip')} title={t('brief.partA.title')} />
          <p className="text-sm text-muted-foreground leading-snug">{t('brief.partA.lead')}</p>
          <div className="flex-1 min-h-0 flex flex-col justify-center gap-2">
            {designRows.map((r, i) => {
              const Icon = DESIGN_ICONS[i];
              return (
                <div key={i} className="flex items-start gap-2.5 px-3 py-1.5 rounded-xl border border-border bg-muted/30">
                  <span className="size-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: INDIGO + '1f' }}>
                    <Icon className="size-4" style={{ color: INDIGO }} />
                  </span>
                  <div className="min-w-0">
                    <div className="font-black text-sm text-foreground leading-tight">{r.label}</div>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5"><KeywordText text={r.desc} /></p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground leading-snug italic">{t('brief.partA.note')}</p>
        </motion.div>

        {/* Part B · send a real transaction */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.08 }}
          className="min-h-0 rounded-2xl border-2 bg-card p-4 flex flex-col gap-3" style={{ borderColor: GREEN + '77' }}
        >
          <PartHead Icon={Send} color={GREEN} tag={t('brief.partB.tag')} chip={t('brief.partB.chip')} title={t('brief.partB.title')} />
          <p className="text-sm text-muted-foreground leading-snug">{t('brief.partB.lead')}</p>
          <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
            {/* The wizard's four moves, as one small flow */}
            <div className="flex items-start">
              {txSteps.map((s, i) => {
                const Icon = TX_STEP_ICONS[i];
                return (
                  <div key={i} className="flex-1 min-w-0 flex items-start">
                    {i > 0 && <ChevronRight className="size-4 shrink-0 mt-2 -mx-1" style={{ color: GREEN }} />}
                    <div className="flex-1 min-w-0 flex flex-col items-center gap-1 text-center">
                      <span className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: GREEN + '1f' }}>
                        <Icon className="size-4" style={{ color: GREEN }} />
                      </span>
                      <span className="text-[11px] font-bold text-foreground leading-tight">{s}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <SubmitBox color={GREEN} label={t('brief.submitLabel')} items={txSubmit} />
          </div>
          <p className="text-xs text-muted-foreground leading-snug italic">{t('brief.partB.note')}</p>
          <button
            type="button"
            onClick={() => scrollToSlide('s8-first-tx')}
            className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer hover:opacity-90"
            style={{ backgroundColor: GREEN }}
          >
            {t('brief.partB.cta')}<ArrowDown className="size-4" />
          </button>
        </motion.div>

        {/* Bonus · your own contract */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.16 }}
          className="min-h-0 rounded-2xl border-2 border-dashed bg-card p-4 flex flex-col gap-3" style={{ borderColor: AMBER + 'aa' }}
        >
          <PartHead Icon={Rocket} color={AMBER} tag={t('brief.bonus.tag')} chip={t('brief.bonus.chip')} title={t('brief.bonus.title')} />
          <p className="text-sm text-muted-foreground leading-snug">{t('brief.bonus.lead')}</p>
          <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
            <div className="flex items-start gap-2 text-xs text-foreground leading-snug">
              <Sparkles className="size-4 shrink-0 mt-0.5" style={{ color: AMBER }} />
              <span>
                {t('brief.bonus.ai')}{' '}
                <Link to={localize('/smart-contracts/section-6')} className="font-bold underline decoration-dotted underline-offset-2 hover:text-[#6366f1] transition-colors">
                  {t('brief.bonus.aiLink')}
                </Link>
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-foreground leading-snug">
              <Lightbulb className="size-4 shrink-0 mt-0.5" style={{ color: AMBER }} />
              <span>{t('brief.bonus.explain')}</span>
            </div>
            <SubmitBox color={AMBER} label={t('brief.submitLabel')} items={bonusSubmit} />
          </div>
          <button
            type="button"
            onClick={() => scrollToSlide('s8-explore')}
            className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-bold transition-colors cursor-pointer hover:opacity-80"
            style={{ borderColor: AMBER, color: AMBER }}
          >
            {t('brief.bonus.cta')}<ArrowDown className="size-4" />
          </button>
        </motion.div>
      </div>

      {/* How it is graded: a bar in proportion, then one cell per criterion. lg:pr-24 keeps the bonus cell clear of the floating slide-nav buttons */}
      <div className="shrink-0 mt-3 rounded-2xl border border-border bg-card/50 px-4 py-2.5 lg:pr-24">
        <div className="flex items-center gap-3">
          <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('brief.grading.label')}</span>
          <div className="flex-1 flex items-center gap-1 h-2">
            {GRADING.map(g => (
              <span key={g.key} className="h-full rounded-full" style={{ flexGrow: g.weight, flexBasis: 0, backgroundColor: g.color }} />
            ))}
            <span className="h-full rounded-full border border-dashed" style={{ flexGrow: BONUS_WEIGHT, flexBasis: 0, borderColor: AMBER, backgroundColor: AMBER + '33' }} />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {GRADING.map(g => (
            <div key={g.key} className="flex items-center gap-2 min-w-0">
              <span className="font-black text-lg leading-none shrink-0" style={{ color: g.color }}>{g.weight}%</span>
              <span className="text-xs text-muted-foreground leading-tight">{t(`brief.grading.labels.${g.key}`)}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-black text-lg leading-none shrink-0" style={{ color: AMBER }}>+{BONUS_WEIGHT}%</span>
            <span className="text-xs text-muted-foreground leading-tight">{t('brief.grading.labels.bonus')}</span>
          </div>
        </div>
      </div>

      {/* Deliverable · AI policy · safety. lg:pr-20 keeps the last one clear of the floating slide-nav buttons */}
      <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-3 gap-2 lg:pr-20">
        {rules.map((r, i) => {
          const m = RULE_META[i];
          return (
            <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-xl border" style={{ borderColor: m.color + '55', backgroundColor: m.color + '0d' }}>
              <m.Icon className="size-4 shrink-0 mt-0.5" style={{ color: m.color }} />
              <p className="text-xs text-foreground leading-snug">{r}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Slide 3 · EXPLORE: read real contracts, then poke a live one ────────────

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
        active={2} color={SKY} icon={<MessageCircle className="size-4" />}
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

          {/* Talk it through: the four Part A questions, asked of a real contract */}
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

          <div className="flex items-start gap-2 px-3 py-1.5 rounded-xl border" style={{ borderColor: RED + '55', backgroundColor: RED + '10' }}>
            <TriangleAlert className="size-4 shrink-0 mt-0.5" style={{ color: RED }} />
            <p className="text-xs text-foreground leading-snug">{t('explore.poke.warning')}</p>
          </div>
          {/* lg:pr-20 keeps the text clear of the floating slide-nav buttons */}
          <div className="flex items-start gap-2 px-3 py-1.5 lg:pr-20 rounded-xl border" style={{ borderColor: AMBER + '66', backgroundColor: AMBER + '12' }}>
            <Rocket className="size-4 shrink-0 mt-0.5" style={{ color: AMBER }} />
            <p className="text-xs text-foreground leading-snug"><span className="font-black" style={{ color: AMBER }}>{t('explore.poke.bonusLabel')}</span>{t('explore.poke.bonus')}</p>
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

        {/* ═══════ 1 · UNDERSTAND: THE ASSIGNMENT 3 BRIEF ═══════ */}
        <div id="s8-brief" className="h-full"><BriefSlide /></div>

        {/* ═══════ 2 · DO: YOUR FIRST TRANSACTION (Part B, live: real wallet, real testnet) ═══════ */}
        <div id="s8-first-tx" className="h-full"><FirstTransactionWizard keyPoint={t('keyPoints.s8-first-tx')} /></div>

        {/* ═══════ 3 · EXPLORE: READ REAL CONTRACTS, POKE A LIVE ONE ═══════ */}
        <div id="s8-explore" className="h-full"><ExploreSlide /></div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
