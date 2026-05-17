import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { ComparisonSlide } from '../../components/templates/ComparisonSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { Briefcase, ArrowRight } from 'lucide-react';

const chapters = [
  { id: 's1-unique',    label: 'What Makes It Unique?' },
  { id: 's1-lifecycle', label: 'Project Lifecycle' },
  { id: 's1-roles',     label: 'Key Roles' },
  { id: 's1-agile',     label: 'Agile vs Waterfall' },
  { id: 's1-quiz',      label: 'Quiz' },
  { id: 's1-takeaways', label: 'Takeaways' },
];

export function PM_Section1() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SESSION 01"
            title="Introduction to Blockchain Project Management"
            subtitle="What makes blockchain initiatives different — and how to manage them successfully"
            icon={<Briefcase className="size-20 text-[#f97316]" />}
            gradient="from-[#f97316] to-[#eab308]"
          />
        </div>

        {/* ═══════ WHAT MAKES IT UNIQUE ═══════ */}
        <div id="s1-unique" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Session 01</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">What Makes Blockchain Projects Unique?</h2>
            <p className="text-sm text-muted-foreground">Blockchain initiatives carry challenges that standard IT projects simply do not have.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                emoji: '🔒',
                title: 'Irreversibility',
                desc: 'Deployed smart contracts and on-chain transactions cannot be undone. Mistakes are permanent and public — raising the cost of poor requirements.',
                color: '#ef4444',
              },
              {
                emoji: '🤝',
                title: 'Multi-Stakeholder Governance',
                desc: 'No single organization owns the network. Decisions require consensus across competitors, regulators, and community members — often all at once.',
                color: '#f97316',
              },
              {
                emoji: '🪙',
                title: 'Token Economics',
                desc: 'Many blockchain projects involve native tokens or incentive structures. Economic design is a project deliverable — not just an afterthought.',
                color: '#eab308',
              },
              {
                emoji: '⚖️',
                title: 'Regulatory Uncertainty',
                desc: 'Legal frameworks for blockchain are incomplete and vary by jurisdiction. Compliance is a moving target throughout the entire project lifetime.',
                color: '#8b5cf6',
              },
              {
                emoji: '🌐',
                title: 'Distributed Team Reality',
                desc: 'Many blockchain teams are globally distributed, pseudonymous, and often open-source contributors — standard HR practices may not apply.',
                color: '#22d3ee',
              },
              {
                emoji: '🔗',
                title: 'External Protocol Dependencies',
                desc: 'Your project depends on L1 or L2 blockchains you do not control. Protocol upgrades, forks, or failures are outside your scope — but still your problem.',
                color: '#39B54A',
              },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl border bg-card flex flex-col gap-2" style={{ borderColor: item.color + '40' }}>
                <div className="text-2xl">{item.emoji}</div>
                <div className="font-bold text-foreground text-sm" style={{ color: item.color }}>{item.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ PROJECT LIFECYCLE ═══════ */}
        <div id="s1-lifecycle" className="h-full flex flex-col p-5 lg:p-8">

          {/* Header */}
          <div className="shrink-0 mb-4 lg:mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Session 01</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Blockchain Project Lifecycle</h2>
            <p className="text-sm text-muted-foreground">
              Five phases — each with distinct PM concerns specific to decentralized systems.
            </p>
          </div>

          {/* Five equal-height phase cards in a horizontal flow */}
          <div className="flex-1 min-h-0 flex items-stretch gap-2 lg:gap-3">
            {(
              [
                {
                  number: '01',
                  title: 'Initiation & Discovery',
                  icon: '🔍',
                  color: '#f97316',
                  description:
                    'Define the problem. Apply the "Do we need blockchain?" framework. Identify stakeholders and initial governance structure. Assess regulatory environment.',
                  deliverables: ['Feasibility study', 'Stakeholder register', 'Governance charter'],
                },
                {
                  number: '02',
                  title: 'Design & Architecture',
                  icon: '🏗️',
                  color: '#6366f1',
                  description:
                    'Choose the platform (public / permissioned). Design token economics if applicable. Define consensus mechanism, data model, and integration points.',
                  deliverables: ['Platform decision', 'Architecture docs', 'Tokenomics model'],
                },
                {
                  number: '03',
                  title: 'Development & Auditing',
                  icon: '💻',
                  color: '#39B54A',
                  description:
                    'Build and test smart contracts in isolated environments. Conduct formal security audits before any mainnet deployment. Security is not optional.',
                  deliverables: ['Testnet contracts', 'Audit report', 'Test coverage'],
                },
                {
                  number: '04',
                  title: 'Deployment & Go-Live',
                  icon: '🚀',
                  color: '#ED1C24',
                  description:
                    'Deploy to testnet first. Coordinate multi-party signing for mainnet launch. Document on-chain addresses and upgrade paths. No rollback is possible.',
                  deliverables: ['Mainnet deploy', 'Multi-sig setup', 'On-chain registry'],
                },
                {
                  number: '05',
                  title: 'Operations & Governance',
                  icon: '⚙️',
                  color: '#22d3ee',
                  description:
                    'Monitor on-chain activity and protocol health. Manage governance proposals and community votes. Plan for protocol upgrades and ecosystem changes.',
                  deliverables: ['Monitoring setup', 'Governance forum', 'Upgrade roadmap'],
                },
              ] as const
            ).flatMap((phase, i, arr) => {
              const card = (
                <div
                  key={phase.number}
                  className="flex-1 flex flex-col rounded-xl border-2 bg-card overflow-hidden"
                  style={{ borderColor: phase.color + '50' }}
                >
                  {/* Top color stripe */}
                  <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: phase.color }} />

                  <div className="flex flex-col flex-1 p-4 lg:p-5 min-h-0">
                    {/* Number badge + icon */}
                    <div className="flex items-center gap-2 mb-3 shrink-0">
                      <div
                        className="size-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                        style={{ backgroundColor: phase.color }}
                      >
                        {phase.number}
                      </div>
                      <span className="text-xl">{phase.icon}</span>
                    </div>

                    {/* Phase title */}
                    <h3
                      className="font-bold text-sm lg:text-base leading-snug mb-2 shrink-0"
                      style={{ color: phase.color }}
                    >
                      {phase.title}
                    </h3>

                    {/* Description — fills remaining space */}
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 min-h-0">
                      {phase.description}
                    </p>

                    {/* Key deliverables pinned to bottom */}
                    <div className="mt-3 pt-3 border-t border-border shrink-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                        Key Deliverables
                      </p>
                      <ul className="space-y-1">
                        {phase.deliverables.map(d => (
                          <li key={d} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span
                              className="size-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: phase.color }}
                            />
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

        {/* ═══════ KEY ROLES ═══════ */}
        <div id="s1-roles" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Session 01</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Key Roles in a Blockchain Project</h2>
            <p className="text-sm text-muted-foreground">Blockchain projects require a unique cross-functional team. These roles often overlap — and many are unique to the space.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-3 gap-3 overflow-auto">
            {[
              { role: 'Blockchain PM', icon: '📋', desc: 'Coordinates delivery across technical and business domains. Translates between the chain and the C-suite.', color: '#f97316' },
              { role: 'Blockchain Architect', icon: '🏗️', desc: 'Chooses the platform, designs the data model, and makes irreversible architectural decisions.', color: '#eab308' },
              { role: 'Smart Contract Dev', icon: '💻', desc: 'Writes and tests on-chain code. Responsible for security properties — bugs cannot be easily patched post-deployment.', color: '#6366f1' },
              { role: 'Security Auditor', icon: '🔐', desc: 'Independent review of smart contract code before deployment. Identifies reentrancy, access control, and logic vulnerabilities.', color: '#ef4444' },
              { role: 'Token Economist', icon: '🪙', desc: 'Designs incentive structures, staking mechanisms, and tokenomics to align participant behaviour with project goals.', color: '#39B54A' },
              { role: 'Community / DAO Lead', icon: '🌐', desc: 'Manages the project community, governance forum, and on-chain voting processes. Critical for public chains.', color: '#22d3ee' },
              { role: 'Legal / Compliance', icon: '⚖️', desc: 'Navigates the regulatory landscape. Advises on token classification, GDPR on-chain compliance, and jurisdiction strategy.', color: '#8b5cf6' },
              { role: 'Integration Engineer', icon: '🔗', desc: 'Bridges on-chain and off-chain systems. Builds oracles, indexers, and API layers between the blockchain and traditional IT.', color: '#f59e0b' },
              { role: 'Product Owner', icon: '🎯', desc: 'Owns the vision and backlog. Prioritizes features while keeping the immutability constraint front of mind.', color: '#f97316' },
            ].map(r => (
              <div key={r.role} className="flex gap-3 p-4 bg-card rounded-xl border border-border items-start" style={{ borderLeftWidth: 3, borderLeftColor: r.color }}>
                <div className="text-xl shrink-0">{r.icon}</div>
                <div>
                  <div className="font-bold text-sm text-foreground mb-0.5" style={{ color: r.color }}>{r.role}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ AGILE VS WATERFALL ═══════ */}
        <div id="s1-agile" className="h-full">
          <ComparisonSlide
            title="Agile vs Waterfall for Blockchain"
            featureLabel="Dimension"
            option1Label="Waterfall"
            option2Label="Agile / Iterative"
            items={[
              {
                feature: 'Requirements Definition',
                option1: 'Comprehensive upfront design before any development begins',
                option2: 'Evolving backlog — requirements emerge through sprints and feedback',
              },
              {
                feature: 'Smart Contract Development',
                option1: 'Big-bang release after all specs are finalized',
                option2: 'Iterative development with testnet deployments before mainnet',
              },
              {
                feature: 'Stakeholder Alignment',
                option1: 'Sign-off at milestones with formal change control',
                option2: 'Continuous collaboration and demo-driven feedback loops',
              },
              {
                feature: 'Off-Chain Integrations',
                option1: 'Defined integration contracts delivered in sequence',
                option2: 'API-first iteration with mocked blockchain interfaces',
              },
              {
                feature: 'Risk Management',
                option1: 'Risks identified and mitigated before the project starts',
                option2: 'Risks discovered and addressed iteratively throughout delivery',
              },
            ]}
          />
        </div>

        {/* ═══════ QUIZ 1/3 ═══════ */}
        <div id="s1-quiz" className="h-full">
          <QuizSlide
            question="(1/3) A blockchain project has just deployed its smart contracts to mainnet. The team discovers a critical logic bug that allows unauthorized token minting. What is the correct response?"
            options={[
              { text: 'Push a hotfix directly to the mainnet contract to patch the vulnerability as fast as possible.', correct: false },
              { text: 'Roll back the mainnet deployment to the previous version while the fix is tested.', correct: false },
              { text: 'Activate the emergency pause mechanism, notify stakeholders, and plan a formal upgrade through the established change control process.', correct: true },
              { text: 'Accept the bug as a known issue and wait for the next planned release cycle to include the fix.', correct: false },
            ]}
            explanation="Smart contract deployments are irreversible — you cannot simply push a patch or roll back. The correct response is to activate the emergency pause (if available), communicate transparently with all stakeholders, and follow the formal upgrade path (proxy upgrade or migration). This is why the Audit Complete Go/No-Go gate and a well-tested emergency pause mechanism are non-negotiable deliverables before mainnet."
          />
        </div>

        {/* ═══════ QUIZ 2/3 ═══════ */}
        <div className="h-full">
          <QuizSlide
            question="(2/3) Which component of a blockchain project is BEST suited to waterfall-style locked specifications, while the other benefits from agile iteration?"
            options={[
              { text: 'Off-chain integrations → waterfall; on-chain smart contract logic → agile sprints.', correct: false },
              { text: 'On-chain architecture decisions → waterfall rigor; off-chain UI and tooling → agile iteration.', correct: true },
              { text: 'Both on-chain and off-chain components benefit equally from agile sprints — blockchain is no different.', correct: false },
              { text: 'Neither — blockchain projects must be 100% waterfall because of their irreversibility.', correct: false },
            ]}
            explanation="On-chain architecture is irreversible once deployed — changing a smart contract data model or consensus mechanism after launch is extremely costly or impossible. This demands upfront rigor akin to waterfall: lock the spec, audit, then deploy. Off-chain components (dApp frontend, indexers, APIs) can be iterated rapidly because they carry no permanent state commitment. A mature blockchain PM applies the right methodology to the right layer."
          />
        </div>

        {/* ═══════ QUIZ 3/3 ═══════ */}
        <div className="h-full">
          <QuizSlide
            question="(3/3) A DeFi protocol is three weeks from mainnet launch. Which role is specifically responsible for independently reviewing smart contract code for reentrancy attacks and access control vulnerabilities?"
            options={[
              { text: 'The Blockchain Architect — they designed the contracts and know them best.', correct: false },
              { text: 'The Product Owner — they own the backlog and must approve all security requirements.', correct: false },
              { text: 'The Independent Security Auditor — a third party not involved in development.', correct: true },
              { text: 'The Integration Engineer — they are responsible for all external interfaces.', correct: false },
            ]}
            explanation="Independence is the defining property of the Security Auditor role. A developer cannot fully audit their own code — cognitive bias and familiarity create blind spots. The auditor must be a third party with no prior involvement in the codebase, commissioned specifically to find vulnerabilities before mainnet. This is why the Audit Complete milestone is a hard Go/No-Go gate: no audit sign-off, no mainnet."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s1-takeaways" className="h-full">
          <TakeawaySlide
            title="Key Takeaways — Session 01"
            takeaways={[
              'Blockchain projects carry irreversibility, multi-stakeholder governance, and regulatory complexity that traditional IT projects do not.',
              'The five-phase lifecycle (Initiation → Design → Development → Deployment → Operations) maps PM work to the unique constraints of decentralized systems.',
              'Cross-functional teams for blockchain include roles not found in classical IT — token economists, auditors, DAO leads, and legal/compliance specialists.',
              'Agile iteration works well for off-chain components and testnet cycles; waterfall-style rigor is appropriate for on-chain architecture decisions.',
              'The irreversibility of blockchain is the single most important constraint shaping how you plan, scope, and test.',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
