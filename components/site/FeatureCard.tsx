'use client';

import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icons';
import type { FeatureItem } from '@/lib/i18n/dictionary';

export function FeatureCard({
  item,
  className,
}: {
  item: FeatureItem;
  className?: string;
}) {
  const Icon = getIcon(item.icon);
  return (
    <div className={cn('card-tello card-tello-hover group p-6', className)}>
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[hsl(var(--neon))/0.3] bg-[hsl(var(--neon))/0.1] text-[hsl(var(--neon))] transition-all duration-300 group-hover:border-[hsl(var(--neon))] group-hover:shadow-[0_0_18px_hsl(var(--neon)/0.4)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
    </div>
  );
}
