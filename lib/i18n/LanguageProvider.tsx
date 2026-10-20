'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { getDictionary, getDir, type Dictionary, type Locale } from './index';
import { localePath, stripLocale } from './paths';

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Kept for existing callers; the locale is known on the server, so always true. */
  isHydrated: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/** The current page's URL in `lang`, from the browser's own address. */
export function alternateHref(lang: Locale): string {
  if (typeof window === 'undefined') return lang === 'ar' ? '/ar' : '/';
  const { pathname, search, hash } = window.location;
  return localePath(stripLocale(pathname), lang) + search + hash;
}

/**
 * The language comes from the URL (`/ar/...` or unprefixed English), resolved
 * by the `[lang]` root layout, so the server renders each page in its own
 * language. Switching language is a navigation to the other URL.
 */
export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = useMemo(() => getDictionary(locale), [locale]);
  const dir = getDir(locale);

  // Each language has its own root layout, so a full navigation is required.
  const setLocale = useCallback(
    (next: Locale) => {
      if (next !== locale) window.location.assign(alternateHref(next));
    },
    [locale]
  );
  const toggleLocale = useCallback(() => setLocale(locale === 'en' ? 'ar' : 'en'), [locale, setLocale]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, dict, dir, setLocale, toggleLocale, isHydrated: true }),
    [locale, dict, dir, setLocale, toggleLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within a LanguageProvider');
  return ctx;
}
