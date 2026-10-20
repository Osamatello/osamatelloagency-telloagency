'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MagneticText } from '@/components/site/MagneticText';

interface CTASectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta?: string;
  primaryHref?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTASection({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  primaryHref = '/contact',
  secondaryHref = '/services',
  className,
}: CTASectionProps) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div className="container-tello">
        <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--neon))/0.25] bg-gradient-to-br from-[hsl(var(--ds-paper-raised)/0.85)] to-[hsl(var(--ds-paper-sunken)/0.85)] px-6 py-16 text-center sm:px-12">
          <div className="absolute inset-0 bg-tello-radial opacity-60" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--neon))] to-transparent" aria-hidden="true" />
          <div className="relative">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mx-auto mt-5 max-w-2xl text-display text-3xl text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticText as="span" strength={0.2} className="w-full sm:w-auto">
                <Link href={primaryHref} className="btn-primary w-full sm:w-auto">
                  {primaryCta}
                </Link>
              </MagneticText>
              {secondaryCta ? (
                <MagneticText as="span" strength={0.2} className="w-full sm:w-auto">
                  <Link href={secondaryHref} className="btn-outline w-full sm:w-auto">
                    {secondaryCta}
                  </Link>
                </MagneticText>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
