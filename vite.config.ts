import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from 'tailwindcss'
import webfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap'
    ])
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
