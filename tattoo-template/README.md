# Tattoo studio template

A complete, single-file tattoo studio website built to be shown to prospects
and then customised into a real client site. Open `index.html` in any browser —
no build step, no dependencies, no network calls. Fonts are embedded, the line
art is inline SVG, and the whole page is about 160KB.

"Blackthorn Tattoo Co." is a **fictional studio**. The page says so in a banner
at the top, which is deliberate: showing a prospect obviously-sample content is
honest, and it makes the point that the copy is a starting frame rather than
something they need to argue with.

## Files

| File | What it is |
| --- | --- |
| `src/page.html` | The source. **Edit this one.** |
| `build.py` | Inlines the fonts and flash line art, writes the two outputs |
| `index.html` | Generated. Standalone document — open, host, or email it |
| `artifact.html` | Generated. Same page as body content, for hosts that supply their own `<head>` |
| `build/*.woff2` | The three faces that get embedded |

After editing `src/page.html`, run `python3 build.py`.

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

Five, all cheap — transforms and opacity only, nothing that triggers layout:

1. **Line art inks itself on** as each plate scrolls into view, and replays on
   hover. `pathLength="1"` normalises every path so one CSS rule drives all of
   them. This is the signature moment — it echoes what the business actually does.
2. **Plates lift 4px on hover** with a warmed background, so tiles read as
   clickable without needing a button.
3. **Buttons fill from the baseline up** rather than swapping colour, like ink
   wicking into paper.
4. **Sections rise 18px as they enter.** Small distance, short duration — it
   should register as alive, never as waiting.
5. **The nav tightens and gains a hairline** once you leave the hero.

All five are disabled under `prefers-reduced-motion`. There's also a scroll
safety sweep: if a fast flick outruns the observer, anything already past the
fold is force-revealed, so content can never strand at opacity 0.

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
trade in 2016, and the work got twice as good" — not a values statement. Then
hard numbers. Then the origin story, which is where warmth is allowed. Then a
signature rather than a button, because a hard CTA here breaks the tone you just
built.

No "we believe in quality." Ever.

### FAQ

Six objections in the customer's own words — "How much is this going to cost me,
really?" not "What is your pricing structure?" Each answer is under three
sentences and closes on trust or value rather than trailing off.

They're ordered by how early the doubt shows up: money, pain, regret, uncertainty,
commitment, safety.

### Mobile

1. **Tap targets are 48–52px minimum**, including the nav links in the panel.
   Anything smaller reads as unfinished, whatever the design looks like.
2. **The nav collapses into a real menu, not into nothing.** A sticky CTA with no
   route to pricing or FAQ is the most common way a "mobile-friendly" site isn't.
3. **Type scales with `clamp()`, never fixed px.** The display drops from 5.4rem
   to 2.9rem across the range so headlines never fragment into four-line blocks.
4. **Spacing scales too** — `--gut` and section padding are both `clamp()`. Desktop
   padding held on a phone is what makes a site feel cramped rather than airy.
5. **Grids collapse at content-driven breakpoints, not device widths.** The flash
   grid goes 3 → 2 → 1 where the tiles actually stop working, which is also why
   its column count is pinned instead of left to `auto-fit`.

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
