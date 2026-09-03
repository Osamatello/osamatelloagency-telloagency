'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';

/**
 * One continuous automation route down the homepage. Each section renders a
 * short segment pinned to the same left anchor (container gutter + 6px — the
 * exact x of the rails inside The Shift / The Path), so consecutive segments
 * join into one pipeline. Thin line, small junction nodes, forest active fill
 * that draws in when the section enters view. No curves, no bars, never behind
 * text (nodes sit in the gutter). RTL flips the anchor via inset-inline-start.
 */
const NODES: Record<string, number[]> = {
  integrations: [26, 52, 78],
  capabilities: [12, 28, 44, 60, 76, 92],
  method: [12, 38, 64, 90],
  cta: [50],
};

export function NetRoute({
  variant,
  className,
}: {
  variant: keyof typeof NODES;
  className?: string;
}) {
  const { dir } = useI18n();
  const { ref, inView } = useInView();
  const ys = NODES[variant];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'net-route pointer-events-none absolute inset-y-0 z-0',
        dir === 'rtl' && 'net-route--rtl',
        className
      )}
    >
      <span className="net-line" />
      <span className={cn('net-line-active', inView && 'is-in')} />
      {ys.map((y, i) => (
        <span
          key={i}
          className={cn('net-node', inView && 'is-in')}
          style={{ top: `${y}%`, transitionDelay: `${120 + i * 90}ms` }}
        />
      ))}
    </div>
  );
}
