import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { Brain } from 'lucide-react';

const chapters = [
  { id: 's4-decision-intro',     label: 'Should You Use SC?' },
  { id: 's4-decision-flow',      label: '🎯 Decision Flow' },
  { id: 's4-decision-yes',       label: 'When SC Make Sense' },
  { id: 's4-decision-no',        label: 'When to Rethink' },
  { id: 's4-adoption-intro',     label: 'Adoption Considerations' },
  { id: 's4-adoption-strategy',  label: 'Strategic Alignment' },
  { id: 's4-adoption-tech',      label: 'Tech Infrastructure' },
  { id: 's4-adoption-legal',     label: 'Legal & Regulatory' },
  { id: 's4-adoption-risk',      label: 'Risk Management' },
  { id: 's4-adoption-finance',   label: 'Financial Planning' },
  { id: 's4-opportunities',      label: 'Opportunities' },
  { id: 's4-challenges-academic',label: 'Challenges' },
  { id: 's4-strategies',         label: 'Competitive Strategy' },
  { id: 's4-quiz',               label: 'Quiz' },
  { id: 's4-takeaways',          label: 'Takeaways' },
];

// ─── Interactive Decision Flow ───────────────────────────────────────────────

type Verdict = 'sc' | 'hybrid' | 'db';

const QUESTIONS = [
  { id: 'parties',   q: 'Multiple distrusting parties need shared data?',                yes: 'sc',     no: 'db' },
  { id: 'auto',      q: 'Does automation create significant value (cost, speed, fraud)?', yes: 'sc',     no: 'db' },
  { id: 'inter',     q: 'Are intermediary costs high or disintermediation desirable?',    yes: 'sc',     no: 'db' },
  { id: 'immut',     q: 'Is immutability a feature, not a bug?',                          yes: 'sc',     no: 'hybrid' },
  { id: 'trans',     q: 'Is transparency important to all stakeholders?',                 yes: 'sc',     no: 'hybrid' },
  { id: 'priv',      q: 'Is privacy paramount (GDPR, HIPAA, sensitive data)?',            yes: 'hybrid', no: 'sc' },
  { id: 'reg',       q: 'Is your regulatory environment hostile or unclear?',             yes: 'hybrid', no: 'sc' },
  { id: 'flex',      q: 'Do you need flexibility to change rules frequently?',            yes: 'db',     no: 'sc' },
] as const;

const VERDICTS: Record<Verdict, { emoji: string; title: string; color: string; desc: string }> = {
  sc:     { emoji: '✅', title: 'Smart Contract',  color: '#39B54A', desc: 'Your use case fits the smart-contract pattern. Multi-party, automation-heavy, immutability-friendly. Proceed — but audit obsessively.' },
  hybrid: { emoji: '⚠️', title: 'Hybrid Approach',  color: '#f59e0b', desc: 'Pure on-chain is risky here. Use a hybrid: on-chain hashes + off-chain encrypted data, or permissioned chain with off-chain governance overrides.' },
  db:     { emoji: '❌', title: 'Traditional DB',    color: '#ED1C24', desc: 'A traditional database (with audit logs and proper access control) will be faster, cheaper, and more flexible. Skip blockchain — you don\'t need it.' },
};

function DecisionFlow() {
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no'>>({});
  const [done,    setDone]    = useState(false);
  const idx = Object.keys(answers).length;
  const current = QUESTIONS[idx];

  const verdict: Verdict | null = (() => {
    if (!done) return null;
    const counts: Record<Verdict, number> = { sc: 0, hybrid: 0, db: 0 };
    QUESTIONS.forEach(q => {
      const a = answers[q.id];
      if (!a) return;
      const v = (a === 'yes' ? q.yes : q.no) as Verdict;
      counts[v]++;
    });
    // Prefer most-frequent; tie-break: hybrid > db > sc
    const max = Math.max(counts.sc, counts.hybrid, counts.db);
    if (counts.hybrid >= 3) return 'hybrid';
    if (counts.db >= 4)     return 'db';
    if (counts.sc >= 4)     return 'sc';
    return 'hybrid';
  })();

  const answer = (a: 'yes' | 'no') => {
    const next = { ...answers, [current.id]: a };
    setAnswers(next);
    if (Object.keys(next).length === QUESTIONS.length) setDone(true);
  };

  const reset = () => { setAnswers({}); setDone(false); };

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🎯 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">Should you use a smart contract?</h2>
        <p className="text-muted-foreground text-sm">Answer 8 questions about your use case. Get a verdict — and the reasoning behind it.</p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4">

        {/* Progress */}
        <div className="shrink-0 flex items-center gap-1.5">
          {QUESTIONS.map((q, i) => (
            <div key={q.id} className="flex-1 h-1.5 rounded-full transition-colors"
              style={{ backgroundColor: i < idx || done ? '#6366f1' : 'var(--muted)' }} />
          ))}
          <div className="text-xs text-muted-foreground ml-2 w-12 text-right">{Math.min(idx + 1, QUESTIONS.length)} / {QUESTIONS.length}</div>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center">
          {!done && current ? (
            <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl w-full p-6 bg-card border border-[#6366f1]/30 rounded-2xl flex flex-col gap-5">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">Question {idx + 1}</div>
              <div className="text-2xl font-bold text-foreground">{current.q}</div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => answer('yes')}
                  className="px-5 py-3 rounded-xl bg-[#39B54A] text-white font-bold hover:bg-[#39B54A]/90 transition-colors">
                  ✓ Yes
                </button>
                <button onClick={() => answer('no')}
                  className="px-5 py-3 rounded-xl bg-[#ED1C24] text-white font-bold hover:bg-[#ED1C24]/90 transition-colors">
                  ✗ No
                </button>
              </div>
            </motion.div>
          ) : verdict ? (
            <AnimatePresence>
              <motion.div key="verdict" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl w-full p-8 bg-card border-4 rounded-2xl flex flex-col gap-4 text-center"
                style={{ borderColor: VERDICTS[verdict].color }}>
                <div className="text-6xl">{VERDICTS[verdict].emoji}</div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: VERDICTS[verdict].color }}>Verdict</div>
                <div className="text-3xl font-black text-foreground">{VERDICTS[verdict].title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">{VERDICTS[verdict].desc}</p>
                <button onClick={reset}
                  className="self-center mt-3 px-5 py-2 rounded-xl bg-muted text-sm font-semibold text-muted-foreground hover:bg-muted/80 transition-colors">
                  ↺ Start over
                </button>
              </motion.div>
            </AnimatePresence>
          ) : null}
        </div>

      </div>
    </div>
  );
}

export function SC_Section4() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={chapters} accentColor="#6366f1" />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 04"
            title="Critical Thinking"
            subtitle="When to use a smart contract — and when not to. Adoption considerations for serious business deployment."
            icon={<Brain className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ DECISION INTRO ═══════ */}
        <div id="s4-decision-intro" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">The Most Important Question</h2>
            <p className="text-muted-foreground text-sm mt-1">Before writing a single line of Solidity, answer this honestly.</p>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <div className="max-w-3xl text-center space-y-6">
              <div className="text-5xl lg:text-6xl font-black text-foreground leading-tight">
                Should you<br/>
                <span className="text-[#6366f1]">actually</span> use a<br/>
                smart contract?
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-5 bg-card border border-[#6366f1]/30 rounded-xl">
                  <div className="text-2xl mb-2">🚫</div>
                  <div className="font-bold text-foreground mb-1">Not every problem needs blockchain.</div>
                </div>
                <div className="p-5 bg-card border border-[#8b5cf6]/30 rounded-xl">
                  <div className="text-2xl mb-2">🚫</div>
                  <div className="font-bold text-foreground mb-1">Not every blockchain needs smart contracts.</div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm italic">
                Build a decision framework. Develop critical thinking. The next slide is interactive — try it.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════ INTERACTIVE DECISION FLOW ═══════ */}
        <div id="s4-decision-flow" className="h-full">
          <DecisionFlow />
        </div>

        {/* ═══════ WHEN SC MAKE SENSE ═══════ */}
        <div id="s4-decision-yes" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">When Smart Contracts Make Sense ✅</h2>
            <p className="text-muted-foreground text-sm mt-1">If most of these are true, blockchain is worth the engineering cost.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 content-center">
            {[
              { emoji: '👥', title: 'Multiple parties with trust issues', desc: 'No single entity is trusted by all. A shared, neutral source of truth pays for itself.' },
              { emoji: '⚡', title: 'Automation creates significant value', desc: 'Manual reconciliation, escrow, or settlement is the bottleneck — not just a nuisance.' },
              { emoji: '🔍', title: 'Transparency matters to stakeholders', desc: 'Customers, regulators, or investors need to verify behavior themselves — not take your word for it.' },
              { emoji: '💰', title: 'Intermediary costs are high', desc: 'Brokers, lawyers, escrow agents, clearinghouses — disintermediation produces real savings.' },
              { emoji: '🔓', title: 'Disintermediation is desirable', desc: 'Removing a gatekeeper improves the product (e.g. global DEXs vs centralized brokers).' },
              { emoji: '🔒', title: 'Immutability is a feature', desc: 'Audit trails, ownership records, votes — you WANT them to be unchangeable forever.' },
              { emoji: '🌍', title: 'Asset ownership needs to be portable', desc: 'Users move between platforms, jurisdictions, or wallets. Their assets shouldn\'t be locked in.' },
            ].map(p => (
              <div key={p.title} className="flex items-start gap-3 p-4 bg-card border border-[#39B54A]/25 rounded-xl">
                <div className="size-10 rounded-xl bg-[#39B54A]/15 flex items-center justify-center text-2xl shrink-0">{p.emoji}</div>
                <div>
                  <div className="font-bold text-sm text-foreground mb-1">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ WHEN TO RETHINK ═══════ */}
        <div id="s4-decision-no" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">When to Rethink Smart Contracts ❌</h2>
            <p className="text-muted-foreground text-sm mt-1">Any of these is a red flag. Multiple = a database is almost certainly the better answer.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 content-center">
            {[
              { emoji: '🏢', title: 'Single party can be trusted', desc: 'You ARE the trusted intermediary — like a stock exchange clearing trades. A database is simpler.' },
              { emoji: '⚡', title: 'Centralized is cheaper and faster', desc: 'For internal workflows, a Postgres database with proper audit logs beats a blockchain on every metric.' },
              { emoji: '🔄', title: 'Flexibility to change rules is critical', desc: 'If business logic evolves weekly, immutability becomes a liability rather than an asset.' },
              { emoji: '📦', title: 'Off-chain data drives most logic', desc: 'If 80% of your inputs come from oracles or APIs, the trust assumption sits there — not on-chain.' },
              { emoji: '🤐', title: 'Privacy is paramount', desc: 'Public chains expose everything. GDPR, HIPAA, trade secrets — these conflict directly with public ledgers.' },
              { emoji: '⚖️', title: 'Regulatory environment is hostile', desc: 'If your jurisdiction prohibits or heavily restricts on-chain operations, fighting that is a strategic mistake.' },
              { emoji: '🧑', title: 'Users aren\'t tech-savvy enough', desc: 'Wallet UX, gas fees, seed phrases — these still cripple adoption for mainstream consumers.' },
              { emoji: '💸', title: 'No one will pay for development', desc: 'Smart contract dev + audit costs are 5–10× a typical web app. If there\'s no clear ROI, don\'t start.' },
            ].map(p => (
              <div key={p.title} className="flex items-start gap-3 p-4 bg-card border border-[#ED1C24]/25 rounded-xl">
                <div className="size-10 rounded-xl bg-[#ED1C24]/15 flex items-center justify-center text-2xl shrink-0">{p.emoji}</div>
                <div>
                  <div className="font-bold text-sm text-foreground mb-1">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ ADOPTION INTRO — 5 PILLARS ═══════ */}
        <div id="s4-adoption-intro" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Key Considerations for Business Adoption</h2>
            <p className="text-muted-foreground text-sm mt-1">Introducing smart contracts isn't just a technology project — it's an organizational change.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-5 gap-3 content-center">
            {[
              { num: '01', emoji: '🎯', label: 'Strategic Alignment',     color: '#6366f1', desc: 'Use case clarity, success metrics, exec buy-in, staff training' },
              { num: '02', emoji: '🏗', label: 'Technical Infrastructure', color: '#8b5cf6', desc: 'Scalable platform, legacy integration, IT readiness' },
              { num: '03', emoji: '⚖️', label: 'Legal & Regulatory',       color: '#22d3ee', desc: 'Enforceability, jurisdictional compliance' },
              { num: '04', emoji: '🛡', label: 'Risk Management',          color: '#ED1C24', desc: 'Audits, incident response, contract immutability planning' },
              { num: '05', emoji: '💰', label: 'Financial Planning',       color: '#39B54A', desc: 'Upfront costs, ongoing gas, ROI timeline' },
            ].map(p => (
              <div key={p.num} className="p-4 bg-card border rounded-xl flex flex-col gap-2"
                style={{ borderColor: p.color + '40' }}>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: p.color }}>{p.num}</div>
                  <div className="text-2xl">{p.emoji}</div>
                </div>
                <div className="font-bold text-sm text-foreground">{p.label}</div>
                <div className="text-xs text-muted-foreground leading-snug">{p.desc}</div>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground italic">
            Smart Contracts have huge market potential. But they are not plug-and-play — businesses need strategic purpose, infrastructure, skills, compliance, risk controls, and resources. The next 5 chapters cover each pillar.
          </div>
        </div>

        {/* ═══════ STRATEGIC ALIGNMENT ═══════ */}
        <div id="s4-adoption-strategy" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-1">Pillar 01</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Strategic Alignment</h2>
            <p className="text-muted-foreground text-sm mt-1">Adopting smart contracts must serve a clear business purpose and align with company strategy.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            {[
              { title: 'Clarify the use case', desc: 'Pinpoint where a smart contract solves a real pain point — automating a manual workflow, removing a costly intermediary, or building shared truth across distrusting parties. Align this with the company\'s strategic priorities — not the other way around.', color: '#6366f1' },
              { title: 'Define success metrics', desc: 'Set specific, measurable targets: cost reduction (e.g. 30% in dispute resolution), speed improvement (e.g. days → minutes), error rate reduction. Forms the basis of a business case for stakeholders.', color: '#8b5cf6' },
              { title: 'Secure executive buy-in', desc: 'Demonstrate how smart contracts support the broader business vision — disintermediation, transparency, automation. Without C-suite support, projects stall when the first technical hurdle hits.', color: '#22d3ee' },
              { title: 'Train staff', desc: 'Educate employees about blockchain basics and the specifics of the chosen platform/tooling. Provide hands-on training for those directly using or supporting smart contracts. This is non-trivial — budget for it.', color: '#39B54A' },
            ].map(c => (
              <div key={c.title} className="p-5 bg-card border rounded-xl flex flex-col gap-3" style={{ borderColor: c.color + '30' }}>
                <div className="font-bold text-sm" style={{ color: c.color }}>{c.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ TECHNICAL INFRASTRUCTURE ═══════ */}
        <div id="s4-adoption-tech" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest mb-1">Pillar 02</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Technical Infrastructure</h2>
            <p className="text-muted-foreground text-sm mt-1">Implementing smart contracts demands a solid technical foundation — platform, integration, and IT capacity.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { title: 'Scalable platform', emoji: '⚡', desc: 'Choose a chain that meets your throughput, latency, and finality needs (Section 6 covers this in depth). EVM compatibility = vast tooling ecosystem.', color: '#8b5cf6' },
              { title: 'Legacy integration', emoji: '🔌', desc: 'Smart contracts must talk to ERPs, CRMs, and SaaS systems. Plan middleware (The Graph, Moralis), event listeners, and data sync from day one.', color: '#6366f1' },
              { title: 'IT capacity & ops', emoji: '🛠', desc: 'You need on-call engineers who understand blockchain incident response. Hiring or training them takes months — start before you deploy.', color: '#22d3ee' },
              { title: 'Identity & access', emoji: '🔐', desc: 'On-chain != anonymous in business contexts. Plan KYC, role-based access, and key management (HSMs, multisigs) ahead of any real deployment.', color: '#39B54A' },
              { title: 'Data architecture', emoji: '💾', desc: 'Decide on-chain vs off-chain split early. Sensitive data NEVER lives on a public chain — use hashes + IPFS + encryption.', color: '#f59e0b' },
              { title: 'Monitoring & analytics', emoji: '📊', desc: 'Block explorers, indexers, and dashboards (Dune, The Graph) — these are the prod tools. Set them up like you would any SRE stack.', color: '#ec4899' },
            ].map(c => (
              <div key={c.title} className="p-4 bg-card border rounded-xl flex flex-col gap-2" style={{ borderColor: c.color + '30' }}>
                <div className="flex items-center gap-2">
                  <div className="size-9 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: c.color + '15' }}>{c.emoji}</div>
                  <div className="font-bold text-sm" style={{ color: c.color }}>{c.title}</div>
                </div>
                <div className="text-xs text-muted-foreground leading-snug">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ LEGAL & REGULATORY ═══════ */}
        <div id="s4-adoption-legal" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-widest mb-1">Pillar 03</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Legal & Regulatory</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contracts blend code and law — raising challenges around enforceability, jurisdiction, and compliance.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#22d3ee]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#22d3ee]">Things to engage legal counsel on early</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Is this contract a "contract" under your jurisdiction's law?</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Does the token issued constitute a security (Howey test in US, MiCA in EU)?</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>How do you handle disputes? Is there a "kill switch" or arbitration mechanism?</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>What jurisdictions can users come from? KYC/AML implications?</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Data privacy: does the chain store anything that triggers GDPR?</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Tax treatment: where does revenue accrue? Where do users owe taxes?</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#22d3ee]/10 to-transparent border border-[#22d3ee]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#22d3ee]">Cross-jurisdictional reality</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                With global transactions, what's valid in one country may be illegal in another. A token sale legal in Singapore may attract SEC enforcement in the US. A contract enforceable in the EU may be unenforceable in countries with no DLT framework.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1.5 mt-1">
                <li className="flex gap-1.5"><span className="text-[#22d3ee]">›</span>Geo-fence cautiously — sanctions compliance is non-negotiable</li>
                <li className="flex gap-1.5"><span className="text-[#22d3ee]">›</span>EU MiCA (2024) sets a global precedent — expect emulation</li>
                <li className="flex gap-1.5"><span className="text-[#22d3ee]">›</span>"Code is law" was rejected by courts in The DAO — plan for human override paths</li>
              </ul>
              <div className="p-2 bg-[#22d3ee]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                <span className="font-semibold text-foreground">Practical:</span> early legal review is cheaper than late legal fixes. Engage counsel before you write the first line of contract code.
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ RISK MANAGEMENT ═══════ */}
        <div id="s4-adoption-risk" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#ED1C24] uppercase tracking-widest mb-1">Pillar 04</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Risk Management</h2>
            <p className="text-muted-foreground text-sm mt-1">Once deployed, smart contracts are typically immutable and execute automatically. There is little room for error.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { title: 'Pre-deployment audits', emoji: '🔍', desc: 'At least one — ideally two independent — security audits before mainnet. Budget $20k–$100k+ depending on contract complexity.', color: '#ED1C24' },
              { title: 'Formal verification', emoji: '🧮', desc: 'For high-value contracts, formal verification (Certora, Halmos) proves properties mathematically — beyond what audits catch.', color: '#f59e0b' },
              { title: 'Bug bounty program', emoji: '💰', desc: 'Immunefi and similar programs offer ongoing crowd-sourced security review. Treat bounties as a cost of doing business.', color: '#8b5cf6' },
              { title: 'Upgrade pattern (carefully)', emoji: '⚙️', desc: 'Proxy contracts allow logic upgrades — but introduce admin keys. Use only when necessary; protect with timelocks and multisig.', color: '#6366f1' },
              { title: 'Incident response plan', emoji: '🚨', desc: 'When (not if) something goes wrong, who pauses the contract, contacts users, communicates with media, and coordinates with exchanges?', color: '#22d3ee' },
              { title: 'Monitor in production', emoji: '📡', desc: 'Set up real-time alerts for suspicious flows, unusual gas patterns, or governance attacks. Forta, OpenZeppelin Defender automate this.', color: '#39B54A' },
            ].map(c => (
              <div key={c.title} className="p-4 bg-card border rounded-xl flex flex-col gap-2" style={{ borderColor: c.color + '30' }}>
                <div className="flex items-center gap-2">
                  <div className="size-9 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: c.color + '15' }}>{c.emoji}</div>
                  <div className="font-bold text-sm" style={{ color: c.color }}>{c.title}</div>
                </div>
                <div className="text-xs text-muted-foreground leading-snug flex-1">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ FINANCIAL PLANNING ═══════ */}
        <div id="s4-adoption-finance" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest mb-1">Pillar 05</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Financial / Resource Planning</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contract adoption demands solid financial planning. Long-term automation savings can be significant — but upfront costs are real.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">Upfront costs (one-time)</div>
              {[
                { label: 'Infrastructure setup', range: '$5k–$50k', desc: 'Nodes, monitoring, deployment pipeline, dev environments' },
                { label: 'Smart contract development', range: '$30k–$300k', desc: 'Architecture, Solidity dev, testing — depends heavily on complexity' },
                { label: 'Security audits', range: '$20k–$150k', desc: 'Independent firms (Trail of Bits, OpenZeppelin, ConsenSys Diligence)' },
                { label: 'Legal & regulatory consultation', range: '$10k–$100k+', desc: 'Especially for regulated industries — financial, healthcare, government' },
                { label: 'Staff training', range: '$5k–$50k', desc: 'Workshops, certifications, time-off-task during onboarding' },
              ].map(c => (
                <div key={c.label} className="p-3 bg-card border border-[#39B54A]/25 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-foreground">{c.label}</div>
                    <div className="font-mono text-xs text-[#39B54A]">{c.range}</div>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">{c.desc}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">Ongoing costs (recurring)</div>
              {[
                { label: 'Gas fees', range: 'Variable', desc: 'Pay-per-transaction; can spike 10–100× during congestion. L2s help significantly.' },
                { label: 'Node infrastructure', range: '$200–$5k/mo', desc: 'Self-hosted full nodes, or managed (Infura, Alchemy, QuickNode)' },
                { label: 'Maintenance & monitoring', range: '$5k–$30k/mo', desc: 'On-call engineers, alerts, incident response retainer' },
                { label: 'Bug bounty program', range: '$10k–$1M+ pool', desc: 'Funded reserve to pay out responsibly disclosed vulnerabilities' },
                { label: 'Compliance & reporting', range: '$5k–$50k/mo', desc: 'KYC providers, AML monitoring, tax reporting tools' },
              ].map(c => (
                <div key={c.label} className="p-3 bg-card border border-[#6366f1]/25 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-foreground">{c.label}</div>
                    <div className="font-mono text-xs text-[#6366f1]">{c.range}</div>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0 mt-3 p-3 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground italic">
            Ranges are illustrative and vary widely by region, complexity, and specific requirements. Use them as a starting point for conversations with vendors and finance.
          </div>
        </div>

        {/* ═══════ OPPORTUNITIES ═══════ */}
        <div id="s4-opportunities" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Opportunities</h2>
            <p className="text-muted-foreground text-sm mt-1">Where smart contracts demonstrably outperform legacy approaches — backed by academic research.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">Operational opportunities</div>
              {[
                { label: 'Cost reduction', desc: 'Eliminate intermediaries, automate manual reconciliation, reduce escrow and dispute costs' },
                { label: 'Speed of execution', desc: 'Settle in seconds rather than days. Cross-border value moves at internet speed.' },
                { label: 'Transparency & auditability', desc: 'Every state change is recorded permanently — regulatory examinations become simpler.' },
                { label: 'Programmable cash flows', desc: 'Encode business rules directly into payments — escrow, royalties, and milestones automate themselves.' },
              ].map(o => (
                <div key={o.label} className="p-3 bg-card border border-[#39B54A]/25 rounded-xl">
                  <div className="font-bold text-sm text-foreground">{o.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{o.desc}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">Strategic opportunities</div>
              {[
                { label: 'New business models', desc: 'DAOs, tokenized assets, fractional ownership, and machine-to-machine payments — none possible without smart contracts.' },
                { label: 'Network effects', desc: 'Composability: each new contract amplifies the value of every other contract on the same chain.' },
                { label: 'Global reach', desc: 'Permissionless markets reach users in any jurisdiction with internet — no banking partnerships required.' },
                { label: 'Trust without intermediaries', desc: 'Multi-party agreements between strangers — fundamentally new economic primitive.' },
              ].map(o => (
                <div key={o.label} className="p-3 bg-card border border-[#6366f1]/25 rounded-xl">
                  <div className="font-bold text-sm text-foreground">{o.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{o.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0 mt-3 text-[10px] text-muted-foreground italic">
            Sources: Nzuva (2019); Perlman (2019); Dal Mas, Dicuonzo, Massaro & Dell'Atti (2019).
          </div>
        </div>

        {/* ═══════ CHALLENGES (ACADEMIC) ═══════ */}
        <div id="s4-challenges-academic" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Challenges</h2>
            <p className="text-muted-foreground text-sm mt-1">The systemic obstacles to mainstream smart contract adoption — as documented in research.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { emoji: '⚙️', title: 'Technical complexity', desc: 'Solidity, EVM gas mechanics, and asynchronous execution flatten the developer pool. Few engineers know this stack deeply.', color: '#6366f1' },
              { emoji: '⚖️', title: 'Regulatory uncertainty', desc: 'Securities, tax, KYC, and consumer-protection laws are still evolving. Compliance is a moving target across jurisdictions.', color: '#8b5cf6' },
              { emoji: '🐛', title: 'Security vulnerabilities', desc: 'Reentrancy, oracle manipulation, and access-control bugs have led to billions in losses. Audits are mandatory, not optional.', color: '#ED1C24' },
              { emoji: '⚡', title: 'Scalability limits', desc: 'Public L1s cap throughput. L2s help but introduce their own complexity (sequencers, fraud proofs, withdrawal delays).', color: '#f59e0b' },
              { emoji: '🤝', title: 'Interoperability', desc: 'Cross-chain bridges remain fragile and have been a major source of exploits. Single-chain ecosystems are siloed.', color: '#22d3ee' },
              { emoji: '🧑', title: 'User experience', desc: 'Wallet setup, key management, gas fees, and confirmation times all create friction that mainstream users won\'t tolerate.', color: '#39B54A' },
            ].map(c => (
              <div key={c.title} className="p-4 bg-card border rounded-xl flex flex-col gap-2" style={{ borderColor: c.color + '30' }}>
                <div className="text-3xl">{c.emoji}</div>
                <div className="font-bold text-sm" style={{ color: c.color }}>{c.title}</div>
                <div className="text-xs text-muted-foreground leading-snug">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-3 text-[10px] text-muted-foreground italic">
            Sources: Khan et al. (2021); Virani (2024); Perlman (2019).
          </div>
        </div>

        {/* ═══════ STRATEGIES — APPLIED ═══════ */}
        <div id="s4-strategies" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Strategies for Competitive Advantage</h2>
            <p className="text-muted-foreground text-sm mt-1">How real companies turn smart contracts into a durable strategic moat — applied examples.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { name: 'Compound', emoji: '🏦', moat: 'Trustless lending', desc: 'Eliminates intermediaries; on-chain interest rates set algorithmically. Capital efficiency that legacy banks cannot match.', color: '#6366f1' },
              { name: 'We.trade', emoji: '🌐', moat: 'B2B trade finance', desc: 'Bank consortium platform built on Hyperledger Fabric for SME cross-border trade. Eventually shut down — illustrating that "consortium" governance is hard.', color: '#8b5cf6' },
              { name: 'Uniswap', emoji: '🦄', moat: 'Permissionless liquidity', desc: 'Anyone can list any token instantly. AMM model removes order-book complexity. Deepest moat: composability with the rest of DeFi.', color: '#39B54A' },
              { name: 'Propy', emoji: '🏡', moat: 'Real-estate friction', desc: 'NFT deeds for legitimate property sales. Compresses 30-day closing into hours where law allows.', color: '#22d3ee' },
              { name: 'AXA Fizzy', emoji: '✈️', moat: 'Parametric insurance', desc: 'Flight delay insurance with automatic payouts via Ethereum + flight oracle. Eventually wound down — but proved the parametric pattern.', color: '#f59e0b' },
              { name: 'Home Depot', emoji: '🛠', moat: 'Supply chain truth', desc: 'Hyperledger Fabric for supplier disputes. Reduced resolution time from weeks to hours — competitive advantage in operating margin.', color: '#ec4899' },
            ].map(s => (
              <div key={s.name} className="p-4 bg-card border rounded-xl flex flex-col gap-2" style={{ borderColor: s.color + '30' }}>
                <div className="flex items-center gap-2">
                  <div className="text-3xl">{s.emoji}</div>
                  <div>
                    <div className="font-black text-sm text-foreground">{s.name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{s.moat}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground leading-snug flex-1">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-3 text-[10px] text-muted-foreground italic">
            Sources: IBM (2017, 2019); Gemini Cryptopedia (2025); Eurofinance (2024).
          </div>
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s4-quiz" className="h-full">
          <QuizSlide
            question="A bank wants to issue digital bonds. Their internal audit team holds the master record. They have 5 trusted institutional buyers, all KYC'd. Settlement is currently T+2. Which is the strongest reason to STILL choose a smart contract on a public blockchain?"
            options={[
              { text: 'Reduces internal audit costs because the blockchain replaces the audit team entirely.', correct: false },
              { text: 'Cross-border interoperability — buyers in different jurisdictions can settle without correspondent banks, even if all are KYC\'d.', correct: true },
              { text: 'Public blockchains are cheaper than databases for any volume of transactions.', correct: false },
              { text: 'Smart contracts cannot be hacked, so they\'re inherently more secure than the bank\'s database.', correct: false },
            ]}
            explanation="The first three options reflect common misconceptions: (1) blockchains do NOT replace audit functions — auditors still verify business logic, just with better evidence. (2) Public chains have ongoing gas costs that exceed databases for high-volume internal use. (3) Smart contracts are routinely hacked — security is a discipline, not a property. The legitimate reason in this scenario is cross-jurisdictional settlement: even with KYC'd parties, removing correspondent banks reduces friction, FX costs, and time. This is exactly why Santander chose Ethereum for their $20M bond. If the bond stayed entirely within one jurisdiction with one issuer and trusted buyers, a database would win — but the moment you span borders, blockchain unlocks real value."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s4-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 04 — Key Takeaways"
            takeaways={[
              'Not every problem needs blockchain — start by asking "who do we not trust?" If the answer is "no one," use a database',
              '7 signals favoring smart contracts: multi-party, automation value, transparency, intermediary cost, disintermediation, immutability-as-feature, portable ownership',
              '8 red flags: single trusted party, centralized is faster/cheaper, flexibility critical, off-chain data dominates, privacy paramount, hostile regulation, low user tech literacy, no clear ROI',
              '5-pillar adoption framework: Strategic Alignment · Technical Infrastructure · Legal & Regulatory · Risk Management · Financial Planning',
              'Strategic: clear use case, success metrics, exec buy-in, staff training — without these, the project will stall',
              'Legal: engage counsel BEFORE writing code. Securities classification, jurisdictional reach, GDPR all matter from day one',
              'Risk: audits are non-optional. Bug bounties, formal verification, incident response — all baseline requirements',
              'Cost reality: $50k–$500k+ to deploy a serious contract. Plan for ongoing gas, monitoring, and maintenance',
              'Real strategic advantage comes from removing genuine intermediation pain — not from "doing blockchain"',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
