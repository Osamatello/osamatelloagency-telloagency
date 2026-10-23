import type { Metadata } from 'next';
import { noIndex, pageMetadata } from '@/lib/seo';

/**
 * Legal page: useful to visitors, deliberately out of the sitemap and index.
 * The route stays fully reachable; it is only kept out of the index. It still
 * names itself, or it inherits the homepage title and canonical.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Cookie Policy | DAMASAVERO',
    description:
      'How DAMASAVERO uses cookies and similar technologies.',
    path: '/cookies',
  }),
  ...noIndex,
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
