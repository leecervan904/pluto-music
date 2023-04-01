<template>
  <div class="ranklist">
    <loading-spinner v-if="loading"
      width="30px"
      height="30px"
      color="rgb(238, 10, 36)"
      itemWidth="8%"
    />

    <div v-else>
      <SongListPoster :detail="detail" />
      <SongListContent
        :count="tracks.length"
        :collect="detail.subscribedCount"
        :tracks="tracks"
        @play-song="handlePlaySong"
        @play-all="handleUpdatePlaylist"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, unref } from 'vue'
import { useRoute } from 'vue-router'
import { ISong, IPlaylist } from '@pluto-music/api'
import { useRequest } from '/@/utils/useRequest'
import { usePlayerStore } from '/@/store/module/player'

import SongListPoster from '/@/components/song-list-poster/index.vue'
import SongListContent from '/@/components/song-list-content/index.vue'

const route = useRoute()
const playerStore = usePlayerStore()

const loading = ref(false)
const tracks = ref<ISong[]>([])
const detail = reactive({
  coverImgUrl: '',
  name: '',
  id: '',
  updateTime: 0,
  avatarUrl: '',
  nickname: '',
  description: '',
  commentCount: 0,
  shareCount: 0,
  subscribedCount: 0
})

const id = computed(() => route.params.id)

const getRank = async () => {
  // Todo: 缓存至 storage
  loading.value = true
  const [error, data] = await useRequest('getRankList')({ id: unref(id) })
  loading.value = false

  if (error) return
  console.log(data)
  const { playlist } = data
  // 将 playlist 属性缓存
  // this.$storage.setItem(`toplist-${this.id}`, playlist, true, {
  //   maxAge: 5 * 60 * 1000
  // })
  // if (this.$storage.hasCache(`toplist-${unref(id)}`)) {
  //   playlist = this.$storage.getItem(`toplist-${unref(id)}`).data
  // } else {
  // }
  // this.loading = false
  tracks.value = playlist.tracks
  extractDetail(playlist)
}

const extractDetail = (data: IPlaylist) => {
  Object.keys(detail).map(v => {
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
  getRank()
})
</script>
