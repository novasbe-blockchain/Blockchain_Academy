import { TitleSlide } from '../components/templates/TitleSlide';
import { GraduationCap, Target, BookOpen, TrendingUp, AlertTriangle, Globe } from 'lucide-react';

const objectives = [
  {
    icon: <BookOpen className="size-6 text-[#ED1C24]" />,
    title: "Core Blockchain Concepts",
    description: "Understand the fundamentals: DLT, hashing, cryptography, transactions, wallets, digital signatures, and consensus mechanisms.",
    color: "#ED1C24",
  },
  {
    icon: <TrendingUp className="size-6 text-[#39B54A]" />,
    title: "Evolution & Applications",
    description: "Trace the history from cypherpunks to Bitcoin, and understand how blockchain evolved into the industry it is today.",
    color: "#39B54A",
  },
  {
    icon: <Target className="size-6 text-[#6366f1]" />,
    title: "Benefits & Advantages",
    description: "Identify blockchain's key strengths: transparency, immutability, decentralization, censorship resistance, and trustless operation.",
    color: "#6366f1",
  },
  {
    icon: <Globe className="size-6 text-[#f59e0b]" />,
    title: "Real-World Impact",
    description: "Analyze which industries are being transformed by blockchain — from finance and supply chain to healthcare and digital identity.",
    color: "#f59e0b",
  },
  {
    icon: <AlertTriangle className="size-6 text-[#8b5cf6]" />,
    title: "Challenges & Limitations",
    description: "Evaluate the key obstacles blockchain still faces: scalability, energy consumption, regulation, usability, and ethical concerns.",
    color: "#8b5cf6",
  },
];

export function LearningObjectives() {
  return (
    <div id="section-scroll" className="size-full overflow-y-auto snap-y snap-mandatory">
      <div>
        {/* Title */}
        <div className="h-screen snap-start flex flex-col">
          <TitleSlide
            sectionNumber="BEFORE WE BEGIN"
            title="Learning Objectives"
            subtitle="What you will learn in this course"
            icon={<GraduationCap className="size-20 text-[#ED1C24]" />}
          />
        </div>

        {/* Objectives Grid */}
        <div className="h-screen snap-start flex items-center justify-center p-12">
          <div className="max-w-5xl w-full">
            <h2 className="text-4xl font-bold text-foreground mb-3 text-center">By the End of This Course</h2>
            <p className="text-lg text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
              You will be able to understand, explain, and critically analyze blockchain technology — its mechanics, its promise, and its limits.
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
