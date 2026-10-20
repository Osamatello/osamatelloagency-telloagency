import type { Metadata } from 'next';
import { noIndex } from '@/lib/seo';

/**
 * Legal page: useful to visitors, deliberately out of the sitemap and index.
 * The route stays fully reachable; it is only kept out of the index.
 */
export const metadata: Metadata = noIndex;

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
