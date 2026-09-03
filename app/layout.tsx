import './globals.css';

import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk, Cairo } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { MobileStickyCTA } from '@/components/site/MobileStickyCTA';
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

// TODO(DAMASAVERO): confirm the production domain and update this value.
const siteUrl = 'https://osamatelloagency-telloagency.vercel.app';

const title = 'DAMASAVERO — AI Automation & Business Systems';
const description =
  'DAMASAVERO designs and builds AI automation and business systems — voice agents, CRM and lead automation, messaging, scheduling, and custom integrations — for businesses across industries.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | DAMASAVERO',
  },
  description,
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
    title,
    description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
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
    icon: [{ url: '/brand/damasavero-logo.png?v=3', type: 'image/png' }],
    apple: '/brand/damasavero-logo.png?v=3',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DAMASAVERO',
    url: siteUrl,
    description:
      'DAMASAVERO is an AI automation and business systems company. It designs and builds AI voice agents, CRM and lead automation, messaging and scheduling automation, and custom integrations for businesses across industries.',
    founder: {
      '@type': 'Person',
      name: 'Osama Tello',
      jobTitle: 'Founder',
    },
    // NOTE: contact email intentionally omitted until a verified DAMASAVERO
    // address is confirmed. Do not re-add hello@telloagency.ai.
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} ${cairo.variable} font-sans`}
      >
        <div className="relative z-10">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />

          <LanguageProvider>
            <Header />

            <main className="min-h-screen pt-16 lg:pt-[72px]">
              {children}
            </main>

            <Footer />
            <MobileStickyCTA />

            <div className="h-16 lg:hidden" aria-hidden="true" />
          </LanguageProvider>

          <SpeedInsights />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
