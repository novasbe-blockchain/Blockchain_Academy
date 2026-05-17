import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { DiscussionSlide } from '../../components/templates/DiscussionSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { ShieldAlert, ArrowRight } from 'lucide-react';

const chapters = [
  { id: 's3-categories',   label: 'Risk Categories' },
  { id: 's3-matrix',       label: 'Risk Matrix' },
  { id: 's3-technical',    label: 'Technical Risks' },
  { id: 's3-regulatory',   label: 'Regulatory Risks' },
  { id: 's3-audit',        label: 'Audit Process' },
  { id: 's3-mitigation',   label: 'Mitigation Strategies' },
  { id: 's3-discussion',   label: 'Discussion' },
  { id: 's3-quiz',         label: 'Quiz' },
  { id: 's3-takeaways',    label: 'Takeaways' },
];

export function PM_Section3() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SESSION 03"
            title="Risk Management in Blockchain Projects"
            subtitle="Identifying, assessing, and mitigating the unique risks that make blockchain projects high-stakes"
            icon={<ShieldAlert className="size-20 text-[#ef4444]" />}
            gradient="from-[#ef4444] to-[#f97316]"
          />
        </div>

        {/* ═══════ RISK CATEGORIES ═══════ */}
        <div id="s3-categories" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ef4444]">Session 03</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Risk Categories in Blockchain Projects</h2>
            <p className="text-sm text-muted-foreground">Blockchain introduces risk dimensions that do not exist in traditional software projects — categorize them before you can manage them.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                category: 'Technical Risks',
                color: '#6366f1',
                icon: '💻',
                desc: 'Code is permanent. Bugs in deployed smart contracts cannot be patched — only mitigated through new deployments or architectural workarounds.',
                risks: [
                  'Smart contract bugs (reentrancy, overflow)',
                  'Oracle manipulation and failure',
                  'Protocol upgrade breaking changes',
                  'Private key compromise',
                  'Gas price spikes blocking operations',
                ],
                focus: 'Mandatory security audit before every mainnet deployment.',
              },
              {
                category: 'Regulatory Risks',
                color: '#ef4444',
                icon: '⚖️',
                desc: 'Regulators are catching up fast — and often retroactively. Token classification, privacy law, and AML requirements are all moving targets.',
                risks: [
                  'Token classified as unregistered security',
                  'GDPR conflict with on-chain immutability',
                  'Cross-border jurisdiction conflicts',
                  'AML / KYC compliance gaps',
                  'Regulatory changes post-launch',
                ],
                focus: 'Get a legal opinion on token classification before any public issuance.',
              },
              {
                category: 'Adoption Risks',
                color: '#f97316',
                icon: '📉',
                desc: 'The best architecture fails without stakeholder buy-in, network effects, and a user experience that real people can actually navigate.',
                risks: [
                  'Consortium members withdraw from the network',
                  'Network effects fail to materialize',
                  'UX too complex for target audience',
                  'Competing standard emerges mid-project',
                  'Token volatility undermining incentives',
                ],
                focus: 'Secure minimum viable consortium commitment before launch.',
              },
              {
                category: 'Operational Risks',
                color: '#eab308',
                icon: '🔧',
                desc: 'Decentralization creates operational complexity. You depend on infrastructure, teams, and governance processes you do not fully control.',
                risks: [
                  'Dependency on third-party L1/L2 availability',
                  'Key person risk in small core teams',
                  'Governance gridlock on critical decisions',
                  'Insufficient node decentralization',
                  'Incident response without a kill switch',
                ],
                focus: 'Define key person redundancy and incident response from day one.',
              },
            ].map(cat => (
              <div key={cat.category} className="flex flex-col rounded-xl border-2 bg-card overflow-hidden" style={{ borderColor: cat.color + '40' }}>
                <div className="h-1 w-full shrink-0" style={{ backgroundColor: cat.color }} />
                <div className="flex flex-col flex-1 p-4 lg:p-5">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <h3 className="font-bold text-sm lg:text-base mb-2" style={{ color: cat.color }}>{cat.category}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{cat.desc}</p>
                  <ul className="space-y-2 flex-1">
                    {cat.risks.map(r => (
                      <li key={r} className="flex gap-2 text-xs lg:text-sm text-muted-foreground">
                        <span
                          className="shrink-0 size-4 rounded-full flex items-center justify-center text-white text-[9px] font-black mt-0.5"
                          style={{ backgroundColor: cat.color }}
                        >!</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-border shrink-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">PM Focus</p>
                    <p className="text-xs lg:text-sm font-semibold text-foreground leading-snug">{cat.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ RISK MATRIX ═══════ */}
        <div id="s3-matrix" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ef4444]">Session 03</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Risk Assessment Matrix</h2>
            <p className="text-sm text-muted-foreground">Prioritize risks by their likelihood and impact. Blockchain projects tend to have a higher concentration of high-impact / low-probability events.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
            {/* Matrix */}
            <div className="relative border border-border rounded-xl overflow-hidden bg-card">
              <div className="grid grid-cols-3 grid-rows-3 h-full">
                {/* Row headers + cells */}
                {[
                  { impact: 'HIGH', prob: 'HIGH', bg: '#ef4444', label: 'Critical — Act Now', items: ['Smart contract exploit', 'Regulatory shutdown'] },
                  { impact: 'HIGH', prob: 'MED', bg: '#f97316', label: 'High — Mitigate', items: ['Protocol upgrade', 'Audit findings'] },
                  { impact: 'HIGH', prob: 'LOW', bg: '#eab308', label: 'Significant — Monitor', items: ['GDPR conflict', 'L1 hard fork'] },
                  { impact: 'MED', prob: 'HIGH', bg: '#f97316', label: 'High — Mitigate', items: ['Consortium exit', 'Gas price spike'] },
                  { impact: 'MED', prob: 'MED', bg: '#eab308', label: 'Moderate — Plan', items: ['Oracle failure', 'UX adoption'] },
                  { impact: 'MED', prob: 'LOW', bg: '#39B54A', label: 'Low — Accept', items: ['Token review', 'Governance dispute'] },
                  { impact: 'LOW', prob: 'HIGH', bg: '#eab308', label: 'Moderate — Accept', items: ['Gas estimation errors', 'Doc gaps'] },
                  { impact: 'LOW', prob: 'MED', bg: '#39B54A', label: 'Low — Accept', items: ['Minor UI bugs', 'Testnet issues'] },
                  { impact: 'LOW', prob: 'LOW', bg: '#39B54A', label: 'Negligible', items: ['Style changes', 'Minor delays'] },
                ].map((cell, i) => (
                  <div key={i} className="p-2 lg:p-3 border border-border/30 flex flex-col gap-1" style={{ backgroundColor: cell.bg + '15' }}>
                    <div className="text-xs font-bold leading-tight" style={{ color: cell.bg }}>{cell.label}</div>
                    {cell.items.map(item => <div key={item} className="text-xs text-muted-foreground leading-snug">• {item}</div>)}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-1.5 right-3 text-xs text-muted-foreground font-medium">→ Probability (Low → High)</div>
              <div className="absolute top-1/2 left-1.5 text-xs text-muted-foreground font-medium -rotate-90 origin-center">↑ Impact</div>
            </div>
            {/* Response strategies */}
            <div className="space-y-3">
              <div className="font-bold text-sm text-foreground">Risk Response Strategies</div>
              {[
                { strategy: 'Avoid', color: '#ef4444', desc: 'Eliminate the risk by changing the project approach. Example: do not deploy on an untested L2 if security cannot be confirmed.' },
                { strategy: 'Mitigate', color: '#f97316', desc: 'Reduce likelihood or impact. Example: mandatory smart contract audit before mainnet deployment reduces exploit risk.' },
                { strategy: 'Transfer', color: '#eab308', desc: 'Shift the risk to another party. Example: use a third-party oracle provider with an SLA rather than building your own.' },
                { strategy: 'Accept', color: '#39B54A', desc: 'Acknowledge the risk and prepare a response plan. Example: accept regulatory uncertainty but document a pivot plan if classification changes.' },
                { strategy: 'Exploit', color: '#6366f1', desc: 'For positive risks — accelerate favorable outcomes. Example: if a major partner wants to join the consortium, fast-track their onboarding.' },
              ].map(s => (
                <div key={s.strategy} className="flex gap-3 p-3 bg-card border border-border rounded-lg">
                  <div className="shrink-0 px-2.5 py-1 rounded text-xs font-black text-white h-fit" style={{ background: s.color }}>{s.strategy.toUpperCase()}</div>
                  <div className="text-sm text-muted-foreground">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ TECHNICAL RISKS ═══════ */}
        <div id="s3-technical" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ef4444]">Session 03</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Deep Dive: Technical Risks</h2>
            <p className="text-sm text-muted-foreground">Smart contract vulnerabilities are the most catastrophic technical risk — because there is no rollback.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
            <div className="space-y-3">
              {[
                {
                  name: 'Reentrancy Attack',
                  severity: 'Critical',
                  color: '#ef4444',
                  example: 'The DAO hack (2016): $60M drained. A contract calls an external address before updating its own state — allowing the called contract to re-enter and drain funds.',
                  mitigation: 'Checks-Effects-Interactions pattern. ReentrancyGuard modifier. Always update state before external calls.',
                },
                {
                  name: 'Integer Overflow / Underflow',
                  severity: 'High',
                  color: '#ef4444',
                  example: 'Before Solidity 0.8, arithmetic operations could silently wrap around. An attacker subtracts from a zero balance to get a huge number.',
                  mitigation: 'Use Solidity ≥0.8 (built-in overflow checks) or SafeMath library for older contracts.',
                },
                {
                  name: 'Oracle Manipulation',
                  severity: 'Critical',
                  color: '#ef4444',
                  example: 'Flash loan attacks manipulate DEX spot prices used as oracles, draining lending protocols that trust those prices for collateral valuation.',
                  mitigation: 'Use time-weighted average prices (TWAP). Use decentralized oracle networks (Chainlink). Never use a single on-chain DEX as your sole price feed.',
                },
                {
                  name: 'Access Control Flaws',
                  severity: 'High',
                  color: '#f97316',
                  example: 'Missing onlyOwner modifier allows any address to call admin functions. The Parity wallet freeze (2017): $280M locked due to an unprotected initialization function.',
                  mitigation: 'Explicit access control on every sensitive function. Role-based access control (RBAC). Thorough test coverage for permission scenarios.',
                },
              ].map(r => (
                <div key={r.name} className="p-4 bg-card border border-border rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm text-foreground">{r.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: r.color }}>{r.severity}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2"><span className="font-semibold text-foreground">Example: </span>{r.example}</div>
                  <div className="text-xs text-[#39B54A]"><span className="font-semibold">Mitigation: </span>{r.mitigation}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                {
                  name: 'Front-Running (MEV)',
                  severity: 'High',
                  color: '#f97316',
                  example: 'Miners / validators can observe pending transactions and insert their own before them. Sandwich attacks drain DEX traders by front- and back-running their swaps.',
                  mitigation: 'Commit-reveal schemes. Slippage limits in AMM swaps. Use private mempools (e.g. Flashbots Protect) for sensitive transactions.',
                },
                {
                  name: 'Upgrade Proxy Vulnerabilities',
                  severity: 'High',
                  color: '#f97316',
                  example: 'Upgradeable contracts using proxies have a storage collision risk if not implemented correctly. A malicious upgrade can drain all funds.',
                  mitigation: 'Use established proxy patterns (OpenZeppelin Transparent or UUPS). Mandatory timelock on upgrades. Multi-sig upgrade control.',
                },
                {
                  name: 'Private Key Compromise',
                  severity: 'Critical',
                  color: '#ef4444',
                  example: 'If the deployer private key or admin key is compromised, all funds and administrative functions are at risk. The Ronin bridge hack ($625M): stolen validator keys.',
                  mitigation: 'Multi-sig for all privileged operations. Hardware security modules (HSM). Key rotation procedures. Principle of least privilege.',
                },
                {
                  name: 'Protocol Dependency Risk',
                  severity: 'Medium',
                  color: '#eab308',
                  example: 'Your project relies on an L2, oracle, or DeFi protocol that can be upgraded, deprecated, or exploited — affecting your project without any code changes on your part.',
                  mitigation: 'Audit all external dependencies. Build abstraction layers. Monitor dependency governance and security channels. Have fallback mechanisms.',
                },
              ].map(r => (
                <div key={r.name} className="p-4 bg-card border border-border rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm text-foreground">{r.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: r.color }}>{r.severity}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2"><span className="font-semibold text-foreground">Example: </span>{r.example}</div>
                  <div className="text-xs text-[#39B54A]"><span className="font-semibold">Mitigation: </span>{r.mitigation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ REGULATORY RISKS ═══════ */}
        <div id="s3-regulatory" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ef4444]">Session 03</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Regulatory Risk Landscape</h2>
            <p className="text-sm text-muted-foreground">Regulatory frameworks for blockchain are incomplete globally — and enforcement is accelerating. Every PM must understand the key dimensions.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
            {[
              {
                area: 'Securities Law',
                flag: '🏛️',
                color: '#ef4444',
                level: 'Critical',
                risk: 'Your token may be classified as a security under the Howey Test (US) or equivalent tests in other jurisdictions — triggering mandatory registration and enforcement action against the issuer.',
                signals: ['Profit promised from others\' efforts', 'Investment in a common enterprise', 'Token sold to fund project development', 'Secondary market trading promoted'],
                mitigation: 'Get a legal opinion before any token issuance. Consider utility-first token design. Engage securities counsel before the whitepaper is published.',
              },
              {
                area: 'Data Protection (GDPR)',
                flag: '🇪🇺',
                color: '#f97316',
                level: 'High',
                risk: 'Storing personal data on an immutable blockchain conflicts directly with the GDPR right to erasure. Once on-chain, data cannot be deleted — ever. This is an architectural decision, not a legal one.',
                signals: ['Personal identifiers stored on-chain', 'Hashes of personal data on-chain', 'EU residents in the user base', 'KYC data inside smart contract state'],
                mitigation: 'Store only content hashes or pointers on-chain. Keep all PII in off-chain, deletable storage. Pseudonymize aggressively from the architecture design stage.',
              },
              {
                area: 'AML / KYC Compliance',
                flag: '🔍',
                color: '#eab308',
                level: 'High',
                risk: 'Projects may be classified as Virtual Asset Service Providers (VASPs) under FATF guidelines — requiring full AML programs, transaction monitoring, and Travel Rule compliance across borders.',
                signals: ['Token exchange or transfer functionality', 'DeFi protocol handling large value', 'Cross-border transactions in scope', 'Anonymous wallet interactions permitted'],
                mitigation: 'Conduct VASP classification analysis early. Implement on-chain KYC or verifiable credential solutions. Build transaction monitoring infrastructure from day one — not as an afterthought.',
              },
            ].map(area => (
              <div key={area.area} className="flex flex-col rounded-xl border-2 bg-card overflow-hidden" style={{ borderColor: area.color + '40' }}>
                <div className="h-1 w-full shrink-0" style={{ backgroundColor: area.color }} />
                <div className="flex flex-col flex-1 p-4 lg:p-5">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2 mb-3 shrink-0">
                    <span className="text-4xl lg:text-5xl leading-none">{area.flag}</span>
                    <span
                      className="text-[10px] font-black px-2.5 py-1 rounded-full text-white shrink-0"
                      style={{ backgroundColor: area.color }}
                    >
                      {area.level.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-bold text-base lg:text-lg mb-2 shrink-0" style={{ color: area.color }}>{area.area}</h3>

                  {/* Risk description — larger text */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{area.risk}</p>

                  {/* Warning signals as colored tags */}
                  <div className="mb-4 shrink-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">⚠️ Warning Signals</p>
                    <div className="flex flex-col gap-1.5">
                      {area.signals.map(s => (
                        <div
                          key={s}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ backgroundColor: area.color + '18', color: area.color }}
                        >
                          <span className="shrink-0">▸</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mitigation pinned to bottom */}
                  <div className="mt-auto p-3 rounded-lg bg-[#39B54A]/10 border border-[#39B54A]/30 shrink-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#39B54A] mb-1">Mitigation</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{area.mitigation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ AUDIT PROCESS ═══════ */}
        <div id="s3-audit" className="h-full flex flex-col p-5 lg:p-8">

          {/* Header */}
          <div className="shrink-0 mb-4 lg:mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ef4444]">Session 03</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Smart Contract Audit Process</h2>
            <p className="text-sm text-muted-foreground">
              A security audit is not a checkbox — it is a multi-phase process the PM must plan for from day one.
            </p>
          </div>

          {/* Five equal-height audit phase cards */}
          <div className="flex-1 min-h-0 flex items-stretch gap-2 lg:gap-3">
            {(
              [
                {
                  number: '01',
                  title: 'Scope Definition & Kickoff',
                  icon: '📋',
                  color: '#f97316',
                  description: 'Define which contracts, which commit hash, and which invariants must hold. Share full documentation, architecture diagrams, and test suite with the auditors before work begins.',
                  tools: ['Audit brief doc', 'Architecture diagrams', 'Test suite handoff'],
                  owner: 'PM + Dev Lead',
                  gate: false,
                },
                {
                  number: '02',
                  title: 'Automated & Manual Review',
                  icon: '🔬',
                  color: '#6366f1',
                  description: 'Auditors run static analysis tools and perform manual line-by-line code review, focusing on access control, state transitions, economic logic, and external call patterns.',
                  tools: ['Slither', 'Mythril', 'Manual review'],
                  owner: 'Security Auditors',
                  gate: false,
                },
                {
                  number: '03',
                  title: 'Draft Report & Finding Triage',
                  icon: '📊',
                  color: '#eab308',
                  description: 'Auditors issue a draft report categorizing findings as Critical / High / Medium / Low / Informational. PM and dev team triage each finding and prepare responses.',
                  tools: ['Finding severity matrix', 'Response plan', 'Fix priority list'],
                  owner: 'PM + Dev + Auditors',
                  gate: false,
                },
                {
                  number: '04',
                  title: 'Remediation & Verification',
                  icon: '🛠️',
                  color: '#39B54A',
                  description: 'Dev team remediates all Critical and High findings. Auditors verify fixes on the updated commit hash. This may require multiple rounds — plan the time buffer explicitly.',
                  tools: ['Updated contracts', 'Re-test evidence', 'Diff review'],
                  owner: 'Dev Team + Auditors',
                  gate: false,
                },
                {
                  number: '05',
                  title: 'Final Report & Mainnet Gate',
                  icon: '🚦',
                  color: '#ef4444',
                  description: 'Auditors publish the final public report. Zero Critical or High findings open. PM conducts the formal go/no-go review — this is the last checkpoint before mainnet deployment.',
                  tools: ['Public audit report', 'Sign-off checklist', 'Mainnet authorization'],
                  owner: 'PM (final sign-off)',
                  gate: true,
                },
              ] as const
            ).flatMap((step, i, arr) => {
              const card = (
                <div
                  key={step.number}
                  className="flex-1 flex flex-col rounded-xl border-2 bg-card overflow-hidden"
                  style={{ borderColor: step.color + '50' }}
                >
                  {/* Top color stripe */}
                  <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: step.color }} />

                  <div className="flex flex-col flex-1 p-4 lg:p-5 min-h-0">
                    {/* Number badge + icon */}
                    <div className="flex items-center gap-2 mb-3 shrink-0">
                      <div
                        className="px-2.5 py-1 rounded-full text-white text-xs font-black shrink-0"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.number}
                      </div>
                      <span className="text-2xl">{step.icon}</span>
                      {step.gate && (
                        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/30 whitespace-nowrap">
                          🚦 GO / NO-GO
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold text-sm lg:text-base leading-snug mb-2 shrink-0"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed flex-1 min-h-0">
                      {step.description}
                    </p>

                    {/* Owner + Tools pinned to bottom */}
                    <div className="mt-3 pt-3 border-t border-border shrink-0 space-y-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Owner</p>
                        <p className="text-xs lg:text-sm font-semibold" style={{ color: step.color }}>{step.owner}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Key Outputs</p>
                        <ul className="space-y-1.5">
                          {step.tools.map(t => (
                            <li key={t} className="flex items-start gap-2 text-xs lg:text-sm text-muted-foreground">
                              <span
                                className="shrink-0 size-4 rounded-full flex items-center justify-center text-white text-[9px] font-black mt-0.5"
                                style={{ backgroundColor: step.color }}
                              >✓</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
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

        {/* ═══════ MITIGATION STRATEGIES ═══════ */}
        <div id="s3-mitigation" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ef4444]">Session 03</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Risk Mitigation Toolkit</h2>
            <p className="text-sm text-muted-foreground">Blockchain PMs have a specific set of mitigation tools beyond standard project management practices.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {(
              [
                {
                  tool: 'Mandatory Security Audit',
                  icon: '🔐', color: '#ef4444',
                  effectiveness: 'Critical', effectColor: '#ef4444',
                  when: 'Before every mainnet deploy',
                  desc: 'Non-negotiable for any contract holding value. Budget 4–8 weeks and 15–25% of development cost. Skip this and you accept unlimited downside.',
                  protects: 'Technical risk',
                },
                {
                  tool: 'Bug Bounty Program',
                  icon: '🏆', color: '#f97316',
                  effectiveness: 'High', effectColor: '#f97316',
                  when: 'Post-launch, ongoing',
                  desc: 'Crowdsource security research. Offer rewards proportional to finding severity. Platforms: HackerOne, Immunefi, Code4rena.',
                  protects: 'Technical risk',
                },
                {
                  tool: 'Formal Verification',
                  icon: '📐', color: '#6366f1',
                  effectiveness: 'High', effectColor: '#f97316',
                  when: 'Critical financial contracts',
                  desc: 'Mathematically prove that contract logic meets specified invariants. The highest assurance level available — expensive but essential for high-TVL protocols.',
                  protects: 'Technical risk',
                },
                {
                  tool: 'Timelock Controls',
                  icon: '⏱️', color: '#eab308',
                  effectiveness: 'High', effectColor: '#f97316',
                  when: 'All admin / upgrade functions',
                  desc: 'Queue privileged actions with a 24–72h delay. Gives stakeholders time to review and exit before changes take effect — a critical safety net.',
                  protects: 'Operational risk',
                },
                {
                  tool: 'Multi-Sig Governance',
                  icon: '🔑', color: '#39B54A',
                  effectiveness: 'Critical', effectColor: '#ef4444',
                  when: 'Key management, treasury',
                  desc: 'Require M-of-N signers for critical operations. Eliminates single-point-of-failure from key compromise. Standard practice for any protocol treasury.',
                  protects: 'Technical + Operational',
                },
                {
                  tool: 'Circuit Breakers / Pause',
                  icon: '🛑', color: '#ef4444',
                  effectiveness: 'High', effectColor: '#f97316',
                  when: 'Emergency response',
                  desc: 'Build pause() functions into contracts for emergency stops. Define who can pause and under what conditions — before launch, not during an incident.',
                  protects: 'Technical risk',
                },
                {
                  tool: 'Insurance Protocols',
                  icon: '🛡️', color: '#22d3ee',
                  effectiveness: 'Medium', effectColor: '#eab308',
                  when: 'High-value TVL projects',
                  desc: 'On-chain insurance (Nexus Mutual, InsurAce) covers smart contract exploit losses. Part of a mature risk transfer strategy for protocols with significant TVL.',
                  protects: 'Financial exposure',
                },
                {
                  tool: 'Staged Rollouts',
                  icon: '📊', color: '#8b5cf6',
                  effectiveness: 'High', effectColor: '#f97316',
                  when: 'All new deployments',
                  desc: 'Deploy with TVL caps initially. Increase limits as the protocol proves its stability over time. Limits blast radius if a vulnerability surfaces post-launch.',
                  protects: 'Adoption + Technical',
                },
              ] as const
            ).map(t => (
              <div
                key={t.tool}
                className="flex flex-col rounded-xl border-2 bg-card overflow-hidden"
                style={{ borderColor: t.color + '40' }}
              >
                <div className="h-1 w-full shrink-0" style={{ backgroundColor: t.color }} />

                <div className="flex flex-col flex-1 p-4">
                  {/* Icon */}
                  <div className="text-3xl mb-2 shrink-0">{t.icon}</div>

                  {/* Title */}
                  <h3 className="font-bold text-sm lg:text-base mb-2 leading-snug shrink-0" style={{ color: t.color }}>
                    {t.tool}
                  </h3>

                  {/* When + Effectiveness badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3 shrink-0">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                      style={{ color: t.color, borderColor: t.color + '50', backgroundColor: t.color + '15' }}
                    >
                      {t.when}
                    </span>
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: t.effectColor }}
                    >
                      {t.effectiveness}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed flex-1">
                    {t.desc}
                  </p>

                  {/* Protects footer */}
                  <div className="mt-3 pt-2 border-t border-border shrink-0">
                    <p className="text-[10px] text-muted-foreground">
                      <span className="font-bold text-foreground">Protects against: </span>
                      {t.protects}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ DISCUSSION ═══════ */}
        <div id="s3-discussion" className="h-full">
          <DiscussionSlide
            prompt="A DeFi protocol is about to launch with $10M in initial liquidity. The security audit found 2 Medium and 4 Low findings — all resolved. One High finding is still open (upgradeability mechanism). Do you launch? What is your decision framework?"
            guidingQuestions={[
              'Your blockchain project operates across the EU and US. Your legal team says you need to store KYC data immutably for compliance. Your privacy counsel says that violates GDPR. How do you resolve this conflict in your architecture?',
              'You are the PM for a consortium supply chain blockchain. One member is pressuring you to skip the security audit to meet the launch deadline. How do you respond? What data do you use to make your case?',
            ]}
          />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s3-quiz" className="h-full">
          <QuizSlide
            question="(1/3) Your team is building a DeFi lending protocol and plans to use a single on-chain DEX spot price as the collateral price oracle. What is the primary risk, and how should it be mitigated?"
            options={[
              { text: 'Gas cost risk — on-chain price lookups are expensive. Use a centralized API instead to save fees.', correct: false },
              { text: 'Oracle manipulation risk via flash loans — an attacker can move the DEX price in a single transaction to drain the protocol. Use a time-weighted average price (TWAP) or a decentralized oracle network.', correct: true },
              { text: 'Latency risk — the DEX price updates too slowly. Use a centralized exchange feed with faster updates.', correct: false },
              { text: 'Regulatory risk — using on-chain prices constitutes market manipulation under MiFID II.', correct: false },
            ]}
            explanation="Single on-chain spot prices are the primary attack surface for flash loan oracle manipulation. An attacker borrows a huge amount in a single transaction, moves the DEX price, triggers the vulnerable protocol, and repays the loan — all atomically. The attack leaves no trace between blocks. Time-weighted average prices (TWAP) and decentralized oracle networks like Chainlink are the standard mitigations because they cannot be manipulated within a single block."
          />
        </div>

        {/* ═══════ QUIZ 2/3 ═══════ */}
        <div className="h-full">
          <QuizSlide
            question="(2/3) The DAO hack of 2016 drained $60M due to a reentrancy vulnerability. Which pattern is the primary defense against reentrancy attacks in a smart contract?"
            options={[
              { text: 'Apply a 24-hour timelock that delays all external function calls before execution.', correct: false },
              { text: 'Apply the Checks-Effects-Interactions pattern — update all contract state before making any external call.', correct: true },
              { text: 'Deploy a multi-sig wallet requiring 3 signatures for every transfer operation.', correct: false },
              { text: 'Use a centralized price feed instead of on-chain oracles to reduce the attack surface.', correct: false },
            ]}
            explanation="Reentrancy happens when a contract makes an external call before it updates its own state — allowing the called contract to re-enter and drain funds repeatedly. The Checks-Effects-Interactions pattern prevents this: first validate all conditions (checks), then update internal state (effects), then and only then interact with external contracts. OpenZeppelin's ReentrancyGuard modifier enforces this automatically. A timelock does not help — it would only delay the attack, not prevent it."
          />
        </div>

        {/* ═══════ QUIZ 3/3 ═══════ */}
        <div className="h-full">
          <QuizSlide
            question="(3/3) A security audit returns 0 Critical, 1 High, and 6 Medium findings. The single High finding concerns the upgrade proxy mechanism. The project sponsor wants to launch on the original schedule. What does the Go/No-Go gate require?"
            options={[
              { text: 'Launch is approved — zero Critical findings means the gate is passed.', correct: false },
              { text: 'Launch is approved — Medium findings can safely be resolved post-launch with a quick patch.', correct: false },
              { text: 'Launch is blocked until the High finding is fully remediated, re-tested, and auditor-verified — regardless of schedule pressure.', correct: true },
              { text: 'Reclassify the High finding as Medium and document it as a known risk to allow the launch to proceed.', correct: false },
            ]}
            explanation="The Go/No-Go gate requires zero open Critical or High findings — not just zero Critical. A High severity finding in the upgrade proxy mechanism means an attacker could potentially upgrade the contract to malicious logic or cause storage collisions. Reclassifying findings to bypass gates is a red flag that destroys auditor trust and creates legal liability. Medium findings can be addressed post-launch; High and Critical cannot. The sponsor's schedule pressure is a stakeholder management problem — the PM's job is to protect the organization from an irreversible security failure."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s3-takeaways" className="h-full">
          <TakeawaySlide
            title="Key Takeaways — Session 03"
            takeaways={[
              'Blockchain projects carry four distinct risk categories: technical, regulatory, adoption, and operational — each requiring a specific management approach.',
              'Smart contract vulnerabilities (reentrancy, oracle manipulation, access control flaws) are irreversible once deployed — the audit process is the most important PM gate.',
              'Never store personal data on-chain in a GDPR-regulated context. Store hashes and keep PII in off-chain deletable storage.',
              'Token issuance carries securities law risk. Get legal classification opinions before any token sale or public distribution.',
              'Mitigation tools like timelocks, multi-sig, circuit breakers, and staged rollouts reduce blast radius — they cannot eliminate risk, but they give you response time.',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
