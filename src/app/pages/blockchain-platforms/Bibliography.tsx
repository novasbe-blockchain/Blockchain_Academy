import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { SiteFooter } from '../../components/shared/SiteFooter';

interface Resource {
  title: string;
  url: string;
  description: string;
  tag: string;
  tagColor: string;
}

const resources: Resource[] = [
  // Must-Read
  {
    title: "Bitcoin Whitepaper — Satoshi Nakamoto",
    url: "https://bitcoin.org/bitcoin.pdf",
    description: "The original 9-page paper that started it all. Understanding Bitcoin's UTXO model, Proof of Work, and Nakamoto consensus is the foundation for evaluating every platform in this course.",
    tag: "Must-Read",
    tagColor: "#39B54A",
  },
  {
    title: "Ethereum Whitepaper — Vitalik Buterin",
    url: "https://ethereum.org/en/whitepaper/",
    description: "The 2014 proposal introducing smart contracts and the EVM. Ethereum's account model and gas mechanism underpin most platforms and L2s covered in this course.",
    tag: "Must-Read",
    tagColor: "#39B54A",
  },
  {
    title: "Cosmos Whitepaper — Jae Kwon & Ethan Buchman",
    url: "https://v1.cosmos.network/resources/whitepaper",
    description: "The 2016 paper introducing the Cosmos vision — a network of interoperable blockchains using Tendermint BFT consensus and the IBC cross-chain communication protocol.",
    tag: "Must-Read",
    tagColor: "#39B54A",
  },
  // Books
  {
    title: "Mastering Bitcoin — Andreas Antonopoulos (free online)",
    url: "https://github.com/bitcoinbook/bitcoinbook",
    description: "The definitive technical book on Bitcoin. Covers keys, transactions, UTXO, mining, and the network protocol in depth. Open source on GitHub.",
    tag: "Book",
    tagColor: "#8b5cf6",
  },
  {
    title: "Mastering Ethereum — Andreas Antonopoulos & Gavin Wood (free online)",
    url: "https://github.com/ethereumbook/ethereumbook",
    description: "The Ethereum equivalent. Covers smart contracts, the EVM, Solidity, DeFi building blocks, and consensus in depth. Essential companion to Section 02.",
    tag: "Book",
    tagColor: "#8b5cf6",
  },
  // Deep Dive — Per platform
  {
    title: "Hyperledger Fabric Documentation",
    url: "https://hyperledger-fabric.readthedocs.io/",
    description: "Official docs for Hyperledger Fabric — the leading enterprise permissioned blockchain. Covers channels, chaincode, MSP identity, and the endorsement policy model.",
    tag: "Deep Dive",
    tagColor: "#f59e0b",
  },
  {
    title: "IBC Protocol Specification",
    url: "https://github.com/cosmos/ibc",
    description: "The formal specification of the Inter-Blockchain Communication protocol. Understand how Cosmos chains transfer assets and data in a trust-minimized way without a central bridge.",
    tag: "Deep Dive",
    tagColor: "#f59e0b",
  },
  {
    title: "Cosmos SDK Documentation",
    url: "https://docs.cosmos.network/",
    description: "Documentation for the Cosmos SDK — the Go framework used to build application-specific blockchains. Covers modules, keepers, ABCI, and the architecture behind most Cosmos chains.",
    tag: "Deep Dive",
    tagColor: "#f59e0b",
  },
  {
    title: "Polkadot Wiki",
    url: "https://wiki.polkadot.network/",
    description: "Comprehensive reference for the Polkadot and Kusama ecosystems. Covers the relay chain, parachains, XCM cross-chain messaging, Coretime, and the upcoming JAM upgrade.",
    tag: "Deep Dive",
    tagColor: "#f59e0b",
  },
  {
    title: "Avalanche Platform Whitepaper",
    url: "https://arxiv.org/abs/1906.08936",
    description: "The 2020 Avalanche whitepaper introducing the Snowman consensus protocol — a probabilistic BFT mechanism achieving near-instant finality with thousands of validators.",
    tag: "Deep Dive",
    tagColor: "#f59e0b",
  },
  {
    title: "XRP Ledger Documentation",
    url: "https://xrpl.org/",
    description: "Official docs for the XRP Ledger, covering Federated Byzantine Agreement consensus, the native DEX, payment channels, and federated sidechain support.",
    tag: "Deep Dive",
    tagColor: "#f59e0b",
  },
  {
    title: "Starknet Documentation",
    url: "https://docs.starknet.io/",
    description: "Official Starknet docs covering the Cairo language, STARK proof system, account abstraction, and the sequencer architecture behind the largest ZK rollup by TVL.",
    tag: "Deep Dive",
    tagColor: "#f59e0b",
  },
  {
    title: "Ethereum Layer 2 — Rollup Fundamentals",
    url: "https://ethereum.org/en/layer-2/",
    description: "Ethereum Foundation's clear explainer of optimistic vs. ZK rollups, sequencers, data availability layers, and withdrawal mechanics. The conceptual base for Section 05.",
    tag: "Deep Dive",
    tagColor: "#f59e0b",
  },
  {
    title: "Ethereum Developer Docs — Consensus",
    url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/",
    description: "Official Ethereum docs on Proof of Stake, Casper FFG finality, and the validator lifecycle post-Merge. Essential for understanding Ethereum's architecture in Section 02.",
    tag: "Deep Dive",
    tagColor: "#f59e0b",
  },
  // Tools
  {
    title: "L2Beat — Layer 2 Risk & Analytics",
    url: "https://l2beat.com/",
    description: "Comprehensive tracking of every Ethereum Layer 2 — TVL, security stage ratings, withdrawal mechanisms, and technical maturity. Essential for evaluating the L2 landscape in Section 05.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
  {
    title: "DeFi Llama — Cross-chain Analytics",
    url: "https://defillama.com/",
    description: "The most comprehensive DeFi analytics platform. Compare TVL, stablecoin supply, and protocol revenue across 200+ blockchains — great for the decision framework in Section 05.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
  {
    title: "Mempool.space — Bitcoin Explorer",
    url: "https://mempool.space/",
    description: "Beautiful real-time visualization of Bitcoin's mempool, blocks, and transactions. See the UTXO model and fee market dynamics from Section 01 live.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
  {
    title: "Mintscan — Cosmos Ecosystem Explorer",
    url: "https://www.mintscan.io/",
    description: "The leading block explorer for Cosmos chains. See validator sets, IBC transfer flows, governance proposals, and staking activity across the Cosmos Hub and connected chains.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
  {
    title: "Subscan — Polkadot Explorer",
    url: "https://polkadot.subscan.io/",
    description: "Block explorer for the Polkadot relay chain and all parachains. Explore extrinsics, XCM cross-chain transfers, parachain slot auctions, and validator elections.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
  {
    title: "Etherscan — Ethereum Explorer",
    url: "https://etherscan.io/",
    description: "Explore Ethereum transactions, smart contracts, token flows, and DeFi protocols in real time. The primary tool for verifying on-chain data discussed in Section 02.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
  {
    title: "Li.Fi — Bridge Aggregator",
    url: "https://li.fi/",
    description: "Multi-chain bridge and DEX aggregator. A practical tool to understand how cross-chain bridging actually works — it surfaces the routes, slippage, and trust assumptions of each bridge.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
  // Videos
  {
    title: "Finematics — Layer 2 Explained",
    url: "https://www.youtube.com/watch?v=7pWxCklcNsU",
    description: "Clear animated explanation of optimistic rollups, ZK rollups, data availability, and their trade-offs. The best visual companion to the Layer 2 and Starknet content in Section 05.",
    tag: "Video",
    tagColor: "#6366f1",
  },
  {
    title: "Whiteboard Crypto — Platform Explainers",
    url: "https://www.youtube.com/@WhiteboardCrypto",
    description: "Short animated explainers on Cosmos, Polkadot, Avalanche, and XRP. Watch the platform-specific episodes alongside each section for quick visual summaries.",
    tag: "Video",
    tagColor: "#6366f1",
  },
  {
    title: "Bankless — Platform Deep Dives",
    url: "https://www.bankless.com/",
    description: "Long-form podcast interviews with founders and core contributors of major blockchain platforms. Invaluable context on the design decisions behind Ethereum, Cosmos, and L2s.",
    tag: "Video",
    tagColor: "#6366f1",
  },
  // Research
  {
    title: "Electric Capital Developer Report",
    url: "https://www.developerreport.com/",
    description: "Annual data-driven report on blockchain developer activity across all ecosystems. The go-to source for understanding which platforms are actually being built on — essential for the decision framework.",
    tag: "Research",
    tagColor: "#f59e0b",
  },
  {
    title: "Messari Research",
    url: "https://messari.io/research",
    description: "In-depth quarterly reports on individual protocols and ecosystems. Strong coverage of Cosmos, Polkadot, Avalanche, and Ethereum L2s — useful for up-to-date platform metrics.",
    tag: "Research",
    tagColor: "#f59e0b",
  },
  {
    title: "The Block Research",
    url: "https://www.theblock.co/research",
    description: "Data-driven research on blockchain networks, DeFi protocols, and market structure. Strong institutional and technical coverage of the platforms discussed in this course.",
    tag: "Research",
    tagColor: "#f59e0b",
  },
  // Security
  {
    title: "Rekt.news — Bridge & Protocol Hack Postmortems",
    url: "https://rekt.news/",
    description: "Post-mortems on major bridge hacks — Ronin ($625M), Nomad ($190M), Wormhole ($320M). Understand exactly why bridge security is the critical risk discussed in Section 04.",
    tag: "Security",
    tagColor: "#ED1C24",
  },
  // News
  {
    title: "Week in Ethereum News",
    url: "https://weekinethereumnews.com/",
    description: "Weekly digest of everything happening in the Ethereum ecosystem — protocol upgrades, L2 releases, security disclosures, and tooling news. Essential for staying current with Section 02 topics.",
    tag: "News",
    tagColor: "#f59e0b",
  },
  {
    title: "The Defiant",
    url: "https://thedefiant.io/",
    description: "Daily DeFi and multi-chain ecosystem news with in-depth reporting on protocols, regulation, and cross-chain trends across all platforms covered in this course.",
    tag: "News",
    tagColor: "#f59e0b",
  },
  {
    title: "Hyperledger Foundation",
    url: "https://www.hyperledger.org/",
    description: "The Linux Foundation's hub for enterprise blockchain projects — Fabric, Besu, Firefly, and more. Good starting point for exploring the enterprise ecosystem beyond Fabric.",
    tag: "News",
    tagColor: "#f59e0b",
  },
];

const ALL_TAGS = ['All', ...Array.from(new Set(resources.map(r => r.tag)))];

const TAG_COLORS: Record<string, string> = Object.fromEntries(
  resources.map(r => [r.tag, r.tagColor])
);

export function BP_Bibliography() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filtered = activeFilter === 'All'
    ? resources
    : resources.filter(r => r.tag === activeFilter);

  return (
    <div id="section-scroll" className="size-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#39B54A]/10 border border-[#39B54A]/30 mb-4">
            <span className="text-[#39B54A] font-bold">📖 Bibliography</span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Resources to Keep Learning
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of whitepapers, documentation, tools, and research
            to deepen your understanding of blockchain platforms, interoperability, and Layer 2 scaling.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {ALL_TAGS.map(tag => {
            const isActive = activeFilter === tag;
            const color = tag === 'All' ? '#39B54A' : TAG_COLORS[tag];
            return (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
                style={
                  isActive
                    ? { backgroundColor: color, color: '#fff', borderColor: color }
                    : { backgroundColor: color + '15', color: color, borderColor: color + '40' }
                }
              >
                {tag}
                {tag !== 'All' && (
                  <span className="ml-1.5 opacity-70 font-normal text-xs">
                    {resources.filter(r => r.tag === tag).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Resource list */}
        <div className="space-y-4">
          {filtered.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-[#39B54A]/50 hover:shadow-lg transition-all group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold text-foreground group-hover:text-[#39B54A] transition-colors">
                    {r.title}
                  </h3>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: r.tagColor + '20', color: r.tagColor }}
                  >
                    {r.tag}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{r.description}</p>
              </div>
              <ExternalLink className="size-5 text-muted-foreground group-hover:text-[#39B54A] flex-shrink-0 mt-1 transition-colors" />
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            "The blockchain trilemma is not a law of nature — it is an engineering challenge." — Vitalik Buterin
          </p>
        </div>
      </div>
      <SiteFooter className="snap-start" />
    </div>
  );
}
