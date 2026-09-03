'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

/**
 * The Path — one enquiry, all the way through. A vertical line runs the section;
 * a forest "packet" travels down it as you scroll, activating each step (node
 * fills, detail reveals). Desktop uses progressive disclosure; mobile keeps all
 * detail readable. Reduced-motion → all steps active, line full.
 */
export function AutomationPath() {
  const { dict } = useI18n();
  const t = dict.home.workflow;
  const { ref, progress } = useScrollProgress();

  const n = t.steps.length;
  const active = Math.min(n - 1, Math.floor(progress * (n + 0.5)));
  const fill = Math.min(100, Math.max(0, progress * 106));

  return (
    <div ref={ref}>
      <SectionHead label={t.eyebrow} title={t.title} />

      <ol className="relative mt-14 sm:mt-16">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 w-px bg-line"
          style={{ insetInlineStart: '7px' }}
        />
        <span
          aria-hidden="true"
          className="absolute top-2 w-px bg-brand transition-[height] duration-200 ease-out"
          style={{ insetInlineStart: '7px', height: `${fill}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute h-2 w-2 rounded-full bg-brand transition-[top] duration-200 ease-out"
          style={{
            insetInlineStart: '7px',
            top: `${fill}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 4px hsl(var(--brand) / 0.15)',
          }}
        />

        {t.steps.map((s, i) => {
          const on = i <= active;
          return (
            <li
              key={s.step}
              className="relative grid grid-cols-[1.75rem_1fr] gap-x-6 py-7 sm:py-9"
            >
              <span
                className={cn(
                  'relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 transition-colors duration-500',
                  on ? 'border-brand bg-brand' : 'border-line bg-paper'
                )}
              />
              <div
                className={cn(
                  'transition-opacity duration-500',
                  on ? 'opacity-100' : 'opacity-45'
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-display text-sm tabular-nums text-ink-faint">
                    {s.step}
                  </span>
                  <h3 className="text-display text-[clamp(1.2rem,2.5vw,1.7rem)] text-ink">
                    {s.title}
                  </h3>
                </div>
                <p
                  className={cn(
                    'mt-2 max-w-md overflow-hidden text-sm leading-relaxed text-ink-muted transition-all duration-500',
                    on
                      ? 'max-h-20 opacity-100'
                      : 'max-h-20 opacity-70 sm:max-h-0 sm:opacity-0'
                  )}
                >
                  {s.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-12 max-w-xl text-[1.05rem] font-medium leading-snug text-ink sm:mt-14">
        {t.closer}
      </p>
    </div>
  );
}
