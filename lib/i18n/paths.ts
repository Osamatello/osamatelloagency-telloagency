import type { Locale } from './dictionary';

/**
 * URL scheme: English is unprefixed (`/about`), Arabic lives under `/ar`
 * (`/ar/about`). Internally every page is served from `app/[lang]`, and the
 * middleware maps unprefixed URLs onto `/en`.
 */

/** Path without its language prefix: `/ar/about` → `/about`, `/ar` → `/`. */
export function stripLocale(path: string): string {
  const stripped = path.replace(/^\/(ar|en)(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

/** The English path rendered in `lang`. Leaves non-page hrefs alone. */
export function localePath(path: string, lang: Locale): string {
  if (lang === 'en' || !path.startsWith('/') || path.startsWith('//') || path.startsWith('/api/')) return path;
  if (path === '/ar' || path.startsWith('/ar/') || path.startsWith('/ar?') || path.startsWith('/ar#')) return path;
  return path === '/' ? '/ar' : `/ar${path}`;
}
