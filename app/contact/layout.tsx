import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

/**
 * Route-level metadata only. The page itself is a Client Component, so its
 * metadata lives here rather than being pushed into the component tree.
 */
export const metadata: Metadata = pageMetadata({
  title: 'Contact DAMASAVERO — AI Automation & Business Systems',
  description:
    'Talk to DAMASAVERO about AI automation, business systems, workflow integration or a custom operational challenge.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
