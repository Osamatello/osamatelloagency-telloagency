'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icons';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import type { IndustryData } from '@/lib/i18n/dictionary';

export function IndustryCard({ industry }: { industry: IndustryData }) {
  const { dict } = useI18n();
  const Icon = getIcon(industry.icon);

  return (
    <div
      className={cn(
        'card-tello card-tello-hover group relative flex flex-col p-7',
        industry.featured && 'border-[hsl(var(--neon))/0.4] shadow-[0_0_28px_hsl(var(--neon)/0.12)]'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[hsl(var(--neon))/0.3] bg-[hsl(var(--neon))/0.1] text-[hsl(var(--neon))] transition-all duration-300 group-hover:border-[hsl(var(--neon))] group-hover:shadow-[0_0_22px_hsl(var(--neon)/0.45)]">
          <Icon className="h-6 w-6" />
        </div>
        {industry.featured && (
          <span className="rounded-full bg-[hsl(var(--neon))/0.15] px-2.5 py-1 text-xs font-semibold text-[hsl(var(--neon))]">
            {dict.featuredLabel}
          </span>
        )}
        {industry.comingSoon && (
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-semibold text-white/60">
            {dict.components.comingSoon}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold text-white">{industry.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{industry.description}</p>

      {industry.solutions && (
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {industry.solutions.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-white/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 pt-1">
        {!industry.comingSoon && (
          <Link href={industry.href} className="btn-ghost-tello w-full">
            {dict.actions.contactUs}
          </Link>
        )}
      </div>
    </div>
  );
}
