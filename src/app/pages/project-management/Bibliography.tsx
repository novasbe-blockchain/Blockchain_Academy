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
  // Must-Reads
  {
    title: "The Truth About Blockchain — Harvard Business Review",
    url: "https://hbr.org/2017/01/the-truth-about-blockchain",
    description: "The landmark HBR piece by Iansiti & Lakhani that framed blockchain as a foundational technology — not a disruption. Compares it to TCP/IP and explains why adoption is slow and deliberate. Essential strategic framing for any PM.",
    tag: "Must-Read",
    tagColor: "#f97316",
  },
  {
    title: "Blockchain in Project Management — PMI",
    url: "https://www.pmi.org/learning/library/blockchain-technology-considerations-project-management-11564",
    description: "The Project Management Institute's official take on how blockchain affects PM practice — including smart contract automation, decentralized governance, and what changes for the project manager's role.",
    tag: "Must-Read",
    tagColor: "#f97316",
  },
  {
    title: "WEF — Building Value with Blockchain Technology",
    url: "https://www.weforum.org/reports/building-value-with-blockchain-technology",
    description: "World Economic Forum report examining how organizations create value with blockchain. Includes implementation roadmaps, governance models, and lessons from real enterprise deployments.",
    tag: "Must-Read",
    tagColor: "#f97316",
  },

  // Frameworks
  {
    title: "The Scrum Guide — Schwaber & Sutherland",
    url: "https://www.scrumguides.org/scrum-guide.html",
    description: "The authoritative 13-page definition of Scrum. Free and short. Understanding Scrum is a prerequisite for leading any agile blockchain development team — sprints, standups, retrospectives, and product backlogs.",
    tag: "Framework",
    tagColor: "#6366f1",
  },
  {
    title: "SAFe — Scaled Agile Framework",
    url: "https://scaledagileframework.com/",
    description: "The most widely adopted framework for scaling Agile across large organizations. Directly applicable to enterprise blockchain programs with multiple workstreams, vendors, and regulatory stakeholders.",
    tag: "Framework",
    tagColor: "#6366f1",
  },
  {
    title: "Hyperledger Project Governance",
    url: "https://www.hyperledger.org/participate/governance",
    description: "How the Linux Foundation governs open-source blockchain projects — technical steering committees, contributor models, and decision-making protocols. A practical reference for anyone running a consortium blockchain initiative.",
    tag: "Framework",
    tagColor: "#6366f1",
  },
  {
    title: "PMBOK Guide — Project Management Institute",
    url: "https://www.pmi.org/pmbok-guide-standards",
    description: "The global standard for project management practice. The 7th edition shifts to a principles-based model aligned with agile thinking. The foundational reference for any serious blockchain PM.",
    tag: "Framework",
    tagColor: "#6366f1",
  },

  // Books
  {
    title: "Blockchain Revolution — Don Tapscott & Alex Tapscott",
    url: "https://dontapscott.com/books/blockchain-revolution/",
    description: "The definitive business-layer introduction to blockchain. Covers the strategic implications for organizations, industries, and society. The go-to primer for executives and PMs who need to communicate blockchain value without technical jargon.",
    tag: "Book",
    tagColor: "#8b5cf6",
  },
  {
    title: "The Lean Startup — Eric Ries",
    url: "https://theleanstartup.com/",
    description: "Not blockchain-specific, but indispensable for blockchain PMs. The Build-Measure-Learn cycle and MVP thinking are critical when navigating uncertain, experimental blockchain projects where requirements shift constantly.",
    tag: "Book",
    tagColor: "#8b5cf6",
  },
  {
    title: "Cryptoassets — Chris Burniske & Jack Tatar",
    url: "https://www.amazon.com/Cryptoassets-Innovative-Investors-Bitcoin-Beyond/dp/1260026671",
    description: "The framework for classifying and evaluating crypto assets as a new asset class. Useful for PMs who need to understand tokenomics, valuation models, and how token design affects project governance and incentives.",
    tag: "Book",
    tagColor: "#8b5cf6",
  },
  {
    title: "Enterprise Blockchain Projects — Singhal, Dhameja, Panda",
    url: "https://www.packtpub.com/product/enterprise-blockchain-projects/9781789396607",
    description: "A hands-on guide to building and deploying enterprise blockchain solutions using Hyperledger Fabric, Ethereum, and Corda. Bridges technical implementation with business requirements — exactly the PM's domain.",
    tag: "Book",
    tagColor: "#8b5cf6",
  },

  // Courses
  {
    title: "Blockchain Specialization — Coursera (INSEAD)",
    url: "https://www.coursera.org/specializations/blockchain",
    description: "A four-course specialization covering blockchain fundamentals, smart contracts, and decentralized applications. Provides the technical literacy a blockchain PM needs to communicate with developers and evaluate project risks.",
    tag: "Course",
    tagColor: "#ED1C24",
  },
  {
    title: "Hyperledger Training & Certification",
    url: "https://training.hyperledger.org/",
    description: "Official training from the Hyperledger Foundation. Covers Fabric, Besu, and enterprise blockchain concepts. Recommended for PMs leading permissioned blockchain initiatives in regulated industries.",
    tag: "Course",
    tagColor: "#ED1C24",
  },

  // Research
  {
    title: "Deloitte — Blockchain Risk Management",
    url: "https://www2.deloitte.com/us/en/pages/financial-services/articles/blockchain-risk-management.html",
    description: "Deloitte's risk framework for blockchain programs — covering technical vulnerabilities, governance gaps, regulatory uncertainty, and operational continuity. The most comprehensive risk reference for enterprise blockchain PMs.",
    tag: "Research",
    tagColor: "#f59e0b",
  },
  {
    title: "BCG — Blockchain Primer for Business",
    url: "https://www.bcg.com/publications/2017/blockchain-primer",
    description: "Boston Consulting Group's foundational primer on blockchain for business leaders. Covers the strategic decision of when (and when not) to use blockchain — a critical scoping tool for PMs evaluating project viability.",
    tag: "Research",
    tagColor: "#f59e0b",
  },
  {
    title: "Electric Capital Developer Report",
    url: "https://www.developerreport.com/",
    description: "Annual data-driven report on blockchain developer activity across all ecosystems. Useful for understanding talent market trends, ecosystem momentum, and vendor selection risk when planning a blockchain initiative.",
    tag: "Research",
    tagColor: "#f59e0b",
  },
  {
    title: "Gartner — Blockchain Research & Hype Cycle",
    url: "https://www.gartner.com/en/topics/blockchain",
    description: "Gartner's ongoing blockchain research, including the famous Hype Cycle reports. Essential for calibrating executive expectations and setting realistic timelines in a technology that has historically been over-promised.",
    tag: "Research",
    tagColor: "#f59e0b",
  },

  // Case Studies
  {
    title: "Hyperledger Case Studies",
    url: "https://www.hyperledger.org/learn/case-studies",
    description: "Real-world enterprise blockchain deployments across supply chain, healthcare, finance, and government — documented with technical details and business outcomes. A must-read before scoping any enterprise blockchain project.",
    tag: "Case Study",
    tagColor: "#39B54A",
  },
  {
    title: "ConsenSys Enterprise Case Studies",
    url: "https://consensys.io/case-studies",
    description: "Enterprise Ethereum deployments across capital markets, supply chain, and digital identity — from ConsenSys, the largest Ethereum dev studio. Includes detailed implementation approaches and lessons learned.",
    tag: "Case Study",
    tagColor: "#39B54A",
  },
  {
    title: "IBM Blockchain — Industry Case Studies",
    url: "https://www.ibm.com/blockchain/industries",
    description: "IBM's portfolio of enterprise blockchain deployments — including TradeLens (supply chain), Food Trust (traceability), and financial services platforms. Strong documentation of project structure and business value achieved.",
    tag: "Case Study",
    tagColor: "#39B54A",
  },

  // Tools
  {
    title: "GitHub Projects — Agile PM for Developer Teams",
    url: "https://github.com/features/project-management",
    description: "GitHub's native project management layer with boards, roadmaps, and issue tracking. Particularly effective for blockchain projects where PMs need to stay close to the code repository and development workflow.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
  {
    title: "Linear — Modern Project Management",
    url: "https://linear.app/",
    description: "The project management tool of choice for fast-moving tech teams. Tight GitHub integration, sprints, and roadmaps — well-suited for lean blockchain development teams running agile delivery cycles.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
  {
    title: "Notion — Documentation for Blockchain Projects",
    url: "https://www.notion.com/",
    description: "Flexible workspace for project wikis, decision logs, stakeholder registers, and governance documentation. Widely used by blockchain teams for cross-functional collaboration and knowledge management.",
    tag: "Tool",
    tagColor: "#22d3ee",
  },
];

const ALL_TAGS = ['All', ...Array.from(new Set(resources.map(r => r.tag)))];

const TAG_COLORS: Record<string, string> = Object.fromEntries(
  resources.map(r => [r.tag, r.tagColor])
);

export function PM_Bibliography() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filtered = activeFilter === 'All'
    ? resources
    : resources.filter(r => r.tag === activeFilter);

  return (
    <div className="size-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 mb-4">
            <span className="text-[#f97316] font-bold">📖 Bibliography</span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Resources to Keep Learning
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of frameworks, books, research reports, case studies, and tools
            to deepen your practice in blockchain project management.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {ALL_TAGS.map(tag => {
            const isActive = activeFilter === tag;
            const color = tag === 'All' ? '#f97316' : TAG_COLORS[tag];
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
              className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-[#f97316]/50 hover:shadow-lg transition-all group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold text-foreground group-hover:text-[#f97316] transition-colors">
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
              <ExternalLink className="size-5 text-muted-foreground group-hover:text-[#f97316] flex-shrink-0 mt-1 transition-colors" />
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            "The most dangerous kind of waste is the waste we do not recognize." — Shigeo Shingo
          </p>
        </div>
      </div>
      <SiteFooter className="snap-start" />
    </div>
  );
}
