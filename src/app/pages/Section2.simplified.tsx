/**
 * Section 2 — Bitcoin: The First Working Example
 *
 * Restructured per the plan in conversation (replacing the 17-chapter
 * Bitcoin info-dump). Six focused slides:
 *
 *   1. The 2008 Paper — Satoshi's announcement, the two problems he claimed
 *      to solve (double-spending + Byzantine generals), with their modern
 *      relevance.
 *   2. What is Bitcoin — the properties (permissionless, open source,
 *      scarce, censorship-resistant).
 *   3. Bitcoin's Proof of Work — Section 1's mining race, made specific:
 *      SHA-256, 10-minute blocks, halving cadence.
 *   4. 21 Million Hard Cap — supply and the halving schedule (one slide).
 *   5. What Bitcoin Can't Do — programmability gap, throughput limits.
 *      Bridge to Course 2 (smart contracts) and Course 3 (platforms).
 *   6. Takeaways.
 *
 * Slides parked in Section2.legacy.tsx for Phase 2 moves:
 *   • Keys & Seed Phrase + Build a Wallet → Course 2 Section 5
 *   • Merkle Tree, Network Stats, Node Distribution, Supply deep-dive
 *     → Course 3 Bitcoin section
 *   • Old Mining/Find-a-Nonce/Immutability → duplicates of Section 1
 *     content, will be deleted at cleanup
 */
import { TitleSlide } from '../components/templates/TitleSlide';
import { ConceptSlide } from '../components/templates/ConceptSlide';
import { TakeawaySlide } from '../components/templates/TakeawaySlide';
import { CalloutBox } from '../components/shared/CalloutBox';
import { DefinitionBox } from '../components/shared/DefinitionBox';
import { SectionNav } from '../components/navigation/SectionNav';
import { Bitcoin, ExternalLink, AlertTriangle, ShieldX } from 'lucide-react';

const section2Chapters = [
  { id: 's2-paper',     label: 'The 2008 Paper' },
  { id: 's2-what',      label: 'What is Bitcoin?' },
  { id: 's2-pow',       label: "Bitcoin's PoW" },
  { id: 's2-supply',    label: '21M Hard Cap' },
  { id: 's2-limits',    label: "What it Can't Do" },
  { id: 's2-takeaways', label: 'Takeaways' },
];

/* ── Supply schedule data ─────────────────────────────────────────── */
const HALVING_EPOCHS = [
  { year: 2009, reward: '50 BTC',     cumulative: '0',         note: 'Genesis' },
  { year: 2012, reward: '25 BTC',     cumulative: '10.5M',     note: 'First halving' },
  { year: 2016, reward: '12.5 BTC',   cumulative: '15.75M',    note: '' },
  { year: 2020, reward: '6.25 BTC',   cumulative: '18.375M',   note: '' },
  { year: 2024, reward: '3.125 BTC',  cumulative: '19.69M',    note: 'We are here' },
  { year: 2028, reward: '1.5625 BTC', cumulative: '20.34M',    note: '' },
  { year: 2140, reward: '~0',         cumulative: '21M',       note: 'Cap reached' },
];

export function Section2() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={section2Chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

          {/* ═══════ TITLE ═══════ */}
          <div className="h-full">
            <TitleSlide
              sectionNumber="SECTION 02"
              title="Bitcoin"
              subtitle="The first working example of everything you just learned."
              icon={<Bitcoin className="size-20 text-[#f59e0b]" />}
              gradient="from-[#f59e0b] to-[#ED1C24]"
            />
          </div>

          {/* ═══════ 01 — THE 2008 PAPER ═══════ */}
          <div id="s2-paper" className="h-full">
            <div className="w-full h-full flex flex-col p-5 lg:p-8">
              <div className="shrink-0 mb-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#f59e0b] mb-1 font-bold">
                  October 31, 2008
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  An anonymous post. Two unsolvable problems. One paper.
                </h2>
                <p className="text-sm lg:text-base text-muted-foreground max-w-3xl">
                  Someone — or some group — calling themselves <span className="font-mono text-foreground">Satoshi Nakamoto</span> sent a 9-page PDF to a small cryptography mailing list. The claim inside was outrageous: that two problems no one had cracked in 30 years could both be solved at the same time, on the open internet, by ordinary computers.
                </p>
              </div>

              <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-4 lg:gap-6">
                {/* LEFT — the post */}
                <div className="flex flex-col gap-3 min-h-0">
                  <div className="rounded-xl border-2 border-[#f59e0b]/50 bg-card overflow-hidden">
                    <div className="px-4 py-2 bg-[#f59e0b]/15 border-b border-[#f59e0b]/30 flex items-center gap-2">
                      <span className="text-xs font-mono text-[#f59e0b] font-bold">📧 mailing list · cryptography@metzdowd.com</span>
                    </div>
                    <div className="p-4 space-y-2 text-sm font-mono">
                      <div className="text-foreground"><span className="text-muted-foreground">From:</span> Satoshi Nakamoto &lt;satoshi@vistomail.com&gt;</div>
                      <div className="text-foreground"><span className="text-muted-foreground">Subject:</span> Bitcoin P2P e-cash paper</div>
                      <div className="text-foreground"><span className="text-muted-foreground">Date:</span> Fri, 31 Oct 2008 14:10:00 -0700</div>
                      <div className="border-t border-border my-2" />
                      <p className="text-foreground italic text-xs lg:text-sm leading-relaxed">
                        "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party. The main properties: Double-spending is prevented with a peer-to-peer network. No mint or other trusted parties. Participants can be anonymous. New coins are made from Hashcash style proof-of-work…"
                      </p>
                      <div className="text-foreground text-xs pt-1"><span className="text-muted-foreground">Paper:</span> <span className="text-[#f59e0b]">bitcoin.org/bitcoin.pdf</span></div>
                    </div>
                  </div>
                  <CalloutBox type="tip" title="What happened next">
                    Almost nobody took it seriously. A few cypherpunks responded. Then on{' '}
                    <strong className="text-foreground">January 3, 2009</strong>, Satoshi mined Block #0 — embedded with the headline{' '}
                    <em>"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"</em>. The proof of the claim.
                  </CalloutBox>
                  <a
                    href="https://bitcoin.org/bitcoin.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold hover:bg-[#f59e0b]/25 transition-colors w-fit"
                  >
                    📄 Read the original whitepaper
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                {/* RIGHT — the two problems he claimed to solve */}
                <div className="flex flex-col gap-3 min-h-0">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                    Two problems no one had cracked
                  </p>

                  {/* Double-Spending */}
                  <div className="p-4 rounded-xl border-2 border-[#ED1C24]/40 bg-gradient-to-br from-[#ED1C24]/10 to-transparent">
                    <h3 className="font-bold text-[#ED1C24] mb-1.5 flex items-center gap-2">
                      <span className="text-lg">💸</span> Double-spending
                    </h3>
                    <p className="text-xs text-foreground/90 leading-relaxed mb-2">
                      How do you stop someone from spending the same digital dollar twice — when digital files are infinitely copyable?
                    </p>
                    <div className="text-[11px] text-muted-foreground bg-muted/30 p-2 rounded">
                      <strong className="text-foreground/80">Today this still requires a referee.</strong> Visa, PayPal, and your bank
                      all exist because someone has to keep score. Take the referee away — and digital money breaks instantly.
                    </div>
                  </div>

                  {/* Byzantine Generals */}
                  <div className="p-4 rounded-xl border-2 border-[#6366f1]/40 bg-gradient-to-br from-[#6366f1]/10 to-transparent">
                    <h3 className="font-bold text-[#6366f1] mb-1.5 flex items-center gap-2">
                      <span className="text-lg">⚔️</span> Byzantine Generals
                    </h3>
                    <p className="text-xs text-foreground/90 leading-relaxed mb-2">
                      How do strangers reach agreement on the truth when some of them might be lying — and there's no central authority to verify who?
                    </p>
                    <div className="text-[11px] text-muted-foreground bg-muted/30 p-2 rounded">
                      <strong className="text-foreground/80">Modern systems still struggle with this.</strong> BGP routing
                      can be hijacked (the 2008 YouTube outage), online voting is famously hard to secure,
                      distributed databases need carefully picked leaders.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-[#39B54A]/40 bg-[#39B54A]/10 text-center">
                    <p className="text-sm font-bold text-foreground">
                      Satoshi claimed to have solved <span className="text-[#39B54A]">both</span> at once.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 italic">Bitcoin is the proof.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════ 02 — WHAT IS BITCOIN ═══════ */}
          <div id="s2-what" className="h-full">
            <ConceptSlide
              title="What is Bitcoin?"
              description="Bitcoin is the first decentralized digital currency — a peer-to-peer electronic cash system that operates without banks, governments, or intermediaries. Built from everything you saw in Section 1: hashes, chained blocks, a peer network, proof-of-work consensus."
              visual={
                <div className="space-y-4 w-full">
                  <DefinitionBox
                    term="Bitcoin (BTC)"
                    definition="A decentralized digital currency launched in January 2009 by the pseudonymous Satoshi Nakamoto. It runs on a public blockchain where transactions are verified by a global network of independent nodes and miners. No one operates it; no one can switch it off."
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/40">
                      <h4 className="font-bold text-[#f59e0b] mb-1.5">🌐 Permissionless</h4>
                      <p className="text-xs text-muted-foreground leading-snug">Anyone can send, receive, or validate transactions. No application, no KYC, no gatekeeper.</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/40">
                      <h4 className="font-bold text-[#ED1C24] mb-1.5">🔓 Open Source</h4>
                      <p className="text-xs text-muted-foreground leading-snug">The code is public — anyone can read it, audit it, fork it, or contribute to Bitcoin Core.</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/40">
                      <h4 className="font-bold text-[#39B54A] mb-1.5">💎 Scarce by design</h4>
                      <p className="text-xs text-muted-foreground leading-snug">Hard-capped at 21 million coins forever. Enforced by code, not by anyone's promise.</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/40">
                      <h4 className="font-bold text-[#6366f1] mb-1.5">⚡ Censorship-resistant</h4>
                      <p className="text-xs text-muted-foreground leading-snug">No entity can freeze, reverse, or block a valid Bitcoin transaction. The math doesn't care who you are.</p>
                    </div>
                  </div>
                </div>
              }
              keyPoints={[
                "Bitcoin is both a payment network (lowercase b, when speaking of the protocol) and a unit of currency (BTC)",
                "It solved the double-spending problem without a central authority — every node independently verifies every transaction",
                "Transactions are irreversible once confirmed: there's no chargeback, no 'undo' button",
                "Bitcoin pioneered the entire cryptocurrency industry — every other chain inherits from its design",
              ]}
            />
          </div>

          {/* ═══════ 03 — BITCOIN'S PROOF OF WORK ═══════ */}
          <div id="s2-pow" className="h-full">
            <ConceptSlide
              title="Bitcoin's Proof of Work"
              description="You saw the mining race in Section 1. Bitcoin's version uses specific, deliberate parameters — battle-tested for 15+ years."
              visual={
                <div className="space-y-3 w-full">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-card rounded-xl border-2 border-[#f59e0b]/40">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-[#f59e0b] mb-1">Hash function</div>
                      <div className="font-mono text-xl text-foreground font-bold">SHA-256</div>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                        Designed by the NSA, published in 2001. Used for every block hash and every transaction signature.
                      </p>
                    </div>
                    <div className="p-3.5 bg-card rounded-xl border-2 border-[#ED1C24]/40">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-[#ED1C24] mb-1">Block time</div>
                      <div className="font-mono text-xl text-foreground font-bold">~10 minutes</div>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                        Difficulty auto-adjusts every 2,016 blocks (~2 weeks) to keep this cadence as hash power changes.
                      </p>
                    </div>
                    <div className="p-3.5 bg-card rounded-xl border-2 border-[#39B54A]/40">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-[#39B54A] mb-1">Reward per block</div>
                      <div className="font-mono text-xl text-foreground font-bold">3.125 BTC</div>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                        Halves every 210,000 blocks (~4 years). Plus all transaction fees in the block.
                      </p>
                    </div>
                    <div className="p-3.5 bg-card rounded-xl border-2 border-[#6366f1]/40">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-[#6366f1] mb-1">Network hash rate</div>
                      <div className="font-mono text-xl text-foreground font-bold">~700 EH/s</div>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                        700 quintillion hash attempts per second across the whole network. Cheating means out-mining all of that.
                      </p>
                    </div>
                  </div>
                  <CalloutBox type="tip" title="Same race you watched in Section 1">
                    The Mining Race demo in Section 1 is the exact same mechanism — five miners cycling nonces, looking for a hash with leading zeros. Bitcoin runs that race continuously, with millions of computers, for every block.
                  </CalloutBox>
                </div>
              }
              keyPoints={[
                "SHA-256 is the cryptographic backbone of Bitcoin — used for block hashes and transaction IDs",
                "10-minute average block time is a deliberate design choice — fast enough to be useful, slow enough that the network can agree",
                "Difficulty self-adjusts: if blocks come faster than 10 min, difficulty goes up; slower, it goes down",
                "The reward halving is what makes Bitcoin scarce — fewer new coins are issued every 4 years",
              ]}
            />
          </div>

          {/* ═══════ 04 — 21M HARD CAP ═══════ */}
          <div id="s2-supply" className="h-full">
            <div className="w-full h-full flex flex-col p-5 lg:p-8">
              <div className="shrink-0 mb-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">21 Million. Forever.</h2>
                <p className="text-sm lg:text-base text-muted-foreground max-w-3xl">
                  There will never be more than 21 million bitcoin. The cap isn't a policy that can be changed — it's a property of the code that every node enforces independently. Every halving cuts the rate of new coins in half until the last fractional satoshi is mined around the year 2140.
                </p>
              </div>

              <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
                {/* LEFT — halving schedule table */}
                <div className="overflow-hidden rounded-xl border-2 border-border bg-card">
                  <div className="grid grid-cols-[60px_1fr_1fr_1fr] gap-2 px-3 py-2 bg-muted/40 border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <div>Year</div>
                    <div>Reward / block</div>
                    <div>Cumulative</div>
                    <div>Note</div>
                  </div>
                  {HALVING_EPOCHS.map((e, i) => {
                    const isCurrent = e.note === 'We are here';
                    const isCap = e.note === 'Cap reached';
                    return (
                      <div
                        key={e.year}
                        className={`grid grid-cols-[60px_1fr_1fr_1fr] gap-2 px-3 py-2.5 text-xs ${
                          i % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                        } ${isCurrent ? 'bg-[#f59e0b]/15 border-l-4 border-[#f59e0b]' : ''} ${
                          isCap ? 'bg-[#39B54A]/10 border-l-4 border-[#39B54A]' : ''
                        }`}
                      >
                        <div className="font-mono font-bold text-foreground">{e.year}</div>
                        <div className="font-mono text-foreground">{e.reward}</div>
                        <div className="font-mono text-muted-foreground">{e.cumulative}</div>
                        <div className={`text-[11px] font-semibold ${
                          isCurrent ? 'text-[#f59e0b]' : isCap ? 'text-[#39B54A]' : 'text-muted-foreground'
                        }`}>
                          {e.note}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* RIGHT — why this matters */}
                <div className="flex flex-col gap-3">
                  <CalloutBox type="important" title="Why a hard cap?">
                    Every other money in human history has been inflatable. Central banks print, governments debase, kings clip coins. Bitcoin's designers wanted a money where the supply can't be expanded — even if everyone in the world demands it.
                  </CalloutBox>
                  <CalloutBox type="tip" title="Could 21M be changed?">
                    Only if a supermajority of nodes agreed to fork the protocol. Given how strongly the community values the cap (it's the whole pitch), this is effectively impossible. No CEO can decide it.
                  </CalloutBox>
                  <div className="p-3 bg-card rounded-lg border border-border text-xs leading-relaxed text-muted-foreground">
                    Bitcoin is divisible to 8 decimal places. The smallest unit is{' '}
                    <span className="font-mono text-foreground">1 satoshi = 0.00000001 BTC</span>.{' '}
                    Total supply in satoshis: <span className="font-mono text-foreground">2,100,000,000,000,000</span>{' '}
                    — plenty of room for the whole world.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════ 05 — WHAT BITCOIN CAN'T DO ═══════ */}
          <div id="s2-limits" className="h-full">
            <ConceptSlide
              title="What Bitcoin Can't Do"
              description="Bitcoin is deliberately limited. The choices that make it secure and scarce also rule out a lot of things. Knowing what it can't do is more honest than pretending it does everything."
              visual={
                <div className="space-y-3 w-full">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-gradient-to-br from-[#ED1C24]/15 to-transparent rounded-xl border-2 border-[#ED1C24]/40">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShieldX className="size-4 text-[#ED1C24]" />
                        <h4 className="font-bold text-[#ED1C24]">No real programmability</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">
                        Bitcoin's scripting language is intentionally simple. You can send coins, lock them, multi-sign — but you can't build apps, DAOs, NFT marketplaces, or anything stateful.{' '}
                        <strong className="text-foreground/80">That's Ethereum's job.</strong>
                      </p>
                    </div>
                    <div className="p-3.5 bg-gradient-to-br from-[#f59e0b]/15 to-transparent rounded-xl border-2 border-[#f59e0b]/40">
                      <div className="flex items-center gap-2 mb-1.5">
                        <AlertTriangle className="size-4 text-[#f59e0b]" />
                        <h4 className="font-bold text-[#f59e0b]">Low throughput</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">
                        ~7 transactions per second on the base layer. Visa does ~24,000. Bitcoin is built for settlement, not retail point-of-sale.{' '}
                        <strong className="text-foreground/80">Lightning Network adds a layer on top for fast small payments.</strong>
                      </p>
                    </div>
                    <div className="p-3.5 bg-gradient-to-br from-[#6366f1]/15 to-transparent rounded-xl border-2 border-[#6366f1]/40">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base">⚡</span>
                        <h4 className="font-bold text-[#6366f1]">Slow finality</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">
                        ~10 minutes per block, ~60 minutes for a transaction to be considered irreversible. Fine for moving wealth, painful for buying coffee.
                      </p>
                    </div>
                    <div className="p-3.5 bg-gradient-to-br from-[#8b5cf6]/15 to-transparent rounded-xl border-2 border-[#8b5cf6]/40">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base">🔋</span>
                        <h4 className="font-bold text-[#8b5cf6]">Energy-hungry</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">
                        Proof of Work uses real electricity by design — that's what makes attacks expensive. Whether the tradeoff is worth it is genuinely debated.
                      </p>
                    </div>
                  </div>
                  <CalloutBox type="tip" title="So why is it still the canonical example?">
                    Because the things Bitcoin <em>does</em> do, it does at a quality nothing else has matched yet: 15+ years of uninterrupted operation, an immovable supply cap, total resistance to censorship, and a security budget paid for in electricity rather than trust.
                  </CalloutBox>
                </div>
              }
              keyPoints={[
                "Bitcoin is deliberately a single-purpose tool: be digital, scarce, hard-to-stop money",
                "Want programmable money or rich applications? That's the next course — Smart Contracts on Ethereum and similar chains",
                "Want faster, cheaper payments? Layer-2 networks like Lightning sit on top of Bitcoin's settlement layer",
                "Want to compare Bitcoin to other platforms? Course 3 — Blockchain Platforms — does that head-on",
              ]}
            />
          </div>

          {/* ═══════ 06 — TAKEAWAYS ═══════ */}
          <div id="s2-takeaways" className="h-full">
            <TakeawaySlide
              title="Section 2 — Key Takeaways"
              takeaways={[
                "October 2008: Satoshi Nakamoto publishes a 9-page paper claiming to have solved double-spending and the Byzantine generals problem at the same time",
                "Both problems still bite us today — every fintech has a referee, every distributed system fights consensus — Bitcoin is the proof those problems can be solved without one",
                "Bitcoin is the first working blockchain: SHA-256 hashes, ~10-min blocks, halving rewards, hard-capped at 21 million coins forever",
                "Its strength is exactly what makes it limited: deliberate simplicity buys it security and immutability, at the cost of programmability and throughput",
                "Course 2 (Smart Contracts) picks up where Bitcoin stops — programmable money and applications on chains like Ethereum",
                "Course 3 (Platforms) compares Bitcoin head-to-head with the major alternatives — Ethereum, Solana, Hyperledger, and others",
              ]}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
