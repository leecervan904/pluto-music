<script setup lang="ts">
import type { IArtist } from '@pluto-music/api'
import { withDefaults } from 'vue'

import AsideItem from './AsideItem.vue'

withDefaults(
  defineProps<{
    artists: IArtist[]
  }>(),
  {
    artists: () => [],
  },
)
const emit = defineEmits(['to-artist'])

function handleToArtist(artist: IArtist) {
  emit('to-artist', artist.id)
}
</script>

<template>
  <AsideItem class="hot-artists">
    <template #title>
      热门歌手
    </template>

    <div v-for="item of artists" :key="item.id" class="item" @click="handleToArtist(item)">
      <div class="item-avatar">
        <img :src="`${item.picUrl}?param=50y50`">
      </div>
      <div class="item-info">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </AsideItem>
</template>

<style lang="scss" scoped>
.hot-artists {
  box-sizing: border-box;
  padding: 20px 40px 10px 30px;
  font-size: $fontMin;
  .title {
    height: 23px;
    margin-bottom: 20px;
    line-height: 23px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
  :deep() {
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
  .item {
    margin-bottom: 10px;
    width: 50px;
    &:not(:nth-child(3n + 1)) {
      margin-left: 10px;
    }
    &:hover {
      cursor: pointer;
    }
    &-info {
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      text-align: center;
      @include ellipse();
    }
  }
}
</style>
