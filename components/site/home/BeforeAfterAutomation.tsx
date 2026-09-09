'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

/** Manual work never quite lines up; the offsets say so without a caption. */
const DRIFT = [
  { x: 0, r: -0.5 },
  { x: 14, r: 0.45 },
  { x: 5, r: -0.35 },
];

/**
 * Operations, rewired — the operational control plane.
 *
 * Three zones read left to right: disconnected manual modules, the automation
 * layer that coordinates them, and the coordinated result. It is a static
 * composition; the only motion is a one-time entrance, and the section reads
 * exactly the same with motion disabled.
 */
export function BeforeAfterAutomation() {
  const { dict, dir } = useI18n();
  const t = dict.home.beforeAfter;
  const rtl = dir === 'rtl';
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden">
      <div className="container-page relative z-10 border-t border-line pt-14 pb-20 sm:pt-18 sm:pb-[calc(6rem+12svh)] lg:pt-20 lg:pb-[calc(7rem+14svh)]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionHead label={t.eyebrow} title={t.title} />
          </div>
          <p className="max-w-xl text-[0.98rem] leading-relaxed text-ink-muted lg:col-span-5 lg:col-start-8">
            {t.lead}
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-14"
        >
          {/* ---- Manual mode ------------------------------------------- */}
          <div>
            <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              {t.beforeLabel}
            </span>
            <ul className="mt-5 flex flex-col gap-4 sm:gap-5">
              {t.pairs.map((pair, index) => (
                <li
                  key={pair.before}
                  className={cn(
                    'reveal-up border border-dashed border-[hsl(var(--ds-ink)/0.28)] bg-[hsl(var(--ds-ink)/0.035)] px-5 py-4 sm:min-h-[5.5rem]',
                    inView && 'is-in'
                  )}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                    transform: inView
                      ? `translateX(${(rtl ? -1 : 1) * DRIFT[index].x}px) rotate(${DRIFT[index].r}deg)`
                      : undefined,
                  }}
                >
                  <p className="text-[0.98rem] leading-snug text-ink">{pair.before}</p>
                  <p className="mt-1.5 text-[0.85rem] leading-snug text-ink-muted">
                    {pair.beforeNote}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Automation layer -------------------------------------- */}
          <div className="relative flex items-center gap-4 lg:w-[7.5rem] lg:flex-col lg:gap-0 lg:self-stretch lg:pt-[3.1rem]">
            {/* Mobile: a labelled seam between the two modes. */}
            <span className="h-px flex-1 bg-line lg:hidden" />
            <span className="whitespace-nowrap text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand lg:hidden">
              {t.coreLabel}
            </span>
            <span className="h-px flex-1 bg-line lg:hidden" />

            {/* Desktop: one vertical core, with a junction per module row. */}
            <div className="relative hidden w-full flex-1 lg:block">
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line-strong" />
              <span className="absolute inset-y-6 left-1/2 w-[3px] -translate-x-1/2 bg-brand" />
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand" />
              <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand" />

              {[16.5, 50, 83.5].map((top) => (
                <span key={top} className="absolute left-0 w-full" style={{ top: `${top}%` }}>
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
                  <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-brand bg-paper" />
                </span>
              ))}
            </div>
            <span className="hidden pt-5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-brand lg:block">
              {t.coreLabel}
            </span>
          </div>

          {/* ---- System mode ------------------------------------------- */}
          <div>
            <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand">
              {t.afterLabel}
            </span>
            <ul className="mt-5 flex flex-col gap-4 sm:gap-5">
              {t.pairs.map((pair, index) => (
                <li
                  key={pair.after}
                  className={cn(
                    'reveal-up flex items-center border border-s-2 border-line border-s-brand bg-[hsl(var(--ds-paper-raised))] px-5 py-4 sm:min-h-[5.5rem]',
                    inView && 'is-in'
                  )}
                  style={{ transitionDelay: `${160 + index * 80}ms` }}
                >
                  <p className="text-[clamp(1rem,1.5vw,1.15rem)] leading-snug text-ink">
                    {pair.after}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
