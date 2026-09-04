'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

type Pair = { problem: string; automated: string };

/**
 * The Shift — light. Two transformation rails (left + right) form one designed
 * two-column system: identical fixed row heights and a shared progress clock, so
 * both rails start and end together and matching rows line up exactly. On
 * desktop the grid stretches both columns to equal height; on mobile they stack.
 * Reduced-motion → everything shown resolved.
 */
function Rail({
  pairs,
  resolved,
  fill,
  rtl,
}: {
  pairs: Pair[];
  resolved: number;
  fill: number;
  rtl: boolean;
}) {
  return (
    <ol className="relative h-full">
      <span
        aria-hidden="true"
        className="absolute w-px bg-line"
        style={{ insetInlineStart: '6px', top: '18px', bottom: '18px' }}
      />
      <span
        aria-hidden="true"
        className="absolute w-px bg-brand transition-[height] duration-300 ease-out"
        style={{ insetInlineStart: '6px', top: '18px', height: `calc((100% - 36px) * ${fill / 100})` }}
      />

      {pairs.map((p, i) => {
        const on = i <= resolved;
        const scatter = (i % 2 === 0 ? -1 : 1) * (rtl ? -1 : 1) * 1.4;
        return (
          <li
            key={i}
            className="relative flex h-[4.7rem] items-start gap-5 overflow-hidden py-3 sm:h-[5.1rem] sm:py-3.5"
          >
            <span
              className={cn(
                'relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 transition-colors duration-500',
                on ? 'border-brand bg-brand' : 'border-line-strong bg-transparent'
              )}
            />
            <div className="min-w-0 flex-1">
              <span
                className={cn(
                  'block text-[clamp(0.98rem,2vw,1.3rem)] font-medium transition-all duration-500 ease-out',
                  on ? 'text-ink-faint line-through decoration-1' : 'text-ink'
                )}
                style={{ transform: on ? 'none' : `translateX(${scatter}rem)` }}
              >
                {p.problem}
              </span>
              <span
                className={cn(
                  'mt-1 block text-[clamp(0.98rem,2vw,1.3rem)] font-medium text-brand transition-all duration-500 ease-out',
                  on ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                )}
              >
                {p.automated}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ProblemShift() {
  const { dict, dir } = useI18n();
  const t = dict.home.shift;
  const { ref, progress } = useScrollProgress();
  const rtl = dir === 'rtl';

  // Both rails run the same length — one synchronized two-column system.
  const n = Math.min(t.pairs.length, t.pairsRight.length);
  const left = t.pairs.slice(0, n);
  const right = t.pairsRight.slice(0, n);

  // Keep the transformation concentrated in a shorter scroll window so the
  // section does not sit for long in an awkward half-resolved state.
  const shiftProgress = Math.min(1, Math.max(0, (progress - 0.16) / 0.34));
  const resolved = Math.min(n - 1, Math.floor(shiftProgress * n));
  const fill = shiftProgress * 100;

  return (
    <div ref={ref}>
      <SectionHead label={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="mt-10 grid gap-x-10 gap-y-6 sm:mt-12 sm:grid-cols-2 sm:items-stretch lg:gap-x-16">
        <Rail pairs={left} resolved={resolved} fill={fill} rtl={rtl} />
        <Rail pairs={right} resolved={resolved} fill={fill} rtl={rtl} />
      </div>
    </div>
  );
}
