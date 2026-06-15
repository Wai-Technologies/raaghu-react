import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import million from 'million/compiler'
import millionConfig from './million.config'
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      million.vite(millionConfig),
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
