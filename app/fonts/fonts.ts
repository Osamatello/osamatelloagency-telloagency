import localFont from 'next/font/local';
import type { CSSProperties } from 'react';

/**
 * Self-hosted fonts. These are the exact files `next/font/google` downloaded
 * from Google Fonts at build time — byte-identical — kept in the repo so a
 * build never depends on fonts.gstatic.com. (A timeout there failed the
 * 20 Oct production build and left /ar returning 404.)
 *
 * Google splits each family into per-script files and lets the browser fetch
 * only the ones a page needs via `unicode-range`. `next/font/local` can only
 * set that per call, so each subset is its own face and the family is the
 * stack of them, with the same ranges and preloads as before. Font loader
 * options must be literals, hence the repetition.
 */

// Body / UI text — variable weight axis.
const dmSansLatin = localFont({
  src: './dm-sans-latin.woff2',
  weight: '100 1000',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+0304,U+0308,U+0329,U+2000-206f,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd',
    },
  ],
  adjustFontFallback: false,
});
const dmSansLatinExt = localFont({
  src: './dm-sans-latin-ext.woff2',
  weight: '100 1000',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+0100-02ba,U+02bd-02c5,U+02c7-02cc,U+02ce-02d7,U+02dd-02ff,U+0304,U+0308,U+0329,U+1d00-1dbf,U+1e00-1e9f,U+1ef2-1eff,U+2020,U+20a0-20ab,U+20ad-20c4,U+2113,U+2c60-2c7f,U+a720-a7ff',
    },
  ],
  adjustFontFallback: false,
  preload: false,
});

// Display / editorial headlines — one variable file, declared at the three
// weights the site asked Google for.
const spaceGroteskLatin = localFont({
  src: [
    { path: './space-grotesk-latin.woff2', weight: '400', style: 'normal' },
    { path: './space-grotesk-latin.woff2', weight: '500', style: 'normal' },
    { path: './space-grotesk-latin.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+0304,U+0308,U+0329,U+2000-206f,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd',
    },
  ],
  adjustFontFallback: false,
});
const spaceGroteskLatinExt = localFont({
  src: [
    { path: './space-grotesk-latin-ext.woff2', weight: '400', style: 'normal' },
    { path: './space-grotesk-latin-ext.woff2', weight: '500', style: 'normal' },
    { path: './space-grotesk-latin-ext.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+0100-02ba,U+02bd-02c5,U+02c7-02cc,U+02ce-02d7,U+02dd-02ff,U+0304,U+0308,U+0329,U+1d00-1dbf,U+1e00-1e9f,U+1ef2-1eff,U+2020,U+20a0-20ab,U+20ad-20c4,U+2113,U+2c60-2c7f,U+a720-a7ff',
    },
  ],
  adjustFontFallback: false,
  preload: false,
});
const spaceGroteskVietnamese = localFont({
  src: [
    { path: './space-grotesk-vietnamese.woff2', weight: '400', style: 'normal' },
    { path: './space-grotesk-vietnamese.woff2', weight: '500', style: 'normal' },
    { path: './space-grotesk-vietnamese.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01a0-01a1,U+01af-01b0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1ea0-1ef9,U+20ab',
    },
  ],
  adjustFontFallback: false,
  preload: false,
});

// Arabic (body + display) — also carries the Latin text on Arabic pages.
const cairoArabic = localFont({
  src: './cairo-arabic.woff2',
  weight: '200 1000',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+06??,U+0750-077f,U+0870-0891,U+0897-08e1,U+08e3-08ff,U+200c-200e,U+2010-2011,U+204f,U+2e41,U+fb50-fdff,U+fe70-fe74,U+fe76-fefc,U+102e0-102fb,U+10e60-10e7e,U+10ec2-10ec7,U+10ec9-10eee,U+10ef?,U+1ee00-1ee03,U+1ee05-1ee1f,U+1ee21-1ee22,U+1ee24,U+1ee27,U+1ee29-1ee32,U+1ee34-1ee37,U+1ee39,U+1ee3b,U+1ee42,U+1ee47,U+1ee49,U+1ee4b,U+1ee4d-1ee4f,U+1ee51-1ee52,U+1ee54,U+1ee57,U+1ee59,U+1ee5b,U+1ee5d,U+1ee5f,U+1ee61-1ee62,U+1ee64,U+1ee67-1ee6a,U+1ee6c-1ee72,U+1ee74-1ee77,U+1ee79-1ee7c,U+1ee7e,U+1ee80-1ee89,U+1ee8b-1ee9b,U+1eea1-1eea3,U+1eea5-1eea9,U+1eeab-1eebb,U+1eef0-1eef1',
    },
  ],
  adjustFontFallback: false,
});
const cairoLatin = localFont({
  src: './cairo-latin.woff2',
  weight: '200 1000',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+0304,U+0308,U+0329,U+2000-206f,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd',
    },
  ],
  adjustFontFallback: false,
});
const cairoLatinExt = localFont({
  src: './cairo-latin-ext.woff2',
  weight: '200 1000',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+0100-02ba,U+02bd-02c5,U+02c7-02cc,U+02ce-02d7,U+02dd-02ff,U+0304,U+0308,U+0329,U+1d00-1dbf,U+1e00-1e9f,U+1ef2-1eff,U+2020,U+20a0-20ab,U+20ad-20c4,U+2113,U+2c60-2c7f,U+a720-a7ff',
    },
  ],
  adjustFontFallback: false,
  preload: false,
});

type Face = { style: { fontFamily: string } };
const stack = (faces: Face[], fallback: string) =>
  [...faces.map((face) => face.style.fontFamily), fallback].join(', ');

/**
 * The three CSS variables the stylesheet and Tailwind read. Each ends in a
 * metric-matched Arial fallback (declared in globals.css) so text does not
 * jump when the web font swaps in.
 */
export const fontVariables = {
  '--font-sans': stack([dmSansLatin, dmSansLatinExt], "'DM Sans Fallback'"),
  '--font-display': stack(
    [spaceGroteskLatin, spaceGroteskLatinExt, spaceGroteskVietnamese],
    "'Space Grotesk Fallback'"
  ),
  '--font-cairo': stack([cairoArabic, cairoLatin, cairoLatinExt], "'Cairo Fallback'"),
} as CSSProperties;
