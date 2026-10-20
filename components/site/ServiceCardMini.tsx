'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getIcon, ArrowRight, ArrowLeft } from '@/lib/icons';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { Check } from 'lucide-react';
import type { ServiceCardData } from '@/lib/i18n/dictionary';

export function ServiceCardMini({
  service,
  index,
  className,
}: {
  service: ServiceCardData;
  index: number;
  className?: string;
}) {
  const { dict, dir } = useI18n();
  const Icon = getIcon(service.icon);
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const isComingSoon = service.href === '#';

  return (
    <Link
      href={service.href}
      className={cn(
        'hover-lift border-glow group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7',
        className
      )}
    >
      {/* Top accent line on featured card */}
      {index === 1 && (
        <span className="absolute -top-px left-7 right-7 h-px bg-gradient-to-r from-transparent via-[hsl(var(--neon))] to-transparent" />
      )}

      {/* Custom visual: animated icon ring */}
      <div className="relative inline-flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 rounded-2xl border border-[hsl(var(--neon)/0.2)] transition-all duration-500 group-hover:scale-110 group-hover:border-[hsl(var(--neon)/0.5)] group-hover:shadow-[0_0_24px_hsl(var(--neon)/0.3)]" />
        <div className="absolute inset-0 rounded-2xl bg-[hsl(var(--neon)/0.05)] transition-all duration-500 group-hover:bg-[hsl(var(--neon)/0.1)]" />
        <Icon className="relative h-6 w-6 text-[hsl(var(--neon))]" />
      </div>

      <h3 className="mt-5 text-xl font-bold text-white">{service.title}</h3>
      <p className="mt-1 text-sm font-medium text-[hsl(var(--neon))]">{service.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/55">{service.description}</p>

      <ul className="mt-5 space-y-2.5">
        {service.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-[hsl(var(--neon))]">
        {isComingSoon ? dict.components.comingSoon : dict.actions.learnMore}
        <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </div>
    </Link>
  );
}
