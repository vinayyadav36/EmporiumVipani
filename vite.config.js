import { defineConfig } from 'vite'
import { copy } from 'vite-plugin-copy'

export default defineConfig({
  base: '/EmporiumVipani/',
  root: 'public',
  publicDir: false,
  build: {
    outDir: '../dist',
    assetsDir: '.',
    sourcemap: false,
    minify: 'terser',
    copyPublicDir: false,
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true,
    root: 'public'
  }
})
