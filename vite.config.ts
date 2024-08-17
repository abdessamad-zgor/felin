/// <reference types="vitest">
import { resolve } from "path"
import {defineConfig} from "vite"

const __dirname = import.meta.dirname
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/felin.ts"),
      fileName: "felin",
      name: "felin",
      formats: ["es"]
    },
    outDir: resolve(__dirname, "dist"),
    sourcemap: true,
    minify: true
  }
})
