# Template New — dark editorial tattoo studio site

The second tattoo-studio template, completely separate from `tattoo-template/`.
Same fictional studio (Blackthorn), same booking-first structure, **entirely
different visual system** — built from an extracted ORYZO AI design-token set
(`tokens.json` / `DESIGN.md` supplied by the client).

## The system

Darkroom product editorial: work presented like museum artifacts in a warm
void. Everything derives from the supplied tokens:

- **Canvas** `#100904` walnut shadow — warm near-black, never pure black
- **Text** `#ffedd7` warm cream — never pure white
- **Elevation** is a single luminance step to `#382416` bark brown — the
  recommended pricing tier and the filled CTA are the only solids. **No
  shadows anywhere**; the system rejects blur-based depth entirely.
- **Structure** is 1px *dashed* hairlines in `#40372e` cork — section
  dividers, card outlines, list separators. Solid dividers don't exist here.
- **Ember** `#dc5000` appears only as editorial tags and kickers — plate
  numbers, "Most booked", the demo notice. **Never on buttons or CTAs**; the
  restraint is the signal.
- **One typeface, two voices.** Inter substitutes for Halyard Display:
  uppercase weight-500 is the default voice for every heading, label, nav item
  and button; mixed-case weight-400 (`.voice`) is the sole conversational
  register, used for body copy, quotes, and FAQ answers. Display sizes sit at
  line-height 0.9, so stacked headlines read as sculptural blocks.
- **Radii vocabulary**: 12px cards, 36px filled pill, 22.5px ghost outline,
  0 inputs. Nothing else.

Distinctive furniture: a vertical serial-number label running down the right
edge ("BLACKTHORN TATTOO CO. — EST. 2012"), the hero as a three-column
void-mode reveal (heading | floating artifact | body voice), and an Arial 8px
legal line in the footer — deliberately *not* the display face, signalling
compliance rather than design.

## Motion

Restraint is the language, so motion is scarce and flat:

- Line art **inks itself on** as it enters the viewport, and replays on hover
- The hero artifact **breathes** — a slow 9s float, the page's one ambient move
- Buttons fill with cream from the baseline; text flips to walnut — no lift,
  no shadow
- Sections rise 16px on entry, with a scroll safety sweep so nothing can
  strand invisible
- Sticky mobile booking dock arrives once the hero CTA scrolls off

All disabled under `prefers-reduced-motion`. Single theme by design — the
warm-dark editorial world is the identity; there is no light mode.

## Files

| File | What it is |
| --- | --- |
| `src/page.html` | The source. **Edit this one.** |
| `build.py` | Inlines the font, line art, and any photos; writes the outputs |
| `index.html` | Generated. Standalone — open, host, or email it |
| `artifact.html` | Generated. Body-only build for wrapped hosts |
| `photos/` | Drop `work-1`…`work-6` here, then rebuild |

## Photos

Same pipeline as the other template: drop `work-1`…`work-6` (any of jpg /
jpeg / png / webp, straight off the camera) into `photos/` and run
`python3 build.py`. EXIF rotation baked in, long edge capped at 1100px,
re-encoded WebP, inlined as data URIs. Empty slots keep their line-art motif,
so the gallery never looks half-finished.

## Deploying to Vercel

Root Directory `template-new`, Framework Preset **Other**, no build command.
`vercel.json` and `.vercelignore` are already here — only `index.html` and
`vercel.json` ship.
