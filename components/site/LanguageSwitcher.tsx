'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, isHydrated, dict } = useI18n();

  return (
    <div
      className={cn('inline-flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5', className)}
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
            'rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--neon))]',
            isHydrated && locale === lng
              ? 'bg-[hsl(var(--neon))] text-[hsl(150_80%_6%)] shadow-[0_0_12px_hsl(var(--neon)/0.5)]'
              : 'text-white/70 hover:text-white'
          )}
        >
          {dict.language[lng]}
        </button>
      ))}
    </div>
  );
}
