'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import type { LegalDoc } from '@/lib/i18n/dictionary';

/**
 * Shared shell for the three footer legal pages.
 *
 * Migrated off the legacy `text-white/*` treatment onto the current DAMASAVERO
 * tokens: charcoal ground, warm off-white body, hairline rules, emerald only on
 * links. No atmosphere layer here — these are long-form reading pages and
 * legibility wins over background presence. Structure and content unchanged;
 * the page header and breadcrumb are inline rather than the legacy PageHero /
 * Breadcrumbs components, which are still used by other routes.
 */
export function LegalPage({
  doc,
  slug,
  breadcrumbLabel,
}: {
  doc: LegalDoc;
  slug: string;
  breadcrumbLabel: string;
}) {
  const { dict, dir } = useI18n();

  return (
    <article id="legal-page" dir={dir} className="bg-paper text-ink">
      <header className="border-b border-line">
        <div className="container-page pb-10 pt-14 sm:pb-12 sm:pt-16 lg:pt-20">
          <span className="eyebrow mx-auto flex max-w-3xl">{doc.eyebrow}</span>
          <h1 className="text-display mx-auto mt-5 max-w-3xl text-[clamp(2.1rem,4.4vw,3.25rem)] text-ink">
            {doc.title}
          </h1>
          {doc.subtitle ? (
            <p className="mx-auto mt-5 max-w-3xl text-[0.98rem] leading-relaxed text-[hsl(var(--ds-ink)/0.8)]">
              {doc.subtitle}
            </p>
          ) : null}
        </div>
      </header>

      <nav aria-label="Breadcrumb" className="border-b border-line">
        <div className="container-page mx-auto flex max-w-3xl items-center gap-2 py-3 text-[0.78rem] text-[hsl(var(--ds-ink)/0.6)]">
          <Link href="/" className="transition-colors hover:text-brand">
            {dict.components.breadcrumbsHome}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${slug}`} aria-current="page" className="text-[hsl(var(--ds-ink)/0.82)]">
            {breadcrumbLabel}
          </Link>
        </div>
      </nav>

      <div className="container-page py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[1.02rem] leading-[1.8] text-[hsl(var(--ds-ink)/0.88)]">{doc.intro}</p>

          <div className="mt-12 space-y-11">
            {doc.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-display text-[clamp(1.15rem,2vw,1.45rem)] leading-snug text-ink">
                  {section.heading}
                </h2>
                <p className="mt-3.5 text-[1.02rem] leading-[1.8] text-[hsl(var(--ds-ink)/0.84)]">{section.body}</p>
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-line pt-6 text-[0.85rem] text-[hsl(var(--ds-ink)/0.66)]">
            {doc.updatedLabel}: {doc.updated}
          </p>
        </div>
      </div>
    </article>
  );
}
