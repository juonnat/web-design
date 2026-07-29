# Portfolio photos

Drop the studio's tattoo photos in here as `work-1` … `work-6`, any of
`.jpg` / `.jpeg` / `.png` / `.webp`, straight off the camera — `build.py`
handles the rest:

- bakes in EXIF rotation (otherwise some phone photos render sideways)
- caps the long edge at 1100px
- re-encodes to WebP and inlines them as data URIs

Then run `python3 build.py`.

Any slot without a photo falls back to the line-art motif automatically, so the
gallery is never broken while photos are still being collected. Titles and style
captions live in `src/page.html` next to each tile.

Nothing in this folder is deployed — the images end up inside `index.html`.
