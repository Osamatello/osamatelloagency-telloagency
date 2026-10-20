'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';
import type { ArticleSummary } from '@/components/site/ArticlesIndexView';

/**
 * Three most recent articles, linked from the homepage.
 *
 * The nav item alone was the only path into /articles, which left the editorial
 * pages isolated from the page carrying the most authority. This gives them a
 * real internal link, and gives a first-time visitor evidence before the CTA.
 *
 * The summaries arrive as props from the server page so the full article
 * datasets never reach the browser bundle.
 */

const UI = {
  en: {
    eyebrow: 'Writing',
    title: 'How we think about this work.',
    viewAll: 'All articles',
    minRead: 'min read',
  },
  ar: {
    eyebrow: 'مقالات',
    title: 'كيف نفكّر في هذا العمل.',
    viewAll: 'كل المقالات',
    minRead: 'دقائق قراءة',
  },
} as const;

export function RecentWriting({ articles }: { articles: ArticleSummary[] }) {
  const { locale, dir } = useI18n();
  const ar = locale === 'ar';
  const t = UI[ar ? 'ar' : 'en'];
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const { ref, inView } = useInView<HTMLOListElement>();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead label={t.eyebrow} title={t.title} />
        <Link
          href="/articles"
          className="group inline-flex items-center gap-2 border-b border-line pb-1 text-[0.85rem] text-ink-muted transition-colors hover:border-brand hover:text-brand"
        >
          {t.viewAll}
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>

      <ol ref={ref} className="mt-10 grid gap-x-12 gap-y-10 sm:mt-12 sm:grid-cols-3">
        {articles.map((article, index) => {
          const copy = {
            topic: (ar && article.topicAr) || article.topic,
            title: (ar && article.titleAr) || article.title,
            excerpt: (ar && article.excerptAr) || article.excerpt,
          };
          return (
            <li
              key={article.slug}
              className={cn('reveal-up min-w-0', inView && 'is-in')}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <Link
                href={`/articles/${article.slug}`}
                className="group block h-full border-t border-line pt-4 transition-transform duration-300 hover:-translate-y-1 sm:pt-5"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.66rem] uppercase tracking-[0.18em] text-ink-faint">
                  <span className="text-brand">{copy.topic}</span>
                  <span>
                    {article.readingMinutes} {t.minRead}
                  </span>
                </div>

                <h3 className="text-display mt-3 text-[clamp(1.05rem,1.9vw,1.3rem)] leading-snug text-ink transition-colors duration-300 group-hover:text-brand">
                  {copy.title}
                </h3>

                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-muted">
                  {copy.excerpt}
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
