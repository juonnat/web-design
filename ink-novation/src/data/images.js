// Artist photography is resolved from disk at build time rather than listed by
// hand, so dropping a file into src/assets/<slug>/ is all it takes to publish
// it. Artists whose photos haven't been collected yet simply resolve to null /
// an empty array, and the components fall back to placeholder graphics.

const portraitModules = import.meta.glob('../assets/*/portrait.jpg', {
  eager: true,
  import: 'default',
})

const workModules = import.meta.glob('../assets/*/work-*.jpg', {
  eager: true,
  import: 'default',
})

const slugOf = (path) => path.split('/').at(-2)

// "work-10" must sort after "work-9", so compare the trailing number, not the
// string.
const indexOf = (path) => Number(path.match(/work-(\d+)\.jpg$/)?.[1] ?? 0)

const portraits = Object.fromEntries(
  Object.entries(portraitModules).map(([path, src]) => [slugOf(path), src]),
)

const works = {}
for (const [path, src] of Object.entries(workModules)) {
  const slug = slugOf(path)
  ;(works[slug] ??= []).push({ src, index: indexOf(path) })
}
for (const list of Object.values(works)) {
  list.sort((a, b) => a.index - b.index)
}

export const portraitFor = (slug) => portraits[slug] ?? null

export const worksFor = (slug) => (works[slug] ?? []).map((w) => w.src)
