import { useParams } from 'react-router';
import { DEFAULT_LANG, isSupportedLang, type SupportedLang } from './config';

/**
 * Returns the current locale from the URL `:lang` segment.
 * Falls back to the default if absent or invalid.
 */
export function useLang(): SupportedLang {
  const { lang } = useParams<{ lang?: string }>();
  return isSupportedLang(lang) ? lang : DEFAULT_LANG;
}

/**
 * Returns a function that prefixes a path with the current locale.
 * Example: `useLocalizedPath()('/blockchain-fundamentals/section-1')`
 *          -> `/pt/blockchain-fundamentals/section-1` (when lang === 'pt').
 */
export function useLocalizedPath(): (path: string) => string {
  const lang = useLang();
  return (path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    if (normalized === '/') return `/${lang}`;
    return `/${lang}${normalized}`;
  };
}

/**
 * Strip the locale prefix from a pathname.
 * `/pt/foo/bar` -> `/foo/bar`. Untouched if no locale prefix.
 */
export function stripLangPrefix(pathname: string): string {
  const match = pathname.match(/^\/(en|pt)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || '/';
}
