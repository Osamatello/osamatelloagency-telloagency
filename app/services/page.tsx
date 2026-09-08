'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { EngineAtmosphere } from './EngineAtmosphere';
import { SystemAssembly } from './SystemAssembly';
import styles from './services.module.css';

export default function ServicesPage() {
  const { dict, dir } = useI18n();
  const s = dict.services;
  const [active, setActive] = useState(0);
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
          <ol className={styles.steps}>
            {s.detail.processSteps.map(step => (
              <li key={step.step} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">{step.step}</span>
                <div>
                  <h3 className="text-display">{step.title}</h3>
                  <p>{step.description}</p>
                </div>
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
              <Link href="/consult" className="btn-primary">
                {s.cta.primaryCta}
                <ArrowUpRight size={18} className={styles.ctaArrow} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-outline">{s.cta.secondaryCta}</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
