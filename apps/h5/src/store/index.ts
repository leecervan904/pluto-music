import type { App } from 'vue'
import { createPinia, defineStore } from 'pinia'
import { router } from '/@/router'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
  }),
})

export function setupStore(app: App) {
  const pinia = createPinia()
  pinia.use(({ store }) => {
    store.router = router
  })
  app.use(pinia)
}
