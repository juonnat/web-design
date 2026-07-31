#!/usr/bin/env python3
"""Assemble the tattoo-shop template into two self-contained files.

src/page.html carries the markup with placeholders; this fills in the base64
font faces and the flash line art, then writes:

  index.html     complete standalone document - open it, host it, send it
  artifact.html  the same page as body content only, for hosts that supply
                 their own <head> wrapper

Run after editing src/page.html:  python3 build.py
"""

import base64
import io
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "src" / "page.html"
FONT_DIR = HERE / "build"
PHOTO_DIR = HERE / "photos"

# Gallery tiles render ~460px wide at most; 1100 covers that at 2x on retina.
PHOTO_EDGE = 1100
PHOTO_QUALITY = 74
PHOTO_EXTS = (".jpg", ".jpeg", ".png", ".webp")

# One typeface, per the supplied design system. Inter is the documented
# substitute for Halyard Display Variable; the variable file covers both the
# weight-500 uppercase voice and the weight-400 mixed-case body voice.
FONTS = [
    ("Inter", "inter-var.woff2", "100 900", "normal"),
]


def font_faces() -> str:
    out = []
    for family, filename, weight, style in FONTS:
        data = base64.b64encode((FONT_DIR / filename).read_bytes()).decode()
        out.append(
            f"@font-face {{\n"
            f"  font-family: '{family}';\n"
            f"  font-style: {style};\n"
            f"  font-weight: {weight};\n"
            f"  font-display: swap;\n"
            f"  src: url(data:font/woff2;base64,{data}) format('woff2');\n"
            f"}}"
        )
    return "\n".join(out)


def find_photo(slot: int) -> Path | None:
    for ext in PHOTO_EXTS:
        p = PHOTO_DIR / f"work-{slot}{ext}"
        if p.exists():
            return p
    return None


def photo_tag(path: Path, alt: str) -> str:
    """Optimise a camera photo and return it as an inlined <img>.

    Inlined rather than shipped alongside because the page has to survive being
    published somewhere that only takes a single self-contained file.
    """
    from PIL import Image, ImageOps

    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        if max(im.size) > PHOTO_EDGE:
            im.thumbnail((PHOTO_EDGE, PHOTO_EDGE), Image.LANCZOS)
        w, h = im.size
        buf = io.BytesIO()
        im.save(buf, "WEBP", quality=PHOTO_QUALITY, method=6)

    data = base64.b64encode(buf.getvalue()).decode()
    return (
        f'<div class="artifact artifact--photo">'
        f'<img src="data:image/webp;base64,{data}" alt="{alt}" '
        f'width="{w}" height="{h}" loading="lazy" decoding="async" />'
        f"</div>"
    )


def svg(label: str, centre: tuple = (), half: tuple = (), extra: str = "") -> str:
    """Assemble one motif on the shared 100x100 field.

    `centre` strokes are drawn as given. `half` strokes are drawn once and then
    mirrored about x=50, so anything symmetrical is exactly symmetrical —
    hand-placing both sides is what made the earlier set read as a sketch
    rather than as flash. pathLength="1" normalises every stroke so a single
    CSS rule draws any of them on.
    """

    def paths(ds: tuple) -> str:
        return "".join(f'<path pathLength="1" d="{d}"/>' for d in ds)

    body = paths(centre)
    if half:
        side = paths(half)
        body += side + f'<g transform="translate(100,0) scale(-1,1)">{side}</g>'
    return (
        f'<svg class="motif inkable" viewBox="0 0 100 100" role="img" '
        f'aria-label="{label}">{body}{extra}</svg>'
    )


# Ornamental line art, drawn on a shared 100x100 field so every motif sits on
# the same optical weight. pathLength="1" normalises each stroke so a single
# CSS rule can draw any of them on.
MOTIFS = {
    # Coiled serpent. The body is two roughly parallel curves rather than one
    # line, which is what stops a snake reading as a squiggle — it gives the
    # form thickness that tapers toward the tail.
    "__MOTIF_SERPENT__": svg(
        "Coiled serpent",
        centre=(
            "M27 87c25 4 38-11 33-27-4-14-24-17-26-30-2-11 6-19 18-19",
            "M35 80c18 2 27-9 23-21-4-13-23-17-24-31-1-9 5-14 14-15",
            "M52 9c11-1 19 7 18 17-1 9-9 15-19 13",
            "M71 30l10 2-7 5",
            "M40 62c5 4 12 4 17 0",
            "M33 74c5 4 12 4 17 0",
        ),
        extra='<circle class="fill-dot" cx="62" cy="21" r="2.2"/>',
    ),
    # Dagger. Mirrored, because a blade that is even slightly lopsided looks
    # like a mistake rather than a mark.
    "__MOTIF_DAGGER__": svg(
        "Dagger",
        centre=(
            "M50 6v54",
            "M26 60h48",
            "M30 68h40",
            "M44 68v17",
            "M56 68v17",
            "M44 74h12",
            "M44 80h12",
            "M50 85c4 0 7 3 7 6s-3 5-7 5-7-2-7-5 3-6 7-6z",
        ),
        half=("M50 6l9 38v16", "M26 60l4 8"),
    ),
    # Lantern moth. Four wings mirrored off one half, body segmented.
    "__MOTIF_MOTH__": svg(
        "Lantern moth",
        centre=(
            "M50 33v46",
            "M46 47h8",
            "M46 55h8",
            "M46 63h8",
        ),
        half=(
            "M52 39c9-17 29-22 35-10 5 11-11 23-31 29",
            "M53 64c12 1 23 9 19 17-4 8-15 2-20-10",
            "M51 34c5-8 12-13 19-15",
        ),
        extra='<circle class="fill-dot" cx="50" cy="32" r="3"/>',
    ),
    # Thorn rose. Concentric petal turns spiralling into a filled core, with
    # mirrored leaves so the stem reads as balanced.
    "__MOTIF_ROSE__": svg(
        "Thorn rose",
        centre=(
            "M50 16c17 0 29 12 29 27S67 70 50 70 21 58 21 43 33 16 50 16z",
            "M50 25c12 0 20 8 20 18s-8 18-20 18-20-8-20-18",
            "M50 34c7 0 12 5 12 11s-5 11-12 11-11-5-11-11",
            "M44 45c2-4 9-4 11 0",
            "M50 70v26",
        ),
        half=("M50 78c9 1 16-3 20-11-10-3-18 2-20 11z",),
    ),
    # The watcher. Lid arcs mirror top to bottom, rays mirror left to right.
    "__MOTIF_EYE__": svg(
        "The watcher",
        centre=(
            "M12 50c11-18 24-27 38-27s27 9 38 27",
            "M12 50c11 18 24 27 38 27s27-9 38-27",
            "M50 36a14 14 0 1 1 0 28 14 14 0 0 1 0-28z",
            "M50 14V4",
            "M50 86v10",
        ),
        half=("M80 26l7-7", "M80 74l7 7", "M88 50h9"),
        extra='<circle class="fill-dot" cx="50" cy="50" r="5.5"/>',
    ),
    # Harbour swallow. Deliberately not mirrored — a bird in flight is the one
    # subject here that would look wrong symmetrical.
    "__MOTIF_SWALLOW__": svg(
        "Harbour swallow",
        centre=(
            "M24 44c10-8 23-7 32 3",
            "M56 47c7-16 23-25 36-23-10 10-14 21-16 33",
            "M56 47c-2 12 4 21 14 25-12 5-26-1-33-11",
            "M37 61L14 76l10-16-13 1 21-13",
            "M24 44c-4 6-3 13 2 17",
            "M63 52c4 5 6 11 6 17",
        ),
        extra='<circle class="fill-dot" cx="29" cy="43" r="2.2"/>',
    ),
}

# The hero object. The reference renders one object live in Three.js with real
# thickness and inertia; there is no WebGL here, so the depth is built the
# honest way — a stack of discs at increasing translateZ inside a preserve-3d
# container, so the edge is a real cylinder wall that shows when the object
# tilts rather than a painted-on ellipse. Colour runs walnut at the back to
# bark at the lit face, which is a luminance step, not a shadow.
PLATE_LAYERS = 22
PLATE_STEP = 2.2  # px between layers -> ~46px of real thickness


def _mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> str:
    return "rgb(%d,%d,%d)" % tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def plate() -> str:
    walnut, bark = (0x10, 0x09, 0x04), (0x38, 0x24, 0x16)
    layers = "".join(
        f'<i class="plate__l" style="--i:{i};background:'
        f'{_mix(walnut, bark, i / (PLATE_LAYERS - 1))}"></i>'
        for i in range(PLATE_LAYERS)
    )
    return (
        f'<div class="plate" id="plate">'
        f'<div class="plate__body" style="--n:{PLATE_LAYERS};--step:{PLATE_STEP}">'
        f"{layers}"
        f'<div class="plate__face">'
        f'<span class="plate__rim"></span>'
        f'<span class="plate__grain"></span>'
        f"__MOTIF_SERPENT__"
        f"</div>"
        f"</div>"
        f"</div>"
    )


TICK = (
    '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">'
    '<path d="M3 8.4l3.2 3.2L13 4.8" stroke="currentColor" stroke-width="2" '
    'stroke-linecap="round" stroke-linejoin="round"/></svg>'
)

STAR = (
    '<svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true">'
    '<path d="M10 1.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L10 14.6 4.8 17.5 6 11.7 1.6 7.7l5.9-.7z" '
    'fill="currentColor"/></svg>'
)


# Which motif stands in for each gallery slot until a photo lands there, and
# the alt text used once one does. The shipped demo set (photos/work-*.png)
# was art-directed in Canva to match each caption; a studio adopting the
# template overwrites those files with real photography and rebuilds.
TILE_FALLBACK = [
    ("__MOTIF_SERPENT__", "Cherub with wings above a script banner, black and grey"),
    ("__MOTIF_DAGGER__", "Koi rising through water before a sun disc"),
    ("__MOTIF_MOTH__", "Lion framed by honeycomb geometry and mandala"),
    ("__MOTIF_ROSE__", "Garita watchtower, coqui and hibiscus sleeve"),
    ("__MOTIF_EYE__", "Portrait with crown of thorns, two red lines"),
    ("__MOTIF_SWALLOW__", "Bare tree rooted in a jack-o-lantern before a crescent moon"),
]


def tile_art() -> tuple[dict[str, str], int]:
    """Build the six gallery tiles, photo where there is one, line art where not."""
    out, found = {}, 0
    for i, (motif, alt) in enumerate(TILE_FALLBACK, start=1):
        path = find_photo(i)
        if path:
            out[f"__TILE_ART_{i}__"] = photo_tag(path, alt)
            found += 1
            print(f"  tile {i}: {path.name}")
        else:
            out[f"__TILE_ART_{i}__"] = f'<div class="artifact">{motif}</div>'
    return out, found


def main() -> int:
    html = SRC.read_text()

    html = html.replace("__FONT_FACES__", font_faces())

    tiles, found = tile_art()
    print(f"gallery: {found}/6 photos, {6 - found} line-art placeholders")
    for token, markup in tiles.items():
        html = html.replace(token, markup)

    # Before the motif pass: the plate embeds a motif token of its own.
    html = html.replace("__PLATE__", plate())

    for token, markup in MOTIFS.items():
        html = html.replace(token, markup)
    html = html.replace("__TICK__", TICK)
    html = html.replace("__STARS__", STAR * 5)

    leftover = re.findall(r"__[A-Z_]+__", html)
    if leftover:
        print(f"unreplaced placeholders: {sorted(set(leftover))}")
        return 1

    (HERE / "index.html").write_text(html)

    style = re.search(r"<style>.*?</style>", html, re.S)
    body = re.search(r"<body>(.*)</body>", html, re.S)
    if not style or not body:
        print("could not split the document for the artifact build")
        return 1
    (HERE / "artifact.html").write_text(style.group(0) + "\n" + body.group(1).strip() + "\n")

    for name in ("index.html", "artifact.html"):
        size = (HERE / name).stat().st_size
        print(f"{name}  {size / 1e3:.0f}KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
