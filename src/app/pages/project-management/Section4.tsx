import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { DiscussionSlide } from '../../components/templates/DiscussionSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { MessageSquare } from 'lucide-react';

const chapters = [
  { id: 's4-landscape',    label: 'Stakeholder Landscape' },
  { id: 's4-translation',  label: 'Tech → Business' },
  { id: 's4-documentation',label: 'Documentation' },
  { id: 's4-governance',   label: 'Decision-Making' },
  { id: 's4-community',    label: 'Community Management' },
  { id: 's4-discussion',   label: 'Discussion' },
  { id: 's4-quiz',         label: 'Quiz' },
  { id: 's4-takeaways',    label: 'Takeaways' },
];

export function PM_Section4() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SESSION 04"
            title="Communication & Collaboration for Blockchain Teams"
            subtitle="The PM as translator — bridging technical reality and business expectation across a fragmented stakeholder universe"
            icon={<MessageSquare className="size-20 text-[#22d3ee]" />}
            gradient="from-[#22d3ee] to-[#f97316]"
          />
        </div>

        {/* ═══════ STAKEHOLDER LANDSCAPE ═══════ */}
        <div id="s4-landscape" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#22d3ee]">Session 04</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">The Blockchain Communication Challenge</h2>
            <p className="text-sm text-muted-foreground">Blockchain teams communicate across technical complexity, organizational boundaries, and often across pseudonymous global communities simultaneously.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#22d3ee]">The Technical Team</div>
              <div className="p-4 bg-[#22d3ee]/8 border border-[#22d3ee]/30 rounded-xl text-sm text-muted-foreground leading-relaxed">
                Speaks in gas limits, bytecode, and consensus rounds. Values precision, code correctness, and avoiding irreversible mistakes. Often underestimates business communication needs.
              </div>
              <div className="font-bold text-sm text-foreground mt-2">What they need from you:</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex gap-2"><span className="text-[#22d3ee]">→</span> Clear, stable requirements (no mid-sprint scope changes)</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">→</span> Time buffers for audit remediation</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">→</span> Protection from business pressure to skip quality gates</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">→</span> Recognition that blockchain complexity is real, not an excuse</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#f97316]">Business & Executive Stakeholders</div>
              <div className="p-4 bg-[#f97316]/8 border border-[#f97316]/30 rounded-xl text-sm text-muted-foreground leading-relaxed">
                Speaks in ROI, timelines, and competitive advantage. Values clear progress signals and avoidance of surprises. Often over-estimates what blockchain can deliver quickly.
              </div>
              <div className="font-bold text-sm text-foreground mt-2">What they need from you:</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex gap-2"><span className="text-[#f97316]">→</span> Business-language status reports, not technical logs</li>
                <li className="flex gap-2"><span className="text-[#f97316]">→</span> Early escalation of risks before they become problems</li>
                <li className="flex gap-2"><span className="text-[#f97316]">→</span> Milestone achievements tied to business outcomes</li>
                <li className="flex gap-2"><span className="text-[#f97316]">→</span> Honest assessments — blockchain is not magic</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#8b5cf6]">Community & Network Participants</div>
              <div className="p-4 bg-[#8b5cf6]/8 border border-[#8b5cf6]/30 rounded-xl text-sm text-muted-foreground leading-relaxed">
                Speaks in Discord threads, governance proposals, and token sentiment. Values transparency, decentralization, and alignment with the protocol mission.
              </div>
              <div className="font-bold text-sm text-foreground mt-2">What they need from you:</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex gap-2"><span className="text-[#8b5cf6]">→</span> Regular transparent progress updates (blog, governance forum)</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6]">→</span> Clear governance process for community participation</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6]">→</span> Honest incident post-mortems when things go wrong</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6]">→</span> Responsive engagement in community channels</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ═══════ TECH TO BUSINESS TRANSLATION ═══════ */}
        <div id="s4-translation" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#22d3ee]">Session 04</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Technical → Business Translation</h2>
            <p className="text-sm text-muted-foreground">The PM's most valuable skill in blockchain: making complex concepts actionable for non-technical decision-makers.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">
            {[
              {
                technical: 'The smart contract audit found a reentrancy vulnerability in the withdrawal function that could allow a malicious actor to drain contract funds by re-entering before state is updated.',
                business: 'Our security review found a critical flaw that could allow bad actors to steal all funds from the system. We are delaying the launch by 3 weeks to fix it. This is the correct decision — the cost of a hack would be catastrophic.',
                color: '#ef4444',
              },
              {
                technical: 'We cannot store user PII on-chain due to GDPR Article 17 conflict with blockchain immutability. We will use an off-chain hash pointer pattern with erasure capability on the off-chain store.',
                business: 'EU privacy law requires us to be able to delete personal data. Blockchain normally makes this impossible, so we are using a hybrid architecture: blockchain for the audit trail, a deletable database for personal information. This is standard practice.',
                color: '#6366f1',
              },
              {
                technical: 'Gas costs on Ethereum mainnet are currently at 40 gwei, making each transaction approximately $2.80. We recommend migrating to an L2 rollup to reduce fees by 95% and improve UX.',
                business: 'Transaction fees on our current blockchain are too high for end users ($2.80 per action). We recommend switching to a Layer 2 network that costs pennies per transaction — our users will notice the difference immediately.',
                color: '#f97316',
              },
              {
                technical: 'The governance proposal passed with 68% of voting power in favor, but we did not reach quorum (80% participation required). We need to re-run the vote with a lower quorum threshold or extended voting period.',
                business: 'The community voted in favor, but not enough people voted for the result to be official. We need to either run a second vote with a longer window, or adjust our rules so that strong support counts even with low turnout. The team recommends the second option.',
                color: '#eab308',
              },
            ].map((ex, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl">
                <div className="grid grid-rows-2 gap-2 h-full">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">💻 Technical Language</div>
                    <div className="text-xs text-foreground leading-relaxed italic">"{ex.technical}"</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: ex.color + '12', border: `1px solid ${ex.color}30` }}>
                    <div className="text-[10px] font-bold uppercase mb-1" style={{ color: ex.color }}>📊 Business Language</div>
                    <div className="text-xs text-foreground leading-relaxed">"{ex.business}"</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ DOCUMENTATION ═══════ */}
        <div id="s4-documentation" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#22d3ee]">Session 04</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Documentation Practices for Blockchain Projects</h2>
            <p className="text-sm text-muted-foreground">Blockchain projects require documentation that serves multiple audiences simultaneously — engineers, business stakeholders, auditors, and the public.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
            {[
              {
                type: 'Whitepaper / Litepaper',
                audience: 'Investors, community, partners',
                color: '#f97316',
                icon: '📄',
                contents: [
                  'Problem statement and solution overview',
                  'Token economics and distribution',
                  'Technical architecture (non-code level)',
                  'Governance model and roadmap',
                  'Team credentials and advisors',
                ],
                tip: 'The whitepaper is a public commitment document — do not overpromise. Every unfulfilled claim becomes a credibility issue.',
              },
              {
                type: 'Technical Specification',
                audience: 'Engineers, auditors, integrators',
                color: '#6366f1',
                icon: '⚙️',
                contents: [
                  'Smart contract architecture diagrams',
                  'Function signatures and access control',
                  'State machine and invariants',
                  'Integration API specifications',
                  'Test coverage requirements',
                ],
                tip: 'Freeze the spec before development begins. Changes after this point must go through formal change control with the PM\'s approval.',
              },
              {
                type: 'Governance & Operations Runbook',
                audience: 'Operators, DAO members, incident team',
                color: '#39B54A',
                icon: '📋',
                contents: [
                  'Governance proposal process and templates',
                  'On-chain voting procedures',
                  'Emergency pause and recovery procedures',
                  'Upgrade authorization and timelock process',
                  'Incident response contacts and escalation path',
                ],
                tip: 'The runbook must exist before mainnet launch — not as an afterthought. In an incident, nobody has time to write procedures from scratch.',
              },
            ].map(doc => (
              <div key={doc.type} className="p-5 bg-card border rounded-xl flex flex-col" style={{ borderColor: doc.color + '40' }}>
                <div className="text-2xl mb-2">{doc.icon}</div>
                <div className="font-bold mb-1" style={{ color: doc.color }}>{doc.type}</div>
                <div className="text-xs text-muted-foreground mb-3 bg-muted px-2 py-1 rounded w-fit">Audience: {doc.audience}</div>
                <ul className="space-y-1.5 flex-1 mb-3">
                  {doc.contents.map(c => <li key={c} className="text-xs text-muted-foreground flex gap-1.5"><span style={{ color: doc.color }}>•</span>{c}</li>)}
                </ul>
                <div className="p-2.5 rounded-lg text-xs" style={{ background: doc.color + '12', color: doc.color }}>
                  <span className="font-bold">PM Tip: </span><span className="text-foreground">{doc.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ DECISION-MAKING ═══════ */}
        <div id="s4-governance" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#22d3ee]">Session 04</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Decision-Making in Distributed Teams</h2>
            <p className="text-sm text-muted-foreground">Without clear decision frameworks, blockchain projects stall in endless discussion. The PM must define who decides what — and enforce it.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
            <div className="space-y-3">
              <div className="font-bold text-sm text-foreground">The DACI Framework for Blockchain</div>
              <div className="text-xs text-muted-foreground mb-2">Assign every major decision to clear roles — especially before design freeze.</div>
              {[
                { role: 'Driver', letter: 'D', color: '#f97316', desc: 'Owns the decision process. Accountable for moving it forward. Usually the PM or Product Owner.' },
                { role: 'Approver', letter: 'A', color: '#ef4444', desc: 'Has veto power. Makes the final call. Usually the Exec Sponsor, Legal, or Security Lead depending on the decision type.' },
                { role: 'Contributor', letter: 'C', color: '#eab308', desc: 'Provides input and expertise. Blockchain Architect, Smart Contract Dev, Legal Counsel. No vote but must be heard.' },
                { role: 'Informed', letter: 'I', color: '#39B54A', desc: 'Notified of the decision after it is made. Community members, dependent teams, external partners.' },
              ].map(r => (
                <div key={r.role} className="flex gap-3 p-3 bg-card border border-border rounded-lg items-start">
                  <div className="size-8 rounded-lg flex items-center justify-center shrink-0 font-black text-white text-sm" style={{ background: r.color }}>{r.letter}</div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{r.role}</div>
                    <div className="text-xs text-muted-foreground">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="font-bold text-sm text-foreground">Decision Types & Who Decides</div>
              {[
                { decision: 'Platform / L1 Selection', owner: 'Architect + PM', approver: 'Executive Sponsor', timing: 'Initiation phase — irrevocable' },
                { decision: 'Token Economics Design', owner: 'Token Economist + PM', approver: 'Legal + Board', timing: 'Before any public communication' },
                { decision: 'On-Chain vs Off-Chain scope', owner: 'Architect + Product Owner', approver: 'PM', timing: 'Specification freeze — freeze after M2' },
                { decision: 'Security Audit Firm Selection', owner: 'PM + Security Lead', approver: 'Executive Sponsor', timing: 'During development phase' },
                { decision: 'Mainnet Launch Go/No-Go', owner: 'PM', approver: 'Exec Sponsor + Legal + Auditor', timing: 'After M4 — audit complete and clean' },
                { decision: 'Protocol Upgrade Proposal', owner: 'Core Dev Team', approver: 'Governance Vote (community)', timing: 'Post-launch — through governance forum' },
              ].map(d => (
                <div key={d.decision} className="p-3 bg-card border border-border rounded-lg">
                  <div className="font-semibold text-xs text-foreground mb-1">{d.decision}</div>
                  <div className="flex gap-3 text-[10px] text-muted-foreground">
                    <span><span className="font-bold text-[#f97316]">Owner:</span> {d.owner}</span>
                    <span><span className="font-bold text-[#ef4444]">Approver:</span> {d.approver}</span>
                  </div>
                  <div className="text-[10px] text-[#eab308] mt-0.5">⏱ {d.timing}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ COMMUNITY MANAGEMENT ═══════ */}
        <div id="s4-community" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#22d3ee]">Session 04</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Community Management & Open-Source Collaboration</h2>
            <p className="text-sm text-muted-foreground">For public blockchain projects, the community IS the stakeholder. Managing it well is a core PM competency.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#22d3ee]">Communication Channels</div>
              {[
                { channel: 'Discord / Telegram', use: 'Real-time community discussion. Separate channels by topic (dev, governance, announcements). Do not let critical decisions happen here.' },
                { channel: 'Governance Forum', use: 'Long-form proposals and deliberation. Discourse or Commonwealth. Formal record of governance decisions.' },
                { channel: 'GitHub / GitLab', use: 'Code, issues, and technical discussion. On-chain code is public — the issue tracker is part of your public communication.' },
                { channel: 'Blog / Substack', use: 'Official announcements, protocol updates, and post-mortems. Slower but authoritative.' },
              ].map(c => (
                <div key={c.channel} className="p-3 bg-card border border-border rounded-lg">
                  <div className="font-semibold text-xs text-[#22d3ee] mb-0.5">{c.channel}</div>
                  <div className="text-xs text-muted-foreground">{c.use}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#f97316]">Community Communication Cadence</div>
              {[
                { freq: 'Weekly', activity: 'Development update in Discord / forum. Brief, factual. What shipped, what is blocked, what is next.' },
                { freq: 'Monthly', activity: 'Formal protocol newsletter. Metrics, governance activity, security status, upcoming milestones.' },
                { freq: 'Per Milestone', activity: 'Dedicated announcement for major launches, audit results, governance votes, and protocol upgrades.' },
                { freq: 'Incident-based', activity: 'Post-mortem within 48–72 hours of any security incident, outage, or governance controversy. Transparency is not optional.' },
              ].map(c => (
                <div key={c.freq} className="p-3 bg-card border border-border rounded-lg">
                  <div className="text-[10px] font-bold px-2 py-0.5 rounded w-fit bg-[#f97316]/15 text-[#f97316] mb-1">{c.freq}</div>
                  <div className="text-xs text-muted-foreground">{c.activity}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#8b5cf6]">Community Trust Principles</div>
              <div className="space-y-2">
                {[
                  { principle: 'Radical Transparency', desc: 'Publish audit reports. Share what went wrong, not just what went right. The community will find out anyway.' },
                  { principle: 'No Silence on Incidents', desc: 'A two-line tweet in the first hour beats silence for three days. Acknowledge → investigate → post-mortem.' },
                  { principle: 'Governance First', desc: 'Material changes go through governance. Never surprise the community with unilateral decisions — especially on tokenomics.' },
                  { principle: 'Credit Contributors', desc: 'Open-source contributors are your team. Attribute work publicly. Build a culture of recognition.' },
                  { principle: 'Own Your Mistakes', desc: 'A founder blaming "sophisticated attackers" for an unaudited protocol loses the community permanently. Own the failure.' },
                ].map(p => (
                  <div key={p.principle} className="p-3 bg-[#8b5cf6]/8 border border-[#8b5cf6]/30 rounded-lg">
                    <div className="font-semibold text-xs text-[#8b5cf6] mb-0.5">{p.principle}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ DISCUSSION ═══════ */}
        <div id="s4-discussion" className="h-full">
          <DiscussionSlide
            prompt="Your smart contract audit found a Critical vulnerability 72 hours before the public launch that was widely announced. How do you communicate this to: (a) your executive team, (b) your technical team, and (c) the public community?"
            guidingQuestions={[
              'A governance vote on a major protocol change passes with 71% approval but only 12% participation (quorum is 20%). The community is split — some say the result stands, others want a revote. As PM, what do you do?',
              'A key technical contributor is communicating only in highly technical terms in stakeholder meetings, causing executives to lose confidence in the project. How do you address this without alienating your best engineer?',
            ]}
          />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s4-quiz" className="h-full">
          <QuizSlide
            question="(1/3) A smart contract exploit has drained $2M from your DeFi protocol. The team has identified the root cause and a fix is ready. As PM, what is your first communication action?"
            options={[
              { text: 'Say nothing publicly until the fix is fully deployed — announcing the exploit before the patch will attract more attackers.', correct: false },
              { text: 'Post a brief, factual incident notice immediately: confirm the issue, state that the protocol is paused, and commit to a postmortem timeline.', correct: true },
              { text: 'Contact the media first to control the narrative before the community finds out on-chain.', correct: false },
              { text: 'Notify only the largest token holders privately so they can protect their positions before the public announcement.', correct: false },
            ]}
            explanation="In blockchain, on-chain activity is public — the community will discover the exploit independently within minutes. Silence creates a trust vacuum that speculation fills. The correct response is immediate, factual transparency: confirm the pause, acknowledge the issue, and commit to a postmortem. Selectively notifying large holders is insider information and potentially illegal. Delaying the announcement to complete the fix is also wrong — users need to know their funds are at risk so they can make their own decisions."
          />
        </div>

        {/* ═══════ QUIZ 2/3 ═══════ */}
        <div className="h-full">
          <QuizSlide
            question="(2/3) In the DACI decision framework used by blockchain project teams, what is the specific role of the 'A' — Approver?"
            options={[
              { text: 'The person who does the analytical work, gathers input, and prepares the recommendation for review.', correct: false },
              { text: 'The person or group with final decision authority — their explicit sign-off is required before the decision takes effect.', correct: true },
              { text: 'The people who provide domain expertise and can shape the decision but cannot block it.', correct: false },
              { text: 'The stakeholders who are notified of the outcome after the decision has been made.', correct: false },
            ]}
            explanation="In DACI: Driver owns the process and runs it forward; Approver has veto power and must explicitly sign off (typically the Exec Sponsor, Legal, or Security lead); Contributors provide input but cannot block; Informed are notified after. The key distinction is that Contributors (C) advise, while the Approver (A) decides. In blockchain projects, the Approver for mainnet launch is typically the PM plus the Security Auditor — without both sign-offs, the launch cannot proceed."
          />
        </div>

        {/* ═══════ QUIZ 3/3 ═══════ */}
        <div className="h-full">
          <QuizSlide
            question="(3/3) Your smart contract developer says: 'Each transaction costs ~23,000 gas — at current base fees that's about $4 per call.' How should you translate this for the executive sponsor?"
            options={[
              { text: "Share the exact technical figures — executives funding the project should understand gas mechanics.", correct: false },
              { text: "Frame it as user cost and business impact: 'Each user action costs ~$4. At a target of 10,000 daily active users, that is $40,000/day in user-paid network fees — we need to factor this into adoption projections and UX design.'", correct: true },
              { text: "Tell the sponsor not to worry — gas fees are a technical implementation detail that does not affect the business model.", correct: false },
              { text: "Ask the developer to reduce gas costs before the next executive meeting so you can present better numbers.", correct: false },
            ]}
            explanation="Technical-to-business translation is a core blockchain PM skill. Executives do not make decisions based on gas units — they make decisions based on cost, risk, and adoption impact. The PM's job is to convert '23,000 gas at $4' into a user experience and business model implication: How does $4/transaction affect user onboarding? At what scale does this become a barrier? Should we target a Layer 2 with lower fees? These are executive-level questions the PM must preempt."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s4-takeaways" className="h-full">
          <TakeawaySlide
            title="Key Takeaways — Session 04"
            takeaways={[
              'The blockchain PM is the translator between three worlds: the technical team, business stakeholders, and the public community — each requires a different communication register.',
              'Technical-to-business translation is a core PM skill: convert gas limits and vulnerabilities into risk, cost, and timeline language that executives can act on.',
              'Documentation serves multiple audiences simultaneously — whitepapers for the community, technical specs for auditors, and runbooks for operations. All must exist before mainnet.',
              'The DACI framework prevents decision gridlock: define who Drives, Approves, Contributes, and is Informed for every major decision — especially before the specification freeze.',
              'Community trust is built through radical transparency and consistent communication cadence. A well-handled incident builds more trust than silence after a perfect launch.',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
