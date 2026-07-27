'use client';

import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import type { PricingPlanData } from '@/lib/i18n/dictionary';

export function PricingCard({
  plan,
  className,
}: {
  plan: PricingPlanData;
  className?: string;
}) {
  const { dict } = useI18n();
  return (
    <div
      className={cn(
        'card-tello relative flex flex-col p-7',
        plan.popular && 'border-[hsl(var(--neon))/0.5] bg-[hsl(var(--card))] shadow-[0_0_30px_hsl(var(--neon)/0.15)]',
        className
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[hsl(var(--neon))] px-3 py-1 text-xs font-bold text-[hsl(150_80%_6%)]">
          <Star className="h-3 w-3 fill-current" />
          {dict.components.popularBadge}
        </span>
      )}
      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-xs font-medium text-white/50">{plan.period}</span>
        <span className="text-3xl font-bold text-white">{plan.price}</span>
      </div>
      <p className="mt-2 text-sm text-white/60">{plan.description}</p>
      <ul className="mt-5 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={plan.href}
        className={cn(
          'mt-7 w-full',
          plan.popular ? 'btn-neon' : 'btn-ghost-tello'
        )}
      >
        {plan.cta}
      </Link>
    </div>
  );
}
