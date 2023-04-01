export {}

declare module 'vue-router' {
  interface LayoutMeta {
    showNavbar: boolean
    showTabbar: boolean
    showMiniPlayer: boolean
  }

  interface Router extends Record<string | number | symbol, unknown> {
    isBack: boolean
    transitionName: 'route-forward' | 'route-back'
    goBack: (...args: any) => any
  }

  interface RouteMeta extends Record<string | number | symbol, unknown> {
    title?: string
    showSearch?: boolean
    layout?: Partial<LayoutMeta>
  }
}
