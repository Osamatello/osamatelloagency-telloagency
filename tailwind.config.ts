import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'ui-sans-serif', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Referenced across legacy components; formalised here so they render.
        '3xs': ['0.5625rem', { lineHeight: '0.75rem' }],
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // DAMASAVERO: restrained forest wash, replaces the old neon `tello-radial`.
        'tello-radial':
          'radial-gradient(60% 60% at 50% 0%, hsl(var(--brand) / 0.05) 0%, transparent 70%)',
        'brand-radial':
          'radial-gradient(55% 55% at 50% 0%, hsl(var(--brand) / 0.07) 0%, transparent 72%)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        /* ===========================================================
           DAMASAVERO design tokens — sourced from the business-card
           / signature identity:
             • warm off-white grounds
             • near-black charcoal type (faint green undertone)
             • deep muted FOREST GREEN accent (not teal / cyan / mint)
             • soft warm-grey borders & secondary text
        =========================================================== */
        paper: {
          DEFAULT: 'hsl(var(--ds-paper))', // page background (off-white)
          raised: 'hsl(var(--ds-paper-raised))', // cards / raised surfaces (pure white)
          sunken: 'hsl(var(--ds-paper-sunken))', // alternating sections (light grey)
        },
        ink: {
          DEFAULT: 'hsl(var(--ds-ink))', // primary text (near-black charcoal)
          muted: 'hsl(var(--ds-ink-muted))', // secondary text
          faint: 'hsl(var(--ds-ink-faint))', // tertiary / captions
          inverse: 'hsl(var(--ds-ink-inverse))', // text on dark / forest surfaces
        },
        line: {
          DEFAULT: 'hsl(var(--ds-line))', // hairline borders
          strong: 'hsl(var(--ds-line-strong))', // emphasised dividers
        },
        // Deep forest-green brand scale (from the business card).
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          soft: 'hsl(var(--brand-soft))',
          strong: 'hsl(var(--brand-strong))',
          foreground: 'hsl(var(--brand-foreground))',
          50: 'hsl(140 20% 96%)',
          100: 'hsl(140 18% 90%)',
          200: 'hsl(138 15% 80%)',
          300: 'hsl(136 14% 64%)',
          400: 'hsl(134 15% 46%)',
          500: 'hsl(134 20% 34%)',
          600: 'hsl(136 26% 26%)', // primary accent
          700: 'hsl(138 30% 20%)',
          800: 'hsl(140 30% 15%)',
          900: 'hsl(142 28% 11%)',
          950: 'hsl(144 26% 7%)',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Legacy alias: `neon` resolves to the DAMASAVERO forest-green accent so
        // existing `text-[hsl(var(--neon))]` markup renders on-brand until each
        // component is migrated to the `brand` tokens.
        neon: {
          DEFAULT: 'hsl(var(--brand))',
          soft: 'hsl(var(--brand-soft))',
          dim: 'hsl(var(--brand-strong))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      boxShadow: {
        // Restrained elevation set — no glow.
        'xs': '0 1px 2px 0 hsl(var(--ds-ink) / 0.04)',
        'card': '0 1px 3px hsl(var(--ds-ink) / 0.05), 0 8px 24px -12px hsl(var(--ds-ink) / 0.10)',
        'lift': '0 2px 6px hsl(var(--ds-ink) / 0.06), 0 20px 40px -16px hsl(var(--ds-ink) / 0.16)',
        '3xl': '0 24px 60px -20px hsl(var(--ds-ink) / 0.22)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'scale-up': {
          from: { transform: 'scale(0.7)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'grid-shift': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '56px 56px' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'scale-up': 'scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
