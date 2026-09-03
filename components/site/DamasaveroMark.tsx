import { cn } from '@/lib/utils';

/**
 * DAMASAVERO "DS" mark — vector reconstruction of the supplied business-card
 * symbol: interlocked D + S in charcoal with a deep forest-green accent slab at
 * the lower right. Proportions kept ~square to match the reference.
 *
 * This is a reconstruction, NOT a redesign. When the official vector arrives,
 * replace `public/brand/damasavero-mark.svg` + `public/icon.svg` and switch the
 * header <Logo> to `next/image`. See `public/brand/README.md`.
 */
export function DamasaveroMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={cn('shrink-0', className)}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      {title ? <title>{title}</title> : null}
      {/* D */}
      <path
        fill="hsl(var(--ds-ink))"
        d="M14 14h33c27 0 45 20 45 50s-18 50-45 50H14V95h31c17 0 27-11 27-31S62 33 45 33H14z"
      />
      {/* S */}
      <path
        fill="hsl(var(--ds-ink))"
        d="M101 46c-1-13-13-22-30-22-17 0-30 9-30 23 0 12 8 19 25 23 13 3 17 6 17 11 0 6-6 10-16 10-11 0-19-6-20-16l-18 3c2 17 18 28 38 28 20 0 34-11 34-26 0-13-9-20-27-24-12-3-15-5-15-9 0-5 5-8 13-8 8 0 13 4 15 11z"
      />
      {/* forest-green accent slab (lower-right) */}
      <path
        fill="hsl(var(--brand))"
        d="M58 100h46l-13 21H45z"
      />
    </svg>
  );
}
