import type { Router } from 'vue-router'
import { defineStore } from 'pinia'

/**
 * 在 store 中维护布局状态，控制各个部件的显隐
 *  - 之所以不单独使用路由 meta 控制，是因为在某些情况（如不改变路由但需要改变布局）下路由守卫无法触发
 */
export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    showNavbar: true,
    showTabbar: false,
    showMiniPlayer: true,
    showPlayer: false,
    showConfig: false,
  }),
  getters: {

  },
  actions: {
    toggleShowNavbar(val?: boolean) {
      this.showNavbar = typeof val === 'boolean' ? val : !this.showNavbar
    },
    toggleShowTabbar(val?: boolean) {
      this.showTabbar = typeof val === 'boolean' ? val : !this.showTabbar
    },
    toggleShowMiniPlayer(val?: boolean) {
      this.showMiniPlayer = typeof val === 'boolean' ? val : !this.showMiniPlayer
    },
    toggleShowPlayer(val?: boolean) {
      const { layout } = this.router.currentRoute.meta

      this.showPlayer = typeof val === 'boolean' ? val : !this.showPlayer

      if (val) {
        this.toggleShowMiniPlayer(false)
      } else if (layout?.showMiniPlayer) {
        this.toggleShowMiniPlayer(true)
      }
    },
    toggleShowConfig(val?: boolean) {
      this.showConfig = typeof val === 'boolean' ? val : !this.showConfig
    },
  },
})
