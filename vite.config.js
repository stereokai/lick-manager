import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export const alias = {
  "@": path.resolve(__dirname, "src"),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: [
      { find: /react-dom$/, replacement: "react-dom/profiling" },
      { find: "scheduler/tracing", replacement: "scheduler/tracing-profiling" },
      {
        find: `${Object.keys(alias)[0]}/`,
        replacement: `${Object.values(alias)[0]}/`,
      },
    ],
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
