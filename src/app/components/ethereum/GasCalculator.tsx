import { useState } from 'react';
import { motion } from 'motion/react';
import { Fuel } from 'lucide-react';

interface Op {
  label: string;
  emoji: string;
  gas: number;
  hint: string;
}

const OPS: Op[] = [
  { label: 'Send ETH',         emoji: '💸', gas: 21_000,  hint: 'fixed cost · EOA → EOA' },
  { label: 'ERC-20 transfer',  emoji: '🪙', gas: 65_000,  hint: 'standard token send' },
  { label: 'Uniswap swap',     emoji: '🔄', gas: 180_000, hint: 'AMM trade · 2–3 hops' },
  { label: 'NFT mint',         emoji: '🖼️', gas: 90_000,  hint: 'ERC-721 mint' },
  { label: 'Deploy contract',  emoji: '🏗️', gas: 1_200_000, hint: 'depends on bytecode size' },
];

export function GasCalculator() {
  const [opIdx, setOpIdx] = useState(2); // default Uniswap swap — most relatable
  const [baseFee, setBaseFee] = useState(25);     // Gwei
  const [tip, setTip] = useState(1.5);            // Gwei
  const [ethUsd, setEthUsd] = useState(3500);     // USD

  const op = OPS[opIdx];
  const totalGwei = (baseFee + tip) * op.gas;
  const eth = totalGwei / 1e9;
  const usd = eth * ethUsd;

  return (
    <div className="rounded-2xl border-2 border-[#627EEA]/40 bg-card p-4 lg:p-5 flex flex-col gap-3 h-full min-h-0">
      <div className="flex items-center gap-2 shrink-0">
        <Fuel className="size-5 text-[#627EEA]" />
        <h3 className="font-black text-base text-foreground">Gas Cost Calculator</h3>
        <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-[#627EEA] bg-[#627EEA]/15 px-2 py-0.5 rounded-full">Interactive</span>
      </div>

      {/* Operation picker */}
      <div className="grid grid-cols-5 gap-1.5 shrink-0">
        {OPS.map((o, i) => (
          <button
            key={o.label}
            onClick={() => setOpIdx(i)}
            className={`p-2 rounded-lg border text-center transition-all ${
              i === opIdx
                ? 'border-[#627EEA] bg-[#627EEA]/15 shadow-sm'
                : 'border-border hover:border-[#627EEA]/60'
            }`}
          >
            <div className="text-base leading-none mb-0.5">{o.emoji}</div>
            <div className="text-[10px] font-bold text-foreground leading-tight">{o.label}</div>
          </button>
        ))}
      </div>

      <div className="text-[11px] text-muted-foreground italic shrink-0">{op.hint}</div>

      {/* Sliders */}
      <div className="flex flex-col gap-2.5 shrink-0">
        <Slider
          label="Base fee"
          value={baseFee}
          min={1}
          max={150}
          step={1}
          onChange={setBaseFee}
          unit="Gwei"
          color="#627EEA"
          hint="set by the network · burned 🔥"
        />
        <Slider
          label="Priority tip"
          value={tip}
          min={0}
          max={10}
          step={0.1}
          onChange={setTip}
          unit="Gwei"
          color="#10b981"
          hint="tip to validator · you choose"
        />
        <Slider
          label="ETH price"
          value={ethUsd}
          min={500}
          max={10000}
          step={100}
          onChange={setEthUsd}
          unit="USD"
          color="#f59e0b"
        />
      </div>

      {/* Result */}
      <motion.div
        key={`${opIdx}-${baseFee}-${tip}-${ethUsd}`}
        initial={{ opacity: 0.6, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
        className="flex-1 min-h-0 rounded-xl border border-[#627EEA]/40 bg-gradient-to-br from-[#627EEA]/10 to-transparent p-3 flex flex-col justify-center gap-2"
      >
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{op.gas.toLocaleString()} gas × ({baseFee} + {tip.toFixed(1)}) Gwei</span>
          <span className="font-mono">{totalGwei.toLocaleString(undefined, { maximumFractionDigits: 0 })} Gwei</span>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-2xl lg:text-3xl font-black text-[#627EEA] font-mono leading-none">
            {eth < 0.0001 ? eth.toExponential(2) : eth.toFixed(eth < 0.01 ? 5 : 4)}
            <span className="text-base ml-1">ETH</span>
          </div>
          <div className="text-xl lg:text-2xl font-black text-foreground font-mono leading-none">
            ${usd.toFixed(usd < 1 ? 3 : 2)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit,
  color,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  unit: string;
  color: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-bold text-foreground">{label}</span>
        <span className="text-xs font-mono" style={{ color }}>
          {step < 1 ? value.toFixed(1) : value.toLocaleString()} <span className="text-muted-foreground">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, var(--muted) ${((value - min) / (max - min)) * 100}%, var(--muted) 100%)`,
          accentColor: color,
        }}
      />
      {hint && <div className="text-[10px] text-muted-foreground italic mt-0.5">{hint}</div>}
    </div>
  );
}
