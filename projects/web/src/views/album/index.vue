<template>
  <div class="album">
    <div v-if="detail" class="content">
      <album-poster :detail="detail" @play-all="handlePalyAll" />
      <album-recommend :desc="detail.desc" />
      <song-list-table :song-list="songList" :show-play-count="false" />
      <Comment :id="albumId" :type="CommentTypeEnum.ALBUM" />
    </div>

    <div class="aside">
      <AsideAlbum :album-likes="albumLikes" :own-albums="ownAlbums" @to-album="handleToAlbum" />
      <AsideDownload />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISong, IAlbumDetail } from '@pluto-music/api'
import { CommentTypeEnum } from '@pluto-music/api'
import { ref, computed, onMounted, watch, unref, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRequest } from '/@/utils'
import { usePlayerStore } from '/@/store/module/player'

import Comment from '/@/components/comment/index.vue'
import SongListTable from '/@/components/base/SongListTable.vue'
import AsideDownload from '/@/components/group/AsideDownload.vue'
import AsideAlbum from '/@/components/group/AsideAlbum.vue'
import AlbumPoster from './components/AlbumPoster.vue'
import AlbumRecommend from './components/AlbumRecommend.vue'

const route = useRoute()
const router = useRouter()
const playerStore = usePlayerStore()

const songList = ref<ISong[]>([]) // 专辑歌曲列表
const detail = ref<IAlbumDetail>() // 专辑详情
const albumLikes = ref([1]) // 边栏参数，喜欢这个专辑的人
const ownAlbums = ref<IAlbumDetail[]>([]) // 边栏参数，Ta 的其他热门专辑
const albumId = computed(() => route.query.id) as unknown as ComputedRef<number>

async function initialData() {
  // 获取专辑信息
  const [error, data] = await useRequest('getAlbumDetail')({ id: unref(albumId) })
  if (error) return
  detail.value = data.album
  songList.value = data.songs

  const [error2, data2] = await useRequest('getAllAlbum')({
    id: unref(detail)!.artists[0].id,
    limit: 4,
  })
  if (error2) return
  ownAlbums.value = data2.hotAlbums
}

function handlePalyAll() {
  playerStore.updatePlaylist(unref(songList), unref(detail)!.id)
}

function handleToAlbum(id: number) {
  router.push({ name: 'album', query: { id } })
}

onMounted(initialData)

watch(albumId, initialData)
</script>

<style lang="scss" scoped>
.album {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  .content {
    box-sizing: border-box;
    width: 710px;
    min-height: $minMainAppHeight;
    padding: 47px 30px 40px 39px;
    border-right: 1px solid $bdcDefault;
  }
  .aside {
    width: 270px;
  }
}
</style>
