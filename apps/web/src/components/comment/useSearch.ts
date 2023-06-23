import { type Ref, onMounted, reactive, ref, shallowRef } from 'vue'
import type { ICommentItem } from '@pluto-music/api'
import { CommentTypeEnum } from '@pluto-music/api'
import { useRequest } from '/@/utils'

export function useSearch(
  id: string | number,
  type: CommentTypeEnum,
  refNewComment: Ref<HTMLElement | null>,
) {
  const params = reactive({
    before: 0,
    limit: 20,
    offset: 0,
  })

  const total = ref(0)
  const comments = shallowRef<ICommentItem[]>([])
  const hotComments = shallowRef<ICommentItem[]>([])

  async function getComment(page = 1) {
    let func
    switch (type) {
      case CommentTypeEnum.MV:
        func = useRequest('getMvComment')
        break
      case CommentTypeEnum.PLAYLIST:
        func = useRequest('getPlaylistComment')
        break
      case CommentTypeEnum.SONG:
        func = useRequest('getSongComment')
        break
      case CommentTypeEnum.ALBUM:
        func = useRequest('getAlbumComment')
        break
      default:
        break
    }
    if (!func)
      return

    const [error, data] = await func({
      id,
      limit: 20,
      offset: (page - 1) * 20,
    })

    if (error)
      return
    // console.log(data)
    total.value = data.total || 0
    comments.value = data.comments
    if (page === 1)
      hotComments.value = data.hotComments

    // 滚动到评论顶部
    if (page > 1)
      refNewComment?.value?.scrollIntoView({ behavior: 'smooth' })
  }

  onMounted(() => {
    getComment()
  })

  return {
    params,
    total,
    comments,
    hotComments,
    getComment,
  }
}
