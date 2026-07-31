# Template New — dark editorial tattoo studio site

The second tattoo-studio template, completely separate from `tattoo-template/`.
Same fictional studio (Blackthorn), same booking-first structure, **entirely
different visual system** — built from an extracted ORYZO AI design-token set
(`tokens.json` / `DESIGN.md` supplied by the client).

The system it derives from is [ORYZO](https://lusion.co/projects/oryzo_ai/) by
Lusion (lead designer Edan Kwan), with tokens published at
[refero.design](https://styles.refero.design/style/1f204e95-454a-437e-845b-c1b169d35607).
The house rules distilled from it live in `../CLAUDE.md`.

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

Restraint is the language, so motion is scarce — but it has mass. The
reference site renders its hero object live in Three.js with real weight and
inertia, and moves a camera through true Z-axis depth rather than sliding 2D
layers. There's no WebGL here, but the *feel* carries:

- **One hero object**, the way the reference is built. It is a real stack of 22
  discs in a `preserve-3d` container, so tilting it exposes an actual cylinder
  wall rather than a painted-on ellipse, and it is lit by a luminance gradient
  rather than a shadow. It follows the pointer on a **damped spring** — it
  overshoots slightly and settles, which is what reads as mass — with a slow
  idle drift so it stays alive on touch, where there is no pointer. Its rest
  pose is a three-quarter view, which is also what a reduced-motion or no-JS
  visitor gets.
- Each artifact sits on a real `perspective` and **recedes on the Z axis** as
  its screen leaves the middle of the viewport — depth, not offset-Y parallax.
  The position is lerped per frame rather than tied to the scrollbar, which is
  what gives it weight: it settles instead of snapping.
- Line art **inks itself on** as it enters the viewport
- Buttons fill with cream from the baseline; text flips to walnut — no lift,
  no shadow
- Sections rise 14px on entry, with a scroll safety sweep so nothing can
  strand invisible
- The nav's dashed underline **tracks the section you're actually in**. This is
  navigation state, not decoration, so it keeps working when motion is off.

Everything above except the nav indicator is disabled under
`prefers-reduced-motion`. Single theme by design — the warm-dark editorial
world is the identity; there is no light mode.

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
