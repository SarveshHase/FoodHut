import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: true,
      deny: ['.env', '.env.*', '*.{pem,crt,key}'],
    },
    cors: false, // Or configure strict CORS
    hmr: {
      protocol: 'wss',
      clientPort: 443
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
