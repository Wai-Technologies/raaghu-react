import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import pkg from './package.json';

// Runtime dependencies and peers are left to the consuming app to resolve, including subpaths
// such as `react/jsx-runtime` and `@mui/icons-material/Close`. Bundling them would pin the
// build machine's React jsx-runtime into the library (instead of the app's own React 19.x)
// and ship duplicate copies of MUI, react-is, etc. CSS is still bundled into raaghu-react.css,
// and JSON data is inlined because plain Node ESM (SSR, Jest) cannot import JSON without attributes.
//
// react-player stays bundled: v3 pulls custom media elements (youtube/vimeo/hls/…) that
// consumers would otherwise need to resolve; bundling keeps the library entry self-contained.
const bundledDependencies = ['react-player'];
const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
].filter((name) => !bundledDependencies.includes(name));
const isExternal = (id: string) =>
  !/\.(css|scss|json)$/.test(id) &&
  externalPackages.some((name) => id === name || id.startsWith(`${name}/`));

// REACT19 #4 (preserveModules): deferred. package.json `exports` / main / module still
// point at a single ES + CJS chunk; enabling preserveModules needs a multi-entry export
// map and consumer migration, not a silent Vite flag flip.
// https://vite.dev/config/
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
