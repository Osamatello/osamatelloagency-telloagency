'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { usePinnedProgress } from '@/lib/usePinnedProgress';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => value * value * (3 - 2 * value);
const SCATTER = [
  { x: -10, y: 7, r: -1.2 },
  { x: 12, y: -6, r: 1.1 },
  { x: -7, y: -5, r: 0.9 },
  { x: 9, y: 7, r: -1 },
  { x: -11, y: 5, r: 0.8 },
  { x: 8, y: -7, r: -0.9 },
];

/** A pinned scene that resolves scattered manual work into one ordered system. */
export function BeforeAfterAutomation() {
  const { dict, dir } = useI18n();
  const t = dict.home.beforeAfter;
  const { ref, progress } = usePinnedProgress<HTMLElement>();
  const scene = ease(clamp((progress - 0.08) / 0.82));

  return (
    <section ref={ref} className="relative min-h-[165svh] sm:min-h-[175svh] lg:min-h-[190svh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-page relative z-10 border-t border-line py-6 sm:py-10 lg:py-12">
          <div className="grid gap-5 sm:grid-cols-12 sm:items-end">
            <div className="sm:col-span-7">
              <span className="eyebrow">{t.eyebrow}</span>
              <h2 className="text-display mt-4 max-w-2xl text-[clamp(1.75rem,4.4vw,3.25rem)] text-ink">
                {t.title}
              </h2>
            </div>
            <div className="flex items-center gap-3 sm:col-span-4 sm:col-start-9 sm:justify-end">
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors text-ink-faint"
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

          <div className="relative mt-6 grid grid-cols-1 gap-y-0 sm:mt-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-7 lg:ms-auto lg:w-[82%]">
            {t.pairs.map((pair, index) => {
              const local = ease(clamp((scene - index * 0.11) / 0.28));
              const scatter = SCATTER[index];
              const x = scatter.x * (dir === 'rtl' ? -1 : 1) * (1 - local);
              const outgoing = 1 - ease(clamp(local / 0.46));
              const incoming = ease(clamp((local - 0.54) / 0.46));

              return (
                <article
                  key={pair.before}
                  className="relative min-h-[4.65rem] border-t border-line py-3 sm:min-h-[9rem] sm:py-5"
                  style={{
                    transform: `translate3d(${x}px, ${scatter.y * (1 - local)}px, 0) rotate(${scatter.r * (1 - local)}deg)`,
                  }}
                >
                  <span className="text-display text-[0.68rem] tabular-nums text-ink-faint">
                    0{index + 1}
                  </span>
                  <div className="mt-1.5 h-[2rem] overflow-hidden sm:mt-4 sm:h-[3rem]">
                    <div
                      className="h-[4rem] sm:h-[6rem]"
                      style={{ transform: `translate3d(0, ${-local * 50}%, 0)` }}
                    >
                      <p
                        className="text-display flex h-1/2 items-center text-[clamp(0.95rem,2.7vw,1.85rem)] text-ink"
                        style={{ opacity: outgoing, transform: `scale(${1 - local * 0.035})` }}
                      >
                        {pair.before}
                      </p>
                      <p
                        className="text-display flex h-1/2 items-center text-[clamp(0.95rem,2.7vw,1.85rem)] text-brand"
                        style={{ opacity: incoming, transform: `scale(${0.965 + local * 0.035})` }}
                      >
                        {pair.after}
                      </p>
                    </div>
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
