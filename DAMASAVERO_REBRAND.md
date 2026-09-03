# DAMASAVERO rebrand & repositioning — working plan

Transform the existing **TELLO – AI Automation for Modern Clinics** site into
the official site for **DAMASAVERO – AI Automation & Business Systems**:
premium, industry-neutral, predominantly white/off-white, deep teal/green
accent. Preserve the Next.js architecture, routes, bilingual (EN/AR + RTL)
system, forms, SEO infrastructure, and the useful interactive components.

Design reference for polish/motion/composition only: cowlvane.com — **not** its
brand, content, or assets.

---

## 1. Repository audit (baseline)

### Stack
- Next.js 13.5.1 App Router, React 18, TypeScript (strict), Tailwind + shadcn/ui, lucide-react.
- `next.config.js`: `eslint.ignoreDuringBuilds: true`, `images.unoptimized: true`, `swcMinify: false`.
- Deploy: Netlify (`netlify.toml`, `@netlify/plugin-nextjs`) + Vercel Analytics/Speed Insights.
- i18n: custom, client-side. `lib/i18n/{dictionary.ts,en.ts,ar.ts,index.ts,LanguageProvider.tsx}`.
  `LanguageProvider` sets `<html dir>` / `lang`, persists to `localStorage` key `tello-locale`.
- Content backbone: `lib/i18n/en.ts` (663 lines), `lib/i18n/ar.ts` (659), `lib/services-data.ts` (295).

### Routes (all preserved)
`/`, `/about`, `/services`, `/services/[slug]` (ai-automation, website-development, lead-generation),
`/industries`, `/case-studies`, `/pricing`, `/contact`, `/consult`, `/privacy`, `/terms`, `/cookies`.

### Baseline health (before Milestone 1)
- `npx tsc --noEmit` → clean.
- `npm run build` → succeeds, 17 routes static/SSG.
- `npm run lint` → see run log (was not part of the build; `ignoreDuringBuilds`).

### Pre-existing issues found (not caused by the rebrand)
| Issue | Location | Plan |
| --- | --- | --- |
| `/faq` link points to a route that does not exist | `app/page.tsx` (FAQ preview "View All FAQs") | M4: point at `/pricing#faq` or an on-page anchor, or drop the link. |
| Undefined utility classes silently dropped by Tailwind: `text-2xs`, `text-3xs`, `bg-grid-animated`, `animate-scale-up`, `shadow-3xl`, plus `text-4xs`/`text-5xs` in `BentoGrid` | `page.tsx`, `BentoGrid.tsx`, `ClinicSimulator.tsx`, `InteractiveFlow.tsx` | **M1 fixes** `2xs/3xs/3xl/scale-up/grid-animated`. `4xs/5xs` to be removed with `BentoGrid` redesign (M3). |
| `@supabase/supabase-js` in deps but **never imported** | — | Leave; remove in M6 cleanup if still unused. |
| `ContactForm` submit is a simulated `setTimeout` (comment: "Ready for an n8n webhook integration later") | `components/site/ContactForm.tsx` | Keep behaviour; wire a real endpoint only if/when provided. Not in scope. |
| Typo "Leeds"/"an consultation" in service copy | `lib/services-data.ts` | Fixed during M5 content conversion. |
| Dead/unused components: `SparklesField`, `AnimatedCounter`, `ToolLogos`, `WorkflowSteps`, `ProblemCard` | `components/site/` | Delete in M6 (or when a milestone proves them unneeded). |

---

## 2. Legacy **TELLO** identity — inventory

### Brand string / metadata
- `lib/i18n/en.ts`, `lib/i18n/ar.ts`: `brand.name` "TELLO", `brand.tagline`, `schema.*`. **[M1 done for brand + schema]**
- `app/layout.tsx`: `<title>`, description, keywords, OG/Twitter, JSON-LD Organization, `siteUrl`. **[M1 done]**
- `IMPLEMENTATION_METADATA.md`, `README.md`: TELLO references. **[M1: README updated; IMPLEMENTATION_METADATA is historical, leave]**
- `og-image.png` (`public/` + `app/opengraph-image.png/`): old TELLO social card. **[needs new asset — see `public/brand/README.md`]**

### Contact / social — **legacy or unverified, must not ship as-is**
| Value | Where |
| --- | --- |
| `hello@telloagency.ai` | `Footer.tsx`, `contact` info (en/ar), privacy policy body (en/ar), old JSON-LD |
| `+971 58 991 2345` | `Footer.tsx`, `contact` info (en/ar) |
| `Dubai, United Arab Emirates — serving clinics worldwide` | `Footer.tsx`, `contact` info (en/ar) |
| `Sun–Thu, 9:00–18:00 (GST)` hours | `contact` info (en/ar) |
| `twitter.com/telloagency`, `linkedin.com/company/telloagency` | `Footer.tsx` (hard-coded array) |

→ **M5:** replace only with values Osama confirms. Anything unconfirmed is
**omitted** (remove the row/icon), never invented. `hello@telloagency.ai`
already removed from the JSON-LD in M1.

**Confirmed DAMASAVERO details (apply in M5):**
- Phone: `+971 50 160 7600`
- Website: `damasavero.com`
- Location: `Dubai · Bur Dubai · Rolla St`
- Email: **none provided** — omit the email row until confirmed.
- Social profiles: **none provided** — remove the Twitter/LinkedIn icons until confirmed.
- `damasavero.com` should also become `metadataBase` / canonical base in `app/layout.tsx`.

### Visual identity (neon / cyberpunk) — **replace**
- `app/globals.css`: neon-green palette, `text-glow`, `glow-sm/md`, `pulse-glow`, `aurora`,
  `border-glow`, global sparkles block. **[M1: palette → teal; glows/sparkle CSS neutralised]**
- `components/site/GlobalSparklesBackground.tsx` + `<GlobalSparklesBackground />` in layout. **[M1: deleted]**
- `components/site/Logo.tsx`: circuit/nodes SVG mark. **[M1: replaced with DAMASAVERO wordmark + geometric mark, asset-ready]**
- `tailwind.config.ts`: `neon` colours, `tello-radial`. **[M1: `neon` aliased to `--brand`; radial softened; `brand`/`teal`/`paper`/`ink`/`line` tokens added]**
- Class-name prefix `tello` (`container-tello`, `btn-neon`, `btn-ghost-tello`, `card-tello`,
  `bg-tello-radial`, `text-gradient-neon`) is used in ~35 files. **Kept as working aliases**
  in M1; migrated to `container-page` / `btn-primary` / `btn-outline` / `card-paper` per
  section in M2–M5; aliases deleted in M6.

---

## 3. Clinic / healthcare positioning — inventory & rule

**Rule:** remove clinic/dental/medical/patient framing everywhere. Do **not**
swap "clinic" for one other industry. Positioning stays **industry-neutral**:
DAMASAVERO automates systems and workflows for businesses across industries.
Allowed concrete examples: AI phone reception, customer enquiries, lead
qualification, booking handling, customer support, WhatsApp automation, CRM
automation, follow-up systems, internal workflows, data processing, sales &
operational automation, integrations.

### Where clinic language lives (counts are matches, not lines)
| File | Approx. matches | Milestone |
| --- | --- | --- |
| `lib/i18n/en.ts` | ~109 | M5 (full EN content rewrite) |
| `lib/i18n/ar.ts` | ~75 (`عياد*`) + more | M5 (full AR content rewrite, RTL-correct) |
| `lib/services-data.ts` | ~45 | M5 (service detail pages) |
| `components/site/ClinicSimulator.tsx` | ~13, plus embedded EN/AR strings | M2 — rename to a neutral **Business Automation demo**, strip clinic UI/copy |
| `components/site/BentoGrid.tsx` | ~10, plus embedded EN/AR strings + fake "Dr." leads | M3 — redesign as neutral solutions matrix |
| `app/layout.tsx` | metadata | **M1 done** |
| `components/site/Footer.tsx` | "serving clinics worldwide" | M5 |
| `app/page.tsx` | section copy via dict | M3/M5 |

### Structural clinic references
- `industries` data: `slug: 'clinics'`, `icon: 'Stethoscope'`, `featured: true`, clinic solutions list.
  Other industries marked `comingSoon`. → **M5:** reframe as neutral capability areas or
  representative industries with none hard-coded as "the" focus; drop `Stethoscope`.
- `about.why` item `icon: 'Stethoscope'`, "Clinic-focused". → M5.
- `contact.form.serviceOptions` includes "Clinic Automation". → M5.
- Case studies: titles/categories ("AI Clinic Receptionist", "Modern Dental Clinic Website",
  "Clinic Lead Generation", categories "Clinic Automation"). → M5 (neutral engagement examples;
  keep the NDA disclaimer, keep them as playbooks not claimed clients).
- `lib/icons.ts` exports `Stethoscope` (+ maps it). → M5 when no longer referenced.

### Capability honesty
Keep claims to what the business can plausibly deliver (automation builds,
integrations, websites, lead workflows). Do **not** add testimonials, client
names, metrics, case studies, addresses, emails, or social profiles that
aren't provided.

---

## 4. Component disposition

| Component | Disposition | Milestone |
| --- | --- | --- |
| `Header` | Redesign — white/translucent, ink nav, teal CTA, hairline border, premium scroll, clean mobile sheet | M2 |
| `Logo` | **Done (interim)** — DAMASAVERO wordmark + mark; swap for official asset when supplied | M1 / asset |
| `ClinicSimulator` | Rename + rebuild as neutral **Business Automation demo** (e.g. enquiry → AI → CRM/calendar → action → result). Keep the auto-playing concept, drop clinic UI/copy | M2 |
| Hero (in `app/page.tsx`) | Rebuild — oversized headline, minimal copy, controlled teal, strong motion, white environment | M2 |
| `BentoGrid` | Redesign — asymmetric solutions matrix, neutral copy, remove fake "Dr." leads, remove `4xs/5xs` classes | M3 |
| `InteractiveFlow`, `VerticalTimeline`, `ProcessTimeline`, `WorkflowDiagram` | Keep logic; restyle to light system; use for the Business Input → AI layer → Tools → Action → Result story | M3 |
| `ServiceCardMini`, `ServiceDetailPage`, `FeatureCard`, `IndustryCard`, `CaseStudyCard`, `PricingCard`, `FAQAccordion` | Keep structure; restyle to light system; content neutralised in M5 | M3–M5 |
| `CTASection` (+ `MagneticText`) | Restyle; keep magnetic micro-interaction (respect reduced-motion) | M4 |
| `FounderCard`, `FounderPortrait` | Redesign — remove generic user-icon / silhouette; DAMASAVERO typographic treatment; architecture ready for a real portrait | M4 |
| `Footer` | Redesign; strip legacy contact/social; only confirmed DAMASAVERO info | M5 |
| `SectionHeading`, `PageHero`, `Breadcrumbs`, `MobileStickyCTA`, `LanguageSwitcher` | Restyle to light system | M2 / M5 |
| `AuroraBackground`, `SparklesField`, `AnimatedCounter`, `ToolLogos`, `WorkflowSteps`, `ProblemCard` | Unused or banned effect — delete | M6 (Aurora used by `ServiceDetailPage`; remove when that is restyled in M5) |
| `components/ui/*` (shadcn) | Keep; they follow the semantic tokens and adapt when the base flips | M6 |

---

## 5. Design system (established in Milestone 1)

Tokens (see `app/globals.css`, `tailwind.config.ts`):

- **Grounds:** `paper` (warm off-white page), `paper-raised` (white cards),
  `paper-sunken` (light-grey alternating sections).
- **Type:** `ink` / `ink-muted` / `ink-faint` (charcoal, not pure black) + `ink-inverse`.
- **Borders:** `line` (hairline) / `line-strong`.
- **Accent:** `brand` / `brand-soft` / `brand-strong` (deep teal/green) + a `teal` 50–950 scale.
- **Elevation:** `shadow-xs / card / lift / 3xl` — restrained, no glow.
- **Utilities:** `.container-page`, `.btn-primary`, `.btn-outline`, `.eyebrow` (re-styled,
  no pill/glow), `.card-paper`, `.text-display`.
- **Legacy aliases kept working:** `--neon*` → teal, `.btn-neon` / `.btn-ghost-tello` /
  `.card-tello*` / `.eyebrow` / `.text-gradient*` / glow classes (now no-ops) /
  `container-tello` / `bg-tello-radial`.

**Migration approach:** the site still renders on the dark semantic tokens so
unconverted sections stay coherent for review. Each milestone flips its
surfaces to the light tokens. Milestone 6 removes the dark fallback and the
`tello`/`neon` aliases.

Banned and removed/neutralised in M1: neon green, global sparkles, text glow,
pulse-glow, aurora animation, glowing borders. Motion respects
`prefers-reduced-motion` (global media query retained).

---

## 6. Milestones

- [x] **M1 — Brand foundation + design system + removal strategy** (this doc)
- [x] **M2 — Header + Hero + Business Automation demo**
- [x] **M2 POLISH 2 — message, mark, ambient environment**
      - Hero message reframed to the "first step" positioning ("You already took the
        first step. / The rest can run itself." + "You opened DAMASAVERO. Now let's find
        what's slowing your business down — and automate it."), EN + AR.
      - Logo: `[DS mark] DAMASAVERO`. The mark is a **vector reconstruction** of the
        supplied business-card symbol (`components/site/DamasaveroMark.tsx`) — charcoal
        D+S with a forest-green lower slab. Favicon (`public/icon.svg`) + `metadata.icons`
        wired from the same shape. NOT redrawn/reinvented; replace
        `public/brand/damasavero-mark.svg` + `public/icon.svg` with the official vector
        and switch `<Logo>` to `next/image` — one swap. (I cannot ingest a pasted image
        file through chat, hence the reconstruction.)
      - `HeroEnvironment` component: 11 operational signals as spatial typography across
        3 depth layers (drift + scroll parallax + faint pointer parallax on the near
        layer), faint forest flow-lines with travelling dashes, one manual→automated
        swap. 5–30% opacity, transform/opacity only, `prefers-reduced-motion` → frozen
        calm state, RTL-mirrored, half-density + dimmed on ≤767px. No particles / glow /
        blobs / icons. Replaced the earlier orbital-rings motif.
- [x] **M2 REDO — Cowlvane-level composition + corrected brand**
      - Brand palette **corrected** to the business-card identity: deep muted **forest
        green** (`--brand: 136 27% 25%`), warm off-white ground, charcoal ink, warm-grey
        lines. Previous M2 used a too-bright/blue teal — removed. `teal` Tailwind scale
        replaced by a forest `brand` scale. One palette, one source of truth.
      - Type system: **Space Grotesk** (display, medium, tight negative tracking, ~0.98
        leading, deliberate line breaks) + **DM Sans** (body). Arabic keeps Cairo and
        resets negative tracking. `.text-display` carries the rules.
      - **Logo: invented "D" mark removed.** Ships a wordmark-only interim lockup; the
        official DS monogram must arrive as `public/brand/damasavero-logo.svg`
        (see `public/brand/README.md` — this is the outstanding blocker).
      - Hero recomposed: full-viewport, asymmetric, editorial. Oversized 3-line headline
        with per-line clip-reveal; supporting copy + automation sequence offset lower-right;
        bottom rail with pills + conceptual units; faint parallax orbital motif. No
        two-column split, no cards.
      - `BusinessAutomationDemo` rebuilt as a **typographic sequence** (status tag → raw
        enquiry resolving to automated outcome → six-node threaded path that fills forest
        green as it plays). No dashboard cards, no chat bubbles, no boxes.
      - Header: wordmark, wide gutters, transparent→hairline on scroll, height condense,
        full-screen mobile overlay with staggered link reveal.
      - Motion: `reveal-line` / `reveal-up` / `reveal-fade` choreography utilities in
        globals.css, staggered via inline `transition-delay`; one rAF parallax handler.
        All gated by `prefers-reduced-motion`.
- [x] **M3 — Homepage core experience** (Integrations, Capabilities, The Shift, The Path, Method)
      All five sections below the hero rebuilt on the light system, continuous scroll,
      no cards. Dark "Trusted Tools" band deleted (seam gone). One deliberate charcoal
      beat (The Shift). New components in `components/site/home/`; `BentoGrid`,
      `InteractiveFlow`, `VerticalTimeline` retired. Scroll-story sections use two
      lightweight hooks (`lib/useInView.ts`, `lib/useScrollProgress.ts`) — no scroll
      library. `home.{tools,capabilities,shift,workflow,howItWorks}` neutralised; the
      still-legacy `servicesOverview`/`solutions`/`problems`/`benefits` copy also
      de-clinic'd for the M5 pages. Hero / header / logo / M4 sections untouched.
- [ ] **M3 (superseded numbering) — Homepage services / solutions / workflow**
- [ ] **M4 — Pricing + Founder + FAQ + CTA**
- [ ] **M5 — Footer + secondary pages + full EN/AR content conversion** (clinic → neutral; contact/social verified or omitted; new og-image)
- [ ] **M6 — Responsive + Arabic RTL + a11y + performance + polish; remove dark fallback & legacy aliases & dead components**

After every milestone: `npm run lint`, `npx tsc --noEmit`, `npm run build`,
then report changed files / done / remaining / assets needed.

---

## 7. Assets / info still needed from Osama

1. **Official DAMASAVERO logo artwork** — see `public/brand/README.md` for filenames.
2. **Exact brand accent colour** (hex) from the business card / signature. Code currently uses `#1a6b64`-ish.
3. **Confirmed contact details** — email, phone, location, hours — or confirmation to omit each.
4. **Confirmed social profiles** (LinkedIn, X, Instagram, …) — or confirmation there are none yet.
5. **Production domain** for `metadataBase` / canonical URLs.
6. **Professional founder photo** (optional; no stock, no AI generation).
7. Any real client/case-study material that may be published, or confirmation to keep case studies as unattributed playbooks.
