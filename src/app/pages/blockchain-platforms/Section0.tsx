import { TitleSlide } from '../../components/templates/TitleSlide';
import { ConceptSlide } from '../../components/templates/ConceptSlide';
import { ComparisonSlide } from '../../components/templates/ComparisonSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { RefreshCw } from 'lucide-react';

const chapters = [
  { id: 's0-centralization', label: 'Centralization' },
  { id: 's0-types', label: 'Blockchain Types' },
  { id: 's0-permissioned', label: 'Permissioned' },
  { id: 's0-comparison', label: 'Comparison' },
  { id: 's0-usecases', label: 'Use of Blockchain' },
  { id: 's0-takeaways', label: 'Takeaways' },
  { id: 's0-team-reminder', label: '🤝 Team Reminder' },
];

export function Section0() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={chapters} />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 00"
            title="Recap"
            subtitle="Centralization, blockchain types, and the permissioned vs permissionless spectrum"
            icon={<RefreshCw className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ CENTRALIZATION ═══════ */}
        <div id="s0-centralization" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Centralized vs Decentralized vs Distributed</h2>
            <p className="text-sm text-muted-foreground">Three network topologies — first described by Paul Baran (1964). Blockchain sits at the distributed end of the spectrum.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">

            {/* Centralized */}
            <div className="bg-card border border-[#ED1C24]/40 rounded-xl p-5 flex flex-col items-center text-center gap-3">
              <div className="text-4xl">🏛️</div>
              <h3 className="font-bold text-[#ED1C24] text-base">Centralized</h3>
              {/* Visual */}
              <div className="relative flex items-center justify-center w-28 h-20 shrink-0">
                <div className="size-8 rounded-full bg-[#ED1C24]/30 border-2 border-[#ED1C24] flex items-center justify-center z-10">
                  <span className="text-xs font-black text-[#ED1C24]">C</span>
                </div>
                {[[-36,-24],[36,-24],[-36,24],[36,24]].map(([x,y],i) => (
                  <div key={i} className="absolute size-5 rounded-full bg-muted border border-border flex items-center justify-center" style={{ left: `calc(50% + ${x}px - 10px)`, top: `calc(50% + ${y}px - 10px)` }}>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg className="absolute" width="72" height="52" style={{ left: `${-x}px`, top: `${-y}px`, position: 'relative' }}/>
                    </div>
                  </div>
                ))}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 80">
                  {[[-18,-12],[18,-12],[-18,12],[18,12]].map(([x,y],i) => (
                    <line key={i} x1="56" y1="40" x2={56+x*2} y2={40+y*2} stroke="#ED1C24" strokeWidth="1.5" strokeOpacity="0.5"/>
                  ))}
                </svg>
              </div>
              <ul className="flex flex-col justify-between flex-1 text-sm text-muted-foreground text-center space-y-2">
                <li>Single authority controls everything — one hub, many spokes</li>
                <li>Single point of failure — compromise the center and the whole system falls</li>
                <li>Efficient and easy to govern, but requires full trust in the authority</li>
                <li className="font-medium text-foreground">Examples: Visa, central banks, AWS, Facebook</li>
              </ul>
            </div>

            {/* Decentralized */}
            <div className="bg-card border border-[#f59e0b]/40 rounded-xl p-5 flex flex-col items-center text-center gap-3">
              <div className="text-4xl">🕸️</div>
              <h3 className="font-bold text-[#f59e0b] text-base">Decentralized</h3>
              {/* Visual */}
              <div className="relative flex items-center justify-center w-28 h-20 shrink-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 80">
                  <circle cx="56" cy="28" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6"/>
                  <circle cx="30" cy="56" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6"/>
                  <circle cx="82" cy="56" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6"/>
                  <line x1="56" y1="36" x2="38" y2="50" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4"/>
                  <line x1="56" y1="36" x2="74" y2="50" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4"/>
                  <line x1="38" y1="56" x2="74" y2="56" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4"/>
                </svg>
              </div>
              <ul className="flex flex-col justify-between flex-1 text-sm text-muted-foreground text-center space-y-2">
                <li>Multiple control centers — each manages its own cluster of nodes</li>
                <li>More resilient than centralized — but each sub-center is still a point of failure</li>
                <li>Governance is federated — rules negotiated between centers</li>
                <li className="font-medium text-foreground">Examples: Internet DNS, Consortium blockchains, banking networks</li>
              </ul>
            </div>

            {/* Distributed */}
            <div className="bg-card border border-[#39B54A]/40 rounded-xl p-5 flex flex-col items-center text-center gap-3">
              <div className="text-4xl">🌐</div>
              <h3 className="font-bold text-[#39B54A] text-base">Distributed</h3>
              {/* Visual */}
              <div className="relative flex items-center justify-center w-28 h-20 shrink-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 80">
                  {[[56,20],[28,40],[84,40],[42,64],[70,64],[14,60],[98,60]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r="7" fill="none" stroke="#39B54A" strokeWidth="2" opacity="0.7"/>
                  ))}
                  {[[56,20,28,40],[56,20,84,40],[28,40,42,64],[84,40,70,64],[28,40,14,60],[84,40,98,60],[42,64,70,64]].map(([x1,y1,x2,y2],i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#39B54A" strokeWidth="1.5" strokeOpacity="0.35"/>
                  ))}
                </svg>
              </div>
              <ul className="flex flex-col justify-between flex-1 text-sm text-muted-foreground text-center space-y-2">
                <li>No center — every node is equal and connects directly to peers</li>
                <li>No single point of failure — removing any node doesn't break the network</li>
                <li>Trustless — consensus replaces authority. The rules are in the code.</li>
                <li className="font-medium text-foreground">Examples: Bitcoin, Ethereum, IPFS, Tor</li>
              </ul>
            </div>

          </div>
        </div>

        {/* ═══════ BLOCKCHAIN TYPES ═══════ */}
        <div id="s0-types" className="h-full">
          <ComparisonSlide
            title="Types of Blockchain"
            featureLabel="Criteria"
            option1Label="Public Permissionless"
            option2Label="Consortium / Semi-private"
            option3Label="Private Permissioned"
            items={[
              {
                feature: '👁️ Who can read?',
                option1: 'Anyone — fully public ledger',
                option2: 'Authorized participants only',
                option3: 'Restricted to the organization',
              },
              {
                feature: '✍️ Who can transact?',
                option1: 'Anyone with a wallet',
                option2: 'Vetted members of the consortium',
                option3: 'Employees / approved parties',
              },
              {
                feature: '⚙️ Who validates?',
                option1: 'Any node (miners/validators)',
                option2: 'Pre-selected consortium nodes',
                option3: 'Central authority or internal nodes',
              },
              {
                feature: '🔍 Transparency',
                option1: 'Full — every tx visible',
                option2: 'Partial — among members',
                option3: 'Minimal — internal only',
              },
              {
                feature: '📌 Examples',
                option1: 'Bitcoin, Ethereum, Solana',
                option2: 'Quorum (JPMorgan), R3 Corda',
                option3: 'Hyperledger Fabric, private chains',
              },
            ]}
          />
        </div>

        {/* ═══════ USE OF BLOCKCHAIN ═══════ */}
        {/* ═══════ PERMISSIONED BLOCKCHAINS ═══════ */}
        <div id="s0-permissioned" className="h-full">
          <ConceptSlide
            title="Permissioned Blockchains"
            description="Private and consortium blockchains are designed for trust within known participant sets — not trustlessness at global scale."
            visual={
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent rounded-xl border border-[#8b5cf6]/30">
                  <h4 className="font-bold text-[#8b5cf6] mb-2">🔐 What makes them permissioned?</h4>
                  <p className="text-sm text-muted-foreground">Participants are known and identity-verified before joining. Access control defines who can read, write, or validate. Consensus is faster (BFT variants) — no mining needed. Governance is agreed off-chain by the consortium.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                  <h4 className="font-bold text-[#ED1C24] mb-2">🏢 Private Blockchains</h4>
                  <p className="text-sm text-muted-foreground">Controlled by a single organisation — internal use only. Highest performance, lowest decentralisation. Used for internal audit trails and cross-department data sharing. Example: Hyperledger Fabric in single-org mode.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                  <h4 className="font-bold text-[#39B54A] mb-2">🤝 Consortium Blockchains</h4>
                  <p className="text-sm text-muted-foreground">Governed by a group of organisations with shared interests. Each member runs nodes — shared validation. Used for trade finance, healthcare data, and supply chains. Examples: R3 Corda, TradeLens (Maersk + IBM).</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                  <h4 className="font-bold text-[#6366f1] mb-2">⚖️ The Trade-off vs Public Chains</h4>
                  <p className="text-sm text-muted-foreground"><span className="text-foreground font-medium">Gain:</span> privacy, performance, and regulatory compliance. <span className="text-foreground font-medium">Lose:</span> censorship resistance, open access, and trustlessness. Neither is better — they solve different problems.</p>
                </div>
              </div>
            }
            keyPoints={[
              'Participants are known — identity replaces economic incentives as the trust mechanism',
              'BFT consensus is orders of magnitude faster than PoW/PoS — no energy waste',
              'Private chains maximise performance; consortium chains balance privacy with shared governance',
              'Permissioned blockchains are not "less blockchain" — they are optimised for different constraints',
            ]}
          />
        </div>

        {/* ═══════ COMPARISON ═══════ */}
        <div id="s0-comparison" className="h-full">
          <ComparisonSlide
            title="Permissionless vs Permissioned"
            featureLabel="Property"
            option1Label="Permissionless"
            option2Label="Permissioned"
            items={[
              {
                feature: '🔓 Access',
                option1: 'Open to anyone — no identity required',
                option2: 'Restricted — participants are vetted and known',
              },
              {
                feature: '⚙️ Consensus',
                option1: 'PoW / PoS — open competition',
                option2: 'BFT variants — pre-selected validators, much faster',
              },
              {
                feature: '🚀 Throughput',
                option1: '7–30 TPS (Bitcoin/Ethereum L1)',
                option2: '1,000–10,000+ TPS depending on setup',
              },
              {
                feature: '🔍 Transparency',
                option1: 'Full — anyone can audit every transaction',
                option2: 'Selective — visibility is role-based',
              },
              {
                feature: '🛡️ Trust Model',
                option1: 'Trustless — math and economics enforce rules',
                option2: 'Trust in consortium governance and identity',
              },
              {
                feature: '📌 Use Case',
                option1: 'Public finance, censorship resistance, open dApps',
                option2: 'Enterprise supply chains, regulated finance, healthcare',
              },
            ]}
          />
        </div>

        {/* ═══════ USE OF BLOCKCHAIN ═══════ */}
        <div id="s0-usecases" className="h-full flex items-center justify-center p-5 lg:p-8">
          <div className="w-full max-w-6xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1 text-center">The Use of Blockchain</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">When does blockchain actually add value — and when doesn't it?</p>

            <div className="grid grid-cols-3 gap-5">
              <div className="bg-card border border-[#39B54A]/40 rounded-xl p-7">
                <div className="font-bold text-[#39B54A] text-base mb-5">✅ Use blockchain when…</div>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Multiple parties share data without trusting each other</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>An immutable audit trail is required</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Intermediaries add cost without adding value</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Rules need to be enforced automatically (smart contracts)</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Censorship resistance or permissionless access is required</li>
                </ul>
              </div>

              <div className="bg-card border border-[#ED1C24]/40 rounded-xl p-7">
                <div className="font-bold text-[#ED1C24] text-base mb-5">❌ Don't use blockchain when…</div>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>A central authority is already trusted by all parties</li>
                  <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Data privacy is paramount — public chains expose everything</li>
                  <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>High-volume, low-latency transactions are needed</li>
                  <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>You control all participants — just use a database</li>
                  <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>On-chain data integrity can't be guaranteed (oracle problem)</li>
                </ul>
              </div>

              <div className="bg-card border border-[#f59e0b]/40 rounded-xl p-7">
                <div className="font-bold text-[#f59e0b] text-base mb-5">🏭 Real-World Value Drivers</div>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-[#f59e0b] shrink-0">•</span><span className="font-medium text-foreground">Finance:</span> DeFi, cross-border payments, tokenised assets</li>
                  <li className="flex gap-2"><span className="text-[#f59e0b] shrink-0">•</span><span className="font-medium text-foreground">Supply chain:</span> provenance, anti-counterfeiting, compliance</li>
                  <li className="flex gap-2"><span className="text-[#f59e0b] shrink-0">•</span><span className="font-medium text-foreground">Healthcare:</span> patient records portability, drug traceability</li>
                  <li className="flex gap-2"><span className="text-[#f59e0b] shrink-0">•</span><span className="font-medium text-foreground">Identity:</span> self-sovereign credentials, KYC once</li>
                  <li className="flex gap-2"><span className="text-[#f59e0b] shrink-0">•</span><span className="font-medium text-foreground">Government:</span> land registries, voting, procurement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s0-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 00 — Key Takeaways"
            takeaways={[
              'Centralization offers efficiency; decentralization offers resilience and trustlessness',
              'Blockchain exists on a spectrum — from fully public/permissionless to fully private/permissioned',
              'Blockchain adds value when multiple untrusting parties share data, or when intermediaries can be replaced by code',
              'Permissioned blockchains trade censorship resistance for privacy, performance, and compliance',
              'Consortium blockchains allow competing organizations to collaborate on shared infrastructure',
              'There is no universally best blockchain — each is optimised for different constraints',
            ]}
          />
        </div>

        {/* ═══════ TEAM REMINDER (Course 03 starts) ═══════ */}
        <div id="s0-team-reminder" className="h-full flex items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: 'radial-gradient(circle at 30% 20%, #6366f124, transparent 60%), radial-gradient(circle at 70% 80%, #8b5cf624, transparent 60%)' }} />
          <div className="relative z-10 max-w-3xl w-full p-8 bg-card border-2 rounded-2xl text-center" style={{ borderColor: '#6366f160' }}>
            <div className="inline-flex px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-md mb-4"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              🤝 Quick team reminder
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">Got your team yet?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-2xl mx-auto">
              By the end of <strong className="text-foreground">Day 1</strong> you should have formed a team of <strong className="text-foreground">3–4 people</strong>. Today's content on platform trade-offs will feed directly into the design choices your team will need to make in <strong className="text-foreground">Day 3</strong>.
            </p>
            <div className="grid grid-cols-3 gap-3 text-left mt-6">
              <div className="p-3 rounded-xl border" style={{ borderColor: '#39B54A40', backgroundColor: '#39B54A0c' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#39B54A] mb-1">If yes</div>
                <div className="text-xs text-muted-foreground">Sit together if you can — start discussing platform fit during the breaks.</div>
              </div>
              <div className="p-3 rounded-xl border" style={{ borderColor: '#f59e0b40', backgroundColor: '#f59e0b0c' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#f59e0b] mb-1">If not yet</div>
                <div className="text-xs text-muted-foreground">Find your teammates during the next break. Don't wait until Day 3 — you'll be playing catch-up.</div>
              </div>
              <div className="p-3 rounded-xl border" style={{ borderColor: '#6366f140', backgroundColor: '#6366f10c' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#6366f1] mb-1">Today's link</div>
                <div className="text-xs text-muted-foreground">As you see Bitcoin / Ethereum / Hyperledger / etc — think which one would fit a pain point you've experienced.</div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
