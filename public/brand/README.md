# DAMASAVERO brand assets

The identity is defined by the DAMASAVERO business card, now kept in the repo
at `damasavero-business-card.png` (it was previously held outside it, under the
filename `FOUNDER - OSAMA sIGNATURE .png`):

- **Mark:** a charcoal geometric **DS monogram** with a **deep forest-green wedge**
  at the lower right.
- **Wordmark:** `DAMASAVERO`, wide-tracked uppercase, near-black.
- **Palette:** warm off-white ground · near-black charcoal (faint green undertone) ·
  deep muted **forest green** accent · soft warm grey for secondary text / rules.

## Current state

There are **two** supplied variants of the mark, both transparent-background.
Which one a surface uses depends on what it sits on:

    public/brand/damasavero-logo.png        off-white mark — for DARK grounds
    public/brand/damasavero-logo-dark.png   charcoal mark  — for LIGHT grounds

- **Header** (`components/site/Logo.tsx`) uses the off-white mark, rendered
  as-is at `h-8 w-auto` — no redraw / recolour / crop. The site chrome is dark.
- **Favicons** (`app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`) are
  built from the **dark** variant, background left transparent. Google
  composites favicons onto a white circle of its own, which is why the
  off-white mark was invisible there — it showed as a blank circle in results.
  The dark mark reads against that circle without needing a ground of its own.
  The trade-off is a dark-mode browser tab strip, where charcoal on dark grey
  is low contrast; a light ground would fix that but shows as a white disc.
- **`Organization.logo`** in the root layout's schema points at the dark
  variant too, since Google renders the knowledge panel on a light ground.

The favicons are generated, not hand-drawn: the mark is trimmed to its bounding
box and placed at 66% of the canvas, because Google masks favicons to a circle
and a centred square only fits inside one at up to ~70% of the width.

### Replacing a variant

Drop a new transparent PNG at the same path. If you replace the dark variant,
regenerate the three files under `app/` from it so the favicon follows.

That's it — header and favicon both pick it up (hard-refresh the tab once).
Until the file exists the header shows the wordmark alone; it never falls back
to a reconstruction.

For the crispest browser-tab icon, use a version **tightly cropped to the DS
mark's bounding box** (square, transparent) — the current supplied art has some
surrounding padding, which makes the mark look small at 16–32 px. A padded file
still works.

Later: drop an official `.svg` at the same path (and `-inverse.svg` for dark
surfaces); optionally add `app/icon.png` so Next content-hashes the favicon URL.

The vector reconstruction (`components/site/DamasaveroMark.tsx`,
`damasavero-mark.svg`) is retained **unused**, as a development reference only.

## Required from the client

| File | Purpose | Notes |
| --- | --- | --- |
| **`damasavero-logo.svg`** | Primary lockup (DS monogram + wordmark) for light surfaces | **This is the blocker.** Vector, transparent background, exact monogram + forest wedge from the card. |
| `damasavero-logo-inverse.svg` | Same lockup for dark / forest surfaces | Off-white version. |
| `damasavero-mark.svg` | Monogram only (no wordmark) | Header on small screens, favicon source. |
| `favicon.ico` | Browser tab icon | 32 + 16 px, from the mark. |
| `apple-touch-icon.png` | iOS home screen | 180×180. |
| `og-image.png` | 1200×630 social card in the DAMASAVERO identity | Replaces the old TELLO card at `public/og-image.png`. |
| `founder-osama-tello.jpg` | Founder portrait for About / Founder sections | Real photo — no stock, no AI generation. |

Once `damasavero-logo.svg` / `-inverse.svg` land here, swap the `<span>` in
`components/site/Logo.tsx` for a `next/image` `<Image>` — no other change needed.

## Colour — confirm against the card

Code currently uses:

```
--brand:          hsl(136 27% 25%)   /* ≈ #2E4A34  deep forest green */
--brand-strong:   hsl(138 32% 17%)   /* hover / pressed */
--brand-soft:     hsl(134 20% 38%)   /* small marks on light */
--ds-ink:         hsl(156 14% 13%)   /* ≈ #1C2B25  charcoal */
--ds-paper:       hsl(44 24% 98%)    /* warm off-white */
--ds-line:        hsl(42 13% 87%)    /* warm grey hairline */
```

If a brand guide specifies exact hex values, update these in
`app/globals.css` (and the `brand` scale in `tailwind.config.ts`).
