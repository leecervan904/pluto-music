import type { App } from 'vue'
import coming from './coming'

// import scroll from './scroll'

// Vue.directive(scroll.name, scroll.hooks)

export function setupDirectives(app: App) {
  app.directive(coming.name, coming.hooks)
}
