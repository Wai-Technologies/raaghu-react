import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import  dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig({

  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib : {
      entry : path.resolve(__dirname, 'index.ts'),
      name : "@waiin/raaghu-react",
      fileName : (format) => `index.${format}.js`
  },
  rollupOptions: {
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    external: ['react','react-dom','react-measure'],
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      }
    }
  },
  sourcemap: true,
  emptyOutDir : true,
  },
  plugins: [react(), dts()],
  optimizeDeps: {
    include: ['charts'] // Add the dependencies you want to include for optimization
  }

})
