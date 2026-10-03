import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The backend serves the JSON API under /api and the
// uploaded and seeded images under /uploads. Proxying
// both in dev keeps every request same-origin, so image
// paths stored in the database (for example
// /uploads/seed-assets/service-web-development.png)
// resolve correctly without hardcoding a host.
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
