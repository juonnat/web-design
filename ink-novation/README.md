# Ink Novation — Website

A seven-page marketing site for Ink Novation, a tattoo studio in Allentown,
PA, with three resident artists. Built with React, React Router, Tailwind
CSS v4, and Framer Motion.

## Before this goes live

**Sharyn's phone number is still a placeholder.** `src/data/content.js` →
`artists` → the `sharyn` entry has `phone: null` / `phoneHref: null` on
purpose — her real direct line still needs to be collected. Until then, her
About card and artist page show "Phone coming soon" instead of a click-to-call
button (deliberately not reusing Junior's number).

Everything else — studio address, hours, all three artists' bios/phones/
Instagram handles, services and pricing — reflects the corrected data
provided for this rebuild (the address is consistently
1111 Union Boulevard, Allentown, PA 18109 throughout; the old site's 18101
typo is gone).

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
