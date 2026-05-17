import { TitleSlide } from '../components/templates/TitleSlide';
import { TimelineSlide } from '../components/templates/TimelineSlide';
import { ConceptSlide } from '../components/templates/ConceptSlide';
import { TakeawaySlide } from '../components/templates/TakeawaySlide';
import { QuizSlide } from '../components/templates/QuizSlide';
import { CalloutBox } from '../components/shared/CalloutBox';
import { ScrollText, ExternalLink } from 'lucide-react';
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

export function Prologue() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={prologueChapters} />
      </div>
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
          <ConceptSlide
            title="What Is Money?"
            description="Before we get to Bitcoin, a quick look at the long road that got us here. Every generation invented new money — and each form solved the limits of the last."
            visual={
              <div className="space-y-4 w-full">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { era: '~9000 BCE', name: 'Barter', emoji: '🐄', desc: 'Direct exchange of goods. Worked in small tribes — broke down as soon as someone had grain and the other wanted a roof.', color: '#8b5cf6' },
                    { era: '~3000 BCE', name: 'Commodity money', emoji: '🐚', desc: 'Shells, salt, cattle, beads. The first abstract store of value — items everyone agreed had worth.', color: '#f59e0b' },
                    { era: '~600 BCE', name: 'Coins (gold / silver)', emoji: '🪙', desc: 'Stamped metal coins. Scarce, durable, divisible. Empires rose and fell controlling the mint.', color: '#ED1C24' },
                    { era: '~1000 CE', name: 'Paper notes & banks', emoji: '💵', desc: 'IOUs redeemable for gold, then for trust in the issuer alone. The gold standard ended in 1971 — money became pure trust.', color: '#39B54A' },
                    { era: '~1950', name: 'Bank cards / digital ledgers', emoji: '💳', desc: 'Money becomes a database entry at a bank. Convenient, but every transaction passes through gatekeepers.', color: '#6366f1' },
                    { era: '2009', name: 'Bitcoin', emoji: '₿', desc: 'Digital scarcity without a central issuer — the first form of money that nobody operates and nobody can switch off.', color: '#22d3ee' },
                  ].map(m => (
                    <div key={m.name} className="p-3 bg-card rounded-xl border" style={{ borderColor: m.color + '40' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{m.emoji}</span>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: m.color }}>{m.era}</div>
                          <div className="font-bold text-sm text-foreground">{m.name}</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">{m.desc}</p>
                    </div>
                  ))}
                </div>
                <CalloutBox type="tip" title="The throughline">
                  Each form of money fixed a problem with the last — portability, scarcity, divisibility, settlement speed. Bitcoin was an attempt to fix the trust assumption itself.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              'Money is older than writing — almost every civilization invented some form of it independently',
              'The form changes constantly; the function (medium of exchange, store of value, unit of account) stays the same',
              'Every shift opened new economic possibilities — and concentrated power in whoever controlled the new layer',
              'Asking "what comes next?" is not exotic — it\'s what societies have always done',
            ]}
          />
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
          <ConceptSlide
            title="The Cypherpunks"
            description="In the 1980s and 1990s, a loose group of cryptographers, hackers, and activists decided that privacy was not a luxury — it was a precondition for freedom."
            visual={
              <div className="space-y-4 w-full">
                <div className="p-6 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent rounded-xl border-2 border-[#8b5cf6]/40">
                  <p className="text-lg italic text-foreground leading-relaxed mb-3">
                    "Privacy is a precondition for freedom, not a luxury."
                  </p>
                  <p className="text-sm text-muted-foreground">— Cypherpunk philosophy</p>
                </div>
                <CalloutBox type="important" title="Core Cypherpunk Principle">
                  "Privacy is necessary for an open society in the electronic age. We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy out of their beneficence."
                  — Eric Hughes, A Cypherpunk's Manifesto (1993)
                </CalloutBox>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-2">🔐 Privacy by Default</h4>
                    <p className="text-sm text-muted-foreground">Systems should protect privacy without requiring trust in any authority</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                    <h4 className="font-bold text-[#39B54A] mb-2">💻 Code is Law</h4>
                    <p className="text-sm text-muted-foreground">Cryptographic mathematics, not legislation, should enforce rights</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                    <h4 className="font-bold text-[#6366f1] mb-2">🌐 Open Source</h4>
                    <p className="text-sm text-muted-foreground">Tools must be public, auditable, and available to everyone — no gatekeepers</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-2">🏗️ Build, Don't Beg</h4>
                    <p className="text-sm text-muted-foreground">Write code to change reality, don't wait for permission from institutions</p>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "The movement emerged in response to growing government surveillance",
              "Members communicated via encrypted mailing lists",
              "They published tools like PGP, Tor, and anonymous remailers",
              "Their work became the technical DNA of Bitcoin and all blockchains"
            ]}
          />
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
          <TimelineSlide
            title="From Cypherpunks to Bitcoin"
            events={[
              {
                year: "1982",
                title: "David Chaum — DigiCash",
                description: "The first anonymous digital cash system using blind signatures. Chaum proved that private electronic payments were mathematically possible."
              },
              {
                year: "1991",
                title: "Haber & Stornetta — Cryptographic Timestamps",
                description: "Proposed a cryptographically secured chain of blocks to timestamp digital documents — the direct ancestor of blockchain structure."
              },
              {
                year: "1993",
                title: "Eric Hughes — A Cypherpunk's Manifesto",
                description: "Published the founding document of the cypherpunk movement, declaring privacy a fundamental right to be defended with code."
              },
              {
                year: "1997",
                title: "Adam Back — Hashcash",
                description: "A proof-of-work system originally designed to combat email spam. This concept became the direct inspiration for Bitcoin's mining mechanism."
              },
              {
                year: "1998",
                title: "Wei Dai (B-Money) & Nick Szabo (Bit Gold)",
                description: "Two independent proposals for decentralized digital currencies using cryptographic proofs — both direct precursors to Bitcoin's design."
              },
              {
                year: "2008",
                title: "Satoshi Nakamoto — The Bitcoin Whitepaper",
                description: "An anonymous individual or group published 'Bitcoin: A Peer-to-Peer Electronic Cash System', combining decades of cypherpunk research into one unified protocol."
              },
              {
                year: "2009",
                title: "The Genesis Block",
                description: "Block #0 is mined on January 3, 2009. Embedded message: 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks'."
              }
            ]}
          />
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
