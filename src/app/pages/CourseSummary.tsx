import { useTranslation } from 'react-i18next';
import { TitleSlide } from '../components/templates/TitleSlide';
import { SiteFooter } from '../components/shared/SiteFooter';
import { Link } from 'react-router';
import { Map, ScrollText, Blocks, Bitcoin, Rocket, ArrowRight } from 'lucide-react';
import { useLang } from '../../i18n/useLang';

const sectionMeta = [
  { key: 'prologue', number: '00', pathSuffix: '/prologue',  icon: <ScrollText className="size-6 text-white" />, gradient: 'from-[#8b5cf6] to-[#6366f1]', borderColor: '#8b5cf6' },
  { key: 'section1', number: '01', pathSuffix: '/section-1', icon: <Blocks className="size-6 text-white" />,     gradient: 'from-[#ED1C24] to-[#39B54A]', borderColor: '#ED1C24' },
  { key: 'section2', number: '02', pathSuffix: '/section-2', icon: <Bitcoin className="size-6 text-white" />,    gradient: 'from-[#f59e0b] to-[#ED1C24]', borderColor: '#f59e0b' },
  { key: 'section3', number: '03', pathSuffix: '/section-3', icon: <Rocket className="size-6 text-white" />,     gradient: 'from-[#39B54A] to-[#22d3ee]', borderColor: '#39B54A' },
];

export function CourseSummary() {
  const lang = useLang();
  const { t } = useTranslation('blockchain-fundamentals/course-summary');
  const BASE = `/${lang}/blockchain-fundamentals`;

  return (
    <div id="section-scroll" className="size-full overflow-y-auto snap-y snap-mandatory">
      <div>
        {/* Title */}
        <div className="h-screen snap-start flex flex-col">
          <TitleSlide
            sectionNumber={t('title.sectionNumber')}
            title={t('title.title')}
            subtitle={t('title.subtitle')}
            icon={<Map className="size-20 text-[#39B54A]" />}
            gradient="from-[#39B54A] to-[#ED1C24]"
          />
        </div>

        {/* Course Map */}
        <div className="h-screen snap-start flex items-center justify-center p-12">
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl font-bold text-foreground mb-2 text-center">{t('heading')}</h2>
            <p className="text-muted-foreground mb-10 text-center">{t('intro')}</p>

            <div className="relative space-y-5">
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[#8b5cf6] via-[#ED1C24] via-[#f59e0b] to-[#39B54A]" />

              {sectionMeta.map((section) => (
                <Link
                  key={section.key}
                  to={`${BASE}${section.pathSuffix}`}
                  className="relative flex items-start gap-5 p-5 bg-card rounded-xl border border-border hover:shadow-lg hover:border-opacity-50 transition-all group"
                  style={{ borderLeftWidth: 4, borderLeftColor: section.borderColor }}
                >
                  {/* Number dot */}
                  <div
                    className={`size-12 rounded-full bg-gradient-to-br ${section.gradient} flex items-center justify-center shrink-0 z-10`}
                  >
                    {section.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-muted-foreground tracking-wider">{t(`sections.${section.key}.label`)}</span>
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-[#ED1C24] transition-colors">
                      {t(`sections.${section.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`sections.${section.key}.description`)}</p>
                  </div>

                  <ArrowRight className="size-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-[#ED1C24] transition-all shrink-0 self-center" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter className="snap-start" />
    </div>
  );
}
