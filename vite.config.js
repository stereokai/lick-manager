import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@coderline/alphatab"]
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          '@coderline/alphatab': ['@coderline/alphatab']
        },
      },
    },
  },
  })