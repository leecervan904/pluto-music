<script setup lang="ts">
import type { IRelativePlaylistItem, ISong } from '@pluto-music/api'
import { CommentTypeEnum } from '@pluto-music/api'
import { type ComputedRef, computed, onMounted, ref, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRequest } from '/@/utils'
import { usePlayerStore } from '/@/store/module/player'

import Comment from '/@/components/comment/index.vue'
import AsideDownload from '/@/components/group/AsideDownload.vue'
import AsideSong from '/@/components/group/AsideSong.vue'
import SongAlbum from './components/SongAlbum.vue'
import SongPoster from './components/SongPoster.vue'
import SongLyric from './components/SongLyric.vue'

const route = useRoute()
const router = useRouter()
const playerStore = usePlayerStore()

const songId = computed(() => route.query.id) as unknown as ComputedRef<number>

const detail = ref<ISong>() // 歌曲详情
const lyric = ref('') // 歌词
const relativePlaylist = ref<IRelativePlaylistItem[]>([]) // 边栏参数，相似歌单
const similarSong = ref<ISong[]>([]) // 边栏参数，相似歌曲

async function initialData() {
  // 获取歌曲信息
  const [error, data] = await useRequest('getSongDetail')({ id: unref(songId) })
  if (error)
    return
  detail.value = data.songs[0]

  // 获取歌词
  const [error2, data2] = await useRequest('getLyric')({ id: unref(songId) })
  if (error2)
    return
  lyric.value = data2.lrc.lyric

  // 获取相似歌单
  const [error3, data3] = await useRequest('getSimPlaylist')({ id: unref(songId) })
  if (error3)
    return
  relativePlaylist.value = data3.playlists

  // 获取相似音乐
  const [error4, data4] = await useRequest('getSimSong')({ id: unref(songId) })
  if (error4)
    return
  similarSong.value = data4.songs
}

function handleToArtist(id: string | number) {
  router.push({ path: '/artist', query: { id } })
}

function handleToAlbum(id: number | string) {
  router.push({ path: '/album', query: { id } })
}

function handleToSong(id: number | string) {
  router.push({ path: '/song', query: { id } })
}

function handleToPlaylist(id: number | string) {
  router.push({ path: '/playlist', query: { id } })
}

function handlePlay(song: ISong) {
  console.log(song)
  playerStore.playSong(song || songId.value)
}

watch(songId, initialData)

onMounted(initialData)
</script>

<template>
  <div class="song">
    <div v-if="detail" class="content">
      <div class="main">
        <SongAlbum :al="detail.al" />
        <div class="main-info">
          <SongPoster
            :detail="detail"
            @play="handlePlay"
            @to-artist="handleToArtist"
            @to-album="handleToAlbum"
          />
          <SongLyric :lyric="lyric" />
        </div>
      </div>
      <Comment :id="songId" :type="CommentTypeEnum.SONG" />
    </div>

    <div class="aside">
      <AsideSong
        :relative-playlist="relativePlaylist"
        :similar-song="similarSong"
        @to-song="handleToSong"
        @to-playlist="handleToPlaylist"
        @play-song="handlePlay"
      />
      <AsideDownload />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.song {
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  .content {
    box-sizing: border-box;
    width: 710px;
    min-height: $minMainAppHeight;
    padding: 40px 30px;
    border-right: 1px solid $bdcDefault;
    .main {
      overflow: auto;
      .main-info {
        float: left;
        width: 415px;
        margin-left: 25px;
        font-size: $fontMin;
      }
    }
  }
  .aside {
    width: 270px;
  }
}
</style>
