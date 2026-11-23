import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { ComparisonSlide } from '../../components/templates/ComparisonSlide';
import { GroupedQuiz } from '../../components/templates/GroupedQuiz';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { MicroVaultCallout } from '../../components/shared/MicroVaultCallout';
import { DeepDiveBadge } from '../../components/shared/DeepDiveBadge';
import { Briefcase, ArrowRight, ArrowDown } from 'lucide-react';

const chapters = [
  { id: 's1-elements',     label: '1.1 Elements' },
  { id: 's1-pm-product',   label: '1.2 Project vs Product' },
  { id: 's1-methods',      label: '1.3 PM Methodologies' },
  { id: 's1-checklist',    label: '1.4 Delivery Checklist' },
  { id: 's1-agile',        label: '1.5 Agile vs Waterfall' },
  { id: 's1-impact',       label: '1.6 Impact on Constraints' },
  { id: 's1-stakeholders', label: '1.7 Stakeholders' },
  { id: 's1-extras',       label: 'Extras', kind: 'group' as const },
  { id: 's1-roles',        label: 'Deep Dive: Key Roles' },
  { id: 's1-quiz',         label: 'Quiz' },
  { id: 's1-takeaways',    label: 'Takeaways' },
];

// The section quiz, in order. GroupedQuiz shows it on one slide, one question at a time.
const quizQuestions = [
  {
    question: "(1/3) A blockchain project has just deployed its smart contracts to mainnet. The team discovers a critical logic bug that allows unauthorized token minting. What is the correct response?",
    options: [
      { text: 'Push a hotfix directly to the mainnet contract to patch the vulnerability as fast as possible.', correct: false },
      { text: 'Roll back the mainnet deployment to the previous version while the fix is tested.', correct: false },
      { text: 'Activate the emergency pause mechanism, notify stakeholders, and plan a formal upgrade through the established change control process.', correct: true },
      { text: 'Accept the bug as a known issue and wait for the next planned release cycle to include the fix.', correct: false },
    ],
    explanation: "Smart contract deployments are irreversible — you cannot simply push a patch or roll back. The correct response is to activate the emergency pause (if available), communicate transparently with all stakeholders, and follow the formal upgrade path (proxy upgrade or migration). This is why the audit gate and a well-tested emergency pause mechanism are non-negotiable before mainnet.",
  },
  {
    question: "(2/3) Which kind of work in a blockchain project is BEST suited to a predictive (waterfall) approach, and which benefits from adaptive (agile) iteration?",
    options: [
      { text: 'Off-chain integrations → predictive; on-chain smart contract logic → adaptive sprints.', correct: false },
      { text: 'Fixed, externally mandated work (audits, compliance) → predictive rigor; evolving product work (contract features, UX) → adaptive iteration.', correct: true },
      { text: 'All work benefits equally from agile sprints — blockchain is no different.', correct: false },
      { text: 'Neither — blockchain projects must be 100% waterfall because of their irreversibility.', correct: false },
    ],
    explanation: "This is the course's central principle: don't choose one approach for the whole project — tailor per work package. Fixed, externally mandated requirements (a security audit's scope doesn't change mid-engagement) fit predictive delivery with formal baselines. Work with genuine requirement uncertainty (contract features, UX) fits adaptive delivery with testnet iteration. Section 2 introduces a formal decision matrix for this choice.",
  },
  {
    question: "(3/3) A DeFi protocol is three weeks from mainnet launch. Which role is specifically responsible for independently reviewing smart contract code for reentrancy attacks and access control vulnerabilities?",
    options: [
      { text: 'The Blockchain Architect — they designed the contracts and know them best.', correct: false },
      { text: 'The Product Owner — they own the backlog and must approve all security requirements.', correct: false },
      { text: 'The Independent Security Auditor — a third party not involved in development.', correct: true },
      { text: 'The Integration Engineer — they are responsible for all external interfaces.', correct: false },
    ],
    explanation: "Independence is the defining property of the Security Auditor role. A developer cannot fully audit their own code — cognitive bias and familiarity create blind spots. The auditor must be a third party with no prior involvement in the codebase, commissioned specifically to find vulnerabilities before mainnet. This is why the audit is a hard phase gate: no audit sign-off, no mainnet.",
  },
];

export function PM_Section1() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} accentColor="#f97316" />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 01"
            title="Introduction to Blockchain Projects Management"
            subtitle="What makes blockchain initiatives different — and how traditional project management applies to them"
            icon={<Briefcase className="size-20 text-[#f97316]" />}
            gradient="from-[#f97316] to-[#eab308]"
          />
        </div>

        {/* ═══════ 1.1 THE ELEMENTS OF BLOCKCHAIN PROJECTS ═══════ */}
        <div id="s1-elements" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 01 · Slide 1.1</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">The Elements of Blockchain Projects</h2>
            <p className="text-sm text-muted-foreground">
              Immutability, transparency, decentralization, consensus, smart contracts, cryptographic security, tokenization,
              distributed governance — these characteristics make blockchain initiatives different from many traditional projects.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { emoji: '🧩', title: 'Increased Complexity', desc: 'Innovation, governance complexity, distributed collaboration, and security dependency combine in a single initiative.', color: '#6366f1' },
                { emoji: '⚖️', title: 'Regulatory & Governance Challenges', desc: 'Legal frameworks are incomplete and evolving — compliance is a moving target throughout the project lifetime.', color: '#8b5cf6' },
                { emoji: '🤝', title: 'Distributed Stakeholders', desc: 'Coordination among multiple, often distributed stakeholders — no single organization owns the whole picture.', color: '#f97316' },
                { emoji: '📅', title: 'Resource Planning & Scheduling', desc: 'Specialized, scarce skills and blockchain-specific milestones directly affect who you need and when.', color: '#eab308' },
                { emoji: '🔐', title: 'Security & Quality Requirements', desc: 'Irreversibility raises the bar: testing, audits, and quality gates carry more weight than in typical IT projects.', color: '#ef4444' },
                { emoji: '🔄', title: 'Uncertainty & Continuous Adaptation', desc: 'The ecosystem evolves rapidly — plans must be built expecting change, not hoping to avoid it.', color: '#22d3ee' },
              ].map(item => (
                <div key={item.title} className="p-3 lg:p-4 rounded-xl border bg-card flex flex-col gap-1.5" style={{ borderColor: item.color + '40' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="font-bold text-xs lg:text-sm" style={{ color: item.color }}>{item.title}</span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Domains + the project/product dimension */}
            <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="p-3 lg:p-4 bg-card border border-border rounded-xl">
                <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1.5">Where blockchain initiatives appear</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Organizational transformation', 'Governance & voting', 'DAOs', 'DeFi', 'Public services', 'Healthcare', 'Education', 'Supply chain', 'Stablecoins / CBDCs', 'NFT marketplaces', 'Digital identity'].map(d => (
                    <span key={d} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">{d}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 lg:p-4 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#6366f1] mb-1.5">Two dimensions every blockchain initiative shares</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A <span className="font-bold text-foreground">project</span> dimension — temporary, bounded work with an objective and an end —
                  and a <span className="font-bold text-foreground">product</span> dimension: the platform itself, which keeps evolving through governance,
                  upgrades, and community activity long after the project closes. <span className="font-semibold text-foreground">Confusing the two is the most
                  common conceptual error blockchain teams make.</span>
                </p>
              </div>
            </div>

            <MicroVaultCallout className="shrink-0">
              MicroVault is small — 3 people, a 6-month runway — but carries the same elements as larger initiatives: irreversible
              deployment risk, a mandatory external audit, and a governance dimension (the DAO) that doesn't exist yet but will after
              launch. We proceed by treating MicroVault as a full initiative worth managing deliberately.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 1.2 PROJECT VS PRODUCT MANAGEMENT ═══════ */}
        <div id="s1-pm-product" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 01 · Slide 1.2</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Project Management vs. Product Management</h2>
            <p className="text-sm text-muted-foreground">
              In blockchain the line blurs more than in most industries — because the platform keeps evolving after deployment.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: definitions + comparison */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="p-3 lg:p-4 bg-[#f97316]/8 border border-[#f97316]/30 rounded-xl">
                <div className="font-bold text-sm text-[#f97316] mb-1">Project (PMI)</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A <span className="italic">temporary endeavor</span> undertaken to create a unique product, service, or result.
                  Modern project management applies knowledge, skills, tools, and techniques to meet requirements <span className="font-semibold text-foreground">and deliver value</span>.
                </p>
              </div>
              <div className="p-3 lg:p-4 bg-[#6366f1]/8 border border-[#6366f1]/30 rounded-xl">
                <div className="font-bold text-sm text-[#6366f1] mb-1">Product Management</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The organizational function guiding a product through its lifecycle by integrating customer needs,
                  business objectives, and market opportunities.
                </p>
              </div>
              {/* Mini comparison table */}
              <div className="flex-1 min-h-0 rounded-xl border border-border overflow-hidden flex flex-col">
                <div className="grid grid-cols-3 text-[11px] lg:text-xs font-bold bg-muted text-foreground">
                  <div className="p-2"></div>
                  <div className="p-2 text-[#f97316]">Project Mgmt</div>
                  <div className="p-2 text-[#6366f1]">Product Mgmt</div>
                </div>
                {[
                  { k: 'Core question', a: 'How do we deliver it?', b: 'What should we build, and how should it evolve?' },
                  { k: 'Time horizon', a: 'Temporary — has an end', b: 'Ongoing — no defined end' },
                  { k: 'Focus', a: 'Scope, schedule, cost, quality, risk', b: 'Vision, user needs, market value, roadmap' },
                ].map(r => (
                  <div key={r.k} className="grid grid-cols-3 text-[11px] lg:text-xs border-t border-border">
                    <div className="p-2 font-semibold text-foreground bg-muted/40">{r.k}</div>
                    <div className="p-2 text-muted-foreground">{r.a}</div>
                    <div className="p-2 text-muted-foreground">{r.b}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: what the blockchain PM needs from product management */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="font-bold text-sm text-foreground shrink-0">What a blockchain PM needs from product management — and no more:</div>
              <div className="flex-1 min-h-0 flex flex-col gap-2">
                {[
                  { tool: 'MVP', use: 'Yes — actively used to scope the first release', active: true },
                  { tool: 'Product backlog', use: 'Yes — actively managed for adaptive work (Section 2)', active: true },
                  { tool: 'Prioritization', use: 'Yes — used to sequence backlog items', active: true },
                  { tool: 'User stories', use: 'Yes — the PM reads, writes, and critiques these', active: true },
                  { tool: 'Vision, roadmap, value proposition', use: 'Understand only — not authored by the PM', active: false },
                  { tool: 'Product owner role', use: 'Understand it — and recognize when the PM is filling it', active: false },
                ].map(r => (
                  <div key={r.tool} className={`flex items-center gap-3 p-2.5 rounded-lg border ${r.active ? 'bg-[#39B54A]/8 border-[#39B54A]/30' : 'bg-card border-border'}`}>
                    <span className={`shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full ${r.active ? 'bg-[#39B54A] text-white' : 'bg-muted text-muted-foreground'}`}>
                      {r.active ? 'USE' : 'KNOW'}
                    </span>
                    <div className="min-w-0">
                      <span className="font-semibold text-xs text-foreground">{r.tool}</span>
                      <span className="text-xs text-muted-foreground"> — {r.use}</span>
                    </div>
                  </div>
                ))}
              </div>
              <MicroVaultCallout className="shrink-0">
                In MicroVault the founder is project manager, product owner, and stakeholder liaison at once — common in small DeFi
                startups. That doesn't erase the distinction: we name explicitly which decisions are "project manager" decisions
                (schedule, audit gate, risk) and which are "product owner" decisions (backlog priority, v1 feature scope).
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 1.3 TRADITIONAL PM METHODOLOGIES ═══════ */}
        <div id="s1-methods" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 01 · Slide 1.3</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Traditional PM Methodologies, Applied to Blockchain</h2>
            <p className="text-sm text-muted-foreground">
              Traditional project management applies directly — it does not need to be reinvented. Blockchain layers two things on top.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* Product lifecycle chain */}
            <div className="shrink-0 p-3 lg:p-4 bg-[#6366f1]/8 border border-[#6366f1]/30 rounded-xl">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#6366f1] mb-2">Product lifecycle — evolve and maximize value, indefinitely</div>
              <div className="flex items-center gap-1.5 lg:gap-2 flex-wrap">
                {['Concept', 'Development', 'Launch', 'Growth', 'Maturity', 'Evolution / Retirement'].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-1.5 lg:gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${i === 1 || i === 2 ? 'bg-[#6366f1]/15 border-[#6366f1]/40 text-[#6366f1]' : 'bg-card border-border text-muted-foreground'}`}>{s}</span>
                    {i < arr.length - 1 && <ArrowRight className="size-3 text-muted-foreground/40" />}
                  </span>
                ))}
              </div>
            </div>

            {/* Relationship arrow */}
            <div className="shrink-0 flex items-center gap-2 pl-4 text-muted-foreground">
              <ArrowDown className="size-4 rotate-180 text-[#f97316]" />
              <span className="text-xs">The project lifecycle <span className="font-bold text-foreground">delivers the solution</span> that the product lifecycle then evolves.</span>
            </div>

            {/* Project lifecycle */}
            <div className="shrink-0 p-3 lg:p-4 bg-[#f97316]/8 border border-[#f97316]/30 rounded-xl">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#f97316] mb-2">Project lifecycle (PMI) — deliver the solution</div>
              <div className="flex items-center gap-1.5 lg:gap-2 flex-wrap mb-2">
                {['Initiation', 'Planning', 'Execution', 'Monitoring & Controlling', 'Closing'].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-1.5 lg:gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f97316]/15 border border-[#f97316]/40 text-[#f97316]">{s}</span>
                    {i < arr.length - 1 && <ArrowRight className="size-3 text-muted-foreground/40" />}
                  </span>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">PMBOK's seven performance domains layer onto these:</span>{' '}
                {['Governance', 'Scope', 'Schedule', 'Finance', 'Stakeholders', 'Resources', 'Risk'].map((d, i, arr) => (
                  <span key={d}>{d}{i < arr.length - 1 ? ' · ' : ''}</span>
                ))}
              </div>
            </div>

            {/* What blockchain adds */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="p-3 lg:p-4 bg-card border border-border rounded-xl">
                <div className="font-bold text-sm text-foreground mb-1">➕ Layer 1: a domain-specific checklist</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A <span className="font-semibold text-foreground">Blockchain Delivery Checklist</span> of technical and governance milestones (next slide).
                  It sits <span className="italic">alongside</span> — not above — the project lifecycle: it doesn't tell you <span className="italic">how</span> to
                  manage the work, only <span className="italic">what blockchain-specific concerns must be addressed</span> regardless of approach.
                </p>
              </div>
              <div className="p-3 lg:p-4 bg-card border border-border rounded-xl">
                <div className="font-bold text-sm text-foreground mb-1">➕ Layer 2: a sharp project/product boundary</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  An unusually sharp distinction between when the <span className="font-semibold text-foreground">project ends</span> and when the{' '}
                  <span className="font-semibold text-foreground">product keeps going</span> — so much of a blockchain platform's real activity
                  (governance votes, upgrades, community growth) happens after the project that built it has formally closed.
                </p>
              </div>
            </div>

            <MicroVaultCallout className="shrink-0">
              MicroVault's project lifecycle governs the six months to launch. Its product lifecycle — deposits, withdrawals, borrowing,
              and eventually DAO governance — begins the moment the project closes and continues for as long as the protocol exists.
              We keep these two clearly distinct from day one, and return to the handoff in Section 6.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 1.4 THE BLOCKCHAIN DELIVERY CHECKLIST ═══════ */}
        <div id="s1-checklist" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 01 · Slide 1.4</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">The Blockchain Delivery Checklist</h2>
            <p className="text-sm text-muted-foreground">
              Domain-specific technical and governance milestones, layered onto whichever delivery approach (predictive, adaptive, or hybrid) is chosen for the underlying work.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex items-stretch gap-2 lg:gap-3">
            {(
              [
                {
                  number: '01',
                  title: 'Discovery',
                  icon: '🔍',
                  color: '#f97316',
                  description:
                    'Define the problem. Apply a "do we actually need blockchain?" test. Identify stakeholders. Assess the regulatory environment.',
                  deliverables: ['Feasibility note', 'Stakeholder register'],
                },
                {
                  number: '02',
                  title: 'Architecture',
                  icon: '🏗️',
                  color: '#6366f1',
                  description:
                    'Platform choice (public / permissioned). Consensus mechanism. Data model. On-chain/off-chain boundary. Tokenomics if applicable.',
                  deliverables: ['Architecture doc', 'Platform decision', 'Tokenomics model'],
                },
                {
                  number: '03',
                  title: 'Build & Audit',
                  icon: '💻',
                  color: '#39B54A',
                  description:
                    'Build and test smart contracts in isolated environments. Conduct a formal security audit before any mainnet deployment — a mandatory phase gate, not optional.',
                  deliverables: ['Testnet contracts', 'Test coverage report', 'Audit report'],
                },
                {
                  number: '04',
                  title: 'Deploy',
                  icon: '🚀',
                  color: '#ED1C24',
                  description:
                    'Deploy to testnet first. Coordinate multi-party signing for mainnet. Document on-chain addresses and upgrade paths. No rollback is possible once mainnet is live.',
                  deliverables: ['Mainnet deployment', 'Multi-sig setup', 'On-chain registry'],
                },
              ] as const
            ).flatMap((phase, i, arr) => {
              const card = (
                <div
                  key={phase.number}
                  className="flex-1 flex flex-col rounded-xl border-2 bg-card overflow-hidden"
                  style={{ borderColor: phase.color + '50' }}
                >
                  <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: phase.color }} />
                  <div className="flex flex-col flex-1 p-4 lg:p-5 min-h-0">
                    <div className="flex items-center gap-2 mb-3 shrink-0">
                      <div
                        className="size-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                        style={{ backgroundColor: phase.color }}
                      >
                        {phase.number}
                      </div>
                      <span className="text-xl">{phase.icon}</span>
                    </div>
                    <h3 className="font-bold text-sm lg:text-base leading-snug mb-2 shrink-0" style={{ color: phase.color }}>
                      {phase.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 min-h-0">{phase.description}</p>
                    <div className="mt-3 pt-3 border-t border-border shrink-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Outputs</p>
                      <ul className="space-y-1">
                        {phase.deliverables.map(d => (
                          <li key={d} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: phase.color }} />
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

          <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="p-3 bg-[#22d3ee]/8 border border-[#22d3ee]/30 rounded-xl text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-[#22d3ee]">Where is "Operations &amp; Governance"?</span>{' '}
              Not on this checklist. Ongoing monitoring, governance proposals, and upgrade planning belong to the{' '}
              <span className="font-semibold text-foreground">product lifecycle</span> — covered in Section 6 as part of project closure and handoff.
            </div>
            <MicroVaultCallout>
              MicroVault's audit sits in Build &amp; Audit and functions as the project's critical-path gate — mainnet cannot launch
              until it passes. We treat this checklist as a planning aid layered onto the delivery approach we select per work package,
              not as a rigid sequence to march through in order.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 1.5 AGILE VS WATERFALL — ADVANTAGES & LIMITATIONS ═══════ */}
        <div id="s1-agile" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 01 · Slide 1.5</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Agile vs. Waterfall for Blockchain Projects</h2>
            <p className="text-sm text-muted-foreground">
              Neither approach is "better" in the abstract — each fits different kinds of work, and blockchain initiatives routinely contain both kinds simultaneously.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Predictive */}
            <div className="flex flex-col rounded-xl border-2 border-[#6366f1]/40 bg-card overflow-hidden">
              <div className="p-3 lg:p-4 bg-[#6366f1]/10 shrink-0">
                <div className="font-bold text-[#6366f1]">Predictive (Waterfall)</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Scope defined upfront · detailed planning before execution · sequential phases · formal change control · early baselines
                </div>
              </div>
              <div className="flex-1 min-h-0 p-3 lg:p-4 flex flex-col gap-2.5">
                <div className="p-2.5 rounded-lg bg-[#39B54A]/8 border border-[#39B54A]/30">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#39B54A] mb-1">Advantages for blockchain work</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Strong governance and accountability. Well suited to fixed, externally mandated requirements — compliance, procurement,
                    security audits (an audit's scope doesn't change mid-engagement).
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#ef4444]/8 border border-[#ef4444]/30">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#ef4444] mb-1">Limitations for blockchain work</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Poor fit where requirements are genuinely expected to evolve (contract features, UX, governance mechanisms).
                    Can create false confidence that irreversible deployment risk has been "planned away."
                  </p>
                </div>
              </div>
            </div>

            {/* Adaptive */}
            <div className="flex flex-col rounded-xl border-2 border-[#39B54A]/40 bg-card overflow-hidden">
              <div className="p-3 lg:p-4 bg-[#39B54A]/10 shrink-0">
                <div className="font-bold text-[#39B54A]">Adaptive (Agile)</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Builds on Lean thinking — maximize value, eliminate waste, continuous learning. Cycle: Plan → Build → Review → Adapt → Repeat.
                  Agile doesn't eliminate planning — it plans continuously as learning occurs.
                </div>
              </div>
              <div className="flex-1 min-h-0 p-3 lg:p-4 flex flex-col gap-2.5">
                <div className="p-2.5 rounded-lg bg-[#39B54A]/8 border border-[#39B54A]/30">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#39B54A] mb-1">Advantages for blockchain work</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Well suited to product-development activities with real uncertainty. Supports iterative testnet deployment and
                    continuous stakeholder feedback.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#ef4444]/8 border border-[#ef4444]/30">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#ef4444] mb-1">Limitations for blockchain work</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Weaker fit for fixed, regulatory-driven, or externally audited work requiring formal baselines and sign-offs.
                    Poorly suited to work where a mistake is irreversible once shipped — mainnet deployment is not an "iterate and learn" moment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 mt-3 flex flex-col gap-3">
            <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-r from-[#f97316]/15 to-[#eab308]/15 border-2 border-[#f97316]/40">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#f97316]">Key conclusion — the central principle of this course</span>
              <p className="text-sm text-foreground font-semibold mt-1">
                Do not choose Agile <span className="italic">or</span> Waterfall for the whole blockchain project. Tailor the approach per
                work package — a dedicated decision framework for this choice is introduced in Section 2.
              </p>
            </div>
            <MicroVaultCallout>
              MicroVault's audit and compliance review have fixed, well-understood requirements — a strong predictive fit. Its smart
              contract features and UX involve real uncertainty about what users need — a strong adaptive fit. We make this decision
              formally, per work package, in Section 2.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 1.5 (CONT.) DIMENSION BY DIMENSION ═══════ */}
        <div className="h-full flex flex-col">
          <div className="flex-1 min-h-0">
          <ComparisonSlide
            title="Agile vs. Waterfall for Blockchain — Dimension by Dimension"
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
          <div className="shrink-0 px-5 lg:px-8 pb-4 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3">
            <div className="p-3 rounded-xl bg-[#39B54A]/8 border border-[#39B54A]/30">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#39B54A] mb-1.5">Agile Manifesto values (context, not a deep dive)</div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                <span>Individuals &amp; interactions <span className="text-muted-foreground/50">over</span> processes &amp; tools</span>
                <span>Working solutions <span className="text-muted-foreground/50">over</span> comprehensive documentation</span>
                <span>Customer collaboration <span className="text-muted-foreground/50">over</span> contract negotiation</span>
                <span>Responding to change <span className="text-muted-foreground/50">over</span> following a plan</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#6366f1]/8 border border-[#6366f1]/30 text-[11px] text-muted-foreground leading-relaxed flex items-center">
              <span><span className="font-bold text-[#6366f1]">Note:</span> regardless of approach, the risk register itself should be reviewed periodically and updated with new responses throughout the project (Section 3).</span>
            </div>
          </div>
        </div>

        {/* ═══════ 1.6 IMPACT ON SCOPE, TIMELINES, AND RESOURCES ═══════ */}
        <div id="s1-impact" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 01 · Slide 1.6</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Blockchain's Impact on Scope, Timelines &amp; Resources</h2>
            <p className="text-sm text-muted-foreground">
              Each blockchain characteristic has a specific, traceable effect on a specific constraint — naming that link is what makes it plannable, not a vague warning.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Characteristic → impact table */}
            <div className="rounded-xl border border-border overflow-hidden flex flex-col min-h-0">
              <div className="grid grid-cols-2 text-xs font-bold bg-muted text-foreground shrink-0">
                <div className="p-2.5">Blockchain characteristic</div>
                <div className="p-2.5">Direct project impact</div>
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                {[
                  { c: 'Decentralization', i: 'Increased coordination and governance complexity' },
                  { c: 'Immutability', i: 'Higher quality and testing requirements' },
                  { c: 'Regulatory uncertainty', i: 'Scope and timeline changes' },
                  { c: 'Smart contracts', i: 'Specialized resources and mandatory audits' },
                  { c: 'Transparency', i: 'Increased stakeholder scrutiny' },
                  { c: 'Ecosystem evolution', i: 'Changing requirements and priorities' },
                ].map(r => (
                  <div key={r.c} className="grid grid-cols-2 text-xs border-t border-border">
                    <div className="p-2.5 font-semibold text-foreground bg-muted/40">{r.c}</div>
                    <div className="p-2.5 text-muted-foreground">{r.i}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraint-level effects */}
            <div className="flex flex-col gap-2 min-h-0">
              {[
                { k: 'Scope', v: 'May expand or shift due to governance, compliance, or ecosystem requirements — decide the on-chain/off-chain boundary deliberately and early (Section 2).', color: '#f97316' },
                { k: 'Timelines', v: 'Often extended by audits, testing, and regulatory review — plan for this rather than treating it as a delay.', color: '#eab308' },
                { k: 'Costs', v: 'Increase due to specialized expertise (Solidity developers, security auditors) and security requirements.', color: '#39B54A' },
                { k: 'Quality', v: 'Expectations are higher because trust and irreversibility raise the cost of any defect.', color: '#6366f1' },
                { k: 'Risk', v: 'Amplified by technological and regulatory uncertainty — developed fully in Section 3.', color: '#ef4444' },
              ].map(r => (
                <div key={r.k} className="flex gap-3 p-2.5 bg-card rounded-lg border border-border items-start" style={{ borderLeftWidth: 3, borderLeftColor: r.color }}>
                  <span className="font-bold text-xs shrink-0 w-16" style={{ color: r.color }}>{r.k}</span>
                  <span className="text-xs text-muted-foreground leading-relaxed">{r.v}</span>
                </div>
              ))}
              <div className="p-3 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-[#8b5cf6]">Modern PMI framing:</span> success is measured by the{' '}
                <span className="font-semibold text-foreground">value delivered</span>, not solely by adherence to scope, schedule, and cost —
                hitting a deadline by skipping an audit is not success.
              </div>
            </div>
          </div>

          <MicroVaultCallout className="shrink-0 mt-3">
            MicroVault could hit its 6-month deadline by skipping the audit — but that would violate the value the project exists to
            create and directly contradicts the SMART objective, which requires the audit. We treat audit time as a planned cost of
            quality, not a schedule risk to be minimized away.
          </MicroVaultCallout>
        </div>

        {/* ═══════ 1.7 STAKEHOLDER MANAGEMENT ═══════ */}
        <div id="s1-stakeholders" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 01 · Slide 1.7</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Stakeholder Management in Blockchain Initiatives</h2>
            <p className="text-sm text-muted-foreground">
              A wider and more complex stakeholder universe than most traditional IT projects. Mapping by power/interest is not optional —
              it directly shapes every subsequent scope, governance, and communication decision.
            </p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 lg:gap-5">
            <div className="col-span-2 flex flex-col gap-3 min-h-0">
              <div className="flex-1 min-h-0 grid grid-cols-2 gap-3">
                {[
                  { group: 'Internal Stakeholders', color: '#f97316', items: ['Sponsors & founders', 'Product owners', 'Developers', 'Legal & compliance'] },
                  { group: 'External Partners', color: '#eab308', items: ['External auditors', 'Vendors & infrastructure providers', 'Investors', 'Consortium members (if applicable)'] },
                  { group: 'Users & Community', color: '#39B54A', items: ['Users / depositors', 'Token holders', 'DAO participants', 'Open-source communities'] },
                  { group: 'Regulatory & Legal', color: '#ef4444', items: ['Financial regulators (SEC, MAS, etc.)', 'Data protection authorities (GDPR)', 'Industry standards bodies'] },
                ].map(g => (
                  <div key={g.group} className="p-3 lg:p-4 bg-card border rounded-xl" style={{ borderColor: g.color + '40' }}>
                    <div className="font-bold text-sm mb-2" style={{ color: g.color }}>{g.group}</div>
                    <ul className="space-y-1">
                      {g.items.map(i => <li key={i} className="text-xs text-muted-foreground flex gap-1.5"><span style={{ color: g.color }}>•</span>{i}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="shrink-0 p-3 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/30 text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-[#6366f1]">Where governance fits:</span> stakeholder mapping surfaces a governance question
                that must be answered <span className="font-semibold text-foreground">before scope is finalized</span> (Section 2) — who has decision
                authority over what, and is that authority exercised on-chain or off-chain?
              </div>
            </div>
            <div className="flex flex-col gap-3 min-h-0">
              <div className="font-bold text-sm text-foreground shrink-0">Power / Interest Grid</div>
              <div className="flex-1 relative border border-border rounded-xl bg-card overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="border-r border-b border-border p-3">
                    <div className="text-[10px] font-bold text-muted-foreground mb-1">LOW POWER / HIGH INTEREST</div>
                    <div className="text-xs text-muted-foreground">Keep informed — early depositors, community members</div>
                  </div>
                  <div className="border-b border-border p-3 bg-[#f97316]/5">
                    <div className="text-[10px] font-bold text-[#f97316] mb-1">HIGH POWER / HIGH INTEREST</div>
                    <div className="text-xs text-muted-foreground">Manage closely — founders, regulators, the audit firm around the audit gate</div>
                  </div>
                  <div className="border-r border-border p-3">
                    <div className="text-[10px] font-bold text-muted-foreground mb-1">LOW POWER / LOW INTEREST</div>
                    <div className="text-xs text-muted-foreground">Monitor — infrastructure providers, future token holders (anticipate them)</div>
                  </div>
                  <div className="bg-[#eab308]/5 p-3">
                    <div className="text-[10px] font-bold text-[#eab308] mb-1">HIGH POWER / LOW INTEREST</div>
                    <div className="text-xs text-muted-foreground">Keep satisfied — legal team, security officers</div>
                  </div>
                </div>
                <div className="absolute bottom-1 right-2 text-[10px] text-muted-foreground">→ Interest</div>
                <div className="absolute top-2 left-1 text-[10px] text-muted-foreground" style={{ writingMode: 'vertical-rl' }}>↑ Power</div>
              </div>
              <MicroVaultCallout className="shrink-0">
                Founders: high power, high interest. Audit firm: moderate power, high interest around the audit gate. Early depositors:
                low power, high interest. Future token holders: don't exist yet — but governance design must anticipate them. We map
                these now and use the map directly for scope (Section 2) and the communication plan (Section 4).
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ DEEP DIVE: KEY ROLES ═══════ */}
        <div id="s1-roles" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 01</span>
              <DeepDiveBadge />
            </div>
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

        {/* ═══════ QUIZ — one slide, stepped question by question ═══════ */}
        <div id="s1-quiz" className="h-full">
          <GroupedQuiz questions={quizQuestions} compact />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s1-takeaways" className="h-full">
          <TakeawaySlide
            title="Key Takeaways — Section 01"
            takeaways={[
              'Blockchain characteristics — immutability, decentralization, tokenization, distributed governance — each have specific, traceable effects on complexity, security, and planning.',
              'Every blockchain initiative has both a project dimension (temporary, bounded — what this course teaches) and a product dimension (the platform, evolving indefinitely). Confusing the two is the most common conceptual error.',
              'Traditional PM methodology applies directly — blockchain adds a domain-specific delivery checklist (Discovery → Architecture → Build & Audit → Deploy) and a sharp project/product boundary, not a new methodology.',
              'Do not choose Agile or Waterfall for the whole project. Tailor the approach per work package — predictive for fixed, audited work; adaptive for evolving product work.',
              'Map stakeholders by power and interest early — the map feeds scope definition (Section 2) and the communication plan (Section 4), not just reporting.',
            ]}
          />
        </div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
