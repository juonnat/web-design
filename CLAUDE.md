# House style for websites in this repo

This is the default visual system for any site built here. Follow it unless a
client brings their own brand, in which case their brand wins and this document
governs only structure and motion.

## Provenance

Derived from **ORYZO** (oryzo.ai) by [Lusion](https://lusion.co/projects/oryzo_ai/),
lead designer Edan Kwan — Awwwards Site of the Month, April 2026 — and from the
token extraction published at
[refero.design](https://styles.refero.design/style/1f204e95-454a-437e-845b-c1b169d35607).

Reference for understanding, not for copying. Take the *system*: the palette
relationships, the two-voice typography, the full-viewport pacing, the motion
physics. Do not lift their copy, their product, or their coaster.

## The thesis

Treat the subject like a museum artifact. Full-bleed warm-dark canvas, cream
typography floating in generous negative space, and zero UI chrome competing
with the form. Restraint is the language — every element that survives on the
page has to have earned its place.

## Non-negotiables

These are the rules that make a page read as *this* system rather than a dark
theme. Break any one and it stops working.

1. **Full-bleed. No max-width containers.** Page inset is a single `--pad`
   value that scales with viewport. Content sits against the edges.
2. **One section = one full viewport** (`min-height: 100svh`). Never compress a
   statement into a band. If it doesn't deserve a screen, cut it.
3. **Exactly two type voices.** Uppercase / weight 500 is the default voice for
   the *entire interface* — nav, labels, buttons, prices, everything. Mixed
   case / weight 400 / large (29px desktop) is the sole conversational voice,
   used only for body copy. The case-and-weight drop is the signal that you're
   reading description rather than a label. Never centre the body voice.
4. **The accent is editorial credit only.** Ember orange goes on credit lines,
   plate numbers, studio attribution. It **never** touches a button, a CTA, or
   an interactive element. Its rarity is the entire point.
5. **No shadows. Anywhere.** Depth is a luminance step or a genuine Z-axis
   translation. No `box-shadow`, no blur, no lift.
6. **Dashed hairlines, not solid rules.** `1px dashed var(--color-cork-border)`
   is the divider, the card edge, and the active-nav indicator.
7. **One filled surface per screen.** A single pill button carries the primary
   action. Everything else is outlined or bare.
8. **Motion has mass.** See below.

## Tokens

```
--color-warm-cream:    #ffedd7   /* all text on dark; never #fff */
--color-walnut-shadow: #100904   /* the canvas; never #000 */
--color-bark-brown:    #382416   /* filled controls, translucent cards */
--color-cork-border:   #40372e   /* dashed hairlines only */
--color-driftwood:     #6c5f51   /* legal, serial numbers, de-emphasis */
--color-ember-accent:  #dc5000   /* editorial credit ONLY — never a button */
```

Type scale (desktop anchors; clamp them down rather than letting a 51px
headline fragment into five lines on a phone):

```
display 51px / 0.9      heading 41px / 0.9      body 29px / 1.26 (weight 400)
heading-sm 24px         subheading 18px         label 12px       legal 8px
```

Spacing is a fixed set, not a linear scale: `8 10 12 14 18 24 31 41 45 68 204`.
Radii: cards `12px`, pill buttons `36px`, outlined buttons `22.5px`.

**Typeface:** the system specifies *Halyard Display* (Darden Studio,
commercial — Adobe Fonts). We don't have a licence, so **Inter** is the shipped
substitute and it's a defensible one: both are grotesque sans with a large
x-height that hold up in uppercase at 12px. Document the substitution wherever
the font stack is defined; don't present Inter as the system's own face.

**Two known bugs in the published token extraction** — correct these, don't
copy them through:
- `surface.cork-border` ships as `#40372` (five hex digits, unparseable). The
  real value is `#40372e`.
- `typography.base` carries `lineHeight: 4` at 15px — an extraction artifact
  that would set 60px leading on body copy.

## Layout

Alternate two modes down the page. Uniform void-mode reads as monotony:

- **Context mode** — the subject photographed in its setting, with the tools
  and materials around it. Full-bleed, sharp-edged, no rounded masks.
- **Void mode** — the subject isolated on warm dark, floating in negative
  space with nothing else on screen.

The signature composition is three columns: heading left, object centred, body
right, with symmetric gutters. Collapse to one column below 900px.

Persistent chrome is transparent and minimal — a wordmark, three or four nav
items at 12px uppercase, and a dashed underline marking the section you are
actually in. That indicator must track scroll; never hardcode it.

## Motion

The reference renders one hero object live in Three.js with real weight and
inertia. You usually won't have WebGL, but you must carry the *feel*:

- **Easing mimics physics.** Things have mass — they settle, they don't snap.
  Long durations, heavy cubic-beziers.
- **Scroll moves through Z-axis depth**, not sliding 2D layers. Use real
  `perspective` and `translateZ` so elements approach the viewer, rather than
  faking parallax with offset Y.
- **Motion is scarce.** A page with one memorable movement beats a page where
  everything moves.
- **Always honour `prefers-reduced-motion: reduce`** — drop to a static, fully
  legible page with no transitions.

## Before shipping

- Verify in a real browser at 360px, 900px and 1440px. Screenshots lie; most
  of the bugs in this repo's history were caught by driving an actual page.
- No horizontal scroll on mobile — decorative layers bleeding past a section
  edge is the usual cause.
- Nothing stranded at `opacity: 0` if a fast scroll outruns the observer.
- `prefers-reduced-motion` renders everything legible.
- Grep the stylesheet for `box-shadow` and for the ember accent on any
  interactive element. Both should return nothing.
