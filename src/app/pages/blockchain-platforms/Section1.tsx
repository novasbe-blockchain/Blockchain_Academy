import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Bitcoin, Zap } from 'lucide-react';
import { CalloutBox } from '../../components/shared/CalloutBox';

const chapters = [
  { id: 's1-architecture', label: 'Architecture' },
  { id: 's1-transaction', label: 'Transaction' },
  { id: 's1-utxo-exercise', label: 'UTXO Exercise' },
  { id: 's1-pow', label: 'Proof of Work' },
  { id: 's1-trilemma', label: 'Trilemma' },
  { id: 's1-apps', label: 'Apps' },
  { id: 's1-lightning', label: 'Lightning Network' },
  { id: 's1-quiz', label: 'Quiz' },
  { id: 's1-takeaways', label: 'Takeaways' },
  { id: 's1-summary', label: 'Summary' },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const LAYERS = [
  {
    id: 'app',
    label: 'Application Layer',
    sublabel: 'Wallets · Exchanges · Block explorers',
    color: '#6366f1',
    icon: '💼',
    description: 'The user-facing layer. Wallets (MetaMask, Ledger), exchanges, and explorers translate raw blockchain data into readable interfaces. They communicate with the network via RPC calls to nodes.',
    examples: ['Bitcoin Core wallet', 'Electrum', 'Mempool.space'],
  },
  {
    id: 'p2p',
    label: 'Network Layer (P2P)',
    sublabel: 'Gossip protocol · Node discovery · Mempool',
    color: '#39B54A',
    icon: '🌐',
    description: 'Nodes find each other using DNS seeds and a gossip protocol. Every unconfirmed transaction is broadcast peer-to-peer and held in each node\'s mempool until mined into a block.',
    examples: ['~50,000 reachable nodes', 'TCP port 8333', 'INV / GETDATA messages'],
  },
  {
    id: 'consensus',
    label: 'Consensus Layer',
    sublabel: 'Proof of Work · Difficulty adjustment · Longest chain',
    color: '#f59e0b',
    icon: '⛏️',
    description: 'Miners compete to find a nonce that makes the block hash start with enough leading zeros. Difficulty adjusts every 2,016 blocks (~2 weeks) to keep block time at ~10 minutes. The chain with the most accumulated work wins.',
    examples: ['SHA-256 hashing', 'Target difficulty', 'Nakamoto consensus'],
  },
  {
    id: 'data',
    label: 'Data Layer',
    sublabel: 'Blocks · UTXO set · Merkle trees',
    color: '#ED1C24',
    icon: '🗄️',
    description: 'Blocks chain together via hash pointers. Each block contains a Merkle root of its transactions, enabling lightweight SPV proofs. The UTXO set is the minimal state needed to validate new transactions.',
    examples: ['~600 GB full chain', 'Merkle proof in O(log n)', 'UTXO set ~6 GB'],
  },
];

function BitcoinArchitectureSlide() {
  const [active, setActive] = useState<string | null>(null);
  const activeLayer = LAYERS.find(l => l.id === active);

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Bitcoin Architecture</h2>
        <p className="text-muted-foreground text-sm mt-1">Four layers power the Bitcoin network — click any layer to explore it in detail.</p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4">

        {/* ── 4 large layer cards ── */}
        <div className="grid grid-cols-4 gap-3 shrink-0">
          {LAYERS.map((layer, i) => (
            <motion.button
              key={layer.id}
              onClick={() => setActive(active === layer.id ? null : layer.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 cursor-pointer transition-all text-center"
              style={{
                borderColor: active === layer.id ? layer.color : layer.color + '40',
                backgroundColor: active === layer.id ? layer.color + '18' : layer.color + '08',
              }}
            >
              <span className="text-4xl">{layer.icon}</span>
              <div className="font-bold text-sm lg:text-base text-foreground">{layer.label}</div>
              <div className="text-xs text-muted-foreground leading-snug">{layer.sublabel}</div>
              <motion.div
                className="w-12 h-1 rounded-full mt-1"
                style={{ backgroundColor: layer.color }}
                animate={{ scaleX: active === layer.id ? 2 : 1, opacity: active === layer.id ? 1 : 0.4 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </div>

        {/* ── Detail panel ── */}
        <div className="flex-1 min-h-0 relative">
          <AnimatePresence mode="wait">
            {activeLayer ? (
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="h-full rounded-2xl border-2 p-6 flex gap-8"
                style={{ borderColor: activeLayer.color + '50', background: `linear-gradient(135deg, ${activeLayer.color}10, transparent)` }}
              >
                {/* Left: description + facts */}
                <div className="flex flex-col gap-4 w-72 shrink-0">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{activeLayer.icon}</span>
                    <div>
                      <h3 className="text-xl font-black text-foreground">{activeLayer.label}</h3>
                      <p className="text-xs text-muted-foreground">{activeLayer.sublabel}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{activeLayer.description}</p>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Facts</p>
                    <div className="flex flex-col gap-1.5">
                      {activeLayer.examples.map(ex => (
                        <motion.span
                          key={ex}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium border"
                          style={{ color: activeLayer.color, borderColor: activeLayer.color + '40', backgroundColor: activeLayer.color + '10' }}
                        >
                          {ex}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: layer-specific visual */}
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-3">
                  {activeLayer.id === 'data' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-col gap-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Block chain — hash linking</p>
                      <div className="flex items-stretch gap-2">
                        {['#839,998', '#839,999', '#840,000', '#840,001'].map((num, idx) => (
                          <div key={num} className="flex items-center gap-2 flex-1">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 + idx * 0.12 }}
                              className="flex-1 rounded-xl border-2 p-3 text-center"
                              style={{ borderColor: '#ED1C2460', backgroundColor: '#ED1C2410' }}
                            >
                              <div className="text-xs font-black text-[#ED1C24]">BLOCK</div>
                              <div className="text-sm font-bold text-foreground mt-1">{num}</div>
                              <div className="text-[10px] text-muted-foreground mt-2 font-mono">prev: 0xa3f…</div>
                              <div className="text-[10px] text-muted-foreground font-mono">root: 0x7b2…</div>
                            </motion.div>
                            {idx < 3 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 + idx * 0.12 }}
                                className="text-[#ED1C24] font-bold text-lg shrink-0"
                              >→</motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Each block header references the previous hash — altering any block breaks all subsequent blocks.</p>
                    </motion.div>
                  )}
                  {activeLayer.id === 'p2p' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-col gap-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Transaction propagation</p>
                      <div className="flex items-center gap-2">
                        {[
                          { label: 'Alice', emoji: '👩', desc: 'Signs & broadcasts tx to 8 peers' },
                          { label: 'Peers', emoji: '🔁', desc: 'Each relays to their own peers' },
                          { label: 'Network', emoji: '🌐', desc: 'Reaches ~50k nodes in <1 sec' },
                          { label: 'Miner', emoji: '⛏️', desc: 'Picks from mempool & mines block' },
                        ].map((step, idx) => (
                          <div key={step.label} className="flex items-center gap-2 flex-1">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + idx * 0.15 }}
                              className="flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-card text-center"
                            >
                              <span className="text-3xl">{step.emoji}</span>
                              <div className="text-xs font-bold text-foreground">{step.label}</div>
                              <div className="text-xs text-muted-foreground leading-tight">{step.desc}</div>
                            </motion.div>
                            {idx < 3 && <span className="text-muted-foreground font-bold shrink-0">→</span>}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {activeLayer.id === 'consensus' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-col gap-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Mining: find the nonce</p>
                      <div className="font-mono text-sm p-4 rounded-xl border border-border bg-card">
                        <div className="text-muted-foreground">SHA256( block_header + <span className="text-[#f59e0b] font-bold">nonce</span> )</div>
                        <div className="text-[#f59e0b] mt-2 font-bold">= 0000000000000000000abc… ✓</div>
                        <div className="text-muted-foreground text-xs mt-2">Must start with enough leading zeros to meet current target difficulty</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['Adjusts every 2,016 blocks', '~2 weeks per adjustment', '10 min block target'].map(fact => (
                          <div key={fact} className="p-2 rounded-lg border border-[#f59e0b]/40 text-center text-xs font-medium" style={{ backgroundColor: '#f59e0b0d', color: '#f59e0b' }}>{fact}</div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {activeLayer.id === 'app' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-col gap-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Applications on Bitcoin</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { icon: '💼', name: 'Wallets', ex: 'Electrum, Ledger, Bitcoin Core' },
                          { icon: '🔍', name: 'Explorers', ex: 'mempool.space, blockstream.info' },
                          { icon: '🔄', name: 'Exchanges', ex: 'Coinbase, Kraken, Binance' },
                        ].map(app => (
                          <div key={app.name} className="p-3 rounded-xl border border-border bg-card text-center">
                            <div className="text-2xl mb-1">{app.icon}</div>
                            <div className="font-bold text-sm text-foreground">{app.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{app.ex}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Apps communicate with the network via RPC calls to Bitcoin Core nodes (port 8332).</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full rounded-2xl border-2 border-dashed border-border flex items-center justify-center"
              >
                <p className="text-muted-foreground text-sm">↑ Click a layer above to explore it</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

// ─── UTXO Exercise ────────────────────────────────────────────────────────────

const UTXO_SCENARIOS = [
  {
    id: 1,
    title: 'Simple payment',
    context: 'Alice wants to send 0.4 BTC to Bob. Fee: 0.01 BTC. Which UTXOs should she use?',
    target: 0.4,
    fee: 0.01,
    utxos: [
      { id: 'u1', amount: 0.3, label: 'UTXO A — 0.3 BTC', from: 'Mining reward (2023)' },
      { id: 'u2', amount: 0.5, label: 'UTXO B — 0.5 BTC', from: 'Payment received (2024)' },
      { id: 'u3', amount: 0.1, label: 'UTXO C — 0.1 BTC', from: 'Change output (2024)' },
    ],
    bestInputs: ['u2'],
    explanation: 'UTXO B (0.5 BTC) alone covers 0.4 + 0.01 BTC. Change = 0.5 − 0.4 − 0.01 = 0.09 BTC back to Alice. Using only 1 input keeps fees low.',
  },
  {
    id: 2,
    title: 'Combining small UTXOs',
    context: 'Alice wants to send 0.6 BTC to Carol. Fee: 0.01 BTC. No single UTXO covers it.',
    target: 0.6,
    fee: 0.01,
    utxos: [
      { id: 'u1', amount: 0.35, label: 'UTXO A — 0.35 BTC', from: 'Previous sale (2024)' },
      { id: 'u2', amount: 0.4, label: 'UTXO B — 0.40 BTC', from: 'Mining reward (2024)' },
      { id: 'u3', amount: 0.15, label: 'UTXO C — 0.15 BTC', from: 'Tip received (2023)' },
    ],
    bestInputs: ['u1', 'u2'],
    explanation: 'UTXO A + B = 0.75 BTC. Covers 0.6 + 0.01 BTC. Change = 0.75 − 0.6 − 0.01 = 0.14 BTC back to Alice. UTXO C is not needed.',
  },
];

function UTXOExercise() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const scenario = UTXO_SCENARIOS[scenarioIdx];
  const total = selected.reduce((acc, id) => {
    const u = scenario.utxos.find(x => x.id === id);
    return acc + (u ? u.amount : 0);
  }, 0);
  const needed = scenario.target + scenario.fee;
  const sufficient = total >= needed;
  const change = sufficient ? Math.round((total - scenario.target - scenario.fee) * 1000) / 1000 : 0;

  function toggleUTXO(id: string) {
    if (revealed) return;
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function nextScenario() {
    setScenarioIdx(i => (i + 1) % UTXO_SCENARIOS.length);
    setSelected([]);
    setRevealed(false);
  }

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Exercise: Build a Bitcoin Transaction</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select UTXOs to cover the payment + fee. The wallet must spend entire UTXOs — excess becomes change.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left — scenario + UTXO picker */}
        <div className="flex flex-col gap-4">
          {/* Scenario header */}
          <div className="shrink-0 p-4 rounded-xl border-2 border-[#f59e0b]/40" style={{ backgroundColor: '#f59e0b08' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f59e0b]">Scenario {scenario.id} of {UTXO_SCENARIOS.length}</span>
              <button
                onClick={nextScenario}
                className="text-xs px-2 py-1 rounded-lg border border-border text-muted-foreground hover:bg-card cursor-pointer transition-all"
              >
                Next →
              </button>
            </div>
            <div className="font-bold text-base text-foreground mb-1">{scenario.title}</div>
            <div className="text-sm text-muted-foreground">{scenario.context}</div>
            <div className="flex gap-4 mt-3 text-sm">
              <div><span className="text-muted-foreground">Send: </span><span className="font-bold text-foreground">{scenario.target} BTC</span></div>
              <div><span className="text-muted-foreground">Fee: </span><span className="font-bold text-foreground">{scenario.fee} BTC</span></div>
              <div><span className="text-muted-foreground">Need: </span><span className="font-bold text-[#f59e0b]">{needed} BTC total</span></div>
            </div>
          </div>

          {/* UTXO cards */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Alice's UTXOs — click to select</div>
            {scenario.utxos.map(u => {
              const isSelected = selected.includes(u.id);
              return (
                <button
                  key={u.id}
                  onClick={() => toggleUTXO(u.id)}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 text-left cursor-pointer transition-all flex-1"
                  style={{
                    borderColor: isSelected ? '#f59e0b' : 'var(--border)',
                    backgroundColor: isSelected ? '#f59e0b14' : 'var(--card)',
                  }}
                >
                  <div
                    className="size-5 rounded border-2 shrink-0 flex items-center justify-center"
                    style={{ borderColor: isSelected ? '#f59e0b' : 'var(--border)', backgroundColor: isSelected ? '#f59e0b' : 'transparent' }}
                  >
                    {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-base text-foreground">{u.label}</div>
                    <div className="text-xs text-muted-foreground">{u.from}</div>
                  </div>
                  <span className="font-mono font-bold text-sm" style={{ color: isSelected ? '#f59e0b' : 'var(--muted-foreground)' }}>
                    {u.amount} BTC
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — transaction summary */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0">Transaction preview</div>

          {/* Inputs */}
          <div className="p-4 rounded-xl border border-border bg-card flex-1">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Inputs</div>
            {selected.length === 0 ? (
              <div className="text-sm text-muted-foreground italic">No UTXOs selected yet</div>
            ) : (
              <div className="flex flex-col gap-2">
                {selected.map(id => {
                  const u = scenario.utxos.find(x => x.id === id)!;
                  return (
                    <div key={id} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: '#f59e0b0a', border: '1px solid #f59e0b30' }}>
                      <span className="text-sm text-foreground">{u.label}</span>
                      <span className="font-mono text-sm font-bold text-[#f59e0b]">+{u.amount} BTC</span>
                    </div>
                  );
                })}
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-xs font-bold text-muted-foreground">Total inputs</span>
                  <span className="font-mono font-bold text-sm text-foreground">{Math.round(total * 1000) / 1000} BTC</span>
                </div>
              </div>
            )}

            {/* Outputs */}
            {selected.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Outputs</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: '#39B54A0a', border: '1px solid #39B54A30' }}>
                    <span className="text-sm text-foreground">→ Recipient</span>
                    <span className="font-mono text-sm font-bold text-[#39B54A]">{scenario.target} BTC</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: '#6366f10a', border: '1px solid #6366f130' }}>
                    <span className="text-sm text-foreground">← Change to Alice</span>
                    <span className="font-mono text-sm font-bold text-[#6366f1]">
                      {sufficient ? `${change} BTC` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: '#ED1C240a', border: '1px solid #ED1C2430' }}>
                    <span className="text-sm text-foreground">⛏️ Miner fee</span>
                    <span className="font-mono text-sm font-bold text-[#ED1C24]">{scenario.fee} BTC</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Status + reveal */}
          {selected.length > 0 && (
            <div className="shrink-0 flex flex-col gap-2">
              <div
                className="p-3 rounded-xl border text-sm font-semibold text-center"
                style={{
                  borderColor: sufficient ? '#39B54A60' : '#ED1C2460',
                  backgroundColor: sufficient ? '#39B54A0d' : '#ED1C240d',
                  color: sufficient ? '#39B54A' : '#ED1C24',
                }}
              >
                {sufficient
                  ? `✓ Valid — inputs cover ${needed} BTC needed`
                  : `✗ Insufficient — need ${needed} BTC, have ${Math.round(total * 1000) / 1000} BTC`
                }
              </div>
              {sufficient && !revealed && (
                <button
                  onClick={() => setRevealed(true)}
                  className="py-2 px-4 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all"
                  style={{ borderColor: '#39B54A', backgroundColor: '#39B54A18', color: '#39B54A' }}
                >
                  Check optimal solution
                </button>
              )}
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl border border-[#6366f1]/40"
                  style={{ backgroundColor: '#6366f10d' }}
                >
                  <div className="text-xs font-bold text-[#6366f1] mb-1">Optimal answer</div>
                  <div className="text-xs text-muted-foreground">{scenario.explanation}</div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Trilemma ────────────────────────────────────────────────────────────────

const TRILEMMA_VERTICES = {
  security:         { color: '#f59e0b', icon: '🔒', name: 'Security',          desc: 'Resistant to attacks',         pos: { x: 270, y: 110 } },
  decentralization: { color: '#39B54A', icon: '🌐', name: 'Decentralization',  desc: 'No single point of control',   pos: { x: 90,  y: 380 } },
  scalability:      { color: '#ED1C24', icon: '⚡', name: 'Scalability',       desc: 'High throughput, low fees',    pos: { x: 450, y: 380 } },
} as const;

type VertexId = keyof typeof TRILEMMA_VERTICES;

const TRILEMMA_PLATFORMS: {
  id: string;
  name: string;
  symbol: string;
  color: string;
  picks: VertexId[];
  sacrifices: VertexId | null;
  tagline: string;
  stats: { label: string; value: string }[];
  detail: string;
}[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: '₿',
    color: '#f59e0b',
    picks: ['security', 'decentralization'],
    sacrifices: 'scalability',
    tagline: 'Security & decentralization first',
    stats: [
      { label: 'On-chain TPS', value: '~7' },
      { label: 'Reachable nodes', value: '50k+' },
    ],
    detail: 'Every full node validates every transaction. Layer 2 (Lightning Network) handles micropayments off-chain.',
  },
  {
    id: 'ethereum',
    name: 'Ethereum + L2',
    symbol: '◆',
    color: '#6366f1',
    picks: ['security', 'decentralization', 'scalability'],
    sacrifices: null,
    tagline: 'Modular: L1 secures, L2 scales',
    stats: [
      { label: 'L1 TPS', value: '~15' },
      { label: 'Effective L2 TPS', value: '1000s' },
    ],
    detail: 'Rollups (Arbitrum, Optimism, zkSync) batch thousands of L2 transactions into a single L1 proof — inheriting Ethereum\'s security.',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: '◎',
    color: '#ED1C24',
    picks: ['security', 'scalability'],
    sacrifices: 'decentralization',
    tagline: 'Throughput first, fewer validators',
    stats: [
      { label: 'Theoretical TPS', value: '~65k' },
      { label: 'Validators', value: '~2k' },
    ],
    detail: 'High hardware requirements concentrate the validator set. The network has experienced multiple outages.',
  },
];

function TrilemmaSlide() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = TRILEMMA_PLATFORMS.find(p => p.id === hovered) ?? null;

  const isPicked = (v: VertexId) => active ? active.picks.includes(v) : false;
  const isSacrificed = (v: VertexId) => active?.sacrifices === v;
  const isEdgeActive = (a: VertexId, b: VertexId) => active ? active.picks.includes(a) && active.picks.includes(b) : false;

  // Card position for each vertex (relative to the SVG container)
  const vertexCardStyle = (id: VertexId): React.CSSProperties => {
    if (id === 'security')         return { left: '50%', top: 0,        transform: 'translate(-50%, -8%)' };
    if (id === 'decentralization') return { left: 0,    bottom: 0,      transform: 'translate(-4%, 20%)' };
    return                                { right: 0,   bottom: 0,      transform: 'translate(4%, 20%)' };
  };

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      {/* Header */}
      <div className="shrink-0 mb-5">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">The Blockchain Trilemma</h2>
        <p className="text-muted-foreground text-sm mt-1">A blockchain can excel at any two of these — the third becomes a trade-off.</p>
      </div>

      <div className="flex-1 min-h-0 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-6 lg:gap-8">
        {/* ── Triangle column ── */}
        <div className="relative flex items-center justify-center min-h-0">
          <div className="relative w-full max-w-[540px]" style={{ aspectRatio: '540 / 500' }}>
            <svg viewBox="0 0 540 500" className="absolute inset-0 w-full h-full overflow-visible">
              <defs>
                <linearGradient id="edge-S-D" gradientUnits="userSpaceOnUse" x1="270" y1="110" x2="90" y2="380">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#39B54A" />
                </linearGradient>
                <linearGradient id="edge-S-Sc" gradientUnits="userSpaceOnUse" x1="270" y1="110" x2="450" y2="380">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ED1C24" />
                </linearGradient>
                <linearGradient id="edge-D-Sc" gradientUnits="userSpaceOnUse" x1="90" y1="380" x2="450" y2="380">
                  <stop offset="0%" stopColor="#39B54A" />
                  <stop offset="100%" stopColor="#ED1C24" />
                </linearGradient>
                <radialGradient id="triFill" cx="50%" cy="55%" r="55%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Inner triangle fill */}
              <polygon points="270,110 90,380 450,380" fill="url(#triFill)" />

              {/* Edges (lines) */}
              {([
                { a: 'security', b: 'decentralization', x1: 270, y1: 110, x2: 90, y2: 380, gradient: 'edge-S-D' },
                { a: 'security', b: 'scalability',     x1: 270, y1: 110, x2: 450, y2: 380, gradient: 'edge-S-Sc' },
                { a: 'decentralization', b: 'scalability', x1: 90, y1: 380, x2: 450, y2: 380, gradient: 'edge-D-Sc' },
              ] as const).map(e => {
                const isActive = isEdgeActive(e.a, e.b);
                const dim = active && !isActive;
                return (
                  <motion.line
                    key={`${e.a}-${e.b}`}
                    x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                    stroke={`url(#${e.gradient})`}
                    strokeLinecap="round"
                    initial={false}
                    animate={{
                      strokeWidth: isActive ? 6 : 3,
                      strokeOpacity: dim ? 0.18 : isActive ? 1 : 0.55,
                    }}
                    transition={{ duration: 0.25 }}
                    style={isActive ? { filter: `drop-shadow(0 0 10px currentColor)` } : undefined}
                  />
                );
              })}

              {/* Vertex dots inside the SVG (small connector points) */}
              {(Object.entries(TRILEMMA_VERTICES) as [VertexId, typeof TRILEMMA_VERTICES[VertexId]][]).map(([id, v]) => {
                const picked = isPicked(id);
                const sacrificed = isSacrificed(id);
                return (
                  <motion.circle
                    key={id}
                    cx={v.pos.x} cy={v.pos.y}
                    fill={v.color}
                    initial={false}
                    animate={{
                      r: picked ? 12 : sacrificed ? 5 : 8,
                      opacity: active && !picked && !sacrificed ? 0.4 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    style={picked ? { filter: `drop-shadow(0 0 12px ${v.color})` } : undefined}
                  />
                );
              })}

              {/* Center label */}
              <text x={270} y={258} textAnchor="middle" className="fill-muted-foreground" fontSize="11" letterSpacing="4" fontWeight="700">CHOOSE</text>
              <text x={270} y={300} textAnchor="middle" className="fill-foreground" fontSize="44" fontWeight="900" letterSpacing="-1">TWO</text>
              {active && (
                <motion.text
                  key={active.id}
                  x={270} y={332}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="2"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  fill={active.color}
                >
                  {active.name.toUpperCase()}
                </motion.text>
              )}
            </svg>

            {/* Vertex label cards (HTML, positioned around the triangle) */}
            {(Object.entries(TRILEMMA_VERTICES) as [VertexId, typeof TRILEMMA_VERTICES[VertexId]][]).map(([id, v]) => {
              const picked = isPicked(id);
              const sacrificed = isSacrificed(id);
              const dimmed = active && !picked && !sacrificed;
              return (
                <motion.div
                  key={id}
                  className="absolute"
                  style={vertexCardStyle(id)}
                  initial={false}
                  animate={{
                    scale: picked ? 1.06 : sacrificed ? 0.94 : 1,
                    opacity: dimmed ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="flex flex-col items-center gap-1 px-3.5 py-2 rounded-2xl border-2 bg-card/90 backdrop-blur-sm whitespace-nowrap"
                    style={{
                      borderColor: picked ? v.color : v.color + '50',
                      backgroundColor: picked ? v.color + '15' : undefined,
                      boxShadow: picked ? `0 0 24px ${v.color}55, 0 4px 16px ${v.color}30` : undefined,
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{v.icon}</span>
                      <span className="font-black text-[13px] tracking-tight" style={{ color: v.color }}>{v.name}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground leading-none">{v.desc}</span>
                    {sacrificed && (
                      <span className="text-[9px] font-black uppercase tracking-[2px] mt-0.5 px-1.5 py-0.5 rounded" style={{ color: v.color, backgroundColor: v.color + '15' }}>
                        ↓ traded off
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Platform cards column ── */}
        <div className="flex flex-col gap-3 min-h-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground shrink-0">Hover a platform to compare ↓</p>
          {TRILEMMA_PLATFORMS.map((p, i) => {
            const isHovered = hovered === p.id;
            return (
              <motion.button
                key={p.id}
                type="button"
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(p.id)}
                onBlur={() => setHovered(null)}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
                whileHover={{ x: -3 }}
                className="text-left rounded-xl border-2 p-3.5 bg-card flex flex-col gap-2 relative overflow-hidden cursor-pointer transition-colors flex-1 min-h-0"
                style={{
                  borderColor: isHovered ? p.color : p.color + '35',
                  backgroundColor: isHovered ? p.color + '0a' : undefined,
                }}
              >
                {/* Color accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: p.color }} />

                {/* Header row */}
                <div className="flex items-start justify-between gap-3 pl-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="size-10 shrink-0 rounded-lg flex items-center justify-center text-xl font-black"
                      style={{ backgroundColor: p.color + '20', color: p.color }}
                    >
                      {p.symbol}
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-sm text-foreground truncate">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{p.tagline}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0">
                    {p.stats.map(s => (
                      <div key={s.label} className="text-right leading-tight">
                        <span className="text-xs font-black text-foreground">{s.value}</span>
                        <span className="text-[9px] text-muted-foreground ml-1 uppercase tracking-wider">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillars */}
                <div className="flex flex-wrap gap-1 pl-2">
                  {p.picks.map(pick => (
                    <span
                      key={pick}
                      className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                      style={{ backgroundColor: TRILEMMA_VERTICES[pick].color + '22', color: TRILEMMA_VERTICES[pick].color }}
                    >
                      ✓ {TRILEMMA_VERTICES[pick].name}
                    </span>
                  ))}
                  {p.sacrifices && (
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                      style={{
                        backgroundColor: TRILEMMA_VERTICES[p.sacrifices].color + '12',
                        color: TRILEMMA_VERTICES[p.sacrifices].color,
                        textDecoration: 'line-through',
                        opacity: 0.75,
                      }}
                    >
                      {TRILEMMA_VERTICES[p.sacrifices].name}
                    </span>
                  )}
                </div>

                {/* Detail */}
                <p className="text-xs text-muted-foreground leading-relaxed pl-2">{p.detail}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function BP_Section1() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 01"
            title="Bitcoin: The First Permissionless Blockchain"
            subtitle="Architecture, transactions, Proof of Work, and the Blockchain Trilemma"
            icon={<Bitcoin className="size-20 text-[#f59e0b]" />}
            gradient="from-[#f59e0b] to-[#ED1C24]"
          />
        </div>

        {/* ═══════ ARCHITECTURE ═══════ */}
        <div id="s1-architecture" className="h-full">
          <BitcoinArchitectureSlide />
        </div>

        {/* ═══════ TRANSACTION ═══════ */}
        <div id="s1-transaction" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Bitcoin Transaction &amp; UTXO Model</h2>
            <p className="text-muted-foreground text-sm mt-1">Unspent Transaction Outputs — the accounting primitive behind every bitcoin transfer.</p>
          </div>

          <div className="flex-1 min-h-0 flex gap-6">

            {/* ── Left: UTXO concept ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <div className="rounded-xl border-2 p-4" style={{ borderColor: '#f59e0b40', backgroundColor: '#f59e0b08' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f59e0b' }}>What is a UTXO?</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A <span className="font-semibold text-foreground">UTXO (Unspent Transaction Output)</span> is a discrete chunk of bitcoin that has been received but not yet spent. There are no "account balances" — your wallet software sums up all UTXOs locked to your address.
                </p>
              </div>

              <div className="rounded-xl border p-4 bg-card">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">How inputs &amp; outputs work</p>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded shrink-0 mt-0.5" style={{ backgroundColor: '#f59e0b20', border: '1px solid #f59e0b60' }} />
                    <span><span className="font-semibold text-foreground">Inputs</span> reference a previous UTXO by its transaction ID and output index (vout), and provide a scriptSig to prove ownership.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded shrink-0 mt-0.5" style={{ backgroundColor: '#39B54A20', border: '1px solid #39B54A60' }} />
                    <span><span className="font-semibold text-foreground">Outputs</span> create new UTXOs — each locked to a recipient's public key hash. Once spent, a UTXO is consumed in full.</span>
                  </div>
                </div>
              </div>

              {/* UTXO visual */}
              <div className="rounded-xl border p-4 bg-card flex-1 min-h-0 flex flex-col justify-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Visual: combining UTXOs</p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {/* Inputs */}
                  <div className="flex flex-col gap-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="rounded-lg px-4 py-2 text-center text-sm font-bold"
                      style={{ backgroundColor: '#f59e0b20', border: '2px solid #f59e0b60', color: '#f59e0b' }}
                    >
                      0.3 BTC
                      <div className="text-xs font-normal text-muted-foreground">UTXO #1</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-lg px-4 py-2 text-center text-sm font-bold"
                      style={{ backgroundColor: '#f59e0b20', border: '2px solid #f59e0b60', color: '#f59e0b' }}
                    >
                      0.5 BTC
                      <div className="text-xs font-normal text-muted-foreground">UTXO #2</div>
                    </motion.div>
                  </div>

                  {/* Arrow & tx box */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.35 }}
                      className="flex items-center gap-1"
                    >
                      <div className="h-px w-6" style={{ backgroundColor: '#f59e0b' }} />
                      <div className="rounded-md px-2 py-1 text-xs font-bold text-white" style={{ backgroundColor: '#f59e0b' }}>TX</div>
                      <div className="h-px w-6" style={{ backgroundColor: '#f59e0b' }} />
                    </motion.div>
                    <div className="text-xs text-muted-foreground">fee: 0.1 BTC</div>
                  </div>

                  {/* Outputs */}
                  <div className="flex flex-col gap-2">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 }}
                      className="rounded-lg px-4 py-2 text-center text-sm font-bold"
                      style={{ backgroundColor: '#39B54A20', border: '2px solid #39B54A60', color: '#39B54A' }}
                    >
                      0.6 BTC
                      <div className="text-xs font-normal text-muted-foreground">Bob (new UTXO)</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 }}
                      className="rounded-lg px-4 py-2 text-center text-sm font-bold"
                      style={{ backgroundColor: '#6366f120', border: '2px solid #6366f160', color: '#6366f1' }}
                    >
                      0.1 BTC
                      <div className="text-xs font-normal text-muted-foreground">Alice (change)</div>
                    </motion.div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">Inputs (0.8 BTC) = Outputs (0.7 BTC) + Fee (0.1 BTC)</p>
              </div>
            </div>

            {/* ── Right: Anatomy & Why UTXO ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Anatomy of a Bitcoin Transaction</p>

              {[
                {
                  field: 'Version',
                  color: '#6366f1',
                  value: '2',
                  desc: 'Protocol version — determines which rules apply (e.g. SegWit support).',
                },
                {
                  field: 'Inputs [ ]',
                  color: '#f59e0b',
                  value: '{ txid, vout, scriptSig, sequence }',
                  desc: 'Array of references to previous UTXOs being consumed. scriptSig (or witness) proves ownership.',
                },
                {
                  field: 'Outputs [ ]',
                  color: '#39B54A',
                  value: '{ value (satoshis), scriptPubKey }',
                  desc: 'Array of new UTXOs created. scriptPubKey locks the coins to the recipient\'s address.',
                },
                {
                  field: 'Locktime',
                  color: '#ED1C24',
                  value: '0 (or block/timestamp)',
                  desc: 'Earliest time/block the transaction can be mined. 0 means no delay.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.field}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="rounded-xl border-l-4 p-3 bg-card"
                  style={{ borderLeftColor: item.color }}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-foreground">{item.field}</span>
                    <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: item.color + '18', color: item.color }}>{item.value}</code>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}

              {/* Why UTXO callout */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-auto rounded-xl p-4"
                style={{ background: 'linear-gradient(135deg, #f59e0b18, #f59e0b08)', border: '2px solid #f59e0b50' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">💡</span>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f59e0b' }}>Why UTXO?</span>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { label: 'No global balance', desc: 'No single mutable account state — reduces contention' },
                    { label: 'Stateless validation', desc: 'Each UTXO can be verified independently' },
                    { label: 'Parallel processing', desc: 'Non-overlapping UTXOs can be validated concurrently' },
                  ].map(b => (
                    <div key={b.label} className="flex-1 min-w-24">
                      <div className="text-xs font-semibold text-foreground">{b.label}</div>
                      <div className="text-xs text-muted-foreground">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* ═══════ UTXO EXERCISE ═══════ */}
        <div id="s1-utxo-exercise" className="h-full">
          <UTXOExercise />
        </div>

        {/* ═══════ PROOF OF WORK ═══════ */}
        <div id="s1-pow" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Proof of Work</h2>
            <p className="text-muted-foreground text-sm mt-1">The cryptographic puzzle that makes Bitcoin's consensus tamper-proof.</p>
          </div>

          <div className="flex-1 min-h-0 flex gap-6">

            {/* ── Left: Hash Puzzle ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <div className="rounded-xl border-2 p-4" style={{ borderColor: '#f59e0b40', backgroundColor: '#f59e0b08' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f59e0b' }}>The Hash Puzzle</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bitcoin uses <span className="font-semibold text-foreground">SHA-256</span> (applied twice) to produce a 256-bit digest. Miners must find a <span className="font-semibold text-foreground">nonce</span> such that the resulting block hash is below the current target — meaning it starts with enough leading zeros. This requires brute-force trial and error.
                </p>
              </div>

              {/* Mock block header */}
              <div className="rounded-xl border p-4 bg-card flex-1 min-h-0 flex flex-col">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Block Header Fields</p>
                <div className="flex flex-col gap-2 font-mono text-xs flex-1 justify-center">
                  {[
                    { field: 'version', value: '0x20000000', color: '#6366f1' },
                    { field: 'prevHash', value: '00000000000000000002a7c4...', color: '#f59e0b' },
                    { field: 'merkleRoot', value: '4a5e1e4baab89f3a32518a88...', color: '#39B54A' },
                    { field: 'timestamp', value: '1714608932', color: '#6366f1' },
                    { field: 'bits', value: '0x17053894  (target)', color: '#ED1C24' },
                    { field: 'nonce', value: '3,829,714,012', color: '#f59e0b' },
                  ].map((row, i) => (
                    <motion.div
                      key={row.field}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.08 }}
                      className="flex items-baseline gap-3 rounded px-2 py-1"
                      style={{ backgroundColor: row.color + '0c' }}
                    >
                      <span className="w-24 shrink-0 font-bold" style={{ color: row.color }}>{row.field}</span>
                      <span className="text-muted-foreground truncate">{row.value}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 rounded-lg px-3 py-2" style={{ backgroundColor: '#f59e0b12', border: '1px solid #f59e0b40' }}>
                  <p className="font-mono text-xs" style={{ color: '#f59e0b' }}>SHA256(SHA256(header)) =</p>
                  <p className="font-mono text-xs text-foreground break-all">00000000000000000002<span className="text-muted-foreground">a7c4c1f8b9d3e6...</span></p>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">Difficulty adjusts every <span className="font-semibold text-foreground">2,016 blocks (~2 weeks)</span> to maintain ~10 min block time.</p>
              </div>
            </div>

            {/* ── Right: 4 cards ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-3">
              {[
                {
                  icon: '⛏️',
                  title: 'Mining Hardware Evolution',
                  color: '#f59e0b',
                  content: (
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      {['CPU', 'GPU', 'FPGA', 'ASIC'].map((hw, i, arr) => (
                        <span key={hw} className="flex items-center gap-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}>{hw}</span>
                          {i < arr.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
                        </span>
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">Each generation ~1000× more efficient. ASICs now dominate.</span>
                    </div>
                  ),
                },
                {
                  icon: '₿',
                  title: 'Block Reward & Halvings',
                  color: '#f59e0b',
                  content: (
                    <div className="mt-1">
                      <div className="flex items-end gap-1 flex-wrap">
                        {[
                          { era: '2009', reward: '50' },
                          { era: '2012', reward: '25' },
                          { era: '2016', reward: '12.5' },
                          { era: '2020', reward: '6.25' },
                          { era: '2024', reward: '3.125' },
                          { era: '~2028', reward: '1.5625', dim: true },
                        ].map(h => (
                          <div key={h.era} className="flex flex-col items-center gap-0.5" style={{ opacity: h.dim ? 0.5 : 1 }}>
                            <span className="text-xs font-bold" style={{ color: '#f59e0b' }}>{h.reward}</span>
                            <div className="w-8 rounded-t" style={{ height: `${(parseFloat(h.reward) / 50) * 36 + 4}px`, backgroundColor: '#f59e0b' + (h.dim ? '40' : '80') }} />
                            <span className="text-[9px] text-muted-foreground">{h.era}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Halving every 210,000 blocks. Supply hard-capped at 21 million BTC.</p>
                    </div>
                  ),
                },
                {
                  icon: '🌍',
                  title: 'The Energy Debate',
                  color: '#ED1C24',
                  content: (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      PoW converts electricity into security — attacking is expensive in the real world. Critics note Bitcoin's energy use (~150 TWh/yr). Ethereum addressed this by moving to <span className="font-semibold text-foreground">Proof of Stake</span>, reducing energy consumption by <span className="font-semibold" style={{ color: '#ED1C24' }}>~99.95%</span>.
                    </p>
                  ),
                },
                {
                  icon: '🔒',
                  title: 'Why It Works: 51% Attack Cost',
                  color: '#ED1C24',
                  content: (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      To rewrite history an attacker needs &gt;50% of global hashrate. At current difficulty that would cost billions in ASIC hardware + electricity, and any successful attack would destroy the value of the coins being stolen — making honesty the dominant strategy.
                    </p>
                  ),
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="rounded-xl border-l-4 p-3 bg-card flex-1 min-h-0"
                  style={{ borderLeftColor: card.color }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{card.icon}</span>
                    <span className="text-sm font-bold text-foreground">{card.title}</span>
                  </div>
                  {card.content}
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* ═══════ TRILEMMA ═══════ */}
        <div id="s1-trilemma" className="h-full">
          <TrilemmaSlide />
        </div>

        {/* ═══════ APPS — Bitcoin's app layer ═══════ */}
        <div id="s1-apps" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Beyond payments — Bitcoin's app layer</h2>
            <p className="text-sm text-muted-foreground mt-1">For most of its life Bitcoin only did one thing: send value. Since 2018 — and accelerating since 2023 — a real application layer has emerged on, around, and atop the base chain.</p>
          </div>

          <div className="shrink-0 mb-4 rounded-xl border p-3" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b0d' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f59e0b' }}>Where the apps actually live</p>
            <p className="text-sm text-foreground mt-0.5 leading-snug">
              Bitcoin's base chain handles ~7 TPS and has no smart-contract VM. Apps live in <span className="font-semibold">payment channels</span> (Lightning), in <span className="font-semibold">satoshi inscriptions</span> (Ordinals · BRC-20 · Runes), on <span className="font-semibold">sidechains</span> (Stacks, Liquid, Rootstock), and in new <span className="font-semibold">Bitcoin staking</span> systems (Babylon).
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-3">
            {[
              {
                icon: '⚡',
                title: 'Lightning Network',
                sub: 'L2 payment channels · 2018+',
                color: '#f59e0b',
                what: 'A network of payment channels. Two parties open a channel on-chain once, then exchange thousands of off-chain transactions instantly and almost free. Channels close on-chain to settle the final balance.',
                adoption: 'Apps: Strike · Cash App (US Bitcoin) · Phoenix · Wallet of Satoshi · Cashu · Public capacity ~5,000 BTC · ~15,000 routing nodes.',
                limit: 'Liquidity must be pre-allocated · routing failures common at the edge · custodial wallets dominate retail UX, eroding the self-sovereignty argument.',
              },
              {
                icon: '📜',
                title: 'Ordinals · BRC-20 · Runes',
                sub: 'Inscriptions on satoshis · 2023+',
                color: '#ef4444',
                what: 'Casey Rodarmor\'s Ordinals (Jan 2023) numbers each satoshi and lets you "inscribe" arbitrary data onto it — images, JSON, code. BRC-20 reused this for fungible tokens; Runes (April 2024) added a more efficient native-token system.',
                adoption: '~$4B+ Ordinals secondary market · BRC-20 momentum cooled in 2024 · Runes inherited the use case after the Halving.',
                limit: 'Highly contested: bloats blockchain data, raises base-chain fees during inscription waves. Many node operators and core devs oppose it philosophically — "Bitcoin is for money".',
              },
              {
                icon: '🔗',
                title: 'Bitcoin sidechains & rollups',
                sub: 'Stacks · Liquid · Rootstock · 2018+',
                color: '#6366f1',
                what: 'Programmable layers pegged to BTC. Stacks (Clarity language, settles via "Proof of Transfer"); Liquid (federation, fast confidential txs); Rootstock (EVM-compatible, merge-mined). New entrants 2024-25: BitVM-style rollups, BOB, Bitlayer.',
                adoption: 'Stacks ~$1B TVL · Liquid powers confidential txs for major exchanges · Rootstock has steady DeFi activity.',
                limit: 'Trust models vary widely: Liquid is federated (trust the signer set); Stacks settles to BTC but security remains debated; Rootstock pegs use merge-mining. None inherits Bitcoin\'s security as natively as ETH rollups inherit L1.',
              },
              {
                icon: '🛡️',
                title: 'Bitcoin staking — Babylon',
                sub: 'Native BTC restaking · 2024+',
                color: '#39B54A',
                what: 'Babylon lets BTC holders stake their coins to provide economic security to PoS chains — without bridging or wrapping. If a validator equivocates, their staked BTC is slashed via a Bitcoin-native script.',
                adoption: '~$5B+ BTC staked by late 2024 · backed by multiple PoS chains seeking shared security · mainnet launched 2024.',
                limit: 'New and unproven at scale · introduces complex Bitcoin script · creates BTC-denominated yield, breaking with the long-held "Bitcoin doesn\'t pay yield" tradition.',
              },
            ].map(app => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border-2 p-3 flex flex-col gap-2 min-h-0"
                style={{ borderColor: app.color + '50', backgroundColor: app.color + '08' }}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xl shrink-0 leading-none">{app.icon}</span>
                  <div className="min-w-0">
                    <div className="font-black text-sm leading-tight" style={{ color: app.color }}>{app.title}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">{app.sub}</div>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug flex-1">{app.what}</p>
                <div className="rounded-lg border bg-card/60 px-2 py-1 text-[10px] leading-snug" style={{ borderColor: app.color + '40' }}>
                  <span className="font-bold" style={{ color: app.color }}>Adoption: </span>
                  <span className="text-muted-foreground">{app.adoption}</span>
                </div>
                <div className="rounded-lg border bg-card/60 px-2 py-1 text-[10px] leading-snug" style={{ borderColor: '#ED1C2440' }}>
                  <span className="font-bold" style={{ color: '#ED1C24' }}>Honest limit: </span>
                  <span className="text-muted-foreground">{app.limit}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b0d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#f59e0b' }}>Pedagogical caveat — </span>
              Bitcoin's app layer is debated within the Bitcoin community. Purists want the base chain minimal ("digital gold"); builders push to use it as a settlement layer for richer apps. Be skeptical of hype on either side — both camps have legitimate concerns.
            </p>
          </div>
        </div>

        {/* ═══════ LIGHTNING NETWORK ═══════ */}
        {/* ─── Lightning: Channel Lifecycle ─── */}
        <div id="s1-lightning" className="h-full">
          <div className="w-full h-full flex flex-col p-5 lg:p-8">

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <Zap className="size-6 text-[#f59e0b]" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Lightning Network — How a Channel Works</h2>
              <span className="px-3 py-1 bg-[#f59e0b]/20 text-[#f59e0b] rounded-full text-xs font-bold border border-[#f59e0b]/30">LAYER 2</span>
            </div>

            {/* Anchor metaphor */}
            <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-xl px-4 py-2 mb-3 flex items-center gap-3">
              <span className="text-xl">🍺</span>
              <p className="text-sm">
                <span className="font-bold text-[#f59e0b]">Think of it like a bar tab —</span>
                <span className="text-muted-foreground"> you open a tab (lock funds on Bitcoin), buy rounds freely all evening (off-chain payments), then pay one bill at closing time (settle on-chain). Unlimited drinks, one receipt.</span>
              </p>
            </div>

            {/* 2×2 step grid */}
            <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">

              {/* Step 1 */}
              <div className="bg-card border-2 border-[#ED1C24]/40 rounded-xl p-4 flex flex-col gap-2">
                <span className="px-2 py-0.5 bg-[#ED1C24]/20 text-[#ED1C24] rounded text-xs font-bold w-fit">STEP 1 · ON-CHAIN 🔗</span>
                <h3 className="font-bold text-foreground">Open the Tab</h3>
                <p className="text-sm text-muted-foreground">Alice and Bob each deposit BTC into a <span className="text-foreground font-medium">shared wallet with two keys</span>. Neither can take the money alone — both signatures are always required. This is the one Bitcoin transaction that opens the channel.</p>
                <div className="mt-auto pt-2 border-t border-border flex items-center gap-2 text-sm">
                  <div className="flex-1 text-center">
                    <div className="text-xs text-muted-foreground">Alice deposits</div>
                    <div className="font-mono font-bold text-[#f59e0b]">0.5 BTC</div>
                  </div>
                  <span className="text-muted-foreground font-bold">+</span>
                  <div className="flex-1 text-center">
                    <div className="text-xs text-muted-foreground">Bob deposits</div>
                    <div className="font-mono font-bold text-[#f59e0b]">0.5 BTC</div>
                  </div>
                  <span className="text-muted-foreground font-bold">=</span>
                  <div className="flex-1 text-center">
                    <div className="text-xs text-muted-foreground">Shared wallet</div>
                    <div className="font-mono font-bold text-[#39B54A]">1.0 BTC 🔒</div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-card border-2 border-[#f59e0b]/40 rounded-xl p-4 flex flex-col gap-2">
                <span className="px-2 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] rounded text-xs font-bold w-fit">STEP 2 · OFF-CHAIN ⚡</span>
                <h3 className="font-bold text-foreground">Pay Instantly — Free</h3>
                <p className="text-sm text-muted-foreground">Each payment is a <span className="text-foreground font-medium">signed IOU</span> — both parties sign a note saying "Alice has X, Bob has Y." Nothing goes on Bitcoin yet. Each new IOU replaces the last, like updating a running tab.</p>
                <div className="mt-auto pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-1.5">Alice pays Bob → the IOU updates:</div>
                  <div className="space-y-1">
                    {[
                      { alice: 50, bob: 50, label: 'Start' },
                      { alice: 30, bob: 70, label: 'Alice pays 0.2 BTC' },
                      { alice: 10, bob: 90, label: 'Alice pays 0.2 BTC again' },
                    ].map(row => (
                      <div key={row.label} className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground w-32 shrink-0">{row.label}</span>
                        <div className="flex-1 flex rounded overflow-hidden h-4">
                          <div className="bg-[#6366f1]/60 flex items-center justify-center text-white font-bold transition-all" style={{ width: `${row.alice}%` }}>
                            {row.alice > 15 ? `${row.alice}%` : ''}
                          </div>
                          <div className="bg-[#39B54A]/60 flex items-center justify-center text-white font-bold transition-all" style={{ width: `${row.bob}%` }}>
                            {row.bob > 15 ? `${row.bob}%` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-3 text-xs mt-1">
                      <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-[#6366f1]/60 inline-block" /> Alice</span>
                      <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-[#39B54A]/60 inline-block" /> Bob</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-card border-2 border-[#39B54A]/40 rounded-xl p-4 flex flex-col gap-2">
                <span className="px-2 py-0.5 bg-[#39B54A]/20 text-[#39B54A] rounded text-xs font-bold w-fit">STEP 3 · ROUTING 🌐</span>
                <h3 className="font-bold text-foreground">Pay Anyone — No Direct Channel Needed</h3>
                <p className="text-sm text-muted-foreground">No channel with Bob? Alice can pay him through Charlie. The key: a <span className="text-foreground font-medium">cryptographic lock</span> ensures Charlie can only forward the payment — he physically cannot steal it. Like a relay race where the baton <em>must</em> be passed.</p>
                <div className="mt-auto pt-2 border-t border-border">
                  <div className="flex items-end justify-between gap-1 mb-1">
                    <div className="text-center">
                      <div className="size-10 rounded-full bg-[#6366f1]/20 border-2 border-[#6366f1]/50 flex items-center justify-center font-bold text-[#6366f1]">A</div>
                      <div className="text-xs text-muted-foreground mt-1">Alice</div>
                      <div className="text-xs text-[#6366f1] font-mono">sends</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center pb-4">
                      <div className="w-full border-t-2 border-dashed border-[#f59e0b]/60" />
                      <span className="text-xs text-[#f59e0b] mt-0.5">🔐 locked</span>
                    </div>
                    <div className="text-center">
                      <div className="size-10 rounded-full bg-[#f59e0b]/20 border-2 border-[#f59e0b]/50 flex items-center justify-center font-bold text-[#f59e0b]">C</div>
                      <div className="text-xs text-muted-foreground mt-1">Charlie</div>
                      <div className="text-xs text-muted-foreground font-mono">relays</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center pb-4">
                      <div className="w-full border-t-2 border-dashed border-[#39B54A]/60" />
                      <span className="text-xs text-[#39B54A] mt-0.5">🔓 unlocked</span>
                    </div>
                    <div className="text-center">
                      <div className="size-10 rounded-full bg-[#ED1C24]/20 border-2 border-[#ED1C24]/50 flex items-center justify-center font-bold text-[#ED1C24]">B</div>
                      <div className="text-xs text-muted-foreground mt-1">Bob</div>
                      <div className="text-xs text-[#39B54A] font-mono">receives</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Charlie earns a tiny routing fee but can never keep the full amount</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-card border-2 border-[#6366f1]/40 rounded-xl p-4 flex flex-col gap-2">
                <span className="px-2 py-0.5 bg-[#ED1C24]/20 text-[#ED1C24] rounded text-xs font-bold w-fit">STEP 4 · ON-CHAIN 🔗</span>
                <h3 className="font-bold text-foreground">Close the Tab — Pay the Bill</h3>
                <p className="text-sm text-muted-foreground">Either party can post the <span className="text-foreground font-medium">latest IOU</span> to Bitcoin at any time. The blockchain reads it and sends real BTC to both. <span className="text-[#ED1C24] font-medium">Cheat attempt:</span> if someone posts an old IOU trying to get more money — Bitcoin detects it and gives the cheater's funds to the other person.</p>
                <div className="mt-auto pt-2 border-t border-border flex items-stretch gap-2">
                  <div className="flex-1 bg-muted/50 rounded-lg p-2 text-center">
                    <div className="text-xs text-muted-foreground">Payments made</div>
                    <div className="text-lg font-black text-foreground">∞</div>
                    <div className="text-xs text-[#39B54A]">2 on-chain txs total</div>
                  </div>
                  <div className="flex-1 bg-[#39B54A]/10 rounded-lg p-2 text-center border border-[#39B54A]/30">
                    <div className="text-xs text-muted-foreground">Alice gets</div>
                    <div className="font-mono font-bold text-[#39B54A]">0.1 BTC</div>
                  </div>
                  <div className="flex-1 bg-[#39B54A]/10 rounded-lg p-2 text-center border border-[#39B54A]/30">
                    <div className="text-xs text-muted-foreground">Bob gets</div>
                    <div className="font-mono font-bold text-[#39B54A]">0.9 BTC</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ─── Lightning: Why It Matters ─── */}
        <div className="h-full">
          <div className="w-full h-full flex flex-col p-5 lg:p-8">

            <div className="flex items-center gap-3 mb-2">
              <Zap className="size-6 text-[#f59e0b]" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Lightning Network — Why It Matters</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Bitcoin's base layer processes ~7 transactions per second and takes ~10 minutes to confirm. Lightning solves this without changing Bitcoin itself.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="text-2xl lg:text-3xl font-black text-[#f59e0b]">~1ms</div>
                <div className="text-sm font-semibold text-foreground mt-1">Settlement</div>
                <div className="text-xs text-muted-foreground mt-0.5">vs ~10 min on-chain</div>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="text-2xl lg:text-3xl font-black text-[#39B54A]">&lt;$0.001</div>
                <div className="text-sm font-semibold text-foreground mt-1">Fee per payment</div>
                <div className="text-xs text-muted-foreground mt-0.5">vs $1–$50 on-chain</div>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="text-2xl lg:text-3xl font-black text-[#6366f1]">∞</div>
                <div className="text-sm font-semibold text-foreground mt-1">Theoretical TPS</div>
                <div className="text-xs text-muted-foreground mt-0.5">limited only by nodes</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
              <div className="space-y-3">
                <div className="bg-card rounded-xl border border-border p-4">
                  <h4 className="font-bold text-foreground mb-1">🌍 Real-World Adoption</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <span className="text-foreground font-medium">El Salvador</span> — national Bitcoin wallet (Chivo) runs on Lightning</li>
                    <li>• <span className="text-foreground font-medium">Strike & Cash App</span> — millions of users send Lightning payments</li>
                    <li>• <span className="text-foreground font-medium">Remittances</span> — &lt;0.1% fee vs 10–15% via Western Union</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-4">
                  <h4 className="font-bold text-foreground mb-1">⚡ New Use Cases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <span className="text-foreground font-medium">Streaming money</span> — pay per second for content or services</li>
                    <li>• <span className="text-foreground font-medium">Micropayments</span> — tip 1 sat for an article or a tweet</li>
                    <li>• <span className="text-foreground font-medium">Machine payments</span> — IoT devices paying each other autonomously</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-card rounded-xl border border-border p-4">
                  <h4 className="font-bold text-foreground mb-1">🔐 Security Guarantees</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Channels are enforced by <span className="text-foreground font-medium">Bitcoin smart contracts</span> — no middleman</li>
                    <li>• A party trying to cheat with an old state gets their funds <span className="text-foreground font-medium">penalized</span></li>
                    <li>• HTLCs ensure intermediaries can route but <span className="text-foreground font-medium">never steal</span></li>
                  </ul>
                </div>
                <CalloutBox type="tip" title="Key Insight">
                  Lightning doesn't replace Bitcoin — it sits on top of it. The base layer provides the trust; Lightning provides the speed. Same model as the internet: TCP/IP underneath, HTTP on top.
                </CalloutBox>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s1-quiz" className="h-full">
          <QuizSlide
            question="Alice has two UTXOs: 0.35 BTC and 0.40 BTC. She wants to send 0.60 BTC to Bob and pay a 0.01 BTC miner fee. What must happen in this transaction?"
            options={[
              { text: 'Use only the 0.40 BTC UTXO and ask Bob to cover the remaining 0.21 BTC himself.', correct: false },
              { text: 'Combine both UTXOs (0.75 BTC total), send 0.60 BTC to Bob, pay 0.01 BTC fee, and receive 0.14 BTC as change back to Alice\'s wallet.', correct: true },
              { text: 'Split the 0.40 BTC UTXO into two outputs of 0.20 BTC each to cover the payment over two transactions.', correct: false },
              { text: 'Wait for a new mining reward UTXO before making the transaction, since the individual UTXOs are too small.', correct: false },
            ]}
            explanation="Bitcoin's UTXO model requires consuming whole UTXOs as inputs. Alice needs 0.61 BTC total (0.60 + 0.01 fee) — neither UTXO alone covers this, so both must be combined. The transaction spends both UTXOs (0.35 + 0.40 = 0.75 BTC) as inputs, creates an output of 0.60 BTC to Bob, and creates a change output of 0.14 BTC back to Alice's wallet. The 0.01 BTC difference between inputs and outputs is implicitly claimed by the miner. This is why wallet software tracks your UTXO set rather than a single balance."
          />
        </div>

        {/* ═══════ QUIZ 2 — Nakamoto consensus ═══════ */}
        <div id="s1-quiz-2" className="h-full">
          <QuizSlide
            question="A miner finds a block whose SHA-256 hash satisfies the difficulty target. Just before broadcasting, another miner publishes a different valid block at the same height. The network briefly has two competing chains. How is the conflict resolved?"
            options={[
              { text: 'Both blocks are kept side-by-side; honest nodes choose whichever arrived first and a coordinator transaction merges the histories within 10 minutes.', correct: false },
              { text: 'The fork is resolved by Nakamoto consensus: nodes follow the chain with the most cumulative proof-of-work. Whichever side first extends with another block wins; the other block is orphaned and its transactions return to the mempool.', correct: true },
              { text: 'The orphaned block is included in a future block as an "uncle" and the miner still earns a partial block reward, similar to Ethereum pre-Merge.', correct: false },
              { text: 'The two miners must broadcast a coordinated tie-breaker transaction signed by a 51% majority of the hash rate within the next epoch.', correct: false },
            ]}
            explanation="Bitcoin uses Nakamoto consensus — the chain with the highest cumulative proof-of-work always wins. When two valid blocks are found at the same height, the network temporarily forks; whichever side first extends with another block becomes the canonical chain, and the orphaned block's transactions return to the mempool to be re-included later. Bitcoin has no uncle-block reward (that was Ethereum's GHOST protocol pre-Merge); a stale block earns the miner nothing. There is no coordinator transaction or signaling — propagation latency and probability decide forks naturally."
          />
        </div>

        {/* ═══════ QUIZ 3 — Difficulty adjustment ═══════ */}
        <div id="s1-quiz-3" className="h-full">
          <QuizSlide
            question="Bitcoin's network hash rate doubles over six months as new miners deploy faster ASICs. What automatically keeps block intervals near the 10-minute target?"
            options={[
              { text: 'The block reward is halved early to discourage new miners from joining the network.', correct: false },
              { text: 'Every 2,016 blocks (~2 weeks) each node independently recalculates the difficulty target from how long the previous 2,016 blocks took. With double the hash rate, the target shrinks (more leading zeros required) so finding a valid block becomes proportionally harder.', correct: true },
              { text: 'Bitcoin nodes vote in real-time on a new difficulty using miner signaling encoded in coinbase transactions.', correct: false },
              { text: 'A timestamp rule rejects any block published less than 10 minutes after its parent, enforcing the cadence directly.', correct: false },
            ]}
            explanation="Bitcoin's difficulty adjustment is automatic, trustless, and runs every 2,016 blocks (~2 weeks). Each node compares the actual time elapsed against the expected 14 days × 24 h × 6 blocks/h = 20,160 minutes and scales the target accordingly: faster blocks → harder target. Halvings happen every 210,000 blocks but are unrelated to hash-rate changes. There is no miner voting on difficulty and no minimum time between blocks — the target alone constrains them probabilistically."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s1-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 01 — Key Takeaways"
            takeaways={[
              'Bitcoin is a permissionless, public blockchain — anyone can participate',
              'Its architecture combines UTXO transactions, Merkle trees, and linked block headers',
              'Proof of Work makes attacks prohibitively expensive — security through real-world energy cost',
              'The Blockchain Trilemma: decentralization, security, and scalability cannot all be maximised simultaneously',
              'Bitcoin prioritises security and decentralization — scalability is handled by Layer 2 (Lightning)',
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
              { icon: '💼', title: 'Application Layer', summary: 'Wallets, exchanges, block explorers — communicate with the network via RPC calls to full nodes on port 8332' },
              { icon: '🌐', title: 'P2P Network', summary: '~50k reachable nodes · Gossip protocol · Mempool holds unconfirmed txs · TCP port 8333' },
              { icon: '⛏️', title: 'Proof of Work', summary: 'SHA-256 hash puzzle · 2016-block difficulty adjustment · 10-minute block target · First to find nonce wins' },
              { icon: '🗄️', title: 'UTXO Model', summary: 'Inputs reference past UTXOs · Outputs create new UTXOs · No global balance · Change is a new output' },
              { icon: '📊', title: 'Halving Schedule', summary: '50 → 25 → 12.5 → 6.25 BTC per block · Max supply 21M · Next halving ~2028 · Last coin mined ~2140' },
              { icon: '⚖️', title: 'Trilemma Trade-off', summary: 'Bitcoin: Security + Decentralization · Scalability handled by Lightning Network (Layer 2) off-chain payments' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex flex-col gap-2 p-4 rounded-2xl border bg-card"
                style={{ borderColor: '#f59e0b30' }}
              >
                <div className="text-3xl">{card.icon}</div>
                <div className="font-bold text-sm text-foreground">{card.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{card.summary}</div>
              </motion.div>
            ))}
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-border bg-card/50 text-center">
            <span className="text-xs text-muted-foreground">Proceed to Section 2 to explore Ethereum and programmable blockchains →</span>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
