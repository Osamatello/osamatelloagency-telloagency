'use client';

import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  className?: string;
}

export function PageHero({ eyebrow, title, subtitle, className }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden border-b border-white/5', className)}>
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-72 bg-tello-radial" aria-hidden="true" />
      <div className="container-tello relative py-16 text-center sm:py-20 lg:py-24">
        <span className="eyebrow animate-fade-up">{eyebrow}</span>
        <h1 className="mx-auto mt-5 max-w-3xl animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl" style={{ animationDelay: '60ms' }}>
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/60" style={{ animationDelay: '120ms' }}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
