import { useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { DeepDiveBadge } from '../../components/shared/DeepDiveBadge';
import { KeyPointBar } from '../../components/shared/KeyPointBar';
import { RecapHandoff } from '../../components/shared/RecapHandoff';
import {
  Wrench, Puzzle, Blocks, Rocket, Lightbulb, Globe, Play, Wallet, Droplets, ReceiptText,
  Check, ChevronLeft, ChevronRight, RotateCcw, KeyRound, Hammer, Network, Coins, FlaskConical,
  GraduationCap, Building2, Monitor, Plug, Server, FileCode2, Eye, Radio, Database, Bot,
  ArrowDown, ExternalLink, MousePointerClick,
} from 'lucide-react';

const NS = 'smart-contracts/section-6';

// Language-neutral shape — only IDs. Labels come from t() at render time.
// Real slide order is the render sequence in SC_Section6 below.
const chapterIds = [
  's6-why',
  's6-erc',
  's6-template',
  's6-where',
  's6-deploy',
  's6-deeper',
  's6-takeaways',
  's6-quiz-template',
  's6-quiz-testnet',
  's6-final-quiz',
] as const;

// ═══ DATA (language-neutral: IDs, code identifiers, colors, names) ══════════

const INDIGO = '#6366f1';
const VIOLET = '#8b5cf6';
const SKY = '#0ea5e9';
const GREEN = '#39B54A';
const AMBER = '#f59e0b';
const REMIX_ORANGE = '#f97316';

// The public testnet the walkthrough uses. ethereum.org lists Sepolia as the
// recommended default testnet for application development (checked 2026-11).
// If that ever changes, swap it here and in the two section-6.json files.
const TESTNET = 'Sepolia';
const TESTNET_COIN = 'SepoliaETH';

// Illustrative values for the mock screens — shortened on purpose, not real accounts.
const WALLET_ADDR = '0x71C7…9F3a';
const CONTRACT_ADDR = '0x5FbD…0aa3';
const RECIPIENT_ADDR = '0xAb58…eC9B';
const TX_HASH = '0x9c1e…b7d2';

const ERC_DATA = [
  {
    id: 'erc-20', name: 'ERC-20', color: INDIGO,
    functions: ['transfer(to, amount)', 'approve(spender, amount)', 'transferFrom(from, to, amount)', 'balanceOf(account)', 'totalSupply()'],
    events: ['Transfer(from, to, amount)', 'Approval(owner, spender, amount)'],
  },
  {
    id: 'erc-721', name: 'ERC-721', color: VIOLET,
    functions: ['ownerOf(tokenId)', 'transferFrom(from, to, tokenId)', 'approve(to, tokenId)', 'tokenURI(tokenId)'],
    events: ['Transfer(from, to, tokenId)', 'Approval(owner, approved, tokenId)'],
  },
  {
    id: 'erc-1155', name: 'ERC-1155', color: GREEN,
    functions: ['balanceOfBatch', 'safeBatchTransferFrom', 'setApprovalForAll', 'uri(id)'],
    events: ['TransferSingle', 'TransferBatch', 'ApprovalForAll'],
  },
  {
    id: 'erc-2981', name: 'ERC-2981', color: AMBER,
    functions: ['royaltyInfo(tokenId, salePrice) → (receiver, royaltyAmount)'],
    events: [] as string[],
  },
];

// The four moves of the build → deploy arc; each one is a slide in this section.
const ARC_STEPS = [
  { id: 's6-erc',      Icon: Puzzle, color: INDIGO, hero: false },
  { id: 's6-template', Icon: Blocks, color: VIOLET, hero: false },
  { id: 's6-where',    Icon: Wrench, color: SKY,    hero: false },
  { id: 's6-deploy',   Icon: Rocket, color: GREEN,  hero: true  },
];

// OpenZeppelin's own minimal ERC-20 (docs.openzeppelin.com/contracts/5.x/erc20), renamed.
// part: 0 = import · 1 = inherit · 2 = the lines that are actually yours
const CODE_LINES: { text: string; part?: number }[] = [
  { text: '// SPDX-License-Identifier: MIT' },
  { text: 'pragma solidity ^0.8.20;' },
  { text: '' },
  { text: 'import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";', part: 0 },
  { text: '' },
  { text: 'contract MyToken is ERC20 {', part: 1 },
  { text: '    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {', part: 2 },
  { text: '        _mint(msg.sender, initialSupply * 10 ** decimals());', part: 2 },
  { text: '    }', part: 2 },
  { text: '}' },
];
const CODE_PART_COLORS = [INDIGO, VIOLET, GREEN];
const INHERITED = ['transfer', 'approve', 'transferFrom', 'balanceOf', 'totalSupply', 'Transfer', 'Approval'];

const PATH_CARDS = [
  { key: 'tool',    Icon: Hammer },
  { key: 'network', Icon: Network },
  { key: 'stakes',  Icon: Coins },
] as const;
const LADDER_ICONS = [FlaskConical, Droplets, Globe];

const DEPLOY_STEPS = [
  { Icon: Wallet,      color: INDIGO },
  { Icon: Droplets,    color: SKY },
  { Icon: Rocket,      color: VIOLET },
  { Icon: ReceiptText, color: GREEN },
];
const DEPLOY_GRADIENT = `linear-gradient(90deg, ${INDIGO}, ${SKY}, ${VIOLET}, ${GREEN})`;

const SPINE_META = [
  { Icon: Monitor,   color: INDIGO },
  { Icon: Plug,      color: VIOLET },
  { Icon: Server,    color: SKY },
  { Icon: FileCode2, color: GREEN },
];
const AROUND_META = [
  { Icon: Eye,      color: AMBER },
  { Icon: Radio,    color: SKY },
  { Icon: Database, color: GREEN },
  { Icon: Bot,      color: VIOLET },
];

// ═══ TYPES FOR returnObjects ARRAYS ═════════════════════════════════════════

interface LabelDesc { label: string; desc: string; }
interface PathOption { name: string; desc: string; chips: string[]; }
interface DeployStepCopy { label: string; title: string; actions: string[]; bridge: string; }
interface StackItem { label: string; desc: string; tools: string; }
interface QuizCopy { question: string; options: string[]; explanation: string; }

// ═══ SHARED BITS ════════════════════════════════════════════════════════════

function scrollToSlide(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SlideHeader({ kicker, heading, subtitle, aside, color = INDIGO }: {
  kicker: string; heading: string; subtitle: string; aside?: ReactNode; color?: string;
}) {
  return (
    <div className="shrink-0 mb-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-black uppercase tracking-widest" style={{ color }}>{kicker}</span>
        {aside}
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1.5">{heading}</h2>
      <p className="text-sm text-muted-foreground mt-1 max-w-4xl">{subtitle}</p>
    </div>
  );
}

// ═══ SLIDE 1 · WHY: FROM DESIGN TO LIVE ═════════════════════════════════════

function ArcEndpoint({ Icon, color, label, desc }: { Icon: typeof Lightbulb; color: string; label: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative z-20 size-16 rounded-full border-2 border-dashed bg-card flex items-center justify-center" style={{ borderColor: color }}>
        <Icon className="size-7" style={{ color }} />
      </div>
      <div className="mt-3 w-full flex-1 p-3 rounded-xl border border-dashed border-border flex flex-col gap-1">
        <div className="font-black text-sm text-foreground">{label}</div>
        <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
      </div>
    </div>
  );
}

function WhySlide() {
  const { t } = useTranslation(NS);
  const steps = t('why.steps', { returnObjects: true }) as LabelDesc[];
  const chips = t('why.deployChips', { returnObjects: true }) as string[];
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader kicker={t('why.kicker')} heading={t('why.heading')} subtitle={t('why.subtitle')} />

      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          <div className="relative mb-5">
            {/* Rail + travelling pulse (desktop only; on narrow screens the cards simply stack) */}
            <div className="hidden lg:block absolute inset-x-[6%] top-8 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${AMBER}, ${INDIGO}, ${VIOLET}, ${SKY}, ${GREEN})`, opacity: 0.35 }} />
            <motion.span
              className="hidden lg:block absolute top-8 -translate-y-[calc(50%-2px)] -translate-x-1/2 size-3.5 rounded-full shadow-lg z-10"
              animate={{ left: ['6%', '94%'], backgroundColor: [AMBER, INDIGO, VIOLET, SKY, GREEN] }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity, repeatDelay: 0.6 }}
            />
            <div className="relative grid grid-cols-2 lg:grid-cols-[0.8fr_1fr_1fr_1fr_1.4fr_0.8fr] gap-3">
              <ArcEndpoint Icon={Lightbulb} color={AMBER} label={t('why.start.label')} desc={t('why.start.desc')} />
              {ARC_STEPS.map((s, i) => (
                <motion.button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSlide(s.id)}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  <div
                    className="relative z-20 size-16 rounded-full border-2 bg-card flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ borderColor: s.color, boxShadow: `0 0 0 ${s.hero ? 8 : 5}px ${s.color}${s.hero ? '33' : '1f'}` }}
                  >
                    <s.Icon className="size-7" style={{ color: s.color }} />
                  </div>
                  <div
                    className="mt-3 w-full flex-1 p-3.5 rounded-xl border-2 flex flex-col gap-1.5"
                    style={{ borderColor: s.color + (s.hero ? '' : '50'), backgroundColor: s.color + (s.hero ? '1a' : '0d') }}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: s.color }}>
                      {t('why.stepTag', { n: i + 1 })}{s.hero ? ` · ${t('why.heroTag')}` : ''}
                    </span>
                    <div className="font-black text-base text-foreground">{steps[i].label}</div>
                    <p className="text-xs text-muted-foreground leading-snug">{steps[i].desc}</p>
                    {s.hero && (
                      <div className="mt-auto pt-1 flex flex-wrap justify-center items-center gap-1">
                        {chips.map((c, ci) => (
                          <span key={c} className="flex items-center gap-1">
                            {ci > 0 && <ChevronRight className="size-3" style={{ color: s.color }} />}
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: s.color + '22', color: s.color }}>{c}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
              <ArcEndpoint Icon={Globe} color={GREEN} label={t('why.end.label')} desc={t('why.end.desc')} />
            </div>
          </div>

          {/* Bridge to the walkthrough / the hands-on assignment */}
          <div className="p-4 rounded-xl border border-[#39B54A]/40 bg-gradient-to-r from-[#39B54A]/15 to-[#6366f1]/10 flex items-center gap-4">
            <div className="size-11 rounded-xl bg-gradient-to-br from-[#39B54A] to-[#6366f1] flex items-center justify-center text-white shrink-0">
              <Play className="size-5" />
            </div>
            <p className="flex-1 text-sm text-foreground font-medium">{t('why.bridge')}</p>
            <button type="button" onClick={() => scrollToSlide('s6-deploy')} className="shrink-0 px-4 py-2 rounded-xl bg-[#39B54A] text-white text-sm font-bold hover:bg-[#39B54A]/90 transition-colors cursor-pointer">
              {t('why.bridgeCta')}
            </button>
          </div>
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s6-why')} className="mt-3" />
    </div>
  );
}

// ═══ SLIDE 2 · INTERACTIVE: ERC EXPLORER ════════════════════════════════════

function ERCExplorer() {
  const { t } = useTranslation(NS);
  const [active, setActive] = useState(ERC_DATA[0].id);
  const erc = ERC_DATA.find(e => e.id === active)!;
  return (
    <div className="h-full flex flex-col lg:flex-row gap-5">
      {/* Tabs */}
      <div className="flex flex-row lg:flex-col gap-2 lg:w-48 shrink-0 flex-wrap">
        <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#6366f1]">
          <MousePointerClick className="size-3.5" />{t('erc.hint')}
        </div>
        {ERC_DATA.map(e => (
          <button key={e.id}
            type="button"
            onClick={() => setActive(e.id)}
            className="text-left p-3 rounded-xl border-2 transition-all hover:scale-[1.02] cursor-pointer"
            style={{
              borderColor: active === e.id ? e.color : 'transparent',
              backgroundColor: active === e.id ? e.color + '15' : 'var(--card)',
            }}>
            <div className="font-mono font-black text-sm" style={{ color: e.color }}>{e.name}</div>
            <div className="text-[10px] text-muted-foreground">{t(`ercData.${e.id}.kind`)}</div>
          </button>
        ))}
      </div>

      {/* Detail */}
      <motion.div key={erc.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">

        <div className="flex flex-col gap-3 min-h-0">
          <div className="p-3 rounded-xl" style={{ backgroundColor: erc.color + '12' }}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: erc.color }}>{t('erc.purposeLabel')}</div>
            <p className="text-sm text-foreground">{t(`ercData.${erc.id}.purpose`)}</p>
          </div>

          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{t('erc.functionsLabel')}</div>
            <ul className="space-y-1.5">
              {erc.functions.map(f => (
                <li key={f} className="font-mono text-xs text-foreground bg-muted px-2 py-1 rounded">{f}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{t('erc.eventsLabel')}</div>
            <ul className="space-y-1.5">
              {erc.events.map(e => (
                <li key={e} className="font-mono text-xs text-foreground bg-muted px-2 py-1 rounded">{e}</li>
              ))}
              {erc.events.length === 0 && (
                <li className="text-xs text-muted-foreground italic px-2 py-1">{t('erc.noEvents')}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 min-h-0">
          <div className="p-4 bg-card border rounded-xl" style={{ borderColor: erc.color + '40' }}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: erc.color }}>{t('erc.examplesLabel')}</div>
            <div className="text-sm font-semibold text-foreground">{t(`ercData.${erc.id}.examples`)}</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-card to-transparent border rounded-xl" style={{ borderColor: erc.color + '40' }}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: erc.color }}>{t('erc.takeawayLabel')}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t(`ercData.${erc.id}.takeaway`)}</p>
          </div>
          <a href={`https://eips.ethereum.org/EIPS/${erc.id.replace('erc-', 'eip-')}`}
            target="_blank" rel="noreferrer"
            className="px-3 py-2 rounded-lg text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
            style={{ backgroundColor: erc.color + '15', color: erc.color }}>
            {t('erc.specLink', { name: erc.name })}<ExternalLink className="size-3" />
          </a>
        </div>

      </motion.div>
    </div>
  );
}

function ErcSlide() {
  const { t } = useTranslation(NS);
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader
        kicker={t('erc.kicker')}
        heading={t('erc.heading')}
        subtitle={t('erc.subtitle')}
        aside={<RecapHandoff label={t('recapLabel')} text={t('erc.recapWhere')} to="/smart-contracts/section-2" color={INDIGO} />}
      />
      <div className="flex-1 min-h-0">
        <ERCExplorer />
      </div>
      {/* The whole "why standards evolve / EIP process" story, in one line */}
      <p className="shrink-0 mt-3 text-xs text-muted-foreground">
        <span className="font-bold text-foreground">{t('erc.evolveLabel')}</span>{t('erc.evolveBody')}{' '}
        <a href="https://eips.ethereum.org/erc" target="_blank" rel="noreferrer" className="font-bold text-[#6366f1] hover:underline whitespace-nowrap">
          {t('erc.browseLink')} ↗
        </a>
      </p>
      <KeyPointBar text={t('keyPoints.s6-erc')} className="mt-3" />
    </div>
  );
}

// ═══ SLIDE 3 · TEMPLATE: OPENZEPPELIN ═══════════════════════════════════════

function TemplateSlide() {
  const { t } = useTranslation(NS);
  const [focus, setFocus] = useState<number | null>(null);
  const parts = t('template.parts', { returnObjects: true }) as LabelDesc[];
  // First line of each highlighted part gets its number in the gutter.
  const firstLineOf = (p: number) => CODE_LINES.findIndex(l => l.part === p);

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader kicker={t('template.kicker')} heading={t('template.heading')} subtitle={t('template.subtitle')} color={VIOLET} />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-5 content-center">
        {/* Code, colour-coded by who wrote it */}
        <div className="p-4 bg-card border border-[#8b5cf6]/30 rounded-2xl flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <FileCode2 className="size-4 text-[#8b5cf6]" />
            <span className="text-xs font-semibold text-muted-foreground font-mono">{t('template.fileName')}</span>
          </div>
          <div className="bg-muted rounded-xl py-3 overflow-x-auto">
            {CODE_LINES.map((line, li) => {
              const color = line.part !== undefined ? CODE_PART_COLORS[line.part] : undefined;
              const lit = color && (focus === null || focus === line.part);
              const numbered = line.part !== undefined && firstLineOf(line.part) === li;
              return (
                <div
                  key={li}
                  className="flex items-center min-w-max pr-4 transition-colors duration-200"
                  style={{
                    backgroundColor: lit ? color + (focus === null ? '14' : '2e') : 'transparent',
                    boxShadow: lit ? `inset 3px 0 0 ${color}` : undefined,
                    opacity: focus !== null && !lit ? 0.45 : 1,
                  }}
                >
                  <span className="w-9 shrink-0 flex justify-center">
                    {numbered && (
                      <span className="size-5 rounded-full text-[10px] font-black text-white flex items-center justify-center" style={{ backgroundColor: color }}>
                        {(line.part ?? 0) + 1}
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-xs lg:text-[13px] leading-7 text-foreground whitespace-pre">{line.text || ' '}</span>
                </div>
              );
            })}
          </div>

          {/* What came for free */}
          <div className="mt-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{t('template.inheritedLabel')}</div>
            <div className="flex flex-wrap gap-1.5">
              {INHERITED.map(fn => (
                <span key={fn} className="font-mono text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: VIOLET + '15', color: VIOLET }}>{fn}</span>
              ))}
            </div>
          </div>
        </div>

        {/* The three moves + the AI bridge */}
        <div className="flex flex-col gap-3 min-w-0">
          {parts.map((p, pi) => {
            const color = CODE_PART_COLORS[pi];
            const on = focus === pi;
            return (
              <button
                key={pi}
                type="button"
                onMouseEnter={() => setFocus(pi)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(pi)}
                onBlur={() => setFocus(null)}
                onClick={() => setFocus(on ? null : pi)}
                className="text-left p-3.5 bg-card border-2 rounded-xl flex items-start gap-3 transition-all cursor-pointer"
                style={{ borderColor: on ? color : color + '40', backgroundColor: on ? color + '12' : undefined }}
              >
                <span className="size-7 rounded-full text-xs font-black text-white flex items-center justify-center shrink-0" style={{ backgroundColor: color }}>{pi + 1}</span>
                <span>
                  <span className="block font-bold text-sm" style={{ color }}>{p.label}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">{p.desc}</span>
                </span>
              </button>
            );
          })}

          <div className="p-3.5 rounded-xl border border-[#0ea5e9]/40 flex items-start gap-3" style={{ backgroundColor: SKY + '10' }}>
            <Bot className="size-6 shrink-0" style={{ color: SKY }} />
            <p className="text-xs text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: SKY }}>{t('template.aiLabel')}</span>{t('template.aiBody')}
            </p>
          </div>

          <a href="https://wizard.openzeppelin.com/" target="_blank" rel="noreferrer"
            className="self-start px-3 py-1.5 rounded-lg bg-[#8b5cf6]/15 text-[#8b5cf6] text-xs font-bold hover:bg-[#8b5cf6]/25 transition-colors flex items-center gap-1.5">
            {t('template.wizardLink')}<ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s6-template')} className="mt-3" />
    </div>
  );
}

// ═══ SLIDE 4 · INTERACTIVE: TOOLS & WHERE TO DEPLOY ═════════════════════════

type PathMode = 'learn' | 'real';

function WhereSlide() {
  const { t } = useTranslation(NS);
  const [mode, setMode] = useState<PathMode>('learn');
  const accent = mode === 'learn' ? INDIGO : AMBER;
  const ladder = t('where.ladder', { returnObjects: true }) as LabelDesc[];
  // Which rung of the rehearsal ladder each mode stands on.
  const rung = mode === 'learn' ? 1 : 2;

  const modeButton = (key: PathMode, Icon: typeof GraduationCap, color: string) => (
    <button
      type="button"
      onClick={() => setMode(key)}
      aria-pressed={mode === key}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer"
      style={{
        backgroundColor: mode === key ? color : 'transparent',
        color: mode === key ? 'white' : 'var(--muted-foreground)',
      }}
    >
      <Icon className="size-4" />{t(`where.modes.${key}`)}
    </button>
  );

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader kicker={t('where.kicker')} heading={t('where.heading')} subtitle={t('where.subtitle')} color={SKY} />

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-5">
        {/* Mode toggle */}
        <div className="self-center flex items-center gap-1 p-1 rounded-xl bg-muted border border-border">
          {modeButton('learn', GraduationCap, INDIGO)}
          {modeButton('real', Building2, AMBER)}
        </div>

        {/* Three choices */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl w-full mx-auto">
          {PATH_CARDS.map(({ key, Icon }, ci) => {
            const opt = t(`where.cards.${key}.${mode}`, { returnObjects: true }) as PathOption;
            return (
              <motion.div
                key={`${key}-${mode}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: ci * 0.06 }}
                className="flex flex-col rounded-2xl border-2 bg-card overflow-hidden"
                style={{ borderColor: accent + '55' }}
              >
                <div className="h-1.5" style={{ backgroundColor: accent }} />
                <div className="flex flex-col gap-2 p-5 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="size-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent + '18' }}>
                      <Icon className="size-5" style={{ color: accent }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t(`where.cards.${key}.label`)}</span>
                  </div>
                  <div className="font-black text-xl text-foreground leading-tight">{opt.name}</div>
                  <p className="text-sm text-muted-foreground leading-snug">{opt.desc}</p>
                  <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
                    {opt.chips.map(c => (
                      <span key={c} className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: accent + '15', color: accent }}>{c}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rehearsal ladder: sandbox → testnet → mainnet */}
        <div className="max-w-6xl w-full mx-auto rounded-2xl border border-border bg-card/50 px-5 py-3">
          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{t('where.ladderLabel')}</div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
            {ladder.map((l, li) => {
              const Icon = LADDER_ICONS[li];
              const here = li === rung;
              return [
                li > 0 && <ChevronRight key={`sep-${li}`} className="hidden lg:block size-5 text-muted-foreground" />,
                <div
                  key={l.label}
                  className="relative flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all duration-300"
                  style={{
                    borderColor: here ? accent : 'transparent',
                    backgroundColor: here ? accent + '14' : 'var(--muted)',
                    opacity: here ? 1 : 0.7,
                  }}
                >
                  <Icon className="size-5 shrink-0" style={{ color: here ? accent : 'var(--muted-foreground)' }} />
                  <div className="min-w-0">
                    <div className="text-sm font-black text-foreground leading-tight">{l.label}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{l.desc}</div>
                  </div>
                  {here && (
                    <motion.span
                      layoutId="s6-ladder-here"
                      className="absolute -top-2.5 right-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {t(`where.here.${mode}`)}
                    </motion.span>
                  )}
                </div>,
              ];
            })}
          </div>
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s6-where')} className="mt-3" />
    </div>
  );
}

// ═══ SLIDE 5 · CENTERPIECE: DEPLOY TO A TESTNET ═════════════════════════════

function MockWindow({ title, accent, className = '', children }: { title: string; accent: string; className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-xl border bg-card shadow-sm overflow-hidden shrink-0 ${className}`} style={{ borderColor: accent + '66' }}>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border" style={{ backgroundColor: accent + '14' }}>
        <span className="size-2 rounded-full" style={{ backgroundColor: accent }} />
        <span className="text-[10px] font-black uppercase tracking-widest truncate" style={{ color: accent }}>{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function MockField({ label, value, mono = false, tag }: { label: string; value: string; mono?: boolean; tag?: string }) {
  return (
    <div className="mt-1.5 first:mt-0">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 px-2 py-1 rounded-lg bg-muted flex items-center gap-2">
        <span className={`flex-1 min-w-0 truncate text-xs text-foreground ${mono ? 'font-mono' : 'font-semibold'}`}>{value}</span>
        {tag && <span className="shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ backgroundColor: GREEN + '22', color: GREEN }}>{tag}</span>}
      </div>
    </div>
  );
}

function FlowArrow({ color, label }: { color: string; label?: string }) {
  return (
    <div className={`shrink-0 flex flex-col items-center gap-1 ${label ? 'w-20' : 'w-12'}`}>
      {label && <span className="text-[10px] font-bold whitespace-nowrap" style={{ color }}>{label}</span>}
      <div className="w-full flex items-center">
        <div className="relative flex-1 h-0.5 rounded-full" style={{ backgroundColor: color + '55' }}>
          <motion.span
            className="absolute top-1/2 -translate-y-1/2 size-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <ChevronRight className="size-4 -ml-1.5 shrink-0" style={{ color }} />
      </div>
    </div>
  );
}

function WalletCard({ onTestnet, funded }: { onTestnet: boolean; funded: boolean }) {
  const { t } = useTranslation(NS);
  return (
    <MockWindow title={t('deploy.mock.walletTitle')} accent={INDIGO} className="w-64">
      <div className="flex justify-center mb-2.5">
        <motion.span
          key={onTestnet ? 'test' : 'main'}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border"
          style={onTestnet
            ? { color: GREEN, borderColor: GREEN + '66', backgroundColor: GREEN + '14' }
            : { color: 'var(--muted-foreground)', borderColor: 'var(--border)' }}
        >
          ● {onTestnet ? TESTNET : t('deploy.mock.mainnet')}
        </motion.span>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="size-9 rounded-full shrink-0" style={{ background: `linear-gradient(135deg, ${INDIGO}, ${SKY})` }} />
        <div className="min-w-0">
          <div className="text-xs font-bold text-foreground">{t('deploy.mock.account')}</div>
          <div className="text-[11px] font-mono text-muted-foreground">{WALLET_ADDR}</div>
        </div>
      </div>
      <motion.div
        key={funded ? 'funded' : 'empty'}
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: funded ? 0.5 : 0 }}
        className="mt-3 text-center text-2xl font-black text-foreground"
      >
        {funded ? '0.05' : '0'} <span className="text-sm font-bold text-muted-foreground">{onTestnet ? TESTNET_COIN : 'ETH'}</span>
      </motion.div>
    </MockWindow>
  );
}

function DeployScreen({ step }: { step: number }) {
  const { t } = useTranslation(NS);

  if (step === 0) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <WalletCard onTestnet={false} funded={false} />
        <div className="w-64 flex flex-col gap-2">
          <div className="p-3 rounded-xl border" style={{ borderColor: AMBER + '66', backgroundColor: AMBER + '12' }}>
            <div className="flex items-center gap-1.5 text-xs font-black" style={{ color: AMBER }}>
              <KeyRound className="size-3.5" />{t('deploy.mock.phraseTitle')}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1" aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="h-4 rounded bg-foreground/15" />
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground leading-snug">{t('deploy.mock.phraseNote')}</p>
          </div>
          <div className="p-2.5 rounded-xl border border-border bg-card text-[11px] text-muted-foreground leading-snug">
            <span className="font-bold text-foreground">{t('deploy.mock.addressTitle')}</span>{t('deploy.mock.addressNote')}
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <MockWindow title={t('deploy.mock.faucetTitle', { testnet: TESTNET })} accent={SKY} className="w-72">
          <MockField label={t('deploy.mock.faucetField')} value={WALLET_ADDR} mono />
          <div className="mt-2 px-3 py-1.5 rounded-lg text-center text-xs font-bold text-white" style={{ backgroundColor: SKY }}>{t('deploy.mock.faucetButton')}</div>
          <p className="mt-2 text-[11px] text-muted-foreground leading-snug">{t('deploy.mock.faucetNote')}</p>
        </MockWindow>
        <FlowArrow color={SKY} label={t('deploy.mock.faucetFlow')} />
        <WalletCard onTestnet funded />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <MockWindow title={t('deploy.mock.remixTitle')} accent={VIOLET} className="w-80">
            <MockField label={t('deploy.mock.environment')} value={t('deploy.mock.environmentValue')} tag={TESTNET} />
            <MockField label={t('deploy.mock.contract')} value="MyToken" mono />
            <div className="mt-2 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg text-xs font-black text-white" style={{ backgroundColor: REMIX_ORANGE }}>Deploy</span>
              <span className="flex-1 min-w-0 truncate px-2 py-1.5 rounded-lg bg-muted font-mono text-xs text-foreground">initialSupply: 1000</span>
            </div>
          </MockWindow>
          <FlowArrow color={VIOLET} />
          <MockWindow title={t('deploy.mock.confirmTitle')} accent={INDIGO} className="w-64">
            <div className="text-xs font-bold text-foreground">{t('deploy.mock.confirmKind')}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">{t('deploy.mock.fee')}</div>
            <div className="font-mono text-xs text-foreground whitespace-nowrap">≈ 0.0006 {TESTNET_COIN}</div>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <span className="py-1 rounded-lg border border-border text-center text-[11px] font-bold text-muted-foreground">{t('deploy.mock.reject')}</span>
              <span className="py-1 rounded-lg text-center text-[11px] font-bold text-white" style={{ backgroundColor: INDIGO }}>{t('deploy.mock.confirm')}</span>
            </div>
          </MockWindow>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border"
          style={{ borderColor: GREEN + '66', backgroundColor: GREEN + '12' }}
        >
          <Check className="size-4 shrink-0" style={{ color: GREEN }} strokeWidth={3} />
          <span className="text-xs font-bold text-foreground">{t('deploy.mock.deployed')}</span>
          <span className="font-mono text-xs font-bold" style={{ color: GREEN }}>{CONTRACT_ADDR}</span>
        </motion.div>
      </div>
    );
  }

  const receipt: [string, ReactNode][] = [
    [t('deploy.mock.rowHash'), <span className="font-mono">{TX_HASH}</span>],
    [t('deploy.mock.rowStatus'), (
      <span className="inline-flex items-center gap-1 font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: GREEN + '22', color: GREEN }}>
        <Check className="size-3" strokeWidth={3} />{t('deploy.mock.success')}
      </span>
    )],
    [t('deploy.mock.rowFrom'), <span className="font-mono">{WALLET_ADDR}</span>],
    [t('deploy.mock.rowTo'), <span className="font-mono">MyToken · {CONTRACT_ADDR}</span>],
    [t('deploy.mock.rowTransfer'), <span className="font-mono">10 MTK → {RECIPIENT_ADDR}</span>],
    [t('deploy.mock.rowFee'), <span className="font-mono">0.00005 {TESTNET_COIN}</span>],
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <MockWindow title={t('deploy.mock.deployedTitle')} accent={VIOLET} className="w-64">
        <div className="text-[11px] font-mono text-muted-foreground mb-2">MYTOKEN AT {CONTRACT_ADDR}</div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-1 rounded-lg text-xs font-black text-white" style={{ backgroundColor: REMIX_ORANGE }}>transfer</span>
          <span className="text-[10px] text-muted-foreground leading-tight">{t('deploy.mock.writeFn')}</span>
        </div>
        <MockField label="to" value={RECIPIENT_ADDR} mono />
        <MockField label="amount" value="10000000000000000000" mono />
        <p className="mt-1.5 text-[11px] text-muted-foreground leading-snug">{t('deploy.mock.unitsNote')}</p>
      </MockWindow>
      <FlowArrow color={GREEN} />
      <MockWindow title={t('deploy.mock.explorerTitle', { testnet: TESTNET })} accent={GREEN} className="w-80">
        <div className="space-y-1.5">
          {receipt.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 text-[11px]">
              <span className="text-muted-foreground shrink-0">{label}</span>
              <span className="text-foreground text-right whitespace-nowrap">{value}</span>
            </div>
          ))}
        </div>
      </MockWindow>
    </div>
  );
}

function DeployWalkthrough() {
  const { t } = useTranslation(NS);
  const [active, setActive] = useState(0);
  const last = DEPLOY_STEPS.length - 1;
  const steps = t('deploy.steps', { returnObjects: true }) as DeployStepCopy[];
  const artifactLabels = t('deploy.artifacts', { returnObjects: true }) as string[];
  const artifactValues = [WALLET_ADDR, `0.05 ${TESTNET_COIN}`, CONTRACT_ADDR, TX_HASH];
  const step = DEPLOY_STEPS[active];
  const copy = steps[active];
  const pos = (i: number) => `${(i / last) * 100}%`;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader
        kicker={t('deploy.kicker')}
        heading={t('deploy.heading')}
        subtitle={t('deploy.subtitle')}
        color={GREEN}
        aside={(
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: GREEN }}>
            <Play className="size-3" />{t('deploy.badge')}
          </span>
        )}
      />

      {/* Step rail */}
      <div className="shrink-0 rounded-2xl border border-border bg-card/50 px-8 pt-8 pb-12 mb-3">
        <div className="relative h-1.5 rounded-full bg-border mx-[12%]">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ background: DEPLOY_GRADIENT }}
            initial={false}
            animate={{ width: pos(active) }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
          {DEPLOY_STEPS.map((st, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active ? 'step' : undefined}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: pos(i) }}
            >
              <span
                className="size-11 rounded-full border-2 flex items-center justify-center bg-card transition-all duration-300"
                style={{
                  borderColor: i <= active ? st.color : 'var(--border)',
                  boxShadow: i === active ? `0 0 0 5px ${st.color}33` : undefined,
                  transform: i === active ? 'scale(1.12)' : undefined,
                }}
              >
                {i < active
                  ? <Check className="size-5" style={{ color: st.color }} strokeWidth={3} />
                  : <st.Icon className="size-5" style={{ color: i === active ? st.color : 'var(--muted-foreground)' }} />}
              </span>
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs font-bold whitespace-nowrap transition-colors"
                style={{ color: i === active ? st.color : 'var(--muted-foreground)' }}
              >
                {i + 1}. {steps[i].label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-3">
        {/* You do */}
        <div data-fit className="min-h-0 rounded-2xl border-2 bg-card p-5 flex flex-col transition-colors duration-300" style={{ borderColor: step.color + '77' }}>
          <motion.div key={active} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="flex-1 min-h-0 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: step.color }}>
                <step.Icon className="size-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: step.color }}>
                  {t('deploy.stepOf', { n: active + 1, total: DEPLOY_STEPS.length })} · {t('deploy.youDo')}
                </div>
                <div className="font-black text-xl text-foreground leading-tight">{copy.title}</div>
              </div>
            </div>
            <ol className="space-y-2.5">
              {copy.actions.map((a, ai) => (
                <li key={ai} className="flex gap-2.5 text-sm text-foreground leading-snug">
                  <span className="shrink-0 size-5 rounded-full text-[10px] font-black flex items-center justify-center mt-0.5" style={{ backgroundColor: step.color + '22', color: step.color }}>{ai + 1}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
            <div className="mt-auto p-2.5 rounded-xl text-xs text-muted-foreground leading-snug" style={{ backgroundColor: step.color + '12' }}>
              <span className="font-bold" style={{ color: step.color }}>{t('deploy.bridgeLabel')}</span>{copy.bridge}
            </div>
          </motion.div>

          <div className="shrink-0 mt-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setActive(a => Math.max(0, a - 1))}
              disabled={active === 0}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
            >
              <ChevronLeft className="size-4" />{t('deploy.back')}
            </button>
            {active < last ? (
              <button
                type="button"
                onClick={() => setActive(a => Math.min(last, a + 1))}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer"
                style={{ backgroundColor: step.color }}
              >
                {t('deploy.next')}<ChevronRight className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActive(0)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 text-sm font-bold transition-colors cursor-pointer"
                style={{ borderColor: step.color, color: step.color }}
              >
                <RotateCcw className="size-4" />{t('deploy.restart')}
              </button>
            )}
          </div>
        </div>

        {/* You see */}
        <div data-fit className="min-h-0 rounded-2xl border border-border bg-muted/40 p-4 flex flex-col">
          <div className="shrink-0 flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: step.color }}>{t('deploy.youSee')}</span>
            <span className="text-[10px] font-semibold text-muted-foreground italic">{t('deploy.illustrative')}</span>
          </div>
          {/* If a narrow window forces the mock to wrap, it scrolls inside the panel instead of spilling out. */}
          <div className="flex-1 min-h-0 overflow-y-auto flex">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="m-auto">
              <DeployScreen step={active} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* What you have collected so far */}
      {/* lg:pr-20 keeps the last chip clear of the floating slide-nav buttons */}
      <div className="shrink-0 mt-3 flex items-stretch gap-2 lg:pr-20">
        <div className="hidden lg:flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground pr-1 max-w-28 leading-tight">{t('deploy.artifactsLabel')}</div>
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2">
          {DEPLOY_STEPS.map((st, i) => {
            const earned = i <= active;
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 min-w-0"
                style={{
                  borderColor: earned ? st.color + '77' : 'var(--border)',
                  backgroundColor: earned ? st.color + '12' : 'transparent',
                  opacity: earned ? 1 : 0.45,
                }}
              >
                <st.Icon className="size-4 shrink-0" style={{ color: earned ? st.color : 'var(--muted-foreground)' }} />
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-muted-foreground leading-tight truncate">{artifactLabels[i]}</div>
                  <div className="text-xs font-mono font-bold text-foreground leading-tight truncate">{earned ? artifactValues[i] : '—'}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s6-deploy')} className="mt-3" />
    </div>
  );
}

// ═══ SLIDE 6 · OPTIONAL: GOING DEEPER ═══════════════════════════════════════

function DeeperSlide() {
  const { t } = useTranslation(NS);
  const spine = t('deeper.spine', { returnObjects: true }) as StackItem[];
  const around = t('deeper.around', { returnObjects: true }) as StackItem[];
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <SlideHeader
        kicker={t('deeper.kicker')}
        heading={t('deeper.heading')}
        subtitle={t('deeper.subtitle')}
        color={VIOLET}
        aside={<DeepDiveBadge label={t('deeper.badge')} />}
      />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-6 content-center">
        {/* Spine: the path of one click */}
        <div className="flex flex-col min-w-0">
          <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-2">{t('deeper.spineLabel')}</div>
          {spine.map((s, si) => {
            const { Icon, color } = SPINE_META[si];
            return (
              <div key={si} className="flex flex-col">
                {si > 0 && <ArrowDown className="size-4 my-1 ml-6 text-muted-foreground" />}
                <div className="p-3 bg-card border-2 rounded-xl flex items-center gap-3" style={{ borderColor: color + '50' }}>
                  <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '18' }}>
                    <Icon className="size-5" style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-black text-sm text-foreground">{s.label}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{s.desc}</div>
                  </div>
                  {s.tools && <span className="hidden xl:block shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: color + '15', color }}>{s.tools}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Around the contract */}
        <div className="flex flex-col min-w-0">
          <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest mb-2">{t('deeper.aroundLabel')}</div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {around.map((a, ai) => {
              const { Icon, color } = AROUND_META[ai];
              return (
                <div key={ai} className="p-4 bg-card border rounded-xl flex flex-col gap-2" style={{ borderColor: color + '50' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '18' }}>
                      <Icon className="size-5" style={{ color }} />
                    </div>
                    <div className="font-black text-base" style={{ color }}>{a.label}</div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{a.desc}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: color + '15', color }}>{a.tools}</span>
                    {ai === 0 && <RecapHandoff label={t('recapLabel')} text={t('deeper.oracleRecap')} to="/smart-contracts/section-2" color={AMBER} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s6-deeper')} className="mt-3" />
    </div>
  );
}

// ═══ MAIN ═══════════════════════════════════════════════════════════════════

export function SC_Section6() {
  const { t } = useTranslation(NS);

  const chapters = useMemo(
    () => chapterIds.map((id) => ({ id, label: t(`chapters.${id}`) })),
    [t]
  );

  const takeawayItems = t('takeaways.items', { returnObjects: true }) as string[];

  // Index of the single correct option for each quiz (options live in the locale files).
  const quiz = (key: string, correctIndex: number) => {
    const q = t(key, { returnObjects: true }) as QuizCopy;
    return {
      question: q.question,
      options: q.options.map((text, i) => ({ text, correct: i === correctIndex })),
      explanation: q.explanation,
    };
  };
  const quizTemplate = quiz('quizTemplate', 1);
  const quizTestnet = quiz('quizTestnet', 3);
  const quizFinal = quiz('quiz', 2);

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
            icon={<Wrench className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#22d3ee]"
          />
        </div>

        {/* ═══════ 1 · WHY: FROM DESIGN TO LIVE ═══════ */}
        <div id="s6-why" className="h-full"><WhySlide /></div>

        {/* ═══════ 2 · STANDARD: ERC + EXPLORER ═══════ */}
        <div id="s6-erc" className="h-full"><ErcSlide /></div>

        {/* ═══════ 3 · TEMPLATE: OPENZEPPELIN ═══════ */}
        <div id="s6-template" className="h-full"><TemplateSlide /></div>

        {/* ═══════ 4 · TOOLS & WHERE TO DEPLOY ═══════ */}
        <div id="s6-where" className="h-full"><WhereSlide /></div>

        {/* ═══════ 5 · DEPLOY TO A TESTNET (centerpiece) ═══════ */}
        <div id="s6-deploy" className="h-full"><DeployWalkthrough /></div>

        {/* ═══════ 6 · GOING DEEPER (optional) ═══════ */}
        <div id="s6-deeper" className="h-full"><DeeperSlide /></div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s6-takeaways" className="h-full">
          <TakeawaySlide
            title={t('takeaways.title')}
            takeaways={takeawayItems}
          />
        </div>

        {/* ═══════ QUIZ 1 · why remix a template ═══════ */}
        <div id="s6-quiz-template" className="h-full">
          <QuizSlide compact {...quizTemplate} />
        </div>

        {/* ═══════ QUIZ 2 · why a testnet first ═══════ */}
        <div id="s6-quiz-testnet" className="h-full">
          <QuizSlide compact {...quizTestnet} />
        </div>

        {/* ═══════ FINAL QUIZ · where to deploy for real ═══════ */}
        <div id="s6-final-quiz" className="h-full">
          <QuizSlide compact {...quizFinal} />
        </div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
