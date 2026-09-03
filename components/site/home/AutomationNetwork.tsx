'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

/**
 * Shared automation-network layer that runs behind every homepage section.
 * One small SVG per section (variant-specific paths that share a left "spine"
 * so the network reads as one continuous system). Neutral hairlines + a faint
 * forest "flow" dash that travels. Behind content, low opacity, mobile-reduced,
 * RTL-mirrored, static under prefers-reduced-motion (global rule freezes the
 * dash animation).
 */
type Variant = 'integrations' | 'capabilities' | 'shift' | 'path' | 'method';

type Seg = { d: string; m?: boolean; flow?: boolean };

const PATHS: Record<Variant, Seg[]> = {
  integrations: [
    { d: 'M7 0 L7 100', m: true },
    { d: 'M7 50 C 24 44 40 22 66 16', flow: true },
    { d: 'M7 50 C 26 58 44 76 70 84', m: true },
    { d: 'M7 50 C 34 50 64 48 97 46' },
    { d: 'M66 16 C 82 22 92 32 97 46' },
  ],
  capabilities: [
    { d: 'M7 0 L7 100', m: true, flow: true },
    { d: 'M7 20 C 34 20 66 16 98 18' },
    { d: 'M7 45 C 30 45 64 49 98 47', m: true },
    { d: 'M7 70 C 36 70 68 66 98 68' },
    { d: 'M7 90 C 30 90 60 92 98 90' },
  ],
  shift: [
    { d: 'M7 0 L7 100', m: true, flow: true },
    { d: 'M-6 14 C 18 16 34 8 7 22' },
    { d: 'M-6 44 C 22 46 38 36 7 52', m: true },
    { d: 'M-6 74 C 24 76 40 66 7 84' },
    { d: 'M-6 96 C 18 98 34 90 7 100' },
  ],
  path: [
    { d: 'M8 0 L8 100', m: true, flow: true },
    { d: 'M8 24 C 34 24 66 28 98 26' },
    { d: 'M8 52 C 30 52 62 48 98 50', m: true },
    { d: 'M8 80 C 38 80 70 84 98 82' },
  ],
  method: [
    { d: 'M6 12 L94 12', m: true },
    { d: 'M6 12 L6 88 M31 12 L31 88 M56 12 L56 88 M81 12 L81 88', flow: true },
    { d: 'M6 88 L94 88', m: true },
  ],
};

export function AutomationNetwork({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const { dir } = useI18n();
  const segs = PATHS[variant];

  return (
    <div
      aria-hidden="true"
      className={cn(
        'auto-net pointer-events-none absolute inset-0 overflow-hidden [contain:paint]',
        dir === 'rtl' && 'auto-net--rtl',
        className
      )}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <g
          stroke="hsl(var(--ds-line))"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        >
          {segs.map((s, i) => (
            <path key={i} d={s.d} className={cn(!s.m && 'auto-net-desk')} />
          ))}
        </g>
        <g
          className="auto-net-flow"
          stroke="hsl(var(--brand) / 0.28)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        >
          {segs
            .filter((s) => s.flow)
            .map((s, i) => (
              <path key={i} d={s.d} />
            ))}
        </g>
      </svg>
    </div>
  );
}
