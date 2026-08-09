import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('/src/DuoPet.jsx') || id.includes('\\src\\DuoPet.jsx')) return 'case-duopet'
          if (id.includes('/src/Doctor.jsx') || id.includes('\\src\\Doctor.jsx')) return 'case-doctor'
          if (id.includes('/src/Entregas.jsx') || id.includes('\\src\\Entregas.jsx')) return 'case-delivery'
          if (id.includes('/src/About.jsx') || id.includes('\\src\\About.jsx')) return 'about'
          if (id.includes('/src/Home.jsx') || id.includes('\\src\\Home.jsx')) return 'home'
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})
