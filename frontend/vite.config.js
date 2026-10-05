import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Backend target
const backendTarget =
  process.env.VITE_PROXY_TARGET || 'http://localhost:5000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
      },

      '/uploads': {
        target: backendTarget,
        changeOrigin: true,
      },
    },
  },
})