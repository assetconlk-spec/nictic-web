import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['pocketbase'],
  },
  server: {
    proxy: {
      // PayHere serverless functions — served by dev-server.js locally
      '/api/payhere-hash':   { target: 'http://localhost:3001', changeOrigin: true },
      '/api/payhere-notify': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/notify':         { target: 'http://localhost:3001', changeOrigin: true },
      // Everything else → PocketBase
      '/api': { target: 'http://localhost:8090', changeOrigin: true },
      '/_':   { target: 'http://localhost:8090', changeOrigin: true },
    },
  },
})
