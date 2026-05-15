import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import logo from '../../../blockchainptlogo.jpeg';
import { TeacherCard } from '../../components/shared/TeacherCard';
import { shayan } from '../../data/instructors';

const BASE = '/smart-contracts';

const sections = [
  {
    number: '01',
    title: 'Introduction to Smart Contracts',
    description: 'What smart contracts are, the Nick Szabo vending machine model, and the historical evolution from 1994 to today.',
    path: `${BASE}/section-1`,
    gradient: 'from-[#6366f1] to-[#8b5cf6]',
  },
  {
    number: '02',
    title: 'How Smart Contracts Work',
    description: 'Workflow, core components, execution environment, the Web3 landscape, dApps, gas economics, and why you should build with smart contracts.',
    path: `${BASE}/section-2`,
    gradient: 'from-[#8b5cf6] to-[#a78bfa]',
  },
  {
    number: '03',
    title: 'Industries & Case Studies',
    description: 'Five industry verticals (DeFi, Gaming/NFTs, RWA, Supply Chain, Digital Cert) plus eight flagship cases including Walmart, Santander, Estonia, The DAO, and ASX.',
    path: `${BASE}/section-3`,
    gradient: 'from-[#6366f1] to-[#22d3ee]',
  },
  {
    number: '04',
    title: 'Critical Thinking',
    description: 'Decision framework: when to use a smart contract — and when not to. Plus the 5-pillar adoption model for serious business deployment.',
    path: `${BASE}/section-4`,
    gradient: 'from-[#6366f1] to-[#8b5cf6]',
  },
  {
    number: '05',
    title: 'Limitations & Risks',
    description: 'Oracle problem, blockchain trilemma, security risks (reentrancy, flash loans, MEV), cost realities, and regulatory uncertainty.',
    path: `${BASE}/section-5`,
    gradient: 'from-[#ED1C24] to-[#6366f1]',
  },
  {
    number: '06',
    title: 'Build & Integration',
    description: 'ERC standards, EIP process, frameworks (Hardhat / Foundry), 17-platform comparison, integration patterns, and AI-driven development.',
    path: `${BASE}/section-6`,
    gradient: 'from-[#6366f1] to-[#22d3ee]',
  },
  {
    number: '07',
    title: 'Team Project',
    description: 'Design a smart contract business application, map stakeholders, identify risks, and present your case to the class.',
    path: `${BASE}/section-7`,
    gradient: 'from-[#39B54A] to-[#6366f1]',
  },
  {
    number: '🏁',
    title: 'Conclusion',
    description: 'Smart contracts are not magic — they are code. Their power and their risk come from the same source.',
    path: `${BASE}/conclusion`,
    gradient: 'from-[#6366f1] to-[#ED1C24]',
  },
];

export function SmartContractsHome() {
  return (
    <div className="size-full overflow-y-auto">
      {/* Hero */}
      <div className="min-h-screen flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 right-1/4 size-96 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] opacity-15 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] opacity-15 blur-3xl rounded-full" />

        <div className="relative z-10 text-center max-w-5xl">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Blockchain.pt" className="h-36 object-contain" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 mb-6">
            <span className="text-xs font-bold text-[#6366f1] tracking-widest uppercase">Course 02</span>
          </div>

          <h1 className="text-5xl font-black text-foreground mb-3">
            Business Applications<br />for Smart Contracts
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            From theory to industry disruption — understand what smart contracts can and cannot do for your business.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { label: '7 Sections' },
              { label: '90+ Slides' },
              { label: '5 Industry Verticals' },
              { label: '8 Case Studies' },
              { label: '7 Interactive Demos' },
            ].map(b => (
              <div key={b.label} className="px-4 py-2 bg-card rounded-lg border border-border">
                <span className="text-sm text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>

          <Link
            to={`${BASE}/section-1`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#6366f1]/30 transition-all"
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
              className="group bg-card border border-border rounded-xl p-6 hover:border-[#6366f1] transition-all hover:shadow-lg hover:shadow-[#6366f1]/10"
            >
              <div className={`size-12 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4`}>
                <span className="text-white font-bold">{section.number}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#6366f1] transition-colors">
                {section.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              <div className="flex items-center gap-2 text-[#6366f1] text-sm font-bold">
                Explore
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Instructor */}
      <div className="max-w-7xl mx-auto px-12 py-16 border-t border-border">
        <h2 className="text-4xl font-bold text-foreground mb-3">Meet the Instructor</h2>
        <p className="text-muted-foreground mb-10">The person behind this course</p>

        <div className="max-w-4xl">
          <TeacherCard {...shayan} />
        </div>
      </div>
    </div>
  );
}
