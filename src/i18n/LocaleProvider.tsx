import { useEffect } from 'react';
import { Outlet, useParams, Navigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANG, isSupportedLang } from './config';

/**
 * Wraps every locale-prefixed route. Reads the `:lang` URL segment, validates
 * it, syncs i18next + `<html lang>`, and persists the user's choice to
 * localStorage. Invalid `:lang` values redirect to the default locale.
 */
export function LocaleProvider() {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isSupportedLang(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      try {
        localStorage.setItem('lang', lang);
      } catch {
        // ignore (private mode / storage disabled)
      }
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  if (!isSupportedLang(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />;
  }

  return <Outlet />;
}

/**
 * One-shot detection used at boot to decide where `/` should redirect to.
 * Order: stored choice -> browser preference -> default.
 */
export function detectPreferredLang(): string {
  try {
    const stored = localStorage.getItem('lang');
    if (isSupportedLang(stored)) return stored;
  } catch {
    // ignore
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    const short = navigator.language.toLowerCase().split('-')[0];
    if (isSupportedLang(short)) return short;
  }
  return DEFAULT_LANG;
}
