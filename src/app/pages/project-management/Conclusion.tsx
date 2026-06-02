import { TitleSlide } from '../../components/templates/TitleSlide';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { Flag } from 'lucide-react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function PM_Conclusion() {
  return (
    <div className="h-full w-full overflow-y-auto snap-y snap-mandatory">
      <div className="slide-flow">

      {/* ═══════ CONCLUSION SLIDE ═══════ */}
      <div className="h-full">
        <TitleSlide
          sectionNumber="CONCLUSION"
          title="The PM Is the Bridge"
          subtitle="Between the irreversible and the intended. Between the technical and the human. Between the chain and the organization."
          icon={<Flag className="size-20 text-[#f97316]" />}
          gradient="from-[#f97316] to-[#8b5cf6]"
        />
      </div>

      {/* ═══════ FINAL THOUGHT ═══════ */}
      <div className="h-full flex flex-col items-center justify-center p-8 lg:p-16">
        <div className="max-w-3xl w-full text-center">

          <div className="text-6xl mb-8">🔗</div>

          <blockquote className="text-2xl lg:text-3xl font-black text-foreground leading-snug mb-6">
            "The blockchain project manager does not write the code.
            <br />
            <span className="text-[#f97316]">They make sure that the right code gets written,</span>
            <br />
            <span className="text-[#8b5cf6]">audited, and deployed — safely, once."</span>
          </blockquote>

          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            In a world where mistakes are permanent and trust is programmatic, the PM's job is not just delivery.
            It is the governance layer between human intent and immutable execution.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {[
              { name: 'Plan', tag: 'Scope & govern before you build', color: '#eab308', emoji: '📋' },
              { name: 'Audit', tag: 'Security is a gate, not a check', color: '#ef4444', emoji: '🔐' },
              { name: 'Communicate', tag: 'Translate across every boundary', color: '#22d3ee', emoji: '💬' },
              { name: 'Lead', tag: 'Match style to the context', color: '#8b5cf6', emoji: '🎯' },
              { name: 'Measure', tag: 'Define success before you start', color: '#f97316', emoji: '📈' },
            ].map(p => (
              <div key={p.name} className="bg-card border border-border rounded-xl p-4 text-center" style={{ borderColor: p.color + '40' }}>
                <div className="text-2xl mb-2">{p.emoji}</div>
                <div className="font-black text-foreground text-sm">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1" style={{ color: p.color }}>{p.tag}</div>
              </div>
            ))}
          </div>

          <Link
            to="/project-management"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-muted-foreground hover:border-[#f97316] hover:text-[#f97316] transition-all"
          >
            <ArrowLeft className="size-4" />
            Back to Course Home
          </Link>
        </div>
      </div>

      </div>
      <SiteFooter className="snap-start" />
    </div>
  );
}
