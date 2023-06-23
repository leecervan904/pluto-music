<script lang="tsx">
import { type ComputedRef, computed, defineComponent, onMounted, ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import type { ICommentItem } from '@pluto-music/api'
import { CommentSortTypeEnum, CommentTypeEnum } from '@pluto-music/api'
import { useRequest } from '/@/utils/useRequest'

import CommentItem from './CommentItem.vue'
import CommentReply from './CommentReply.vue'

export default defineComponent({
  setup() {
    const route = useRoute()

    const id = computed(() => route.params.id) as ComputedRef<string>
    const type = ref<CommentTypeEnum>(CommentTypeEnum.SONG)
    const sortType = ref<CommentSortTypeEnum>(CommentSortTypeEnum.RECOMMEND)
    const list = ref<ICommentItem[]>([])
    const showReply = ref(false)
    const activeId = ref<Nullable<number>>(null)

    const initData = async () => {
      const [error, data] = await useRequest('getComment')({
        id: unref(id),
        type: unref(type),
        sortType: unref(sortType),
      })
      if (error)
        return
      list.value = data.data.comments
    }

    const handleChangeSort = (sort: CommentSortTypeEnum) => {
      sortType.value = sort
      initData()
    }

    const handleShowReply = (commentId: number) => {
      showReply.value = true
      activeId.value = commentId
      // console.log(id.value, activeId.value)
    }

    onMounted(() => {
      console.log('mounted')
      initData()
    })

    return () => (
      <div class="comment">
        <div class="comment-sort">
          <span
            class={{ 'is-active': unref(sortType) === CommentSortTypeEnum.RECOMMEND }}
            onClick={() => handleChangeSort(CommentSortTypeEnum.RECOMMEND)}
          >推荐</span>
          <span class="comment-sort__sep">|</span>
          <span
            class={{ 'is-active': unref(sortType) === CommentSortTypeEnum.HOT }}
            onClick={() => handleChangeSort(CommentSortTypeEnum.HOT)}
          >最热</span>
          <span class="comment-sort__sep">|</span>
          <span
            class={{ 'is-active': unref(sortType) === CommentSortTypeEnum.TIME }}
            onClick={() => handleChangeSort(CommentSortTypeEnum.TIME)}
          >最新</span>
        </div>
        <div class="comment-content" >
          {unref(list).map(comment => (
            <CommentItem comment={comment} onShowReply={handleShowReply} />
          ))}
        </div>

        <CommentReply v-model={showReply.value} resource-id={id.value} active-id={activeId.value} />
      </div>
    )
  },
})
</script>

<style lang="scss" scoped>
.comment {
  box-sizing: border-box;
  padding: 0 10px;
  &-sort {
    height: 30px;
    line-height: 30px;
    text-align: right;
    font-size: 14px;
    color: #ccc;
    &__sep {
      margin: 0 10px;
    }
    .is-active {
      color: #000;
    }
  }
  &-content {
    margin-top: 10px;
  }
}
</style>
