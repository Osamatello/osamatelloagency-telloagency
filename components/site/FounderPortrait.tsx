'use client';

import { cn } from '@/lib/utils';
import type { Dictionary } from '@/lib/i18n/dictionary';

export function FounderPortrait({
  founder,
  className,
}: {
  founder: Dictionary['home']['founder'];
  className?: string;
}) {
  return (
    <div className={cn('relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl', className)}>
      {/* Border glow ring */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-[hsl(var(--neon)/0.3)] via-transparent to-transparent" />

      {/* Portrait container */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[hsl(0_0%_8%)] to-[hsl(0_0%_4%)]">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-dots opacity-20" />

        {/* Aurora glow */}
        <div className="animate-aurora absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-[hsl(var(--neon)/0.12)] blur-[60px]" />

        {/* Silhouette placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-end">
          <svg
            viewBox="0 0 200 240"
            className="h-full w-full opacity-30"
            fill="none"
            aria-hidden="true"
          >
            {/* Head */}
            <circle cx="100" cy="70" r="38" fill="hsl(0 0% 20%)" />
            {/* Shoulders */}
            <path
              d="M30 240 C30 170 55 130 100 130 C145 130 170 170 170 240 Z"
              fill="hsl(0 0% 20%)"
            />
          </svg>
        </div>

        {/* Name plate */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
          <p className="text-lg font-bold text-white">{founder.name}</p>
          <p className="text-sm text-[hsl(var(--neon))]">{founder.role}</p>
        </div>
      </div>
    </div>
  );
}
