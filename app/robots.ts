import type { MetadataRoute } from 'next';

const SITE = 'https://damasavero.com';

export default function robots(): MetadataRoute.Robots {
  return {
    // The wildcard already permits them, but naming the answer-engine crawlers
    // makes the intent explicit and survives future default-deny changes.
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: 'GPTBot', allow: '/', disallow: '/api/' },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: '/api/' },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: '/api/' },
      { userAgent: 'ClaudeBot', allow: '/', disallow: '/api/' },
      { userAgent: 'Claude-Web', allow: '/', disallow: '/api/' },
      { userAgent: 'PerplexityBot', allow: '/', disallow: '/api/' },
      { userAgent: 'Google-Extended', allow: '/', disallow: '/api/' },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
