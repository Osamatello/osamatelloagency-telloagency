'use client';

import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const { dict, dir } = useI18n();
  const Chevron = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const all = [{ label: dict.components.breadcrumbsHome, href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={cn('container-tello pt-6', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-white/80" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-[hsl(var(--neon))]">
                  {item.label}
                </Link>
              )}
              {!last && <Chevron className="h-3.5 w-3.5 text-white/30" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
