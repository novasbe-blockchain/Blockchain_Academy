import { useEffect, useState } from 'react';
import { TitleSlide } from '../components/templates/TitleSlide';
import { ConceptSlide } from '../components/templates/ConceptSlide';
import { ComparisonSlide } from '../components/templates/ComparisonSlide';
import { QuizSlide } from '../components/templates/QuizSlide';
import { TakeawaySlide } from '../components/templates/TakeawaySlide';
import { CalloutBox } from '../components/shared/CalloutBox';
import { DefinitionBox } from '../components/shared/DefinitionBox';
import { Bitcoin, Eye, EyeOff } from 'lucide-react';
import { SectionNav } from '../components/navigation/SectionNav';

const section2Chapters = [
  { id: 's2-breakthrough', label: 'Bitcoin Breakthrough' },
  { id: 's2-what', label: 'What is Bitcoin?' },
  { id: 's2-byzantine', label: 'Byzantine Problem' },
  { id: 's2-doublespend', label: 'Double-Spending' },
  { id: 's2-supply', label: '🧩 Supply Model' },
  { id: 's2-stats', label: 'Network Statistics' },
  { id: 's2-nodes', label: 'Node Distribution' },
  { id: 's2-keys', label: 'Keys & Seed Phrase' },
  { id: 's2-keys-demo', label: '🧩 Build a Wallet' },
  { id: 's2-security', label: 'Security Model' },
  { id: 's2-merkle', label: '🧩 Merkle Tree' },
  { id: 's2-immutability', label: '🧩 Immutability' },
  { id: 's2-mining', label: 'Mining' },
  { id: 's2-mining-demo', label: '🧩 Find a Nonce' },
  { id: 's2-programmability', label: 'Programmability' },
  { id: 's2-quiz', label: 'Quizzes' },
  { id: 's2-takeaways', label: 'Takeaways' },
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
}

function hashShort(input: string): string {
  return pseudoHash(0, input).slice(0, 12);
}

const INITIAL_BLOCKS: { num: number; data: string }[] = [
  { num: 902450, data: 'Alice → Bob: 0.5 BTC' },
  { num: 902451, data: 'Bob → Carol: 0.25 BTC' },
  { num: 902452, data: 'Carol → Dave: 0.10 BTC' },
  { num: 902453, data: 'Dave → Erin: 0.05 BTC' },
];

function buildChain(initial: typeof INITIAL_BLOCKS): ChainBlock[] {
  const chain: ChainBlock[] = [];
  let prev = '0000000000…GENESIS';
  for (const b of initial) {
    chain.push({ num: b.num, data: b.data, originalData: b.data, prevHashStored: prev });
    // The block's hash that lives in the ledger (frozen at "time of mining")
    prev = hashShort(`${b.num}|${prev}|${b.data}`);
  }
  return chain;
}

function ImmutableChainDemo() {
  const [chain, setChain] = useState<ChainBlock[]>(() => buildChain(INITIAL_BLOCKS));

  const updateData = (i: number, newData: string) => {
    setChain(prev => prev.map((b, idx) => idx === i ? { ...b, data: newData } : b));
  };

  const resetAll = () => setChain(buildChain(INITIAL_BLOCKS));

  // Compute each block's CURRENT hash from its stored prev + (possibly tampered) data.
  const currentHashes = chain.map(b => hashShort(`${b.num}|${b.prevHashStored}|${b.data}`));

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

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-3 items-stretch">
        {chain.map((b, i) => {
          const broken = isBroken[i];
          const tampered = isTampered[i];
          const status = broken ? 'broken' : tampered ? 'tampered' : 'valid';
          const ringColor = status === 'valid' ? '#39B54A' : '#ED1C24';

          return (
            <div key={i} className="flex items-stretch gap-2 min-w-0">
              <div
                className="flex-1 min-w-0 rounded-xl border-2 p-3 flex flex-col gap-2 transition-colors"
                style={{
                  borderColor: ringColor + (status === 'valid' ? '60' : 'CC'),
                  backgroundColor: status === 'valid' ? ringColor + '08' : ringColor + '12',
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="font-bold text-foreground">Block #{b.num}</div>
                  <div
                    className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest"
                    style={{ color: ringColor, backgroundColor: ringColor + '20' }}
                  >
                    {status === 'valid' ? '✓ valid' : status === 'tampered' ? '⚠ edited' : '✗ broken'}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Prev hash</div>
                  <div className="font-mono text-[11px] text-foreground truncate" title={b.prevHashStored}>
                    {b.prevHashStored}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Transaction</div>
                  <input
                    type="text"
                    value={b.data}
                    onChange={e => updateData(i, e.target.value)}
                    className="w-full px-2 py-1 rounded bg-card border text-xs font-mono text-foreground focus:outline-none focus:ring-1 transition-colors"
                    style={{
                      borderColor: tampered ? '#ED1C24' : 'var(--border)',
                    }}
                  />
                </div>

                <div className="mt-auto">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">This block's hash</div>
                  <div className="font-mono text-[11px] font-bold" style={{ color: tampered ? '#ED1C24' : '#39B54A' }}>
                    {currentHashes[i]}
                    {tampered && <span className="text-muted-foreground font-normal text-[10px]"> (recomputed)</span>}
                  </div>
                </div>
              </div>

              {/* Link arrow to next block */}
              {i < chain.length - 1 && (
                <div className="hidden lg:flex flex-col items-center justify-center shrink-0 w-3">
                  <div className="text-xs font-bold" style={{ color: isBroken[i + 1] ? '#ED1C24' : '#39B54A' }}>
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

      <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto">
        {/* Root */}
        <div className="flex justify-center">
          <div
            className="px-4 py-2 rounded-lg border-2 text-center transition-colors"
            style={{
              borderColor: root?.changed ? '#ED1C24' : '#39B54A',
              backgroundColor: (root?.changed ? '#ED1C24' : '#39B54A') + '12',
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest"
                 style={{ color: root?.changed ? '#ED1C24' : '#39B54A' }}>
              {root?.changed ? '⚠ Merkle root changed' : '✓ Merkle root'}
            </div>
            <div className="font-mono font-black text-sm text-foreground mt-0.5">{root?.hash ?? '—'}</div>
          </div>
        </div>

        {/* Inner levels (top-down, excluding root and leaves) */}
        {changedLevels.slice(1, -1).reverse().map((lvl, lvlIdx) => (
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

// ─── Interactive: Build a Wallet ────────────────────────────────────────────

// Small curated subset of the BIP39 wordlist — enough variety for a believable
// demo without bundling the full 2048-word file.
const BIP39_WORDS = [
  'abandon', 'ability', 'about', 'absorb', 'absurd', 'abuse', 'access', 'accident',
  'accuse', 'acoustic', 'acquire', 'across', 'action', 'actor', 'actual', 'adapt',
  'address', 'advance', 'affair', 'afford', 'afraid', 'again', 'agent', 'agree',
  'ahead', 'aim', 'air', 'album', 'alert', 'alien', 'alley', 'allow',
  'almost', 'alone', 'alpha', 'already', 'also', 'alter', 'always', 'amateur',
  'amazing', 'amber', 'amused', 'analyst', 'anchor', 'angle', 'angry', 'animal',
  'announce', 'answer', 'apology', 'appear', 'apple', 'arch', 'arctic', 'area',
  'armor', 'army', 'around', 'arrest', 'arrow', 'art', 'artist', 'aspect',
  'asset', 'assist', 'attack', 'aunt', 'author', 'auto', 'avocado', 'awake',
  'aware', 'awesome', 'awful', 'awkward', 'baby', 'badge', 'balance', 'ball',
];

async function sha256Hex(input: string): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    // Fallback for older environments — produce a stable-looking pseudo-hash.
    let h = '';
    for (let i = 0; i < 32; i++) h += ((input.charCodeAt(i % input.length) * 17 + i) & 0xff).toString(16).padStart(2, '0');
    return h;
  }
  const buf  = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function pickWords(n: number): string[] {
  const picked: string[] = [];
  const pool = [...BIP39_WORDS];
  // Use crypto-strong randomness where available
  const rand = (max: number) => {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0] % max;
    }
    return Math.floor(Math.random() * max);
  };
  for (let i = 0; i < n; i++) {
    const idx = rand(pool.length);
    picked.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return picked;
}

interface Wallet { seed: string[]; priv: string; pub: string; address: string }

function shortHex(hex: string, head = 6, tail = 4) {
  if (hex.length <= head + tail + 3) return hex;
  return `${hex.slice(0, head)}…${hex.slice(-tail)}`;
}

function BuildWalletDemo() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [revealed, setRevealed] = useState<number>(0); // 0..4 — how many layers shown
  const [showPriv, setShowPriv] = useState(false);
  const [showSeed, setShowSeed] = useState(false);
  const [signing, setSigning] = useState<'idle' | 'busy' | 'done'>('idle');

  const generate = async () => {
    setRevealed(0);
    setShowPriv(false);
    setShowSeed(false);
    setSigning('idle');
    const seed = pickWords(12);
    const priv = await sha256Hex('seed:' + seed.join(' '));
    const pub  = '02' + (await sha256Hex('pub:'  + priv)).slice(0, 64); // 66 chars, compressed-style
    const addrHash = await sha256Hex('addr:' + pub);
    const address = 'bc1q' + addrHash.slice(0, 38);
    setWallet({ seed, priv, pub, address });

    // Reveal each layer with a small delay so the derivation feels like a flow.
    for (let i = 1; i <= 4; i++) {
      await new Promise(r => setTimeout(r, 350));
      setRevealed(i);
    }
  };

  const reset = () => {
    setWallet(null);
    setRevealed(0);
    setShowPriv(false);
    setShowSeed(false);
    setSigning('idle');
  };

  const sign = async () => {
    if (!wallet) return;
    setSigning('busy');
    await new Promise(r => setTimeout(r, 700));
    setSigning('done');
  };

  const LAYERS = wallet ? [
    {
      i: 1, label: 'Seed Phrase',  color: '#8b5cf6',
      sub: '12 words · human-friendly backup of everything below. Lose this, lose the wallet.',
      hideable: { is: !showSeed, toggle: () => setShowSeed(v => !v) },
      body: showSeed
        ? <div className="grid grid-cols-4 gap-1.5">
            {wallet.seed.map((w, i) => (
              <div key={i} className="px-2 py-1.5 bg-[#8b5cf6]/12 border border-[#8b5cf6]/30 rounded text-xs">
                <span className="text-[9px] text-muted-foreground font-mono mr-1">{i + 1}.</span>
                <span className="font-mono text-foreground">{w}</span>
              </div>
            ))}
          </div>
        : <div className="font-mono text-xs text-muted-foreground tracking-widest py-2">• • • • • • • • • • • •</div>,
    },
    {
      i: 2, label: 'Private Key', color: '#ED1C24',
      sub: 'Derived from the seed. Holding this is what proves ownership. Never share — never type it anywhere online.',
      hideable: { is: !showPriv, toggle: () => setShowPriv(v => !v) },
      body: showPriv
        ? <div className="font-mono text-[11px] break-all text-foreground bg-[#ED1C24]/08 px-2.5 py-2 rounded border border-[#ED1C24]/25">{wallet.priv}</div>
        : <div className="font-mono text-xs text-muted-foreground bg-muted/40 px-2.5 py-2 rounded border border-border">{wallet.priv.slice(0, 4)}{'•'.repeat(56)}{wallet.priv.slice(-4)}</div>,
    },
    {
      i: 3, label: 'Public Key',  color: '#6366f1',
      sub: 'A one-way derivation of the private key. Safe to share — others use it to verify your signatures.',
      body: <div className="font-mono text-[11px] break-all text-foreground bg-[#6366f1]/08 px-2.5 py-2 rounded border border-[#6366f1]/25">{wallet.pub}</div>,
    },
    {
      i: 4, label: 'Address',     color: '#39B54A',
      sub: 'A short hash of the public key — this is what you paste when someone sends you sats.',
      body: <div className="font-mono text-[12px] break-all text-foreground bg-[#39B54A]/10 px-2.5 py-2 rounded border border-[#39B54A]/30 font-bold">{wallet.address}</div>,
    },
  ] : [];

  return (
    <div className="h-full flex flex-col p-5 lg:p-8">
      {/* Header */}
      <div className="shrink-0 flex items-start justify-between gap-4 mb-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold">🧩 Interactive</span>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">Build a Wallet</h2>
          <p className="text-sm text-muted-foreground mt-1">Generate a wallet end-to-end. Watch each layer fall out of the one above — and what's safe to share vs. what isn't.</p>
        </div>
        <div className="shrink-0 flex flex-col gap-2 items-end">
          <button
            onClick={generate}
            className="px-4 py-2 rounded-lg bg-[#f59e0b] text-white text-sm font-bold hover:bg-[#f59e0b]/90 transition-colors"
          >
            {wallet ? '🔄 Generate new' : '🎲 Generate a wallet'}
          </button>
          {wallet && (
            <button onClick={reset} className="text-[11px] text-muted-foreground hover:text-foreground underline-offset-2 hover:underline">
              ↺ clear
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 min-h-0">
        {/* Left — derivation chain */}
        <div className="flex flex-col gap-2 min-h-0 overflow-y-auto pr-1">
          {!wallet ? (
            <div className="flex-1 flex items-center justify-center text-center text-sm text-muted-foreground border border-dashed border-border rounded-xl p-8">
              Click <span className="font-bold text-foreground">Generate a wallet</span> to watch a seed phrase turn into a private key, public key, and address.
            </div>
          ) : LAYERS.map(layer => {
            const shown = revealed >= layer.i;
            return (
              <div
                key={layer.i}
                className="bg-card border rounded-xl p-3 transition-all"
                style={{
                  borderColor: shown ? layer.color + '60' : 'var(--border)',
                  opacity: shown ? 1 : 0.25,
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="size-6 rounded-md flex items-center justify-center text-white text-[10px] font-black"
                        style={{ backgroundColor: layer.color }}>{layer.i}</span>
                  <span className="font-bold text-sm" style={{ color: layer.color }}>{layer.label}</span>
                  {layer.hideable && (
                    <button onClick={layer.hideable.toggle}
                      className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted">
                      {layer.hideable.is ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                      {layer.hideable.is ? 'show' : 'hide'}
                    </button>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground mb-2 leading-snug">{layer.sub}</div>
                {shown && layer.body}
                {layer.i < 4 && shown && (
                  <div className="flex justify-center mt-1 text-[10px] text-muted-foreground">
                    <span className="font-mono">↓ one-way hash ↓</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Sign a transaction CTA */}
          {wallet && revealed >= 4 && (
            <div className="p-3 bg-gradient-to-br from-[#f59e0b]/10 to-transparent border border-[#f59e0b]/40 rounded-xl">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="font-bold text-sm text-foreground">Try signing a transaction</div>
                <button onClick={sign} disabled={signing === 'busy'}
                  className="px-3 py-1 rounded-md bg-[#f59e0b] text-white text-xs font-bold hover:bg-[#f59e0b]/90 disabled:opacity-50 transition-colors">
                  {signing === 'idle' ? '✍️ Sign' : signing === 'busy' ? 'Signing…' : '✓ Signed'}
                </button>
              </div>
              {signing === 'done' && (
                <div className="text-[11px] text-muted-foreground">
                  The private key produced a signature anyone with your <span className="font-semibold text-foreground">public key</span> can verify — without ever seeing the private key itself. That's what makes Bitcoin transactions trust-free.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right — Safe/danger rules + analogy */}
        <div className="flex flex-col gap-3 min-h-0 overflow-y-auto">
          <div className="p-4 bg-card border-2 border-[#39B54A]/40 rounded-xl">
            <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest mb-2">✅ Safe to share</div>
            <ul className="text-sm text-foreground space-y-1.5">
              <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">›</span><span><strong>Address</strong> — paste it anywhere, give it on a business card.</span></li>
              <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">›</span><span><strong>Public key</strong> — used to verify signatures, can't be used to spend.</span></li>
            </ul>
          </div>

          <div className="p-4 bg-card border-2 border-[#ED1C24]/40 rounded-xl">
            <div className="text-xs font-bold text-[#ED1C24] uppercase tracking-widest mb-2">🚫 Never share</div>
            <ul className="text-sm text-foreground space-y-1.5">
              <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">›</span><span><strong>Private key</strong> — anyone who has it can spend everything at this address.</span></li>
              <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">›</span><span><strong>Seed phrase</strong> — regenerates the private key (and every key derived from it).</span></li>
            </ul>
          </div>

          <div className="p-4 bg-muted/40 border border-border rounded-xl flex-1">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">🏦 Mental model</div>
            <div className="text-sm text-muted-foreground leading-snug space-y-2">
              <p><strong className="text-foreground">Address</strong> ≈ your bank account number — share to receive.</p>
              <p><strong className="text-foreground">Private key</strong> ≈ your debit-card PIN — proves ownership.</p>
              <p><strong className="text-foreground">Seed phrase</strong> ≈ the master backup — recreates the entire wallet from scratch on any device.</p>
            </div>
          </div>

          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-[11px] text-muted-foreground">
            <strong className="text-foreground">Note:</strong> this demo uses SHA-256 to <em>illustrate</em> one-way derivation. Real Bitcoin uses ECDSA on the secp256k1 curve plus RIPEMD-160 + base58. Don't use any value here in production.
          </div>
        </div>
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

        {/* ═══════ 3. WHAT IS BITCOIN ═══════ */}
        <div id="s2-what" className="h-full">
          <ConceptSlide
            title="What is Bitcoin?"
            description="Bitcoin is the first decentralized digital currency — a peer-to-peer electronic cash system that operates without banks, governments, or intermediaries."
            visual={
              <div className="space-y-4 w-full">
                <DefinitionBox
                  term="Bitcoin (BTC)"
                  definition="A decentralized digital currency created in 2009 by Satoshi Nakamoto. It runs on a public blockchain where transactions are verified by a global network of nodes and miners."
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-2">🌐 Permissionless</h4>
                    <p className="text-sm text-muted-foreground">Anyone can send, receive, or validate transactions without asking permission</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-2">🔓 Open Source</h4>
                    <p className="text-sm text-muted-foreground">The code is public — anyone can audit, fork, or contribute to Bitcoin Core</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                    <h4 className="font-bold text-[#39B54A] mb-2">💎 Scarce</h4>
                    <p className="text-sm text-muted-foreground">Hard-capped at 21 million coins — enforced by code, not promises</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                    <h4 className="font-bold text-[#6366f1] mb-2">⚡ Censorship Resistant</h4>
                    <p className="text-sm text-muted-foreground">No entity can freeze, reverse, or block a valid Bitcoin transaction</p>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Bitcoin is both a payment network and a unit of currency (BTC)",
              "It solved the double-spending problem without a central authority",
              "Transactions are irreversible once confirmed on-chain",
              "Bitcoin pioneered the entire cryptocurrency industry"
            ]}
          />
        </div>

        {/* ═══════ 2. BYZANTINE GENERALS PROBLEM ═══════ */}
        <div id="s2-byzantine" className="h-full">
          <ConceptSlide
            title="The Byzantine Generals Problem"
            description="How do you reach agreement when you can't trust every participant? A 27-year-old computer science puzzle — solved by Bitcoin in 2009."
            visual={
              <div className="space-y-4 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-2">⚔️ The Problem</h4>
                    <p className="text-sm text-muted-foreground">Generals surrounding a city must agree on one plan — but some are traitors sending conflicting orders. No trusted messenger exists to verify who is lying.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-2">💻 In Computing Terms</h4>
                    <p className="text-sm text-muted-foreground">Generals = nodes. Messengers = internet packets. Traitors = malicious nodes. Battle plan = shared transaction history. Any node can lie or go offline.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                    <h4 className="font-bold text-[#39B54A] mb-2">⛏️ Bitcoin's Solution</h4>
                    <p className="text-sm text-muted-foreground">Proof of Work makes lying expensive. Every block costs real energy — so cheating costs more than cooperating. The longest chain always represents the honest majority.</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                    <h4 className="font-bold text-[#6366f1] mb-2">🔢 The 51% Rule</h4>
                    <p className="text-sm text-muted-foreground">The network tolerates up to ⅓ of nodes being malicious. As long as honest nodes hold the majority of hash power, consensus is always reached correctly.</p>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Problem formalized by Lamport, Shostak & Pease in 1982",
              "Before Bitcoin, no practical solution existed for open, untrusted networks",
              "Proof of Work is the first mechanism where dishonesty is economically irrational",
              "Bitcoin achieves consensus without any central authority or trusted party"
            ]}
          />
        </div>

        {/* ═══════ DOUBLE-SPENDING ═══════ */}
        <div id="s2-doublespend" className="h-full">
          <ConceptSlide
            title="The Double-Spending Problem"
            description="Digital money can be copied like any file. Before Bitcoin, only a bank could guarantee you hadn't already spent the same coin twice."
            visual={
              <div className="space-y-3 w-full">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-1 text-sm">📋 The Attack</h4>
                    <p className="text-xs text-muted-foreground">Alice has 1 BTC. She broadcasts two transactions simultaneously — one paying Bob, one paying herself. Without a referee, both look valid. Who gets the coin?</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-1 text-sm">🏦 The Old Fix — Trust a Bank</h4>
                    <p className="text-xs text-muted-foreground">Banks keep a central ledger. When you pay, they debit your account instantly. No double-spend possible — but you must trust them 100% with your money.</p>
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
              "Account model = mutable balance · UTXO model = immutable list of unspent coins",
              "Spending a UTXO destroys it — the same output cannot be referenced twice",
              "Every node independently validates that input UTXOs still exist before accepting a tx",
              "Once buried under more blocks, a confirmed transaction is economically irreversible"
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
          <BuildWalletDemo />
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

        {/* ═══════ 8a. MERKLE TREE — INTERACTIVE ═══════ */}
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
        <div id="s2-programmability" className="h-full flex flex-col p-5 lg:p-8">

          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Bitcoin Wasn't Built to Be Programmable</h2>
            <p className="text-sm text-muted-foreground">By design, Bitcoin prioritises security and simplicity over flexibility — but that left a gap others tried to fill.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">

            {/* Left column */}
            <div className="flex flex-col gap-4 min-h-0">

              <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center text-sm">📜</span>
                  Bitcoin Script — Simple by Design
                </h3>
                <p className="text-sm text-muted-foreground">
                  Bitcoin does have a built-in scripting language called <span className="text-foreground font-medium">Bitcoin Script</span>. It can handle conditions like "spend only with two signatures" or "unlock after a time delay". But it is intentionally <span className="text-foreground font-medium">not Turing-complete</span> — there are no loops, no persistent state, and no complex logic.
                </p>
                <div className="px-3 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg text-xs text-muted-foreground italic">
                  Satoshi's reasoning: a simpler language has a smaller attack surface. The fewer things it can do, the fewer ways it can go wrong.
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-[#6366f1]/20 flex items-center justify-center text-sm">🧪</span>
                  Early Attempts to Build on Bitcoin
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2">
                    <span className="text-[#f59e0b] shrink-0 font-bold">2012</span>
                    <span><span className="text-foreground font-medium">Colored Coins</span> — encode metadata in Bitcoin transactions to represent real-world assets. Clever, but very limited.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#f59e0b] shrink-0 font-bold">2013</span>
                    <span><span className="text-foreground font-medium">Mastercoin / Omni Layer</span> — a protocol layer on top of Bitcoin. Enabled token creation. Still constrained by Bitcoin Script.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#f59e0b] shrink-0 font-bold">2014</span>
                    <span><span className="text-foreground font-medium">Counterparty</span> — added smart contract-like features by encoding data into Bitcoin transactions. Functional, but hacky and slow.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4 min-h-0">

              <div className="bg-card border-2 border-[#ED1C24]/40 rounded-xl p-4 flex flex-col gap-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-[#ED1C24]/20 flex items-center justify-center text-sm">🚧</span>
                  What You Simply Cannot Do on Bitcoin
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Complex smart contracts', why: 'No loops, no state' },
                    { label: 'Decentralised apps (dApps)', why: 'No persistent logic' },
                    { label: 'On-chain tokens & NFTs', why: 'No native token standard' },
                    { label: 'Autonomous on-chain rules', why: 'Script too restrictive' },
                  ].map(item => (
                    <div key={item.label} className="bg-muted/50 rounded-lg p-2">
                      <div className="text-xs font-bold text-foreground">✗ {item.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.why}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#627EEA]/15 to-[#39B54A]/10 border border-[#627EEA]/40 rounded-xl p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <span className="size-7 rounded-lg bg-[#627EEA]/20 flex items-center justify-center text-sm">💡</span>
                  The Question That Started Everything
                </h3>
                <p className="text-sm text-muted-foreground">
                  In 2013, a 19-year-old named <span className="text-foreground font-medium">Vitalik Buterin</span> asked: <em>"What if instead of adding features on top of Bitcoin, we built a new blockchain designed from the ground up to run any program?"</em>
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