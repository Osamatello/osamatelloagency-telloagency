import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

/**
 * Route-level metadata only. The page itself is a Client Component, so its
 * metadata lives here rather than being pushed into the component tree.
 */
export const metadata: Metadata = pageMetadata({
  title: 'AI Automation & Business Systems Services — DAMASAVERO',
  description:
    'DAMASAVERO’s AI automation, business systems and web development capabilities: workflow automation, customer operations, revenue systems and integrations.',
  path: '/services',
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
