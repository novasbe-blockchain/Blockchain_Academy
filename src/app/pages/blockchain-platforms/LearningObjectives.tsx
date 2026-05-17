import { TitleSlide } from '../../components/templates/TitleSlide';
import { GraduationCap, Coins, Cpu, Building2, Scale, Network } from 'lucide-react';

const objectives = [
  {
    icon: <Coins className="size-6 text-[#f59e0b]" />,
    title: "Bitcoin: The First Permissionless Blockchain",
    description: "Map Bitcoin's four-layer architecture, explain the UTXO transaction model, understand Proof of Work and the halving schedule, and analyze Bitcoin's trilemma trade-offs.",
    color: "#f59e0b",
  },
  {
    icon: <Cpu className="size-6 text-[#627EEA]" />,
    title: "Ethereum: Programmable Blockchain",
    description: "Explain Ethereum accounts, the EVM execution model, smart contract deployment, and the Proof of Work → Proof of Stake transition and its implications.",
    color: "#627EEA",
  },
  {
    icon: <Building2 className="size-6 text-[#39B54A]" />,
    title: "Permissioned Blockchains: Hyperledger Fabric",
    description: "Understand why enterprises choose permissioned blockchains, how channels and endorsement policies work, and where Hyperledger Fabric fits in the supply chain.",
    color: "#39B54A",
  },
  {
    icon: <Scale className="size-6 text-[#8b5cf6]" />,
    title: "Comparing Platforms & the Trilemma",
    description: "Apply the Blockchain Trilemma framework to compare Bitcoin, Ethereum, and Hyperledger — identifying which properties each platform prioritizes and sacrifices.",
    color: "#8b5cf6",
  },
  {
    icon: <Network className="size-6 text-[#22d3ee]" />,
    title: "Interoperability & Emerging Trends",
    description: "Explore cross-chain communication protocols (Cosmos, IBC), Layer 0 architectures, ZK-rollup platforms like Starknet, and the future of blockchain interoperability.",
    color: "#22d3ee",
  },
];

export function BP_LearningObjectives() {
  return (
    <div id="section-scroll" className="size-full overflow-y-auto snap-y snap-mandatory">
      <div>
        {/* Title */}
        <div className="h-screen snap-start flex flex-col">
          <TitleSlide
            sectionNumber="BEFORE WE BEGIN"
            title="Learning Objectives"
            subtitle="What you will learn in this course"
            icon={<GraduationCap className="size-20 text-[#39B54A]" />}
          />
        </div>

        {/* Objectives Grid */}
        <div className="h-screen snap-start flex items-center justify-center p-12">
          <div className="max-w-5xl w-full">
            <h2 className="text-4xl font-bold text-foreground mb-3 text-center">By the End of This Course</h2>
            <p className="text-lg text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
              You will be able to compare, evaluate, and select blockchain platforms based on their architecture, consensus models, and real-world trade-offs.
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
