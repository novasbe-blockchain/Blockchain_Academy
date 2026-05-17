import { TitleSlide } from '../components/templates/TitleSlide';
import { Link } from 'react-router';
import { Map, ScrollText, Blocks, Bitcoin, Rocket, ArrowRight } from 'lucide-react';

const courseSections = [
  {
    number: "00",
    label: "PROLOGUE",
    title: "The History of Blockchain",
    description: "From the cypherpunk movement to the birth of Bitcoin — the ideological and technical foundations that made decentralized money possible.",
    path: "/blockchain-fundamentals/prologue",
    icon: <ScrollText className="size-6 text-white" />,
    gradient: "from-[#8b5cf6] to-[#6366f1]",
    borderColor: "#8b5cf6",
  },
  {
    number: "01",
    label: "SECTION 1",
    title: "Introduction to Blockchain Technology",
    description: "DLT, hashing, Merkle trees, blocks, wallets, digital signatures, transactions, and consensus mechanisms — all the building blocks explained.",
    path: "/blockchain-fundamentals/section-1",
    icon: <Blocks className="size-6 text-white" />,
    gradient: "from-[#ED1C24] to-[#39B54A]",
    borderColor: "#ED1C24",
  },
  {
    number: "02",
    label: "SECTION 2",
    title: "Bitcoin and Beyond",
    description: "Why Bitcoin was a breakthrough, its supply model, network mechanics, node distribution, security model, and the Lightning Network.",
    path: "/blockchain-fundamentals/section-2",
    icon: <Bitcoin className="size-6 text-white" />,
    gradient: "from-[#f59e0b] to-[#ED1C24]",
    borderColor: "#f59e0b",
  },
  {
    number: "03",
    label: "SECTION 3",
    title: "What's Next for Blockchain?",
    description: "Real-world impact, Web3 evolution, ethical considerations, energy consumption, and future trends shaping the next decade.",
    path: "/blockchain-fundamentals/section-3",
    icon: <Rocket className="size-6 text-white" />,
    gradient: "from-[#39B54A] to-[#22d3ee]",
    borderColor: "#39B54A",
  },
];

export function CourseSummary() {
  return (
    <div id="section-scroll" className="size-full overflow-y-auto snap-y snap-mandatory">
      <div>
        {/* Title */}
        <div className="h-screen snap-start">
          <TitleSlide
            sectionNumber="OVERVIEW"
            title="Course Summary"
            subtitle="Your roadmap through blockchain technology"
            icon={<Map className="size-20 text-[#39B54A]" />}
            gradient="from-[#39B54A] to-[#ED1C24]"
          />
        </div>

        {/* Course Map */}
        <div className="h-screen snap-start flex items-center justify-center p-12">
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-bold text-foreground mb-2 text-center">Course Roadmap</h2>
            <p className="text-muted-foreground mb-10 text-center">Four parts. One coherent journey from history to the future.</p>

            <div className="relative space-y-5">
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[#8b5cf6] via-[#ED1C24] via-[#f59e0b] to-[#39B54A]" />

              {courseSections.map((section, i) => (
                <Link
                  key={i}
                  to={section.path}
                  className="relative flex items-start gap-5 p-5 bg-card rounded-xl border border-border hover:shadow-lg hover:border-opacity-50 transition-all group"
                  style={{ borderLeftWidth: 4, borderLeftColor: section.borderColor }}
                >
                  {/* Number dot */}
                  <div
                    className={`size-12 rounded-full bg-gradient-to-br ${section.gradient} flex items-center justify-center shrink-0 z-10`}
                  >
                    {section.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-muted-foreground tracking-wider">{section.label}</span>
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-[#ED1C24] transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                  </div>

                  <ArrowRight className="size-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-[#ED1C24] transition-all shrink-0 self-center" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
