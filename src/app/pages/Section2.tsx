import { useCallback, useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { TitleSlide } from '../components/templates/TitleSlide';
import { ConceptSlide } from '../components/templates/ConceptSlide';
import { ComparisonSlide } from '../components/templates/ComparisonSlide';
import { QuizSlide } from '../components/templates/QuizSlide';
import { TakeawaySlide } from '../components/templates/TakeawaySlide';
import { CalloutBox } from '../components/shared/CalloutBox';
import { DefinitionBox } from '../components/shared/DefinitionBox';
import { Bitcoin, ExternalLink, AlertTriangle, ShieldX } from 'lucide-react';
import { SectionNav } from '../components/navigation/SectionNav';

const section2Chapters = [
  { kind: 'group' as const, id: 'g-s2-origins',    label: '🚀 Origins' },
  { id: 's2-breakthrough',  label: 'Bitcoin Breakthrough' },
  { id: 's2-paper',         label: 'The 2008 Paper' },
  { id: 's2-what',          label: 'What is Bitcoin?' },

  { kind: 'group' as const, id: 'g-s2-problems',   label: '🤔 Problems Bitcoin Solves' },
  { id: 's2-byzantine',     label: 'Byzantine Problem' },
  { id: 's2-doublespend',   label: 'Double-Spending' },

  { kind: 'group' as const, id: 'g-s2-tokenomics', label: '💰 Tokenomics & Network' },
  { id: 's2-supply',        label: '🧩 Supply Model' },
  { id: 's2-stats',         label: 'Network Statistics' },
  { id: 's2-nodes',         label: 'Node Distribution' },

  { kind: 'group' as const, id: 'g-s2-keys',       label: '🔑 Keys & Wallets' },
  { id: 's2-keys',          label: 'Keys & Seed Phrase' },
  { id: 's2-keys-demo',     label: '🧩 Wallet Analogies' },

  { kind: 'group' as const, id: 'g-s2-structure',  label: '🛡️ Security & Structure' },
  { id: 's2-security',      label: 'Security Model' },
  { id: 's2-merkle-build',  label: '🧩 Build a Merkle Tree' },
  { id: 's2-merkle',        label: '🧩 Merkle Tree' },
  { id: 's2-immutability',  label: '🧩 Immutability' },

  { kind: 'group' as const, id: 'g-s2-mining',     label: '⛏️ Mining' },
  { id: 's2-mining',        label: 'Mining' },
  { id: 's2-mining-demo',   label: '🧩 Find a Nonce' },

  { kind: 'group' as const, id: 'g-s2-limits',     label: '🚧 Limits' },
  { id: 's2-programmability', label: 'Programmability' },
  { id: 's2-limits',        label: "What it Can't Do" },

  { kind: 'group' as const, id: 'g-s2-wrap',       label: '✅ Wrap Up' },
  { id: 's2-quiz',          label: 'Quizzes' },
  { id: 's2-takeaways',     label: 'Takeaways' },
];

// ─── Interactive: Bitcoin Supply Chart ──────────────────────────────────────

// Halving epochs — start year (as decimal), reward, cumulative BTC at the
// START of the epoch. Cumulative-at-start follows the geometric series:
// after the k-th halving, 21,000,000 × (1 − 1/2^k) BTC has been mined.
const EPOCHS = [
  { start: 2009.01, reward: 50,           cumAtStart: 0          },
  { start: 2012.91, reward: 25,           cumAtStart: 10_500_000 },
  { start: 2016.52, reward: 12.5,         cumAtStart: 15_750_000 },
  { start: 2020.36, reward: 6.25,         cumAtStart: 18_375_000 },
  { start: 2024.30, reward: 3.125,        cumAtStart: 19_687_500 },
  { start: 2028.30, reward: 1.5625,       cumAtStart: 20_343_750 },
  { start: 2032.30, reward: 0.78125,      cumAtStart: 20_671_875 },
  { start: 2036.30, reward: 0.390625,     cumAtStart: 20_835_938 },
  { start: 2040.30, reward: 0.1953125,    cumAtStart: 20_917_969 },
  { start: 2044.30, reward: 0.09765625,   cumAtStart: 20_958_984 },
];

const MAX_BTC = 21_000_000;
const MIN_YEAR = 2009;
const MAX_YEAR = 2048;

function epochAtYear(year: number) {
  for (let i = EPOCHS.length - 1; i >= 0; i--) {
    if (year >= EPOCHS[i].start) return { ...EPOCHS[i], idx: i };
  }
  return { ...EPOCHS[0], idx: 0 };
}

function supplyAtYear(year: number): number {
  if (year <= MIN_YEAR) return 0;
  const e = epochAtYear(year);
  // 210,000 blocks per epoch, epoch length ≈ 4 years → 52,500 blocks per year
  const yearsIn = year - e.start;
  const btcPerYear = 52_500 * e.reward;
  const total = e.cumAtStart + yearsIn * btcPerYear;
  return Math.min(total, MAX_BTC);
}

function fmtBtc(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'k';
  return n.toFixed(0);
}

function fmtYear(y: number): string {
  const year = Math.floor(y);
  const month = Math.round((y - year) * 12);
  const m = Math.max(1, Math.min(12, month + 1));
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${MONTHS[m - 1]} ${year}`;
}

function BitcoinSupplyInfoPanel({ year }: { year: number }) {
  const e = epochAtYear(year);
  const total = supplyAtYear(year);
  const pct = (total / MAX_BTC) * 100;
  const nextHalvingYear = EPOCHS[e.idx + 1]?.start;
  const yearsToNext = nextHalvingYear ? nextHalvingYear - year : null;
  const issuanceRate = 52_500 * e.reward;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="p-3 bg-gradient-to-br from-[#f59e0b]/15 to-transparent border border-[#f59e0b]/40 rounded-xl">
        <div className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-widest">Total mined</div>
        <div className="font-mono font-black text-2xl text-foreground mt-0.5">{Math.round(total).toLocaleString()} BTC</div>
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-[#f59e0b] transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-[10px] text-muted-foreground mt-1">{pct.toFixed(2)}% of 21,000,000 cap</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 bg-card border border-border rounded-lg">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Epoch</div>
          <div className="font-black text-foreground">#{e.idx}</div>
        </div>
        <div className="p-2.5 bg-card border border-border rounded-lg">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Block reward</div>
          <div className="font-black text-foreground">{e.reward < 1 ? e.reward.toFixed(4) : e.reward} BTC</div>
        </div>
        <div className="p-2.5 bg-card border border-border rounded-lg col-span-2">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Yearly issuance</div>
          <div className="font-mono font-black text-foreground">≈ {issuanceRate.toLocaleString(undefined, { maximumFractionDigits: 0 })} BTC / year</div>
        </div>
        <div className="p-2.5 bg-card border border-border rounded-lg col-span-2">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Next halving</div>
          {nextHalvingYear ? (
            <div className="font-black text-foreground">
              {fmtYear(nextHalvingYear)} <span className="text-muted-foreground font-normal text-xs">· in {yearsToNext!.toFixed(1)} years · reward → {(e.reward / 2).toFixed(4)} BTC</span>
            </div>
          ) : (
            <div className="text-muted-foreground text-xs">All halvings shown — issuance trends to zero by ~2140</div>
          )}
        </div>
      </div>

      <div className="p-2.5 bg-muted/40 border border-border rounded-lg text-[11px] text-muted-foreground leading-snug">
        Every <strong className="text-foreground">210,000 blocks</strong> (about 4 years), the block reward halves. Started at <strong className="text-foreground">50 BTC</strong> in 2009. The last sat is mined around <strong className="text-foreground">2140</strong> — after that, miners are paid only by transaction fees.
      </div>
    </div>
  );
}

// Combined slide-friendly wrapper that shares a single `year` state between
// the chart (left) and info panel (right).
function BitcoinSupplyInteractive() {
  const [year, setYear] = useState(2026);
  return (
    <div className="h-full flex flex-col p-5 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Bitcoin Supply Model</h2>
        <p className="text-sm text-muted-foreground max-w-3xl">Fixed cap, predictable issuance, halving every ~4 years. Scrub the slider or jump to any halving — every metric below recalculates from the actual issuance curve.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-5">
        <div className="min-w-0">
          <BitcoinSupplyChartWithYear year={year} setYear={setYear} />
        </div>
        <div className="overflow-y-auto">
          <BitcoinSupplyInfoPanel year={year} />
        </div>
      </div>

      {/* Qualitative facts strip */}
      <div className="shrink-0 mt-3 grid grid-cols-3 gap-2 text-[11px]">
        <div className="p-2 bg-card border border-border rounded-lg">
          <span className="font-bold text-foreground">Deflationary by design.</span>
          <span className="text-muted-foreground"> Supply growth slows by half every cycle — there is no monetary committee.</span>
        </div>
        <div className="p-2 bg-card border border-border rounded-lg">
          <span className="font-bold text-foreground">Halvings precede cycles.</span>
          <span className="text-muted-foreground"> Each prior halving has been followed by a major price expansion within 12–18 months.</span>
        </div>
        <div className="p-2 bg-card border border-border rounded-lg">
          <span className="font-bold text-foreground">~3–4 M BTC lost.</span>
          <span className="text-muted-foreground"> Forgotten keys, dead wallets — effective supply is meaningfully smaller than the cap.</span>
        </div>
      </div>
    </div>
  );
}

// Pulled into a separate sub-component so the slider state is owned by the parent.
function BitcoinSupplyChartWithYear({ year, setYear }: { year: number; setYear: (y: number) => void }) {
  const currentSupply = supplyAtYear(year);
  const e = epochAtYear(year);

  const W = 600, H = 300;
  const M = { top: 18, right: 14, bottom: 36, left: 56 };
  const pw = W - M.left - M.right;
  const ph = H - M.top  - M.bottom;

  const sx = (yr: number) => M.left + ((yr - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * pw;
  const sy = (btc: number) => M.top + ph - (btc / MAX_BTC) * ph;

  const pathPoints: string[] = [];
  let first = true;
  for (const ep of EPOCHS) {
    if (ep.start > MAX_YEAR) break;
    pathPoints.push(`${first ? 'M' : 'L'} ${sx(ep.start).toFixed(2)} ${sy(ep.cumAtStart).toFixed(2)}`);
    first = false;
  }
  pathPoints.push(`L ${sx(MAX_YEAR).toFixed(2)} ${sy(supplyAtYear(MAX_YEAR)).toFixed(2)}`);
  const supplyPath = pathPoints.join(' ');

  const yearTicks = [2009, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048];
  const supplyTicks = [0, 5, 10, 15, 20, 21];

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="p-3 bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="text-xs font-semibold text-muted-foreground">Drag the slider to a year</div>
          <div className="font-mono font-black text-base text-[#f59e0b]">{fmtYear(year)}</div>
        </div>
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={0.05}
          value={year}
          onChange={ev => setYear(Number(ev.target.value))}
          className="w-full accent-[#f59e0b]"
          aria-label="Year"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5 font-mono">
          <span>{MIN_YEAR}</span><span>{MAX_YEAR}</span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Bitcoin supply over time">
          {supplyTicks.map(t => (
            <g key={`yt-${t}`}>
              <line x1={M.left} y1={sy(t * 1_000_000)} x2={M.left + pw} y2={sy(t * 1_000_000)}
                    stroke="currentColor" strokeOpacity="0.08" />
              <text x={M.left - 6} y={sy(t * 1_000_000) + 3} fontSize="10"
                    textAnchor="end" fill="currentColor" opacity="0.6">{t}M</text>
            </g>
          ))}
          {yearTicks.map(t => (
            <g key={`xt-${t}`}>
              <line x1={sx(t)} y1={M.top + ph} x2={sx(t)} y2={M.top + ph + 4}
                    stroke="currentColor" strokeOpacity="0.4" />
              <text x={sx(t)} y={M.top + ph + 16} fontSize="10" textAnchor="middle"
                    fill="currentColor" opacity="0.6">{t}</text>
            </g>
          ))}
          <line x1={M.left} y1={sy(MAX_BTC)} x2={M.left + pw} y2={sy(MAX_BTC)}
                stroke="#ED1C24" strokeOpacity="0.5" strokeDasharray="3 3" />
          <text x={M.left + pw - 4} y={sy(MAX_BTC) - 4} fontSize="10" textAnchor="end" fill="#ED1C24" opacity="0.8">
            21,000,000 BTC cap
          </text>
          {EPOCHS.map((ep, i) => {
            if (i === 0 || ep.start > MAX_YEAR) return null;
            const active = e.idx === i;
            return (
              <g key={`hv-${i}`} style={{ cursor: 'pointer' }} onClick={() => setYear(ep.start + 0.05)}>
                <line x1={sx(ep.start)} y1={M.top} x2={sx(ep.start)} y2={M.top + ph}
                      stroke="#f59e0b" strokeOpacity={active ? 0.9 : 0.35} strokeDasharray="2 4" />
                <text x={sx(ep.start) + 2} y={M.top + 10} fontSize="9" fill="#f59e0b"
                      opacity={active ? 1 : 0.7}>
                  H{i} · {ep.reward < 1 ? ep.reward.toFixed(4) : ep.reward} BTC
                </text>
              </g>
            );
          })}
          <path d={supplyPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <path d={`${supplyPath} L ${sx(MAX_YEAR)} ${M.top + ph} L ${M.left} ${M.top + ph} Z`}
                fill="#f59e0b" opacity="0.08" />
          <line x1={sx(year)} y1={M.top} x2={sx(year)} y2={M.top + ph}
                stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx={sx(year)} cy={sy(currentSupply)} r="6" fill="#6366f1" stroke="#fff" strokeWidth="2" />
          <line x1={M.left} y1={M.top} x2={M.left} y2={M.top + ph} stroke="currentColor" strokeOpacity="0.25" />
          <line x1={M.left} y1={M.top + ph} x2={M.left + pw} y2={M.top + ph} stroke="currentColor" strokeOpacity="0.25" />
        </svg>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {EPOCHS.map((ep, i) => {
          const active = e.idx === i;
          return (
            <button
              key={i}
              onClick={() => setYear(ep.start + 0.05)}
              className="px-2 py-1 rounded-md text-[10px] font-mono font-bold transition-colors"
              style={{
                backgroundColor: active ? '#f59e0b' : '#f59e0b15',
                color: active ? '#fff' : '#f59e0b',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: active ? '#f59e0b' : '#f59e0b40',
              }}
            >
              {i === 0 ? 'Genesis' : `H${i}`} · {Math.floor(ep.start)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Interactive: Mining (nonce search) ────────────────────────────────────

/**
 * A fast pseudo-hash for the mining demo. NOT a real cryptographic hash —
 * SHA-256 in the browser is async per-call which makes a tight inner loop
 * painful to animate. This produces deterministic 64-char hex output so each
 * (nonce + blockData) input lands on a stable string the student can compare.
 * The footnote on the slide makes the simplification explicit.
 */
function pseudoHash(nonce: number, blockData: string): string {
  let h = 0x811c9dc5 ^ nonce;
  const s = blockData + ':' + nonce;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  let out = '';
  for (let i = 0; i < 8; i++) {
    h = Math.imul(h ^ (h >>> 13), 0x5bd1e995);
    h ^= (h >>> 15);
    out += ((h >>> 0).toString(16).padStart(8, '0'));
  }
  return out;
}

function MiningDemo() {
  const BLOCK_DATA = 'block#902451 | prev:00000000…a3f8 | tx:8 | reward:3.125 BTC';
  const [difficulty, setDifficulty] = useState(4); // leading hex zeros required
  const [mining, setMining]   = useState(false);
  const [nonce, setNonce]     = useState(0);
  const [hash, setHash]       = useState(pseudoHash(0, BLOCK_DATA));
  const [tries, setTries]     = useState(0);
  const [found, setFound]     = useState<{ nonce: number; hash: string; tries: number; elapsedMs: number } | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const target = '0'.repeat(difficulty);

  // Animation loop — does N tries per frame and yields back to the browser.
  useEffect(() => {
    if (!mining) return;

    const PER_FRAME = 6000;
    let frame = 0;
    let stopped = false;

    const start = performance.now();
    setStartedAt(start);
    let curNonce = nonce;
    let curTries = 0;

    const tick = () => {
      if (stopped) return;
      for (let i = 0; i < PER_FRAME; i++) {
        curNonce++;
        curTries++;
        const h = pseudoHash(curNonce, BLOCK_DATA);
        if (h.startsWith(target)) {
          setNonce(curNonce);
          setHash(h);
          setTries(t => t + curTries);
          setFound({ nonce: curNonce, hash: h, tries: tries + curTries, elapsedMs: performance.now() - start });
          setMining(false);
          return;
        }
      }
      // No find this frame — push the latest values and yield
      setNonce(curNonce);
      setHash(pseudoHash(curNonce, BLOCK_DATA));
      setTries(t => t + curTries);
      curTries = 0;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => { stopped = true; cancelAnimationFrame(frame); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mining, target]);

  const startMining = () => {
    setMining(true);
    setFound(null);
  };
  const pause = () => setMining(false);
  const reset = () => {
    setMining(false);
    setNonce(0);
    setTries(0);
    setHash(pseudoHash(0, BLOCK_DATA));
    setFound(null);
    setStartedAt(null);
  };

  const elapsedMs = startedAt ? performance.now() - startedAt : 0;
  const hashRate = mining && elapsedMs > 0 ? Math.round((tries / elapsedMs) * 1000) : 0;
  const expectedTries = Math.pow(16, difficulty);

  // Render the hash so the matching prefix is green, the rest neutral
  const renderHash = (h: string) => {
    const ok = h.slice(0, difficulty);
    const rest = h.slice(difficulty);
    const matches = ok === target;
    return (
      <span className="font-mono break-all">
        <span className={matches ? 'text-[#39B54A] font-bold' : 'text-[#ED1C24] font-bold'}>{ok}</span>
        <span className="text-muted-foreground">{rest}</span>
      </span>
    );
  };

  return (
    <div className="h-full flex flex-col p-5 lg:p-8">
      <div className="shrink-0 mb-3 flex items-start justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold">🧩 Interactive</span>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Find a Valid Nonce</h2>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Mining is a guessing game: try a nonce, hash the block, check if the hash starts with enough zeros. Pick a difficulty and press Start.
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5">
        {/* Left — block + live hash */}
        <div className="flex flex-col gap-3 min-w-0">
          <div className="p-4 bg-card border border-border rounded-xl">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Block header (simplified)</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-muted/40 rounded-md">
                <div className="text-[10px] text-muted-foreground">Block #</div>
                <div className="font-mono font-bold text-foreground">902,451</div>
              </div>
              <div className="p-2 bg-muted/40 rounded-md">
                <div className="text-[10px] text-muted-foreground">Prev hash</div>
                <div className="font-mono font-bold text-foreground">00000000…a3f8</div>
              </div>
              <div className="p-2 bg-muted/40 rounded-md">
                <div className="text-[10px] text-muted-foreground">Transactions</div>
                <div className="font-mono font-bold text-foreground">8</div>
              </div>
              <div className="p-2 bg-muted/40 rounded-md">
                <div className="text-[10px] text-muted-foreground">Reward</div>
                <div className="font-mono font-bold text-foreground">3.125 BTC</div>
              </div>
              <div className="p-2 bg-[#6366f1]/12 border border-[#6366f1]/30 rounded-md col-span-2">
                <div className="text-[10px] text-[#6366f1] font-bold uppercase tracking-widest">Nonce (what you adjust)</div>
                <div className="font-mono font-black text-base text-foreground">{nonce.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-card border-2 rounded-xl"
               style={{ borderColor: found ? '#39B54A60' : '#f59e0b40' }}>
            <div className="flex items-center justify-between mb-1">
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: found ? '#39B54A' : '#f59e0b' }}>
                Current hash
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">
                target: <span className="text-[#39B54A] font-bold">{target}</span>
                <span className="text-muted-foreground">{'·'.repeat(64 - difficulty)}</span>
              </div>
            </div>
            <div className="text-[12px] leading-snug">{renderHash(hash)}</div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {!mining ? (
              <button onClick={startMining} disabled={!!found}
                className="px-4 py-2 rounded-lg bg-[#f59e0b] text-white text-sm font-bold hover:bg-[#f59e0b]/90 disabled:opacity-50 transition-colors">
                ⛏️ Start mining
              </button>
            ) : (
              <button onClick={pause}
                className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-bold hover:bg-muted/80 transition-colors">
                ⏸ Pause
              </button>
            )}
            <button onClick={reset}
              className="px-3 py-2 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 transition-colors">
              ↺ Reset
            </button>
            <div className="flex-1" />
            {mining && <span className="text-[11px] text-[#f59e0b] font-bold animate-pulse">searching…</span>}
            {found && <span className="text-[11px] text-[#39B54A] font-bold">✓ block found</span>}
          </div>

          {/* Found banner */}
          {found && (
            <div className="p-3 bg-gradient-to-br from-[#39B54A]/15 to-transparent border-2 border-[#39B54A]/50 rounded-xl">
              <div className="text-xs font-black text-[#39B54A] uppercase tracking-widest mb-1">✓ Valid block</div>
              <div className="text-xs text-muted-foreground leading-snug">
                Took <strong className="text-foreground">{found.tries.toLocaleString()}</strong> attempts in
                {' '}<strong className="text-foreground">{(found.elapsedMs / 1000).toFixed(2)}s</strong>.
                The miner broadcasts this block to the network, every node verifies the hash in microseconds,
                and the miner gets <strong className="text-foreground">3.125 BTC + tx fees</strong>.
              </div>
            </div>
          )}
        </div>

        {/* Right — difficulty + stats */}
        <div className="flex flex-col gap-3 min-w-0 overflow-y-auto">
          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-foreground">Difficulty (leading hex zeros)</div>
              <div className="font-mono font-black text-base text-[#f59e0b]">{difficulty}</div>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={difficulty}
              onChange={ev => { if (!mining) setDifficulty(Number(ev.target.value)); }}
              disabled={mining}
              className="w-full accent-[#f59e0b]"
              aria-label="Difficulty"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5 font-mono">
              <span>1 (easy)</span><span>8 (very hard)</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1.5">
              Each extra zero makes finding a valid hash ~16× harder. Expected tries: <strong className="text-foreground font-mono">{expectedTries.toLocaleString()}</strong>.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-card border border-border rounded-lg">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tries</div>
              <div className="font-mono font-black text-foreground">{tries.toLocaleString()}</div>
            </div>
            <div className="p-2.5 bg-card border border-border rounded-lg">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Hash rate</div>
              <div className="font-mono font-black text-foreground">{mining ? `${hashRate.toLocaleString()}/s` : '—'}</div>
            </div>
          </div>

          <div className="p-3 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl text-[11px] text-muted-foreground leading-snug">
            <div className="font-bold text-[#6366f1] mb-1">Real Bitcoin scale</div>
            The current network does <strong className="text-foreground font-mono">~800 EH/s</strong> — that's 8 × 10²⁰ hashes per second. Real difficulty requires hashes starting with about <strong className="text-foreground">19 zeros in hex</strong>, automatically retargeted every 2,016 blocks to keep block times around 10 minutes.
          </div>

          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[10px] text-muted-foreground">
            <strong className="text-foreground">Note:</strong> this demo uses a fast non-cryptographic hash for animation. Real Bitcoin uses <strong className="text-foreground">double SHA-256</strong> of the 80-byte block header. The search loop is identical.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive: Tamper-detection chain ──────────────────────────────────

interface ChainBlock {
  num: number;
  data: string;
  originalData: string;
  /** Frozen at init — the prev_hash field literally written into this block's header. */
  prevHashStored: string;
  /** Frozen at init — the unix-ish timestamp baked into the block's header at mine-time. */
  timestamp: number;
  /** Frozen at init — the nonce that won the proof-of-work race for this block. */
  nonce: number;
}

function hashShort(input: string): string {
  return pseudoHash(0, input).slice(0, 12);
}

// Realistic-looking constants every Bitcoin block shares (kept identical here
// so the rendered headers feel authentic without making the demo more complex).
const BLOCK_VERSION = '0x20000000';
const BLOCK_BITS    = '0x1702a96e';

/** A block's merkle root is a one-way summary of its transactions — when the
 *  data is tampered the merkle root recomputes and changes too. */
function merkleRootOf(data: string): string {
  return hashShort('mr:' + data);
}

/** The block's hash binds EVERY header field together. Change any one and the
 *  hash changes — which is precisely why the cascade is unforgeable. */
function blockHash(b: { num: number; data: string; timestamp: number; nonce: number }, prevHash: string): string {
  return hashShort(`${BLOCK_VERSION}|${prevHash}|${merkleRootOf(b.data)}|${b.timestamp}|${BLOCK_BITS}|${b.nonce}|${b.num}`);
}

/** Formats a unix timestamp as "Dec 29, 13:46 UTC" — short and unambiguous. */
function fmtTime(unix: number): string {
  try {
    const d = new Date(unix * 1000);
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const mm = String(d.getUTCMinutes()).padStart(2, '0');
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCHours()}:${mm} UTC`;
  } catch {
    return String(unix);
  }
}

const INITIAL_BLOCKS: { num: number; data: string; timestamp: number; nonce: number }[] = [
  { num: 902450, data: 'Alice → Bob: 0.5 BTC',    timestamp: 1735480000, nonce: 2083236893 },
  { num: 902451, data: 'Bob → Carol: 0.25 BTC',   timestamp: 1735480642, nonce: 2718845192 },
  { num: 902452, data: 'Carol → Dave: 0.10 BTC',  timestamp: 1735481186, nonce:  783651029 },
  { num: 902453, data: 'Dave → Erin: 0.05 BTC',   timestamp: 1735481822, nonce: 1546872910 },
  { num: 902454, data: 'Erin → Frank: 0.20 BTC',  timestamp: 1735482449, nonce:  998234012 },
  { num: 902455, data: 'Frank → Gina: 0.15 BTC',  timestamp: 1735483102, nonce:  271828183 },
];

function buildChain(initial: typeof INITIAL_BLOCKS): ChainBlock[] {
  const chain: ChainBlock[] = [];
  let prev = '0000000000…GENESIS';
  for (const b of initial) {
    chain.push({
      num: b.num,
      data: b.data,
      originalData: b.data,
      prevHashStored: prev,
      timestamp: b.timestamp,
      nonce: b.nonce,
    });
    // The block's hash that lives in the ledger (frozen at "time of mining")
    prev = blockHash(b, prev);
  }
  return chain;
}

/** Tight key/value row used inside each block's header readout. */
function Row({ label, value, mono, title, color }: {
  label: string;
  value: string;
  mono?: boolean;
  title?: string;
  color?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-2 leading-tight">
      <span className="text-muted-foreground shrink-0 font-sans uppercase tracking-widest text-[8.5px] font-bold">
        {label}
      </span>
      <span
        className={`min-w-0 truncate text-right ${mono ? 'font-mono' : 'font-sans'}`}
        title={title}
        style={color ? { color } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

function ImmutableChainDemo() {
  const [chain, setChain] = useState<ChainBlock[]>(() => buildChain(INITIAL_BLOCKS));

  const updateData = (i: number, newData: string) => {
    setChain(prev => prev.map((b, idx) => idx === i ? { ...b, data: newData } : b));
  };

  const resetAll = () => setChain(buildChain(INITIAL_BLOCKS));

  // Compute each block's CURRENT hash from every header field. The merkle
  // root inside `blockHash` derives from `data`, so when `data` is tampered
  // both the merkle root and the block hash visibly drift.
  const currentHashes = chain.map(b => blockHash(b, b.prevHashStored));

  // A block is "broken" if either:
  //   • its stored prev-hash field no longer matches the previous block's
  //     CURRENT hash (the immediate cascade trigger), OR
  //   • any earlier block in the chain is already broken (the cascade itself
  //     — once an upstream link is severed, the whole chain downstream is
  //     part of a fork that the honest network would reject).
  const isBroken: boolean[] = [];
  for (let i = 0; i < chain.length; i++) {
    if (i === 0) {
      isBroken.push(false);
    } else {
      const linkBad = chain[i].prevHashStored !== currentHashes[i - 1];
      isBroken.push(linkBad || isBroken[i - 1]);
    }
  }
  const isTampered = chain.map(b => b.data !== b.originalData);

  const anyChange = isTampered.some(Boolean) || isBroken.some(Boolean);

  return (
    <div className="h-full flex flex-col p-5 lg:p-8">
      <div className="shrink-0 mb-3 flex items-start justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold">🧩 Interactive</span>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Immutability Through Block Linking</h2>
          <p className="text-sm text-muted-foreground max-w-3xl">Each block's hash depends on the previous block's hash. <strong className="text-foreground">Edit any transaction below</strong> and watch the cascade — every downstream block goes red because its stored prev-hash no longer matches.</p>
        </div>
        {anyChange && (
          <button onClick={resetAll}
            className="px-3 py-2 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 transition-colors shrink-0">
            ↺ Reset chain
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 flex flex-row gap-1 items-stretch overflow-x-auto pb-2">
        {chain.map((b, i) => {
          const broken    = isBroken[i];
          const tampered  = isTampered[i];
          const status    = broken ? 'broken' : tampered ? 'tampered' : 'valid';
          const ringColor = status === 'valid' ? '#39B54A' : '#ED1C24';
          const merkle    = merkleRootOf(b.data);
          const merkleChanged = merkle !== merkleRootOf(b.originalData);

          return (
            <div key={i} className="flex items-stretch gap-1 shrink-0">
              <div
                className="w-[230px] rounded-xl border-2 p-3 flex flex-col gap-2 transition-colors"
                style={{
                  borderColor: ringColor + (status === 'valid' ? '60' : 'CC'),
                  backgroundColor: status === 'valid' ? ringColor + '08' : ringColor + '12',
                }}
              >
                {/* Header — block # + status badge */}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-black text-foreground">Block #{b.num}</div>
                  <div
                    className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest"
                    style={{ color: ringColor, backgroundColor: ringColor + '20' }}
                  >
                    {status === 'valid' ? '✓ valid' : status === 'tampered' ? '⚠ edited' : '✗ broken'}
                  </div>
                </div>

                {/* Header fields — compact key/value rows */}
                <div className="rounded-md border border-border/60 bg-card/50 px-2 py-1.5 text-[10px] flex flex-col gap-1 font-mono">
                  <Row label="Version"   value={BLOCK_VERSION} />
                  <Row label="Time"      value={fmtTime(b.timestamp)} />
                  <Row label="Prev hash" value={b.prevHashStored} mono title={b.prevHashStored} />
                  <Row
                    label="Merkle root"
                    value={merkle}
                    mono
                    title={merkle}
                    color={merkleChanged ? '#ED1C24' : undefined}
                  />
                  <Row label="Bits"      value={BLOCK_BITS} />
                  <Row label="Nonce"     value={b.nonce.toLocaleString('en-US')} />
                </div>

                {/* Transaction (editable — the only tampering surface) */}
                <div>
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Transaction</div>
                  <input
                    type="text"
                    value={b.data}
                    onChange={e => updateData(i, e.target.value)}
                    className="w-full px-2 py-1 rounded bg-card border text-[11px] font-mono text-foreground focus:outline-none focus:ring-1 transition-colors"
                    style={{ borderColor: tampered ? '#ED1C24' : 'var(--border)' }}
                  />
                </div>

                {/* This block's hash (live) */}
                <div className="mt-auto pt-1 border-t border-border/60">
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">This block's hash</div>
                  <div className="font-mono text-[11px] font-bold" style={{ color: tampered ? '#ED1C24' : '#39B54A' }}>
                    {currentHashes[i]}
                    {tampered && <span className="text-muted-foreground font-normal text-[10px]"> (recomputed)</span>}
                  </div>
                </div>
              </div>

              {/* Link arrow to next block */}
              {i < chain.length - 1 && (
                <div className="flex flex-col items-center justify-center shrink-0 w-4">
                  <div className="text-sm font-bold" style={{ color: isBroken[i + 1] ? '#ED1C24' : '#39B54A' }}>
                    {isBroken[i + 1] ? '✗' : '→'}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation footer */}
      <div className="shrink-0 mt-3 grid grid-cols-3 gap-2 text-[11px]">
        <div className="p-2 bg-card border border-border rounded-lg">
          <div className="font-bold text-foreground mb-0.5">Tamper one block</div>
          <div className="text-muted-foreground">Its hash is recomputed live from its new contents — the original hash on the next block's <em>prev-hash</em> line is now stale.</div>
        </div>
        <div className="p-2 bg-card border border-border rounded-lg">
          <div className="font-bold text-foreground mb-0.5">The cascade</div>
          <div className="text-muted-foreground">Every downstream block goes red because its frozen prev-hash no longer matches the live upstream hash.</div>
        </div>
        <div className="p-2 bg-card border border-border rounded-lg">
          <div className="font-bold text-foreground mb-0.5">Why this is hard to fake</div>
          <div className="text-muted-foreground">To restore the chain you'd have to re-mine <em>every</em> downstream block faster than the entire honest network — that's what the previous slide showed.</div>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive: Merkle Tree ──────────────────────────────────────────────

interface MerkleNode {
  hash: string;
  changed: boolean;
}

// ─── Interactive: Build a Merkle Tree (4 leaves, type-it-yourself) ──────────
//
// Lifted from the v1 Section 1 (Section1.legacy.tsx). Uses real SHA-256 via
// crypto.subtle so the learner watches actual hashes ripple up the tree as
// they type. The downstream MerkleTreeDemo is the "tamper a populated tree"
// counterpart — this one is the "build it from scratch" counterpart.

async function sha256(text: string): Promise<string> {
  const data   = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function shortHash(hash: string) {
  return hash ? hash.slice(0, 10) + '…' : '—';
}

function InteractiveMerkleTree() {
  const [txs,        setTxs]        = useState(['', '', '', '']);
  const [leafHashes, setLeafHashes] = useState(['', '', '', '']);
  const [midHashes,  setMidHashes]  = useState(['', '']);
  const [root,       setRoot]       = useState('');

  const recompute = useCallback(async (values: string[]) => {
    const leaves = await Promise.all(
      values.map(v => (v ? sha256(v) : Promise.resolve('')))
    );
    setLeafHashes(leaves);

    const mid0 = leaves[0] && leaves[1] ? await sha256(leaves[0] + leaves[1]) : '';
    const mid1 = leaves[2] && leaves[3] ? await sha256(leaves[2] + leaves[3]) : '';
    setMidHashes([mid0, mid1]);

    const r = mid0 && mid1 ? await sha256(mid0 + mid1) : '';
    setRoot(r);
  }, []);

  useEffect(() => { recompute(txs); }, [txs, recompute]);

  const update = (i: number, v: string) => {
    setTxs(prev => prev.map((t, idx) => idx === i ? v : t));
  };

  return (
    // flex-col-reverse so the layout grows like a real tree:
    //   transactions at the top (leaves), pairs of hashes in the middle,
    //   merkle root at the bottom (trunk). Pedagogically clearer than
    //   the upside-down "root on top" convention used in CS textbooks.
    <div className="flex flex-col-reverse items-center gap-3 py-4">
      {/* Root — renders at the BOTTOM thanks to flex-col-reverse */}
      <div className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${root ? 'bg-[#ED1C24]/20 border-[#ED1C24]' : 'bg-muted/20 border-border'}`}>
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span>🌳</span>
          <span>Merkle Root</span>
          <span className="text-[9px] text-muted-foreground/70">· trunk</span>
        </div>
        <div className={`font-mono text-sm ${root ? 'text-[#ED1C24]' : 'text-muted-foreground/50'}`}>
          {root ? shortHash(root) : 'Hash(AB + CD)'}
        </div>
      </div>

      {/* Connectors root → mid */}
      <div className="flex gap-32">
        <div className="w-px h-6 bg-border" />
        <div className="w-px h-6 bg-border" />
      </div>

      {/* Level 1 */}
      <div className="flex gap-16">
        {midHashes.map((h, i) => (
          <div key={i} className={`px-5 py-2 rounded-lg border transition-all duration-300 ${h ? 'bg-[#39B54A]/20 border-[#39B54A]' : 'bg-muted/20 border-border'}`}>
            <div className="text-xs text-muted-foreground">Hash {i === 0 ? 'AB' : 'CD'}</div>
            <div className={`font-mono text-xs ${h ? 'text-[#39B54A]' : 'text-muted-foreground/50'}`}>
              {h ? shortHash(h) : `Hash(${i === 0 ? 'A + B' : 'C + D'})`}
            </div>
          </div>
        ))}
      </div>

      {/* Connectors mid → leaves */}
      <div className="flex gap-12">
        <div className="flex gap-16">
          <div className="w-px h-6 bg-border" />
          <div className="w-px h-6 bg-border" />
        </div>
        <div className="flex gap-16">
          <div className="w-px h-6 bg-border" />
          <div className="w-px h-6 bg-border" />
        </div>
      </div>

      {/* Leaves */}
      <div className="flex gap-6">
        {leafHashes.map((h, i) => (
          <div key={i} className={`px-4 py-2 rounded-lg border transition-all duration-300 ${h ? 'bg-[#6366f1]/20 border-[#6366f1]' : 'bg-muted/20 border-border'}`}>
            <div className="text-xs text-muted-foreground">Tx {String.fromCharCode(65 + i)}</div>
            <div className={`font-mono text-xs ${h ? 'text-[#6366f1]' : 'text-muted-foreground/50'}`}>
              {h ? shortHash(h) : `Hash(${String.fromCharCode(65 + i)})`}
            </div>
          </div>
        ))}
      </div>

      {/* Connectors leaves → inputs */}
      <div className="flex gap-[68px]">
        {[0, 1, 2, 3].map(i => <div key={i} className="w-px h-6 bg-border" />)}
      </div>

      {/* Input fields */}
      <div className="flex gap-6">
        {txs.map((v, i) => (
          <input
            key={i}
            type="text"
            value={v}
            onChange={e => update(i, e.target.value)}
            placeholder={`Tx ${String.fromCharCode(65 + i)} data...`}
            className="w-[120px] px-4 py-2 bg-card rounded-lg border-2 border-[#6366f1]/30 text-foreground font-mono text-xs text-center focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all placeholder:text-muted-foreground/40"
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-2 italic">
        🍃 Type transaction data above — each leaf hashes, pairs merge, and the trunk (root) recomputes in real time
      </p>
    </div>
  );
}

function BuildMerkleSlide() {
  return (
    <div className="h-full flex flex-col p-5 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Build a Merkle Tree</h2>
        <p className="text-sm text-muted-foreground max-w-3xl">
          Type four transactions and watch each leaf hash pair up and condense into the <strong className="text-foreground">Merkle root</strong>. One root summarises everything below — change any byte down here and the cascade reaches the top.
        </p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto flex items-start justify-center">
        <InteractiveMerkleTree />
      </div>
    </div>
  );
}

// ─── Interactive: Tamper a Populated Merkle Tree ────────────────────────────

const MERKLE_TXS_INITIAL = [
  'Alice → Bob · 0.50 BTC',
  'Carol → Dave · 0.25 BTC',
  'Erin → Frank · 1.20 BTC',
  'Grace → Heidi · 0.08 BTC',
];

function buildMerkle(txs: string[]): { levels: string[][]; originalLevels: string[][] } {
  const levels: string[][] = [];
  let cur = txs.map(t => hashShort('tx:' + t));
  levels.push(cur);
  while (cur.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < cur.length; i += 2) {
      const a = cur[i];
      const b = cur[i + 1] ?? a; // duplicate last if odd
      next.push(hashShort(a + '|' + b));
    }
    levels.push(next);
    cur = next;
  }
  return { levels, originalLevels: levels.map(l => [...l]) };
}

function MerkleTreeDemo() {
  const [txs, setTxs]   = useState<string[]>(MERKLE_TXS_INITIAL);
  // Recompute every render — at 8 leaves with a fast pseudo-hash, it's cheap.
  const original = buildMerkle(MERKLE_TXS_INITIAL);
  const current  = buildMerkle(txs);

  // Mark which nodes differ from the original tree
  const changedLevels: MerkleNode[][] = current.levels.map((lvl, li) =>
    lvl.map((h, i) => ({ hash: h, changed: h !== original.levels[li]?.[i] }))
  );

  const root = changedLevels[changedLevels.length - 1]?.[0];
  const tampered = changedLevels[0].some(n => n.changed);

  const updateTx = (i: number, v: string) => {
    setTxs(prev => prev.map((t, idx) => idx === i ? v : t));
  };
  const reset = () => setTxs(MERKLE_TXS_INITIAL);

  return (
    <div className="h-full flex flex-col p-5 lg:p-8">
      <div className="shrink-0 mb-3 flex items-start justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🧩 Interactive</span>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Merkle Tree — How a Block Commits to its Transactions</h2>
          <p className="text-sm text-muted-foreground max-w-3xl">
            A block doesn't store transactions in its header — it stores their <strong className="text-foreground">Merkle root</strong>: a single hash that summarises all transactions in the block. Tamper with any transaction below and watch the path from leaf to root recolour.
          </p>
        </div>
        {tampered && (
          <button onClick={reset}
            className="px-3 py-2 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 transition-colors shrink-0">
            ↺ Reset
          </button>
        )}
      </div>

      {/* flex-col-reverse so the tree grows like a real one — leaves at top,
          intermediate hashes pairing downward, merkle root as the trunk at the bottom. */}
      <div className="flex-1 min-h-0 flex flex-col-reverse gap-3 overflow-y-auto">
        {/* Root — renders at the BOTTOM thanks to flex-col-reverse */}
        <div className="flex justify-center">
          <div
            className="px-4 py-2 rounded-lg border-2 text-center transition-colors"
            style={{
              borderColor: root?.changed ? '#ED1C24' : '#39B54A',
              backgroundColor: (root?.changed ? '#ED1C24' : '#39B54A') + '12',
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5"
                 style={{ color: root?.changed ? '#ED1C24' : '#39B54A' }}>
              <span>🌳</span>
              {root?.changed ? '⚠ Merkle root changed' : '✓ Merkle root'}
              <span className="text-[8px] opacity-70">· trunk</span>
            </div>
            <div className="font-mono font-black text-sm text-foreground mt-0.5">{root?.hash ?? '—'}</div>
          </div>
        </div>

        {/* Inner levels — render in array order (leaves-adjacent first so it sits
            ABOVE the root in flex-col-reverse, and root-adjacent last so it sits
            just above the root). */}
        {changedLevels.slice(1, -1).map((lvl, lvlIdx) => (
          <div key={`lvl-${lvlIdx}`}
               className="grid gap-2"
               style={{ gridTemplateColumns: `repeat(${lvl.length}, minmax(0, 1fr))` }}>
            {lvl.map((n, i) => (
              <div
                key={i}
                className="px-2 py-1.5 rounded-md border text-center transition-colors"
                style={{
                  borderColor: n.changed ? '#ED1C24' : '#6366f140',
                  backgroundColor: n.changed ? '#ED1C2410' : '#6366f108',
                }}
              >
                <div className="text-[9px] font-bold uppercase tracking-widest"
                     style={{ color: n.changed ? '#ED1C24' : '#6366f1' }}>
                  hash
                </div>
                <div className="font-mono text-[10px] font-bold text-foreground truncate">{n.hash}</div>
              </div>
            ))}
          </div>
        ))}

        {/* Leaves (transactions) */}
        <div className="grid gap-3"
             style={{ gridTemplateColumns: `repeat(${changedLevels[0].length}, minmax(0, 1fr))` }}>
          {changedLevels[0].map((leaf, i) => (
            <div
              key={i}
              className="rounded-lg border p-3 flex flex-col gap-1.5 transition-colors"
              style={{
                borderColor: leaf.changed ? '#ED1C24' : '#22d3ee40',
                backgroundColor: leaf.changed ? '#ED1C2410' : '#22d3ee08',
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest"
                   style={{ color: leaf.changed ? '#ED1C24' : '#22d3ee' }}>tx {i + 1}</div>
              <input
                type="text"
                value={txs[i]}
                onChange={e => updateTx(i, e.target.value)}
                className="w-full px-2 py-1 rounded bg-card border text-xs font-mono text-foreground focus:outline-none focus:ring-1 transition-colors"
                style={{ borderColor: leaf.changed ? '#ED1C24' : 'var(--border)' }}
              />
              <div className="font-mono text-[10px] text-muted-foreground truncate" title={leaf.hash}>{leaf.hash}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation footer */}
      <div className="shrink-0 mt-3 grid grid-cols-3 gap-2 text-[11px]">
        <div className="p-2 bg-card border border-border rounded-lg">
          <div className="font-bold text-foreground mb-0.5">Hash up in pairs</div>
          <div className="text-muted-foreground">Each pair of hashes is concatenated and hashed together — repeat until one root remains.</div>
        </div>
        <div className="p-2 bg-card border border-border rounded-lg">
          <div className="font-bold text-foreground mb-0.5">One byte changes everything</div>
          <div className="text-muted-foreground">Tampering with any single transaction changes its leaf hash, which changes every node on the path up to the root.</div>
        </div>
        <div className="p-2 bg-card border border-border rounded-lg">
          <div className="font-bold text-foreground mb-0.5">Efficient proofs</div>
          <div className="text-muted-foreground">A light client can verify a tx is in a block using only log₂(N) hashes — they don't need the whole block. This is what enables SPV / mobile wallets.</div>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive: Wallet Analogies (Bank IBAN + Home Keys) ──────────────────
//
// Two side-by-side analogies to make the public-vs-private asymmetry of a
// wallet visceral. Both auto-play on scroll-in and can be replayed manually.
// Animations are powered by anime.js v3.

const PUBLIC_COLOR  = '#39B54A'; // green — safe to share
const PRIVATE_COLOR = '#ED1C24'; // red — never share

/* ─────────────────────────── BANK ACCOUNT (IBAN) ────────────────────────── */

function BankIbanAnalogy() {
  const rootRef     = useRef<HTMLDivElement | null>(null);
  const cardRef     = useRef<HTMLDivElement | null>(null);
  const incomingRef = useRef<HTMLDivElement | null>(null); // coin flying IN
  const outgoingRef = useRef<HTMLDivElement | null>(null); // coin flying OUT
  const balanceRef  = useRef<HTMLSpanElement | null>(null);
  const inCaptionRef  = useRef<HTMLDivElement | null>(null);
  const outCaptionRef = useRef<HTMLDivElement | null>(null);
  const pinRef      = useRef<HTMLDivElement | null>(null);
  const padlockRef  = useRef<HTMLSpanElement | null>(null);

  const [balance, setBalance]   = useState(1420);
  const [pinDigits, setPinDigits] = useState('');
  const [phase, setPhase]       = useState<'idle' | 'playing'>('idle');
  const playedRef               = useRef(false);

  const play = () => {
    if (phase === 'playing') return;
    setPhase('playing');
    setPinDigits('');
    setBalance(1420);

    // Reset positions
    if (incomingRef.current) {
      incomingRef.current.style.opacity = '0';
      incomingRef.current.style.transform = 'translate(-180px, -10px) scale(0.6)';
    }
    if (outgoingRef.current) {
      outgoingRef.current.style.opacity = '0';
      outgoingRef.current.style.transform = 'translate(0px, 0px) scale(1)';
    }
    if (pinRef.current)     { pinRef.current.style.opacity = '0'; pinRef.current.style.transform = 'translateY(8px)'; }
    if (padlockRef.current) padlockRef.current.textContent = '🔒';
    if (inCaptionRef.current)  inCaptionRef.current.style.opacity  = '0';
    if (outCaptionRef.current) outCaptionRef.current.style.opacity = '0';

    const tl = anime.timeline({
      easing: 'easeOutQuad',
      complete: () => setPhase('idle'),
    });

    // 1) Coin flies in from the left → IBAN card → green pulse → balance bumps
    tl.add({
      targets:    incomingRef.current,
      opacity:    [0, 1],
      translateX: [-180, 0],
      translateY: [-10, 0],
      scale:      [0.6, 1],
      duration:   900,
    })
    .add({
      targets:  cardRef.current,
      boxShadow: ['0 0 0px rgba(57,181,74,0)', '0 0 38px rgba(57,181,74,0.55)', '0 0 0px rgba(57,181,74,0)'],
      duration: 700,
    }, '-=150')
    .add({
      targets: { v: 1420 },
      v:       1620,
      round:   1,
      duration: 600,
      update: (a) => {
        if (balanceRef.current) {
          const v = (a.animations[0].currentValue as unknown) as number;
          balanceRef.current.textContent = '€ ' + Number(v).toLocaleString('pt-PT') + ',00';
        }
      },
    }, '-=400')
    .add({
      targets: incomingRef.current,
      opacity: [1, 0],
      scale:   [1, 0.7],
      duration: 350,
    })
    .add({
      targets:    inCaptionRef.current,
      opacity:    [0, 1],
      translateY: [4, 0],
      duration:   350,
    }, '-=200')

    // 2) Pause, then PIN-entry overlay appears
    .add({
      targets:    pinRef.current,
      opacity:    [0, 1],
      translateY: [8, 0],
      duration:   400,
      delay:      450,
    })
    // 3) PIN digits type in
    .add({
      targets: { d: 0 },
      d:       4,
      round:   1,
      duration: 700,
      easing:  'linear',
      update: (a) => {
        const n = Math.floor((a.animations[0].currentValue as unknown) as number);
        setPinDigits('•'.repeat(n));
      },
    })
    // 4) Padlock opens
    .add({
      targets:  padlockRef.current,
      scale:    [1, 1.35, 1],
      duration: 380,
      changeBegin: () => { if (padlockRef.current) padlockRef.current.textContent = '🔓'; },
    })
    // 5) Coin flies OUT (debit) — balance decrements
    .add({
      targets:    outgoingRef.current,
      opacity:    [0, 1],
      translateX: [0, 220],
      translateY: [0, -16],
      scale:      [0.7, 1, 0.8],
      duration:   900,
    })
    .add({
      targets: { v: 1620 },
      v:       1470,
      round:   1,
      duration: 600,
      update: (a) => {
        if (balanceRef.current) {
          const v = (a.animations[0].currentValue as unknown) as number;
          balanceRef.current.textContent = '€ ' + Number(v).toLocaleString('pt-PT') + ',00';
        }
      },
    }, '-=700')
    .add({
      targets:    outCaptionRef.current,
      opacity:    [0, 1],
      translateY: [4, 0],
      duration:   350,
    }, '-=200');
  };

  // Auto-play on scroll-in (first time only)
  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          setTimeout(play, 250);
          break;
        }
      }
    }, { threshold: 0.35 });
    obs.observe(rootRef.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="relative flex flex-col bg-card border border-border rounded-xl p-4 min-h-[340px] overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Analogy 1</div>
          <h3 className="text-base lg:text-lg font-bold text-foreground leading-tight">A bank account</h3>
        </div>
        <button
          onClick={play}
          disabled={phase === 'playing'}
          className="text-[11px] px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground font-semibold disabled:opacity-50 transition-colors"
        >↻ Replay</button>
      </div>

      {/* Stage */}
      <div className="relative flex-1 min-h-[180px] flex items-center justify-center">
        {/* Sender — left, vertically aligned with the bank card */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center text-center text-[10px] text-muted-foreground gap-0.5 select-none">
          <span className="text-2xl">👤</span>
          <span>Anyone</span>
        </div>

        {/* Bank card */}
        <div
          ref={cardRef}
          className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-lg shadow-lg px-4 py-3 w-[230px] z-10"
          style={{ transition: 'box-shadow 200ms' }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase opacity-80">Banco</span>
            <span className="text-[10px] opacity-70">●●●●</span>
          </div>
          <div className="text-[10px] opacity-70 uppercase tracking-wider">IBAN</div>
          <div className="font-mono text-[11px] leading-snug">PT50 0033 0000<br/>4521 0000 0028 3</div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] opacity-70 uppercase tracking-wider">Saldo</span>
            <span ref={balanceRef} className="font-mono font-bold text-sm">€ 1.420,00</span>
          </div>
        </div>

        {/* Incoming coin (animated) */}
        <div
          ref={incomingRef}
          className="absolute z-20 size-9 rounded-full flex items-center justify-center text-lg font-black text-white shadow-md pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            opacity: 0,
            transform: 'translate(-180px, -10px) scale(0.6)',
          }}
        >€</div>

        {/* Outgoing coin (animated) */}
        <div
          ref={outgoingRef}
          className="absolute z-20 size-9 rounded-full flex items-center justify-center text-lg font-black text-white shadow-md pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            opacity: 0,
          }}
        >€</div>

        {/* PIN pad — appears when sending */}
        <div
          ref={pinRef}
          className="absolute right-1 bottom-1 bg-background border border-border rounded-lg px-2.5 py-2 z-10 shadow-md"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-1.5">
            <span ref={padlockRef} className="text-base">🔒</span>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">PIN</span>
              <span className="font-mono font-bold text-foreground text-base leading-none w-12">{pinDigits || '____'}</span>
            </div>
          </div>
        </div>

        {/* Recipient — right, vertically aligned with the bank card */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center text-center text-[10px] text-muted-foreground gap-0.5 select-none">
          <span className="text-2xl">🏪</span>
          <span>Business</span>
        </div>
      </div>

      {/* Captions */}
      <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
        <div ref={inCaptionRef} style={{ opacity: 0 }}
          className="p-2 rounded-md border bg-[color:var(--card)]"
          // dynamic border via style so Tailwind purge isn't needed for arbitrary alpha
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        >
          <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: PUBLIC_COLOR }}>Anyone can send TO the IBAN</div>
          <div className="text-muted-foreground leading-snug">It's printed on receipts, on the website footer, even on a coffee mug. Public.</div>
        </div>
        <div ref={outCaptionRef} style={{ opacity: 0 }}
          className="p-2 rounded-md border bg-[color:var(--card)]"
        >
          <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: PRIVATE_COLOR }}>Only the PIN holder spends FROM it</div>
          <div className="text-muted-foreground leading-snug">Without the PIN, the IBAN alone moves nothing. Secret.</div>
        </div>
      </div>

      {/* Mapping row */}
      <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full shrink-0" style={{ background: PUBLIC_COLOR }}></span>
          <span><strong className="text-foreground">IBAN</strong> ≡ Bitcoin <strong style={{ color: PUBLIC_COLOR }}>address</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full shrink-0" style={{ background: PRIVATE_COLOR }}></span>
          <span><strong className="text-foreground">PIN</strong> ≡ <strong style={{ color: PRIVATE_COLOR }}>private key</strong></span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── HOME (mailbox + front door key) ────────────────── */

function HomeKeysAnalogy() {
  const rootRef       = useRef<HTMLDivElement | null>(null);
  const letterRefs    = useRef<(SVGGElement | null)[]>([]);
  const keyRef        = useRef<SVGGElement | null>(null);
  const doorRef       = useRef<SVGGElement | null>(null);
  const insideRef     = useRef<SVGGElement | null>(null);
  const inCaptionRef  = useRef<HTMLDivElement | null>(null);
  const outCaptionRef = useRef<HTMLDivElement | null>(null);

  const [phase, setPhase] = useState<'idle' | 'playing'>('idle');
  const playedRef         = useRef(false);

  const play = () => {
    if (phase === 'playing') return;
    setPhase('playing');

    // Reset
    letterRefs.current.forEach(g => {
      if (!g) return;
      g.style.opacity   = '0';
      g.style.transform = 'translate(0px, -160px) rotate(-12deg)';
    });
    if (keyRef.current)    { keyRef.current.style.opacity = '0'; keyRef.current.style.transform = 'translate(80px, 0px) rotate(0deg)'; }
    if (doorRef.current)   doorRef.current.style.transform = 'rotateY(0deg)';
    if (insideRef.current) insideRef.current.style.opacity = '0';
    if (inCaptionRef.current)  inCaptionRef.current.style.opacity  = '0';
    if (outCaptionRef.current) outCaptionRef.current.style.opacity = '0';

    const tl = anime.timeline({
      easing: 'easeOutQuad',
      complete: () => setPhase('idle'),
    });

    // 1) Three letters drop into the mailbox (staggered, parabolic-ish)
    tl.add({
      targets:    letterRefs.current.filter(Boolean),
      opacity:    [0, 1],
      translateY: [-160, 0],
      translateX: (_el: SVGGElement, i: number) => [(i - 1) * 28, 0],
      rotate:     ['-12deg', '0deg'],
      duration:   650,
      delay:      anime.stagger(220),
    })
    .add({
      targets:    inCaptionRef.current,
      opacity:    [0, 1],
      translateY: [4, 0],
      duration:   400,
    }, '-=200')

    // 2) Pause, then a key flies in FROM THE RIGHT (over the door) so it
    //    doesn't pass through the mailbox on the way to the keyhole.
    .add({
      targets:    keyRef.current,
      opacity:    [0, 1],
      translateX: [80, 0],
      translateY: [0, 0],
      duration:   500,
      delay:      500,
    })
    // 3) Key rotates 90° in the lock
    .add({
      targets:  keyRef.current,
      rotate:   ['0deg', '90deg'],
      duration: 450,
      easing:   'easeInOutQuad',
    })
    // 4) Door opens (rotateY) — the inside reveals (letters retrieved)
    .add({
      targets:  doorRef.current,
      rotateY:  ['0deg', '-72deg'],
      duration: 600,
      easing:   'easeInOutCubic',
    }, '-=100')
    .add({
      targets: insideRef.current,
      opacity: [0, 1],
      duration: 350,
    }, '-=300')
    .add({
      targets:    outCaptionRef.current,
      opacity:    [0, 1],
      translateY: [4, 0],
      duration:   400,
    }, '-=200');
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          setTimeout(play, 250);
          break;
        }
      }
    }, { threshold: 0.35 });
    obs.observe(rootRef.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="relative flex flex-col bg-card border border-border rounded-xl p-4 min-h-[340px] overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Analogy 2</div>
          <h3 className="text-base lg:text-lg font-bold text-foreground leading-tight">Your home: mailbox + front-door key</h3>
        </div>
        <button
          onClick={play}
          disabled={phase === 'playing'}
          className="text-[11px] px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground font-semibold disabled:opacity-50 transition-colors"
        >↻ Replay</button>
      </div>

      {/* Stage — SVG house with mailbox + animated key */}
      <div className="relative flex-1 min-h-[180px] flex items-center justify-center">
        <svg viewBox="0 0 360 200" className="w-full max-w-[420px] h-auto" style={{ overflow: 'visible' }}>
          {/* Sky / ground line */}
          <line x1="0" y1="180" x2="360" y2="180" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

          {/* House body */}
          <rect x="90" y="80" width="200" height="100" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
          {/* Roof */}
          <polygon points="80,80 300,80 190,32" fill="#ED1C24" opacity="0.85" />
          {/* Window */}
          <rect x="110" y="100" width="40" height="34" rx="2" fill="#fde68a" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="130" y1="100" x2="130" y2="134" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="110" y1="117" x2="150" y2="117" stroke="hsl(var(--border))" strokeWidth="1" />

          {/* Inside (revealed when door opens) */}
          <g ref={insideRef} style={{ opacity: 0 }}>
            <rect x="232" y="110" width="48" height="70" fill="#fde68a" opacity="0.7" />
            <text x="256" y="150" fontSize="20" textAnchor="middle">✉️</text>
            <text x="256" y="172" fontSize="11" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="600">você</text>
          </g>

          {/* Door — pivots on its left edge for an "opens inward" rotateY */}
          <g
            ref={doorRef}
            style={{
              transformOrigin: '232px 180px',
              transformBox: 'fill-box' as React.CSSProperties['transformBox'],
            }}
          >
            <rect x="232" y="110" width="48" height="70" rx="1" fill="#7c2d12" />
            {/* Door handle */}
            <circle cx="268" cy="148" r="2.5" fill="#fbbf24" />
            {/* Lock keyhole */}
            <circle cx="262" cy="148" r="3.5" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
          </g>

          {/* Mailbox — STANDALONE on its own post to the LEFT of the house
              (the house body spans x=90-290, so the mailbox sits clear of it). */}
          <g>
            {/* Mailbox body — sits at x:20-60, y:120-150 */}
            <rect x="20" y="120" width="40" height="30" rx="3" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
            {/* Letter slot — clear opening across the top front */}
            <rect x="25" y="125" width="30" height="4" rx="1.5" fill="#94a3b8" />
            {/* "MAIL" label across the bottom of the box */}
            <text x="40" y="144" fontSize="6" textAnchor="middle" fill="#94a3b8" fontWeight="700">MAIL</text>
            {/* Post — anchors the mailbox to the ground (y=180) */}
            <rect x="38" y="150" width="4" height="30" fill="#475569" />
            {/* Tiny base on the post so it doesn't look floating */}
            <rect x="34" y="178" width="12" height="2" rx="0.5" fill="#334155" />
          </g>

          {/* Letters — three envelopes drop from above into the slot at y≈127 */}
          {[0, 1, 2].map(i => (
            <g
              key={i}
              ref={el => { letterRefs.current[i] = el; }}
              style={{ opacity: 0, transformBox: 'fill-box' as React.CSSProperties['transformBox'] }}
              transform={`translate(${29 + i * 1}, ${120 - i * 1})`}
            >
              <rect x="0" y="0" width="22" height="10" rx="1.5" fill="#fef3c7" stroke="#d97706" strokeWidth="0.7" />
              <path d="M0,0 L11,6 L22,0" fill="none" stroke="#d97706" strokeWidth="0.7" />
            </g>
          ))}

          {/* Key — handle just LEFT of the keyhole, blade extending INTO the
              keyhole at world (262, 148). Flies in from the right and rotates 90°
              around the keyhole. */}
          <g
            ref={keyRef}
            style={{
              opacity: 0,
              transformOrigin: '262px 148px',
              transformBox: 'fill-box' as React.CSSProperties['transformBox'],
            }}
            transform="translate(251, 144)"
          >
            {/* Handle ring — center at world (256, 148), just to the left of keyhole at (262, 148) */}
            <circle cx="5" cy="4" r="4" fill="none" stroke={PRIVATE_COLOR} strokeWidth="2" />
            {/* Blade — runs from world x=260 to x=274, passing through the keyhole */}
            <rect x="9" y="3" width="14" height="2" rx="0.6" fill={PRIVATE_COLOR} />
            {/* Teeth at the tip — small bumps on the blade's underside */}
            <rect x="17" y="5" width="1.6" height="2.4" fill={PRIVATE_COLOR} />
            <rect x="20" y="5" width="1.6" height="3" fill={PRIVATE_COLOR} />
          </g>
        </svg>
      </div>

      {/* Captions */}
      <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
        <div ref={inCaptionRef} style={{ opacity: 0 }} className="p-2 rounded-md border bg-[color:var(--card)]">
          <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: PUBLIC_COLOR }}>Anyone drops mail in</div>
          <div className="text-muted-foreground leading-snug">The mailbox slot faces the street. Your address is on a thousand databases.</div>
        </div>
        <div ref={outCaptionRef} style={{ opacity: 0 }} className="p-2 rounded-md border bg-[color:var(--card)]">
          <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: PRIVATE_COLOR }}>Only the keyholder enters</div>
          <div className="text-muted-foreground leading-snug">No key, no door — and no shortcut. Lose the key and you're locked out forever.</div>
        </div>
      </div>

      {/* Mapping row */}
      <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full shrink-0" style={{ background: PUBLIC_COLOR }}></span>
          <span><strong className="text-foreground">Mailbox slot</strong> ≡ Bitcoin <strong style={{ color: PUBLIC_COLOR }}>address</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full shrink-0" style={{ background: PRIVATE_COLOR }}></span>
          <span><strong className="text-foreground">Front-door key</strong> ≡ <strong style={{ color: PRIVATE_COLOR }}>private key</strong></span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── COMPOSED SLIDE ─────────────────────────────── */

function WalletAnalogiesDemo() {
  return (
    <div className="h-full flex flex-col p-5 lg:p-8">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">What is a Wallet, really?</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          A wallet has <strong className="text-foreground">two things</strong> that behave very differently — one is public, one is secret.
          Two everyday analogies make the asymmetry obvious.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5 overflow-y-auto">
        <BankIbanAnalogy />
        <HomeKeysAnalogy />
      </div>

      {/* Synthesis band */}
      <div className="shrink-0 mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 bg-card border-2 rounded-xl" style={{ borderColor: PUBLIC_COLOR + '55' }}>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: PUBLIC_COLOR }}>✅ The public half</div>
          <div className="text-sm text-foreground leading-snug">
            <strong>Address</strong> — print it on a receipt, share it on Twitter, post it on a billboard. Anyone can send Bitcoin to it. Nobody can move what's there with it alone.
          </div>
        </div>
        <div className="p-3 bg-card border-2 rounded-xl" style={{ borderColor: PRIVATE_COLOR + '55' }}>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: PRIVATE_COLOR }}>🚫 The private half</div>
          <div className="text-sm text-foreground leading-snug">
            <strong>Private key</strong> — the one thing that authorises spending. Like a PIN, like a house key: lose control of it and the funds are gone. No bank to call, no support line.
          </div>
        </div>
      </div>

      <div className="shrink-0 mt-3 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[11px] text-muted-foreground">
        <strong className="text-foreground">Where the analogies break:</strong> a bank can reverse a fraud, a locksmith can change your lock. Bitcoin has neither. The math is the only enforcement — that's both the appeal and the responsibility of self-custody.
      </div>
    </div>
  );
}

export function Section2() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={section2Chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 02"
            title="Bitcoin and Beyond"
            subtitle="A deep dive into the world's first cryptocurrency and its network"
            icon={<Bitcoin className="size-20 text-[#f59e0b]" />}
            gradient="from-[#f59e0b] to-[#ED1C24]"
          />
        </div>

        {/* ═══════ 1. WHY BITCOIN WAS A BREAKTHROUGH ═══════ */}
        <div id="s2-breakthrough" className="h-full">
          <ConceptSlide
            title="Why Bitcoin Was a Breakthrough"
            description="The mysterious Satoshi Nakamoto solved the double-spending problem without a trusted authority — combining decades of cryptographic research into one working protocol."
            visual={
              <div className="space-y-4 w-full">
                <CalloutBox type="important" title="The Double-Spending Problem">
                  How do you prevent someone from spending the same digital currency twice without a central authority to verify transactions?
                </CalloutBox>
                <CalloutBox type="tip" title="Satoshi's Solution">
                  Combine cryptographic proof, distributed consensus, and economic incentives to create a trustless system where the network itself prevents fraud.
                </CalloutBox>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <div className="font-mono text-sm text-muted-foreground mb-2">Genesis Block Message:</div>
                  <div className="text-sm text-foreground italic">
                    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Created a decentralized consensus mechanism (Proof of Work)",
              "Designed a transparent public ledger system",
              "Implemented cryptographic security for transactions",
              "Established fixed supply and predictable issuance schedule"
            ]}
          />
        </div>

        {/* ═══════ 1b. THE 2008 PAPER — Satoshi's announcement ═══════ */}
        <div id="s2-paper" className="h-full">
          <div className="w-full h-full flex flex-col p-5 lg:p-8">
            <div className="shrink-0 mb-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#f59e0b] mb-1 font-bold">
                October 31, 2008
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                An anonymous post. Two unsolvable problems. One paper.
              </h2>
              <p className="text-sm lg:text-base text-muted-foreground max-w-3xl">
                Someone — or some group — calling themselves <span className="font-mono text-foreground">Satoshi Nakamoto</span> sent a 9-page PDF to a small cryptography mailing list. The claim inside was outrageous: that two problems no one had cracked in 30 years could both be solved at the same time, on the open internet, by ordinary computers.
              </p>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-4 lg:gap-6">
              {/* LEFT — the post */}
              <div className="flex flex-col gap-3 min-h-0">
                <div className="rounded-xl border-2 border-[#f59e0b]/50 bg-card overflow-hidden">
                  <div className="px-4 py-2 bg-[#f59e0b]/15 border-b border-[#f59e0b]/30 flex items-center gap-2">
                    <span className="text-xs font-mono text-[#f59e0b] font-bold">📧 mailing list · cryptography@metzdowd.com</span>
                  </div>
                  <div className="p-4 space-y-2 text-sm font-mono">
                    <div className="text-foreground"><span className="text-muted-foreground">From:</span> Satoshi Nakamoto &lt;satoshi@vistomail.com&gt;</div>
                    <div className="text-foreground"><span className="text-muted-foreground">Subject:</span> Bitcoin P2P e-cash paper</div>
                    <div className="text-foreground"><span className="text-muted-foreground">Date:</span> Fri, 31 Oct 2008 14:10:00 -0700</div>
                    <div className="border-t border-border my-2" />
                    <p className="text-foreground italic text-xs lg:text-sm leading-relaxed">
                      "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party. The main properties: Double-spending is prevented with a peer-to-peer network. No mint or other trusted parties. Participants can be anonymous. New coins are made from Hashcash style proof-of-work…"
                    </p>
                    <div className="text-foreground text-xs pt-1"><span className="text-muted-foreground">Paper:</span> <span className="text-[#f59e0b]">bitcoin.org/bitcoin.pdf</span></div>
                  </div>
                </div>
                <CalloutBox type="tip" title="What happened next">
                  Almost nobody took it seriously. A few cypherpunks responded. Then on{' '}
                  <strong className="text-foreground">January 3, 2009</strong>, Satoshi mined Block #0 — embedded with the headline{' '}
                  <em>"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"</em>. The proof of the claim.
                </CalloutBox>
                <a
                  href="https://bitcoin.org/bitcoin.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold hover:bg-[#f59e0b]/25 transition-colors w-fit"
                >
                  📄 Read the original whitepaper
                  <ExternalLink className="size-3.5" />
                </a>
              </div>

              {/* RIGHT — the two problems he claimed to solve */}
              <div className="flex flex-col gap-3 min-h-0">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  Two problems no one had cracked
                </p>

                <div className="p-4 rounded-xl border-2 border-[#ED1C24]/40 bg-gradient-to-br from-[#ED1C24]/10 to-transparent">
                  <h3 className="font-bold text-[#ED1C24] mb-1.5 flex items-center gap-2">
                    <span className="text-lg">💸</span> Double-spending
                  </h3>
                  <p className="text-xs text-foreground/90 leading-relaxed mb-2">
                    How do you stop someone from spending the same digital dollar twice — when digital files are infinitely copyable?
                  </p>
                  <div className="text-[11px] text-muted-foreground bg-muted/30 p-2 rounded">
                    <strong className="text-foreground/80">Today this still requires a referee.</strong> Visa, PayPal, and your bank all exist because someone has to keep score. Take the referee away — and digital money breaks instantly.
                  </div>
                </div>

                <div className="p-4 rounded-xl border-2 border-[#6366f1]/40 bg-gradient-to-br from-[#6366f1]/10 to-transparent">
                  <h3 className="font-bold text-[#6366f1] mb-1.5 flex items-center gap-2">
                    <span className="text-lg">⚔️</span> Byzantine Generals
                  </h3>
                  <p className="text-xs text-foreground/90 leading-relaxed mb-2">
                    How do strangers reach agreement on the truth when some of them might be lying — and there's no central authority to verify who?
                  </p>
                  <div className="text-[11px] text-muted-foreground bg-muted/30 p-2 rounded">
                    <strong className="text-foreground/80">Modern systems still struggle with this.</strong> BGP routing can be hijacked (the 2008 YouTube outage), online voting is famously hard to secure, distributed databases need carefully picked leaders.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-[#39B54A]/40 bg-[#39B54A]/10 text-center">
                  <p className="text-sm font-bold text-foreground">
                    Satoshi claimed to have solved <span className="text-[#39B54A]">both</span> at once.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 italic">Bitcoin is the proof.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ 3. WHAT IS BITCOIN ═══════ */}
        <div id="s2-what" className="h-full">
          <div className="w-full h-full flex flex-col p-5 lg:p-8">
            <div className="shrink-0 mb-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#f59e0b] mb-1 font-bold">
                What the paper proposed
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">What is Bitcoin?</h2>
              <p className="text-sm lg:text-base text-muted-foreground max-w-3xl">
                The 9-page paper didn't describe a product, a company, or a token sale. It described a <strong className="text-foreground">system</strong> — a set of rules a network of computers could run together, with no one in charge. Here's what was inside.
              </p>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-4 lg:gap-6">
              {/* LEFT — actual paper structure */}
              <div className="flex flex-col gap-3 min-h-0">
                <div className="rounded-xl border-2 border-[#f59e0b]/40 bg-card overflow-hidden">
                  <div className="px-3 py-2 bg-[#f59e0b]/10 border-b border-[#f59e0b]/30 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#f59e0b] font-bold uppercase tracking-widest">📄 Bitcoin.pdf · 9 pages</span>
                    <span className="text-[9px] text-muted-foreground">Nov 2008</span>
                  </div>
                  <ol className="p-3 space-y-0.5 text-[11px] font-mono text-muted-foreground">
                    {[
                      'Introduction',
                      'Transactions',
                      'Timestamp Server',
                      'Proof-of-Work',
                      'Network',
                      'Incentive',
                      'Reclaiming Disk Space',
                      'Simplified Payment Verification',
                      'Combining and Splitting Value',
                      'Privacy',
                      'Calculations',
                      'Conclusion',
                    ].map((s, i) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-[#f59e0b] font-bold w-4 text-right shrink-0">{i + 1}.</span>
                        <span className="text-foreground">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <CalloutBox type="info" title="The system, in one sentence">
                  Bitcoin is what happens when those 12 sections actually run on a network of independent computers — for years, without anyone in charge, and without breaking.
                </CalloutBox>
              </div>

              {/* RIGHT — four design choices */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  Four design choices that came out of those pages
                </p>
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <div className="p-3.5 bg-gradient-to-br from-[#f59e0b]/15 to-transparent rounded-xl border-2 border-[#f59e0b]/40 flex flex-col">
                    <h4 className="font-bold text-[#f59e0b] mb-1.5 text-sm">🌐 Permissionless</h4>
                    <p className="text-xs text-muted-foreground leading-snug">Anyone can send, receive, or validate transactions. No application, no KYC, no gatekeeper.</p>
                  </div>
                  <div className="p-3.5 bg-gradient-to-br from-[#ED1C24]/15 to-transparent rounded-xl border-2 border-[#ED1C24]/40 flex flex-col">
                    <h4 className="font-bold text-[#ED1C24] mb-1.5 text-sm">🔓 Open Source</h4>
                    <p className="text-xs text-muted-foreground leading-snug">The code is public — anyone can read it, audit it, fork it, or contribute to Bitcoin Core.</p>
                  </div>
                  <div className="p-3.5 bg-gradient-to-br from-[#39B54A]/15 to-transparent rounded-xl border-2 border-[#39B54A]/40 flex flex-col">
                    <h4 className="font-bold text-[#39B54A] mb-1.5 text-sm">💎 Scarce by design</h4>
                    <p className="text-xs text-muted-foreground leading-snug">Hard-capped at 21 million coins forever. Enforced by code, not by anyone's promise.</p>
                  </div>
                  <div className="p-3.5 bg-gradient-to-br from-[#6366f1]/15 to-transparent rounded-xl border-2 border-[#6366f1]/40 flex flex-col">
                    <h4 className="font-bold text-[#6366f1] mb-1.5 text-sm">⚡ Censorship-resistant</h4>
                    <p className="text-xs text-muted-foreground leading-snug">No entity can freeze, reverse, or block a valid Bitcoin transaction. The math doesn't care who you are.</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">The paper claimed to solve two specific problems</span> nobody had cracked: double-spending and the Byzantine generals problem. <span className="italic">The next two slides walk through both — with the history of who else tried.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ 4. BYZANTINE GENERALS PROBLEM — HISTORICAL NARRATIVE ═══════ */}
        <div id="s2-byzantine" className="h-full">
          <div className="w-full h-full flex flex-col p-5 lg:p-8">
            <div className="shrink-0 mb-3">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#f59e0b] mb-1 font-bold">
                Problem #1 the paper claimed to solve
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Byzantine Generals — A 26-Year Puzzle</h2>
              <p className="text-sm lg:text-base text-muted-foreground max-w-4xl">
                In <strong className="text-foreground">1982</strong>, three researchers at SRI International — <strong className="text-foreground">Leslie Lamport, Robert Shostak &amp; Marshall Pease</strong> — formalised a question that would haunt distributed systems for decades:
                <em className="text-foreground"> how do strangers who cannot trust each other agree on the same version of reality, when some of them are actively lying?</em>
              </p>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-4">
              {/* LEFT — the metaphor + computing translation */}
              <div className="flex flex-col gap-3 min-h-0">
                <div className="p-3 bg-gradient-to-br from-[#ED1C24]/15 to-transparent rounded-xl border-2 border-[#ED1C24]/40">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">🏰</span>
                    <h4 className="font-bold text-[#ED1C24] text-sm">The metaphor</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    Several Byzantine generals surround a city. They must <strong className="text-foreground">all attack together or all retreat together</strong> — a split decision means defeat. They communicate only by messenger, and an unknown number of them are <strong className="text-foreground">traitors</strong> sending conflicting orders. With no trusted referee, can the loyal generals still reach the same plan?
                  </p>
                </div>

                <div className="p-3 bg-gradient-to-br from-[#f59e0b]/15 to-transparent rounded-xl border-2 border-[#f59e0b]/40">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">💻</span>
                    <h4 className="font-bold text-[#f59e0b] text-sm">In computing terms</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-card/60 rounded-md p-1.5">
                      <span className="text-muted-foreground">Generals</span>
                      <span className="text-foreground font-bold"> = nodes</span>
                    </div>
                    <div className="bg-card/60 rounded-md p-1.5">
                      <span className="text-muted-foreground">Messengers</span>
                      <span className="text-foreground font-bold"> = network packets</span>
                    </div>
                    <div className="bg-card/60 rounded-md p-1.5">
                      <span className="text-muted-foreground">Traitors</span>
                      <span className="text-foreground font-bold"> = malicious / faulty nodes</span>
                    </div>
                    <div className="bg-card/60 rounded-md p-1.5">
                      <span className="text-muted-foreground">Battle plan</span>
                      <span className="text-foreground font-bold"> = shared ledger state</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-[#39B54A]/15 to-transparent rounded-xl border-2 border-[#39B54A]/40 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">⛏️</span>
                    <h4 className="font-bold text-[#39B54A] text-sm">Bitcoin's answer (Nov 2008)</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug mb-2">
                    Don't try to <em>identify</em> the traitors — make lying <strong className="text-foreground">economically irrational</strong>. Every block costs real energy to produce. To rewrite history, an attacker would need to out-spend the entire honest majority, forever.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div className="bg-card/60 rounded-md p-1.5 text-center">
                      <div className="text-muted-foreground">Tolerates</div>
                      <div className="font-bold text-[#39B54A]">&lt; 50% bad hash</div>
                    </div>
                    <div className="bg-card/60 rounded-md p-1.5 text-center">
                      <div className="text-muted-foreground">Trusted setup</div>
                      <div className="font-bold text-[#39B54A]">None</div>
                    </div>
                    <div className="bg-card/60 rounded-md p-1.5 text-center">
                      <div className="text-muted-foreground">Membership</div>
                      <div className="font-bold text-[#39B54A]">Open / unknown</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT — historical timeline of consensus attempts */}
              <div className="flex flex-col gap-2 min-h-0">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  Three decades of partial solutions
                </p>

                <div className="flex-1 min-h-0 relative overflow-y-auto pr-1">
                  {/* vertical timeline rail */}
                  <div className="absolute left-[60px] top-1 bottom-1 w-0.5 bg-gradient-to-b from-[#ED1C24] via-[#f59e0b] to-[#39B54A]" />

                  <div className="space-y-2.5">
                    {[
                      {
                        year: '1982', color: '#ED1C24',
                        title: 'The problem is named',
                        who: 'Lamport, Shostak & Pease — SRI International',
                        body: 'The paper "The Byzantine Generals Problem" proves consensus is mathematically possible only if fewer than ⅓ of participants are traitors — and requires every participant to be known in advance.',
                        verdict: 'Closed networks only',
                      },
                      {
                        year: '1989', color: '#ED1C24',
                        title: 'Paxos',
                        who: 'Leslie Lamport (again)',
                        body: 'A practical consensus algorithm for distributed databases. Powers Google Chubby, Microsoft Azure, much of modern cloud — but every participant must be pre-authenticated.',
                        verdict: 'Permissioned only',
                      },
                      {
                        year: '1999', color: '#f59e0b',
                        title: 'PBFT — Practical Byzantine Fault Tolerance',
                        who: 'Castro & Liskov, MIT',
                        body: 'First algorithm fast enough for real-world use that tolerates actively malicious nodes. Still requires a fixed, known set of validators and O(n²) messages — does not scale to thousands.',
                        verdict: 'Small known sets',
                      },
                      {
                        year: '2008', color: '#39B54A',
                        title: 'Nakamoto Consensus',
                        who: 'Satoshi — Bitcoin whitepaper',
                        body: 'Replaces voting with mining. No fixed validator set, no identity, no pre-authentication. Anyone can join or leave at any time. The longest valid chain is the truth. First and only working solution for OPEN networks.',
                        verdict: 'Open / permissionless ✓',
                      },
                    ].map((e) => (
                      <div key={e.year} className="relative pl-[80px] pr-1">
                        {/* dot */}
                        <div
                          className="absolute left-[54px] top-1.5 size-3.5 rounded-full border-2 border-background shadow"
                          style={{ backgroundColor: e.color }}
                        />
                        {/* year tag */}
                        <div
                          className="absolute left-0 top-0 w-12 text-right font-mono font-black text-sm"
                          style={{ color: e.color }}
                        >
                          {e.year}
                        </div>

                        <div className="bg-card border border-border rounded-lg p-2.5 hover:border-foreground/30 transition-colors">
                          <div className="flex items-start justify-between gap-2 mb-0.5">
                            <h4 className="font-bold text-foreground text-xs">{e.title}</h4>
                            <span
                              className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded shrink-0"
                              style={{ color: e.color, backgroundColor: e.color + '18' }}
                            >
                              {e.verdict}
                            </span>
                          </div>
                          <div className="text-[10px] text-muted-foreground italic mb-1">{e.who}</div>
                          <p className="text-[11px] text-muted-foreground leading-snug">{e.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 p-2.5 rounded-lg bg-[#39B54A]/10 border border-[#39B54A]/40 text-[11px] text-muted-foreground">
                  <span className="font-bold text-[#39B54A]">The leap:</span> Paxos and PBFT need a <strong className="text-foreground">guest list</strong>. Bitcoin works at a <strong className="text-foreground">street party</strong> where nobody checked IDs at the door — and still everyone agrees on what was served.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ 5. DOUBLE-SPENDING — HISTORICAL NARRATIVE ═══════ */}
        <div id="s2-doublespend" className="h-full">
          <ConceptSlide
            title="Double-Spending — 20 Years of Failed Digital Cash"
            description="A digital file can be copied infinitely. So how do you make 'money' that can't be? Cypherpunks tried for two decades — every attempt either centralised, collapsed, or never shipped. Bitcoin is the first one still running."
            visual={
              <div className="space-y-3 w-full">
                {/* ─── Historical timeline of attempts ─── */}
                <div className="p-3 bg-gradient-to-br from-[#8b5cf6]/15 via-[#6366f1]/5 to-transparent rounded-xl border-2 border-[#8b5cf6]/40">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-[#8b5cf6] text-sm">📜 Two decades of attempts before Bitcoin</h4>
                    <span className="text-[10px] font-mono text-muted-foreground">1983 → 2008</span>
                  </div>
                  <div className="relative">
                    {/* horizontal rail */}
                    <div className="absolute left-2 right-2 top-[18px] h-0.5 bg-gradient-to-r from-[#ED1C24] via-[#f59e0b] to-[#39B54A]" />
                    <div className="grid grid-cols-6 gap-2 relative">
                      {[
                        { year: '1983', name: 'DigiCash', who: 'David Chaum', why: 'Blind-signature ecash. Required a central bank to mint coins. Filed for bankruptcy in 1998.', fate: 'Centralised', color: '#ED1C24' },
                        { year: '1996', name: 'e-gold', who: 'Douglas Jackson', why: 'Gold-backed online currency. Hit 5M accounts — then seized by US authorities in 2007.', fate: 'Shut down', color: '#ED1C24' },
                        { year: '1997', name: 'Hashcash', who: 'Adam Back', why: 'Proof-of-work for email anti-spam. Not money — but the cryptographic primitive Satoshi would later reuse.', fate: 'Primitive only', color: '#f59e0b' },
                        { year: '1998', name: 'b-money', who: 'Wei Dai', why: 'First proposal for a decentralised digital currency using PoW. Never implemented.', fate: 'Proposal only', color: '#f59e0b' },
                        { year: '1998', name: 'Bit Gold', who: 'Nick Szabo', why: 'PoW-based scarce digital tokens, chained together. Solved most problems — but no working code shipped.', fate: 'Proposal only', color: '#f59e0b' },
                        { year: '2008', name: 'Bitcoin', who: 'Satoshi Nakamoto', why: 'Combines PoW + chained timestamps + P2P broadcast + incentives. Mainnet launched Jan 3 2009. Still running.', fate: 'Live ✓', color: '#39B54A' },
                      ].map(item => (
                        <div key={item.year + item.name} className="flex flex-col items-center">
                          <div
                            className="size-4 rounded-full border-2 border-background shadow shrink-0 mb-1.5 z-10"
                            style={{ backgroundColor: item.color }}
                          />
                          <div className="text-center w-full">
                            <div className="font-mono font-black text-[11px]" style={{ color: item.color }}>{item.year}</div>
                            <div className="font-bold text-foreground text-[11px] leading-tight">{item.name}</div>
                            <div className="text-[9px] text-muted-foreground italic mt-0.5">{item.who}</div>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-1">{item.why}</p>
                            <div
                              className="mt-1 inline-block text-[8px] font-bold uppercase tracking-widest px-1 py-0.5 rounded"
                              style={{ color: item.color, backgroundColor: item.color + '18' }}
                            >
                              {item.fate}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* The attack + old fix — compressed into one strip */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-1 text-sm">📋 The attack (same since 1983)</h4>
                    <p className="text-xs text-muted-foreground">Alice has 1 coin. She broadcasts two transactions simultaneously — one paying Bob, one paying herself. Without a referee, both look valid. Who actually gets the coin?</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-1 text-sm">🏦 The pre-Bitcoin fix — trust a referee</h4>
                    <p className="text-xs text-muted-foreground">DigiCash, e-gold, banks, PayPal — all worked by keeping a central ledger. No double-spend possible — but you must trust the operator with your money. And operators can be seized, hacked, or simply turn evil.</p>
                  </div>
                </div>

                {/* UTXO vs Account — side-by-side split */}
                <div className="p-3 bg-gradient-to-br from-[#39B54A]/15 via-[#39B54A]/5 to-transparent rounded-xl border border-[#39B54A]/30">
                  <h4 className="font-bold text-[#39B54A] mb-2 text-sm">🔗 Bitcoin's Fix — the UTXO Model</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Bitcoin doesn't store balances. It stores <span className="font-bold text-foreground">discrete unspent outputs</span> — like physical coins. Spending one destroys it and mints new ones. <span className="italic">A coin can only be consumed once.</span>
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Account model side */}
                    <div className="bg-card/60 rounded-lg border border-border p-2.5">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-base">💳</span>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Account Model · banks, Ethereum</span>
                      </div>

                      {/* Alice balance */}
                      <div className="text-[10px] text-muted-foreground mb-1">Alice's wallet</div>
                      <div className="rounded-md border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-2 py-1.5 flex items-center justify-between mb-2">
                        <span className="text-[10px] text-muted-foreground">balance</span>
                        <span className="font-mono font-bold text-sm text-[#f59e0b]">1.00 BTC</span>
                      </div>

                      <div className="text-center text-[10px] text-muted-foreground mb-1">↓ pay Bob 0.4 BTC</div>

                      <div className="rounded-md border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-2 py-1.5 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">new balance</span>
                        <span className="font-mono font-bold text-sm text-[#f59e0b]">0.60 BTC</span>
                      </div>

                      <div className="mt-2 text-[10px] text-muted-foreground italic">
                        One number is mutated. To prevent double-spend, <span className="font-bold text-foreground not-italic">someone</span> must serialise every write.
                      </div>
                    </div>

                    {/* UTXO model side */}
                    <div className="bg-card/60 rounded-lg border border-[#39B54A]/40 p-2.5">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-base">🪙</span>
                        <span className="text-[11px] font-bold text-[#39B54A] uppercase tracking-wide">UTXO Model · Bitcoin</span>
                      </div>

                      <div className="text-[10px] text-muted-foreground mb-1">Alice's wallet — 3 unspent outputs</div>
                      <div className="flex gap-1 mb-2">
                        <div className="flex-1 rounded-md border border-[#39B54A]/50 bg-[#39B54A]/10 px-1.5 py-1 text-center">
                          <div className="text-[9px] text-muted-foreground">UTXO</div>
                          <div className="font-mono font-bold text-xs text-[#39B54A]">0.5</div>
                        </div>
                        <div className="flex-1 rounded-md border border-[#39B54A]/50 bg-[#39B54A]/10 px-1.5 py-1 text-center">
                          <div className="text-[9px] text-muted-foreground">UTXO</div>
                          <div className="font-mono font-bold text-xs text-[#39B54A]">0.3</div>
                        </div>
                        <div className="flex-1 rounded-md border border-[#39B54A]/50 bg-[#39B54A]/10 px-1.5 py-1 text-center">
                          <div className="text-[9px] text-muted-foreground">UTXO</div>
                          <div className="font-mono font-bold text-xs text-[#39B54A]">0.2</div>
                        </div>
                      </div>

                      <div className="text-center text-[10px] text-muted-foreground mb-1">↓ pay Bob 0.4 BTC · consume <span className="font-mono">0.5</span></div>

                      <div className="flex gap-1">
                        <div className="flex-1 rounded-md border border-[#ED1C24]/50 bg-[#ED1C24]/10 px-1.5 py-1 text-center relative">
                          <div className="text-[9px] text-muted-foreground line-through">UTXO</div>
                          <div className="font-mono font-bold text-xs text-[#ED1C24] line-through">0.5</div>
                          <div className="absolute -top-1 -right-1 text-[9px] bg-[#ED1C24] text-white rounded-full px-1">✕</div>
                        </div>
                        <div className="flex-1 rounded-md border border-[#6366f1]/50 bg-[#6366f1]/10 px-1.5 py-1 text-center">
                          <div className="text-[9px] text-muted-foreground">→ Bob</div>
                          <div className="font-mono font-bold text-xs text-[#6366f1]">0.4</div>
                        </div>
                        <div className="flex-1 rounded-md border border-[#39B54A]/50 bg-[#39B54A]/10 px-1.5 py-1 text-center">
                          <div className="text-[9px] text-muted-foreground">change</div>
                          <div className="font-mono font-bold text-xs text-[#39B54A]">0.1</div>
                        </div>
                      </div>

                      <div className="mt-2 text-[10px] text-muted-foreground italic">
                        The spent UTXO is <span className="font-bold text-foreground not-italic">gone</span>. Try to reuse it and every node rejects the tx — no referee needed.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Every prior attempt either centralised (DigiCash, e-gold) or stayed on paper (b-money, Bit Gold)",
              "Bitcoin's UTXO model: spending an output destroys it — the same coin cannot be referenced twice",
              "No central operator to seize, sue, or shut down — validation is run by every node independently",
              "After a few confirmations, reversing a transaction would cost more than the transaction is worth"
            ]}
          />
        </div>

        {/* ═══════ 4. SUPPLY MODEL — INTERACTIVE ═══════ */}
        <div id="s2-supply" className="h-full">
          <BitcoinSupplyInteractive />
        </div>

        {/* ═══════ 5. NETWORK STATISTICS ═══════ */}
        <div id="s2-stats" className="h-full">
          <ConceptSlide
            title="Bitcoin Network Statistics"
            description="The Bitcoin network is the most powerful and longest-running decentralized computing network in history."
            visual={
              <div className="space-y-3 w-full">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#f59e0b]">~800 EH/s</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Hash Rate (2025)</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#39B54A]">~19,000+</div>
                    <div className="text-xs text-muted-foreground mt-1">Reachable Full Nodes</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#ED1C24]">~580 GB</div>
                    <div className="text-xs text-muted-foreground mt-1">Full Blockchain Size</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#6366f1]">~10 min</div>
                    <div className="text-xs text-muted-foreground mt-1">Average Block Time</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#8b5cf6]">~400K</div>
                    <div className="text-xs text-muted-foreground mt-1">Daily Transactions</div>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border text-center">
                    <div className="text-2xl font-bold text-[#f59e0b]">99.99%</div>
                    <div className="text-xs text-muted-foreground mt-1">Uptime Since 2009</div>
                  </div>
                </div>
                <CalloutBox type="info" title="Difficulty Adjustment">
                  Every 2,016 blocks (~2 weeks), the network automatically adjusts mining difficulty to maintain the ~10-minute block target — regardless of how much hash power joins or leaves.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Hash rate has increased exponentially, now measured in exahashes",
              "Bitcoin has had only 2 brief notable downtime events in 15+ years",
              "The difficulty adjustment is one of Bitcoin's most elegant features",
              "Anyone with a computer can run a full node and verify the entire chain"
            ]}
          />
        </div>

        {/* ═══════ 6. NODE DISTRIBUTION ═══════ */}
        <div id="s2-nodes" className="h-full">
          <ComparisonSlide
            title="Node Distribution & Roles"
            featureLabel="Node Type"
            option1Label="Role"
            option2Label="Storage Needs"
            option3Label="Validation Method"
            items={[
              {
                feature: "⚙️ Full Node",
                option1: "Enforces all consensus rules, relays transactions to peers. The backbone of the network.",
                option2: "Full blockchain — ~600 GB and growing. Requires a dedicated drive.",
                option3: "Independently verifies every transaction and every block from genesis."
              },
              {
                feature: "⛏️ Mining Node",
                option1: "Bundles transactions into blocks and competes via Proof of Work to earn block rewards + fees.",
                option2: "Full blockchain + specialized ASIC hardware. Very high resource cost.",
                option3: "Full validation like a full node, plus solves the PoW hash puzzle to propose new blocks."
              },
              {
                feature: "📱 SPV / Light Node",
                option1: "Lightweight client used in mobile wallets. Sends and receives BTC without storing the chain.",
                option2: "Block headers only — ~50 MB. Suitable for phones and low-storage devices.",
                option3: "Relies on Merkle proofs provided by full nodes. Trusts the longest chain, not self-verified."
              },
              {
                feature: "✂️ Pruned Node",
                option1: "Validates the full chain during sync, then discards old block data to save disk space.",
                option2: "Recent blocks only — configurable, typically ~5–10 GB after pruning.",
                option3: "Full validation from genesis during initial sync. After pruning, can no longer serve old blocks."
              }
            ]}
          />
        </div>

        {/* ═══════ NODE DISTRIBUTION — CLOUD CENTRALISATION RISK ═══════ */}
        <div className="h-full flex flex-col p-6 lg:p-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1 shrink-0">Node Distribution & Roles</h2>
          <p className="text-muted-foreground text-sm mb-5 shrink-0">Blockchain is decentralized by design — but who actually <span className="text-foreground font-semibold">runs</span> the nodes matters just as much as the protocol rules.</p>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">

            {/* Left: cloud concentration */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">The hidden centralisation risk</p>

              <div className="p-4 bg-gradient-to-br from-[#f59e0b]/15 to-[#ED1C24]/10 border border-[#f59e0b]/40 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">☁️</span>
                  <h4 className="font-black text-foreground text-base">Cloud Hosting Concentration</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Even though anyone can run a node, in practice a large share of nodes are rented virtual machines hosted on a handful of cloud providers — not personal servers at home.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { provider: 'AWS', share: '~48 %', color: '#f59e0b' },
                    { provider: 'Azure', share: '~15 %', color: '#6366f1' },
                    { provider: 'GCP', share: '~10 %', color: '#39B54A' },
                  ].map(p => (
                    <div key={p.provider} className="bg-muted rounded-lg p-2 text-center">
                      <div className="font-black text-sm" style={{ color: p.color }}>{p.share}</div>
                      <div className="text-xs text-muted-foreground">{p.provider}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Estimated share of Ethereum nodes by cloud provider (2023–2024 data).
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-[#ED1C24]/15 to-transparent border border-[#ED1C24]/30 rounded-xl flex-1 flex flex-col">
                <h4 className="font-bold text-[#ED1C24] text-base mb-4">⚠️ What could go wrong?</h4>

                {/* Real-life incident */}
                <div className="mb-4 p-4 bg-[#ED1C24]/10 border border-[#ED1C24]/40 rounded-lg">
                  <p className="text-sm font-bold text-foreground mb-2">🔴 Real incident — December 7, 2021</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AWS us-east-1 suffered a major outage. Within hours, <span className="text-foreground font-semibold">Solana validators went offline</span>, Ethereum RPC providers like <span className="text-foreground font-semibold">Infura and Alchemy became unreachable</span>, and front-ends for Uniswap, OpenSea and dozens of DeFi apps stopped loading — even though the underlying protocols were perfectly fine. Users couldn't interact with "decentralized" apps because the access layer was centralized on a single AWS region.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                  <li>• A cloud provider can <span className="text-foreground font-semibold">suspend accounts</span>, removing nodes and RPC endpoints overnight with no recourse</li>
                  <li>• US sanctions could legally force AWS, Azure or GCP to <span className="text-foreground font-semibold">block entire protocols</span> or geographic regions</li>
                  <li>• The blockchain protocol stays decentralized — but the <span className="text-foreground font-semibold">infrastructure layer most users rely on</span> is not</li>
                </ul>
              </div>
            </div>

            {/* Right: solutions & mitigations */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">How the ecosystem responds</p>
              {[
                { color: '#39B54A', emoji: '🏠', title: 'Home Node Initiatives', desc: 'Projects like Ethereum\'s "Run the Majority Client" campaign and Raspberry Pi node guides actively push users to self-host nodes at home.' },
                { color: '#6366f1', emoji: '🌍', title: 'Geographic Diversity', desc: 'Node diversity across countries reduces the risk that any single jurisdiction can shut down the network. Nodes in 80+ countries run Bitcoin today.' },
                { color: '#f59e0b', emoji: '🔗', title: 'Decentralized RPC', desc: 'Projects like Pocket Network and Ankr distribute RPC access across many independent operators instead of relying on a single provider like Infura.' },
                { color: '#ED1C24', emoji: '📊', title: 'Client Diversity', desc: 'Running multiple independent software implementations (Geth, Nethermind, Besu for Ethereum) prevents a single bug from taking down the whole network.' },
              ].map(n => (
                <div key={n.title} className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl flex-1" style={{ borderColor: n.color + '30' }}>
                  <div className="text-xl shrink-0">{n.emoji}</div>
                  <div>
                    <div className="font-bold text-sm mb-0.5" style={{ color: n.color }}>{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ═══════ KEYS & SEED PHRASE — CONCEPT ═══════ */}
        <div id="s2-keys" className="h-full">
          <ConceptSlide
            title="Keys & Seed Phrase"
            description="Owning bitcoin doesn't mean holding a coin — it means holding the cryptographic key that controls an address on the network. Three things matter."
            visual={
              <div className="space-y-3 w-full">
                <DefinitionBox
                  term="🔑 Private Key"
                  definition="A massive random number, usually shown as 64 hex characters. Whoever knows it can sign transactions from the address — i.e. spend the coins. Never share, never type online."
                />
                <DefinitionBox
                  term="🔓 Public Key"
                  definition="Mathematically derived from the private key (one-way — you can't go back). Used by everyone to verify signatures. Safe to share."
                />
                <DefinitionBox
                  term="📝 Seed Phrase (BIP-39)"
                  definition="12 or 24 ordinary English words encoding the seed for your private keys. Human-friendly backup — write it on paper, store it offline. Regenerates the entire wallet on any device."
                />
                <CalloutBox type="warning" title="Lose the seed, lose the coins">
                  There is no password reset, no customer support, no recovery. The seed phrase IS the wallet. Treat it like the only key to a vault — because that's what it is.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Your wallet doesn't 'hold' bitcoin — it holds the keys that control addresses on the blockchain",
              "Each layer derives from the one above via a one-way function: seed → private → public → address",
              "Knowing the public key tells you nothing about the private key — that's what makes the system work",
              "The seed phrase is the single point of failure in a self-custodied wallet — back it up, don't digitise it",
            ]}
          />
        </div>

        {/* ═══════ KEYS — INTERACTIVE DEMO ═══════ */}
        <div id="s2-keys-demo" className="h-full">
          <WalletAnalogiesDemo />
        </div>

        {/* ═══════ 7. SECURITY MODEL ═══════ */}
        <div id="s2-security" className="h-full">
          <ConceptSlide
            title="Bitcoin Security Model"
            description="Bitcoin's security relies on economic incentives, cryptographic proofs, and decentralized verification — not trust."
            visual={
              <div className="space-y-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-2">⛏️ 51% Attack</h4>
                    <p className="text-sm text-muted-foreground">An attacker would need more hash power than the rest of the network combined — currently requiring billions of dollars in hardware and electricity</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                    <h4 className="font-bold text-[#39B54A] mb-2">🔐 Cryptographic Security</h4>
                    <p className="text-sm text-muted-foreground">SHA-256 hashing and ECDSA signatures have no known practical attacks. Breaking them requires breakthroughs that don't yet exist</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                    <h4 className="font-bold text-[#6366f1] mb-2">💰 Economic Incentives</h4>
                    <p className="text-sm text-muted-foreground">Miners profit more from honest behavior than attacks. Attacking would destroy the value of their own holdings and hardware</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-2">🌍 Decentralization</h4>
                    <p className="text-sm text-muted-foreground">No single government, company, or individual can shut down Bitcoin — nodes exist in 100+ countries</p>
                  </div>
                </div>
                <CalloutBox type="warning" title="What About Quantum Computing?">
                  Current quantum computers cannot break Bitcoin's cryptography. If they advance far enough, Bitcoin can upgrade to quantum-resistant algorithms — research is already underway.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Attacking Bitcoin costs more than cooperating with it",
              "The network has never been successfully hacked in 15+ years",
              "6 confirmations (~60 min) is considered practically irreversible",
              "Security increases as hash rate and node count grow"
            ]}
          />
        </div>

        {/* ═══════ 8a-BUILD. BUILD A MERKLE TREE — TYPE YOUR OWN TXs ═══════ */}
        <div id="s2-merkle-build" className="h-full">
          <BuildMerkleSlide />
        </div>

        {/* ═══════ 8a. MERKLE TREE — INTERACTIVE (TAMPER) ═══════ */}
        <div id="s2-merkle" className="h-full">
          <MerkleTreeDemo />
        </div>

        {/* ═══════ 8b. IMMUTABILITY — INTERACTIVE TAMPER CHAIN ═══════ */}
        <div id="s2-immutability" className="h-full">
          <ImmutableChainDemo />
        </div>

        {/* ═══════ 8c. MINING — CONCEPT ═══════ */}
        <div id="s2-mining" className="h-full">
          <ConceptSlide
            title="Mining — A Global Guessing Game"
            description="Miners don't 'create' bitcoin out of thin air. They compete to add the next page to the ledger, and the network rewards whoever wins the race."
            visual={
              <div className="space-y-3 w-full">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    { n: '1', emoji: '📥', title: 'Collect transactions',  desc: 'Miners watch the mempool and pick pending transactions, prioritising the highest fees.', color: '#6366f1' },
                    { n: '2', emoji: '🧱', title: 'Build a candidate block', desc: 'They pack the transactions into a block, point its header at the previous block, and add a counter called the nonce.',     color: '#8b5cf6' },
                    { n: '3', emoji: '🎲', title: 'Guess the nonce',        desc: 'They hash the block header, change the nonce, hash again, change again — billions of times per second.',   color: '#f59e0b' },
                    { n: '4', emoji: '🎯', title: 'Until the hash is small enough', desc: 'A valid block hash must start with a specific number of zeros — set by the current difficulty.',          color: '#ED1C24' },
                    { n: '5', emoji: '📡', title: 'Broadcast the block',    desc: 'First miner to find a valid hash sends the block to the network. Every node verifies it in a single hash check.', color: '#22d3ee' },
                    { n: '6', emoji: '💰', title: 'Collect the reward',     desc: 'The winning miner gets the block subsidy (3.125 BTC today) plus all the transaction fees in that block.',     color: '#39B54A' },
                  ].map(s => (
                    <div key={s.n} className="flex items-start gap-3 p-3 bg-card rounded-lg border" style={{ borderColor: s.color + '40' }}>
                      <div className="size-7 rounded-md flex items-center justify-center text-white text-xs font-black shrink-0" style={{ backgroundColor: s.color }}>{s.n}</div>
                      <div className="min-w-0">
                        <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                          <span>{s.emoji}</span>{s.title}
                        </div>
                        <div className="text-xs text-muted-foreground leading-snug mt-0.5">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <CalloutBox type="tip" title="Why all the effort?">
                  Proof-of-work makes rewriting history physically expensive. To overwrite a single old block you'd have to redo all the work for that block AND every block after it — faster than the rest of the world combined. With ~800 EH/s on the network, that's currently uneconomical to attempt.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Mining is a race to find a nonce that produces a small-enough hash — the only way to win is to keep guessing",
              "Difficulty automatically retargets every 2,016 blocks to keep block times around 10 minutes",
              "Honest mining earns more than attacking — that's the security argument, not just trust",
              "The reward shrinks every halving — eventually only transaction fees pay miners",
            ]}
          />
        </div>

        {/* ═══════ 8d. MINING — INTERACTIVE ═══════ */}
        <div id="s2-mining-demo" className="h-full">
          <MiningDemo />
        </div>

        {/* ═══════ 9. BITCOIN'S PROGRAMMABILITY LIMITS ═══════ */}
        <div id="s2-programmability" className="h-full flex flex-col p-5 lg:p-8 overflow-y-auto">

          <div className="shrink-0 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Bitcoin Wasn't Built to Be Programmable</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              By design, Bitcoin prioritises security and simplicity over flexibility — but that left a gap others tried to fill.
            </p>
          </div>

          {/* 1 — PREMISE: what Bitcoin Script IS */}
          <div className="shrink-0 bg-card border border-[#f59e0b]/40 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="size-10 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center text-xl shrink-0">📜</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b]">The premise</span>
                </div>
                <h3 className="font-bold text-foreground mb-1.5">Bitcoin Script — Simple by Design</h3>
                <p className="text-sm text-muted-foreground">
                  Bitcoin <em>does</em> have a built-in scripting language called <span className="text-foreground font-medium">Bitcoin Script</span>. It handles conditions like "spend only with two signatures" or "unlock after a time delay". But it is intentionally <span className="text-foreground font-medium">not Turing-complete</span> — no loops, no persistent state, no complex logic.
                </p>
                <div className="mt-2 px-3 py-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-md text-xs text-muted-foreground italic">
                  Satoshi's reasoning: a simpler language has a smaller attack surface. The fewer things it can do, the fewer ways it can go wrong.
                </div>
              </div>
            </div>
          </div>

          {/* 2 — TIMELINE: workarounds the community tried */}
          <div className="shrink-0 mb-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6366f1]">The workarounds</span>
              <span className="text-xs text-muted-foreground">— bolted on top of Bitcoin Script</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { year: '2012', name: 'Colored Coins',          desc: 'Encode metadata in Bitcoin transactions to represent real-world assets. Clever, but very limited.' },
                { year: '2013', name: 'Mastercoin / Omni Layer', desc: 'A protocol layer on top of Bitcoin. Enabled token creation. Still constrained by Bitcoin Script.' },
                { year: '2014', name: 'Counterparty',           desc: 'Added smart-contract-like features by encoding data into Bitcoin transactions. Functional, but hacky and slow.' },
              ].map((item, idx) => (
                <div key={item.name} className="relative bg-card border border-border rounded-xl p-3 flex flex-col">
                  <div className="absolute -top-2 left-3 px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono font-bold text-[#f59e0b]">
                    {item.year}
                  </div>
                  <div className="flex items-start justify-between mb-1 pt-1">
                    <span className="font-bold text-foreground text-sm leading-tight">{item.name}</span>
                    <span className="size-5 rounded bg-[#6366f1]/20 flex items-center justify-center text-[10px] shrink-0 ml-2">🧪</span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-snug">{item.desc}</div>
                  {idx < 2 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground text-sm">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3 — VERDICT: hard limits vs the pivot */}
          <div className="flex-1 min-h-[260px] grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Hard limits — what no workaround could fix */}
            <div className="bg-card border-2 border-[#ED1C24]/40 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="size-7 rounded-lg bg-[#ED1C24]/20 flex items-center justify-center text-sm">🚧</span>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#ED1C24]">The hard limits</div>
                  <h3 className="font-bold text-foreground leading-tight">What no workaround could fix</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1.5 mt-1">
                {[
                  { label: 'Complex smart contracts',    why: 'No loops, no state' },
                  { label: 'Decentralised apps (dApps)', why: 'No persistent logic' },
                  { label: 'On-chain tokens & NFTs',     why: 'No native token standard' },
                  { label: 'Autonomous on-chain rules',  why: 'Script too restrictive' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between gap-3 bg-muted/40 rounded-lg px-2.5 py-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[#ED1C24] font-bold text-sm shrink-0">✗</span>
                      <span className="text-sm font-medium text-foreground truncate">{item.label}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0 text-right">{item.why}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* The pivot — Vitalik & Ethereum */}
            <div className="bg-gradient-to-br from-[#627EEA]/15 to-[#39B54A]/10 border border-[#627EEA]/40 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="size-7 rounded-lg bg-[#627EEA]/20 flex items-center justify-center text-sm">💡</span>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#627EEA]">The pivot</div>
                  <h3 className="font-bold text-foreground leading-tight">A new blockchain instead of patching this one</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                In 2013, a 19-year-old named <span className="text-foreground font-medium">Vitalik Buterin</span> asked: <em>"What if, instead of adding features on top of Bitcoin, we built a new blockchain designed from the ground up to run any program?"</em>
              </p>
              <p className="text-sm text-muted-foreground">
                Bitcoin's core community largely rejected adding more programmability — they wanted to keep it simple and focused. That rejection became the direct motivation for <span className="text-foreground font-medium">Ethereum</span>.
              </p>
              <div className="mt-auto px-3 py-2 bg-[#627EEA]/10 border border-[#627EEA]/30 rounded-lg text-xs text-[#627EEA] font-medium text-center">
                → The story continues in Section 3
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ 9b. WHAT BITCOIN CAN'T DO ═══════ */}
        <div id="s2-limits" className="h-full">
          <ConceptSlide
            title="What Bitcoin Can't Do"
            description="Bitcoin is deliberately limited. The choices that make it secure and scarce also rule out a lot of things. Knowing what it can't do is more honest than pretending it does everything."
            visual={
              <div className="space-y-3 w-full">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-gradient-to-br from-[#ED1C24]/15 to-transparent rounded-xl border-2 border-[#ED1C24]/40">
                    <div className="flex items-center gap-2 mb-1.5">
                      <ShieldX className="size-4 text-[#ED1C24]" />
                      <h4 className="font-bold text-[#ED1C24]">No real programmability</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">
                      Bitcoin's scripting language is intentionally simple. You can send coins, lock them, multi-sign — but you can't build apps, DAOs, NFT marketplaces, or anything stateful.{' '}
                      <strong className="text-foreground/80">That's Ethereum's job.</strong>
                    </p>
                  </div>
                  <div className="p-3.5 bg-gradient-to-br from-[#f59e0b]/15 to-transparent rounded-xl border-2 border-[#f59e0b]/40">
                    <div className="flex items-center gap-2 mb-1.5">
                      <AlertTriangle className="size-4 text-[#f59e0b]" />
                      <h4 className="font-bold text-[#f59e0b]">Low throughput</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">
                      ~7 transactions per second on the base layer. Visa does ~24,000. Bitcoin is built for settlement, not retail point-of-sale.{' '}
                      <strong className="text-foreground/80">Lightning Network adds a layer on top for fast small payments.</strong>
                    </p>
                  </div>
                  <div className="p-3.5 bg-gradient-to-br from-[#6366f1]/15 to-transparent rounded-xl border-2 border-[#6366f1]/40">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">⚡</span>
                      <h4 className="font-bold text-[#6366f1]">Slow finality</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">
                      ~10 minutes per block, ~60 minutes for a transaction to be considered irreversible. Fine for moving wealth, painful for buying coffee.
                    </p>
                  </div>
                  <div className="p-3.5 bg-gradient-to-br from-[#8b5cf6]/15 to-transparent rounded-xl border-2 border-[#8b5cf6]/40">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">🔋</span>
                      <h4 className="font-bold text-[#8b5cf6]">Energy-hungry</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">
                      Proof of Work uses real electricity by design — that's what makes attacks expensive. Whether the tradeoff is worth it is genuinely debated.
                    </p>
                  </div>
                </div>
                <CalloutBox type="tip" title="So why is it still the canonical example?">
                  Because the things Bitcoin <em>does</em> do, it does at a quality nothing else has matched yet: 15+ years of uninterrupted operation, an immovable supply cap, total resistance to censorship, and a security budget paid for in electricity rather than trust.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Bitcoin is deliberately a single-purpose tool: be digital, scarce, hard-to-stop money",
              "Want programmable money or rich applications? That's the next course — Smart Contracts on Ethereum and similar chains",
              "Want faster, cheaper payments? Layer-2 networks like Lightning sit on top of Bitcoin's settlement layer",
              "Want to compare Bitcoin to other platforms? Course 3 — Blockchain Platforms — does that head-on",
            ]}
          />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s2-quiz" className="h-full">
          <QuizSlide
            question="Why can there never be more than 21 million Bitcoin?"
            options={[
              {
                text: "A government regulation limits the supply",
                correct: false
              },
              {
                text: "The rule is enforced by code: every node rejects blocks that violate it",
                correct: true
              },
              {
                text: "Satoshi Nakamoto manually controls the issuance",
                correct: false
              },
              {
                text: "Mining hardware physically cannot produce more",
                correct: false
              }
            ]}
            explanation="The 21 million limit is enforced by Bitcoin's consensus rules. Every full node independently verifies that new blocks follow the supply schedule. Changing this would require convincing the vast majority of the network to adopt new rules — a practical impossibility."
          />
        </div>

        {/* Quiz: security */}
        <div className="h-full">
          <QuizSlide
            question="Why is a 51% attack on Bitcoin considered economically irrational?"
            options={[
              { text: "Because Bitcoin is protected by government regulations", correct: false },
              { text: "Because the cost far exceeds potential profit, and success would destroy the attacker's own holdings", correct: true },
              { text: "Because only 49% of nodes can ever be compromised at once", correct: false },
              { text: "Because Satoshi Nakamoto can reverse any malicious transactions", correct: false }
            ]}
            explanation="A successful 51% attack would require billions in hardware and electricity. Even if it succeeded, it would crash Bitcoin's price — destroying the value of the attacker's own coins and equipment. Honest mining is simply more profitable."
          />
        </div>

        {/* Quiz: Byzantine Generals Problem */}
        <div className="h-full">
          <QuizSlide
            question="What was Bitcoin's key insight for solving the Byzantine Generals Problem?"
            options={[
              { text: "Appointing a trusted coordinator node to validate all messages", correct: false },
              { text: "Encrypting all communications between nodes so traitors can't intercept them", correct: false },
              { text: "Making dishonest behaviour economically irrational through Proof of Work", correct: true },
              { text: "Requiring every node to know the identity of every other node", correct: false }
            ]}
            explanation="Bitcoin doesn't try to eliminate dishonest participants — it makes cheating unprofitable. Proof of Work forces attackers to expend real energy and hardware. The cost of a successful attack always exceeds the potential gain, so rational actors stay honest."
          />
        </div>

        {/* Quiz: Node types */}
        <div className="h-full">
          <QuizSlide
            question="Which node type performs full validation of the entire blockchain history but then discards old block data to save disk space?"
            options={[
              { text: "SPV / Light Node", correct: false },
              { text: "Mining Node", correct: false },
              { text: "Full Node", correct: false },
              { text: "Pruned Node", correct: true }
            ]}
            explanation="A pruned node downloads and validates every block from genesis — enforcing all consensus rules — then deletes raw block data older than a configurable threshold. Unlike an SPV node, it doesn't trust others for validation; unlike a full node, it doesn't keep the entire history on disk."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s2-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 2 — Key Takeaways"
            takeaways={[
              "Bitcoin is a decentralized, permissionless digital currency with a fixed supply of 21 million coins",
              "Immutability comes from cryptographic block linking — altering any block cascades through the entire chain",
              "The halving mechanism creates predictable, decreasing issuance — making Bitcoin deflationary",
              "The network's security comes from massive hash power, global node distribution, and economic incentives",
              "A 51% attack is theoretically possible but economically irrational at Bitcoin's scale",
              "Bitcoin has maintained 99.99% uptime since its launch in 2009 — the most reliable financial network ever created"
            ]}
          />
        </div>
      </div>
      </div>
    </div>
  );
}