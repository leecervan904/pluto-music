<script setup lang="ts">
import type {
  ICollectPlaylistSubscriber,
  IPlaylist,
  IRelativePlaylistItem,
  ISong,
} from '@pluto-music/api'
import { CommentTypeEnum } from '@pluto-music/api'
import { type ComputedRef, computed, onMounted, ref, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRequest } from '/@/utils'
import { usePlayerStore } from '/@/store/module/player'

import AsidePlaylist from '/@/components/group/AsidePlaylist.vue'
import AsideDownload from '/@/components/group/AsideDownload.vue'
import SongListTable from '/@/components/base/SongListTable.vue'
import Comment from '/@/components/comment/index.vue'
import PlaylistPoster from './components/PlaylistPoster.vue'

const route = useRoute()
const router = useRouter()
const playerStore = usePlayerStore()

const detail = ref<IPlaylist>()
const songList = ref<ISong[]>([]) // 歌单的所有歌曲
const playlistLikes = ref<ICollectPlaylistSubscriber[]>([]) // 边栏参数，喜欢歌单的人
const relativeRecommend = ref<IRelativePlaylistItem[]>([]) // 边栏参数，相关歌单推荐

const playlistId = computed(() => route.query.id) as unknown as ComputedRef<number>

async function initialData() {
  const [error, data] = await useRequest('getPlaylistDetail')({ id: unref(playlistId) })
  if (error)
    return
  detail.value = data.playlist
  songList.value = data.playlist.tracks

  const [error2, data2] = await useRequest('getCollectPlaylistUsers')({
    id: unref(playlistId),
    limit: 8,
  })
  if (error2)
    return
  playlistLikes.value = data2.subscribers

  const [error3, data3] = await useRequest('getRelatedPlaylist')({ id: unref(playlistId) })
  if (error3)
    return
  relativeRecommend.value = data3.playlists
}

function handlePlayAll() {
  playerStore.updatePlaylist(songList.value, playlistId.value)
}

function handleToPlaylist(id: number | string) {
  router.push({ name: 'playlist', query: { id } })
}

onMounted(initialData)

watch(playlistId, initialData)
</script>

<template>
  <div class="playlist">
    <div v-if="detail" class="content">
      <PlaylistPoster :detail="detail" @play-all="handlePlayAll" />
      <SongListTable
        :song-list="songList"
        :show-album="true"
        :track-count="detail.trackCount"
        :play-count="detail.playCount"
      />
      <Comment :id="playlistId" :type="CommentTypeEnum.PLAYLIST" />
    </div>

    <div class="aside">
      <AsidePlaylist
        :playlist-likes="playlistLikes"
        :relative-recommend="relativeRecommend"
        @to-playlist="handleToPlaylist"
      />
      <AsideDownload />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playlist {
  overflow: hidden;
  display: flex;
  .content {
    box-sizing: border-box;
    width: 710px;
    min-height: $minMainAppHeight;
    padding: 40px 30px;
    border-right: 1px solid $bdcDefault;
  }
  .aside {
    width: 270px;
  }
}
</style>
