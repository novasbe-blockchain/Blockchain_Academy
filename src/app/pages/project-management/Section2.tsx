import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { DiscussionSlide } from '../../components/templates/DiscussionSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { Map, ArrowRight } from 'lucide-react';

const chapters = [
  { id: 's2-decision',     label: 'Do We Need Blockchain?' },
  { id: 's2-scope',        label: 'Scope Definition' },
  { id: 's2-stakeholders', label: 'Stakeholder Mapping' },
  { id: 's2-wbs',          label: 'WBS & Milestones' },
  { id: 's2-governance',   label: 'Governance Framework' },
  { id: 's2-discussion',   label: 'Discussion' },
  { id: 's2-quiz',         label: 'Quiz' },
  { id: 's2-takeaways',    label: 'Takeaways' },
];

export function PM_Section2() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SESSION 02"
            title="Project Planning & Scoping for Blockchain"
            subtitle="From 'we should use blockchain' to a concrete, stakeholder-aligned project plan"
            icon={<Map className="size-20 text-[#eab308]" />}
            gradient="from-[#eab308] to-[#f97316]"
          />
        </div>

        {/* ═══════ DO WE NEED BLOCKCHAIN ═══════ */}
        <div id="s2-decision" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Session 02</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Do We Actually Need Blockchain?</h2>
            <p className="text-sm text-muted-foreground">The most important scoping question — and one too often skipped in the excitement of the technology.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">
            {/* Decision Tree */}
            <div className="flex flex-col gap-3">
              <div className="font-bold text-sm text-foreground mb-1">Use the following checklist:</div>
              {[
                { q: 'Is there a shared database problem?', yes: 'Multiple parties need to read/write the same data', no: 'A single-org database is sufficient' },
                { q: 'Do you need trust between untrusted parties?', yes: 'Parties cannot rely on a central intermediary', no: 'One trusted party can host the data' },
                { q: 'Is immutability a requirement?', yes: 'Audit trails must be tamper-proof and permanent', no: 'Records can be updated or deleted' },
                { q: 'Does disintermediation add value?', yes: 'Removing the middleman creates cost or trust benefits', no: 'The middleman adds necessary value' },
                { q: 'Is tokenization part of the solution?', yes: 'Digital ownership, incentives, or payments are needed', no: 'No value transfer is involved' },
              ].map(item => (
                <div key={item.q} className="p-3 bg-card border border-border rounded-lg">
                  <div className="font-semibold text-xs text-foreground mb-1.5">❓ {item.q}</div>
                  <div className="flex gap-3">
                    <div className="flex-1 text-xs text-[#39B54A] bg-[#39B54A]/10 rounded p-1.5"><span className="font-bold">YES →</span> {item.yes}</div>
                    <div className="flex-1 text-xs text-[#ef4444] bg-[#ef4444]/10 rounded p-1.5"><span className="font-bold">NO →</span> {item.no}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Verdict */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 p-5 rounded-xl bg-[#39B54A]/10 border border-[#39B54A]/40 flex flex-col">
                <div className="text-2xl mb-2">✅</div>
                <div className="font-bold text-[#39B54A] mb-2">Blockchain IS appropriate when:</div>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• Multiple untrusted parties must share verifiable records</li>
                  <li>• Disintermediation creates measurable cost or trust value</li>
                  <li>• Immutability and auditability are core requirements</li>
                  <li>• Tokenization of assets or incentives is part of the design</li>
                  <li>• Cross-border or cross-organization data flow is needed</li>
                </ul>
              </div>
              <div className="flex-1 p-5 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/40 flex flex-col">
                <div className="text-2xl mb-2">❌</div>
                <div className="font-bold text-[#ef4444] mb-2">Use a database instead when:</div>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• A single trusted party controls all the data</li>
                  <li>• You need to update or delete records frequently</li>
                  <li>• Performance and query flexibility are priorities</li>
                  <li>• The only benefit is "it's blockchain" — not a real constraint</li>
                  <li>• You can achieve the same result with a shared API</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ SCOPE DEFINITION ═══════ */}
        <div id="s2-scope" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Session 02</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Scope Definition for Blockchain Projects</h2>
            <p className="text-sm text-muted-foreground">Defining what is on-chain vs off-chain is the most consequential scoping decision you will make.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="p-5 bg-[#6366f1]/8 border border-[#6366f1]/30 rounded-xl">
                <div className="font-bold text-[#6366f1] mb-3 flex items-center gap-2"><span className="text-lg">⛓️</span> On-Chain Scope</div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Smart contract logic and state</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Token issuance and transfer rules</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Access control and permissions</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Governance voting mechanisms</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Event logs for auditability</li>
                </ul>
              </div>
              <div className="p-5 bg-[#f97316]/8 border border-[#f97316]/30 rounded-xl">
                <div className="font-bold text-[#f97316] mb-3 flex items-center gap-2"><span className="text-lg">🌐</span> Off-Chain Scope</div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> Frontend dApp and user interfaces</li>
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> Oracle data feeds and integrations</li>
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> IPFS / off-chain document storage</li>
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> Indexing services and APIs</li>
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> Identity and KYC systems</li>
                </ul>
              </div>
              <div className="p-5 bg-[#ef4444]/8 border border-[#ef4444]/30 rounded-xl">
                <div className="font-bold text-[#ef4444] mb-3 flex items-center gap-2"><span className="text-lg">🚧</span> Explicit Out-of-Scope</div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2"><span className="text-[#ef4444] shrink-0">•</span> Protocol-level changes to the L1/L2</li>
                  <li className="flex gap-2"><span className="text-[#ef4444] shrink-0">•</span> Wallets and key management for end users</li>
                  <li className="flex gap-2"><span className="text-[#ef4444] shrink-0">•</span> Fiat on/off-ramp infrastructure</li>
                  <li className="flex gap-2"><span className="text-[#ef4444] shrink-0">•</span> Third-party DeFi protocol integrations (v1)</li>
                </ul>
              </div>
              <div className="p-5 bg-[#39B54A]/8 border border-[#39B54A]/30 rounded-xl">
                <div className="font-bold text-[#39B54A] mb-3 flex items-center gap-2"><span className="text-lg">⚠️</span> Scope Creep Risks</div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span> "We should also tokenize X" requests mid-sprint</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span> Protocol upgrades breaking existing interfaces</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span> Regulatory changes forcing architecture rework</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span> Community governance demanding new features</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-bold text-sm text-foreground mb-1">The Scope Decision Rule</div>
              <div className="p-4 bg-[#eab308]/10 border border-[#eab308]/40 rounded-xl text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold text-[#eab308]">Put on-chain only what must be on-chain.</span>
                <br /><br />
                Every byte stored on a public blockchain has a cost — in gas fees, privacy exposure, and immutability risk. The discipline of minimizing on-chain state is the hallmark of a mature blockchain architect.
              </div>
              <div className="p-4 bg-card border border-border rounded-xl text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">Ask for every feature:</span>
                <br /><br />
                <span className="italic">"Does this specifically require the properties of a blockchain — or could we use a signed database record instead?"</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ STAKEHOLDER MAPPING ═══════ */}
        <div id="s2-stakeholders" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Session 02</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Stakeholder Mapping for Blockchain Projects</h2>
            <p className="text-sm text-muted-foreground">Blockchain projects have a wider and more complex stakeholder universe than traditional IT. Mapping them is non-negotiable.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
            <div className="col-span-2 grid grid-cols-2 gap-3">
              {[
                { group: 'Internal Stakeholders', color: '#f97316', items: ['Executive sponsors & board', 'Product owners & business analysts', 'Legal & compliance team', 'IT security & infrastructure'] },
                { group: 'External Partners', color: '#eab308', items: ['Consortium members & partners', 'Smart contract auditors', 'Blockchain infrastructure providers', 'Token exchange platforms (if applicable)'] },
                { group: 'End Users & Community', color: '#39B54A', items: ['Token holders & network participants', 'dApp end users', 'Open-source contributors', 'DAO governance members'] },
                { group: 'Regulatory & Legal', color: '#ef4444', items: ['Financial regulators (SEC, MAS, etc.)', 'Data protection authorities (GDPR)', 'Industry standards bodies', 'Government blockchain initiatives'] },
              ].map(g => (
                <div key={g.group} className="p-4 bg-card border rounded-xl" style={{ borderColor: g.color + '40' }}>
                  <div className="font-bold text-sm mb-2" style={{ color: g.color }}>{g.group}</div>
                  <ul className="space-y-1">
                    {g.items.map(i => <li key={i} className="text-xs text-muted-foreground flex gap-1.5"><span style={{ color: g.color }}>•</span>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-bold text-sm text-foreground">Power / Interest Grid</div>
              <div className="flex-1 relative border border-border rounded-xl bg-card overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="border-r border-b border-border p-3">
                    <div className="text-[10px] font-bold text-muted-foreground mb-1">LOW POWER / HIGH INTEREST</div>
                    <div className="text-xs text-muted-foreground">Keep informed — community members, token holders</div>
                  </div>
                  <div className="border-b border-border p-3 bg-[#f97316]/5">
                    <div className="text-[10px] font-bold text-[#f97316] mb-1">HIGH POWER / HIGH INTEREST</div>
                    <div className="text-xs text-muted-foreground">Manage closely — executives, regulators, consortium leads</div>
                  </div>
                  <div className="border-r border-border p-3">
                    <div className="text-[10px] font-bold text-muted-foreground mb-1">LOW POWER / LOW INTEREST</div>
                    <div className="text-xs text-muted-foreground">Monitor — infrastructure providers, auditors on retainer</div>
                  </div>
                  <div className="bg-[#eab308]/5 p-3">
                    <div className="text-[10px] font-bold text-[#eab308] mb-1">HIGH POWER / LOW INTEREST</div>
                    <div className="text-xs text-muted-foreground">Keep satisfied — legal team, security officers</div>
                  </div>
                </div>
                <div className="absolute bottom-1 right-2 text-[10px] text-muted-foreground">→ Interest</div>
                <div className="absolute top-2 left-1 text-[10px] text-muted-foreground" style={{ writingMode: 'vertical-rl' }}>↑ Power</div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ WBS & MILESTONES ═══════ */}
        <div id="s2-wbs" className="h-full flex flex-col p-5 lg:p-8">

          {/* Header */}
          <div className="shrink-0 mb-4 lg:mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Session 02</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Work Breakdown Structure & Milestones</h2>
            <p className="text-sm text-muted-foreground">
              Five go/no-go gates — each a hard checkpoint before proceeding to the next phase.
            </p>
          </div>

          {/* Five equal-height milestone cards */}
          <div className="flex-1 min-h-0 flex items-stretch gap-2 lg:gap-3">
            {(
              [
                {
                  number: 'M1',
                  title: 'Feasibility & Architecture Sign-off',
                  icon: '🔍',
                  color: '#f97316',
                  description: 'Validate that blockchain is the right tool and lock in the platform choice before any design work begins.',
                  deliverables: ['Blockchain decision rationale', 'Platform selection doc', 'Architecture diagram', 'Legal feasibility memo', 'Initial risk register'],
                  gate: false,
                },
                {
                  number: 'M2',
                  title: 'Smart Contract Spec Freeze',
                  icon: '📐',
                  color: '#eab308',
                  description: 'Lock all on-chain contracts, data models, and API contracts. No changes after this point without formal change control.',
                  deliverables: ['Functional spec (all contracts)', 'Data model', 'Access control matrix', 'Integration API contracts'],
                  gate: false,
                },
                {
                  number: 'M3',
                  title: 'Testnet Deployment & Audit Kickoff',
                  icon: '🧪',
                  color: '#39B54A',
                  description: 'Contracts deployed and tested in an isolated environment. Audit scope submitted to the security firm.',
                  deliverables: ['Testnet deployment', 'Test suite >90% coverage', 'Audit scope document'],
                  gate: false,
                },
                {
                  number: 'M4',
                  title: 'Audit Complete & Findings Resolved',
                  icon: '🔐',
                  color: '#ED1C24',
                  description: 'All critical and high severity audit findings resolved, re-tested, and signed off. Hard go/no-go gate before mainnet.',
                  deliverables: ['Audit report', 'All critical/high findings closed', 'Updated contracts', 'Re-test evidence'],
                  gate: true,
                },
                {
                  number: 'M5',
                  title: 'Mainnet Launch & Governance Activation',
                  icon: '🚀',
                  color: '#6366f1',
                  description: 'Coordinated mainnet deployment with all stakeholders. Monitoring and governance systems activated.',
                  deliverables: ['Mainnet deployment', 'Monitoring dashboard', 'Governance forum live', 'Post-launch runbook'],
                  gate: false,
                },
              ] as const
            ).flatMap((milestone, i, arr) => {
              const card = (
                <div
                  key={milestone.number}
                  className="flex-1 flex flex-col rounded-xl border-2 bg-card overflow-hidden"
                  style={{ borderColor: milestone.color + '50' }}
                >
                  {/* Top color stripe */}
                  <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: milestone.color }} />

                  <div className="flex flex-col flex-1 p-4 lg:p-5 min-h-0">
                    {/* Badge + icon row */}
                    <div className="flex items-center gap-2 mb-3 shrink-0">
                      <div
                        className="px-2.5 py-1 rounded-full text-white text-xs font-black shrink-0"
                        style={{ backgroundColor: milestone.color }}
                      >
                        {milestone.number}
                      </div>
                      <span className="text-2xl">{milestone.icon}</span>
                      {milestone.gate && (
                        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ED1C24]/15 text-[#ED1C24] border border-[#ED1C24]/30 whitespace-nowrap">
                          🚦 GO / NO-GO
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold text-sm lg:text-base leading-snug mb-2 shrink-0"
                      style={{ color: milestone.color }}
                    >
                      {milestone.title}
                    </h3>

                    {/* Description — larger text, fills space */}
                    <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed flex-1 min-h-0">
                      {milestone.description}
                    </p>

                    {/* Deliverables pinned to bottom */}
                    <div className="mt-3 pt-3 border-t border-border shrink-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Deliverables
                      </p>
                      <ul className="space-y-1.5">
                        {milestone.deliverables.map(d => (
                          <li key={d} className="flex items-start gap-2 text-xs lg:text-sm text-muted-foreground">
                            <span
                              className="shrink-0 size-4 rounded-full flex items-center justify-center text-white text-[9px] font-black mt-0.5"
                              style={{ backgroundColor: milestone.color }}
                            >✓</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );

              const arrow =
                i < arr.length - 1 ? (
                  <div key={`arrow-${i}`} className="flex items-center justify-center shrink-0 self-center">
                    <ArrowRight className="size-4 text-muted-foreground/40" strokeWidth={2} />
                  </div>
                ) : null;

              return arrow ? [card, arrow] : [card];
            })}
          </div>
        </div>

        {/* ═══════ GOVERNANCE FRAMEWORK ═══════ */}
        <div id="s2-governance" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Session 02</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Governance Framework for Blockchain Projects</h2>
            <p className="text-sm text-muted-foreground">Governance is the most underspecified part of blockchain projects — and the most likely cause of consortium failure.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
            <div className="space-y-3">
              <div className="font-bold text-sm text-foreground">Off-Chain Governance</div>
              {[
                { title: 'Decision Rights Matrix', desc: 'Who can decide what — without a vote? Define thresholds clearly.' },
                { title: 'Change Control Process', desc: 'How are protocol changes proposed, reviewed, and approved by stakeholders?' },
                { title: 'Dispute Resolution', desc: 'What happens when consortium members disagree on a direction?' },
                { title: 'Exit Clauses', desc: 'How can a member leave the consortium without breaking the network?' },
              ].map(g => (
                <div key={g.title} className="p-3 bg-card border border-border rounded-lg">
                  <div className="font-semibold text-xs text-[#eab308] mb-0.5">{g.title}</div>
                  <div className="text-xs text-muted-foreground">{g.desc}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="font-bold text-sm text-foreground">On-Chain Governance</div>
              {[
                { title: 'Voting Mechanisms', desc: 'Token-weighted voting, quadratic voting, or multi-sig council? Each has trade-offs.' },
                { title: 'Proposal Thresholds', desc: 'How much stake is required to submit a governance proposal?' },
                { title: 'Timelock Controls', desc: 'Approved changes are queued in a timelock contract — giving stakeholders time to exit if they disagree.' },
                { title: 'Emergency Multisig', desc: 'A vetted group of signers who can pause the protocol in a security emergency.' },
              ].map(g => (
                <div key={g.title} className="p-3 bg-card border border-border rounded-lg">
                  <div className="font-semibold text-xs text-[#6366f1] mb-0.5">{g.title}</div>
                  <div className="text-xs text-muted-foreground">{g.desc}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="font-bold text-sm text-foreground">Governance Failure Modes</div>
              {[
                { icon: '⚠️', title: 'Voter Apathy', desc: 'Token holders do not vote — a small cartel makes all decisions.' },
                { icon: '🐋', title: 'Whale Capture', desc: 'Large token holders dominate governance against the interest of the community.' },
                { icon: '🔀', title: 'Fork Risk', desc: 'Irreconcilable governance disputes can split the network into competing forks.' },
                { icon: '🔒', title: 'Upgrade Gridlock', desc: 'Supermajority requirements make it impossible to pass necessary protocol improvements.' },
              ].map(g => (
                <div key={g.title} className="p-3 bg-[#ef4444]/8 border border-[#ef4444]/30 rounded-lg">
                  <div className="font-semibold text-xs text-[#ef4444] mb-0.5">{g.icon} {g.title}</div>
                  <div className="text-xs text-muted-foreground">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ DISCUSSION ═══════ */}
        <div id="s2-discussion" className="h-full">
          <DiscussionSlide
            prompt='A logistics company wants to track shipment data across 12 competing freight companies using blockchain. Walk through the "Do we need blockchain?" checklist. What is your verdict?'
            guidingQuestions={[
              'You are the PM for a consortium blockchain project. One member wants to add a new on-chain feature two weeks before the specification freeze milestone. What do you do?',
              'How would you structure the governance framework for a public DeFi protocol — where no single organization is in charge?',
            ]}
          />
        </div>

        {/* ═══════ QUIZ 1/3 ═══════ */}
        <div id="s2-quiz" className="h-full">
          <QuizSlide
            question="(1/3) A government agency wants to store citizen identity records on a public blockchain to 'modernize' their system. Applying the blockchain decision checklist, what is the most likely correct verdict?"
            options={[
              { text: 'Blockchain is appropriate — government data should be public and immutable for maximum transparency.', correct: false },
              { text: 'Blockchain is appropriate — multiple agencies need to read and write the same data.', correct: false },
              { text: 'A traditional database is more appropriate — one trusted party controls all the data, and GDPR requires the right to erasure, which conflicts with immutability.', correct: true },
              { text: 'Blockchain is appropriate — disintermediation of the current system would reduce costs.', correct: false },
            ]}
            explanation="The blockchain decision checklist asks: Is there a trust problem between untrusted parties? Is immutability a core requirement that outweighs privacy concerns? Here, a single trusted authority already exists (the government), and GDPR explicitly requires the right to erasure — which conflicts with blockchain's immutability. A permissioned database with strict access controls is the correct architectural choice."
          />
        </div>

        {/* ═══════ QUIZ 2/3 ═══════ */}
        <div className="h-full">
          <QuizSlide
            question="(2/3) Your consortium project is two weeks from Milestone M2 — the Smart Contract Specification Freeze. A consortium member requests adding a new on-chain voting mechanism. What is the correct PM response?"
            options={[
              { text: 'Add the feature immediately — there are still two weeks before the freeze, which is enough time.', correct: false },
              { text: 'Refuse the request entirely — consortium members cannot propose changes after kickoff.', correct: false },
              { text: 'Log the request in the change backlog, assess the on-chain impact, and defer to post-launch scope unless it is a critical requirement.', correct: true },
              { text: 'Extend the M2 milestone date to accommodate the request — stakeholder satisfaction is the top priority.', correct: false },
            ]}
            explanation="The Specification Freeze is a hard boundary — changes to on-chain architecture after M2 cascade into audit scope changes, re-testing, and potential deployment delays. The correct response is formal change control: log it, assess impact, and unless it is critical, defer it. Casually accepting changes two weeks before freeze undermines the entire milestone structure and creates irreversibility risk in the audit phase."
          />
        </div>

        {/* ═══════ QUIZ 3/3 ═══════ */}
        <div className="h-full">
          <QuizSlide
            question="(3/3) In a DAO governance system, token-weighted voting consistently produces low participation rates — fewer than 5% of token holders vote on any proposal. Which governance failure mode does this represent, and what is the primary risk?"
            options={[
              { text: 'Fork risk — low participation causes the network to split into competing forks.', correct: false },
              { text: 'Upgrade gridlock — the supermajority requirement cannot be reached with 5% participation.', correct: false },
              { text: 'Voter apathy — a small, coordinated cartel can pass or block proposals on behalf of the entire community.', correct: true },
              { text: 'Whale capture — large holders are dominating the vote count and suppressing other voters.', correct: false },
            ]}
            explanation="Voter apathy is the most common DAO governance failure. When most holders do not vote, the effective decision-making power concentrates in whoever does — often a small, coordinated group. This can produce governance outcomes that serve a minority interest while appearing legitimately democratic. Solutions include delegation mechanisms, governance incentives, and lowering proposal thresholds to increase engagement."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s2-takeaways" className="h-full">
          <TakeawaySlide
            title="Key Takeaways — Session 02"
            takeaways={[
              '"Do we need blockchain?" is the most important question in project initiation. Most problems are better solved with a shared API or database.',
              'On-chain scope should be minimal — put only what requires the properties of a blockchain (immutability, multi-party trust, tokenization) on-chain.',
              'Stakeholder mapping for blockchain is broader than traditional IT: regulators, token holders, auditors, and community members are all project stakeholders.',
              'The specification freeze milestone is a hard boundary — changes to on-chain architecture after this point create significant irreversibility risk.',
              'Governance design is as important as technical design. Voter apathy, whale capture, and upgrade gridlock are as dangerous as code vulnerabilities.',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
