import { createApp } from 'vue'
import App from '/@/App.vue'
import 'virtual:svg-icons-register'

import { setupStore } from '/@/store'
import { setupRouter } from '/@/router'
import { setupDirectives } from '/@/directives'

import 'normalize.css'
import 'uno.css'

// import '/@/styles/index.scss'

import BgMask from '/@/components/bg-mask/index.vue'
import SvgIcon from '/@/components/svg-icon/index.vue'
import LoadingSpinner from '/@/components/loading-spinner/index.vue'

function bootstrap() {
  const app = createApp(App)

  app.component(BgMask.name, BgMask)
  app.component(SvgIcon.name, SvgIcon)
  app.component(LoadingSpinner.name, LoadingSpinner)

  setupDirectives(app)

  setupStore(app)
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
