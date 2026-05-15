import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import logo from '../../../blockchainptlogo.jpeg';
import { TeacherCard } from '../../components/shared/TeacherCard';
import { helder, shayan } from '../../data/instructors';

const instructors = [helder, shayan];

const BASE = '/blockchain-platforms';

const sections = [
  {
    number: '00',
    title: 'Recap',
    description: 'Centralization, blockchain types, permissioned vs permissionless — the foundation we build on.',
    path: `${BASE}/section-0`,
    gradient: 'from-[#6366f1] to-[#8b5cf6]',
  },
  {
    number: '01',
    title: 'Bitcoin: The First Permissionless Blockchain',
    description: 'Architecture, transactions, Proof of Work, and the Blockchain Trilemma compared across platforms.',
    path: `${BASE}/section-1`,
    gradient: 'from-[#f59e0b] to-[#ED1C24]',
  },
  {
    number: '02',
    title: 'Ethereum: From Money to Programmable Blockchain',
    description: 'Accounts, EVM, smart contracts, PoW → PoS evolution, and the EVM ecosystem.',
    path: `${BASE}/section-2`,
    gradient: 'from-[#627EEA] to-[#8b5cf6]',
  },
  {
    number: '03',
    title: 'Permissioned Blockchains: Hyperledger Fabric',
    description: 'Why enterprise blockchains exist, smart contracts in supply chains, channels, and transaction flow.',
    path: `${BASE}/section-3`,
    gradient: 'from-[#39B54A] to-[#22d3ee]',
  },
  {
    number: '04',
    title: 'Interoperability & New Trends',
    description: 'Connecting blockchains — Cosmos, Layer 0 protocols, and Starknet.',
    path: `${BASE}/section-4`,
    gradient: 'from-[#22d3ee] to-[#6366f1]',
  },
  {
    number: '🏁',
    title: 'Conclusion',
    description: 'There is no best blockchain — only blockchains optimised for different constraints.',
    path: `${BASE}/conclusion`,
    gradient: 'from-[#39B54A] to-[#ED1C24]',
  },
];

export function BlockchainPlatformsHome() {
  return (
    <div className="size-full overflow-y-auto">
      {/* Hero */}
      <div className="min-h-screen flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(57,181,74,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(57,181,74,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 right-1/4 size-96 bg-gradient-to-br from-[#39B54A] to-[#22d3ee] opacity-15 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-gradient-to-br from-[#627EEA] to-[#39B54A] opacity-15 blur-3xl rounded-full" />

        <div className="relative z-10 text-center max-w-5xl">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Blockchain.pt" className="h-36 object-contain" />
          </div>

          <h1 className="text-5xl font-black text-foreground mb-3">Blockchain Platforms</h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Bitcoin · Ethereum · Hyperledger · Interoperability
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="px-4 py-2 bg-card rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">6 Parts</span>
            </div>
            <div className="px-4 py-2 bg-card rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">50+ Slides</span>
            </div>
            <div className="px-4 py-2 bg-card rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Interactive</span>
            </div>
          </div>

          <Link
            to={`${BASE}/section-0`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#39B54A] to-[#22d3ee] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#39B54A]/30 transition-all"
          >
            Start Learning
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>

      {/* Sections Overview */}
      <div className="max-w-7xl mx-auto px-12 py-16">
        <h2 className="text-4xl font-bold text-foreground mb-12">Course Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.number}
              to={section.path}
              className="group bg-card border border-border rounded-xl p-6 hover:border-[#39B54A] transition-all hover:shadow-lg hover:shadow-[#39B54A]/10"
            >
              <div className={`size-12 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4`}>
                <span className="text-white font-bold">{section.number}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#39B54A] transition-colors">
                {section.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              <div className="flex items-center gap-2 text-[#39B54A] text-sm font-bold">
                Explore
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Instructors */}
      <div className="max-w-7xl mx-auto px-12 py-16 border-t border-border">
        <h2 className="text-4xl font-bold text-foreground mb-3">Meet the Instructor{instructors.length > 1 ? 's' : ''}</h2>
        <p className="text-muted-foreground mb-10">The people behind this course</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {instructors.map((instructor) => (
            <TeacherCard key={instructor.name} {...instructor} />
          ))}
        </div>
      </div>
    </div>
  );
}
