import { useState } from 'react';
import { motion } from 'motion/react';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { TakeawaySlide } from '../../components/templates/TakeawaySlide';
import { SectionNav } from '../../components/navigation/SectionNav';
import { ComparisonSlide } from '../../components/templates/ComparisonSlide';
import { ConceptSlide } from '../../components/templates/ConceptSlide';
import { QuizSlide } from '../../components/templates/QuizSlide';
import { Building2 } from 'lucide-react';

const chapters = [
  { id: 's3-why', label: 'Why Permissioned?' },
  { id: 's3-supplychains', label: 'Supply Chains' },
  { id: 's3-overview', label: 'Fabric Overview' },
  { id: 's3-fabricx', label: 'Fabric Deep Dive' },
  { id: 's3-consensus-evo', label: 'Consensus Evolution' },
  { id: 's3-consensus', label: 'Pluggable Consensus' },
  { id: 's3-raft', label: 'Raft Mechanics' },
  { id: 's3-bft', label: 'BFT' },
  { id: 's3-channels', label: 'Channels' },
  { id: 's3-txflow', label: 'Transaction Flow' },
  { id: 's3-exercise-supply', label: 'Exercise: Supply Chain' },
  { id: 's3-exercise-health', label: 'Exercise: Health Data' },
  { id: 's3-production', label: 'In Production' },
  { id: 's3-comparison', label: 'ETH vs Fabric' },
  { id: 's3-quiz', label: 'Quiz' },
  { id: 's3-takeaways', label: 'Takeaways' },
];

// ─── s3-why ───────────────────────────────────────────────────────────────────

function WhyPermissionedSlide() {
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-5">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Why Permissioned Blockchains?</h2>
        <p className="text-sm text-muted-foreground mt-1">Public chains fall short for enterprise — here is why permissioned networks exist.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — problems */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-foreground shrink-0">When public chains fall short</h3>
          {[
            {
              emoji: '🔒',
              label: 'Privacy',
              desc: 'Transaction data is visible to all competitors on public networks',
              color: '#ED1C24',
            },
            {
              emoji: '📋',
              label: 'Compliance',
              desc: 'GDPR, HIPAA, KYC/AML regulations require controlled data access',
              color: '#f59e0b',
            },
            {
              emoji: '⚡',
              label: 'Performance',
              desc: '7–15 TPS on public chains cannot handle enterprise transaction volumes',
              color: '#f59e0b',
            },
            {
              emoji: '🪪',
              label: 'Identity',
              desc: 'Anonymous addresses are not legal entities — accountability is impossible',
              color: '#ED1C24',
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.35 }}
              className="flex items-start gap-3 p-3 rounded-xl border"
              style={{
                borderColor: item.color + '50',
                backgroundColor: item.color + '0d',
              }}
            >
              <span className="text-xl shrink-0">{item.emoji}</span>
              <div>
                <div className="font-bold text-sm text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right — solutions */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-foreground shrink-0">The enterprise case</h3>
          {[
            {
              label: 'Known participants',
              desc: 'All members are verified with legal accountability — no anonymity',
            },
            {
              label: 'Configurable privacy',
              desc: 'Channels isolate sensitive data so only relevant parties can see it',
            },
            {
              label: 'High throughput',
              desc: 'No mining required — 3,000+ TPS is achievable with Raft consensus',
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.35 }}
              className="flex items-start gap-3 p-3 rounded-xl border border-[#39B54A]/40 bg-[#39B54A]/08"
              style={{ backgroundColor: '#39B54A0d' }}
            >
              <div className="size-5 rounded-full bg-[#39B54A] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="size-3 text-white" fill="none" viewBox="0 0 12 12">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-sm text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            </motion.div>
          ))}

          {/* Real-world adopters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-auto p-3 rounded-xl border border-border bg-card"
          >
            <div className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">Real-world adopters</div>
            <div className="flex flex-wrap gap-2">
              {['Walmart', 'Maersk', 'HSBC', 'IBM Food Trust', 'TradeLens'].map(name => (
                <span
                  key={name}
                  className="px-2 py-0.5 rounded-full text-xs font-medium border border-[#39B54A]/40 text-[#39B54A]"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── s3-supplychains ──────────────────────────────────────────────────────────

const SUPPLY_STEPS = [
  {
    label: 'Farmer',
    icon: '🌾',
    pre:  { tool: 'Paper logbook + fax',     issue: 'No timestamps · easy to forge · lost in transit' },
    post: { fn: 'recordHarvest',  args: 'batch=B1, gps=37.4°N, date=2026-04-01' },
  },
  {
    label: 'Processor',
    icon: '🏭',
    pre:  { tool: 'Excel + email attachments', issue: 'Re-keyed data · dropped fields · version drift' },
    post: { fn: 'recordProcess',  args: 'batch=B1 → lotId=L42, temp=4°C' },
  },
  {
    label: 'Distributor',
    icon: '🚛',
    pre:  { tool: 'ERP system (SAP)',         issue: 'Internal codes don’t match upstream IDs' },
    post: { fn: 'recordTransport', args: 'lot=L42, route=Farm→Hub→Store, temp log' },
  },
  {
    label: 'Retailer',
    icon: '🏪',
    pre:  { tool: 'POS — SKU only',           issue: 'No provenance · no upstream queries' },
    post: { fn: 'recordReceipt',  args: 'lot=L42 ↔ sku=A123, store=NYC-12' },
  },
  {
    label: 'Consumer',
    icon: '👤',
    pre:  { tool: 'Paper receipt',            issue: 'No origin info · must trust labels' },
    post: { fn: 'queryProvenance', args: 'sku=A123 → full audit trail (2.2s)' },
  },
];

const SUPPLY_DEPLOYMENTS = [
  { label: 'Walmart × IBM Food Trust', detail: 'Live since 2018 — pork, leafy greens, mangoes · 100+ suppliers' },
  { label: 'De Beers Tracr',           detail: 'Diamond provenance · conflict-free certification' },
  { label: 'Maersk TradeLens',         detail: '⚠ Shut down 2022 — network-effect lesson, not tech failure' },
];

const SUPPLY_RESULTS = [
  { metric: '7 days → 2.2 s', label: 'mango recall (Walmart)' },
  { metric: '100%',           label: 'traceability across partners' },
  { metric: '~$30B',          label: 'food fraud prevented / yr' },
];

function SupplyChainsSlide() {
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-3">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Supply Chains: The Perfect Use Case</h2>
        <p className="text-sm text-muted-foreground mt-1">Multi-party data sharing with no single point of trust — exactly what blockchain solves.</p>
      </div>

      {/* Real-world deployments strip */}
      <div className="shrink-0 mb-4 grid grid-cols-1 lg:grid-cols-3 gap-2">
        {SUPPLY_DEPLOYMENTS.map(d => (
          <div key={d.label} className="px-3 py-1.5 rounded-lg border border-border bg-card">
            <div className="text-[11px] font-bold text-foreground leading-tight">{d.label}</div>
            <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{d.detail}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Left — siloed today */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="shrink-0 flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#ED1C2418', color: '#ED1C24', border: '1px solid #ED1C2450' }}
            >
              ✕ Today — siloed
            </span>
            <span className="text-xs text-muted-foreground">Each party hoards data in its own system</span>
          </div>
          <div className="flex-1 min-h-0 grid auto-rows-fr gap-1.5">
            {SUPPLY_STEPS.map((step) => (
              <div
                key={step.label}
                className="rounded-xl border p-2.5 flex items-start gap-2.5 min-h-0"
                style={{ borderColor: '#ED1C2430', backgroundColor: '#ED1C2408' }}
              >
                <span className="text-base shrink-0 leading-none mt-0.5">{step.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <span className="font-bold text-sm text-foreground">{step.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground truncate">{step.pre.tool}</span>
                  </div>
                  <div className="text-[11px] leading-snug mt-0.5" style={{ color: '#ED1C24' }}>{step.pre.issue}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 rounded-lg p-2.5 text-[11px] leading-snug" style={{ backgroundColor: '#ED1C2412', border: '1px solid #ED1C2440' }}>
            <span className="font-bold" style={{ color: '#ED1C24' }}>Walmart 2008 case — </span>
            <span className="text-muted-foreground">tracing one contaminated mango required phoning 7 different systems and took ~7 days. Most of that was reconciling formats, not searching.</span>
          </div>
        </div>

        {/* Right — Fabric channel */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="shrink-0 flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#39B54A18', color: '#39B54A', border: '1px solid #39B54A50' }}
            >
              ✓ On a Fabric channel
            </span>
            <span className="text-xs text-muted-foreground">Every step writes to one shared, append-only ledger</span>
          </div>
          <div className="flex-1 min-h-0 grid auto-rows-fr gap-1.5">
            {SUPPLY_STEPS.map((step) => (
              <div
                key={step.label}
                className="rounded-xl border p-2.5 flex items-start gap-2.5 min-h-0"
                style={{ borderColor: '#39B54A40', backgroundColor: '#39B54A08' }}
              >
                <span className="text-base shrink-0 leading-none mt-0.5">{step.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <span className="font-bold text-sm text-foreground">{step.label}</span>
                    <span className="text-[10px] font-medium" style={{ color: '#39B54A' }}>→ chaincode invoke</span>
                  </div>
                  <div className="text-[11px] font-mono leading-snug mt-0.5 truncate">
                    <span style={{ color: '#39B54A' }}>{step.post.fn}</span>
                    <span className="text-muted-foreground">(</span>
                    <span className="text-foreground">{step.post.args}</span>
                    <span className="text-muted-foreground">)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="shrink-0 grid grid-cols-3 gap-2">
            {SUPPLY_RESULTS.map(r => (
              <div key={r.label} className="p-2 rounded-lg border text-center" style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0d' }}>
                <div className="font-black text-xs leading-tight" style={{ color: '#39B54A' }}>{r.metric}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── s3-overview ─────────────────────────────────────────────────────────────

const fabricOverviewCards = [
  {
    emoji: '🏛️',
    title: 'Linux Foundation',
    desc: 'Open source, governed by a consortium: IBM, Intel, SAP and many more.',
  },
  {
    emoji: '🔧',
    title: 'Modular Architecture',
    desc: 'Swap consensus, membership services, and storage independently.',
  },
  {
    emoji: '🔐',
    title: 'Identity-First',
    desc: 'Every participant holds a verified certificate issued by an MSP/CA.',
  },
  {
    emoji: '⚡',
    title: 'High Performance',
    desc: 'Execute-order-validate enables parallel execution — 3,000+ TPS.',
  },
];

const fabricOverviewVisual = (
  <div className="grid grid-cols-2 gap-3 w-full">
    {fabricOverviewCards.map(card => (
      <div
        key={card.title}
        className="p-3 rounded-xl border border-[#39B54A]/40 flex flex-col gap-1"
        style={{ backgroundColor: '#39B54A0d' }}
      >
        <span className="text-xl">{card.emoji}</span>
        <div className="font-bold text-sm text-foreground">{card.title}</div>
        <div className="text-xs text-muted-foreground">{card.desc}</div>
      </div>
    ))}
  </div>
);

// ─── s3-fabricx ──────────────────────────────────────────────────────────────

const FABRIC_COMPONENTS = [
  {
    emoji: '👥',
    label: 'Organizations',
    desc: 'Member companies — each with their own peers and MSP.',
    color: '#6366f1',
  },
  {
    emoji: '🖥️',
    label: 'Peer Nodes',
    desc: 'Hold ledger copies, execute chaincode, and endorse transactions.',
    color: '#39B54A',
  },
  {
    emoji: '📮',
    label: 'Orderer',
    desc: 'Creates block order via Raft/BFT — the consensus service.',
    color: '#f59e0b',
  },
  {
    emoji: '🔑',
    label: 'MSP / CA',
    desc: 'Certificate Authority — issues identities, proves who you are.',
    color: '#ED1C24',
  },
  {
    emoji: '📁',
    label: 'Ledger',
    desc: 'World State DB + blockchain log — the persistent record.',
    color: '#22d3ee',
  },
];

function FabricDeepDiveSlide() {
  const ORGS = [
    { name: 'Producer',    color: '#6366f1' },
    { name: 'Distributor', color: '#39B54A' },
    { name: 'Retailer',    color: '#ED1C24' },
  ];

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-3">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Fabric Architecture Deep Dive</h2>
        <p className="text-sm text-muted-foreground mt-1">The five components and how they connect inside a single channel.</p>
      </div>

      {/* Definition strip */}
      <div className="shrink-0 mb-4 rounded-xl border p-3" style={{ borderColor: '#39B54A55', backgroundColor: '#39B54A0d' }}>
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#39B54A' }}>In one line</p>
        <p className="text-sm text-foreground mt-0.5 leading-snug">
          A Fabric network = several <span className="font-semibold">organizations</span>, each running their own <span className="font-semibold">peers</span> and <span className="font-semibold">MSP/CA</span>, sharing one or more <span className="font-semibold">channels</span> whose transactions are sequenced by an external <span className="font-semibold">ordering service</span>.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left — components list */}
        <div className="flex flex-col gap-2 min-h-0">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">Key components</h3>
          <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
            {FABRIC_COMPONENTS.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex items-center gap-3 p-2.5 rounded-xl border min-h-0"
                style={{ borderColor: c.color + '50', backgroundColor: c.color + '0d' }}
              >
                <span className="text-2xl shrink-0 leading-none">{c.emoji}</span>
                <div className="min-w-0">
                  <div className="font-bold text-sm leading-tight" style={{ color: c.color }}>{c.label}</div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — network diagram (channel scope) */}
        <div className="flex flex-col gap-2 min-h-0">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">Network diagram — one channel</h3>

          {/* Channel scope */}
          <div
            className="flex-1 min-h-0 relative rounded-2xl border-2 border-dashed p-3 lg:p-4 flex flex-col gap-3"
            style={{ borderColor: '#6366f155', backgroundColor: '#6366f108' }}
          >
            <span
              className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest"
              style={{ backgroundColor: 'hsl(var(--background))', color: '#6366f1', border: '1px solid #6366f180' }}
            >
              📡 Channel · supply-chain
            </span>

            {/* Orderer (Raft cluster) */}
            <div className="flex justify-center shrink-0">
              <div
                className="rounded-xl border-2 px-3 py-2 flex items-center gap-2.5"
                style={{ borderColor: '#f59e0b', backgroundColor: '#f59e0b15' }}
              >
                <span className="text-base leading-none">📮</span>
                <div>
                  <div className="text-xs font-black leading-tight" style={{ color: '#f59e0b' }}>Ordering Service</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">Raft · 3-node cluster · sequences blocks</div>
                </div>
                <div className="flex gap-1 ml-1">
                  {[1, 2, 3].map(n => (
                    <span key={n} className="size-1.5 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Bidirectional flow indicator */}
            <div className="shrink-0 flex justify-center items-center gap-2 text-[10px] font-medium" style={{ color: '#f59e0b' }}>
              <span>↑ proposals</span>
              <span className="opacity-40">·</span>
              <span>↓ ordered blocks</span>
            </div>

            {/* 3 Orgs */}
            <div className="flex-1 min-h-0 grid grid-cols-3 gap-2">
              {ORGS.map(org => (
                <div
                  key={org.name}
                  className="flex flex-col gap-1.5 rounded-lg border p-2"
                  style={{ borderColor: org.color + '70', backgroundColor: org.color + '10' }}
                >
                  <div
                    className="text-[10px] font-black uppercase tracking-wider text-center"
                    style={{ color: org.color }}
                  >
                    🏢 {org.name}
                  </div>

                  {[1, 2].map(p => (
                    <div
                      key={p}
                      className="rounded-md border bg-card px-1.5 py-1 flex items-center justify-between gap-1"
                      style={{ borderColor: org.color + '50' }}
                    >
                      <span className="text-[10px] font-semibold text-foreground flex items-center gap-1">
                        <span>🖥</span>Peer {p}
                      </span>
                      <span className="text-[9px] opacity-70" title="Chaincode + Ledger replica">📜📁</span>
                    </div>
                  ))}

                  <div
                    className="rounded-md border border-dashed px-1.5 py-1 flex items-center justify-center gap-1 text-[10px] font-semibold"
                    style={{ borderColor: org.color + '60', color: org.color, backgroundColor: org.color + '08' }}
                  >
                    🔑 MSP / CA
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note inside channel */}
            <div className="shrink-0 text-[10px] text-muted-foreground text-center leading-snug">
              Every peer in the channel holds an <span className="font-semibold text-foreground">identical ledger copy</span> + <span className="font-semibold text-foreground">chaincode binary</span>. Each org's MSP issues its own identities; cross-org identities are validated via the channel's trust roots.
            </div>
          </div>

          {/* Chaincode note */}
          <div
            className="shrink-0 p-2.5 rounded-xl border flex items-start gap-2.5"
            style={{ borderColor: '#39B54A50', backgroundColor: '#39B54A0d' }}
          >
            <span className="text-base leading-none mt-0.5">📜</span>
            <div className="min-w-0">
              <div className="font-bold text-xs" style={{ color: '#39B54A' }}>Chaincode (Smart Contracts)</div>
              <div className="text-[11px] text-muted-foreground leading-snug">
                Go / JavaScript / Java programs deployed to peers. Executed during endorsement; their read/write set is signed and forwarded to the orderer for sequencing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── s3-consensus ─────────────────────────────────────────────────────────────

const CONSENSUS_TABLE = [
  { prop: 'Fault type tolerated', raft: 'Crashes', bft: 'Byzantine (malicious)' },
  { prop: 'Minimum nodes', raft: '3', bft: '4' },
  { prop: 'Performance', raft: 'High', bft: 'Medium' },
  { prop: 'Trust assumption', raft: 'No malicious nodes', bft: 'Up to 1/3 malicious' },
  { prop: 'Use case', raft: 'Consortium (known parties)', bft: 'High-security enterprise' },
];

function PluggableConsensusSlide() {
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-5">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Pluggable Consensus</h2>
        <p className="text-sm text-muted-foreground mt-1">Different enterprise environments need different trust models — Fabric adapts.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — why pluggable */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Why pluggable?</h3>
          <p className="text-sm text-muted-foreground">
            A bank consortium with fully trusted members has very different needs from a supply chain with competing companies. Fabric's pluggable orderer means you pick the right tool.
          </p>
          {[
            {
              label: 'Raft',
              badge: 'Default · CFT',
              desc: 'Crash Fault Tolerant. Simple leader-follower model — ideal for trusted, known environments.',
              color: '#39B54A',
            },
            {
              label: 'SmartBFT',
              badge: 'Optional · BFT',
              desc: 'Byzantine Fault Tolerant. Handles malicious nodes — heavier but necessary in hostile networks.',
              color: '#f59e0b',
            },
            {
              label: 'Custom',
              badge: 'Pluggable',
              desc: 'An open interface allows future consensus algorithms to be plugged in without rebuilding.',
              color: '#6366f1',
            },
          ].map((opt, i) => (
            <motion.div
              key={opt.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="p-3 rounded-xl border"
              style={{ borderColor: opt.color + '40', backgroundColor: opt.color + '0d' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-foreground">{opt.label}</span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: opt.color + '20', color: opt.color }}
                >
                  {opt.badge}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{opt.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Right — comparison table */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Raft vs SmartBFT</h3>

          {/* Header */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-muted text-xs font-bold text-foreground">Property</div>
            <div className="p-2 rounded-lg text-xs font-bold text-white text-center" style={{ backgroundColor: '#39B54A' }}>Raft</div>
            <div className="p-2 rounded-lg text-xs font-bold text-white text-center" style={{ backgroundColor: '#f59e0b' }}>SmartBFT</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-1.5 flex-1">
            {CONSENSUS_TABLE.map((row, i) => (
              <motion.div
                key={row.prop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="grid grid-cols-3 gap-2 flex-1"
              >
                <div className="p-2 rounded-lg border border-border bg-card text-xs font-semibold text-foreground flex items-center">{row.prop}</div>
                <div className="p-2 rounded-lg border border-[#39B54A]/30 text-xs text-muted-foreground flex items-center justify-center text-center" style={{ backgroundColor: '#39B54A08' }}>{row.raft}</div>
                <div className="p-2 rounded-lg border border-[#f59e0b]/30 text-xs text-muted-foreground flex items-center justify-center text-center" style={{ backgroundColor: '#f59e0b08' }}>{row.bft}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── s3-bft ───────────────────────────────────────────────────────────────────

const BFT_TABLE = [
  { faulty: 1,  needed: 4,  hint: 'minimum to tolerate 1 traitor' },
  { faulty: 2,  needed: 7,  hint: 'most enterprise deployments' },
  { faulty: 10, needed: 31, hint: 'large public consortiums' },
];

function BFTThresholdDonut() {
  const r = 40;
  const c = 2 * Math.PI * r;        // ~251.3
  const honest = (2 / 3) * c;
  const byz    = (1 / 3) * c;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Background ring */}
      <circle cx={50} cy={50} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={14} />
      {/* Honest segment (2/3) */}
      <circle
        cx={50} cy={50} r={r}
        fill="none" stroke="#39B54A" strokeWidth={14}
        strokeDasharray={`${honest} ${c}`}
        transform="rotate(-90 50 50)"
        strokeLinecap="butt"
      />
      {/* Byzantine segment (1/3) */}
      <circle
        cx={50} cy={50} r={r}
        fill="none" stroke="#ED1C24" strokeWidth={14}
        strokeDasharray={`${byz} ${c}`}
        strokeDashoffset={-honest}
        transform="rotate(-90 50 50)"
        strokeLinecap="butt"
      />
      {/* Center text */}
      <text x={50} y={47} textAnchor="middle" fontSize={9} fontWeight="800" className="fill-foreground">≤ ⅓</text>
      <text x={50} y={58} textAnchor="middle" fontSize={5.5} className="fill-muted-foreground">malicious max</text>
    </svg>
  );
}

function EquivocationDiagram() {
  return (
    <svg viewBox="0 0 240 110" className="w-full h-28">
      <defs>
        <marker id="bft-arrow" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill="#ED1C24" />
        </marker>
      </defs>
      {/* Honest A (left) */}
      <circle cx={32} cy={55} r={16} fill="#39B54A30" stroke="#39B54A" strokeWidth={2} />
      <text x={32} y={59} textAnchor="middle" fontSize={11} fontWeight="800" fill="#39B54A">A</text>
      <text x={32} y={88} textAnchor="middle" fontSize={8} className="fill-muted-foreground">honest</text>
      {/* Byzantine center */}
      <circle cx={120} cy={55} r={20} fill="#ED1C2430" stroke="#ED1C24" strokeWidth={2.5} />
      <text x={120} y={60} textAnchor="middle" fontSize={14} fontWeight="800" fill="#ED1C24">✗</text>
      <text x={120} y={92} textAnchor="middle" fontSize={8} fontWeight="700" fill="#ED1C24">byzantine</text>
      {/* Honest C (right) */}
      <circle cx={208} cy={55} r={16} fill="#39B54A30" stroke="#39B54A" strokeWidth={2} />
      <text x={208} y={59} textAnchor="middle" fontSize={11} fontWeight="800" fill="#39B54A">C</text>
      <text x={208} y={88} textAnchor="middle" fontSize={8} className="fill-muted-foreground">honest</text>
      {/* Conflicting messages */}
      <line x1={102} y1={55} x2={50} y2={55} stroke="#ED1C24" strokeWidth={1.6} markerEnd="url(#bft-arrow)" />
      <line x1={138} y1={55} x2={190} y2={55} stroke="#ED1C24" strokeWidth={1.6} markerEnd="url(#bft-arrow)" />
      <text x={76} y={48} textAnchor="middle" fontSize={9} fontWeight="700" fill="#ED1C24">"X = $100"</text>
      <text x={164} y={48} textAnchor="middle" fontSize={9} fontWeight="700" fill="#ED1C24">"X = $50"</text>
    </svg>
  );
}

function BFTSlide() {
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-3">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Byzantine Fault Tolerance in Fabric</h2>
        <p className="text-sm text-muted-foreground mt-1">How distributed systems survive malicious — not just crashed — participants.</p>
      </div>

      {/* Definition strip */}
      <div className="shrink-0 mb-3 rounded-xl border p-3" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b0d' }}>
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f59e0b' }}>
          The Byzantine Generals Problem · Lamport, Shostak &amp; Pease, 1982
        </p>
        <p className="text-sm text-foreground mt-0.5 leading-snug">
          A system is <span className="font-semibold">Byzantine Fault Tolerant</span> if it stays correct even when up to <span className="font-semibold">F</span> nodes lie, collude, or send <span className="italic">different answers to different peers</span> — not just go silent.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Left — Theory: threshold + formula + table */}
        <div className="flex flex-col gap-2 min-h-0">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">The 1/3 threshold</p>

          {/* Donut + formula side by side */}
          <div className="shrink-0 grid grid-cols-[auto_1fr] gap-3 p-3 rounded-xl border border-border bg-card/50 items-center">
            <div className="size-24 lg:size-28 shrink-0">
              <BFTThresholdDonut />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">The formula</div>
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono leading-none mt-0.5">N ≥ 3F + 1</div>
              <div className="text-[11px] text-muted-foreground mt-1.5 leading-snug">
                <span className="text-[#39B54A] font-semibold">Honest ⅔</span> must out-vote <span className="text-[#ED1C24] font-semibold">malicious ⅓</span> twice — once to detect lying, once to converge. If <span className="font-semibold">F &gt; N/3</span>, BFT breaks.
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 min-h-0 grid auto-rows-fr gap-1.5">
            <div className="grid grid-cols-[auto_auto_1fr] gap-2 items-center px-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#ED1C24]">F malicious</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#39B54A]">N nodes needed</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">use case</div>
            </div>
            {BFT_TABLE.map(row => (
              <div key={row.faulty} className="grid grid-cols-[auto_auto_1fr] gap-2 items-center min-h-0">
                <div className="px-3 py-1.5 rounded-lg border text-base font-black text-center" style={{ borderColor: '#ED1C2440', color: '#ED1C24', backgroundColor: '#ED1C240d', minWidth: 64 }}>
                  {row.faulty}
                </div>
                <div className="px-3 py-1.5 rounded-lg border text-base font-black text-center" style={{ borderColor: '#39B54A40', color: '#39B54A', backgroundColor: '#39B54A0d', minWidth: 64 }}>
                  {row.needed}
                </div>
                <div className="text-[11px] text-muted-foreground italic">{row.hint}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Practice: what BFT prevents + enterprise scenarios */}
        <div className="flex flex-col gap-2 min-h-0">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">What does a Byzantine fault look like?</p>

          {/* Equivocation diagram */}
          <div className="shrink-0 rounded-xl border p-3" style={{ borderColor: '#ED1C2440', backgroundColor: '#ED1C2408' }}>
            <EquivocationDiagram />
            <p className="text-[11px] text-muted-foreground leading-snug text-center mt-1">
              <span className="font-semibold text-foreground">Equivocation</span> — one node sends conflicting facts to different peers. CFT (Raft) cannot detect this; BFT can.
            </p>
          </div>

          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider shrink-0 mt-1">Why it matters for enterprise</p>

          <div className="flex-1 min-h-0 grid auto-rows-fr gap-2">
            {[
              { emoji: '🏢', label: 'Competitor on the network',  desc: 'Two rivals sharing one ledger. BFT prevents either from feeding manipulated data into shared state.', color: '#ED1C24' },
              { emoji: '💻', label: 'Compromised peer',           desc: 'A hacked node sending different read/write sets to different validators is detected and outvoted.',     color: '#f59e0b' },
              { emoji: '📋', label: 'Regulatory mandate',         desc: 'Finance, defense, and cross-jurisdiction networks often require BFT guarantees by compliance.',         color: '#6366f1' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-2.5 p-2.5 rounded-xl border min-h-0"
                style={{ borderColor: item.color + '50', backgroundColor: item.color + '0d' }}
              >
                <span className="text-lg shrink-0 leading-none mt-0.5">{item.emoji}</span>
                <div className="min-w-0">
                  <div className="font-bold text-xs leading-tight" style={{ color: item.color }}>{item.label}</div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom comparison strip */}
      <div className="shrink-0 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="rounded-xl border p-2.5" style={{ borderColor: '#f59e0b55', backgroundColor: '#f59e0b0d' }}>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#f59e0b' }}>Raft (CFT) — default in Fabric</p>
          <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
            Tolerates <span className="text-foreground font-semibold">crashes only</span>. Trusts orderer operators not to lie. Lighter, faster, simpler — fits most consortiums.
          </p>
        </div>
        <div className="rounded-xl border p-2.5" style={{ borderColor: '#39B54A55', backgroundColor: '#39B54A0d' }}>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#39B54A' }}>SmartBFT — Fabric v3 opt-in</p>
          <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
            Tolerates <span className="text-foreground font-semibold">malicious orderers</span>. Required when operators are competitors, regulated, or untrusted at the protocol level.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── s3-channels ─────────────────────────────────────────────────────────────

const CHANNEL_ORGS = [
  { id: 'pharmaA', label: 'PharmaA', icon: '🔵', color: '#6366f1' },
  { id: 'pharmaB', label: 'PharmaB', icon: '🟢', color: '#39B54A' },
  { id: 'hospital', label: 'City Hospital', icon: '🏥', color: '#ED1C24' },
  { id: 'regulator', label: 'Regulator', icon: '⚖️', color: '#f59e0b' },
];

const CHANNELS_DEF = [
  {
    id: 'ch1',
    label: 'Joint R&D',
    color: '#6366f1',
    members: ['pharmaA', 'pharmaB'],
    data: 'Shared drug research, trial data, patents',
    why: 'Competitors collaborate on R&D but keep results hidden from hospitals and regulators until ready.',
  },
  {
    id: 'ch2',
    label: 'Drug Supply',
    color: '#ED1C24',
    members: ['pharmaA', 'hospital'],
    data: 'Orders, shipments, cold-chain logs, invoices',
    why: 'Supply chain between one pharma and one hospital — PharmaB should not see their competitor\'s sales volumes.',
  },
  {
    id: 'ch3',
    label: 'Compliance',
    color: '#f59e0b',
    members: ['pharmaA', 'pharmaB', 'hospital', 'regulator'],
    data: 'Audit logs, regulatory filings, adverse event reports',
    why: 'Regulator needs visibility into safety and compliance across the whole network.',
  },
];

function ChannelsSlide() {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const active = CHANNELS_DEF.find(c => c.id === activeChannel);

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Channels: Selective Data Sharing</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Four companies on one Fabric network — three channels, each with different membership and data. Click a channel to see who can read it.
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4">
        {/* Companies row */}
        <div className="shrink-0 flex gap-3 justify-center">
          {CHANNEL_ORGS.map(org => (
            <div
              key={org.id}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-bold text-sm"
              style={{ borderColor: org.color, backgroundColor: org.color + '15', color: org.color }}
            >
              <span>{org.icon}</span> {org.label}
            </div>
          ))}
        </div>

        {/* Channels + detail */}
        <div className="flex-1 min-h-0 flex gap-4">
          {/* Channels column */}
          <div className="flex flex-col gap-3 w-56 shrink-0">
            {CHANNELS_DEF.map(ch => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(activeChannel === ch.id ? null : ch.id)}
                className="flex-1 flex flex-col gap-2 p-4 rounded-xl border-2 border-dashed text-left cursor-pointer transition-all"
                style={{
                  borderColor: activeChannel === ch.id ? ch.color : ch.color + '50',
                  backgroundColor: activeChannel === ch.id ? ch.color + '14' : ch.color + '06',
                }}
              >
                <div className="font-bold text-sm" style={{ color: ch.color }}>{ch.label}</div>
                <div className="flex flex-wrap gap-1">
                  {CHANNEL_ORGS.map(org => (
                    <span
                      key={org.id}
                      className="px-2 py-0.5 rounded-full text-xs border font-medium transition-all"
                      style={
                        ch.members.includes(org.id)
                          ? { borderColor: org.color + '80', color: org.color, backgroundColor: org.color + '12' }
                          : { borderColor: 'var(--border)', color: 'var(--muted-foreground)', opacity: 0.35 }
                      }
                    >
                      {org.label}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">{ch.data}</div>
              </button>
            ))}
          </div>

          {/* Detail / visual panel */}
          <div className="flex-1 min-w-0 rounded-xl border border-border bg-card/50 p-5 flex flex-col">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 h-full"
              >
                <div className="font-bold text-lg" style={{ color: active.color }}>
                  Channel: {active.label}
                </div>

                {/* Who sees what visual */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Visibility per organisation</div>
                  <div className="flex flex-col gap-2">
                    {CHANNEL_ORGS.map(org => {
                      const canSee = active.members.includes(org.id);
                      return (
                        <div
                          key={org.id}
                          className="flex items-center gap-3 p-3 rounded-xl border"
                          style={{
                            borderColor: canSee ? org.color + '60' : 'var(--border)',
                            backgroundColor: canSee ? org.color + '0a' : 'transparent',
                          }}
                        >
                          <span className="text-lg">{org.icon}</span>
                          <span className="font-semibold text-sm text-foreground flex-1">{org.label}</span>
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={
                              canSee
                                ? { backgroundColor: org.color + '20', color: org.color }
                                : { backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }
                            }
                          >
                            {canSee ? '✓ Can read & write' : '✗ No access'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="mt-auto p-3 rounded-xl border text-xs text-muted-foreground"
                    style={{ borderColor: active.color + '40', backgroundColor: active.color + '08' }}
                  >
                    <span className="font-semibold" style={{ color: active.color }}>Why this channel? </span>
                    {active.why}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                ← Click a channel to see who has access
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── s3-txflow ────────────────────────────────────────────────────────────────

const TX_STEPS = [
  {
    num: 1,
    emoji: '📝',
    label: 'Propose',
    desc: 'Client sends a transaction proposal to the designated endorsing peers.',
    color: '#6366f1',
  },
  {
    num: 2,
    emoji: '✅',
    label: 'Endorse',
    desc: 'Peers simulate chaincode execution and return a signed endorsement. No ledger write yet.',
    color: '#39B54A',
  },
  {
    num: 3,
    emoji: '📦',
    label: 'Order',
    desc: 'Client submits the endorsed transaction to the Orderer. Orderer batches transactions into a block.',
    color: '#f59e0b',
  },
  {
    num: 4,
    emoji: '🔗',
    label: 'Validate & Commit',
    desc: 'All peers validate endorsement signatures and commit the block to their ledger copy.',
    color: '#ED1C24',
  },
  {
    num: 5,
    emoji: '📢',
    label: 'Notify',
    desc: 'Events are emitted to the client confirming the transaction has been committed.',
    color: '#22d3ee',
  },
];

function TxFlowSlide() {
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Transaction Flow in Fabric</h2>
        <p className="text-sm text-muted-foreground mt-1">Five stages from proposal to confirmation — execute-order-validate model.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Steps — takes 2 cols */}
        <div className="lg:col-span-2 flex flex-col justify-center gap-1">
          {TX_STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
                className="flex items-start gap-3 p-3 rounded-xl border"
                style={{ borderColor: step.color + '40', backgroundColor: step.color + '0d' }}
              >
                {/* Number badge */}
                <div
                  className="size-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5"
                  style={{ backgroundColor: step.color }}
                >
                  {step.num}
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg">{step.emoji}</span>
                  <div>
                    <div className="font-bold text-sm text-foreground">{step.label}</div>
                    <div className="text-xs text-muted-foreground">{step.desc}</div>
                  </div>
                </div>
              </motion.div>
              {/* Connector */}
              {i < TX_STEPS.length - 1 && (
                <div className="ml-[22px] flex items-center">
                  <div className="w-0.5 h-3 bg-border" />
                  <svg className="size-2 -ml-0.5 text-muted-foreground" viewBox="0 0 8 8" fill="currentColor">
                    <path d="M4 8L0 0h8z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Side note */}
        <div className="flex flex-col gap-4 justify-center">
          <div className="p-4 rounded-xl border border-[#39B54A]/40" style={{ backgroundColor: '#39B54A0d' }}>
            <div className="font-bold text-sm text-foreground mb-2">Execute-Order-Validate</div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Fabric runs chaincode <strong>before</strong> ordering. This means multiple transactions can be simulated in parallel by different peers simultaneously — unlocking high throughput.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="font-bold text-sm text-foreground mb-2">vs. Order-Execute</div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Traditional blockchains (Ethereum) order first, then all nodes execute sequentially. This creates a bottleneck. Fabric's approach avoids this entirely.
            </div>
          </div>

          <div className="p-3 rounded-xl border border-[#6366f1]/40" style={{ backgroundColor: '#6366f10d' }}>
            <div className="text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Result: </span>
              3,000+ TPS achievable without sacrificing Byzantine resilience when SmartBFT is enabled.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── s3-consensus-evo ─────────────────────────────────────────────────────────

type ConsensusVersion = {
  version: string;
  year: string;
  name: string;
  color: string;
  status: string;
  diagram: 'kafka' | 'raft' | 'bft';
  stats: { label: string; value: string }[];
  desc: string;
  limit: string;
  solved: string;
  adoption: string;
};

const CONSENSUS_VERSIONS: ConsensusVersion[] = [
  {
    version: 'v1.x',
    year: '2017',
    name: 'Apache Kafka',
    color: '#ED1C24',
    status: 'Deprecated (2.5+)',
    diagram: 'kafka',
    stats: [
      { label: 'Min nodes',     value: '5+' },
      { label: 'Fault tol.',    value: 'CFT' },
      { label: 'Throughput',    value: '~1k TPS' },
    ],
    desc: 'External Kafka cluster handled block ordering, with Zookeeper for coordination. Reliable but operationally heavy — a non-blockchain dependency that consortiums had to provision and patch separately.',
    limit: 'Not BFT · Kafka + ZK = a central operational chokepoint outside the blockchain layer.',
    solved: 'First stable ordering after the v0.6 PBFT prototype — proved Fabric\'s execute-order-validate model worked at scale.',
    adoption: 'Removed entirely in Fabric v2.5 (2021). Legacy networks only.',
  },
  {
    version: 'v2.x',
    year: '2019',
    name: 'Raft (CFT)',
    color: '#f59e0b',
    status: 'Current default',
    diagram: 'raft',
    stats: [
      { label: 'Min nodes',     value: '3' },
      { label: 'Fault tol.',    value: '⌊(N-1)/2⌋ crashes' },
      { label: 'Throughput',    value: '~3k TPS' },
    ],
    desc: 'Built-in Crash Fault Tolerant consensus. Orderer nodes elect a leader; the leader replicates an append-only log of blocks to followers. Simple, fast, and requires zero external infrastructure.',
    limit: 'Assumes no malicious orderers — tolerates crashes, not Byzantine behavior.',
    solved: 'Eliminated the Kafka + Zookeeper dependency · single binary deployment.',
    adoption: 'Used by virtually every production Fabric consortium today (IBM Food Trust, we.trade, TradeLens, government registries).',
  },
  {
    version: 'v3.x',
    year: '2023',
    name: 'SmartBFT',
    color: '#39B54A',
    status: 'Production-ready',
    diagram: 'bft',
    stats: [
      { label: 'Min nodes',     value: '4 (N ≥ 3F+1)' },
      { label: 'Fault tol.',    value: '⌊(N-1)/3⌋ Byzantine' },
      { label: 'Throughput',    value: '~1.5–2k TPS' },
    ],
    desc: 'Byzantine Fault Tolerant ordering service. Handles both crashes AND malicious orderer nodes. Designed for adversarial consortiums where parties don\'t trust each other to operate orderers honestly.',
    limit: 'Heavier than Raft · 3-phase consensus · need at least 4 orderers to tolerate 1 malicious one.',
    solved: 'Removes the trust-the-orderer-operator assumption — enables truly adversarial enterprise networks.',
    adoption: 'Picked when orderer operators are competitors or regulated entities (cross-bank settlement, defense, multi-jurisdiction).',
  },
];

function ConsensusMiniDiagram({ kind, color }: { kind: 'kafka' | 'raft' | 'bft'; color: string }) {
  if (kind === 'kafka') {
    return (
      <svg viewBox="0 0 240 120" className="w-full h-28">
        {/* Peers row */}
        {[40, 90, 150, 200].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={22} r={11} fill={color + '30'} stroke={color} strokeWidth={1.5} />
            <text x={x} y={26} textAnchor="middle" fontSize={10} fontWeight="700" fill="currentColor" className="text-foreground">P{i + 1}</text>
            <line x1={x} y1={33} x2={120} y2={75} stroke={color} strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
          </g>
        ))}
        {/* External Kafka box */}
        <rect x={50} y={70} width={140} height={38} rx={6} fill={color + '20'} stroke={color} strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={120} y={88} textAnchor="middle" fontSize={11} fontWeight="800" fill={color}>Kafka cluster</text>
        <text x={120} y={102} textAnchor="middle" fontSize={9} fill="currentColor" className="text-muted-foreground">+ Zookeeper · external</text>
      </svg>
    );
  }
  if (kind === 'raft') {
    return (
      <svg viewBox="0 0 240 120" className="w-full h-28">
        {/* Leader */}
        <circle cx={120} cy={28} r={16} fill={color + '40'} stroke={color} strokeWidth={2} />
        <text x={120} y={32} textAnchor="middle" fontSize={10} fontWeight="800" fill={color}>LEAD</text>
        {/* Followers */}
        {[60, 180].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={88} r={13} fill={color + '20'} stroke={color} strokeWidth={1.5} />
            <text x={x} y={92} textAnchor="middle" fontSize={9} fontWeight="700" fill={color}>F{i + 1}</text>
            <line x1={120} y1={44} x2={x} y2={75} stroke={color} strokeWidth={1.8} markerEnd="url(#arrow-raft)" />
          </g>
        ))}
        <defs>
          <marker id="arrow-raft" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill={color} />
          </marker>
        </defs>
        <text x={120} y={114} textAnchor="middle" fontSize={9} fill="currentColor" className="text-muted-foreground">log replication</text>
      </svg>
    );
  }
  // bft
  return (
    <svg viewBox="0 0 240 120" className="w-full h-28">
      {/* 4 nodes in a square */}
      {[
        { x: 80,  y: 32, label: 'N1', honest: true },
        { x: 160, y: 32, label: 'N2', honest: true },
        { x: 80,  y: 84, label: 'N3', honest: true },
        { x: 160, y: 84, label: 'N4', honest: false },
      ].map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x} cy={n.y} r={14}
            fill={n.honest ? color + '30' : '#ED1C2430'}
            stroke={n.honest ? color : '#ED1C24'}
            strokeWidth={1.8}
          />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={n.honest ? 10 : 13} fontWeight="800" fill={n.honest ? color : '#ED1C24'}>
            {n.honest ? n.label : '✗'}
          </text>
        </g>
      ))}
      {/* Connecting lines between honest nodes (triangle) */}
      {[
        [80, 32, 160, 32], [80, 32, 80, 84], [160, 32, 80, 84],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.2} opacity={0.55} />
      ))}
      <text x={120} y={114} textAnchor="middle" fontSize={9} fill="currentColor" className="text-muted-foreground">≥ 2f+1 honest agree</text>
    </svg>
  );
}

function ConsensusEvolutionSlide() {
  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-3">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Consensus Evolution in Fabric</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Fabric's ordering layer evolved in three major steps — each removing the previous version's biggest constraint.
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-3">
        {/* Timeline strip */}
        <div className="shrink-0 flex items-center gap-2 px-1">
          {CONSENSUS_VERSIONS.map((v, i) => (
            <div key={v.version} className="flex items-center flex-1 gap-2">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className="size-9 rounded-full border-2 flex items-center justify-center font-black text-[10px] shrink-0"
                  style={{ borderColor: v.color, backgroundColor: v.color + '20', color: v.color }}
                >
                  {v.version}
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-bold text-foreground whitespace-nowrap">{v.name}</div>
                  <div className="text-[10px] text-muted-foreground">{v.year}</div>
                </div>
              </div>
              {i < CONSENSUS_VERSIONS.length - 1 && (
                <div className="flex-1 flex items-center gap-1 min-w-0">
                  <div className="flex-1 h-0.5" style={{ background: `linear-gradient(to right, ${v.color}, ${CONSENSUS_VERSIONS[i + 1].color})` }} />
                  <span className="text-[10px] text-muted-foreground">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
          {CONSENSUS_VERSIONS.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex flex-col gap-2 p-3 rounded-xl border min-h-0"
              style={{ borderColor: v.color + '55', backgroundColor: v.color + '08', color: v.color }}
            >
              {/* Header */}
              <div className="flex items-center justify-between shrink-0">
                <div className="font-black text-sm text-foreground">{v.name}</div>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                  style={{ borderColor: v.color + '70', color: v.color, backgroundColor: v.color + '12' }}
                >
                  {v.status}
                </span>
              </div>

              {/* Mini diagram */}
              <div className="rounded-lg border bg-card/50 p-2 shrink-0" style={{ borderColor: v.color + '30' }}>
                <ConsensusMiniDiagram kind={v.diagram} color={v.color} />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-1 shrink-0">
                {v.stats.map(s => (
                  <div key={s.label} className="rounded-md border px-1.5 py-1 text-center bg-card" style={{ borderColor: v.color + '35' }}>
                    <div className="text-[10px] font-black leading-tight" style={{ color: v.color }}>{s.value}</div>
                    <div className="text-[8px] text-muted-foreground uppercase tracking-wider leading-tight mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-[11px] text-muted-foreground leading-snug flex-1">{v.desc}</p>

              {/* Limit / Solved */}
              <div className="shrink-0 space-y-1">
                <div className="p-1.5 rounded text-[10px] leading-snug" style={{ backgroundColor: '#ED1C2410', borderLeft: '2px solid #ED1C24' }}>
                  <span className="font-bold" style={{ color: '#ED1C24' }}>Limit: </span>
                  <span className="text-muted-foreground">{v.limit}</span>
                </div>
                <div className="p-1.5 rounded text-[10px] leading-snug" style={{ backgroundColor: '#39B54A10', borderLeft: '2px solid #39B54A' }}>
                  <span className="font-bold" style={{ color: '#39B54A' }}>Solved: </span>
                  <span className="text-muted-foreground">{v.solved}</span>
                </div>
              </div>

              {/* Adoption note */}
              <div className="shrink-0 text-[9px] italic text-muted-foreground leading-snug border-t pt-1.5" style={{ borderColor: v.color + '25' }}>
                {v.adoption}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decision strip */}
        <div className="shrink-0 rounded-xl border p-2.5 flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-4" style={{ borderColor: '#6366f155', backgroundColor: '#6366f10d' }}>
          <span className="text-[10px] font-black uppercase tracking-widest shrink-0" style={{ color: '#6366f1' }}>How to choose today</span>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 text-[11px] text-muted-foreground leading-snug">
            <div>
              <span className="font-bold" style={{ color: '#f59e0b' }}>Raft</span> — when orderer operators are <span className="text-foreground font-medium">trusted partners</span> (most consortiums). Fastest, simplest, lightest.
            </div>
            <div>
              <span className="font-bold" style={{ color: '#39B54A' }}>SmartBFT</span> — when orderer operators are <span className="text-foreground font-medium">competitors or regulated</span>. Pay the throughput cost for true Byzantine resilience.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── s3-raft ──────────────────────────────────────────────────────────────────

const RAFT_PHASES = [
  {
    id: 'election',
    label: 'Leader Election',
    color: '#6366f1',
    icon: '🗳️',
    desc: 'On startup or after a leader crash, nodes become Candidates and request votes. The first to reach a majority becomes the new Leader.',
    details: [
      'Each node starts as a Follower',
      'If no heartbeat from leader → becomes Candidate',
      'Candidate sends RequestVote to all peers',
      'First to get ⌊N/2⌋+1 votes wins the election',
      'Term counter increments with every election',
    ],
  },
  {
    id: 'replication',
    label: 'Log Replication',
    color: '#39B54A',
    icon: '📋',
    desc: 'The Leader receives all client requests and appends them to its log. It then replicates this entry to all Followers before acknowledging the client.',
    details: [
      'Client sends transaction to Leader only',
      'Leader appends entry to its own log',
      'Leader sends AppendEntries RPC to all Followers',
      'Followers append to their own logs and reply',
      'Leader waits for majority acknowledgement',
    ],
  },
  {
    id: 'commit',
    label: 'Commit',
    color: '#f59e0b',
    icon: '✅',
    desc: 'Once a majority of followers have written the entry, the Leader marks it as committed and notifies all followers. The entry is now permanent.',
    details: [
      'Majority ACK received by Leader',
      'Leader commits the entry in its state machine',
      'Leader broadcasts commit in next AppendEntries',
      'Followers also commit their copy',
      'Client receives confirmation',
    ],
  },
];

function RaftMechanicsSlide() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = RAFT_PHASES[activePhase];

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-5">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Raft: How It Works</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Raft breaks consensus into three phases — click each to explore.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — phase selector + node visual */}
        <div className="flex flex-col gap-4">
          {/* Phase tabs */}
          <div className="flex gap-2 shrink-0">
            {RAFT_PHASES.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActivePhase(i)}
                className="flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer"
                style={{
                  borderColor: activePhase === i ? p.color : 'var(--border)',
                  backgroundColor: activePhase === i ? p.color + '18' : 'transparent',
                  color: activePhase === i ? p.color : 'var(--muted-foreground)',
                }}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>

          {/* Node diagram */}
          <div className="flex-1 rounded-xl border border-border bg-card/50 p-4 flex flex-col gap-3">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0">5-node Raft cluster</div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex gap-4 items-center flex-wrap justify-center">
                {[
                  { role: 'Leader', color: phase.color, animate: activePhase === 0 || activePhase === 1 || activePhase === 2 },
                  { role: 'Follower', color: '#6366f1', animate: activePhase === 1 || activePhase === 2 },
                  { role: 'Follower', color: '#6366f1', animate: activePhase === 1 || activePhase === 2 },
                  { role: activePhase === 0 ? 'Candidate' : 'Follower', color: activePhase === 0 ? '#f59e0b' : '#6366f1', animate: activePhase === 0 },
                  { role: 'Follower', color: '#6366f1', animate: false },
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    animate={node.animate ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className="size-12 rounded-full border-2 flex items-center justify-center text-lg"
                      style={{ borderColor: node.color, backgroundColor: node.color + '18' }}
                    >
                      {node.role === 'Leader' ? '👑' : node.role === 'Candidate' ? '✋' : '🖥️'}
                    </div>
                    <span className="text-xs font-medium" style={{ color: node.color }}>{node.role}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground shrink-0 text-center">{phase.desc}</p>
          </div>
        </div>

        {/* Right — step list */}
        <div className="flex flex-col gap-3">
          <div className="font-bold text-base text-foreground shrink-0">{phase.icon} {phase.label} — steps</div>
          {phase.details.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.28 }}
              className="flex items-start gap-3 p-3 rounded-xl border"
              style={{ borderColor: phase.color + '40', backgroundColor: phase.color + '0a' }}
            >
              <div
                className="size-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ backgroundColor: phase.color, color: '#fff' }}
              >
                {i + 1}
              </div>
              <span className="text-sm text-foreground">{step}</span>
            </motion.div>
          ))}

          {/* Quorum formula */}
          <div className="mt-auto p-3 rounded-xl border border-[#39B54A]/40" style={{ backgroundColor: '#39B54A0d' }}>
            <div className="text-xs font-bold text-[#39B54A] mb-1">Quorum rule</div>
            <div className="font-mono text-sm text-foreground">majority = ⌊N/2⌋ + 1</div>
            <div className="text-xs text-muted-foreground mt-1">
              5 nodes → needs 3 votes · 3 nodes → needs 2 votes · Tolerates ⌊(N−1)/2⌋ failures
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── s3-exercise-supply ───────────────────────────────────────────────────────

const SUPPLY_EVENTS = [
  {
    id: 1,
    label: 'Batch ID assigned at harvest',
    context: 'A farm assigns a unique batch number to a crate of lettuce before it leaves the field.',
    answer: true,
    reason: 'Immutable origin record — enables full provenance traceability from field to store. This is the anchor for the entire chain.',
  },
  {
    id: 2,
    label: 'Farmer negotiates price with processor',
    context: 'The farm owner and the processing plant agree on a price per kilogram over email.',
    answer: false,
    reason: 'Commercial negotiation is private and off-chain. Pricing data is competitive information and does not require multi-party immutability.',
  },
  {
    id: 3,
    label: 'Temperature logged during refrigerated transport',
    context: 'IoT sensors record temperature every 30 minutes inside the refrigerated truck.',
    answer: true,
    reason: 'Cold-chain integrity evidence is critical for food safety and liability. Any tampering with this data could conceal contamination.',
  },
  {
    id: 4,
    label: 'Processing plant quality inspection passed',
    context: 'A third-party inspector certifies the batch meets food safety standards.',
    answer: true,
    reason: 'Certification of compliance must be tamper-proof and instantly auditable by retailers and regulators — a perfect blockchain use case.',
  },
  {
    id: 5,
    label: 'Retail price set by supermarket',
    context: 'The supermarket updates its POS system with the sale price for the product.',
    answer: false,
    reason: 'Pricing is a unilateral commercial decision. Competitors on the same supply network should not see each other\'s retail margins.',
  },
  {
    id: 6,
    label: 'Product recalled due to contamination alert',
    context: 'A contamination is detected. A recall notice needs to reach all supply chain partners immediately.',
    answer: true,
    reason: 'Recall events must be immutable, timestamped, and instantly visible across all participants — blockchain enables 2.2-second full-chain alerts (Walmart case).',
  },
  {
    id: 7,
    label: 'Distributor updates internal ERP system',
    context: 'The distributor enters the delivery into their own SAP system after the truck arrives.',
    answer: false,
    reason: 'Internal ERP updates are siloed operations. They do not require multi-party verification and may contain sensitive business data.',
  },
  {
    id: 8,
    label: 'Consumer scans QR code to verify product origin',
    context: 'A shopper at the store scans the product QR code on their phone.',
    answer: true,
    reason: 'Reading from the ledger is always valid. The blockchain provides a public-facing provenance window while writing remains controlled.',
  },
];

function SupplyChainExercise() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const allAnswered = SUPPLY_EVENTS.every(e => answers[e.id] !== undefined);

  function toggle(id: number, val: boolean) {
    if (revealed[id]) return;
    setAnswers(prev => ({ ...prev, [id]: val }));
  }

  function reveal(id: number) {
    setRevealed(prev => ({ ...prev, [id]: true }));
  }

  const score = allAnswered
    ? SUPPLY_EVENTS.filter(e => answers[e.id] === e.answer).length
    : null;

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Exercise: What Goes On Chain?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Walmart wants to trace lettuce from farm to store on Hyperledger Fabric. For each event, decide: should it be recorded on the blockchain?
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-3 content-start">
        {SUPPLY_EVENTS.map(ev => {
          const chosen = answers[ev.id];
          const isRevealed = revealed[ev.id];
          const correct = ev.answer;
          const isRight = chosen === correct;

          return (
            <div
              key={ev.id}
              className="flex flex-col gap-2 p-3 rounded-xl border transition-all"
              style={{
                borderColor: isRevealed
                  ? (isRight ? '#39B54A60' : '#ED1C2460')
                  : 'var(--border)',
                backgroundColor: isRevealed
                  ? (isRight ? '#39B54A0a' : '#ED1C240a')
                  : 'var(--card)',
              }}
            >
              <div className="text-sm font-semibold text-foreground">{ev.label}</div>
              <div className="text-xs text-muted-foreground">{ev.context}</div>
              <div className="flex gap-2 items-center">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    onClick={() => toggle(ev.id, val)}
                    className="flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer"
                    style={{
                      borderColor: chosen === val ? (val ? '#39B54A' : '#ED1C24') : 'var(--border)',
                      backgroundColor: chosen === val ? (val ? '#39B54A18' : '#ED1C2418') : 'transparent',
                      color: chosen === val ? (val ? '#39B54A' : '#ED1C24') : 'var(--muted-foreground)',
                    }}
                  >
                    {val ? '✅ On chain' : '❌ Off chain'}
                  </button>
                ))}
                {chosen !== undefined && !isRevealed && (
                  <button
                    onClick={() => reveal(ev.id)}
                    className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:bg-card transition-all cursor-pointer"
                  >
                    Why?
                  </button>
                )}
              </div>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs rounded-lg p-2 font-medium"
                  style={{
                    backgroundColor: isRight ? '#39B54A0d' : '#ED1C240d',
                    color: isRight ? '#39B54A' : '#ED1C24',
                  }}
                >
                  {isRight ? '✓ Correct — ' : '✗ Incorrect — '}{ev.reason}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {allAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="shrink-0 mt-3 p-3 rounded-xl border border-[#39B54A]/40 text-center"
          style={{ backgroundColor: '#39B54A0d' }}
        >
          <span className="font-bold text-[#39B54A]">
            Score: {score}/{SUPPLY_EVENTS.length}
            {score === SUPPLY_EVENTS.length ? ' — Perfect! 🎉' : score! >= 6 ? ' — Great work!' : ' — Review the explanations above.'}
          </span>
        </motion.div>
      )}
    </div>
  );
}

// ─── s3-exercise-health ───────────────────────────────────────────────────────

const HEALTH_CHANNELS = [
  {
    id: 'clinical',
    label: 'Clinical Channel',
    icon: '🏥',
    color: '#6366f1',
    members: 'Hospital A · Hospital B · Doctors',
    desc: 'Sensitive patient data. Strictly need-to-know.',
  },
  {
    id: 'billing',
    label: 'Billing Channel',
    icon: '💳',
    color: '#39B54A',
    members: 'Hospitals · Insurance Companies',
    desc: 'Financial claims and reimbursements. No clinical detail.',
  },
  {
    id: 'compliance',
    label: 'Compliance Channel',
    icon: '📋',
    color: '#f59e0b',
    members: 'All parties + Regulator (HIPAA)',
    desc: 'Audit logs and regulatory reporting only.',
  },
];

const HEALTH_ITEMS = [
  { id: 1, label: 'Diagnosis & treatment records', correct: 'clinical', icon: '🩺' },
  { id: 2, label: 'Insurance claim submission', correct: 'billing', icon: '📄' },
  { id: 3, label: 'Drug prescription history', correct: 'clinical', icon: '💊' },
  { id: 4, label: 'HIPAA compliance audit log', correct: 'compliance', icon: '🔍' },
  { id: 5, label: 'Hospital billing codes (DRG)', correct: 'billing', icon: '💰' },
  { id: 6, label: 'Regulatory inspection result', correct: 'compliance', icon: '📊' },
];

function HealthDataExercise() {
  const [selected, setSelected] = useState<number | null>(null);
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const allPlaced = HEALTH_ITEMS.every(it => placed[it.id]);

  function handleItemClick(id: number) {
    if (checked) return;
    setSelected(prev => (prev === id ? null : id));
  }

  function handleChannelClick(channelId: string) {
    if (checked || selected === null) return;
    setPlaced(prev => ({ ...prev, [selected]: channelId }));
    setSelected(null);
  }

  const score = checked
    ? HEALTH_ITEMS.filter(it => placed[it.id] === it.correct).length
    : null;

  return (
    <div className="h-full flex flex-col p-6 lg:p-10">
      <div className="shrink-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Exercise: Design the Channel Structure</h2>
        <p className="text-sm text-muted-foreground mt-1">
          A hospital network is deploying Hyperledger Fabric for private health data. Assign each data type to the correct channel.
          <span className="ml-2 font-medium text-foreground">Select a card, then click a channel.</span>
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left — data items */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0">Data types to assign</div>
          <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto">
            {HEALTH_ITEMS.map(item => {
              const ch = HEALTH_CHANNELS.find(c => c.id === placed[item.id]);
              const isRight = checked && placed[item.id] === item.correct;
              const isWrong = checked && placed[item.id] !== undefined && placed[item.id] !== item.correct;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer"
                  style={{
                    borderColor: selected === item.id
                      ? '#6366f1'
                      : isRight
                        ? '#39B54A60'
                        : isWrong
                          ? '#ED1C2460'
                          : ch
                            ? ch.color + '60'
                            : 'var(--border)',
                    backgroundColor: selected === item.id
                      ? '#6366f118'
                      : isRight
                        ? '#39B54A0a'
                        : isWrong
                          ? '#ED1C240a'
                          : ch
                            ? ch.color + '0a'
                            : 'var(--card)',
                  }}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{item.label}</div>
                    {ch && !checked && (
                      <div className="text-xs mt-0.5" style={{ color: ch.color }}>→ {ch.label}</div>
                    )}
                    {checked && (
                      <div
                        className="text-xs mt-0.5 font-semibold"
                        style={{ color: isRight ? '#39B54A' : '#ED1C24' }}
                      >
                        {isRight ? '✓ Correct' : `✗ Should be: ${HEALTH_CHANNELS.find(c => c.id === item.correct)?.label}`}
                      </div>
                    )}
                  </div>
                  {selected === item.id && (
                    <span className="text-xs text-[#6366f1] font-bold shrink-0">Selected</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — channels */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0">Channels</div>
          {HEALTH_CHANNELS.map(ch => {
            const itemsHere = HEALTH_ITEMS.filter(it => placed[it.id] === ch.id);
            return (
              <button
                key={ch.id}
                onClick={() => handleChannelClick(ch.id)}
                className="flex-1 flex flex-col gap-2 p-3 rounded-xl border-2 border-dashed text-left transition-all cursor-pointer"
                style={{
                  borderColor: selected !== null ? ch.color : ch.color + '60',
                  backgroundColor: selected !== null ? ch.color + '0d' : ch.color + '05',
                }}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-lg">{ch.icon}</span>
                  <div>
                    <div className="font-bold text-sm" style={{ color: ch.color }}>{ch.label}</div>
                    <div className="text-xs text-muted-foreground">{ch.members}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{ch.desc}</div>
                {itemsHere.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {itemsHere.map(it => (
                      <span
                        key={it.id}
                        className="px-2 py-0.5 rounded-full text-xs border font-medium"
                        style={{ borderColor: ch.color + '60', color: ch.color, backgroundColor: ch.color + '10' }}
                      >
                        {it.icon} {it.label}
                      </span>
                    ))}
                  </div>
                )}
                {selected !== null && itemsHere.length === 0 && (
                  <div className="text-xs text-muted-foreground italic">Drop here</div>
                )}
              </button>
            );
          })}

          {allPlaced && !checked && (
            <button
              onClick={() => setChecked(true)}
              className="shrink-0 py-2 px-4 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all"
              style={{ borderColor: '#39B54A', backgroundColor: '#39B54A18', color: '#39B54A' }}
            >
              Check answers
            </button>
          )}
          {checked && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="shrink-0 p-3 rounded-xl border border-[#39B54A]/40 text-center"
              style={{ backgroundColor: '#39B54A0d' }}
            >
              <span className="font-bold text-[#39B54A]">
                Score: {score}/{HEALTH_ITEMS.length}
                {score === HEALTH_ITEMS.length ? ' — Perfect! 🎉' : score! >= 4 ? ' — Great work!' : ' — Check the correct channels above.'}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── BP_Section3 ──────────────────────────────────────────────────────────────

export function BP_Section3() {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <SectionNav chapters={chapters} />
      <div id="section-scroll" className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <div className="slide-flow">

        {/* ═══════ TITLE ═══════ */}
        <div className="h-full">
          <TitleSlide
            sectionNumber="SECTION 03"
            title="Permissioned Blockchains: Hyperledger Fabric"
            subtitle="Enterprise blockchain design, supply chains, channels, and transaction flow"
            icon={<Building2 className="size-20 text-[#39B54A]" />}
            gradient="from-[#39B54A] to-[#22d3ee]"
          />
        </div>

        {/* ═══════ WHY PERMISSIONED ═══════ */}
        <div id="s3-why" className="h-full">
          <WhyPermissionedSlide />
        </div>

        {/* ═══════ SUPPLY CHAINS ═══════ */}
        <div id="s3-supplychains" className="h-full">
          <SupplyChainsSlide />
        </div>

        {/* ═══════ FABRIC OVERVIEW ═══════ */}
        <div id="s3-overview" className="h-full flex items-start">
          <ConceptSlide
            title="Hyperledger Fabric"
            description="An enterprise-grade permissioned blockchain framework by the Linux Foundation. Modular, private, and designed for business networks."
            visual={fabricOverviewVisual}
            keyPoints={[
              'No mining — consensus by designated orderer nodes',
              'Chaincode (smart contracts) written in Go, JavaScript, or Java',
              'Channels create private sub-networks within the same Fabric network',
              'Used by IBM Food Trust, TradeLens, HSBC, Maersk, Walmart',
            ]}
          />
        </div>

        {/* ═══════ FABRIC DEEP DIVE ═══════ */}
        <div id="s3-fabricx" className="h-full">
          <FabricDeepDiveSlide />
        </div>

        {/* ═══════ CONSENSUS EVOLUTION ═══════ */}
        <div id="s3-consensus-evo" className="h-full">
          <ConsensusEvolutionSlide />
        </div>

        {/* ═══════ PLUGGABLE CONSENSUS ═══════ */}
        <div id="s3-consensus" className="h-full">
          <PluggableConsensusSlide />
        </div>

        {/* ═══════ RAFT MECHANICS ═══════ */}
        <div id="s3-raft" className="h-full">
          <RaftMechanicsSlide />
        </div>

        {/* ═══════ BFT ═══════ */}
        <div id="s3-bft" className="h-full">
          <BFTSlide />
        </div>

        {/* ═══════ CHANNELS ═══════ */}
        <div id="s3-channels" className="h-full">
          <ChannelsSlide />
        </div>

        {/* ═══════ TX FLOW ═══════ */}
        <div id="s3-txflow" className="h-full">
          <TxFlowSlide />
        </div>

        {/* ═══════ EXERCISE: SUPPLY CHAIN ═══════ */}
        <div id="s3-exercise-supply" className="h-full">
          <SupplyChainExercise />
        </div>

        {/* ═══════ EXERCISE: HEALTH DATA ═══════ */}
        <div id="s3-exercise-health" className="h-full">
          <HealthDataExercise />
        </div>

        {/* ═══════ PRODUCTION — Fabric in the wild ═══════ */}
        <div id="s3-production" className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 mb-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Fabric in production — three honest case studies</h2>
            <p className="text-sm text-muted-foreground mt-1">What real Fabric networks look like at scale — including one that succeeded, one that shut down, and one quietly becoming critical infrastructure.</p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
            {[
              {
                statusColor: '#39B54A',
                statusLabel: '✓ Live · expanding',
                name: 'IBM Food Trust',
                sub: 'Food supply traceability · 2018+',
                members: 'Walmart · Carrefour · Nestlé · Tyson · Unilever · Albertsons · 100+ orgs',
                flow: 'Harvest → processing → shipping → retail. Each step writes provenance + cold-chain data to the channel.',
                outcome: 'Walmart mango trace: 7 days → 2.2 sec. Used live in salmonella outbreak responses. Walmart now requires Food Trust onboarding for leafy-green suppliers.',
                lesson: 'Worked because (a) Walmart could mandate adoption, and (b) the alternative was decades-old paper / EDI workflows that genuinely failed during recalls.',
              },
              {
                statusColor: '#ED1C24',
                statusLabel: '✗ Shut down 2022',
                name: 'Maersk TradeLens',
                sub: 'Global shipping container tracking · 2018-2022',
                members: 'Maersk + IBM · select carriers · 50+ ports · 200M+ events / yr at peak',
                flow: 'Shipping events (load, unload, customs, transhipment) written to the channel by carriers, ports, and customs authorities.',
                outcome: 'Reduced docs processing time. But: rival carriers (MSC, CMA CGM, Hapag-Lloyd) refused to join a Maersk-branded network. Network effects collapsed. Both partners exited Q1 2022.',
                lesson: 'Permissioned blockchain needs neutral governance OR a regulator mandate. A consortium owned by one competitor is a contradiction in terms — others won\'t feed data to a rival\'s ledger.',
              },
              {
                statusColor: '#6366f1',
                statusLabel: '◉ Critical infrastructure',
                name: 'EU EBSI',
                sub: 'European Blockchain Services Infrastructure · 2018+',
                members: '27 EU member states + EEA · cross-border verifiable credentials · part of EU Digital Identity Wallet',
                flow: 'Issues and verifies cross-border credentials: diplomas, professional licences, eIDAS attestations, customs documents — backed by member-state validators.',
                outcome: 'Becomes mandatory infrastructure for the EU Digital Identity Wallet (eIDAS 2.0, member-state mandate by 2026). Universities issue Fabric-anchored diplomas verifiable across borders.',
                lesson: 'Government-led consortiums sidestep the network-effect problem — participation is a regulatory obligation, not a market choice. The most boring Fabric deployments may end up the most consequential.',
              },
            ].map(p => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2 p-3 rounded-xl border-2 min-h-0"
                style={{ borderColor: p.statusColor + '55', backgroundColor: p.statusColor + '0a' }}
              >
                <div className="shrink-0">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: p.statusColor + '18', color: p.statusColor, border: `1px solid ${p.statusColor}40` }}
                  >
                    {p.statusLabel}
                  </span>
                </div>

                <div className="shrink-0">
                  <div className="font-black text-base text-foreground leading-tight">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground leading-snug">{p.sub}</div>
                </div>

                <div className="shrink-0 rounded-lg border bg-card/50 px-2 py-1.5" style={{ borderColor: p.statusColor + '30' }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Consortium</div>
                  <div className="text-[10px] text-foreground leading-snug mt-0.5">{p.members}</div>
                </div>

                <div className="shrink-0 rounded-lg border bg-card/50 px-2 py-1.5" style={{ borderColor: p.statusColor + '30' }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Data flow</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{p.flow}</div>
                </div>

                <div className="rounded-lg border bg-card/50 px-2 py-1.5 flex-1 min-h-0" style={{ borderColor: p.statusColor + '30' }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: p.statusColor }}>Outcome</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{p.outcome}</div>
                </div>

                <div className="shrink-0 rounded-lg p-2 border-l-2" style={{ borderColor: p.statusColor, backgroundColor: p.statusColor + '12' }}>
                  <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: p.statusColor }}>Lesson</div>
                  <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{p.lesson}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 mt-3 rounded-xl border p-2.5" style={{ borderColor: '#39B54A55', backgroundColor: '#39B54A0d' }}>
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-bold" style={{ color: '#39B54A' }}>The pattern — </span>
              Permissioned blockchain succeeds where (a) a credible authority can require participation (Walmart's market power, the EU's regulatory mandate), and (b) the alternative process — paper, EDI, faxes, siloed ERP — has been demonstrably broken for years. Where the alternative is "good enough Excel", consortiums fail quietly.
            </p>
          </div>
        </div>

        {/* ═══════ COMPARISON ═══════ */}
        <div id="s3-comparison" className="h-full">
          <ComparisonSlide
            title="Ethereum vs Hyperledger Fabric"
            featureLabel="Property"
            option1Label="Ethereum"
            option2Label="Hyperledger Fabric"
            items={[
              { feature: 'Permission model', option1: 'Public permissionless', option2: 'Private permissioned' },
              { feature: 'Participants', option1: 'Anonymous', option2: 'Known & verified' },
              { feature: 'Consensus', option1: 'Proof of Stake', option2: 'Raft / SmartBFT' },
              { feature: 'Smart contract language', option1: 'Solidity / Vyper', option2: 'Go / JavaScript / Java' },
              { feature: 'TPS', option1: '~15 (L1)', option2: '3,000+' },
              { feature: 'Data privacy', option1: 'All data public', option2: 'Channels for private data' },
              { feature: 'Token required', option1: 'Yes — ETH for gas', option2: 'No native token' },
              { feature: 'Governance', option1: 'Decentralized (EIP process)', option2: 'Consortium members' },
              { feature: 'Best for', option1: 'DeFi, NFTs, public dApps', option2: 'Enterprise B2B, supply chain, finance' },
            ]}
          />
        </div>

        {/* ═══════ QUIZ ═══════ */}
        <div id="s3-quiz" className="h-full">
          <QuizSlide
            question="In Hyperledger Fabric, three pharmaceutical companies (PharmaA, PharmaB, and a Hospital) are on the same network. PharmaA and PharmaB want to share pricing data that the Hospital must NOT see. What Fabric feature enables this?"
            options={[
              { text: 'Pluggable consensus — PharmaA and PharmaB use a separate Raft ordering service that excludes the Hospital.', correct: false },
              { text: 'A private Channel — only PharmaA and PharmaB are members of this channel; the Hospital sees none of its transactions or ledger state.', correct: true },
              { text: 'A separate MSP (Membership Service Provider) — the Hospital is issued a different certificate type that limits its read access.', correct: false },
              { text: 'Zero-knowledge proofs — PharmaA and PharmaB submit proofs instead of raw data, hiding the pricing details from the Hospital.', correct: false },
            ]}
            explanation="Channels are Hyperledger Fabric's primary privacy mechanism. A Channel is a private sub-ledger with its own set of member organizations, chaincode, and transaction history — invisible to non-members on the same network. PharmaA and PharmaB create a channel that only they join; the Hospital cannot see its transactions, state, or even that it exists. This is fundamentally different from public blockchains where all data is visible to all participants. MSPs control identity and enrollment, not data visibility between enrolled members."
          />
        </div>

        {/* ═══════ QUIZ 2 — MSP / identity ═══════ */}
        <div id="s3-quiz-2" className="h-full">
          <QuizSlide
            question="In a Fabric consortium between BankA and BankB, every peer must prove its identity when submitting a proposal or endorsement. Which Fabric component issues and validates these identities?"
            options={[
              { text: 'The Ordering Service — Raft nodes verify each transaction\'s identity before sequencing it into a block.', correct: false },
              { text: 'The Membership Service Provider (MSP) — each organization runs its own MSP backed by a Certificate Authority that issues X.509 certificates to peers, clients and admins; remote peers validate signatures by trusting the issuer\'s root CA.', correct: true },
              { text: 'The Channel Configuration Block — a static list of public keys committed at channel genesis is checked on every transaction.', correct: false },
              { text: 'The Smart Contract (chaincode) — each chaincode must include identity-validation logic in its Init function.', correct: false },
            ]}
            explanation="Fabric is permissioned by design and relies on PKI. Every organization runs an MSP that maps cryptographic material (X.509 certificates issued by its CA) to roles (peer / client / admin / orderer). When a peer signs a proposal or endorsement, peers from other orgs validate the signature against the configured root certificate of the signer's MSP — listed in the channel configuration. The ordering service does NOT validate business identity; it only orders transactions that have already been endorsed. Identities are configured per-channel via the channel config, not hardcoded in chaincode, so adding a new org is a configuration change, not a redeployment."
          />
        </div>

        {/* ═══════ QUIZ 3 — Endorsement policy ═══════ */}
        <div id="s3-quiz-3" className="h-full">
          <QuizSlide
            question="A supply-chain chaincode is deployed to a channel with three orgs (Producer, Distributor, Retailer) and an endorsement policy of AND('Producer.peer', 'Distributor.peer'). The Retailer submits a transaction proposal that updates a delivery record. What is required for this transaction to be committed to the ledger?"
            options={[
              { text: 'A single Retailer peer endorses the proposal — the Retailer is the submitter, so its endorsement is sufficient.', correct: false },
              { text: 'The proposal must be endorsed by at least one peer from Producer AND at least one peer from Distributor before reaching the orderer; the Retailer\'s endorsement is irrelevant to the policy.', correct: true },
              { text: 'All three orgs (Producer, Distributor, Retailer) must endorse — Fabric defaults to unanimous endorsement when the submitter is on the channel.', correct: false },
              { text: 'The Raft orderer endorses on behalf of any unspecified org once a quorum of orderer nodes is reached.', correct: false },
            ]}
            explanation="Endorsement policy is enforced independently of the submitter. The client (Retailer here) sends the proposal directly to the peers listed in the policy — Producer and Distributor — collects their signed read/write sets, and only then forwards the endorsed transaction to the ordering service. The orderer batches and orders transactions but never endorses. Committing peers verify on receipt that the collected endorsements satisfy the policy before applying the state change; if the policy isn't met, the transaction is marked invalid in the block but still recorded (so the audit trail captures every attempt). Submitter identity gives no special endorsement power."
          />
        </div>

        {/* ═══════ TAKEAWAYS ═══════ */}
        <div id="s3-takeaways" className="h-full">
          <TakeawaySlide
            title="Section 03 — Key Takeaways"
            takeaways={[
              'Permissioned blockchains exist for regulated, multi-party environments where participants are known',
              'Hyperledger Fabric is the leading enterprise blockchain — modular, flexible, and production-proven',
              'Channels allow different subsets of participants to share private data on the same network',
              'Smart contracts (chaincode) in Fabric automate business logic across supply chain partners',
              'Pluggable consensus means Fabric can swap its ordering mechanism without rebuilding the network',
              'BFT consensus tolerates Byzantine (malicious) failures — essential in adversarial environments',
            ]}
          />
        </div>

        </div>
      </div>
    </div>
  );
}
