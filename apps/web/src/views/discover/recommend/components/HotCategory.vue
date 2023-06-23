<script setup lang="ts">
import type { IPersonalizedItem } from '@pluto-music/api'
import { onMounted, ref } from 'vue'
import { useRequest } from '/@/utils'

import PlaylistCard from '/@/components/base/PlaylistCard.vue'
import CategoryHeader from '/@/components/base/CategoryHeader.vue'

const title = '热门推荐'
const list = ['华语', '流行', '摇滚', '民谣', '电子']
const morePath = '/discover/playlist'
const playlist = ref<IPersonalizedItem[]>([])

onMounted(async () => {
  const [error, data] = await useRequest('getPersonalized')({ limit: 8 })
  if (error)
    return
  playlist.value = data.result
})
</script>

<template>
  <div class="container">
    <CategoryHeader :title="title" :list="list" :more-path="morePath" />
    <div class="content">
      <ul class="playlist">
        <PlaylistCard v-for="(item, i) of playlist" :key="i" class="item" :info="item" />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  .content {
    .playlist {
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 140px;
        height: 204px;
        padding-bottom: 30px;
      }
    }
  }
}
</style>
