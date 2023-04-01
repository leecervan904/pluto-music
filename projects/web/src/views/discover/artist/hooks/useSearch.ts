import type { IArtistCateItem } from '@pluto-music/api'
import { ref, reactive } from 'vue'
import type { ICateItem } from '../typing'

export default function useSearch() {
  const activeCate = ref<ICateItem>({} as ICateItem) // 当前选中的分类
  const artists = ref<IArtistCateItem[]>([])

  const form = reactive({
    type: -1,
    area: -1,
    initial: '',
  })

  return {
    activeCate,
    artists,
    form,
  }
}
