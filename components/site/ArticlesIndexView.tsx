'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { articles } from '@/lib/articles-data';
import { articlesAr } from '@/lib/articles-data-ar';
import { services } from '@/lib/services-data';

/** The articles index, in whichever language the header toggle is set to. */
const UI = {
  en: {
    eyebrow: 'Articles',
    title: 'Writing on automation that has to work on a Tuesday',
    lead: 'Practical pieces on AI automation, voice agents, CRM systems and the platforms underneath them — including the parts that are usually left out.',
    minRead: 'min read',
    read: 'Read the article',
    builds: 'What DAMASAVERO builds',
    locale: 'en-GB',
  },
  ar: {
    eyebrow: 'مقالات',
    title: 'كتابات عن أتمتة يجب أن تعمل في يوم عمل عادي',
    lead: 'مقالات عملية عن أتمتة الذكاء الاصطناعي ووكلاء الصوت وأنظمة CRM والمنصات التي تقف خلفها — بما في ذلك الأجزاء التي تُغفل عادةً.',
    minRead: 'دقائق قراءة',
    read: 'اقرأ المقال',
    builds: 'ما الذي تبنيه DAMASAVERO',
    locale: 'ar-AE',
  },
} as const;

export function ArticlesIndexView() {
  const { locale, dir } = useI18n();
  const ar = locale === 'ar';
  const t = UI[ar ? 'ar' : 'en'];

  return (
    <article id="articles-page" dir={dir} className="bg-paper text-ink">
      <header className="border-b border-line">
        <div className="container-page pb-12 pt-14 sm:pb-14 sm:pt-16 lg:pt-20">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">{t.eyebrow}</span>
            <h1 className="text-display mt-5 text-[clamp(2.1rem,4.4vw,3.25rem)] text-ink">
              {t.title}
            </h1>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-[hsl(var(--ds-ink)/0.8)]">
              {t.lead}
            </p>
          </div>
        </div>
      </header>

      <div className="container-page py-14 sm:py-18 lg:py-20">
        <ol className="mx-auto max-w-3xl">
          {articles.map((article, index) => {
            const copy = ar ? articlesAr[article.slug] ?? article : article;
            const published = new Date(article.published).toLocaleDateString(t.locale, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            return (
              <li
                key={article.slug}
                className={index === 0 ? '' : 'mt-10 border-t border-line pt-10'}
              >
                <Link href={`/articles/${article.slug}`} className="group block">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] uppercase tracking-[0.18em] text-[hsl(var(--ds-ink)/0.6)]">
                    <span className="text-brand">{copy.topic}</span>
                    <time dateTime={article.published}>{published}</time>
                    <span>
                      {article.readingMinutes} {t.minRead}
                    </span>
                  </div>

                  <h2 className="text-display mt-3 text-[clamp(1.35rem,2.6vw,1.9rem)] leading-tight text-ink transition-colors duration-300 group-hover:text-brand">
                    {copy.title}
                  </h2>

                  <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-[hsl(var(--ds-ink)/0.82)]">
                    {copy.excerpt}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-[0.85rem] text-brand">
                    {t.read}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <section className="mx-auto mt-16 max-w-3xl border-t border-line pt-10">
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand">
            {t.builds}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {services.map((service) => (
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
      </div>
    </article>
  );
}
