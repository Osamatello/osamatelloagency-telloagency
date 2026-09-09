'use client';

import { useInView } from '@/lib/useInView';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { cn } from '@/lib/utils';

/**
 * Homepage visual vocabulary — abstract system drawings, not decoration and not
 * stock imagery. All three pieces are pure SVG on the design tokens, so they
 * inherit the homepage dark beat automatically and cost nothing to revert.
 *
 * They are deliberately quiet: hairline strokes, a single emerald accent, no
 * glow, no gradient washes. Motion is scroll-linked, never ambient, so nothing
 * moves while the visitor is reading.
 */

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => value * value * (3 - 2 * value);
const rand = (seed: number) => {
  const value = Math.sin(seed * 91.713) * 43758.5453;
  return value - Math.floor(value);
};

/* ---------------------------------------------------------------------------
   SYSTEM IN LAYERS
   Five plates that genuinely separate, brighten and lock as the section moves
   through the viewport — the progression is the point, so it is driven by
   scroll rather than played once.
--------------------------------------------------------------------------- */

const PLATE_COUNT = 5;
const PLATE_BASE_Y = [46, 84, 122, 160, 198];
const PLATE_CX = 112;
const PLATE_HALF_W = 82;
const PLATE_HALF_H = 17;
const PLATE_REST_Y = 122;

export function SystemLayers({ className }: { className?: string }) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const active = clamp01((progress - 0.1) / 0.55) * (PLATE_COUNT + 0.4);
  const signal = clamp01((progress - 0.12) / 0.6);

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <svg
        viewBox="0 0 258 250"
        role="img"
        aria-label="Five connected system layers assembling into one operating stack"
        className="h-auto w-full"
      >
        {/* Descending signal — the line that binds the stack together. */}
        <line
          x1={PLATE_CX}
          y1={14}
          x2={PLATE_CX}
          y2={14 + signal * 218}
          stroke="hsl(var(--brand))"
          strokeWidth="1"
          opacity="0.55"
        />
        <circle
          cx={PLATE_CX}
          cy={14 + signal * 218}
          r="2.6"
          fill="hsl(var(--brand))"
          opacity={signal > 0.01 ? 0.9 : 0}
        />

        {PLATE_BASE_Y.map((baseY, index) => {
          const t = ease(clamp01(active - index));
          const y = PLATE_REST_Y + (baseY - PLATE_REST_Y) * t;
          const w = PLATE_HALF_W * (0.72 + t * 0.28);
          const h = PLATE_HALF_H * (0.72 + t * 0.28);
          const plate = `M ${PLATE_CX} ${y - h} L ${PLATE_CX + w} ${y} L ${PLATE_CX} ${y + h} L ${PLATE_CX - w} ${y} Z`;

          return (
            <g key={baseY}>
              <path
                d={plate}
                fill="hsl(var(--ds-ink) / 0.02)"
                stroke="hsl(var(--ds-line-strong))"
                strokeWidth="1"
                opacity={0.35 + t * 0.35}
              />
              {/* The leading edge lights up as the layer locks in. */}
              <path
                d={`M ${PLATE_CX - w} ${y} L ${PLATE_CX} ${y + h} L ${PLATE_CX + w} ${y}`}
                fill="none"
                stroke="hsl(var(--brand))"
                strokeWidth="1.25"
                opacity={t * 0.85}
              />
              <circle cx={PLATE_CX + w} cy={y} r="2" fill="hsl(var(--brand))" opacity={t * 0.9} />
              <text
                x={PLATE_CX + w + 12}
                y={y + 3.5}
                fill="hsl(var(--ds-ink-faint))"
                fontSize="9"
                letterSpacing="1.6"
                opacity={0.4 + t * 0.6}
              >
                {`0${index + 1}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   CONVERGENCE FIELD
   Scattered operational noise resolving into one ordered column. Sits above
   the two problem rails so the section leads with a picture, not a paragraph.
--------------------------------------------------------------------------- */

const FIELD_COUNT = 30;

export function ConvergenceField({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  const resolve = ease(clamp01((progress - 0.06) / 0.55));

  return (
    <div className={cn('w-full', className)}>
      <svg
        viewBox="0 0 800 150"
        role="img"
        aria-label="Scattered operational fragments resolving into a single ordered channel"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <line
          x1="612"
          y1="75"
          x2="792"
          y2="75"
          stroke="hsl(var(--brand))"
          strokeWidth="1"
          opacity={resolve * 0.75}
        />
        {Array.from({ length: FIELD_COUNT }, (_, index) => {
          const a = rand(index + 3);
          const b = rand(index + 57);
          const stagger = index / FIELD_COUNT;
          const t = ease(clamp01((resolve - stagger * 0.35) / 0.65));
          const fromX = 24 + a * 470;
          const fromY = 14 + b * 122;
          const toX = 560 + (index % 3) * 26;
          const toY = 22 + (index / (FIELD_COUNT - 1)) * 106;
          const x = fromX + (toX - fromX) * t;
          const y = fromY + (toY - fromY) * t;
          const size = 2.2 + a * 2.4;
          const lit = t > 0.72;

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={size * (1 - t * 0.35)}
              height={size * (1 - t * 0.35)}
              transform={`rotate(${45 * (1 - t)} ${x} ${y})`}
              fill={lit ? 'hsl(var(--brand))' : 'hsl(var(--ds-ink-faint))'}
              opacity={lit ? 0.55 + t * 0.35 : 0.22 + t * 0.3}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   HORIZON MARK
   The closing statement's visual: a single point opening into an arc field.
   Reveals once, then holds still.
--------------------------------------------------------------------------- */

export function HorizonMark({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} aria-hidden="true" className={cn('w-full', className)}>
      <svg viewBox="0 0 420 240" className="h-auto w-full">
        {[0, 1, 2, 3, 4, 5].map((ring) => (
          <path
            key={ring}
            d={`M 20 220 A ${44 + ring * 62} ${44 + ring * 62} 0 0 1 ${20 + (44 + ring * 62)} ${220 - (44 + ring * 62)}`}
            fill="none"
            stroke={ring === 1 ? 'hsl(var(--brand))' : 'hsl(var(--ds-line-strong))'}
            strokeWidth="1"
            style={{
              opacity: inView ? (ring === 1 ? 0.6 : 0.55 - ring * 0.07) : 0,
              transform: inView ? 'none' : 'translateY(10px)',
              transformOrigin: '20px 220px',
              transition: `opacity 900ms ease ${ring * 90}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${ring * 90}ms`,
            }}
          />
        ))}
        <circle
          cx="20"
          cy="220"
          r="4"
          fill="hsl(var(--brand))"
          style={{
            opacity: inView ? 0.95 : 0,
            transition: 'opacity 700ms ease',
          }}
        />
      </svg>
    </div>
  );
}
