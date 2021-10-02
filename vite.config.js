import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from 'postcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), postcss()],
  base: "/life/",
  build: {
    outDir: "docs",
    target: "es2015",
  },
})
