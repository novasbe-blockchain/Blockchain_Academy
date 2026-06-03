import { useTranslation } from 'react-i18next';
import { TitleSlide } from '../components/templates/TitleSlide';
import { SiteFooter } from '../components/shared/SiteFooter';
import { GraduationCap, Target, BookOpen, TrendingUp, AlertTriangle, Globe } from 'lucide-react';

const objectiveMeta = [
  { key: 'core',       icon: <BookOpen className="size-6 text-[#ED1C24]" />,      color: '#ED1C24' },
  { key: 'evolution',  icon: <TrendingUp className="size-6 text-[#39B54A]" />,    color: '#39B54A' },
  { key: 'benefits',   icon: <Target className="size-6 text-[#6366f1]" />,        color: '#6366f1' },
  { key: 'impact',     icon: <Globe className="size-6 text-[#f59e0b]" />,         color: '#f59e0b' },
  { key: 'challenges', icon: <AlertTriangle className="size-6 text-[#8b5cf6]" />, color: '#8b5cf6' },
];

export function LearningObjectives() {
  const { t } = useTranslation('blockchain-fundamentals/learning-objectives');

  return (
    <div id="section-scroll" className="size-full overflow-y-auto snap-y snap-mandatory">
      <div>
        {/* Title */}
        <div className="h-screen snap-start flex flex-col">
          <TitleSlide
            sectionNumber={t('title.sectionNumber')}
            title={t('title.title')}
            subtitle={t('title.subtitle')}
            icon={<GraduationCap className="size-20 text-[#ED1C24]" />}
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
