import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { DiscussionSlide } from '../../components/templates/DiscussionSlide';
import { GroupedQuiz } from '../../components/templates/GroupedQuiz';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { MicroVaultCallout } from '../../components/shared/MicroVaultCallout';
import { Milestone, ArrowRight } from 'lucide-react';

const chapters = [
  { id: 's6-g1',         label: '6.1 Governance & Quality', kind: 'group' as const },
  { id: 's6-quality',    label: 'Quality Management' },
  { id: 's6-gate',       label: 'Irreversible-Commitment Gate' },
  { id: 's6-gates',      label: 'Quality Gates Checklist' },
  { id: 's6-g2',         label: '6.2 Monitoring & Evaluation', kind: 'group' as const },
  { id: 's6-monitoring', label: 'Monitoring Performance' },
  { id: 's6-value',      label: 'Confirming Value' },
  { id: 's6-g3',         label: '6.3 – 6.4 Change & Closure', kind: 'group' as const },
  { id: 's6-change',     label: 'Change Management' },
  { id: 's6-closure',    label: 'Project Closure' },
  { id: 's6-transition', label: 'Transition to Operations' },
  { id: 's6-extras',     label: 'Wrap-Up', kind: 'group' as const },
  { id: 's6-discussion', label: 'Discussion' },
  { id: 's6-quiz',       label: 'Quiz' },
  { id: 's6-takeaways',  label: 'Takeaways' },
];

// The section quiz, in order. GroupedQuiz shows it on one slide, one question at a time.
const quizQuestions = [
  {
    question: "(1/3) A team is one week from its scheduled mainnet date. The audit is complete, but two high-severity findings are 'noted, fix planned post-launch.' The sponsor pushes to launch on schedule. What does the irreversible-commitment gate require?",
    options: [
      { text: 'Launch on schedule — the audit itself is complete, which is what the gate requires.', correct: false },
      { text: 'No-go — the gate requires quality-control activities complete AND findings resolved. Unresolved high-severity findings mean the criteria are not met, regardless of schedule pressure.', correct: true },
      { text: 'Launch, but publish the findings transparently so users can decide their own risk.', correct: false },
      { text: 'Escalate to a community vote — decentralized projects should let token holders decide.', correct: false },
    ],
    explanation: "The gate consumes evidence, not effort: 'audit performed' is not the criterion — 'findings resolved' is. Quality control (6.1.1) includes confirming every critical/high finding is actually fixed, not just noted. Crossing an irreversible commitment point with known high-severity defects converts a schedule problem into a potentially unrecoverable product problem — the exact asymmetry the cost-of-quality principle describes.",
  },
  {
    question: "(2/3) Contracts have been submitted for audit. A stakeholder proposes a change that touches one of the audited contracts. Under a blockchain change-control process, what makes this different from a routine scope change?",
    options: [
      { text: 'Nothing — all scope changes follow the same log-assess-approve path.', correct: false },
      { text: 'It cannot be considered at all until after launch — audit scope is frozen permanently.', correct: false },
      { text: 'It triggers a heavier approval bar with explicit sponsor sign-off, because it may invalidate the audit and force a costly re-audit with schedule consequences.', correct: true },
      { text: 'It skips the process — technical changes are the developers\' decision, not a governance matter.', correct: false },
    ],
    explanation: "The change process still applies (log → assess → approve/reject → reflect → communicate), but audit-scope-affecting changes get a heavier approval bar: the assessment must include whether the change invalidates work already audited or scheduled for audit. A 'small contract change' can mean re-auditing — direct cost and schedule impact. That's why MicroVault deferred its new collateral type to a post-launch upgrade rather than approving it informally.",
  },
  {
    question: "(3/3) Six months after mainnet launch, MicroVault's protocol is processing growing volumes, governance proposals are active, and an upgrade is being planned. A team member says 'the project clearly isn't finished.' What is the correct framing?",
    options: [
      { text: 'They are right — a blockchain project continues for as long as the protocol operates.', correct: false },
      { text: 'The project closed at handoff. What continues is the product lifecycle — operations, governance, and upgrades — a different discipline with different owners, even if the same people.', correct: true },
      { text: 'The project should be formally re-opened each time a protocol upgrade is planned.', correct: false },
      { text: 'Neither — once the DAO launches, no one is responsible for the protocol.', correct: false },
    ],
    explanation: "This is the project/product distinction the course opened with: the project is temporary and bounded (charter to handoff); the product evolves indefinitely (Concept → Development → Launch → Growth → Maturity → Evolution). Ongoing monitoring, governance, and upgrade planning were never the project's responsibility — they belong to operations and product governance. A future upgrade may well be a new project, with its own objective and closure; the platform's ongoing life is not an unfinished project.",
  },
];

export function PM_Section6() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} accentColor="#f97316" />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 06"
            title="Beyond Planning and Execution"
            subtitle="What most PM courses leave out: quality gates, monitoring and evaluation, change management, and closing a project whose product lives on"
            icon={<Milestone className="size-20 text-[#f97316]" />}
            gradient="from-[#f97316] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ 6.1.1 QUALITY MANAGEMENT PRINCIPLES ═══════ */}
        <div id="s6-quality" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 06 · Slide 6.1.1</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Principles of Quality Management in Blockchain Projects</h2>
            <p className="text-sm text-muted-foreground">
              Most software tolerates "ship and patch." Blockchain generally cannot once mainnet is live — so quality gets its own
              explicit, structured treatment, not a fold-in under testing.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* Three components */}
            <div className="shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
              {[
                { t: 'Quality Planning', c: '#eab308', d: 'Define what "acceptable" looks like before work begins — test coverage thresholds, audit scope, code-review standards.' },
                { t: 'Quality Assurance', c: '#39B54A', d: 'Process-level activities that build confidence the deliverable will meet requirements — code reviews, staged testnet deployments, the external audit itself.' },
                { t: 'Quality Control', c: '#6366f1', d: 'Verify the actual deliverable against requirements — test execution, audit findings review, load testing.' },
              ].map(q => (
                <div key={q.t} className="p-3 lg:p-4 rounded-xl border-2 bg-card" style={{ borderColor: q.c + '50' }}>
                  <div className="font-bold text-sm mb-1" style={{ color: q.c }}>{q.t}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{q.d}</p>
                </div>
              ))}
            </div>

            {/* Applied table */}
            <div className="flex-1 min-h-0 rounded-xl border border-border overflow-auto">
              <div className="grid grid-cols-[1.2fr_0.6fr_1.4fr] text-xs font-bold bg-muted text-foreground sticky top-0">
                <div className="p-2.5">Activity</div>
                <div className="p-2.5">Component</div>
                <div className="p-2.5">Applied to blockchain</div>
              </div>
              {[
                { a: 'Test coverage standards', comp: 'Planning', c: '#eab308', d: 'Minimum coverage % agreed before development starts' },
                { a: 'Code review', comp: 'Assurance', c: '#39B54A', d: 'Peer review of every smart contract change' },
                { a: 'External security audit', comp: 'Assurance', c: '#39B54A', d: 'Independent verification before mainnet is eligible' },
                { a: 'Testnet load testing', comp: 'Control', c: '#6366f1', d: 'Verifying behavior under realistic transaction volume' },
                { a: 'Audit findings resolution', comp: 'Control', c: '#6366f1', d: 'Confirming every critical/high finding is actually fixed, not just noted' },
              ].map(r => (
                <div key={r.a} className="grid grid-cols-[1.2fr_0.6fr_1.4fr] text-xs border-t border-border">
                  <div className="p-2.5 font-semibold text-foreground bg-muted/40">{r.a}</div>
                  <div className="p-2.5 font-bold" style={{ color: r.c }}>{r.comp}</div>
                  <div className="p-2.5 text-muted-foreground">{r.d}</div>
                </div>
              ))}
            </div>

            <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="p-3 lg:p-4 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-xs lg:text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold text-[#ef4444]">Cost of Quality — the blockchain asymmetry:</span> a bug caught in code review costs a
                rewrite. The same bug caught after mainnet deployment can cost user funds — and no amount of budget makes an
                already-executed exploit reversible. <span className="font-semibold text-foreground">In immutable systems, quality management is the
                mechanism that makes the irreversibility of deployment survivable.</span>
              </div>
              <MicroVaultCallout>
                MicroVault sets a minimum test coverage threshold before development starts (planning), requires peer review on every
                contract change and undergoes the external audit (assurance), and runs testnet load tests simulating volatile collateral
                prices (control). Quality is three distinct, deliberate activities — not one generic "testing" checkbox.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 6.1.2 THE IRREVERSIBLE-COMMITMENT GATE ═══════ */}
        <div id="s6-gate" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 06 · Slide 6.1.2</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">The Irreversible-Commitment Gate</h2>
            <p className="text-sm text-muted-foreground">
              Not every blockchain initiative has a "deployment" — but every one has a point where it crosses from reversible to
              high-commitment. Quality management's job is to gate that crossing with evidence, not instinct.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Initiative-type table */}
            <div className="rounded-xl border border-border overflow-hidden flex flex-col min-h-0">
              <div className="grid grid-cols-2 text-xs font-bold bg-muted text-foreground shrink-0">
                <div className="p-2.5">Initiative type</div>
                <div className="p-2.5">The commitment point</div>
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                {[
                  { t: 'Protocol / dApp with own smart contracts', p: 'Testnet → mainnet deployment' },
                  { t: 'DAO / governance design engagement', p: 'Governance charter ratified by community or founding members' },
                  { t: 'Enterprise / permissioned-chain integration', p: "Production go-live on the consortium's shared ledger" },
                  { t: 'Supply chain / interoperability project', p: 'Cutover from parallel-run to live vendor-chain dependency' },
                  { t: 'Advisory / strategy engagement', p: 'Formal recommendation delivered and signed off by the sponsor' },
                ].map(r => (
                  <div key={r.t} className="grid grid-cols-2 text-xs border-t border-border">
                    <div className="p-2.5 font-semibold text-foreground bg-muted/40">{r.t}</div>
                    <div className="p-2.5 text-muted-foreground">{r.p}</div>
                  </div>
                ))}
                <div className="p-3 text-xs text-muted-foreground leading-relaxed border-t border-border">
                  A protocol faces <span className="font-semibold text-foreground">technical</span> irreversibility; a ratified DAO charter is a{' '}
                  <span className="font-semibold text-foreground">social</span> one (changing it takes another full governance cycle); a signed-off
                  recommendation is <span className="font-semibold text-foreground">reputational and contractual</span>. Different mechanisms — the same
                  management pattern.
                </div>
              </div>
            </div>

            {/* Go/no-go criteria */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex-1 min-h-0 p-4 bg-card border border-border rounded-xl flex flex-col">
                <div className="font-bold text-sm text-foreground mb-2 shrink-0">Go / No-Go criteria — generic pattern, instantiated per initiative type:</div>
                <div className="flex-1 min-h-0 space-y-2 overflow-auto">
                  {[
                    'Relevant quality-control activities complete, findings resolved',
                    'Behavior validated under realistic conditions — technical testing, pilot run, or scenario walkthrough',
                    'Communication / incident protocol agreed and rehearsed',
                    'Authority to approve the crossing confirmed and documented — who can say "go," who is accountable if it\'s wrong',
                    'A rollback or mitigation path considered, even where a true rollback isn\'t possible',
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/40 border border-border">
                      <span className="size-5 shrink-0 rounded-full bg-[#f97316] text-white text-[10px] font-black flex items-center justify-center mt-0.5">{i + 1}</span>
                      <span className="text-xs text-muted-foreground leading-relaxed">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 p-3 rounded-xl bg-gradient-to-r from-[#f97316]/15 to-[#8b5cf6]/15 border-2 border-[#f97316]/40 text-xs lg:text-sm text-foreground font-semibold">
                The mechanics change by initiative type — a multi-sig transaction, a governance vote, a signed contract. What doesn't
                change: quality management supplies the evidence, and a named authority makes a formal, criteria-based decision to
                commit — never an informal "we think we're ready."
              </div>
              <MicroVaultCallout className="shrink-0">
                MicroVault's gate is the technical one — testnet to mainnet. Checklist: audit sign-off; deposit, withdraw, and borrow
                flows verified on testnet; incident protocol rehearsed once; multi-sig admin control confirmed among the founders.
                We proceed to mainnet only once every item is checked.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 6.1.3 QUALITY GATES CONSOLIDATION ═══════ */}
        <div id="s6-gates" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 06 · Slide 6.1.3</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Quality Gates: Consolidating What Came Before</h2>
            <p className="text-sm text-muted-foreground">
              Deliberately a consolidation, not new content — confirm every gate taught across the course is closed before monitoring,
              evaluation, and closure begin.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3 content-start">
              {[
                { gate: 'Security audit passed', from: 'Sections 1 & 2 — the mandatory phase gate on the critical path', icon: '🔐' },
                { gate: 'Risk register reviewed — closed out or explicitly transferred to post-launch operations', from: 'Section 3 — continuous risk management', icon: '📋' },
                { gate: 'Incident communication protocol rehearsed', from: 'Section 4 — agreed and rehearsed before launch, never improvised', icon: '📣' },
                { gate: 'Irreversible-commitment gate criteria met', from: 'Slide 6.1.2 — as applicable to this initiative type', icon: '🚦' },
                { gate: 'Governance model confirmed and documented as it will operate post-launch', from: 'Sections 1 & 2 — who decides what, on-chain or off-chain', icon: '🗳️' },
              ].map(g => (
                <div key={g.gate} className="flex items-start gap-3 p-4 rounded-xl bg-card border-l-4 border-[#39B54A] border border-border">
                  <span className="text-xl shrink-0">{g.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-foreground leading-snug">{g.gate}</div>
                    <div className="text-xs text-muted-foreground mt-1">{g.from}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center p-4 rounded-xl bg-[#ef4444]/8 border border-[#ef4444]/30">
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                  <span className="font-bold text-[#ef4444]">Why one place?</span> It prevents a common failure mode: a team declares the
                  project "done" while one or two gates are still quietly open.
                </p>
              </div>
            </div>
            <MicroVaultCallout className="shrink-0">
              MicroVault confirms all gates are closed before moving into monitoring and evaluation.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 6.2.1 MONITORING PROJECT PERFORMANCE ═══════ */}
        <div id="s6-monitoring" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 06 · Slide 6.2.1</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Monitoring Project Performance</h2>
            <p className="text-sm text-muted-foreground">
              Because the most visible milestone is "did we launch," teams under-monitor everything upstream of it — until a problem is
              already a crisis. Make the indicators explicit.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* Monitoring vs evaluation */}
            <div className="shrink-0 grid grid-cols-2 gap-3">
              <div className="p-3 lg:p-4 rounded-xl bg-[#22d3ee]/8 border border-[#22d3ee]/30">
                <div className="font-bold text-sm text-[#22d3ee] mb-1">Monitoring</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ongoing tracking of progress <span className="font-semibold text-foreground">during</span> the project — on schedule, on budget,
                  within the risk tolerance we set?
                </p>
              </div>
              <div className="p-3 lg:p-4 rounded-xl bg-[#8b5cf6]/8 border border-[#8b5cf6]/30">
                <div className="font-bold text-sm text-[#8b5cf6]">Evaluation</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A deliberate assessment, typically at or after a milestone, of whether the project <span className="font-semibold text-foreground">actually
                  achieved</span> what it set out to achieve (next slide).
                </p>
              </div>
            </div>

            {/* What to monitor table */}
            <div className="flex-1 min-h-0 rounded-xl border border-border overflow-auto">
              <div className="grid grid-cols-2 text-xs font-bold bg-muted text-foreground sticky top-0">
                <div className="p-2.5">What to monitor in a blockchain project</div>
                <div className="p-2.5">What it tells you</div>
              </div>
              {[
                { w: 'Audit progress / findings resolved', t: 'Whether the critical-path gate is on track' },
                { w: 'Testnet stability / uptime', t: 'Whether the solution behaves as specified before irreversible deployment' },
                { w: 'Burn rate against runway', t: 'Whether the project can still reach launch within its funding window' },
                { w: 'Risk register status', t: 'Whether identified risks are actively managed, not just logged' },
                { w: 'Backlog velocity (adaptive work packages)', t: 'Whether iterative work is converging toward the MVP scope, not expanding past it' },
              ].map(r => (
                <div key={r.w} className="grid grid-cols-2 text-xs border-t border-border">
                  <div className="p-2.5 font-semibold text-foreground bg-muted/40">{r.w}</div>
                  <div className="p-2.5 text-muted-foreground">{r.t}</div>
                </div>
              ))}
            </div>

            <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#39B54A]/8 border border-[#39B54A]/30 text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-[#39B54A]">Key principle:</span> build monitoring into the communication cadence already
                established in Section 4 — status reporting, sprint reviews, risk reviews — not a separate reporting exercise.
              </div>
              <MicroVaultCallout>
                MicroVault tracks audit findings weekly, testnet transaction success before each sprint review, and burn rate monthly
                against its six-month runway. When burn-rate tracking shows the team two weeks ahead mid-project, that signal — not just
                the eventual audit pass — confirms the project is on track.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 6.2.2 CONFIRMING VALUE ═══════ */}
        <div id="s6-value" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 06 · Slide 6.2.2</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Confirming Value &amp; Benefits Delivered</h2>
            <p className="text-sm text-muted-foreground">
              Now that the project has closed — did it actually deliver the value the business case promised?
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-4">
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
              {[
                { q: 'Was the SMART objective met, on the terms defined at initiation?', icon: '🎯', c: '#f97316' },
                { q: 'What early signal exists that the value hypothesis is holding — are deposits and borrowing occurring as expected?', icon: '📈', c: '#39B54A' },
                { q: 'What should the next initiative or the product roadmap do differently, based on this evidence?', icon: '🧭', c: '#6366f1' },
              ].map(c => (
                <div key={c.q} className="rounded-xl border-2 bg-card p-4 lg:p-5 flex flex-col gap-3" style={{ borderColor: c.c + '50' }}>
                  <span className="text-3xl">{c.icon}</span>
                  <p className="text-sm text-foreground font-semibold leading-relaxed flex-1">{c.q}</p>
                </div>
              ))}
            </div>

            <div className="shrink-0 p-3 lg:p-4 rounded-xl bg-gradient-to-r from-[#22d3ee]/15 to-[#8b5cf6]/15 border-2 border-[#8b5cf6]/40 text-sm text-foreground font-semibold">
              Monitoring told you whether you were on track. Evaluation tells you whether being "on track" actually mattered.
              Current PMI guidance emphasizes value delivery over scope/schedule/cost adherence alone — "we shipped it" is not
              equivalent to "it worked." At MicroVault's scale this is lightweight, but someone must deliberately ask the question.
            </div>

            <MicroVaultCallout className="shrink-0">
              Two weeks post-launch, MicroVault confirms deposits and borrowing are occurring as projected with no critical incidents.
              We document this as evidence the value hypothesis is holding — feeding directly into the product roadmap discussion.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 6.3.1 CHANGE MANAGEMENT ═══════ */}
        <div id="s6-change" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 06 · Slide 6.3.1</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Managing Change Through a Formal Process</h2>
            <p className="text-sm text-muted-foreground">
              Even a lightweight process beats no process. Without one, "can we just quickly add X" happens invisibly — and the team
              discovers the consequence (a delayed audit, an unbudgeted re-review) after the fact.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* Process steps */}
            <div className="flex-1 min-h-0 flex flex-col gap-2 justify-center">
              {[
                { s: 'Change is proposed — by anyone — and logged, however informally.', icon: '💡', c: '#eab308' },
                { s: 'The PM assesses impact on scope, schedule, cost, risk — and, for blockchain work specifically, on the on-chain/off-chain boundary and audit scope.', icon: '🔍', c: '#f97316' },
                { s: 'If the change affects anything already audited or scheduled for audit, it is routed for explicit founder/sponsor approval before development starts.', icon: '🚦', c: '#ef4444' },
                { s: 'Approved changes are reflected in the WBS/backlog and communicated to affected stakeholders.', icon: '✅', c: '#39B54A' },
                { s: "Rejected changes are logged with a reason — so the same request doesn't resurface undocumented.", icon: '🗂️', c: '#6366f1' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border" style={{ borderLeftWidth: 4, borderLeftColor: step.c }}>
                  <span className="size-7 shrink-0 rounded-full text-white text-xs font-black flex items-center justify-center" style={{ backgroundColor: step.c }}>{i + 1}</span>
                  <span className="text-lg shrink-0">{step.icon}</span>
                  <span className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{step.s}</span>
                </div>
              ))}
            </div>

            <div className="shrink-0 p-3 lg:p-4 rounded-xl bg-[#ef4444]/10 border-2 border-[#ef4444]/40 text-xs lg:text-sm text-foreground font-semibold">
              Blockchain-specific principle: any change touching code already submitted for audit — or scheduled for audit — triggers a
              heavier approval bar than a routine scope change. It may require re-auditing, with direct schedule and cost consequences.
            </div>

            <MicroVaultCallout className="shrink-0">
              A founder proposes adding a new collateral type after contracts are submitted for audit. The change process flags it
              immediately as audit-scope-affecting, requiring explicit sign-off because it may trigger a costly re-audit. We defer it to
              a post-launch upgrade rather than approving it informally.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 6.4.1 PROJECT CLOSURE ═══════ */}
        <div id="s6-closure" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 06 · Slide 6.4.1</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Project Closure</h2>
            <p className="text-sm text-muted-foreground">
              Closing is a deliberate act — not something that happens by default when everyone gets busy with the next thing.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3 content-start">
              {[
                { a: 'Formal confirmation that the project objective has been met', icon: '🎯' },
                { a: 'Final documentation package: architecture docs, audit report, on-chain registry, governance charter drafted for post-launch', icon: '📦' },
                { a: "Lessons learned captured while memory is fresh — what worked, what didn't, what would be done differently", icon: '📝' },
                { a: 'Formal release of the team from project-mode responsibilities — even if the same people continue into operations, as is common in small teams', icon: '🤝' },
                { a: 'Administrative and financial closure — final invoices, contractor sign-offs (e.g., with the audit firm)', icon: '🧾' },
              ].map(c => (
                <div key={c.a} className="flex items-start gap-3 p-3 lg:p-4 rounded-xl bg-card border border-border">
                  <span className="text-xl shrink-0">{c.icon}</span>
                  <span className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{c.a}</span>
                </div>
              ))}
              <div className="flex items-center p-3 lg:p-4 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30">
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                  <span className="font-bold text-[#8b5cf6]">The blockchain failure mode this prevents:</span> because the product keeps evolving
                  after mainnet, teams that don't close deliberately never quite finish "the project" — governance, documentation, and
                  accountability blur into open-ended, undocumented drift.
                </p>
              </div>
            </div>

            <div className="shrink-0 p-3 lg:p-4 rounded-xl bg-gradient-to-r from-[#f97316]/15 to-[#8b5cf6]/15 border-2 border-[#f97316]/40 text-sm text-foreground font-semibold">
              Closure must explicitly separate "the project is done" from "the product is done" — the latter is not true, and should not be implied.
            </div>

            <MicroVaultCallout className="shrink-0">
              MicroVault's closure package: the final audit report, the on-chain contract registry, a lessons-learned note flagging the
              single-developer key-person risk for the next initiative, and formal founder sign-off that the charter's objective has
              been met. A real milestone — not a formality.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 6.4.2 TRANSITION TO OPERATIONS ═══════ */}
        <div id="s6-transition" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">Section 06 · Slide 6.4.2</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Transition to Operations &amp; the Product Lifecycle</h2>
            <p className="text-sm text-muted-foreground">
              The idea planted in Slide 1.1 pays off here: the project has closed — what continues is a different discipline.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* Handoff table */}
            <div className="flex-1 min-h-0 rounded-xl border border-border overflow-auto">
              <div className="grid grid-cols-3 text-xs font-bold bg-muted text-foreground sticky top-0">
                <div className="p-2.5">What gets handed off</div>
                <div className="p-2.5">From</div>
                <div className="p-2.5">To</div>
              </div>
              {[
                { w: 'Admin / multi-sig keys', f: 'Project team', t: 'Ongoing operations owner(s) — may be the same people, but the role changes' },
                { w: 'Documentation & audit reports', f: 'Project team', t: 'Operations + future auditors' },
                { w: 'Risk register (open items)', f: 'Project risk owner', t: 'Operations risk owner' },
                { w: 'Governance authority', f: 'Founders (off-chain)', t: 'Planned transition to DAO governance, on the agreed timeline' },
                { w: 'Incident communication protocol', f: 'Project team', t: 'Operations team — kept live and re-rehearsed periodically' },
              ].map(r => (
                <div key={r.w} className="grid grid-cols-3 text-xs border-t border-border">
                  <div className="p-2.5 font-semibold text-foreground bg-muted/40">{r.w}</div>
                  <div className="p-2.5 text-muted-foreground">{r.f}</div>
                  <div className="p-2.5 text-muted-foreground">{r.t}</div>
                </div>
              ))}
            </div>

            {/* What begins now */}
            <div className="shrink-0 p-3 lg:p-4 bg-card border border-border rounded-xl">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">
                What begins now — that the project was never responsible for
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['Ongoing protocol monitoring', 'Governance proposals & votes', 'Protocol upgrade planning', 'Ecosystem growth'].map(x => (
                  <span key={x} className="text-xs px-2.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#8b5cf6] font-semibold">{x}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-muted-foreground font-semibold">The product lifecycle:</span>
                {['Concept', 'Development', 'Launch', 'Growth', 'Maturity', 'Evolution / Retirement'].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">{s}</span>
                    {i < arr.length - 1 && <ArrowRight className="size-3 text-muted-foreground/40" />}
                  </span>
                ))}
                <span className="text-xs text-muted-foreground italic">— continuing indefinitely, with no defined end.</span>
              </div>
            </div>

            <MicroVaultCallout className="shrink-0">
              The same small team continues — but now operating the protocol, monitoring on-chain activity, and preparing the governance
              token and DAO launch we deliberately kept out of project scope. The founders now hold "operations" and "product" hats, not
              "project" hats. That closes the course's central narrative: you've managed one blockchain initiative from charter to
              handoff — and you know exactly where the PM's responsibility ends and the platform's ongoing life begins.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ DISCUSSION ═══════ */}
        <div id="s6-discussion" className="h-full">
          <DiscussionSlide
            prompt="MicroVault's audit is underway when a founder proposes adding a new collateral type — 'it's a small contract change, and a big investor is asking for it.' As PM, walk through how the change-control process handles this, and what you recommend."
            guidingQuestions={[
              'Your protocol launched two weeks ago and usage is half of what the business case projected. The project is closed. Whose problem is this now — and what should the closed project have handed over to make answering that easier?',
              'A DAO-design engagement has no "deployment." Where is its irreversible-commitment gate, and what evidence should the go/no-go decision consume?',
            ]}
          />
        </div>

        {/* ═══════ QUIZ — one slide, stepped question by question ═══════ */}
        <div id="s6-quiz" className="h-full">
          <GroupedQuiz questions={quizQuestions} compact />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s6-takeaways" className="h-full">
          <TakeawaySlide
            title="Key Takeaways — Section 06"
            takeaways={[
              'Quality management is three deliberate activities — planning (define "acceptable" upfront), assurance (reviews, staged testnets, the audit), control (verify, resolve findings) — and in immutable systems it is what makes irreversible deployment survivable.',
              'Every blockchain initiative has an irreversible-commitment point — mainnet deployment, a ratified charter, a signed-off recommendation. Gate it with documented criteria and a named authority, never an informal "we think we\'re ready."',
              'Monitor the indicators upstream of launch — audit progress, testnet stability, burn rate, risk register, velocity — at the cadence you already run; then evaluate whether the value hypothesis actually held.',
              'Run even a lightweight formal change process — and hold changes touching audited code to a heavier approval bar, because they can force a re-audit.',
              'Close deliberately: confirm the objective, package documentation and lessons learned, and hand off keys, registers, and protocols. "The project is done" never means "the product is done" — the product lifecycle continues indefinitely.',
            ]}
          />
        </div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
