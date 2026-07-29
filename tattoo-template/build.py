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
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "src" / "page.html"
FONT_DIR = HERE / "build"

FONTS = [
    ("Fraunces", "fraunces-latin-600-normal.woff2", 600, "normal"),
    ("Bebas Neue", "bebas-neue-400.woff2", 400, "normal"),
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


def svg(label: str, body: str) -> str:
    return (
        f'<svg class="motif inkable" viewBox="0 0 100 100" role="img" '
        f'aria-label="{label}">{body}</svg>'
    )


# Ornamental line art, drawn on a shared 100x100 field so every motif sits on
# the same optical weight. pathLength="1" normalises each stroke so a single
# CSS rule can draw any of them on.
MOTIFS = {
    "__MOTIF_SERPENT__": svg(
        "Coiled serpent",
        '<path pathLength="1" d="M28 88c16 0 26-11 26-23S38 45 38 33s11-21 25-19"/>'
        '<path pathLength="1" d="M63 14c7 1 11 6 11 11s-5 10-11 10"/>'
        '<path pathLength="1" d="M74 25c5 1 8 5 9 9"/>'
        '<path pathLength="1" d="M45 52c5 3 12 2 16-2"/>'
        '<circle class="fill-dot" cx="67" cy="20" r="2"/>',
    ),
    "__MOTIF_DAGGER__": svg(
        "Dagger and crescent moon",
        '<path pathLength="1" d="M50 93l-9-23V42h18v28z"/>'
        '<path pathLength="1" d="M30 42h40"/>'
        '<path pathLength="1" d="M50 42V17"/>'
        '<path pathLength="1" d="M43 17h14"/>'
        '<path pathLength="1" d="M74 28a25 25 0 1 0 5 42 29 29 0 0 1-5-42z"/>',
    ),
    "__MOTIF_MOTH__": svg(
        "Lantern moth",
        '<path pathLength="1" d="M50 36v40"/>'
        '<path pathLength="1" d="M50 40c-8-16-29-20-35-8-5 11 8 22 21 26"/>'
        '<path pathLength="1" d="M50 40c8-16 29-20 35-8 5 11-8 22-21 26"/>'
        '<path pathLength="1" d="M50 60c-5 11-17 17-23 11-4-6 3-13 10-17"/>'
        '<path pathLength="1" d="M50 60c5 11 17 17 23 11 4-6-3-13-10-17"/>'
        '<path pathLength="1" d="M50 36l-7-13M50 36l7-13"/>'
        '<circle class="fill-dot" cx="50" cy="34" r="2"/>',
    ),
    "__MOTIF_ROSE__": svg(
        "Thorn rose",
        '<path pathLength="1" d="M34 46c-8 7-7 19 2 25s23 3 28-6"/>'
        '<path pathLength="1" d="M50 24a15 15 0 1 1-14 21"/>'
        '<path pathLength="1" d="M57 33a9 9 0 1 0-10 13"/>'
        '<path pathLength="1" d="M53 40a4 4 0 1 1-3 4"/>'
        '<path pathLength="1" d="M50 72v20"/>'
        '<path pathLength="1" d="M50 80c-8 0-13-4-15-11 8-1 13 3 15 11z"/>',
    ),
    "__MOTIF_EYE__": svg(
        "The watcher",
        '<path pathLength="1" d="M17 50c11-15 22-22 33-22s22 7 33 22c-11 15-22 22-33 22S28 65 17 50z"/>'
        '<circle pathLength="1" cx="50" cy="50" r="12"/>'
        '<path pathLength="1" d="M50 20V7M22 29l-8-9M78 29l8-9"/>'
        '<path pathLength="1" d="M50 80v13M22 71l-8 9M78 71l8 9"/>'
        '<circle class="fill-dot" cx="50" cy="50" r="5"/>',
    ),
    "__MOTIF_SWALLOW__": svg(
        "Harbour swallow",
        '<path pathLength="1" d="M11 33c19-6 35 3 43 15 6-13 21-19 35-15-10 4-17 12-19 23"/>'
        '<path pathLength="1" d="M70 56c9 4 14 13 14 21-11-10-25-12-38-6"/>'
        '<path pathLength="1" d="M46 71L31 88l4-19"/>'
        '<circle class="fill-dot" cx="73" cy="38" r="2"/>',
    ),
}

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


def main() -> int:
    html = SRC.read_text()

    html = html.replace("__FONT_FACES__", font_faces())
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
