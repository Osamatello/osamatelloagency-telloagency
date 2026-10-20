'use client';

import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { localePath, stripLocale } from '@/lib/i18n/paths';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, dict } = useI18n();
  // The same page in each language. Plain links, so crawlers can follow them;
  // each language has its own root layout, so this is a full navigation.
  const page = stripLocale(usePathname() || '/');

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-paper p-0.5',
        className
      )}
      role="group"
      aria-label={dict.language.switchLabel}
    >
      {(['en', 'ar'] as const).map((lng) => (
        <a
          key={lng}
          href={localePath(page, lng)}
          hrefLang={lng}
          lang={lng}
          aria-current={locale === lng ? 'true' : undefined}
          className={cn(
            'rounded-[5px] px-2.5 py-1 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
            locale === lng
              ? 'bg-brand text-brand-foreground'
              : 'text-ink-muted hover:text-ink'
          )}
        >
          {dict.language[lng]}
        </a>
      ))}
    </div>
  );
}
