import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Flame } from 'lucide-react';

interface BlockSim {
  num: number;
  baseFee: number;     // Gwei
  fullness: number;    // 0..1 — fraction of gas target hit (0=empty, 1=target, 2=full)
  burned: number;      // ETH-equiv burned (just for show)
}

const TARGET_FULLNESS = 1;     // 50% of max → target gas
const MAX_FULLNESS = 2;        // 100% of max (2× target)
const ADJUST_RATE = 0.125;     // ±12.5% per block

function nextBaseFee(prev: number, fullness: number): number {
  // EIP-1559 formula (simplified): baseFee_{n+1} = baseFee_n * (1 + 1/8 * (used - target) / target)
  const delta = (fullness - TARGET_FULLNESS) / TARGET_FULLNESS; // -1..+1
  const newFee = prev * (1 + ADJUST_RATE * delta);
  return Math.max(1, Math.round(newFee * 100) / 100);
}

const STARTING_BASE_FEE = 25;
const HISTORY_LIMIT = 8;

export function Eip1559Demo() {
  const [history, setHistory] = useState<BlockSim[]>([
    { num: 1, baseFee: STARTING_BASE_FEE, fullness: TARGET_FULLNESS, burned: 0 },
  ]);

  const last = history[history.length - 1];

  const stepBlock = (fullness: number) => {
    setHistory(h => {
      const prev = h[h.length - 1];
      const nb = nextBaseFee(prev.baseFee, fullness);
      const burned = (nb * fullness * 15_000_000) / 1e9; // gas × baseFee → ETH; rough
      const next: BlockSim = {
        num: prev.num + 1,
        baseFee: nb,
        fullness,
        burned: prev.burned + burned,
      };
      const updated = [...h, next];
      return updated.length > HISTORY_LIMIT ? updated.slice(-HISTORY_LIMIT) : updated;
    });
  };

  const reset = () => setHistory([{ num: 1, baseFee: STARTING_BASE_FEE, fullness: TARGET_FULLNESS, burned: 0 }]);

  const maxBaseFee = Math.max(...history.map(b => b.baseFee), 30);

  return (
    <div className="rounded-2xl border-2 border-[#10b981]/40 bg-card p-4 lg:p-5 flex flex-col gap-3 h-full min-h-0">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xl">⛽</span>
        <h3 className="font-black text-base text-foreground">Base Fee Adjustment</h3>
        <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-[#10b981] bg-[#10b981]/15 px-2 py-0.5 rounded-full">Interactive</span>
      </div>

      <p className="text-xs text-muted-foreground shrink-0">
        Every block, the protocol re-prices gas based on demand. <span className="text-foreground font-semibold">Click how full the next block is</span> and watch the base fee respond.
      </p>

      {/* Controls — pick next block's fullness */}
      <div className="grid grid-cols-5 gap-1.5 shrink-0">
        {[
          { label: 'Empty',  value: 0,    color: '#3b82f6' },
          { label: 'Quiet',  value: 0.5,  color: '#10b981' },
          { label: 'Target', value: 1.0,  color: '#a78bfa' },
          { label: 'Busy',   value: 1.5,  color: '#f59e0b' },
          { label: 'Full',   value: MAX_FULLNESS, color: '#ef4444' },
        ].map(opt => (
          <button
            key={opt.label}
            onClick={() => stepBlock(opt.value)}
            className="p-2 rounded-lg border-2 transition-all hover:scale-[1.02] flex flex-col items-center gap-0.5"
            style={{ borderColor: opt.color + '50', backgroundColor: opt.color + '12' }}
          >
            <Play className="size-3" style={{ color: opt.color }} />
            <span className="text-[11px] font-bold" style={{ color: opt.color }}>{opt.label}</span>
            <span className="text-[9px] text-muted-foreground">{(opt.value * 50).toFixed(0)}% full</span>
          </button>
        ))}
      </div>

      {/* Current base fee + reset */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2 shrink-0">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">current base fee</div>
          <motion.div
            key={last.baseFee}
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            className="text-xl font-black font-mono text-foreground"
          >
            {last.baseFee.toFixed(2)} <span className="text-xs text-muted-foreground">Gwei</span>
          </motion.div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#f97316]">
          <Flame className="size-3.5" />
          <span className="font-mono">{last.burned.toFixed(4)} ETH burned</span>
        </div>
        <button
          onClick={reset}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="reset"
        >
          <RotateCcw className="size-3.5" />
        </button>
      </div>

      {/* Block history chart */}
      <div className="flex-1 min-h-0 rounded-xl border border-border bg-muted/20 p-3 flex flex-col">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">last {history.length} block{history.length > 1 ? 's' : ''}</div>
        <div className="flex-1 flex items-end gap-1.5 min-h-0">
          <AnimatePresence>
            {history.map((b) => {
              const heightPct = (b.baseFee / maxBaseFee) * 100;
              const fullnessPct = (b.fullness / MAX_FULLNESS) * 100;
              const trend = b.fullness > TARGET_FULLNESS ? '#ef4444' : b.fullness < TARGET_FULLNESS ? '#3b82f6' : '#a78bfa';
              return (
                <motion.div
                  key={b.num}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex flex-col items-center justify-end h-full min-w-0 gap-1"
                >
                  {/* base fee bar */}
                  <div className="text-[9px] font-mono text-foreground">{b.baseFee.toFixed(0)}</div>
                  <div className="w-full rounded-t-md" style={{ height: `${heightPct}%`, backgroundColor: trend, opacity: 0.85 }} />
                  {/* fullness mini-bar */}
                  <div className="w-full h-1 rounded-full bg-border overflow-hidden">
                    <div className="h-full" style={{ width: `${Math.min(fullnessPct, 100)}%`, backgroundColor: trend }} />
                  </div>
                  <div className="text-[9px] text-muted-foreground">#{b.num}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px] shrink-0">
        <Legend color="#3b82f6" label="< target · fee drops" />
        <Legend color="#a78bfa" label="= target · steady" />
        <Legend color="#ef4444" label="> target · fee rises" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
