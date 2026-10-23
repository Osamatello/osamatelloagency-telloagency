import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '@/lib/articles-data';
import { AREA_SERVED } from '@/lib/seo';
import { ArticleView } from '@/components/site/ArticleView';
import { articlesAr } from '@/lib/articles-data-ar';
import { services } from '@/lib/services-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: { absolute: article.metaTitle },
    description: article.metaDescription,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: 'article',
      siteName: 'DAMASAVERO',
      locale: 'en_US',
      title: article.metaTitle,
      description: article.metaDescription,
      url: `/articles/${article.slug}`,
      publishedTime: article.published,
      modifiedTime: article.updated,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const url = `https://damasavero.com/articles/${article.slug}`;
  const publisher = {
    '@type': 'Organization',
    name: 'DAMASAVERO',
    url: 'https://damasavero.com',
    areaServed: AREA_SERVED,
  };

  // Article, FAQPage and a breadcrumb trail. The FAQ answers are on the page
  // already — this restates them in the form answer engines quote from.
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.metaDescription,
      abstract: article.answer,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: article.published,
      dateModified: article.updated,
      inLanguage: ['en', 'ar'],
      author: publisher,
      publisher,
      about: article.topic,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Articles', item: 'https://damasavero.com/articles' },
        { '@type': 'ListItem', position: 2, name: article.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ArticleView
        en={article}
        ar={articlesAr[article.slug]}
        published={article.published}
        readingMinutes={article.readingMinutes}
        related={articles
          .filter((other) => other.slug !== article.slug)
          .slice(0, 3)
          .map((other) => ({
            slug: other.slug,
            title: other.title,
            titleAr: articlesAr[other.slug]?.title,
          }))}
        serviceLinks={services.map((s) => ({ slug: s.slug, name: s.name }))}
      />
    </>
  );
}
