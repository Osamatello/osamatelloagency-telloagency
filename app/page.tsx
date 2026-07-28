'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { SectionHeading } from '@/components/site/SectionHeading';
import { ServiceCardMini } from '@/components/site/ServiceCardMini';
import { PricingCard } from '@/components/site/PricingCard';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { CTASection } from '@/components/site/CTASection';
import { ArrowRight, ArrowLeft, Sparkles as SparklesIcon } from 'lucide-react';
import { AuroraBackground } from '@/components/site/AuroraBackground';
import { SparklesField } from '@/components/site/SparklesField';
import { AnimatedCounter } from '@/components/site/AnimatedCounter';
import { ToolLogos } from '@/components/site/ToolLogos';
import { WorkflowDiagram } from '@/components/site/WorkflowDiagram';
import { ProblemCard } from '@/components/site/ProblemCard';
import { BenefitTimeline } from '@/components/site/BenefitTimeline';
import { FounderPortrait } from '@/components/site/FounderPortrait';
import { Check } from 'lucide-react';

export default function HomePage() {
  const { dict, dir } = useI18n();
  const home = dict.home;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* ===== HERO — asymmetric editorial layout ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" aria-hidden="true" />
        <AuroraBackground />
        <SparklesField className="absolute left-1/2 top-1/4 h-[400px] w-[800px] max-w-[95vw] -translate-x-1/2" density={1400} />

        <div className="container-tello relative">
          <div className="grid min-h-[88vh] items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
            {/* Left: editorial text block */}
            <div className="lg:col-span-7">
              <span className="eyebrow animate-fade-up">
                <SparklesIcon className="h-3.5 w-3.5" />
                {home.hero.eyebrow}
              </span>
              <h1
                className="mt-6 animate-fade-up text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]"
                style={{ animationDelay: '80ms' }}
              >
                Automate Your Clinic.
                <br />
                Find More Patients.{' '}
                <span className="text-gradient-neon text-glow">{home.hero.titleAccent}</span>
              </h1>
              <p
                className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/55"
                style={{ animationDelay: '160ms' }}
              >
                {home.hero.subtitle}
              </p>
              <div
                className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
                style={{ animationDelay: '240ms' }}
              >
                <Link href="/consult" className="btn-neon">
                  {home.hero.primaryCta}
                  <Arrow className="h-4 w-4" />
                </Link>
                <Link href="/services" className="btn-ghost-tello">
                  {home.hero.secondaryCta}
                </Link>
              </div>
            </div>

            {/* Right: floating stat panel */}
            <div className="lg:col-span-5" style={{ animationDelay: '320ms' }}>
              <div className="animate-fade-up relative">
                {/* Glow behind panel */}
                <div className="absolute -inset-4 rounded-3xl bg-[hsl(var(--neon)/0.06)] blur-[60px]" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
                    {home.hero.eyebrow}
                  </div>

                  <div className="mt-6 space-y-6">
                    <div className="flex items-baseline justify-between border-b border-white/10 pb-6">
                      <div>
                        <div className="text-3xl font-bold text-[hsl(var(--neon))]">
                          <AnimatedCounter value={40} suffix="%" />
                        </div>
                        <p className="mt-1 text-sm text-white/50">{home.hero.stat1Label}</p>
                      </div>
                      <div className="h-12 w-px bg-white/10" />
                      <div>
                        <div className="text-3xl font-bold text-[hsl(var(--neon))]">24/7</div>
                        <p className="mt-1 text-sm text-white/50">{home.hero.stat2Label}</p>
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">
                        <AnimatedCounter value={2} suffix="x" />
                      </div>
                      <p className="mt-1 text-sm text-white/50">{home.hero.stat3Label}</p>
                    </div>
                  </div>

                  {/* Mini workflow preview */}
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Automated patient flow</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">Inquiry</span>
                      <Arrow className="h-3 w-3 text-[hsl(var(--neon))]" />
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">AI Assistant</span>
                      <Arrow className="h-3 w-3 text-[hsl(var(--neon))]" />
                      <span className="rounded-md border border-[hsl(var(--neon)/0.3)] bg-[hsl(var(--neon)/0.1)] px-2 py-1 text-[hsl(var(--neon))]">Booked</span>
                    </div>
                  </div>
                </div>
              </div>
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

      {/* ===== PROBLEMS — large modern cards with ghost numbers ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.problems.eyebrow}
            title={home.problems.title}
            subtitle={home.problems.subtitle}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.problems.items.map((item, i) => (
              <ProblemCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== AUTOMATION WORKFLOW — animated visual diagram ===== */}
      <section className="py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.workflow.eyebrow}
            title={home.workflow.title}
            subtitle={home.workflow.subtitle}
          />
          <div className="mt-16">
            <WorkflowDiagram steps={home.workflow.steps} />
          </div>
        </div>
      </section>

      {/* ===== BENEFITS — alternating timeline ===== */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-24 lg:py-32">
        <div className="container-tello">
          <SectionHeading
            eyebrow={home.benefits.eyebrow}
            title={home.benefits.title}
            subtitle={home.benefits.subtitle}
          />
          <div className="mx-auto mt-16 max-w-3xl">
            <BenefitTimeline items={home.benefits.items} />
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
