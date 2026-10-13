import './globals.css';

import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk, Cairo } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { AREA_SERVED } from '@/lib/seo';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

// Body / UI text
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Display / editorial headlines
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

// Arabic (body + display)
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const siteUrl = 'https://damasavero.com';

// Title and description are kept inside the lengths search engines actually
// render: ~60 characters for the title, ~155 for the description. The previous
// description ran to 183 and was being truncated mid-sentence in results.
const title = 'AI Automation & Web Development Agency Dubai — DAMASAVERO';
const description =
  'AI voice agents, CRM and lead automation, workflow systems and business websites — built by DAMASAVERO in Dubai, for businesses across the UAE and worldwide.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | DAMASAVERO',
  },
  description,
  // Every route resolves its own canonical against `metadataBase`; the
  // homepage was the one page emitting no canonical at all.
  alternates: {
    canonical: '/',
  },
  keywords: [
    'AI automation',
    'business systems',
    'AI voice agents',
    'business process automation',
    'CRM automation',
    'lead automation',
    'workflow automation',
    'AI integrations',
    'DAMASAVERO',
  ],
  authors: [{ name: 'Osama Tello' }],
  creator: 'Osama Tello',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DAMASAVERO',
    // Resolved against `metadataBase`; matches the homepage canonical.
    url: '/',
    title,
    description,
    images: [
      {
        url: '/og-image.png',
        width: 1731,
        height: 909,
        alt: 'DAMASAVERO — AI Automation & Business Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Official DAMASAVERO DS mark — transparent PNG at
  // public/brand/damasavero-logo.png. The ?v= token busts any cached
  // (previously white-background) version. No other icon reference exists.
  icons: {
    icon: [{ url: '/brand/damasavero-logo.png?v=5', type: 'image/png' }],
    apple: '/brand/damasavero-logo.png?v=5',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${siteUrl}/#organization`,
    name: 'DAMASAVERO',
    url: siteUrl,
    // Feeds the knowledge panel. Distinct from the favicon: Google reads this
    // for the brand box, not for the icon beside a search result. Points at the
    // official square mark, well above Google's 112x112 minimum.
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/brand/damasavero-logo.png`,
      width: 1254,
      height: 1254,
    },
    image: `${siteUrl}/og-image.png`,
    email: 'Founder@damasavero.com',
    telephone: '+971501607600',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: AREA_SERVED,
    knowsAbout: [
      'AI automation',
      'AI voice agents',
      'CRM automation',
      'lead automation',
      'workflow automation',
      'business systems integration',
      'web development',
      'business website design',
      'landing page development',
      'technical SEO',
    ],
    description:
      'DAMASAVERO is an AI automation, business systems and web development company based in Dubai, United Arab Emirates, working with businesses worldwide. It designs and builds AI voice agents, CRM and lead automation, messaging and scheduling automation, custom integrations, and business websites across industries.',
    founder: {
      '@type': 'Person',
      name: 'Osama Tello',
      jobTitle: 'Founder',
    },
    // NOTE: contact email intentionally omitted until a verified DAMASAVERO
    // address is confirmed. Do not re-add hello@telloagency.ai.
  };

  // A WebSite node ties the pages together and names the publisher once, so
  // search and answer engines resolve the brand rather than inferring it.
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'DAMASAVERO',
    description,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': `${siteUrl}/#organization` },
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <style>{`
          html:has(#company-page),
          html:has(#capabilities-page),
          html:has(#contact-page),
          body:has(#company-page),
          body:has(#capabilities-page),
          body:has(#contact-page) {
            background-color: hsl(var(--ds-paper));
          }
        `}</style>
      </head>
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} ${cairo.variable} font-sans`}
      >
        <div className="relative z-10">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([organizationSchema, websiteSchema]),
            }}
          />

          <LanguageProvider>
            <Header />

            <main className="min-h-screen pt-16 lg:pt-[72px]">
              {children}
            </main>

            <Footer />
          </LanguageProvider>

          <SpeedInsights />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
