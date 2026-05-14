import { SectionNav } from '../../components/navigation/SectionNav';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Users } from 'lucide-react';

const chapters = [
  { kind: 'group' as const, id: 'g-brief',   label: '🎯 Brief' },
  { id: 's7-overview',   label: 'Overview & Calendar' },

  { kind: 'group' as const, id: 'g-plan',    label: '📋 The Plan' },
  { id: 's7-p1-analysis',  label: 'Part 1 · Analysis' },
  { id: 's7-p2-technical', label: 'Part 2 · Technical' },
  { id: 's7-p3-governance',label: 'Part 3 · Governance' },
  { id: 's7-p4-roadmap',   label: 'Part 4 · Roadmap' },

  { kind: 'group' as const, id: 'g-submit',  label: '📊 Wrap' },
  { id: 's7-evaluation', label: 'Eval & Submission' },
  { id: 's7-quiz',       label: 'Quiz' },
];

// Online sessions calendar (2026, 6–8 pm)
const TIMELINE = [
  { date: 'May 26, 2026',  label: 'Project walkthrough + Q&A',         color: '#6366f1' },
  { date: 'May 28, 2026',  label: 'Reading material + Project Q&A',    color: '#8b5cf6' },
  { date: 'June 2, 2026',  label: 'AI development hands-on',           color: '#22d3ee' },
  { date: 'June 5, 2026',  label: 'Early project presentations + Q&A', color: '#f59e0b' },
  { date: 'June 9, 2026',  label: 'Final presentations + submission',  color: '#39B54A' },
];

export function SC_Section7() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={chapters} accentColor="#6366f1" />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 07"
            title="Team Project"
            subtitle="Design a smart-contract business application — from problem statement through technical design to a deliverable PDF and presentation."
            icon={<Users className="size-20 text-[#6366f1]" />}
            gradient="from-[#39B54A] to-[#6366f1]"
          />
        </div>

        {/* ═══════ OVERVIEW + TIMELINE ═══════ */}
        <div id="s7-overview" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Project Overview</h2>
            <p className="text-muted-foreground text-sm mt-1">Identify a real-world problem, evaluate whether blockchain is the right tool, and design a smart-contract solution. Integrates all five courses of the Academy.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-[1.1fr_1fr] gap-5">

            {/* Left — what / who / how */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-card border border-[#6366f1]/30 rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#6366f1]">Team size</div>
                  <div className="font-black text-xl text-foreground mt-1">3–4 members</div>
                </div>
                <div className="p-3 bg-card border border-[#6366f1]/30 rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#6366f1]">Deliverable</div>
                  <div className="font-black text-xl text-foreground mt-1">3–5 page PDF</div>
                  <div className="text-[10px] text-muted-foreground">+ 5-min presentation</div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border rounded-xl flex-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">This project integrates</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    'Blockchain Fundamentals — core concepts and trust models',
                    'Business Applications of Smart Contracts — design and decision framework',
                    'Blockchain Platforms — picking the right chain for your use case',
                    'Governance and Compliance — legal, regulatory, and on-chain governance',
                    'Project Management for Blockchain Initiatives — turning a design into a roadmap',
                  ].map(c => (
                    <li key={c} className="flex gap-2"><span className="text-[#6366f1] shrink-0 mt-0.5">›</span>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">The mindset:</span> think like blockchain entrepreneurs and consultants. Identify real opportunities, design viable solutions, navigate the trade-offs between technology, business, and regulation.
              </div>
            </div>

            {/* Right — timeline */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Online sessions · 6–8 pm</div>
              <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto">
                {TIMELINE.map((t) => (
                  <div key={t.date} className="flex items-stretch gap-3 p-3 bg-card border rounded-lg"
                    style={{ borderColor: t.color + '40' }}>
                    <div className="w-1.5 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <div className="font-bold text-sm text-foreground" style={{ color: t.color }}>{t.label}</div>
                        <div className="text-[11px] text-muted-foreground font-mono shrink-0">{t.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="shrink-0 p-2.5 bg-[#ED1C24]/10 border border-[#ED1C24]/30 rounded-lg text-xs text-muted-foreground">
                <span className="font-bold text-[#ED1C24]">Deadline:</span> submissions close <span className="font-mono">June 10, 2026</span>.
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ PART 1 — ANALYSIS ═══════ */}
        <div id="s7-p1-analysis" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-1">Part 1 of 4</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Problem Definition & Analysis</h2>
            <p className="text-muted-foreground text-sm mt-1">Before you design anything, prove there's a real problem worth solving — and that blockchain is the right tool for it.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 content-center">
            {[
              {
                num: '1.1', title: 'Problem Statement', color: '#6366f1',
                items: [
                  'What specific business problem are you solving? Be precise — name the actors, the activity, the friction.',
                  'What are the pain points in the current solution or process?',
                  'Who experiences these pain points, and how frequently?',
                ],
              },
              {
                num: '1.2', title: 'Current State Analysis', color: '#8b5cf6',
                items: [
                  'How is this problem addressed today (if at all)?',
                  'What inefficiencies, costs, or trust issues exist in the current approach?',
                  'Quantify wherever possible — cost, time, error rates, manual hours.',
                ],
              },
              {
                num: '1.3', title: 'Blockchain & SC Value Proposition', color: '#22d3ee',
                items: [
                  'What value does a smart contract add vs. a traditional system?',
                  <>Run it through the decision framework: does this require <strong>trustless execution</strong>, <strong>transparency</strong>, <strong>immutability</strong>, or <strong>automated enforcement</strong>?</>,
                  'Justify why blockchain is the right solution — or honestly flag the trade-offs if it\'s borderline.',
                ],
              },
              {
                num: '1.4', title: 'Stakeholder Mapping', color: '#39B54A',
                items: [
                  'Who are all the stakeholders? Who benefits — and by how much?',
                  'Who is disrupted or loses? How will they react?',
                  'What incentives align (or misalign) participant behavior?',
                  'Revenue model — transaction fees, subscription, token economics, or hybrid?',
                  'Competitive advantage and defensibility — why your team, why now?',
                ],
              },
            ].map(s => (
              <div key={s.num} className="p-4 bg-card border rounded-xl flex flex-col gap-2" style={{ borderColor: s.color + '40' }}>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: s.color }}>{s.num}</div>
                  <div className="font-black text-sm text-foreground">{s.title}</div>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex gap-1.5"><span style={{ color: s.color }} className="shrink-0 mt-0.5">›</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ PART 2 — TECHNICAL DESIGN ═══════ */}
        <div id="s7-p2-technical" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest mb-1">Part 2 of 4</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Technical Design</h2>
            <p className="text-muted-foreground text-sm mt-1">Pick a platform with a defensible rationale, sketch the smart-contract system, and identify what data lives where.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            <div className="p-5 bg-card border-2 rounded-xl flex flex-col gap-3" style={{ borderColor: '#8b5cf650' }}>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black bg-[#8b5cf6]">2.1</div>
                <div className="font-black text-foreground">Platform Selection</div>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground flex-1">
                <li className="flex gap-1.5"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Which blockchain platform? Ethereum, Polygon, Arbitrum, Solana, Hyperledger Fabric, Corda…</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span><strong className="text-foreground">Public vs private/consortium</strong> — make the call and defend it.</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Justify against: <em>transaction speed · cost · security · ecosystem maturity · use-case fit</em>.</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Don't just say "Ethereum" — explain why that's better than the next two alternatives for <em>your</em> problem.</li>
              </ul>
              <div className="p-2 bg-[#8b5cf6]/10 rounded-lg text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">Tip:</span> reuse the platform-checklist interactive (Section 6) — your verdict is your answer here.
              </div>
            </div>

            <div className="p-5 bg-card border-2 rounded-xl flex flex-col gap-3" style={{ borderColor: '#22d3ee50' }}>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black bg-[#22d3ee]">2.2</div>
                <div className="font-black text-foreground">Smart Contract Architecture</div>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground flex-1">
                <li className="flex gap-1.5"><span className="text-[#22d3ee] shrink-0 mt-0.5">›</span>High-level design of your dApp / contract system — <strong className="text-foreground">diagrams welcome</strong>.</li>
                <li className="flex gap-1.5"><span className="text-[#22d3ee] shrink-0 mt-0.5">›</span>What data does the contract need? What's on-chain vs oracle-fed vs off-chain?</li>
                <li className="flex gap-1.5"><span className="text-[#22d3ee] shrink-0 mt-0.5">›</span>Trigger events, state variables, key functions — show the shape, you don't have to write the code.</li>
                <li className="flex gap-1.5"><span className="text-[#22d3ee] shrink-0 mt-0.5">›</span>Security considerations: reentrancy? oracle dependencies? access control? front-running? Address explicitly.</li>
              </ul>
              <div className="p-2 bg-[#22d3ee]/10 rounded-lg text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">Bonus:</span> a pseudocode contract or a real Solidity sketch in the appendix scores well.
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ PART 3 — GOVERNANCE & COMPLIANCE ═══════ */}
        <div id="s7-p3-governance" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-widest mb-1">Part 3 of 4</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Governance & Compliance</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contracts blend code and law. Spell out how decisions get made, which regulations apply, and what risks you're carrying.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">

            {[
              {
                num: '3.1', title: 'Governance Framework', color: '#6366f1',
                intro: 'Decide how the system steers itself once it\'s live.',
                points: [
                  'How is the contract system governed day-to-day?',
                  'On-chain vs off-chain — which decisions live where?',
                  'DAOs, multisigs, or traditional governance — which fits?',
                  'Who can upgrade or pause the contract, and under what controls?',
                ],
              },
              {
                num: '3.2', title: 'Regulatory & Legal', color: '#8b5cf6',
                intro: 'Map the rules that apply before they bite you.',
                points: [
                  'Jurisdiction — where do users and data live?',
                  'Applicable regulations: MiCA, securities law, AML / KYC, sector rules.',
                  'Legal viability today — what licenses or approvals are needed?',
                  'GDPR if you touch personal data — store hashes, not raw fields.',
                ],
              },
              {
                num: '3.3', title: 'Risk Assessment', color: '#ED1C24',
                intro: 'Name what could go wrong — across three layers.',
                points: [
                  'Technical · contract bugs, oracle failures, congestion, key loss.',
                  'Business · adoption, competition, regulatory shift, market timing.',
                  'Operational · team dependencies, custody, incident response.',
                  'For each row: likelihood × impact + a mitigation plan.',
                ],
              },
            ].map(c => (
              <div key={c.num} className="p-5 bg-card border-2 rounded-xl flex flex-col gap-3" style={{ borderColor: c.color + '50' }}>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: c.color }}>{c.num}</div>
                  <div className="font-black text-sm text-foreground">{c.title}</div>
                </div>
                <div className="text-xs text-muted-foreground italic">{c.intro}</div>
                <ul className="space-y-2 text-xs text-foreground/90 flex-1">
                  {c.points.map((p, i) => (
                    <li key={i} className="flex gap-2 leading-snug">
                      <span style={{ color: c.color }} className="shrink-0 mt-0.5 font-bold">›</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>

        {/* ═══════ PART 4 — ROADMAP ═══════ */}
        <div id="s7-p4-roadmap" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest mb-1">Part 4 of 4</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Implementation Roadmap</h2>
            <p className="text-muted-foreground text-sm mt-1">Turn the design into a phased plan. We don't need calendar dates — we need to know you've thought through what comes first, what depends on what, and how you'd measure success.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-[1.6fr_1fr] gap-5 content-center">

            {/* Phases */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Phased plan</div>
              {[
                { tag: 'MVP',      color: '#6366f1', desc: 'Smallest version that proves the value prop. One use case, narrow scope, manual fallbacks allowed.' },
                { tag: 'v1',       color: '#8b5cf6', desc: 'Production-ready core. Audited contract, basic UI, real users, monitoring and incident response.' },
                { tag: 'Full',     color: '#39B54A', desc: 'Feature-complete product. Integrations with adjacent systems, governance live, ecosystem hooks (oracles, indexers, marketplaces).' },
              ].map(p => (
                <div key={p.tag} className="flex items-center gap-3 p-3 bg-card border rounded-xl" style={{ borderColor: p.color + '40' }}>
                  <div className="px-3 py-1 rounded-full font-black text-xs text-white shrink-0" style={{ backgroundColor: p.color }}>{p.tag}</div>
                  <div className="flex-1 text-xs text-muted-foreground">{p.desc}</div>
                </div>
              ))}
              <div className="p-3 bg-muted/40 border border-border rounded-xl text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">For each phase:</span> key milestones, dependencies between them, resources required (team composition + skills), and an <strong className="text-foreground">effort estimate</strong> (small / medium / large — no calendar dates required).
              </div>
            </div>

            {/* Success metrics */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Success metrics</div>
              <div className="p-4 bg-card border border-[#39B54A]/40 rounded-xl flex-1 flex flex-col gap-2">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  How will you know each phase succeeded? Pick metrics that map directly to the pain points in Part 1.
                </p>
                <ul className="space-y-1.5 text-xs text-muted-foreground mt-2">
                  {[
                    'Time-to-action (days → minutes)',
                    'Cost per transaction or per dispute',
                    'Error / fraud rate',
                    'Number of active participants / wallets',
                    'TVL or value flowing through the contract',
                    'Audit findings closed',
                  ].map(m => <li key={m} className="flex gap-1.5"><span className="text-[#39B54A] shrink-0">›</span>{m}</li>)}
                </ul>
                <div className="mt-auto p-2 bg-[#39B54A]/10 rounded-lg text-[11px] text-muted-foreground">
                  Pick 2–3 — not 10. Make them measurable.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ EVALUATION + SUBMISSION ═══════ */}
        <div id="s7-evaluation" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Evaluation & Submission</h2>
            <p className="text-muted-foreground text-sm mt-1">How we grade the project — and exactly what to hand in.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Eval criteria */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Evaluation criteria</div>
              {[
                { label: 'Problem-Solution fit',                       weight: '20%', color: '#6366f1', sub: 'Is blockchain genuinely the right solution? Is the problem clearly defined?' },
                { label: 'Implementation Realism & Technical Soundness', weight: '20%', color: '#8b5cf6', sub: 'Is the roadmap achievable? Are risks properly assessed? Is the architecture sound?' },
                { label: 'Business Viability',                         weight: '20%', color: '#39B54A', sub: 'Clear path to value creation and sustainability. Bonus: business plan & GTM strategy.' },
                { label: 'Governance & Compliance',                    weight: '15%', color: '#22d3ee', sub: 'Legal and governance considerations adequately addressed.' },
                { label: 'Presentation Quality',                       weight: '15%', color: '#f59e0b', sub: 'Document well-structured, clear, professional.' },
                { label: 'Stakeholder Analysis',                       weight: '10%', color: '#ec4899', sub: 'All stakeholders identified with clear benefit/cost analysis.' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-3 p-2.5 bg-card border border-border rounded-xl">
                  <div className="w-2 self-stretch rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-xs text-foreground">{c.label}</div>
                      <div className="font-black text-xs shrink-0" style={{ color: c.color }}>{c.weight}</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submission */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Submission requirements</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-card border border-border rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Format</div>
                  <div className="font-bold text-sm text-foreground mt-1">PDF</div>
                  <div className="text-[10px] text-muted-foreground">ideally</div>
                </div>
                <div className="p-3 bg-card border border-border rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Length</div>
                  <div className="font-bold text-sm text-foreground mt-1">3–5 pages</div>
                  <div className="text-[10px] text-muted-foreground">excl. appendices</div>
                </div>
                <div className="p-3 bg-card border border-border rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Presentation</div>
                  <div className="font-bold text-sm text-foreground mt-1">5 min + Q&A</div>
                </div>
                <div className="p-3 bg-card border border-border rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Appendices</div>
                  <div className="font-bold text-sm text-foreground mt-1">Optional</div>
                  <div className="text-[10px] text-muted-foreground">diagrams · pseudocode · models</div>
                </div>
              </div>

              <div className="p-4 bg-card border border-[#6366f1]/30 rounded-xl flex-1">
                <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-2">Team collaboration</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex gap-1.5"><span className="text-[#6366f1] shrink-0">›</span>Every team member contributes to research, writing, and presentation.</li>
                  <li className="flex gap-1.5"><span className="text-[#6366f1] shrink-0">›</span>Document individual contributions in an appendix.</li>
                  <li className="flex gap-1.5"><span className="text-[#6366f1] shrink-0">›</span>Apply project-management principles: assign roles, track progress, run internal reviews before submission.</li>
                </ul>
              </div>

              <div className="p-3 bg-[#ED1C24]/10 border border-[#ED1C24]/30 rounded-xl text-xs text-muted-foreground">
                <span className="font-bold text-[#ED1C24]">Deadline:</span> June 10, 2026 — submissions close. Final presentations on June 9.
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s7-quiz" className="h-full">
          <QuizSlide
            question="Your team is designing a smart contract for a crop-insurance payout: a sensor detects rainfall below a threshold, the contract automatically pays the farmer. The proposal earns full marks on Problem-Solution fit and Stakeholder Analysis, but the reviewer flags it as borderline. Which evaluation category most likely lost points — and what should you strengthen in the deliverable?"
            options={[
              { text: 'Presentation Quality (15%) — the deck wasn\'t polished enough; rewrite the executive summary.', correct: false },
              { text: 'Implementation Realism & Technical Soundness (20%) — the risk assessment should explicitly address oracle dependency on the rainfall sensor, the immutability problem if the sensor malfunctions, and the platform choice for reliable delivery.', correct: true },
              { text: 'Business Viability (20%) — the project needs a business plan and go-to-market strategy regardless of technical soundness.', correct: false },
              { text: 'Governance & Compliance (15%) — automated payouts always require explicit regulatory pre-approval before the project can be evaluated.', correct: false },
            ]}
            explanation="The Implementation Realism & Technical Soundness category (20%) covers risk assessment, architecture, and platform justification — exactly the gaps this design has. Specifically: (1) Oracle dependency — the rainfall sensor is a single point of failure; the deliverable must address how the project tolerates oracle compromise or downtime. (2) Immutability — if the sensor reports faulty data and the contract executes, the payout can't be reversed; what guard-rails or dispute windows exist? (3) Platform — does the chosen chain provide the data availability and finality this use case needs? Presentation Quality is about polish, Business Viability is about value-creation path, and Governance & Compliance — while important — wouldn't single-handedly flag a borderline verdict here. The right move is to strengthen Part 2 (Technical Design) and Part 3.3 (Risk Assessment)."
          />
        </div>

        </div>
      </div>
    </div>
  );
}
