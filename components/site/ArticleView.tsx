'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import type { ArticleContent } from '@/lib/articles-data';

/**
 * Article body, rendered in whichever language the header toggle is set to.
 * The page shell stays a server component so metadata and JSON-LD are emitted
 * statically; only the prose swaps here.
 */

const UI = {
  en: {
    articles: 'Articles',
    minRead: 'min read',
    keyPoints: 'Key points',
    faq: 'Frequently asked questions',
    related: 'Related capabilities',
    keepReading: 'Keep reading',
    ctaTitle: 'Want this built for your operation?',
    ctaBody:
      'DAMASAVERO builds AI automation and business systems from Dubai, for clients across the UAE and worldwide.',
    ctaPrimary: 'Book a Free Consultation',
    ctaSecondary: 'More articles',
    locale: 'en-GB',
  },
  ar: {
    articles: 'مقالات',
    minRead: 'دقائق قراءة',
    keyPoints: 'النقاط الأساسية',
    faq: 'أسئلة شائعة',
    related: 'قدرات ذات صلة',
    keepReading: 'اقرأ أيضًا',
    ctaTitle: 'تريد بناء هذا لعملياتك؟',
    ctaBody:
      'تبني DAMASAVERO أنظمة الأتمتة والأعمال من دبي، لعملاء في الإمارات وحول العالم.',
    ctaPrimary: 'احجز استشارة مجانية',
    ctaSecondary: 'مقالات أخرى',
    locale: 'ar-AE',
  },
} as const;

export type ArticleLink = { slug: string; title: string; titleAr?: string };
export type ServiceLink = { slug: string; name: string };

export function ArticleView({
  en,
  ar,
  published: publishedIso,
  readingMinutes,
  related,
  serviceLinks,
}: {
  en: ArticleContent;
  ar?: ArticleContent;
  published: string;
  readingMinutes: number;
  related: ArticleLink[];
  serviceLinks: ServiceLink[];
}) {
  const { locale, dir } = useI18n();
  const isAr = locale === 'ar';
  const t = UI[isAr ? 'ar' : 'en'];
  const article = (isAr && ar) || en;

  const published = new Date(publishedIso).toLocaleDateString(t.locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article id="articles-page" dir={dir} className="bg-paper text-ink">
      <header className="border-b border-line">
        <div className="container-page pb-12 pt-14 sm:pb-14 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-[0.78rem] text-[hsl(var(--ds-ink)/0.6)]">
              <Link href="/articles" className="transition-colors hover:text-brand">
                {t.articles}
              </Link>
              <span aria-hidden="true" className="px-2">/</span>
              <span className="text-[hsl(var(--ds-ink)/0.82)]">{article.topic}</span>
            </nav>

            <h1 className="text-display mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-tight text-ink">
              {article.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] uppercase tracking-[0.18em] text-[hsl(var(--ds-ink)/0.6)]">
              <time dateTime={publishedIso}>{published}</time>
              <span>
                {readingMinutes} {t.minRead}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container-page py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="border-s-2 border-brand ps-5 text-[1.08rem] leading-[1.75] text-ink">
            {article.answer}
          </p>

          <section className="mt-12 border-t border-line pt-8">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand">
              {t.keyPoints}
            </h2>
            <ul className="mt-5 space-y-3">
              {article.takeaways.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[0.98rem] leading-relaxed text-[hsl(var(--ds-ink)/0.88)]"
                >
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-14 space-y-12">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-display text-[clamp(1.2rem,2.2vw,1.55rem)] leading-snug text-ink">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-[1.02rem] leading-[1.8] text-[hsl(var(--ds-ink)/0.86)]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-5 space-y-3.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="border-s border-line ps-4 text-[0.98rem] leading-relaxed text-[hsl(var(--ds-ink)/0.84)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mt-16 border-t border-line pt-10">
            <h2 className="text-display text-[clamp(1.3rem,2.4vw,1.7rem)] text-ink">{t.faq}</h2>
            <dl className="mt-8 space-y-7">
              {article.faq.map((item) => (
                <div key={item.q} className="border-s border-line ps-5">
                  <dt className="text-[1.02rem] font-medium leading-snug text-ink">{item.q}</dt>
                  <dd className="mt-2.5 text-[0.98rem] leading-[1.75] text-[hsl(var(--ds-ink)/0.84)]">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-16 border-t border-line pt-10">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand">
              {t.related}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {serviceLinks.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block border-t border-line pt-3 text-[0.95rem] leading-snug text-[hsl(var(--ds-ink)/0.86)] transition-colors hover:text-brand"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14 border-t border-line pt-10">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand">
              {t.keepReading}
            </h2>
            <ul className="mt-5 space-y-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/articles/${other.slug}`}
                    className="text-[0.98rem] leading-snug text-[hsl(var(--ds-ink)/0.86)] transition-colors hover:text-brand"
                  >
                    {(isAr ? other.titleAr : undefined) ?? other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 border-t border-line pt-10">
            <h2 className="text-display text-[clamp(1.3rem,2.4vw,1.8rem)] text-ink">{t.ctaTitle}</h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-[hsl(var(--ds-ink)/0.84)]">
              {t.ctaBody}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                {t.ctaPrimary}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
              <Link href="/articles" className="btn-outline">
                {t.ctaSecondary}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
