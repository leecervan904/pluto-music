// packages/vue-library/lib/plugin.ts

import type { Plugin } from 'vue'
import { applyPolyfills, defineCustomElements } from '@pluto-music/stencil/loader'

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements()
    })
  },
}
