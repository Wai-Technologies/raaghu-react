import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    terserOptions: {
      mangle: {
        reserved: ['RdsAvatar'], // Replace 'RdsAvatar' with the actual name of the component you want to preserve during minification
      },
    },
  },
})
