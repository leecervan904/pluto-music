<script setup lang="ts">
import { GetTopPlaylistParams, GetRelatedPlaylistParamsOrderType } from '@pluto-music/api'
import { ref, shallowRef, onMounted } from 'vue'
import { pick } from 'lodash-es'
import { useRequest } from '/@/utils'

import PlaylistCard, { PlaylistItem } from '/@/components/playlist-card/index'

const loading = ref(false)
const activePlaylist = shallowRef<PlaylistItem[]>([])

const initData = async (params: GetTopPlaylistParams) => {
  loading.value = true
  const [error, data] = await useRequest('getTopPlaylist')(params)
  loading.value = false

  if (error) return
  activePlaylist.value = data.playlists.map((item) => {
    return pick(item, ['id', 'description', 'coverImgUrl', 'name', 'playCount'])
  })
}

onMounted(() => {
  initData({ order: GetRelatedPlaylistParamsOrderType.HOT, limit: 10 })
})
</script>

<template>
  <div class="px-20px">
    <div class="h-50px lh-50px">推荐歌单</div>

    <div class="flex flex-row flex-wrap justify-between">
      <PlaylistCard
        v-for="playlist in activePlaylist"
        :key="playlist.id"
        class="w-18/100"
        :playlist="playlist"
      />
    </div>
  </div>
</template>
