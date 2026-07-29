#!/usr/bin/env python3
"""Resize and compress artist photos for web delivery.

Source photos come straight from phone cameras: 4000-6000px, 4-8MB each, often
carrying EXIF orientation that browsers honour inconsistently. This bakes the
rotation in, caps the long edge, strips metadata, and re-encodes progressive.

Every image passed through is re-encoded, including ones already at or under the
target, so a single run's output does not depend on the input's history. That
does mean re-running over the whole tree recompresses already-optimized photos
and loses a little quality each time, so when topping up one artist's gallery,
name the new files instead:

    optimize-images.py src/assets/sharyn/work-{3,4,5,6}.jpg

With no arguments it processes every image under src/assets/.
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps

ASSETS = Path(__file__).resolve().parent.parent / "src" / "assets"

# Portraits render at most ~600px wide in the layout; gallery images open in a
# lightbox, so they get more headroom. 2x those for retina.
MAX_EDGE = {"portrait": 1400, "work": 1800}
QUALITY = 82


def target_for(name: str) -> int:
    return MAX_EDGE["portrait"] if name.startswith("portrait") else MAX_EDGE["work"]


def optimize(path: Path) -> tuple[int, int]:
    before = path.stat().st_size

    with Image.open(path) as im:
        # Bake EXIF rotation into the pixels so browsers can't disagree.
        im = ImageOps.exif_transpose(im)
        im = im.convert("RGB")

        limit = target_for(path.name)
        if max(im.size) > limit:
            im.thumbnail((limit, limit), Image.LANCZOS)

        # Write to a temp sibling first so a failure can't truncate the original.
        tmp = path.with_suffix(path.suffix + ".tmp")
        im.save(tmp, "JPEG", quality=QUALITY, optimize=True, progressive=True)

    tmp.replace(path)
    return before, path.stat().st_size


def main() -> int:
    if sys.argv[1:]:
        images = [Path(arg).resolve() for arg in sys.argv[1:]]
    else:
        images = sorted(ASSETS.glob("*/*.jpg")) + sorted(ASSETS.glob("*/*.jpeg"))
    if not images:
        print(f"No images found under {ASSETS}")
        return 1

    total_before = total_after = 0
    for path in images:
        before, after = optimize(path)
        total_before += before
        total_after += after
        rel = path.relative_to(ASSETS) if path.is_relative_to(ASSETS) else path
        print(f"{rel}  {before / 1e6:.1f}MB -> {after / 1e6:.2f}MB")

    print(
        f"\ntotal {total_before / 1e6:.1f}MB -> {total_after / 1e6:.1f}MB "
        f"({total_after / total_before:.0%} of original)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
