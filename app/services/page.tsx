'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { PageHero } from '@/components/site/PageHero';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { SectionHeading } from '@/components/site/SectionHeading';
import { ServiceCardMini } from '@/components/site/ServiceCardMini';
import { ProcessTimeline } from '@/components/site/ProcessTimeline';
import { CTASection } from '@/components/site/CTASection';

export default function ServicesPage() {
  const { dict } = useI18n();
  const services = dict.services;

  return (
    <>
      <PageHero
        eyebrow={services.hero.eyebrow}
        title={services.hero.title}
        subtitle={services.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: services.hero.eyebrow, href: '/services' }]} />

      {/* Service cards — each links to its dedicated page */}
      <section className="py-24 lg:py-32">
        <div className="container-tello">
          <div className="grid gap-6 md:grid-cols-3">
            {dict.home.servicesOverview.services.map((service, i) => (
              <ServiceCardMini key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process — horizontal timeline */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={services.detail.process}
            title={dict.home.howItWorks.title}
            subtitle={dict.home.howItWorks.subtitle}
          />
          <div className="mt-16">
            <ProcessTimeline steps={services.detail.processSteps} />
          </div>
        </div>
      </section>

      <CTASection
        className="py-24 lg:py-32"
        eyebrow={services.cta.eyebrow}
        title={services.cta.title}
        subtitle={services.cta.subtitle}
        primaryCta={services.cta.primaryCta}
        secondaryCta={services.cta.secondaryCta}
        primaryHref="/consult"
        secondaryHref="/pricing"
      />
    </>
  );
}
