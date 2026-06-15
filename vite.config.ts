import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Only load vite-plugin-dts during `vite build` — Storybook uses `vite serve`
  // and api-extractor (bundled in vite-plugin-dts) is not needed there.
  const dtsPlugin = command === 'build'
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ? [require('vite-plugin-dts').default({
        include: ['index.ts', 'raaghu-elements', 'raaghu-components', 'raaghu-layouts', 'raaghu-react-themes', 'utils'],
        insertTypesEntry: true,
      })]
    : [];

  return {
    plugins: [
      react(),
      ...dtsPlugin,
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
        fileName: (format) => `raaghu-react.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            '@mui/material': 'MuiMaterial',
            '@emotion/react': 'EmotionReact',
            '@emotion/styled': 'EmotionStyled'
          }
        }
      },
      sourcemap: true,
      emptyOutDir: true,
    },
    optimizeDeps: {
      include: ["chart.js"],
    },
  };
})
