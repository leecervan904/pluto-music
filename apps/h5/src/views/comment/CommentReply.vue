<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import VueType from 'vue-types'
import type { GetCommentFloorResult } from '@pluto-music/api'
import { useRequest } from '/@/utils/useRequest'

import CommentItem from './CommentItem.vue'

const props = defineProps({
  modelValue: VueType.bool.def(false),
  resourceId: VueType.oneOfType([String, Number]),
  activeId: VueType.oneOfType([String, Number]),
})

const emit = defineEmits(['update:modelValue'])

const result = shallowRef<GetCommentFloorResult>()
const ownerComment = computed(() => result.value?.data.ownerComment)
const comments = computed(() => result.value?.data.comments)
const totalCount = computed(() => result.value?.data.totalCount)

const show = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

async function getCommentReply() {
  console.log(props)
  const [error, data] = await useRequest('getCommentFloor')({
    id: props.resourceId,
    parentCommentId: props.activeId,
  })
  if (error)
    return
  result.value = data
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal)
      getCommentReply()
  },
)
</script>

<template>
  <van-popup
    v-model:show="show"
    class="comment-popup"
    position="bottom"
    round
  >
    <h3 class="comment-title">
      回复({{ totalCount }})
    </h3>

    <div class="comment-content">
      <div v-if="!!result && !!ownerComment" class="comment-content__owner">
        <CommentItem :comment="ownerComment" hide-reply />
      </div>

      <div v-if="!!result && comments?.length" class="comment-content__reply">
        <CommentItem v-for="comment in comments" :comment="comment" hide-reply />
      </div>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.comment-title {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
}
.comment-content {
  overflow-y: auto;
  height: calc(90vh - 40px);
  &__owner {
    margin-bottom: 10px;
    border-bottom: 1px solid #ace;
  }
}
</style>

<style>
.van-popup.comment-popup {
  max-height: 90%;
}
</style>
