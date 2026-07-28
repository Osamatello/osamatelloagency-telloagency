'use client';

import { cn } from '@/lib/utils';
import type { StepItem } from '@/lib/i18n/dictionary';

export function ProcessTimeline({
  steps,
  className,
}: {
  steps: StepItem[];
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      {/* Horizontal track */}
      <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-white/10 lg:block">
        <div
          className="h-full bg-gradient-to-r from-[hsl(var(--neon))] to-[hsl(var(--neon)/0.3)]"
          style={{ width: '100%' }}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className="relative animate-fade-up-stagger"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {/* Step indicator */}
            <div className="flex items-center gap-3 lg:block">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[hsl(var(--neon)/0.4)] bg-[hsl(var(--background))] text-sm font-bold text-[hsl(var(--neon))]">
                {s.step}
              </div>
              <div className="lg:mt-5">
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/55 lg:mt-3">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
