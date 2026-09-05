'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import type { CompanyEditorial } from '@/lib/i18n/company';
import styles from './about.module.css';

// Deterministic cross-sections: no canvas, frame loop, randomness or DOM measurements.
const LENS_RIBS = Array.from({ length: 40 }, (_, i) => {
  const angle = ((i * 8.4 - 76) * Math.PI) / 180;
  const point = (radius: number, lift: number) => [
    +(280 + Math.cos(angle) * radius).toFixed(2),
    +(260 + Math.sin(angle) * radius * 0.82 + lift).toFixed(2),
  ];
  const [ox, oy] = point(205, 0);
  const [ix, iy] = point(112, 0);
  const [bx, by] = point(205, 35);
  const [jx, jy] = point(112, 35);
  return `M ${ox} ${oy} Q ${(ox + ix) / 2} ${(oy + iy) / 2 - 33} ${ix} ${iy} L ${jx} ${jy} Q ${(bx + jx) / 2} ${(by + jy) / 2 - 33} ${bx} ${by} Z`;
});

function DecisionLens({ centre }: { centre: [string, string] }) {
  return (
    <div className={styles.lens}>
      <div className={styles.lensGeometry} aria-hidden="true">
        <svg viewBox="0 0 560 550" fill="none" focusable="false">
          <path className={styles.datum} d="M25 275H535M280 25V525M25 265V285M535 265V285M270 25H290M270 525H290" />
          <ellipse className={styles.guide} cx="280" cy="260" rx="230" ry="208" strokeDasharray="2 8" />
          <g className={styles.ribs}>
            {LENS_RIBS.map((path, i) => <path key={i} d={path} />)}
          </g>
          <path className={styles.cutLine} d="M280 55V148M280 372V485" />
        </svg>
      </div>
      <div className={styles.lensCentre} key={centre.join(' ')}>
        <span>{centre[0]}</span><span>{centre[1]}</span>
      </div>
    </div>
  );
}

function Convictions({ copy, dir }: { copy: CompanyEditorial['convictions']; dir: 'ltr' | 'rtl' }) {
  const [active, setActive] = useState(copy.items[0].key);
  const selected = copy.items.find(item => item.key === active) ?? copy.items[0];
  return (
    <Tabs value={active} onValueChange={setActive} dir={dir} className={styles.reader}>
      <TabsList aria-label={copy.label} className={styles.tabs}>
        {copy.items.map((item, i) => (
          <TabsTrigger className={styles.tab} key={item.key} value={item.key}>
            <span className={styles.tabIndex} aria-hidden="true">0{i + 1}</span>{item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className={styles.readerBody}>
        <div className={styles.readerCopy}>
          {copy.items.map(item => (
            <TabsContent className={styles.panel} key={item.key} value={item.key}>
              <h3 className="text-display">{item.title}</h3>
              <p>{item.body}</p>
              {item.aside ? <p className={styles.principleAside}>{item.aside}</p> : null}
              <div className={styles.question}><span aria-hidden="true">↳</span><p>{item.question}</p></div>
            </TabsContent>
          ))}
        </div>
        <figure className={styles.study} data-principle={active}>
          <div className={styles.studyHeader}><span>{copy.studyLabel}</span><span aria-hidden="true">0{copy.items.indexOf(selected) + 1} / 03</span></div>
          <div className={styles.studyComposition}>
            <div className={styles.studyTerm}><span>{selected.captions[0]}</span><strong className="text-display">{selected.terms[0]}</strong></div>
            <div className={styles.studyRule} aria-hidden="true"><span /><span /><span /></div>
            <div className={styles.studyTerm}><span>{selected.captions[1]}</span><strong className="text-display">{selected.terms[1]}</strong></div>
          </div>
          <figcaption>{selected.annotation}</figcaption>
        </figure>
      </div>
    </Tabs>
  );
}

export default function AboutPage() {
  const { dict, dir } = useI18n();
  const c = dict.about;
  return (
    <article className={styles.page} dir={dir} id="company-page">
      <section className={styles.hero} aria-labelledby="company-title">
        <div className="container-page">
          <div className={styles.heroMeta}><span className="eyebrow">{c.eyebrow}</span><span className={styles.edition}>{dict.brand.tagline}</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="company-title" className="text-display"><span>{c.title[0]}</span><span>{c.title[1]}</span></h1>
              <p className={styles.introduction}>{c.introduction}</p>
              <a className={styles.readOn} href="#point-of-view">{c.readOn}<ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <figure className={styles.heroFigure}>
              <div className={styles.figureLabel}><span className={styles.mark} />{c.lens.label}<span aria-hidden="true">D / S</span></div>
              <DecisionLens centre={c.lens.centre} />
              <figcaption>{c.lens.caption}</figcaption>
            </figure>
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

      <section className={styles.convictions} aria-labelledby="convictions-title">
        <div className="container-page">
          <div className={styles.sectionHeading}><div><span className="eyebrow">{c.convictions.label}</span><h2 id="convictions-title" className="text-display">{c.convictions.title}</h2></div><p>{c.convictions.instruction}</p></div>
          <Convictions copy={c.convictions} dir={dir} />
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
          <div className={styles.closingAction}><p>{c.closing.body}</p><Link href="/consult" className="btn-primary">{c.closing.action}<ArrowUpRight size={18} className={styles.ctaArrow} aria-hidden="true" /></Link></div>
        </div>
      </section>
    </article>
  );
}
