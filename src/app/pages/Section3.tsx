import { TitleSlide } from '../components/templates/TitleSlide';
import { ConceptSlide } from '../components/templates/ConceptSlide';
import { ComparisonSlide } from '../components/templates/ComparisonSlide';
import { DiscussionSlide } from '../components/templates/DiscussionSlide';
import { TakeawaySlide } from '../components/templates/TakeawaySlide';
import { QuizSlide } from '../components/templates/QuizSlide';
import { CalloutBox } from '../components/shared/CalloutBox';
import { Rocket, ExternalLink } from 'lucide-react';
import { SectionNav } from '../components/navigation/SectionNav';
import { TeamCheckpoint } from '../components/TeamCheckpoint';
import ethereumLogo from '../../ethereum-eth-logo.svg';
import vitalikPhoto from '../../vitalik-buterin.jpg';
import amazonLogo from '../../amazon.png';
import msnLogo from '../../msn.png';
import netscapeLogo from '../../netscape.png';
import tiktokLogo from '../../tiktok.jpg';
import youtubeLogo from '../../youtube.png';
import xLogo from '../../x-logo.jpg';
import bitcoinLogo from '../../bitcoin-btc-logo.svg';
import uniswapLogo from '../../uniswap-uni-logo.svg';
import usdcLogo from '../../usd-coin-usdc-logo.svg';

const section3Chapters = [
  { id: 's3-ethereum',  label: 'Ethereum' },
  { id: 's3-eth-accounts', label: 'Accounts & Gas' },
  { id: 's3-eth-apps',     label: 'DeFi · NFTs · DAOs' },
  { id: 's3-usecases', label: 'Use Cases' },
  { id: 's3-ecosystem', label: 'Web3 Ecosystem' },
  { id: 's3-web3', label: 'Web1 → Web3' },
  { id: 's3-dapp', label: 'App vs dApp' },
  { id: 's3-ethics', label: 'Ethics' },
  { id: 's3-future', label: 'Future Trends' },
  { id: 's3-discussion', label: 'Discussion' },
  { id: 's3-quiz', label: 'Quizzes' },
  { id: 's3-takeaways', label: 'Takeaways' },
  { id: 's3-team-checkpoint', label: '🤝 Team Checkpoint' },
];

export function Section3() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="w-44 shrink-0 h-full hidden lg:block border-r border-border">
        <SectionNav chapters={section3Chapters} />
      </div>
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 03"
            title="What's Next for Blockchain?"
            subtitle="Applications, ecosystem, evolution of the web, and the future of decentralized technology"
            icon={<Rocket className="size-20 text-[#39B54A]" />}
            gradient="from-[#39B54A] to-[#22d3ee]"
          />
        </div>

        {/* ═══════ 1. ETHEREUM & VITALIK BUTERIN ═══════ */}
        <div id="s3-ethereum" className="h-full flex flex-col p-5 lg:p-8">

          <div className="shrink-0 mb-4">
            <div className="flex items-center gap-3 mb-1">
              <img src={ethereumLogo} alt="Ethereum" className="h-8 object-contain" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Ethereum — The Programmable Blockchain</h2>
            </div>
            <p className="text-sm text-muted-foreground">Bitcoin proved decentralised money was possible. Ethereum asked: what if you could run <em>any</em> program on a blockchain?</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">

            {/* Vitalik card */}
            <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
              <img src={vitalikPhoto} alt="Vitalik Buterin" className="w-full object-cover object-top flex-1 min-h-0" />
              <div className="p-4 shrink-0">
                <div className="font-black text-foreground text-lg leading-tight">Vitalik Buterin</div>
                <div className="text-xs text-[#627EEA] font-medium mt-0.5">Co-founder of Ethereum</div>
                <div className="text-xs text-muted-foreground mt-2">Born 1994 in Russia, raised in Canada. Published the Ethereum whitepaper in late 2013 — aged <span className="text-foreground font-bold">19</span>.</div>
              </div>
            </div>

            {/* Timeline + why */}
            <div className="col-span-2 flex flex-col gap-3 min-h-0">

              <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
                <h3 className="font-bold text-foreground text-sm">Why Ethereum Existed</h3>
                <p className="text-sm text-muted-foreground">
                  Vitalik was an early Bitcoin contributor and journalist. He saw that Bitcoin's scripting language was <span className="text-foreground font-medium">deliberately limited</span> — great for currency, useless for building applications. Several projects had tried to layer features on top of Bitcoin (Colored Coins, Mastercoin) but all hit the same ceiling.
                </p>
                <p className="text-sm text-muted-foreground">
                  His proposal: a new blockchain with a <span className="text-foreground font-medium">Turing-complete virtual machine</span> (the EVM) that could execute any arbitrary program — called a <span className="text-foreground font-medium">smart contract</span>. Developers would finally be able to build decentralised applications without a trusted server.
                </p>
              </div>

              <div className="flex gap-3 flex-1 min-h-0">

                <div className="flex flex-col gap-2 flex-1">
                  {[
                    { year: '2013', label: 'Whitepaper published', color: '#627EEA' },
                    { year: '2014', label: 'Crowdsale raises $18M — largest at the time', color: '#627EEA' },
                    { year: '2015', label: 'Ethereum mainnet launches (Frontier)', color: '#39B54A' },
                    { year: '2016', label: 'The DAO hack — first major test of governance', color: '#ED1C24' },
                    { year: '2022', label: 'The Merge — switches from PoW to Proof of Stake', color: '#8b5cf6' },
                    { year: '2025', label: 'Pectra upgrade — smart accounts, higher validator limits, blob scaling', color: '#8b5cf6' },
                    { year: '2026 →', label: 'Fusaka upgrade — full PeerDAS, EOF, and deeper L2 scaling', color: '#22d3ee', soon: true },
                  ].map(ev => (
                    <div key={ev.year} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${'soon' in ev && ev.soon ? 'bg-[#22d3ee]/10 border border-dashed border-[#22d3ee]/50' : 'bg-card border border-border'}`}>
                      <span className="font-black text-sm shrink-0" style={{ color: ev.color }}>{ev.year}</span>
                      <span className="text-sm text-muted-foreground flex-1">{ev.label}</span>
                      {'soon' in ev && ev.soon && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22d3ee]/20 text-[#22d3ee] shrink-0">SOON</span>
                      )}
                    </div>
                  ))}
                  <a
                    href="https://metamask.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 bg-[#F6851B]/10 border border-[#F6851B]/40 rounded-lg hover:bg-[#F6851B]/20 hover:border-[#F6851B]/70 transition-all group mt-1"
                  >
                    <span className="text-xl shrink-0">🦊</span>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-[#F6851B]">Create your first wallet</div>
                      <div className="text-xs text-muted-foreground">metamask.io</div>
                    </div>
                    <ExternalLink className="size-4 text-[#F6851B]/60 group-hover:text-[#F6851B] transition-colors shrink-0" />
                  </a>
                </div>

                <div className="w-40 shrink-0 flex flex-col gap-2">
                  <div className="bg-gradient-to-br from-[#627EEA]/20 to-transparent border border-[#627EEA]/40 rounded-xl p-3 flex flex-col items-center text-center flex-1">
                    <img src={ethereumLogo} alt="ETH" className="h-10 object-contain mb-2" />
                    <div className="text-xl font-black text-[#627EEA]">#2</div>
                    <div className="text-xs text-muted-foreground mt-1">Largest blockchain by market cap and developer activity</div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-foreground">4,000+</div>
                    <div className="text-xs text-muted-foreground">dApps live on Ethereum today</div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ═══════ ETH ACCOUNTS & GAS ═══════ */}
        <div id="s3-eth-accounts" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <div className="flex items-center gap-3 mb-1">
              <img src={ethereumLogo} alt="Ethereum" className="h-7 object-contain" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Ethereum: Accounts & Gas</h2>
            </div>
            <p className="text-sm text-muted-foreground">Two concepts you must understand before touching any Ethereum application. Everything else is built on top of these.</p>
          </div>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
            {/* Accounts */}
            <div className="flex flex-col gap-3">
              <div className="font-bold text-sm text-foreground">Two Types of Account</div>
              <div className="flex-1 grid grid-rows-2 gap-3">
                <div className="p-4 bg-[#627EEA]/8 border border-[#627EEA]/30 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🧑</span>
                    <div className="font-bold text-[#627EEA]">Externally Owned Account (EOA)</div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Controlled by a <span className="font-semibold text-foreground">private key</span> — whoever holds the key owns the account</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Can <span className="font-semibold text-foreground">initiate transactions</span> — send ETH, deploy contracts, call functions</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Has a balance in ETH. No code stored.</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Examples: your MetaMask wallet, a hardware wallet, an exchange hot wallet</li>
                  </ul>
                </div>
                <div className="p-4 bg-[#39B54A]/8 border border-[#39B54A]/30 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📄</span>
                    <div className="font-bold text-[#39B54A]">Contract Account</div>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Controlled by <span className="font-semibold text-foreground">code</span> — no private key, no human owner</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span><span className="font-semibold text-foreground">Cannot initiate</span> transactions — only executes when called by an EOA or another contract</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Has a balance in ETH + stores code and state permanently on-chain</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Examples: Uniswap DEX, USDC token, an NFT collection</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg text-xs text-muted-foreground">
                <span className="font-bold text-[#f59e0b]">Key rule:</span> Every transaction on Ethereum originates from an EOA. Smart contracts cannot act spontaneously — they need a human (or a keeper bot) to trigger them.
              </div>
            </div>
            {/* Gas */}
            <div className="flex flex-col gap-3">
              <div className="font-bold text-sm text-foreground">Gas — The Fuel of the EVM</div>
              <div className="p-4 bg-card border border-border rounded-xl text-sm text-muted-foreground leading-relaxed">
                Every operation on Ethereum costs <span className="font-semibold text-foreground">gas</span> — a unit that measures computational work. Gas prevents infinite loops and spam: you must pay for every instruction executed by the EVM.
              </div>
              <div className="flex-1 grid grid-rows-2 gap-3">
                <div className="p-4 bg-card border border-border rounded-xl">
                  <div className="font-bold text-sm text-foreground mb-2">Gas cost examples</div>
                  {[
                    { op: 'Read a public variable',     gas: 'FREE',      note: 'View call — never hits the chain', color: '#39B54A' },
                    { op: 'Emit an event',              gas: '~375 gas',  note: 'Cheap — stored in logs, not state', color: '#6366f1' },
                    { op: 'Transfer ETH',               gas: '21,000 gas',note: 'Base cost for every ETH transfer', color: '#f59e0b' },
                    { op: 'Write to storage',           gas: '~22,100 gas',note: 'Most expensive common operation', color: '#ED1C24' },
                    { op: 'Deploy a contract',          gas: '500k+ gas', note: 'Pays for every byte of bytecode', color: '#8b5cf6' },
                  ].map(r => (
                    <div key={r.op} className="flex items-center gap-2 py-1 border-b border-border/50 last:border-0">
                      <span className="text-xs text-muted-foreground flex-1">{r.op}</span>
                      <span className="text-xs font-black shrink-0" style={{ color: r.color }}>{r.gas}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-[#627EEA]/8 border border-[#627EEA]/30 rounded-xl">
                  <div className="font-bold text-sm text-[#627EEA] mb-2">Gas = Gas Units × Gas Price</div>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span><span className="font-semibold text-foreground">Base fee:</span> Set by the protocol, burned (EIP-1559, since 2021)</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span><span className="font-semibold text-foreground">Priority fee (tip):</span> You pay the validator to include your transaction faster</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>Gas price is denominated in <span className="font-semibold text-foreground">gwei</span> (1 gwei = 0.000000001 ETH)</li>
                    <li className="flex gap-2"><span className="text-[#627EEA] shrink-0">•</span>If a transaction runs out of gas mid-execution — it reverts, but <em>you still pay for the work done</em></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ ETH APPLICATIONS: DeFi · NFTs · DAOs ═══════ */}
        <div id="s3-eth-apps" className="h-full flex flex-col p-5 lg:p-8">
          <div className="shrink-0 mb-4">
            <div className="flex items-center gap-3 mb-1">
              <img src={ethereumLogo} alt="Ethereum" className="h-7 object-contain" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What Ethereum Enables: DeFi, NFTs, DAOs</h2>
            </div>
            <p className="text-sm text-muted-foreground">Three categories of applications that did not exist before programmable blockchains — each replacing or disrupting a traditional institution.</p>
          </div>
          <div className="flex-1 min-h-0 flex gap-4">
            {([
              {
                icon: '🏦', title: 'DeFi', subtitle: 'Decentralised Finance',
                color: '#39B54A',
                replaces: 'Banks, brokers, exchanges',
                description: 'Financial services — lending, borrowing, trading, earning yield — running entirely in smart contracts. No KYC, no opening hours, no intermediary taking a cut.',
                examples: [
                  { name: 'Uniswap', desc: 'Decentralised exchange — swap any ERC-20 token via automated market maker (AMM)' },
                  { name: 'Aave', desc: 'Lend and borrow crypto — interest rates set algorithmically by supply/demand' },
                  { name: 'MakerDAO / DAI', desc: 'Algorithmic stablecoin — mint DAI by locking ETH as collateral in a smart contract' },
                ],
                risk: 'Smart contract bugs, oracle manipulation, liquidation cascades',
                stat: '$40B+ Total Value Locked in DeFi protocols',
              },
              {
                icon: '🖼️', title: 'NFTs', subtitle: 'Non-Fungible Tokens',
                color: '#f97316',
                replaces: 'Art dealers, certificate authorities, notaries',
                description: 'Provable, transferable digital ownership on-chain. Each NFT is a unique token (ERC-721) whose ownership history is permanently recorded. No one can deny ownership — the blockchain is the title deed.',
                examples: [
                  { name: 'ENS (.eth domains)', desc: 'Blockchain-native usernames — pay once, own forever. No renewal extortion.' },
                  { name: 'Proof of attendance (POAPs)', desc: 'On-chain badges proving you attended events — cryptographic credentials' },
                  { name: 'Real estate deeds', desc: 'Propy sold the first NFT property — immutable ownership transfer on-chain' },
                ],
                risk: 'Metadata stored off-chain (IPFS) can disappear — "you don\'t own the image, you own the receipt"',
                stat: '$41B traded in NFTs in 2021 — peak. Now utility-focused.',
              },
              {
                icon: '🏛️', title: 'DAOs', subtitle: 'Decentralised Autonomous Organisations',
                color: '#6366f1',
                replaces: 'Companies, NGOs, cooperatives, funds',
                description: 'An organisation governed by smart contracts and token votes instead of a board of directors. Anyone holding governance tokens can propose and vote on decisions — the outcome executes automatically on-chain.',
                examples: [
                  { name: 'MakerDAO', desc: 'MKR holders vote on DAI stability parameters — billions in protocol policy decided on-chain' },
                  { name: 'Uniswap DAO', desc: 'UNI holders control the $6B+ Uniswap treasury — voted to deploy to new chains' },
                  { name: 'Gitcoin DAO', desc: 'Funds open-source development via quadratic voting — community decides who gets grants' },
                ],
                risk: 'Voter apathy, whale capture, slow governance for emergencies',
                stat: 'DAOs collectively hold $20B+ in treasuries',
              },
            ] as const).map(app => (
              <div key={app.title} className="flex-1 flex flex-col rounded-xl border-2 bg-card overflow-hidden" style={{ borderColor: app.color + '40' }}>
                <div className="h-1.5 shrink-0" style={{ backgroundColor: app.color }} />
                <div className="flex flex-col flex-1 p-4 gap-3 min-h-0">
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-2xl">{app.icon}</span>
                    <div>
                      <div className="font-black text-lg leading-none" style={{ color: app.color }}>{app.title}</div>
                      <div className="text-xs font-semibold text-foreground">{app.subtitle}</div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground italic">Replaces: {app.replaces}</div>
                  </div>
                  <p className="text-sm text-muted-foreground shrink-0">{app.description}</p>
                  <div className="flex-1 min-h-0 space-y-2">
                    {app.examples.map(ex => (
                      <div key={ex.name} className="p-2.5 rounded-lg bg-muted/40 border border-border">
                        <div className="font-bold text-xs text-foreground mb-0.5">{ex.name}</div>
                        <div className="text-xs text-muted-foreground">{ex.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="shrink-0 pt-3 border-t border-border space-y-1.5">
                    <div className="text-xs text-muted-foreground"><span className="font-semibold text-[#ef4444]">Risk: </span>{app.risk}</div>
                    <div className="text-xs font-semibold" style={{ color: app.color }}>{app.stat}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 2. BLOCKCHAIN USE CASES ═══════ */}
        <div id="s3-usecases" className="h-full flex flex-col p-5 lg:p-8">

          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Blockchain Use Cases</h2>
            <p className="text-sm text-muted-foreground">Blockchain extends far beyond cryptocurrency — any industry built on trust, records, or intermediaries is a candidate for transformation.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-4 gap-3">
            {[
              {
                emoji: '💰', title: 'Finance & DeFi', color: '#f59e0b',
                points: ['Peer-to-peer lending, trading, and payments with no bank', 'Smart contracts replace brokers and clearing houses', 'Open 24/7 — no business hours, no jurisdiction limits'],
              },
              {
                emoji: '📈', title: 'Capital Markets', color: '#627EEA',
                points: ['Tokenised securities settle in seconds vs T+2 days', 'Transparent audit trail reduces counterparty risk', 'Fractional ownership opens markets to retail investors'],
              },
              {
                emoji: '🏦', title: 'Insurance', color: '#8b5cf6',
                points: ['Parametric insurance: smart contracts auto-pay on verified events', 'Shared fraud databases prevent double-claiming across insurers', 'Streamlined claims cut processing time from weeks to hours'],
              },
              {
                emoji: '🪙', title: 'CBDCs', color: '#22d3ee',
                points: ['Central bank digital currencies for instant interbank settlement', 'Programmable money for targeted fiscal stimulus', 'Financial inclusion for the 1.4B unbanked population'],
              },
              {
                emoji: '🚚', title: 'Supply Chain', color: '#39B54A',
                points: ['End-to-end track & trace from raw material to consumer', 'Immutable provenance — fight counterfeits in luxury and pharma', 'Automated supplier payments via smart contracts on delivery'],
              },
              {
                emoji: '🌐', title: 'Global Trade', color: '#22d3ee',
                points: ['Digitise letters of credit and trade documents', 'Reduce 5-day paper processes to near real-time', 'Single shared ledger replaces dozens of siloed systems'],
              },
              {
                emoji: '🏥', title: 'Healthcare', color: '#ED1C24',
                points: ['Patient-controlled health records shared across providers', 'Drug supply chain authentication — prevent counterfeits', 'Clinical trial data integrity and transparent reporting'],
              },
              {
                emoji: '🪪', title: 'Digital Identity', color: '#8b5cf6',
                points: ['Self-sovereign identity — you own and control your credentials', 'Tamper-proof KYC reusable across services (do it once)', 'Privacy-preserving proofs: prove age without revealing birthdate'],
              },
              {
                emoji: '🗳️', title: 'Government', color: '#6366f1',
                points: ['Tamper-proof voting systems with verifiable results', 'Land registry and public records on an immutable ledger', 'Transparent public procurement to reduce corruption'],
              },
              {
                emoji: '🌍', title: 'Energy & Sustainability', color: '#10b981',
                points: ['Verifiable carbon credits — prevent double-counting', 'Peer-to-peer renewable energy trading between households', 'ESG reporting with on-chain proof, not self-reported data'],
              },
              {
                emoji: '🎬', title: 'Media & Entertainment', color: '#f59e0b',
                points: ['Creators receive royalties instantly via smart contracts', 'NFTs prove ownership and authenticity of digital works', 'Piracy prevention through on-chain content licensing'],
              },
              {
                emoji: '⚖️', title: 'Law & Real Estate', color: '#ED1C24',
                points: ['Smart contracts auto-execute clauses (escrow, transfers)', 'Fractional real estate ownership lowers investment barriers', 'Immutable records reduce title fraud and legal disputes'],
              },
            ].map(item => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-3 flex flex-col hover:border-opacity-60 transition-colors" style={{ borderColor: item.color + '40' }}>
                <div className="flex items-center gap-2 shrink-0 mb-2">
                  <span className="text-lg">{item.emoji}</span>
                  <h4 className="font-bold text-sm" style={{ color: item.color }}>{item.title}</h4>
                </div>
                <ul className="flex flex-col justify-between flex-1">
                  {item.points.map(p => (
                    <li key={p} className="flex gap-1.5 text-xs text-muted-foreground flex-1 items-center">
                      <span className="shrink-0" style={{ color: item.color }}>•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ 2. BLOCKCHAIN & WEB3 ECOSYSTEM MAP ═══════ */}
        <div id="s3-ecosystem" className="h-full flex items-center justify-center p-8">
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl font-bold text-foreground mb-1 text-center">The Blockchain & Web3 Ecosystem</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              A layered stack — from raw infrastructure at the bottom to end users at the top.
            </p>

            <div className="space-y-2">

              {/* Layer: Users */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#39B54A]/20 to-transparent border border-[#39B54A]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">👤</span>
                  <span className="font-bold text-[#39B54A] text-xs uppercase tracking-widest">Users</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Developers', 'Traders', 'Creators', 'Institutions', 'Individuals'].map(u => (
                    <span key={u} className="px-3 py-1 bg-[#39B54A]/10 border border-[#39B54A]/30 rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

              {/* Layer: Interfaces */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#6366f1]/20 to-transparent border border-[#6366f1]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">🖥️</span>
                  <span className="font-bold text-[#6366f1] text-xs uppercase tracking-widest">Interfaces</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Wallets (MetaMask, Phantom)', 'dApps', 'Exchanges (Uniswap, Binance)', 'NFT Marketplaces', 'Bridges'].map(u => (
                    <span key={u} className="px-3 py-1 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

              {/* Layer: Applications */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#f59e0b]/20 to-transparent border border-[#f59e0b]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">⚙️</span>
                  <span className="font-bold text-[#f59e0b] text-xs uppercase tracking-widest">Applications & Protocols</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['DeFi (Aave, Compound)', 'NFTs (ERC-721)', 'DAOs (Snapshot, Aragon)', 'Gaming (Axie Infinity)', 'Stablecoins (USDC, DAI)'].map(u => (
                    <span key={u} className="px-3 py-1 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

              {/* Layer: Blockchains */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#ED1C24]/20 to-transparent border border-[#ED1C24]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">⛓️</span>
                  <span className="font-bold text-[#ED1C24] text-xs uppercase tracking-widest">Blockchain Layer (L1 / L2)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Bitcoin', 'Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche'].map(u => (
                    <span key={u} className="px-3 py-1 bg-[#ED1C24]/10 border border-[#ED1C24]/30 rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

              {/* Layer: Infrastructure */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#9ca3af]/10 to-transparent border border-[#9ca3af]/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base">🖧</span>
                  <span className="font-bold text-muted-foreground text-xs uppercase tracking-widest">Infrastructure</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Nodes', 'Validators / Miners', 'P2P Network', 'Cryptography', 'Consensus Mechanisms'].map(u => (
                    <span key={u} className="px-3 py-1 bg-muted border border-border rounded-full text-xs text-foreground">{u}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════ 3. EVOLUTION OF THE INTERNET — WEB1 / WEB2 / WEB3 ═══════ */}
        <div id="s3-web3" className="h-full flex flex-col items-center p-8">
          <div className="max-w-5xl w-full flex-1 flex flex-col min-h-0">
            <h2 className="text-3xl font-bold text-foreground mb-1 text-center shrink-0">The Evolution of the Internet</h2>
            <p className="text-sm text-muted-foreground text-center mb-4 shrink-0">
              Each era defined by what users could do — and who owned the data.
            </p>

            <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">

              {/* Web1 */}
              <div className="p-6 bg-card rounded-2xl border-2 border-[#9ca3af]/40 flex flex-col gap-3 h-full overflow-y-auto">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#9ca3af]/20 border border-[#9ca3af]/40 flex items-center justify-center text-lg">🌐</div>
                  <div>
                    <div className="font-black text-foreground text-lg">Web 1.0</div>
                    <div className="text-xs text-muted-foreground">1991 – 2004</div>
                  </div>
                </div>
                <div className="flex items-center justify-around gap-2 py-2 px-3 bg-[#9ca3af]/10 rounded-xl">
                  <img src={amazonLogo} alt="Amazon" className="h-7 object-contain" />
                  <img src={msnLogo} alt="MSN" className="h-7 object-contain" />
                  <img src={netscapeLogo} alt="Netscape" className="h-7 object-contain" />
                </div>
                <div className="px-3 py-1.5 bg-[#9ca3af]/20 rounded-full text-center text-xs font-bold text-muted-foreground tracking-widest">📖 READ ONLY</div>
                <ul className="space-y-1.5 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>Static HTML pages</li>
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>No user interaction or accounts</li>
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>Information flows one-way</li>
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>Content owned by publishers only</li>
                  <li className="flex gap-2"><span className="text-[#9ca3af] shrink-0">•</span>Yahoo, GeoCities, early forums</li>
                </ul>
                <div className="mt-auto p-3 bg-muted rounded-lg text-xs text-muted-foreground italic">
                  "The internet was a library. You could only look."
                </div>
              </div>

              {/* Web2 */}
              <div className="p-6 bg-card rounded-2xl border-2 border-[#6366f1]/50 flex flex-col gap-3 h-full overflow-y-auto">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#6366f1]/20 border border-[#6366f1]/40 flex items-center justify-center text-lg">📱</div>
                  <div>
                    <div className="font-black text-foreground text-lg">Web 2.0</div>
                    <div className="text-xs text-muted-foreground">2004 – Present</div>
                  </div>
                </div>
                <div className="flex items-center justify-around gap-2 py-2 px-3 bg-[#6366f1]/10 rounded-xl">
                  <img src={tiktokLogo} alt="TikTok" className="h-7 object-contain" />
                  <img src={youtubeLogo} alt="YouTube" className="h-7 object-contain" />
                  <img src={xLogo} alt="X" className="h-7 object-contain rounded" />
                </div>
                <div className="px-3 py-1.5 bg-[#6366f1]/20 rounded-full text-center text-xs font-bold text-[#6366f1] tracking-widest">✏️ READ + WRITE</div>
                <ul className="space-y-1.5 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Social media & user-generated content</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Platforms own and monetize your data</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Free services — you are the product</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Centralized cloud infrastructure</li>
                  <li className="flex gap-2"><span className="text-[#6366f1] shrink-0">•</span>Google, Facebook, YouTube, Amazon</li>
                </ul>
                <div className="mt-auto p-3 bg-muted rounded-lg text-xs text-muted-foreground italic">
                  "The internet became interactive. But platforms kept the keys."
                </div>
              </div>

              {/* Web3 */}
              <div className="p-6 bg-card rounded-2xl border-2 border-[#39B54A]/60 flex flex-col gap-3 shadow-[0_0_20px_rgba(57,181,74,0.1)] h-full overflow-y-auto">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#39B54A]/20 border border-[#39B54A]/50 flex items-center justify-center text-lg">🔐</div>
                  <div>
                    <div className="font-black text-foreground text-lg">Web 3.0</div>
                    <div className="text-xs text-[#39B54A]">Now → Future</div>
                  </div>
                </div>
                <div className="flex items-center justify-around gap-2 py-2 px-3 bg-[#39B54A]/10 rounded-xl">
                  <img src={bitcoinLogo} alt="Bitcoin" className="h-7 object-contain" />
                  <img src={uniswapLogo} alt="Uniswap" className="h-7 object-contain" />
                  <img src={usdcLogo} alt="USDC" className="h-7 object-contain" />
                </div>
                <div className="px-3 py-1.5 bg-[#39B54A]/20 rounded-full text-center text-xs font-bold text-[#39B54A] tracking-widest">🔑 READ + WRITE + OWN</div>
                <ul className="space-y-1.5 text-sm text-muted-foreground flex-1">
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>User-owned data & assets via wallets</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Decentralized applications (dApps)</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Token-based economies & governance</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Self-sovereign identity</li>
                  <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Ethereum, Solana, IPFS, DAOs</li>
                </ul>
                <div className="mt-auto p-3 bg-[#39B54A]/10 rounded-lg border border-[#39B54A]/20 text-xs text-muted-foreground italic">
                  "The internet becomes owned by its users. No platform can take it away."
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════ 4. TODAY'S APP vs DAPP ═══════ */}
        <div id="s3-dapp" className="h-full">
          <ComparisonSlide
            title="Today's App vs dApp"
            option1Label="Traditional App"
            option2Label="Decentralized App (dApp)"
            items={[
              {
                feature: "Architecture",
                option1: "Centralized servers controlled by a company",
                option2: "Smart contracts on a blockchain + decentralized storage"
              },
              {
                feature: "Data Ownership",
                option1: "Company owns and controls user data",
                option2: "Users own their data and assets"
              },
              {
                feature: "Downtime",
                option1: "Server outage = entire service offline",
                option2: "No single point of failure — runs as long as the network exists"
              },
              {
                feature: "Censorship",
                option1: "Company can ban users, remove content, change terms",
                option2: "No entity can censor transactions once on-chain"
              },
              {
                feature: "Revenue Model",
                option1: "Ads, subscriptions, data monetization",
                option2: "Token incentives, protocol fees, community governance"
              },
              {
                feature: "Example",
                option1: "Spotify — company controls catalog, pays artists pennies",
                option2: "Audius — artists upload directly, fans pay via $AUDIO tokens"
              }
            ]}
          />
        </div>

        {/* ═══════ 5. ETHICAL CONSIDERATIONS ═══════ */}
        <div id="s3-ethics" className="h-full flex flex-col p-5 lg:p-8">

          {/* Header */}
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Ethical Considerations</h2>
            <p className="text-sm text-muted-foreground">Blockchain is not inherently good or bad — its impact depends on how it is designed, governed, and used.</p>
          </div>

          {/* Top row — 4 compact ethical themes */}
          <div className="grid grid-cols-4 gap-3 shrink-0 mb-3">
            <div className="p-5 bg-gradient-to-br from-[#ED1C24]/15 to-transparent rounded-xl border border-[#ED1C24]/30">
              <div className="font-bold text-[#ED1C24] text-sm mb-2">⚡ Energy</div>
              <p className="text-sm text-muted-foreground">Bitcoin PoW uses as much power as some countries. Ethereum's PoS cut its footprint by 99.95%.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/15 to-transparent rounded-xl border border-[#8b5cf6]/30">
              <div className="font-bold text-[#8b5cf6] text-sm mb-2">👁️ Surveillance vs Privacy</div>
              <p className="text-sm text-muted-foreground">Public chains are transparent forever — accountability and privacy are in direct tension.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#f59e0b]/15 to-transparent rounded-xl border border-[#f59e0b]/30">
              <div className="font-bold text-[#f59e0b] text-sm mb-2">🔒 Irreversibility</div>
              <p className="text-sm text-muted-foreground">"Code is law" has limits. Transactions can't be reversed, even when real people are harmed.</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#39B54A]/15 to-transparent rounded-xl border border-[#39B54A]/30">
              <div className="font-bold text-[#39B54A] text-sm mb-2">🌍 Access & Inclusion</div>
              <p className="text-sm text-muted-foreground">1.4 billion unbanked adults could access financial services with just a smartphone and a wallet.</p>
            </div>
          </div>

          {/* Bottom row — Promise vs Peril with real projects */}
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-4">

            {/* Positive projects */}
            <div className="flex flex-col min-h-0">
              <div className="flex items-center gap-2 mb-2 shrink-0">
                <div className="size-5 rounded-full bg-[#39B54A] flex items-center justify-center text-white text-xs font-black">+</div>
                <h3 className="font-bold text-[#39B54A] text-sm tracking-wide">BLOCKCHAIN FOR GOOD</h3>
              </div>

              <div className="bg-card border border-[#39B54A]/40 rounded-xl p-4 flex flex-col flex-1 min-h-0 gap-0">

                <div className="flex-1 flex flex-col min-h-0 pb-3">
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <span className="text-xl shrink-0">🌍</span>
                    <div className="font-bold text-foreground text-sm">GiveDirectly — Transparent Humanitarian Aid</div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>NGO operating in Kenya and Uganda — sends cash <span className="text-foreground font-medium ml-1">directly</span> to people in extreme poverty via blockchain wallets</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Zero intermediaries — every transfer is <span className="text-foreground font-medium ml-1">traceable on-chain</span>; donors can verify their money arrived</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>In traditional aid, up to <span className="text-foreground font-medium mx-1">30%</span> is lost to administration, NGO salaries, and corruption — blockchain cuts this to near zero</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Recipients spend freely — no government or NGO can dictate what the money is used for</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Smart contracts automate disbursements — no bank account required, just a mobile wallet</li>
                  </ul>
                </div>

                <div className="flex-1 flex flex-col min-h-0 border-t border-border pt-3">
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <span className="text-xl shrink-0">🤝</span>
                    <div className="font-bold text-foreground text-sm">Proof of Humanity — Identity Without Institutions</div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Ethereum-based registry: prove you are a real human via a short video + vouching by existing members</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>No government, bank, or company controls the list — <span className="text-foreground font-medium ml-1">no one can delete you</span></li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Foundation for UBI experiments: verified humans receive a monthly <span className="text-foreground font-medium ml-1">UBI token</span> airdrop automatically</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Enables bot-free social networks and one-person-one-vote governance on-chain</li>
                    <li className="flex gap-2"><span className="text-[#39B54A] shrink-0">•</span>Used by Kleros (decentralised court) and other dApps as a sybil-resistance layer</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Negative / concerning projects */}
            <div className="flex flex-col min-h-0">
              <div className="flex items-center gap-2 mb-2 shrink-0">
                <div className="size-5 rounded-full bg-[#ED1C24] flex items-center justify-center text-white text-xs font-black">!</div>
                <h3 className="font-bold text-[#ED1C24] text-sm tracking-wide">BLOCKCHAIN AS CONTROL</h3>
              </div>

              <div className="bg-card border border-[#ED1C24]/40 rounded-xl p-4 flex flex-col flex-1 min-h-0 gap-0">

                <div className="flex-1 flex flex-col min-h-0 pb-3">
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <span className="text-xl shrink-0">🇨🇳</span>
                    <div className="font-bold text-foreground text-sm">Digital Yuan (e-CNY) — Programmable Money, Programmable Control</div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span><span className="text-foreground font-medium">Expiry dates</span> — government stimulus yuan must be spent within a deadline or it disappears</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span><span className="text-foreground font-medium">Geographic restrictions</span> — funds can be locked to specific regions or districts</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span><span className="text-foreground font-medium">Category bans</span> — purchases like alcohol, gambling, or political donations can be auto-blocked</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span><span className="text-foreground font-medium">Instant freezing</span> — any wallet disabled in seconds, no court order needed</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Full real-time surveillance — every transaction visible to the state by design</li>
                  </ul>
                </div>

                <div className="flex-1 flex flex-col min-h-0 border-t border-border pt-3">
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <span className="text-xl shrink-0">🇪🇺</span>
                    <div className="font-bold text-foreground text-sm">Digital Euro — Coming Soon, Questions Remain</div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>ECB plans to launch a CBDC — marketed as a convenient, modern form of cash</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Proposed <span className="text-foreground font-medium ml-1">€3,000 holding cap</span> prevents using it as savings — steering behaviour by design</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Unlike physical cash — <span className="text-foreground font-medium ml-1">anonymous and unconditional</span> — every CBDC transaction is permanently logged</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Infrastructure built for "features" today can silently add restrictions tomorrow</li>
                    <li className="flex gap-2"><span className="text-[#ED1C24] shrink-0">•</span>Civil society groups and MEPs have raised formal concerns about financial sovereignty</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ═══════ 6. FUTURE TRENDS ═══════ */}
        <div id="s3-future" className="h-full">
          <ConceptSlide
            title="Future Trends"
            description="The next decade of blockchain will be shaped by convergence with other technologies and solutions to current limitations."
            visual={
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-[#ED1C24]/20 to-transparent rounded-xl border border-[#ED1C24]/30">
                  <h4 className="font-bold text-[#ED1C24] mb-2">🤖 AI + Blockchain</h4>
                  <p className="text-sm text-muted-foreground">Verifiable AI outputs, decentralized training data, provenance tracking for AI-generated content. Blockchain can prove what is real.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-xl border border-[#6366f1]/30">
                  <h4 className="font-bold text-[#6366f1] mb-2">🔮 Zero-Knowledge Proofs</h4>
                  <p className="text-sm text-muted-foreground">Prove something is true without revealing the underlying data. Enables privacy-preserving identity, voting, and transactions at scale.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#39B54A]/20 to-transparent rounded-xl border border-[#39B54A]/30">
                  <h4 className="font-bold text-[#39B54A] mb-2">🔗 Layer 0 & Interoperability</h4>
                  <p className="text-sm text-muted-foreground">Protocols like Polkadot and Cosmos connect different blockchains. The future is a network of networks, not one chain to rule them all.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-xl border border-[#f59e0b]/30">
                  <h4 className="font-bold text-[#f59e0b] mb-2">🪪 Decentralized Identity (DID)</h4>
                  <p className="text-sm text-muted-foreground">Self-sovereign identity lets you prove credentials without sharing personal data. One identity across all services, owned by you.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent rounded-xl border border-[#8b5cf6]/30">
                  <h4 className="font-bold text-[#8b5cf6] mb-2">🧾 Account Abstraction</h4>
                  <p className="text-sm text-muted-foreground">Makes crypto wallets work like normal accounts: social recovery, gas sponsoring, session keys. The UX revolution blockchain needs.</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-[#22d3ee]/20 to-transparent rounded-xl border border-[#22d3ee]/30">
                  <h4 className="font-bold text-[#22d3ee] mb-2">🏗️ Real-World Assets (RWAs)</h4>
                  <p className="text-sm text-muted-foreground">Tokenizing real estate, bonds, commodities on-chain. BlackRock, Franklin Templeton, and others are already doing this at scale.</p>
                </div>
              </div>
            }
            keyPoints={[
              "AI + blockchain solves the provenance and trust problem for digital content",
              "ZK proofs unlock privacy without sacrificing verifiability",
              "Interoperability protocols will connect isolated blockchain ecosystems",
              "Account abstraction will make crypto accessible to mainstream users"
            ]}
          />
        </div>

        {/* ═══════ DISCUSSION ═══════ */}
        <div id="s3-discussion" className="h-full">
          <DiscussionSlide
            prompt="What industry do you think could benefit most from blockchain technology in the next 10 years?"
            guidingQuestions={[
              "What problems exist in that industry that blockchain could solve?",
              "What are the potential challenges to adoption?",
              "How would blockchain improve transparency or efficiency?",
              "What stakeholders might resist this change and why?"
            ]}
          />
        </div>

        {/* ═══════ QUIZZES ═══════ */}
        <div id="s3-quiz" className="h-full">
          <QuizSlide
            question="What is the fundamental shift that Web3 represents compared to Web2?"
            options={[
              { text: "Faster internet speeds and better streaming quality", correct: false },
              { text: "Users own their data, identity, and digital assets instead of platforms", correct: true },
              { text: "Free access to all premium content and services", correct: false },
              { text: "Government control and regulation of all internet content", correct: false }
            ]}
            explanation="Web3 shifts ownership from platforms to users through decentralization and cryptographic keys. Instead of companies owning your data, you control your identity and assets via wallets and on-chain protocols."
          />
        </div>

        <div className="h-full">
          <QuizSlide
            question="What is a key advantage of a dApp over a traditional centralized application?"
            options={[
              { text: "dApps are always faster and cheaper to use", correct: false },
              { text: "dApps have no single point of failure — they run as long as the blockchain network exists", correct: true },
              { text: "dApps don't require an internet connection to function", correct: false },
              { text: "dApps are always free and generate no revenue", correct: false }
            ]}
            explanation="Because dApps run on decentralized blockchain networks via smart contracts, they have no central server that can fail or be shut down. As long as the underlying blockchain network operates, the dApp continues to function."
          />
        </div>

        <div className="h-full">
          <QuizSlide
            question="Which layer of the Web3 ecosystem contains protocols like Ethereum, Solana, and Polygon?"
            options={[
              { text: "The Interface layer (wallets and dApps)", correct: false },
              { text: "The Application layer (DeFi, NFTs, DAOs)", correct: false },
              { text: "The Blockchain Layer (L1 / L2)", correct: true },
              { text: "The Infrastructure layer (nodes and validators)", correct: false }
            ]}
            explanation="Ethereum, Solana, and Polygon are L1 blockchains or L2 scaling solutions. They sit between raw infrastructure (nodes, validators, P2P network) and the application protocols (DeFi, NFTs, DAOs) built on top of them."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s3-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 3 — Key Takeaways"
            takeaways={[
              "Blockchain use cases span 8+ industries: finance, healthcare, supply chain, voting, identity, real estate, sustainability, and digital art",
              "The Web3 ecosystem is a layered stack — from nodes and validators at the bottom to wallets, dApps, and users at the top",
              "Web3 = Read + Write + Own: the key shift is that users own their data and digital assets instead of platforms",
              "dApps replace centralized servers with smart contracts — removing single points of failure and platform control",
              "Ethical trade-offs are real: energy consumption, privacy vs transparency, irreversibility, and dual-use potential",
              "Future trends — ZK proofs, AI integration, DID, account abstraction — will define blockchain's next decade"
            ]}
          />
        </div>

        {/* ═══════ TEAM CHECKPOINT — DAY 1 WRAP ═══════ */}
        <div id="s3-team-checkpoint" className="h-full">
          <TeamCheckpoint
            contextLabel="Day 1 wrap · Course 01 → Course 02 / 03"
            title="Form your team"
            subtitle="The team project runs across all five courses. Find your teammates now — you'll start using the team in Day 2 and Day 3."
            duration="10–15 min"
            sections={[
              {
                label: 'Do now',
                color: '#39B54A',
                items: [
                  <>Form a team of <strong>3–4 members</strong>. Mix backgrounds where you can.</>,
                  <>Exchange contact details — WhatsApp / Telegram / email — so you can coordinate between sessions.</>,
                  <>Pick a working name for your team and a primary point of contact.</>,
                ],
              },
              {
                label: 'Discuss together',
                color: '#6366f1',
                items: [
                  <>Each member shares <strong>one industry</strong> you find interesting or work in.</>,
                  <>Note any business pain points you've personally experienced — paper-heavy processes, slow settlements, trust gaps, etc.</>,
                  <>Sketch a few candidate problems freely. You can refine — or completely change direction — as you learn more across Days 2 and 3.</>,
                ],
              },
              {
                label: 'Bring to Day 2',
                color: '#8b5cf6',
                items: [
                  <>Your team's contact list — everyone in one chat group.</>,
                  <>A short list (~3) of pain points worth exploring.</>,
                  <>Curiosity about which blockchain platforms could fit them.</>,
                ],
              },
            ]}
            footnote={
              <span className="text-muted-foreground">
                <strong className="text-foreground">What's next →</strong> Day 2 (Blockchain Platforms) will introduce platform trade-offs you'll need to choose between. Day 3 (Smart Contracts) is where your team's idea becomes a concrete design.
              </span>
            }
          />
        </div>

      </div>
      </div>
    </div>
  );
}
