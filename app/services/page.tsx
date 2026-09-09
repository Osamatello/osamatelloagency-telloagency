'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { EngineAtmosphere } from './EngineAtmosphere';
import { SystemAssembly } from './SystemAssembly';
import styles from './services.module.css';


export default function ServicesPage() {
  const { dict, dir } = useI18n();
  const s = dict.services;
  const [active, setActive] = useState(0);
  const domainRefs = useRef<(HTMLLIElement | null)[]>([]);
  const flowRef = useRef<HTMLOListElement>(null);
  const [flowIn, setFlowIn] = useState(false);

  // The process rail draws once, on entry. Deliberately not `useInView`: that
  // helper resolves to "visible" immediately under prefers-reduced-motion, which
  // would complete the sequence before the row is ever on screen. Here reduced
  // motion shortens the draw (see the stylesheet) rather than skipping it.
  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined' || !window.innerHeight) {
      setFlowIn(true);
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        // The fill is a keyframe animation starting from scaleX(0), so it always
        // plays from zero — no paint-timing guard needed, and none that could
        // strand the reveal if rAF is throttled.
        setFlowIn(true);
      },
      { threshold: 0.25, rootMargin: '0px 0px -15% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reading position activates a stratum, alongside hover, focus and click.
  // The band is the middle slice of the viewport, so whichever domain the
  // reader is actually on is the one lifted in the Assembly.
  useEffect(() => {
    const items = domainRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!items.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        const hit = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const index = items.indexOf(hit.target as HTMLLIElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [s.domains.items.length]);

  const titleWords = s.hero.title.split(' ');
  const lead = titleWords.slice(0, -2).join(' ');
  const tail = titleWords.slice(-2).join(' ');

  return (
    <article className={styles.page} dir={dir} id="capabilities-page">
      <EngineAtmosphere />
      <section className={styles.hero} aria-labelledby="capabilities-title">
        <div className="container-page">
          <span className="eyebrow">{s.hero.eyebrow}</span>
          <div className={styles.heroCopy}>
            <h1 id="capabilities-title" className="text-display">
              <span>{lead} </span>
              <span>{tail}</span>
            </h1>
          </div>
          <p className={styles.heroLead}>{s.hero.subtitle}</p>
        </div>
      </section>

      {/* The Assembly holds the six domains together as one build. */}
      <section className={styles.build} aria-labelledby="domains-title">
        <div className={`container-page ${styles.buildGrid}`}>
          <figure className={styles.figure}>
            <div className={styles.figureLabel}>
              <span className={styles.mark} />
              {s.assembly.label}
            </div>
            <SystemAssembly count={s.domains.items.length} active={active} />
            <figcaption>{s.assembly.caption}</figcaption>
          </figure>

          <div>
            <div className={styles.domainsHead}>
              <span className="eyebrow">{s.domains.eyebrow}</span>
              <h2 id="domains-title" className="text-display">{s.domains.title}</h2>
              <p>{s.domains.lead}</p>
            </div>

            <ul className={styles.domains}>
              {s.domains.items.map((item, i) => (
                <li
                  key={item.index}
                  ref={node => {
                    domainRefs.current[i] = node;
                  }}
                  className={i === active ? `${styles.domain} ${styles.domainOn}` : styles.domain}
                  onMouseEnter={() => setActive(i)}
                >
                  <div className={styles.domainButton}>
                    <span className={styles.domainIndex} aria-hidden="true">{item.index}</span>
                    <div>
                      <h3 className="text-display">
                        <button
                          type="button"
                          className={styles.domainTrigger}
                          onFocus={() => setActive(i)}
                          onClick={() => setActive(i)}
                          aria-pressed={i === active}
                        >
                          {item.title}
                        </button>
                      </h3>
                      <p>{item.summary}</p>
                      <div className={styles.components}>
                        <span className={styles.componentsLabel}>{s.domains.componentsLabel}</span>
                        {item.components.map(c => (
                          <span key={c} className={styles.component}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className={styles.note}>{s.domains.note}</p>
          </div>
        </div>
      </section>

      <section className={styles.approach} aria-labelledby="approach-title">
        <div className={`container-page ${styles.approachGrid}`}>
          <div className={styles.approachIntro}>
            <span className="eyebrow">{s.approach.eyebrow}</span>
            <h2 id="approach-title" className="text-display">{s.approach.title}</h2>
            <p>{s.approach.lead}</p>
          </div>
          <ol
            ref={flowRef}
            className={flowIn ? `${styles.flow} ${styles.flowIn}` : styles.flow}
          >
            {/* One muted rail, one green rail drawn over it. */}
            <span className={styles.railBase} aria-hidden="true" />
            <span className={styles.railFill} aria-hidden="true" />
            {s.detail.processSteps.map((step, i) => (
              <li
                key={step.step}
                className={styles.stage}
                /* One arrival time per stage. The rail travels linearly across
                   the row, so node i sits at i/4 of the width and is reached at
                   i x STAGE_STEP. Node, title and description all key off it. */
                style={{ ['--t' as string]: `${i * 700}ms` }}
              >
                <span className={styles.stageNode} aria-hidden="true" />
                <span className={styles.stageNumber} aria-hidden="true">{step.step}</span>
                <h3 className="text-display">{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="capabilities-cta">
        <div className={`container-page ${styles.closingGrid}`}>
          <div>
            <span className="eyebrow">{s.cta.eyebrow}</span>
            <h2 id="capabilities-cta" className="text-display">{s.cta.title}</h2>
          </div>
          <div className={styles.closingAction}>
            <p>{s.cta.subtitle}</p>
            <div>
              <Link href="/contact" className="btn-primary">
                {s.cta.primaryCta}
                <ArrowUpRight size={18} className={styles.ctaArrow} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
