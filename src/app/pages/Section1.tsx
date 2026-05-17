import { useState, useEffect, useCallback } from 'react';
import { TitleSlide } from '../components/templates/TitleSlide';
import { ConceptSlide } from '../components/templates/ConceptSlide';
import { ComparisonSlide } from '../components/templates/ComparisonSlide';
import { DiagramSlide } from '../components/templates/DiagramSlide';
import { QuizSlide } from '../components/templates/QuizSlide';
import { DiscussionSlide } from '../components/templates/DiscussionSlide';
import { TakeawaySlide } from '../components/templates/TakeawaySlide';
import { CalloutBox } from '../components/shared/CalloutBox';
import { BlockchainChain } from '../components/blockchain/BlockchainChain';
import { BlockchainBlock } from '../components/blockchain/BlockchainBlock';
import { ConsensusVisualization } from '../components/blockchain/ConsensusVisualization';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components/ui/tooltip';
import { Blocks, PenTool } from 'lucide-react';
import { SectionNav } from '../components/navigation/SectionNav';

const section1Chapters = [
  { id: 's1-vocab', label: 'Vocabulary Wall' },
  { id: 's1-dlt', label: 'DLT Models' },
  { id: 's1-trust', label: 'Trusted Third Parties' },
  { id: 's1-blockchain-types', label: 'Blockchain Types' },
  { id: 's1-hashing', label: 'Cryptographic Hashing' },
  { id: 's1-merkle', label: 'Merkle Trees' },
  { id: 's1-blocks', label: 'Blocks & Composition' },
  { id: 's1-wallets', label: 'Wallets & Signatures' },
  { id: 's1-tx', label: 'Transaction Lifecycle' },
  { id: 's1-consensus', label: 'Consensus Mechanisms' },
  { id: 's1-chain-builder', label: 'Chain Builder' },
  { id: 's1-quiz', label: 'Quizzes' },
  { id: 's1-takeaways', label: 'Takeaways' },
];

/* ── Brick Wall data ─────────────────────────────────── */
const brickDefinitions: Record<string, string> = {
  "Block": "A container of validated transactions that is cryptographically linked to the previous block.",
  "Peer-to-Peer": "A network where participants communicate directly without a central server.",
  "Mempool": "A waiting area where unconfirmed transactions sit before being included in a block.",
  "Transaction": "A signed instruction to transfer value or data on the blockchain.",
  "Merkle Tree": "A tree-shaped data structure that efficiently summarizes and verifies large sets of transactions.",
  "Propagation": "The process by which transactions and blocks spread across the network from node to node.",
  "Tippers": "Users who attach extra fees to incentivize miners/validators to prioritize their transactions.",
  "Wallet": "Software that stores your private keys and lets you sign and send transactions.",
  "Consensus": "The mechanism by which all nodes agree on the current state of the blockchain.",
  "Hashing": "A one-way function that converts any input into a fixed-size fingerprint, used to ensure data integrity.",
  "Crypto": "Short for cryptography — the mathematical foundation that secures blockchain networks.",
  "Smart Contracts": "Self-executing programs stored on the blockchain that run automatically when conditions are met.",
  "Dapp": "A decentralized application that runs on a blockchain instead of a central server.",
  "RPC": "Remote Procedure Call — an interface that lets applications communicate with a blockchain node.",
  "ICO": "Initial Coin Offering — a fundraising method where new tokens are sold to early investors.",
  "NFT": "Non-Fungible Token — a unique digital asset representing ownership of a specific item on-chain.",
  "Stablecoin": "A cryptocurrency pegged to a stable asset like the US dollar to minimize price volatility.",
  "ERC": "Ethereum Request for Comments — a set of standards for tokens and smart contracts on Ethereum.",
  "Node": "A computer that participates in the blockchain network by storing a copy of the ledger and validating transactions.",
  "Mining": "The process of using computational power to solve cryptographic puzzles, validate transactions, and earn block rewards.",
  "Private Key": "A secret number that proves ownership of a blockchain address and authorizes outgoing transactions. Never share it.",
  "Public Key": "A cryptographic key derived from your private key, used to generate addresses and verify your digital signatures.",
  "Address": "A shortened, shareable identifier derived from your public key — like an account number for receiving funds.",
  "Nonce": "A number miners increment to find a hash below the target difficulty — the core mechanic of Proof of Work.",
  "Gas": "A unit measuring computational effort on Ethereum. Every operation costs gas, paid in ETH to compensate validators.",
  "Fork": "A change to blockchain protocol rules. Soft forks are backward-compatible; hard forks create a permanent chain split.",
  "Halving": "A scheduled event that cuts the Bitcoin block reward in half every ~4 years, reducing the rate of new supply.",
  "UTXO": "Unspent Transaction Output — the basic unit of Bitcoin's accounting model, like physical cash you haven't spent yet.",
  "Validator": "A node in Proof of Stake that locks up collateral (stake) to propose and attest new blocks, earning rewards.",
  "Layer 2": "A protocol built on top of a base blockchain to increase throughput and reduce costs — e.g. Lightning, Rollups.",
  "Oracle": "A service that feeds real-world data (prices, sports scores, weather) into smart contracts on the blockchain.",
  "DAO": "Decentralized Autonomous Organization — a community governed by smart contracts and token votes, with no CEO.",
  "DeFi": "Decentralized Finance — lending, trading, and yield services run by smart contracts with no banks or intermediaries.",
  "Seed Phrase": "A human-readable backup of your private key — typically 12 or 24 words. Whoever holds it controls your funds.",
  "Block Explorer": "A public website that lets anyone search and verify transactions, addresses, and blocks on a blockchain.",
  "Multisig": "Multi-signature — a wallet requiring M-of-N signatures to authorize a transaction, used for security and shared custody.",
};

const brickWords = Object.keys(brickDefinitions);

const brickColors = [
  "from-[#ED1C24]/25 border-[#ED1C24]/40",
  "from-[#39B54A]/25 border-[#39B54A]/40",
  "from-[#6366f1]/25 border-[#6366f1]/40",
  "from-[#f59e0b]/25 border-[#f59e0b]/40",
  "from-[#8b5cf6]/25 border-[#8b5cf6]/40",
];

function InteractiveHash() {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (!input) {
      setHash('');
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    crypto.subtle.digest('SHA-256', data).then(buffer => {
      const hashArray = Array.from(new Uint8Array(buffer));
      setHash(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
    });
  }, [input]);

  return (
    <div className="p-5 bg-card rounded-xl border-2 border-[#39B54A]">
      <div className="text-sm font-bold text-[#39B54A] mb-3">🔬 Try it yourself</div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type anything here..."
        className="w-full px-4 py-2 bg-muted rounded-lg border border-border text-foreground font-mono text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#39B54A]/50"
      />
      {hash ? (
        <>
          <div className="text-sm text-muted-foreground mb-1">SHA-256 Hash:</div>
          <div className="font-mono text-xs text-[#39B54A] break-all">{hash}</div>
        </>
      ) : (
        <div className="text-sm text-muted-foreground italic">Enter text above to see its SHA-256 hash in real time</div>
      )}
    </div>
  );
}

/* ── SHA-256 helper ─────────────────────────────────── */
async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function short(hash: string) {
  return hash ? hash.slice(0, 10) + '…' : '—';
}

/* ── Interactive Merkle Tree ─────────────────────────── */
function InteractiveMerkleTree() {
  const [txs, setTxs] = useState(['', '', '', '']);
  const [leafHashes, setLeafHashes] = useState(['', '', '', '']);
  const [midHashes, setMidHashes] = useState(['', '']);
  const [root, setRoot] = useState('');

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
    const next = [...txs];
    next[i] = v;
    setTxs(next);
  };

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Root */}
      <div className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${root ? 'bg-[#ED1C24]/20 border-[#ED1C24]' : 'bg-muted/20 border-border'}`}>
        <div className="text-xs text-muted-foreground">Merkle Root</div>
        <div className={`font-mono text-sm ${root ? 'text-[#ED1C24]' : 'text-muted-foreground/50'}`}>
          {root ? short(root) : 'Hash(AB + CD)'}
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
              {h ? short(h) : `Hash(${i === 0 ? 'A + B' : 'C + D'})`}
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
              {h ? short(h) : `Hash(${String.fromCharCode(65 + i)})`}
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
        Type transaction data below — the entire tree recomputes in real time
      </p>
    </div>
  );
}

/* ── Prev Hash Chain Exercise ───────────────────────────── */
const CHAIN_BLOCKS = [
  {
    number: 0,
    label: 'Genesis Block',
    data: 'Chancellor on brink...',
    hash: '0x000000',
    prevHash: '—',
    prevHashRevealed: true,
  },
  {
    number: 1,
    label: '50 BTC → Alice',
    data: 'Alice receives 50 BTC',
    hash: '0x1a2b3c',
    prevHash: '0x000000',
    prevHashRevealed: false,
  },
  {
    number: 2,
    label: '25 BTC → Bob',
    data: 'Bob receives 25 BTC',
    hash: '0x4d5e6f',
    prevHash: '0x1a2b3c',
    prevHashRevealed: false,
  },
];

const PREV_HASH_OPTIONS: Record<number, { value: string; label: string }[]> = {
  1: [
    { value: '0x000000', label: '0x000000  (Block #0 hash)' },
    { value: '0x1a2b3c', label: '0x1a2b3c  (Block #1 hash)' },
    { value: '0x4d5e6f', label: '0x4d5e6f  (Block #2 hash)' },
    { value: '0x9f3c21', label: '0x9f3c21  (random)' },
  ],
  2: [
    { value: '0x000000', label: '0x000000  (Block #0 hash)' },
    { value: '0x1a2b3c', label: '0x1a2b3c  (Block #1 hash)' },
    { value: '0x4d5e6f', label: '0x4d5e6f  (Block #2 hash)' },
    { value: '0x9f3c21', label: '0x9f3c21  (random)' },
  ],
};

function PrevHashExercise() {
  const [answers, setAnswers]   = useState<Record<number, string>>({ 1: '', 2: '' });
  const [checked, setChecked]   = useState(false);

  const allAnswered = answers[1] !== '' && answers[2] !== '';
  const isCorrect   = (n: number) => answers[n] === CHAIN_BLOCKS[n].prevHash;
  const score       = checked ? [1, 2].filter(n => isCorrect(n)).length : 0;

  const reset = () => { setAnswers({ 1: '', 2: '' }); setChecked(false); };

  const blockBorder = (n: number) => {
    if (!checked) return 'border-border';
    return isCorrect(n) ? 'border-[#10b981]' : 'border-[#ef4444]';
  };

  const chainLinkColor = (fromBlock: number) => {
    if (!checked) return '#6b7280';
    // link from block N to N+1 is green only if block N+1 has the right prev hash
    return isCorrect(fromBlock + 1) ? '#10b981' : '#ef4444';
  };

  return (
    <div className="max-w-5xl w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="size-14 rounded-full bg-[#ED1C24]/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔗</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Chain the Blocks</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Each block must reference the <span className="text-[#ED1C24] font-semibold">exact hash of the previous block</span>.
          Select the correct <span className="text-[#ED1C24] font-semibold">Prev Hash</span> for Blocks #1 and #2.
        </p>
      </div>

      {/* Chain */}
      <div className="flex items-center gap-0">
        {CHAIN_BLOCKS.map((block, i) => (
          <div key={block.number} className="flex items-center flex-1">

            {/* Block card */}
            <div className={`flex-1 rounded-xl border-2 bg-card transition-colors overflow-hidden ${blockBorder(block.number)}`}>

              {/* Block header */}
              <div className="px-4 py-2 bg-muted/40 border-b border-border flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-muted-foreground">BLOCK #{block.number}</span>
                {checked && !block.prevHashRevealed && (
                  <span className="text-sm">{isCorrect(block.number) ? '✓' : '✗'}</span>
                )}
              </div>

              <div className="p-4 space-y-2.5 text-xs">
                {/* Data */}
                <div>
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Data</span>
                  <div className="font-mono text-foreground mt-0.5 truncate">{block.label}</div>
                </div>

                {/* Hash */}
                <div>
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Hash</span>
                  <div className="font-mono text-[#39B54A] mt-0.5">{block.hash}</div>
                </div>

                {/* Prev Hash — revealed or selector */}
                <div>
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Prev Hash</span>
                  {block.prevHashRevealed ? (
                    <div className="font-mono text-[#6366f1] mt-0.5">{block.prevHash}</div>
                  ) : (
                    <select
                      disabled={checked}
                      value={answers[block.number]}
                      onChange={e => setAnswers(prev => ({ ...prev, [block.number]: e.target.value }))}
                      className={`mt-1 w-full font-mono text-xs rounded-lg px-2 py-1.5 border bg-background text-foreground
                        focus:outline-none focus:ring-1 focus:ring-[#ED1C24] cursor-pointer transition-colors
                        ${checked
                          ? isCorrect(block.number)
                            ? 'border-[#10b981] text-[#10b981]'
                            : 'border-[#ef4444] text-[#ef4444]'
                          : answers[block.number]
                            ? 'border-[#6366f1]'
                            : 'border-border'
                        }`}
                    >
                      <option value="" disabled>— pick prev hash —</option>
                      {PREV_HASH_OPTIONS[block.number].map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Feedback */}
                {checked && !block.prevHashRevealed && (
                  <div className={`text-[10px] rounded-lg px-2 py-1.5 ${
                    isCorrect(block.number)
                      ? 'bg-[#10b981]/10 text-[#10b981]'
                      : 'bg-[#ef4444]/10 text-[#ef4444]'
                  }`}>
                    {isCorrect(block.number)
                      ? `✓ Correct — matches Block #${block.number - 1}'s hash`
                      : `✗ Wrong — should be ${block.prevHash} (Block #${block.number - 1}'s hash)`
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Arrow between blocks */}
            {i < CHAIN_BLOCKS.length - 1 && (
              <div className="flex flex-col items-center mx-1 shrink-0">
                <svg width="32" height="20" viewBox="0 0 32 20">
                  <line x1="0" y1="10" x2="24" y2="10" stroke={chainLinkColor(i)} strokeWidth="2" />
                  <polygon points="24,5 32,10 24,15" fill={chainLinkColor(i)} />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {!checked && (
          <button
            onClick={() => setChecked(true)}
            disabled={!allAnswered}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              allAnswered
                ? 'bg-[#39B54A] text-white hover:opacity-90 shadow-lg shadow-[#39B54A]/30'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Check answers ✓
          </button>
        )}
        {checked && (
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div
                className="text-3xl font-black"
                style={{ color: score === 2 ? '#10b981' : '#ef4444' }}
              >
                {score}/2
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {score === 2 ? 'Perfect chain!' : 'Review the hashes above'}
              </div>
            </div>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {/* Key insight */}
      {checked && (
        <div className="mt-6 p-4 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/30 text-sm text-center text-muted-foreground max-w-xl mx-auto">
          💡 <span className="font-semibold text-[#6366f1]">The key insight:</span> if you change anything in Block #1,
          its hash changes — and Block #2's Prev Hash would no longer match, breaking the chain instantly.
        </div>
      )}
    </div>
  );
}

/* ── Blockchain Trilemma Interactive Exercise ────────────── */
const TRILEMMA_MECHANISMS = [
  { name: 'PoW',  color: '#ED1C24', desc: 'Proof of Work' },
  { name: 'PoS',  color: '#6366f1', desc: 'Proof of Stake' },
  { name: 'DPoS', color: '#f59e0b', desc: 'Delegated PoS / BFT' },
];

const TRILEMMA_POSITIONS = [
  { id: 'A', cx: 75,  cy: 120, correct: 'PoW',  hint: 'Security + Decentralization edge' },
  { id: 'B', cx: 150, cy: 160, correct: 'PoS',  hint: 'Balanced center' },
  { id: 'C', cx: 220, cy: 225, correct: 'DPoS', hint: 'Near Scalability vertex' },
];

function TrilemmaExercise() {
  const [selected, setSelected]   = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [checked, setChecked]     = useState(false);

  const placedMechs = Object.values(placements);
  const allPlaced   = TRILEMMA_MECHANISMS.every(m => placedMechs.includes(m.name));
  const score       = checked ? TRILEMMA_POSITIONS.filter(p => placements[p.id] === p.correct).length : 0;

  const mechColor = (name: string) =>
    TRILEMMA_MECHANISMS.find(m => m.name === name)?.color ?? '#9ca3af';

  const handlePosition = (posId: string) => {
    if (checked || !selected) return;
    setPlacements(prev => {
      const next = { ...prev };
      // remove the selected mech from any previous position
      for (const k of Object.keys(next)) if (next[k] === selected) delete next[k];
      next[posId] = selected;
      return next;
    });
    setSelected(null);
  };

  const handleMech = (name: string) => {
    if (checked) return;
    setSelected(prev => prev === name ? null : name);
  };

  const reset = () => { setPlacements({}); setSelected(null); setChecked(false); };

  const resultColor = score === 3 ? '#10b981' : score >= 1 ? '#f59e0b' : '#ef4444';
  const resultMsg   = score === 3 ? 'Perfect!' : score === 2 ? 'Almost there!' : score === 1 ? 'Keep studying!' : 'Review the slides!';

  return (
    <div className="max-w-4xl w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="size-14 rounded-full bg-[#f59e0b]/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚖️</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">The Blockchain Trilemma</h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          No consensus mechanism achieves all three properties at once.{' '}
          <span className="text-[#f59e0b] font-semibold">Select a mechanism on the right</span>, then{' '}
          <span className="text-[#f59e0b] font-semibold">click its position on the triangle</span>.
        </p>
      </div>

      <div className="flex gap-8 items-center">

        {/* Triangle SVG */}
        <div className="flex-1">
          <svg viewBox="-20 0 340 295" className="w-full max-w-sm mx-auto overflow-visible">
            {/* Triangle outline */}
            <polygon points="150,30 20,250 280,250" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />

            {/* Vertex dots */}
            <circle cx="150" cy="30"  r="10" fill="#ED1C24" />
            <circle cx="20"  cy="250" r="10" fill="#39B54A" />
            <circle cx="280" cy="250" r="10" fill="#6366f1" />

            {/* Vertex labels */}
            <text x="150" y="12"  textAnchor="middle" fill="#ED1C24" style={{ fontSize: '13px', fontWeight: 700 }}>Security</text>
            <text x="20"  y="276" textAnchor="middle" fill="#39B54A" style={{ fontSize: '13px', fontWeight: 700 }}>Decentralization</text>
            <text x="280" y="276" textAnchor="middle" fill="#6366f1" style={{ fontSize: '13px', fontWeight: 700 }}>Scalability</text>

            {/* Drop zones */}
            {TRILEMMA_POSITIONS.map(pos => {
              const mech     = placements[pos.id];
              const color    = mech ? mechColor(mech) : 'transparent';
              const isRight  = checked && mech ? mech === pos.correct : null;
              const ringColor = isRight === null
                ? (selected ? '#f59e0b' : '#6b7280')
                : isRight ? '#10b981' : '#ef4444';

              return (
                <g
                  key={pos.id}
                  onClick={() => handlePosition(pos.id)}
                  style={{ cursor: selected && !checked ? 'pointer' : 'default' }}
                >
                  {/* Pulse ring when a mech is selected */}
                  {selected && !checked && (
                    <circle cx={pos.cx} cy={pos.cy} r="24" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4" strokeDasharray="4 3" />
                  )}
                  {/* Main circle */}
                  <circle
                    cx={pos.cx} cy={pos.cy} r="20"
                    fill={mech ? color + 'CC' : 'rgba(255,255,255,0.04)'}
                    stroke={ringColor}
                    strokeWidth="2"
                    strokeDasharray={mech ? 'none' : '4 3'}
                  />
                  {/* Label inside */}
                  {mech
                    ? <text x={pos.cx} y={pos.cy + 4} textAnchor="middle" fill="white" style={{ fontSize: '9px', fontWeight: 800 }}>{mech}</text>
                    : <text x={pos.cx} y={pos.cy + 4} textAnchor="middle" fill="#6b7280" style={{ fontSize: '13px' }}>?</text>
                  }
                  {/* Result icon below */}
                  {checked && isRight !== null && (
                    <text x={pos.cx} y={pos.cy + 36} textAnchor="middle" style={{ fontSize: '14px' }}>
                      {isRight ? '✓' : '✗'}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side panel */}
        <div className="w-44 flex flex-col gap-3">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">
            {checked ? 'Results' : 'Pick & place →'}
          </p>

          {TRILEMMA_MECHANISMS.map(m => {
            const isPlaced   = placedMechs.includes(m.name);
            const isSelected = selected === m.name;
            const posId      = Object.entries(placements).find(([, v]) => v === m.name)?.[0];
            const isRight    = checked && posId ? placements[posId] === TRILEMMA_POSITIONS.find(p => p.id === posId)?.correct : null;

            return (
              <button
                key={m.name}
                onClick={() => handleMech(m.name)}
                disabled={checked}
                className={`px-3 py-3 rounded-xl border-2 text-sm font-bold text-left transition-all ${
                  isSelected ? 'scale-105 shadow-lg' : isPlaced ? 'opacity-60' : ''
                } ${checked ? 'cursor-default' : 'cursor-pointer'}`}
                style={{
                  borderColor: isSelected ? m.color : m.color + (isPlaced ? '60' : '80'),
                  background:  isSelected ? m.color + '30' : m.color + '12',
                  color: m.color,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>{m.name}</span>
                  {checked && isRight !== null && (
                    <span style={{ color: isRight ? '#10b981' : '#ef4444' }}>{isRight ? '✓' : '✗'}</span>
                  )}
                  {!checked && isPlaced && <span className="text-xs opacity-50">●</span>}
                </div>
                <div className="text-xs font-normal opacity-60 mt-0.5">{m.desc}</div>
              </button>
            );
          })}

          {/* Check */}
          {!checked && allPlaced && (
            <button
              onClick={() => setChecked(true)}
              className="mt-1 py-2 rounded-xl bg-[#39B54A] text-white text-sm font-bold hover:opacity-90 transition-all"
            >
              Check ✓
            </button>
          )}

          {/* Score */}
          {checked && (
            <div className="mt-1 p-3 rounded-xl border border-border text-center">
              <div className="text-3xl font-black" style={{ color: resultColor }}>{score}/3</div>
              <div className="text-xs text-muted-foreground mt-1">{resultMsg}</div>
              <button
                onClick={reset}
                className="mt-2 px-3 py-1 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-all"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom legend — always visible */}
      <div className="grid grid-cols-3 gap-4 mt-8 text-sm">
        {TRILEMMA_POSITIONS.map(pos => (
          <div
            key={pos.id}
            className="p-4 bg-card rounded-xl border transition-colors"
            style={{ borderColor: checked ? (placements[pos.id] === pos.correct ? '#10b981' : '#ef4444') + '60' : undefined }}
          >
            <div className="font-bold mb-1" style={{ color: mechColor(pos.correct) }}>{pos.correct}</div>
            <p className="text-muted-foreground text-xs">
              {pos.correct === 'PoW'  && 'High security + decentralization — sacrifices scalability & energy efficiency'}
              {pos.correct === 'PoS'  && 'Balanced — good security, moderate decentralization & scalability'}
              {pos.correct === 'DPoS' && 'Maximum scalability & speed — sacrifices decentralization'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Chain Builder Exercise ──────────────────────────────── */

const BUILDER_BLOCKS = [
  {
    id: 'b0',
    data: 'The Times 03/Jan/2009 — Genesis',
    hash:     '0x0000ab',
    prevHash: '0x000000 (start of chain)',
  },
  {
    id: 'b1',
    data: 'Alice → Bob: 10 BTC',
    hash:     '0x1a2b3c',
    prevHash: '0x0000ab',
  },
  {
    id: 'b2',
    data: 'Bob → Carol: 5 BTC',
    hash:     '0x4d5e6f',
    prevHash: '0x1a2b3c',
  },
  {
    id: 'b3',
    data: 'Carol → Dave: 3 BTC',
    hash:     '0x7c8d9e',
    prevHash: '0x4d5e6f',
  },
] as const;

type BuilderBlockId = typeof BUILDER_BLOCKS[number]['id'];

// The scrambled order students see — block numbers are hidden so they must use hash clues
const SCRAMBLED_IDS: BuilderBlockId[] = ['b2', 'b0', 'b3', 'b1'];

function BuilderBlockCard({ block }: { block: typeof BUILDER_BLOCKS[number] }) {
  return (
    <div className="p-3 space-y-2.5 text-xs">
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Data</div>
        <div className="font-mono text-foreground truncate">{block.data}</div>
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Prev Hash</div>
        <div className="font-mono text-[#6366f1]">{block.prevHash}</div>
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Hash</div>
        <div className="font-mono text-[#39B54A]">{block.hash}</div>
      </div>
    </div>
  );
}

function ChainBuilderExercise() {
  // slot index (0–3) → block id
  const [placements, setPlacements] = useState<Partial<Record<number, BuilderBlockId>>>({});
  const [selected, setSelected]     = useState<BuilderBlockId | null>(null);
  const [checked, setChecked]       = useState(false);
  const [showHint, setShowHint]     = useState(false);

  const placedIds = Object.values(placements) as BuilderBlockId[];
  const pool      = SCRAMBLED_IDS.filter(id => !placedIds.includes(id));
  const allFilled = placedIds.length === BUILDER_BLOCKS.length;

  const getBlock = (id: BuilderBlockId) => BUILDER_BLOCKS.find(b => b.id === id)!;

  // Slot i is correct when the placed block is b{i} (correct chain order)
  const isSlotCorrect = (i: number) => placements[i] === `b${i}`;

  // Link between slot i and i+1 is valid when the hashes connect
  const isLinkValid = (i: number) => {
    const from = placements[i];
    const to   = placements[i + 1];
    if (!from || !to) return false;
    return getBlock(to).prevHash === getBlock(from).hash;
  };

  const score = checked ? [0, 1, 2, 3].filter(i => isSlotCorrect(i)).length : 0;

  const handlePoolClick = (id: BuilderBlockId) => {
    if (checked) return;
    setSelected(prev => (prev === id ? null : id));
  };

  const handleSlotClick = (slotIndex: number) => {
    if (checked) return;
    if (selected) {
      setPlacements(prev => {
        const next = { ...prev };
        // Remove the selected block from any slot it's already in
        for (const k in next) { if (next[+k] === selected) delete next[+k]; }
        // Place it (any previous occupant implicitly returns to pool)
        next[slotIndex] = selected;
        return next;
      });
      setSelected(null);
    } else {
      // Pick up whatever is in this slot
      const blockId = placements[slotIndex];
      if (blockId) {
        setPlacements(prev => { const next = { ...prev }; delete next[slotIndex]; return next; });
        setSelected(blockId);
      }
    }
  };

  const reset = () => { setPlacements({}); setSelected(null); setChecked(false); setShowHint(false); };

  const resultColor = score === 4 ? '#10b981' : score >= 2 ? '#f59e0b' : '#ef4444';
  const resultMsg   = score === 4
    ? 'Perfect — chain reconstructed!'
    : score >= 2
    ? 'Almost! One or more blocks are out of place.'
    : 'Review how Prev Hash links blocks together.';

  return (
    <div className="max-w-5xl w-full">

      {/* Header */}
      <div className="text-center mb-6">
        <div className="size-14 rounded-full bg-[#6366f1]/20 flex items-center justify-center mx-auto mb-3 text-2xl">🔗</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Reconstruct the Chain</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          These 4 blocks are <span className="text-[#ED1C24] font-semibold">scrambled</span>.
          Use the <span className="font-mono text-[#6366f1] font-semibold">Prev Hash</span> and{' '}
          <span className="font-mono text-[#39B54A] font-semibold">Hash</span> fields to figure out the correct order.
          <br /><span className="text-muted-foreground/60 text-xs">Click a block to select it, then click a slot to place it.</span>
        </p>
      </div>

      {/* ── Slots ── */}
      <div className="mb-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-semibold text-center">
          ← Place blocks here in the correct order →
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map(slotIndex => {
            const blockId    = placements[slotIndex];
            const isOccupied = !!blockId;
            const isRight    = checked && isSlotCorrect(slotIndex);
            const isWrong    = checked && isOccupied && !isSlotCorrect(slotIndex);

            return (
              <div
                key={slotIndex}
                onClick={() => handleSlotClick(slotIndex)}
                className={`
                  rounded-xl border-2 transition-all min-h-[148px]
                  ${!checked ? 'cursor-pointer' : ''}
                  ${!isOccupied ? 'border-dashed' : ''}
                  ${!isOccupied && selected  ? 'border-[#f59e0b] bg-[#f59e0b]/5 hover:bg-[#f59e0b]/10' : ''}
                  ${!isOccupied && !selected ? 'border-border/60 bg-muted/5' : ''}
                  ${isOccupied && !checked   ? 'border-[#6366f1]/50 bg-card hover:border-[#6366f1]' : ''}
                  ${isRight  ? 'border-[#10b981] bg-[#10b981]/5' : ''}
                  ${isWrong  ? 'border-[#ef4444] bg-[#ef4444]/5' : ''}
                `}
              >
                {/* Slot header */}
                <div className="px-3 py-2 border-b border-border/50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Slot {slotIndex + 1}
                  </span>
                  {checked && isOccupied && (
                    <span className="text-sm font-bold" style={{ color: isRight ? '#10b981' : '#ef4444' }}>
                      {isRight ? '✓' : '✗'}
                    </span>
                  )}
                </div>

                {isOccupied
                  ? <BuilderBlockCard block={getBlock(blockId)} />
                  : (
                    <div className="flex items-center justify-center h-24 text-xs text-muted-foreground/40">
                      {selected ? '← drop here' : 'empty'}
                    </div>
                  )
                }
              </div>
            );
          })}
        </div>
      </div>

      {/* Hash link indicators — shown after Check */}
      {checked && (
        <div className="flex items-center justify-around px-2 py-2 mb-3">
          {[0, 1, 2].map(i => {
            const valid    = isLinkValid(i);
            const fromHash = placements[i] ? getBlock(placements[i]!).hash : '—';
            const toNext   = placements[i + 1] ? getBlock(placements[i + 1]!).prevHash : '—';
            return (
              <div key={i} className="flex items-center gap-1 text-[10px] font-mono" style={{ color: valid ? '#10b981' : '#ef4444' }}>
                <span>{fromHash}</span>
                <span className="text-xs font-sans">{valid ? ' ⟶✓' : ' ⟶✗'}</span>
                <span>{toNext}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pool ── */}
      <div className="mb-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-semibold text-center">
          Block Pool — click to select
        </p>
        <div className={`grid gap-3 min-h-[60px] ${pool.length > 0 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {pool.length === 0 ? (
            <div className="col-span-4 flex items-center justify-center text-sm text-muted-foreground/40 italic py-3">
              All blocks placed ✓
            </div>
          ) : pool.map(id => {
            const isSelected = selected === id;
            return (
              <div
                key={id}
                onClick={() => handlePoolClick(id)}
                className={`
                  rounded-xl border-2 cursor-pointer transition-all
                  ${isSelected
                    ? 'border-[#f59e0b] bg-[#f59e0b]/15 shadow-lg shadow-[#f59e0b]/20 scale-[1.02]'
                    : 'border-border bg-card hover:border-[#6366f1]/50'
                  }
                `}
              >
                <div className="px-3 py-2 border-b border-border/50">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    {isSelected ? '✦ Selected' : 'Block'}
                  </span>
                </div>
                <BuilderBlockCard block={getBlock(id)} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint toggle */}
      {!checked && (
        <div className="flex justify-center mb-3">
          <button
            onClick={() => setShowHint(h => !h)}
            className="text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg px-4 py-2 transition-all"
          >
            {showHint ? 'Hide hint ▲' : '💡 Show hint'}
          </button>
        </div>
      )}
      {showHint && !checked && (
        <div className="max-w-lg mx-auto mb-4 p-4 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-sm">
          <p className="font-semibold text-[#f59e0b] mb-1">How to crack it:</p>
          <p className="text-muted-foreground text-xs">
            1. Find the <strong>Genesis block</strong> — its{' '}
            <span className="font-mono text-[#6366f1]">Prev Hash</span> reads{' '}
            <span className="font-mono bg-muted px-1 rounded">0x000000 (start)</span>.<br />
            2. Match each block's <span className="font-mono text-[#6366f1]">Prev Hash</span> to
            the previous block's <span className="font-mono text-[#39B54A]">Hash</span> — like connecting puzzle pieces.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        {!checked ? (
          <button
            onClick={() => setChecked(true)}
            disabled={!allFilled}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              allFilled
                ? 'bg-[#39B54A] text-white hover:opacity-90 shadow-lg shadow-[#39B54A]/30'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Check chain ✓
          </button>
        ) : (
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-black" style={{ color: resultColor }}>{score}/4</div>
              <div className="text-xs text-muted-foreground mt-0.5">{resultMsg}</div>
            </div>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {/* Post-check insight */}
      {checked && (
        <div className={`mt-5 p-4 rounded-xl border text-sm text-center max-w-xl mx-auto ${
          score === 4
            ? 'bg-[#10b981]/10 border-[#10b981]/30 text-muted-foreground'
            : 'bg-[#6366f1]/10 border-[#6366f1]/30 text-muted-foreground'
        }`}>
          {score === 4 ? (
            <>
              🎉 <span className="font-semibold text-[#10b981]">Chain reconstructed!</span>{' '}
              Every Prev Hash matched the previous block's Hash exactly — that cryptographic
              linkage is what makes blockchain tamper-evident and immutable.
            </>
          ) : (
            <>
              💡 <span className="font-semibold text-[#6366f1]">Key insight:</span>{' '}
              Start with the Genesis block (<span className="font-mono text-xs">Prev Hash = 0x000000</span>),
              then trace each Hash → Prev Hash connection. The chain can only be assembled one way.
            </>
          )}
        </div>
      )}

    </div>
  );
}

// ─── Interactive DLT topology demo ──────────────────────────────────────────

type TopoMode = 'centralized' | 'decentralized' | 'distributed';

interface TopoNode { id: string; x: number; y: number; size?: number }
interface TopoEdge { a: string; b: string }
interface Topology { nodes: TopoNode[]; edges: TopoEdge[] }

const TOPOLOGIES: Record<TopoMode, Topology> = {
  centralized: {
    nodes: [
      { id: 'c',  x: 160, y: 140, size: 14 },
      { id: 's0', x: 260, y: 140 },
      { id: 's1', x: 218, y: 222 },
      { id: 's2', x: 126, y: 240 },
      { id: 's3', x: 44,  y: 200 },
      { id: 's4', x: 44,  y: 80  },
      { id: 's5', x: 140, y: 30  },
      { id: 's6', x: 250, y: 58  },
    ],
    edges: ['s0','s1','s2','s3','s4','s5','s6'].map(s => ({ a: 'c', b: s })),
  },
  decentralized: {
    nodes: [
      { id: 'h0', x: 160, y: 55,  size: 11 },
      { id: 'h1', x: 60,  y: 215, size: 11 },
      { id: 'h2', x: 260, y: 215, size: 11 },
      { id: 'l0a', x: 100, y: 18 },
      { id: 'l0b', x: 225, y: 18 },
      { id: 'l1a', x: 15,  y: 195 },
      { id: 'l1b', x: 70,  y: 270 },
      { id: 'l2a', x: 305, y: 195 },
      { id: 'l2b', x: 250, y: 270 },
    ],
    edges: [
      { a: 'h0', b: 'h1' }, { a: 'h0', b: 'h2' }, { a: 'h1', b: 'h2' },
      { a: 'h0', b: 'l0a' }, { a: 'h0', b: 'l0b' },
      { a: 'h1', b: 'l1a' }, { a: 'h1', b: 'l1b' },
      { a: 'h2', b: 'l2a' }, { a: 'h2', b: 'l2b' },
    ],
  },
  distributed: {
    nodes: [
      { id: 'p00', x: 60,  y: 50  }, { id: 'p01', x: 160, y: 50  }, { id: 'p02', x: 260, y: 50  },
      { id: 'p10', x: 60,  y: 140 }, { id: 'p11', x: 160, y: 140 }, { id: 'p12', x: 260, y: 140 },
      { id: 'p20', x: 60,  y: 230 }, { id: 'p21', x: 160, y: 230 }, { id: 'p22', x: 260, y: 230 },
    ],
    edges: [
      // horizontal
      { a: 'p00', b: 'p01' }, { a: 'p01', b: 'p02' },
      { a: 'p10', b: 'p11' }, { a: 'p11', b: 'p12' },
      { a: 'p20', b: 'p21' }, { a: 'p21', b: 'p22' },
      // vertical
      { a: 'p00', b: 'p10' }, { a: 'p10', b: 'p20' },
      { a: 'p01', b: 'p11' }, { a: 'p11', b: 'p21' },
      { a: 'p02', b: 'p12' }, { a: 'p12', b: 'p22' },
      // diagonals (mesh feel)
      { a: 'p00', b: 'p11' }, { a: 'p11', b: 'p22' },
      { a: 'p02', b: 'p11' }, { a: 'p11', b: 'p20' },
    ],
  },
};

const MODE_INFO: Record<TopoMode, { color: string; label: string; tagline: string; lesson: string }> = {
  centralized: {
    color: '#ED1C24',
    label: 'Centralized',
    tagline: 'One server holds everything. Fast and simple — but if it goes down, the whole network goes down.',
    lesson: 'Try clicking the centre node. Then try clicking one satellite. Same act, very different blast radius.',
  },
  decentralized: {
    color: '#f59e0b',
    label: 'Decentralized',
    tagline: 'Several hubs share authority. No single hub controls everything, but each hub still rules its cluster.',
    lesson: 'Click a hub — its leaves are orphaned because they only reach the network through it. The other clusters keep working.',
  },
  distributed: {
    color: '#39B54A',
    label: 'Distributed',
    tagline: 'Every node is a peer with the same role. No single failure can take the network down.',
    lesson: 'Try clicking several nodes. The mesh routes around the gaps — this is what blockchain inherits.',
  },
};

function largestConnected(topo: Topology, failed: Set<string>): Set<string> {
  const adj = new Map<string, string[]>();
  for (const n of topo.nodes) adj.set(n.id, []);
  for (const e of topo.edges) { adj.get(e.a)!.push(e.b); adj.get(e.b)!.push(e.a); }

  const visited = new Set<string>();
  let best = new Set<string>();
  for (const n of topo.nodes) {
    if (failed.has(n.id) || visited.has(n.id)) continue;
    const comp = new Set<string>();
    const stack = [n.id];
    while (stack.length) {
      const cur = stack.pop()!;
      if (comp.has(cur)) continue;
      comp.add(cur);
      visited.add(cur);
      for (const nb of adj.get(cur) || []) if (!failed.has(nb) && !comp.has(nb)) stack.push(nb);
    }
    if (comp.size > best.size) best = comp;
  }
  return best;
}

function NetworkTopologyDemo() {
  const [mode, setMode] = useState<TopoMode>('centralized');
  const [failed, setFailed] = useState<Set<string>>(new Set());

  const topo = TOPOLOGIES[mode];
  const info = MODE_INFO[mode];
  const total = topo.nodes.length;
  const aliveCount = total - failed.size;
  const main = largestConnected(topo, failed);
  const connected = main.size;
  const isolated = aliveCount - connected;

  let status: { color: string; label: string };
  if (aliveCount === 0)              status = { color: '#ED1C24', label: 'Network down — all nodes offline' };
  else if (connected === aliveCount) status = { color: '#39B54A', label: `Operational · ${connected}/${total} reachable` };
  else if (connected / aliveCount <= 0.5) status = { color: '#ED1C24', label: `Down · only ${connected}/${total} reachable, ${isolated} isolated` };
  else                               status = { color: '#f59e0b', label: `Degraded · ${connected}/${total} reachable, ${isolated} isolated` };

  const toggleNode = (id: string) => {
    setFailed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const switchMode = (m: TopoMode) => {
    setMode(m);
    setFailed(new Set());
  };

  const nodeFill = (id: string) => {
    if (failed.has(id)) return '#ED1C24';
    if (main.has(id))   return info.color;
    return '#9ca3af'; // isolated alive
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Mode tabs */}
      <div className="grid grid-cols-3 gap-1.5">
        {(['centralized','decentralized','distributed'] as TopoMode[]).map(m => {
          const active = m === mode;
          const c = MODE_INFO[m];
          return (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className="px-2.5 py-2 rounded-lg border-2 text-xs font-bold transition-colors"
              style={{
                borderColor: active ? c.color : 'var(--border)',
                backgroundColor: active ? c.color + '15' : 'transparent',
                color: active ? c.color : 'var(--foreground)',
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Diagram */}
      <div className="bg-card rounded-xl border border-border p-2">
        <svg viewBox="0 0 320 280" className="w-full h-auto" role="img" aria-label={`${info.label} network topology`}>
          {/* Edges */}
          {topo.edges.map((e, i) => {
            const a = topo.nodes.find(n => n.id === e.a)!;
            const b = topo.nodes.find(n => n.id === e.b)!;
            const dead = failed.has(e.a) || failed.has(e.b);
            return (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={dead ? '#ED1C2440' : info.color + '70'}
                strokeWidth={1.5}
                strokeDasharray={dead ? '3 3' : undefined}
              />
            );
          })}
          {/* Nodes */}
          {topo.nodes.map(n => {
            const r = n.size ?? 9;
            const fill = nodeFill(n.id);
            const isFailed = failed.has(n.id);
            return (
              <g key={n.id} onClick={() => toggleNode(n.id)} style={{ cursor: 'pointer' }}>
                {/* halo when alive in main component */}
                {!isFailed && main.has(n.id) && (
                  <circle cx={n.x} cy={n.y} r={r + 5} fill={fill} opacity={0.12} />
                )}
                <circle cx={n.x} cy={n.y} r={r} fill={fill} stroke="#fff" strokeWidth={2} />
                {isFailed && (
                  <>
                    <line x1={n.x - r * 0.55} y1={n.y - r * 0.55} x2={n.x + r * 0.55} y2={n.y + r * 0.55} stroke="#fff" strokeWidth={2} />
                    <line x1={n.x + r * 0.55} y1={n.y - r * 0.55} x2={n.x - r * 0.55} y2={n.y + r * 0.55} stroke="#fff" strokeWidth={2} />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Status + reset */}
      <div className="flex items-center gap-2">
        <div className="flex-1 px-3 py-2 rounded-lg border-2 text-xs font-bold flex items-center gap-2"
             style={{ borderColor: status.color + '60', backgroundColor: status.color + '12', color: status.color }}>
          <span className="size-2 rounded-full" style={{ backgroundColor: status.color }} />
          {status.label}
        </div>
        <button
          onClick={() => setFailed(new Set())}
          disabled={failed.size === 0}
          className="px-2.5 py-2 rounded-lg bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80 disabled:opacity-40 transition-colors"
        >
          ↺ Reset
        </button>
      </div>

      {/* Lesson */}
      <div className="px-3 py-2 rounded-lg text-[11px] text-muted-foreground leading-snug"
           style={{ backgroundColor: info.color + '08', borderLeft: `3px solid ${info.color}` }}>
        <span className="font-semibold text-foreground">{info.label}.</span> {info.tagline}{' '}
        <span className="italic">{info.lesson}</span>
      </div>
    </div>
  );
}

export function Section1() {
  return (
    <div className="size-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={section1Chapters} />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 01"
            title="Introduction to Blockchain Technology"
            subtitle="The building blocks: DLT, hashing, blocks, wallets, transactions, and consensus"
            icon={<Blocks className="size-20 text-[#ED1C24]" />}
          />
        </div>

        {/* ═══════ 1. BLOCKCHAIN BRICK WALL ═══════ */}
        <div id="s1-vocab" className="h-full flex items-center justify-center p-12">
          <div className="max-w-5xl w-full">
            <h2 className="text-4xl font-bold text-foreground mb-3 text-center">The Blockchain Vocabulary Wall</h2>
            <p className="text-muted-foreground mb-8 text-center">
              Every brick below represents a core concept you will master in this section.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {brickWords.map((word, i) => (
                <Tooltip key={word}>
                  <TooltipTrigger asChild>
                    <div
                      className={`px-5 py-3 rounded-lg bg-gradient-to-br ${brickColors[i % brickColors.length]} border font-bold text-foreground text-sm hover:scale-110 hover:border-[#4ade80] hover:shadow-[0_0_12px_rgba(74,222,128,0.3)] transition-all cursor-pointer`}
                    >
                      {word}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-sm bg-white border-[#4ade80]/40 text-black">
                    {brickDefinitions[word]}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-6">
              By the end of this section, you'll understand every term on this wall.
            </p>
          </div>
        </div>

        {/* ═══════ 2. DLT — CENTRALIZED vs DECENTRALIZED vs DISTRIBUTED ═══════ */}
        <div id="s1-dlt" className="h-full">
          <ComparisonSlide
            title="Centralized vs Decentralized vs Distributed"
            option1Label="Centralized"
            option2Label="Decentralized"
            option3Label="Distributed"
            items={[
              {
                feature: "Control",
                option1: "Single authority owns the system",
                option2: "Multiple independent authorities",
                option3: "No central authority — all nodes are equal"
              },
              {
                feature: "Topology",
                option1: "Star — all nodes connect to one center",
                option2: "Mesh of independent clusters, each with local authority",
                option3: "Fully connected mesh — every node communicates directly"
              },
              {
                feature: "Single Point of Failure",
                option1: "Yes — center fails, everything fails",
                option2: "Reduced — some hubs can fail without total collapse",
                option3: "No — any node can fail, network continues"
              },
              {
                feature: "Trust Model",
                option1: "Trust the central operator",
                option2: "Trust delegated to regional/local authorities",
                option3: "Trust established through consensus protocol"
              },
              {
                feature: "Censorship",
                option1: "Central authority can censor or override",
                option2: "Harder to censor, but local authorities may still restrict",
                option3: "No single entity can censor transactions"
              },
              {
                feature: "Examples",
                option1: "Banks, Google, Meta",
                option2: "Email (SMTP), Mastodon, DNS",
                option3: "Bitcoin, IPFS, BitTorrent"
              }
            ]}
          />
        </div>

        <div className="h-full">
          <div className="slide-template w-full flex flex-col p-5 lg:p-8">
            <div className="shrink-0 mb-3">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Understanding DLT Models</h2>
              <p className="text-sm lg:text-base text-muted-foreground max-w-3xl">
                Distributed Ledger Technology removes the need for a central database by replicating data across a network. Switch between the three topologies and click nodes to take them offline — watch what happens.
              </p>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-4 lg:gap-6">
              {/* Interactive */}
              <div className="flex items-center justify-center">
                <NetworkTopologyDemo />
              </div>

              {/* Key insights */}
              <div className="flex flex-col justify-center gap-3">
                {[
                  { color: '#ED1C24', title: 'Centralized = single point of control', desc: 'One operator owns the system. If that node fails, the network fails. Trust is total.' },
                  { color: '#f59e0b', title: 'Decentralized = clusters of authority',  desc: 'Multiple independent hubs. Killing one breaks its cluster but leaves the rest intact.' },
                  { color: '#39B54A', title: 'Distributed = every node is a peer',     desc: 'All nodes hold the data and participate equally. The mesh routes around failures.' },
                  { color: '#6366f1', title: 'Blockchain is a distributed ledger',     desc: 'It adds cryptographic consensus on top of a distributed network — so all peers agree on one shared history.' },
                ].map((p, i) => (
                  <div
                    key={p.title}
                    className="flex items-start gap-3 p-3 lg:p-4 bg-card rounded-lg border"
                    style={{ borderColor: p.color + '40' }}
                  >
                    <div className="size-7 lg:size-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                         style={{ backgroundColor: p.color }}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-foreground leading-snug">{p.title}</div>
                      <div className="text-xs lg:text-sm text-muted-foreground mt-0.5 leading-snug">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ 3. WHY BLOCKCHAIN CHALLENGES TRUSTED THIRD PARTIES ═══════ */}
        <div id="s1-trust" className="h-full">
          <ConceptSlide
            title="Why Blockchain Challenges Trusted Third Parties"
            description="Blockchain combines distribution, cryptography, and incentive design to create systems that need no trusted authority."
            visual={
              <div className="flex flex-col gap-4">
                {/* IRL examples strip */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Who are trusted third parties today?</p>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { emoji: '🏦', label: 'Banks', sub: 'Hold & move money' },
                      { emoji: '⚖️', label: 'Notaries', sub: 'Certify documents' },
                      { emoji: '🏛️', label: 'Land Registry', sub: 'Prove ownership' },
                      { emoji: '💳', label: 'PayPal / Visa', sub: 'Process payments' },
                      { emoji: '🔐', label: 'Certificate Auth.', sub: 'Verify identities' },
                    ].map(ex => (
                      <div key={ex.label} className="p-2.5 bg-muted rounded-lg text-center">
                        <div className="text-xl mb-1">{ex.emoji}</div>
                        <div className="text-xs font-bold text-foreground">{ex.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{ex.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Properties grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                    <h4 className="font-bold text-[#ED1C24] mb-1.5">🔗 Immutability</h4>
                    <p className="text-sm text-muted-foreground">Once data is committed to the chain, altering it requires rewriting every subsequent block — practically impossible</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                    <h4 className="font-bold text-[#39B54A] mb-1.5">🤝 Trustless Consensus</h4>
                    <p className="text-sm text-muted-foreground">Participants agree on the state of the ledger through mathematical proofs, not reputation</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                    <h4 className="font-bold text-[#6366f1] mb-1.5">💡 Transparency</h4>
                    <p className="text-sm text-muted-foreground">Anyone can verify the full history of transactions — no hidden ledgers or secret changes</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                    <h4 className="font-bold text-[#f59e0b] mb-1.5">🛡️ Censorship Resistance</h4>
                    <p className="text-sm text-muted-foreground">No central entity can block, reverse, or freeze transactions on a public blockchain</p>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Traditional databases can be silently altered by their operators",
              "Blockchain shifts trust from institutions to verifiable mathematics",
              "Economic incentives align participants toward honest behavior",
              "Open-source code means anyone can audit the rules"
            ]}
          />
        </div>

        {/* ═══════ 4. BLOCKCHAIN TYPES ═══════ */}
        <div id="s1-blockchain-types" className="h-full">
          <ComparisonSlide
            title="Blockchain Types — Public, Private & Permission Models"
            featureLabel="Criteria"
            option1Label="Public · Permissionless"
            option2Label="Consortium · Semi-private"
            option3Label="Private · Permissioned"
            items={[
              {
                feature: "Who can read?",
                option1: "Anyone — the full ledger is publicly visible to every participant on Earth",
                option2: "Members of the consortium, sometimes also the public (read-only)",
                option3: "Only invited and approved organisations or users",
              },
              {
                feature: "Who can transact?",
                option1: "Anyone with an address — no registration, no approval",
                option2: "Authorised member organisations only",
                option3: "Only pre-approved identities inside the network",
              },
              {
                feature: "Who validates?",
                option1: "Anyone — open mining or staking (Bitcoin PoW, Ethereum PoS)",
                option2: "A defined set of known nodes agreed upon by the members (BFT variants)",
                option3: "One organisation or a fixed set of internal nodes",
              },
              {
                feature: "Transparency",
                option1: "Fully transparent — every transaction is auditable by everyone",
                option2: "Selective — members see relevant data; outsiders may see a subset",
                option3: "Private — data visible only to permissioned participants",
              },
              {
                feature: "Examples",
                option1: "Bitcoin · Ethereum · Solana · Litecoin · Monero · Polygon",
                option2: "R3 Corda · Quorum · Marco Polo · IBM Food Trust · Baseline Protocol",
                option3: "Hyperledger Fabric · JP Morgan Quorum · Corda Enterprise · DAML",
              },
            ]}
          />
        </div>

        {/* ═══════ 5. HASHING ═══════ */}
        <div id="s1-hashing" className="h-full">
          <ConceptSlide
            title="Cryptographic Hashing"
            description="Hash functions are one-way mathematical algorithms that convert any input into a fixed-size output."
            visual={
              <div className="space-y-4 w-full">
                <div className="p-4 bg-card rounded-xl border-2 border-[#6366f1]">
                  <div className="text-sm text-muted-foreground mb-1">Input:</div>
                  <div className="font-mono text-foreground mb-2">"Hello World"</div>
                  <div className="text-sm text-muted-foreground mb-1">SHA-256 Hash:</div>
                  <div className="font-mono text-xs text-[#6366f1] break-all">
                    a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e
                  </div>
                </div>
                <div className="p-4 bg-card rounded-xl border-2 border-[#8b5cf6]">
                  <div className="text-sm text-muted-foreground mb-1">Input:</div>
                  <div className="font-mono text-foreground mb-2">"Hello World!"</div>
                  <div className="text-sm text-muted-foreground mb-1">SHA-256 Hash:</div>
                  <div className="font-mono text-xs text-[#8b5cf6] break-all">
                    7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                  </div>
                </div>
                <InteractiveHash />
              </div>
            }
            keyPoints={[
              "Same input always produces the same hash (deterministic)",
              "Tiny change in input creates completely different hash (avalanche effect)",
              "Impossible to reverse-engineer the original input (one-way)",
              "Used to verify data integrity and create cryptographic links between blocks"
            ]}
          />
        </div>

        <div className="h-full">
          <DiscussionSlide
            prompt="Why is it important that hash functions are one-way?"
            guidingQuestions={[
              "How does this property secure the blockchain against tampering?",
              "What would happen if you could reverse a hash and find its input?",
              "How does hashing relate to mining and Proof of Work?"
            ]}
          />
        </div>

        {/* ═══════ 5. MERKLE TREES ═══════ */}
        <div id="s1-merkle" className="h-full">
          <DiagramSlide
            title="Merkle Trees"
            diagram={
              <div className="flex flex-col items-center gap-3 py-4">
                {/* Root */}
                <div className="px-6 py-3 bg-[#ED1C24]/20 border-2 border-[#ED1C24] rounded-lg">
                  <div className="text-xs text-muted-foreground">Merkle Root</div>
                  <div className="font-mono text-sm text-[#ED1C24]">Hash(AB + CD)</div>
                </div>
                <div className="flex gap-32">
                  <div className="w-px h-6 bg-border" />
                  <div className="w-px h-6 bg-border" />
                </div>
                {/* Level 1 */}
                <div className="flex gap-16">
                  <div className="px-5 py-2 bg-[#39B54A]/20 border border-[#39B54A] rounded-lg">
                    <div className="text-xs text-muted-foreground">Hash AB</div>
                    <div className="font-mono text-xs text-[#39B54A]">Hash(A + B)</div>
                  </div>
                  <div className="px-5 py-2 bg-[#39B54A]/20 border border-[#39B54A] rounded-lg">
                    <div className="text-xs text-muted-foreground">Hash CD</div>
                    <div className="font-mono text-xs text-[#39B54A]">Hash(C + D)</div>
                  </div>
                </div>
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
                  <div className="px-4 py-2 bg-[#6366f1]/20 border border-[#6366f1] rounded-lg">
                    <div className="text-xs text-muted-foreground">Tx A</div>
                    <div className="font-mono text-xs text-[#6366f1]">Hash(A)</div>
                  </div>
                  <div className="px-4 py-2 bg-[#6366f1]/20 border border-[#6366f1] rounded-lg">
                    <div className="text-xs text-muted-foreground">Tx B</div>
                    <div className="font-mono text-xs text-[#6366f1]">Hash(B)</div>
                  </div>
                  <div className="px-4 py-2 bg-[#6366f1]/20 border border-[#6366f1] rounded-lg">
                    <div className="text-xs text-muted-foreground">Tx C</div>
                    <div className="font-mono text-xs text-[#6366f1]">Hash(C)</div>
                  </div>
                  <div className="px-4 py-2 bg-[#6366f1]/20 border border-[#6366f1] rounded-lg">
                    <div className="text-xs text-muted-foreground">Tx D</div>
                    <div className="font-mono text-xs text-[#6366f1]">Hash(D)</div>
                  </div>
                </div>
              </div>
            }
            caption="A Merkle Tree hashes transactions pairwise up to a single root — changing any leaf changes the root"
            annotations={[
              {
                label: "Efficient Verification",
                description: "To verify one transaction, you only need its sibling hashes up to the root — not the entire block"
              },
              {
                label: "Tamper Detection",
                description: "Any change to a single transaction propagates all the way to the Merkle Root, instantly detectable"
              },
              {
                label: "Light Clients",
                description: "SPV (Simplified Payment Verification) nodes use Merkle proofs to verify transactions without downloading the full blockchain"
              }
            ]}
          />
        </div>

        {/* Interactive Merkle Tree */}
        <div className="h-full">
          <DiagramSlide
            title="Interactive Merkle Tree"
            diagram={<InteractiveMerkleTree />}
            caption="Enter transaction data in the fields below and watch the hashes propagate up to the Merkle Root"
            annotations={[
              {
                label: "Real SHA-256",
                description: "Every hash displayed is a genuine SHA-256 digest computed in your browser — not a simulation"
              },
              {
                label: "Avalanche Effect",
                description: "Change a single character in any transaction and watch every hash above it change completely"
              },
              {
                label: "Root = Fingerprint",
                description: "The Merkle Root is a single hash that represents all four transactions — if any data changes, the root changes"
              }
            ]}
          />
        </div>

        {/* ═══════ 6. BLOCKS & THEIR COMPOSITION ═══════ */}
        <div id="s1-blocks" className="h-full">
          <DiagramSlide
            title="Anatomy of a Blockchain"
            diagram={
              <BlockchainChain
                blocks={[
                  {
                    blockNumber: 0,
                    hash: "0x000000...",
                    previousHash: "0x000000...",
                    timestamp: "Jan 3, 2009",
                    data: "Genesis Block",
                    highlighted: false
                  },
                  {
                    blockNumber: 1,
                    hash: "0x1a2b3c...",
                    previousHash: "0x000000...",
                    timestamp: "Jan 3, 2009",
                    data: "50 BTC → Alice",
                    highlighted: false
                  },
                  {
                    blockNumber: 2,
                    hash: "0x4d5e6f...",
                    previousHash: "0x1a2b3c...",
                    timestamp: "Jan 4, 2009",
                    data: "25 BTC → Bob",
                    highlighted: true
                  }
                ]}
              />
            }
            caption="Each block contains data, a timestamp, and a cryptographic link to the previous block"
            annotations={[
              {
                label: "Block Header",
                description: "Contains metadata including previous hash, timestamp, and nonce"
              },
              {
                label: "Transaction Data",
                description: "The actual information being stored (transfers, contracts, etc.)"
              },
              {
                label: "Hash",
                description: "Unique identifier created from the block's contents"
              }
            ]}
          />
        </div>

        <div className="h-full">
          <DiagramSlide
            title="Inside a Block"
            diagram={
              <div className="flex justify-center">
                <BlockchainBlock
                  blockNumber={100}
                  version="0x20000000"
                  previousHash="0x9876543210fedcba"
                  merkleRoot="0x3a7f...c92e"
                  data="156 transactions"
                  timestamp="Mar 10, 2026 14:32:15"
                  difficulty="79.35 T"
                  nonce="2,083,236,893"
                  hash="0xabcdef1234567890"
                  highlighted={true}
                />
              </div>
            }
            annotations={[
              {
                label: "Version",
                description: "Protocol version — tells nodes which rules to apply when validating this block"
              },
              {
                label: "Previous Hash",
                description: "Links this block to the previous one, forming the chain"
              },
              {
                label: "Merkle Root",
                description: "A single hash summarizing all transactions in the block via a Merkle Tree"
              },
              {
                label: "Difficulty & Nonce",
                description: "Difficulty sets how hard the puzzle is; the nonce is the value miners adjust to find a valid hash"
              }
            ]}
          />
        </div>

        {/* ── Interactive: Chain the Blocks ── */}
        <div className="h-full flex items-center justify-center p-8">
          <PrevHashExercise />
        </div>

        {/* ═══════ 7. WALLETS & SIGNATURES ═══════ */}
        <div id="s1-wallets" className="h-full">
          <ComparisonSlide
            title="Custodial vs Self-Custodial Wallets"
            option1Label="Custodial Wallet"
            option2Label="Self-Custodial Wallet"
            items={[
              {
                feature: "Key Ownership",
                option1: "Third party holds your private keys",
                option2: "You hold your own private keys"
              },
              {
                feature: "Control",
                option1: "Provider can freeze or restrict access",
                option2: "Only you can authorize transactions"
              },
              {
                feature: "Recovery",
                option1: "Password reset via customer support",
                option2: "Seed phrase is the only recovery method"
              },
              {
                feature: "Security Risk",
                option1: "Exchange hacks (Mt. Gox, FTX)",
                option2: "Lost seed phrase = lost funds forever"
              },
              {
                feature: "Ease of Use",
                option1: "Beginner-friendly, familiar UI",
                option2: "Requires understanding of key management"
              },
              {
                feature: "Examples",
                option1: "Coinbase, Binance, Kraken",
                option2: "MetaMask, Ledger, Trezor"
              }
            ]}
          />
        </div>

        <div className="h-full">
          <ConceptSlide
            title="Wallet Security"
            description="A crypto wallet stores the cryptographic keys that control your funds on the blockchain."
            visual={
              <div className="space-y-4 w-full">
                <CalloutBox type="warning" title="Not Your Keys, Not Your Coins">
                  If a third party holds your private keys, they ultimately control your funds. History shows custodial services can fail, get hacked, or freeze withdrawals without warning.
                </CalloutBox>
                <CalloutBox type="tip" title="Best Practices">
                  Use a hardware wallet (cold storage) for large holdings. Keep your seed phrase offline, never digitally. Use a custodial wallet only for small amounts you actively trade.
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "A wallet does not store coins — it stores the keys to access them on-chain",
              "Public key = your address (safe to share); Private key = your signature (never share)",
              "Hardware wallets keep keys offline, immune to remote attacks",
              "Multi-signature wallets require multiple approvals for added security"
            ]}
          />
        </div>

        <div className="h-full">
          <ConceptSlide
            title="Digital Signatures"
            description="Digital signatures prove that a message (or transaction) was created by the owner of a specific private key — without revealing the key."
            visual={
              <div className="space-y-4 w-full">
                <div className="p-5 bg-card rounded-xl border-2 border-[#6366f1]">
                  <div className="flex items-center gap-2 mb-3">
                    <PenTool className="size-5 text-[#6366f1]" />
                    <h4 className="font-bold text-foreground">How Signing Works</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-full bg-[#ED1C24]/20 text-[#ED1C24] flex items-center justify-center text-xs font-bold">1</span>
                      <span className="text-muted-foreground">Alice creates a transaction: <span className="font-mono text-foreground">Send 1 BTC to Bob</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-full bg-[#ED1C24]/20 text-[#ED1C24] flex items-center justify-center text-xs font-bold">2</span>
                      <span className="text-muted-foreground">Alice signs the transaction hash with her <span className="text-[#ED1C24] font-bold">private key</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-full bg-[#39B54A]/20 text-[#39B54A] flex items-center justify-center text-xs font-bold">3</span>
                      <span className="text-muted-foreground">The network verifies the signature using her <span className="text-[#39B54A] font-bold">public key</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-full bg-[#39B54A]/20 text-[#39B54A] flex items-center justify-center text-xs font-bold">4</span>
                      <span className="text-muted-foreground">If valid, the transaction is accepted — proving Alice authorized it</span>
                    </div>
                  </div>
                </div>
                <CalloutBox type="info" title="Why This Matters">
                  Digital signatures guarantee authenticity (it came from Alice), integrity (the data wasn't altered), and non-repudiation (Alice cannot deny she signed it).
                </CalloutBox>
              </div>
            }
            keyPoints={[
              "Based on asymmetric cryptography (public/private key pair)",
              "The private key signs; the public key verifies — never the reverse",
              "Every Bitcoin transaction includes a digital signature",
              "ECDSA (Elliptic Curve Digital Signature Algorithm) is used in Bitcoin"
            ]}
          />
        </div>

        {/* ═══════ 8. TRANSACTIONS — THE FULL LIFECYCLE ═══════ */}
        <div id="s1-tx" className="h-full flex items-center justify-center p-12">
          <div className="max-w-6xl w-full">
            <h2 className="text-4xl font-bold text-foreground mb-2 text-center">The Life of a Bitcoin Transaction</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
              From wallet to blockchain — every step a transaction goes through before it becomes permanent history.
            </p>

            {/* Fresco: 8-step horizontal timeline */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Step 1 */}
              <div className="p-4 bg-gradient-to-br from-[#ED1C24]/15 to-transparent rounded-xl border border-[#ED1C24]/30 relative">
                <div className="size-8 rounded-full bg-[#ED1C24] text-white flex items-center justify-center text-sm font-bold mb-3">1</div>
                <h4 className="font-bold text-foreground text-sm mb-1">Select UTXOs</h4>
                <p className="text-xs text-muted-foreground">The wallet scans your Unspent Transaction Outputs — previous payments you received that haven't been spent yet — and picks enough to cover the amount + fee.</p>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-gradient-to-br from-[#ED1C24]/15 to-transparent rounded-xl border border-[#ED1C24]/30">
                <div className="size-8 rounded-full bg-[#ED1C24] text-white flex items-center justify-center text-sm font-bold mb-3">2</div>
                <h4 className="font-bold text-foreground text-sm mb-1">Build Outputs</h4>
                <p className="text-xs text-muted-foreground">Create the outputs: one paying the recipient, and a <span className="text-[#ED1C24] font-semibold">change output</span> returning leftover funds back to your own address.</p>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-gradient-to-br from-[#f59e0b]/15 to-transparent rounded-xl border border-[#f59e0b]/30">
                <div className="size-8 rounded-full bg-[#f59e0b] text-white flex items-center justify-center text-sm font-bold mb-3">3</div>
                <h4 className="font-bold text-foreground text-sm mb-1">Set the Fee</h4>
                <p className="text-xs text-muted-foreground">Fee = Total Inputs − Total Outputs. Measured in <span className="font-mono text-[#f59e0b]">sat/vB</span>. Higher fee → faster confirmation. The wallet estimates based on mempool congestion.</p>
              </div>

              {/* Step 4 */}
              <div className="p-4 bg-gradient-to-br from-[#6366f1]/15 to-transparent rounded-xl border border-[#6366f1]/30">
                <div className="size-8 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-sm font-bold mb-3">4</div>
                <h4 className="font-bold text-foreground text-sm mb-1">Sign with Private Key</h4>
                <p className="text-xs text-muted-foreground">The wallet hashes the transaction and signs it using your <span className="text-[#6366f1] font-semibold">ECDSA private key</span>. This proves ownership of the UTXOs without revealing the key itself.</p>
              </div>

              {/* Step 5 */}
              <div className="p-4 bg-gradient-to-br from-[#39B54A]/15 to-transparent rounded-xl border border-[#39B54A]/30">
                <div className="size-8 rounded-full bg-[#39B54A] text-white flex items-center justify-center text-sm font-bold mb-3">5</div>
                <h4 className="font-bold text-foreground text-sm mb-1">Broadcast to Network</h4>
                <p className="text-xs text-muted-foreground">The signed transaction is sent to a connected node, which validates basic rules (format, signature, no double-spend) <span className="text-[#39B54A] font-semibold">then relays it to peers</span>.</p>
              </div>

              {/* Step 6 */}
              <div className="p-4 bg-gradient-to-br from-[#39B54A]/15 to-transparent rounded-xl border border-[#39B54A]/30">
                <div className="size-8 rounded-full bg-[#39B54A] text-white flex items-center justify-center text-sm font-bold mb-3">6</div>
                <h4 className="font-bold text-foreground text-sm mb-1">Enter the Mempool</h4>
                <p className="text-xs text-muted-foreground">The transaction sits in the <span className="text-[#39B54A] font-semibold">memory pool</span> — a queue of unconfirmed transactions. Miners pick from the mempool, prioritizing higher-fee transactions.</p>
              </div>

              {/* Step 7 */}
              <div className="p-4 bg-gradient-to-br from-[#8b5cf6]/15 to-transparent rounded-xl border border-[#8b5cf6]/30">
                <div className="size-8 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center text-sm font-bold mb-3">7</div>
                <h4 className="font-bold text-foreground text-sm mb-1">Mined into a Block</h4>
                <p className="text-xs text-muted-foreground">A miner includes it in a candidate block, solves the <span className="text-[#8b5cf6] font-semibold">Proof of Work puzzle</span> (finding a valid nonce), and broadcasts the new block to the network.</p>
              </div>

              {/* Step 8 */}
              <div className="p-4 bg-gradient-to-br from-[#22d3ee]/15 to-transparent rounded-xl border border-[#22d3ee]/30">
                <div className="size-8 rounded-full bg-[#22d3ee] text-white flex items-center justify-center text-sm font-bold mb-3">8</div>
                <h4 className="font-bold text-foreground text-sm mb-1">Confirmed on Chain</h4>
                <p className="text-xs text-muted-foreground">Other nodes verify and accept the block. Each new block added on top is a <span className="text-[#22d3ee] font-semibold">confirmation</span>. After 6 confirmations (~60 min), the transaction is considered irreversible.</p>
              </div>
            </div>

            {/* Summary bar */}
            <div className="flex items-center gap-1 w-full">
              <div className="flex-1 h-2 rounded-l-full bg-[#ED1C24]" />
              <div className="flex-1 h-2 bg-[#f59e0b]" />
              <div className="flex-1 h-2 bg-[#6366f1]" />
              <div className="flex-1 h-2 bg-[#39B54A]" />
              <div className="flex-1 h-2 bg-[#8b5cf6]" />
              <div className="flex-1 h-2 rounded-r-full bg-[#22d3ee]" />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
              <span>Wallet (offline)</span>
              <span>Network (propagation)</span>
              <span>Blockchain (permanent)</span>
            </div>
          </div>
        </div>

        <div className="h-full">
          <ConceptSlide
            title="The UTXO Model Explained"
            description="Bitcoin doesn't have 'accounts' with balances. Instead, it tracks individual coins as Unspent Transaction Outputs — like physical bills in a wallet."
            visual={
              <div className="space-y-4 w-full">
                <CalloutBox type="info" title="Think of UTXOs like cash">
                  If you owe someone 3 BTC but only have a 5 BTC UTXO, you spend the whole 5 BTC:
                  3 BTC → recipient, 2 BTC → back to yourself as change. The original 5 BTC UTXO is destroyed; two new UTXOs are created.
                </CalloutBox>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30 text-center">
                    <h4 className="font-bold text-[#ED1C24] mb-2">Inputs (consumed)</h4>
                    <div className="text-2xl font-mono font-bold text-foreground">5.0 BTC</div>
                    <p className="text-xs text-muted-foreground mt-1">1 UTXO destroyed</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <span className="text-2xl">→</span>
                    <span className="text-[10px] mt-1">Fee: 0.0001 BTC</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30 text-center">
                      <h4 className="font-bold text-[#39B54A] text-sm">Recipient</h4>
                      <div className="text-lg font-mono font-bold text-foreground">3.0 BTC</div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30 text-center">
                      <h4 className="font-bold text-[#6366f1] text-sm">Change</h4>
                      <div className="text-lg font-mono font-bold text-foreground">1.9999 BTC</div>
                    </div>
                  </div>
                </div>
              </div>
            }
            keyPoints={[
              "Your 'balance' is just the sum of all UTXOs your keys can spend",
              "Each transaction destroys old UTXOs and creates new ones",
              "Fee = sum of inputs − sum of outputs (implicit, not a field)",
              "Wallets handle UTXO selection automatically; users never see this complexity"
            ]}
          />
        </div>

        {/* ═══════ 9. CONSENSUS MECHANISMS ═══════ */}

        {/* ── 9a. PROOF OF WORK deep-dive ── */}
        <div id="s1-consensus" className="h-full flex items-center justify-center p-12">
          <div className="max-w-5xl w-full">
            <div className="flex items-center gap-3 mb-1">
              <div className="size-10 rounded-full bg-[#ED1C24]/20 flex items-center justify-center text-xl">⛏️</div>
              <h2 className="text-3xl font-bold text-foreground">Proof of Work (PoW)</h2>
            </div>
            <p className="text-muted-foreground mb-6 ml-[52px]">
              Miners compete in a brute-force race to find a nonce that produces a hash below the difficulty target. The winner earns the right to add the next block and collects the block reward + fees.
            </p>

            <ConsensusVisualization mechanism="pow" />

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="p-3 bg-[#39B54A]/10 rounded-lg border border-[#39B54A]/30">
                <h4 className="text-xs font-bold text-[#39B54A] mb-1">✓ Strengths</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• Battle-tested since 2009 (Bitcoin)</li>
                  <li>• Extremely costly to attack (51%)</li>
                  <li>• Fully permissionless participation</li>
                </ul>
              </div>
              <div className="p-3 bg-[#ED1C24]/10 rounded-lg border border-[#ED1C24]/30">
                <h4 className="text-xs font-bold text-[#ED1C24] mb-1">✗ Weaknesses</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• Massive energy consumption (~150 TWh/yr)</li>
                  <li>• Slow block times (~10 min BTC)</li>
                  <li>• Mining pool centralization risk</li>
                </ul>
              </div>
              <div className="p-3 bg-[#6366f1]/10 rounded-lg border border-[#6366f1]/30">
                <h4 className="text-xs font-bold text-[#6366f1] mb-1">📊 Key Numbers</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• Block reward: 3.125 BTC (2024+)</li>
                  <li>• Halving: every 210,000 blocks (~4 yr)</li>
                  <li>• Finality: probabilistic (~6 confirmations)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── 9b. PROOF OF STAKE deep-dive ── */}
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-5xl w-full">
            <div className="flex items-center gap-3 mb-1">
              <div className="size-10 rounded-full bg-[#6366f1]/20 flex items-center justify-center text-xl">🔒</div>
              <h2 className="text-3xl font-bold text-foreground">Proof of Stake (PoS)</h2>
            </div>
            <p className="text-muted-foreground mb-6 ml-[52px]">
              Validators lock tokens as collateral. The protocol randomly selects a proposer (weighted by stake), and a committee attests the block. Dishonest behavior is punished by slashing the validator's deposit.
            </p>

            <ConsensusVisualization mechanism="pos" />

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="p-3 bg-[#39B54A]/10 rounded-lg border border-[#39B54A]/30">
                <h4 className="text-xs font-bold text-[#39B54A] mb-1">✓ Strengths</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• 99.95% less energy than PoW</li>
                  <li>• Lower barrier (no hardware needed)</li>
                  <li>• Built-in punishment (slashing)</li>
                </ul>
              </div>
              <div className="p-3 bg-[#ED1C24]/10 rounded-lg border border-[#ED1C24]/30">
                <h4 className="text-xs font-bold text-[#ED1C24] mb-1">✗ Weaknesses</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• "Rich get richer" centralization risk</li>
                  <li>• Nothing-at-stake problem (mitigated by slashing)</li>
                  <li>• Long-range attack vectors</li>
                </ul>
              </div>
              <div className="p-3 bg-[#6366f1]/10 rounded-lg border border-[#6366f1]/30">
                <h4 className="text-xs font-bold text-[#6366f1] mb-1">📊 Key Numbers</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• Ethereum: 32 ETH min. stake</li>
                  <li>• Block time: ~12 seconds (Ethereum)</li>
                  <li>• Finality: 2 epochs (~12.8 minutes)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── 9c. DPoS & BFT deep-dive ── */}
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-5xl w-full">
            <div className="flex items-center gap-3 mb-1">
              <div className="size-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-xl">🗳️</div>
              <h2 className="text-3xl font-bold text-foreground">Delegated PoS & BFT Variants</h2>
            </div>
            <p className="text-muted-foreground mb-6 ml-[52px]">
              Token holders elect a small set of delegates who take turns producing blocks. Combined with Byzantine Fault Tolerance, this achieves instant finality and high throughput — at the cost of decentralization.
            </p>

            <ConsensusVisualization mechanism="dpos" />

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="p-3 bg-[#39B54A]/10 rounded-lg border border-[#39B54A]/30">
                <h4 className="text-xs font-bold text-[#39B54A] mb-1">✓ Strengths</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• Very fast block times (&lt;1–3 sec)</li>
                  <li>• Instant / absolute finality (no reorgs)</li>
                  <li>• High throughput (1,000+ TPS)</li>
                </ul>
              </div>
              <div className="p-3 bg-[#ED1C24]/10 rounded-lg border border-[#ED1C24]/30">
                <h4 className="text-xs font-bold text-[#ED1C24] mb-1">✗ Weaknesses</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• Small validator set → less decentralized</li>
                  <li>• Vote-buying / cartel risk</li>
                  <li>• Not sybil-resistant without token weight</li>
                </ul>
              </div>
              <div className="p-3 bg-[#6366f1]/10 rounded-lg border border-[#6366f1]/30">
                <h4 className="text-xs font-bold text-[#6366f1] mb-1">📊 Examples</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  <li>• EOS: 21 block producers (DPoS)</li>
                  <li>• Cosmos/Tendermint: pBFT + PoS</li>
                  <li>• BNB Chain: 21 validators (PoSA)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── 9d. Three-way comparison table ── */}
        <div className="h-screen flex items-center justify-center p-12">
          <div className="max-w-6xl w-full">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Consensus Mechanisms — Side by Side</h2>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-bold text-muted-foreground w-[20%]">Property</th>
                    <th className="text-center p-3 font-bold text-[#ED1C24] w-[26%]">⛏️ Proof of Work</th>
                    <th className="text-center p-3 font-bold text-[#6366f1] w-[26%]">🔒 Proof of Stake</th>
                    <th className="text-center p-3 font-bold text-[#f59e0b] w-[28%]">🗳️ DPoS / BFT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Block Producer", "Miner with most hash power", "Randomly selected validator (weighted by stake)", "Elected delegate (round-robin)"],
                    ["Security Budget", "Hardware + electricity cost", "Locked token collateral (slashable)", "Locked stake + voter trust"],
                    ["Energy Use", "Very high (~150 TWh/yr for BTC)", "Negligible (~0.01 TWh)", "Negligible"],
                    ["Block Time", "~10 min (BTC)", "~12 sec (ETH)", "<1–3 sec"],
                    ["Finality", "Probabilistic (6 blocks ≈ 60 min)", "2 epochs (~12.8 min on ETH)", "Instant / absolute"],
                    ["Scalability", "~7 TPS (BTC base layer)", "~30 TPS (ETH base layer)", "1,000+ TPS"],
                    ["Decentralization", "High (anyone can mine)", "Medium (min stake required)", "Low (few elected delegates)"],
                    ["Attack Vector", "51% of hash power", "33%+ of total stake", "Corrupt 2/3 of delegates"],
                    ["Flagship Chain", "Bitcoin", "Ethereum (post-Merge)", "EOS, Cosmos, BNB Chain"],
                  ].map(([feature, pow, pos, dpos], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                      <td className="p-3 font-bold text-foreground text-xs">{feature}</td>
                      <td className="p-3 text-center text-xs text-muted-foreground">{pow}</td>
                      <td className="p-3 text-center text-xs text-muted-foreground">{pos}</td>
                      <td className="p-3 text-center text-xs text-muted-foreground">{dpos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pedagogical note — The Trilemma (interactive exercise) */}
        <div className="h-full flex items-center justify-center p-12">
          <TrilemmaExercise />
        </div>

        {/* ═══════ CAPSTONE: CHAIN BUILDER ═══════ */}
        <div id="s1-chain-builder" className="h-full flex items-center justify-center p-8 lg:p-12">
          <ChainBuilderExercise />
        </div>

        {/* Final quiz */}
        <div id="s1-quiz" className="h-full">
          <QuizSlide
            question="What is the main advantage of Proof of Stake over Proof of Work?"
            options={[
              { text: "Significantly lower energy consumption", correct: true },
              { text: "Faster transaction processing", correct: false },
              { text: "Better security against attacks", correct: false },
              { text: "Complete anonymity", correct: false }
            ]}
            explanation="Proof of Stake eliminates the need for energy-intensive mining, reducing electricity consumption by over 99% compared to Proof of Work. This makes it much more environmentally sustainable."
          />
        </div>

        {/* Quiz: transactions */}
        <div className="h-full">
          <QuizSlide
            question="In Bitcoin's UTXO model, what represents the transaction fee?"
            options={[
              { text: "A fixed rate set by the Bitcoin protocol", correct: false },
              { text: "The difference between total inputs and total outputs", correct: true },
              { text: "A percentage of the transaction value", correct: false },
              { text: "A mandatory payment to the network foundation", correct: false }
            ]}
            explanation="In the UTXO model, the fee is implicitly defined as the gap between the sum of inputs and the sum of outputs. Miners collect this difference as their reward for including the transaction in a block."
          />
        </div>

        {/* Quiz: hashing */}
        <div className="h-full">
          <QuizSlide
            question="What happens if you change a single character in the input of a SHA-256 hash?"
            options={[
              { text: "Only the last few characters of the hash change", correct: false },
              { text: "The hash changes slightly, proportional to the edit", correct: false },
              { text: "The entire hash output changes unpredictably (avalanche effect)", correct: true },
              { text: "The hash stays the same if the change is small enough", correct: false }
            ]}
            explanation="Cryptographic hash functions exhibit the avalanche effect: even a 1-bit change in the input produces a completely different output. This makes it impossible to reverse-engineer or predict hash values."
          />
        </div>

        {/* Quiz: Merkle trees */}
        <div className="h-full">
          <QuizSlide
            question="Why are Merkle trees used in blockchains instead of hashing all transactions together?"
            options={[
              { text: "They produce shorter hashes", correct: false },
              { text: "They allow verifying a single transaction without downloading the whole block", correct: true },
              { text: "They are faster to compute than a single hash", correct: false },
              { text: "They encrypt the transaction data", correct: false }
            ]}
            explanation="Merkle trees enable Simplified Payment Verification (SPV). A light client only needs the Merkle proof (a few hashes along the path) to confirm a transaction is in a block — no need to download every transaction."
          />
        </div>

        {/* Quiz: wallets & keys */}
        <div className="h-full">
          <QuizSlide
            question="What does a cryptocurrency wallet actually store?"
            options={[
              { text: "Your coins and token balances", correct: false },
              { text: "A copy of the entire blockchain", correct: false },
              { text: "Your private and public cryptographic keys", correct: true },
              { text: "Your transaction history only", correct: false }
            ]}
            explanation="Wallets store your private key (used to sign transactions) and derive your public key and address from it. Your 'balance' is calculated from UTXOs on the blockchain — the wallet just holds the keys that prove ownership."
          />
        </div>

        {/* Quiz: blockchain trilemma */}
        <div className="h-full">
          <QuizSlide
            question="According to the blockchain trilemma, which property does DPoS/BFT typically sacrifice?"
            options={[
              { text: "Security", correct: false },
              { text: "Scalability", correct: false },
              { text: "Decentralization", correct: true },
              { text: "All three are equally achieved", correct: false }
            ]}
            explanation="DPoS and BFT variants achieve high speed and instant finality by relying on a small, elected set of validators. This greatly reduces decentralization — fewer nodes means faster consensus but more centralized control."
          />
        </div>

        {/* Quiz: blocks */}
        <div className="h-full">
          <QuizSlide
            question="What is the purpose of the 'previous hash' field in a block header?"
            options={[
              { text: "It encrypts the block's transaction data", correct: false },
              { text: "It links the block to the one before it, forming the chain", correct: true },
              { text: "It stores the miner's identity", correct: false },
              { text: "It determines the block reward amount", correct: false }
            ]}
            explanation="Each block header contains the hash of the previous block, creating a cryptographic chain. If anyone tampers with an earlier block, its hash changes, breaking the link and invalidating every subsequent block."
          />
        </div>

        {/* Quiz: block alteration — relocated from blocks section */}
        <div className="h-full">
          <QuizSlide
            question="What happens if someone tries to alter a transaction in a previous block?"
            options={[
              { text: "The block's hash would change, breaking the chain", correct: true },
              { text: "Nothing, previous blocks can be freely edited", correct: false },
              { text: "Only the miner who created the block would notice", correct: false },
              { text: "The network would automatically repair the chain", correct: false }
            ]}
            explanation="Because each block's hash is included in the next block, changing any data would change the hash and break the cryptographic link. The network would reject the altered chain."
          />
        </div>

        {/* Quiz: seed phrase — relocated from wallets section */}
        <div className="h-full">
          <QuizSlide
            question="In a self-custodial wallet, what happens if you lose your seed phrase?"
            options={[
              { text: "You can contact customer support to recover your funds", correct: false },
              { text: "Your funds are permanently lost — no one can recover them", correct: true },
              { text: "The blockchain automatically generates a new seed phrase", correct: false },
              { text: "Your funds are returned to the sender", correct: false }
            ]}
            explanation="In self-custodial wallets, the seed phrase is the only way to derive your private keys. There is no company or authority that can recover them. This is the trade-off for full control: total responsibility."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s1-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 1 — Key Takeaways"
            takeaways={[
              "DLT replaces centralized databases with shared, replicated ledgers — blockchain is the most prominent type",
              "Cryptographic hashing creates one-way fingerprints that link blocks and detect tampering",
              "Merkle Trees enable efficient verification of transactions without downloading the full chain",
              "Blocks contain a header (prev hash, timestamp, nonce) and a body (transaction data)",
              "Wallets store keys, not coins — understanding custodial vs self-custodial trade-offs is essential",
              "Digital signatures prove transaction authenticity without revealing private keys",
              "Transactions use UTXOs, digital signatures, and fees to move value securely",
              "No consensus mechanism is perfect — each optimizes for different trade-offs"
            ]}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
