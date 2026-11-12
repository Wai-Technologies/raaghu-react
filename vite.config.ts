import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import pkg from './package.json';

const bundledDependencies = ['react-player'];
const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
].filter((name) => !bundledDependencies.includes(name));
const isExternal = (id: string) =>
  !/\.(css|scss|json)$/.test(id) &&
  externalPackages.some((name) => id === name || id.startsWith(`${name}/`));

export default defineConfig(() => {
  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        '@icons/material/UnfoldMoreHorizontalIcon': '@mui/icons-material/UnfoldMore',
        '@icons/material/CheckIcon': '@mui/icons-material/Check',
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'index.ts'),
        name: 'RaaghuReact',
        formats: ['es', 'cjs'],
        fileName: (format) => (format === 'es' ? 'raaghu-react.es.mjs' : 'raaghu-react.cjs')
      },
      rollupOptions: {
        external: isExternal,
      },
      sourcemap: true,
      emptyOutDir: true,
    },
    optimizeDeps: {
      include: ["chart.js"],
    },
  };
})
