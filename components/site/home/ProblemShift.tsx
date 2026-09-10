'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

/**
 * The Shift — a compression corridor.
 *
 * Not a comparison: one continuous drawing. Manual work enters on the left as
 * scattered, broken signal traces, is forced through a narrow waist, and leaves
 * on the right as evenly spaced rails. The five concerns are set directly onto
 * that drawing as type — no cards, no boxes, no rails-and-nodes columns — so it
 * shares no structure with the control-plane section further down the page.
 */

const rand = (seed: number) => {
  const value = Math.sin(seed * 91.713) * 43758.5453;
  return value - Math.floor(value);
};

const WAIST_IN = 452;
const WAIST_OUT = 512;

/** Broken traces entering the corridor: irregular, unaligned, cut short. */
const TRACES = Array.from({ length: 22 }, (_, i) => {
  const a = rand(i + 5), b = rand(i + 61), c = rand(i + 137);
  const y = 24 + a * 452;
  const x0 = 8 + b * 150;
  const x1 = x0 + 60 + c * 120;
  const kink = x1 + 40 + a * 70;
  return {
    d: `M${x0.toFixed(1)} ${y.toFixed(1)} H${x1.toFixed(1)} L${kink.toFixed(1)} ${(y + (b - 0.5) * 46).toFixed(1)} L${WAIST_IN} 250`,
    dash: c > 0.55 ? `${(4 + a * 8).toFixed(0)} ${(4 + b * 7).toFixed(0)}` : undefined,
    faint: b < 0.4,
  };
});

export function ProblemShift() {
  const { dict } = useI18n();
  const t = dict.home.shift;
  const labels = dict.home.beforeAfter;
  const { ref, inView } = useInView<HTMLDivElement>();
  const rows = t.pairs.slice(0, 5);

  return (
    <div ref={ref}>
      <SectionHead label={t.eyebrow} title={t.title} lead={t.lead} />

      <div className="mt-10 hidden items-end justify-between sm:mt-12 sm:flex">
        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          {labels.beforeLabel}
        </span>
        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand">
          {labels.afterLabel}
        </span>
      </div>

      {/* Desktop: type sits inside the corridor drawing. */}
      <div className="relative mt-5 hidden sm:block">
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {TRACES.map((trace, i) => (
            <path
              key={i}
              d={trace.d}
              stroke={`hsl(var(--ds-ink) / ${trace.faint ? 0.26 : 0.4})`}
              strokeWidth="1"
              strokeDasharray={trace.dash}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* the waist: everything is forced through one governed point */}
          <path
            d={`M${WAIST_IN} 40 C ${WAIST_IN + 22} 170, ${WAIST_IN + 22} 330, ${WAIST_IN} 460`}
            stroke="hsl(var(--brand) / 0.78)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M${WAIST_OUT} 40 C ${WAIST_OUT - 22} 170, ${WAIST_OUT - 22} 330, ${WAIST_OUT} 460`}
            stroke="hsl(var(--brand) / 0.78)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={(WAIST_IN + WAIST_OUT) / 2} cy="250" r="5" fill="hsl(var(--brand))" />

          {/* and leaves as evenly spaced rails */}
          {rows.map((pair, i) => {
            const y = 50 + i * 100;
            return (
              <g key={pair.automated}>
                <path
                  d={`M${WAIST_OUT} 250 C ${WAIST_OUT + 90} 250, ${WAIST_OUT + 60} ${y}, ${WAIST_OUT + 150} ${y}`}
                  stroke="hsl(var(--brand) / 0.8)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1={WAIST_OUT + 150}
                  y1={y}
                  x2="988"
                  y2={y}
                  stroke="hsl(var(--brand) / 0.8)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>

        <ol className="relative">
          {rows.map((pair, index) => (
            <li
              key={pair.problem}
              className={cn(
                'reveal-up grid h-[6.25rem] grid-cols-2 items-center gap-x-[16%]',
                inView && 'is-in'
              )}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <p className="pe-[6%] text-end text-[clamp(0.9rem,1.5vw,1.05rem)] leading-snug text-ink-muted">
                {pair.problem}
              </p>
              <p className="text-display ps-[8%] text-[clamp(1rem,1.9vw,1.4rem)] leading-snug text-ink">
                {pair.automated}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: the same order, carried by type alone. */}
      <ol className="mt-9 space-y-6 sm:hidden">
        {rows.map((pair, index) => (
          <li
            key={pair.problem}
            className={cn('reveal-up', inView && 'is-in')}
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <p className="text-[0.92rem] leading-snug text-ink-faint">{pair.problem}</p>
            <p className="text-display mt-1 border-s border-brand ps-3 text-[1.1rem] leading-snug text-ink">
              {pair.automated}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
