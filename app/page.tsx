'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { SectionHeading } from '@/components/site/SectionHeading';
import { ServiceCardMini } from '@/components/site/ServiceCardMini';
import { PricingCard } from '@/components/site/PricingCard';
import { InteractiveFlow } from '@/components/site/InteractiveFlow';
import { VerticalTimeline } from '@/components/site/VerticalTimeline';
import { FounderCard } from '@/components/site/FounderCard';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { CTASection } from '@/components/site/CTASection';
import { ClinicSimulator } from '@/components/site/ClinicSimulator';
import { BentoGrid } from '@/components/site/BentoGrid';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { dict, dir } = useI18n();
  const home = dict.home;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const stats = [
    { value: home.hero.stat1Value, label: home.hero.stat1Label },
    { value: home.hero.stat2Value, label: home.hero.stat2Label },
    { value: home.hero.stat3Value, label: home.hero.stat3Label },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Animated grid shift background */}
        <div className="absolute inset-0 bg-grid-animated mask-fade-b opacity-45" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-[700px] bg-tello-radial" aria-hidden="true" />
        <div className="absolute left-1/3 top-24 h-96 w-96 rounded-full bg-[hsl(var(--neon))/0.08] blur-[140px]" aria-hidden="true" />

        <div className="container-tello relative">
          <div className="grid gap-12 lg:grid-cols-12 items-center py-16 sm:py-24 lg:py-28">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left rtl:lg:items-start rtl:lg:text-right">
              <span className="eyebrow animate-fade-up">
                <Sparkles className="h-3.5 w-3.5" />
                {home.hero.eyebrow}
              </span>
              <h1 className="mt-6 animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ animationDelay: '60ms' }}>
                {home.hero.title}{' '}
                <span className="text-gradient-neon text-glow block sm:inline">{home.hero.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-xl animate-fade-up text-base sm:text-lg leading-relaxed text-white/70" style={{ animationDelay: '120ms' }}>
                {home.hero.subtitle}
              </p>
              <div className="mt-8 flex w-full animate-fade-up flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start" style={{ animationDelay: '180ms' }}>
                <Link href="/consult" className="btn-neon w-full sm:w-auto">
                  {home.hero.primaryCta}
                  <Arrow className="h-4 w-4" />
                </Link>
                <Link href="/services" className="btn-ghost-tello w-full sm:w-auto">
                  {home.hero.secondaryCta}
                </Link>
              </div>

              {/* Stats row */}
              <div className="mt-12 grid w-full max-w-md animate-fade-in grid-cols-3 gap-4 border-t border-white/10 pt-8" style={{ animationDelay: '240ms' }}>
                {stats.map((s) => (
                  <div key={s.label} className="text-center lg:text-left rtl:lg:text-right">
                    <div className="text-xl font-bold text-[hsl(var(--neon))] sm:text-2xl">{s.value}</div>
                    <div className="mt-1 text-2xs text-white/50 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Simulator Column */}
            <div className="lg:col-span-6 w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
              <ClinicSimulator />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED TOOLS ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-12">
        <div className="container-tello">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-white/40">
            {home.tools.eyebrow}
          </p>
          <h2 className="mt-2 text-center text-lg font-semibold text-white/80">
            {home.tools.title}
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mask-fade-edges">
            {home.tools.items.map((tool) => (
              <span
                key={tool}
                className="text-xl font-bold tracking-tight text-white/40 transition-colors duration-300 hover:text-white/80 sm:text-2xl"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW ===== */}
      <section className="py-20 lg:py-28">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.servicesOverview.eyebrow}
            title={home.servicesOverview.title}
            subtitle={home.servicesOverview.subtitle}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {home.servicesOverview.services.map((service, i) => (
              <ServiceCardMini key={service.title} service={service} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-ghost-tello">
              {dict.actions.viewAllServices}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS BENTO MATRIX ===== */}
      <section className="border-y border-white/5 bg-slate-950/20 py-20 lg:py-28 relative">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.solutions.eyebrow}
            title={home.solutions.title}
            subtitle={home.solutions.subtitle}
          />
          <BentoGrid />
        </div>
      </section>

      {/* ===== EXAMPLE WORKFLOW ===== */}
      <section className="py-20 lg:py-28 bg-slate-950/10">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.workflow.eyebrow}
            title={home.workflow.title}
            subtitle={home.workflow.subtitle}
          />
          <div className="mt-14">
            <InteractiveFlow steps={home.workflow.steps} />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="border-t border-white/5 py-20 lg:py-28 relative overflow-hidden bg-slate-950/20">
        <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
        <div className="container-tello relative">
          <SectionHeading
            eyebrow={home.howItWorks.eyebrow}
            title={home.howItWorks.title}
            subtitle={home.howItWorks.subtitle}
          />
          <div className="mt-14">
            <VerticalTimeline steps={home.howItWorks.steps} />
          </div>
        </div>
      </section>

      {/* ===== PRICING PREVIEW ===== */}
      <section className="py-20 lg:py-28">
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
          <div className="mt-8 text-center">
            <Link href="/pricing" className="btn-ghost-tello">
              {dict.actions.viewAllPricing}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-20 lg:py-28">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.founder.eyebrow}
            title={home.founder.title}
            align="left"
            className="max-w-3xl"
          />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            {home.founder.intro}
          </p>
          <div className="mt-12">
            <FounderCard founder={home.founder} />
          </div>
        </div>
      </section>

      {/* ===== FAQ PREVIEW ===== */}
      <section className="py-20 lg:py-28">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.faqPreview.eyebrow}
            title={home.faqPreview.title}
            subtitle={home.faqPreview.subtitle}
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <FAQAccordion items={home.faqPreview.items} />
          </div>
          <div className="mt-10 text-center">
            <Link href="/faq" className="btn-ghost-tello">
              {dict.actions.viewAllFaqs}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <CTASection
        className="py-20 lg:py-28"
        eyebrow={home.cta.eyebrow}
        title={home.cta.title}
        subtitle={home.cta.subtitle}
        primaryCta={home.cta.primaryCta}
        secondaryCta={home.cta.secondaryCta}
      />
    </>
  );
}
