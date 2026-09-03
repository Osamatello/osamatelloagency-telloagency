'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, isHydrated, dict } = useI18n();

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
        <button
          key={lng}
          type="button"
          onClick={() => setLocale(lng)}
          aria-pressed={locale === lng}
          className={cn(
            'rounded-[5px] px-2.5 py-1 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
            isHydrated && locale === lng
              ? 'bg-brand text-brand-foreground'
              : 'text-ink-muted hover:text-ink'
          )}
        >
          {dict.language[lng]}
        </button>
      ))}
    </div>
  );
}
