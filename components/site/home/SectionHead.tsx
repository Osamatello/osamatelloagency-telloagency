'use client';

import { cn } from '@/lib/utils';
import { useInView } from '@/lib/useInView';

/**
 * Shared section opener for the homepage core experience.
 * Small tracked label + a mid-scale display heading (deliberately smaller than
 * the hero) + optional lead line. Reveals with the same `.reveal-up`
 * choreography used across the site. `dark` adapts it for the charcoal beat.
 */
export function SectionHead({
  label,
  title,
  lead,
  dark = false,
  className,
}: {
  label: string;
  title: string;
  lead?: string;
  dark?: boolean;
  className?: string;
}) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className={cn('max-w-3xl', className)}>
      <span
        className={cn(
          'eyebrow reveal-up',
          inView && 'is-in',
          dark && 'text-[hsl(var(--ds-ink-inverse)/0.55)]'
        )}
      >
        {label}
      </span>
      <h2
        className={cn(
          'text-display reveal-up mt-5 text-[clamp(1.6rem,3.2vw,2.4rem)]',
          inView && 'is-in',
          dark ? 'text-ink-inverse' : 'text-ink'
        )}
        style={{ transitionDelay: '80ms' }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            'reveal-up mt-4 max-w-xl text-[0.98rem] leading-relaxed',
            inView && 'is-in',
            dark ? 'text-[hsl(var(--ds-ink-inverse)/0.62)]' : 'text-ink-muted'
          )}
          style={{ transitionDelay: '160ms' }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
