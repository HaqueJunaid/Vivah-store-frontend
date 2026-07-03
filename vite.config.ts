import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { env } from 'process'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [tailwindcss(),react()],
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
