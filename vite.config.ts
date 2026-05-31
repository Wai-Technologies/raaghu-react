import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import million from 'million/compiler'
import millionConfig from './million.config'
import griffel from '@griffel/vite-plugin'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    million.vite(millionConfig),
    react(),
    griffel()
  ],
  build: {
    lib: {
      // Use the main index.ts file as entry point
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'RaaghuReact',
      fileName: (format) => `raaghu-react.${format}.js`
    },
    rollupOptions: {
      // Externalize peer dependencies
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
  }
  })
