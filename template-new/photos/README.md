# Portfolio photos

Drop the studio's tattoo photos in here as `work-1` … `work-6`, any of
`.jpg` / `.jpeg` / `.png` / `.webp`, straight off the camera — `build.py`
handles EXIF rotation, resizing, WebP conversion, and inlining.

Then run `python3 build.py`.

Any slot without a photo falls back to the line-art motif automatically.
Titles and style captions live in `src/page.html` next to each tile.

Nothing in this folder is deployed — the images end up inside `index.html`.
