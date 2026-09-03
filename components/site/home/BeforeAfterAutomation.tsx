'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { usePinnedProgress } from '@/lib/usePinnedProgress';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => value * value * (3 - 2 * value);
const SCATTER = [
  { x: -34, y: 22, r: -2.8 },
  { x: 42, y: -12, r: 2.2 },
  { x: -18, y: -24, r: 1.8 },
  { x: 31, y: 28, r: -2.1 },
];

/** A pinned scene that resolves scattered manual work into one ordered system. */
export function BeforeAfterAutomation() {
  const { dict, dir } = useI18n();
  const t = dict.home.beforeAfter;
  const { ref, progress } = usePinnedProgress<HTMLElement>();
  const scene = ease(clamp((progress - 0.1) / 0.78));

  return (
    <section ref={ref} className="relative min-h-[200svh] sm:min-h-[215svh] lg:min-h-[230svh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-page relative z-10 border-t border-line py-8 sm:py-10 lg:py-12">
          <div className="grid gap-5 sm:grid-cols-12 sm:items-end">
            <div className="sm:col-span-7">
              <span className="eyebrow">{t.eyebrow}</span>
              <h2 className="text-display mt-4 max-w-2xl text-[clamp(1.75rem,4.4vw,3.25rem)] text-ink">
                {t.title}
              </h2>
            </div>
            <div className="flex items-center gap-3 text-end sm:col-span-4 sm:col-start-9 sm:justify-end">
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint"
                style={{ opacity: 1 - scene }}
              >
                {t.beforeLabel}
              </span>
              <span className="h-px w-10 bg-line" />
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand"
                style={{ opacity: 0.3 + scene * 0.7 }}
              >
                {t.afterLabel}
              </span>
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-2 gap-x-5 gap-y-4 sm:mt-12 sm:gap-x-12 sm:gap-y-7 lg:ms-auto lg:w-[82%]">
            {t.pairs.map((pair, index) => {
              const local = ease(clamp((scene - index * 0.055) / 0.82));
              const scatter = SCATTER[index];
              const x = scatter.x * (dir === 'rtl' ? -1 : 1) * (1 - local);

              return (
                <article
                  key={pair.before}
                  className="relative min-h-[7rem] border-t border-line py-4 sm:min-h-[9rem] sm:py-5"
                  style={{
                    transform: `translate3d(${x}px, ${scatter.y * (1 - local)}px, 0) rotate(${scatter.r * (1 - local)}deg)`,
                  }}
                >
                  <span className="text-display text-[0.68rem] tabular-nums text-ink-faint">
                    0{index + 1}
                  </span>
                  <div className="relative mt-3 min-h-[2.5rem] sm:mt-4">
                    <p
                      className="text-display absolute inset-x-0 top-0 text-[clamp(1.15rem,3.4vw,2.25rem)] text-ink"
                      style={{
                        opacity: 1 - local,
                        transform: `translate3d(0, ${-8 * local}px, 0)`,
                      }}
                    >
                      {pair.before}
                    </p>
                    <p
                      className="text-display absolute inset-x-0 top-0 text-[clamp(1.15rem,3.4vw,2.25rem)] text-brand"
                      style={{
                        opacity: local,
                        transform: `translate3d(0, ${(1 - local) * 12}px, 0)`,
                      }}
                    >
                      {pair.after}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
