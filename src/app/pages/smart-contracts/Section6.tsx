import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { GroupedQuiz } from '../../components/templates/GroupedQuiz';
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
  GitPullRequest, MessagesSquare, Timer, BadgeCheck, Hourglass, Undo2, Infinity as InfinityIcon,
  UserPen, ClipboardCheck, Users, ZoomOut, PenLine, BookOpen, ShieldCheck, Copy, MessageSquare,
  SquareTerminal, Sparkles, TriangleAlert, Cloud, AppWindow, Mail, LayoutDashboard, Workflow, Zap,
} from 'lucide-react';

const NS = 'smart-contracts/section-6';

// Language-neutral shape — only IDs. Labels come from t() at render time.
// Real slide order is the render sequence in SC_Section6 below.
const chapterIds = [
  's6-why',
  's6-erc',
  's6-eip',
  's6-template',
  's6-ai',
  's6-where',
  's6-deploy',
  's6-hosting',
  's6-events',
  's6-deeper',
  's6-takeaways',
  's6-quiz',
] as const;

// ═══ DATA (language-neutral: IDs, code identifiers, colors, names) ══════════

const INDIGO = '#6366f1';
const VIOLET = '#8b5cf6';
const SKY = '#0ea5e9';
const GREEN = '#39B54A';
const AMBER = '#f59e0b';
const REMIX_ORANGE = '#f97316';
const RED = '#ef4444';
const SLATE = '#64748b';

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

// ── EIP lifecycle ────────────────────────────────────────────────────────────
// Statuses, side states and types follow EIP-1 (eips.ethereum.org/EIPS/eip-1,
// checked 2026-11). Status and type names are the official English terms, so
// they stay untranslated; the explanations live in the locale files.
// `actor` = who holds the proposal in the zoomed-out strip (index into EIP_ACTORS).
const EIP_STAGES = [
  { id: 'idea',     name: 'Idea',      Icon: Lightbulb,      color: AMBER,  actor: 0 },
  { id: 'draft',    name: 'Draft',     Icon: GitPullRequest, color: INDIGO, actor: 1 },
  { id: 'review',   name: 'Review',    Icon: MessagesSquare, color: VIOLET, actor: 2 },
  { id: 'lastCall', name: 'Last Call', Icon: Timer,          color: SKY,    actor: 2 },
  { id: 'final',    name: 'Final',     Icon: BadgeCheck,     color: GREEN,  actor: 3 },
];
// `from` = indexes of the stages this side state can be entered from.
// Stagnant: EIP-1 names Draft, Review and Last Call. Withdrawn: EIP-1's text does
// not list source statuses; a proposal exists in the repo from Draft and is
// frozen at Final, so the same three stages are marked.
const EIP_SIDE = [
  { id: 'stagnant',  name: 'Stagnant',  Icon: Hourglass,    color: SLATE, from: [1, 2, 3] },
  { id: 'withdrawn', name: 'Withdrawn', Icon: Undo2,        color: RED,   from: [1, 2, 3] },
  { id: 'living',    name: 'Living',    Icon: InfinityIcon, color: SKY,   from: [] as number[] },
];
const EIP_ACTORS = [
  { Icon: UserPen,        color: AMBER },
  { Icon: ClipboardCheck, color: INDIGO },
  { Icon: Users,          color: VIOLET },
  { Icon: BadgeCheck,     color: GREEN },
];
// Examples verified on eips.ethereum.org: 1559 Core, 8 Networking, 1193 Interface,
// 20/721/2981 ERC, 1 Meta, 2228 Informational.
const EIP_TYPES = [
  { id: 'core',          name: 'Core',          color: AMBER,  track: true },
  { id: 'networking',    name: 'Networking',    color: SKY,    track: true },
  { id: 'interface',     name: 'Interface',     color: VIOLET, track: true },
  { id: 'erc',           name: 'ERC',           color: INDIGO, track: true },
  { id: 'meta',          name: 'Meta',          color: SLATE,  track: false },
  { id: 'informational', name: 'Informational', color: GREEN,  track: false },
];
// The running example: ERC-2981 (NFT Royalty Standard), the standard the ERC slide ends on.
const EIP_EXAMPLE = { number: '2981', title: 'NFT Royalty Standard' };

// ── AI-driven development ────────────────────────────────────────────────────
const AI_PROMPTS = [
  { Icon: PenLine,     color: INDIGO },
  { Icon: BookOpen,    color: SKY },
  { Icon: ShieldCheck, color: GREEN },
];
const AI_TOOLS = [
  { Icon: MessageSquare,  color: INDIGO,       href: '' },
  { Icon: SquareTerminal, color: VIOLET,       href: '' },
  { Icon: Sparkles,       color: REMIX_ORANGE, href: 'https://remix-ide.readthedocs.io/en/latest/ai.html' },
  { Icon: Blocks,         color: SKY,          href: 'https://mcp.openzeppelin.com/' },
];
const AI_LOOP = [
  { Icon: MessageSquare, color: INDIGO },
  { Icon: Eye,           color: SKY },
  { Icon: FlaskConical,  color: VIOLET },
  { Icon: ShieldCheck,   color: GREEN },
];

// ── Hosting: what each piece is for ──────────────────────────────────────────
// static host → browser, then two separate lanes to the network:
//   READ  · browser → RPC provider → network  (the site asks, nothing changes)
//   WRITE · browser → wallet → network        (the user signs and sends a transaction)
const HOST_NODES = {
  host:    { Icon: Cloud,     color: SKY },
  browser: { Icon: AppWindow, color: INDIGO },
  rpc:     { Icon: Server,    color: VIOLET },
  wallet:  { Icon: Wallet,    color: AMBER },
  chain:   { Icon: Network,   color: GREEN },
} as const;
type HostNodeId = keyof typeof HOST_NODES;
// Which pieces each scenario lights up.
const HOST_SCENARIOS: { id: 'load' | 'read' | 'write'; Icon: typeof Globe; color: string; nodes: HostNodeId[] }[] = [
  { id: 'load',  Icon: Globe,   color: SKY,    nodes: ['host', 'browser'] },
  { id: 'read',  Icon: Eye,     color: VIOLET, nodes: ['browser', 'rpc', 'chain'] },
  { id: 'write', Icon: PenLine, color: AMBER,  nodes: ['browser', 'wallet', 'chain'] },
];

// ── Event-driven architecture ────────────────────────────────────────────────
// `call` / `event` / `listener` are code, so they are not translated. Transfer is the
// real ERC-20 / ERC-721 event (a mint is a Transfer from the zero address);
// DeliveryConfirmed is an illustrative custom event.
const EVENT_SCENARIOS = [
  { id: 'payment',  call: 'transfer(to, 10 MTK)',    event: 'Transfer(from, to, 10 MTK)',       listener: 'token.on("Transfer", …)' },
  { id: 'delivery', call: 'confirmDelivery(#1042)',  event: 'DeliveryConfirmed(#1042)',         listener: 'orders.on("DeliveryConfirmed", …)' },
  { id: 'ticket',   call: 'mint(buyer)',             event: 'Transfer(0x0, buyer, ticket #42)', listener: 'tickets.on("Transfer", …)' },
];
const REACTION_META = [
  { Icon: Mail,            color: SKY },
  { Icon: LayoutDashboard, color: INDIGO },
  { Icon: Workflow,        color: VIOLET },
];
// Simulation phases: 0 idle · 1 executing · 2 event emitted · 3 received · 4–6 reactions fire.
const EVENT_LAST_PHASE = 6;
const EVENT_PHASE_MS = [0, 800, 900, 600, 550, 550];

// ═══ TYPES FOR returnObjects ARRAYS ═════════════════════════════════════════

interface LabelDesc { label: string; desc: string; }
interface PathOption { name: string; desc: string; chips: string[]; }
interface DeployStepCopy { label: string; title: string; actions: string[]; bridge: string; }
interface StackItem { label: string; desc: string; tools: string; }
interface QuizCopy { question: string; options: string[]; explanation: string; }
interface AiPromptCopy { tab: string; goal: string; prompt: string; checks: string[]; }
interface HostOption { name: string; desc: string; }
interface EventScenarioCopy { label: string; reactions: string[]; }

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
      <p className="shrink-0 mt-3 text-xs text-muted-foreground lg:pr-20">
        <span className="font-bold text-foreground">{t('erc.evolveLabel')}</span>{t('erc.evolveBody')}{' '}
        <a href="https://eips.ethereum.org/erc" target="_blank" rel="noreferrer" className="font-bold text-[#6366f1] hover:underline whitespace-nowrap">
          {t('erc.browseLink')} ↗
        </a>
      </p>
      <KeyPointBar text={t('keyPoints.s6-erc')} className="mt-3" />
    </div>
  );
}

// ═══ SLIDE 2b · INTERACTIVE: HOW AN EIP BECOMES A STANDARD ══════════════════

/** What the proposal physically is at each stage: a forum thread first, then a file in the EIPs repository. */
function EipDocument({ stageIndex }: { stageIndex: number }) {
  const { t } = useTranslation(NS);
  const stage = EIP_STAGES[stageIndex];

  if (stageIndex === 0) {
    return (
      <MockWindow title={t('eip.doc.forumTitle')} accent={stage.color} className="w-full">
        <div className="flex items-start gap-2.5">
          <div className="size-8 rounded-full shrink-0" style={{ background: `linear-gradient(135deg, ${AMBER}, ${REMIX_ORANGE})` }} />
          <div className="min-w-0">
            <div className="text-xs font-bold text-foreground leading-snug">{t('eip.doc.forumPost')}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{t('eip.doc.forumMeta')}</div>
          </div>
        </div>
        <div className="mt-2 space-y-1.5 pl-10" aria-hidden>
          {[80, 62].map(w => (
            <div key={w} className="flex items-center gap-2">
              <span className="size-4 rounded-full bg-foreground/15 shrink-0" />
              <span className="h-2 rounded bg-foreground/10" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </MockWindow>
    );
  }

  // Last Call carries a published deadline (the real header field is `last-call-deadline`); Final is frozen.
  const statusTag = stage.id === 'lastCall' ? t('eip.doc.deadlineTag') : stage.id === 'final' ? t('eip.doc.frozen') : '';
  const rows: [string, string][] = [
    ['eip', EIP_EXAMPLE.number],
    ['title', EIP_EXAMPLE.title],
    ['status', stage.name],
    ['type', 'Standards Track'],
    ['category', 'ERC'],
  ];
  return (
    <MockWindow title={t('eip.doc.repoTitle')} accent={stage.color} className="w-full">
      <div className="font-mono text-xs leading-5 space-y-0.5">
        {rows.map(([key, value]) => {
          const isStatus = key === 'status';
          return (
            <div key={key} className="flex items-center gap-2 px-2 rounded" style={isStatus ? { backgroundColor: stage.color + '1f', boxShadow: `inset 3px 0 0 ${stage.color}` } : undefined}>
              <span className="text-muted-foreground">{key}:</span>
              {isStatus ? (
                <motion.span key={stage.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="font-black" style={{ color: stage.color }}>{value}</motion.span>
              ) : (
                <span className="text-foreground truncate">{value}</span>
              )}
              {isStatus && statusTag && (
                <span className="ml-auto font-sans text-[10px] font-black px-1.5 rounded-full whitespace-nowrap" style={{ backgroundColor: stage.color + '22', color: stage.color }}>{statusTag}</span>
              )}
            </div>
          );
        })}
      </div>
    </MockWindow>
  );
}

function EipSlide() {
  const { t } = useTranslation(NS);
  const [active, setActive] = useState(0);
  const [side, setSide] = useState<string | null>(null);
  const [typeId, setTypeId] = useState('erc');
  const last = EIP_STAGES.length - 1;
  const stage = EIP_STAGES[active];
  const sideMeta = side ? EIP_SIDE.find(s => s.id === side) : undefined;
  const panel = sideMeta ?? stage;
  const actors = t('eip.actors', { returnObjects: true }) as LabelDesc[];
  const flows = t('eip.flows', { returnObjects: true }) as string[];
  const type = EIP_TYPES.find(ty => ty.id === typeId)!;
  const pos = (i: number) => `${(i / last) * 100}%`;
  const go = (i: number) => { setActive(i); setSide(null); };

  const typeChip = (ty: typeof EIP_TYPES[number]) => (
    <button
      key={ty.id}
      type="button"
      onClick={() => setTypeId(ty.id)}
      aria-pressed={typeId === ty.id}
      className="px-2 py-1.5 rounded-lg border-2 text-xs font-black transition-colors cursor-pointer"
      style={{
        borderColor: typeId === ty.id ? ty.color : ty.color + '40',
        backgroundColor: typeId === ty.id ? ty.color : 'transparent',
        color: typeId === ty.id ? 'white' : ty.color,
      }}
    >
      {ty.name}
    </button>
  );

  return (
    <div className="h-full flex flex-col p-6 lg:px-8 lg:py-6">
      <SlideHeader kicker={t('eip.kicker')} heading={t('eip.heading')} subtitle={t('eip.subtitle')} />

      <div className="flex-1 min-h-0 flex flex-col gap-3">
        {/* Zoomed out: the whole information flow, with the proposal's current holder lit */}
        <div className="shrink-0 rounded-2xl border border-border bg-card/50 px-4 pt-2.5 pb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2.5">
            <ZoomOut className="size-3.5" />{t('eip.zoomLabel')}
            <span className="ml-auto flex items-center gap-1.5 transition-colors duration-300" style={{ color: EIP_ACTORS[stage.actor].color }}>
              <span className="size-2.5 rounded-full" style={{ backgroundColor: EIP_ACTORS[stage.actor].color }} />{t('eip.hereTag')}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-2">
            {EIP_ACTORS.map((a, ai) => {
              const here = stage.actor === ai;
              return [
                ai > 0 && (
                  <div key={`flow-${ai}`} className="hidden lg:flex items-center">
                    <FlowArrow color={a.color} label={flows[ai - 1]} />
                  </div>
                ),
                <div
                  key={ai}
                  className="relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl border-2 transition-all duration-300"
                  style={{
                    borderColor: here ? a.color : 'transparent',
                    backgroundColor: here ? a.color + '14' : 'var(--muted)',
                    opacity: here ? 1 : 0.8,
                  }}
                >
                  <div className="size-9 rounded-full border-2 bg-card flex items-center justify-center shrink-0" style={{ borderColor: a.color }}>
                    <a.Icon className="size-[18px]" style={{ color: a.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-black text-foreground leading-tight">{actors[ai].label}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{actors[ai].desc}</div>
                  </div>
                  {here && (
                    <motion.span layoutId="s6-eip-here" className="absolute top-2 right-2 size-3 flex items-center justify-center" aria-hidden>
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: a.color }}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <span className="relative size-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                    </motion.span>
                  )}
                </div>,
              ];
            })}
          </div>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-3">
          {/* Stepper: walk one proposal through the statuses */}
          <div data-fit className="min-h-0 rounded-2xl border-2 bg-card p-4 flex flex-col transition-colors duration-300" style={{ borderColor: panel.color + '77' }}>
            <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#6366f1]">
              <MousePointerClick className="size-3.5" />{t('eip.hint')}
            </div>

            {/* Status rail */}
            <div className="shrink-0 relative h-1.5 rounded-full bg-border mx-[8%] mt-7 mb-10">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${AMBER}, ${INDIGO}, ${VIOLET}, ${SKY}, ${GREEN})` }}
                initial={false}
                animate={{ width: pos(active) }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
              {EIP_STAGES.map((st, i) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === active ? 'step' : undefined}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: pos(i) }}
                >
                  <span
                    className="size-10 rounded-full border-2 flex items-center justify-center bg-card transition-all duration-300"
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 text-xs font-bold whitespace-nowrap transition-colors"
                    style={{ color: i === active ? st.color : 'var(--muted-foreground)' }}
                  >
                    {st.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Side exits */}
            <div className="shrink-0 flex items-center gap-2 flex-wrap mb-2.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('eip.sideLabel')}</span>
              {EIP_SIDE.map(s => {
                const reachable = s.from.includes(active);
                const on = side === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSide(on ? null : s.id)}
                    aria-pressed={on}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 text-xs font-bold transition-all cursor-pointer"
                    style={{
                      borderColor: on ? s.color : reachable ? s.color + 'aa' : 'var(--border)',
                      borderStyle: on ? 'solid' : 'dashed',
                      backgroundColor: on ? s.color : reachable ? s.color + '12' : 'transparent',
                      color: on ? 'white' : reachable ? s.color : 'var(--muted-foreground)',
                    }}
                  >
                    <s.Icon className="size-3.5" />{s.name}
                    {reachable && !on && <span className="text-[10px] font-semibold opacity-80">· {t('eip.sideReachable')}</span>}
                  </button>
                );
              })}
            </div>

            {/* Detail for the current status, or for the side state being inspected */}
            <motion.div
              key={side ?? stage.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1 min-h-0 rounded-xl px-3.5 py-3 flex flex-col gap-2"
              style={{ backgroundColor: panel.color + '10' }}
            >
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: panel.color }}>
                  <panel.Icon className="size-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: panel.color }}>
                    {sideMeta ? t('eip.sideKicker') : t('eip.stageOf', { n: active + 1, total: EIP_STAGES.length })}
                  </div>
                  <div className="font-black text-xl text-foreground leading-tight">
                    {panel.name}{!sideMeta && <span className="font-semibold text-sm text-muted-foreground"> · {t(`eip.stages.${stage.id}.tagline`)}</span>}
                  </div>
                </div>
              </div>
              {sideMeta ? (
                <p className="text-sm text-foreground leading-snug">{t(`eip.side.${sideMeta.id}`)}</p>
              ) : (
                <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm leading-snug">
                  {(['who', 'what', 'rule'] as const).map(row => (
                    <div key={row} className="contents">
                      <dt className="text-[10px] font-black uppercase tracking-widest pt-0.5 whitespace-nowrap" style={{ color: panel.color }}>{t(`eip.rows.${row}`)}</dt>
                      <dd className={row === 'what' ? 'text-foreground' : 'text-muted-foreground'}>{t(`eip.stages.${stage.id}.${row}`)}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </motion.div>

            <div className="shrink-0 mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => go(Math.max(0, active - 1))}
                disabled={active === 0}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
              >
                <ChevronLeft className="size-4" />{t('eip.back')}
              </button>
              {active < last ? (
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer"
                  style={{ backgroundColor: stage.color }}
                >
                  {t('eip.next', { status: EIP_STAGES[active + 1].name })}<ChevronRight className="size-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => go(0)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 text-sm font-bold transition-colors cursor-pointer"
                  style={{ borderColor: stage.color, color: stage.color }}
                >
                  <RotateCcw className="size-4" />{t('eip.restart')}
                </button>
              )}
            </div>
          </div>

          {/* The proposal itself + what kind of EIP it is */}
          <div className="min-h-0 flex flex-col gap-3">
            <EipDocument stageIndex={active} />

            <div data-fit className="flex-1 min-h-0 rounded-2xl border border-border bg-card px-3.5 py-3 flex flex-col gap-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('eip.typesLabel')}</div>
              <div className="rounded-xl border border-dashed border-border p-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-foreground">Standards Track <span className="font-semibold normal-case tracking-normal text-muted-foreground">· {t('eip.standardsTrackDesc')}</span></div>
                <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                  {EIP_TYPES.filter(ty => ty.track).map(typeChip)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {EIP_TYPES.filter(ty => !ty.track).map(typeChip)}
              </div>
              {/* lg:pr-20 keeps the text clear of the floating slide-nav buttons */}
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-auto rounded-xl p-2.5 lg:pr-20"
                style={{ backgroundColor: type.color + '12' }}
              >
                <p className="text-xs text-foreground leading-snug"><span className="font-black" style={{ color: type.color }}>{type.name}: </span>{t(`eip.types.${type.id}.desc`)}</p>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug"><span className="font-bold">{t('eip.exampleLabel')}</span>{t(`eip.types.${type.id}.example`)}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s6-eip')} className="mt-3" />
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

// ═══ SLIDE 3b · INTERACTIVE: AI-DRIVEN DEVELOPMENT ══════════════════════════

/** Copy to the clipboard; falls back to a hidden textarea where the async API is unavailable (plain-HTTP dev hosts). */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fall through to the legacy path */ }
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  document.body.removeChild(area);
  return ok;
}

function AiSlide() {
  const { t } = useTranslation(NS);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const prompts = t('ai.prompts', { returnObjects: true }) as AiPromptCopy[];
  const tools = t('ai.tools', { returnObjects: true }) as StackItem[];
  const loop = t('ai.loop', { returnObjects: true }) as LabelDesc[];
  const meta = AI_PROMPTS[active];
  const copy = prompts[active];

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  const pick = (i: number) => { setActive(i); setCopied(false); };

  return (
    <div className="h-full flex flex-col p-6 lg:px-8 lg:py-6">
      <SlideHeader kicker={t('ai.kicker')} heading={t('ai.heading')} subtitle={t('ai.subtitle')} color={SKY} />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-3">
        {/* Prompt workbench */}
        <div data-fit className="min-h-0 rounded-2xl border-2 bg-card p-4 flex flex-col gap-3 transition-colors duration-300" style={{ borderColor: meta.color + '77' }}>
          <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#6366f1]">
            <MousePointerClick className="size-3.5" />{t('ai.hint')}
          </div>
          <div className="shrink-0 grid grid-cols-3 gap-2">
            {AI_PROMPTS.map((p, pi) => {
              const on = pi === active;
              return (
                <button
                  key={pi}
                  type="button"
                  onClick={() => pick(pi)}
                  aria-pressed={on}
                  className="flex items-center gap-2 p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer"
                  style={{ borderColor: on ? p.color : p.color + '40', backgroundColor: on ? p.color + '14' : 'transparent' }}
                >
                  <span className="size-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: on ? p.color : p.color + '1f' }}>
                    <p.Icon className="size-4" style={{ color: on ? 'white' : p.color }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-black uppercase tracking-widest" style={{ color: p.color }}>{t('ai.promptTag', { n: pi + 1 })}</span>
                    <span className="block text-sm font-black text-foreground leading-tight">{prompts[pi].tab}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex-1 min-h-0 flex flex-col gap-3">
            <p className="shrink-0 text-sm text-muted-foreground leading-snug"><span className="font-bold" style={{ color: meta.color }}>{t('ai.goalLabel')}</span>{copy.goal}</p>

            {/* The prompt, as a chat message ready to paste */}
            <div className="shrink-0 rounded-xl border overflow-hidden" style={{ borderColor: meta.color + '66' }}>
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-border" style={{ backgroundColor: meta.color + '14' }}>
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest" style={{ color: meta.color }}>
                  <MessageSquare className="size-3.5" />{t('ai.pasteLabel')}
                </span>
                <button
                  type="button"
                  onClick={async () => setCopied(await copyText(copy.prompt))}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black text-white transition-colors cursor-pointer"
                  style={{ backgroundColor: copied ? GREEN : meta.color }}
                >
                  {copied ? <Check className="size-3.5" strokeWidth={3} /> : <Copy className="size-3.5" />}
                  {copied ? t('ai.copied') : t('ai.copy')}
                </button>
              </div>
              <p className="px-3.5 py-2.5 bg-muted font-mono text-xs leading-relaxed text-foreground whitespace-pre-line">{copy.prompt}</p>
            </div>

            <div className="mt-auto rounded-xl p-3" style={{ backgroundColor: meta.color + '10' }}>
              <div className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: meta.color }}>{t('ai.checksLabel')}</div>
              <ul className="space-y-1">
                {copy.checks.map((c, ci) => (
                  <li key={ci} className="flex gap-2 text-xs text-foreground leading-snug">
                    <Check className="size-3.5 shrink-0 mt-0.5" style={{ color: meta.color }} strokeWidth={3} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Where to paste it */}
        <div className="min-h-0 flex flex-col gap-2 min-w-0">
          <div className="shrink-0 text-xs font-bold uppercase tracking-widest" style={{ color: SKY }}>{t('ai.toolsLabel')}</div>
          <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {tools.map((tool, ti) => {
              const { Icon, color, href } = AI_TOOLS[ti];
              return (
                <div key={ti} className="p-3.5 bg-card border rounded-xl flex flex-col gap-1.5" style={{ borderColor: color + '50' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '18' }}>
                      <Icon className="size-5" style={{ color }} />
                    </div>
                    <div className="font-black text-sm leading-tight" style={{ color }}>{tool.label}</div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{tool.desc}</p>
                  <div className="mt-auto pt-1 flex flex-wrap items-center gap-1.5">
                    {tool.tools.split(' · ').map(name => (
                      <span key={name} className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: color + '15', color }}>{name}</span>
                    ))}
                    {href && (
                      <a href={href} target="_blank" rel="noreferrer" aria-label={tool.label} className="hover:opacity-70 transition-opacity" style={{ color }}>
                        <ExternalLink className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="shrink-0 flex items-start gap-2 px-3 py-2 rounded-xl border" style={{ borderColor: RED + '55', backgroundColor: RED + '10' }}>
            <TriangleAlert className="size-4 shrink-0 mt-0.5" style={{ color: RED }} />
            <p className="text-[11px] text-foreground leading-snug">{t('ai.secretWarning')}</p>
          </div>
        </div>
      </div>

      {/* The loop that keeps you the author */}
      {/* lg:pr-20 keeps the last step clear of the floating slide-nav buttons */}
      <div className="shrink-0 mt-3 rounded-2xl border border-border bg-card/50 px-4 py-2 lg:pr-20">
        <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2">
          {loop.map((l, li) => {
            const { Icon, color } = AI_LOOP[li];
            return [
              li > 0 && <ChevronRight key={`sep-${li}`} className="hidden lg:block size-5 text-muted-foreground" />,
              <div key={li} className="flex items-center gap-2.5 min-w-0">
                <div className="size-9 rounded-full border-2 bg-card flex items-center justify-center shrink-0" style={{ borderColor: color }}>
                  <Icon className="size-4" style={{ color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-black text-foreground leading-tight">{l.label}</div>
                  <div className="text-[11px] text-muted-foreground leading-snug">{l.desc}</div>
                </div>
              </div>,
            ];
          })}
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s6-ai')} className="mt-3" />
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

/** Renders copy that contains inline [label](https://…) links as real, clickable anchors. */
function LinkedText({ text, color }: { text: string; color: string }) {
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
        return m
          ? <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 hover:opacity-80" style={{ color }}>{m[1]}</a>
          : part;
      })}
    </>
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
                  <span><LinkedText text={a} color={step.color} /></span>
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

// ═══ SLIDE 5b · INTERACTIVE: NODE INFRASTRUCTURE & WHERE TO HOST ════════════

function HostingSlide() {
  const { t } = useTranslation(NS);
  const [scenario, setScenario] = useState(0);
  const sc = HOST_SCENARIOS[scenario];
  const frontOptions = t('hosting.front.options', { returnObjects: true }) as HostOption[];
  const chainOptions = t('hosting.chain.options', { returnObjects: true }) as HostOption[];
  const lit = (id: HostNodeId) => sc.nodes.includes(id);
  const chipsOf = (id: HostNodeId) => t(`hosting.nodes.${id}.chips`, { returnObjects: true }) as string[];

  // Tall card: the pieces every scenario shares (host, browser, network).
  const tallNode = (id: HostNodeId, place: string) => {
    const n = HOST_NODES[id];
    const on = lit(id);
    return (
      <div
        key={id}
        className={`flex flex-col items-center justify-center text-center gap-1 px-2.5 py-2.5 rounded-xl border-2 bg-card transition-all duration-300 ${place}`}
        style={{ borderColor: on ? n.color : 'var(--border)', boxShadow: on ? `0 0 0 4px ${n.color}22` : undefined, opacity: on ? 1 : 0.5 }}
      >
        <div className="size-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: n.color + (on ? '' : '18') }}>
          <n.Icon className="size-5" style={{ color: on ? 'white' : n.color }} />
        </div>
        <div className="font-black text-sm text-foreground leading-tight">{t(`hosting.nodes.${id}.label`)}</div>
        <p className="text-[11px] text-muted-foreground leading-snug">{t(`hosting.nodes.${id}.desc`)}</p>
        <div className="pt-1 flex flex-wrap justify-center gap-1">
          {chipsOf(id).map(c => (
            <span key={c} className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: n.color + '18', color: n.color }}>{c}</span>
          ))}
        </div>
      </div>
    );
  };

  // Lane card: the two doors to the chain. RPC = read, wallet = write.
  const laneNode = (id: 'rpc' | 'wallet', place: string) => {
    const n = HOST_NODES[id];
    const on = lit(id);
    // When the other lane is in use, the tag says why this piece sits the step out.
    const skipped = (id === 'wallet' && sc.id === 'read') || (id === 'rpc' && sc.id === 'write');
    return (
      <div
        key={id}
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border-2 bg-card text-left transition-all duration-300 ${place}`}
        style={{ borderColor: on ? n.color : 'var(--border)', boxShadow: on ? `0 0 0 4px ${n.color}22` : undefined, opacity: on ? 1 : 0.55 }}
      >
        <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: n.color + (on ? '' : '18') }}>
          <n.Icon className="size-5" style={{ color: on ? 'white' : n.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-black text-sm text-foreground leading-tight">{t(`hosting.nodes.${id}.label`)}</span>
            {skipped ? (
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 rounded-full bg-muted border border-border text-muted-foreground whitespace-nowrap">{t(`hosting.skipped.${id}`)}</span>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 rounded-full text-white whitespace-nowrap" style={{ backgroundColor: n.color }}>{t(`hosting.lanes.${id}`)}</span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground leading-snug">{t(`hosting.nodes.${id}.desc`)}</p>
          <div className="pt-0.5 flex flex-wrap gap-1">
            {chipsOf(id).map(c => (
              <span key={c} className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: n.color + '18', color: n.color }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const arrow = (key: string, on: boolean, place: string, label?: string) => (
    <div key={key} className={`hidden lg:flex items-center transition-opacity duration-300 ${place}`} style={{ opacity: on ? 1 : 0.2 }}>
      <FlowArrow color={on ? sc.color : SLATE} label={label} />
    </div>
  );

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader kicker={t('hosting.kicker')} heading={t('hosting.heading')} subtitle={t('hosting.subtitle')} color={SKY} />

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-2">
        {/* Scenario picker + what happens */}
        <div className="shrink-0 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted border border-border self-start">
            {HOST_SCENARIOS.map((s, si) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScenario(si)}
                aria-pressed={scenario === si}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
                style={{
                  backgroundColor: scenario === si ? s.color : 'transparent',
                  color: scenario === si ? 'white' : 'var(--muted-foreground)',
                }}
              >
                <s.Icon className="size-4" />{t(`hosting.scenarios.${s.id}.label`)}
              </button>
            ))}
          </div>
          <motion.p key={sc.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="flex-1 text-sm text-foreground leading-snug">
            {t(`hosting.scenarios.${sc.id}.desc`)}
          </motion.p>
        </div>

        {/* ① front end on a static host  ·  ② two doors to the chain: RPC reads, the wallet writes */}
        <div className="shrink-0 rounded-2xl border border-border bg-card/50 p-3">
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr_auto_2fr_auto_1fr] gap-2 mb-2">
            <div className="col-span-3 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: SKY + '14' }}>
              <span className="size-5 rounded-full text-[10px] font-black text-white flex items-center justify-center shrink-0" style={{ backgroundColor: SKY }}>1</span>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: SKY }}>{t('hosting.zones.front')}</span>
            </div>
            <div />
            <div className="col-span-3 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: VIOLET + '14' }}>
              <span className="size-5 rounded-full text-[10px] font-black text-white flex items-center justify-center shrink-0" style={{ backgroundColor: VIOLET }}>2</span>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: VIOLET }}>{t('hosting.zones.chain')}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_2fr_auto_1fr] lg:grid-rows-2 items-stretch gap-2">
            {tallNode('host', 'lg:col-start-1 lg:row-start-1 lg:row-span-2')}
            {arrow('a-load', sc.id === 'load', 'lg:col-start-2 lg:row-start-1 lg:row-span-2')}
            {tallNode('browser', 'lg:col-start-3 lg:row-start-1 lg:row-span-2')}
            {arrow('a-read-1', sc.id === 'read', 'lg:col-start-4 lg:row-start-1', t('hosting.flows.ask'))}
            {laneNode('rpc', 'lg:col-start-5 lg:row-start-1')}
            {arrow('a-read-2', sc.id === 'read', 'lg:col-start-6 lg:row-start-1', t('hosting.flows.read'))}
            {arrow('a-write-1', sc.id === 'write', 'lg:col-start-4 lg:row-start-2', t('hosting.flows.request'))}
            {laneNode('wallet', 'lg:col-start-5 lg:row-start-2')}
            {arrow('a-write-2', sc.id === 'write', 'lg:col-start-6 lg:row-start-2', t('hosting.flows.signed'))}
            {tallNode('chain', 'lg:col-start-7 lg:row-start-1 lg:row-span-2')}
          </div>
        </div>

        {/* The two decisions */}
        <div className="shrink-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] gap-3">
          <div className="rounded-2xl border bg-card px-4 py-3 flex flex-col gap-2" style={{ borderColor: SKY + '55' }}>
            <div className="flex items-center gap-2">
              <span className="size-6 rounded-full text-xs font-black text-white flex items-center justify-center shrink-0" style={{ backgroundColor: SKY }}>1</span>
              <span className="font-black text-sm text-foreground">{t('hosting.front.title')}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">{t('hosting.front.lead')}</p>
            <div className="grid grid-cols-2 gap-2">
              {frontOptions.map(o => (
                <div key={o.name} className="rounded-xl p-2.5" style={{ backgroundColor: SKY + '10' }}>
                  <div className="text-xs font-black" style={{ color: SKY }}>{o.name}</div>
                  <div className="text-[11px] text-muted-foreground leading-snug">{o.desc}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">{t('hosting.front.also')}</p>
          </div>

          <div className="rounded-2xl border bg-card px-4 py-3 flex flex-col gap-2" style={{ borderColor: VIOLET + '55' }}>
            <div className="flex items-center gap-2">
              <span className="size-6 rounded-full text-xs font-black text-white flex items-center justify-center shrink-0" style={{ backgroundColor: VIOLET }}>2</span>
              <span className="font-black text-sm text-foreground">{t('hosting.chain.title')}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">{t('hosting.chain.lead')}</p>
            <div className="grid grid-cols-3 gap-2">
              {chainOptions.map((o, oi) => {
                // The first two options are ways to READ (RPC); the last is the only way to WRITE (the wallet).
                const c = HOST_NODES[oi === chainOptions.length - 1 ? 'wallet' : 'rpc'].color;
                return (
                  <div key={o.name} className="relative rounded-xl p-2.5" style={{ backgroundColor: c + '10' }}>
                    {oi === 0 && (
                      <span className="absolute -top-1.5 right-2 text-[10px] font-black uppercase tracking-wider px-1.5 rounded-full text-white whitespace-nowrap" style={{ backgroundColor: GREEN }}>{t('hosting.chain.startHere')}</span>
                    )}
                    <div className="text-xs font-black" style={{ color: c }}>{o.name}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug">{o.desc}</div>
                  </div>
                );
              })}
            </div>
            {/* lg:pr-20 keeps the line clear of the floating slide-nav buttons */}
            <p className="text-[11px] text-muted-foreground leading-snug lg:pr-20">{t('hosting.chain.tradeoff')}</p>
          </div>
        </div>
      </div>

      <KeyPointBar text={t('keyPoints.s6-hosting')} className="mt-3" />
    </div>
  );
}

// ═══ SLIDE 5c · INTERACTIVE: EVENT-DRIVEN ARCHITECTURE ══════════════════════

function EventsSlide() {
  const { t } = useTranslation(NS);
  const [scenario, setScenario] = useState(0);
  const [phase, setPhase] = useState(0);
  const sc = EVENT_SCENARIOS[scenario];
  const copy = t(`events.scenarios.${sc.id}`, { returnObjects: true }) as EventScenarioCopy;
  const reactionKinds = t('events.reactionKinds', { returnObjects: true }) as string[];
  const facts = t('events.facts', { returnObjects: true }) as LabelDesc[];
  const running = phase > 0 && phase < EVENT_LAST_PHASE;

  // Advance the simulation one phase at a time once it has been started.
  useEffect(() => {
    if (phase === 0 || phase >= EVENT_LAST_PHASE) return;
    const id = window.setTimeout(() => setPhase(p => p + 1), EVENT_PHASE_MS[phase]);
    return () => window.clearTimeout(id);
  }, [phase]);

  const pick = (i: number) => { setScenario(i); setPhase(0); };
  const emitted = phase >= 2;
  const received = phase >= 3;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <SlideHeader kicker={t('events.kicker')} heading={t('events.heading')} subtitle={t('events.subtitle')} color={VIOLET} />

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
        {/* Scenario picker */}
        <div className="shrink-0 flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#6366f1]">
            <MousePointerClick className="size-3.5" />{t('events.hint')}
          </span>
          {EVENT_SCENARIOS.map((s, si) => (
            <button
              key={s.id}
              type="button"
              onClick={() => pick(si)}
              aria-pressed={scenario === si}
              className="px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-colors cursor-pointer"
              style={{
                borderColor: scenario === si ? VIOLET : 'var(--border)',
                backgroundColor: scenario === si ? VIOLET : 'transparent',
                color: scenario === si ? 'white' : 'var(--muted-foreground)',
              }}
            >
              {t(`events.scenarios.${s.id}.label`)}
            </button>
          ))}
        </div>

        {/* contract --emit event--> your app reacts */}
        <div className="shrink-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.9fr)_auto_minmax(0,1.25fr)] items-center gap-2">
          {/* On-chain: the contract */}
          <div className="rounded-2xl border-2 bg-card p-4 flex flex-col gap-2.5" style={{ borderColor: GREEN + '66' }}>
            <div className="flex items-center gap-2">
              <FileCode2 className="size-4" style={{ color: GREEN }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: GREEN }}>{t('events.onChain')}</span>
            </div>
            <div className="font-black text-base text-foreground leading-tight">{t('events.contractTitle')}</div>
            <div className="px-2.5 py-1.5 rounded-lg bg-muted font-mono text-xs text-foreground truncate">{sc.call}</div>
            <button
              type="button"
              onClick={() => setPhase(1)}
              disabled={running}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-white transition-opacity cursor-pointer disabled:opacity-60 disabled:cursor-default"
              style={{ backgroundColor: GREEN }}
            >
              {phase >= EVENT_LAST_PHASE ? <RotateCcw className="size-4" /> : <Play className="size-4" />}
              {phase >= EVENT_LAST_PHASE ? t('events.again') : t('events.send')}
            </button>
            <div className="space-y-1">
              {(['executed', 'emitted'] as const).map((k, ki) => {
                const done = phase >= ki + 2;
                const busy = phase === ki + 1;
                return (
                  <div key={k} className="flex items-center gap-2 text-xs transition-opacity duration-300" style={{ opacity: done || busy ? 1 : 0.4 }}>
                    <span className="size-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: done ? GREEN : 'var(--border)' }}>
                      {done && <Check className="size-3 text-white" strokeWidth={3} />}
                    </span>
                    <span className="text-foreground">{t(`events.contractSteps.${k}`)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex items-center transition-opacity duration-300" style={{ opacity: emitted ? 1 : 0.25 }}>
            <FlowArrow color={emitted ? AMBER : SLATE} label={t('events.arrowEmit')} />
          </div>

          {/* The event itself */}
          <div
            className="rounded-2xl border-2 border-dashed px-4 py-5 flex flex-col items-center justify-center text-center gap-2 transition-all duration-300"
            style={{ borderColor: emitted ? AMBER : 'var(--border)', backgroundColor: emitted ? AMBER + '12' : 'transparent' }}
          >
            <motion.div
              animate={emitted ? { scale: [1, 1.18, 1] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
              className="size-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: emitted ? AMBER : 'var(--muted)' }}
            >
              <Zap className="size-6" style={{ color: emitted ? 'white' : 'var(--muted-foreground)' }} />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: emitted ? AMBER : 'var(--muted-foreground)' }}>{t('events.eventLabel')}</span>
            <div className="max-w-full px-2.5 py-1.5 rounded-lg bg-card border border-border font-mono text-xs text-foreground transition-opacity duration-300" style={{ opacity: emitted ? 1 : 0.35 }}>
              {sc.event}
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">{t('events.eventNote')}</p>
          </div>

          <div className="hidden lg:flex items-center transition-opacity duration-300" style={{ opacity: received ? 1 : 0.25 }}>
            <FlowArrow color={received ? INDIGO : SLATE} label={t('events.arrowHear')} />
          </div>

          {/* Off-chain: the listener and what it sets off */}
          <div className="rounded-2xl border-2 bg-card p-4 flex flex-col gap-2.5" style={{ borderColor: INDIGO + '66' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Radio className="size-4" style={{ color: INDIGO }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: INDIGO }}>{t('events.offChain')}</span>
              </div>
              <span
                className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors duration-300 whitespace-nowrap"
                style={received ? { backgroundColor: INDIGO, color: 'white' } : { backgroundColor: INDIGO + '18', color: INDIGO }}
              >
                {received ? t('events.heard') : t('events.listening')}
              </span>
            </div>
            <div className="font-black text-base text-foreground leading-tight">{t('events.appTitle')}</div>
            <div className="space-y-1.5">
              {REACTION_META.map((r, ri) => {
                const fired = phase >= ri + 4;
                return (
                  <motion.div
                    key={ri}
                    animate={fired ? { x: [8, 0] } : { x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2.5 p-2 rounded-xl border transition-all duration-300"
                    style={{
                      borderColor: fired ? r.color + '88' : 'var(--border)',
                      backgroundColor: fired ? r.color + '14' : 'transparent',
                      opacity: fired ? 1 : 0.55,
                    }}
                  >
                    <div className="size-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: fired ? r.color : r.color + '1f' }}>
                      <r.Icon className="size-4" style={{ color: fired ? 'white' : r.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: r.color }}>{reactionKinds[ri]}</div>
                      <div className="text-xs text-foreground leading-snug">{copy.reactions[ri]}</div>
                    </div>
                    {fired && <Check className="size-4 shrink-0" style={{ color: r.color }} strokeWidth={3} />}
                  </motion.div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 rounded-lg bg-muted font-mono text-[11px] text-foreground">{sc.listener}</span>
              <span className="text-[11px] text-muted-foreground">{t('events.listenerNote')}</span>
            </div>
          </div>
        </div>

        {/* What an event is, and is not */}
        {/* lg:pr-20 (here and on the line below) keeps the text clear of the floating slide-nav buttons */}
        <div className="shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-2.5 lg:pr-20">
          {facts.map((f, fi) => (
            <div key={fi} className="rounded-xl border border-border bg-card/50 px-3.5 py-2.5">
              <div className="text-xs font-black text-foreground">{f.label}</div>
              <div className="text-[11px] text-muted-foreground leading-snug">{f.desc}</div>
            </div>
          ))}
        </div>

        <p className="shrink-0 text-xs text-muted-foreground lg:pr-20">
          <span className="font-bold text-foreground">{t('events.fitLabel')}</span>{t('events.fitBody')}
        </p>
      </div>

      <KeyPointBar text={t('keyPoints.s6-events')} className="mt-3" />
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
  // In order: why remix a template · why a testnet first · where to deploy for real.
  const quizQuestions = [quiz('quizTemplate', 1), quiz('quizTestnet', 3), quiz('quiz', 2)];

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

        {/* ═══════ 2b · HOW AN EIP BECOMES A STANDARD ═══════ */}
        <div id="s6-eip" className="h-full"><EipSlide /></div>

        {/* ═══════ 3 · TEMPLATE: OPENZEPPELIN ═══════ */}
        <div id="s6-template" className="h-full"><TemplateSlide /></div>

        {/* ═══════ 3b · AI-DRIVEN DEVELOPMENT ═══════ */}
        <div id="s6-ai" className="h-full"><AiSlide /></div>

        {/* ═══════ 4 · TOOLS & WHERE TO DEPLOY ═══════ */}
        <div id="s6-where" className="h-full"><WhereSlide /></div>

        {/* ═══════ 5 · DEPLOY TO A TESTNET (centerpiece) ═══════ */}
        <div id="s6-deploy" className="h-full"><DeployWalkthrough /></div>

        {/* ═══════ 5b · NODE INFRASTRUCTURE & WHERE TO HOST ═══════ */}
        <div id="s6-hosting" className="h-full"><HostingSlide /></div>

        {/* ═══════ 5c · EVENT-DRIVEN ARCHITECTURE ═══════ */}
        <div id="s6-events" className="h-full"><EventsSlide /></div>

        {/* ═══════ 6 · GOING DEEPER (optional) ═══════ */}
        <div id="s6-deeper" className="h-full"><DeeperSlide /></div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s6-takeaways" className="h-full">
          <TakeawaySlide
            title={t('takeaways.title')}
            takeaways={takeawayItems}
          />
        </div>

        {/* ═══════ QUIZ — one slide, stepped question by question ═══════ */}
        <div id="s6-quiz" className="h-full">
          <GroupedQuiz questions={quizQuestions} compact />
        </div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
