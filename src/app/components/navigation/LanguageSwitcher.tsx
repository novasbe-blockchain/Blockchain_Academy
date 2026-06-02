import { useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGS, type SupportedLang } from '../../../i18n/config';
import { useLang } from '../../../i18n/useLang';

const FLAGS: Record<SupportedLang, string> = {
  en: '🇬🇧',
  pt: '🇵🇹',
};

const SHORT: Record<SupportedLang, string> = {
  en: 'EN',
  pt: 'PT',
};

interface LanguageSwitcherProps {
  /** Visual variant. "nav" = compact button to sit next to dark-mode toggle.
   *  "floating" = pill button with a slight shadow, for the landing page. */
  variant?: 'nav' | 'floating';
}

export function LanguageSwitcher({ variant = 'nav' }: LanguageSwitcherProps) {
  const lang = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open]);

  function switchTo(newLang: SupportedLang) {
    if (newLang === lang) {
      setOpen(false);
      return;
    }
    // Rewrite the URL's `:lang` segment in place. If the user is on `/`
    // (landing root with no locale yet), we just go to `/<newLang>`.
    const newPath = location.pathname.match(/^\/(en|pt)(\/|$)/)
      ? location.pathname.replace(/^\/(en|pt)(\/|$)/, `/${newLang}$2`)
      : `/${newLang}${location.pathname === '/' ? '' : location.pathname}`;
    i18n.changeLanguage(newLang);
    try {
      localStorage.setItem('lang', newLang);
    } catch {
      // ignore
    }
    navigate(newPath + location.search + location.hash);
    setOpen(false);
  }

  const triggerClass = variant === 'floating'
    ? 'flex items-center gap-1.5 rounded-full border border-border bg-card/95 backdrop-blur px-3 py-1.5 shadow-sm hover:shadow-md hover:border-foreground/30 transition-all'
    : 'flex-shrink-0 h-9 px-2 flex items-center gap-1.5 rounded-lg border border-border text-foreground hover:bg-sidebar-accent transition-all';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={triggerClass}
        title={t('nav.language')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="size-3.5" />
        <span className="text-sm leading-none">{FLAGS[lang]}</span>
        <span className="text-[11px] font-semibold">{SHORT[lang]}</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]"
        >
          {SUPPORTED_LANGS.map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={l === lang}
              onClick={() => switchTo(l)}
              className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-sidebar-accent transition-colors ${l === lang ? 'bg-sidebar-accent/40 font-semibold' : ''}`}
            >
              <span>{FLAGS[l]}</span>
              <span>{l === 'en' ? t('nav.english') : t('nav.portuguese')}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
