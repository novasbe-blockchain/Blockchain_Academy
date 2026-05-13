import { TitleSlide } from '../../components/templates/TitleSlide';
import { GraduationCap, Code2, Layers, Building2, Brain, AlertTriangle, Wrench, Users } from 'lucide-react';

const objectives = [
  {
    icon: <Code2 className="size-6 text-[#6366f1]" />,
    title: "Smart Contract Fundamentals",
    description: "Define smart contracts and explain self-execution, immutability, and the evolution from Szabo's 1994 concept through Bitcoin Scripts to Ethereum's programmable blockchain.",
    color: "#6366f1",
  },
  {
    icon: <Layers className="size-6 text-[#8b5cf6]" />,
    title: "How Smart Contracts Work",
    description: "Map the Web3 stack, explain gas economics, distinguish dApp architecture from traditional systems, and identify when smart contracts genuinely add value over a database.",
    color: "#8b5cf6",
  },
  {
    icon: <Building2 className="size-6 text-[#22d3ee]" />,
    title: "Industries & Case Studies",
    description: "Tour five industry verticals (DeFi, Gaming/NFTs, RWA, Supply Chain, Digital Cert) plus eight case studies including Walmart, Santander, Estonia, The DAO hack, and the ASX failure.",
    color: "#22d3ee",
  },
  {
    icon: <Brain className="size-6 text-[#6366f1]" />,
    title: "Critical Thinking & Adoption",
    description: "Apply a decision framework to determine when a smart contract is the right tool — and when a database is better. Master the 5-pillar adoption model for serious deployment.",
    color: "#6366f1",
  },
  {
    icon: <AlertTriangle className="size-6 text-[#ED1C24]" />,
    title: "Limitations & Security",
    description: "Understand the oracle problem, the blockchain trilemma, key attack vectors (reentrancy, flash loans, MEV), and the cost & regulatory realities that gate mainstream adoption.",
    color: "#ED1C24",
  },
  {
    icon: <Wrench className="size-6 text-[#22d3ee]" />,
    title: "Build & Integration",
    description: "Navigate ERC standards, the EIP process, frameworks (Hardhat / Foundry), 17-platform comparison, integration patterns, and where AI tools belong in smart-contract development.",
    color: "#22d3ee",
  },
  {
    icon: <Users className="size-6 text-[#39B54A]" />,
    title: "Business Application Design",
    description: "Apply course knowledge to design a smart contract solution: map stakeholders, identify use cases, weigh trade-offs, and present a business case to the class.",
    color: "#39B54A",
  },
];

export function SC_LearningObjectives() {
  return (
    <div className="size-full overflow-y-auto">
      <div className="min-h-screen">
        {/* Title */}
        <div className="h-screen">
          <TitleSlide
            sectionNumber="BEFORE WE BEGIN"
            title="Learning Objectives"
            subtitle="What you will learn in this course"
            icon={<GraduationCap className="size-20 text-[#6366f1]" />}
          />
        </div>

        {/* Objectives Grid */}
        <div className="h-screen flex items-center justify-center p-12">
          <div className="max-w-5xl w-full">
            <h2 className="text-4xl font-bold text-foreground mb-3 text-center">By the End of This Course</h2>
            <p className="text-lg text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
              You will be able to understand, evaluate, and design business applications using smart contract technology — its mechanics, its use cases, and its limits.
            </p>

            <div className="space-y-4">
              {objectives.map((obj, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 p-5 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow"
                  style={{ borderLeftWidth: 4, borderLeftColor: obj.color }}
                >
                  <div
                    className="size-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${obj.color}20` }}
                  >
                    {obj.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{obj.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
