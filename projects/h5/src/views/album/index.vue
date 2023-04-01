<template>
  <div class="playlist">
    <!-- <base-loading-spinner v-if="loading"
      width="30px"
      height="30px"
      color="rgb(238, 10, 36)"
      itemWidth="8%"
    /> -->

    <div>
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
import { ref, shallowRef, reactive, computed, onMounted, unref, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { ISong, IAlbumDetail } from '@pluto-music/api'
import { usePlayerStore } from '/@/store/module/player'
import { useRequest } from '/@/utils/useRequest'

import SongListPoster from '/@/components/song-list-poster/index.vue'
import SongListContent from '/@/components/song-list-content/index.vue'

const route = useRoute()
const playerStore = usePlayerStore()

const id = computed(() => route.params.id) as ComputedRef<string>

const loading = ref(true)
const detail = reactive<Partial<IAlbumDetail>>({})
const tracks = shallowRef<ISong[]>([])

const initData = async () => {
  // this.loading = true
  const [error, data] = await useRequest('getAlbumDetail')({ id: unref(id) })
  if (error) return
  // this.loading = false
  const { album, songs } = data
  tracks.value = songs
  extractDetail(album)
}

const extractDetail = (data: IAlbumDetail) => {
  detail.artists = data.artists
  detail.name = data.name
  detail.description = data.description
  detail.coverImgUrl = data.picUrl
  detail.publishTime = data.publishTime
  detail.commentCount = data.info.commentCount
  detail.shareCount = data.info.shareCount
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
