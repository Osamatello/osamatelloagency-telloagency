import '../globals.css';

import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk, Cairo } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { AREA_SERVED, languageAlternates } from '@/lib/seo';
import { getDir, locales, type Locale } from '@/lib/i18n';
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
const copy: Record<Locale, { title: string; description: string; ogLocale: string; ogAlt: string }> = {
  en: {
    title: 'AI Automation & Web Development Agency Dubai — DAMASAVERO',
    description:
      'AI voice agents, CRM and lead automation, workflow systems and business websites — built by DAMASAVERO in Dubai, for businesses across the UAE and worldwide.',
    ogLocale: 'en_US',
    ogAlt: 'DAMASAVERO — AI Automation & Business Systems',
  },
  ar: {
    title: 'وكالة أتمتة بالذكاء الاصطناعي وتطوير مواقع في دبي — DAMASAVERO',
    description:
      'وكلاء صوت بالذكاء الاصطناعي، وأتمتة إدارة العملاء والعملاء المحتملين، وأنظمة تدفقات العمل، ومواقع الشركات. تبنيها DAMASAVERO في دبي لشركات في الإمارات وحول العالم.',
    ogLocale: 'ar_AE',
    ogAlt: 'DAMASAVERO — الأتمتة بالذكاء الاصطناعي وأنظمة الأعمال',
  },
};

// Both languages are prerendered; anything else under the segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const isLocale = (value: string): value is Locale => (locales as string[]).includes(value);

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : 'en';
  const { title, description, ogLocale, ogAlt } = copy[lang];
  const home = lang === 'ar' ? '/ar' : '/';
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: '%s | DAMASAVERO',
    },
    description,
    // Every route resolves its own canonical against `metadataBase`; the
    // homepage was the one page emitting no canonical at all.
    alternates: {
      canonical: home,
      languages: languageAlternates('/'),
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
      locale: ogLocale,
      siteName: 'DAMASAVERO',
      // Resolved against `metadataBase`; matches the homepage canonical.
      url: home,
      title,
      description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: ogAlt,
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
    // Icons come from the app/ file convention — app/icon.png, app/apple-icon.png
    // and app/favicon.ico — which Next fingerprints and links automatically.
    // Declaring metadata.icons here as well would emit a second, competing set.
    //
    // They are built from the dark-on-transparent mark, not the off-white one the
    // header uses: search engines and browsers composite favicons onto a white
    // ground, where an off-white mark is invisible.
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang: Locale = isLocale(params.lang) ? params.lang : 'en';
  const { description } = copy[lang];
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${siteUrl}/#organization`,
    name: 'DAMASAVERO',
    url: siteUrl,
    // Feeds the knowledge panel. Distinct from the favicon: Google reads this
    // for the brand box, not for the icon beside a search result. The dark
    // variant, because that panel renders on a light ground — the off-white
    // mark the header uses would be invisible there, the same way it was in
    // search results before the favicon was rebuilt.
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/brand/damasavero-logo-dark.png`,
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
    // Confirmed profiles only: sameAs is how search engines tie the company
    // page to this site.
    sameAs: ['https://www.linkedin.com/company/damasavero'],
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
    // The legacy hello@telloagency.ai address must not come back.
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
    <html lang={lang} dir={getDir(lang)} suppressHydrationWarning>
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

          <LanguageProvider locale={lang}>
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
