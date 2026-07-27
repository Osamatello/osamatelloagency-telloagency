'use client';

import { cn } from '@/lib/utils';
import type { StepItem } from '@/lib/i18n/dictionary';

export function WorkflowSteps({
  steps,
  className,
}: {
  steps: StepItem[];
  className?: string;
}) {
  return (
    <ol className={cn('relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5', className)}>
      {/* connecting line on large screens */}
      <div
        className="absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-transparent via-[hsl(var(--neon))/0.3] to-transparent lg:block"
        aria-hidden="true"
      />
      {steps.map((s) => (
        <li key={s.step} className="relative">
          <div className="flex items-center gap-3">
            <span className="relative z-10 inline-flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border border-[hsl(var(--neon))/0.3] bg-[hsl(var(--background))] text-2xl font-bold text-[hsl(var(--neon))]">
              {s.step}
            </span>
          </div>
          <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}
