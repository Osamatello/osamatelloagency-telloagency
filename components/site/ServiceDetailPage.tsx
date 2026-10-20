'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { SectionHeading } from '@/components/site/SectionHeading';
import { WorkflowDiagram } from '@/components/site/WorkflowDiagram';
import { BenefitTimeline } from '@/components/site/BenefitTimeline';
import { CTASection } from '@/components/site/CTASection';
import { ServiceAtmosphere } from '@/components/site/services/ServiceAtmosphere';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icons';
import type { ServiceDetail } from '@/lib/services-data';

/**
 * `#service-page` opts the route into the dark DAMASAVERO token scope in
 * globals.css, and the fragment atmosphere drifts behind every section.
 */
export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  const { dict, dir } = useI18n();
  const Icon = getIcon(service.icon);

  return (
    <article id="service-page" dir={dir} className="relative isolate bg-transparent text-ink">
      <ServiceAtmosphere />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-12">
        <div className="container-tello relative">
          <div className="mx-auto max-w-3xl py-16 text-center lg:py-24">
            <div className="animate-fade-up inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[hsl(var(--neon)/0.3)] bg-[hsl(var(--neon)/0.08)]">
              <Icon className="h-7 w-7 text-[hsl(var(--neon))]" />
            </div>
            <span className="animate-fade-up mt-6 block eyebrow" style={{ animationDelay: '60ms' }}>
              {service.hero.eyebrow}
            </span>
            <h1
              className="text-display mt-4 animate-fade-up text-3xl text-ink sm:text-4xl lg:text-5xl"
              style={{ animationDelay: '120ms' }}
            >
              {service.hero.title}
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink-muted"
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
                className="hover-lift animate-fade-up-stagger group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-[hsl(var(--ds-paper-raised)/0.7)] to-transparent p-7"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="pointer-events-none absolute -right-2 -top-4 text-7xl font-black text-[hsl(var(--ds-ink)/0.05)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-[hsl(var(--neon)/0.3)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTION — split layout with check list ===== */}
      <section className="border-y border-line py-24 lg:py-32">
        <div className="container-tello">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="lg:sticky lg:top-24">
              <span className="eyebrow">{service.solution.eyebrow}</span>
              <h2 className="mt-4 text-display text-3xl text-ink sm:text-4xl">
                {service.solution.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">{service.solution.subtitle}</p>
            </div>
            <div className="space-y-4">
              {service.solution.items.map((item, i) => (
                <div
                  key={item.title}
                  className="hover-lift animate-fade-up-stagger flex gap-4 rounded-xl border border-line bg-[hsl(var(--ds-paper-raised)/0.55)] p-5"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[hsl(var(--neon)/0.3)] bg-[hsl(var(--neon)/0.1)] text-xs font-bold text-[hsl(var(--neon))]">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
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
      <section className="border-y border-line py-24 lg:py-32">
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

      {/* ===== FAQ — the homepage accordion ===== */}
      <ServiceFaq faq={service.faq} slug={service.slug} />

      {/* ===== CTA ===== */}
      <CTASection
        className="py-24 lg:py-32"
        eyebrow={service.cta.eyebrow}
        title={service.cta.title}
        subtitle={service.cta.subtitle}
        primaryCta={service.cta.primaryCta}
        secondaryCta={service.cta.secondaryCta}
        primaryHref="/contact"
        secondaryHref="/services"
      />
    </article>
  );
}

function ServiceFaq({ faq, slug }: { faq: ServiceDetail['faq']; slug: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="py-24 lg:py-32">
      <div ref={ref} className="container-tello grid gap-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-4">
          <span className={cn('eyebrow reveal-up', inView && 'is-in')}>{faq.eyebrow}</span>
          <h2
            className={`text-display ${cn('reveal-up mt-5 max-w-2xl text-[clamp(1.6rem,3.2vw,2.4rem)] text-ink', inView && 'is-in')}`}
            style={{ transitionDelay: '80ms' }}
          >
            {faq.title}
          </h2>
        </div>
        <dl className="border-t border-line lg:col-span-7 lg:col-start-6">
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            const answerId = `${slug}-faq-answer-${index}`;
            return (
              <div
                key={item.q}
                className={cn('reveal-up border-b py-1 transition-colors duration-500', inView && 'is-in', open ? 'border-[hsl(var(--brand)/0.38)]' : 'border-line')}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={answerId}
                    className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-start focus-visible:outline-none"
                  >
                    <span className={`text-display ${cn('text-[clamp(1rem,2vw,1.2rem)] transition-[color,transform] duration-500', open ? 'translate-x-1 text-brand rtl:-translate-x-1' : 'text-ink group-hover:text-brand')}`}>
                      {item.q}
                    </span>
                    <span aria-hidden="true" className={cn('h-5 w-5 shrink-0 transition-[color,transform] duration-500', open ? 'rotate-45 text-brand' : 'text-ink-muted group-hover:text-brand')}>
                      <svg viewBox="0 0 20 20" fill="none" className="h-full w-full">
                        <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd id={answerId} aria-hidden={!open} className={cn('grid max-w-2xl transition-[grid-template-rows,opacity] duration-500 ease-out', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                  <div className="overflow-hidden">
                    <p className="pb-5 pe-10 text-sm leading-relaxed text-ink-muted transition-transform duration-500 ease-out" style={{ transform: open ? 'translateY(0)' : 'translateY(-0.45rem)' }}>
                      {item.a}
                    </p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
