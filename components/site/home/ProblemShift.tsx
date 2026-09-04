'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

type Pair = { problem: string; automated: string };

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
        className="absolute top-6 bottom-[3.2rem] w-px bg-line sm:top-[26px] sm:bottom-[3.475rem]"
        style={{ insetInlineStart: '6px' }}
      />
      <span
        aria-hidden="true"
        className="absolute top-6 bottom-[3.2rem] w-px origin-top bg-brand transition-transform duration-300 ease-out sm:top-[26px] sm:bottom-[3.475rem]"
        style={{ insetInlineStart: '6px', transform: `scaleY(${fill / 100})` }}
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

function MobileRail({ pairs, rtl }: { pairs: Pair[]; rtl: boolean }) {
  const { ref, progress } = useScrollProgress();
  const n = pairs.length;
  const railProgress = Math.min(1, Math.max(0, (progress - 0.18) / 0.48));
  const resolved = Math.min(n - 1, Math.floor(railProgress * n));

  return (
    <div ref={ref}>
      <Rail pairs={pairs} resolved={resolved} fill={railProgress * 100} rtl={rtl} />
    </div>
  );
}

export function ProblemShift() {
  const { dict, dir } = useI18n();
  const t = dict.home.shift;
  const { ref, progress } = useScrollProgress();
  const rtl = dir === 'rtl';

  const n = Math.min(t.pairs.length, t.pairsRight.length);
  const left = t.pairs.slice(0, n);
  const right = t.pairsRight.slice(0, n);

  // Desktop keeps the approved synchronized two-column behavior unchanged.
  const shiftProgress = Math.min(1, Math.max(0, (progress - 0.16) / 0.34));
  const resolved = Math.min(n - 1, Math.floor(shiftProgress * n));
  const fill = shiftProgress * 100;

  return (
    <div ref={ref}>
      <SectionHead label={t.eyebrow} title={t.title} lead={t.lead} />

      {/* Mobile: stacked rails each respond to their own position in the viewport. */}
      <div className="mt-10 grid gap-y-6 sm:hidden">
        <MobileRail pairs={left} rtl={rtl} />
        <MobileRail pairs={right} rtl={rtl} />
      </div>

      {/* Desktop/tablet: preserve the existing synchronized side-by-side system. */}
      <div className="mt-12 hidden gap-x-10 sm:grid sm:grid-cols-2 sm:items-stretch lg:gap-x-16">
        <Rail pairs={left} resolved={resolved} fill={fill} rtl={rtl} />
        <Rail pairs={right} resolved={resolved} fill={fill} rtl={rtl} />
      </div>
    </div>
  );
}
