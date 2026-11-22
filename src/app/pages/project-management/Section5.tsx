import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { DiscussionSlide } from '../../components/templates/DiscussionSlide';
import { GroupedQuiz } from '../../components/templates/GroupedQuiz';
import { SectionNav } from '../../components/navigation/SectionNav';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { MicroVaultCallout } from '../../components/shared/MicroVaultCallout';
import { DeepDiveBadge } from '../../components/shared/DeepDiveBadge';
import { Trophy } from 'lucide-react';

const chapters = [
  { id: 's5-role',      label: '5.1 Role of the PM' },
  { id: 's5-trust',     label: '5.2 Trust & Cohesion' },
  { id: 's5-leadership',label: '5.3 Leadership Styles' },
  { id: 's5-agile',     label: '5.4 Agile Leadership' },
  { id: 's5-conflict',  label: '5.5 Conflict & Performance' },
  { id: 's5-sources',   label: 'Sources & Literature' },
  { id: 's5-extras',    label: 'Extras', kind: 'group' as const },
  { id: 's5-team',      label: 'Deep Dive: Team Composition' },
  { id: 's5-change',    label: 'Deep Dive: Change Adoption' },
  { id: 's5-metrics',   label: 'Deep Dive: Success Metrics' },
  { id: 's5-discussion',label: 'Discussion' },
  { id: 's5-quiz',      label: 'Quiz' },
  { id: 's5-takeaways', label: 'Takeaways' },
];

// The section quiz, in order. GroupedQuiz shows it on one slide, one question at a time.
const quizQuestions = [
  {
    question: "(1/3) A smart contract audit has returned with 1 Critical finding, 3 High findings, and 5 Medium findings. The Critical and 2 of the 3 High findings have been resolved and verified. The project sponsor is pushing to deploy to mainnet to meet a public deadline. What is the correct PM response?",
    options: [
      { text: 'Approve the mainnet deployment — most findings are resolved and the deadline pressure is real.', correct: false },
      { text: 'Block the mainnet deployment until all Critical and High findings are resolved and re-verified by the auditor.', correct: true },
      { text: 'Deploy to mainnet but disable the function affected by the remaining High finding until it is patched.', correct: false },
      { text: 'Ask the auditor to reclassify the remaining High finding as Medium to unblock the deployment.', correct: false },
    ],
    explanation: "No Critical or High finding should remain open at mainnet launch. The Go/No-Go gate is the PM's most important control in a blockchain project. Blockchain deployments are irreversible — a post-launch exploit caused by a known High finding would be a PM governance failure. The deadline is the sponsor's problem to manage; the PM's job is to protect the organization from a catastrophic, publicly visible, and unrecoverable security incident.",
  },
  {
    question: "(2/3) You are PM for a public DeFi protocol. Contributors are pseudonymous and volunteer-driven. A critical bug needs urgent fixing but two core developers publicly disagree on the implementation approach. What leadership posture is most effective?",
    options: [
      { text: 'Use positional authority as PM to mandate which solution must be implemented immediately.', correct: false },
      { text: 'Escalate to the DAO governance forum for a token-holder vote to resolve the technical disagreement.', correct: false },
      { text: 'Facilitate a time-boxed technical discussion: set a 24-hour decision window, ask both developers to document trade-offs, then drive toward consensus — escalating only if deadlocked.', correct: true },
      { text: 'Hire an external security contractor to implement a neutral third approach that sidesteps the disagreement entirely.', correct: false },
    ],
    explanation: "In public protocols, the PM has no formal authority over volunteer contributors — positional power does not work. DAO votes are far too slow for a critical security bug. Hiring an external contractor introduces trust and context risk. The correct posture is facilitative: create a structured decision space with a clear deadline, let the experts document their options, then drive toward a decision. If genuinely deadlocked, the PM calls it — but only after the technical case has been heard. This is servant leadership applied to a security incident.",
  },
  {
    question: "(3/3) At 12 months post-launch, which set of metrics best demonstrates that your blockchain project has delivered lasting value — not just a successful deployment event?",
    options: [
      { text: 'Lines of smart contract code deployed, number of contract functions, and total test coverage percentage.', correct: false },
      { text: 'On-chain transaction volume growth, 30/60/90-day active wallet retention, governance participation rate, and zero critical security incidents post-launch.', correct: true },
      { text: 'Number of press releases published, social media follower growth, and conference talks given about the project.', correct: false },
      { text: "The project's native token market cap and its ranking on CoinGecko or CoinMarketCap.", correct: false },
    ],
    explanation: "A successful deployment is a starting line, not a finish line. Lasting value is demonstrated by adoption (transaction volume, active wallets), governance health (participation rate shows the community is engaged), and security resilience (zero critical incidents means the architecture held under real-world conditions). Code metrics measure effort, not value. Token price is driven by market speculation, not project quality. Press coverage is vanity. The PM's 12-month report to the board should tell the story of a living, growing, self-governing protocol — not a launch event.",
  },
];

export function PM_Section5() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} accentColor="#8b5cf6" />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 05"
            title="Leading Blockchain Project Teams"
            subtitle="The role of the PM, building trust, leadership styles, agile leadership, and conflict resolution — the human side of delivery"
            icon={<Trophy className="size-20 text-[#8b5cf6]" />}
            gradient="from-[#8b5cf6] to-[#f97316]"
          />
        </div>

        {/* ═══════ 5.1 THE ROLE OF THE BLOCKCHAIN PM ═══════ */}
        <div id="s5-role" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6]">Section 05 · Slide 5.1</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">The Role of the Blockchain Project Manager</h2>
            <p className="text-sm text-muted-foreground">
              Modern PMI perspective: project managers are not merely planners or controllers — they create the environment where teams
              successfully deliver value.
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* The five postures */}
            <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-5 gap-3 content-center">
              {[
                { t: 'Facilitator', icon: '🤲', d: 'Enables the team rather than directing every activity' },
                { t: 'Coordinator', icon: '🔗', d: 'Aligns stakeholders across organizations, time zones, and roles' },
                { t: 'Information integrator', icon: '🧠', d: 'Brings technical, legal, and business signals into one picture' },
                { t: 'Accountable leader', icon: '🎖️', d: 'Owns decision rights, escalation, and approval processes' },
                { t: 'Value enabler', icon: '💎', d: 'Keeps delivery pointed at value, not just scope and schedule' },
              ].map(r => (
                <div key={r.t} className="p-3 lg:p-4 rounded-xl bg-card border border-border flex flex-col items-center text-center gap-1.5">
                  <span className="text-2xl">{r.icon}</span>
                  <div className="font-bold text-sm text-[#8b5cf6]">{r.t}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.d}</p>
                </div>
              ))}
            </div>

            <div className="shrink-0 p-3 lg:p-4 rounded-xl bg-card border border-border text-xs lg:text-sm text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Responsibilities:</span> align stakeholders · enable team performance · support
              decision-making · manage uncertainty · deliver value. In blockchain initiatives the PM may interact with steering
              committees, sponsors, security review boards, or <span className="font-semibold text-foreground">DAO governance mechanisms</span> —
              leadership means balancing team autonomy with governance requirements by clarifying decision rights, escalation mechanisms,
              approval processes, and accountability.
            </div>

            <div className="shrink-0 p-3 lg:p-4 rounded-xl bg-gradient-to-r from-[#8b5cf6]/15 to-[#f97316]/15 border-2 border-[#8b5cf6]/40 text-sm text-foreground font-semibold">
              Key principle: project managers deliver results through people rather than through authority alone.
            </div>

            <MicroVaultCallout className="shrink-0">
              In MicroVault the founder acts as project manager, product owner, and stakeholder liaison at once — common in small DeFi
              startups. We clarify decision rights even within a three-person team, so authority is explicit rather than assumed.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 5.2 BUILDING TRUST & TEAM COHESION ═══════ */}
        <div id="s5-trust" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6]">Section 05 · Slide 5.2</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Building Trust &amp; Fostering Team Cohesion</h2>
            <p className="text-sm text-muted-foreground">
              Blockchain teams face structural obstacles to trust that generic team-building advice doesn't address — trust has to be
              engineered through process, not assumed to emerge naturally.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Why trust is harder */}
            <div className="flex flex-col gap-2.5 min-h-0">
              <div className="font-bold text-sm text-foreground shrink-0">Why trust is harder to build by default:</div>
              {[
                { t: 'Distributed, asynchronous work', d: 'removes the informal, in-person moments that normally build trust quickly.', icon: '🌍' },
                { t: "Specialists can't verify each other", d: "a non-technical founder can't audit a smart contract; a developer can't independently judge a legal opinion.", icon: '🔍' },
                { t: 'Pseudonymous contribution norms', d: 'common in public-protocol work — team members may have thinner shared history than co-located teams.', icon: '🎭' },
                { t: 'High-stakes, irreversible decisions', d: 'an audit sign-off or mainnet deployment raises the cost of misplaced trust — making deliberate construction more important.', icon: '⚠️' },
              ].map(o => (
                <div key={o.t} className="flex items-start gap-3 p-3 rounded-xl bg-[#ef4444]/8 border border-[#ef4444]/30">
                  <span className="text-lg shrink-0">{o.icon}</span>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed"><span className="font-bold text-foreground">{o.t}</span> — {o.d}</p>
                </div>
              ))}
            </div>

            {/* Practices */}
            <div className="flex flex-col gap-2.5 min-h-0">
              <div className="font-bold text-sm text-foreground shrink-0">Practices that build trust under these conditions:</div>
              {[
                { t: 'Transparency by default', d: 'decisions and their reasoning documented and visible to the whole team — substitutes for the informal trust co-located teams get "for free."', icon: '📖' },
                { t: 'Competence-based delegation', d: "consistently delegate decisions to whoever has the expertise — the auditor's findings aren't second-guessed by non-specialists — and be transparent about why.", icon: '🎓' },
                { t: 'Predictable rituals', d: 'consistent stand-ups, demos, and retrospectives — even lightweight ones — give distributed teams a shared rhythm.', icon: '🗓️' },
                { t: 'Psychological safety around bad news', d: 'critical before an audit or deployment gate — a team that fears raising a concern late will raise it after it becomes a costly incident instead.', icon: '🛟' },
              ].map(p => (
                <div key={p.t} className="flex items-start gap-3 p-3 rounded-xl bg-[#39B54A]/8 border border-[#39B54A]/30">
                  <span className="text-lg shrink-0">{p.icon}</span>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed"><span className="font-bold text-foreground">{p.t}</span> — {p.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#8b5cf6]/15 to-[#f97316]/15 border-2 border-[#8b5cf6]/40 text-xs lg:text-sm text-foreground font-semibold flex items-center">
              Key principle: in distributed, high-stakes blockchain teams, trust is a deliberate output of transparent process — not a
              byproduct of time spent together.
            </div>
            <MicroVaultCallout>
              Three people, multiple time zones, one Solidity developer whose work the founders can't verify. Trust is built by making
              every architecture and audit-prep decision visible in a shared repo, deferring unconditionally to the auditor's findings,
              and a weekly retrospective where "what are we worried about" is a standing item — so a late concern surfaces before, not
              after, the audit.
            </MicroVaultCallout>
          </div>
        </div>

        {/* ═══════ 5.3 LEADERSHIP STYLES & SKILLS ═══════ */}
        <div id="s5-leadership" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6]">Section 05 · Slide 5.3</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Leadership Styles &amp; Essential Leadership Skills</h2>
            <p className="text-sm text-muted-foreground">
              There is no single style for every project environment — effective leaders adapt to the situation, and the posture must
              match the project context.
            </p>
          </div>

          {/* Styles + skills strip */}
          <div className="shrink-0 mb-3 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-5 text-[10px] lg:text-[11px] font-bold text-center bg-muted text-foreground">
                {['Transformational', 'Servant', 'Democratic', 'Coaching', 'Directive'].map(s => <div key={s} className="p-1.5 lg:p-2">{s}</div>)}
              </div>
              <div className="grid grid-cols-5 text-[10px] lg:text-[11px] text-center text-muted-foreground border-t border-border">
                {['Innovation and change', 'Agile & blockchain teams', 'Collaborative environments', 'Team development', 'Crisis situations'].map((u, i) => <div key={i} className="p-1.5 lg:p-2">{u}</div>)}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-card border border-border">
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Essential skills</div>
              <div className="flex flex-wrap gap-1">
                {['Emotional intelligence', 'Decision-making', 'Conflict management', 'Strategic thinking', 'Adaptability'].map(s => (
                  <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#8b5cf6]">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 lg:gap-5">
            {[
              {
                context: 'Enterprise / Consortium Blockchain',
                examples: 'Hyperledger Fabric, R3 Corda, private Ethereum',
                color: '#f97316',
                icon: '🏢',
                leadership: 'Traditional PM leadership with blockchain complexity. You have authority but face multi-org governance. Focus on alignment, change management, and internal communication.',
                dos: ['Set clear escalation paths across organizations', 'Use formal change control for all on-chain changes', 'Run regular consortium steering committee meetings', 'Build a shared security incident response plan'],
                donts: ['Assume organizational hierarchies translate across member organizations', 'Skip governance documentation for "obvious" decisions', 'Underestimate legal complexity of multi-party data sharing'],
              },
              {
                context: 'Public Protocol / DeFi',
                examples: 'Ethereum dApps, DeFi protocols, L2s',
                color: '#6366f1',
                icon: '🌐',
                leadership: 'Servant leadership in a meritocratic community. You influence but do not command. Reputation is built through code quality, transparency, and governance participation.',
                dos: ['Lead through technical excellence and transparency', 'Earn community trust before proposing major changes', 'Use governance forums for all significant decisions', 'Build a strong contributor ecosystem'],
                donts: ['Make unilateral decisions on protocol changes', 'Dismiss community feedback in governance forums', 'Underestimate the cost of community trust loss'],
              },
              {
                context: 'DAO / Decentralized Organization',
                examples: 'MakerDAO, Compound, Uniswap governance',
                color: '#22d3ee',
                icon: '🗳️',
                leadership: 'Facilitative leadership with no formal authority. You coordinate, propose, and implement — but the token holders decide. Patience and political skill are as important as technical knowledge.',
                dos: ['Master the governance forum and voting mechanics', 'Build coalitions before submitting major proposals', 'Write clear, well-reasoned governance proposals', 'Respect voter sentiment even when you disagree'],
                donts: ['Try to rush governance processes under time pressure', 'Submit proposals without community pre-discussion', 'Ignore the treasury / token economics implications of your proposals'],
              },
            ].map(ctx => (
              <div key={ctx.context} className="p-4 bg-card border rounded-xl flex flex-col" style={{ borderColor: ctx.color + '40' }}>
                <div className="text-xl mb-1">{ctx.icon}</div>
                <div className="font-bold text-sm mb-0.5" style={{ color: ctx.color }}>{ctx.context}</div>
                <div className="text-[10px] text-muted-foreground italic mb-2">{ctx.examples}</div>
                <div className="text-xs text-muted-foreground mb-3 leading-relaxed">{ctx.leadership}</div>
                <div className="font-semibold text-xs text-[#39B54A] mb-1">✅ Do:</div>
                <ul className="text-xs text-muted-foreground space-y-0.5 mb-2">
                  {ctx.dos.map(d => <li key={d} className="flex gap-1"><span className="text-[#39B54A] shrink-0">•</span>{d}</li>)}
                </ul>
                <div className="font-semibold text-xs text-[#ef4444] mb-1">❌ Don't:</div>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  {ctx.donts.map(d => <li key={d} className="flex gap-1"><span className="text-[#ef4444] shrink-0">•</span>{d}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <MicroVaultCallout className="shrink-0 mt-3">
            MicroVault's lead uses servant leadership with the dev team day-to-day — but shifts to directive style if a security
            incident occurs. Style matched to situation, not habit.
          </MicroVaultCallout>
        </div>

        {/* ═══════ 5.4 AGILE LEADERSHIP ═══════ */}
        <div id="s5-agile" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6]">Section 05 · Slide 5.4</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Agile Leadership in Dynamic Blockchain Environments</h2>
            <p className="text-sm text-muted-foreground">
              Blockchain projects evolve with regulation, technology, security threats, and market volatility. Agile leaders enable teams
              rather than directing every activity — the ceremonies below keep that adaptivity from drifting past the irreversible-commitment constraints.
            </p>
          </div>

          {/* Leadership characteristics / responsibilities / agile practices */}
          <div className="shrink-0 mb-3 grid grid-cols-1 lg:grid-cols-3 gap-2.5">
            {[
              { label: 'Leadership characteristics', color: '#8b5cf6', items: ['Flexibility', 'Continuous learning', 'Fast decision-making', 'Team empowerment', 'Iterative delivery'] },
              { label: 'Leadership responsibilities', color: '#f97316', items: ['Remove blockers', 'Encourage innovation', 'Facilitate collaboration', 'Prioritize value delivery'] },
              { label: 'Agile practices', color: '#39B54A', items: ['Scrum ceremonies', 'Kanban boards', 'MVP delivery', 'Continuous feedback', 'Incremental releases'] },
            ].map(g => (
              <div key={g.label} className="p-2.5 rounded-xl bg-card border border-border">
                <div className="text-[10px] font-black uppercase tracking-wider mb-1.5" style={{ color: g.color }}>{g.label}</div>
                <div className="flex flex-wrap gap-1">
                  {g.items.map(it => (
                    <span key={it} className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border text-muted-foreground" style={{ borderColor: g.color + '40', backgroundColor: g.color + '10' }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto grid grid-cols-2 gap-4 lg:gap-5 content-start">
            <div className="space-y-3">
              {[
                {
                  ceremony: 'Sprint Planning',
                  standard: 'Select backlog items for the next 2-week sprint',
                  blockchain: 'Distinguish on-chain stories (require spec freeze, cannot be undone) from off-chain stories (can iterate). Never mix on-chain contract changes with UI stories in the same sprint without explicit risk acknowledgement.',
                  color: '#8b5cf6',
                },
                {
                  ceremony: 'Daily Standup',
                  standard: 'Yesterday / Today / Blockers',
                  blockchain: 'Add a "security flag" — any standup where a team member identifies a potential vulnerability triggers an immediate async security review, before the sprint continues.',
                  color: '#f97316',
                },
                {
                  ceremony: 'Sprint Review / Demo',
                  standard: 'Demo completed work to stakeholders',
                  blockchain: 'Demo on testnet only. Never demo directly on mainnet. Distinguish "testnet feature complete" from "mainnet ready" clearly in all stakeholder communications.',
                  color: '#22d3ee',
                },
                {
                  ceremony: 'Sprint Retrospective',
                  standard: 'What went well / what to improve',
                  blockchain: 'Include a security retrospective item every sprint. Track: test coverage delta, new vulnerabilities found, audit debt accumulating, and technical debt on access control.',
                  color: '#eab308',
                },
              ].map(c => (
                <div key={c.ceremony} className="p-4 bg-card border border-border rounded-xl">
                  <div className="font-bold text-sm mb-1" style={{ color: c.color }}>{c.ceremony}</div>
                  <div className="text-xs text-muted-foreground mb-2"><span className="font-semibold text-foreground">Standard: </span>{c.standard}</div>
                  <div className="text-xs text-muted-foreground p-2.5 rounded-lg" style={{ background: c.color + '12' }}><span className="font-bold" style={{ color: c.color }}>Blockchain adaptation: </span>{c.blockchain}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="font-bold text-sm text-foreground">Blockchain-Specific Ceremonies</div>
              {[
                {
                  ceremony: 'Specification Freeze Review',
                  when: 'Once, before development begins',
                  color: '#ef4444',
                  desc: 'A formal walkthrough of every on-chain contract specification with the full team plus legal. Any open question halts development. No contract code is written until this passes.',
                },
                {
                  ceremony: 'Audit Kickoff Meeting',
                  when: 'Start of audit phase',
                  color: '#f97316',
                  desc: 'PM introduces the auditors to the codebase. Agree on scope, commit hash, timeline, and escalation path. Define what "audit complete" means contractually.',
                },
                {
                  ceremony: 'Audit Finding Triage',
                  when: 'Upon receiving draft audit report',
                  color: '#eab308',
                  desc: 'Structured session with PM, Architect, and Lead Dev to review every finding: accept / reject / mitigate. All Critical and High must have a resolution plan within 48h.',
                },
                {
                  ceremony: 'Mainnet Go/No-Go Gate',
                  when: 'Before every mainnet deployment',
                  color: '#8b5cf6',
                  desc: 'Formal sign-off session with PM, Exec Sponsor, Legal, Security Lead, and Architect. Checklist-driven. No approval → no deployment. Irreversibility makes this non-negotiable.',
                },
              ].map(c => (
                <div key={c.ceremony} className="p-4 bg-card border rounded-xl" style={{ borderColor: c.color + '40' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-bold text-sm text-foreground">{c.ceremony}</div>
                    <div className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: c.color + '20', color: c.color }}>{c.when}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <MicroVaultCallout className="shrink-0 mt-3">
            When a competitor launch or new regulation appears, MicroVault's lead re-prioritizes the backlog quickly rather than holding
            to the original plan — while still treating the mainnet go/no-go gate as non-negotiable regardless of how the backlog shifts.
          </MicroVaultCallout>
        </div>

        {/* ═══════ 5.5 CONFLICT RESOLUTION & TEAM PERFORMANCE ═══════ */}
        <div id="s5-conflict" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-3 lg:mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6]">Section 05 · Slide 5.5</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Conflict Resolution &amp; Team Performance</h2>
            <p className="text-sm text-muted-foreground">
              Conflict is natural — especially in remote, technically complex, fast-changing blockchain environments. The objective is not
              to eliminate it but to manage it constructively.
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Conflict approaches */}
            <div className="flex flex-col gap-2.5 min-h-0 justify-center">
              <div className="font-bold text-sm text-foreground shrink-0">
                Conflict management approaches (PMI) — why it happens: technical disagreements, remote work, rapid change, resource competition, cultural differences
              </div>
              {[
                { s: 'Collaborate', c: '#39B54A', d: 'Work through the disagreement together — best for long-term solutions.' },
                { s: 'Compromise', c: '#eab308', d: 'Each side concedes something — fast resolution when time matters.' },
                { s: 'Facilitate', c: '#22d3ee', d: 'Structure the conversation and drive alignment — the PM\'s default in expert disputes.' },
                { s: 'Escalate', c: '#f97316', d: 'Route to the appropriate authority — for governance issues beyond the team.' },
                { s: 'Withdraw', c: '#8b5cf6', d: 'Deliberately step back — for low-priority conflicts not worth the energy.' },
              ].map(a => (
                <div key={a.s} className="flex gap-3 p-2.5 bg-card border border-border rounded-lg items-start">
                  <div className="shrink-0 px-2.5 py-1 rounded text-xs font-black text-white" style={{ background: a.c }}>{a.s.toUpperCase()}</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">{a.d}</div>
                </div>
              ))}
            </div>

            {/* Performance management */}
            <div className="flex flex-col gap-3 min-h-0">
              <div className="p-3 lg:p-4 rounded-xl bg-card border border-border">
                <div className="font-bold text-sm text-foreground mb-2">Performance management focus</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Team engagement', 'Quality outcomes', 'Stakeholder satisfaction', 'Continuous feedback', 'Knowledge sharing'].map(f => (
                    <span key={f} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#39B54A]/10 border border-[#39B54A]/30 text-[#39B54A]">{f}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 lg:p-4 rounded-xl bg-card border border-border flex-1">
                <div className="font-bold text-sm text-foreground mb-2">Blockchain-specific metrics</div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {['Smart contract quality', 'Security incident rates', 'Sprint velocity', 'Deployment stability', 'Community engagement'].map(m => (
                    <span key={m} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#8b5cf6]">{m}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Measure not just delivery speed but quality outcomes and long-term value creation — and keep supporting performance
                  through psychological safety (Slide 5.2), feedback, and recognition. The full eight-dimension KPI framework is in the
                  deep dive below.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#8b5cf6]/15 to-[#f97316]/15 border-2 border-[#8b5cf6]/40 text-xs lg:text-sm text-foreground font-semibold shrink-0">
                Key principle: high-performing teams require both effective conflict resolution and continuous performance improvement.
              </div>
              <MicroVaultCallout className="shrink-0">
                A disagreement over whether to delay launch for a second audit is resolved by collaboration and escalation to the
                founders — and it surfaced constructively in the first place because of the trust practices from Slide 5.2. We track
                audit findings and deployment stability alongside delivery metrics.
              </MicroVaultCallout>
            </div>
          </div>
        </div>

        {/* ═══════ SUGGESTED SOURCES & LITERATURE — SECTION 5 ═══════ */}
        <div id="s5-sources" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4 lg:mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6]">Section 05</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Suggested Sources &amp; Literature</h2>
            <p className="text-sm text-muted-foreground">Where the leadership material in this section is grounded — and what to treat as course-original synthesis.</p>
          </div>
          <div className="flex-1 min-h-0 flex flex-col gap-3 justify-center max-w-4xl">
            {[
              {
                title: 'PMI — The Standard for Project Management & PMBOK® Guide, Eighth Edition (Jan. 2026)',
                body: 'The stakeholder performance domain, and the PMI conflict-management approach vocabulary (collaborate / compromise / facilitate / escalate / withdraw).',
                color: '#f97316',
              },
              {
                title: 'General leadership-style literature',
                body: 'Transformational, servant, democratic, coaching, and directive styles — broadly consistent across practitioner and academic sources; not PMI-specific, included as widely accepted vocabulary.',
                color: '#6366f1',
              },
              {
                title: 'Distributed / remote-team trust literature',
                body: 'The trust-and-cohesion practices in Slide 5.2 are course-original synthesis, grounded in the structural characteristics of distributed, specialist-heavy blockchain teams — no single authoritative "blockchain team trust" standard exists; treat it as practical synthesis rather than an established framework.',
                color: '#8b5cf6',
              },
            ].map(s => (
              <div key={s.title} className="p-4 rounded-xl bg-card border border-border" style={{ borderLeftWidth: 4, borderLeftColor: s.color }}>
                <div className="font-bold text-sm text-foreground mb-1">{s.title}</div>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ DEEP DIVE: TEAM COMPOSITION ═══════ */}
        <div id="s5-team" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6]">Section 05</span>
              <DeepDiveBadge />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Building the Blockchain Project Team</h2>
            <p className="text-sm text-muted-foreground">Blockchain talent is scarce and expensive. Team composition decisions made at the start define your project's success ceiling.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
            <div className="col-span-2 grid grid-cols-2 gap-3">
              {[
                {
                  size: 'Core Team (always in-house)',
                  color: '#8b5cf6',
                  members: [
                    'PM / Delivery Lead — project coordination and stakeholder management',
                    'Blockchain Architect — platform decision-making and irreversible design choices',
                    'Product Owner — requirements prioritization and business alignment',
                    'Legal / Compliance Lead — regulatory navigation and risk sign-off',
                  ],
                },
                {
                  size: 'Extended Team (in-house or embedded)',
                  color: '#f97316',
                  members: [
                    '2–4 Smart Contract Developers — contract implementation and testing',
                    'Integration Engineer — oracle, API, and off-chain bridge development',
                    'QA / Test Engineer — test coverage, fuzzing, and integration testing',
                    'DevOps / Infrastructure — node operation, monitoring, CI/CD pipelines',
                  ],
                },
                {
                  size: 'External Specialists (contracted)',
                  color: '#22d3ee',
                  members: [
                    'Security Auditors — independent smart contract review (mandatory)',
                    'Token Economist — tokenomics design and incentive modelling',
                    'Community Manager — Discord, governance forum, public communications',
                    'Technical Writer — whitepaper, documentation, protocol specifications',
                  ],
                },
                {
                  size: 'Advisory Network',
                  color: '#eab308',
                  members: [
                    'Blockchain Ecosystem Advisors — industry connections and protocol expertise',
                    'Legal Counsel (jurisdiction-specific) — country-level regulatory advice',
                    'Security Research Advisors — bug bounty oversight and threat modelling',
                    'Domain Expert Advisors — industry vertical knowledge (finance, supply chain, etc.)',
                  ],
                },
              ].map(group => (
                <div key={group.size} className="p-4 bg-card border rounded-xl" style={{ borderColor: group.color + '40' }}>
                  <div className="font-bold text-xs mb-2" style={{ color: group.color }}>{group.size}</div>
                  <ul className="space-y-1">
                    {group.members.map(m => <li key={m} className="text-xs text-muted-foreground flex gap-1.5"><span style={{ color: group.color }} className="shrink-0">•</span>{m}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="font-bold text-sm text-foreground">Talent Scarcity Realities</div>
              <div className="space-y-2">
                {[
                  { issue: 'Smart Contract Devs are expensive', detail: 'Senior Solidity developers command $150k–$300k. Plan your budget early. Do not compete with DeFi protocols for talent without matching their compensation.' },
                  { issue: 'Blockchain literacy gap is real', detail: 'Most enterprise PMs, QA engineers, and POs do not have blockchain experience. Build a training budget into the project — or onboarding will slow you down.' },
                  { issue: 'Pseudonymous contributors', detail: 'Many top blockchain contributors operate under pseudonyms. This is normal in the space — adapt your HR and contracting practices accordingly.' },
                  { issue: 'Global, async-first teams', detail: 'Blockchain talent is globally distributed. Design your team rituals for async-first collaboration rather than trying to force synchronous meetings across time zones.' },
                ].map(r => (
                  <div key={r.issue} className="p-3 bg-[#ef4444]/8 border border-[#ef4444]/30 rounded-lg">
                    <div className="font-semibold text-xs text-[#ef4444] mb-0.5">⚠️ {r.issue}</div>
                    <div className="text-xs text-muted-foreground">{r.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ DEEP DIVE: CHANGE MANAGEMENT / ADOPTION ═══════ */}
        <div id="s5-change" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6]">Section 05</span>
              <DeepDiveBadge />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Organizational Change &amp; Blockchain Adoption</h2>
            <p className="text-sm text-muted-foreground">Adopting blockchain means new workflows, trust models, and mental models. (Formal project change control — approving scope changes — is covered in Section 6.3.)</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
            <div className="p-5 bg-card border border-border rounded-xl space-y-3">
              <div className="font-bold text-sm text-[#f97316]">Internal Change Challenges</div>
              {[
                { challenge: 'Trust in code over people', desc: 'Users must trust a smart contract, not a company. This is a fundamental mental model shift that requires deliberate training.' },
                { challenge: 'Wallet & key management', desc: 'End users managing private keys is a UX paradigm shift. Most enterprise deployments need a custodial or MPC wallet abstraction layer.' },
                { challenge: 'Process re-engineering', desc: 'Blockchain workflows often replace manual reconciliation processes. Document new workflows and run parallel operations before cutover.' },
                { challenge: 'Compliance team adoption', desc: 'Legal and compliance teams are often the last to buy into blockchain projects. Involve them from day one — not just at the audit.' },
              ].map(c => (
                <div key={c.challenge} className="p-3 bg-[#f97316]/8 border border-[#f97316]/30 rounded-lg">
                  <div className="font-semibold text-xs text-[#f97316] mb-0.5">{c.challenge}</div>
                  <div className="text-xs text-muted-foreground">{c.desc}</div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-card border border-border rounded-xl space-y-3">
              <div className="font-bold text-sm text-[#8b5cf6]">Kotter's 8-Step Model Applied</div>
              {[
                { step: '1. Create Urgency', apply: 'Show the competitive or compliance risk of not adopting. Real numbers — not theory.' },
                { step: '2. Build a Coalition', apply: 'Identify internal champions in every department. Blockchain needs allies in legal, IT, and operations.' },
                { step: '3. Form a Vision', apply: 'Articulate what the organization looks like after blockchain — in business terms, not technical ones.' },
                { step: '4. Communicate the Vision', apply: 'Regular town halls, FAQs, and demos. Not a one-time announcement.' },
                { step: '5. Remove Barriers', apply: 'Identify who will resist and why. Address their concerns directly before launch.' },
                { step: '6. Short-Term Wins', apply: 'Deploy a low-risk pilot first. A real win on a small use case beats a failed complex one.' },
                { step: '7. Build on Change', apply: 'Expand adoption after each successful milestone. Never declare victory too early.' },
                { step: '8. Anchor in Culture', apply: 'Update processes, training, and KPIs to reflect the new blockchain-enabled workflows.' },
              ].map(s => (
                <div key={s.step} className="flex gap-2 text-xs">
                  <span className="font-bold text-[#8b5cf6] shrink-0 w-4">{s.step.split('.')[0]}.</span>
                  <div><span className="font-semibold text-foreground">{s.step.split('. ')[1]}: </span><span className="text-muted-foreground">{s.apply}</span></div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-card border border-border rounded-xl space-y-3">
              <div className="font-bold text-sm text-[#22d3ee]">User Adoption Toolkit</div>
              {[
                { tool: 'Pilot Program', desc: 'Start with a small, willing user group. Learn from their experience before full rollout. Their feedback shapes the training for everyone else.' },
                { tool: 'Abstraction Layers', desc: 'Abstract blockchain complexity from end users wherever possible. Most enterprise users do not need to interact with wallets directly.' },
                { tool: 'Training Materials', desc: 'Role-specific training: executives need the business case, users need the workflow, IT needs the architecture. One training program does not serve all three.' },
                { tool: 'Feedback Loops', desc: 'Establish a formal feedback channel for blockchain adopters. User confusion is a signal that the PM needs to act on — not an annoyance to dismiss.' },
                { tool: 'Success Stories', desc: 'Publicize early wins internally. A team that reduced reconciliation time by 80% using the blockchain pilot is your best change management tool.' },
              ].map(t => (
                <div key={t.tool} className="p-3 bg-[#22d3ee]/8 border border-[#22d3ee]/30 rounded-lg">
                  <div className="font-semibold text-xs text-[#22d3ee] mb-0.5">{t.tool}</div>
                  <div className="text-xs text-muted-foreground">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ DEEP DIVE: MEASURING SUCCESS ═══════ */}
        <div id="s5-metrics" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6]">Section 05</span>
              <DeepDiveBadge />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Measuring Blockchain Project Success</h2>
            <p className="text-sm text-muted-foreground">The performance focus of Slide 5.5, expanded into eight dimensions — standard KPIs (on time, on budget, on scope) are necessary but insufficient.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                dimension: 'Delivery Metrics',
                color: '#f97316',
                icon: '📅',
                kpis: [
                  'Milestone completion rate vs baseline plan',
                  'Specification freeze date achieved',
                  'Days from audit kickoff to final report',
                  'Mainnet go-live date vs original estimate',
                ],
              },
              {
                dimension: 'Security Metrics',
                color: '#ef4444',
                icon: '🔐',
                kpis: [
                  'Smart contract test coverage % (target: >95%)',
                  'Number of Critical/High audit findings at kickoff vs zero at go-live',
                  'Time to remediate findings (target: <48h for Critical)',
                  'Post-launch security incidents: zero in first 90 days',
                ],
              },
              {
                dimension: 'Technical Performance',
                color: '#6366f1',
                icon: '⚡',
                kpis: [
                  'Transaction throughput (TPS) vs specification',
                  'Average gas cost per operation',
                  'Smart contract deployment cost vs budget',
                  'Uptime / finality rate of the network layer',
                ],
              },
              {
                dimension: 'Business & Adoption',
                color: '#39B54A',
                icon: '📈',
                kpis: [
                  'Active wallets / users 30/60/90 days post-launch',
                  'Transaction volume growth month-over-month',
                  'Cost reduction vs pre-blockchain baseline process',
                  'Consortium member retention at 6 months',
                ],
              },
              {
                dimension: 'Governance Health',
                color: '#8b5cf6',
                icon: '🗳️',
                kpis: [
                  'Governance participation rate (% eligible voters)',
                  'Proposal pass rate and average deliberation time',
                  'Token concentration (Gini coefficient of voting power)',
                  'Community forum active member count',
                ],
              },
              {
                dimension: 'Compliance & Legal',
                color: '#eab308',
                icon: '⚖️',
                kpis: [
                  'Regulatory sign-off received before launch (binary)',
                  'Zero open legal investigations 90 days post-launch',
                  'GDPR audit passed post-deployment',
                  'KYC / AML coverage rate of user base',
                ],
              },
              {
                dimension: 'Team Health',
                color: '#22d3ee',
                icon: '👥',
                kpis: [
                  'Key person retention rate (especially Blockchain Architect)',
                  'Onboarding time for new blockchain engineers',
                  'Knowledge documentation coverage of on-chain systems',
                  'Sprint velocity stability over the project arc',
                ],
              },
              {
                dimension: 'Long-Term Resilience',
                color: '#f97316',
                icon: '🔁',
                kpis: [
                  'Incident response time: minutes from alert to acknowledge',
                  'Protocol upgrade delivery time and governance success rate',
                  'Dependency health: protocol dependencies still supported',
                  'Community NPS (Net Promoter Score) at 6 months',
                ],
              },
            ].map(dim => (
              <div key={dim.dimension} className="p-4 bg-card border rounded-xl flex flex-col" style={{ borderTopWidth: 3, borderTopColor: dim.color }}>
                <div className="text-lg mb-1">{dim.icon}</div>
                <div className="font-bold text-xs mb-2" style={{ color: dim.color }}>{dim.dimension}</div>
                <ul className="space-y-1">
                  {dim.kpis.map(kpi => <li key={kpi} className="text-xs text-muted-foreground flex gap-1.5"><span style={{ color: dim.color }} className="shrink-0">•</span>{kpi}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ DISCUSSION ═══════ */}
        <div id="s5-discussion" className="h-full">
          <DiscussionSlide
            prompt="You are the PM for a DeFi protocol where the lead smart contract developer is also the most influential community member. They are resistant to your change management plan and are expressing this publicly in the governance forum. How do you handle this?"
            guidingQuestions={[
              'Your consortium blockchain project is six months behind schedule. One of the five consortium members wants to exit because of a business strategy change unrelated to your project. How do you manage: (a) the technical impact, (b) the governance impact, and (c) the communication to remaining members?',
              'What does "success" look like for a blockchain project at 12 months post-launch? Define 5 metrics you would present to your executive sponsor as evidence that the project has delivered lasting value — not just a successful deployment.',
            ]}
          />
        </div>

        {/* ═══════ QUIZ — one slide, stepped question by question ═══════ */}
        <div id="s5-quiz" className="h-full">
          <GroupedQuiz questions={quizQuestions} compact />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s5-takeaways" className="h-full">
          <TakeawaySlide
            title="Key Takeaways — Section 05"
            takeaways={[
              'The blockchain PM is a facilitator, coordinator, information integrator, accountable leader, and value enabler — delivering results through people rather than authority alone, with decision rights made explicit.',
              'Trust in distributed, specialist-heavy blockchain teams is engineered, not assumed: transparency by default, competence-based delegation, predictable rituals, and psychological safety around bad news — most acutely before an irreversible gate.',
              'No single leadership style fits every situation — servant leadership day-to-day, directive in a crisis, and a posture matched to context: authoritative in consortia, servant in public protocols, facilitative in DAOs.',
              'Agile leadership enables fast re-prioritization under change, while blockchain-specific ceremonies — spec freeze reviews, audit triage, mainnet go/no-go gates — remain non-negotiable.',
              'Manage conflict constructively (collaborate, compromise, facilitate, escalate, withdraw) and measure performance on quality outcomes and long-term value — smart contract quality, security incidents, deployment stability — not delivery speed alone.',
            ]}
          />
        </div>

        </div>
        <SiteFooter className="snap-start" />
      </div>
    </div>
  );
}
