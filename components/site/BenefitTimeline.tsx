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
      <div className="absolute start-4 top-2 bottom-2 -ms-px w-0.5 bg-gradient-to-b from-[hsl(var(--neon)/0.45)] via-[hsl(var(--ds-line))] to-transparent sm:start-1/2" />

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
            {/* Node — centred with a margin, because the row's stagger animation owns `transform` on its children. */}
            <div className="absolute start-4 top-0.5 z-10 -ms-2.5 sm:start-1/2">
              <span className="block h-5 w-5 rounded-full border-2 border-[hsl(var(--neon))] bg-[hsl(var(--ds-paper))]" />
            </div>

            {/* Content card - left side on mobile, alternating on desktop */}
            <div className="ms-12 flex-1 sm:ms-0 sm:w-1/2 sm:px-8">
              <div
                className={cn(
                  'hover-lift rounded-xl border border-line bg-[hsl(var(--ds-paper-raised)/0.55)] p-5',
                  i % 2 === 0 ? 'sm:text-start' : 'sm:text-end'
                )}
              >
                <div
                  className={cn(
                    'flex items-center gap-2',
                    i % 2 === 0 ? '' : 'sm:flex-row-reverse'
                  )}
                >
                  <Check className="h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
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
