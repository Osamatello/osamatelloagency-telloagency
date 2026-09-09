'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { usePinnedProgress } from '@/lib/usePinnedProgress';
import { SectionHead } from './SectionHead';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => value * value * (3 - 2 * value);

/**
 * How the work flows.
 *
 * Deliberately a different visual language from the paired rails above it: one
 * horizontal flow track carrying a travelling pulse, and a cascade of rows that
 * step further along the track as each one resolves. The pinned BEFORE → AFTER
 * scroll behaviour is unchanged.
 */
export function BeforeAfterAutomation() {
  const { dict, dir } = useI18n();
  const t = dict.home.beforeAfter;
  const { ref, progress } = usePinnedProgress<HTMLElement>();
  const scene = ease(clamp((progress - 0.08) / 0.82));
  const rtl = dir === 'rtl';
  const count = t.pairs.length;

  return (
    <section ref={ref} className="relative min-h-[165svh] sm:min-h-[175svh] lg:min-h-[190svh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-page relative z-10 w-full border-t border-line pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-12 lg:pb-10">
          <div className="grid gap-5 sm:grid-cols-12 sm:items-end">
            <div className="sm:col-span-7">
              <SectionHead label={t.eyebrow} title={t.title} />
            </div>
            <div className="flex items-center gap-3 sm:col-span-4 sm:col-start-9 sm:justify-end">
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors"
                style={{ color: scene < 0.5 ? 'hsl(var(--ds-ink))' : 'hsl(var(--ds-ink-faint))' }}
              >
                {t.beforeLabel}
              </span>
              <span className="h-px w-10 bg-line" />
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors"
                style={{ color: scene >= 0.5 ? 'hsl(var(--brand))' : 'hsl(var(--ds-ink-faint))' }}
              >
                {t.afterLabel}
              </span>
            </div>
          </div>

          {/* The flow track — one continuous movement across the whole scene. */}
          <div className="relative mt-7 h-px w-full bg-line sm:mt-10" aria-hidden="true">
            {t.pairs.map((pair, index) => (
              <span
                key={pair.before}
                className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-line-strong"
                style={{ insetInlineStart: `${(index / (count - 1)) * 100}%` }}
              />
            ))}
            <span
              className="absolute inset-y-0 start-0 bg-brand"
              style={{ width: `${scene * 100}%` }}
            />
            <span
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand"
              style={{
                insetInlineStart: `calc(${scene * 100}% - 3px)`,
                opacity: scene > 0.01 && scene < 0.995 ? 1 : 0.35,
              }}
            />
          </div>

          {/* Each step sits further along the track than the one before it. */}
          <div className="mt-4 sm:mt-6">
            {t.pairs.map((pair, index) => {
              const local = ease(clamp((scene - index * 0.115) / 0.3));

              return (
                <article
                  key={pair.before}
                  className="flex items-center gap-3 border-t border-line py-2 sm:gap-6 sm:py-3"
                  style={{ marginInlineStart: `${index * 2.6 * local}%` }}
                >
                  <span className="text-display w-6 shrink-0 text-[0.66rem] tabular-nums text-ink-faint sm:w-8">
                    {`0${index + 1}`}
                  </span>

                  <p
                    className="text-display min-w-0 flex-1 truncate text-[clamp(0.82rem,2.1vw,1.5rem)] text-ink"
                    style={{
                      opacity: 0.9 - local * 0.62,
                      transform: `translate3d(${(rtl ? 1 : -1) * local * 10}px, 0, 0) scale(${1 - local * 0.05})`,
                    }}
                  >
                    {pair.before}
                  </p>

                  <span
                    aria-hidden="true"
                    className="relative h-px w-8 shrink-0 bg-line sm:w-16"
                  >
                    <span
                      className="absolute inset-y-0 start-0 block bg-brand"
                      style={{ width: `${local * 100}%` }}
                    />
                    <span
                      className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-brand transition-opacity duration-300"
                      style={{ insetInlineEnd: '-1px', opacity: local }}
                    />
                  </span>

                  <p
                    className="text-display min-w-0 flex-1 truncate text-end text-[clamp(0.82rem,2.1vw,1.5rem)] text-brand"
                    style={{
                      opacity: local,
                      transform: `translate3d(${(rtl ? -1 : 1) * (1 - local) * 16}px, 0, 0)`,
                    }}
                  >
                    {pair.after}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
