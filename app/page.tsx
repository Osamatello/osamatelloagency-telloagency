'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { HeroEnvironment } from '@/components/site/HeroEnvironment';
import { BusinessAutomationDemo } from '@/components/site/BusinessAutomationDemo';
import { IntegrationRail } from '@/components/site/home/IntegrationRail';
import { Capabilities } from '@/components/site/home/Capabilities';
import { ProblemShift } from '@/components/site/home/ProblemShift';
import { BeforeAfterAutomation } from '@/components/site/home/BeforeAfterAutomation';
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
      <HeroEnvironment />
      <section data-visual-state="0" className="relative isolate -mt-16 flex min-h-[100svh] items-center overflow-hidden bg-transparent text-ink lg:-mt-[72px]">

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
                  <dt className="text-display text-2xl text-brand">{s.value}</dt>
                  <dd className="max-w-[9rem] text-xs font-medium leading-tight text-ink-faint">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ HOMEPAGE CONTENT ============ */}
      <div className="relative bg-transparent text-ink">
        {/* Integrations — pipeline enters from the hero */}
        <section data-visual-state="1" className="relative overflow-hidden">
          <div className="container-page relative z-10 py-20 pt-14 sm:py-24 lg:py-28 lg:pt-16">
            <IntegrationRail />
          </div>
        </section>

        {/* Capabilities — pinned progressive accumulation */}
        <div data-visual-state="2" className="relative">
          <Capabilities />
        </div>

        {/* The Shift — the route becomes the transformation rail (no bg network) */}
        <section data-visual-state="3" className="relative overflow-hidden">
          <div className="container-page relative z-10 border-t border-line py-20 sm:py-24 lg:py-28">
            <ProblemShift />
          </div>
        </section>

        {/* Before / After — pinned transformation from manual to automated */}
        <div data-visual-state="4" className="relative">
          <BeforeAfterAutomation />
        </div>

        {/* How It Works — the route becomes a structured implementation flow */}
        <section data-visual-state="5" className="relative overflow-hidden">
          <div className="container-page relative z-10 border-t border-line py-20 sm:py-24 lg:py-28">
            <MethodStages />
          </div>
        </section>

        {/* FAQ — light */}
        <section data-visual-state="6" className="relative overflow-hidden">
          <div className="container-page relative z-10 border-t border-line py-20 sm:py-24 lg:py-28">
            <HomeFaq />
          </div>
        </section>

        {/* Final CTA — light, the route converges toward one action */}
        <section data-visual-state="7" className="relative overflow-hidden">
          <div className="container-page relative z-10 border-t border-line py-20 sm:py-28 lg:py-32">
            <HomeCta />
          </div>
        </section>
      </div>
    </>
  );
}

function HomeFaq() {
  const { dict } = useI18n();
  const t = dict.home.faqPreview;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div>
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 className="text-display mt-5 max-w-2xl text-[clamp(1.6rem,3.2vw,2.4rem)] text-ink">
        {t.title}
      </h2>
      <dl className="mt-10 border-t border-line sm:mt-12">
        {t.items.map((item, index) => {
          const open = openIndex === index;
          const answerId = `home-faq-answer-${index}`;
          return (
            <div
              key={item.q}
              className={cn(
                'border-b py-1 transition-colors duration-500',
                open ? 'border-[hsl(var(--brand)/0.38)]' : 'border-line'
              )}
            >
              <dt>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  aria-controls={answerId}
                  className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-start focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      'text-display text-[clamp(1rem,2vw,1.2rem)] transition-[color,transform] duration-500',
                      open ? 'translate-x-1 text-brand rtl:-translate-x-1' : 'text-ink group-hover:text-brand'
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-5 w-5 shrink-0 transition-[color,transform] duration-500',
                      open ? 'rotate-45 text-brand' : 'text-ink-faint group-hover:text-brand'
                    )}
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="h-full w-full">
                      <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd
                id={answerId}
                aria-hidden={!open}
                className={cn(
                  'grid max-w-2xl transition-[grid-template-rows,opacity] duration-500 ease-out',
                  open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden">
                  <p
                    className="pb-5 pe-10 text-sm leading-relaxed text-ink-muted transition-transform duration-500 ease-out"
                    style={{ transform: open ? 'translateY(0)' : 'translateY(-0.45rem)' }}
                  >
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

function HomeCta() {
  const { dict, dir } = useI18n();
  const t = dict.home.cta;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  return (
    <div className="max-w-3xl">
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 className="text-display mt-6 whitespace-pre-line text-[clamp(1.9rem,4.4vw,3.25rem)] text-ink">
        {t.title}
      </h2>
      {t.subtitle ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
          {t.subtitle}
        </p>
      ) : null}
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/consult" className="btn-primary">
          {t.primaryCta}
          <Arrow className="h-4 w-4" />
        </Link>
        {t.secondaryCta ? (
          <Link href="/services" className="btn-outline">
            {t.secondaryCta}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
