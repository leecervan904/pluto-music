<template>
  <view class="discover">
    <view class="discover"> discover </view>

    <view class="discover-playlist">
      <PlaylistItem
        v-for="playlist in activePlaylist"
        :id="playlist.id"
        :key="playlist.id"
        class="discover-playlist__item"
        :img="playlist.coverImgUrl"
        :playcount="playlist.playCount"
        :desc="playlist.description"
        :width="`${750 * 0.3}rpx`"
        @to-playlist="handleToPlaylist"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { GetTopPlaylistParams, IRelativePlaylistItem } from '@pluto-music/api'
import { GetRelatedPlaylistParamsOrderType } from '@pluto-music/api'

import { shallowRef, onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '/@/store/module/layout'
import { useRequest } from '/@/utils'

import PlaylistItem from '/@/components/playlist-item/index.vue'

const { showMiniPlayer } = storeToRefs(useLayoutStore())

const activePlaylist = shallowRef<IRelativePlaylistItem[]>([])

const initData = async (params: GetTopPlaylistParams) => {
  // console.log(params)
  const [error, data] = await useRequest('getTopPlaylist')(params)

  if (error) return
  activePlaylist.value = data.playlists
}

const handleToPlaylist = (id: string) => {
  uni.navigateTo({ url: `/pages/playlist/index?id=${id}` })
}

watchEffect(() => {
  console.log(activePlaylist.value)
})

onMounted(() => {
  initData({ order: GetRelatedPlaylistParamsOrderType.HOT })
})
</script>

<style lang="scss" scoped>
.discover {
  padding: 0 10px;
  &-title {
    height: 30px;
    line-height: 30px;
    font-size: bold;
  }
  &-playlist {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    &__item {
      /* margin-right: 10px; */
      margin-bottom: 10px;
    }
  }
}
</style>
