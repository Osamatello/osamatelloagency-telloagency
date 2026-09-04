'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { type ReactNode, useRef, useState } from 'react';
import { CompanyEnvironment } from '@/components/site/company/CompanyEnvironment';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import type { Dictionary } from '@/lib/i18n/dictionary';

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return <div ref={ref} className={cn('reveal-up', inView && 'is-in', className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function ArchitecturalAssembly() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[4/5] w-full max-w-[29rem] sm:aspect-square">
      <div className="absolute inset-[7%] border border-brand/20" />
      <div className="absolute inset-x-[17%] inset-y-[14%] -rotate-[7deg] border border-brand/28" />
      <div className="absolute inset-x-[29%] inset-y-[25%] rotate-[9deg] border border-brand/38" />
      <div className="absolute inset-x-[39%] inset-y-[35%] bg-brand/90" />
      <div className="absolute start-[4%] top-[22%] h-px w-[32%] bg-brand/30" />
      <div className="absolute end-[3%] bottom-[19%] h-px w-[38%] bg-brand/35" />
      <div className="absolute end-[16%] top-[5%] h-10 w-10 border border-line-strong bg-paper/70" />
      <div className="absolute bottom-[4%] start-[18%] h-16 w-7 bg-brand/12" />
      <span className="absolute end-[6%] top-[24%] h-2 w-2 rounded-full bg-brand" />
      <span className="absolute bottom-[16%] start-[8%] h-1.5 w-1.5 rounded-full bg-brand-soft" />
    </div>
  );
}

function ArchitectureScene({ content }: { content: Dictionary['about']['architecture'] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
      <Reveal className="relative mx-auto aspect-square w-full max-w-[34rem]">
        <div aria-hidden="true" className="absolute inset-0">
          {content.layers.map((layer, index) => {
            const inset = 5 + index * 10;
            return (
              <div key={layer.index} className={cn('absolute border transition-[border-color,background-color,transform,opacity] duration-500', active === index ? 'border-brand bg-brand/[0.055] opacity-100' : 'border-brand/20 bg-paper/30 opacity-70')} style={{ inset: `${inset}%`, transform: `rotate(${index % 2 === 0 ? -1.6 : 1.6}deg)` }} />
            );
          })}
          <div className="absolute inset-[44%] bg-brand" />
          <span className="absolute start-[8%] top-1/2 h-px w-[24%] bg-brand/30" />
          <span className="absolute end-[8%] top-1/2 h-px w-[24%] bg-brand/30" />
          <span className="absolute start-1/2 top-[8%] h-[24%] w-px bg-brand/30" />
          <span className="absolute bottom-[8%] start-1/2 h-[24%] w-px bg-brand/30" />
        </div>
      </Reveal>
      <ol className="border-t border-line">
        {content.layers.map((layer, index) => (
          <li key={layer.index} className="border-b border-line">
            <button type="button" className="group grid w-full grid-cols-[2.5rem_1fr] gap-3 py-5 text-start sm:grid-cols-[3.25rem_0.72fr_1fr] sm:gap-5 sm:py-6" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active === index}>
              <span className="pt-1 text-[0.67rem] tabular-nums tracking-[0.18em] text-brand">{layer.index}</span>
              <span className={cn('text-display text-xl transition-colors duration-300 sm:text-2xl', active === index ? 'text-brand' : 'text-ink')}>{layer.title}</span>
              <span className="col-start-2 text-sm leading-relaxed text-ink-muted sm:col-start-auto">{layer.description}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function AboutPage() {
  const { dict } = useI18n();
  const about = dict.about;
  const pageRef = useRef<HTMLElement>(null);
  const perspectiveOffsets = ['lg:col-start-1', 'lg:col-start-3 lg:mt-20', 'lg:col-start-2 lg:-mt-5', 'lg:col-start-1 lg:mt-10', 'lg:col-start-3 lg:-mt-3', 'lg:col-start-2 lg:mt-8'];

  return (
    <article ref={pageRef} className="relative isolate overflow-hidden bg-paper text-ink">
      <CompanyEnvironment rootRef={pageRef} />

      <section className="relative z-10 flex min-h-[calc(100svh-4rem)] items-center border-b border-line py-20 sm:py-24 lg:min-h-[calc(100vh-4.5rem)] lg:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="relative">
            <span className="eyebrow animate-fade-up">{about.hero.eyebrow}</span>
            <h1 className="text-display mt-8 whitespace-pre-line text-[clamp(3.1rem,7vw,7.1rem)] leading-[0.88] text-ink rtl:leading-[1.08]">{about.hero.title}</h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg sm:leading-8">{about.hero.subtitle}</p>
            <div className="mt-12 flex items-center gap-4 text-[0.64rem] uppercase tracking-[0.24em] text-ink-faint">
              <span className="h-px w-12 bg-brand" />
              <span>{dict.brand.tagline}</span>
            </div>
          </div>
          <div className="hidden sm:block"><ArchitecturalAssembly /></div>
        </div>
      </section>

      <section className="relative z-10 py-24 sm:py-32 lg:py-40">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <span className="eyebrow">{about.narrative.eyebrow}</span>
              <h2 className="text-display mt-7 max-w-4xl text-[clamp(2.6rem,5.7vw,5.8rem)] leading-[0.93] rtl:leading-[1.14]">{about.narrative.title}</h2>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:pt-24" delay={100}>
              <p className="max-w-xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">{about.narrative.lead}</p>
              <ol className="mt-10 border-t border-line">
                {about.narrative.problems.map((problem, index) => (
                  <li key={problem} className="grid grid-cols-[2.5rem_1fr] items-center border-b border-line py-4 text-sm sm:text-base">
                    <span className="text-[0.65rem] tabular-nums text-brand">0{index + 1}</span><span>{problem}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <div className="mt-24 border-y border-line bg-paper/75 py-10 backdrop-blur-[2px] sm:mt-32 sm:py-14">
            <Reveal className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
              <div>
                <span className="eyebrow">{about.narrative.positionEyebrow}</span>
                <h3 className="text-display mt-6 max-w-3xl text-[clamp(2rem,4.2vw,4rem)]">{about.narrative.positionTitle}</h3>
              </div>
              <ol className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                {about.narrative.principles.map((principle, index) => (
                  <li key={principle} className="bg-paper px-4 py-6 sm:px-5 sm:py-8">
                    <span className="block text-[0.62rem] tabular-nums text-brand">0{index + 1}</span>
                    <span className="mt-8 block text-sm font-medium uppercase tracking-[0.1em] sm:text-base">{principle}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-line bg-paper-sunken/90 py-24 backdrop-blur-[2px] sm:py-32 lg:py-40">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">{about.philosophy.eyebrow}</span>
            <h2 className="text-display mt-7 whitespace-pre-line text-[clamp(2.6rem,5vw,5rem)] rtl:leading-[1.16]">{about.philosophy.title}</h2>
            <p className="mt-7 max-w-lg text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">{about.philosophy.lead}</p>
          </Reveal>
          <div className="border-t border-line-strong">
            {about.philosophy.principles.map((principle, index) => (
              <Reveal key={principle.index} delay={index * 60}>
                <article className="grid gap-5 border-b border-line-strong py-8 sm:grid-cols-[3.5rem_0.85fr_1.15fr] sm:gap-7 sm:py-10">
                  <span className="text-xs tabular-nums tracking-[0.16em] text-brand">{principle.index}</span>
                  <h3 className="text-display text-2xl sm:text-[2rem]">{principle.title}</h3>
                  <p className="max-w-lg text-sm leading-7 text-ink-muted sm:text-base">{principle.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 sm:py-32 lg:py-40">
        <div className="container-page">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="eyebrow">{about.perspective.eyebrow}</span>
              <h2 className="text-display mt-7 whitespace-pre-line text-[clamp(2.75rem,6vw,6.2rem)] leading-[0.92] rtl:leading-[1.14]">{about.perspective.title}</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-ink-muted sm:text-lg lg:col-span-4">{about.perspective.lead}</p>
          </Reveal>
          <ol className="mt-20 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-2">
            {about.perspective.steps.map((step, index) => (
              <Reveal key={step.index} className={perspectiveOffsets[index]} delay={index * 70}>
                <li className="min-h-36 border-t border-line-strong bg-paper/65 pt-5 backdrop-blur-[2px] sm:min-h-44">
                  <span className="text-[0.66rem] tabular-nums tracking-[0.18em] text-brand">{step.index}</span>
                  <h3 className="text-display mt-8 max-w-xs text-[clamp(1.4rem,2.5vw,2.25rem)]">{step.title}</h3>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative z-10 border-y border-line bg-[#eef2ec]/90 py-24 backdrop-blur-[2px] sm:py-32 lg:py-40">
        <div className="container-page">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow">{about.architecture.eyebrow}</span>
              <h2 className="text-display mt-7 whitespace-pre-line text-[clamp(2.65rem,5.4vw,5.5rem)] rtl:leading-[1.15]">{about.architecture.title}</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-ink-muted sm:text-lg lg:col-span-5 lg:justify-self-end">{about.architecture.lead}</p>
          </Reveal>
          <ArchitectureScene content={about.architecture} />
        </div>
      </section>

      <section className="relative z-10 py-24 sm:py-32 lg:py-40">
        <div className="container-page">
          <div className="grid gap-14 border-y border-line py-12 sm:py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:py-24">
            <Reveal>
              <span className="eyebrow">{about.founder.eyebrow}</span>
              <h2 className="text-display mt-7 text-[clamp(2.5rem,4.8vw,4.8rem)]">{about.founder.title}</h2>
            </Reveal>
            <Reveal className="lg:pt-24" delay={100}>
              <div className="grid gap-8 sm:grid-cols-[0.4fr_0.6fr] sm:gap-10">
                <div><p className="text-display text-2xl text-ink sm:text-3xl">{about.founder.name}</p><p className="mt-2 text-sm text-brand">{about.founder.role}</p></div>
                <div className="border-s border-brand/35 ps-6 sm:ps-8">
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-faint">{about.founder.perspectiveLabel}</span>
                  <p className="mt-5 text-lg leading-8 text-ink sm:text-xl sm:leading-9">{about.founder.perspective}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-line bg-paper py-20 sm:py-24 lg:py-28">
        <div className="container-page">
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div><span className="eyebrow">{about.cta.eyebrow}</span><h2 className="text-display mt-7 whitespace-pre-line text-[clamp(2.75rem,5.8vw,6rem)] leading-[0.92] rtl:leading-[1.14]">{about.cta.title}</h2></div>
            <div>
              <p className="max-w-lg text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">{about.cta.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">{about.cta.primaryCta}<ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" /></Link>
                <Link href="/services" className="btn-outline">{about.cta.secondaryCta}</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
