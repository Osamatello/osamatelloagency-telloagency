'use client';

import { cn } from '@/lib/utils';
import type { FeatureItem } from '@/lib/i18n/dictionary';

export function ProblemCard({
  item,
  index,
  className,
}: {
  item: FeatureItem;
  index: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'hover-lift border-glow group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7',
        'animate-fade-up-stagger',
        className
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Large ghost number */}
      <span className="pointer-events-none absolute -right-2 -top-4 text-7xl font-black text-white/[0.04]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative">
        <h3 className="text-lg font-bold text-white">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/55">{item.description}</p>
      </div>

      {/* Bottom accent line */}
      <div className="mt-6 h-px w-full bg-gradient-to-r from-[hsl(var(--neon)/0.3)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
