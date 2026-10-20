'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import { ServiceAtmosphere } from '@/components/site/services/ServiceAtmosphere';
import type { ServiceDetail } from '@/lib/services-data';

/**
 * Service detail page, on the same dark DAMASAVERO identity as the homepage:
 * `#service-page` opts the route into the dark token scope in globals.css, the
 * fragment atmosphere drifts behind it, and every section is built from
 * hairlines and editorial type rather than cards.
 */
export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  const { dict, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <article id="service-page" dir={dir} className="relative isolate bg-transparent text-ink">
      <ServiceAtmosphere />

      <Hero service={service} Arrow={Arrow} crumbs={[
        { label: dict.components.breadcrumbsHome, href: '/' },
        { label: dict.nav[2].label, href: '/services' },
        { label: service.name, href: `/services/${service.slug}` },
      ]} />

      {/* ===== PROBLEM — sticky statement, indexed list ===== */}
      <Section>
        {(inView) => (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Heading inView={inView} eyebrow={service.painPoints.eyebrow} title={service.painPoints.title} lead={service.painPoints.subtitle} />
              </div>
            </div>
            <ol className="lg:col-span-6 lg:col-start-7">
              {service.painPoints.items.map((item, i) => (
                <li
                  key={item.title}
                  className={cn('reveal-up grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-7 last:border-b sm:grid-cols-[4rem_1fr]', inView && 'is-in')}
                  style={{ transitionDelay: `${120 + i * 70}ms` }}
                >
                  <span className="text-display pt-1 text-sm text-brand" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-display text-[clamp(1.15rem,2vw,1.45rem)] text-ink">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Section>

      {/* ===== SOLUTION — statement across, answers in a hairline grid ===== */}
      <Section>
        {(inView) => (
          <>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-7">
                <Heading inView={inView} eyebrow={service.solution.eyebrow} title={service.solution.title} />
              </div>
              <p
                className={cn('reveal-up self-end text-base leading-relaxed text-ink-muted lg:col-span-4 lg:col-start-9', inView && 'is-in')}
                style={{ transitionDelay: '160ms' }}
              >
                {service.solution.subtitle}
              </p>
            </div>
            <dl className="mt-12 grid gap-x-16 sm:grid-cols-2 lg:mt-16">
              {service.solution.items.map((item, i) => (
                <div
                  key={item.title}
                  className={cn('reveal-up border-t border-line py-7', inView && 'is-in')}
                  style={{ transitionDelay: `${200 + i * 70}ms` }}
                >
                  <dt className="flex items-center gap-3 text-display text-[clamp(1.1rem,1.8vw,1.3rem)] text-ink">
                    <span className="h-px w-5 shrink-0 bg-[hsl(var(--brand))]" aria-hidden="true" />
                    {item.title}
                  </dt>
                  <dd className="mt-3 max-w-md ps-8 text-sm leading-relaxed text-ink-muted">{item.description}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </Section>

      {/* ===== PROCESS — a rail that draws on entry ===== */}
      <Section>
        {(inView) => (
          <>
            <Heading inView={inView} eyebrow={service.workflow.eyebrow} title={service.workflow.title} lead={service.workflow.subtitle} />
            <ol className="relative mt-12 grid gap-0 lg:mt-16 lg:grid-cols-5 lg:gap-x-8">
              {/* Desktop rail: hairline, then a brand fill that runs across once. */}
              <span className="absolute inset-x-0 top-[0.4375rem] hidden h-px bg-line lg:block" aria-hidden="true" />
              <span
                className={cn(
                  'absolute inset-x-0 top-[0.4375rem] hidden h-px origin-left scale-x-0 bg-[hsl(var(--brand))] transition-transform duration-[1600ms] ease-out lg:block rtl:origin-right',
                  inView && 'scale-x-100'
                )}
                aria-hidden="true"
              />
              {service.workflow.steps.map((step, i) => (
                <li
                  key={step.step}
                  className={cn('reveal-up relative border-s border-line pb-9 ps-7 last:pb-0 lg:border-s-0 lg:pb-0 lg:ps-0', inView && 'is-in')}
                  style={{ transitionDelay: `${200 + i * 140}ms` }}
                >
                  <span
                    className="absolute -start-[0.4375rem] top-0 h-3.5 w-3.5 rounded-full border border-[hsl(var(--brand))] bg-[hsl(var(--ds-paper))] lg:start-0"
                    aria-hidden="true"
                  />
                  <span className="text-display block text-sm text-brand lg:mt-8">{step.step}</span>
                  <h3 className="text-display mt-3 text-[clamp(1.05rem,1.6vw,1.2rem)] text-ink">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </>
        )}
      </Section>

      {/* ===== BENEFITS — columns split by vertical hairlines ===== */}
      <Section>
        {(inView) => (
          <>
            <Heading inView={inView} eyebrow={service.benefits.eyebrow} title={service.benefits.title} lead={service.benefits.subtitle} />
            <dl className="mt-12 grid sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {service.benefits.items.map((item, i) => (
                <div
                  key={item.title}
                  className={cn(
                    'reveal-up border-t border-line py-7 sm:pe-8 lg:border-s lg:border-t-0 lg:py-2 lg:ps-7 lg:first:border-s-0 lg:first:ps-0',
                    inView && 'is-in'
                  )}
                  style={{ transitionDelay: `${160 + i * 80}ms` }}
                >
                  <dt className="text-display text-[clamp(1.2rem,2vw,1.5rem)] text-brand">{item.title}</dt>
                  <dd className="mt-4 text-sm leading-relaxed text-ink-muted">{item.description}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </Section>

      <Section>
        {(inView) => <ServiceFaq inView={inView} faq={service.faq} slug={service.slug} />}
      </Section>

      <Section>
        {(inView) => (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-16">
            <div className="lg:col-span-6">
              <span className={cn('eyebrow reveal-up', inView && 'is-in')}>{service.cta.eyebrow}</span>
              <h2
                className={`text-display ${cn('reveal-up mt-6 text-[clamp(1.9rem,4.4vw,3.25rem)] text-ink', inView && 'is-in')}`}
                style={{ transitionDelay: '80ms' }}
              >
                {service.cta.title}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-[5.5rem]">
              <p
                className={cn('reveal-up border-t border-line pt-6 text-base leading-relaxed text-ink-muted', inView && 'is-in')}
                style={{ transitionDelay: '160ms' }}
              >
                {service.cta.subtitle}
              </p>
              <div
                className={cn('reveal-up mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10', inView && 'is-in')}
                style={{ transitionDelay: '240ms' }}
              >
                <Link href="/contact" className="btn-primary">
                  {service.cta.primaryCta}
                  <Arrow className="h-4 w-4" />
                </Link>
                <Link href="/services" className="btn-outline">{service.cta.secondaryCta}</Link>
              </div>
            </div>
          </div>
        )}
      </Section>
    </article>
  );
}

function Hero({
  service,
  crumbs,
  Arrow,
}: {
  service: ServiceDetail;
  crumbs: { label: string; href: string }[];
  Arrow: typeof ArrowRight;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="relative">
      <div ref={ref} className="container-page relative z-10 pb-14 pt-10 sm:pb-18 sm:pt-14 lg:pb-20 lg:pt-20">
        <nav aria-label="Breadcrumb" className={cn('reveal-up', inView && 'is-in')}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-faint">
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-2">
                  {last ? (
                    <span className="text-ink-muted" aria-current="page">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-brand">{crumb.label}</Link>
                  )}
                  {!last && <span aria-hidden="true">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>

        <span className={cn('eyebrow reveal-up mt-12 lg:mt-16', inView && 'is-in')} style={{ transitionDelay: '60ms' }}>
          {service.hero.eyebrow}
        </span>
        <h1
          className={`text-display ${cn('reveal-up mt-6 max-w-5xl text-[clamp(2.35rem,5.6vw,4.5rem)] text-ink', inView && 'is-in')}`}
          style={{ transitionDelay: '140ms' }}
        >
          {service.hero.title}
        </h1>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 lg:mt-16 lg:grid-cols-12 lg:gap-x-16">
          <p
            className={cn('reveal-up text-base leading-relaxed text-ink-muted lg:col-span-6', inView && 'is-in')}
            style={{ transitionDelay: '240ms' }}
          >
            {service.hero.subtitle}
          </p>
          <div
            className={cn('reveal-up flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:col-start-8 lg:justify-end', inView && 'is-in')}
            style={{ transitionDelay: '320ms' }}
          >
            <Link href="/contact" className="btn-primary">
              {service.cta.primaryCta}
              <Arrow className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-outline">{service.cta.secondaryCta}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ children }: { children: (inView: boolean) => ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="relative">
      <div ref={ref} className="container-page relative z-10 border-t border-line py-14 sm:py-18 lg:py-20">
        {children(inView)}
      </div>
    </section>
  );
}

function Heading({ inView, eyebrow, title, lead }: { inView: boolean; eyebrow: string; title: string; lead?: string }) {
  return (
    <div>
      <span className={cn('eyebrow reveal-up', inView && 'is-in')}>{eyebrow}</span>
      <h2
        className={`text-display ${cn('reveal-up mt-5 max-w-2xl text-[clamp(1.6rem,3.2vw,2.4rem)] text-ink', inView && 'is-in')}`}
        style={{ transitionDelay: '80ms' }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn('reveal-up mt-5 max-w-xl text-base leading-relaxed text-ink-muted', inView && 'is-in')}
          style={{ transitionDelay: '140ms' }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** Same accordion as the homepage FAQ, so the two read as one system. */
function ServiceFaq({ inView, faq, slug }: { inView: boolean; faq: ServiceDetail['faq']; slug: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-16">
      <div className="lg:col-span-4">
        <Heading inView={inView} eyebrow={faq.eyebrow} title={faq.title} />
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
  );
}
