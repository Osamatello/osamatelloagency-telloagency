'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { PageHero } from '@/components/site/PageHero';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { PricingCard } from '@/components/site/PricingCard';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { CTASection } from '@/components/site/CTASection';

export default function PricingPage() {
  const { dict } = useI18n();
  const pricing = dict.pricing;
  const plans = dict.home.pricingPreview.plans;

  return (
    <>
      <PageHero
        eyebrow={pricing.hero.eyebrow}
        title={pricing.hero.title}
        subtitle={pricing.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: pricing.hero.eyebrow, href: '/pricing' }]} />

      {/* Pricing cards */}
      <section className="py-20 lg:py-24">
        <div className="container-tello">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/50">{pricing.note}</p>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="border-t border-white/5 bg-[hsl(0_0%_3%)] py-20 lg:py-24">
        <div className="container-tello">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
            {dict.home.faqPreview.eyebrow}
          </h2>
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion items={pricing.faqs} />
          </div>
        </div>
      </section>

      <CTASection
        className="py-20 lg:py-24"
        eyebrow={pricing.cta.eyebrow}
        title={pricing.cta.title}
        subtitle={pricing.cta.subtitle}
        primaryCta={pricing.cta.primaryCta}
        secondaryCta={pricing.cta.secondaryCta}
        primaryHref="/consult"
        secondaryHref="/contact"
      />
    </>
  );
}
