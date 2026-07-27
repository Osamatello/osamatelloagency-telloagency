'use client';

import Link from 'next/link';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { PageHero } from '@/components/site/PageHero';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { SectionHeading } from '@/components/site/SectionHeading';
import { FeatureCard } from '@/components/site/FeatureCard';
import { CTASection } from '@/components/site/CTASection';

export default function ConsultPage() {
  const { dict, dir } = useI18n();
  const consult = dict.consult;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <>
      <PageHero
        eyebrow={consult.hero.eyebrow}
        title={consult.hero.title}
        subtitle={consult.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: consult.hero.eyebrow, href: '/consult' }]} />

      {/* Benefits */}
      <section className="py-20 lg:py-24">
        <div className="container-tello">
          <SectionHeading
            eyebrow={consult.benefits.eyebrow}
            title={consult.benefits.title}
            subtitle={consult.benefits.subtitle}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {consult.benefits.items.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* What we'll discuss */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-20 lg:py-24">
        <div className="container-tello grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={consult.discuss.eyebrow}
              title={consult.discuss.title}
              subtitle={consult.discuss.subtitle}
              align="left"
            />
            <Link href="/contact" className="btn-neon mt-8">
              {consult.cta.primaryCta}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-4">
              {consult.discuss.items.map((item) => (
                <li
                  key={item}
                  className="card-tello card-tello-hover flex items-start gap-3 p-5"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[hsl(var(--neon))/0.3] bg-[hsl(var(--neon))/0.1] text-[hsl(var(--neon))]">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-white/75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        className="py-20 lg:py-24"
        eyebrow={consult.cta.eyebrow}
        title={consult.cta.title}
        subtitle={consult.cta.subtitle}
        primaryCta={consult.cta.primaryCta}
        secondaryCta={consult.cta.secondaryCta}
        primaryHref="/contact"
        secondaryHref="/services"
      />
    </>
  );
}
