'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

/**
 * The Shift — light. Seven operational problems sit scattered/offset on a rail;
 * scrolling resolves each one, in turn, into its automated state (forest), and
 * the rail fills top-to-bottom. Contrast comes from typography / motion /
 * strike-through / forest resolved states — not from a dark background.
 * Reduced-motion → everything shown resolved.
 */
export function ProblemShift() {
  const { dict, dir } = useI18n();
  const t = dict.home.shift;
  const { ref, progress } = useScrollProgress();
  const rtl = dir === 'rtl';

  const n = t.pairs.length;
  // -1 .. n : how many rows have resolved
  const resolved = Math.round(progress * (n + 1) - 0.6);
  const fill = Math.min(100, Math.max(0, (progress - 0.06) / 0.82) * 100);

  return (
    <div ref={ref}>
      <SectionHead label={t.eyebrow} title={t.title} lead={t.lead} />

      <ol className="relative mt-14 sm:mt-16">
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 w-px bg-line"
          style={{ insetInlineStart: '6px' }}
        />
        <span
          aria-hidden="true"
          className="absolute top-1 w-px bg-brand transition-[height] duration-300 ease-out"
          style={{ insetInlineStart: '6px', height: `${fill}%` }}
        />

        {t.pairs.map((p, i) => {
          const on = i <= resolved;
          const scatter = (i % 2 === 0 ? -1 : 1) * (rtl ? -1 : 1) * 1.4;
          return (
            <li key={i} className="relative flex items-start gap-5 py-4 sm:py-5">
              <span
                className={cn(
                  'relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 transition-colors duration-500',
                  on
                    ? 'border-brand bg-brand'
                    : 'border-line-strong bg-transparent'
                )}
              />
              <div className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block text-[clamp(1.05rem,2.4vw,1.5rem)] font-medium transition-all duration-500 ease-out',
                    on
                      ? 'text-ink-faint line-through decoration-1'
                      : 'text-ink'
                  )}
                  style={{ transform: on ? 'none' : `translateX(${scatter}rem)` }}
                >
                  {p.problem}
                </span>
                <span
                  className={cn(
                    'block overflow-hidden text-[clamp(1.05rem,2.4vw,1.5rem)] font-medium text-brand transition-all duration-500 ease-out',
                    on
                      ? 'mt-1.5 max-h-16 translate-y-0 opacity-100'
                      : 'max-h-0 -translate-y-1 opacity-0'
                  )}
                >
                  {p.automated}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
