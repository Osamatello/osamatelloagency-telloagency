import type { Locale } from './dictionary';
import type { Dictionary } from './dictionary';
import en from './en';
import ar from './ar';

export const locales: Locale[] = ['en', 'ar'];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function getDir(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export type { Dictionary, Locale };
