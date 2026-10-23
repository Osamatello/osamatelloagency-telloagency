import type { Metadata } from 'next';

/** The one social card, shared by every page. Dimensions match the real file. */
const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'DAMASAVERO — AI Automation & Business Systems',
};

/**
 * Page metadata helper.
 *
 * Canonical, Open Graph and Twitter values all derive from one title /
 * description / path, so a route cannot end up with a canonical that disagrees
 * with its `og:url`. URLs resolve against `metadataBase` in the root layout.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    // `absolute` opts out of the root layout's `%s | DAMASAVERO` template —
    // these titles already carry the brand.
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'DAMASAVERO',
      locale: 'en_US',
      url: path,
      title,
      description,
      // A page-level `openGraph` replaces the root object wholesale, so the
      // shared card has to be restated here or sub-pages ship without an image.
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * Routes that are still live for visitors but must stay out of the index —
 * legacy sections awaiting a rewrite, and the legal pages.
 */
export const noIndex: Metadata = {
  robots: { index: false, follow: true },
};

/**
 * Where DAMASAVERO actually operates: a Dubai base, every emirate in the UAE,
 * and remote delivery beyond it. Shared so the Organization schema and each
 * Service schema never drift apart.
 */
export const AREA_SERVED = [
  { '@type': 'City', name: 'Dubai' },
  { '@type': 'City', name: 'Abu Dhabi' },
  { '@type': 'City', name: 'Sharjah' },
  { '@type': 'City', name: 'Ajman' },
  { '@type': 'City', name: 'Ras Al Khaimah' },
  { '@type': 'City', name: 'Fujairah' },
  { '@type': 'City', name: 'Umm Al Quwain' },
  { '@type': 'Country', name: 'United Arab Emirates' },
  { '@type': 'Place', name: 'Worldwide' },
];
