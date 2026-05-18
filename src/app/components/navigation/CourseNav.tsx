import { Link, useLocation } from 'react-router';
import { Sun, Moon, ChevronLeft, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../../../blockchainptlogo.jpeg';
import { useLanguage } from '../../i18n';
import type { TranslationKey } from '../../i18n';

export interface Section {
  id: string;
  number: string;
  /** A translation key — resolved at render time so the nav updates with the locale. */
  label: TranslationKey;
  path: string;
}

const BF_BASE = '/blockchain-fundamentals';

const BF_SECTIONS: Section[] = [
  { id: 'home', number: '🏠', label: 'section.home',         path: `${BF_BASE}` },
  { id: 'lo',   number: '🎯', label: 'section.objectives',   path: `${BF_BASE}/learning-objectives` },
  { id: 'cs',   number: '🗺️', label: 'section.summary',      path: `${BF_BASE}/course-summary` },
  { id: '0',    number: '00', label: 'section.prologue',     path: `${BF_BASE}/prologue` },
  { id: '1',    number: '01', label: 'section.bf.intro',     path: `${BF_BASE}/section-1` },
  { id: '2',    number: '02', label: 'section.bf.bitcoin',   path: `${BF_BASE}/section-2` },
  { id: '3',    number: '03', label: 'section.bf.whatsNext', path: `${BF_BASE}/section-3` },
  { id: 'bib',  number: '📖', label: 'section.bibliography', path: `${BF_BASE}/bibliography` },
];

interface CourseNavProps {
  base?: string;
  sections?: Section[];
  accentColor?: string;
}

export function CourseNav({ base = BF_BASE, sections = BF_SECTIONS, accentColor = '#ED1C24' }: CourseNavProps) {
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleLang = () => setLang(lang === 'en' ? 'pt' : 'en');
  const langTooltip = lang === 'en' ? t('nav.switchToPortuguese') : t('nav.switchToEnglish');

  return (
    <nav className="w-full bg-sidebar border-b border-sidebar-border flex items-center px-3 py-2 gap-2 overflow-x-auto shrink-0">

      {/* Back to courses */}
      <Link
        to="/"
        title={t('nav.allCourses')}
        className="flex-shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-lg border border-transparent text-muted-foreground hover:text-foreground hover:border-border hover:bg-sidebar-accent transition-all"
      >
        <ChevronLeft className="size-3.5" />
        <span className="text-[10px] font-semibold hidden sm:block">{t('nav.coursesShort')}</span>
      </Link>

      {/* Divider */}
      <div className="h-6 w-px bg-border flex-shrink-0" />

      {/* Logo */}
      <Link to={base} className="flex-shrink-0 mr-1 group">
        <img src={logo} alt="Blockchain.pt" className="h-8 object-contain group-hover:scale-105 transition-transform" />
      </Link>

      {/* Section squares */}
      <div className="flex items-center gap-1 flex-1 min-w-0">
        {sections.map((section) => {
          const isActive =
            section.path === base
              ? location.pathname === base || location.pathname === `${base}/`
              : location.pathname.startsWith(section.path);
          const label = t(section.label);

          return (
            <Link
              key={section.id}
              to={section.path}
              title={label}
              style={isActive ? {
                backgroundColor: accentColor + '18',
                borderColor: accentColor + '90',
                boxShadow: `0 1px 3px ${accentColor}18`,
              } : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg transition-all text-center group border ${isActive ? '' : 'border-transparent hover:bg-sidebar-accent/60'}`}
            >
              <span
                className="text-sm font-bold leading-none mb-0.5"
                style={{ color: isActive ? accentColor : undefined }}
              >
                {section.number}
              </span>
              <span className={`text-[10px] leading-tight truncate w-full text-center ${isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Language toggle */}
      <button
        onClick={toggleLang}
        className="flex-shrink-0 h-9 px-2.5 flex items-center gap-1.5 rounded-lg border border-border text-foreground hover:bg-sidebar-accent transition-all"
        title={langTooltip}
        aria-label={langTooltip}
      >
        <Languages className="size-4" />
        <span className="text-xs font-bold tracking-wide">{lang.toUpperCase()}</span>
      </button>

      {/* Dark mode toggle */}
      <button
        onClick={() => setIsDark(d => !d)}
        className="flex-shrink-0 size-9 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-sidebar-accent transition-all"
        title={isDark ? t('nav.lightMode') : t('nav.darkMode')}
        aria-label={isDark ? t('nav.lightMode') : t('nav.darkMode')}
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    </nav>
  );
}
