'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { defaultLocale, getDictionary, getDir, locales, type Dictionary, type Locale } from './index';

const STORAGE_KEY = 'tello-locale';

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isHydrated: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && locales.includes(stored)) setLocaleState(stored);
    } catch {
      // ignore (private mode, etc.)
    }
    setIsHydrated(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const dict = useMemo(() => getDictionary(locale), [locale]);
  const dir = getDir(locale);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = dict.meta.htmlLang;
      document.documentElement.dir = dir;
    }
  }, [locale, dir, dict.meta.htmlLang]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, dict, dir, setLocale, toggleLocale, isHydrated }),
    [locale, dict, dir, setLocale, toggleLocale, isHydrated]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within a LanguageProvider');
  return ctx;
}
