import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Builds the whole app into one self-contained index.html for hosts that serve
// a single file with no sibling assets and no SPA rewrite — used for shareable
// previews. Production (Vercel) uses vite.config.js instead.
//
// Two things differ from the normal build: every asset is inlined as a data URI
// rather than emitted alongside, and the app switches to a hash router, since
// path routing needs a server rewrite that a single file cannot provide.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  define: {
    'import.meta.env.VITE_HASH_ROUTER': JSON.stringify('true'),
  },
  build: {
    outDir: 'dist-singlefile',
    cssCodeSplit: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    chunkSizeWarningLimit: 100000,
  },
})
