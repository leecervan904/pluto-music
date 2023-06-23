<script setup lang="ts">
import { type PropType, ref } from 'vue'
import type { CommentTypeEnum } from '@pluto-music/api'
import { useSearch } from './useSearch'

import CommentItem from './CommentItem.vue'
import Pagination from '/@/components/base/Pagination.vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: Number as PropType<CommentTypeEnum>,
    required: true,
  },
})

const refNewComment = ref<HTMLElement | null>(null)

const { total, comments, hotComments, getComment } = useSearch(props.id, props.type, refNewComment)
</script>

<template>
  <div class="comment">
    <div class="comment-group">
      <div class="comment-group__title">
        精彩评论
      </div>
      <CommentItem
        v-for="comment in hotComments"
        :key="comment.commentId"
        class="comment-item"
        :comment="comment"
      />
    </div>
    <div class="comment-group">
      <div ref="refNewComment" class="comment-group__title">
        最新评论
      </div>
      <CommentItem
        v-for="comment in comments"
        :key="comment.commentId"
        class="comment-item"
        :comment="comment"
      />
    </div>

    <Pagination :pages="Math.ceil(total / 20)" @change-page="getComment" />
  </div>
</template>

<style lang="scss" scoped>
.comment {
  margin-top: 30px;
}
.comment-group {
  &__title {
    padding: 5px 0;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
}
.comment-item {
  padding: 15px 0;
  &:not(:last-child) {
    border-bottom: 1px dashed #ccc;
  }
}
</style>
