import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build:{
    rollupOptions:{
      // input:  'src/main.tsx',
      input:  'src/wall-of-fame.main.tsx',
      output:{
        entryFileNames:"wall-of-fame-bundle.js",
        chunkFileNames:"wall-of-fame-bundle.js",
        assetFileNames:"wall-of-fame-style.css"
      }
    }
  }
})
