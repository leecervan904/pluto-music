import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from '/@/router'
import { setupStore } from '/@/store'
// import { ComponentLibrary } from '@pluto-music/vue-library/lib'
// import { MyComponent } from '@pluto-music/stencil/dist/components/my-component'

import 'normalize.css'
// import '../public/img/iconfont/iconfont.css'

function bootstrap() {
  const app = createApp(App)

  // app.use(ComponentLibrary)
  // customElements.define('my-component', MyComponent)

  setupRouter(app)
  setupStore(app)

  app.mount('#app')
}

bootstrap()
