import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export function useLayout() {
  const route = useRoute()

  const showNavbar = computed(() => route.meta.showNavbar)
  const showTabbar = computed(() => route.meta.showTabbar)
  const showMiniPlayer = computed(() => route.meta.showMiniPlayer)

  watchEffect(() => {
    console.log('watchEffect', showMiniPlayer.value)
  })

  return {
    showNavbar,
    showTabbar,
    showMiniPlayer,
  }
}
