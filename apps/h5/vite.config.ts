import { resolve } from 'node:path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJSX(),
    Components({
      resolvers: [VantResolver()],
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, './src/assets/icons/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    UnoCSS(),
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
    port: 8020,
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
  },
})
