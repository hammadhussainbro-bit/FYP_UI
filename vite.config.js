import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow LAN access
    port: 5173, // your dev port
    allowedHosts: [
      '192.168.0.45',                  // your Mac LAN IP
      '59e34aca96a2.ngrok-free.app',   // your ngrok host
    ],
  },
})
