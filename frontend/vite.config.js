import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      "/api" : "http://book-store-inky-sigma.vercel.app"
    }
  },
  plugins: [react()],
})
