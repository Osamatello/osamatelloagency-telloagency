import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { MobileStickyCTA } from '@/components/site/MobileStickyCTA';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const siteUrl = 'https://telloagency.example';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TELLO — AI Automation for Modern Clinics',
    template: '%s | TELLO',
  },
  description:
    'TELLO builds AI automation systems, business software, websites, and lead generation workflows for modern clinics and healthcare businesses.',
  keywords: [
    'AI automation agency',
    'clinic automation',
    'AI lead generation',
    'healthcare websites',
    'CRM automation',
    'AI chatbots',
    'TELLO',
  ],
  authors: [{ name: 'Osama Tello' }],
  creator: 'Osama Tello',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TELLO',
    title: 'TELLO — AI Automation for Modern Clinics',
    description:
      'TELLO builds AI automation systems, business software, websites, and lead generation workflows for modern clinics.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'TELLO — AI Automation for Modern Clinics' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TELLO — AI Automation for Modern Clinics',
    description:
      'TELLO builds AI automation systems, business software, websites, and lead generation workflows for modern clinics.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TELLO',
    url: siteUrl,
    description:
      'TELLO is an AI automation agency building automation systems, business software, websites, and lead generation workflows for modern clinics and healthcare businesses.',
    founder: {
      '@type': 'Person',
      name: 'Osama Tello',
      jobTitle: 'Founder and AI Automation Builder',
    },
    email: 'hello@telloagency.example',
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <LanguageProvider>
          <Header />
          <main className="min-h-screen pt-16 lg:pt-[72px]">{children}</main>
          <Footer />
          <MobileStickyCTA />
          <div className="h-16 lg:hidden" aria-hidden="true" />
        </LanguageProvider>
      </body>
    </html>
  );
}
