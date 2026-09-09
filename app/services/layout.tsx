import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

/**
 * Route-level metadata only. The page itself is a Client Component, so its
 * metadata lives here rather than being pushed into the component tree.
 */
export const metadata: Metadata = pageMetadata({
  title: 'AI Automation & Business Systems Services — DAMASAVERO',
  description:
    'Explore DAMASAVERO’s AI automation and business systems capabilities, including workflow automation, customer operations, revenue systems, integrations and modernization.',
  path: '/services',
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
