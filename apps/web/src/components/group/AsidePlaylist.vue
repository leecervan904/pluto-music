<script setup lang="ts">
import type { ICollectPlaylistSubscriber, IRelativePlaylistItem } from '@pluto-music/api'
import type { PropType } from 'vue'
import AsideItem from './AsideItem.vue'

defineProps({
  playlistLikes: {
    type: Array as PropType<ICollectPlaylistSubscriber[]>,
    default: () => [],
  },
  relativeRecommend: {
    type: Array as PropType<IRelativePlaylistItem[]>,
    default: () => [],
  },
})

const emit = defineEmits(['to-playlist'])

function handleShowAbout() {}
function handleToPlaylist(id: number | string) {
  emit('to-playlist', id)
}
</script>

<template>
  <AsideItem class="playlist-likes">
    <template #title>
      <span>喜欢这个歌单的人</span>
    </template>

    <div v-for="(item, i) of playlistLikes" :key="i" class="item">
      <img
        v-show="item.avatarUrl"
        :src="`${item.avatarUrl}?param=40y40`"
        @click="handleShowAbout"
      >
    </div>
  </AsideItem>

  <AsideItem class="relative-recommend">
    <template #title>
      <span>相关推荐</span>
    </template>

    <div v-for="(item, i) of relativeRecommend" :key="i" class="item">
      <div class="item-avatar">
        <img v-show="item.coverImgUrl" :src="`${item.coverImgUrl}?param=50y50`">
      </div>
      <div class="item-info">
        <p class="info-name" @click="handleToPlaylist(item.id)">
          {{ item.name }}
        </p>
        <p v-if="item.creator" class="info-creator">
          <em>by</em>
          <em class="creator-name" @click="handleShowAbout">{{ item.creator.nickname }}</em>
        </p>
      </div>
    </div>
  </AsideItem>
</template>

<style lang="scss" scoped>
.playlist-likes {
  .item {
    float: left;
    width: 40px;
    height: 40px;
    margin-left: 12px;
    margin-bottom: 12px;
    background-color: #ccc;
    &:nth-child(1),
    &:nth-child(5) {
      margin-left: 0;
    }
  }
}

.relative-recommend {
  .item {
    overflow: hidden;
    height: 50px;
    margin-bottom: 15px;
    .item-avatar {
      float: left;
      width: 50px;
      height: 50px;
      background-color: #ccc;
    }
    .item-info {
      float: left;
      width: 140px;
      margin-left: 10px;
      .info-name,
      .info-creator {
        height: 25px;
        line-height: 25px;
        @include ellipse();
      }
      .info-name {
        font-size: $fontMinL;
        @include hoverText();
      }
      .info-creator {
        color: $titleSub;
        .creator-name {
          margin-left: 5px;
          @include hoverText();
        }
      }
    }
  }
}
</style>
