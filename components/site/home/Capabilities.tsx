'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

type Item = { index: string; title: string; summary: string; href: string };

/**
 * Capabilities — no cards. Six large editorial rows on hairlines.
 * Hover/focus: title → forest, arrow displaces, row lifts subtly.
 */
export function Capabilities() {
  const { dict, dir } = useI18n();
  const t = dict.home.capabilities;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div>
      <SectionHead label={t.eyebrow} title={t.title} />
      <ul className="mt-12 border-t border-line sm:mt-14">
        {t.items.map((item, i) => (
          <Row key={item.index} item={item} Arrow={Arrow} delay={i * 55} />
        ))}
      </ul>
    </div>
  );
}

function Row({
  item,
  Arrow,
  delay,
}: {
  item: Item;
  Arrow: typeof ArrowRight;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={cn('reveal-up border-b border-line', inView && 'is-in')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link
        href={item.href}
        className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 gap-y-3 py-7 transition-colors sm:py-8 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.35fr)_auto] md:gap-x-8"
      >
        <span className="text-display text-sm tabular-nums text-ink-faint">
          {item.index}
        </span>
        <h3 className="text-display text-[clamp(1.3rem,2.6vw,1.85rem)] text-ink transition-colors duration-300 group-hover:text-brand">
          {item.title}
        </h3>
        <p className="col-span-2 col-start-1 max-w-md text-sm leading-relaxed text-ink-muted md:col-span-1 md:col-start-3 md:max-w-none">
          {item.summary}
        </p>
        <span className="justify-self-end self-center text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand rtl:group-hover:-translate-x-1">
          <Arrow className="h-5 w-5" />
        </span>
      </Link>
    </li>
  );
}
