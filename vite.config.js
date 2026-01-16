import { defineConfig } from 'vite'
import { copy } from 'vite-plugin-copy'

export default defineConfig({
  base: '/EmporiumVipani/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: 'public/index.html'
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
