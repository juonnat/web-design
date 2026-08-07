# Botanica Chango Spiritual Wonders

The website for Botanica Chango Spiritual Wonders (Bosslady Evil Eye) — a religious and
spiritual supply store at 441 N 7th St, Allentown, PA. Built with Next.js 15,
React 19, Tailwind CSS 4, and Framer Motion.

Scaffolded from this repo's `ai-saas` (Kiln) project — same motion/scroll
utilities and UI primitives, own brand tokens and content. Follows the repo's
house style (see `/CLAUDE.md`) for structure and motion; palette and
typography follow Botanica Chango Spiritual Wonders' own established brand (light blue /
dark blue / white with a violet accent, Playfair Display + Mulish) per the
house style's client-brand override rule.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Pages

`/` Home · `/about` · `/services` · `/products` · `/contact`

## Online shop

`/products` sells a handful of repeatable items (candles, oils, prayer
cards, holy water) — one-of-a-kind pieces like raw crystals or blessed
collares are deliberately left out of online sale. Edit `lib/products.ts`
to swap in real items/prices — that's the one file that defines what's
purchasable.

The cart itself (`components/cart/`) is a local, no-backend
implementation: state lives in React context + localStorage, "Add to
cart" updates the count icon in the nav, and `/checkout` shows an order
summary and pickup-details form. There is no payment processor wired up
yet — placing an order composes a `mailto:` with the order details (same
stopgap `ContactForm` uses), and the customer pays in person at pickup.
Swap the `handleSubmit` in `app/checkout/page.tsx` for a real Stripe or
Clover checkout when one is chosen; the cart state and UI don't need to
change.
