import type { App } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useLayoutStore } from '/@/store/module/layout'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'discover',
    children: [
      {
        path: '',
        name: 'discover',
        component: () => import('/@/views/discover/index.vue'),
        meta: {
          title: '发现',
          showSearch: true,
          layout: {
            showNavbar: true,
            showMiniPlayer: true,
          },
        },
      },

      {
        path: '/album/:id',
        name: 'album',
        component: () => import('/@/views/album/index.vue'),
        meta: {
          layout: {
            showNavbar: true,
            showMiniPlayer: true,
          },
        },
      },

      {
        path: '/rank',
        name: 'rank',
        component: () => import('/@/views/rank/index.vue'),
        meta: {
          layout: {
            showNavbar: true,
            showMiniPlayer: false,
          },
        },
      },

      {
        path: '/ranklist/:id',
        name: 'ranklist',
        component: () => import('/@/views/ranklist/index.vue'),
        meta: {
          layout: {
            showNavbar: true,
            showMiniPlayer: true,
          },
        },
      },

      {
        path: '/playlist/:id',
        name: 'playlist',
        component: () => import('/@/views/playlist/index.vue'),
        meta: {
          layout: {
            showNavbar: true,
            showMiniPlayer: true,
          },
        },
      },

      {
        path: '/playlist-square',
        name: 'playlist-square',
        component: () => import('../views/playlist-square/index.vue'),
        meta: {
          layout: {
            showNavbar: true,
            showMiniPlayer: false,
          },
        },
      },

      {
        path: '/search/:keywords',
        name: 'search',
        component: () => import('../views/search/index.vue'),
        meta: {
          layout: {
            showNavbar: true,
            showMiniPlayer: false,
          },
        },
      },

      {
        path: '/mv/:id',
        name: 'mv',
        component: () => import('../views/mv/index.vue'),
        meta: {
          layout: {
            showNavbar: true,
            showMiniPlayer: false,
          },
        },
      },

      {
        path: '/comment/:id',
        name: 'comment',
        component: () => import('../views/comment/index.vue'),
        meta: {
          layout: {
            showNavbar: true,
            showMiniPlayer: false,
          },
        },
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// 扩展 transitionName 属性、维护一个 history 栈(以后可能会用到)
router.beforeEach((to, from, next) => {
  // const history = storage.getItem('history')
  if (router.isBack) {
    router.transitionName = 'route-back'
    router.isBack = false
    // history.splice(history.length - 1, 1)
  }
  else {
    router.transitionName = 'route-forward'
    // history.push(to.path)
  }

  // storage.setItem('history', history)
  // console.log(storage.getItem('history'))

  next()
})

// 扩展 router
router.goBack = function () {
  router.isBack = true
  router.back()
}

function addDevRoutes(router: Router) {
  const devRoutes: RouteRecordRaw[] = [
    {
      path: '/test',
      name: 'test',
      component: () => import('/@/views/test/index.vue'),
      meta: {
        layout: {
          showNavbar: true,
          showTabbar: false,
          showMiniPlayer: true,
        },
      },
    },
  ]

  if (import.meta.env.DEV) {
    for (const route of devRoutes)
      router.addRoute('discover', route)
  }
}

function setupLayoutGuard(router: Router) {
  const layoutStore = useLayoutStore()

  router.beforeEach((to, from, next) => {
    const { layout } = to.meta

    layoutStore.toggleShowNavbar(layout?.showNavbar)
    layoutStore.toggleShowTabbar(layout?.showTabbar)
    layoutStore.toggleShowMiniPlayer(layout?.showMiniPlayer)

    next()
  })
}

export function setupRouter(app: App) {
  addDevRoutes(router)
  setupLayoutGuard(router)

  app.use(router)
}

export { router }
