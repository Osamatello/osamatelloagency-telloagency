import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

/**
 * Route-level metadata only. The page itself is a Client Component, so its
 * metadata lives here rather than being pushed into the component tree.
 */
export const metadata: Metadata = pageMetadata({
  title: 'About DAMASAVERO — AI Automation & Business Systems',
  description:
    'Learn how DAMASAVERO approaches intelligent business systems, automation, integration and practical engineering for real business operations.',
  path: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
