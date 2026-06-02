import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const SUPPORTED_LANGS = ['en', 'pt'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = 'en';

export function isSupportedLang(value: string | undefined | null): value is SupportedLang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

// Auto-discover every locale JSON file at build time.
// File path -> namespace name:
//   ../locales/en/common.json                              -> "common"
//   ../locales/en/blockchain-fundamentals/section-1.json   -> "blockchain-fundamentals/section-1"
const enModules = import.meta.glob<{ default: Record<string, unknown> }>(
  '../locales/en/**/*.json',
  { eager: true }
);
const ptModules = import.meta.glob<{ default: Record<string, unknown> }>(
  '../locales/pt/**/*.json',
  { eager: true }
);

function buildResources(prefix: string, modules: Record<string, { default: unknown }>) {
  const ns: Record<string, unknown> = {};
  for (const [path, mod] of Object.entries(modules)) {
    const name = path.replace(prefix, '').replace(/\.json$/, '');
    ns[name] = (mod as { default: unknown }).default;
  }
  return ns;
}

const enResources = buildResources('../locales/en/', enModules);
const ptResources = buildResources('../locales/pt/', ptModules);

const namespaces = Array.from(
  new Set([...Object.keys(enResources), ...Object.keys(ptResources)])
);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: enResources,
      pt: ptResources,
    },
    fallbackLng: DEFAULT_LANG,
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    ns: namespaces.length ? namespaces : ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      // Priority: URL path first (locale-prefixed routes), then localStorage,
      // then the browser preference. Always falls back to `en`.
      order: ['path', 'localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    returnObjects: true,
  });

export default i18n;
