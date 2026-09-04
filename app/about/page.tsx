'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
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

const ARCHITECTURE_OBSERVER_OPTIONS = { threshold: 0.46, rootMargin: '-8% 0px -24% 0px' };

function ArchitectureLayerRow({
  layer,
  index,
  active,
  onActive,
}: {
  layer: Dictionary['about']['architecture']['layers'][number];
  index: number;
  active: boolean;
  onActive: (index: number) => void;
}) {
  const { ref, inView } = useInView<HTMLLIElement>(ARCHITECTURE_OBSERVER_OPTIONS);

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="flex border-b border-line lg:min-h-[48vh] lg:items-center">
      <button
        type="button"
        className="grid w-full grid-cols-[2.5rem_1fr] gap-3 py-5 text-start sm:grid-cols-[3.25rem_0.72fr_1fr] sm:gap-5 sm:py-7 lg:py-12"
        onMouseEnter={() => onActive(index)}
        onFocus={() => onActive(index)}
        onClick={() => onActive(index)}
        aria-pressed={active}
      >
        <span className="pt-1 text-[0.67rem] tabular-nums tracking-[0.18em] text-brand">{layer.index}</span>
        <span className={cn('text-display text-xl transition-colors duration-300 sm:text-2xl lg:text-3xl', active ? 'text-brand' : 'text-ink')}>{layer.title}</span>
        <span className="col-start-2 max-w-md text-sm leading-relaxed text-ink-muted sm:col-start-auto sm:text-base">{layer.description}</span>
      </button>
    </li>
  );
}

function ArchitectureScene({ content }: { content: Dictionary['about']['architecture'] }) {
  const [active, setActive] = useState(0);
  const layers = [...content.layers].reverse();
  return (
    <div className="mt-10 grid gap-8 sm:mt-14 sm:gap-10 lg:mt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
      <Reveal className="lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-8rem)] lg:items-center">
        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[38rem] overflow-visible">
          {layers.map((layer, index) => {
            const inset = 8 + index * 7.5;
            const lift = active === index ? -24 : index * 8;
            return (
              <div
                key={layer.index}
                className={cn('absolute border bg-paper/25 transition-[border-color,background-color,transform,opacity] duration-700', active === index ? 'border-brand bg-brand/[0.075] opacity-100' : 'border-brand/25 opacity-65')}
                style={{
                  inset: `${inset}%`,
                  backgroundImage: 'linear-gradient(hsl(var(--brand) / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--brand) / 0.08) 1px, transparent 1px)',
                  backgroundSize: '25% 25%',
                  transform: `perspective(900px) rotateX(58deg) rotateZ(-7deg) translate3d(${index * 9}px, ${lift}px, ${index * 26}px)`,
                }}
              >
                <span className="absolute -top-6 start-0 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-brand">{layer.index} · {layer.title}</span>
              </div>
            );
          })}
          <span className="absolute end-[4%] top-[14%] text-[0.6rem] uppercase tracking-[0.18em] text-ink-faint">{String(active + 1).padStart(2, '0')} / 04</span>
        </div>
      </Reveal>
      <ol className="border-t border-line">
        {layers.map((layer, index) => (
          <ArchitectureLayerRow key={layer.index} layer={layer} index={index} active={active === index} onActive={setActive} />
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
    <article id="company-page" ref={pageRef} className="relative isolate overflow-hidden bg-paper text-ink">
      <style jsx global>{`
        html,
        body {
          background-color: hsl(var(--ds-paper));
          color-scheme: light;
        }
      `}</style>
      <CompanyEnvironment rootRef={pageRef} />

      <section data-company-scene className="relative z-10 flex items-center border-b border-line py-14 sm:py-20 lg:min-h-[calc(100vh-4.5rem)] lg:py-28">
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

      <section data-company-scene className="relative z-10 py-16 sm:py-24 lg:min-h-[105vh] lg:py-40">
        <div className="container-page">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <span className="eyebrow">{about.narrative.eyebrow}</span>
              <h2 className="text-display mt-7 max-w-4xl text-[clamp(2.6rem,5.7vw,5.8rem)] leading-[0.93] rtl:leading-[1.14]">{about.narrative.title}</h2>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:pt-24" delay={100}>
              <p className="max-w-xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">{about.narrative.lead}</p>
              <ol className="mt-7 border-t border-line sm:mt-10">
                {about.narrative.problems.map((problem, index) => (
                  <li key={problem} className="grid grid-cols-[2.5rem_1fr] items-center border-b border-line py-4 text-sm sm:text-base">
                    <span className="text-[0.65rem] tabular-nums text-brand">0{index + 1}</span><span>{problem}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-company-scene className="relative z-10 py-16 sm:py-24 lg:min-h-[115vh] lg:py-40">
        <div className="container-page">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="eyebrow">{about.perspective.eyebrow}</span>
              <h2 className="text-display mt-7 whitespace-pre-line text-[clamp(2.75rem,6vw,6.2rem)] leading-[0.92] rtl:leading-[1.14]">{about.perspective.title}</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-ink-muted sm:text-lg lg:col-span-4">{about.perspective.lead}</p>
          </Reveal>
          <ol className="mt-12 grid gap-x-8 sm:mt-16 sm:grid-cols-2 sm:gap-y-6 lg:mt-20 lg:grid-cols-3 lg:gap-y-2">
            {about.perspective.steps.map((step, index) => (
              <Reveal key={step.index} className={perspectiveOffsets[index]} delay={index * 70}>
                <li className="relative overflow-hidden border-t border-line-strong bg-paper/35 py-4 sm:min-h-36 sm:pt-5 lg:min-h-44">
                  <span className="text-[0.66rem] tabular-nums tracking-[0.18em] text-brand">{step.index}</span>
                  <h3 className="text-display mt-3 max-w-xs text-[clamp(1.3rem,2.5vw,2.25rem)] sm:mt-6 lg:mt-8">{step.title}</h3>
                  <span aria-hidden="true" className="pointer-events-none absolute -bottom-5 end-0 text-display text-[6rem] text-brand/[0.045] sm:text-[8rem]">{step.index}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section data-company-scene className="relative z-10 border-y border-line bg-[#eef2ec]/[0.78] py-16 sm:py-24 lg:py-40">
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

      <section data-company-scene className="relative z-10 pb-10 pt-16 sm:py-24 lg:py-40">
        <div className="container-page">
          <div className="grid gap-10 border-y border-line py-10 sm:gap-12 sm:py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:py-24">
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

      <section data-company-scene className="relative z-10 border-t border-line bg-paper/85 py-14 sm:py-20 lg:py-28">
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
