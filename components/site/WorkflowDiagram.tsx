'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { StepItem } from '@/lib/i18n/dictionary';

export function WorkflowDiagram({
  steps,
  className,
}: {
  steps: StepItem[];
  className?: string;
}) {
  const [visibleStep, setVisibleStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleStep(steps.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => setVisibleStep(i + 1), i * 400);
          });
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Connecting line - vertical on mobile, horizontal on desktop */}
      <div className="absolute left-[27px] top-0 h-full w-px bg-white/10 sm:left-0 sm:top-[35px] sm:h-px sm:w-full sm:bg-gradient-to-r sm:from-transparent sm:via-[hsl(var(--neon)/0.3)] sm:to-transparent" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className={cn(
              'relative transition-all duration-500',
              i <= visibleStep - 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 sm:translate-x-2'
            )}
          >
            <div className="flex items-start gap-4 sm:flex-col sm:items-center sm:text-center">
              <div
                className={cn(
                  'relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-lg font-bold transition-all duration-500',
                  i <= visibleStep - 1
                    ? 'border-[hsl(var(--neon)/0.5)] bg-[hsl(var(--neon)/0.1)] text-[hsl(var(--neon))] shadow-[0_0_20px_hsl(var(--neon)/0.2)]'
                    : 'border-white/10 bg-[hsl(var(--background))] text-white/30'
                )}
              >
                {s.step}
                {/* Pulse dot between steps */}
                {i < steps.length - 1 && i <= visibleStep - 1 && (
                  <span className="absolute -right-1 -top-1 hidden h-2.5 w-2.5 animate-pulse rounded-full bg-[hsl(var(--neon))] sm:block lg:hidden" />
                )}
              </div>
              <div className="sm:mt-4">
                <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/55">{s.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
