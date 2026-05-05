import { SectionNav } from '../../components/navigation/SectionNav';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Users } from 'lucide-react';

const chapters = [
  { id: 's7-brief',    label: 'Project Brief' },
  { id: 's7-template', label: 'Deliverable Template' },
  { id: 's7-quiz',     label: 'Quiz' },
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
            subtitle="Design a smart contract business application — from use case to risk assessment"
            icon={<Users className="size-20 text-[#6366f1]" />}
            gradient="from-[#39B54A] to-[#6366f1]"
          />
        </div>

        {/* Brief */}
        <div id="s7-brief" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Project Brief</h2>
            <p className="text-muted-foreground text-sm mt-1">You have one goal: make the case for (or against) a smart contract in a real business context.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">What your team must do</div>
              {[
                { emoji: '🎯', title: 'Choose an industry', desc: 'Finance, supply chain, healthcare, real estate, government… pick a domain you know.' },
                { emoji: '🔍', title: 'Identify the pain point', desc: 'What current process is slow, expensive, or requires too much trust between parties?' },
                { emoji: '📐', title: 'Design the contract', desc: 'Define inputs, outputs, conditions, and who the parties are. You do not need to write code.' },
                { emoji: '⚠️', title: 'Assess the risks', desc: 'Oracle problem? Immutability risks? Legal enforceability? What could go wrong?' },
                { emoji: '📊', title: 'Present your case', desc: '10-minute presentation to the class. Convince us — or convince us not to build it.' },
              ].map(s => (
                <div key={s.title} className="flex items-start gap-3 p-3 bg-card border border-[#6366f1]/20 rounded-xl">
                  <div className="text-xl shrink-0">{s.emoji}</div>
                  <div>
                    <div className="font-bold text-sm text-foreground mb-0.5">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Evaluation criteria</div>
              {[
                { label: 'Problem clarity', weight: '20%', color: '#6366f1' },
                { label: 'Smart contract design', weight: '25%', color: '#8b5cf6' },
                { label: 'Stakeholder mapping', weight: '20%', color: '#39B54A' },
                { label: 'Risk & limitation analysis', weight: '25%', color: '#ED1C24' },
                { label: 'Presentation quality', weight: '10%', color: '#f59e0b' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl">
                  <div className="w-2 h-full rounded-full shrink-0 self-stretch" style={{ backgroundColor: c.color }} />
                  <div className="flex-1 font-medium text-sm text-foreground">{c.label}</div>
                  <div className="font-black text-sm" style={{ color: c.color }}>{c.weight}</div>
                </div>
              ))}

              <div className="flex-1 p-4 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl">
                <div className="font-bold text-sm text-[#6366f1] mb-2">📅 Timeline</div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Form teams of 3–4 during this session</li>
                  <li>• 1 week to research and design</li>
                  <li>• 10-min presentation + 5-min Q&A</li>
                  <li>• Written deliverable due same day as presentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Template */}
        <div id="s7-template" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Deliverable Template</h2>
            <p className="text-muted-foreground text-sm mt-1">Structure your presentation around these five sections.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
            {[
              {
                num: '01', title: 'Executive Summary', color: '#6366f1',
                fields: ['Industry selected', 'Problem statement (2 sentences)', 'Proposed smart contract (1 sentence)', 'Key benefit vs status quo'],
              },
              {
                num: '02', title: 'Stakeholder Map', color: '#8b5cf6',
                fields: ['Who are the parties?', 'What does each party provide?', 'What does each party receive?', 'Who controls deployment?'],
              },
              {
                num: '03', title: 'Contract Design', color: '#39B54A',
                fields: ['Input conditions', 'Output / execution logic', 'State variables', 'Trigger events'],
              },
              {
                num: '04', title: 'Risk Analysis', color: '#ED1C24',
                fields: ['Oracle dependencies', 'Immutability concerns', 'Legal enforceability', 'Attack surface'],
              },
              {
                num: '05', title: 'Adoption Roadmap', color: '#f59e0b',
                fields: ['Technical requirements', 'Regulatory / compliance', 'Integration with legacy systems', 'Estimated timeline & cost'],
              },
              {
                num: '🏁', title: 'Recommendation', color: '#6366f1',
                fields: ['Build it — why?', 'Don\'t build it — why not?', 'What would change your mind?', 'Open questions for the class'],
              },
            ].map(s => (
              <div key={s.num} className="p-4 bg-card border border-border rounded-xl flex flex-col" style={{ borderColor: s.color + '30' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0" style={{ backgroundColor: s.color }}>
                    {s.num}
                  </div>
                  <div className="font-bold text-sm text-foreground">{s.title}</div>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {s.fields.map(f => (
                    <li key={f} className="text-xs text-muted-foreground flex gap-1.5">
                      <span style={{ color: s.color }}>›</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s7-quiz" className="h-full">
          <QuizSlide
            question="Your team is designing a smart contract for a crop insurance payout: a sensor detects rainfall below a threshold, the contract automatically pays the farmer. Which section of the deliverable template carries the MOST weight in your evaluation, and what must it address?"
            options={[
              { text: 'Executive Summary (20%) — clearly state the problem, the proposed contract, and the key benefit in two sentences.', correct: false },
              { text: 'Risk & Limitation Analysis (25%) — identify the oracle dependency on the rainfall sensor, immutability concerns if the sensor malfunctions, and legal enforceability of automated payouts.', correct: true },
              { text: 'Adoption Roadmap (not separately weighted) — define the technical requirements and regulatory compliance path for the insurance industry.', correct: false },
              { text: 'Presentation Quality (10%) — deliver a compelling 10-minute pitch with clear visuals and confident Q&A responses.', correct: false },
            ]}
            explanation="Risk & Limitation Analysis is tied for highest weight at 25% — equal to Smart Contract Design. For this specific use case, the risk section must address: (1) Oracle dependency — the rainfall sensor is a single point of failure; if it is compromised or malfunctions, the contract pays incorrectly and there is no recourse. (2) Immutability — if a sensor reports faulty data and the contract executes, the payout cannot be reversed. (3) Legal enforceability — does an automated payout satisfy the legal definition of an insurance claim settlement in the relevant jurisdiction? These risks are what distinguish a thoughtful smart contract design from a naive one."
          />
        </div>

        </div>
      </div>
    </div>
  );
}
