# Botanica Chango

The website for Botanica Chango (Bosslady Evil Eye) — a religious and
spiritual supply store at 441 N 7th St, Allentown, PA. Built with Next.js 15,
React 19, Tailwind CSS 4, and Framer Motion.

Scaffolded from this repo's `ai-saas` (Kiln) project — same motion/scroll
utilities and UI primitives, own brand tokens and content. Follows the repo's
house style (see `/CLAUDE.md`) for structure and motion; palette and
typography follow Botanica Chango's own established brand (deep green +
violet, Playfair Display + Mulish) per the house style's client-brand
override rule.

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

## Online shop (optional)

`/products` can sell a handful of repeatable items (candles, oils, prayer
cards, holy water) via [Snipcart](https://snipcart.com) — one-of-a-kind
pieces like raw crystals or blessed collares are deliberately left out of
online sale.

1. Sign up free at snipcart.com, grab the **public** API key (Test mode is
   fine to start), connect a Stripe account in Snipcart's dashboard.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SNIPCART_API_KEY`.
3. Edit `lib/products.ts` to swap in real items/prices — that's the one
   file that defines what's purchasable. Snipcart's own dashboard then
   handles orders, stock counts, shipping rules, taxes, and discounts.
4. Redeploy. Without the env var set, the shop UI stays hidden — nothing
   breaks, it just doesn't render.
