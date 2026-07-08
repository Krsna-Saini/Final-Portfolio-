import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` must match the GitHub Pages sub-path (repo name) for production builds,
// but stay at '/' for local dev so the dev server and API proxy work normally.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Final-Portfolio-/' : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
}))
