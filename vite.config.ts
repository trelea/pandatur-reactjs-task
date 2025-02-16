import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],

  // dev
  server: {
    port: 3000,
  },

  // prod
  preview: {
    port: 3000,
  },

  // build minification
  build: {
    chunkSizeWarningLimit: 1600,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
