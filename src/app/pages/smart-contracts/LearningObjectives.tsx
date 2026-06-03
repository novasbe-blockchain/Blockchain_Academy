import { useTranslation } from 'react-i18next';
import { TitleSlide } from '../../components/templates/TitleSlide';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { GraduationCap, Code2, Layers, Building2, Brain, AlertTriangle, Wrench, Users } from 'lucide-react';

const objectiveMeta = [
  { key: 'fundamentals',     icon: <Code2 className="size-6 text-[#6366f1]" />,        color: '#6366f1' },
  { key: 'howItWorks',       icon: <Layers className="size-6 text-[#8b5cf6]" />,       color: '#8b5cf6' },
  { key: 'industries',       icon: <Building2 className="size-6 text-[#22d3ee]" />,     color: '#22d3ee' },
  { key: 'criticalThinking', icon: <Brain className="size-6 text-[#6366f1]" />,        color: '#6366f1' },
  { key: 'limitations',      icon: <AlertTriangle className="size-6 text-[#ED1C24]" />, color: '#ED1C24' },
  { key: 'build',            icon: <Wrench className="size-6 text-[#22d3ee]" />,        color: '#22d3ee' },
  { key: 'design',           icon: <Users className="size-6 text-[#39B54A]" />,         color: '#39B54A' },
];

export function SC_LearningObjectives() {
  const { t } = useTranslation('smart-contracts/learning-objectives');

  return (
    <div id="section-scroll" className="size-full overflow-y-auto snap-y snap-mandatory">
      <div className="slide-flow">
        {/* Title */}
        <div className="h-full">
          <TitleSlide
            sectionNumber={t('title.sectionNumber')}
            title={t('title.title')}
            subtitle={t('title.subtitle')}
            icon={<GraduationCap className="size-20 text-[#6366f1]" />}
          />
        </div>

        {/* Objectives */}
        <div className="h-full flex flex-col p-6 lg:p-10">
          <div className="shrink-0 text-center mb-4 lg:mb-6">
            <h2 className="text-2xl lg:text-4xl font-bold text-foreground">{t('heading')}</h2>
            <p className="text-sm lg:text-base text-muted-foreground mt-2 max-w-2xl mx-auto">
              {t('intro')}
            </p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-5xl mx-auto">
              {objectiveMeta.map((obj) => (
                <div
                  key={obj.key}
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                  style={{ borderLeftWidth: 4, borderLeftColor: obj.color }}
                >
                  <div
                    className="size-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${obj.color}20` }}
                  >
                    {obj.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground text-sm lg:text-base mb-0.5">{t(`objectives.${obj.key}.title`)}</h3>
                    <p className="text-xs lg:text-[13px] text-muted-foreground leading-relaxed">{t(`objectives.${obj.key}.description`)}</p>
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
