import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import griffel from '@griffel/vite-plugin'
import { fileURLToPath, URL } from 'url'

// Aliases let page files import as @raaghu/elements/... instead of ../../../raaghu-elements/...
// Vite resolves these; tsconfig.app.json paths mirrors them for TypeScript.
export default defineConfig({
  plugins: [react(), griffel()],
  resolve: {
    alias: {
      '@raaghu/elements':    fileURLToPath(new URL('../raaghu-elements',      import.meta.url)),
      '@raaghu/components':  fileURLToPath(new URL('../raaghu-components',    import.meta.url)),
      '@raaghu/layouts':     fileURLToPath(new URL('../raaghu-layouts',       import.meta.url)),
      '@raaghu/themes':      fileURLToPath(new URL('../raaghu-react-themes',  import.meta.url)),
    },
  },
})
