import type { MetadataRoute } from 'next';
import { services } from '@/lib/services-data';
import { articles } from '@/lib/articles-data';

const SITE = 'https://damasavero.com';

/**
 * The four core pages plus the three service-detail routes, now rewritten for
 * the current cross-industry positioning and indexable. Legal pages stay out:
 * they are `noindex` by design.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    ...services.map((service) => ({
      url: `${SITE}/services/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITE}/articles`, lastModified, changeFrequency: 'weekly' as const, priority: 0.7 },
    ...articles.map((article) => ({
      url: `${SITE}/articles/${article.slug}`,
      lastModified: new Date(article.updated),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
