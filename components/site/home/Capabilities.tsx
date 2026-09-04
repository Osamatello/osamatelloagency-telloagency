'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { SectionHead } from './SectionHead';

/** Spatial capability field: six persistent points aligned into three paired rows. */
export function Capabilities() {
  const { dict, dir } = useI18n();
  const t = dict.home.capabilities;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden">
      <div className="container-page relative z-10 border-t border-line pt-14 pb-5 sm:pt-16 sm:pb-6 lg:pt-20 lg:pb-8">
        <SectionHead label={t.eyebrow} title={t.title} />

        <ol className="mt-10 grid gap-x-16 gap-y-10 sm:mt-12 sm:grid-cols-2 sm:gap-y-12 lg:gap-x-24 lg:gap-y-14">
          {t.items.map((item) => (
            <li key={item.index} className="min-w-0">
              <Link
                href={item.href}
                className="group block h-full border-t border-line pt-4 transition-transform duration-300 hover:-translate-y-1 sm:pt-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[clamp(1.05rem,2vw,1.3rem)] font-medium leading-tight text-ink transition-colors duration-300 group-hover:text-brand rtl:leading-[1.35]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[0.98rem] leading-relaxed text-ink-muted">
                      {item.summary}
                    </p>
                  </div>
                  <Arrow className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-brand rtl:group-hover:-translate-x-1" />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
