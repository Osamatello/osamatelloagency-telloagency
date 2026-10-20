import type { Metadata } from 'next';
import { articles } from '@/lib/articles-data';
import { localePath, pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/i18n';
import { ArticlesIndexView } from '@/components/site/ArticlesIndexView';
import { articlesAr } from '@/lib/articles-data-ar';
import { services } from '@/lib/services-data';

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const copy =
    params.lang === 'ar'
      ? { title: 'مقالات عن الأتمتة بالذكاء الاصطناعي وأنظمة الأعمال — DAMASAVERO', description: 'كتابات عملية عن الأتمتة بالذكاء الاصطناعي، ووكلاء الصوت، وأتمتة إدارة العملاء، وتطوير المواقع، ومنصات تدفقات العمل: ما ينجح، وكم يكلّف، وما يجب تجنّبه.' }
      : {
          title: 'Articles on AI Automation & Business Systems — DAMASAVERO',
          description:
            'Practical writing on AI automation, AI voice agents, CRM automation, web development and workflow platforms — what works, what it costs, and what to avoid.',
        };
  return pageMetadata({ ...copy, path: '/articles', lang: params.lang });
}

function collectionSchema(lang: Locale) {
  const ar = lang === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ar ? 'مقالات DAMASAVERO' : 'DAMASAVERO Articles',
    description: ar
      ? 'كتابات عملية عن الأتمتة بالذكاء الاصطناعي، ووكلاء الصوت، وأتمتة إدارة العملاء، وتطوير المواقع، ومنصات تدفقات العمل.'
      : 'Practical writing on AI automation, AI voice agents, CRM automation, web development and workflow platforms.',
    url: `https://damasavero.com${localePath('/articles', lang)}`,
    inLanguage: lang,
    hasPart: articles.map((article) => ({
      '@type': 'Article',
      headline: (ar && articlesAr[article.slug]?.title) || article.title,
      url: `https://damasavero.com${localePath(`/articles/${article.slug}`, lang)}`,
      datePublished: article.published,
    })),
  };
}

export default function ArticlesIndex({ params }: { params: { lang: Locale } }) {
  const schema = collectionSchema(params.lang);
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
