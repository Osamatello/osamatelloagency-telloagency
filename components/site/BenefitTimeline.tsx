'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BenefitTimelineProps {
  items: { title: string; description: string }[];
  className?: string;
}

export function BenefitTimeline({ items, className }: BenefitTimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[hsl(var(--neon)/0.4)] via-white/10 to-transparent sm:left-1/2" />

      <div className="space-y-8">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              'relative flex gap-6 sm:gap-0',
              'animate-fade-up-stagger',
              i % 2 === 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'
            )}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Node */}
            <div className="absolute left-4 top-1 z-10 -translate-x-1/2 sm:left-1/2">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[hsl(var(--neon))] bg-[hsl(var(--background))]" />
            </div>

            {/* Content card - left side on mobile, alternating on desktop */}
            <div className="ml-12 flex-1 sm:ml-0 sm:w-1/2 sm:px-8">
              <div
                className={cn(
                  'hover-lift rounded-xl border border-white/10 bg-white/[0.03] p-5',
                  i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'
                )}
              >
                <div
                  className={cn(
                    'flex items-center gap-2',
                    i % 2 === 0 ? 'sm:flex-row-reverse' : ''
                  )}
                >
                  <Check className="h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
              </div>
            </div>

            {/* Spacer for desktop alternating layout */}
            <div className="hidden sm:block sm:w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
