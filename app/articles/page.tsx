import type { Metadata } from 'next';
import { articles } from '@/lib/articles-data';
import { pageMetadata } from '@/lib/seo';
import { ArticlesIndexView } from '@/components/site/ArticlesIndexView';
import { articlesAr } from '@/lib/articles-data-ar';
import { services } from '@/lib/services-data';

export const metadata: Metadata = pageMetadata({
  title: 'Articles on AI Automation & Business Systems — DAMASAVERO',
  description:
    'Practical writing on AI automation, AI voice agents, CRM automation, web development and workflow platforms — what works, what it costs, and what to avoid.',
  path: '/articles',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'DAMASAVERO Articles',
  description:
    'Practical writing on AI automation, AI voice agents, CRM automation, web development and workflow platforms.',
  url: 'https://damasavero.com/articles',
  inLanguage: ['en', 'ar'],
  hasPart: articles.map((article) => ({
    '@type': 'Article',
    headline: article.title,
    url: `https://damasavero.com/articles/${article.slug}`,
    datePublished: article.published,
  })),
};

export default function ArticlesIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ArticlesIndexView
        articles={articles.map((a) => ({
          slug: a.slug,
          published: a.published,
          readingMinutes: a.readingMinutes,
          topic: a.topic,
          title: a.title,
          excerpt: a.excerpt,
          topicAr: articlesAr[a.slug]?.topic,
          titleAr: articlesAr[a.slug]?.title,
          excerptAr: articlesAr[a.slug]?.excerpt,
        }))}
        serviceLinks={services.map((s) => ({ slug: s.slug, name: s.name }))}
      />
    </>
  );
}
