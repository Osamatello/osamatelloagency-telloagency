# Implementation Plan — Website Metadata & Social Previews

This plan outlines the steps to enhance the SEO, social media previews, and browser branding assets for the **TELLO** website. It will replace default previews with a live snapshot of the website and establish a robust, modern metadata system in Next.js.

---

## Proposed Changes & Steps

### 1. Structure & Directory Setup
- **Create `/public` directory**: Next.js requires a `/public` folder at the root to serve static assets such as `favicon.ico`, `og.png`, and `manifest.json`.
- **Generate Favicon assets**: Add a favicon package to `/public`:
  - `favicon.ico` (standard browser icon)
  - `apple-touch-icon.png` (for iOS homescreen bookmarking)
  - `icon-192.png` & `icon-512.png` (for progressive web app support)
  - `manifest.json` (web app manifest)

---

### 2. Website Snapshot for Open Graph (`og.png`)
To replace placeholder previews with a real snapshot of the website:
- **Local Dev Launch**: Run `npm run dev` to serve the site locally.
- **Capture Screenshot**: Use the browser subagent to visit the local server, render the page fully, and capture a screenshot.
- **Optimize Assets**: Crop and format the captured screenshot to **1200x630 pixels** (the optimal dimensions for Open Graph previews) and save it to `public/og.png`.

---

### 3. Metadata Configuration (`app/layout.tsx`)
We will rewrite the `metadata` object in [layout.tsx](file:///c:/Users/Osama.Tillo/OneDrive%20-%20BR%20Shipping/Desktop/Osama%20File/Coding%20Lessons/websites/osamatelloagency-telloagency/app/layout.tsx) using Next.js's native metadata structure.

#### Key Enhancements:
- **Canonical URL**: Dynamic canonical URLs for each page.
- **Theme Color & Viewport**: Match the dark/modern design of the agency.
- **Open Graph (Facebook/LinkedIn)**:
  - `og:title`, `og:description`, `og:url`
  - `og:site_name`: "TELLO"
  - `og:locale`: "en_US"
  - `og:image`: `/og.png` with correct dimensions and alt text
- **Twitter Card**:
  - `twitter:card`: "summary_large_image"
  - `twitter:title`, `twitter:description`
  - `twitter:image`: `/og.png`
- **Robots / Search Indexing**: Explicit search engine configurations.
- **Alternative/Localized Metadata**: Structure for future translation support.

```tsx
// Proposed metadata structure in app/layout.tsx:
export const metadata: Metadata = {
  metadataBase: new URL('https://telloagency.ai'),
  title: {
    default: 'TELLO — AI Automation for Modern Clinics',
    template: '%s | TELLO',
  },
  description: 'TELLO builds AI automation systems, business software, websites, and lead generation workflows for modern clinics and healthcare businesses.',
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
  themeColor: '#09090b', // Sleek zinc-950 color matching your background
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://telloagency.ai',
    siteName: 'TELLO',
    title: 'TELLO — AI Automation for Modern Clinics',
    description: 'TELLO builds AI automation systems, business software, websites, and lead generation workflows for modern clinics and healthcare businesses.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'TELLO — AI Automation for Modern Clinics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TELLO — AI Automation for Modern Clinics',
    description: 'TELLO builds AI automation systems, business software, websites, and lead generation workflows for modern clinics and healthcare businesses.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};
```

---

## Verification Plan

### Automated Verification
- Run compilation checks (`npm run typecheck`) to verify syntax.
- Verify page data compilation via `npm run build` or verification scripts.

### Manual Verification
- Launch the development server and inspect the HTML `<head>` tag to verify that all `<meta>` properties (canonical, og:image, twitter:image, description, title, robots, theme-color) are correctly injected.
- Use a mock verification check on the generated `/public/og.png` and favicon files to confirm they load properly.
