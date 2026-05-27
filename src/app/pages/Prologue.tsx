import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { TitleSlide } from '../components/templates/TitleSlide';
import { ConceptSlide } from '../components/templates/ConceptSlide';
import { TakeawaySlide } from '../components/templates/TakeawaySlide';
import { QuizSlide } from '../components/templates/QuizSlide';
import { CalloutBox } from '../components/shared/CalloutBox';
import { ScrollText, ExternalLink, User } from 'lucide-react';
import { SectionNav } from '../components/navigation/SectionNav';
import bitcoinPedigree from '../../assets/bf/bitcoin-academic-pedigree.png';

const prologueChapters = [
  { id: 'p-money',             label: 'What Is Money?' },
  { id: 'p-money-value',       label: 'Why It Has Value' },
  { id: 'p-cypherpunks',       label: 'The Cypherpunks' },
  { id: 'p-cypherpunk-values', label: 'By the People' },
  { id: 'p-timeline',          label: 'Timeline' },
  { id: 'p-pedigree',          label: 'Academic Pedigree' },
  { id: 'p-why',               label: 'Why It Matters' },
  { id: 'p-who-controls',      label: 'Who Owns Your Money?' },
  { id: 'p-takeaways',         label: 'Takeaways' },
  { id: 'p-quiz',              label: 'Quizzes' },
];

/* ── Money Evolution Timeline (animated) ──────────────────────────────── */
const MONEY_EVENTS = [
  { era: '~9000 BCE', name: 'Barter',                        emoji: '🐄', color: '#8b5cf6', desc: 'Direct exchange of goods. Worked in small tribes — broke down the moment someone had grain and the other wanted a roof.' },
  { era: '~3000 BCE', name: 'Commodity money',               emoji: '🐚', color: '#f59e0b', desc: 'Shells, salt, cattle, beads. The first abstract store of value — items everyone agreed had worth.' },
  { era: '~600 BCE',  name: 'Coins (gold / silver)',         emoji: '🪙', color: '#ED1C24', desc: 'Stamped metal coins. Scarce, durable, divisible. Empires rose and fell controlling the mint.' },
  { era: '~1000 CE',  name: 'Paper notes & banks',           emoji: '💵', color: '#39B54A', desc: 'IOUs redeemable for gold, then for trust in the issuer alone. The gold standard ended in 1971 — money became pure trust.' },
  { era: '~1950',     name: 'Bank cards / digital ledgers',  emoji: '💳', color: '#6366f1', desc: 'Money becomes a database entry at a bank. Convenient — but every transaction passes through a gatekeeper.' },
  { era: '2009',      name: 'Bitcoin',                       emoji: '₿', color: '#22d3ee', desc: 'Digital scarcity without a central issuer — the first form of money that nobody operates and nobody can switch off.' },
];

function MoneyEvolutionTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const connectorRef = useRef<SVGPathElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting && !revealed) {
          setRevealed(true);

          // Draw the S-connector
          if (connectorRef.current) {
            try {
              const len = connectorRef.current.getTotalLength();
              connectorRef.current.style.strokeDasharray = String(len);
              connectorRef.current.style.strokeDashoffset = String(len);
              anime({
                targets: connectorRef.current,
                strokeDashoffset: [len, 0],
                duration: 1400,
                delay: 450,
                easing: 'easeInOutQuad',
              });
            } catch { /* ignore */ }
          }

          // Stagger reveal each card (top row first L→R, then bottom row L→R)
          itemRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateY(18px) scale(0.94)';
            anime({
              targets: el,
              opacity: [0, 1],
              translateY: [18, 0],
              scale: [0.94, 1],
              duration: 500,
              delay: 200 + i * 140,
              easing: 'easeOutQuad',
            });
          });
          break;
        }
      }
    }, { threshold: 0.3 });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [revealed]);

  const top = MONEY_EVENTS.slice(0, 3);
  const bottom = MONEY_EVENTS.slice(3, 6);

  const renderCard = (m: typeof MONEY_EVENTS[number], idx: number) => (
    <div
      key={m.name}
      ref={el => { itemRefs.current[idx] = el; }}
      className="flex flex-col bg-card rounded-xl border-2 p-4 shadow-sm hover:shadow-md transition-shadow"
      style={{
        borderColor: m.color + '50',
        boxShadow: `0 4px 14px ${m.color}12`,
        opacity: 0,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="text-3xl leading-none">{m.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: m.color }}>
            {m.era}
          </div>
          <div className="text-base font-bold text-foreground leading-tight">{m.name}</div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-snug">{m.desc}</p>
    </div>
  );

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto">
      {/* Top row — chronological L→R */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top.map((m, i) => renderCard(m, i))}
      </div>

      {/* S-shaped connector (top-right of row 1 → bottom-left of row 2) */}
      <div className="relative h-20 my-1">
        {/* SVG curve — stretched to fit width, stroke uses non-scaling so thickness stays constant */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="money-snake-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ED1C24" />
              <stop offset="55%" stopColor="#39B54A" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          {/* Soft glow line behind the main stroke */}
          <path
            d="M 920 6 C 920 60 80 20 80 74"
            fill="none"
            stroke="url(#money-snake-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeOpacity="0.15"
            vectorEffect="non-scaling-stroke"
          />
          {/* Main stroke */}
          <path
            ref={connectorRef}
            d="M 920 6 C 920 60 80 20 80 74"
            fill="none"
            stroke="url(#money-snake-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* Arrowhead — separate SVG positioned with CSS, never stretched */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '8%',
            bottom: '-1px',
            transform: 'translate(-50%, 0)',
          }}
          aria-hidden="true"
        >
          <svg width="18" height="14" viewBox="0 0 18 14">
            <polygon points="2,2 16,2 9,13" fill="#6366f1" />
          </svg>
        </div>
        {/* Origin dot at the start of the curve */}
        <div
          className="absolute pointer-events-none size-2.5 rounded-full"
          style={{
            right: '8%',
            top: '0',
            transform: 'translate(50%, -50%)',
            backgroundColor: '#ED1C24',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom row — chronological L→R (continues the snake) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bottom.map((m, i) => renderCard(m, i + 3))}
      </div>
    </div>
  );
}

/* ── Cypherpunks → Bitcoin timeline (compact, fits viewport) ─────────── */
const CYPHERPUNK_EVENTS = [
  { year: '1982', icon: '💰', title: 'David Chaum — DigiCash',                       desc: 'First anonymous digital cash system using blind signatures. Chaum proved private electronic payments were mathematically possible — the cryptographic foundation everyone else would later build on.', color: '#8b5cf6' },
  { year: '1991', icon: '⏱️', title: 'Haber & Stornetta — Cryptographic Timestamps', desc: 'A cryptographically secured chain of blocks to timestamp digital documents. Without realizing it, they had invented the direct ancestor of every blockchain structure that followed.', color: '#f59e0b' },
  { year: '1993', icon: '📜', title: "Eric Hughes — A Cypherpunk's Manifesto",       desc: 'The founding document of the cypherpunk movement. Privacy declared a fundamental right, to be defended with code instead of laws. The ideology Bitcoin would later embody.', color: '#ED1C24' },
  { year: '1997', icon: '⛏️', title: 'Adam Back — Hashcash',                          desc: 'A proof-of-work system originally designed to combat email spam — forcing senders to burn small amounts of CPU. This exact concept became the direct inspiration for Bitcoin mining.', color: '#39B54A' },
  { year: '1998', icon: '🥇', title: 'Wei Dai (B-Money) & Nick Szabo (Bit Gold)',     desc: 'Two independent proposals for decentralized digital currencies using cryptographic proofs and distributed consensus. Both are now considered the direct precursors to Bitcoin\'s design.', color: '#6366f1' },
  { year: '2008', icon: '📄', title: 'Satoshi Nakamoto — The Bitcoin Whitepaper',     desc: '"Bitcoin: A Peer-to-Peer Electronic Cash System." An anonymous individual or group combines two decades of cypherpunk research — hashcash, chained timestamps, digital scarcity — into a single working protocol.', color: '#22d3ee' },
  { year: '2009', icon: '🚀', title: 'The Genesis Block',                             desc: 'January 3, 2009 — Block #0 is mined. Embedded message: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks". The ideological intent is written into the ledger itself.', color: '#ec4899' },
];

function CypherpunksMovementTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef      = useRef<HTMLDivElement | null>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting && !revealed) {
          setRevealed(true);
          if (lineRef.current) {
            lineRef.current.style.transformOrigin = 'top';
            lineRef.current.style.transform = 'scaleY(0)';
            anime({
              targets: lineRef.current,
              scaleY: [0, 1],
              duration: 1600,
              easing: 'easeInOutQuad',
            });
          }
          itemRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateX(-16px)';
            anime({
              targets: el,
              opacity: [0, 1],
              translateX: [-16, 0],
              duration: 500,
              delay: 220 + i * 150,
              easing: 'easeOutQuad',
            });
          });
          dotRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.transform = 'scale(0)';
            anime({
              targets: el,
              scale: [0, 1.2, 1],
              duration: 500,
              delay: 220 + i * 150 + 80,
              easing: 'easeOutBack',
            });
          });
          break;
        }
      }
    }, { threshold: 0.25 });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [revealed]);

  return (
    <div className="w-full h-full flex flex-col p-5 lg:p-8">
      <div className="shrink-0 mb-3">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">From Cypherpunks to Bitcoin</h2>
        <p className="text-sm lg:text-base text-muted-foreground mt-1">
          Twenty-seven years from the first anonymous digital cash to the genesis block — each link made the next one possible.
        </p>
      </div>

      <div ref={containerRef} className="relative flex-1 min-h-0 overflow-y-auto pl-12 pr-2">
        {/* Vertical spine */}
        <div
          ref={lineRef}
          className="absolute left-[1.15rem] top-3 bottom-3 w-[3px] rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #8b5cf6 0%, #f59e0b 14%, #ED1C24 28%, #39B54A 46%, #6366f1 62%, #22d3ee 78%, #ec4899 95%)',
          }}
        />
        <div className="flex flex-col gap-3">
          {CYPHERPUNK_EVENTS.map((ev, i) => (
            <div
              key={ev.year}
              ref={el => { itemRefs.current[i] = el; }}
              className="relative pl-6"
            >
              <div
                ref={el => { dotRefs.current[i] = el; }}
                className="absolute -left-[1.45rem] top-3 size-7 rounded-full border-[3px] border-background shadow-md flex items-center justify-center text-sm leading-none"
                style={{ backgroundColor: ev.color, color: '#fff' }}
              >
                {ev.icon}
              </div>
              <div
                className="bg-card border-2 rounded-xl px-4 py-3 transition-colors hover:scale-[1.01] transition-transform"
                style={{ borderColor: ev.color + '40' }}
              >
                <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                  <span className="font-mono text-base font-black tabular-nums" style={{ color: ev.color }}>
                    {ev.year}
                  </span>
                  <h3 className="text-base lg:text-lg font-bold text-foreground leading-tight">{ev.title}</h3>
                </div>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Prologue() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={prologueChapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="PROLOGUE"
            title="The History of Blockchain"
            subtitle="How a movement for privacy and freedom gave birth to decentralized money"
            icon={<ScrollText className="size-20 text-[#8b5cf6]" />}
            gradient="from-[#8b5cf6] to-[#ED1C24]"
          />
        </div>

        {/* ═══════ MONEY · A SHORT HISTORY ═══════ */}
        <div id="p-money" className="h-full">
          <div className="w-full h-full flex flex-col p-5 lg:p-8">
            <div className="shrink-0 mb-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">What Is Money?</h2>
              <p className="text-sm lg:text-base text-muted-foreground max-w-3xl">
                Before we get to Bitcoin, a quick look at the long road that got us here.
                Every generation invented new money — and each form solved the limits of the last.
              </p>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <MoneyEvolutionTimeline />
              <div className="max-w-3xl mx-auto mt-4">
                <CalloutBox type="tip" title="The throughline">
                  Each form of money fixed a problem with the last — portability, scarcity, divisibility, settlement speed. Bitcoin was an attempt to fix the trust assumption itself.
                </CalloutBox>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ WHY DOES MONEY HAVE VALUE ═══════ */}
        <div id="p-money-value" className="h-full">
          <ConceptSlide
            title="Why Does Money Have Value?"
            description="A piece of paper, a number in a database, a gold coin, a Bitcoin — none of them are intrinsically worth anything. Money works because four things are true at once."
            visual={
              <div className="space-y-4 w-full">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { emoji: '🤝', label: 'Shared trust',    color: '#8b5cf6', desc: 'Everyone in the network agrees this thing is worth something. The agreement is the value.' },
                    { emoji: '🪨', label: 'Scarcity',        color: '#ED1C24', desc: 'You can\'t easily make more of it. Gold is rare. Dollars are limited by central banks. Bitcoin caps at 21 million.' },
                    { emoji: '🔧', label: 'Utility',         color: '#39B54A', desc: 'You can use it — pay taxes, buy bread, settle a debt. A currency no one accepts is just a collectible.' },
                    { emoji: '🌐', label: 'Network effect',  color: '#6366f1', desc: 'The more people accept it, the more useful it becomes. New money struggles, established money compounds.' },
                  ].map(p => (
                    <div key={p.label} className="flex items-start gap-3 p-4 bg-card rounded-xl border-2" style={{ borderColor: p.color + '50' }}>
                      <div className="text-3xl shrink-0">{p.emoji}</div>
                      <div>
                        <div className="font-black text-sm" style={{ color: p.color }}>{p.label}</div>
                        <div className="text-xs text-muted-foreground mt-1 leading-snug">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <CalloutBox type="important" title="A thought experiment">
                  Tomorrow morning, every shop in your country decides not to accept euros. The notes in your wallet still exist — what are they worth? Money's value lives in <em>everyone else's</em> head, not in the paper.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              'Money has value because we collectively decide it does — there is no objective number',
              'When trust breaks (hyperinflation, bank runs, sanctions), the same notes lose worth overnight',
              'Bitcoin\'s designers asked: can we engineer trust + scarcity + utility + network effects without any central authority?',
              'This is the question the rest of this course tries to answer',
            ]}
          />
        </div>

        {/* ═══════ 1. THE CYPHERPUNKS ═══════ */}
        <div id="p-cypherpunks" className="h-full">
          <div className="w-full h-full flex flex-col p-5 lg:p-8">
            <div className="shrink-0 mb-3">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">The Cypherpunks</h2>
              <p className="text-sm lg:text-base text-muted-foreground max-w-3xl">
                In the 1980s and 1990s, a loose group of cryptographers, hackers, and activists decided that privacy was not a luxury — it was a precondition for freedom.
              </p>
            </div>

            {/* TOP — quote + callout on the left, portrait + manifesto link on the right */}
            <div className="shrink-0 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 mb-3">
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent rounded-xl border-2 border-[#8b5cf6]/40">
                  <p className="text-base italic text-foreground leading-relaxed mb-1">
                    "Privacy is a precondition for freedom, not a luxury."
                  </p>
                  <p className="text-[11px] text-muted-foreground">— Cypherpunk philosophy</p>
                </div>
                <CalloutBox type="important" title="Core Cypherpunk Principle">
                  "Privacy is necessary for an open society in the electronic age. We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy out of their beneficence." — Eric Hughes, <em>A Cypherpunk's Manifesto</em> (1993)
                </CalloutBox>
              </div>

              <div className="flex items-center justify-center gap-4 p-3 bg-gradient-to-br from-[#8b5cf6]/8 to-transparent rounded-xl border border-[#8b5cf6]/30">
                <div className="relative shrink-0">
                  <div className="size-20 lg:size-24 rounded-full bg-gradient-to-br from-[#8b5cf6] via-[#6366f1] to-[#ED1C24] flex items-center justify-center shadow-lg shadow-[#8b5cf6]/40 border-4 border-card">
                    <User className="size-10 lg:size-12 text-white/95" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-card border border-[#8b5cf6]/50 shadow text-[9px] font-mono font-bold text-[#8b5cf6] whitespace-nowrap">
                    1993
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-0">
                  <div>
                    <div className="text-base font-bold text-foreground leading-tight">Eric Hughes</div>
                    <div className="text-[10px] text-[#8b5cf6] font-semibold uppercase tracking-widest">
                      Cypherpunk · Manifesto author
                    </div>
                  </div>
                  <a
                    href="https://www.activism.net/cypherpunk/manifesto.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#ED1C24] text-white text-xs font-bold shadow-md shadow-[#8b5cf6]/40 hover:opacity-90 hover:scale-[1.02] transition-all w-fit"
                  >
                    📄 Read the Manifesto
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* BOTTOM — 4 principle cards filling the rest of the slide */}
            <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {[
                { color: '#ED1C24', icon: '🔐', title: 'Privacy by Default',
                  body: 'Systems should protect privacy without requiring trust in any authority — encryption is the default state, not a switch you have to find and turn on.' },
                { color: '#39B54A', icon: '💻', title: 'Code is Law',
                  body: 'Cryptographic mathematics, not legislation, should enforce rights. A law can be repealed; a published cryptographic protocol cannot be un-known.' },
                { color: '#6366f1', icon: '🌐', title: 'Open Source',
                  body: 'Tools must be public, auditable, and available to everyone — no gatekeepers. If the code is secret, the privacy it claims to give is unverifiable.' },
                { color: '#f59e0b', icon: '🏗️', title: 'Build, Don\'t Beg',
                  body: "Write code to change reality. Don't wait for permission from institutions, don't lobby — ship something that makes the lobbying irrelevant." },
              ].map(p => (
                <div
                  key={p.title}
                  className="flex flex-col p-4 lg:p-5 rounded-xl border-2 bg-gradient-to-br to-transparent transition-transform hover:scale-[1.02]"
                  style={{
                    borderColor: p.color + '55',
                    background: `linear-gradient(to bottom right, ${p.color}15, transparent)`,
                  }}
                >
                  <div className="text-3xl lg:text-4xl mb-2">{p.icon}</div>
                  <h4 className="font-black mb-2 text-base lg:text-lg" style={{ color: p.color }}>
                    {p.title}
                  </h4>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed flex-1">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ 2. CYPHERPUNK VALUES ═══════ */}
        <div id="p-cypherpunk-values" className="h-full">
          <ConceptSlide
            title="Technology by the People, for the People"
            description="The Cypherpunks weren't building products. They were building liberation tools — and they gave them away for free."
            visual={
              <div className="space-y-4 w-full">
                <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/15 to-[#ED1C24]/10 rounded-xl border-2 border-[#8b5cf6]/50">
                  <p className="text-base font-bold text-foreground mb-1">The Manifesto in Three Words</p>
                  <div className="flex gap-3 mt-3">
                    <div className="flex-1 text-center p-3 bg-[#8b5cf6]/20 rounded-lg border border-[#8b5cf6]/40">
                      <div className="text-2xl font-black text-[#8b5cf6]">PRIVACY</div>
                      <div className="text-xs text-muted-foreground mt-1">is a right, not a feature</div>
                    </div>
                    <div className="flex-1 text-center p-3 bg-[#ED1C24]/20 rounded-lg border border-[#ED1C24]/40">
                      <div className="text-2xl font-black text-[#ED1C24]">AUTONOMY</div>
                      <div className="text-xs text-muted-foreground mt-1">over your own data and money</div>
                    </div>
                    <div className="flex-1 text-center p-3 bg-[#39B54A]/20 rounded-lg border border-[#39B54A]/40">
                      <div className="text-2xl font-black text-[#39B54A]">CODE</div>
                      <div className="text-xs text-muted-foreground mt-1">is the law that can't be lobbied</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm italic text-muted-foreground leading-relaxed">
                    "We are writing code. We know that software can't be destroyed and that a widely dispersed system can't be shut down."
                  </p>
                  <p className="text-xs text-[#8b5cf6] font-bold mt-2">— Eric Hughes, A Cypherpunk's Manifesto (1993)</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/20 rounded-lg border border-border text-center">
                    <div className="text-lg font-black text-foreground">👤 → 🌍</div>
                    <div className="text-xs text-muted-foreground mt-1">Individual tools with global reach</div>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-lg border border-border text-center">
                    <div className="text-lg font-black text-foreground">🔓 Free</div>
                    <div className="text-xs text-muted-foreground mt-1">Open-source, no gatekeepers, no cost</div>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Anyone, anywhere could use or audit the tools — no permission needed",
              "Designed to be censorship-resistant: no single point of shutdown",
              "The enemy wasn't technology — it was centralised power over information",
              "Bitcoin inherited this DNA: no CEO, no headquarters, no off switch",
            ]}
          />
        </div>

        {/* ═══════ 3. TIMELINE ═══════ */}
        <div id="p-timeline" className="h-full">
          <CypherpunksMovementTimeline />
        </div>

        {/* ═══════ BITCOIN'S ACADEMIC PEDIGREE ═══════ */}
        <div id="p-pedigree" className="h-full flex flex-col p-6 lg:p-10 relative overflow-hidden">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Bitcoin's Academic Pedigree</h2>
            <p className="text-muted-foreground text-sm mt-1">The concept of cryptocurrencies is built from forgotten ideas in research literature — every piece predates Bitcoin by decades.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-[1.8fr_1fr] gap-6">
            <div className="flex items-center justify-center bg-white rounded-xl border border-border p-3 min-h-0">
              <img
                src={bitcoinPedigree}
                alt="Chronology of key ideas found in Bitcoin: a 1980-to-2015 grid mapping research strands (Linked Timestamping, Digital Cash, Proof of Work, Byzantine Fault Tolerance, Public Keys as Identities, Smart Contracts) to specific papers — Merkle Tree (1980), Ecash (1980s), Hashcash (1990s), Bit Gold (2005), Bitcoin (2008), Ethereum (2015)."
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="p-4 bg-card border border-[#8b5cf6]/30 rounded-xl">
                <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest mb-2">The paper</div>
                <div className="font-bold text-foreground text-sm leading-snug mb-1">Bitcoin's Academic Pedigree</div>
                <div className="text-xs text-muted-foreground">Arvind Narayanan &amp; Jeremy Clark · ACM Queue, 2017</div>
              </div>
              <div className="p-4 bg-card border border-border rounded-xl flex-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Six research strands fed into Bitcoin</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {[
                    { c: '#6366f1', l: 'Linked timestamping', s: 'Haber & Stornetta · 1990–91' },
                    { c: '#39B54A', l: 'Digital cash',         s: 'Chaum · Ecash · 1982+' },
                    { c: '#f59e0b', l: 'Proof of work',        s: 'Dwork–Naor · Hashcash · 1990s' },
                    { c: '#22d3ee', l: 'Byzantine fault tolerance', s: 'Lamport · Paxos · PBFT' },
                    { c: '#ED1C24', l: 'Public keys as identities', s: 'Chaum · Goldberg' },
                    { c: '#8b5cf6', l: 'Smart contracts',      s: 'Szabo · 1994 essay' },
                  ].map(r => (
                    <li key={r.l} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full shrink-0" style={{ background: r.c }} />
                      <div>
                        <div className="font-semibold text-foreground">{r.l}</div>
                        <div className="text-[10px]">{r.s}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="https://www.resistance.money/class/readings/pedigree.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#8b5cf6] text-xs font-bold hover:bg-[#8b5cf6]/25 transition-colors"
              >
                📄 Read the full paper
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ═══════ 4. WHY THIS HISTORY MATTERS ═══════ */}
        <div id="p-why" className="h-full">
          <ConceptSlide
            title="Why This History Matters"
            description="Bitcoin did not emerge from nothing. It was the culmination of 30 years of cryptographic research, failed experiments, and ideological conviction."
            visual={
              <div className="space-y-4 w-full">
                <div className="p-5 bg-card rounded-xl border-2 border-[#ED1C24]">
                  <h4 className="font-bold text-[#ED1C24] mb-3">🧩 What Satoshi Combined</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="font-bold text-foreground">Proof of Work</div>
                      <div className="text-muted-foreground">From Hashcash (Adam Back)</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="font-bold text-foreground">Chained Blocks</div>
                      <div className="text-muted-foreground">From Haber & Stornetta</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="font-bold text-foreground">Digital Scarcity</div>
                      <div className="text-muted-foreground">From Bit Gold (Nick Szabo)</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="font-bold text-foreground">P2P Distribution</div>
                      <div className="text-muted-foreground">From B-Money (Wei Dai)</div>
                    </div>
                  </div>
                </div>
                <CalloutBox type="tip" title="Satoshi's Genius">
                  Satoshi didn't invent any single component. The genius was in combining existing cryptographic primitives with economic incentive design into one coherent system that actually worked.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Every core concept (hashing, digital signatures, PoW) predates Bitcoin",
              "Previous attempts (DigiCash, B-Money, Bit Gold) all failed or remained theoretical",
              "Bitcoin succeeded because it aligned cryptography with economic incentives",
              "Understanding the history helps you evaluate new blockchain projects critically"
            ]}
          />
        </div>

        {/* ═══════ WHO CONTROLS YOUR MONEY? ═══════ */}
        <div id="p-who-controls" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Who Controls Your Money?</h2>
            <p className="text-muted-foreground text-sm mt-1">A side-by-side of what can actually happen to the value you hold, in each system.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-4 gap-3">
            {[
              {
                name: 'Cash',
                emoji: '💵',
                color: '#f59e0b',
                control: 'You',
                rows: [
                  ['Custody',       'Physical · only you hold it'],
                  ['Can be frozen?', 'No — but can be lost, stolen, or seized in person'],
                  ['Supply',        'Inflated by the central bank'],
                  ['Censorship',    'None online · works face-to-face'],
                  ['Cross-border',  'Hard · limits, declarations, FX desks'],
                  ['Digital?',      'No — physical only'],
                ],
              },
              {
                name: 'Bank account',
                emoji: '🏦',
                color: '#ED1C24',
                control: 'Your bank + government',
                rows: [
                  ['Custody',       'The bank holds it · you have a claim'],
                  ['Can be frozen?', 'Yes · account freeze, sanctions, garnishment'],
                  ['Supply',        'Fractional reserve + central-bank policy'],
                  ['Censorship',    'Yes · bank can refuse transactions / clients'],
                  ['Cross-border',  '3–5 days · SWIFT · 1–3% FX spread'],
                  ['Digital?',      'Yes · via the bank\'s database'],
                ],
              },
              {
                name: 'Digital payment',
                emoji: '📱',
                color: '#8b5cf6',
                control: 'The platform',
                rows: [
                  ['Custody',       'Platform holds · you have a balance'],
                  ['Can be frozen?', 'Yes · de-platformed, chargebacks, terms of service'],
                  ['Supply',        'Same as the underlying fiat'],
                  ['Censorship',    'Yes · platform decides who transacts'],
                  ['Cross-border',  'Restricted · region-locked · KYC tiers'],
                  ['Digital?',      'Yes · proprietary rails'],
                ],
              },
              {
                name: 'Bitcoin',
                emoji: '₿',
                color: '#22d3ee',
                control: 'You (if self-custody)',
                rows: [
                  ['Custody',       'Your keys, your coins (or a custodian, if you choose)'],
                  ['Can be frozen?', 'Not at the protocol layer · custodians can freeze theirs'],
                  ['Supply',        'Capped at 21 million · no human can change it'],
                  ['Censorship',    'Permissionless · anyone can send / receive'],
                  ['Cross-border',  'Same as a local transfer · minutes, no FX'],
                  ['Digital?',      'Native-digital · settles on a public ledger'],
                ],
              },
            ].map(c => (
              <div key={c.name} className="flex flex-col rounded-xl border-2 overflow-hidden" style={{ borderColor: c.color + '50' }}>
                <div className="p-3 text-center" style={{ backgroundColor: c.color + '15' }}>
                  <div className="text-3xl mb-1">{c.emoji}</div>
                  <div className="font-black text-foreground">{c.name}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: c.color }}>{c.control}</div>
                </div>
                <div className="flex-1 flex flex-col">
                  {c.rows.map(([k, v], i) => (
                    <div key={k} className="px-3 py-2 text-[11px]" style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{k}</div>
                      <div className="text-foreground leading-snug mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="shrink-0 mt-4 p-4 bg-gradient-to-br from-[#8b5cf6]/10 via-[#ED1C24]/10 to-[#22d3ee]/10 border-2 border-[#8b5cf6]/40 rounded-xl text-center">
            <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest mb-1">Question to sit with</div>
            <div className="text-base font-semibold text-foreground">What does it mean to truly <em>own</em> something digital — if there is always someone who can take it back?</div>
          </div>
        </div>

        {/* ═══════ 5. TAKEAWAYS ═══════ */}
        <div id="p-takeaways" className="h-full">
          <TakeawaySlide
            title="Prologue Takeaways"
            takeaways={[
              "Money is older than writing — its form keeps changing, its function (trust + scarcity + utility + network) does not",
              "Value lives in collective agreement, not in the object — when trust breaks, the same notes become paper",
              "The cypherpunk movement championed privacy as a fundamental right, defended through code rather than law",
              "From the 1980s to 2008, cryptographers built the individual pieces that Bitcoin would later unify",
              "Satoshi combined proof-of-work, chained blocks, digital scarcity, and P2P networking — none of which he invented",
              "The Genesis Block message — 'Chancellor on brink of second bailout for banks' — reveals Bitcoin's ideological roots",
              "Cash, bank accounts, and digital-payment platforms each hand control to someone else; Bitcoin asks: can you keep it yourself?",
            ]}
          />
        </div>

        {/* ═══════ 6. QUIZZES ═══════ */}
        <div id="p-quiz" className="h-full">
          <QuizSlide
            question="Money has taken many forms — shells, coins, paper, bank-account entries, Bitcoin. What is the underlying reason any of them have value?"
            options={[
              { text: "The material they're made of (metal, paper, electrons) determines their worth", correct: false },
              { text: "Governments declare them valuable through law", correct: false },
              { text: "A network of people collectively agrees to accept them — trust, scarcity, utility, and network effects compound", correct: true },
              { text: "Their value is fixed once a central authority decides on an exchange rate", correct: false },
            ]}
            explanation="Money's value is not in the object — it's in the shared agreement of everyone in the network. When that agreement breaks (hyperinflation, sanctions, platform bans), the same notes lose value overnight. The four foundations are: trust, scarcity, utility, and network effects. Bitcoin asks whether all four can be engineered without any single authority — that's the question this course explores."
          />
        </div>

        <div className="h-full">
          <QuizSlide
            question="What was the core belief of the Cypherpunk movement?"
            options={[
              { text: "Governments should regulate all digital communications", correct: false },
              { text: "Privacy is a precondition for freedom and should be defended with code", correct: true },
              { text: "Corporations should control encryption technology", correct: false },
              { text: "Digital currencies should be managed by central banks", correct: false },
            ]}
            explanation="The Cypherpunks believed that privacy is not a luxury but a fundamental right, and that cryptographic code — not laws or institutions — should enforce it."
          />
        </div>

        <div className="h-full">
          <QuizSlide
            question="Which concept did Adam Back's Hashcash (1997) directly inspire in Bitcoin?"
            options={[
              { text: "Smart contracts", correct: false },
              { text: "Blind signatures for anonymous payments", correct: false },
              { text: "Proof-of-work mining", correct: true },
              { text: "Peer-to-peer networking", correct: false },
            ]}
            explanation="Hashcash was a proof-of-work system originally designed to combat email spam. Satoshi Nakamoto adapted this concept as the foundation for Bitcoin's mining and consensus mechanism."
          />
        </div>

        <div className="h-full">
          <QuizSlide
            question="What message did Satoshi Nakamoto embed in Bitcoin's Genesis Block?"
            options={[
              { text: "\"Hello World\"", correct: false },
              { text: "\"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks\"", correct: true },
              { text: "\"A Cypherpunk's Manifesto\"", correct: false },
              { text: "\"In code we trust\"", correct: false },
            ]}
            explanation="The embedded headline from The Times newspaper reveals Bitcoin's ideological roots — it was created as a direct response to the failures of the traditional banking system during the 2008 financial crisis."
          />
        </div>

        </div>
      </div>
    </div>
  );
}
