import { Link } from 'react-router';
import { ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { BrandLogo } from '../../components/shared/BrandLogo';
import { SiteFooter } from '../../components/shared/SiteFooter';

const BASE = '/project-management';

const sections = [
  {
    number: '01',
    title: 'Introduction to Blockchain Project Management',
    description: 'What makes blockchain projects unique, the project lifecycle, key roles, and the Agile vs Waterfall debate for decentralized teams.',
    path: `${BASE}/section-1`,
    gradient: 'from-[#f97316] to-[#eab308]',
  },
  {
    number: '02',
    title: 'Project Planning & Scoping for Blockchain',
    description: 'Decision frameworks, scope definition, stakeholder mapping, work breakdown structures, and governance models.',
    path: `${BASE}/section-2`,
    gradient: 'from-[#eab308] to-[#f97316]',
  },
  {
    number: '03',
    title: 'Risk Management in Blockchain Projects',
    description: 'Technical, regulatory, and adoption risks — with assessment frameworks, smart contract audit processes, and mitigation strategies.',
    path: `${BASE}/section-3`,
    gradient: 'from-[#f97316] to-[#ef4444]',
  },
  {
    number: '04',
    title: 'Communication & Collaboration for Blockchain Teams',
    description: 'Multi-stakeholder communication, translating technical to business, documentation practices, and decentralized governance.',
    path: `${BASE}/section-4`,
    gradient: 'from-[#eab308] to-[#22d3ee]',
  },
  {
    number: '05',
    title: 'Leading Blockchain Project Teams',
    description: 'Team composition, leadership in decentralized contexts, Agile ceremonies, change management, and measuring project success.',
    path: `${BASE}/section-5`,
    gradient: 'from-[#f97316] to-[#8b5cf6]',
  },
  {
    number: '🏁',
    title: 'Conclusion',
    description: 'The blockchain PM is not just a project manager — they are the translator between the technical and the human.',
    path: `${BASE}/conclusion`,
    gradient: 'from-[#f97316] to-[#ED1C24]',
  },
];

export function ProjectManagementHome() {
  return (
    <div className="size-full overflow-y-auto">
      {/* Hero */}
      <div className="min-h-screen flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 right-1/4 size-96 bg-gradient-to-br from-[#f97316] to-[#eab308] opacity-15 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-gradient-to-br from-[#eab308] to-[#f97316] opacity-15 blur-3xl rounded-full" />

        <div className="relative z-10 text-center max-w-5xl">
          <div className="flex justify-center mb-8">
            <BrandLogo className="h-36" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 mb-6">
            <span className="text-xs font-bold text-[#f97316] tracking-widest uppercase">Course 04</span>
          </div>

          <h1 className="text-5xl font-black text-foreground mb-3">
            Project Management for<br />Blockchain Initiatives
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Plan, execute, and lead blockchain projects — bridging technical complexity and business outcomes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {[
              { label: '5 Sessions' },
              { label: 'Risk Frameworks' },
              { label: 'Stakeholder Tools' },
              { label: 'Leadership Models' },
            ].map(b => (
              <div key={b.label} className="px-4 py-2 bg-card rounded-lg border border-border">
                <span className="text-sm text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>

          <Link
            to={`${BASE}/section-1`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f97316] to-[#eab308] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#f97316]/30 transition-all"
          >
            Start Learning
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>

      {/* Sections Overview */}
      <div className="max-w-7xl mx-auto px-12 py-16">
        <h2 className="text-4xl font-bold text-foreground mb-12">Course Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.number}
              to={section.path}
              className="group bg-card border border-border rounded-xl p-6 hover:border-[#f97316] transition-all hover:shadow-lg hover:shadow-[#f97316]/10"
            >
              <div className={`size-12 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4`}>
                <span className="text-white font-bold">{section.number}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#f97316] transition-colors">
                {section.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              <div className="flex items-center gap-2 text-[#f97316] text-sm font-bold">
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

        <div className="max-w-2xl bg-card border border-border rounded-2xl p-6 flex gap-6 items-start">
          <div className="size-20 rounded-full bg-gradient-to-br from-[#f97316] to-[#eab308] flex items-center justify-center shrink-0 text-white text-2xl font-black">
            PG
          </div>
          <div>
            <div className="text-xs font-bold text-[#f97316] tracking-widest mb-1">INSTRUCTOR</div>
            <h3 className="text-xl font-black text-foreground mb-0.5">Pedro Granate</h3>
            <p className="text-sm text-[#f97316] font-medium mb-3">
              Co-founder, COO & CPO · Zharta
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { label: 'Education', value: 'MSc Mechanical Engineering, IST' },
                { label: 'Experience', value: '10+ years PM & Operations' },
                { label: 'Industry', value: 'Engineering · Manufacturing · Tech' },
              ].map(h => (
                <div key={h.label} className="px-3 py-1 bg-[#f97316]/10 border border-[#f97316]/20 rounded-full">
                  <span className="text-xs text-muted-foreground">{h.label}: </span>
                  <span className="text-xs font-semibold text-[#f97316]">{h.value}</span>
                </div>
              ))}
            </div>

            <ul className="space-y-1.5 mb-4">
              {[
                'MSc in Mechanical Engineering from IST (Instituto Superior Técnico)',
                'Development Engineer at Bosch Termotecnologia',
                'Project Manager in production & development roles',
                'Project Manager at Hovione (CMO context)',
                'Co-founder, COO & CPO at Zharta — product and operational strategy',
              ].map(h => (
                <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-[#f97316] shrink-0">•</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a
                href="mailto:pedro@zharta.com"
                className="inline-flex items-center gap-1.5 text-sm text-[#f97316] font-medium hover:underline"
              >
                <Mail className="size-3.5" />
                pedro@zharta.com
              </a>
              <a
                href="https://www.linkedin.com/in/pedrogranate/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[#f97316] font-medium hover:underline"
              >
                <ExternalLink className="size-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
