import { useTranslation } from 'react-i18next';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { Flag } from 'lucide-react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../../../i18n/useLang';

const platformMeta = [
  { key: 'bitcoin',     color: '#f59e0b', emoji: '₿' },
  { key: 'ethereum',    color: '#627EEA', emoji: 'Ξ' },
  { key: 'hyperledger', color: '#39B54A', emoji: '🏢' },
  { key: 'cosmos',      color: '#22d3ee', emoji: '🌐' },
];

export function Conclusion() {
  const lang = useLang();
  const { t } = useTranslation('blockchain-platforms/conclusion');

  return (
    <div id="section-scroll" className="h-full w-full overflow-y-auto snap-y snap-mandatory">
      <div className="slide-flow">

      {/* ═══════ CONCLUSION SLIDE ═══════ */}
      <div className="h-full">
        <TitleSlide
          sectionNumber={t('title.sectionNumber')}
          title={t('title.title')}
          subtitle={t('title.subtitle')}
          icon={<Flag className="size-20 text-[#39B54A]" />}
          gradient="from-[#39B54A] to-[#ED1C24]"
        />
      </div>

      {/* ═══════ FINAL THOUGHT ═══════ */}
      <div className="h-full flex flex-col items-center justify-center p-8 lg:p-16">
        <div className="max-w-3xl w-full text-center">

          <div className="text-6xl mb-8">⛓️</div>

          <blockquote className="text-2xl lg:text-3xl font-black text-foreground leading-snug mb-6">
            {t('quote.line1')}
            <br />
            <span className="text-[#39B54A]">{t('quote.emphasis')}</span>
            <br />
            {t('quote.line2')}
          </blockquote>

          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            {t('body1')}
            <br /><br />
            {t('body2')}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {platformMeta.map(p => (
              <div key={p.key} className="bg-card border border-border rounded-xl p-4 text-center" style={{ borderColor: p.color + '40' }}>
                <div className="text-2xl mb-2">{p.emoji}</div>
                <div className="font-black text-foreground text-sm">{t(`platforms.${p.key}.name`)}</div>
                <div className="text-xs text-muted-foreground mt-1" style={{ color: p.color }}>{t(`platforms.${p.key}.tag`)}</div>
              </div>
            ))}
          </div>

          <Link
            to={`/${lang}/blockchain-platforms`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-muted-foreground hover:border-[#39B54A] hover:text-[#39B54A] transition-all"
          >
            <ArrowLeft className="size-4" />
            {t('backToHome')}
          </Link>
        </div>
      </div>

      </div>
      <SiteFooter className="snap-start" />
    </div>
  );
}
