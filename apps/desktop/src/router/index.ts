import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '/@/layout/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {
      name: 'discover',
    },
    component: Layout,
    children: [
      {
        path: '/discover',
        name: 'discover',
        redirect: {
          name: 'discover/recommend',
        },
        children: [
          {
            path: 'recommend',
            name: 'discover/recommend',
            component: () => import('/@/views/discover/recommend/index.vue'),
          },
          {
            path: 'playlist',
            name: 'discover/playlist',
            component: () => import('/@/views/discover/playlist/index.vue'),
          },
          {
            path: 'rank',
            name: 'discover/rank',
            component: () => import('/@/views/discover/rank/index.vue'),
          },
          {
            path: 'artist',
            name: 'discover/artist',
            component: () => import('/@/views/discover/artist/index.vue'),
          },
          {
            path: 'song',
            name: 'discover/song',
            component: () => import('/@/views/discover/song/index.vue'),
          },
          {
            path: 'new-song',
            name: 'discover/new-song',
            component: () => import('/@/views/discover/new-song/index.vue'),
          },
        ],
      },
      {
        path: '/playlist',
        name: 'playlist',
        component: () => import('/@/views/playlist/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
