import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteParam(key: string) {
  const route = useRoute()

  const val = computed(() => route.params[key])

  return val
}
