'use client';

import { Check, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Dictionary } from '@/lib/i18n/dictionary';

export function FounderCard({
  founder,
  className,
}: {
  founder: Dictionary['home']['founder'];
  className?: string;
}) {
  return (
    <div className={cn('grid items-center gap-8 lg:grid-cols-5', className)}>
      {/* Image placeholder — clearly labeled for replacement */}
      <div className="lg:col-span-2">
        <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl border border-dashed border-white/20 bg-[hsl(var(--card))]">
          <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/40">
              <User className="h-8 w-8" />
            </span>
            <p className="text-xs font-medium leading-relaxed text-white/45">
              {founder.imageLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Message + highlights */}
      <div className="lg:col-span-3">
        <h3 className="text-2xl font-bold text-white">{founder.name}</h3>
        <p className="mt-1 text-sm font-semibold text-[hsl(var(--neon))]">{founder.role}</p>
        <blockquote className="mt-5 border-s-2 border-[hsl(var(--neon))/0.5] ps-4 text-base leading-relaxed text-white/75">
          {founder.message}
        </blockquote>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {founder.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-white/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
