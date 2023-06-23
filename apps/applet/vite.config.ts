import { resolve } from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: `${resolve(__dirname, 'src')}/`,
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "/@/styles/mixins.scss";',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
