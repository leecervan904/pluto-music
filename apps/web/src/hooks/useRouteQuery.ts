import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteQuery(key: string) {
  const route = useRoute()

  const val = computed(() => route.query[key])

  return val
}
