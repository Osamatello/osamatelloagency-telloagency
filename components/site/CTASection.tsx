'use client';

import Link from '@/components/site/LocaleLink';
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
        <div className="text-center">
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
