import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    fs: {
      strict: true,
      deny: ['.env', '.env.*', '*.{pem,crt,key}'],
    },
    cors: false, // Or configure strict CORS
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
      timeout: 30000
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        sanitizeFileName: true
      }
    }
  }
})
