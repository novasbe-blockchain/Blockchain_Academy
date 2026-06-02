import { TitleSlide } from '../../components/templates/TitleSlide';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { Flag } from 'lucide-react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function Conclusion() {
  return (
    <div id="section-scroll" className="h-full w-full overflow-y-auto snap-y snap-mandatory">
      <div className="slide-flow">

      {/* ═══════ CONCLUSION SLIDE ═══════ */}
      <div className="h-full">
        <TitleSlide
          sectionNumber="CONCLUSION"
          title="There Is No Best Blockchain"
          subtitle="There are only blockchains optimised for different constraints to solve real-world problems."
          icon={<Flag className="size-20 text-[#39B54A]" />}
          gradient="from-[#39B54A] to-[#ED1C24]"
        />
      </div>

      {/* ═══════ FINAL THOUGHT ═══════ */}
      <div className="h-full flex flex-col items-center justify-center p-8 lg:p-16">
        <div className="max-w-3xl w-full text-center">

          <div className="text-6xl mb-8">⛓️</div>

          <blockquote className="text-2xl lg:text-3xl font-black text-foreground leading-snug mb-6">
            "There is no best blockchain.
            <br />
            <span className="text-[#39B54A]">There are only blockchains optimised for different constraints</span>
            <br />
            to solve real-world problems."
          </blockquote>

          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Bitcoin chooses security and decentralization. Ethereum adds programmability. Hyperledger Fabric chooses privacy and enterprise control. Cosmos connects them all.
            <br /><br />
            The right platform depends on the problem you're solving.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { name: 'Bitcoin', tag: 'Secure digital money', color: '#f59e0b', emoji: '₿' },
              { name: 'Ethereum', tag: 'Programmable settlement', color: '#627EEA', emoji: 'Ξ' },
              { name: 'Hyperledger', tag: 'Enterprise & privacy', color: '#39B54A', emoji: '🏢' },
              { name: 'Cosmos / L0', tag: 'Interoperability', color: '#22d3ee', emoji: '🌐' },
            ].map(p => (
              <div key={p.name} className="bg-card border border-border rounded-xl p-4 text-center" style={{ borderColor: p.color + '40' }}>
                <div className="text-2xl mb-2">{p.emoji}</div>
                <div className="font-black text-foreground text-sm">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1" style={{ color: p.color }}>{p.tag}</div>
              </div>
            ))}
          </div>

          <Link
            to="/blockchain-platforms"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-muted-foreground hover:border-[#39B54A] hover:text-[#39B54A] transition-all"
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
