'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { usePinnedProgress } from '@/lib/usePinnedProgress';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => 1 - Math.pow(1 - value, 3);

/** A pinned scene that accumulates all six capabilities as scroll progresses. */
export function Capabilities() {
  const { dict, dir } = useI18n();
  const t = dict.home.capabilities;
  const { ref, progress } = usePinnedProgress<HTMLElement>();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const headingProgress = ease(clamp(progress / 0.1));

  return (
    <section ref={ref} className="relative min-h-[165svh] sm:min-h-[175svh] lg:min-h-[190svh]">
      <div className="sticky top-0 flex h-[100svh] items-start overflow-hidden">
        <div className="container-page relative z-10 border-t border-line py-8 sm:py-10 lg:py-12">
          <div
            className="grid gap-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-end"
            style={{
              opacity: headingProgress,
              transform: `translate3d(0, ${(1 - headingProgress) * 18}px, 0)`,
            }}
          >
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="text-display text-[clamp(1.7rem,4.4vw,3.2rem)] text-ink sm:text-end">
              {t.title}
            </h2>
          </div>

          <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-0 sm:mt-8 sm:gap-x-10 lg:mt-10 lg:gap-x-20">
            {t.items.map((item, index) => {
              const start = 0.08 + index * 0.125;
              const amount = ease(clamp((progress - start) / 0.13));
              const direction = (index % 2 === 0 ? -1 : 1) * (dir === 'rtl' ? -1 : 1);
              const finalOffset = index % 3 === 1 ? 12 : index % 3 === 2 ? -8 : 0;

              return (
                <li
                  key={item.index}
                  className="border-t border-line"
                  style={{
                    opacity: amount,
                    transform: `translate3d(${direction * (1 - amount) * 54 + finalOffset * amount}px, ${(1 - amount) * 14}px, 0)`,
                    pointerEvents: amount > 0.85 ? 'auto' : 'none',
                  }}
                >
                  <Link
                    href={item.href}
                    className="group grid min-h-[6.2rem] grid-cols-[auto_1fr] content-center gap-x-2 py-3 sm:min-h-[7.5rem] sm:gap-x-4 sm:py-4 lg:min-h-[8.4rem]"
                  >
                    <span className="text-display text-[0.65rem] tabular-nums text-brand sm:text-xs">
                      {item.index}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-display text-[clamp(0.95rem,2.1vw,1.55rem)] leading-[1.02] text-ink transition-colors duration-300 group-hover:text-brand rtl:leading-[1.25]">
                          {item.title}
                        </h3>
                        <Arrow className="mt-0.5 hidden h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand rtl:group-hover:-translate-x-1 sm:block" />
                      </div>
                      <p className="mt-1.5 text-[0.68rem] leading-snug text-ink-muted sm:mt-2 sm:text-xs sm:leading-relaxed lg:max-w-md">
                        {item.summary}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
