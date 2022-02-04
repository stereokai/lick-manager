import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const resolveAliases = [
  { find: /react-dom$/, replacement: "react-dom/profiling" },
  { find: "scheduler/tracing", replacement: "scheduler/tracing-profiling" },
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: resolveAliases,
  },
  optimizeDeps: {
    exclude: ["@coderline/alphatab"],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "@coderline/alphatab": ["@coderline/alphatab"],
        },
      },
    },
  },
});
