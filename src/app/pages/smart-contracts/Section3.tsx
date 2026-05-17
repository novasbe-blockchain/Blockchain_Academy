import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { Building2 } from 'lucide-react';
import { TeamCheckpoint } from '../../components/TeamCheckpoint';

import imgDefiIntro      from '../../../assets/sc/defi-intro.png';
import imgDefiBorderless from '../../../assets/sc/defi-borderless.png';
import imgNftGaming      from '../../../assets/sc/nft-gaming.png';
import imgP2eEcosystem   from '../../../assets/sc/p2e-ecosystem.png';
import imgZhartaLoans    from '../../../assets/sc/zharta-loans.png';
import imgRwaProcess     from '../../../assets/sc/rwa-process.png';
import imgSupplyProv     from '../../../assets/sc/supply-provenance.png';
import imgGsbnEbl        from '../../../assets/sc/gsbn-ebl.png';
import imgCertDecent     from '../../../assets/sc/cert-decentralization.png';
import imgWalmart        from '../../../assets/sc/walmart-food-trust.jpg';
import imgSantander      from '../../../assets/sc/santander-bank.jpg';

const chapters = [
  { id: 's3-team-pick',        label: '🤝 Pick Your Industry' },
  { id: 's3-industries-intro', label: 'Industries Overview' },

  { kind: 'group' as const, id: 'g-defi',    label: '💸 DeFi' },
  { id: 's3-defi-intro',       label: 'Intro' },
  { id: 's3-defi-amm',         label: '🧩 AMM Curve' },
  { id: 's3-defi-dex',         label: 'DEX Examples' },
  { id: 's3-defi-stablecoins', label: '🧩 Stablecoins' },
  { id: 's3-defi-borderless',  label: 'Borderless' },
  { id: 's3-defi-prosCons',    label: 'Pros & Cons' },

  { kind: 'group' as const, id: 'g-nft',     label: '🎮 Gaming & NFTs' },
  { id: 's3-nft-intro',        label: 'Intro' },
  { id: 's3-nft-economies',    label: 'True Ownership' },
  { id: 's3-nft-p2e',          label: '🧩 Play-to-Earn' },
  { id: 's3-nft-p2e-real',     label: 'Ubisoft Example' },
  { id: 's3-nft-finance',      label: 'NFT Finance' },
  { id: 's3-nft-prosCons',     label: 'Pros & Cons' },

  { kind: 'group' as const, id: 'g-rwa',     label: '🏢 RWA' },
  { id: 's3-rwa-intro',        label: 'Intro' },
  { id: 's3-rwa-spectrum',     label: '🧩 Spectrum' },
  { id: 's3-rwa-securitize',   label: 'BUIDL' },
  { id: 's3-rwa-mortgages',    label: 'Mortgages' },
  { id: 's3-rwa-collateral',   label: 'Collateral' },
  { id: 's3-rwa-property',     label: 'Property' },
  { id: 's3-rwa-prosCons',     label: 'Pros & Cons' },

  { kind: 'group' as const, id: 'g-sc',      label: '🚚 Supply Chain' },
  { id: 's3-sc-intro',         label: 'Intro' },
  { id: 's3-sc-provenance',    label: '🧩 Provenance' },
  { id: 's3-sc-prov-real',     label: 'LVMH & Carrefour' },
  { id: 's3-sc-shipping',      label: 'Shipping' },
  { id: 's3-sc-prosCons',      label: 'Pros & Cons' },

  { kind: 'group' as const, id: 'g-cert',    label: '📜 Certification' },
  { id: 's3-cert-intro',       label: 'Intro' },
  { id: 's3-cert-howitworks',  label: '🧩 Proof of Exist' },
  { id: 's3-cert-law',         label: 'Estonia KSI' },
  { id: 's3-cert-education',   label: 'MIT Blockcerts' },
  { id: 's3-cert-products',    label: 'AURA Luxury' },
  { id: 's3-cert-prosCons',    label: 'Pros & Cons' },

  { kind: 'group' as const, id: 'g-cases',   label: '📁 Case Studies' },
  { id: 's3-cases-intro',      label: 'Overview' },
  { id: 's3-homedepot',        label: 'Home Depot' },
  { id: 's3-realestate',       label: 'Propy' },
  { id: 's3-dmv',              label: 'CA DMV' },
  { id: 's3-walmart',          label: 'Walmart' },
  { id: 's3-santander',        label: 'Santander' },

  { kind: 'group' as const, id: 'g-close',   label: '✅ Wrap Up' },
  { id: 's3-exercise',         label: '🧩 Design Your Own' },
  { id: 's3-quiz',             label: 'Quiz' },
  { id: 's3-takeaways',        label: 'Takeaways' },
  { id: 's3-summary',          label: 'Summary' },
];

// ─── Industry Vertical Divider ───────────────────────────────────────────────

function VerticalDivider({
  emoji, title, subtitle, color, image,
}: { emoji: string; title: string; subtitle: string; color: string; image?: string }) {
  return (
    <div className="h-full flex items-center justify-center p-10">
      <div className="text-center max-w-2xl">
        {image ? (
          <img src={image} alt="" className="mx-auto mb-4 h-40 lg:h-48 object-contain" />
        ) : (
          <div className="text-7xl mb-5">{emoji}</div>
        )}
        <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>
          {emoji} &nbsp; Industry Vertical
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-3">{title}</h2>
        <p className="text-base text-muted-foreground leading-relaxed">{subtitle}</p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: color + '40', backgroundColor: color + '10' }}>
          <span className="text-xs font-semibold" style={{ color }}>↓ Scroll for the full vertical</span>
        </div>
      </div>
    </div>
  );
}

// ─── Pros / Cons Slide Helper ────────────────────────────────────────────────

function ProsConsSlide({
  title, accent, pros, cons,
}: {
  title: string; accent: string;
  pros: { label: string; desc: string }[];
  cons: { label: string; desc: string }[];
}) {
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-5">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2 overflow-y-auto">
          <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest mb-1">✓ Pros</div>
          {pros.map(p => (
            <div key={p.label} className="p-3 bg-card border border-[#39B54A]/25 rounded-xl">
              <div className="font-bold text-sm text-foreground">{p.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto">
          <div className="text-xs font-bold text-[#ED1C24] uppercase tracking-widest mb-1">✗ Cons</div>
          {cons.map(c => (
            <div key={c.label} className="p-3 bg-card border border-[#ED1C24]/25 rounded-xl">
              <div className="font-bold text-sm text-foreground">{c.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 mt-3 h-1 rounded-full" style={{ backgroundColor: accent + '30' }} />
    </div>
  );
}

// ─── Interactive AMM Bonding Curve ───────────────────────────────────────────

function InteractiveAMM() {
  // Initial pool: 1000 ETH × 1000 USDC (k = 1,000,000)
  const X0 = 1000;
  const Y0 = 1000;
  const k  = X0 * Y0;

  // Trade size in ETH (X). Negative = sell ETH (add X), positive = buy ETH (remove X).
  const [dx, setDx] = useState(0);

  // After-trade reserves
  const newX = Math.max(1, X0 - dx); // buy: remove dx ETH; sell: add |dx|
  const newY = k / newX;
  const dyAbs = Math.abs(newY - Y0);
  const action = dx > 0 ? 'buy' : dx < 0 ? 'sell' : 'idle';

  // Effective price per ETH paid/received
  const effectivePrice = dx !== 0 ? dyAbs / Math.abs(dx) : Y0 / X0;
  // Spot price before trade
  const spotPrice = Y0 / X0; // = 1.000 USDC per ETH initially
  const slippage = dx !== 0 ? ((effectivePrice / spotPrice) - 1) * 100 : 0;

  // Build curve points for SVG (x from 100 to 5000, y = k/x)
  const W = 360, H = 220;
  const xMin = 100, xMax = 5000;
  const yMin = k / xMax, yMax = k / xMin;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * (W - 30) + 22;
  const sy = (y: number) => H - 24 - ((y - yMin) / (yMax - yMin)) * (H - 36);

  const points: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = xMin + (i / 60) * (xMax - xMin);
    const y = k / x;
    points.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">AMM Bonding Curve · <code className="text-[#6366f1]">x · y = k</code></h2>
        <p className="text-muted-foreground text-sm">Drag the slider to simulate trading on a Uniswap-style pool. Watch how the curve, prices, and slippage move in real time.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">

        {/* Left: chart + slider */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="p-3 bg-card border border-border rounded-xl flex-1 min-h-0 flex flex-col">
            <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center justify-between">
              <span>Constant-product curve</span>
              <span className="font-mono text-[#6366f1]">k = {k.toLocaleString()}</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full flex-1">
              {/* Axes */}
              <line x1="22" y1={H - 24} x2={W - 8} y2={H - 24} stroke="currentColor" strokeOpacity="0.2" />
              <line x1="22" y1="6"        x2="22"     y2={H - 24} stroke="currentColor" strokeOpacity="0.2" />
              <text x="22" y={H - 4} fontSize="9" fill="currentColor" opacity="0.5">x = ETH reserve</text>
              <text x="6" y="14" fontSize="9" fill="currentColor" opacity="0.5">y = USDC</text>

              {/* Curve */}
              <polyline points={points.join(' ')} fill="none" stroke="#6366f1" strokeWidth="2" />

              {/* Initial point (X0, Y0) */}
              <circle cx={sx(X0)} cy={sy(Y0)} r="5" fill="#9ca3af" />
              <text x={sx(X0) + 8} y={sy(Y0) - 6} fontSize="9" fill="#9ca3af">start</text>

              {/* Current point */}
              <circle cx={sx(newX)} cy={sy(newY)} r="6" fill={action === 'buy' ? '#ED1C24' : action === 'sell' ? '#39B54A' : '#9ca3af'} />
              <text x={sx(newX) + 9} y={sy(newY) + 4} fontSize="10" fontWeight="bold"
                fill={action === 'buy' ? '#ED1C24' : action === 'sell' ? '#39B54A' : '#9ca3af'}>
                now
              </text>

              {/* Trade arrow */}
              {dx !== 0 && (
                <line
                  x1={sx(X0)} y1={sy(Y0)}
                  x2={sx(newX)} y2={sy(newY)}
                  stroke={action === 'buy' ? '#ED1C24' : '#39B54A'}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              )}
            </svg>
          </div>

          {/* Slider */}
          <div className="shrink-0 p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Your trade</div>
              <button
                onClick={() => setDx(0)}
                className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground hover:bg-muted/70"
              >
                ↺ reset
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#39B54A] font-semibold w-20 text-right">Sell ETH</span>
              <input
                type="range"
                min={-500}
                max={500}
                step={10}
                value={dx}
                onChange={e => setDx(Number(e.target.value))}
                className="flex-1 accent-[#6366f1]"
              />
              <span className="text-xs text-[#ED1C24] font-semibold w-20">Buy ETH</span>
            </div>
            <div className="text-center mt-1 text-sm font-mono">
              {dx === 0 ? <span className="text-muted-foreground">no trade</span>
                : dx > 0 ? <span className="text-[#ED1C24]">Buying {dx} ETH</span>
                : <span className="text-[#39B54A]">Selling {-dx} ETH</span>}
            </div>
          </div>
        </div>

        {/* Right: numbers */}
        <div className="flex flex-col gap-3 min-h-0 overflow-y-auto">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Pool reserves</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] text-muted-foreground">ETH (X)</div>
              <div className="font-mono font-black text-base text-foreground">{newX.toFixed(2)}</div>
              <div className="text-[10px] text-muted-foreground">was {X0}</div>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] text-muted-foreground">USDC (Y)</div>
              <div className="font-mono font-black text-base text-foreground">{newY.toFixed(2)}</div>
              <div className="text-[10px] text-muted-foreground">was {Y0}</div>
            </div>
          </div>

          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">Pricing</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] text-muted-foreground">Spot price (pre-trade)</div>
              <div className="font-mono font-black text-base text-[#6366f1]">{spotPrice.toFixed(4)}</div>
              <div className="text-[10px] text-muted-foreground">USDC per ETH</div>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl">
              <div className="text-[10px] text-muted-foreground">Effective price you pay</div>
              <div className="font-mono font-black text-base" style={{ color: action === 'buy' ? '#ED1C24' : action === 'sell' ? '#39B54A' : '#9ca3af' }}>
                {effectivePrice.toFixed(4)}
              </div>
              <div className="text-[10px] text-muted-foreground">USDC per ETH</div>
            </div>
          </div>

          <div className="p-3 bg-card border-2 rounded-xl"
            style={{ borderColor: Math.abs(slippage) > 5 ? '#ED1C24' : Math.abs(slippage) > 1 ? '#f59e0b' : '#39B54A' }}>
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-foreground">Slippage</div>
              <div className="font-mono font-black text-lg"
                style={{ color: Math.abs(slippage) > 5 ? '#ED1C24' : Math.abs(slippage) > 1 ? '#f59e0b' : '#39B54A' }}>
                {slippage > 0 ? '+' : ''}{slippage.toFixed(2)}%
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {Math.abs(slippage) > 10
                ? 'Massive slippage — your trade is too large for this pool.'
                : Math.abs(slippage) > 1
                ? 'Noticeable slippage — typical for medium trades on shallow pools.'
                : 'Minimal slippage — small trade on a deep pool.'}
            </p>
          </div>

          <div className="p-3 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl text-xs text-muted-foreground">
            <div className="font-bold text-[#6366f1] mb-1">The invariant</div>
            <p>The product <code className="text-foreground">x · y</code> stays constant at <code className="text-foreground">{k.toLocaleString()}</code>. Buy more ETH → reserves shrink → price rises hyperbolically. There's no order book — just the curve.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Interactive RWA Spectrum ────────────────────────────────────────────────

const RWA_TIERS = [
  { id: 'sov',      label: 'Sovereign Debt',      complexity: 1, desc: 'Treasuries, gov bonds. Lowest legal complexity, deepest market, most institutional appetite.', adoption: 'BlackRock BUIDL, Franklin BENJI, Ondo OUSG', color: '#39B54A' },
  { id: 'pubeq',    label: 'Public Equities',     complexity: 2, desc: 'Listed stocks. Need broker-dealer wrapping; SEC restrictions apply.', adoption: 'Backed Finance (Switzerland), Dinari', color: '#22d3ee' },
  { id: 'corpbond', label: 'Corporate Bonds',     complexity: 3, desc: 'Issued by companies. Settlement on-chain saves significant cost vs Euroclear/DTCC.', adoption: 'Santander Ethereum bond ($20M, 2019), EIB digital bond', color: '#6366f1' },
  { id: 'credit',   label: 'Private Credit',      complexity: 4, desc: 'Loans to private firms. KYC heavy; profitable but illiquid.', adoption: 'Maple, Centrifuge, Goldfinch', color: '#8b5cf6' },
  { id: 'struct',   label: 'Structured Credit',   complexity: 5, desc: 'CLOs, CDOs. Complex tranching → hardest to standardize on-chain.', adoption: 'Securitize × BNY Mellon (AAA structured credit)', color: '#a855f7' },
  { id: 'funds',    label: 'Funds & Fund Interests', complexity: 6, desc: 'Tokenized LP/GP interests. Allows fractionalisation of historically illiquid funds.', adoption: 'Hamilton Lane on Securitize, Apollo digital partnership', color: '#d946ef' },
  { id: 'commod',   label: 'Commodities',         complexity: 6, desc: 'Gold, oil, agricultural. Need custodian + audit infrastructure.', adoption: 'PAXG (gold), tokenized gold by Tether (XAUT)', color: '#ec4899' },
  { id: 'trade',    label: 'Trade Finance',       complexity: 7, desc: 'Letters of credit, invoice factoring. Deeply paper-bound; eBL networks help.', adoption: 'GSBN (eBL), Marco Polo, We.trade (defunct)', color: '#f43f5e' },
  { id: 'realest',  label: 'Real Estate',         complexity: 8, desc: 'Physical property. Legal title transfer the hardest part.', adoption: 'Propy (NFT deeds), Brickblock, Zurich Bahnhofstrasse', color: '#f59e0b' },
  { id: 'infra',    label: 'Infrastructure',      complexity: 9, desc: 'Roads, energy, telecom. Long horizons + complex stakeholders.', adoption: 'Rare on-chain examples; mostly conceptual today', color: '#ED1C24' },
];

function RWASpectrum() {
  const [selected, setSelected] = useState<string>('sov');
  const tier = RWA_TIERS.find(t => t.id === selected)!;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#39B54A]/15 border border-[#39B54A]/40 text-[#39B54A] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">Tokenization Spectrum · Easier → Harder</h2>
        <p className="text-muted-foreground text-sm">Click any asset class to see the complexity factors and current adoption examples.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-5">
        {/* Left: spectrum bars */}
        <div className="col-span-2 flex flex-col gap-2 overflow-y-auto pr-2">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span>← Easier to tokenize</span>
            <span>Harder to tokenize →</span>
          </div>
          {RWA_TIERS.map(t => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className="text-left p-2 rounded-xl border-2 transition-all hover:scale-[1.01]"
              style={{
                borderColor: selected === t.id ? t.color : 'transparent',
                backgroundColor: selected === t.id ? t.color + '12' : 'var(--card)',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="font-bold text-sm shrink-0 w-44 text-foreground">{t.label}</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${t.complexity * 10}%`, backgroundColor: t.color }} />
                </div>
                <div className="font-mono font-bold text-xs w-10 text-right" style={{ color: t.color }}>{t.complexity}/10</div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: details */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-5 bg-card border-2 rounded-xl flex flex-col gap-3"
          style={{ borderColor: tier.color + '60' }}
        >
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-xl flex items-center justify-center font-black text-white" style={{ backgroundColor: tier.color }}>
              {tier.complexity}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: tier.color }}>Asset Class</div>
              <div className="font-black text-foreground">{tier.label}</div>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-xs font-semibold text-foreground mb-1">Why this complexity score?</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{tier.desc}</p>
          </div>
          <div className="p-3 rounded-lg flex-1" style={{ backgroundColor: tier.color + '10' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: tier.color }}>Adoption today</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{tier.adoption}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Interactive Proof-of-Existence (SHA-256) ────────────────────────────────

async function sha256Hex(input: string): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle) return '0000…unavailable';
  const buf  = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function ProofOfExistenceDemo() {
  const [doc, setDoc]   = useState('Bachelor of Science — Alice Smith — 2024-06-15');
  const [hash, setHash] = useState<string>('');
  const [anchored, setAnchored] = useState<{ hash: string; ts: number } | null>(null);
  const [verifyDoc, setVerifyDoc] = useState('');
  const [verifyHash, setVerifyHash] = useState('');

  useEffect(() => { sha256Hex(doc).then(setHash); }, [doc]);

  const onDocChange = (v: string) => setDoc(v);

  const anchor = () => setAnchored({ hash, ts: Date.now() });

  const verify = async () => {
    setVerifyHash(await sha256Hex(verifyDoc));
  };

  const verifyMatches = anchored && verifyHash && verifyHash === anchored.hash;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#22d3ee]/15 border border-[#22d3ee]/40 text-[#22d3ee] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">Proof of Existence · Try it yourself</h2>
        <p className="text-muted-foreground text-sm">Hash a credential, anchor it on-chain, then verify it. The blockchain never sees the document — only the hash.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">

        {/* Issue */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-widest">① Issue & anchor</div>
          <div className="p-3 bg-card border border-border rounded-xl flex flex-col gap-2">
            <div className="text-[10px] font-semibold text-muted-foreground">Credential text</div>
            <textarea
              value={doc}
              onChange={e => onDocChange(e.target.value)}
              rows={3}
              className="w-full p-2 bg-muted rounded-lg text-xs font-mono text-foreground resize-none border border-border focus:outline-none focus:ring-1 focus:ring-[#22d3ee]"
            />
          </div>
          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="text-[10px] font-semibold text-muted-foreground mb-1">SHA-256 hash (digital fingerprint)</div>
            <div className="font-mono text-[10px] text-[#6366f1] break-all leading-relaxed">{hash || '…'}</div>
          </div>
          <button
            onClick={anchor}
            disabled={!hash}
            className="px-4 py-2.5 rounded-xl bg-[#22d3ee] text-white text-xs font-black hover:bg-[#22d3ee]/90 disabled:opacity-40 transition-colors"
          >
            ⛓ Anchor hash to blockchain
          </button>
          {anchored && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-[#22d3ee]/10 border border-[#22d3ee]/30 rounded-xl">
              <div className="font-bold text-xs text-[#22d3ee] mb-1">✓ Anchored</div>
              <div className="text-[10px] text-muted-foreground">Block timestamp: {new Date(anchored.ts).toISOString()}</div>
              <div className="text-[10px] text-muted-foreground">Anchored hash: <span className="font-mono">{anchored.hash.slice(0, 24)}…</span></div>
            </motion.div>
          )}
        </div>

        {/* Verify */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">② Verify (anyone, anytime)</div>
          {!anchored ? (
            <div className="p-4 rounded-xl border border-dashed border-border flex-1 flex items-center justify-center text-center">
              <p className="text-xs text-muted-foreground italic">Anchor a hash first, then come back here to verify a (possibly tampered) credential.</p>
            </div>
          ) : (
            <>
              <div className="p-3 bg-card border border-border rounded-xl flex flex-col gap-2">
                <div className="text-[10px] font-semibold text-muted-foreground">Re-enter credential text</div>
                <textarea
                  value={verifyDoc}
                  onChange={e => setVerifyDoc(e.target.value)}
                  placeholder="Paste the document you want to verify…"
                  rows={3}
                  className="w-full p-2 bg-muted rounded-lg text-xs font-mono text-foreground resize-none border border-border focus:outline-none focus:ring-1 focus:ring-[#39B54A]"
                />
                <button
                  onClick={verify}
                  disabled={!verifyDoc}
                  className="self-start px-3 py-1.5 rounded-lg bg-[#39B54A] text-white text-xs font-bold hover:bg-[#39B54A]/90 disabled:opacity-40 transition-colors"
                >
                  Compute hash
                </button>
              </div>

              {verifyHash && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl border-2"
                  style={{ borderColor: verifyMatches ? '#39B54A' : '#ED1C24', backgroundColor: (verifyMatches ? '#39B54A' : '#ED1C24') + '12' }}
                >
                  <div className="font-black mb-1" style={{ color: verifyMatches ? '#39B54A' : '#ED1C24' }}>
                    {verifyMatches ? '✓ Verified — hashes match' : '✗ Mismatch — document was altered'}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground break-all leading-relaxed">
                    Computed: {verifyHash.slice(0, 32)}…<br/>
                    Anchored: {anchored.hash.slice(0, 32)}…
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>

      </div>

      <div className="shrink-0 mt-3 p-2 bg-muted/50 rounded-lg text-[11px] text-muted-foreground">
        <span className="font-semibold text-foreground">Why this works:</span> SHA-256 is deterministic and collision-resistant. Same input → same hash. Any change to the input — even a single character — produces a completely different hash. Anchoring the hash on-chain proves the document existed at that moment, without revealing its contents.
      </div>
    </div>
  );
}

// ─── Exercise: Design Your Own Mini-Brief ────────────────────────────────────

const INDUSTRIES = ['Finance', 'Supply Chain', 'Healthcare', 'Real Estate', 'Government', 'Entertainment', 'Insurance', 'Gaming'];

const EXAMPLES: Record<string, { pain: string; parties: string; trigger: string; output: string; risk: string }> = {
  Finance:       { pain: 'Cross-border payments take 3–5 days and cost 5–8% in fees', parties: 'Sender bank / Receiver bank / Blockchain', trigger: 'Sender deposits funds + recipient KYC confirmed', output: 'Funds released instantly to recipient in local currency', risk: 'Oracle needed for FX rate — potential manipulation' },
  'Supply Chain':{ pain: 'Invoice disputes between suppliers and retailers take 3–5 weeks to resolve', parties: 'Supplier / Retailer / Logistics provider', trigger: 'Delivery scan confirmed + invoice matched to PO', output: 'Payment auto-released to supplier within 24h', risk: 'IoT sensor data must come from a trusted oracle' },
  Healthcare:    { pain: 'Patient consent for data sharing is paper-based and slow', parties: 'Patient / Hospital A / Hospital B', trigger: 'Patient signs consent transaction on-chain', output: 'Access token minted — Hospital B can read specific records', risk: 'Medical data itself must stay off-chain (privacy law)' },
  'Real Estate': { pain: 'Property title transfer takes 30–60 days and costs 6% in intermediary fees', parties: 'Buyer / Seller / Title company', trigger: 'Full payment received + title search clear', output: 'Deed NFT transferred to buyer; funds released to seller', risk: 'Legal recognition of NFT as deed requires legislation' },
  Government:    { pain: 'Benefit disbursements are slow and subject to fraud', parties: 'Government / Citizens / Verifier', trigger: 'Eligibility criteria confirmed via verified credentials', output: 'Benefit amount sent directly to citizen wallet', risk: 'Off-chain identity verification is the weak point' },
  Entertainment: { pain: 'Music royalties take 18 months to reach artists through label chains', parties: 'Artist / Streaming platform / Listener', trigger: 'Each stream event recorded on-chain', output: 'Micro-payment split instantly: artist 80%, label 20%', risk: 'High transaction volume — requires L2 or rollup' },
  Insurance:     { pain: 'Flight delay claims require manual submission and 2–4 week payout', parties: 'Traveller / Insurer / Flight data oracle', trigger: 'Flight delay > 2h confirmed by oracle (FlightAware)', output: 'Fixed payout sent automatically to traveller wallet', risk: 'Oracle data quality is the single point of failure' },
  Gaming:        { pain: 'In-game assets can be deleted or altered by the developer at any time', parties: 'Player / Game developer / Marketplace', trigger: 'Player purchases or earns item in-game', output: 'NFT minted to player wallet — tradeable and permanent', risk: 'Game server still centralised; contract only covers ownership' },
};

// ─── Interactive Peg-Stability Simulator ────────────────────────────────────

type PegType = 'fiat' | 'crypto' | 'algo';

const PEG_TYPES: Record<PegType, { name: string; example: string; color: string; control: string; controlMin: number; controlMax: number; controlDefault: number; controlUnit: string; controlDesc: string }> = {
  fiat:   { name: 'Fiat-backed',           example: 'USDC · USDT',  color: '#6366f1', control: 'Reserve audit %',     controlMin: 50, controlMax: 100, controlDefault: 100, controlUnit: '%',   controlDesc: 'How much of circulating supply is provably backed in a bank/T-bills' },
  crypto: { name: 'Crypto-collateralized', example: 'DAI · LUSD',   color: '#8b5cf6', control: 'Collateral ratio',    controlMin: 80, controlMax: 250, controlDefault: 150, controlUnit: '%',   controlDesc: 'Value of locked ETH (or other crypto) per $1 minted. 150% = $150 ETH backs $100 DAI' },
  algo:   { name: 'Algorithmic',           example: 'UST (defunct)', color: '#f59e0b', control: 'Native-token cushion', controlMin: 0,  controlMax: 100, controlDefault: 30,  controlUnit: '%',   controlDesc: 'Market-cap of the volatile sister token (LUNA-style) relative to the stablecoin supply' },
};

function PegSimulator() {
  const [type, setType]     = useState<PegType>('crypto');
  const [control, setCtl]   = useState(PEG_TYPES.crypto.controlDefault);
  const [shock, setShock]   = useState(20); // % of supply being sold

  // When the type changes, reset its control to default
  const setTypeAndDefault = (t: PegType) => {
    setType(t);
    setCtl(PEG_TYPES[t].controlDefault);
  };

  // Compute peg deviation (cents off $1)
  let dev = 0;
  let regime: 'stable' | 'wobble' | 'depeg' | 'collapse' = 'stable';
  if (type === 'fiat') {
    const gap = Math.max(0, 100 - control);    // unbacked %
    dev = (gap / 100) * (shock / 100) * 35;
  } else if (type === 'crypto') {
    const cushion = Math.max(0, control - 100); // over-collateralisation above $1
    const stress  = Math.max(0, shock - cushion * 0.7);
    dev = (stress / 100) * 25 + (control < 100 ? (100 - control) * 0.5 : 0);
  } else {
    // algo — exponential below cushion
    const ratio = (shock / Math.max(1, control));
    dev = Math.min(100, Math.pow(ratio, 1.8) * 20);
  }

  const peg = Math.max(0, 1 - dev / 100);
  if      (dev < 1)   regime = 'stable';
  else if (dev < 5)   regime = 'wobble';
  else if (dev < 30)  regime = 'depeg';
  else                regime = 'collapse';

  const regimeColor = regime === 'stable'   ? '#39B54A'
                    : regime === 'wobble'   ? '#f59e0b'
                    : regime === 'depeg'    ? '#ED1C24'
                    :                          '#7c2d12';
  const regimeLabel = { stable: '✓ Stable', wobble: '⚠️ Wobble', depeg: '⚠ De-pegging', collapse: '💀 Death spiral' }[regime];

  const lesson = type === 'fiat'
    ? 'Fiat-backed stablecoins are only as trustworthy as their auditor. If reserves dip below 100%, a coordinated sell-off can break the peg — see USDC briefly de-pegging in March 2023 when SVB held $3.3B of its reserves.'
    : type === 'crypto'
    ? 'Crypto-collateralized stablecoins survive shocks via liquidations — but only if the collateral ratio is comfortably above 100%. Drop below that during a flash crash and the protocol can\'t liquidate fast enough.'
    : 'Algorithmic stablecoins are vulnerable to reflexive death spirals: as the stable de-pegs, traders dump the sister token, which collapses, which removes the cushion. UST/LUNA wiped out $40B in May 2022.';

  const cfg = PEG_TYPES[type];

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/15 border border-[#6366f1]/40 text-[#6366f1] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">Stablecoin Peg Simulator</h2>
        <p className="text-muted-foreground text-sm">Pick a stablecoin design and apply market stress. Watch the peg hold — or break.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
        {/* Controls */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Stablecoin design</div>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(PEG_TYPES) as PegType[]).map(t => {
              const tcfg = PEG_TYPES[t];
              const active = t === type;
              return (
                <button key={t} onClick={() => setTypeAndDefault(t)}
                  className="p-2.5 rounded-xl border-2 text-left transition-colors"
                  style={{
                    borderColor: active ? tcfg.color : 'var(--border)',
                    backgroundColor: active ? tcfg.color + '15' : 'var(--card)',
                  }}>
                  <div className="font-bold text-xs" style={{ color: active ? tcfg.color : 'var(--foreground)' }}>{tcfg.name}</div>
                  <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{tcfg.example}</div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-foreground">{cfg.control}</div>
              <div className="font-mono font-bold text-sm" style={{ color: cfg.color }}>{control}{cfg.controlUnit}</div>
            </div>
            <input type="range" min={cfg.controlMin} max={cfg.controlMax} step={1} value={control}
              onChange={e => setCtl(Number(e.target.value))}
              className="w-full" style={{ accentColor: cfg.color }} />
            <div className="text-[10px] text-muted-foreground mt-1">{cfg.controlDesc}</div>
          </div>

          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-foreground">Market shock — % of supply sold off</div>
              <div className="font-mono font-bold text-sm text-[#ED1C24]">{shock}%</div>
            </div>
            <input type="range" min={0} max={100} step={1} value={shock}
              onChange={e => setShock(Number(e.target.value))}
              className="w-full accent-[#ED1C24]" />
            <div className="text-[10px] text-muted-foreground mt-1">Sudden sell pressure (a "bank run" event). 100% = entire supply hits the bid simultaneously.</div>
          </div>

          <div className="mt-auto p-3 rounded-xl border" style={{ borderColor: cfg.color + '40', backgroundColor: cfg.color + '0c' }}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: cfg.color }}>Lesson</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{lesson}</p>
          </div>
        </div>

        {/* Peg display */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Current peg</div>

          <div className="flex-1 min-h-0 p-5 rounded-2xl border-4 flex flex-col items-center justify-center gap-3" style={{ borderColor: regimeColor + '60', backgroundColor: regimeColor + '0c' }}>
            <div className="text-xs text-muted-foreground">Target: $1.00</div>
            <div className="font-mono font-black text-6xl lg:text-7xl" style={{ color: regimeColor }}>
              ${peg.toFixed(peg < 0.5 ? 4 : 3)}
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: regimeColor + '20', color: regimeColor }}>
              {regimeLabel}
            </div>

            {/* Peg gauge bar */}
            <div className="w-full mt-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                {/* target marker at right */}
                <div className="absolute right-0 top-0 h-full w-0.5 bg-foreground/40" />
                <div className="h-full transition-all duration-300" style={{ width: `${peg * 100}%`, backgroundColor: regimeColor }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>$0</span><span>$1.00 ← target</span>
              </div>
            </div>

            <div className="text-xs text-center text-muted-foreground">
              Deviation: <span className="font-mono font-bold" style={{ color: regimeColor }}>−{dev.toFixed(2)}¢</span>
            </div>
          </div>

          <div className="shrink-0 p-2.5 bg-muted/30 border border-border rounded-lg text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">Note:</span> these formulas are illustrative, not market models. Real peg dynamics involve liquidation cascades, market depth, redemption windows, and reflexive trading. The point: <span className="italic">each design has a different failure mode</span>.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive Royalty Cascade Calculator ──────────────────────────────────

function RoyaltyCalculator() {
  const [salePrice, setSalePrice] = useState(10000);
  const [creatorPct,  setCreator]   = useState(5);   // ERC-2981 default-ish
  const [collabPct,   setCollab]    = useState(2);
  const [marketPct,   setMarketPct] = useState(2.5); // marketplace fee
  const [resales,     setResales]   = useState(3);

  const creator   = salePrice * creatorPct  / 100;
  const collab    = salePrice * collabPct   / 100;
  const market    = salePrice * marketPct   / 100;
  const seller    = salePrice - creator - collab - market;

  // Royalty earned across N resales (cumulative)
  const totalRoyalty = (creator + collab) * resales;

  const slices = [
    { label: 'Seller',       value: seller,  color: '#6366f1' },
    { label: 'Creator',      value: creator, color: '#39B54A' },
    { label: 'Collaborator', value: collab,  color: '#8b5cf6' },
    { label: 'Marketplace',  value: market,  color: '#f59e0b' },
  ];

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/40 text-[#8b5cf6] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">Royalty Cascade · ERC-2981 in action</h2>
        <p className="text-muted-foreground text-sm">A secondary sale closes. Watch the smart contract pay every party — automatically, on-chain.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">

        {/* Controls */}
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-foreground">Secondary sale price</div>
              <div className="font-mono font-bold text-sm text-foreground">${salePrice.toLocaleString()}</div>
            </div>
            <input type="range" min={100} max={100000} step={100} value={salePrice}
              onChange={e => setSalePrice(Number(e.target.value))}
              className="w-full accent-[#6366f1]" />
          </div>

          {[
            { label: 'Creator royalty',     val: creatorPct, set: setCreator,   color: '#39B54A', max: 15 },
            { label: 'Collaborator share',  val: collabPct,  set: setCollab,    color: '#8b5cf6', max: 10 },
            { label: 'Marketplace fee',     val: marketPct,  set: setMarketPct, color: '#f59e0b', max: 10 },
          ].map(s => (
            <div key={s.label} className="p-3 bg-card border border-border rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-foreground">{s.label}</div>
                <div className="font-mono font-bold text-sm" style={{ color: s.color }}>{s.val}%</div>
              </div>
              <input type="range" min={0} max={s.max} step={0.5} value={s.val}
                onChange={e => s.set(Number(e.target.value))}
                className="w-full" style={{ accentColor: s.color }} />
            </div>
          ))}

          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-foreground">Future resales (this asset)</div>
              <div className="font-mono font-bold text-sm text-[#22d3ee]">{resales}×</div>
            </div>
            <input type="range" min={0} max={20} step={1} value={resales}
              onChange={e => setResales(Number(e.target.value))}
              className="w-full accent-[#22d3ee]" />
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Split for this sale</div>

          {/* Stacked-bar */}
          <div className="p-3 bg-card border border-border rounded-xl">
            <div className="h-8 rounded-lg overflow-hidden flex">
              {slices.map(s => s.value > 0 && (
                <div key={s.label} className="h-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ width: `${(s.value / salePrice) * 100}%`, backgroundColor: s.color }}
                  title={`${s.label}: $${s.value.toFixed(0)}`}>
                  {(s.value / salePrice) >= 0.08 ? `${((s.value / salePrice) * 100).toFixed(0)}%` : ''}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-3">
              {slices.map(s => (
                <div key={s.label} className="flex items-center justify-between p-1.5 rounded text-xs" style={{ backgroundColor: s.color + '12' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 rounded-sm" style={{ backgroundColor: s.color }} />
                    <span className="text-foreground font-semibold">{s.label}</span>
                  </div>
                  <span className="font-mono font-bold" style={{ color: s.color }}>${s.value.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cumulative royalty over N resales */}
          <div className="p-3 bg-gradient-to-br from-[#39B54A]/10 to-transparent border border-[#39B54A]/30 rounded-xl">
            <div className="text-[10px] font-bold text-[#39B54A] uppercase tracking-widest">Cumulative royalties (creator + collaborator)</div>
            <div className="flex items-baseline gap-2 mt-1">
              <div className="font-mono font-black text-2xl text-[#39B54A]">${totalRoyalty.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div className="text-xs text-muted-foreground">across {resales} resale{resales !== 1 ? 's' : ''}</div>
            </div>
          </div>

          {/* Trad vs SC */}
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <div className="p-3 bg-card border border-[#ED1C24]/30 rounded-xl text-center">
              <div className="text-[10px] font-bold text-[#ED1C24] uppercase tracking-widest">Traditional Web2</div>
              <div className="font-mono font-black text-base text-[#ED1C24] mt-1">$0</div>
              <div className="text-[10px] text-muted-foreground">creator earns nothing on resales</div>
            </div>
            <div className="p-3 bg-card border border-[#39B54A]/30 rounded-xl text-center">
              <div className="text-[10px] font-bold text-[#39B54A] uppercase tracking-widest">With ERC-2981</div>
              <div className="font-mono font-black text-base text-[#39B54A] mt-1">${totalRoyalty.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div className="text-[10px] text-muted-foreground">auto-paid by the smart contract</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Interactive Provenance QR-Scan Trail ────────────────────────────────────

const PROVENANCE_STEPS = [
  { emoji: '🐔', label: 'Hatched',     who: 'Ferme Bio Sud-Ouest, FR',     ts: '2026-03-15 06:24',  detail: 'Free-range certified · breed: Label Rouge ·  cohort #B-2401', sig: '0x8a3f…91c4' },
  { emoji: '🌾', label: 'Raised',      who: 'Ferme Bio Sud-Ouest, FR',     ts: '2026-05-02 18:00',  detail: 'Organic feed (no GMO, no antibiotics) · 81 days outdoor access',  sig: '0x8a3f…91c4' },
  { emoji: '🚛', label: 'Transported', who: 'CoolChain Logistique',         ts: '2026-05-05 04:11', detail: 'Refrigerated truck · 3–5 °C maintained · IoT sensor logs attached', sig: '0x4d12…77ae' },
  { emoji: '🏭', label: 'Processed',   who: 'Abattoir Toulouse SARL',       ts: '2026-05-05 09:48', detail: 'EU-certified slaughterhouse · veterinary inspection passed',        sig: '0x91bc…2f08' },
  { emoji: '📦', label: 'Packaged',    who: 'Carrefour BIO line, Lyon',     ts: '2026-05-05 14:22', detail: 'Carrefour BIO label applied · QR tag printed · batch #BIO-2026-0508', sig: '0xc7e2…b41d' },
  { emoji: '🚚', label: 'Distributed', who: 'Carrefour Logistics',          ts: '2026-05-06 02:30', detail: 'Cold-chain transport to retail · 1–4 °C maintained',                 sig: '0x4d12…77ae' },
  { emoji: '🛒', label: 'Stocked',     who: 'Carrefour Lyon Part-Dieu',     ts: '2026-05-06 08:15', detail: 'Shelf-life: 5 days · price tag generated · scan-to-trace QR live',  sig: '0xa1f5…3e90' },
];

function ProvenanceQR() {
  const [scanned, setScanned] = useState(false);
  const [active, setActive]   = useState(0);

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold">🧩 Interactive</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">Scan a Carrefour BIO Chicken</h2>
        <p className="text-muted-foreground text-sm">Click the QR code to retrieve the on-chain provenance. Each step is signed by the party that handled the product.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-[260px_1fr] gap-5">

        {/* QR + product card */}
        <div className="flex flex-col gap-3 min-h-0">
          <div className="shrink-0 p-4 bg-card border-2 border-border rounded-xl text-center">
            <div className="text-xs text-muted-foreground mb-1">Carrefour BIO · Free-range chicken</div>
            <div className="font-bold text-sm text-foreground">batch #BIO-2026-0508</div>
          </div>

          <button onClick={() => setScanned(s => !s)}
            className="shrink-0 relative p-4 rounded-xl border-2 transition-colors group"
            style={{
              borderColor: scanned ? '#39B54A' : '#f59e0b',
              backgroundColor: scanned ? '#39B54A08' : '#f59e0b08',
            }}>
            {/* Fake QR — checker pattern */}
            <svg viewBox="0 0 21 21" className="w-full h-auto" style={{ imageRendering: 'pixelated' }}>
              {Array.from({ length: 21 }).map((_, y) =>
                Array.from({ length: 21 }).map((_, x) => {
                  // Corner finder patterns + pseudo-random fill
                  const isCorner = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
                  const cornerRing = isCorner && (
                    x === 0 || x === 6 || x === 14 || x === 20 ||
                    y === 0 || y === 6 || y === 14 || y === 20 ||
                    ((x >= 2 && x <= 4 && y >= 2 && y <= 4)) ||
                    ((x >= 16 && x <= 18 && y >= 2 && y <= 4)) ||
                    ((x >= 2 && x <= 4 && y >= 16 && y <= 18))
                  );
                  if (isCorner && !cornerRing) return null;
                  const fill = isCorner ? true : ((x * 7 + y * 13 + 3) % 5 < 2);
                  if (!fill) return null;
                  return <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />;
                })
              )}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {!scanned && (
                <span className="px-3 py-1.5 rounded-full bg-[#f59e0b] text-white text-xs font-bold shadow-lg group-hover:scale-105 transition-transform">
                  📷 Tap to scan
                </span>
              )}
              {scanned && (
                <span className="px-3 py-1.5 rounded-full bg-[#39B54A] text-white text-xs font-bold shadow-lg">
                  ✓ Trail loaded
                </span>
              )}
            </div>
          </button>

          {scanned && (
            <div className="shrink-0 p-2.5 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-lg text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">7 hand-offs</span> recorded on a permissioned chain. The QR resolves to a content hash — the data itself is on-chain.
            </div>
          )}
        </div>

        {/* Trail */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="shrink-0 text-xs font-semibold text-muted-foreground uppercase tracking-widest">On-chain provenance trail</div>

          {!scanned ? (
            <div className="flex-1 flex items-center justify-center text-center text-sm text-muted-foreground border border-dashed border-border rounded-xl">
              ← Scan the QR to load the trail
            </div>
          ) : (
            <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-y-auto pr-1">
              {PROVENANCE_STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <motion.button key={i}
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-left p-2.5 rounded-lg border transition-colors"
                    style={{
                      borderColor: isActive ? '#f59e0b' : 'var(--border)',
                      backgroundColor: isActive ? '#f59e0b12' : 'var(--card)',
                    }}>
                    <div className="flex items-center gap-2">
                      <div className="text-xl shrink-0">{s.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-bold text-sm text-foreground">Step {i + 1} · {s.label}</div>
                          <div className="text-[10px] font-mono text-muted-foreground">{s.ts}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{s.who}</div>
                        {isActive && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            className="mt-1.5 pt-1.5 border-t border-[#f59e0b]/30">
                            <div className="text-xs text-foreground">{s.detail}</div>
                            <div className="text-[10px] font-mono text-muted-foreground mt-0.5">signed by {s.sig}</div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function DesignYourOwnExercise() {
  const [selected,  setSelected]  = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const ex = selected ? EXAMPLES[selected] : null;
  const steps = ex ? [
    { label: 'Pain Point',       emoji: '🩹', value: ex.pain },
    { label: 'Parties Involved', emoji: '👥', value: ex.parties },
    { label: 'Trigger',          emoji: '⚡', value: ex.trigger },
    { label: 'Output / Action',  emoji: '✅', value: ex.output },
    { label: 'Key Risk',         emoji: '⚠️', value: ex.risk },
  ] : [];

  const handleSelect = (ind: string) => { setSelected(ind); setStepIndex(0); };
  const next = () => setStepIndex(i => Math.min(i + 1, steps.length - 1));
  const prev = () => setStepIndex(i => Math.max(i - 1, 0));

  return (
    <div className="h-full flex flex-col p-6 lg:p-8">
      <div className="shrink-0 mb-4">
        <span className="px-2.5 py-0.5 rounded-full bg-[#39B54A]/15 border border-[#39B54A]/40 text-[#39B54A] text-xs font-bold">🧩 Exercise</span>
        <h2 className="text-2xl font-bold text-foreground mt-1">Design Your Own Smart Contract</h2>
        <p className="text-muted-foreground text-sm">Pick an industry, then think through each prompt before revealing the example answer.</p>
      </div>

      <div className="flex-1 min-h-0 flex gap-6">

        {/* Industry selector */}
        <div className="flex flex-col gap-2 w-44 shrink-0 justify-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Choose industry</p>
          {INDUSTRIES.map(ind => (
            <motion.button key={ind} onClick={() => handleSelect(ind)} whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
              className="px-3 py-2 rounded-xl border-2 text-left text-xs font-semibold transition-colors"
              style={{
                borderColor: selected === ind ? '#39B54A' : 'var(--border)',
                backgroundColor: selected === ind ? '#39B54A18' : 'var(--card)',
                color: selected === ind ? '#39B54A' : 'var(--foreground)',
              }}>
              {ind}
            </motion.button>
          ))}
        </div>

        {/* Step-through panel */}
        <div className="flex-1 min-w-0 flex flex-col">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-5xl mb-3">👈</div>
                <p className="text-sm">Select an industry to begin</p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={selected} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="flex-1 flex flex-col gap-4">

                {/* Progress dots */}
                <div className="flex items-center gap-2 shrink-0">
                  {steps.map((s, i) => (
                    <button key={i} onClick={() => setStepIndex(i)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors"
                      style={{
                        backgroundColor: i <= stepIndex ? '#39B54A20' : 'var(--muted)',
                        color: i <= stepIndex ? '#39B54A' : 'var(--muted-foreground)',
                        border: `1px solid ${i === stepIndex ? '#39B54A' : 'transparent'}`,
                      }}>
                      {s.emoji} {s.label}
                    </button>
                  ))}
                </div>

                {/* Prompt card — show question first, reveal on click */}
                <motion.div key={stepIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="flex-1 flex flex-col gap-4">

                  <div className="p-5 rounded-xl border-2 border-[#39B54A]/30 bg-[#39B54A]/06 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{steps[stepIndex].emoji}</span>
                      <div className="font-black text-lg text-foreground">{steps[stepIndex].label}</div>
                      <span className="ml-auto text-xs text-muted-foreground">{stepIndex + 1} / {steps.length}</span>
                    </div>

                    {/* Question prompt */}
                    <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground italic">
                      {{
                        0: `What problem exists in ${selected} that requires trust in an intermediary?`,
                        1: `Who are the 2–3 parties involved? Who holds the funds or assets?`,
                        2: `What event or condition triggers the smart contract to execute?`,
                        3: `What does the contract do automatically when triggered?`,
                        4: `What could go wrong? What is the single weakest point in this design?`,
                      }[stepIndex]}
                    </div>

                    {/* Example answer */}
                    <div className="p-3 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-lg">
                      <div className="text-[10px] font-bold text-[#39B54A] uppercase tracking-widest mb-1">Example answer — {selected}</div>
                      <div className="text-sm text-foreground">{steps[stepIndex].value}</div>
                    </div>
                  </div>

                  {/* Nav */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button onClick={prev} disabled={stepIndex === 0}
                      className="px-4 py-2 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 disabled:opacity-30 transition-colors">← Previous</button>
                    <button onClick={next} disabled={stepIndex === steps.length - 1}
                      className="px-4 py-2 rounded-lg bg-[#39B54A] text-white text-xs font-bold hover:bg-[#39B54A]/90 disabled:opacity-30 transition-colors">Next →</button>
                    {stepIndex === steps.length - 1 && (
                      <span className="text-xs text-[#39B54A] font-semibold ml-2">✓ Brief complete! Now try another industry.</span>
                    )}
                  </div>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
}

export function SC_Section3() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} accentColor="#6366f1" />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 03"
            title="Industries & Case Studies"
            subtitle="Where smart contracts are reshaping real industries — and the case studies that prove it (and the ones that didn't)"
            icon={<Building2 className="size-20 text-[#6366f1]" />}
            gradient="from-[#6366f1] to-[#22d3ee]"
          />
        </div>

        {/* ═══════ TEAM CHECKPOINT — PICK YOUR INDUSTRY ═══════ */}
        <div id="s3-team-pick" className="h-full">
          <TeamCheckpoint
            contextLabel="Day 3 · before Industries deep-dive"
            title="Pick your industry"
            subtitle="The next five chapters walk through DeFi, Gaming/NFTs, RWA, Supply Chain, and Digital Certification — pick the one your team's problem statement lives in, so you can study it with intent."
            duration="10 min"
            sections={[
              {
                label: 'What you have',
                color: '#22d3ee',
                items: [
                  <>The <strong>problem statement</strong> your team agreed on at the end of Day 2.</>,
                  <>Some sense of which industry it touches (banking? retail? logistics? government?).</>,
                ],
              },
              {
                label: 'Discuss as a team',
                color: '#39B54A',
                items: [
                  <>Which of the five upcoming verticals fits your problem best?</>,
                  <>If multiple fit, pick the one where the smart-contract pattern is <strong>most established</strong> — you'll have more references.</>,
                  <>If none fit cleanly, that's a signal worth noting — your problem may need adapting (or may not be a great smart-contract fit).</>,
                ],
              },
              {
                label: 'During the next chapters',
                color: '#6366f1',
                items: [
                  <>Pay extra attention to the vertical you chose — note the existing players, the real-world deployments, and the pros/cons.</>,
                  <>The other verticals still matter — patterns transfer. Capture anything that looks adjacent to your problem.</>,
                  <>The <strong>Critical Thinking decision flow</strong> later in the day is where you'll formally test if blockchain is the right tool.</>,
                ],
              },
            ]}
          />
        </div>

        {/* ═══════ INDUSTRIES OVERVIEW ═══════ */}
        <div id="s3-industries-intro" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Smart Contracts Across Industries</h2>
            <p className="text-muted-foreground text-sm mt-1">Five verticals where smart contracts have moved from theory to deployed production systems.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-5 gap-3 content-center">
            {[
              { emoji: '💸', name: 'DeFi', tag: 'Decentralized Finance', color: '#6366f1', desc: 'AMMs, lending, stablecoins, borderless transfers' },
              { emoji: '🎮', name: 'Gaming & NFTs', tag: 'Digital Ownership', color: '#8b5cf6', desc: 'True ownership, P2E economies, embedded royalties' },
              { emoji: '🏢', name: 'RWA Tokenization', tag: 'Real-World Assets', color: '#39B54A', desc: 'Bonds, mortgages, real estate on-chain' },
              { emoji: '🚚', name: 'Supply Chain', tag: 'Provenance & Logistics', color: '#f59e0b', desc: 'Track-and-trace, eBL networks, anti-counterfeit' },
              { emoji: '📜', name: 'Digital Certification', tag: 'Trusted Records', color: '#22d3ee', desc: 'Diplomas, government records, luxury authentication' },
            ].map(v => (
              <div key={v.name} className="p-4 bg-card border rounded-xl flex flex-col gap-2"
                style={{ borderColor: v.color + '40' }}>
                <div className="text-4xl">{v.emoji}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: v.color }}>{v.tag}</div>
                <div className="font-bold text-sm text-foreground">{v.name}</div>
                <div className="text-xs text-muted-foreground leading-snug">{v.desc}</div>
              </div>
            ))}
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Common thread:</span> in every vertical below, smart contracts replace a slow, intermediary-dependent process with code-enforced execution. We'll examine each, then look at five flagship case studies — including two that failed.
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* DeFi vertical                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-defi-intro" className="h-full">
          <VerticalDivider
            emoji="💸"
            title="Decentralized Finance"
            subtitle="Blockchain-based financial applications that operate without banks or brokers — peer-to-peer transactions enforced by smart contracts."
            color="#6366f1"
            image={imgDefiIntro}
          />
        </div>

        {/* DeFi: What is it */}
        <div className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What is DeFi?</h2>
            <p className="text-muted-foreground text-sm mt-1">An emerging peer-to-peer financial system using cryptocurrencies and smart contracts.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="flex flex-col gap-3">
              <div className="p-4 bg-card border border-[#6366f1]/30 rounded-xl">
                <div className="font-bold text-sm text-[#6366f1] mb-2">The Core Idea</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Remove third-party intermediaries. Instead of a bank enforcing a loan or a clearinghouse settling a trade, a smart contract automatically executes those functions when conditions are met. Cutting out middlemen reduces fees, settlement times, and gives users more control over their assets.
                </p>
              </div>
              <div className="p-4 bg-card border border-[#8b5cf6]/30 rounded-xl">
                <div className="font-bold text-sm text-[#8b5cf6] mb-2">"Value and Code at the same level"</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  In traditional finance, the rules of trade live in legal documents and back-office systems separate from the money itself. In DeFi, value (ETH, USDC, NFTs) and the rules that govern it (the contract code) sit on the same blockchain — composable, atomic, transparent.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">DeFi primitives</div>
              {[
                { name: 'DEXs / AMMs', desc: 'Decentralized exchanges using liquidity pools (Uniswap, CoW Swap, Curve)', color: '#6366f1' },
                { name: 'Lending', desc: 'Over-collateralized loans without credit checks (Aave, Compound)', color: '#8b5cf6' },
                { name: 'Stablecoins', desc: 'Tokens pegged to USD/EUR (USDC, DAI, USDT) — global, programmable money', color: '#39B54A' },
                { name: 'Yield', desc: 'Automated strategies that route deposits to highest-return pools (Yearn)', color: '#f59e0b' },
                { name: 'Derivatives', desc: 'Perpetuals, options, synthetics — trading without intermediaries (dYdX, GMX)', color: '#22d3ee' },
              ].map(p => (
                <div key={p.name} className="flex items-start gap-3 p-2.5 bg-card border border-border rounded-lg">
                  <div className="px-2 py-0.5 rounded font-bold text-xs shrink-0 text-white" style={{ backgroundColor: p.color }}>{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DeFi: Interactive AMM */}
        <div id="s3-defi-amm" className="h-full">
          <InteractiveAMM />
        </div>

        {/* DeFi: DEX use cases */}
        <div id="s3-defi-dex" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Decentralized Exchanges (DEXs)</h2>
            <p className="text-muted-foreground text-sm mt-1">Trading venues executed entirely by smart contracts — no central broker, no clearing house, no custody risk.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#6366f1]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-xl bg-[#6366f1]/15 flex items-center justify-center text-xl shrink-0">🦄</div>
                <div>
                  <div className="font-black text-sm text-foreground">Uniswap</div>
                  <div className="text-xs text-[#6366f1]">Non-custodial token swaps</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Lets any wallet swap thousands of tokens in one on-chain call. Liquidity providers deposit token pairs; the smart contract's AMM quotes the rate, moves the assets, and charges 0.01–1% per pool, settling in about 15 seconds.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="p-2 bg-[#6366f1]/10 rounded-lg text-center">
                  <div className="font-mono font-black text-base text-[#6366f1]">~$1.5B</div>
                  <div className="text-[10px] text-muted-foreground">Daily volume (07/2025)</div>
                </div>
                <div className="p-2 bg-[#6366f1]/10 rounded-lg text-center">
                  <div className="font-mono font-black text-base text-[#6366f1]">never</div>
                  <div className="text-[10px] text-muted-foreground">Takes custody of user funds</div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-card border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-xl bg-[#8b5cf6]/15 flex items-center justify-center text-xl shrink-0">🐮</div>
                <div>
                  <div className="font-black text-sm text-foreground">CoW Swap</div>
                  <div className="text-xs text-[#8b5cf6]">MEV-protected, intent-based</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Wallets trade tokens by submitting <span className="font-semibold text-foreground">signed intents</span> rather than on-chain swap transactions. Off-chain solvers batch orders, match users directly through Coincidence of Wants, and route any leftover flow to on-chain liquidity. Trades settle in a single transaction with built-in MEV protection.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg text-center">
                  <div className="font-mono font-black text-base text-[#8b5cf6]">CoW</div>
                  <div className="text-[10px] text-muted-foreground">Coincidence of Wants matching</div>
                </div>
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg text-center">
                  <div className="font-mono font-black text-base text-[#8b5cf6]">no MEV</div>
                  <div className="text-[10px] text-muted-foreground">Front-running mitigated</div>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-border bg-muted/30 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Why this matters:</span> a DEX delivers centralized-exchange-scale liquidity without ever taking custody of user funds. The contract enforces the rules; users keep their keys.
          </div>
        </div>

        {/* DeFi: Stablecoins */}
        <div id="s3-defi-stablecoins" className="h-full">
          <PegSimulator />
        </div>

        {/* DeFi: Borderless transfers */}
        <div id="s3-defi-borderless" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5 flex items-start gap-4">
            <img src={imgDefiBorderless} alt="A laptop with a shield, a wallet, and a secure cloud — borderless value transfer" className="hidden lg:block h-24 object-contain shrink-0" />
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Borderless Value Transfers</h2>
              <p className="text-muted-foreground text-sm mt-1">Moving digital assets entirely by smart contract — no correspondent banks, no clearing networks.</p>
            </div>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            <div className="p-5 bg-card border border-[#ED1C24]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#ED1C24] uppercase tracking-widest">Traditional</div>
              <div className="font-black text-foreground">SWIFT cross-border wire</div>
              <ul className="text-xs text-muted-foreground space-y-1.5 mt-2">
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>3–5 business days</li>
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>$25–50 fixed fee + 1–3% FX spread</li>
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>Multiple correspondent banks in chain</li>
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>Limited transparency on status</li>
              </ul>
            </div>
            <div className="p-5 bg-card border border-[#39B54A]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">Smart Contract Rails</div>
              <div className="font-black text-foreground">USDC over L2 (Base, Arbitrum)</div>
              <ul className="text-xs text-muted-foreground space-y-1.5 mt-2">
                <li className="flex gap-1.5"><span className="text-[#39B54A]">›</span>Settles in seconds</li>
                <li className="flex gap-1.5"><span className="text-[#39B54A]">›</span>$0.01–0.10 in network fees</li>
                <li className="flex gap-1.5"><span className="text-[#39B54A]">›</span>No correspondent — direct wallet-to-wallet</li>
                <li className="flex gap-1.5"><span className="text-[#39B54A]">›</span>On-chain explorer = full transparency</li>
              </ul>
            </div>
            <div className="p-5 bg-card border border-[#6366f1]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">Trade-offs</div>
              <div className="font-black text-foreground">What you give up</div>
              <ul className="text-xs text-muted-foreground space-y-1.5 mt-2">
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>No reversibility — sent is sent</li>
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>On/off-ramp friction at edges (KYC + bank)</li>
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>Wallet UX: seed phrases, gas, approvals</li>
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>Regulatory uncertainty in some jurisdictions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* DeFi: Pros / Cons */}
        <div id="s3-defi-prosCons" className="h-full">
          <ProsConsSlide
            title="DeFi · Pros & Cons"
            accent="#6366f1"
            pros={[
              { label: '24/7 Global Access', desc: 'Markets, payments, and dollar-pegged balances stay open all day — no cut-off windows or borders.' },
              { label: 'Instant Settlement', desc: 'Trades and transfers clear in a single block (seconds), eliminating clearing delays.' },
              { label: 'Reduced Costs', desc: 'Smart contracts replace banks, card networks, and brokers — fees on swaps and cross-border payments drop dramatically.' },
              { label: 'Self-Custody', desc: 'Users keep their own keys. Value moves peer-to-peer without frozen accounts or withdrawal limits.' },
              { label: 'Predictable Value', desc: 'Stablecoins let users hold and spend a token that maintains a fiat parity (mostly USD).' },
              { label: 'Programmable Cash Flows', desc: 'Code automates swaps, payouts, and recurring transfers once preset conditions are met.' },
              { label: 'Permissionless Markets', desc: 'Anyone can list and launch a new token pair or liquidity pool. No gatekeepers.' },
            ]}
            cons={[
              { label: 'Regulatory Uncertainty', desc: 'Rules on KYC, securities status, and stablecoin backing differ by jurisdiction and keep evolving.' },
              { label: 'Smart Contract Bugs', desc: 'Technical vulnerabilities or exploits can drain pools, freeze funds, or break a stablecoin peg.' },
              { label: 'Liquidity Fragmentation', desc: 'Assets spread across many chains and pools. Big trades face slippage or thin depth.' },
              { label: 'Peg Instability', desc: 'Even "stable" coins can de-peg if reserves, collateral ratios, or algorithms fail.' },
              { label: 'UX Complexity', desc: 'Setting up wallets, safeguarding seed phrases, paying gas — all deter mainstream adoption.' },
              { label: 'On/Off-Ramp Friction', desc: 'Moving funds between banks and blockchain wallets still depends on centralized exchanges and KYC.' },
            ]}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Gaming & NFTs vertical                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-nft-intro" className="h-full">
          <VerticalDivider
            emoji="🎮"
            title="Gaming & NFTs"
            subtitle="Non-Fungible Tokens turn digital items into player-owned assets — with embedded royalties and tradeable secondary markets."
            color="#8b5cf6"
            image={imgNftGaming}
          />
        </div>

        {/* NFTs: Intro */}
        <div className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What is an NFT?</h2>
            <p className="text-muted-foreground text-sm mt-1">A unique digital asset recorded on-chain that certifies ownership and authenticity.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#8b5cf6]">Unlike fungible tokens…</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cryptocurrencies (ETH, USDC) are <span className="font-semibold text-foreground">interchangeable</span> — your 1 ETH equals my 1 ETH. NFTs are not. Each NFT has its own ID and metadata, recorded on the ERC-721 (or ERC-1155) standard. Owning the token means owning that specific asset.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <div className="text-[10px] text-muted-foreground">Standard</div>
                  <div className="font-mono font-black text-sm text-[#8b5cf6]">ERC-721</div>
                </div>
                <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                  <div className="text-[10px] text-muted-foreground">Multi-token</div>
                  <div className="font-mono font-black text-sm text-[#8b5cf6]">ERC-1155</div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-card border border-[#6366f1]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#6366f1]">In gaming…</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                NFTs can represent swords, skins, characters, or virtual land. Because the NFT sits in the player's Web3 wallet — not on the publisher's server — it can be listed, traded, or rented peer-to-peer. Open, player-controlled markets emerge.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {['Items survive server shutdowns', 'Tradeable on third-party marketplaces', 'Cross-game interoperability potential', 'Embedded royalties to creators'].map(p => (
                  <li key={p} className="flex gap-1.5"><span className="text-[#6366f1]">›</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* NFTs: Economies */}
        <div id="s3-nft-economies" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">True Ownership, Digital IP & Virtual Economies</h2>
            <p className="text-muted-foreground text-sm mt-1">Smart contracts turn server-side database rows into player-owned, transferable, programmable assets.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { emoji: '🏛', title: 'Before Web3', color: '#ED1C24',
                points: [
                  'Digital assets lived on centralized servers, owned by publishers',
                  'Account banned = items gone, no recourse',
                  'No cross-game portability',
                  'Creators received zero royalties on resales',
                ] },
              { emoji: '🎯', title: 'With NFTs', color: '#8b5cf6',
                points: [
                  'Asset ownership lives in the user\'s wallet on-chain',
                  'Embedded royalties pay creators on every secondary sale',
                  'Items tradeable, lendable, stakeable, fractionalizable',
                  'Asset metadata transparent and verifiable',
                ] },
              { emoji: '💼', title: 'Real-world parallels', color: '#39B54A',
                points: [
                  'Sell items for real-world value (just like physical goods)',
                  'Lend NFTs out for yield (like real-estate rental)',
                  'Use NFTs as collateral for loans (mortgaging digital art)',
                  'Sell fractional shares (REITs for digital assets)',
                ] },
            ].map(c => (
              <div key={c.title} className="p-4 bg-card border rounded-xl flex flex-col gap-2"
                style={{ borderColor: c.color + '30' }}>
                <div className="text-3xl">{c.emoji}</div>
                <div className="font-bold text-sm" style={{ color: c.color }}>{c.title}</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground flex-1 mt-1">
                  {c.points.map(p => (
                    <li key={p} className="flex gap-1.5"><span style={{ color: c.color }} className="shrink-0 mt-0.5">›</span>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* NFTs: Play-to-Earn (interactive royalty calculator) */}
        <div id="s3-nft-p2e" className="h-full">
          <RoyaltyCalculator />
        </div>

        {/* NFTs: Ubisoft real-world */}
        <div id="s3-nft-p2e-real" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5 flex items-start gap-4">
            <img src={imgP2eEcosystem} alt="Play-to-Earn ecosystem icons: gaming, NFTs, tokens, creatures" className="hidden lg:block h-20 object-contain shrink-0" />
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Play-to-Earn in Production</h2>
              <p className="text-muted-foreground text-sm mt-1">Smart contracts link in-game achievements to token rewards — and route perpetual royalties back to creators on every resale.</p>
            </div>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#8b5cf6]">How it works</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Win a match, breed a creature, finish a quest → smart contract mints/transfers token rewards to your wallet</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Tokens swappable for stablecoins or reinvested in better gear</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Guilds emerge — NFT holders lend assets to new players for revenue split</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Labor and capital combine inside a self-governing digital economy</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚔️</span>
                <div>
                  <div className="font-black text-sm text-foreground">Ubisoft · Champions Tactics: Grimoria Chronicles</div>
                  <div className="text-xs text-[#8b5cf6]">Strategic Innovation Lab · Oct 2024</div>
                </div>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Launched on the <span className="font-semibold text-foreground">Oasys</span> blockchain (gaming-focused EVM L1)</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span><span className="font-semibold text-foreground">75,000 Champion NFTs</span> minted in a capped drop — sold out in hours, funding live-ops upfront</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Players battle squads in PvP; victories earn on-chain reward tokens redeemable for gear</li>
                <li className="flex gap-2"><span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>Every secondary sale routes a <span className="font-semibold text-foreground">5% royalty</span> to Ubisoft and collaborating artists — perpetual revenue loop</li>
              </ul>
              <div className="mt-auto p-2 bg-[#8b5cf6]/10 rounded-lg text-xs text-muted-foreground">
                A mainstream AAA studio using NFTs and smart-contract royalties to power an active game economy in 2025.
              </div>
            </div>
          </div>
        </div>

        {/* NFTs: Finance */}
        <div id="s3-nft-finance" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">NFT Finance · Lending, Renting, Yield</h2>
            <p className="text-muted-foreground text-sm mt-1">If digital assets have value, secondary liquidity can be built around them.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="flex flex-col gap-3">
              <div className="p-4 bg-card border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-2">
                <div className="font-bold text-sm text-[#8b5cf6]">Collateralized lending</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  NFT holders borrow against their assets without selling. The NFT is locked in a smart contract; if the loan defaults, the contract auctions or transfers the NFT to the lender. Liquidity unlocked, ownership preserved.
                </p>
                <div className="text-[10px] text-muted-foreground italic">Examples: NFTfi, BendDAO, Zharta</div>
              </div>
              <div className="p-4 bg-card border border-[#22d3ee]/30 rounded-xl flex flex-col gap-2">
                <div className="font-bold text-sm text-[#22d3ee]">Rentals & flywheels</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  NFTs can be rented to new players for a revenue split. As assets circulate, utilization grows, lenders earn yield secured by on-chain collateral, liquidity deepens, better pricing emerges, attracting more capital — a self-reinforcing flywheel.
                </p>
                <div className="text-[10px] text-muted-foreground italic">Pattern: borrow → use in-game → earn → split with owner</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest">Real-world example · Zharta</div>
              <div className="p-3 bg-card border border-[#8b5cf6]/30 rounded-xl">
                <img src={imgZhartaLoans} alt="Zharta loan volume — Borrow chart over a year, +300 loans, 13.6% APR" className="w-full h-auto rounded-lg" />
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                  Borrow against your NFT — keep 100% upside, retain investing opportunities, share the risk. Zharta's smart contracts grew to <span className="font-semibold text-foreground">300+ loans</span> at <span className="font-semibold text-foreground">13.6% APR</span>, with 2-year terms — secured by on-chain collateral.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NFTs: Pros / Cons */}
        <div id="s3-nft-prosCons" className="h-full">
          <ProsConsSlide
            title="Gaming & NFTs · Pros & Cons"
            accent="#8b5cf6"
            pros={[
              { label: 'True Digital Ownership', desc: 'Items live in the player\'s wallet, can\'t be revoked, and survive server shutdowns.' },
              { label: 'Player-Driven Economies', desc: 'Open on-chain markets set prices; supply & demand determine value, not publishers.' },
              { label: 'Programmable Cash Flows', desc: 'Smart contracts automate rentals, revenue-sharing, staking, and collateralized lending.' },
              { label: 'Perpetual Creator Royalties', desc: 'Each secondary sale auto-routes a percentage back to devs and artists for continuous income.' },
              { label: 'Transparent Scarcity', desc: 'Mint caps and supply are public on-chain — preventing hidden inflation of rare items.' },
              { label: 'Global 24/7 Markets', desc: 'Anyone with a wallet can buy, sell, or earn rewards instantly across borders.' },
              { label: 'Composability', desc: 'NFTs plug into DeFi or social dApps, unlocking governance, yield, or utility bonuses.' },
            ]}
            cons={[
              { label: 'Price Volatility', desc: 'Item and token values can spike or crash — disrupting game balance and player trust.' },
              { label: 'Regulatory Gray Zones', desc: 'Loot-box-style drops and token rewards may face gambling or securities scrutiny.' },
              { label: 'UX Friction', desc: 'Wallet setup, key management, and gas fees are barriers for mainstream gamers.' },
              { label: 'Scams & Counterfeits', desc: 'Phishing sites and fake collections trick players into signing malicious transactions.' },
              { label: 'Game-Health Dependency', desc: 'Asset value hinges on an active player base. If the game fades, prices collapse.' },
              { label: 'Market Saturation', desc: 'A flood of low-quality drops dilutes attention and depresses resale demand.' },
            ]}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Real Asset Tokenization vertical                            */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-rwa-intro" className="h-full">
          <VerticalDivider
            emoji="🏢"
            title="Real Asset Tokenization"
            subtitle="Converting ownership rights in physical or financial assets into digital tokens — automated by smart contracts."
            color="#39B54A"
            image={imgRwaProcess}
          />
        </div>

        {/* RWA: Interactive spectrum */}
        <div id="s3-rwa-spectrum" className="h-full">
          <RWASpectrum />
        </div>

        {/* RWA: Securitize */}
        <div id="s3-rwa-securitize" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Securitize · BlackRock BUIDL · BNY Mellon</h2>
            <p className="text-muted-foreground text-sm mt-1">A regulated digital asset issuance and management platform bridging TradFi and blockchain.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#39B54A]">How it works</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Financial firms issue digital securities on blockchain networks (Ethereum, Polygon, Avalanche)</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Each token represents ownership of off-chain assets — treasuries, private credit, structured products</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Investors receive tokenized shares, tradeable and settleable on-chain</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>KYC/AML automated via on-chain compliance modules</li>
              </ul>
              <div className="p-2 bg-[#39B54A]/10 rounded-lg text-xs">
                <span className="font-semibold text-foreground">Regulatory status:</span> <span className="text-muted-foreground">Registered with SEC/FINRA — supports compliant digital securities issuance under U.S. law.</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">Flagship deployments</div>
              <div className="p-4 bg-card border border-[#39B54A]/25 rounded-xl">
                <div className="font-bold text-foreground text-sm mb-1">BlackRock BUIDL</div>
                <p className="text-xs text-muted-foreground">USD Institutional Digital Liquidity Fund — tokenized money-market exposure for institutions.</p>
              </div>
              <div className="p-4 bg-card border border-[#39B54A]/25 rounded-xl">
                <div className="font-bold text-foreground text-sm mb-1">Securitize × BNY Mellon</div>
                <p className="text-xs text-muted-foreground">Tokenized fund backed by AAA-rated structured credit — institutional credit exposure on-chain.</p>
              </div>
              <div className="p-4 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-xl">
                <div className="font-bold text-foreground text-sm mb-1">Value unlocked</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li className="flex gap-1.5"><span className="text-[#39B54A]">›</span>Fractional access to institutional-grade assets</li>
                  <li className="flex gap-1.5"><span className="text-[#39B54A]">›</span>24/7 settlement vs T+1 / T+2 legacy</li>
                  <li className="flex gap-1.5"><span className="text-[#39B54A]">›</span>Streamlined investor onboarding</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RWA: Mortgages */}
        <div id="s3-rwa-mortgages" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Automated Mortgages</h2>
            <p className="text-muted-foreground text-sm mt-1">Lending agreements executed entirely by smart contracts — no banks or loan officers required.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#39B54A]">What the contract does</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Holds and transfers funds based on pre-coded conditions</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Monitors repayment schedule — calculates interest, principal split</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Applies penalties on late payments automatically</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Manages collateral — liquidates if loan defaults</li>
              </ul>
            </div>
            <div className="p-5 bg-card border border-[#6366f1]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#6366f1]">Why on-chain?</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#6366f1]">›</span>No 30–60 day origination process</li>
                <li className="flex gap-2"><span className="text-[#6366f1]">›</span>Transparent terms — borrower and lender see the same code</li>
                <li className="flex gap-2"><span className="text-[#6366f1]">›</span>Lower cost — no bank back office</li>
                <li className="flex gap-2"><span className="text-[#6366f1]">›</span>Programmable repayments — dynamic interest, deferrals encoded</li>
              </ul>
              <div className="p-2 bg-[#6366f1]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                <span className="font-semibold text-foreground">Limitation:</span> the property itself still requires legal title transfer off-chain — for now.
              </div>
            </div>
          </div>
        </div>

        {/* RWA: Collateral */}
        <div id="s3-rwa-collateral" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">RWA Collateral Lending</h2>
            <p className="text-muted-foreground text-sm mt-1">Borrowing against tokenized real-world assets without selling them.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            {[
              { title: 'Capital efficiency', emoji: '💰', desc: 'Investors borrow against tokenized securities without selling — keeping market exposure while unlocking liquidity.', color: '#39B54A' },
              { title: 'Programmable collateral', emoji: '⚙️', desc: 'On-chain securities enable real-time valuation, automated margining, and instant collateral management.', color: '#6366f1' },
              { title: 'Lower lender risk', emoji: '🛡', desc: 'Loans secured by regulated, price-discoverable assets with enforceable claims under existing law.', color: '#8b5cf6' },
              { title: 'Faster settlement', emoji: '⚡', desc: 'Margin calls, top-ups, and liquidations execute instantly — no T+1 or T+2 delay.', color: '#f59e0b' },
              { title: 'Scalable credit layer', emoji: '🏗', desc: 'A compliant on-chain securities financing market — bridging TradFi and DeFi.', color: '#22d3ee' },
              { title: 'New investor classes', emoji: '🌍', desc: 'Retail investors gain access to instruments historically reserved for institutions.', color: '#ec4899' },
            ].map(c => (
              <div key={c.title} className="p-4 bg-card border rounded-xl flex flex-col gap-2"
                style={{ borderColor: c.color + '30' }}>
                <div className="text-3xl">{c.emoji}</div>
                <div className="font-bold text-sm" style={{ color: c.color }}>{c.title}</div>
                <div className="text-xs text-muted-foreground leading-snug">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RWA: Property */}
        <div id="s3-rwa-property" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Property Sales · Real Pilots</h2>
            <p className="text-muted-foreground text-sm mt-1">Property transactions involve escrow, title, notaries — and weeks. Blockchain pilots compress this dramatically.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center">
            <div className="p-4 bg-card border border-[#39B54A]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">Sweden</div>
              <div className="font-black text-foreground text-sm">Land Registry Pilot</div>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                Private blockchain for property conveyance involving banks and government agencies. Title registration dropped from <span className="font-semibold text-foreground">4 months to a few days</span>. All parties access the same tamper-proof records; signing and title updates done digitally.
              </p>
              <div className="p-2 bg-[#39B54A]/10 rounded-lg text-[10px] text-muted-foreground">
                <span className="font-bold text-[#39B54A]">€100M+</span> potential annual savings (Swedish official estimate)
              </div>
            </div>
            <div className="p-4 bg-card border border-[#6366f1]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">Frankfurt</div>
              <div className="font-black text-foreground text-sm">Brickblock</div>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                Blockchain-based real-estate investment platform. Built on <span className="font-semibold text-foreground">Ethereum</span>. Property tokens issued under German regulation.
              </p>
              <div className="p-2 bg-[#6366f1]/10 rounded-lg text-[10px] text-muted-foreground">
                <span className="font-bold text-[#6366f1]">BaFin</span> — operated under Germany's financial regulator
              </div>
            </div>
            <div className="p-4 bg-card border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest">Switzerland</div>
              <div className="font-black text-foreground text-sm">Zurich Bahnhofstrasse Building</div>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                Tokenization of a prestigious building on Zurich's most expensive street. Ownership shares issued as digital tokens via a Swiss GmbH structure. Investors receive rental income and trade tokens on a secondary market.
              </p>
              <div className="p-2 bg-[#8b5cf6]/10 rounded-lg text-[10px] text-muted-foreground">
                <span className="font-bold text-[#8b5cf6]">FINMA</span> — Swiss DLT/security-token guidelines
              </div>
            </div>
          </div>
          <div className="shrink-0 mt-4 p-3 rounded-xl border border-[#22d3ee]/30 bg-[#22d3ee]/06 text-xs text-muted-foreground">
            <span className="font-bold text-[#22d3ee]">EU MiCA · 2024:</span> the first comprehensive regulatory framework for crypto-assets across the EU — providing legal clarity, consumer protection, and market stability across all 27 member states.
          </div>
        </div>

        {/* RWA: Pros / Cons */}
        <div id="s3-rwa-prosCons" className="h-full">
          <ProsConsSlide
            title="RWA Tokenization · Pros & Cons"
            accent="#39B54A"
            pros={[
              { label: 'Fractional Ownership', desc: 'Small investors gain access to high-value real estate, art, or institutional funds with low capital.' },
              { label: 'Increased Liquidity', desc: 'Tokenized assets can trade on secondary markets — improving exit options for historically illiquid holdings.' },
              { label: '24/7 Global Access', desc: 'Investors participate from anywhere, any time — no broker hours, no geographic gating.' },
              { label: 'Reduced Costs', desc: 'Smart contracts automate compliance, transfer, and payout workflows — slashing administrative overhead.' },
              { label: 'Transparent Records', desc: 'Blockchain ensures tamper-proof title, transaction history, and audit trails.' },
              { label: 'Programmable Cash Flows', desc: 'Rental income, dividends, coupons distribute automatically via smart contracts.' },
              { label: 'Faster Settlement', desc: 'Property transfers and securities settlement compress from weeks to minutes/days.' },
            ]}
            cons={[
              { label: 'Regulatory Uncertainty', desc: 'Rules vary by country and evolve quickly — compliance can become a moving target.' },
              { label: 'Low Market Maturity', desc: 'Few active platforms; secondary market volume remains thin compared to traditional venues.' },
              { label: 'Technical Complexity', desc: 'Investors need to understand wallets, smart contracts, custody — UX is not consumer-grade yet.' },
              { label: 'Cybersecurity Risk', desc: 'Vulnerabilities in smart contracts or platforms can expose investors to total loss.' },
              { label: 'Lingering Illiquidity', desc: 'Despite tokenization, some real-estate assets simply lack buyers — wrappers don\'t create demand.' },
              { label: 'Custodial Wrappers Required', desc: 'Real-world assets still need legal entities (SPVs, trustees) to hold underlying property.' },
              { label: 'Valuation Drift', desc: 'On-chain token prices may diverge from underlying asset NAV — pricing reliability is an open problem.' },
            ]}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Supply Chain vertical                                       */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-sc-intro" className="h-full">
          <VerticalDivider
            emoji="🚚"
            title="Supply Chain"
            subtitle="Recording every hand-off of a physical good — from raw-material pickup to retail shelf — as a tamper-proof block."
            color="#f59e0b"
            image={imgSupplyProv}
          />
        </div>

        {/* Supply Chain: Provenance (interactive QR scan) */}
        <div id="s3-sc-provenance" className="h-full">
          <ProvenanceQR />
        </div>

        {/* Supply Chain: LVMH + Carrefour real-world */}
        <div id="s3-sc-prov-real" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Provenance in Production</h2>
            <p className="text-muted-foreground text-sm mt-1">Two flagship deployments — luxury anti-counterfeit and organic-food traceability.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-gradient-to-br from-[#f59e0b]/10 to-transparent border border-[#f59e0b]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👜</span>
                <div>
                  <div className="font-black text-sm text-foreground">LVMH · Aura Consortium</div>
                  <div className="text-xs text-[#f59e0b]">Louis Vuitton, Prada, Cartier coalition</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every handbag, watch, or perfume bottle gets a <span className="font-semibold text-foreground">digital passport</span> on a permissioned blockchain — recording materials, manufacturing date, and ownership changes. Scanning the embedded NFC or QR tag reveals provenance to shoppers, while smart-contract updates ensure resale platforms and after-sales services access accurate, brand-verified data throughout the product's lifetime.
              </p>
              <div className="p-2 bg-[#f59e0b]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                <span className="font-semibold text-foreground">Goal:</span> fight counterfeiting and enhance customer trust across luxury brands.
              </div>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#39B54A]/10 to-transparent border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐔</span>
                <div>
                  <div className="font-black text-sm text-foreground">Carrefour BIO · Organic chicken provenance</div>
                  <div className="text-xs text-[#39B54A]">European retailer, consumer-facing QR</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every Carrefour BIO chicken carries a QR code. Scanning pulls a blockchain record showing breed, farm GPS, organic feed, antibiotic-free status, slaughter date, packing plant, and temperature-controlled transport history. Data uploaded by farmers, processors, and logistics partners at hand-off — locked on a permissioned ledger.
              </p>
              <div className="p-2 bg-[#39B54A]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                Faster recalls, stronger trust in the organic label, instant tamper-proof proof of authenticity.
              </div>
            </div>
          </div>
        </div>

        {/* Supply Chain: Shipping */}
        <div id="s3-sc-shipping" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Global Shipping Documents · GSBN eBL</h2>
            <p className="text-muted-foreground text-sm mt-1">Bills of Lading and customs forms, courier-couriered for centuries — now tokenized on a shared ledger.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#ED1C24]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#ED1C24]">The legacy problem</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span>Bills of Lading and Letters of Credit move as paper — couriered across oceans</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span>Documents prone to loss, fraud, week-long delays</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span>Carriers, ports, banks, and regulators each maintain separate records</li>
                <li className="flex gap-2"><span className="text-[#ED1C24]">›</span>Reconciling discrepancies takes days of phone calls</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#39B54A]/10 to-transparent border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img src={imgGsbnEbl} alt="Container ship and an electronic Bill of Lading with QR code" className="hidden lg:block h-16 object-contain shrink-0" />
                <div>
                  <div className="font-black text-sm text-foreground">Global Shipping Business Network (GSBN)</div>
                  <div className="text-xs text-[#39B54A]">COSCO · Hapag-Lloyd · OOCL · ONE + major ports</div>
                </div>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Permissioned blockchain issuing electronic Bills of Lading (eBLs)</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Each digital document cryptographically signed, shareable in seconds, tamper-evident</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Smart contracts notify customs on cargo load, trigger goods release on ownership transfer, settle carrier fees</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Live since 2021 — over <span className="font-semibold text-foreground">2 million containers</span> processed</li>
                <li className="flex gap-2"><span className="text-[#39B54A]">›</span>Targeting <span className="font-semibold text-foreground">50% eBL adoption by 2026</span></li>
              </ul>
              <div className="p-2 bg-[#39B54A]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                Document turnaround compressed from <span className="font-semibold text-foreground">days to hours</span>.
              </div>
            </div>
          </div>
        </div>

        {/* Supply Chain: Pros / Cons */}
        <div id="s3-sc-prosCons" className="h-full">
          <ProsConsSlide
            title="Supply Chain · Pros & Cons"
            accent="#f59e0b"
            pros={[
              { label: 'Transparency', desc: 'All partners see the same tamper-proof ledger — eliminating information asymmetry.' },
              { label: 'Real-Time Traceability', desc: 'A product\'s full journey can be located within seconds — not days.' },
              { label: 'Process Automation', desc: 'Smart contracts trigger payments, releases, and alerts without manual checks.' },
              { label: 'Faster Dispute Resolution', desc: 'Shared data removes he-said-she-said — investigations and chargebacks shorten dramatically.' },
              { label: 'Cost Reduction', desc: 'Less paperwork, fewer courier fees, streamlined audits — overall overhead drops.' },
              { label: 'Regulatory Compliance', desc: 'Immutable logs provide instant evidence for food, pharma, and customs inspections.' },
              { label: 'Consumer Trust', desc: 'Shoppers scan a code to verify origin, quality, and handling conditions.' },
            ]}
            cons={[
              { label: 'Data-Input Integrity', desc: '"Garbage in, garbage forever" — bad sensor data still writes immutably to the chain.' },
              { label: 'Integration Complexity', desc: 'Legacy ERPs, IoT devices, and port systems require costly and complicated connections.' },
              { label: 'Standard Fragmentation', desc: 'Competing consortia hinder network effects and global interoperability.' },
              { label: 'Implementation Cost', desc: 'Sensors, middleware, and change management demand significant upfront investment.' },
              { label: 'Scalability', desc: 'Public chains may struggle with container-level transaction volumes.' },
              { label: 'Stakeholder Coordination', desc: 'Rival companies must cooperate. Adoption stalls if key partners refuse to participate.' },
            ]}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Digital Certification vertical                              */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-cert-intro" className="h-full">
          <VerticalDivider
            emoji="📜"
            title="Digital Certification"
            subtitle="Tamper-proof, easily verifiable digital records — diplomas, land titles, product authenticity — issued and validated on-chain."
            color="#22d3ee"
            image={imgCertDecent}
          />
        </div>

        {/* Cert: Interactive proof-of-existence */}
        <div id="s3-cert-howitworks" className="h-full">
          <ProofOfExistenceDemo />
        </div>

        {/* Cert: Estonia */}
        <div id="s3-cert-law" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Estonia · KSI Blockchain (Guardtime)</h2>
            <p className="text-muted-foreground text-sm mt-1">Government records, registries, and healthcare data integrity since 2012.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#22d3ee]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#22d3ee]">What Estonia did</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Permissioned blockchain (Guardtime's KSI) used since <span className="font-semibold text-foreground">2012</span></li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Enforces integrity of land registry, business registry, court system, healthcare records</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>"Keyless" signatures — relies on hash chains, not private keys</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Detects any tampering of historical records</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#22d3ee]/10 to-transparent border border-[#22d3ee]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#22d3ee]">The principle</div>
              <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-[#22d3ee] pl-3">
                "History cannot be rewritten by anybody and the authenticity of electronic data can be guaranteed."
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By using blockchain as a backbone for data integrity, Estonia ensures official records are beyond tampering — even by future government insiders. This is digital sovereignty by mathematical proof rather than institutional trust.
              </p>
              <div className="p-2 bg-[#22d3ee]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                <span className="font-semibold text-foreground">Why it matters:</span> Estonia treats blockchain as <span className="italic">infrastructure</span> — not a product. The same principle now underpins their e-Residency program and X-Road data exchange.
              </div>
            </div>
          </div>
        </div>

        {/* Cert: Education */}
        <div id="s3-cert-education" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Education · MIT Blockcerts</h2>
            <p className="text-muted-foreground text-sm mt-1">Combating fake degrees and simplifying credential verification.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#22d3ee]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#22d3ee]">The problem</div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Verifying a diploma traditionally requires emailing the registrar — days of delay</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Fake transcripts and credentials are a multi-billion-dollar fraud market</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>International credential recognition is especially friction-heavy</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Students don't truly own their academic record — institutions do</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#22d3ee]/10 to-transparent border border-[#22d3ee]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                <div>
                  <div className="font-black text-sm text-foreground">MIT pilot · 2017</div>
                  <div className="text-xs text-[#22d3ee]">Open Blockcerts standard</div>
                </div>
              </div>
              <ul className="text-xs text-muted-foreground space-y-2 flex-1">
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Issued blockchain-based digital certificates to <span className="font-semibold text-foreground">100+ graduates</span></li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>App lets graduates share a tamper-proof, verifiable digital diploma</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>Employers click a link or scan a QR code → instantly verify on-chain</li>
                <li className="flex gap-2"><span className="text-[#22d3ee]">›</span>No more transcript request bureaucracy</li>
              </ul>
              <div className="p-2 bg-[#22d3ee]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                Open standard now adopted by universities globally — students truly own their credentials.
              </div>
            </div>
          </div>
        </div>

        {/* Cert: Products */}
        <div id="s3-cert-products" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Product Authenticity · Luxury Goods</h2>
            <p className="text-muted-foreground text-sm mt-1">Digital "title deeds" of authenticity for high-value physical products.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5 content-center">
            <div className="p-5 bg-card border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-3">
              <div className="font-bold text-sm text-[#8b5cf6]">How it works</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                When a customer buys a high-end handbag, watch, or piece of jewelry, they scan a code that retrieves the item's blockchain certificate. The certificate includes origin, materials, manufacturing date, and full ownership history.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1.5 mt-1">
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Buyers verify authenticity instantly</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Resellers prove provenance</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Counterfeiters can't fake on-chain history</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>After-sales service tied to verified ownership</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💎</span>
                <div>
                  <div className="font-black text-sm text-foreground">AURA Blockchain Consortium</div>
                  <div className="text-xs text-[#8b5cf6]">LVMH · Prada · Cartier (founding partners)</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Co-founded by LVMH (Louis Vuitton, Hublot, Bulgari, etc.) alongside Prada and Cartier. Issues a unique digital certificate for each luxury item — handbag, watch, jewelry — recorded on a secure blockchain. Consumers scan to access authenticity, provenance, and ownership history.
              </p>
              <div className="p-2 bg-[#8b5cf6]/10 rounded-lg text-xs text-muted-foreground mt-auto">
                Industry-wide standard for luxury authentication — collaborative rather than competitive infrastructure.
              </div>
            </div>
          </div>
        </div>

        {/* Cert: Pros / Cons */}
        <div id="s3-cert-prosCons" className="h-full">
          <ProsConsSlide
            title="Digital Certification · Pros & Cons"
            accent="#22d3ee"
            pros={[
              { label: 'Tamper-Proof & Verifiable', desc: 'Certificates are hashed and stored on-chain — making them immutable.' },
              { label: 'Eliminates Forgery', desc: 'Even single-character alterations are detectable. Reduces fake diplomas, licenses, and credentials to ~zero.' },
              { label: 'No Intermediaries', desc: 'Removes the need for notaries, registry offices, or institutional verification emails.' },
              { label: 'Instant & Global', desc: 'Recipients share credentials digitally; employers verify them in seconds, anywhere.' },
              { label: 'Cost & Time Efficiency', desc: 'No more printing, postage, manual checks. Issuance and verification accelerate dramatically.' },
              { label: 'Self-Sovereignty', desc: 'Users hold their own credentials — reducing institutional gatekeeping.' },
            ]}
            cons={[
              { label: 'Legal Recognition', desc: 'In many countries, blockchain-based records aren\'t legally recognized as official proof.' },
              { label: 'User Literacy', desc: 'Users need basic knowledge of blockchain, wallets, or verification tools to participate.' },
              { label: 'Implementation Cost', desc: 'Setting up a robust certification system requires technical expertise and initial investment.' },
              { label: 'Privacy Concerns', desc: 'Even hashed metadata may leak personal information if not carefully designed.' },
              { label: 'Revocation Complexity', desc: 'Once written to a blockchain, it\'s permanent. Revoking or updating requires extra contract logic.' },
              { label: 'Vendor Lock-in', desc: 'Different consortia use different chains — interoperability still emerging.' },
            ]}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Cross-industry Case Studies                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}

        <div id="s3-cases-intro" className="h-full">
          <VerticalDivider
            emoji="📁"
            title="Cross-Industry Case Studies"
            subtitle="Eight flagship deployments — five successes, two cautionary tales, one notorious hack. Real lessons for real builders."
            color="#6366f1"
          />
        </div>

        {/* ═══════ CASE STUDY 1 — HOME DEPOT ═══════ */}
        <div id="s3-homedepot" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-1">
            <div className="text-xs font-bold text-[#f59e0b] uppercase tracking-widest mb-1">Case Study 01 — Supply Chain</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Home Depot: Supply Chain Dispute Resolution</h2>
            <p className="text-muted-foreground text-sm mt-1">How the world's largest home improvement retailer used blockchain to eliminate weeks of supplier disputes.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center mt-4">

            {/* Problem */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-[#ED1C24] flex items-center justify-center text-white text-xs font-black shrink-0">01</div>
                <div className="text-xs font-bold text-[#ED1C24] uppercase tracking-widest">The Problem</div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-br from-[#ED1C24]/10 to-transparent border border-[#ED1C24]/30 rounded-xl flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Home Depot manages <span className="text-foreground font-semibold">thousands of suppliers</span> across a global supply chain. When goods arrived damaged, delayed, or incorrect, resolving the dispute required:
                </p>
                <ul className="space-y-2">
                  {[
                    'Weeks of back-and-forth emails between buyer and supplier',
                    'Manual reconciliation of paper invoices, purchase orders, and shipping docs',
                    'No single source of truth — each party had different records',
                    'Average resolution time: 3–5 weeks, tying up cash flow',
                  ].map(p => (
                    <li key={p} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="text-[#ED1C24] shrink-0 mt-0.5">✗</span>{p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto p-2 bg-[#ED1C24]/10 rounded-lg text-xs text-center">
                  <span className="font-bold text-[#ED1C24]">Cost:</span> <span className="text-muted-foreground">Millions in delayed payments, admin overhead, and strained supplier relationships</span>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-[#6366f1] flex items-center justify-center text-white text-xs font-black shrink-0">02</div>
                <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">The Solution</div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-br from-[#6366f1]/10 to-transparent border border-[#6366f1]/30 rounded-xl flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Home Depot deployed a <span className="text-foreground font-semibold">blockchain-based supply chain platform</span> in partnership with IBM (Hyperledger Fabric):
                </p>
                <ul className="space-y-2">
                  {[
                    'All purchase orders, shipping confirmations, and invoices recorded on a shared ledger in real time',
                    'Smart contracts auto-match delivery confirmations against POs — flagging discrepancies instantly',
                    'Both Home Depot and suppliers see the same immutable data — no he-said-she-said',
                    'Dispute resolution triggers automatically when conditions deviate from contract terms',
                  ].map(s => (
                    <li key={s} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="text-[#6366f1] shrink-0 mt-0.5">›</span>{s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto p-2 bg-[#6366f1]/10 rounded-lg text-xs text-center font-mono">
                  Delivery confirmed → Invoice auto-approved → Payment released
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-[#39B54A] flex items-center justify-center text-white text-xs font-black shrink-0">03</div>
                <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">The Results</div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-br from-[#39B54A]/10 to-transparent border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { metric: '3–5 weeks → hours', label: 'Dispute resolution time', color: '#39B54A' },
                    { metric: '↓ significantly', label: 'Administrative overhead', color: '#6366f1' },
                    { metric: '↑ improved', label: 'Supplier relationships', color: '#f59e0b' },
                    { metric: 'Single source of truth', label: 'Shared data for all parties', color: '#8b5cf6' },
                  ].map(r => (
                    <div key={r.label} className="p-3 bg-card border border-border rounded-xl">
                      <div className="font-black text-sm" style={{ color: r.color }}>{r.metric}</div>
                      <div className="text-xs text-muted-foreground">{r.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto p-2 bg-[#39B54A]/10 rounded-lg">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Platform:</span> IBM Blockchain (Hyperledger Fabric) — permissioned, only Home Depot and its suppliers participate.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ CASE STUDY 2 — PROPY ═══════ */}
        <div id="s3-realestate" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-1">
            <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest mb-1">Case Study 02 — Real Estate</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Propy: Real-Estate NFT Deeds</h2>
            <p className="text-muted-foreground text-sm mt-1">The first legally recognised property sale via NFT — and what it means for real estate globally.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center mt-4">

            {/* Problem */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-[#ED1C24] flex items-center justify-center text-white text-xs font-black shrink-0">01</div>
                <div className="text-xs font-bold text-[#ED1C24] uppercase tracking-widest">The Problem</div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-br from-[#ED1C24]/10 to-transparent border border-[#ED1C24]/30 rounded-xl flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Real estate transactions remain one of the most <span className="text-foreground font-semibold">friction-heavy processes</span> in the modern economy:
                </p>
                <ul className="space-y-2">
                  {[
                    '30–60 day closing timelines: title search, escrow, notarization, county recording',
                    'Multiple intermediaries: agents, lawyers, title companies, banks — each taking a cut',
                    'Paper-based deeds stored in local county offices — vulnerable to loss, fraud, and errors',
                    'Cross-border property purchases nearly impossible without local legal representation',
                  ].map(p => (
                    <li key={p} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="text-[#ED1C24] shrink-0 mt-0.5">✗</span>{p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto p-2 bg-[#ED1C24]/10 rounded-lg text-xs text-center">
                  <span className="font-bold text-[#ED1C24]">US market:</span> <span className="text-muted-foreground">$1.7T in annual home sales — ~6% in transaction costs</span>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-[#8b5cf6] flex items-center justify-center text-white text-xs font-black shrink-0">02</div>
                <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest">The Solution</div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Propy places the property deed inside an <span className="text-foreground font-semibold">ERC-721 NFT</span> (Ethereum). Ownership of the NFT = legal ownership of the property:
                </p>
                <ul className="space-y-2">
                  {[
                    'Property is held inside an LLC; the NFT represents ownership of the LLC',
                    'Transferring the NFT = transferring the LLC = transferring the property',
                    'Smart contract handles escrow — funds released only when title is confirmed',
                    'Transaction recorded on Ethereum: public, permanent, globally accessible',
                    'Settlement time: hours instead of weeks',
                  ].map(s => (
                    <li key={s} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="text-[#8b5cf6] shrink-0 mt-0.5">›</span>{s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto p-2 bg-[#8b5cf6]/10 rounded-lg text-xs text-center font-mono">
                  NFT transfer → LLC transfer → Property transfer
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-[#39B54A] flex items-center justify-center text-white text-xs font-black shrink-0">03</div>
                <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">The Results</div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-br from-[#39B54A]/10 to-transparent border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { metric: '$215,000', label: 'First NFT property sale — Kyiv, Ukraine (2017)', color: '#39B54A' },
                    { metric: '$653,000', label: 'First US NFT home sale — Gulfport, Florida (2022)', color: '#8b5cf6' },
                    { metric: 'Hours vs weeks', label: 'Settlement time reduction', color: '#f59e0b' },
                    { metric: 'Cross-border', label: 'Any buyer, anywhere — no local agent required', color: '#6366f1' },
                  ].map(r => (
                    <div key={r.label} className="p-3 bg-card border border-border rounded-xl">
                      <div className="font-black text-sm" style={{ color: r.color }}>{r.metric}</div>
                      <div className="text-xs text-muted-foreground">{r.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto p-2 bg-[#39B54A]/10 rounded-lg text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Caveat:</span> legal framework still requires the LLC wrapper. Direct deed-as-NFT requires legislative change in most jurisdictions.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ CASE STUDY 3 — CALIFORNIA DMV ═══════ */}
        <div id="s3-dmv" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-1">
            <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-widest mb-1">Case Study 03 — Government</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">California DMV: Vehicle Titles on Avalanche</h2>
            <p className="text-muted-foreground text-sm mt-1">The largest US state DMV moves 42 million vehicle titles to a public blockchain — live in 2024.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center mt-4">

            {/* Problem */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-[#ED1C24] flex items-center justify-center text-white text-xs font-black shrink-0">01</div>
                <div className="text-xs font-bold text-[#ED1C24] uppercase tracking-widest">The Problem</div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-br from-[#ED1C24]/10 to-transparent border border-[#ED1C24]/30 rounded-xl flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  California's DMV manages <span className="text-foreground font-semibold">42 million vehicle titles</span> on legacy paper-based systems dating back decades:
                </p>
                <ul className="space-y-2">
                  {[
                    'Paper titles easily lost, damaged, or forged — enabling vehicle fraud worth billions annually',
                    'Title transfers require in-person DMV visits — average wait: 2–3 hours',
                    'Lenders cannot instantly verify clear title before approving auto loans',
                    'Out-of-state transfers require duplicate paperwork and weeks of processing',
                  ].map(p => (
                    <li key={p} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="text-[#ED1C24] shrink-0 mt-0.5">✗</span>{p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto p-2 bg-[#ED1C24]/10 rounded-lg text-xs text-center">
                  <span className="font-bold text-[#ED1C24]">Scale:</span> <span className="text-muted-foreground">~42M titles, largest state vehicle registry in the US</span>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-[#22d3ee] flex items-center justify-center text-white text-xs font-black shrink-0">02</div>
                <div className="text-xs font-bold text-[#22d3ee] uppercase tracking-widest">The Solution</div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-br from-[#22d3ee]/10 to-transparent border border-[#22d3ee]/30 rounded-xl flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Partnership with <span className="text-foreground font-semibold">Oxhead Alpha</span> to migrate all CA vehicle titles to the <span className="text-foreground font-semibold">Avalanche blockchain</span> as digital NFTs:
                </p>
                <ul className="space-y-2">
                  {[
                    'Each vehicle title becomes a unique NFT — representing legal ownership on-chain',
                    'Title transfers executed as blockchain transactions — instant, tamper-proof, auditable',
                    'Lienholders (banks) can verify and release liens digitally — no paper, no delay',
                    'Avalanche chosen for: EVM compatibility, low fees, high throughput, and custom subnet support',
                    'DMV retains control via a permissioned Avalanche subnet',
                  ].map(s => (
                    <li key={s} className="flex gap-2 text-xs text-muted-foreground">
                      <span className="text-[#22d3ee] shrink-0 mt-0.5">›</span>{s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto p-2 bg-[#22d3ee]/10 rounded-lg text-xs text-center font-mono">
                  Title NFT minted → Transfer = blockchain tx → Lien released on-chain
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-lg bg-[#39B54A] flex items-center justify-center text-white text-xs font-black shrink-0">03</div>
                <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">The Results</div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-br from-[#39B54A]/10 to-transparent border border-[#39B54A]/30 rounded-xl flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { metric: '42 million', label: 'Vehicle titles migrated to blockchain (2024)', color: '#22d3ee' },
                    { metric: 'Minutes vs weeks', label: 'Title transfer processing time', color: '#39B54A' },
                    { metric: 'Real-time', label: 'Lien verification for lenders', color: '#6366f1' },
                    { metric: 'First in the US', label: 'State government blockchain title system at scale', color: '#f59e0b' },
                  ].map(r => (
                    <div key={r.label} className="p-3 bg-card border border-border rounded-xl">
                      <div className="font-black text-sm" style={{ color: r.color }}>{r.metric}</div>
                      <div className="text-xs text-muted-foreground">{r.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto p-2 bg-[#39B54A]/10 rounded-lg">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Key takeaway:</span> even government institutions trust blockchain for legal record-keeping — when the use case (immutable, auditable, shared ownership) fits perfectly.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ═══════ CASE STUDY — WALMART FOOD TRUST ═══════ */}
        <div id="s3-walmart" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-1 flex items-start gap-4">
            <img src={imgWalmart} alt="Walmart Food Trust — IBM Blockchain on a phone next to a crate of oranges" className="hidden lg:block h-24 rounded-lg object-cover shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest mb-1">Case Study 04 — Food Supply</div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Walmart · Food Trust</h2>
              <p className="text-muted-foreground text-sm mt-1">Tracing food contamination from 7 days to 2.2 seconds — IBM Hyperledger Fabric in production.</p>
            </div>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center mt-4">
            <div className="p-4 bg-gradient-to-br from-[#ED1C24]/10 to-transparent border border-[#ED1C24]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#ED1C24] uppercase tracking-widest">The Problem</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Food contamination outbreaks (E. coli in lettuce, 2018) took <span className="font-semibold text-foreground">7 days</span> to trace back to source. Entire product categories pulled from shelves. Massive collateral damage to suppliers.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1.5 mt-1">
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>Manual paper trails through farms, distributors, retailers</li>
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>Multiple parties, each with isolated systems</li>
                <li className="flex gap-1.5"><span className="text-[#ED1C24]">›</span>Trust gaps — who's accountable for contamination?</li>
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#6366f1]/10 to-transparent border border-[#6366f1]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">The Solution</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">IBM Food Trust</span> on <span className="font-semibold text-foreground">Hyperledger Fabric</span>. Every step recorded on a permissioned blockchain — from farm to shelf. All participants see the same data.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1.5 mt-1">
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>Farmers, packers, distributors, stores all submit data at hand-off</li>
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>QR codes link physical products to on-chain provenance</li>
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>Permissioned chain — only network members can read/write</li>
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#39B54A]/10 to-transparent border border-[#39B54A]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">The Results</div>
              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-card border border-border rounded-lg">
                  <div className="font-mono font-black text-base text-[#39B54A]">7 days → 2.2 seconds</div>
                  <div className="text-[10px] text-muted-foreground">Trace-back time for product origin</div>
                </div>
                <div className="p-2 bg-card border border-border rounded-lg">
                  <div className="font-mono font-black text-base text-[#39B54A]">25+</div>
                  <div className="text-[10px] text-muted-foreground">Product categories tracked</div>
                </div>
                <div className="p-2 bg-card border border-border rounded-lg">
                  <div className="font-mono font-black text-base text-[#39B54A]">750+</div>
                  <div className="text-[10px] text-muted-foreground">Suppliers onboarded</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground p-2 bg-[#39B54A]/10 rounded-lg mt-auto">
                <span className="font-semibold text-foreground">Why it works:</span> high-value transparency, multi-party trust gap, and a network with strong incentives to participate.
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ CASE STUDY — SANTANDER BOND ═══════ */}
        <div id="s3-santander" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-1 flex items-start gap-4">
            <img src={imgSantander} alt="Santander branch storefront" className="hidden lg:block h-24 rounded-lg object-cover shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-1">Case Study 05 — Banking</div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Santander · End-to-End Blockchain Bond</h2>
              <p className="text-muted-foreground text-sm mt-1">$20M bond issued entirely on Ethereum — the first major bank to settle a security on a public chain.</p>
            </div>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 content-center mt-4">
            <div className="p-4 bg-gradient-to-br from-[#6366f1]/10 to-transparent border border-[#6366f1]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest">Background</div>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span><span className="font-semibold text-foreground">$20M bond</span> issued in 2019</li>
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>Entirely on Ethereum mainnet — public, permissionless</li>
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>First major bank to issue a security on a public blockchain</li>
                <li className="flex gap-1.5"><span className="text-[#6366f1]">›</span>Cash leg also tokenized — full end-to-end on-chain settlement</li>
              </ul>
              <p className="text-xs text-muted-foreground italic border-l-2 border-[#6366f1] pl-2 mt-1">
                "A technology innovation issue more than a pure financial issue."
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest">Why It Worked</div>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Multiple jurisdictions involved — public chain neutralizes location</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Complex traditional settlement → atomic on-chain settlement</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Immutability creates a permanent audit trail for regulators</li>
                <li className="flex gap-1.5"><span className="text-[#8b5cf6]">›</span>Value of fast settlement &gt; the gas cost</li>
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#39B54A]/10 to-transparent border border-[#39B54A]/30 rounded-xl flex flex-col gap-2">
              <div className="text-xs font-bold text-[#39B54A] uppercase tracking-widest">Benefits</div>
              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-card border border-border rounded-lg">
                  <div className="font-mono font-black text-base text-[#39B54A]">T+2 → same day</div>
                  <div className="text-[10px] text-muted-foreground">Settlement timeline</div>
                </div>
                <div className="p-2 bg-card border border-border rounded-lg">
                  <div className="font-mono font-black text-base text-[#39B54A]">~50%</div>
                  <div className="text-[10px] text-muted-foreground">Estimated cost reduction</div>
                </div>
                <div className="p-2 bg-card border border-border rounded-lg">
                  <div className="font-mono font-black text-base text-[#39B54A]">No clearinghouse</div>
                  <div className="text-[10px] text-muted-foreground">Reduced intermediaries</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ EXERCISE: DESIGN YOUR OWN ═══════ */}
        <div id="s3-exercise" className="h-full">
          <DesignYourOwnExercise />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s3-quiz" className="h-full">
          <QuizSlide
            question="The California DMV digitized 42 million vehicle titles on blockchain. What is the primary advantage of blockchain over the traditional paper title system?"
            options={[
              { text: 'Blockchain storage is cheaper than paper filing, reducing the DMV operating budget significantly.', correct: false },
              { text: 'Title transfers and ownership verification can occur in minutes without contacting the DMV — eliminating fraud via immutable provenance records.', correct: true },
              { text: 'Vehicle titles are now publicly visible to anyone without identity verification, increasing transparency.', correct: false },
              { text: 'Vehicle theft becomes impossible because titles are stored on-chain and cannot be cloned.', correct: false },
            ]}
            explanation="The core blockchain advantage here is trustless verification of ownership history. Traditional paper titles require physical transfer, manual verification, and weeks of processing. With blockchain, a buyer can instantly verify the full ownership chain, detect odometer fraud, and confirm the seller has clear title — all without trusting the DMV database or the seller's word. The immutability makes forgery structurally impossible rather than merely difficult. Blockchain storage is actually more expensive than paper — the value is in verification speed and fraud elimination, not cost."
          />
        </div>

        <div id="s3-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 03 — Key Takeaways"
            takeaways={[
              'Five industry verticals — DeFi, Gaming/NFTs, RWA, Supply Chain, Digital Cert — all show smart contracts in production today',
              'DeFi: AMMs, stablecoins, and borderless transfers reshape financial rails (Uniswap $1.5B/day, Shopify USDC)',
              'NFTs deliver true digital ownership and embedded creator royalties — Ubisoft Champions Tactics is mainstream',
              'RWA tokenization spans the spectrum from sovereign debt (BlackRock BUIDL) to real estate (Sweden, Brickblock, Zurich)',
              'Supply chain wins when multiple parties need shared truth — Walmart Food Trust traces back from days to seconds',
              'Digital certification works at scale — MIT Blockcerts diplomas (2017+), LVMH luxury authentication',
              'The common thread for success: many parties, no trusted authority, value from automation and shared truth',
              'Coming up in Section 4 — three lessons from the field: when blockchain wins (Estonia), when it backfires (The DAO), when it shouldn\'t have been picked (ASX)',
            ]}
          />
        </div>

        {/* ═══════ SUMMARY ═══════ */}
        <div id="s3-summary" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Section Summary</h2>
            <p className="text-sm text-muted-foreground mt-1">Industries and case studies covered — at a glance</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-4 gap-3 content-start">
            {[
              { icon: '💸', title: 'DeFi', summary: 'AMMs (Uniswap, CoW Swap) · stablecoins (Shopify/USDC) · borderless transfers (USDC on L2)', color: '#6366f1' },
              { icon: '🎮', title: 'Gaming & NFTs', summary: 'True ownership · P2E (Ubisoft Champions Tactics) · NFT collateral lending', color: '#8b5cf6' },
              { icon: '🏢', title: 'RWA Tokenization', summary: 'BlackRock BUIDL · Sweden land registry · Zurich Bahnhofstrasse · MiCA framework', color: '#39B54A' },
              { icon: '🚚', title: 'Supply Chain', summary: 'LVMH Aura · Carrefour BIO · GSBN eBL Network (2M+ containers)', color: '#f59e0b' },
              { icon: '📜', title: 'Digital Cert', summary: 'Estonia KSI · MIT Blockcerts · LVMH AURA luxury authentication', color: '#22d3ee' },
              { icon: '🏠', title: 'Home Depot', summary: 'Supplier disputes weeks → hours with Hyperledger Fabric', color: '#6366f1' },
              { icon: '🏡', title: 'Propy', summary: 'NFT real-estate deeds — first US property sale on-chain', color: '#8b5cf6' },
              { icon: '🚗', title: 'CA DMV', summary: '42M vehicle titles on Avalanche — first US state at scale', color: '#22d3ee' },
              { icon: '🥬', title: 'Walmart', summary: 'Food trace from 7 days → 2.2 seconds via IBM Food Trust', color: '#39B54A' },
              { icon: '💼', title: 'Santander', summary: '$20M end-to-end Ethereum bond — first major bank, T+2 → same-day', color: '#6366f1' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex flex-col gap-2 p-3 rounded-xl border bg-card"
                style={{ borderColor: card.color + '30' }}
              >
                <div className="text-2xl">{card.icon}</div>
                <div className="font-bold text-xs text-foreground">{card.title}</div>
                <div className="text-[11px] text-muted-foreground leading-snug">{card.summary}</div>
              </motion.div>
            ))}
          </div>
          <div className="shrink-0 mt-3 p-3 rounded-xl border border-border bg-card/50 text-center">
            <span className="text-xs text-muted-foreground">Continue to Section 4 — Critical Thinking: when to use a smart contract → and when not to →</span>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
