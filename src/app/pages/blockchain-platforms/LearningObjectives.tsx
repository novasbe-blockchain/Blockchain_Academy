import { useTranslation } from 'react-i18next';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { GraduationCap, Coins, Cpu, Building2, Scale, Network } from 'lucide-react';

const objectiveMeta = [
  { key: 'bitcoin',          icon: <Coins className="size-6 text-[#f59e0b]" />,    color: '#f59e0b' },
  { key: 'ethereum',         icon: <Cpu className="size-6 text-[#627EEA]" />,      color: '#627EEA' },
  { key: 'hyperledger',      icon: <Building2 className="size-6 text-[#39B54A]" />, color: '#39B54A' },
  { key: 'comparing',        icon: <Scale className="size-6 text-[#8b5cf6]" />,    color: '#8b5cf6' },
  { key: 'interoperability', icon: <Network className="size-6 text-[#22d3ee]" />,  color: '#22d3ee' },
];

export function BP_LearningObjectives() {
  const { t } = useTranslation('blockchain-platforms/learning-objectives');

  return (
    <div id="section-scroll" className="size-full overflow-y-auto snap-y snap-mandatory">
      <div>
        {/* Title */}
        <div className="h-screen snap-start flex flex-col">
          <TitleSlide
            sectionNumber={t('title.sectionNumber')}
            title={t('title.title')}
            subtitle={t('title.subtitle')}
            icon={<GraduationCap className="size-20 text-[#39B54A]" />}
          />
        </div>

        {/* Objectives Grid */}
        <div className="h-screen snap-start flex items-center justify-center p-12">
          <div className="max-w-5xl w-full">
            <h2 className="text-4xl font-bold text-foreground mb-3 text-center">{t('heading')}</h2>
            <p className="text-lg text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
              {t('intro')}
            </p>

            <div className="space-y-4">
              {objectiveMeta.map((obj) => (
                <div
                  key={obj.key}
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
                    <h3 className="font-bold text-foreground text-lg mb-1">{t(`objectives.${obj.key}.title`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`objectives.${obj.key}.description`)}</p>
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
