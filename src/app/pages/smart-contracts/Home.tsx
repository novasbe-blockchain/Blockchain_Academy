import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { TeacherCard } from '../../components/shared/TeacherCard';
import { BrandLogo } from '../../components/shared/BrandLogo';
import { SiteFooter } from '../../components/shared/SiteFooter';
import { useInstructor } from '../../data/instructors';
import { useLang } from '../../../i18n/useLang';

const sectionMeta = [
  { key: 'section1',   number: '01', pathSuffix: '/section-1',   gradient: 'from-[#6366f1] to-[#8b5cf6]' },
  { key: 'section2',   number: '02', pathSuffix: '/section-2',   gradient: 'from-[#8b5cf6] to-[#a78bfa]' },
  { key: 'section3',   number: '03', pathSuffix: '/section-3',   gradient: 'from-[#6366f1] to-[#22d3ee]' },
  { key: 'section4',   number: '04', pathSuffix: '/section-4',   gradient: 'from-[#6366f1] to-[#8b5cf6]' },
  { key: 'section5',   number: '05', pathSuffix: '/section-5',   gradient: 'from-[#ED1C24] to-[#6366f1]' },
  { key: 'section6',   number: '06', pathSuffix: '/section-6',   gradient: 'from-[#6366f1] to-[#22d3ee]' },
  { key: 'section7',   number: '07', pathSuffix: '/section-7',   gradient: 'from-[#39B54A] to-[#6366f1]' },
  { key: 'conclusion', number: '🏁', pathSuffix: '/conclusion',  gradient: 'from-[#6366f1] to-[#ED1C24]' },
];

const badgeKeys = ['sections', 'slides', 'verticals', 'cases', 'demos'] as const;

export function SmartContractsHome() {
  const lang = useLang();
  const { t } = useTranslation('smart-contracts/home');
  const BASE = `/${lang}/smart-contracts`;
  const shayan = useInstructor('shayan');

  return (
    <div id="section-scroll" className="size-full overflow-y-auto snap-y snap-mandatory">
      {/* Hero */}
      <div className="min-h-screen snap-start flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 right-1/4 size-96 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] opacity-15 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] opacity-15 blur-3xl rounded-full" />

        <div className="relative z-10 text-center max-w-5xl">
          <div className="flex justify-center mb-8">
            <BrandLogo className="h-36" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30 mb-6">
            <span className="text-xs font-bold text-[#6366f1] tracking-widest uppercase">{t('hero.courseBadge')}</span>
          </div>

          <h1 className="text-5xl font-black text-foreground mb-3">
            {t('hero.titleLine1')}<br />{t('hero.titleLine2')}
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('hero.tagline')}
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            {badgeKeys.map(key => (
              <div key={key} className="px-4 py-2 bg-card rounded-lg border border-border">
                <span className="text-sm text-muted-foreground">{t(`hero.badges.${key}`)}</span>
              </div>
            ))}
          </div>

          <Link
            to={`${BASE}/learning-objectives`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#6366f1]/30 transition-all"
          >
            {t('hero.startLearning')}
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>

      {/* Sections Overview */}
      <div className="min-h-screen snap-start max-w-7xl mx-auto px-12 py-16">
        <h2 className="text-4xl font-bold text-foreground mb-12">{t('sectionsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectionMeta.map((section) => (
            <Link
              key={section.number}
              to={`${BASE}${section.pathSuffix}`}
              className="group bg-card border border-border rounded-xl p-6 hover:border-[#6366f1] transition-all hover:shadow-lg hover:shadow-[#6366f1]/10"
            >
              <div className={`size-12 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4`}>
                <span className="text-white font-bold">{section.number}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#6366f1] transition-colors">
                {t(`sections.${section.key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{t(`sections.${section.key}.description`)}</p>
              <div className="flex items-center gap-2 text-[#6366f1] text-sm font-bold">
                {t('explore')}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Instructor */}
      <div className="min-h-screen snap-start max-w-7xl mx-auto px-12 py-16 border-t border-border">
        <h2 className="text-4xl font-bold text-foreground mb-3">{t('instructorTitle')}</h2>
        <p className="text-muted-foreground mb-10">{t('instructorSubtitle')}</p>

        <div className="max-w-4xl">
          <TeacherCard {...shayan} />
        </div>
      </div>

      <SiteFooter className="snap-start" />
    </div>
  );
}
