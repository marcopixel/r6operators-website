import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tsconfigPaths from "vite-tsconfig-paths"
import svgLoader from "vite-svg-loader"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths({ loose: true }),
    vue(),
    svgLoader({
      defaultImport: "url",
    }),
  ],
  ssgOptions: {
    formatting: "prettify",
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: ["./src/assets/"],
      },
    },
  },
})
