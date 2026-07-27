'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { PageHero } from '@/components/site/PageHero';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { SectionHeading } from '@/components/site/SectionHeading';
import { IndustryCard } from '@/components/site/IndustryCard';
import { CTASection } from '@/components/site/CTASection';

export default function IndustriesPage() {
  const { dict } = useI18n();
  const ind = dict.industries;

  return (
    <>
      <PageHero
        eyebrow={ind.hero.eyebrow}
        title={ind.hero.title}
        subtitle={ind.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: ind.hero.eyebrow, href: '/industries' }]} />

      <section className="py-20 lg:py-24">
        <div className="container-tello">
          <SectionHeading
            eyebrow={ind.overview.eyebrow}
            title={ind.overview.title}
            subtitle={ind.overview.subtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ind.industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        className="py-20 lg:py-24"
        eyebrow={ind.cta.eyebrow}
        title={ind.cta.title}
        subtitle={ind.cta.subtitle}
        primaryCta={ind.cta.primaryCta}
        secondaryCta={ind.cta.secondaryCta}
        primaryHref="/consult"
        secondaryHref="/contact"
      />
    </>
  );
}
