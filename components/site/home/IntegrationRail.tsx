'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

/**
 * Integrations — not a logo grid. A slow two-row drift of tool names on a wire,
 * resolving toward "one operating layer". Reduced-motion → static wrapped list.
 * Names only (no logo assets, no "trusted by / partner / certified").
 */
export function IntegrationRail() {
  const { dict } = useI18n();
  const t = dict.home.tools;
  const { ref, inView } = useInView();

  const mid = Math.ceil(t.items.length / 2);
  const rowA = t.items.slice(0, mid);
  const rowB = t.items.slice(mid);

  return (
    <div>
      <SectionHead label={t.eyebrow} title={t.title} lead={t.subtitle} />

      <div
        ref={ref}
        className={cn('reveal-fade mt-14 space-y-5', inView && 'is-in')}
      >
        <MarqueeRow items={rowA} reverse={false} />
        <MarqueeRow items={rowB} reverse />
      </div>

      <div className="mt-10 flex items-center gap-4 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-faint">
        <span className="h-px flex-1 bg-line" />
        <span className="whitespace-nowrap text-brand">One operating layer</span>
        <span className="h-px w-8 shrink-0 bg-brand" />
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse: boolean }) {
  // Tripled so the -33.333% loop is seamless.
  const loop = [...items, ...items, ...items];
  return (
    <div className="mask-fade-edges overflow-hidden border-b border-line pb-4">
      <ul
        className={cn(
          'marquee-track flex w-max items-center gap-x-10 will-change-transform',
          reverse ? 'marquee-r' : 'marquee-l'
        )}
      >
        {loop.map((name, i) => (
          <li
            key={`${name}-${i}`}
            className="flex items-center gap-x-10 whitespace-nowrap text-[0.95rem] text-ink-muted"
          >
            {name}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
          </li>
        ))}
      </ul>
    </div>
  );
}
