// GitHub Pages SPA fallback.
// GitHub Pages has no server-side routing, so a hard refresh (or direct visit) to a
// client route like /inbox or /projects/nexus would 404. Copying index.html to 404.html
// makes GitHub Pages serve the app for any unknown path; React Router then renders the
// correct route from the URL. Runs automatically after `vite build` (npm postbuild hook).
import { copyFile, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const src = join(dist, 'index.html')
const dest = join(dist, '404.html')

try {
  await access(src)
  await copyFile(src, dest)
  console.log('[gh-pages] created dist/404.html (SPA fallback)')
} catch (err) {
  console.error('[gh-pages] could not create 404.html — did the build produce dist/index.html?')
  console.error(err.message)
  process.exitCode = 1
}
