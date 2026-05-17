import { TitleSlide } from '../components/templates/TitleSlide';
import { ConceptSlide } from '../components/templates/ConceptSlide';
import { ComparisonSlide } from '../components/templates/ComparisonSlide';
import { DiagramSlide } from '../components/templates/DiagramSlide';
import { QuizSlide } from '../components/templates/QuizSlide';
import { TakeawaySlide } from '../components/templates/TakeawaySlide';
import { CalloutBox } from '../components/shared/CalloutBox';
import { DefinitionBox } from '../components/shared/DefinitionBox';
import { BlockchainChain } from '../components/blockchain/BlockchainChain';
import { Bitcoin } from 'lucide-react';
import { SectionNav } from '../components/navigation/SectionNav';

const section2Chapters = [
  { id: 's2-breakthrough', label: 'Bitcoin Breakthrough' },
  { id: 's2-what', label: 'What is Bitcoin?' },
  { id: 's2-byzantine', label: 'Byzantine Problem' },
  { id: 's2-doublespend', label: 'Double-Spending' },
  { id: 's2-immutability', label: 'Immutability' },
  { id: 's2-supply', label: 'Supply Model' },
  { id: 's2-stats', label: 'Network Statistics' },
  { id: 's2-nodes', label: 'Node Distribution' },
  { id: 's2-security', label: 'Security Model' },
  { id: 's2-programmability', label: 'Programmability' },
  { id: 's2-quiz', label: 'Quizzes' },
  { id: 's2-takeaways', label: 'Takeaways' },
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
            title="Bitcoin and Beyond"
            subtitle="A deep dive into the world's first cryptocurrency and its network"
            icon={<Bitcoin className="size-20 text-[#f59e0b]" />}
            gradient="from-[#f59e0b] to-[#ED1C24]"
          />
        </div>

        {/* ═══════ 1. WHY BITCOIN WAS A BREAKTHROUGH ═══════ */}
        <div id="s2-breakthrough" className="h-full">
          <ConceptSlide
            title="Why Bitcoin Was a Breakthrough"
            description="The mysterious Satoshi Nakamoto solved the double-spending problem without a trusted authority — combining decades of cryptographic research into one working protocol."
            visual={
              <div className="space-y-4 w-full">
                <CalloutBox type="important" title="The Double-Spending Problem">
                  How do you prevent someone from spending the same digital currency twice without a central authority to verify transactions?
                </CalloutBox>
                <CalloutBox type="tip" title="Satoshi's Solution">
                  Combine cryptographic proof, distributed consensus, and economic incentives to create a trustless system where the network itself prevents fraud.
                </CalloutBox>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="font-mono text-sm text-muted-foreground mb-2">Genesis Block Message:</div>
                  <div className="text-sm text-foreground italic">
                    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Created a decentralized consensus mechanism (Proof of Work)",
              "Designed a transparent public ledger system",
              "Implemented cryptographic security for transactions",
              "Established fixed supply and predictable issuance schedule"
            ]}
          />
        </div>

        {/* ═══════ 3. WHAT IS BITCOIN ═══════ */}
        <div id="s2-what" className="h-full">
          <ConceptSlide
            title="What is Bitcoin?"
            description="Bitcoin is the first decentralized digital currency — a peer-to-peer electronic cash system that operates without banks, governments, or intermediaries."
            visual={
              <div className="space-y-4 w-full">
                <DefinitionBox
                  term="Bitcoin (BTC)"
                  definition="A decentralized digital currency created in 2009 by Satoshi Nakamoto. It runs on a public blockchain where transactions are verified by a global network of nodes and miners."
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-2">🌐 Permissionless</h4>
                    <p className="text-sm text-muted-foreground">Anyone can send, receive, or validate transactions without asking permission</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-2">🔓 Open Source</h4>
                    <p className="text-sm text-muted-foreground">The code is public — anyone can audit, fork, or contribute to Bitcoin Core</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                    <h4 className="font-bold text-[#39B54A] mb-2">💎 Scarce</h4>
                    <p className="text-sm text-muted-foreground">Hard-capped at 21 million coins — enforced by code, not promises</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                    <h4 className="font-bold text-[#6366f1] mb-2">⚡ Censorship Resistant</h4>
                    <p className="text-sm text-muted-foreground">No entity can freeze, reverse, or block a valid Bitcoin transaction</p>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Bitcoin is both a payment network and a unit of currency (BTC)",
              "It solved the double-spending problem without a central authority",
              "Transactions are irreversible once confirmed on-chain",
              "Bitcoin pioneered the entire cryptocurrency industry"
            ]}
          />
        </div>

        {/* ═══════ 2. BYZANTINE GENERALS PROBLEM ═══════ */}
        <div id="s2-byzantine" className="h-full">
          <ConceptSlide
            title="The Byzantine Generals Problem"
            description="How do you reach agreement when you can't trust every participant? A 27-year-old computer science puzzle — solved by Bitcoin in 2009."
            visual={
              <div className="space-y-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-2">⚔️ The Problem</h4>
                    <p className="text-sm text-muted-foreground">Generals surrounding a city must agree on one plan — but some are traitors sending conflicting orders. No trusted messenger exists to verify who is lying.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-2">💻 In Computing Terms</h4>
                    <p className="text-sm text-muted-foreground">Generals = nodes. Messengers = internet packets. Traitors = malicious nodes. Battle plan = shared transaction history. Any node can lie or go offline.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                    <h4 className="font-bold text-[#39B54A] mb-2">⛏️ Bitcoin's Solution</h4>
                    <p className="text-sm text-muted-foreground">Proof of Work makes lying expensive. Every block costs real energy — so cheating costs more than cooperating. The longest chain always represents the honest majority.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                    <h4 className="font-bold text-[#6366f1] mb-2">🔢 The 51% Rule</h4>
                    <p className="text-sm text-muted-foreground">The network tolerates up to ⅓ of nodes being malicious. As long as honest nodes hold the majority of hash power, consensus is always reached correctly.</p>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Problem formalized by Lamport, Shostak & Pease in 1982",
              "Before Bitcoin, no practical solution existed for open, untrusted networks",
              "Proof of Work is the first mechanism where dishonesty is economically irrational",
              "Bitcoin achieves consensus without any central authority or trusted party"
            ]}
          />
        </div>

        {/* ═══════ DOUBLE-SPENDING ═══════ */}
        <div id="s2-doublespend" className="h-full">
          <ConceptSlide
            title="The Double-Spending Problem"
            description="Digital money can be copied like any file. Before Bitcoin, only a bank could guarantee you hadn't already spent the same coin twice."
            visual={
              <div className="space-y-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-2">📋 The Attack</h4>
                    <p className="text-sm text-muted-foreground">Alice has 1 BTC. She broadcasts two transactions simultaneously — one paying Bob, one paying herself. Without a referee, both look valid. Who gets the coin?</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-2">🏦 The Old Fix — Trust a Bank</h4>
                    <p className="text-sm text-muted-foreground">Banks keep a central ledger. When you pay, they debit your account instantly. No double-spend possible — but you must trust them 100% with your money.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                    <h4 className="font-bold text-[#39B54A] mb-2">🔗 Bitcoin's Fix — UTXO + Chain</h4>
                    <p className="text-sm text-muted-foreground">Every coin is a specific Unspent Transaction Output. Spending it destroys it and creates new outputs. A UTXO can only be consumed once — miners reject any transaction referencing an already-spent output.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                    <h4 className="font-bold text-[#6366f1] mb-2">⛏️ Confirmed = Final</h4>
                    <p className="text-sm text-muted-foreground">Once a transaction is included in a block and buried under more blocks, rewriting it would require outpacing the entire network's hash power. After 6 confirmations, it's economically irreversible.</p>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Digital cash without a bank was impossible before Bitcoin — copies are free",
              "UTXO are destroyed when spent — there is no 'balance', only unspent outputs",
              "Miners validate that every input UTXO exists and hasn't been spent yet",
              "The blockchain is a globally shared, ordered log that makes double-spending publicly visible"
            ]}
          />
        </div>

        {/* ═══════ 3. IMMUTABILITY & BLOCK LINKING ═══════ */}
        <div id="s2-immutability" className="h-full">
          <DiagramSlide
            title="Immutability Through Block Linking"
            diagram={
              <BlockchainChain
                blocks={[
                  {
                    blockNumber: 840000,
                    hash: "0x00000...a3f7",
                    previousHash: "0x00000...9c12",
                    timestamp: "Apr 20, 2024",
                    data: "Halving Block",
                    highlighted: false
                  },
                  {
                    blockNumber: 840001,
                    hash: "0x00000...b8e2",
                    previousHash: "0x00000...a3f7",
                    timestamp: "Apr 20, 2024",
                    data: "3.125 BTC reward",
                    highlighted: false
                  },
                  {
                    blockNumber: 840002,
                    hash: "0x00000...c4d9",
                    previousHash: "0x00000...b8e2",
                    timestamp: "Apr 20, 2024",
                    data: "142 transactions",
                    highlighted: true
                  }
                ]}
              />
            }
            caption="Each block's hash depends on the previous block's hash — altering any block would cascade through every subsequent block"
            annotations={[
              {
                label: "Cryptographic Linking",
                description: "Each block header includes the hash of the previous block, creating an unbreakable chain of commitments"
              },
              {
                label: "Why It Matters",
                description: "To alter a past transaction, an attacker would need to recalculate every block after it faster than the entire network — practically impossible"
              },
              {
                label: "Finality Grows Over Time",
                description: "The deeper a block is buried, the more computational work protects it. 6 confirmations (~60 min) is considered practically irreversible"
              }
            ]}
          />
        </div>

        {/* ═══════ 4. SUPPLY MODEL ═══════ */}
        <div id="s2-supply" className="h-full">
          <ConceptSlide
            title="Bitcoin Supply Model"
            description="Bitcoin has a fixed, predictable monetary policy — arguably the most transparent in history."
            visual={
              <div className="space-y-4 w-full">
                <div className="p-5 bg-card rounded-xl border-2 border-[#f59e0b]">
                  <h4 className="font-bold text-[#f59e0b] mb-3">📊 Supply Numbers</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-muted-foreground">Maximum Supply</div>
                      <div className="font-bold text-foreground text-lg">21,000,000 BTC</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-muted-foreground">Circulating (~2025)</div>
                      <div className="font-bold text-foreground text-lg">~19,800,000 BTC</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-muted-foreground">Current Block Reward</div>
                      <div className="font-bold text-foreground text-lg">3.125 BTC</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-muted-foreground">Next Halving</div>
                      <div className="font-bold text-foreground text-lg">~2028</div>
                    </div>
                  </div>
                </div>
                <CalloutBox type="tip" title="The Halving">
                  Every 210,000 blocks (~4 years), the block reward is cut in half. Started at 50 BTC in 2009, now 3.125 BTC after the April 2024 halving. The last Bitcoin will be mined around the year 2140.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Fixed supply makes Bitcoin deflationary by design",
              "~94% of all Bitcoin that will ever exist has already been mined",
              "Halving events historically precede major price cycles",
              "Estimated 3-4 million BTC are permanently lost (forgotten keys)"
            ]}
          />
        </div>

        {/* ═══════ 5. NETWORK STATISTICS ═══════ */}
        <div id="s2-stats" className="h-full">
          <ConceptSlide
            title="Bitcoin Network Statistics"
            description="The Bitcoin network is the most powerful and longest-running decentralized computing network in history."
            visual={
              <div className="space-y-3 w-full">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#f59e0b]">~800 EH/s</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Hash Rate (2025)</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#39B54A]">~19,000+</div>
                    <div className="text-xs text-muted-foreground mt-1">Reachable Full Nodes</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#ED1C24]">~580 GB</div>
                    <div className="text-xs text-muted-foreground mt-1">Full Blockchain Size</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#6366f1]">~10 min</div>
                    <div className="text-xs text-muted-foreground mt-1">Average Block Time</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#8b5cf6]">~400K</div>
                    <div className="text-xs text-muted-foreground mt-1">Daily Transactions</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#f59e0b]">99.99%</div>
                    <div className="text-xs text-muted-foreground mt-1">Uptime Since 2009</div>
                  </div>
                </div>
                <CalloutBox type="info" title="Difficulty Adjustment">
                  Every 2,016 blocks (~2 weeks), the network automatically adjusts mining difficulty to maintain the ~10-minute block target — regardless of how much hash power joins or leaves.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Hash rate has increased exponentially, now measured in exahashes",
              "Bitcoin has had only 2 brief notable downtime events in 15+ years",
              "The difficulty adjustment is one of Bitcoin's most elegant features",
              "Anyone with a computer can run a full node and verify the entire chain"
            ]}
          />
        </div>

        {/* ═══════ 6. NODE DISTRIBUTION ═══════ */}
        <div id="s2-nodes" className="h-full">
          <ComparisonSlide
            title="Node Distribution & Roles"
            featureLabel="Node Type"
            option1Label="Role"
            option2Label="Storage Needs"
            option3Label="Validation Method"
            items={[
              {
                feature: "⚙️ Full Node",
                option1: "Enforces all consensus rules, relays transactions to peers. The backbone of the network.",
                option2: "Full blockchain — ~600 GB and growing. Requires a dedicated drive.",
                option3: "Independently verifies every transaction and every block from genesis."
              },
              {
                feature: "⛏️ Mining Node",
                option1: "Bundles transactions into blocks and competes via Proof of Work to earn block rewards + fees.",
                option2: "Full blockchain + specialized ASIC hardware. Very high resource cost.",
                option3: "Full validation like a full node, plus solves the PoW hash puzzle to propose new blocks."
              },
              {
                feature: "📱 SPV / Light Node",
                option1: "Lightweight client used in mobile wallets. Sends and receives BTC without storing the chain.",
                option2: "Block headers only — ~50 MB. Suitable for phones and low-storage devices.",
                option3: "Relies on Merkle proofs provided by full nodes. Trusts the longest chain, not self-verified."
              },
              {
                feature: "✂️ Pruned Node",
                option1: "Validates the full chain during sync, then discards old block data to save disk space.",
                option2: "Recent blocks only — configurable, typically ~5–10 GB after pruning.",
                option3: "Full validation from genesis during initial sync. After pruning, can no longer serve old blocks."
              }
            ]}
          />
        </div>

        {/* ═══════ NODE DISTRIBUTION — CLOUD CENTRALISATION RISK ═══════ */}
        <div className="h-full flex flex-col p-6 lg:p-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1 shrink-0">Node Distribution & Roles</h2>
          <p className="text-muted-foreground text-sm mb-5 shrink-0">Blockchain is decentralized by design — but who actually <span className="text-foreground font-semibold">runs</span> the nodes matters just as much as the protocol rules.</p>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">

            {/* Left: cloud concentration */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">The hidden centralisation risk</p>

              <div className="p-4 bg-gradient-to-br from-[#f59e0b]/15 to-[#ED1C24]/10 border border-[#f59e0b]/40 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">☁️</span>
                  <h4 className="font-black text-foreground text-base">Cloud Hosting Concentration</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Even though anyone can run a node, in practice a large share of nodes are rented virtual machines hosted on a handful of cloud providers — not personal servers at home.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { provider: 'AWS', share: '~48 %', color: '#f59e0b' },
                    { provider: 'Azure', share: '~15 %', color: '#6366f1' },
                    { provider: 'GCP', share: '~10 %', color: '#39B54A' },
                  ].map(p => (
                    <div key={p.provider} className="bg-muted rounded-lg p-2 text-center">
                      <div className="font-black text-sm" style={{ color: p.color }}>{p.share}</div>
                      <div className="text-xs text-muted-foreground">{p.provider}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Estimated share of Ethereum nodes by cloud provider (2023–2024 data).
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-[#ED1C24]/15 to-transparent border border-[#ED1C24]/30 rounded-xl flex-1 flex flex-col">
                <h4 className="font-bold text-[#ED1C24] text-base mb-4">⚠️ What could go wrong?</h4>

                {/* Real-life incident */}
                <div className="mb-4 p-4 bg-[#ED1C24]/10 border border-[#ED1C24]/40 rounded-lg">
                  <p className="text-sm font-bold text-foreground mb-2">🔴 Real incident — December 7, 2021</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AWS us-east-1 suffered a major outage. Within hours, <span className="text-foreground font-semibold">Solana validators went offline</span>, Ethereum RPC providers like <span className="text-foreground font-semibold">Infura and Alchemy became unreachable</span>, and front-ends for Uniswap, OpenSea and dozens of DeFi apps stopped loading — even though the underlying protocols were perfectly fine. Users couldn't interact with "decentralized" apps because the access layer was centralized on a single AWS region.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                  <li>• A cloud provider can <span className="text-foreground font-semibold">suspend accounts</span>, removing nodes and RPC endpoints overnight with no recourse</li>
                  <li>• US sanctions could legally force AWS, Azure or GCP to <span className="text-foreground font-semibold">block entire protocols</span> or geographic regions</li>
                  <li>• The blockchain protocol stays decentralized — but the <span className="text-foreground font-semibold">infrastructure layer most users rely on</span> is not</li>
                </ul>
              </div>
            </div>

            {/* Right: solutions & mitigations */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">How the ecosystem responds</p>
              {[
                { color: '#39B54A', emoji: '🏠', title: 'Home Node Initiatives', desc: 'Projects like Ethereum\'s "Run the Majority Client" campaign and Raspberry Pi node guides actively push users to self-host nodes at home.' },
                { color: '#6366f1', emoji: '🌍', title: 'Geographic Diversity', desc: 'Node diversity across countries reduces the risk that any single jurisdiction can shut down the network. Nodes in 80+ countries run Bitcoin today.' },
                { color: '#f59e0b', emoji: '🔗', title: 'Decentralized RPC', desc: 'Projects like Pocket Network and Ankr distribute RPC access across many independent operators instead of relying on a single provider like Infura.' },
                { color: '#ED1C24', emoji: '📊', title: 'Client Diversity', desc: 'Running multiple independent software implementations (Geth, Nethermind, Besu for Ethereum) prevents a single bug from taking down the whole network.' },
              ].map(n => (
                <div key={n.title} className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl flex-1" style={{ borderColor: n.color + '30' }}>
                  <div className="text-xl shrink-0">{n.emoji}</div>
                  <div>
                    <div className="font-bold text-sm mb-0.5" style={{ color: n.color }}>{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ═══════ 7. SECURITY MODEL ═══════ */}
        <div id="s2-security" className="h-full">
          <ConceptSlide
            title="Bitcoin Security Model"
            description="Bitcoin's security relies on economic incentives, cryptographic proofs, and decentralized verification — not trust."
            visual={
              <div className="space-y-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-2">⛏️ 51% Attack</h4>
                    <p className="text-sm text-muted-foreground">An attacker would need more hash power than the rest of the network combined — currently requiring billions of dollars in hardware and electricity</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                    <h4 className="font-bold text-[#39B54A] mb-2">🔐 Cryptographic Security</h4>
                    <p className="text-sm text-muted-foreground">SHA-256 hashing and ECDSA signatures have no known practical attacks. Breaking them requires breakthroughs that don't yet exist</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                    <h4 className="font-bold text-[#6366f1] mb-2">💰 Economic Incentives</h4>
                    <p className="text-sm text-muted-foreground">Miners profit more from honest behavior than attacks. Attacking would destroy the value of their own holdings and hardware</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-2">🌍 Decentralization</h4>
                    <p className="text-sm text-muted-foreground">No single government, company, or individual can shut down Bitcoin — nodes exist in 100+ countries</p>
                  </div>
                </div>
                <CalloutBox type="warning" title="What About Quantum Computing?">
                  Current quantum computers cannot break Bitcoin's cryptography. If they advance far enough, Bitcoin can upgrade to quantum-resistant algorithms — research is already underway.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Attacking Bitcoin costs more than cooperating with it",
              "The network has never been successfully hacked in 15+ years",
              "6 confirmations (~60 min) is considered practically irreversible",
              "Security increases as hash rate and node count grow"
            ]}
          />
        </div>

        {/* ═══════ 9. BITCOIN'S PROGRAMMABILITY LIMITS ═══════ */}
        <div id="s2-programmability" className="h-full flex flex-col p-5 lg:p-8">

          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Bitcoin Wasn't Built to Be Programmable</h2>
            <p className="text-sm text-muted-foreground">By design, Bitcoin prioritises security and simplicity over flexibility — but that left a gap others tried to fill.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">

            {/* Left column */}
            <div className="flex flex-col gap-4 min-h-0">

              <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center text-sm">📜</span>
                  Bitcoin Script — Simple by Design
                </h3>
                <p className="text-sm text-muted-foreground">
                  Bitcoin does have a built-in scripting language called <span className="text-foreground font-medium">Bitcoin Script</span>. It can handle conditions like "spend only with two signatures" or "unlock after a time delay". But it is intentionally <span className="text-foreground font-medium">not Turing-complete</span> — there are no loops, no persistent state, and no complex logic.
                </p>
                <div className="px-3 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg text-xs text-muted-foreground italic">
                  Satoshi's reasoning: a simpler language has a smaller attack surface. The fewer things it can do, the fewer ways it can go wrong.
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-[#6366f1]/20 flex items-center justify-center text-sm">🧪</span>
                  Early Attempts to Build on Bitcoin
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2">
                    <span className="text-[#f59e0b] shrink-0 font-bold">2012</span>
                    <span><span className="text-foreground font-medium">Colored Coins</span> — encode metadata in Bitcoin transactions to represent real-world assets. Clever, but very limited.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#f59e0b] shrink-0 font-bold">2013</span>
                    <span><span className="text-foreground font-medium">Mastercoin / Omni Layer</span> — a protocol layer on top of Bitcoin. Enabled token creation. Still constrained by Bitcoin Script.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#f59e0b] shrink-0 font-bold">2014</span>
                    <span><span className="text-foreground font-medium">Counterparty</span> — added smart contract-like features by encoding data into Bitcoin transactions. Functional, but hacky and slow.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4 min-h-0">

              <div className="bg-card border-2 border-[#ED1C24]/40 rounded-xl p-4 flex flex-col gap-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-[#ED1C24]/20 flex items-center justify-center text-sm">🚧</span>
                  What You Simply Cannot Do on Bitcoin
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Complex smart contracts', why: 'No loops, no state' },
                    { label: 'Decentralised apps (dApps)', why: 'No persistent logic' },
                    { label: 'On-chain tokens & NFTs', why: 'No native token standard' },
                    { label: 'Autonomous on-chain rules', why: 'Script too restrictive' },
                  ].map(item => (
                    <div key={item.label} className="bg-muted/50 rounded-lg p-2">
                      <div className="text-xs font-bold text-foreground">✗ {item.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.why}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#627EEA]/15 to-[#39B54A]/10 border border-[#627EEA]/40 rounded-xl p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-[#627EEA]/20 flex items-center justify-center text-sm">💡</span>
                  The Question That Started Everything
                </h3>
                <p className="text-sm text-muted-foreground">
                  In 2013, a 19-year-old named <span className="text-foreground font-medium">Vitalik Buterin</span> asked: <em>"What if instead of adding features on top of Bitcoin, we built a new blockchain designed from the ground up to run any program?"</em>
                </p>
                <p className="text-sm text-muted-foreground">
                  Bitcoin's core community largely rejected adding more programmability — they wanted to keep it simple and focused. That rejection became the direct motivation for <span className="text-foreground font-medium">Ethereum</span>.
                </p>
                <div className="mt-auto px-3 py-2 bg-[#627EEA]/10 border border-[#627EEA]/30 rounded-lg text-xs text-[#627EEA] font-medium text-center">
                  → The story continues in Section 3
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s2-quiz" className="h-full">
          <QuizSlide
            question="Why can there never be more than 21 million Bitcoin?"
            options={[
              {
                text: "A government regulation limits the supply",
                correct: false
              },
              {
                text: "The rule is enforced by code: every node rejects blocks that violate it",
                correct: true
              },
              {
                text: "Satoshi Nakamoto manually controls the issuance",
                correct: false
              },
              {
                text: "Mining hardware physically cannot produce more",
                correct: false
              }
            ]}
            explanation="The 21 million limit is enforced by Bitcoin's consensus rules. Every full node independently verifies that new blocks follow the supply schedule. Changing this would require convincing the vast majority of the network to adopt new rules — a practical impossibility."
          />
        </div>

        {/* Quiz: security */}
        <div className="h-full">
          <QuizSlide
            question="Why is a 51% attack on Bitcoin considered economically irrational?"
            options={[
              { text: "Because Bitcoin is protected by government regulations", correct: false },
              { text: "Because the cost far exceeds potential profit, and success would destroy the attacker's own holdings", correct: true },
              { text: "Because only 49% of nodes can ever be compromised at once", correct: false },
              { text: "Because Satoshi Nakamoto can reverse any malicious transactions", correct: false }
            ]}
            explanation="A successful 51% attack would require billions in hardware and electricity. Even if it succeeded, it would crash Bitcoin's price — destroying the value of the attacker's own coins and equipment. Honest mining is simply more profitable."
          />
        </div>

        {/* Quiz: Byzantine Generals Problem */}
        <div className="h-full">
          <QuizSlide
            question="What was Bitcoin's key insight for solving the Byzantine Generals Problem?"
            options={[
              { text: "Appointing a trusted coordinator node to validate all messages", correct: false },
              { text: "Encrypting all communications between nodes so traitors can't intercept them", correct: false },
              { text: "Making dishonest behaviour economically irrational through Proof of Work", correct: true },
              { text: "Requiring every node to know the identity of every other node", correct: false }
            ]}
            explanation="Bitcoin doesn't try to eliminate dishonest participants — it makes cheating unprofitable. Proof of Work forces attackers to expend real energy and hardware. The cost of a successful attack always exceeds the potential gain, so rational actors stay honest."
          />
        </div>

        {/* Quiz: Node types */}
        <div className="h-full">
          <QuizSlide
            question="Which node type performs full validation of the entire blockchain history but then discards old block data to save disk space?"
            options={[
              { text: "SPV / Light Node", correct: false },
              { text: "Mining Node", correct: false },
              { text: "Full Node", correct: false },
              { text: "Pruned Node", correct: true }
            ]}
            explanation="A pruned node downloads and validates every block from genesis — enforcing all consensus rules — then deletes raw block data older than a configurable threshold. Unlike an SPV node, it doesn't trust others for validation; unlike a full node, it doesn't keep the entire history on disk."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s2-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 2 — Key Takeaways"
            takeaways={[
              "Bitcoin is a decentralized, permissionless digital currency with a fixed supply of 21 million coins",
              "Immutability comes from cryptographic block linking — altering any block cascades through the entire chain",
              "The halving mechanism creates predictable, decreasing issuance — making Bitcoin deflationary",
              "The network's security comes from massive hash power, global node distribution, and economic incentives",
              "A 51% attack is theoretically possible but economically irrational at Bitcoin's scale",
              "Bitcoin has maintained 99.99% uptime since its launch in 2009 — the most reliable financial network ever created"
            ]}
          />
        </div>
      </div>
      </div>
    </div>
  );
}