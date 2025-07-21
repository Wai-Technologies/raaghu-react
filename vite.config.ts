import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import million from 'million/compiler'
import millionConfig from './million.config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    million.vite(millionConfig),
    react()
  ],
})
