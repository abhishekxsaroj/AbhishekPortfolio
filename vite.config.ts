import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Keep react/react-dom together with the graph — splitting them
          // can blank the production app with Vite/Rolldown.
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('lenis')) return 'vendor-lenis'
          if (id.includes('react-router')) return 'vendor-router'
        },
      },
    },
  },
})
