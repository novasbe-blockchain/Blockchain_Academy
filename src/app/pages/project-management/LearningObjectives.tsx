import { TitleSlide } from '../../components/templates/TitleSlide';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { GraduationCap, CheckCircle, RefreshCw, ShieldAlert, Map, MessageSquare } from 'lucide-react';

const objectives = [
  {
    icon: <CheckCircle className="size-6 text-[#f97316]" />,
    title: "Understand Key Considerations for Blockchain PM",
    description: "Understand the key considerations for successful project management in blockchain development — including irreversibility, multi-stakeholder governance, regulatory complexity, and the unique team composition blockchain projects require.",
    color: "#f97316",
  },
  {
    icon: <RefreshCw className="size-6 text-[#eab308]" />,
    title: "Apply Traditional PM Methodologies to Blockchain",
    description: "Apply traditional project management methodologies — Agile, Waterfall, and hybrid approaches — to blockchain projects, adapting each to the specific constraints of on-chain irreversibility and decentralized delivery.",
    color: "#eab308",
  },
  {
    icon: <ShieldAlert className="size-6 text-[#ef4444]" />,
    title: "Identify and Mitigate Blockchain Project Risks",
    description: "Identify and mitigate potential risks associated with blockchain development projects — including technical vulnerabilities, regulatory exposure, adoption failure, and smart contract security — using structured risk frameworks.",
    color: "#ef4444",
  },
  {
    icon: <Map className="size-6 text-[#22d3ee]" />,
    title: "Develop a Tailored Blockchain Project Plan",
    description: "Develop a project plan tailored to a specific blockchain initiative — covering scope definition, stakeholder mapping, milestone structure, governance design, and the go/no-go gates that protect against irreversible deployment errors.",
    color: "#22d3ee",
  },
  {
    icon: <MessageSquare className="size-6 text-[#8b5cf6]" />,
    title: "Utilize Communication & Collaboration Tools Effectively",
    description: "Utilize communication and collaboration tools effectively for managing blockchain teams — translating technical complexity for business stakeholders, applying the DACI framework, and managing distributed, cross-functional, and open-source contributors.",
    color: "#8b5cf6",
  },
];

export function PM_LearningObjectives() {
  return (
    <div className="size-full overflow-y-auto">
      <div className="min-h-screen">
        {/* Title */}
        <div className="h-screen">
          <TitleSlide
            sectionNumber="BEFORE WE BEGIN"
            title="Learning Objectives"
            subtitle="What you will learn in this course"
            icon={<GraduationCap className="size-20 text-[#f97316]" />}
            gradient="from-[#f97316] to-[#eab308]"
          />
        </div>

        {/* Objectives Grid */}
        <div className="h-screen flex items-center justify-center p-12">
          <div className="max-w-5xl w-full">
            <h2 className="text-4xl font-bold text-foreground mb-3 text-center">By the End of This Course</h2>
            <p className="text-lg text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
              You will be able to plan, manage, and lead blockchain projects — with the tools to navigate technical complexity, stakeholder diversity, and organizational change.
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
      <SiteFooter className="snap-start" />
    </div>
  );
}
