import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import vueJSX from '@vitejs/plugin-vue-jsx'
// import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('My'),
        },
      },
    }),
    vueJSX(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // mkcert(),
  ],
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
        additionalData: '@import "/@/styles/index.scss";',
      },
    },
  },
  server: {
    port: 8010,
    // https: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // target: 'https://api.music.lizhiwen.online',
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
