'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { DecisionLens } from './DecisionLens';
import { EngineAtmosphere } from './EngineAtmosphere';
import styles from './about.module.css';

export default function AboutPage() {
  const { dict, dir } = useI18n();
  const c = dict.about;
  return (
    <article className={styles.page} dir={dir} id="company-page">
      <EngineAtmosphere />
      <section className={styles.hero} aria-labelledby="company-title">
        <div className="container-page">
          <div className={styles.heroMeta}><span className="eyebrow">{c.eyebrow}</span><span className={styles.edition}>{dict.brand.tagline}</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="company-title" className="text-display"><span>{c.title[0]}</span><span>{c.title[1]}</span></h1>
              <p className={styles.introduction}>{c.introduction}</p>
              <a className={styles.readOn} href="#point-of-view">{c.readOn}<ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <DecisionLens copy={c.lens} />
          </div>
        </div>
      </section>

      <section id="point-of-view" className={styles.premise} aria-labelledby="premise-title">
        <div className={`container-page ${styles.premiseGrid}`}>
          <div className={styles.sectionMargin}><span className="eyebrow">{c.premise.label}</span><p>{c.premise.marginal}</p></div>
          <div className={styles.premiseMain}>
            <h2 id="premise-title" className="text-display">{c.premise.title}</h2>
            <div className={styles.editorialColumns}>{c.premise.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
          </div>
        </div>
      </section>

      <section className={styles.working} aria-labelledby="working-title">
        <div className={`container-page ${styles.workingGrid}`}>
          <div className={styles.workingIntro}>
            <span className="eyebrow">{c.working.label}</span>
            <h2 id="working-title" className="text-display">{c.working.title}</h2>
            <p>{c.working.introduction}</p>
          </div>
          <ol className={styles.workingNotes}>
            {c.working.items.map((item, i) => (
              <li key={item.title}>
                <span className={styles.noteNumber} aria-hidden="true">0{i + 1}</span>
                <div><h3 className="text-display">{item.title}</h3><p>{item.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.founder} aria-labelledby="founder-title">
        <div className={`container-page ${styles.founderGrid}`}>
          <div className={styles.founderIdentity}>
            <span className="eyebrow">{c.founder.label}</span>
            <div className={styles.byline}><p className="text-display" dir="ltr">{c.founder.name}</p><span>{c.founder.role}</span></div>
          </div>
          <div className={styles.founderCopy}><h2 id="founder-title" className="text-display">{c.founder.title}</h2><p>{c.founder.body}</p><p className={styles.direction}>{c.founder.direction}</p></div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <div className={`container-page ${styles.closingGrid}`}>
          <div><span className="eyebrow">{c.closing.label}</span><h2 id="closing-title" className="text-display">{c.closing.title}</h2></div>
          <div className={styles.closingAction}><p>{c.closing.body}</p><Link href="/contact" className="btn-primary">{c.closing.action}<ArrowUpRight size={18} className={styles.ctaArrow} aria-hidden="true" /></Link></div>
        </div>
      </section>
    </article>
  );
}
