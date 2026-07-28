# Ink Novation — Website

A seven-page marketing site for Ink Novation, a tattoo studio in Allentown,
PA, with three resident artists. Built with React, React Router, Tailwind
CSS v4, and Framer Motion.

## Before this goes live

**The studio business phone number is still a placeholder.** No phone
numbers appear anywhere on this site by design — the artists' personal
numbers are deliberately not published, and a dedicated studio business
line does not exist yet. `src/data/content.js` → `studio` has
`phone: null` / `phoneHref: null`, and the Contact page and footer show
`phonePlaceholder` ("Business line coming soon") in place of a number.

When a real business line is set up, fill in `studio.phone` and
`studio.phoneHref` and restore the click-to-call buttons. **Do not add
phone numbers to individual artists** — the `artists` array has no phone
fields on purpose, and all artist contact routes through Instagram.

**The portfolio galleries are thinner than intended.** Every artist has a
real portrait, but the gallery counts are uneven and below the 6-per-artist
target:

| Artist | Portrait | Gallery images |
| --- | --- | --- |
| Bryan Dilone | yes | 3 |
| Nelson Cruz | yes | 2 |
| Sharyn Fajardo | yes | 2 |

These are the genuinely usable tattoo photos retrieved from the studio's
Drive folder — nothing is padded with studio logo graphics or repeated
shots. More photos exist in that folder that were not pulled. To add them,
drop files into `src/assets/<slug>/` named `work-N.jpg` and run
`python3 scripts/optimize-images.py`; the galleries pick them up
automatically with no code change (see "Artist photography" below).

Everything else — studio address, hours, all three artists' names/bios/
Instagram handles, services and pricing — reflects the corrected data
provided for this rebuild (the address is consistently
1111 Union Boulevard, Allentown, PA 18109 throughout; the old site's 18101
typo is gone).

## Typography

Fonts are **self-hosted**, not loaded from the Google Fonts CDN — see the
`@font-face` rules at the top of `src/index.css` and the woff2 files in
`src/assets/fonts/`. That removes a third-party runtime dependency and a
render-blocking round trip to another origin, and keeps the site's typography
intact anywhere that CDN is unreachable.

Latin subset only, 108KB total for all three families. Inter ships as a
variable font, so one file covers every weight. To add a family, download its
latin woff2, drop it in `src/assets/fonts/`, and add a matching `@font-face`
rule — do not add a `<link>` back to the CDN.

## Artist photography

Photos resolve from `src/assets/<slug>/` at build time via
`import.meta.glob` — there is no list to maintain. `portrait.jpg` becomes the
artist's photo everywhere they appear; `work-1.jpg`, `work-2.jpg`, … become
their portfolio gallery in numeric order. An artist with no files falls back
to a placeholder graphic, so each artist's page degrades independently.

Source photos come off phone cameras at 4000–6000px and 4–8MB. Always run
`scripts/optimize-images.py` after adding new ones: it caps the long edge,
bakes in EXIF rotation (otherwise browsers render some photos sideways),
strips metadata, and re-encodes progressive JPEG. In practice that has been a
~10x reduction — the current set went from 14.5MB to 1.4MB.

The contact form has no backend: submitting it opens the visitor's email
client with a pre-filled message to `ink.novation22@gmail.com`. That's a
zero-infrastructure stopgap — swap in a real form service (Formspree,
EmailJS, a serverless function, etc.) before launch if a mailto link isn't
reliable enough for lead intake.

Each artist's portrait and portfolio gallery use placeholder graphics until
real studio photography is added — see `src/data/content.js` and
`src/components/PortfolioGallery.jsx`.

## Getting started

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build, output in dist/
npm run preview   # preview the production build locally
```

## Stack

- **React 19** + **Vite** — app shell and dev tooling
- **React Router 7** — 7 routes: `/`, `/services`, `/about`, `/contact`,
  and `/artists/:slug` (bryan, junior, sharyn) via one shared template
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — styling, using a custom
  `ink-*` color palette (electric teal accent) and `Bebas Neue` / `Inter`
  fonts defined in `src/index.css`
- **Framer Motion** — page-load sequencing on every hero, `whileInView`
  scroll reveals, hover/tap micro-interactions, animated stat count-up, the
  testimonial carousel, and the portfolio lightbox

## Structure

```
src/
  components/   Navbar, Footer, PageHero, ArtistCard, PortfolioGallery
                (with lightbox), ContactForm, Testimonials, AnimatedCounter,
                MapEmbed, ScrollToTop
  pages/        Home, Services, About, Contact, Artist (dynamic per-slug)
  data/         Studio info, the three artists, services, testimonials
  index.css     Tailwind import + theme tokens
```

## Deploying

This is a static Vite build — `npm run build` produces a `dist/` folder that
can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub
Pages, S3, etc.). Because it uses client-side routing, configure the host to
rewrite all paths to `index.html` (Vercel/Netlify do this automatically for
Vite SPAs).
