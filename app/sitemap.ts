import type { MetadataRoute } from 'next';

const SITE = 'https://damasavero.com';

/**
 * Only the four approved, current pages. The service-detail routes and the
 * legal pages are deliberately absent — they carry `noindex` until their
 * content is rewritten against the current DAMASAVERO positioning.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ];
}
