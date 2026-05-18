import { Link } from 'react-router';
import { ArrowRight, Lock } from 'lucide-react';
import logo from '../../blockchainptlogo.jpeg';
import { useT } from '../i18n';
import type { TranslationKey } from '../i18n';

interface Course {
  number: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  /** Five topic-chip translation keys, in display order. */
  topicKeys: [TranslationKey, TranslationKey, TranslationKey, TranslationKey, TranslationKey];
  gradient: string;
  accentColor: string;
  path: string;
  available: boolean;
}

const courses: Course[] = [
  {
    number: '01',
    titleKey: 'course.01.title',
    descriptionKey: 'course.01.description',
    topicKeys: ['course.01.topic.1', 'course.01.topic.2', 'course.01.topic.3', 'course.01.topic.4', 'course.01.topic.5'],
    gradient: 'from-[#ED1C24] to-[#f59e0b]',
    accentColor: '#ED1C24',
    path: '/blockchain-fundamentals',
    available: true,
  },
  {
    number: '02',
    titleKey: 'course.02.title',
    descriptionKey: 'course.02.description',
    topicKeys: ['course.02.topic.1', 'course.02.topic.2', 'course.02.topic.3', 'course.02.topic.4', 'course.02.topic.5'],
    gradient: 'from-[#39B54A] to-[#22d3ee]',
    accentColor: '#39B54A',
    path: '/blockchain-platforms',
    available: false,
  },
  {
    number: '03',
    titleKey: 'course.03.title',
    descriptionKey: 'course.03.description',
    topicKeys: ['course.03.topic.1', 'course.03.topic.2', 'course.03.topic.3', 'course.03.topic.4', 'course.03.topic.5'],
    gradient: 'from-[#6366f1] to-[#8b5cf6]',
    accentColor: '#6366f1',
    path: '/smart-contracts',
    available: false,
  },
  {
    number: '04',
    titleKey: 'course.04.title',
    descriptionKey: 'course.04.description',
    topicKeys: ['course.04.topic.1', 'course.04.topic.2', 'course.04.topic.3', 'course.04.topic.4', 'course.04.topic.5'],
    gradient: 'from-[#f97316] to-[#eab308]',
    accentColor: '#f97316',
    path: '/project-management',
    available: false,
  },
];

export function CourseSelection() {
  const t = useT();

  return (
    <div className="size-full overflow-y-auto">
      {/* Hero */}
      <div className="min-h-screen flex flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(237,28,36,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(237,28,36,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 right-1/4 size-96 bg-gradient-to-br from-[#ED1C24] to-[#6366f1] opacity-10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-gradient-to-br from-[#39B54A] to-[#f59e0b] opacity-10 blur-3xl rounded-full" />

        <div className="relative z-10 w-full max-w-5xl">
          {/* Logo + Academy title */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Blockchain Academy" className="h-24 object-contain" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-foreground mb-4">
              {t('home.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.tagline')}
            </p>
          </div>

          {/* Course cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              course.available ? (
                <Link
                  key={course.number}
                  to={course.path}
                  className="group relative bg-card border border-border rounded-2xl p-6 flex flex-col hover:shadow-xl transition-all hover:-translate-y-1"
                  style={{ '--accent': course.accentColor } as React.CSSProperties}
                >
                  {/* Number badge */}
                  <div className={`size-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-white font-black text-lg">{course.number}</span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-[--accent] transition-colors">
                    {t(course.titleKey)}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5 flex-1">
                    {t(course.descriptionKey)}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.topicKeys.map(key => (
                      <span
                        key={key}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                        style={{ color: course.accentColor, borderColor: course.accentColor + '40', backgroundColor: course.accentColor + '10' }}
                      >
                        {t(key)}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 font-bold text-sm" style={{ color: course.accentColor }}>
                    {t('common.start')}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Active glow border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${course.accentColor}60` }}
                  />
                </Link>
              ) : (
                <div
                  key={course.number}
                  className="group relative bg-card border border-border rounded-2xl p-6 flex flex-col select-none cursor-not-allowed"
                  style={{ '--accent': course.accentColor } as React.CSSProperties}
                  aria-disabled="true"
                >
                  {/* Number badge */}
                  <div className={`size-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-white font-black text-lg">{course.number}</span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-2">{t(course.titleKey)}</h2>
                  <p className="text-sm text-muted-foreground mb-5 flex-1">{t(course.descriptionKey)}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.topicKeys.map(key => (
                      <span
                        key={key}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                        style={{ color: course.accentColor, borderColor: course.accentColor + '40', backgroundColor: course.accentColor + '10' }}
                      >
                        {t(key)}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 font-bold text-sm" style={{ color: course.accentColor }}>
                    {t('common.start')}
                    <ArrowRight className="size-4" />
                  </div>

                  {/* Transparent lock overlay — appears on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-background/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="size-14 rounded-full bg-background/80 border border-border flex items-center justify-center shadow-lg">
                      <Lock className="size-6 text-foreground" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-background/80 border border-border text-xs font-semibold text-foreground">
                      {t('common.comingSoon')}
                    </span>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
