<script setup lang="ts">
import type { ISong } from '@pluto-music/api'
import { ref, shallowRef } from 'vue'
import { pick } from 'lodash-es'
import { onLoad } from '@dcloudio/uni-app'
import { useRequest } from '/@/utils'

import SongListPoster from '/@/components/song-list-poster/index.vue'
import type { PlaylistDetail } from '/@/components/song-list-poster/typing'
import SongListContent from '/@/components/song-list-content/index.vue'

const tracks = shallowRef<ISong[]>([])
const detail = ref<Partial<PlaylistDetail>>({})

async function getPlaylistDetail(id: string) {
  const [error, data] = await useRequest('getPlaylistDetail')({ id })
  if (error) return
  detail.value = pick<PlaylistDetail>(
    data.playlist,
    'id',
    'name',
    'description',
    'trackCount',
    'playCount',
    'coverImgUrl',
  )
  getSongsDetail(data.playlist.trackIds.map((v) => v.id))
}

async function getSongsDetail(id: Array<string | number>) {
  const [error, data] = await useRequest('getSongDetail')({ id })
  if (error) return
  tracks.value = data.songs
}

onLoad((option: any) => {
  getPlaylistDetail(option.id)
})
</script>

<template>
  <view class="playlist">
    <view
      class="playlist-mask"
      :style="{ background: `url(${detail?.coverImgUrl}) no-repeat center` }"
    ></view>

    <SongListPoster :detail="detail" />
    <SongListContent :tracks="tracks" />
  </view>
</template>

<style lang="scss" scoped>
.playlist {
  position: relative;
  &-mask {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(50px);
  }
  &-content {
    &__item {
      display: flex;
    }
  }
}
</style>
