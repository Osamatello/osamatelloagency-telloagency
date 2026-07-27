'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { PageHero } from '@/components/site/PageHero';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { SectionHeading } from '@/components/site/SectionHeading';
import { ServiceCardMini } from '@/components/site/ServiceCardMini';
import { WorkflowSteps } from '@/components/site/WorkflowSteps';
import { CTASection } from '@/components/site/CTASection';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function ServicesPage() {
  const { dict, dir } = useI18n();
  const services = dict.services;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <>
      <PageHero
        eyebrow={services.hero.eyebrow}
        title={services.hero.title}
        subtitle={services.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: services.hero.eyebrow, href: '/services' }]} />

      {/* Service cards */}
      <section className="py-20 lg:py-24">
        <div className="container-tello">
          <div className="grid gap-6 md:grid-cols-3">
            {dict.home.servicesOverview.services.map((service, i) => (
              <ServiceCardMini key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-20 lg:py-24">
        <div className="container-tello">
          <SectionHeading
            eyebrow={services.detail.process}
            title={dict.home.howItWorks.title}
            subtitle={dict.home.howItWorks.subtitle}
          />
          <div className="mt-14">
            <WorkflowSteps steps={services.detail.processSteps} />
          </div>
        </div>
      </section>

      <CTASection
        className="py-20 lg:py-24"
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
