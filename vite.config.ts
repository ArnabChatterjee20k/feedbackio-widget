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
      input:  'src/wall-of-fame.main.tsx',
      // input:  'src/wall-of-fame.main.tsx',
      output:{
        entryFileNames:"wall-bundle.js",
        chunkFileNames:"wall-bundle.js",
        assetFileNames:"wall-style.css"
      }
    }
  }
})
