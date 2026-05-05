import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { Cog, Check, X } from 'lucide-react';

const chapters = [
  { id: 's2-workflow',      label: 'Workflow' },
  { id: 's2-components',   label: 'Core Components' },
  { id: 's2-solidity',     label: 'Reading Solidity' },
  { id: 's2-execution',    label: 'Execution Environment' },
  { id: 's2-web3',         label: 'The Web3 Landscape' },
  { id: 's2-dapp',         label: 'dApp & Smart Contracts' },
  { id: 's2-vs',           label: 'Web3 vs Traditional' },
  { id: 's2-capabilities', label: 'New Capabilities' },
  { id: 's2-why',          label: 'Why Build with SC?' },
  { id: 's2-gas',          label: 'Gas & Tx Economics' },
  { id: 's2-reshape',      label: 'Reshape Business' },
  { id: 's2-quiz',         label: 'Quizzes' },
  { id: 's2-ex-gas',       label: '🎯 Exercise: Gas' },
  { id: 's2-ex-stack',     label: '🎯 Exercise: Stack' },
  { id: 's2-takeaways',    label: 'Takeaways' },
  { id: 's2-summary',      label: 'Summary' },
];

function Stub({ id, label }: { id: string; label: string }) {
  return (
    <div id={id} className="h-full flex items-center justify-center p-8">
      <div className="text-center text-muted-foreground">
        <div className="text-4xl mb-4">🔧</div>
        <p className="text-lg font-medium">{label} — coming soon</p>
      </div>
    </div>
  );
}

// ─── Exercise: Gas Ranking ───────────────────────────────────────────────────

// Displayed in shuffled order; CORRECT_ORDER tracks cheapest→expensive by id
const GAS_OPS = [
  { id: 0, label: 'Read a public variable',      detail: 'View call — never hits the chain',             gasUnits: 0,      gasLabel: 'FREE',        color: '#39B54A' },
  { id: 1, label: 'Emit an event',               detail: 'Logged on-chain but not in state',              gasUnits: 375,    gasLabel: '~375 gas',    color: '#6366f1' },
  { id: 2, label: 'Transfer ETH (simple send)',  detail: 'Base cost for moving ETH between accounts',    gasUnits: 21000,  gasLabel: '~21,000 gas', color: '#f59e0b' },
  { id: 3, label: 'Write to a new storage slot', detail: 'Most expensive regular operation on the EVM',  gasUnits: 22100,  gasLabel: '~22,100 gas', color: '#ED1C24' },
  { id: 4, label: 'Deploy a new contract',        detail: 'Pays for every byte of bytecode stored',       gasUnits: 500000, gasLabel: '500k+ gas',   color: '#8b5cf6' },
];
const CORRECT_ORDER = [0, 1, 2, 3, 4];
// Shuffled display order so the answer isn't already obvious
const DISPLAY_ORDER = [3, 0, 4, 1, 2];

function GasRankingExercise() {
  const [picked, setPicked]   = useState<number[]>([]);
  const [done, setDone]       = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handlePick = (id: number) => {
    if (done || picked.includes(id)) return;
    const next = [...picked, id];
    setPicked(next);
    if (next.length === GAS_OPS.length) setDone(true);
  };
  const reset = () => { setPicked([]); setDone(false); setShowHint(false); };

  const isCorrect = done && picked.every((id, i) => id === CORRECT_ORDER[i]);

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 flex items-center justify-between mb-5">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold">🎯 Exercise</span>
          <h2 className="text-2xl font-bold text-foreground mt-1">Gas Estimation Challenge</h2>
          <p className="text-muted-foreground text-sm">Click the 5 operations in order from <span className="text-[#39B54A] font-semibold">cheapest</span> to <span className="text-[#ED1C24] font-semibold">most expensive</span>.</p>
        </div>
        {done && <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 transition-colors">↺ Try again</button>}
      </div>

      <div className="flex-1 min-h-0 flex gap-6 items-stretch">

        {/* Clickable operations */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Operations — click to rank</p>
          {DISPLAY_ORDER.map(id => {
            const op = GAS_OPS[id];
            const rank = picked.indexOf(op.id);
            const selected = rank !== -1;
            const correct  = done && picked[rank] === CORRECT_ORDER[rank];
            return (
              <motion.button
                key={op.id}
                onClick={() => handlePick(op.id)}
                disabled={selected}
                whileHover={!selected ? { x: 4 } : {}}
                whileTap={!selected ? { scale: 0.98 } : {}}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-colors"
                style={{
                  borderColor: !selected ? 'var(--border)' : done ? (correct ? '#39B54A' : '#ED1C24') : op.color + '60',
                  backgroundColor: !selected ? 'var(--card)' : done ? (correct ? '#39B54A12' : '#ED1C2412') : op.color + '12',
                  cursor: selected ? 'default' : 'pointer',
                }}
              >
                <div className="size-7 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                  style={{ backgroundColor: selected ? (done ? (correct ? '#39B54A' : '#ED1C24') : op.color) : 'var(--muted)', color: selected ? 'white' : 'var(--muted-foreground)' }}>
                  {selected ? rank + 1 : '?'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{op.label}</div>
                  <div className="text-xs text-muted-foreground">{op.detail}</div>
                </div>
                {done && selected && (
                  correct
                    ? <Check className="size-4 text-[#39B54A] shrink-0" strokeWidth={3} />
                    : <X     className="size-4 text-[#ED1C24] shrink-0" strokeWidth={3} />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Answer reveal */}
        <div className="w-64 shrink-0 flex flex-col justify-center gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              {done ? 'Correct ranking' : `${picked.length} / ${GAS_OPS.length} placed`}
            </p>
            {!done && (
              <button
                onClick={() => setShowHint(h => !h)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors"
                style={{
                  backgroundColor: showHint ? '#f59e0b20' : 'var(--muted)',
                  color: showHint ? '#f59e0b' : 'var(--muted-foreground)',
                  border: `1px solid ${showHint ? '#f59e0b60' : 'transparent'}`,
                }}
              >
                {showHint ? '🙈 Hide hint' : '💡 Hint'}
              </button>
            )}
          </div>
          {CORRECT_ORDER.map((id, rank) => {
            const op = GAS_OPS[id];
            const visible = done || showHint;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: visible ? 1 : 0, x: 0, scale: visible ? 1 : 0.95 }}
                transition={{ delay: visible ? rank * 0.07 : 0, duration: 0.2 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ backgroundColor: op.color + '15', border: `1px solid ${op.color}40` }}
              >
                <span className="text-xs font-black w-4 text-center" style={{ color: op.color }}>{rank + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-foreground truncate">{op.label}</div>
                  <div className="text-[10px] font-bold" style={{ color: op.color }}>{op.gasLabel}</div>
                </div>
              </motion.div>
            );
          })}
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 p-3 rounded-xl text-center"
              style={{ backgroundColor: isCorrect ? '#39B54A15' : '#f59e0b15', border: `1px solid ${isCorrect ? '#39B54A' : '#f59e0b'}40` }}
            >
              <div className="font-black text-sm" style={{ color: isCorrect ? '#39B54A' : '#f59e0b' }}>
                {isCorrect ? '🏆 Perfect!' : '📚 Review the order above'}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Storage writes are expensive because they modify global state on every full node permanently.
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Exercise: dApp Stack ────────────────────────────────────────────────────

const LAYERS = [
  { id: 'frontend',   label: 'Frontend Layer',    color: '#6366f1', desc: 'What the user sees and interacts with' },
  { id: 'blockchain', label: 'Blockchain Layer',   color: '#f59e0b', desc: 'On-chain logic, state, and consensus' },
  { id: 'offchain',   label: 'Off-Chain Layer',    color: '#39B54A', desc: 'External data, storage, and indexing' },
];

const STACK_ITEMS = [
  { id: 'metamask',  label: 'MetaMask',       emoji: '🦊', layer: 'frontend',   hint: 'Browser wallet — runs in the frontend' },
  { id: 'react',     label: 'React / Next.js', emoji: '⚛️', layer: 'frontend',   hint: 'UI framework — always frontend' },
  { id: 'infura',    label: 'Infura RPC',      emoji: '🔌', layer: 'blockchain', hint: 'RPC endpoint — a gateway node that exposes the blockchain to applications' },
  { id: 'solidity',  label: 'Solidity Contract', emoji: '📜', layer: 'blockchain', hint: 'Smart contract code — lives on-chain' },
  { id: 'evm',       label: 'EVM',             emoji: '⚙️', layer: 'blockchain', hint: 'Execution environment — part of every node' },
  { id: 'pos',       label: 'PoS Validators',  emoji: '🏦', layer: 'blockchain', hint: 'Consensus mechanism — on-chain' },
  { id: 'ipfs',      label: 'IPFS',            emoji: '📦', layer: 'offchain',   hint: 'Decentralised file storage — off-chain' },
  { id: 'thegraph',  label: 'The Graph',       emoji: '📊', layer: 'offchain',   hint: 'Blockchain indexer — off-chain' },
  { id: 'chainlink', label: 'Chainlink Oracle', emoji: '🌉', layer: 'offchain',   hint: 'Oracle — brings external data to the chain' },
];

function DAppStackExercise() {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [revealed,   setRevealed]   = useState(false);
  const [selected,   setSelected]   = useState<string | null>(null);

  const placed   = Object.keys(placements);
  const unplaced = STACK_ITEMS.filter(i => !placed.includes(i.id));
  const allDone  = placed.length === STACK_ITEMS.length;

  const handleItemClick = (id: string) => {
    if (revealed) return;
    setSelected(id === selected ? null : id);
  };

  const handleLayerClick = (layerId: string) => {
    if (!selected || revealed) return;
    setPlacements(prev => ({ ...prev, [selected]: layerId }));
    setSelected(null);
  };

  const handleRemove = (itemId: string) => {
    if (revealed) return;
    setPlacements(prev => { const n = { ...prev }; delete n[itemId]; return n; });
  };

  const reset = () => { setPlacements({}); setRevealed(false); setSelected(null); };

  const score = Object.entries(placements).filter(([id, layer]) => STACK_ITEMS.find(i => i.id === id)?.layer === layer).length;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 flex items-center justify-between mb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🎯 Exercise</span>
          <h2 className="text-2xl font-bold text-foreground mt-1">Build the dApp Stack</h2>
          <p className="text-muted-foreground text-sm">
            {selected ? <span className="text-[#6366f1] font-semibold">Now click a layer to place <span className="font-black">{STACK_ITEMS.find(i=>i.id===selected)?.label}</span></span>
              : 'Click a component, then click its layer to place it.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {allDone && !revealed && (
            <button onClick={() => setRevealed(true)} className="px-3 py-1.5 rounded-lg bg-[#6366f1] text-white text-xs font-bold hover:bg-[#6366f1]/90 transition-colors">Check answers</button>
          )}
          {revealed && <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 transition-colors">↺ Try again</button>}
          {revealed && <div className="font-black text-lg" style={{ color: score === STACK_ITEMS.length ? '#39B54A' : score >= 6 ? '#f59e0b' : '#ED1C24' }}>{score}/{STACK_ITEMS.length}</div>}
        </div>
      </div>

      <div className="flex-1 min-h-0 flex gap-4">

        {/* Unplaced items */}
        <div className="w-44 shrink-0 flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">Components</p>
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1.5">
            {unplaced.map(item => (
              <motion.button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg border-2 text-left transition-colors"
                style={{
                  borderColor: selected === item.id ? '#6366f1' : 'var(--border)',
                  backgroundColor: selected === item.id ? '#6366f115' : 'var(--card)',
                }}
              >
                <span className="text-base shrink-0">{item.emoji}</span>
                <span className="text-xs font-semibold text-foreground truncate">{item.label}</span>
              </motion.button>
            ))}
            {unplaced.length === 0 && <div className="text-xs text-muted-foreground italic text-center mt-4">All placed!</div>}
          </div>
        </div>

        {/* Drop zones */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {LAYERS.map(layer => {
            const items = STACK_ITEMS.filter(i => placements[i.id] === layer.id);
            return (
              <motion.div
                key={layer.id}
                onClick={() => handleLayerClick(layer.id)}
                className="flex-1 rounded-xl border-2 p-3 transition-colors flex flex-col gap-2"
                style={{
                  borderColor: selected ? layer.color + '80' : layer.color + '30',
                  backgroundColor: selected ? layer.color + '08' : 'var(--card)',
                  cursor: selected ? 'pointer' : 'default',
                }}
                whileHover={selected ? { scale: 1.01 } : {}}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
                  <span className="text-xs font-bold" style={{ color: layer.color }}>{layer.label}</span>
                  <span className="text-[10px] text-muted-foreground">{layer.desc}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <AnimatePresence>
                    {items.map(item => {
                      const correct = item.layer === layer.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={e => { e.stopPropagation(); handleRemove(item.id); }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold cursor-pointer"
                          style={{
                            borderColor: !revealed ? layer.color + '50' : correct ? '#39B54A' : '#ED1C24',
                            backgroundColor: !revealed ? layer.color + '12' : correct ? '#39B54A12' : '#ED1C2412',
                            color: !revealed ? 'var(--foreground)' : correct ? '#39B54A' : '#ED1C24',
                          }}
                          title={revealed ? item.hint : 'Click to unplace'}
                        >
                          <span>{item.emoji}</span> {item.label}
                          {revealed && (correct ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" strokeWidth={3} />)}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  {items.length === 0 && (
                    <div className="text-[10px] text-muted-foreground italic">{selected ? '← Click here to place' : 'Empty'}</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export function SC_Section2() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={chapters} accentColor="#6366f1" />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 02"
            title="How Smart Contracts Work"
            subtitle="Workflow, EVM, Web3 landscape, gas economics, and why you should build with them"
            icon={<Cog className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#8b5cf6]"
          />
        </div>

        {/* ═══════ WORKFLOW ═══════ */}
        <div id="s2-workflow" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How Smart Contracts Work</h2>
            <p className="text-muted-foreground text-sm mt-1">Five steps from deployment to notification — all on-chain, all automatic.</p>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center">
            <div className="w-full max-w-4xl">
              {/* Steps row */}
              <div className="flex items-stretch gap-0 mb-6">
                {[
                  { step: '01', label: 'Deploy',   emoji: '📤', color: '#6366f1', desc: 'Contract code is compiled and uploaded to the blockchain. It gets a permanent address — immutable from this point on.' },
                  { step: '02', label: 'Trigger',  emoji: '⚡', color: '#8b5cf6', desc: 'A user or system sends a transaction to the contract address, calling a function with the required inputs.' },
                  { step: '03', label: 'Execute',  emoji: '⚙️', color: '#39B54A', desc: 'The EVM (or equivalent VM) runs the contract code on every node in the network simultaneously.' },
                  { step: '04', label: 'Update',   emoji: '🔗', color: '#f59e0b', desc: 'State changes are recorded on the blockchain — permanent, transparent, and agreed upon by consensus.' },
                  { step: '05', label: 'Emit',     emoji: '📡', color: '#ED1C24', desc: 'Events are emitted and logged on-chain, notifying off-chain systems (front-ends, indexers, oracles).' },
                ].map((s, i) => (
                  <div key={s.step} className="flex items-stretch flex-1">
                    <div
                      className="flex-1 p-4 rounded-xl border-2 flex flex-col gap-2"
                      style={{ borderColor: s.color + '50', backgroundColor: s.color + '0d' }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{s.emoji}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: s.color }}>{s.step}</span>
                      </div>
                      <div className="font-black text-base text-foreground">{s.label}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
                    </div>
                    {i < 4 && (
                      <div className="flex items-center px-1 text-muted-foreground text-lg shrink-0">→</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Code illustration */}
              <div className="p-4 bg-card border border-border rounded-xl font-mono text-xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-[#ED1C24]" />
                    <div className="size-2.5 rounded-full bg-[#f59e0b]" />
                    <div className="size-2.5 rounded-full bg-[#39B54A]" />
                  </div>
                  <span className="text-muted-foreground text-[10px]">SimpleEscrow.sol</span>
                </div>
                <div className="space-y-0.5 text-[11px]">
                  <div><span className="text-[#8b5cf6]">contract</span> <span className="text-[#6366f1]">SimpleEscrow</span> {'{'}</div>
                  <div className="pl-4"><span className="text-[#f59e0b]">address</span> <span className="text-muted-foreground">public</span> buyer, seller;</div>
                  <div className="pl-4"><span className="text-[#f59e0b]">uint</span> <span className="text-muted-foreground">public</span> amount;</div>
                  <div className="pl-4 text-muted-foreground">{'// ← State variables'}</div>
                  <div className="mt-1 pl-4"><span className="text-[#39B54A]">event</span> <span className="text-[#6366f1]">Released</span>(address to, uint value); <span className="text-muted-foreground">{'// ← Emit'}</span></div>
                  <div className="mt-1 pl-4"><span className="text-[#8b5cf6]">function</span> <span className="text-[#6366f1]">release</span>() <span className="text-muted-foreground">external</span> {'{'}</div>
                  <div className="pl-8 text-muted-foreground">{'// ← Execute: only buyer can release'}</div>
                  <div className="pl-8"><span className="text-[#ED1C24]">require</span>(msg.sender == buyer);</div>
                  <div className="pl-8">seller.transfer(amount); <span className="text-muted-foreground">{'// ← Update state'}</span></div>
                  <div className="pl-8"><span className="text-[#ED1C24]">emit</span> Released(seller, amount);</div>
                  <div className="pl-4">{'}'}</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ ANATOMY ═══════ */}
        <div id="s2-components" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Anatomy of a Smart Contract</h2>
            <p className="text-muted-foreground text-sm mt-1">Every smart contract is made of five building blocks — understanding them is understanding the language of Web3.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Left: component cards */}
            <div className="flex flex-col gap-3">
              {[
                { color: '#6366f1', emoji: '📋', title: 'Code',               desc: 'The business logic and conditional statements. Written in Solidity (Ethereum), Rust (Solana), or Vyper. Once deployed, the code is immutable.' },
                { color: '#8b5cf6', emoji: '💾', title: 'State',              desc: 'Stored data that the contract maintains and modifies over time. Examples: token balances, ownership records, vote counts. Persisted on-chain.' },
                { color: '#39B54A', emoji: '⚙️', title: 'Functions',          desc: 'Specific operations callable by external parties or other contracts. Can be read-only (free) or state-changing (costs gas).' },
                { color: '#f59e0b', emoji: '📡', title: 'Events',             desc: 'Logs that record important contract activities. Emitted when key actions occur — cheaply stored and readable by off-chain systems.' },
                { color: '#ED1C24', emoji: '🌐', title: 'Blockchain Platform', desc: 'The execution environment. Ethereum, Polygon, Solana, BNB Chain… Each has different performance, cost, and tooling trade-offs.' },
              ].map(c => (
                <div key={c.title} className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl flex-1" style={{ borderColor: c.color + '30' }}>
                  <div className="size-8 rounded-lg flex items-center justify-center shrink-0 text-base" style={{ backgroundColor: c.color + '20' }}>{c.emoji}</div>
                  <div>
                    <div className="font-bold text-sm mb-0.5" style={{ color: c.color }}>{c.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: annotated code */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Annotated contract</div>
              <div className="flex-1 p-4 bg-card border border-border rounded-xl font-mono text-[11px] leading-relaxed">
                <div className="space-y-1">
                  <div className="text-muted-foreground">{'// SPDX-License-Identifier: MIT'}</div>
                  <div><span className="text-[#8b5cf6]">pragma solidity</span> ^0.8.0;</div>
                  <div className="mt-2"><span className="text-[#8b5cf6]">contract</span> <span className="text-[#6366f1]">Voting</span> {'{'}</div>

                  <div className="mt-2 pl-4 flex items-start gap-2">
                    <div className="flex-1">
                      <div className="text-muted-foreground">{'// ─── State ───────────────────────'}</div>
                      <div><span className="text-[#8b5cf6]">mapping</span>(<span className="text-[#f59e0b]">address</span> =&gt; <span className="text-[#f59e0b]">bool</span>) <span className="text-muted-foreground">public</span> hasVoted;</div>
                      <div><span className="text-[#f59e0b]">uint</span> <span className="text-muted-foreground">public</span> yesCount;</div>
                    </div>
                    <div className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-[#8b5cf6]/20 text-[#8b5cf6] font-bold whitespace-nowrap self-start">💾 State</div>
                  </div>

                  <div className="mt-2 pl-4 flex items-start gap-2">
                    <div className="flex-1">
                      <div className="text-muted-foreground">{'// ─── Event ───────────────────────'}</div>
                      <div><span className="text-[#39B54A]">event</span> <span className="text-[#6366f1]">Voted</span>(<span className="text-[#f59e0b]">address</span> voter, <span className="text-[#f59e0b]">bool</span> vote);</div>
                    </div>
                    <div className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] font-bold whitespace-nowrap self-start">📡 Event</div>
                  </div>

                  <div className="mt-2 pl-4 flex items-start gap-2">
                    <div className="flex-1">
                      <div className="text-muted-foreground">{'// ─── Function ────────────────────'}</div>
                      <div><span className="text-[#8b5cf6]">function</span> <span className="text-[#6366f1]">vote</span>(<span className="text-[#f59e0b]">bool</span> inFavor) <span className="text-muted-foreground">external</span> {'{'}</div>
                      <div className="pl-4"><span className="text-[#ED1C24]">require</span>(!hasVoted[msg.sender]);</div>
                      <div className="pl-4">hasVoted[msg.sender] = <span className="text-[#39B54A]">true</span>;</div>
                      <div className="pl-4"><span className="text-[#8b5cf6]">if</span> (inFavor) yesCount++;</div>
                      <div className="pl-4"><span className="text-[#ED1C24]">emit</span> Voted(msg.sender, inFavor);</div>
                      <div>{'}'}</div>
                    </div>
                    <div className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-[#39B54A]/20 text-[#39B54A] font-bold whitespace-nowrap self-start">⚙️ Function</div>
                  </div>

                  <div>{'}'}</div>
                </div>
              </div>

              <div className="p-3 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Platform matters:</span> this Solidity contract deploys to Ethereum, Polygon, Arbitrum, Base, and any EVM-compatible chain with zero code changes.
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ READING SOLIDITY ═══════ */}
        <div id="s2-solidity" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">Section 02</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1 mb-1">Reading a Smart Contract</h2>
            <p className="text-sm text-muted-foreground">You don't need to write Solidity — but every PM, auditor, and analyst must be able to read it. Here is a minimal ERC-20 token contract, fully annotated.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            {/* Code block */}
            <div className="bg-[#0d1117] rounded-xl overflow-auto p-4 font-mono text-sm leading-relaxed border border-border">
              {[
                { line: '// SPDX-License-Identifier: MIT',               color: '#6a737d', note: null },
                { line: 'pragma solidity ^0.8.20;',                        color: '#6a737d', note: null },
                { line: '',                                                color: '',        note: null },
                { line: 'contract SimpleToken {',                          color: '#f0f4f8', note: 'A' },
                { line: '  string public name;',                           color: '#79c0ff', note: 'B' },
                { line: '  string public symbol;',                         color: '#79c0ff', note: 'B' },
                { line: '  uint256 public totalSupply;',                   color: '#79c0ff', note: 'B' },
                { line: '',                                                color: '',        note: null },
                { line: '  mapping(address => uint256) public balances;',  color: '#ffa657', note: 'C' },
                { line: '',                                                color: '',        note: null },
                { line: '  event Transfer(',                               color: '#d2a8ff', note: 'D' },
                { line: '    address indexed from,',                       color: '#d2a8ff', note: null },
                { line: '    address indexed to,',                         color: '#d2a8ff', note: null },
                { line: '    uint256 amount',                              color: '#d2a8ff', note: null },
                { line: '  );',                                            color: '#d2a8ff', note: null },
                { line: '',                                                color: '',        note: null },
                { line: '  constructor(string memory _name,',              color: '#f0f4f8', note: 'E' },
                { line: '    string memory _symbol, uint256 _supply) {',  color: '#f0f4f8', note: null },
                { line: '    name = _name; symbol = _symbol;',            color: '#f0f4f8', note: null },
                { line: '    totalSupply = _supply;',                     color: '#f0f4f8', note: null },
                { line: '    balances[msg.sender] = _supply;',            color: '#39B54A', note: 'F' },
                { line: '  }',                                            color: '#f0f4f8', note: null },
                { line: '',                                               color: '',        note: null },
                { line: '  function transfer(address to,',                color: '#f0f4f8', note: 'G' },
                { line: '    uint256 amount) external {',                 color: '#f0f4f8', note: null },
                { line: '    require(balances[msg.sender] >= amount);',   color: '#ED1C24', note: 'H' },
                { line: '    balances[msg.sender] -= amount;',            color: '#f0f4f8', note: null },
                { line: '    balances[to] += amount;',                    color: '#f0f4f8', note: null },
                { line: '    emit Transfer(msg.sender, to, amount);',     color: '#d2a8ff', note: null },
                { line: '  }',                                            color: '#f0f4f8', note: null },
                { line: '}',                                              color: '#f0f4f8', note: null },
              ].map((l, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#444d56] text-xs w-5 shrink-0 select-none">{l.line ? i + 1 : ''}</span>
                  <span style={{ color: l.color || 'transparent' }} className="flex-1 whitespace-pre">{l.line || ' '}</span>
                  {l.note && (
                    <span className="shrink-0 size-4 rounded-full bg-[#6366f1] text-white text-[9px] font-black flex items-center justify-center">{l.note}</span>
                  )}
                </div>
              ))}
            </div>
            {/* Annotations */}
            <div className="flex flex-col gap-2.5">
              {[
                { key: 'A', color: '#6366f1', title: 'Contract Declaration', desc: 'Like a class in OOP. All state and functions live inside. Once deployed, this code is immutable at its address on the blockchain.' },
                { key: 'B', color: '#79c0ff', title: 'State Variables', desc: 'Stored permanently on-chain. public creates a getter function automatically. Every write costs gas — reads are free.' },
                { key: 'C', color: '#ffa657', title: 'Mapping (Key→Value Store)', desc: 'mapping(address => uint256) is the on-chain equivalent of a database table. Every Ethereum address maps to a token balance. Not iterable — you must know the key.' },
                { key: 'D', color: '#d2a8ff', title: 'Event', desc: 'Logged to the blockchain but NOT stored in state. Cheap to emit (~375 gas). Indexed fields enable efficient off-chain search. This is how block explorers display token transfers.' },
                { key: 'E', color: '#f0f4f8', title: 'Constructor', desc: 'Runs exactly once at deployment. Sets the token name, symbol, and total supply. After this, it never runs again — state is locked as deployed.' },
                { key: 'F', color: '#39B54A', title: 'msg.sender', desc: 'The address that called this function — in the constructor, this is the deployer. All initial supply goes to them. A critical security variable: always validate who msg.sender is.' },
                { key: 'G', color: '#f0f4f8', title: 'Function', desc: 'external means only outside callers can call this (not the contract itself). public allows both external and internal calls. Every function that changes state costs gas.' },
                { key: 'H', color: '#ED1C24', title: 'require (Guard Clause)', desc: 'If the condition is false, the entire transaction reverts — no state changes, no gas refund for execution so far. This is the Checks step in Checks-Effects-Interactions.' },
              ].map(a => (
                <div key={a.key} className="flex gap-2.5 items-start">
                  <span className="shrink-0 size-5 rounded-full flex items-center justify-center text-white text-[10px] font-black mt-0.5" style={{ backgroundColor: a.color }}>{a.key}</span>
                  <div>
                    <span className="font-bold text-xs text-foreground">{a.title} — </span>
                    <span className="text-xs text-muted-foreground">{a.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ EXECUTION ENVIRONMENT ═══════ */}
        <div id="s2-execution" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Execution Environment</h2>
            <p className="text-muted-foreground text-sm mt-1">Why smart contracts run the same way, everywhere, every time.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Left: four properties */}
            <div className="flex flex-col gap-3">
              {[
                {
                  color: '#6366f1', emoji: '🖥️', title: 'Virtual Machines',
                  subtitle: 'Isolated execution environments',
                  desc: 'The EVM (Ethereum), SVM (Solana), WASM (Polkadot, Near)… Each VM is a sandboxed environment that cannot access the host machine\'s filesystem, network, or memory. Code runs in isolation — securely and predictably.',
                  examples: ['EVM — Ethereum, Polygon, Arbitrum', 'SVM — Solana', 'MoveVM — Aptos, Sui', 'WASM — Polkadot, Near'],
                },
                {
                  color: '#39B54A', emoji: '🌐', title: 'Distributed Execution',
                  subtitle: 'Same code runs on thousands of nodes',
                  desc: 'When a transaction triggers a smart contract, every full node in the network runs the same code independently. There is no single server — execution is replicated across the globe.',
                  examples: ['Ethereum: ~7,000 full nodes', 'Redundancy eliminates single points of failure', 'No one can selectively block execution'],
                },
                {
                  color: '#f59e0b', emoji: '📐', title: 'Deterministic Results',
                  subtitle: 'Identical inputs always produce identical outputs',
                  desc: 'Smart contracts cannot use randomness, real-time clocks, or external data without special tools. This constraint is what makes distributed consensus possible — every node must agree on the result.',
                  examples: ['No Math.random()', 'No Date.now()', 'External data requires oracles (Chainlink)', 'Randomness requires commit-reveal or VRF'],
                },
                {
                  color: '#ED1C24', emoji: '🤝', title: 'Consensus Requirement',
                  subtitle: 'Majority agreement required for state changes',
                  desc: 'After execution, nodes compare results. Only if a supermajority agrees on the output does the state change get written to the blockchain. A single malicious node cannot affect the outcome.',
                  examples: ['PoS: validators attest to execution results', 'Invalid transactions are rejected network-wide', 'Double-spend or invalid state = rejected'],
                },
              ].map(p => (
                <div key={p.title} className="flex-1 p-4 bg-card border border-border rounded-xl flex gap-3" style={{ borderColor: p.color + '30' }}>
                  <div className="size-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: p.color + '15' }}>{p.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-sm text-foreground">{p.title}</div>
                    <div className="text-xs font-semibold mb-1" style={{ color: p.color }}>{p.subtitle}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: EVM landscape diagram */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">EVM-compatible ecosystem</div>

              <div className="flex-1 flex flex-col gap-2 p-4 bg-card border border-border rounded-xl">
                {/* Core EVM */}
                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/10 border-2 border-[#6366f1]/50">
                  <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-1">Ethereum Virtual Machine (EVM)</div>
                  <div className="text-xs text-muted-foreground">The original standard — runs Solidity & Vyper bytecode</div>
                </div>

                <div className="text-center text-muted-foreground text-sm">↓ compatible with ↓</div>

                {/* L1 EVM chains */}
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">EVM-compatible L1 chains</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['BNB Chain', 'Avalanche C-Chain', 'Fantom', 'Cronos', 'Celo', 'Gnosis'].map(c => (
                      <div key={c} className="text-center py-1.5 px-2 bg-[#6366f1]/08 border border-[#6366f1]/20 rounded-lg text-[11px] text-muted-foreground">{c}</div>
                    ))}
                  </div>
                </div>

                {/* L2 */}
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">Ethereum L2s (EVM-compatible)</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Arbitrum', 'Optimism', 'Base', 'Polygon', 'zkSync', 'Scroll'].map(c => (
                      <div key={c} className="text-center py-1.5 px-2 bg-[#39B54A]/08 border border-[#39B54A]/20 rounded-lg text-[11px] text-muted-foreground">{c}</div>
                    ))}
                  </div>
                </div>

                {/* Non-EVM */}
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">Non-EVM VMs</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { name: 'SVM', chain: 'Solana', color: '#9945FF' },
                      { name: 'MoveVM', chain: 'Aptos / Sui', color: '#00D4AA' },
                      { name: 'CosmWasm', chain: 'Cosmos chains', color: '#6366f1' },
                      { name: 'Ink! / WASM', chain: 'Polkadot', color: '#E6007A' },
                    ].map(v => (
                      <div key={v.name} className="py-1.5 px-2 bg-muted border border-border rounded-lg flex items-center gap-1.5">
                        <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: v.color }} />
                        <span className="text-[11px] font-bold text-foreground">{v.name}</span>
                        <span className="text-[10px] text-muted-foreground ml-auto">{v.chain}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto p-2 bg-[#6366f1]/08 border border-[#6366f1]/20 rounded-lg text-xs text-muted-foreground text-center">
                  <span className="font-semibold text-foreground">Deploy once, run anywhere:</span> EVM-compatible chains share the same bytecode standard — one Solidity contract works across 30+ chains.
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* ═══════ WEB3 LANDSCAPE ═══════ */}
        <div id="s2-web3" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">The Web3 Landscape</h2>
            <p className="text-muted-foreground text-sm mt-1">Not just a technology shift — a paradigm shift in how trust is established.</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-5">

            {/* Paradigm shift */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-gradient-to-br from-[#ED1C24]/12 to-transparent border border-[#ED1C24]/30 rounded-xl">
                <div className="text-xs font-bold text-[#ED1C24] uppercase tracking-widest mb-3">BEFORE — Web2</div>
                <div className="font-black text-lg text-foreground mb-2">Trust intermediaries</div>
                <div className="space-y-2 mb-3">
                  {['🏦 Banks — custody of your money', '🏛️ Institutions — custody of your data', '🏢 Platforms — custody of your identity'].map(t => (
                    <div key={t} className="text-sm text-muted-foreground flex gap-2"><span className="shrink-0">→</span>{t}</div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground italic border-t border-[#ED1C24]/20 pt-2">
                  You trust that the intermediary is honest, solvent, and won't be hacked or censored.
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-[#39B54A]/12 to-transparent border border-[#39B54A]/30 rounded-xl">
                <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest mb-3">AFTER — Web3</div>
                <div className="font-black text-lg text-foreground mb-2">Trust mathematics and transparent code</div>
                <div className="space-y-2 mb-3">
                  {['📐 Math — cryptographic proofs can\'t lie', '📖 Code — open-source, auditable logic', '🔗 Blockchain — shared, tamper-proof record'].map(t => (
                    <div key={t} className="text-sm text-muted-foreground flex gap-2"><span className="shrink-0">→</span>{t}</div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground italic border-t border-[#39B54A]/20 pt-2">
                  You trust the protocol — not the people running it.
                </div>
              </div>
            </div>

            {/* Implication */}
            <div className="p-4 bg-gradient-to-r from-[#6366f1]/15 to-[#8b5cf6]/10 border border-[#6366f1]/40 rounded-xl flex items-center gap-4">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-2xl shrink-0">⚡</div>
              <div>
                <div className="font-black text-base text-foreground">Implication: Disintermediation</div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  When trust is enforced by code rather than institutions, middlemen become optional. Smart contracts can replace escrow agents, brokers, settlement systems, and notaries — automatically, 24/7, globally.
                </p>
              </div>
            </div>

            {/* Web3 stack preview */}
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">The Web3 building blocks</div>
              <div className="flex gap-3">
                {[
                  { emoji: '📱', label: 'dApps', desc: 'Front-ends that interact with smart contracts via wallets', color: '#6366f1' },
                  { emoji: '📜', label: 'Smart Contracts', desc: 'Business logic deployed on-chain, permanently executable', color: '#8b5cf6' },
                  { emoji: '🔗', label: 'Blockchain', desc: 'Shared ledger and VM — Ethereum, Solana, BNB Chain…', color: '#39B54A' },
                  { emoji: '👛', label: 'Wallets', desc: 'Identity + private key management — your passport to Web3', color: '#f59e0b' },
                  { emoji: '🔮', label: 'Oracles', desc: 'Bridges between on-chain logic and real-world data', color: '#ED1C24' },
                ].map(b => (
                  <div key={b.label} className="flex-1 p-3 bg-card border border-border rounded-xl text-center" style={{ borderColor: b.color + '30' }}>
                    <div className="text-2xl mb-1">{b.emoji}</div>
                    <div className="font-bold text-xs mb-1" style={{ color: b.color }}>{b.label}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ dAPPS ═══════ */}
        <div id="s2-dapp" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">dApps & Smart Contracts</h2>
            <p className="text-muted-foreground text-sm mt-1">A dApp is not just a smart contract — it's a full stack where blockchain is one layer.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Left: three pillars */}
            <div className="flex flex-col gap-3">
              {[
                {
                  color: '#6366f1', emoji: '📜', title: 'Smart Contracts',
                  subtitle: 'Logic & storage on blockchain',
                  items: ['Business logic and conditional rules', 'State: balances, ownership, votes', 'Functions callable by any address', 'Events emitted for off-chain listeners'],
                },
                {
                  color: '#f59e0b', emoji: '🖥️', title: 'Traditional Frontend',
                  subtitle: 'Web or mobile interface',
                  items: ['React / Next.js / Vue — standard web stack', 'Browser: connects wallet (MetaMask, Rabby)', 'Wallets: sign transactions, hold keys', 'RPC endpoints: query blockchain state (Infura, Alchemy)'],
                },
                {
                  color: '#39B54A', emoji: '🗄️', title: 'Off-Chain Components',
                  subtitle: 'Infrastructure outside the blockchain',
                  items: ['Storage: IPFS, Arweave (large files, NFT metadata)', 'Indexers: The Graph — query blockchain data like a DB', 'Databases: user preferences, analytics, caching', 'APIs: oracles, payment rails, notification services'],
                },
              ].map(p => (
                <div key={p.title} className="flex-1 p-4 bg-card border border-border rounded-xl" style={{ borderColor: p.color + '30' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{p.emoji}</span>
                    <div>
                      <div className="font-black text-sm text-foreground">{p.title}</div>
                      <div className="text-xs font-semibold" style={{ color: p.color }}>{p.subtitle}</div>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {p.items.map(item => (
                      <li key={item} className="text-xs text-muted-foreground flex gap-1.5">
                        <span style={{ color: p.color }} className="shrink-0">›</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right: full stack diagram */}
            <div className="flex flex-col gap-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Full dApp stack</div>

              {/* User */}
              <div className="flex justify-center py-2">
                <div className="px-6 py-2 bg-muted border border-border rounded-full text-sm font-bold text-foreground">👤 User</div>
              </div>
              <div className="flex justify-center text-muted-foreground text-sm">↕ interacts via</div>

              {/* Frontend layer */}
              <div className="p-3 border-2 border-[#f59e0b]/50 bg-[#f59e0b]/08 rounded-xl">
                <div className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest mb-2">🖥️ Frontend Layer</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {['React / Next.js', 'MetaMask Wallet', 'RPC (Infura)'].map(c => (
                    <div key={c} className="text-center text-[10px] py-1 px-1.5 bg-[#f59e0b]/12 border border-[#f59e0b]/25 rounded text-muted-foreground">{c}</div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center text-muted-foreground text-sm">↕ calls</div>

              {/* Blockchain layer */}
              <div className="p-3 border-2 border-[#6366f1]/50 bg-[#6366f1]/08 rounded-xl">
                <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-2">🔗 Blockchain Layer</div>
                <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                  {['Smart Contract', 'Virtual Machine (EVM)', 'Blockchain Nodes', 'Consensus (PoS)'].map(c => (
                    <div key={c} className="text-center text-[10px] py-1 px-1.5 bg-[#6366f1]/12 border border-[#6366f1]/25 rounded text-muted-foreground">{c}</div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center text-muted-foreground text-sm">↕ stores / reads</div>

              {/* Off-chain layer */}
              <div className="p-3 border-2 border-[#39B54A]/50 bg-[#39B54A]/08 rounded-xl">
                <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest mb-2">🗄️ Off-Chain Layer</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {['IPFS / Arweave', 'The Graph', 'Oracles (Chainlink)'].map(c => (
                    <div key={c} className="text-center text-[10px] py-1 px-1.5 bg-[#39B54A]/12 border border-[#39B54A]/25 rounded text-muted-foreground">{c}</div>
                  ))}
                </div>
              </div>

              <div className="mt-auto p-2.5 bg-[#6366f1]/10 border border-[#6366f1]/25 rounded-lg text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Key insight:</span> only the blockchain layer is decentralized. Most dApps still rely on centralized hosting (Vercel, AWS) for their frontend — a nuance that's often overlooked.
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ WEB3 VS TRADITIONAL ═══════ */}
        <div id="s2-vs" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Web3 vs Traditional — Two Comparisons</h2>
            <p className="text-muted-foreground text-sm mt-1">Infrastructure and contracts — both transformed by the same underlying shift.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* App infrastructure comparison */}
            <div className="flex flex-col min-h-0">
              <div className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest mb-2 shrink-0">App Infrastructure</div>
              <div className="flex-1 min-h-0 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="grid grid-cols-3 text-[11px] font-bold uppercase tracking-widest shrink-0">
                  <div className="p-2.5 bg-muted border-b border-r border-border text-muted-foreground">Property</div>
                  <div className="p-2.5 bg-[#ED1C24]/08 border-b border-r border-[#ED1C24]/20 text-[#ED1C24] text-center">Traditional App</div>
                  <div className="p-2.5 bg-[#39B54A]/08 border-b border-[#39B54A]/20 text-[#39B54A] text-center">dApp</div>
                </div>
                <div className="flex-1 min-h-0 flex flex-col">
                  {[
                    { prop: '🏗️ Infrastructure', trad: 'Centralised servers (AWS, GCP)', dapp: 'Distributed nodes worldwide' },
                    { prop: '🔐 Trust model', trad: 'Trust the company', dapp: 'Trust the protocol & code' },
                    { prop: '⏱️ Uptime', trad: 'SLA-based, can go down', dapp: 'Protocol runs 24/7/365' },
                    { prop: '🗄️ Data storage', trad: 'Private databases', dapp: 'On-chain state + IPFS' },
                    { prop: '💰 Cost model', trad: 'Subscription / ads', dapp: 'Gas per transaction' },
                    { prop: '🚫 Censorship', trad: 'Platform can ban users', dapp: 'No one can block valid txs' },
                  ].map((r, i, arr) => (
                    <div key={r.prop} className={`flex-1 grid grid-cols-3 text-xs ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                      <div className="px-2.5 flex items-center border-r border-border font-medium text-muted-foreground">{r.prop}</div>
                      <div className="px-2.5 flex items-center justify-center border-r border-border text-muted-foreground text-center">{r.trad}</div>
                      <div className="px-2.5 flex items-center justify-center text-muted-foreground text-center">{r.dapp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contract comparison */}
            <div className="flex flex-col min-h-0">
              <div className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-widest mb-2 shrink-0">Contract Execution</div>
              <div className="flex-1 min-h-0 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="grid grid-cols-3 text-[11px] font-bold uppercase tracking-widest shrink-0">
                  <div className="p-2.5 bg-muted border-b border-r border-border text-muted-foreground">Property</div>
                  <div className="p-2.5 bg-[#ED1C24]/08 border-b border-r border-[#ED1C24]/20 text-[#ED1C24] text-center">Traditional Contract</div>
                  <div className="p-2.5 bg-[#6366f1]/08 border-b border-[#6366f1]/20 text-[#6366f1] text-center">Smart Contract</div>
                </div>
                <div className="flex-1 min-h-0 flex flex-col">
                  {[
                    { prop: '⚙️ Execution',    trad: 'Manual — requires human action', smart: 'Automatic when conditions met' },
                    { prop: '⏱️ Speed',        trad: 'Days to weeks', smart: 'Seconds to minutes' },
                    { prop: '💸 Cost',         trad: 'Legal fees, intermediaries', smart: 'Gas fee only' },
                    { prop: '🔐 Trust',        trad: 'Trust both parties + courts', smart: 'Trust the code only' },
                    { prop: '👁️ Transparency', trad: 'Private, often ambiguous', smart: 'Public, deterministic code' },
                    { prop: '🌍 Geography',    trad: 'Jurisdiction-dependent', smart: 'Borderless, always enforceable' },
                  ].map((r, i, arr) => (
                    <div key={r.prop} className={`flex-1 grid grid-cols-3 text-xs ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                      <div className="px-2.5 flex items-center border-r border-border font-medium text-muted-foreground">{r.prop}</div>
                      <div className="px-2.5 flex items-center justify-center border-r border-border text-muted-foreground text-center">{r.trad}</div>
                      <div className="px-2.5 flex items-center justify-center text-muted-foreground text-center">{r.smart}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* ═══════ NEW CAPABILITIES ═══════ */}
        <div id="s2-capabilities" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">New Capabilities</h2>
            <p className="text-muted-foreground text-sm mt-1">What smart contracts make possible that no prior technology could — five genuine breakthroughs.</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {[
              {
                color: '#6366f1',
                emoji: '🧩',
                title: 'Permissionless Composability',
                tagline: 'Any contract can interact with any other — no API keys, no approval process.',
                detail: 'Every deployed contract is a public primitive. Uniswap, Aave, and Compound can be combined into a single transaction by anyone. This "money lego" model has no equivalent in traditional finance — banks do not expose their logic for others to build on.',
                example: 'Flash loans: borrow $10M, use it across 3 protocols, repay — all in one atomic transaction.',
              },
              {
                color: '#39B54A',
                emoji: '⚛️',
                title: 'Atomic Transactions',
                tagline: 'Complex multi-step operations execute completely — or fail completely. No partial states.',
                detail: 'In traditional systems, a multi-step process (transfer → update record → notify) can fail halfway, leaving inconsistent state. In smart contracts, all steps are bundled into one atomic operation that either fully succeeds or fully reverts.',
                example: 'DEX swap: send ETH → verify liquidity → transfer tokens → update reserves — all or nothing.',
              },
              {
                color: '#f59e0b',
                emoji: '🌍',
                title: 'Global Shared State',
                tagline: 'Synchronized state accessible to all participants worldwide — with no central coordinator.',
                detail: 'Any address on Earth can read and interact with the same smart contract state simultaneously. No API rate limits, no regional servers, no access tiers. The blockchain is a single shared database with global read/write access.',
                example: 'An NFT ownership record is instantly visible to every marketplace, wallet, and game on every continent.',
              },
              {
                color: '#8b5cf6',
                emoji: '💸',
                title: 'Programmable Money',
                tagline: 'Native value transfer with conditional logic — money that enforces its own rules.',
                detail: 'ETH and tokens can be embedded directly in contract logic. "Release funds only if the delivery is confirmed." "Split revenue automatically by ownership percentage." Money becomes programmable without requiring a bank API.',
                example: 'Streaming payments: Superfluid protocol streams salary per second — no payroll department needed.',
              },
              {
                color: '#ED1C24',
                emoji: '🛡️',
                title: 'Censorship Resistance',
                tagline: 'No single entity can block valid transactions — not governments, not companies, not developers.',
                detail: 'Once deployed, a smart contract runs as long as the blockchain runs. No company can be pressured to shut it down. No regulator can block specific users. The code executes for anyone who sends a valid transaction with sufficient gas.',
                example: 'Tornado Cash was blacklisted by OFAC — the front-end went down, but the smart contract kept running.',
              },
            ].map(c => (
              <div key={c.title} className="flex-1 flex items-start gap-4 p-4 bg-card border border-border rounded-xl" style={{ borderColor: c.color + '30' }}>
                <div className="size-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: c.color + '18' }}>{c.emoji}</div>
                <div className="flex-1 min-w-0 grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <div className="font-black text-sm text-foreground">{c.title}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: c.color }}>{c.tagline}</div>
                  </div>
                  <div className="col-span-1 text-xs text-muted-foreground leading-relaxed">{c.detail}</div>
                  <div className="col-span-1">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Real example</div>
                    <div className="text-xs text-muted-foreground p-2 bg-muted rounded-lg italic">{c.example}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ WHY BUILD WITH SMART CONTRACTS? ═══════ */}
        <div id="s2-why" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Why Build Using Smart Contracts?</h2>
            <p className="text-muted-foreground text-sm mt-1">The case for choosing smart contracts over traditional software — and when not to.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">

            {/* Column 1: Core reasons */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Core reasons to build</p>
              {[
                { color: '#6366f1', emoji: '🤝', title: 'Eliminate Intermediaries', desc: 'No bank, notary, or escrow agent needed. The contract enforces the rules and releases funds automatically — reducing cost and counterparty risk.' },
                { color: '#39B54A', emoji: '🌍', title: 'Global by Default', desc: 'Deploy once, accessible to anyone on Earth with an internet connection. No geographic restrictions, no foreign exchange friction, no banking requirements.' },
                { color: '#f59e0b', emoji: '🔍', title: 'Radical Transparency', desc: 'Every rule is public, readable, and auditable. Users don\'t have to trust a company\'s promises — they can verify the code themselves.' },
                { color: '#8b5cf6', emoji: '⚡', title: 'Always-On Automation', desc: 'Code executes the moment conditions are met — no office hours, no approval queues, no human latency. Payouts, transfers, and state changes happen in seconds.' },
              ].map(r => (
                <div key={r.title} className="flex-1 flex gap-2.5 p-3 bg-card border border-border rounded-xl" style={{ borderColor: r.color + '30' }}>
                  <div className="size-8 rounded-lg flex items-center justify-center text-base shrink-0" style={{ backgroundColor: r.color + '18' }}>{r.emoji}</div>
                  <div>
                    <div className="font-bold text-xs mb-0.5" style={{ color: r.color }}>{r.title}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Business impact */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Business impact</p>
              {[
                { color: '#ED1C24', emoji: '💰', title: 'Programmable Money', desc: 'Revenue splits, royalties, and conditional payments execute automatically on every transaction. Superfluid streams salary per second. Mirror splits publication revenue by ownership.' },
                { color: '#6366f1', emoji: '🧩', title: 'Composable Ecosystem', desc: 'Your contract can instantly integrate with Uniswap, Aave, Chainlink — no partnerships, no API keys. This "money lego" model accelerates product development exponentially.' },
                { color: '#39B54A', emoji: '📜', title: 'Immutable Commitments', desc: 'Once deployed, the rules cannot be changed by any party — not even you. This removes the risk of unilateral platform changes that destroy user trust overnight.' },
                { color: '#f59e0b', emoji: '🏛️', title: 'DAO Governance', desc: 'Smart contracts enable token-weighted voting, on-chain treasuries, and automatic execution of governance proposals — organisations without a legal entity or board.' },
              ].map(r => (
                <div key={r.title} className="flex-1 flex gap-2.5 p-3 bg-card border border-border rounded-xl" style={{ borderColor: r.color + '30' }}>
                  <div className="size-8 rounded-lg flex items-center justify-center text-base shrink-0" style={{ backgroundColor: r.color + '18' }}>{r.emoji}</div>
                  <div>
                    <div className="font-bold text-xs mb-0.5" style={{ color: r.color }}>{r.title}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3: When to use & when not to */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Decision framework</p>

              <div className="flex-1 p-3 bg-[#39B54A]/08 border border-[#39B54A]/30 rounded-xl flex flex-col">
                <div className="font-bold text-xs text-[#39B54A] mb-2">✅ Use smart contracts when…</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground flex-1">
                  {[
                    'Multiple untrusting parties need to transact',
                    'Rules must be transparent and tamper-proof',
                    'Automation replaces a human intermediary',
                    'You need programmable, conditional payments',
                    'Global access with no permission required',
                    'Composability with other on-chain protocols is valuable',
                  ].map(l => (
                    <li key={l} className="flex gap-1.5"><span className="text-[#39B54A] shrink-0">›</span>{l}</li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 p-3 bg-[#ED1C24]/08 border border-[#ED1C24]/30 rounded-xl flex flex-col">
                <div className="font-bold text-xs text-[#ED1C24] mb-2">❌ Avoid smart contracts when…</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground flex-1">
                  {[
                    'Data is private and shouldn\'t be public',
                    'You need to update logic frequently',
                    'Speed is critical (sub-second responses)',
                    'Storage requirements are large (images, video)',
                    'Regulatory compliance requires reversibility',
                    'A simple database and API would suffice',
                  ].map(l => (
                    <li key={l} className="flex gap-1.5"><span className="text-[#ED1C24] shrink-0">›</span>{l}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ GAS FUNDAMENTALS ═══════ */}
        <div id="s2-gas" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Gas & Transaction Economics</h2>
            <p className="text-muted-foreground text-sm mt-1">Every computation costs gas. Understanding this is essential for building real applications.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">

            {/* Left: fundamentals */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Gas system fundamentals</div>

              {[
                { color: '#6366f1', emoji: '⛽', term: 'Gas',       def: 'Unit measuring the computational work required for an operation. Every EVM opcode has a fixed gas cost — storing data costs more than reading it.' },
                { color: '#f59e0b', emoji: '💲', term: 'Gas Price',  def: 'Market-determined cost per gas unit (denominated in Gwei — 1 ETH = 1,000,000,000 Gwei). Set by the user; higher price = faster inclusion.' },
                { color: '#39B54A', emoji: '🔢', term: 'Gas Limit',  def: 'Maximum gas the user is willing to spend on this transaction. Acts as a safety cap — prevents runaway loops from draining your wallet.' },
                { color: '#ED1C24', emoji: '🧾', term: 'Tx Fee',     def: 'Gas Used × Gas Price = Total Cost in ETH. Unused gas (up to the limit) is refunded. You pay for what the EVM actually executes.' },
              ].map(g => (
                <div key={g.term} className="flex gap-3 p-3 bg-card border border-border rounded-xl flex-1" style={{ borderColor: g.color + '30' }}>
                  <div className="size-9 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: g.color + '18' }}>{g.emoji}</div>
                  <div>
                    <div className="font-black text-sm mb-0.5" style={{ color: g.color }}>{g.term}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{g.def}</div>
                  </div>
                </div>
              ))}

              {/* Formula */}
              <div className="p-3 bg-gradient-to-r from-[#6366f1]/15 to-[#8b5cf6]/10 border border-[#6366f1]/30 rounded-xl text-center">
                <div className="text-xs text-muted-foreground mb-1">Transaction fee formula</div>
                <div className="font-mono font-black text-sm text-foreground">
                  <span className="text-[#f59e0b]">Gas Used</span> × <span className="text-[#6366f1]">Gas Price (Gwei)</span> = <span className="text-[#ED1C24]">Fee (ETH)</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">e.g. 21,000 gas × 15 Gwei = 0.000315 ETH (~$0.80)</div>
              </div>
            </div>

            {/* Right: why gas + economics */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Why gas? — economic incentives</div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { color: '#6366f1', emoji: '👤', who: 'Users', why: 'Pay for the computation and storage they consume — no free lunch, prevents spam.' },
                  { color: '#39B54A', emoji: '✅', who: 'Validators', why: 'Receive fees for processing transactions — economic incentive to keep the network running.' },
                  { color: '#f59e0b', emoji: '🌐', who: 'Network', why: 'Higher fees during congestion create natural throttling — the market self-regulates throughput.' },
                  { color: '#8b5cf6', emoji: '🔥', who: 'EIP-1559', why: 'Base fee is burned, not paid to validators. Deflationary pressure on ETH supply during high usage.' },
                ].map(e => (
                  <div key={e.who} className="p-3 bg-card border border-border rounded-xl" style={{ borderColor: e.color + '30' }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span>{e.emoji}</span>
                      <span className="font-bold text-xs" style={{ color: e.color }}>{e.who}</span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{e.why}</div>
                  </div>
                ))}
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Real-world impact</div>
                {[
                  { color: '#ED1C24', emoji: '📈', label: 'Congestion spikes', desc: 'Network congestion can increase costs 10–100×. During the 2021 NFT boom, simple transfers cost $50–200.' },
                  { color: '#f59e0b', emoji: '⚖️', label: 'Speed vs. cost', desc: 'Users set gas price: higher = faster inclusion, lower = wait. Wallets show estimated confirmation times.' },
                  { color: '#39B54A', emoji: '🚀', label: 'Layer 2 savings', desc: 'Arbitrum, Optimism, Base reduce costs by 10–1000×. The same transaction that costs $5 on L1 costs $0.01 on L2.' },
                ].map(r => (
                  <div key={r.label} className="flex gap-3 p-3 bg-card border border-border rounded-xl flex-1" style={{ borderColor: r.color + '20' }}>
                    <span className="text-lg shrink-0">{r.emoji}</span>
                    <div>
                      <div className="font-bold text-xs mb-0.5" style={{ color: r.color }}>{r.label}</div>
                      <div className="text-xs text-muted-foreground">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ RESHAPE BUSINESS ═══════ */}
        <div id="s2-reshape" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How Smart Contracts Reshape Traditional Business</h2>
            <p className="text-muted-foreground text-sm mt-1">Five structural shifts that distinguish smart-contract-native businesses from traditional ones.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-5 gap-3 content-center">
            {[
              { num: '01', emoji: '🔓', title: 'Disintermediation',     color: '#6366f1', desc: 'Peer-to-peer execution. No banks, brokers, or escrow services needed for the agreement to clear.', src: 'IBM (2019)' },
              { num: '02', emoji: '⚙️', title: 'Process Automation',    color: '#8b5cf6', desc: 'Autonomous "if X, then Y" rules execute the moment conditions are met — no manual approval step.', src: 'Akinsola & Mary (2025)' },
              { num: '03', emoji: '🔍', title: 'Trustless & Transparent',color: '#22d3ee', desc: 'Trust shifts from people to code + consensus. All actions are verifiable, auditable, and global.', src: 'Nzuva (2019)' },
              { num: '04', emoji: '💰', title: 'Cost Reduction',         color: '#39B54A', desc: 'Eliminates middlemen, manual paperwork, and ongoing legal oversight. Cuts escrow, reconciliation, and compliance costs.', src: 'Perlman (2019)' },
              { num: '05', emoji: '🌐', title: 'New Value Chains',       color: '#f59e0b', desc: 'Entirely new business models, products, and ecosystems become possible — DAOs, tokenized assets, M2M payments.', src: 'Dal Mas et al. (2019)' },
            ].map(c => (
              <div key={c.num} className="p-4 bg-card border rounded-xl flex flex-col gap-2"
                style={{ borderColor: c.color + '40' }}>
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: c.color }}>{c.num}</div>
                  <div className="text-2xl">{c.emoji}</div>
                </div>
                <div className="font-bold text-sm text-foreground">{c.title}</div>
                <div className="text-xs text-muted-foreground leading-snug flex-1">{c.desc}</div>
                <div className="text-[10px] italic text-muted-foreground">{c.src}</div>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">The pattern:</span> traditional businesses centralize trust in an intermediary. Smart-contract-native businesses distribute that trust into code + consensus, then build new economic primitives on top — composability, atomicity, and global reach. The next section explores where this works in practice.
          </div>
        </div>

        {/* ═══════ QUIZZES ═══════ */}
        {/* Quiz 1: Workflow */}
        <div id="s2-quiz" className="h-full">
          <QuizSlide
            question="In the smart contract execution workflow, what triggers a contract to run?"
            options={[
              { text: "A scheduled cron job on the blockchain's servers", correct: false },
              { text: "A transaction sent to the contract's address on the blockchain", correct: true },
              { text: "The developer manually calling the contract from their machine", correct: false },
              { text: "The Ethereum Foundation approving the execution request", correct: false },
            ]}
            explanation="Smart contracts are passive — they sit on the blockchain and do nothing until triggered. A transaction sent to the contract address kicks off execution on the EVM. The contract then runs, updates state, and emits events — all within that single transaction."
          />
        </div>

        {/* Quiz 2: Execution environment */}
        <div className="h-full">
          <QuizSlide
            question="Why must smart contract execution be deterministic?"
            options={[
              { text: "So the developer can predict gas costs in advance", correct: false },
              { text: "To keep execution fast on validator hardware", correct: false },
              { text: "Because every node runs the same code — different results would break consensus", correct: true },
              { text: "Because Solidity doesn't support randomness as a language feature", correct: false },
            ]}
            explanation="Thousands of nodes around the world execute every smart contract independently. If the same inputs could produce different outputs, nodes would disagree on the blockchain state and consensus would fail. Determinism is not a convenience — it's a fundamental requirement for a distributed system."
          />
        </div>

        {/* Quiz 3: Web3 vs Traditional */}
        <div className="h-full">
          <QuizSlide
            question="Compared to a traditional legal contract, what is a unique advantage of a smart contract?"
            options={[
              { text: "It is legally binding in all jurisdictions without any additional steps", correct: false },
              { text: "It executes automatically when conditions are met — no court or intermediary required", correct: true },
              { text: "It can be amended by either party at any time after deployment", correct: false },
              { text: "It stores unlimited off-chain data for free", correct: false },
            ]}
            explanation="The core value proposition of smart contracts is automatic, trustless enforcement. A traditional contract requires human action and a legal system to enforce it — this takes days and costs money. A smart contract self-executes the moment conditions are satisfied, with no intermediary and no geographic limitation."
          />
        </div>

        {/* Quiz 4: New capabilities */}
        <div className="h-full">
          <QuizSlide
            question="What does 'atomic transaction' mean in the context of smart contracts?"
            options={[
              { text: "Transactions are processed using atomic-level cryptography for security", correct: false },
              { text: "Only one transaction can run on the blockchain at any given time", correct: false },
              { text: "A multi-step operation either completes entirely or reverts entirely — no partial states", correct: true },
              { text: "Transactions are automatically split into smaller units to save gas", correct: false },
            ]}
            explanation="Atomicity means 'all or nothing'. In a smart contract, if any step of a complex operation fails, the entire transaction reverts as if it never happened. This eliminates the risk of partial execution — a problem common in traditional multi-system workflows where one step can succeed while another fails."
          />
        </div>

        {/* Quiz 5: Gas economics */}
        <div className="h-full">
          <QuizSlide
            question="If a smart contract transaction runs out of gas mid-execution, what happens?"
            options={[
              { text: "The transaction pauses and resumes when the user pays more gas", correct: false },
              { text: "The completed steps are kept but the remaining steps are skipped", correct: false },
              { text: "The transaction reverts completely, but the gas already consumed is not refunded", correct: true },
              { text: "The network automatically increases the gas limit to complete it", correct: false },
            ]}
            explanation="Gas-out causes a full revert — all state changes are undone as if the transaction never happened. However, the gas already used for computation is burned and not returned to the sender. This is why setting an appropriate gas limit matters: too low and you waste fees on a failed transaction."
          />
        </div>

        {/* ═══════ EXERCISE: GAS RANKING ═══════ */}
        <div id="s2-ex-gas" className="h-full">
          <GasRankingExercise />
        </div>

        {/* ═══════ EXERCISE: dAPP STACK ═══════ */}
        <div id="s2-ex-stack" className="h-full">
          <DAppStackExercise />
        </div>

        <div id="s2-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 02 — Key Takeaways"
            takeaways={[
              'Smart contracts run inside a deterministic virtual machine (EVM) — every node gets the same result',
              'Core components: state variables, functions, events, modifiers, and ABI',
              'Web3 dApps combine a front-end with a wallet and on-chain smart contract logic',
              'Gas is the cost of computation — every operation has a price in ETH',
              'Smart contracts enable programmable money, automated settlement, and trustless governance',
            ]}
          />
        </div>

        {/* ═══════ SUMMARY ═══════ */}
        <div id="s2-summary" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Section Summary</h2>
            <p className="text-sm text-muted-foreground mt-1">Everything covered in this section — at a glance</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-start">
            {[
              { icon: '🔄', title: 'Smart Contract Workflow', summary: 'Write → Compile → Deploy → Interact — four irreversible steps on an immutable ledger' },
              { icon: '⛽', title: 'Gas & Tx Economics', summary: 'Gas = execution units · Gas price (Gwei) = market rate · EIP-1559: base fee burned + priority tip' },
              { icon: '🏗️', title: 'dApp Stack', summary: 'Smart contract (logic) + IPFS (storage) + Infura RPC (access) + MetaMask (wallet) + React (UI)' },
              { icon: '🌐', title: 'Web3 vs Traditional', summary: 'Stateless vs stateful · Trustless vs trusted server · Public ledger vs private database' },
              { icon: '💡', title: 'New Capabilities', summary: 'Flash loans, composability, atomic settlement, programmable money, DAO governance — impossible in TradFi' },
              { icon: '⚖️', title: 'Why Build with SC?', summary: 'Use when: multiple parties + conditional logic + no trusted intermediary + need for auditability' },
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
            <span className="text-xs text-muted-foreground">Proceed to Section 3 for real-world case studies and de-hype analysis →</span>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
