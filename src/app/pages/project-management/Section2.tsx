import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { DiscussionSlide } from '../../components/templates/DiscussionSlide';
import { GroupedQuiz } from '../../components/templates/GroupedQuiz';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { MicroVaultCallout } from '../../components/shared/MicroVaultCallout';
import { DeepDiveBadge } from '../../components/shared/DeepDiveBadge';
import { Map, ArrowRight, ArrowDown, GitFork } from 'lucide-react';

const chapters = [
  { id: 's2-need',       label: 'Do We Need Blockchain?' },
  { id: 's2-objectives', label: '2.1 Objectives & Scope' },
  { id: 's2-boundary',   label: '2.1 Boundary & Governance' },
  { id: 's2-wbs',        label: '2.2 WBS & Work Packages' },
  { id: 's2-tailoring',  label: '2.3 Tailoring Matrix' },
  { id: 's2-fork',       label: '2.4 WBS / Backlog Fork' },
  { id: 's2-backlog',    label: '2.5 Backlog & User Stories' },
  { id: 's2-estimating', label: '2.6 Estimating' },
  { id: 's2-schedule',   label: '2.7 Timelines & Critical Path' },
  { id: 's2-tools',      label: '2.8 Planning Tools' },
  { id: 's2-ai',         label: '2.9 AI-Enabled Tools' },
  { id: 's2-extras',     label: 'Extras', kind: 'group' as const },
  { id: 's2-milestones', label: 'Deep Dive: Milestones' },
  { id: 's2-discussion', label: 'Discussion' },
  { id: 's2-quiz',       label: 'Quiz' },
  { id: 's2-takeaways',  label: 'Takeaways' },
];

// The section quiz, in order. GroupedQuiz shows it on one slide, one question at a time.
const quizQuestions = [
  {
    question: "(1/3) A government agency wants to store citizen identity records on a public blockchain to 'modernize' their system. Applying the blockchain decision checklist, what is the most likely correct verdict?",
    options: [
      { text: 'Blockchain is appropriate — government data should be public and immutable for maximum transparency.', correct: false },
      { text: 'Blockchain is appropriate — multiple agencies need to read and write the same data.', correct: false },
      { text: 'A traditional database is more appropriate — one trusted party controls all the data, and GDPR requires the right to erasure, which conflicts with immutability.', correct: true },
      { text: 'Blockchain is appropriate — disintermediation of the current system would reduce costs.', correct: false },
    ],
    explanation: "The blockchain decision checklist asks: Is there a trust problem between untrusted parties? Is immutability a core requirement that outweighs privacy concerns? Here, a single trusted authority already exists (the government), and GDPR explicitly requires the right to erasure — which conflicts with blockchain's immutability. A permissioned database with strict access controls is the correct architectural choice.",
  },
  {
    question: "(2/3) You score a work package on the tailoring matrix: requirement stability 1 (fixed, externally mandated), technical novelty 1, regulatory constraint 3, security criticality 3, stakeholder involvement 1, dependencies 2 — total 11. What delivery approach does the matrix recommend?",
    options: [
      { text: 'Adaptive — blockchain projects should always use agile sprints.', correct: false },
      { text: 'Hybrid — the score of 11 falls in the 10–14 band, mixing predictive gates with iterative delivery.', correct: true },
      { text: 'Predictive — any regulatory constraint automatically forces waterfall.', correct: false },
      { text: 'The matrix cannot recommend an approach — that is always a judgment call.', correct: false },
    ],
    explanation: "Total the six criteria: 6–9 → predictive, 10–14 → hybrid, 15–18 → adaptive. A score of 11 lands in the hybrid band — formal baselines and sign-offs where the regulatory and security stakes demand them, iterative delivery where there is room to learn. This is exactly how MicroVault's Security Audit package scores: hybrid, leaning predictive. The point of the matrix is a repeatable, defensible method instead of instinct — applied per work package, never to the whole project.",
  },
  {
    question: "(3/3) A team drafts its WBS, then continues decomposing the 'Smart Contract Features' work package (scored adaptive) into a fixed, exhaustive activity list with dates. What is wrong with this?",
    options: [
      { text: 'Nothing — the WBS should always be decomposed to individual activities for every work package.', correct: false },
      { text: 'The WBS decomposition should stop at the work-package boundary for adaptive work — a product backlog takes over below it, because the requirements are still being learned.', correct: true },
      { text: 'The mistake is using a WBS at all — agile projects should skip the WBS and go straight to a backlog.', correct: false },
      { text: 'The activity list is fine, but it should be written as user stories instead of activities.', correct: false },
    ],
    explanation: "This is the WBS/backlog fork: WBS and backlog are parallel tools for different kinds of work, not sequential stages of one decomposition. Predictive work packages decompose into scheduled activities; adaptive work packages hand off to a living, prioritized, intentionally incomplete backlog. Forcing a fixed activity list onto uncertain work defeats the purpose of scoring it adaptive in the first place — it recreates a WBS's stability expectations where they can't hold.",
  },
];

export function PM_Section2() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} accentColor="#eab308" />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 02"
            title="Project Planning & Scoping for Blockchain"
            subtitle="Defining objectives, breaking down work, estimating, and choosing the right tools — including AI"
            icon={<Map className="size-20 text-[#eab308]" />}
            gradient="from-[#eab308] to-[#f97316]"
          />
        </div>

        {/* ═══════ SESSION NOTE: DO WE NEED BLOCKCHAIN ═══════ */}
        <div id="s2-need" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Before Scoping Begins</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Do We Actually Need Blockchain?</h2>
            <p className="text-sm text-muted-foreground">Before any scoping starts, confirm blockchain is actually the right solution. If yes, proceed with the sequence in this section.</p>
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

        {/* ═══════ 2.1a OBJECTIVES & THE SCOPING SEQUENCE ═══════ */}
        <div id="s2-objectives" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.1</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Defining Objectives &amp; Drawing the Scope Boundary</h2>
            <p className="text-sm text-muted-foreground">
              Before planning any activity, resource, or schedule — state the objective clearly and follow the scoping sequence in order.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: objective vs scope + SMART + chain */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-2 text-xs font-bold bg-muted text-foreground">
                  <div className="p-2.5 text-[#eab308]">Objective</div>
                  <div className="p-2.5 text-[#f97316]">Scope</div>
                </div>
                {[
                  { a: 'Why are we doing the project?', b: 'What work is required?' },
                  { a: 'Defines the desired outcome', b: 'Defines deliverables and boundaries' },
                  { a: 'Focuses on value creation', b: 'Focuses on execution' },
                ].map((r, i) => (
                  <div key={i} className="grid grid-cols-2 text-xs border-t border-border">
                    <div className="p-2.5 text-muted-foreground">{r.a}</div>
                    <div className="p-2.5 text-muted-foreground">{r.b}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-[#39B54A]/8 border border-[#39B54A]/30">
                <span className="font-bold text-[#39B54A] text-sm">Good objectives are SMART:</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['Specific', 'Measurable', 'Achievable', 'Relevant', 'Time-bound'].map(s => (
                    <span key={s} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#39B54A]/15 text-[#39B54A] border border-[#39B54A]/30">{s}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border">
                <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Chain of reasoning</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['Business Need', 'Project Objective', 'Project Scope', 'Deliverables', 'Work'].map((s, i, arr) => (
                    <span key={s} className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-muted text-foreground">{s}</span>
                      {i < arr.length - 1 && <ArrowRight className="size-3 text-muted-foreground/40" />}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#ef4444]/8 border border-[#ef4444]/30">
                  <div className="font-bold text-xs text-[#ef4444] mb-1">⚠️ Scope creep</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">Uncontrolled expansion of scope without adjusting time, cost, or resources.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#ef4444]/8 border border-[#ef4444]/30">
                  <div className="font-bold text-xs text-[#ef4444] mb-1">✨ Gold plating</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">Adding features beyond agreed requirements without approval or demonstrated value. Both are more tempting in blockchain — "we could technically add this on-chain" is a constant possibility.</p>
                </div>
              </div>
            </div>

            {/* Right: the 10-step blockchain scoping sequence */}
            <div className="flex flex-col min-h-0 gap-3">
              <div className="font-bold text-sm text-foreground shrink-0">The blockchain-specific scoping sequence — followed in order:</div>
              <div className="flex-1 min-h-0 grid grid-cols-2 gap-1.5 content-start">
                {[
                  'Business problem',
                  'Desired outcome / value hypothesis',
                  'Project objective (SMART)',
                  'Stakeholder map (from Section 1)',
                  'High-level requirements',
                  'Regulatory & security constraints scan',
                  'On-chain / off-chain boundary decision',
                  'Governance model definition',
                  'Scope statement (in / out / excluded)',
                  'Deliverables',
                ].map((s, i) => (
                  <div key={s} className={`flex items-center gap-2 p-2 rounded-lg border text-xs ${i === 6 || i === 7 ? 'bg-[#eab308]/10 border-[#eab308]/40' : 'bg-card border-border'}`}>
                    <span className={`size-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black text-white ${i === 6 || i === 7 ? 'bg-[#eab308]' : 'bg-muted-foreground/40'}`}>{i + 1}</span>
                    <span className={i === 6 || i === 7 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>{s}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/30 text-xs text-muted-foreground leading-relaxed shrink-0">
                You cannot draw the on-chain/off-chain boundary sensibly without first knowing <span className="font-semibold text-foreground">who cares about it</span> (the
                stakeholder map) and <span className="font-semibold text-foreground">what already constrains it</span> (the regulatory scan). Governance follows the boundary
                immediately — the two are interdependent, not afterthoughts.
              </div>
              <MicroVaultCallout className="shrink-0">
                MicroVault's SMART objective — launch an audited lending protocol in 6 months, supporting deposits, withdrawals, and
                borrowing, passing one audit — anchors every decision that follows. In scope: deposits, withdrawals, over-collateralized
                borrowing, one audit. Out of scope: the governance token and DAO (deferred post-launch).
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 2.1b ON-CHAIN/OFF-CHAIN BOUNDARY + GOVERNANCE ═══════ */}
        <div id="s2-boundary" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.1 (cont.)</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">The On-Chain / Off-Chain Boundary &amp; the Governance Model</h2>
            <p className="text-sm text-muted-foreground">
              The single most consequential blockchain scoping decision. The question is not "<span className="italic">Can</span> we put this on-chain?" —
              it's "<span className="italic">Does this requirement actually benefit from being on-chain?</span>"
            </p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 lg:gap-5">
            <div className="col-span-2 grid grid-cols-2 gap-3">
              <div className="p-4 lg:p-5 bg-[#6366f1]/8 border border-[#6366f1]/30 rounded-xl">
                <div className="font-bold text-[#6366f1] mb-3 flex items-center gap-2"><span className="text-lg">⛓️</span> On-chain candidates</div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Token ownership and asset transfers</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Trustless rules requiring independent verification</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Smart contract logic and state</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Governance voting mechanisms</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span> Event logs for auditability</li>
                </ul>
              </div>
              <div className="p-4 lg:p-5 bg-[#f97316]/8 border border-[#f97316]/30 rounded-xl">
                <div className="font-bold text-[#f97316] mb-3 flex items-center gap-2"><span className="text-lg">🌐</span> Off-chain candidates</div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> User profiles and sensitive personal data</li>
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> High-volume processing</li>
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> Internal workflows</li>
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> Frontend dApp and user interfaces</li>
                  <li className="flex gap-2"><span className="text-[#f97316] shrink-0">•</span> Identity and KYC systems</li>
                </ul>
              </div>
              <div className="col-span-2 p-4 bg-card border border-border rounded-xl">
                <div className="font-bold text-sm text-foreground mb-2">Governance model — minimum questions to answer before scope is finalized:</div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { q: 'Who can approve a pre-launch contract change?', icon: '📝' },
                    { q: 'Who can pause the protocol in an emergency?', icon: '⏸️' },
                    { q: 'What decisions move to on-chain / DAO governance post-launch — and when?', icon: '🗳️' },
                  ].map(g => (
                    <div key={g.q} className="p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground">
                      <span className="text-base mr-1.5">{g.icon}</span>{g.q}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="font-semibold text-foreground">Who can decide what — and is that decision made on-chain</span> (smart contracts / voting){' '}
                  <span className="font-semibold text-foreground">or off-chain</span> (discussion / consensus)?
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="p-4 bg-[#eab308]/10 border border-[#eab308]/40 rounded-xl text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold text-[#eab308]">Why decide early?</span>
                <br /><br />
                The boundary affects requirements, architecture, cost, security, privacy, integrations, testing, governance — and
                ultimately the entire project scope. It must be decided deliberately, not discovered along the way.
              </div>
              <MicroVaultCallout className="flex-1">
                Deposits, withdrawals, and borrowing logic go on-chain — they must be independently verifiable and trustless. KYC
                documentation and support tickets stay off-chain. Pre-launch, governance sits off-chain with the founders (multi-sig);
                post-launch, interest-rate parameters are planned to move to on-chain DAO governance. All of this goes into a formal
                scope statement the founders sign off on.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 2.2 WBS & WORK PACKAGES ═══════ */}
        <div id="s2-wbs" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.2</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Breaking Down Work: WBS &amp; Work Packages</h2>
            <p className="text-sm text-muted-foreground">
              Once scope is defined, it must be translated into manageable pieces of work.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 shrink-0">
              <div className="p-4 bg-card border border-border rounded-xl">
                <div className="font-bold text-sm text-foreground mb-1">Work Breakdown Structure (WBS)</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A hierarchical decomposition of project work into manageable components. The WBS itself is not blockchain-specific —
                  what's blockchain-specific is <span className="font-semibold text-foreground">what goes into it</span> (informed by the on-chain/off-chain
                  decision) and <span className="font-semibold text-foreground">how each resulting work package will be delivered</span> (decided next).
                </p>
              </div>
              <div className="p-4 bg-[#39B54A]/8 border border-[#39B54A]/30 rounded-xl">
                <div className="font-bold text-sm text-[#39B54A] mb-1">🏅 Golden Rule</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Decompose to the lowest level that can be <span className="font-semibold text-foreground">reliably estimated, assigned, and monitored</span> —
                  not indefinitely.
                </p>
                <div className="flex items-center gap-1.5 flex-wrap mt-3">
                  {['Objective', 'Scope', 'Deliverables', 'WBS', 'Work Packages'].map((s, i, arr) => (
                    <span key={s} className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-muted text-foreground">{s}</span>
                      {i < arr.length - 1 && <ArrowRight className="size-3 text-muted-foreground/40" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* MicroVault WBS visual */}
            <div className="flex-1 min-h-0 flex flex-col p-4 bg-card border border-border rounded-xl">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-3 shrink-0">MicroVault's WBS — output-related work packages</div>
              <div className="shrink-0 mx-auto px-4 py-2 rounded-lg bg-[#eab308]/15 border border-[#eab308]/40 text-sm font-bold text-[#eab308]">
                MicroVault: audited USDC lending protocol on L2
              </div>
              <div className="shrink-0 flex justify-center py-1"><ArrowDown className="size-4 text-muted-foreground/40" /></div>
              <div className="flex-1 min-h-0 grid grid-cols-5 gap-2 lg:gap-3">
                {[
                  { wp: 'Smart Contracts', icon: '💻', color: '#6366f1' },
                  { wp: 'Security Audit', icon: '🔐', color: '#ef4444' },
                  { wp: 'Compliance / KYC', icon: '⚖️', color: '#8b5cf6' },
                  { wp: 'Infrastructure', icon: '🏗️', color: '#22d3ee' },
                  { wp: 'Frontend / UX', icon: '🎨', color: '#39B54A' },
                ].map(w => (
                  <div key={w.wp} className="rounded-xl border-2 bg-background flex flex-col items-center justify-center gap-2 p-3 text-center" style={{ borderColor: w.color + '50' }}>
                    <span className="text-2xl">{w.icon}</span>
                    <span className="font-bold text-xs lg:text-sm" style={{ color: w.color }}>{w.wp}</span>
                    <span className="text-[10px] text-muted-foreground">estimable · assignable · monitorable</span>
                  </div>
                ))}
              </div>
            </div>

            <MicroVaultCallout className="shrink-0">
              Each work package is estimable and assignable. Next, we decide — per work package — how it will be delivered.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 2.3 TAILORING DECISION MATRIX ═══════ */}
        <div id="s2-tailoring" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.3</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Selecting a Delivery Approach per Work Package</h2>
            <p className="text-sm text-muted-foreground">
              Not all work packages are equal. After creating the WBS, score each one — grounded in PMI's tailoring guidance, not instinct.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* Scoring table */}
            <div className="flex-1 min-h-0 rounded-xl border border-border overflow-auto">
              <div className="grid grid-cols-4 text-[11px] lg:text-xs font-bold bg-muted text-foreground sticky top-0">
                <div className="p-2.5">Criterion (score 1–3)</div>
                <div className="p-2.5 text-[#6366f1]">1 — Low</div>
                <div className="p-2.5 text-[#eab308]">2 — Medium</div>
                <div className="p-2.5 text-[#39B54A]">3 — High</div>
              </div>
              {[
                { c: 'Requirement stability', l: 'Fixed, externally mandated', m: 'Some evolution expected', h: 'Actively expected to change' },
                { c: 'Technical novelty', l: 'Standard, proven pattern', m: 'Some new integration', h: 'Genuinely novel / unproven' },
                { c: 'Regulatory constraint', l: 'None', m: 'Some compliance touchpoints', h: 'Heavily regulated' },
                { c: 'Security criticality', l: 'Low value / exposure at stake', m: 'Moderate', h: 'High value / irreversible if wrong' },
                { c: 'Stakeholder involvement', l: 'Sign-off only', m: 'Periodic review', h: 'Continuous feedback loop' },
                { c: 'Dependencies', l: 'Self-contained', m: 'Some cross-team dependency', h: 'Deeply interdependent' },
              ].map(r => (
                <div key={r.c} className="grid grid-cols-4 text-[11px] lg:text-xs border-t border-border">
                  <div className="p-2.5 font-semibold text-foreground bg-muted/40">{r.c}</div>
                  <div className="p-2.5 text-muted-foreground">{r.l}</div>
                  <div className="p-2.5 text-muted-foreground">{r.m}</div>
                  <div className="p-2.5 text-muted-foreground">{r.h}</div>
                </div>
              ))}
            </div>

            {/* Score bands */}
            <div className="shrink-0 grid grid-cols-3 gap-3">
              {[
                { band: '6 – 9', label: 'Predictive', color: '#6366f1', note: 'Formal baselines, milestone sign-offs' },
                { band: '10 – 14', label: 'Hybrid', color: '#eab308', note: 'Mix predictive gates with iterative delivery' },
                { band: '15 – 18', label: 'Adaptive', color: '#39B54A', note: 'Backlog, sprints, continuous feedback' },
              ].map(b => (
                <div key={b.label} className="p-3 rounded-xl border-2 text-center" style={{ borderColor: b.color + '50', backgroundColor: b.color + '10' }}>
                  <div className="text-lg font-black" style={{ color: b.color }}>{b.band}</div>
                  <div className="font-bold text-sm text-foreground">{b.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{b.note}</div>
                </div>
              ))}
            </div>

            <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-card border border-border text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">A note on the "Stacey Matrix":</span> widely taught in Agile literature for this same
                decision — but the popular version diverges substantially from Ralph Stacey's own work, and Stacey himself argued against its
                popularized use. The intuition (match the approach to how well understood the work is) is sound; this matrix reaches the same
                conclusions grounded in PMI's current, uncontested guidance. <span className="font-semibold text-foreground">Tailoring happens at the
                work-package level, not the project level.</span>
              </div>
              <MicroVaultCallout>
                Security Audit: fixed scope, low novelty, high regulatory relevance, high criticality → hybrid-leaning-predictive.
                Smart Contract Features: evolving requirements, high criticality, continuous stakeholder involvement → adaptive.
                We tag every work package: Compliance &amp; Audit = predictive/hybrid; Smart Contracts &amp; UX = adaptive; Infrastructure = hybrid.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 2.4 THE WBS/BACKLOG FORK ═══════ */}
        <div id="s2-fork" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.4</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">From Work Packages to User Stories: The WBS/Backlog Fork</h2>
            <p className="text-sm text-muted-foreground">
              A common but incorrect model draws WBS → backlog → sprints as one continuous pipeline. It isn't — they are parallel tools for different kinds of work.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* The corrected model diagram */}
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-2 flex-wrap justify-center shrink-0">
                {['Project Objective', 'Scope', 'WBS', 'Work Packages'].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className="text-xs lg:text-sm font-bold px-3 py-1.5 rounded-lg bg-[#eab308]/15 border border-[#eab308]/40 text-[#eab308]">{s}</span>
                    {i < arr.length - 1 && <ArrowRight className="size-4 text-muted-foreground/40" />}
                  </span>
                ))}
              </div>
              <div className="py-2 flex flex-col items-center shrink-0">
                <GitFork className="size-6 text-muted-foreground rotate-180" />
                <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mt-1">The fork — per tailoring decision</span>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:gap-6 w-full max-w-3xl flex-1 min-h-0">
                <div className="rounded-xl border-2 border-[#6366f1]/40 bg-[#6366f1]/8 p-4 flex flex-col">
                  <div className="font-bold text-sm text-[#6366f1] mb-2">Predictive work packages</div>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    Decompose further into activities and schedule; estimate via traditional scheduling tools. The WBS remains the operating
                    artifact, aiming to be exhaustive and stable.
                  </p>
                  <div className="text-[11px] font-semibold text-[#6366f1] mt-2">→ Activities → Schedule → Gantt</div>
                </div>
                <div className="rounded-xl border-2 border-[#39B54A]/40 bg-[#39B54A]/8 p-4 flex flex-col">
                  <div className="font-bold text-sm text-[#39B54A] mb-2">Adaptive work packages</div>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    Do <span className="font-bold text-foreground">NOT</span> decompose further in the WBS. Hand off to product development: a living,
                    prioritized, intentionally <span className="italic">incomplete</span> backlog, owned by a product owner, expected to change as learning occurs.
                  </p>
                  <div className="text-[11px] font-semibold text-[#39B54A] mt-2">→ Backlog → User Stories → Sprints</div>
                </div>
              </div>
            </div>

            <div className="shrink-0 p-3 rounded-xl bg-gradient-to-r from-[#eab308]/15 to-[#f97316]/15 border-2 border-[#eab308]/40 text-sm text-foreground font-semibold">
              Key principle: the WBS decomposition <span className="italic">stops</span> at the work-package boundary. For adaptive packages a{' '}
              <span className="italic">different tool</span> — the backlog — takes over below it. Expecting the backlog to be exhaustive and stable like a
              WBS defeats the purpose of using a backlog for uncertain work.
            </div>
            <MicroVaultCallout className="shrink-0">
              MicroVault's Smart Contract Development package — scored adaptive a moment ago — forks out of the WBS here. We don't
              decompose it into a fixed activity list; we build a product backlog for it instead.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 2.5 BACKLOG & USER STORIES ═══════ */}
        <div id="s2-backlog" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.5</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Building the Backlog &amp; User Stories</h2>
            <p className="text-sm text-muted-foreground">
              For work packages that forked into adaptive delivery, the backlog becomes the operating artifact — refined progressively into user stories, delivered in short cycles.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3 min-h-0">
              <div className="p-4 bg-card border border-border rounded-xl flex-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Product backlog — Smart Contract Development</div>
                <div className="space-y-2">
                  {[
                    { item: 'Deposit USDC', p: 'P1' },
                    { item: 'Withdraw USDC', p: 'P1' },
                    { item: 'Borrow against collateral', p: 'P2' },
                    { item: 'Liquidate under-collateralized position', p: 'P2' },
                  ].map(b => (
                    <div key={b.item} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 border border-border">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#39B54A]/15 text-[#39B54A] border border-[#39B54A]/30">{b.p}</span>
                      <span className="text-sm text-foreground">{b.item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-[#39B54A]/8 border border-[#39B54A]/30 rounded-xl">
                <div className="font-bold text-sm text-[#39B54A] mb-2">User story format</div>
                <p className="text-sm text-foreground font-mono">
                  As a <span className="text-[#eab308]">[user]</span>, I want <span className="text-[#6366f1]">[functionality]</span>, so that <span className="text-[#39B54A]">[benefit]</span>.
                </p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  "As a lender, I want to deposit USDC into MicroVault so that I earn interest on idle stablecoins."
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex-1 min-h-0 p-4 bg-card border border-border rounded-xl flex flex-col">
                <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-3 shrink-0">The agile interaction cycle</div>
                <div className="flex-1 min-h-0 grid grid-cols-2 gap-2 content-center">
                  {[
                    { s: 'Product Backlog', icon: '📋' },
                    { s: 'Sprint Planning', icon: '🗓️' },
                    { s: 'Development Sprint', icon: '💻' },
                    { s: 'Sprint Review', icon: '👀' },
                    { s: 'Retrospective', icon: '🔄' },
                    { s: 'Updated Backlog', icon: '📝' },
                  ].map((c, i) => (
                    <div key={c.s} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40 border border-border">
                      <span className="size-5 rounded-full bg-[#eab308] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-base">{c.icon}</span>
                      <span className="text-xs font-semibold text-foreground">{c.s}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 shrink-0">
                  This is where the product-management tools from Slide 1.2 — MVP, backlog, prioritization, user stories — are put to work directly.
                </p>
              </div>
              <MicroVaultCallout className="shrink-0">
                MicroVault's Smart Contract package is managed as a backlog refined into user stories like the deposit example. We
                prioritize with the founder acting as product owner, and plan the first sprint.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 2.6 ESTIMATING ═══════ */}
        <div id="s2-estimating" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.6</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Estimating Effort, Resources &amp; Timelines</h2>
            <p className="text-sm text-muted-foreground">
              The objective isn't just to estimate activities — it's to determine whether project objectives can realistically be achieved within available constraints.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-4">
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
              {[
                {
                  title: 'Estimate Effort', icon: '⚖️', color: '#eab308',
                  desc: 'How much work is required? Person-hours, person-days — or story points for adaptive work.',
                },
                {
                  title: 'Estimate Duration', icon: '⏱️', color: '#f97316',
                  desc: 'How long will it take? Depends on effort, resources assigned, productivity assumptions, and constraints.',
                },
                {
                  title: 'Assign Resources', icon: '👥', color: '#6366f1',
                  desc: 'Who performs the work — and are the skills available? In blockchain: developers, security specialists, auditors, product owners, legal expertise.',
                },
              ].map(c => (
                <div key={c.title} className="rounded-xl border-2 bg-card p-4 lg:p-5 flex flex-col gap-2" style={{ borderColor: c.color + '50' }}>
                  <span className="text-2xl">{c.icon}</span>
                  <div className="font-bold text-sm lg:text-base" style={{ color: c.color }}>{c.title}</div>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="p-3 lg:p-4 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs lg:text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold text-[#8b5cf6]">The blockchain wrinkle:</span> predictive work packages (audits, compliance) are usually
                estimated in <span className="font-semibold text-foreground">fixed hours/days</span> as external, scoped engagements — while adaptive
                packages (contract features) are estimated in <span className="font-semibold text-foreground">relative terms (story points)</span> because
                requirements are still being learned. Effort, duration, and resources are related but not interchangeable — every estimating
                decision affects scope, time, cost, quality, and risk.
              </div>
              <MicroVaultCallout>
                Smart Contract Development: ~80 hours, 2 developers, ~2 weeks. The audit is estimated separately as a fixed-scope external
                engagement, not internal effort-hours. Each work package is estimated with the method that fits its tailoring decision.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 2.7 TIMELINES & CRITICAL PATH ═══════ */}
        <div id="s2-schedule" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.7</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Building Timelines &amp; Schedules</h2>
            <p className="text-sm text-muted-foreground">Chain: Activities → Dependencies → Timeline → Schedule.</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-4">
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="rounded-xl border-2 border-[#ef4444]/40 bg-[#ef4444]/8 p-4 lg:p-5 flex flex-col gap-2">
                <span className="text-2xl">🛤️</span>
                <div className="font-bold text-sm lg:text-base text-[#ef4444]">Critical Path</div>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed flex-1">
                  The sequence of activities that determines the minimum project duration. A delay on a critical activity delays the whole
                  project. In blockchain initiatives the critical path very often runs <span className="font-semibold text-foreground">through the audit,
                  not feature development</span> — launch cannot proceed without it.
                </p>
              </div>
              <div className="rounded-xl border-2 border-[#22d3ee]/40 bg-[#22d3ee]/8 p-4 lg:p-5 flex flex-col gap-2">
                <span className="text-2xl">⏩</span>
                <div className="font-bold text-sm lg:text-base text-[#22d3ee]">Fast Tracking</div>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed flex-1">
                  Perform activities in parallel. Increases speed — but potentially increases risk and rework.
                </p>
              </div>
              <div className="rounded-xl border-2 border-[#f97316]/40 bg-[#f97316]/8 p-4 lg:p-5 flex flex-col gap-2">
                <span className="text-2xl">💰</span>
                <div className="font-bold text-sm lg:text-base text-[#f97316]">Crashing</div>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed flex-1">
                  Add resources to accelerate activities. Often increases cost.
                </p>
              </div>
            </div>

            {/* Simple critical-path illustration */}
            <div className="shrink-0 p-4 bg-card border border-border rounded-xl">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">MicroVault's critical path runs through the audit</div>
              <div className="flex items-center gap-1.5 lg:gap-2 flex-wrap">
                {[
                  { s: 'Spec freeze', crit: true },
                  { s: 'Contracts built & tested', crit: true },
                  { s: 'Audit', crit: true },
                  { s: 'Findings resolved', crit: true },
                  { s: 'Mainnet launch', crit: true },
                ].map((n, i, arr) => (
                  <span key={n.s} className="flex items-center gap-1.5 lg:gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ef4444]/15 border border-[#ef4444]/40 text-[#ef4444]">{n.s}</span>
                    {i < arr.length - 1 && <ArrowRight className="size-3 text-[#ef4444]/60" />}
                  </span>
                ))}
                <span className="text-xs text-muted-foreground ml-2">‖ in parallel (fast-tracked):</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#39B54A]/15 border border-[#39B54A]/40 text-[#39B54A]">UX work (independent of audit)</span>
              </div>
            </div>

            <MicroVaultCallout className="shrink-0">
              Mainnet cannot launch until the audit passes — adding new contract features that delay the audit delays the entire project.
              We protect the audit date and fast-track independent UX work that doesn't depend on it.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 2.8 TOOLS & FRAMEWORKS ═══════ */}
        <div id="s2-tools" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.8</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Tools &amp; Frameworks for Planning and Tracking</h2>
            <p className="text-sm text-muted-foreground">
              Because blockchain initiatives combine predictable and uncertain work, hybrid toolsets are the norm — not the exception.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Tool categories table */}
            <div className="rounded-xl border border-border overflow-hidden flex flex-col min-h-0">
              <div className="grid grid-cols-2 text-xs font-bold bg-muted text-foreground shrink-0">
                <div className="p-2.5">Need</div>
                <div className="p-2.5">Tools</div>
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                {[
                  { n: 'Work decomposition', t: 'WBS, mind maps' },
                  { n: 'Schedule planning', t: 'Gantt charts, network diagrams' },
                  { n: 'Agile planning', t: 'Product backlogs, sprint boards' },
                  { n: 'Work visualization', t: 'Kanban boards' },
                  { n: 'Progress tracking', t: 'Dashboards, burndown charts' },
                ].map(r => (
                  <div key={r.n} className="grid grid-cols-2 text-xs border-t border-border">
                    <div className="p-2.5 font-semibold text-foreground bg-muted/40">{r.n}</div>
                    <div className="p-2.5 text-muted-foreground">{r.t}</div>
                  </div>
                ))}
                <div className="p-3 text-xs text-muted-foreground border-t border-border leading-relaxed">
                  <span className="font-semibold text-foreground">Select tools based on:</span> project complexity, delivery approach, team size,
                  stakeholder needs, reporting requirements — <span className="italic">not popularity</span>.
                </div>
              </div>
            </div>

            {/* Hybrid setup diagram */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="flex-1 min-h-0 p-4 bg-card border border-border rounded-xl flex flex-col items-center justify-center gap-2">
                <span className="text-sm font-bold px-3 py-1.5 rounded-lg bg-[#eab308]/15 border border-[#eab308]/40 text-[#eab308]">Project Scope</span>
                <ArrowDown className="size-4 text-muted-foreground/40" />
                <span className="text-sm font-bold px-3 py-1.5 rounded-lg bg-[#f97316]/15 border border-[#f97316]/40 text-[#f97316]">WBS</span>
                <ArrowDown className="size-4 text-muted-foreground/40" />
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  <div className="rounded-xl border-2 border-[#6366f1]/40 bg-[#6366f1]/8 p-3 text-center">
                    <div className="font-bold text-xs text-[#6366f1] mb-1.5">Predictive</div>
                    <div className="text-xs text-muted-foreground">Gantt<br />Milestones</div>
                  </div>
                  <div className="rounded-xl border-2 border-[#39B54A]/40 bg-[#39B54A]/8 p-3 text-center">
                    <div className="font-bold text-xs text-[#39B54A] mb-1.5">Agile</div>
                    <div className="text-xs text-muted-foreground">Backlog<br />Sprint board</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1 max-w-sm">
                  The goal isn't loyalty to a tool — it's visibility and informed decision-making across both kinds of work at once.
                </p>
              </div>
              <MicroVaultCallout className="shrink-0">
                MicroVault uses a Gantt chart for audit and compliance milestones and an agile board for contract and UX work — a hybrid
                toolset matching its hybrid delivery, set up to reflect the tailoring decisions we just made.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ 2.9 AI-ENABLED TOOLS ═══════ */}
        <div id="s2-ai" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02 · Slide 2.9</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">AI-Enabled Tools for Planning &amp; Tracking</h2>
            <p className="text-sm text-muted-foreground">
              AI support across the full planning lifecycle — not an afterthought. Particularly valuable for small teams without dedicated PMO support.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* AI across the planning lifecycle */}
            <div className="rounded-xl border border-border overflow-hidden flex flex-col min-h-0">
              <div className="grid grid-cols-[1fr_1.4fr] text-xs font-bold bg-muted text-foreground shrink-0">
                <div className="p-2">Planning activity</div>
                <div className="p-2">AI use, examples</div>
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                {[
                  { a: 'Objective & scope definition', u: 'Drafting scope statements; sanity-checking on-chain/off-chain trade-offs (ChatGPT, Copilot)' },
                  { a: 'WBS generation', u: 'First-pass WBS from a scope statement, for human refinement' },
                  { a: 'User story creation', u: 'Candidate stories from feature descriptions (Jira AI, Copilot-style assistants)' },
                  { a: 'Effort estimation', u: 'Pattern-matching against historical contract-development estimates' },
                  { a: 'Schedule drafting', u: 'First-pass Gantt from work packages and dependencies (MS Project AI)' },
                  { a: 'Documentation', u: 'Architecture docs, audit-prep documentation, meeting notes (Notion AI)' },
                  { a: 'Meeting support', u: 'Transcription and action items across time zones (Otter.ai, Teams AI)' },
                  { a: 'Technical & regulatory research', u: 'Surfacing candidate regulatory considerations for human legal review' },
                ].map(r => (
                  <div key={r.a} className="grid grid-cols-[1fr_1.4fr] text-[11px] border-t border-border">
                    <div className="p-2 font-semibold text-foreground bg-muted/40">{r.a}</div>
                    <div className="p-2 text-muted-foreground">{r.u}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits / risks / principle */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
                <div className="p-3 rounded-xl bg-[#39B54A]/8 border border-[#39B54A]/30">
                  <div className="font-bold text-xs text-[#39B54A] mb-1.5">✅ Benefits</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Faster planning</li>
                    <li>• Improved consistency</li>
                    <li>• Administrative automation</li>
                    <li>• Knowledge management</li>
                    <li>• Decision support</li>
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-[#ef4444]/8 border border-[#ef4444]/30">
                  <div className="font-bold text-xs text-[#ef4444] mb-1.5">⚠️ Risks &amp; limitations</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Inaccurate outputs</li>
                    <li>• Outdated information</li>
                    <li>• Bias and hallucinations</li>
                    <li>• Data privacy concerns</li>
                    <li>• Overreliance on automation</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-r from-[#ef4444]/15 to-[#f97316]/15 border-2 border-[#ef4444]/40 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#ef4444]">Non-negotiable principle for blockchain projects</span>
                <p className="text-sm text-foreground font-semibold mt-1">
                  AI-generated outputs must always be reviewed and validated by a human before entering audit or compliance scope —
                  where errors are unusually costly and, once deployed, potentially irreversible. AI accelerates planning; it does not
                  carry accountability for the plan.
                </p>
              </div>
              <MicroVaultCallout className="shrink-0">
                The team uses AI to draft user stories and the initial WBS, and to transcribe distributed team meetings — genuinely
                useful for a three-person team. But a human reviews every AI-assisted output before it enters audit or compliance scope.
                AI is drafting and research support throughout planning — never an unreviewed decision-maker on anything audit-adjacent.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ DEEP DIVE: MILESTONES & GO/NO-GO GATES ═══════ */}
        <div id="s2-milestones" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4 lg:mb-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#eab308]">Section 02</span>
              <DeepDiveBadge />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">A Milestone Plan in Practice: Five Go/No-Go Gates</h2>
            <p className="text-sm text-muted-foreground">
              What the schedule from Slide 2.7 typically consolidates into — each milestone a hard checkpoint before the next phase.
            </p>
          </div>

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
                  <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: milestone.color }} />
                  <div className="flex flex-col flex-1 p-4 lg:p-5 min-h-0">
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
                    <h3 className="font-bold text-sm lg:text-base leading-snug mb-2 shrink-0" style={{ color: milestone.color }}>
                      {milestone.title}
                    </h3>
                    <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed flex-1 min-h-0">{milestone.description}</p>
                    <div className="mt-3 pt-3 border-t border-border shrink-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Deliverables</p>
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

        {/* ═══════ DISCUSSION ═══════ */}
        <div id="s2-discussion" className="h-full">
          <DiscussionSlide
            prompt='A logistics company wants to track shipment data across 12 competing freight companies using blockchain. Walk through the "Do we need blockchain?" checklist. What is your verdict?'
            guidingQuestions={[
              'You are the PM for a consortium blockchain project. One member wants to add a new on-chain feature two weeks before the specification freeze milestone. What do you do?',
              'Take MicroVault\'s five work packages and score each on the tailoring matrix. Do you agree with predictive for the audit and adaptive for contract features?',
            ]}
          />
        </div>

        {/* ═══════ QUIZ — one slide, stepped question by question ═══════ */}
        <div id="s2-quiz" className="h-full">
          <GroupedQuiz questions={quizQuestions} compact />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s2-takeaways" className="h-full">
          <TakeawaySlide
            title="Key Takeaways — Section 02"
            takeaways={[
              'Confirm blockchain is actually the right solution before scoping — then follow the scoping sequence in order: objective (SMART) → stakeholders → constraints scan → on-chain/off-chain boundary → governance model → scope statement.',
              'The on-chain/off-chain boundary is the most consequential scoping decision. Ask "does this requirement benefit from being on-chain?" — not "can we put it on-chain?"',
              'Decompose scope into work packages (the WBS golden rule: to the lowest reliably estimable level), then select a delivery approach per work package with the tailoring matrix — never one methodology for everything.',
              'The WBS stops at the work-package boundary: predictive packages decompose into scheduled activities; adaptive packages fork to a backlog refined into user stories.',
              'The critical path in blockchain projects usually runs through the audit — protect it. Use hybrid toolsets (Gantt + sprint board), and use AI to accelerate planning, with human review before anything enters audit or compliance scope.',
            ]}
          />
        </div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
