import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { TimelineSlide } from '../../components/templates/TimelineSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { FileCode2, Check, X } from 'lucide-react';

const chapters = [
  { id: 's1-what',     label: 'What is a Smart Contract?' },
  { id: 's1-szabo',    label: 'Nick Szabo\'s Vending Machine' },
  { id: 's1-history',    label: 'Historical Evolution' },
  { id: 's1-standards',  label: 'Token Standards' },
  { id: 's1-exercise',   label: '🎯 Exercise' },
  { id: 's1-quiz',     label: 'Quiz' },
  { id: 's1-takeaways', label: 'Takeaways' },
  { id: 's1-summary', label: 'Summary' },
];


// ─── Exercise: Is this a Smart Contract? ────────────────────────────────────

const SCENARIOS = [
  { title: 'Vending Machine', desc: 'Insert coins → get snack automatically', answer: true,  reason: 'Self-executing logic with automatic conditional payout — the original analogy Szabo used.' },
  { title: 'Airbnb Escrow',   desc: 'Platform holds payment until host confirms check-in', answer: true,  reason: 'Conditional fund release based on a confirmed event — a textbook smart contract use case.' },
  { title: 'Hospital Records', desc: 'Store & share medical history across doctors', answer: false, reason: 'Data is private, frequently updated, and legally sensitive. On-chain storage is 50,000× more expensive than a database.' },
  { title: 'Concert Ticket Resale', desc: 'NFT tickets — artist royalty enforced on every resale', answer: true,  reason: 'Automatic royalty on every transfer is impossible in traditional ticketing — smart contracts enforce it natively.' },
  { title: 'Company Expenses', desc: 'Submit receipts for manager approval', answer: false, reason: 'Internal process, single trusted party. No decentralisation needed — a simple approval workflow is cheaper and faster.' },
  { title: 'Crop Insurance',  desc: 'Auto-payout when rainfall falls below threshold', answer: true,  reason: 'Parametric insurance: oracle provides data, contract executes payout. No claims adjuster, no delay.' },
  { title: 'Social Media Likes', desc: 'Track likes and followers in real-time', answer: false, reason: 'Millisecond updates + massive data volume. Gas costs alone would make each like cost dollars.' },
  { title: 'DAO Treasury',    desc: 'Token holders vote; funds released if proposal passes', answer: true,  reason: 'Multi-party conditional payment with no board or legal entity needed. This is exactly what DAOs do.' },
  { title: 'Streaming Service', desc: 'Pay monthly fee to access video library', answer: false, reason: 'Storing a 2-hour movie on-chain would cost billions. Off-chain storage + access token is the right model.' },
  { title: 'Trade Finance',   desc: 'Letter of credit: pay importer when goods are confirmed delivered', answer: true,  reason: 'Multiple untrusting parties + conditional cross-border payment. Banks already pilot this with Hyperledger.' },
];

function SmartContractSortingExercise() {
  const [answers, setAnswers]   = useState<Record<number, boolean | null>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const total   = SCENARIOS.length;
  const done    = Object.keys(revealed).length;
  const correct = Object.entries(answers).filter(([i, a]) => a === SCENARIOS[+i].answer).length;

  const handlePick = (i: number, pick: boolean) => {
    if (revealed[i]) return;
    setAnswers(prev => ({ ...prev, [i]: pick }));
    setRevealed(prev => ({ ...prev, [i]: true }));
  };

  const reset = () => { setAnswers({}); setRevealed({}); };

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🎯 Exercise</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Is this a Smart Contract?</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Click YES or NO for each scenario, then see the explanation.</p>
        </div>
        <div className="flex items-center gap-4">
          {done > 0 && (
            <div className="text-right">
              <div className="text-2xl font-black" style={{ color: correct === done ? '#39B54A' : '#f59e0b' }}>{correct}/{done}</div>
              <div className="text-xs text-muted-foreground">correct so far</div>
            </div>
          )}
          {done === total && (
            <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-xs font-semibold text-muted-foreground transition-colors">↺ Reset</button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-5 grid-rows-2 gap-3">
        {SCENARIOS.map((s, i) => {
          const picked  = answers[i];
          const isRight = picked === s.answer;
          const isOpen  = !!revealed[i];
          return (
            <motion.div
              key={i}
              layout
              className="relative rounded-xl border-2 overflow-hidden flex flex-col transition-colors"
              style={{
                borderColor: !isOpen ? 'var(--border)' : isRight ? '#39B54A' : '#ED1C24',
                backgroundColor: !isOpen ? 'var(--card)' : isRight ? '#39B54A10' : '#ED1C2410',
              }}
            >
              {/* Card body */}
              <div className="flex-1 p-4 flex flex-col gap-2">
                <div className="font-black text-sm text-foreground leading-tight">{s.title}</div>
                <div className="text-xs text-muted-foreground leading-snug flex-1">{s.desc}</div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs leading-snug font-medium"
                      style={{ color: isRight ? '#39B54A' : '#ED1C24' }}
                    >
                      {isRight ? '✓ ' : '✗ '}{s.reason}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Buttons or result badge */}
              {!isOpen ? (
                <div className="flex border-t border-border shrink-0">
                  <button
                    onClick={() => handlePick(i, true)}
                    className="flex-1 py-2 text-sm font-black text-[#39B54A] hover:bg-[#39B54A]/15 transition-colors border-r border-border"
                  >YES</button>
                  <button
                    onClick={() => handlePick(i, false)}
                    className="flex-1 py-2 text-sm font-black text-[#ED1C24] hover:bg-[#ED1C24]/15 transition-colors"
                  >NO</button>
                </div>
              ) : (
                <div className="shrink-0 flex items-center justify-center py-2 gap-1.5 border-t" style={{ borderColor: isRight ? '#39B54A40' : '#ED1C2440' }}>
                  {isRight
                    ? <Check className="size-4 text-[#39B54A]" strokeWidth={3} />
                    : <X     className="size-4 text-[#ED1C24]" strokeWidth={3} />}
                  <span className="text-xs font-bold" style={{ color: isRight ? '#39B54A' : '#ED1C24' }}>
                    {s.answer ? 'Smart Contract' : 'Not a SC'}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function SC_Section1() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={chapters} accentColor="#6366f1" />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 01"
            title="Introduction to Smart Contracts"
            subtitle="Fundamentals, history, and the essential blockchain knowledge you need"
            icon={<FileCode2 className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ 1. WHAT IS A SMART CONTRACT ═══════ */}
        <div id="s1-what" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What is a Smart Contract?</h2>
            <p className="text-muted-foreground text-sm mt-1">A program that lives on a blockchain — and runs exactly as written, every time.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Left: definition + analogy */}
            <div className="flex flex-col gap-4">
              <div className="p-5 bg-gradient-to-br from-[#6366f1]/15 to-transparent border border-[#6366f1]/40 rounded-xl">
                <div className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest mb-2">Definition</div>
                <p className="text-base text-foreground font-medium leading-relaxed">
                  A <span className="font-black text-[#6366f1]">smart contract</span> is a self-executing program stored on a blockchain whose terms are written directly in code — not in natural language.
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  When predefined conditions are met, the contract executes automatically. No intermediary. No manual trigger. No possibility of censorship or tampering.
                </p>
              </div>

              <div className="p-4 bg-card border border-border rounded-xl">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Traditional contract vs Smart contract</div>
                <div className="space-y-2">
                  {[
                    { trad: 'Written in legal language', smart: 'Written in code (Solidity, Rust…)' },
                    { trad: 'Enforced by courts & lawyers', smart: 'Enforced by the blockchain protocol' },
                    { trad: 'Requires trust between parties', smart: 'Trustless — math enforces terms' },
                    { trad: 'Can be misinterpreted', smart: 'Deterministic — one execution path' },
                    { trad: 'Paper trail, slow disputes', smart: 'On-chain, instant, irreversible' },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2 text-xs">
                      <div className="px-2 py-1.5 rounded bg-[#ED1C24]/10 text-muted-foreground border border-[#ED1C24]/20">❌ {row.trad}</div>
                      <div className="px-2 py-1.5 rounded bg-[#39B54A]/10 text-muted-foreground border border-[#39B54A]/20">✅ {row.smart}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: key properties */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Key properties</div>
              {[
                { color: '#6366f1', emoji: '⚙️', title: 'Autonomous', desc: 'Executes automatically when conditions are satisfied. No human needs to trigger or approve anything after deployment.' },
                { color: '#8b5cf6', emoji: '🔒', title: 'Immutable', desc: 'Once deployed to the blockchain, the code cannot be changed. What you deploy is what runs — forever.' },
                { color: '#39B54A', emoji: '🌐', title: 'Transparent', desc: 'Anyone can read the contract code on-chain. There are no hidden clauses — the logic is fully public and auditable.' },
                { color: '#f59e0b', emoji: '📐', title: 'Deterministic', desc: 'Given the same inputs, a smart contract always produces the same output. Every node on the network agrees on the result.' },
                { color: '#ED1C24', emoji: '🛡️', title: 'Trustless', desc: 'Parties do not need to trust each other — they only need to trust the code. The protocol enforces every term.' },
              ].map(p => (
                <div key={p.title} className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl flex-1" style={{ borderColor: p.color + '30' }}>
                  <div className="text-xl shrink-0">{p.emoji}</div>
                  <div>
                    <div className="font-bold text-sm mb-0.5" style={{ color: p.color }}>{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ═══════ 2. NICK SZABO'S VENDING MACHINE ═══════ */}
        <div id="s1-szabo" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Nick Szabo's Vending Machine</h2>
            <p className="text-muted-foreground text-sm mt-1">The original analogy — and the mind behind the concept, 30 years before DeFi.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-6 content-center">

            {/* Left: Szabo bio + quote */}
            <div className="flex flex-col gap-4">
              <div className="p-5 bg-gradient-to-br from-[#6366f1]/15 to-transparent border border-[#6366f1]/40 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-black shrink-0">NS</div>
                  <div>
                    <div className="font-black text-foreground">Nick Szabo</div>
                    <div className="text-xs text-muted-foreground">Computer Scientist · Legal Scholar · Cryptographer</div>
                  </div>
                </div>
                <blockquote className="border-l-2 border-[#6366f1] pl-4 italic text-sm text-muted-foreground">
                  "A smart contract is a set of promises, specified in digital form, including protocols within which the parties perform on these promises."
                </blockquote>
                <div className="mt-2 text-right text-xs text-muted-foreground">— Nick Szabo, 1994</div>
              </div>

              <div className="p-4 bg-card border border-border rounded-xl flex-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Why it matters</div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Szabo coined "smart contract" in <span className="text-foreground font-semibold">1994</span> — 15 years before Bitcoin</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>He understood that contracts are fundamentally <span className="text-foreground font-semibold">algorithms</span></li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>The missing piece was a <span className="text-foreground font-semibold">trusted execution environment</span> — which blockchain finally provides</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Szabo also created <span className="text-foreground font-semibold">Bit Gold</span> (1998) — a direct precursor to Bitcoin's design</li>
                </ul>
              </div>
            </div>

            {/* Right: Vending machine diagram */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">The vending machine model</div>

              <div className="flex-1 flex flex-col items-center justify-center gap-0">
                {/* Steps */}
                {[
                  { step: '1', actor: '👤 Customer', action: 'Inserts coins + selects item', color: '#6366f1', arrow: true },
                  { step: '2', actor: '🤖 Machine (Contract)', action: 'Checks: enough coins? Item available?', color: '#8b5cf6', arrow: true },
                  { step: '3a', actor: '✅ Condition Met', action: 'Dispenses item · Returns change', color: '#39B54A', arrow: false },
                  { step: '3b', actor: '❌ Condition Not Met', action: 'Returns coins · No item dispensed', color: '#ED1C24', arrow: false },
                ].map((s, i) => (
                  <div key={s.step} className="w-full flex flex-col items-center">
                    <div
                      className="w-full max-w-sm p-3 rounded-xl border-2 text-center"
                      style={{ borderColor: s.color + '50', backgroundColor: s.color + '10' }}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: s.color }}>Step {s.step}</div>
                      <div className="font-bold text-sm text-foreground">{s.actor}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.action}</div>
                    </div>
                    {s.arrow && (
                      <div className="text-muted-foreground text-lg my-0.5">↓</div>
                    )}
                    {i === 1 && (
                      <div className="flex gap-6 mt-0.5">
                        <div className="text-xs text-[#39B54A] font-bold">YES →</div>
                        <div className="text-xs text-[#ED1C24] font-bold">NO →</div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-4 p-3 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl w-full max-w-sm text-center">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Key insight:</span> the machine doesn't care who you are. No trust, no negotiation, no middleman. The code <em>is</em> the contract.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ 3. HISTORICAL EVOLUTION ═══════ */}
        <div id="s1-history" className="h-full">
          <TimelineSlide
            title="Historical Evolution of Smart Contracts"
            events={[
              {
                year: '1998',
                title: 'Szabo designs Bit Gold',
                description: 'The closest precursor to Bitcoin: proof-of-work chains of ownership. Still lacks a decentralized execution environment to run contracts.',
              },
              {
                year: '2009',
                title: 'Bitcoin launches — limited scripting',
                description: 'Bitcoin Script enables basic conditional logic (multisig, timelocks) but is intentionally non-Turing-complete. Smart contracts remain constrained.',
              },
              {
                year: '2015',
                title: 'Ethereum mainnet — Solidity launches',
                description: 'The first general-purpose smart contract platform goes live. Developers can now write arbitrary business logic on a global, trustless computer.',
              },
              {
                year: '2016',
                title: 'The DAO hack — $60M drained',
                description: 'A reentrancy bug is exploited repeatedly before anyone can react. Ethereum hard-forks to recover funds. "Code is law" meets its first major stress test.',
              },
              {
                year: '2017',
                title: 'ICO boom — ERC-20 tokens',
                description: 'ERC-20 lets anyone issue a token and raise capital via smart contract in minutes. Billions raised; most projects fail. Regulation follows.',
              },
              {
                year: '2020',
                title: 'DeFi Summer — protocols replace banks',
                description: 'Uniswap, Compound, Aave lock $1B+ in smart contracts. Permissionless lending, trading, and yield — no banks, no accounts, no KYC.',
              },
              {
                year: '2021',
                title: 'NFT explosion — ERC-721 goes mainstream',
                description: '$41B NFT market. On-chain ownership of art, collectibles, and gaming assets. Smart contracts enforce royalties automatically on every resale.',
              },
              {
                year: 'Today',
                title: '$100B+ locked — multi-chain ecosystem',
                description: 'Ethereum, Solana, BNB Chain, Avalanche, and L2s host thousands of live contracts. Security is now the primary battleground — $6B+ lost to exploits since 2016.',
              },
            ]}
          />
        </div>

        {/* ═══════ TOKEN STANDARDS ═══════ */}
        <div id="s1-standards" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">Section 01</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Token Standards: ERC-20, ERC-721, ERC-1155</h2>
            <p className="text-sm text-muted-foreground">Token standards are shared interfaces — agreed-upon function signatures that let any wallet, exchange, or protocol interact with any token without custom integration.</p>
          </div>
          <div className="flex-1 min-h-0 flex gap-4">
            {([
              {
                standard: 'ERC-20',
                color: '#6366f1',
                icon: '🪙',
                name: 'Fungible Token',
                tagline: 'Every unit is identical and interchangeable',
                howItWorks: 'Each token is indistinguishable from another of the same contract. 1 USDC = 1 USDC. Balances tracked in a mapping(address => uint256).',
                coreFunctions: ['transfer(to, amount)', 'approve(spender, amount)', 'transferFrom(from, to, amount)', 'balanceOf(address) → uint256', 'allowance(owner, spender) → uint256'],
                examples: ['USDC, USDT — stablecoins', 'UNI, AAVE — governance tokens', 'WETH — wrapped ETH', 'DAI — algorithmic stablecoin'],
                keyInsight: 'The allowance pattern enables DeFi composability — you approve a DEX contract to move your tokens, then the swap executes in one atomic transaction.',
                insightColor: '#6366f1',
              },
              {
                standard: 'ERC-721',
                color: '#f97316',
                icon: '🖼️',
                name: 'Non-Fungible Token (NFT)',
                tagline: 'Each token has a unique ID and is not interchangeable',
                howItWorks: 'Each token has a unique uint256 tokenId. Ownership tracked in mapping(uint256 => address). Metadata (image, attributes) stored off-chain via tokenURI().',
                coreFunctions: ['ownerOf(tokenId) → address', 'transferFrom(from, to, tokenId)', 'approve(to, tokenId)', 'setApprovalForAll(operator, bool)', 'tokenURI(tokenId) → string'],
                examples: ['CryptoPunks, Bored Apes — profile pictures', 'ENS domains — .eth names', 'Real estate title deeds (Propy)', 'California DMV vehicle titles'],
                keyInsight: 'tokenURI() is a critical off-chain dependency — if the metadata server goes down, the NFT image disappears. IPFS pinning is the standard mitigation.',
                insightColor: '#f97316',
              },
              {
                standard: 'ERC-1155',
                color: '#39B54A',
                icon: '🎮',
                name: 'Multi-Token Standard',
                tagline: 'One contract holds both fungible and non-fungible tokens',
                howItWorks: 'Uses mapping(uint256 => mapping(address => uint256)) — each token ID can be fungible (supply > 1) or non-fungible (supply = 1). Batch transfers in a single call.',
                coreFunctions: ['balanceOf(account, id) → uint256', 'balanceOfBatch(accounts[], ids[]) → uint256[]', 'safeTransferFrom(from, to, id, amount, data)', 'safeBatchTransferFrom(from, to, ids[], amounts[], data)'],
                examples: ['Gaming items — 1000× common sword (fungible), 1× legendary weapon (NFT)', 'Event tickets — 500 general admission + 10 VIP', 'Fractional NFT ownership', 'Multi-asset DeFi vaults'],
                keyInsight: 'Batch transfers are the killer feature — send 50 different game items in one transaction instead of 50. Gas savings of 80–90% vs multiple ERC-20/721 transfers.',
                insightColor: '#39B54A',
              },
            ] as const).map(s => (
              <div key={s.standard} className="flex-1 flex flex-col rounded-xl border-2 bg-card overflow-hidden" style={{ borderColor: s.color + '40' }}>
                <div className="h-1.5 shrink-0" style={{ backgroundColor: s.color }} />
                <div className="flex flex-col flex-1 p-4 min-h-0 gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <div className="font-black text-base" style={{ color: s.color }}>{s.standard}</div>
                      <div className="text-xs font-semibold text-foreground">{s.name}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic shrink-0">{s.tagline}</p>
                  <p className="text-xs text-muted-foreground shrink-0">{s.howItWorks}</p>
                  <div className="shrink-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Core Interface</div>
                    <div className="bg-[#0d1117] rounded-lg p-2 font-mono space-y-0.5">
                      {s.coreFunctions.map(f => <div key={f} className="text-xs" style={{ color: s.color }}>{f}</div>)}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Real Examples</div>
                    <ul className="space-y-0.5">
                      {s.examples.map(e => <li key={e} className="text-xs text-muted-foreground flex gap-1.5"><span style={{ color: s.color }}>•</span>{e}</li>)}
                    </ul>
                  </div>
                  <div className="mt-auto pt-3 border-t border-border shrink-0">
                    <div className="text-xs font-semibold mb-0.5" style={{ color: s.insightColor }}>Key Insight</div>
                    <div className="text-xs text-muted-foreground">{s.keyInsight}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ EXERCISE ═══════ */}
        <div id="s1-exercise" className="h-full">
          <SmartContractSortingExercise />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s1-quiz" className="h-full">
          <QuizSlide
            question="Nick Szabo introduced the concept of smart contracts in 1994. Which real-world object did he use as the foundational analogy to explain how they work?"
            options={[
              { text: 'A notary office — a trusted third party that validates and records agreements between parties.', correct: false },
              { text: 'A vending machine — a mechanism that autonomously enforces the terms of a transaction without a human intermediary.', correct: true },
              { text: 'A court of law — an authority that resolves disputes and enforces contractual obligations after the fact.', correct: false },
              { text: 'A bank vault — a secure system that holds assets until conditions agreed by both parties are met.', correct: false },
            ]}
            explanation="Szabo used the vending machine as his canonical analogy: you insert money, select an item, and the machine automatically verifies the payment and delivers the product — no cashier, no trust, no dispute. The machine's logic is the contract. Szabo's insight was that this same principle — conditional logic enforced by a mechanism rather than a person — could be embedded in digital protocols. This became the intellectual foundation for Ethereum's smart contract model two decades later."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s1-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 01 — Key Takeaways"
            takeaways={[
              'A smart contract is self-executing code on a blockchain — no intermediary can stop or alter it',
              'Nick Szabo described the concept in 1994; Bitcoin (2009) and Ethereum (2015) made it real',
              'Key properties: autonomous, immutable, transparent, deterministic, trustless',
              'The vending machine model: conditions → automatic execution, no human judgment needed',
              'DeFi, NFTs, and DAOs are all smart contracts at different scales',
              '$6B+ lost to exploits — the power of smart contracts comes with serious security responsibility',
            ]}
          />
        </div>

        {/* ═══════ SUMMARY ═══════ */}
        <div id="s1-summary" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Section Summary</h2>
            <p className="text-sm text-muted-foreground mt-1">Everything covered in this section — at a glance</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-start">
            {[
              { icon: '📜', title: 'Nick Szabo (1994)', summary: '"Contractual clauses embedded in hardware and software" — the original idea, 20 years before Ethereum' },
              { icon: '⛓️', title: 'Bitcoin Scripts', summary: 'Limited but valid smart contracts: multi-sig, time locks, HTLCs — intentionally not Turing-complete' },
              { icon: '🌐', title: 'Ethereum (2015)', summary: 'Turing-complete EVM enabled arbitrary smart contracts, opening DeFi, NFTs, and DAOs' },
              { icon: '✅', title: 'Key Properties', summary: 'Immutable, autonomous, transparent, trust-minimized, deterministic — all enforced by the protocol' },
              { icon: '⚠️', title: 'Code is Law Limits', summary: 'Bugs (The DAO: $60M), oracle failure, no legal standing — code is law until it isn\'t' },
              { icon: '🎯', title: 'When to Use', summary: 'Multiple untrusting parties + conditional logic + no trusted intermediary = smart contract territory' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex flex-col gap-2 p-4 rounded-2xl border bg-card"
                style={{ borderColor: '#6366f130' }}
              >
                <div className="text-3xl">{card.icon}</div>
                <div className="font-bold text-sm text-foreground">{card.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{card.summary}</div>
              </motion.div>
            ))}
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-border bg-card/50 text-center">
            <span className="text-xs text-muted-foreground">Proceed to Section 2 to explore the Smart Contract ecosystem →</span>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
