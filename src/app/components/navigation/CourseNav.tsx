import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../../../blockchainptlogo.jpeg';
import { useLang } from '../../../i18n/useLang';
import { LanguageSwitcher } from './LanguageSwitcher';

interface Section {
  id: string;
  number: string;
  label: string;
  path: string;
}

interface CourseNavProps {
  /** Base path WITHOUT the locale prefix (e.g. `/blockchain-fundamentals`).
   *  CourseNav handles the `/<lang>` prefix internally. */
  base?: string;
  sections?: Section[];
  accentColor?: string;
}

export function CourseNav({ base, sections = [], accentColor = '#ED1C24' }: CourseNavProps) {
  const location = useLocation();
  const lang = useLang();
  const { t } = useTranslation();

  // The four course Roots all pass `base` already prefixed with `/{lang}` —
  // if for some reason that's not the case, fall back to BF + prefix here.
  const effectiveBase = base ?? `/${lang}/blockchain-fundamentals`;

  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <nav className="w-full bg-sidebar border-b border-sidebar-border flex items-center px-3 py-2 gap-2 shrink-0">

      {/* ── LEFT cluster (pinned, never scrolls) ── */}
      <Link
        to={`/${lang}`}
        title={t('nav.coursesTitle')}
        className="flex-shrink-0 flex items-center gap-1 px-2 py-1.5 rounded-lg border border-transparent text-muted-foreground hover:text-foreground hover:border-border hover:bg-sidebar-accent transition-all"
      >
        <ChevronLeft className="size-3.5" />
        <span className="text-[10px] font-semibold hidden sm:block">{t('nav.courses')}</span>
      </Link>

      <div className="h-6 w-px bg-border flex-shrink-0" />

      <Link to={effectiveBase} className="flex-shrink-0 mr-1 group">
        <img src={logo} alt="Blockchain.pt" className="h-8 object-contain group-hover:scale-105 transition-transform" />
      </Link>

      {/* ── MIDDLE: section squares share all available width equally.
              flex-1 + min-w-0 on each link lets them distribute evenly,
              while the right cluster's flex-shrink-0 keeps the language
              switcher pinned upfront. ── */}
      <div className="flex-1 min-w-0 flex items-center gap-1">
        {sections.map((section) => {
          const isActive =
            section.path === effectiveBase
              ? location.pathname === effectiveBase || location.pathname === `${effectiveBase}/`
              : location.pathname.startsWith(section.path);

          return (
            <Link
              key={section.id}
              to={section.path}
              title={section.label}
              style={isActive ? {
                backgroundColor: accentColor + '18',
                borderColor: accentColor + '90',
                boxShadow: `0 1px 3px ${accentColor}18`,
              } : undefined}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center px-2 py-1.5 rounded-lg transition-all text-center group border ${isActive ? '' : 'border-transparent hover:bg-sidebar-accent/60'}`}
            >
              <span
                className="text-sm font-bold leading-none mb-0.5"
                style={{ color: isActive ? accentColor : undefined }}
              >
                {section.number}
              </span>
              <span className={`text-[10px] leading-tight truncate w-full text-center ${isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                {section.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* ── RIGHT cluster (pinned, never scrolls) — language switcher upfront ── */}
      <div className="h-6 w-px bg-border flex-shrink-0 ml-1" />
      <LanguageSwitcher variant="nav" />
      <button
        onClick={() => setIsDark(d => !d)}
        className="flex-shrink-0 size-9 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-sidebar-accent transition-all"
        title={isDark ? t('nav.lightMode') : t('nav.darkMode')}
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    </nav>
  );
}
