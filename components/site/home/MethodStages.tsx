'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';

/**
 * Method — kept deliberately plain. Asymmetric: a short statement on one side,
 * four numbered stages on tight hairlines on the other. No cards.
 */
export function MethodStages() {
  const { dict } = useI18n();
  const t = dict.home.howItWorks;
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <span className={cn('eyebrow reveal-up', inView && 'is-in')}>
          {t.eyebrow}
        </span>
        <h2
          className={cn(
            'text-display reveal-up mt-5 text-[clamp(1.6rem,3.2vw,2.4rem)] text-ink',
            inView && 'is-in'
          )}
          style={{ transitionDelay: '80ms' }}
        >
          {t.title}
        </h2>
        <p
          className={cn(
            'reveal-up mt-4 max-w-xs text-sm leading-relaxed text-ink-muted',
            inView && 'is-in'
          )}
          style={{ transitionDelay: '160ms' }}
        >
          {t.subtitle}
        </p>
      </div>

      <ol className="lg:col-span-7 lg:col-start-6">
        {t.steps.map((s, i) => (
          <li
            key={s.step}
            className={cn(
              'reveal-up grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-t border-line py-6 last:border-b',
              inView && 'is-in'
            )}
            style={{ transitionDelay: `${200 + i * 70}ms` }}
          >
            <span className="text-display text-sm tabular-nums text-brand">
              {s.step}
            </span>
            <div>
              <h3 className="text-display text-[clamp(1.15rem,2.2vw,1.5rem)] text-ink">
                {s.title}
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-muted">
                {s.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
