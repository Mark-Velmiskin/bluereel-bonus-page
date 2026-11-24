import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // GitHub Pages serves the site at /bluereel-bonus-page/ (build with `--mode pages`)
  base: mode === 'pages' ? '/bluereel-bonus-page/' : '/',
}))
