'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { SectionHeading } from '@/components/site/SectionHeading';
import { WorkflowDiagram } from '@/components/site/WorkflowDiagram';
import { BenefitTimeline } from '@/components/site/BenefitTimeline';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { CTASection } from '@/components/site/CTASection';
import { AuroraBackground } from '@/components/site/AuroraBackground';
import { getIcon } from '@/lib/icons';
import type { ServiceDetail } from '@/lib/services-data';

export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  const { dict } = useI18n();
  const Icon = getIcon(service.icon);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-12">
        <AuroraBackground />
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-30" aria-hidden="true" />

        <div className="container-tello relative">
          <div className="mx-auto max-w-3xl py-16 text-center lg:py-24">
            <div className="animate-fade-up inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[hsl(var(--neon)/0.3)] bg-[hsl(var(--neon)/0.08)]">
              <Icon className="h-7 w-7 text-[hsl(var(--neon))]" />
            </div>
            <span className="animate-fade-up mt-6 block eyebrow" style={{ animationDelay: '60ms' }}>
              {service.hero.eyebrow}
            </span>
            <h1
              className="mt-4 animate-fade-up text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ animationDelay: '120ms' }}
            >
              {service.hero.title}
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/55"
              style={{ animationDelay: '180ms' }}
            >
              {service.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: dict.nav[2].label, href: '/services' }, { label: service.name, href: `/services/${service.slug}` }]} />

      {/* ===== PAIN POINTS — large cards ===== */}
      <section className="py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={service.painPoints.eyebrow}
            title={service.painPoints.title}
            subtitle={service.painPoints.subtitle}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {service.painPoints.items.map((item, i) => (
              <div
                key={item.title}
                className="hover-lift animate-fade-up-stagger group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="pointer-events-none absolute -right-2 -top-4 text-7xl font-black text-white/[0.04]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{item.description}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-[hsl(var(--neon)/0.3)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTION — split layout with check list ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-24 lg:py-32">
        <div className="container-tello">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="lg:sticky lg:top-24">
              <span className="eyebrow">{service.solution.eyebrow}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {service.solution.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/55">{service.solution.subtitle}</p>
            </div>
            <div className="space-y-4">
              {service.solution.items.map((item, i) => (
                <div
                  key={item.title}
                  className="hover-lift animate-fade-up-stagger flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[hsl(var(--neon)/0.3)] bg-[hsl(var(--neon)/0.1)] text-xs font-bold text-[hsl(var(--neon))]">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WORKFLOW — animated diagram ===== */}
      <section className="py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={service.workflow.eyebrow}
            title={service.workflow.title}
            subtitle={service.workflow.subtitle}
          />
          <div className="mt-16">
            <WorkflowDiagram steps={service.workflow.steps} />
          </div>
        </div>
      </section>

      {/* ===== BENEFITS — timeline ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={service.benefits.eyebrow}
            title={service.benefits.title}
            subtitle={service.benefits.subtitle}
          />
          <div className="mx-auto mt-16 max-w-3xl">
            <BenefitTimeline items={service.benefits.items} />
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={service.faq.eyebrow}
            title={service.faq.title}
            subtitle={service.faq.subtitle}
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <FAQAccordion items={service.faq.items} />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CTASection
        className="py-24 lg:py-32"
        eyebrow={service.cta.eyebrow}
        title={service.cta.title}
        subtitle={service.cta.subtitle}
        primaryCta={service.cta.primaryCta}
        secondaryCta={service.cta.secondaryCta}
        primaryHref="/consult"
        secondaryHref="/pricing"
      />
    </>
  );
}
