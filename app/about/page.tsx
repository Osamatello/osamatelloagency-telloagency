'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import type { Dictionary } from '@/lib/i18n/dictionary';

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return <div ref={ref} className={cn('reveal-up', inView && 'is-in', className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function RevealListItem({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return <li ref={ref} className={cn('reveal-up', inView && 'is-in', className)} style={{ transitionDelay: `${delay}ms` }}>{children}</li>;
}

function ArchitecturalAssembly() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[25rem]">
      <div className="company-rotate-layer company-rotate-layer-a absolute inset-[8%] border border-brand/25" />
      <div className="company-rotate-layer company-rotate-layer-b absolute inset-x-[20%] inset-y-[15%] border border-brand/35" />
      <div className="company-rotate-layer company-rotate-layer-c absolute inset-x-[31%] inset-y-[25%] border border-brand/50 bg-paper/30" />
      <div className="company-rotate-layer company-rotate-layer-d absolute inset-x-[41%] inset-y-[35%] border border-brand/70" />
      <span className="absolute start-[3%] top-1/2 h-px w-[27%] bg-brand/35" />
      <span className="absolute end-[3%] top-[27%] h-px w-[25%] bg-brand/30" />
      <span className="absolute bottom-[12%] start-[25%] h-2 w-2 rounded-full bg-brand" />
      <span className="absolute end-[18%] top-[9%] h-1.5 w-1.5 rounded-full bg-brand-soft" />
    </div>
  );
}

function ArchitectureScene({ content }: { content: Dictionary['about']['architecture'] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-8 grid items-center gap-8 sm:mt-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
      <Reveal>
        <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[27rem]">
          {content.layers.map((layer, index) => (
            <div
              key={layer.title}
              className={cn(
                'absolute flex items-center border px-4 transition-[background-color,border-color,transform,opacity] duration-500 sm:px-5',
                active === index ? 'border-brand bg-brand/[0.1] text-brand opacity-100' : 'border-brand/25 bg-paper/75 text-ink-muted opacity-75'
              )}
              style={{
                insetInline: `${8 + index * 4}%`,
                top: `${8 + index * 18}%`,
                height: '24%',
                transform: active === index ? 'translateY(-4px)' : 'translateY(0)',
                zIndex: content.layers.length - index,
              }}
            >
              <span className="text-display text-[clamp(0.9rem,1.8vw,1.2rem)]">{layer.title}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <ul className="border-t border-line">
          {content.layers.map((layer, index) => (
            <li key={layer.title} className="border-b border-line">
              <button
                type="button"
                className="grid w-full gap-1 py-4 text-start transition-[padding] duration-300 hover:px-2 focus-visible:px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset sm:grid-cols-[0.38fr_0.62fr] sm:items-baseline sm:gap-6 sm:py-5"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <span className={cn('text-display text-lg transition-colors duration-300 sm:text-xl', active === index ? 'text-brand' : 'text-ink')}>
                  {layer.title}
                </span>
                <span className="max-w-lg text-sm leading-relaxed text-ink-muted">{layer.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export default function AboutPage() {
  const { dict, dir } = useI18n();
  const about = dict.about;
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <article id="company-page" className="relative isolate overflow-hidden bg-paper text-ink">
      <style jsx global>{`
        html, body { background-color: hsl(var(--ds-paper)) !important; color-scheme: light; }
        .company-rotate-layer { transform-origin: 50% 50%; will-change: transform; }
        @keyframes company-rotate-a { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes company-rotate-b { from { transform: rotate(-7deg); } to { transform: rotate(-367deg); } }
        @keyframes company-rotate-c { from { transform: rotate(9deg); } to { transform: rotate(369deg); } }
        @keyframes company-rotate-d { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .company-rotate-layer-a { animation: company-rotate-a 18s linear infinite; }
        .company-rotate-layer-b { animation: company-rotate-b 15s linear infinite; }
        .company-rotate-layer-c { animation: company-rotate-c 12s linear infinite; }
        .company-rotate-layer-d { animation: company-rotate-d 10s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .company-rotate-layer { animation: none !important; }
          .company-rotate-layer-b { transform: rotate(-7deg); }
          .company-rotate-layer-c { transform: rotate(9deg); }
        }
      `}</style>

      <section className="relative border-b border-line pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="container-page grid items-center gap-8 md:grid-cols-[1.18fr_0.82fr] lg:gap-12">
          <div>
            <span className="eyebrow animate-fade-up">{about.hero.eyebrow}</span>
            <h1 className="text-display mt-6 max-w-[13ch] text-[clamp(2.55rem,5.5vw,4.6rem)] leading-[0.98] text-ink rtl:leading-[1.18]">{about.hero.title}</h1>
            <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted sm:text-base">{about.hero.subtitle}</p>
            <div className="mt-8 flex items-center gap-4 text-[0.64rem] uppercase tracking-[0.22em] text-ink-faint"><span className="h-px w-10 bg-brand" /><span>{dict.brand.tagline}</span></div>
          </div>
          <ArchitecturalAssembly />
        </div>
      </section>

      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="container-page">
          <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="eyebrow">{about.perspective.eyebrow}</span>
              <h2 className="text-display mt-5 max-w-3xl whitespace-pre-line text-[clamp(1.9rem,3.8vw,3.2rem)] leading-[1.02] rtl:leading-[1.22]">{about.perspective.title}</h2>
            </div>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-ink-muted lg:col-span-4">{about.perspective.lead}</p>
          </Reveal>
          <ul className="mt-8 grid auto-rows-fr sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {about.perspective.steps.map((step, index) => (
              <RevealListItem key={step.title} className="group flex h-full items-center border-t border-line-strong py-5 pe-5 sm:min-h-28 sm:py-6" delay={index * 45}>
                <h3 className="text-display max-w-xs text-[clamp(1.1rem,1.8vw,1.45rem)] leading-snug text-ink transition-[color,padding] duration-300 group-hover:ps-2 group-hover:text-brand">{step.title}</h3>
              </RevealListItem>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative border-y border-line bg-[#eef2ec]/[0.78] py-12 sm:py-16 lg:py-20">
        <div className="container-page">
          <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow">{about.architecture.eyebrow}</span>
              <h2 className="text-display mt-5 max-w-3xl whitespace-pre-line text-[clamp(1.9rem,3.8vw,3.2rem)] leading-[1.02] rtl:leading-[1.22]">{about.architecture.title}</h2>
            </div>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-ink-muted lg:col-span-5 lg:justify-self-end">{about.architecture.lead}</p>
          </Reveal>
          <ArchitectureScene content={about.architecture} />
        </div>
      </section>

      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="container-page">
          <Reveal className="grid gap-8 border-y border-line py-8 sm:py-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="eyebrow">{about.founder.eyebrow}</span>
              <h2 className="text-display mt-5 max-w-lg text-[clamp(1.9rem,3.8vw,3.2rem)] leading-[1.02] rtl:leading-[1.22]">{about.founder.title}</h2>
            </div>
            <div className="border-t border-line lg:col-span-7">
              <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[0.38fr_0.62fr] sm:items-baseline sm:gap-6">
                <p className="text-display text-xl text-ink sm:text-2xl">{about.founder.name}</p>
                <p className="text-sm text-brand">{about.founder.role}</p>
              </div>
              <div className="grid gap-3 py-5 sm:grid-cols-[0.38fr_0.62fr] sm:gap-6">
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-faint">{about.founder.perspectiveLabel}</span>
                <p className="text-base leading-relaxed text-ink">{about.founder.perspective}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-line py-14 sm:py-18 lg:py-20">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">{about.cta.eyebrow}</span>
            <h2 className="text-display mt-6 whitespace-pre-line text-[clamp(1.9rem,4.4vw,3.25rem)] text-ink">{about.cta.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">{about.cta.subtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">{about.cta.primaryCta}<Arrow className="h-4 w-4" /></Link>
              <Link href="/services" className="btn-outline">{about.cta.secondaryCta}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
