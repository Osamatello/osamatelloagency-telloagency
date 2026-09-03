'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { HeroEnvironment } from '@/components/site/HeroEnvironment';
import { SectionHeading } from '@/components/site/SectionHeading';
import { FAQAccordion } from '@/components/site/FAQAccordion';
import { CTASection } from '@/components/site/CTASection';
import { BusinessAutomationDemo } from '@/components/site/BusinessAutomationDemo';
import { AutomationNetwork } from '@/components/site/home/AutomationNetwork';
import { IntegrationRail } from '@/components/site/home/IntegrationRail';
import { Capabilities } from '@/components/site/home/Capabilities';
import { ProblemShift } from '@/components/site/home/ProblemShift';
import { AutomationPath } from '@/components/site/home/AutomationPath';
import { MethodStages } from '@/components/site/home/MethodStages';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function HomePage() {
  const { dict, dir } = useI18n();
  const home = dict.home;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const stats = [
    { value: home.hero.stat1Value, label: home.hero.stat1Label },
    { value: home.hero.stat2Value, label: home.hero.stat2Label },
    { value: home.hero.stat3Value, label: home.hero.stat3Label },
  ];

  const titleLines = home.hero.title.split('\n');

  // Load choreography
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const rd = (ms: number) => ({ transitionDelay: `${ms}ms` });

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative isolate -mt-16 flex min-h-[100svh] items-center overflow-hidden bg-paper text-ink lg:-mt-[72px]">
        <HeroEnvironment />

        <div className="container-page relative z-10 w-full pb-14 pt-28 sm:pt-32 lg:pb-16 lg:pt-32">
          {/* Row 1 — eyebrow + full-width editorial headline */}
          <span
            className={cn('eyebrow reveal-up', shown && 'is-in')}
            style={rd(60)}
          >
            {home.hero.eyebrow}
          </span>

          <h1 className="text-display mt-7 text-ink text-[clamp(2.35rem,5.6vw,4.5rem)]">
            {titleLines.map((line, i) => (
              <span
                key={i}
                className={cn('reveal-line block', shown && 'is-in')}
                style={rd(180 + i * 90)}
              >
                <span>{line}</span>
              </span>
            ))}
            <span
              className={cn('reveal-line block', shown && 'is-in')}
              style={rd(180 + titleLines.length * 90)}
            >
              <span className="text-brand">{home.hero.titleAccent}</span>
            </span>
          </h1>

          {/* Row 2 — asymmetric: supporting copy far left, sequence far right */}
          <div className="mt-12 grid gap-x-8 gap-y-12 lg:mt-16 lg:grid-cols-12">
            {home.hero.subtitle ? (
              <p
                className={cn(
                  'reveal-up self-end text-[0.98rem] leading-relaxed text-ink-muted lg:col-span-4',
                  shown && 'is-in'
                )}
                style={rd(560)}
              >
                {home.hero.subtitle}
              </p>
            ) : null}

            <div
              className={cn(
                'reveal-fade lg:col-span-5 lg:col-start-8',
                shown && 'is-in'
              )}
              style={rd(680)}
            >
              <BusinessAutomationDemo />
            </div>
          </div>

          {/* Row 3 — bottom rail */}
          <div className="mt-12 flex flex-col gap-9 border-t border-line pt-8 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
            <div
              className={cn(
                'reveal-up flex flex-col gap-3 sm:flex-row',
                shown && 'is-in'
              )}
              style={rd(820)}
            >
              <Link href="/consult" className="btn-primary">
                {home.hero.primaryCta}
                <Arrow className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn-outline">
                {home.hero.secondaryCta}
              </Link>
            </div>

            <dl
              className={cn(
                'reveal-up flex flex-wrap gap-x-9 gap-y-4',
                shown && 'is-in'
              )}
              style={rd(900)}
            >
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2.5">
                  <dt className="text-display text-xl text-brand">{s.value}</dt>
                  <dd className="max-w-[11rem] text-xs leading-tight text-ink-faint">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ MILESTONE 3 — one continuous light automation story ============ */}
      <div className="bg-paper text-ink">
        {/* Integrations */}
        <section className="relative overflow-hidden">
          <AutomationNetwork variant="integrations" />
          <div className="container-page relative z-10 py-20 pt-14 sm:py-24 lg:py-28 lg:pt-16">
            <IntegrationRail />
          </div>
        </section>

        {/* Capabilities */}
        <section className="relative overflow-hidden">
          <AutomationNetwork variant="capabilities" />
          <div className="container-page relative z-10 border-t border-line py-20 sm:py-24 lg:py-28">
            <Capabilities />
          </div>
        </section>

        {/* The Shift */}
        <section className="relative overflow-hidden">
          <AutomationNetwork variant="shift" />
          <div className="container-page relative z-10 border-t border-line py-20 sm:py-24 lg:py-28">
            <ProblemShift />
          </div>
        </section>

        {/* The Path */}
        <section className="relative overflow-hidden">
          <AutomationNetwork variant="path" />
          <div className="container-page relative z-10 border-t border-line py-20 sm:py-24 lg:py-28">
            <AutomationPath />
          </div>
        </section>

        {/* How It Works */}
        <section className="relative overflow-hidden">
          <AutomationNetwork variant="method" />
          <div className="container-page relative z-10 border-t border-line py-20 sm:py-24 lg:py-28">
            <MethodStages />
          </div>
        </section>
      </div>

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
