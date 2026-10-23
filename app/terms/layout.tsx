import type { Metadata } from 'next';
import { noIndex, pageMetadata } from '@/lib/seo';

/**
 * Legal page: useful to visitors, deliberately out of the sitemap and index.
 * The route stays fully reachable; it is only kept out of the index. It still
 * names itself, or it inherits the homepage title and canonical.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Terms of Service | DAMASAVERO',
    description:
      'The terms that govern use of the DAMASAVERO website and services.',
    path: '/terms',
  }),
  ...noIndex,
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
