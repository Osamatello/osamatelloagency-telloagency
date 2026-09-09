import type { Metadata } from 'next';

/**
 * Route-level metadata only. The page itself is a Client Component, so its
 * canonical lives here rather than being pushed into the component tree.
 * Resolved against `metadataBase` in the root layout.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
