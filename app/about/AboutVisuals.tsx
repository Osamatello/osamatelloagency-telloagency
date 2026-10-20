'use client';

import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import styles from './about.module.css';

/**
 * Editorial figures for the sections below the hero. Hairline SVG on the page
 * tokens — each one carries the argument of the section it sits in, nothing is
 * decorative, and none of it moves after it has revealed.
 */

/** Shared entrance: gentle fade plus a small upward move, staggered by `delay`. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={cn('reveal-up', inView && 'is-in', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * "Why DAMASAVERO exists" — a flat list of tasks on one side, the same work
 * seen as a connected system on the other. The marginal note makes the claim;
 * this shows it.
 */
export function PremiseFigure({ caption }: { caption: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <figure ref={ref} className={styles.premiseFigure}>
      <svg viewBox="0 0 300 176" role="img" aria-label={caption} className={styles.premiseSvg}>
        {/* A list: separate, ordered, flat. */}
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <g key={row} opacity={inView ? 1 : 0} style={{ transition: `opacity 600ms ease ${row * 55}ms` }}>
            <rect x="6" y={18 + row * 24} width="7" height="1.5" fill="hsl(var(--ds-ink-faint))" />
            <rect x="21" y={18 + row * 24} width={44 - (row % 3) * 9} height="1.5" fill="hsl(var(--ds-ink) / .3)" />
          </g>
        ))}

        {/* The same work, connected. */}
        {[
          [196, 30], [252, 58], [188, 84], [244, 116], [202, 146],
        ].map(([cx, cy], index) => (
          <g key={cx} opacity={inView ? 1 : 0} style={{ transition: `opacity 700ms ease ${340 + index * 90}ms` }}>
            <circle cx={cx} cy={cy} r="3.4" fill="hsl(var(--brand))" />
          </g>
        ))}
        <path
          d="M196 30 L252 58 L188 84 L244 116 L202 146 M196 30 L188 84 M252 58 L244 116"
          fill="none"
          stroke="hsl(var(--ds-ink) / .34)"
          strokeWidth="1"
          style={{
            strokeDasharray: 460,
            strokeDashoffset: inView ? 0 : 460,
            transition: 'stroke-dashoffset 1400ms cubic-bezier(0.16,1,0.3,1) 420ms',
          }}
        />

        {/* The gap the section is about. */}
        <path d="M104 24 L104 152" stroke="hsl(var(--ds-line-strong))" strokeWidth="1" strokeDasharray="3 5" />
        <path
          d="M118 88 L152 88 M144 82 L152 88 L144 94"
          fill="none"
          stroke="hsl(var(--brand))"
          strokeWidth="1.1"
          opacity={inView ? 0.85 : 0}
          style={{ transition: 'opacity 700ms ease 900ms' }}
        />
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/**
 * "The direction behind DAMASAVERO" — one unbroken line from the first idea to
 * the running system, thickening as it goes. Direction, not a second card grid.
 */
export function DirectionFigure({ caption }: { caption: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <figure ref={ref} className={styles.directionFigure}>
      <svg viewBox="0 0 300 120" role="img" aria-label={caption} className={styles.directionSvg}>
        <line x1="8" y1="96" x2="292" y2="96" stroke="hsl(var(--ds-line))" strokeWidth="1" />

        {/* The idea becomes the system: one path, widening. */}
        <path
          d="M8 92 C 84 92, 92 58, 150 48 C 214 37, 236 28, 292 24"
          fill="none"
          stroke="hsl(var(--ds-ink) / .5)"
          strokeWidth="1"
          style={{
            strokeDasharray: 340,
            strokeDashoffset: inView ? 0 : 340,
            transition: 'stroke-dashoffset 1600ms cubic-bezier(0.16,1,0.3,1) 120ms',
          }}
        />
        <path
          d="M8 92 C 84 92, 92 58, 150 48 C 214 37, 236 28, 292 24"
          fill="none"
          stroke="hsl(var(--brand))"
          strokeWidth="2.4"
          strokeLinecap="round"
          style={{
            strokeDasharray: 340,
            strokeDashoffset: inView ? 232 : 340,
            transition: 'stroke-dashoffset 1600ms cubic-bezier(0.16,1,0.3,1) 320ms',
          }}
        />

        {[[8, 92], [150, 48], [292, 24]].map(([cx, cy], index) => (
          <g key={cx}>
            <line x1={cx} y1={cy} x2={cx} y2="96" stroke="hsl(var(--ds-line))" strokeWidth="1" />
            <circle
              cx={cx}
              cy={cy}
              r={index === 2 ? 4 : 2.8}
              fill={index === 2 ? 'hsl(var(--brand))' : 'hsl(var(--ds-ink) / .55)'}
              opacity={inView ? 1 : 0}
              style={{ transition: `opacity 600ms ease ${400 + index * 260}ms` }}
            />
            <text x={cx} y="112" fill="hsl(var(--ds-ink-faint))" fontSize="8.5" letterSpacing="1.4" textAnchor="middle">
              {`0${index + 1}`}
            </text>
          </g>
        ))}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
