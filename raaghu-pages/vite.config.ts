import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import griffel from '@griffel/vite-plugin';

const repoRoot = path.resolve(__dirname, '..');

export default defineConfig({
  root: __dirname,
  plugins: [react(), griffel()],
  resolve: {
    alias: {
      '@raaghu/elements': path.join(repoRoot, 'raaghu-elements'),
      '@raaghu/components': path.join(repoRoot, 'raaghu-components'),
      '@raaghu/layouts': path.join(repoRoot, 'raaghu-layouts'),
      '@raaghu/themes': path.join(repoRoot, 'raaghu-react-themes'),
    },
  },
  server: {
    port: 5174,
  },
  build: {
    outDir: path.join(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
