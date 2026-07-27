'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { PageHero } from '@/components/site/PageHero';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import type { LegalDoc } from '@/lib/i18n/dictionary';

export function LegalPage({
  doc,
  slug,
  breadcrumbLabel,
}: {
  doc: LegalDoc;
  slug: string;
  breadcrumbLabel: string;
}) {
  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} subtitle={doc.subtitle} />
      <Breadcrumbs items={[{ label: breadcrumbLabel, href: `/${slug}` }]} />

      <section className="py-20 lg:py-24">
        <div className="container-tello max-w-3xl">
          <p className="text-base leading-relaxed text-white/70">{doc.intro}</p>

          <div className="mt-10 space-y-10">
            {doc.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-white">{section.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-white/65">{section.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 border-t border-white/10 pt-6 text-sm text-white/45">
            {doc.updatedLabel}: {doc.updated}
          </p>
        </div>
      </section>
    </>
  );
}
