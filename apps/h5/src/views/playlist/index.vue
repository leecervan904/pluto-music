<template>
  <div class="playlist">
    <loading-spinner
      v-if="loading"
      width="30px"
      height="30px"
      color="rgb(238, 10, 36)"
      item-width="8%"
    />

    <div v-else>
      <SongListPoster :detail="detail" />
      <SongListContent
        :count="tracks.length"
        :collect="detail.subscribedCount"
        :tracks="tracks"
        @play-song="handlePlaySong"
        @play-all="handleUpdatePlaylist"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, unref, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { ISong, IPlaylist } from '@pluto-music/api'
import { useRequest } from '/@/utils/useRequest'
import { usePlayerStore } from '/@/store/module/player'

import SongListContent from '/@/components/song-list-content/index.vue'
import SongListPoster from '/@/components/song-list-poster/index.vue'

const route = useRoute()
const playerStore = usePlayerStore()

const loading = ref(true)
const tracks = ref<ISong[]>([])
const detail = reactive({
  coverImgUrl: '',
  name: '',
  id: 0,
  updateTime: 0,
  avatarUrl: '',
  nickname: '',
  description: '',
  commentCount: 0,
  shareCount: 0,
  subscribedCount: 0,
})

const id = computed(() => route.params.id) as unknown as ComputedRef<number>

const initData = async () => {
  loading.value = true
  const [error, data] = await useRequest('getPlaylistDetail')({ id: unref(id) })
  loading.value = false

  if (error) return
  const { playlist } = data
  tracks.value = playlist.tracks

  // 未登录时只能获取前 10 首歌曲，需要另发一个请求获取全部歌曲
  // const { tracks: tempTracks, trackIds } = playlist
  // if (trackIds.length > tempTracks.length) {
  //   const [error2, data2] = await useRequest('getSongDetail')({ id: trackIds.map(v => v.id) })
  //   if (error2) return
  //   tracks.value = data2?.songs
  // } else {
  //   tracks.value = playlist.tracks
  // }

  extractDetail(playlist)
}

const extractDetail = (data: IPlaylist) => {
  Object.keys(detail).map((v) => {
    if (data[v]) {
      detail[v] = data[v]
    }
  })
  detail.avatarUrl = data.creator.avatarUrl
  detail.nickname = data.creator.nickname
}

const handlePlaySong = (song: ISong) => {
  playerStore.playSong(song)
}

const handleUpdatePlaylist = () => {
  playerStore.updatePlaylist(unref(tracks), unref(id) as string)
}

onMounted(() => {
  initData()
})
</script>

<style lang="scss">
.playlist {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
</style>
