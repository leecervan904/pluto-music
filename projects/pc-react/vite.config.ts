import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: 'electron/main.ts',
      },
      {
        entry: 'electron/preload.ts',
      },
    ]),
  ],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: `${resolve(__dirname, 'src')}/`,
      },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // target: 'https://api.music.lizhiwen.online',
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 8050,
  },
})
