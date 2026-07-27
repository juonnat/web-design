# Kelltic Ink — Website

A single-page marketing site for Kelltic Ink, a tattoo and piercing studio in
Mohnton, PA. Built with React, Tailwind CSS v4, and Framer Motion for
scroll-triggered and hover animations.

## Before this goes live

Two pieces of content are still placeholders and need real values:

1. **Instagram link** — `src/data/content.js` → `studio.instagram` (currently `#`).
2. **Business email** — `src/data/content.js` → `studio.email` (currently a placeholder address used in the footer's mail icon).

The portfolio gallery (9 tiles) and the About section's portrait are also
placeholder graphics — swap in real studio photography when available.

## Getting started

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build, output in dist/
npm run preview   # preview the production build locally
```

## Stack

- **React 19** + **Vite** — app shell and dev tooling
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — styling, using a custom
  `ink-*` color palette and `Bebas Neue` / `Inter` fonts defined in
  `src/index.css`
- **Framer Motion** — page-load sequencing on the hero, `whileInView`
  scroll reveals, hover/tap micro-interactions, and the testimonial carousel

## Structure

```
src/
  components/   One file per section (Navbar, Hero, About, Services,
                Portfolio, Testimonials, Contact) plus a shared Reveal
                scroll-animation wrapper
  data/         Business content (studio info, services, testimonials)
  index.css     Tailwind import + theme tokens
```

## Deploying

This is a static Vite build — `npm run build` produces a `dist/` folder that
can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub
Pages, S3, etc.) with no server-side requirements.
