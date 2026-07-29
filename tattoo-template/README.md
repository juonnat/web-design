# Tattoo studio template

A complete, single-file tattoo studio website built to be shown to prospects
and then customised into a real client site. Open `index.html` in any browser —
no build step, no dependencies, no network calls. Fonts are embedded, the line
art is inline SVG, and the whole page is about 160KB.

"Blackthorn Tattoo Co." is a **fictional studio**. The page says so in a banner
at the top, which is deliberate: showing a prospect obviously-sample content is
honest, and it makes the point that the copy is a starting frame rather than
something they need to argue with.

## There is no photography on this page, on purpose

Every visual is drawn by the browser at runtime:

- **Particle field** — a canvas grid of points pushed by two crossed sine waves,
  with the pointer shoving them aside. Behind the hero and the closing panel.
  Density scales with viewport area, it only animates while on screen, and it
  pauses when the tab is hidden.
- **Aurora bloom** — three offset radial gradients drifting against each other
  under a heavy blur. Two would read as a spotlight; three reads as depth.
- **Film grain** — one tiled SVG turbulence texture at 16% over the whole page.
  This is what stops large flat dark areas looking like empty CSS.
- **Flash line art** — inline SVG that draws itself on as it scrolls into view.
- **Ambient rings** — concentric circles drifting behind the closing panel.

Total cost: a few KB of code instead of a few MB of images, nothing to load, no
licensing, and it can't look like a stock photo because it isn't one. It also
means the template is genuinely empty — there is no borrowed studio's work
standing in for the client's.

**When real photos arrive**, they drop into the same frames: add `--photo` to a
`.flash__art` with an `<img>` inside and the crop is already handled (see the
mobile rules below). The generative layers stay as the atmosphere behind them.

## Files

| File | What it is |
| --- | --- |
| `src/page.html` | The source. **Edit this one.** |
| `build.py` | Inlines the fonts and flash line art, writes the two outputs |
| `index.html` | Generated. Standalone document — open, host, or email it |
| `artifact.html` | Generated. Same page as body content, for hosts that supply their own `<head>` |
| `build/*.woff2` | The three faces that get embedded |

After editing `src/page.html`, run `python3 build.py`.

## Deploying to Vercel

`index.html` is the whole site — fonts are base64 inside it, the visuals are
drawn in code, and it makes **zero external requests**. Nothing to build.

**From the dashboard:** New Project → import this repo → set **Root Directory**
to `tattoo-template` → Framework Preset **Other** → leave Build Command and
Output Directory empty → Deploy.

The Root Directory setting is the one that matters. This repo holds three
projects, so pointing Vercel at the repo root would serve the wrong thing.

**From the CLI**, in this folder:

```bash
npx vercel          # preview deploy
npx vercel --prod   # production
```

`vercel.json` sets `cleanUrls`, a no-cache header on the HTML so a redeploy is
visible immediately rather than sitting behind a stale cache, plus
`nosniff` and a referrer policy. `.vercelignore` keeps the source, fonts and
build script out of the deploy — only `index.html` and `vercel.json` ship.

**Per-client deploys:** copy the folder, edit `src/page.html`, run
`python3 build.py`, deploy. Each client is its own Vercel project, so a change
for one can never affect another.

Verified served over HTTP, not just opened from disk: fonts resolve, the canvas
renders, no failed requests, no console errors, no request leaves the origin.

## Customising it for a real studio

Roughly in order of impact:

1. **Names and numbers** — studio name in the two `.wordmark` blocks and the
   `<title>`, artists, prices, hours, address. Search the file for `Blackthorn`.
2. **Delete the demo banner** — the `.demo-flag` div, once it's a real client.
3. **Swap line art for photography** — the flash grid is built as line art
   because a template can't ship a real studio's client work. On a live build,
   replace the `.flash__art` SVG with an `<img>`; the tile sizing already
   handles it via `aspect-ratio`.
4. **Point the CTAs somewhere** — every button is `href="#book"`. Wire them to
   a booking system, or drop in a form. The demo suppresses those clicks.
5. **Recolour** — every colour is a custom property at the top of the stylesheet,
   defined three times: `:root`, `@media (prefers-color-scheme: dark)`, and the
   two `:root[data-theme]` blocks. Change all of them or the themes drift apart.

## Coverage

Every brief, and where it lives in the page.

| Brief | Where it is |
| --- | --- |
| Above-the-fold formula | Hero — headline, subheadline, paired CTAs, risk-reversal line, 55/45 split |
| 5 micro-interactions | Hover, scroll-reveal and button-transition effects throughout |
| Trust & credibility module | Stats strip under the hero; testimonials + press before the final CTA |
| Pricing, 3 tiers | Pricing section, middle tier highlighted and lifted |
| About that builds authority | Studio section — hook, credibility, story, soft CTA |
| 6-question FAQ | FAQ section, each answer two sentences |
| Mobile-first rules | Applied throughout; the five rules are listed below |
| Pre-launch polish checklist | Listed below |

## The formula behind each section

This is the part worth having in your head when you walk a prospect through it.

### Above the fold

- **Headline, 6–10 words, promising an outcome — not describing a service.**
  "Ink you'll still love in thirty years" sells the thing they're actually
  anxious about. "Custom tattoos in Allentown" would describe the same business
  and sell nothing.
- **Subheadline does a different job than the headline.** It qualifies and
  de-risks: who it's for, and what makes it safe. Here it's the artist count,
  no walk-in churn, and the deposit coming off the total.
- **Two CTAs, unequal.** One solid primary for people who are ready, one ghost
  secondary for people who want to look first. Sending browsers to a portfolio
  instead of losing them is the whole point of the second button.
- **A risk-reversal line directly under the buttons.** "Free, 20 minutes, no
  deposit until you approve the drawing" answers the objection at the exact
  moment they hesitate over the button.
- **Balance is roughly 55/45 text to image.** Text leads on the left because
  the headline is doing the persuading; the visual anchors the right and proves
  the craft.

### Micro-interactions

Five, covering all three categories — **hover effects, scroll reveals, and
button transitions.** Every one is transform/opacity only, so none of them
trigger layout or cost anything measurable at load.

| # | Type | Where |
| --- | --- | --- |
| 1 | Scroll reveal + hover | Flash plates, hero plate, artist marks |
| 2 | Hover | Flash tiles, artist cards, pricing tiers, quote cards |
| 3 | Button transition | Every button on the page |
| 4 | Scroll reveal | Every section |
| 5 | Scroll-driven | The nav bar |

**1 · Line art inks itself on** *(scroll reveal + hover replay)*
Placed on every flash plate, the hero sheet, and the artist marks. As a plate
enters the viewport its outlines draw on from nothing over about a second, like
a needle laying the line. Hovering a tile replays it. Implementation: every path
carries `pathLength="1"`, which normalises its length to 1 regardless of actual
shape, so a single rule — dash array 1, dash offset 1 → 0 — animates all of them.
This is the signature moment; it echoes what the business physically does.

**2 · Plates lift on hover** *(hover)*
On flash tiles, artist cards, pricing tiers, and testimonials. The card rises 4px,
its paper warms one step lighter, and a soft shadow appears — so a tile reads as
clickable without needing a button drawn on it. A 5th tier of this exists for
photos: swap in an `<img>` and it drifts to 105% behind a fixed frame.

**3 · Buttons fill from the baseline up** *(button transition)*
Every button. Instead of swapping colour on hover, a dark fill sweeps upward
from the bottom edge over ~0.34s while the button lifts 2px — ink wicking into
paper rather than a light switch. Implementation: a `::after` pseudo-element at
`translateY(101%)` moving to `0`, sitting behind the label via `z-index: -1`.

**4 · Sections rise as they enter** *(scroll reveal)*
Everything on the page. Content starts 18px low and transparent, then settles as
it scrolls in, staggered ~70ms between neighbouring items. Small distance, short
duration — it should register as alive, never as waiting.

**5 · The nav tightens** *(scroll-driven)*
The bar's padding halves and a hairline rule appears once you scroll past 24px,
so the header feels like it's tracking you rather than sitting there.

All five are fully disabled under `prefers-reduced-motion`. There's also a scroll
safety sweep: if a fast flick outruns the observer, anything already past the
fold is force-revealed, so content can never strand at opacity 0.

### Four more, taken from the FlowState reference

`flowstate-coral.vercel.app` is an info-product sales page — black ground, one hot
orange accent, cinematic imagery, heavy scroll motion. Four of its techniques
transfer cleanly to a studio site:

**Hero defocus on scroll** *(scroll-driven)*
The reference's signature move: the hero doesn't just scroll away, it softens and
sinks as it goes. A single `--exit` custom property ramps 0 → 1 across the hero's
height and drives blur, opacity, and a slight downward drift together. Blur is
capped at 5px and scoped to two blocks — a large blurred surface is the fastest
way to make a mid-range phone drop frames.

**Sticky booking bar on mobile** *(the highest-value item here)*
Once the hero's CTA has scrolled off, a booking button docks to the bottom of the
screen and stays. For a business whose entire conversion is "get them to book",
never being more than a thumb away from the CTA is worth more than any animation
on this page. It appears at 72% of hero height so it never duplicates a button
already on screen, and the body reserves its height so it can't cover the footer.

**Status ticker** *(ambient)*
A running band under the header. The reference uses it for countdown pressure;
this one carries live studio status — what's bookable, when walk-ins run. Same
restless energy, and it stays useful after the novelty wears off.

**Ambient rings and a stepping arrow** *(ambient + hover)*
Concentric rings drift behind the closing panel at 14% opacity, and the primary
CTA's arrow steps forward 4px on hover. The rings are deliberately near-invisible:
at any strength where you consciously notice them, they're competing with the
headline in front of them.

**What was deliberately not taken:** the countdown timer, "847 designers already
inside", and the scarcity ticker. Those work for a $47 impulse buy. On a tattoo
studio they read as a scam — someone choosing who will permanently mark their body
is doing the opposite of an impulse purchase, and manufactured urgency fights that
directly. The hype tone was left behind for the same reason.

### Trust module

Stats sit high (directly under the hero) as a quick credibility hit; testimonials
and press sit low, immediately **before** the final CTA. That ordering is the
point — you answer "can they actually do this?" while the visitor is still
deciding, then put the proof right where they commit.

Two details that make testimonials read as real: they're attributed with the
specific work done ("Half sleeve · blackwork"), and the section headline says
when they were collected — "once it's healed", at the six-week check-in. Specific
beats glowing.

### Pricing

Three tiers, middle one highlighted and lifted, because the middle is where you
want people. Each tier leads with **who it's for** before what it costs, so the
number lands in context.

Value framing does the heavy lifting: the deposit comes off the total, over-runs
are on the studio, touch-ups are included. The footer line kills the three fees
people brace for. Decision friction on a pricing table is almost always unspoken
fear of a surprise, not the number itself.

### About

Four beats, in order: **hook**, **credibility**, **story**, **soft CTA.**

The hook is a specific decision with a consequence — "We turned down the walk-in
trade in 2016, and the work got twice as good" — not a values statement.

Then the credibility paragraph: hard numbers only, no adjectives. Thirteen years,
2,400 pieces, three artists sent out to their own shops.

Then the personal story, which is the one place warmth is allowed — the room above
the bike shop, the hand-painted sign that cost more than the rent.

Then the **soft CTA**: a sentence with a quiet inline link, sitting under a
signature rather than a button. The ask has to sound like the person who wrote the
paragraph above it — a loud "BOOK NOW" here spends the trust the story just built.

No "we believe in quality." Ever.

### FAQ

Six objections in the customer's own words — "How much is this going to cost me,
really?" not "What is your pricing structure?" Each answer is under three
sentences and closes on trust or value rather than trailing off.

They're ordered by how early the doubt shows up: money, pain, regret, uncertainty,
commitment, safety.

### Mobile

1. **Tap targets are 48–52px minimum** — buttons, nav links, and FAQ rows alike.
   Anything smaller gets mis-tapped, and a mis-tap is the fastest way a site
   feels cheap regardless of how it looks.
2. **Type scales with `clamp()`, never fixed px.** The display drops from 5.4rem
   to 2.9rem across the range. Fixed desktop type on a phone fragments a headline
   into four ragged lines, which reads as broken rather than bold.
3. **Spacing scales with it** — `--gut` and every section's padding are `clamp()`
   too. Desktop padding held on a 390px screen is exactly what makes a page feel
   cramped, and generous breathing room is most of what "expensive" means here.
4. **Image crops are ratio-locked and biased upward.** Tiles set `aspect-ratio`
   so a mixed bag of phone photos still forms an even grid, and `object-position`
   sits at 35% rather than centre. A centred cover-crop on a portrait-orientation
   photo cuts the top off — on a tattoo shot that's the piece, on a portrait it's
   someone's face. This is live CSS in the template, not just advice.
5. **The nav collapses into a real menu, and grids break where content stops
   working.** A sticky CTA with no route to pricing or FAQ is the most common way
   a "mobile-friendly" site isn't. The flash grid goes 3 → 2 → 1 at widths where
   the tiles genuinely fail, which is why its column count is pinned rather than
   left to `auto-fit`.

### Pre-launch checklist

1. **Spacing** — every gap comes from a scale, no one-off margins. Sibling groups
   laid out with `gap`, not per-element margins that collapse or double.
2. **Colour** — no hex values outside the token block. Any hardcoded colour is a
   theme bug waiting to happen, especially `rgba(255,255,255,…)` on a panel that
   inverts.
3. **Font weights** — one display weight, one body weight, one label weight. Mixed
   weights inside a single hierarchy level is the fastest way to look amateur.
4. **Buttons** — every button is the same component with variants. Two buttons
   with slightly different padding on different pages is the tell.
5. **Images** — consistent aspect ratio and crop logic, and every one optimised.

**The single most common thing that makes a site look cheap: inconsistent spacing.**
Not colour, not fonts. Sections with 40px above and 64px below, cards with
different internal padding, gaps that drift as the page goes on. Nobody
consciously notices it, and everybody feels it.

A close second, specific to CSS: **specificity collisions that silently undo your
own rules.** This page hit exactly that — `.close .btn` was quietly overriding
`.btn--ghost`, turning an outlined button solid. It looked "fine" and was wrong.
