'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const placements = [
  'lg:col-start-1 lg:col-span-5',
  'lg:col-start-8 lg:col-span-5 lg:mt-14',
  'lg:col-start-2 lg:col-span-5 lg:mt-4',
  'lg:col-start-7 lg:col-span-5 lg:-mt-5',
  'lg:col-start-1 lg:col-span-5 lg:mt-7',
  'lg:col-start-8 lg:col-span-5 lg:mt-1',
];

/** Spatial capability field: six persistent points arranged around the visual environment. */
export function Capabilities() {
  const { dict, dir } = useI18n();
  const t = dict.home.capabilities;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden">
      <div className="container-page relative z-10 border-t border-line py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="text-display mt-5 text-[clamp(1.6rem,3.2vw,2.4rem)] text-ink">
            {t.title}
          </h2>
        </div>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:mt-16 lg:grid-cols-12 lg:gap-y-4">
          {t.items.map((item, index) => (
            <li key={item.index} className={placements[index] ?? 'lg:col-span-5'}>
              <Link
                href={item.href}
                className="group block border-t border-line pt-4 transition-transform duration-300 hover:-translate-y-1 sm:pt-5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-display mt-1 shrink-0 text-xs tabular-nums text-brand">
                    {item.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-[clamp(1.05rem,2vw,1.3rem)] font-medium leading-tight text-ink transition-colors duration-300 group-hover:text-brand rtl:leading-[1.35]">
                        {item.title}
                      </h3>
                      <Arrow className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-brand rtl:group-hover:-translate-x-1" />
                    </div>
                    <p className="mt-2 max-w-md text-[0.98rem] leading-relaxed text-ink-muted">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
