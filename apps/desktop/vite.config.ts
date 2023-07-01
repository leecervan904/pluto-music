import * as path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import electron from 'vite-plugin-electron'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJSX(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    electron([
      {
        entry: 'electron/main.ts',
      },
      {
        entry: 'electron/preload.ts',
      },
    ]),
    UnoCSS(),
  ],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "/@/assets/css/index.scss"; @import "/@/style/mixins.scss";',
      },
    },
  },
  server: {
    port: 8030,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: path => path.replace(/^\/api/, ''),
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
    emptyOutDir: false,
  },
})
