import type { Metadata } from 'next';
import { noIndex, pageMetadata } from '@/lib/seo';
import { getDictionary, type Locale } from '@/lib/i18n';

/**
 * Legal page: useful to visitors, deliberately out of the sitemap and index.
 * The route stays fully reachable; it is only kept out of the index. It still
 * names itself, or it inherits the homepage title and canonical. Title and
 * description are the page's own heading and subtitle, in its language.
 */
export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const { title, subtitle } = getDictionary(params.lang).legal.cookie;
  return {
    ...pageMetadata({
      title: `${title} | DAMASAVERO`,
      description: subtitle,
      path: '/cookies',
      lang: params.lang,
    }),
    ...noIndex,
  };
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
