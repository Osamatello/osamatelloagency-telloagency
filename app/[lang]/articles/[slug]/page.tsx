import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '@/lib/articles-data';
import { AREA_SERVED, languageAlternates, localePath } from '@/lib/seo';
import type { Locale } from '@/lib/i18n';
import { ArticleView } from '@/components/site/ArticleView';
import { articlesAr } from '@/lib/articles-data-ar';
import { services } from '@/lib/services-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Params = { lang: Locale; slug: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  // Arabic prose where it exists; the dates and slug are shared.
  const copy = (params.lang === 'ar' && articlesAr[article.slug]) || article;
  const path = `/articles/${article.slug}`;
  return {
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    alternates: { canonical: localePath(path, params.lang), languages: languageAlternates(path) },
    openGraph: {
      type: 'article',
      locale: params.lang === 'ar' ? 'ar_AE' : 'en_US',
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: localePath(path, params.lang),
      publishedTime: article.published,
      modifiedTime: article.updated,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.metaTitle,
      description: copy.metaDescription,
    },
  };
}

export default function ArticlePage({ params }: { params: Params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const copy = (params.lang === 'ar' && articlesAr[article.slug]) || article;
  const url = `https://damasavero.com${localePath(`/articles/${article.slug}`, params.lang)}`;
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
      headline: copy.title,
      description: copy.metaDescription,
      abstract: copy.answer,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: article.published,
      dateModified: article.updated,
      inLanguage: params.lang,
      author: publisher,
      publisher,
      about: copy.topic,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: params.lang === 'ar' ? 'مقالات' : 'Articles', item: `https://damasavero.com${localePath('/articles', params.lang)}` },
        { '@type': 'ListItem', position: 2, name: copy.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: params.lang,
      mainEntity: copy.faq.map((item) => ({
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
