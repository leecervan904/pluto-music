import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/discover/recommend',
  },
  {
    path: '/discover',
    redirect: '/discover/recommend',
    component: Layout,
    children: [
      {
        path: 'album', // /discover/album
        name: 'discover/album',
        component: () => import('/@/views/discover/album/index.vue'),
      },
      {
        path: 'artist',
        name: 'discover/artist',
        component: () => import('/@/views/discover/artist/index.vue'),
      },
      // {
      //   path: 'djradio',
      //   name: 'discover/djradio',
      //   component: () => import('/@/views/discover/djradio/index.vue'),
      // },
      {
        path: 'playlist',
        name: 'discover/playlist',
        component: () => import('/@/views/discover/playlist/index.vue'),
      },
      {
        path: 'recommend',
        alias: '/discover',
        name: 'discover/recommend',
        component: () => import('/@/views/discover/recommend/index.vue'),
      },
      {
        path: 'toplist', // /discover/toplist?idx=:idx
        name: 'discover/toplist',
        component: () => import('/@/views/discover/toplist/index.vue'),
      },
    ],
  },
  {
    path: '/album', // /album?id=:id
    component: Layout,
    children: [
      {
        path: '',
        name: 'album',
        component: () => import('/@/views/album/index.vue'),
      },
    ],
  },
  {
    path: '/playlist', // /playlist?cate=:cate
    component: Layout,
    children: [
      {
        path: '',
        name: 'playlist',
        component: () => import('/@/views/playlist/index.vue'),
      },
    ],
  },
  {
    path: '/song', // /song?id=:id
    component: Layout,
    children: [
      {
        path: '',
        name: 'song',
        component: () => import('/@/views/song/index.vue'),
      },
    ],
  },
  {
    path: '/artist', // /artist?id=:id
    component: Layout,
    children: [
      {
        path: '',
        name: 'artist',
        component: () => import('/@/views/artist/index.vue'),
      },
    ],
  },
  {
    path: '/mv', // /mv?id=:id
    component: Layout,
    children: [
      {
        path: '',
        name: 'mv',
        component: () => import('/@/views/mv/index.vue'),
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '',
        name: 'test',
        component: () => import('/@/views/test/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export { router }

export function setupRouter(app: App) {
  app.use(router)
}
