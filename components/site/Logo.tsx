'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  const { brand } = useI18n().dict;
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label={brand.name}
    >
      {/* Abstract automation / circuit mark */}
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[hsl(var(--neon))/0.4] bg-[hsl(var(--neon))/0.1] transition-all duration-300 group-hover:border-[hsl(var(--neon))] group-hover:shadow-[0_0_18px_hsl(var(--neon)/0.5)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {/* connected nodes representing automation flow */}
          <circle cx="5" cy="6" r="2" fill="hsl(var(--neon))" />
          <circle cx="19" cy="6" r="1.6" fill="hsl(0 0% 100% / 0.7)" />
          <circle cx="12" cy="18" r="2.2" fill="hsl(var(--neon))" />
          <path
            d="M5 6 L12 18 L19 6"
            stroke="hsl(var(--neon))"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          <path d="M5 6 H19" stroke="hsl(0 0% 100% / 0.25)" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </span>
      <span className="text-xl font-bold tracking-tight text-white">
        {brand.name}
      </span>
    </Link>
  );
}
