'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { SectionHeading } from '@/components/site/SectionHeading';
import { ServiceCardMini } from '@/components/site/ServiceCardMini';
import { PricingCard } from '@/components/site/PricingCard';
import { WorkflowSteps } from '@/components/site/WorkflowSteps';
import { FounderCard } from '@/components/site/FounderCard';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { CTASection } from '@/components/site/CTASection';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { dict, dir } = useI18n();
  const home = dict.home;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* ===== HERO — asymmetric editorial layout ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-50" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-tello-radial" aria-hidden="true" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[hsl(var(--neon))/0.15] blur-[120px]" aria-hidden="true" />

        <div className="container-tello relative">
          <div className="mx-auto max-w-4xl py-20 text-center sm:py-28 lg:py-32">
            <span className="eyebrow animate-fade-up">
              <Sparkles className="h-3.5 w-3.5" />
              {home.hero.eyebrow}
            </span>
            <h1 className="mt-6 animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ animationDelay: '60ms' }}>
              {home.hero.title}{' '}
              <span className="text-gradient-neon text-glow">{home.hero.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/65" style={{ animationDelay: '120ms' }}>
              {home.hero.subtitle}
            </p>
            <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '180ms' }}>
              <Link href="/consult" className="btn-neon w-full sm:w-auto">
                {home.hero.primaryCta}
                <Arrow className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn-ghost-tello w-full sm:w-auto">
                {home.hero.secondaryCta}
              </Link>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-16 grid max-w-2xl animate-fade-in grid-cols-3 gap-4" style={{ animationDelay: '300ms' }}>
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-[hsl(var(--neon))] sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs text-white/55 sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED TOOLS — logos strip ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-14">
        <div className="container-tello">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-white/40">
            {home.tools.eyebrow}
          </p>
          <h2 className="sr-only">{home.tools.title}</h2>
          <div className="mt-8">
            <ToolLogos />
          </div>
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW — no "View More" button ===== */}
      <section className="py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.servicesOverview.eyebrow}
            title={home.servicesOverview.title}
            subtitle={home.servicesOverview.subtitle}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {home.servicesOverview.services.map((service, i) => (
              <ServiceCardMini key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROBLEMS ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-20 lg:py-28">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.problems.eyebrow}
            title={home.problems.title}
            subtitle={home.problems.subtitle}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.problems.items.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS ===== */}
      <section className="py-20 lg:py-28">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.solutions.eyebrow}
            title={home.solutions.title}
            subtitle={home.solutions.subtitle}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.solutions.items.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXAMPLE WORKFLOW ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-20 lg:py-28">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.workflow.eyebrow}
            title={home.workflow.title}
            subtitle={home.workflow.subtitle}
          />
          <div className="mt-14">
            <WorkflowSteps steps={home.workflow.steps} />
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-20 lg:py-28">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.benefits.eyebrow}
            title={home.benefits.title}
            subtitle={home.benefits.subtitle}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.benefits.items.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-20 lg:py-28">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.howItWorks.eyebrow}
            title={home.howItWorks.title}
            subtitle={home.howItWorks.subtitle}
          />
          <div className="mt-14">
            <WorkflowSteps steps={home.howItWorks.steps} />
          </div>
        </div>
      </section>

      {/* ===== PRICING PREVIEW ===== */}
      <section className="py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.pricingPreview.eyebrow}
            title={home.pricingPreview.title}
            subtitle={home.pricingPreview.subtitle}
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {home.pricingPreview.plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/50">{home.pricingPreview.note}</p>
        </div>
      </section>

      {/* ===== FOUNDER — portrait + message split ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-24 lg:py-32">
        <div className="container-tello">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">{home.founder.eyebrow}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {home.founder.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/55">{home.founder.intro}</p>
              <blockquote className="mt-6 border-s-2 border-[hsl(var(--neon)/0.5)] ps-4 text-base leading-relaxed text-white/75">
                {home.founder.message}
              </blockquote>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {home.founder.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-in">
              <FounderPortrait founder={home.founder} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.faqPreview.eyebrow}
            title={home.faqPreview.title}
            subtitle={home.faqPreview.subtitle}
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <FAQAccordion items={home.faqPreview.items} />
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <CTASection
        className="py-24 lg:py-32"
        eyebrow={home.cta.eyebrow}
        title={home.cta.title}
        subtitle={home.cta.subtitle}
        primaryCta={home.cta.primaryCta}
        secondaryCta={home.cta.secondaryCta}
      />
    </>
  );
}
