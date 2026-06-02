import { Link } from 'react-router';
import { ArrowLeft, FileCode2 } from 'lucide-react';
import { SiteFooter } from '../../components/shared/SiteFooter';

const ACCENT = '#6366f1';

export function SC_Conclusion() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-y-auto">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/3 right-1/4 size-80 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] opacity-10 blur-3xl rounded-full" />
      <div className="absolute bottom-1/3 left-1/4 size-80 bg-gradient-to-br from-[#ED1C24] to-[#6366f1] opacity-10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-3xl text-center">
        <div className="flex justify-center mb-6">
          <div className="size-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-xl">
            <FileCode2 className="size-10 text-white" />
          </div>
        </div>

        <div className="text-xs font-bold text-[#6366f1] tracking-widest uppercase mb-4">Course 02 — Conclusion</div>

        <blockquote className="text-3xl lg:text-4xl font-black text-foreground mb-6 leading-snug">
          "Smart contracts are not magic.<br />
          <span style={{ color: ACCENT }}>They are code.</span><br />
          Their power and their risk<br />come from the same source."
        </blockquote>

        <p className="text-muted-foreground mb-10 text-base leading-relaxed max-w-xl mx-auto">
          The most important thing you can do with this knowledge is think critically. Before deploying a smart contract, ask: does this actually need to be on-chain? Who audits it? What happens when it goes wrong?
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {[
            'Trustless execution',
            'Immutable logic',
            'Oracle dependencies',
            'Security auditing',
            'Business integration',
          ].map(tag => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full border text-sm font-medium"
              style={{ color: ACCENT, borderColor: ACCENT + '40', backgroundColor: ACCENT + '10' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to="/smart-contracts"
          className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg font-medium text-muted-foreground hover:text-foreground hover:border-[#6366f1] transition-all"
        >
          <ArrowLeft className="size-4" />
          Back to Course Home
        </Link>
      </div>
      <SiteFooter className="snap-start" />
    </div>
  );
}
