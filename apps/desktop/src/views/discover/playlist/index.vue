<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import type { IRelativePlaylistItem } from '@pluto-music/api'
import { useRequest } from '/@/utils/useRequest'

import PlaylistCard from '/@/components/playlist-card/index'

const router = useRouter()

const loading = ref(true)
const active = ref('全部')
const playlists = shallowRef<IRelativePlaylistItem[]>([])
const cates = [
  '全部',
  '华语',
  '流行',
  '摇滚',
  '电子',
  '另类/独立',
  '轻音乐',
  '综艺',
  '影视原声',
  'ACG',
]

async function initData(cat: string) {
  loading.value = true
  const [error, data] = await useRequest('getTopPlaylist')({ limit: 16, cat })
  loading.value = false

  if (error)
    return
  playlists.value = data.playlists
}

function handleChange(cat: string) {
  active.value = cat
  initData(cat)
}

function handleToPlaylist(id: number | string) {
  router.push({ name: 'playlist', query: { id } })
}

onMounted(() => {
  initData('全部')
})
</script>

<template>
  <div class="h-30px flex justify-between">
    <div class="flex-1">
      全部歌单
    </div>
    <div class="flex justify-between items-center">
      <span
        v-for="cate in cates"
        :key="cate"
        class="ml-10px cursor-pointer"
        :class="active === cate ? 'text-black' : 'text-#ccc'"
        @click="handleChange(cate)"
      >{{ cate }}</span>
    </div>
  </div>

  <div class="flex flex-wrap justify-between">
    <PlaylistCard
      v-for="playlist in playlists"
      :key="playlist.id"
      class="w-22/100"
      :playlist="playlist"
      @click="handleToPlaylist(playlist.id)"
    />
  </div>
</template>
