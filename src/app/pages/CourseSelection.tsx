import { Link } from 'react-router';
import { ArrowRight, Lock } from 'lucide-react';
import logo from '../../blockchainptlogo.jpeg';

interface Course {
  number: string;
  title: string;
  description: string;
  topics: string[];
  gradient: string;
  accentColor: string;
  path: string;
  available: boolean;
}

const courses: Course[] = [
  {
    number: '01',
    title: 'Blockchain Fundamentals',
    description: 'Understand how blockchain technology works from the ground up — cryptography, consensus, Bitcoin, and the Web3 ecosystem.',
    topics: ['DLT & Hashing', 'Bitcoin & Mining', 'Wallets & Transactions', 'Consensus Mechanisms', 'Web3 & dApps'],
    gradient: 'from-[#ED1C24] to-[#f59e0b]',
    accentColor: '#ED1C24',
    path: '/blockchain-fundamentals',
    available: true,
  },
  {
    number: '02',
    title: 'Blockchain Platforms',
    description: 'Bitcoin, Ethereum, Hyperledger Fabric, and interoperability — understand the trade-offs of each platform and when to use which.',
    topics: ['Bitcoin Architecture', 'Ethereum & EVM', 'Hyperledger Fabric', 'Interoperability', 'Cosmos & Layer 0'],
    gradient: 'from-[#39B54A] to-[#22d3ee]',
    accentColor: '#39B54A',
    path: '/blockchain-platforms',
    available: true,
  },
  {
    number: '03',
    title: 'Business Applications for Smart Contracts',
    description: 'From theory to industry disruption — understand what smart contracts can and cannot do for your business, with real case studies and a team project.',
    topics: ['Smart Contract Fundamentals', 'EVM & Web3 Landscape', 'Case Studies', 'Oracle Problem', 'Team Project'],
    gradient: 'from-[#6366f1] to-[#8b5cf6]',
    accentColor: '#6366f1',
    path: '/smart-contracts',
    available: true,
  },
  {
    number: '04',
    title: 'Project Management for Blockchain Initiatives',
    description: 'Plan, execute, and lead blockchain projects — from scoping and governance to risk management, team leadership, and measuring success.',
    topics: ['Project Lifecycle', 'Scope & Governance', 'Risk & Audits', 'Communication', 'Team Leadership'],
    gradient: 'from-[#f97316] to-[#eab308]',
    accentColor: '#f97316',
    path: '/project-management',
    available: true,
  },
];

export function CourseSelection() {
  return (
    <div className="size-full overflow-y-auto">
      {/* Hero */}
      <div className="min-h-screen flex flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(237,28,36,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(237,28,36,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 right-1/4 size-96 bg-gradient-to-br from-[#ED1C24] to-[#6366f1] opacity-10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-gradient-to-br from-[#39B54A] to-[#f59e0b] opacity-10 blur-3xl rounded-full" />

        <div className="relative z-10 w-full max-w-5xl">
          {/* Logo + Academy title */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Blockchain Academy" className="h-24 object-contain" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-foreground mb-4">
              Blockchain Academy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four courses. One complete mastery path. Choose where to begin.
            </p>
          </div>

          {/* Course cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              course.available ? (
                <Link
                  key={course.number}
                  to={course.path}
                  className="group relative bg-card border border-border rounded-2xl p-6 flex flex-col hover:shadow-xl transition-all hover:-translate-y-1"
                  style={{ '--accent': course.accentColor } as React.CSSProperties}
                >
                  {/* Number badge */}
                  <div className={`size-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-white font-black text-lg">{course.number}</span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-[--accent] transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5 flex-1">
                    {course.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.topics.map(t => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                        style={{ color: course.accentColor, borderColor: course.accentColor + '40', backgroundColor: course.accentColor + '10' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 font-bold text-sm" style={{ color: course.accentColor }}>
                    Start Course
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Active glow border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${course.accentColor}60` }}
                  />
                </Link>
              ) : (
                <div
                  key={course.number}
                  className="relative bg-card/50 border border-border rounded-2xl p-6 flex flex-col opacity-60 select-none"
                >
                  {/* Lock badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border">
                    <Lock className="size-3 text-muted-foreground" />
                    <span className="text-[10px] font-semibold text-muted-foreground">Coming Soon</span>
                  </div>

                  <div className={`size-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-4 opacity-50`}>
                    <span className="text-white font-black text-lg">{course.number}</span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-2">{course.title}</h2>
                  <p className="text-sm text-muted-foreground mb-5 flex-1">{course.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.topics.map(t => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                    <Lock className="size-4" />
                    Not yet available
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
