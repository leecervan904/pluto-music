<script setup lang="ts">
// import  from '@pluto-music/stencil/'
import type { IRelativePlaylistItem } from '@pluto-music/api'
import { shallowRef, onMounted } from 'vue'
import { useRequest } from '/@/utils'

const playlists = shallowRef<IRelativePlaylistItem[]>([])
// import { MyComponent } from '@pluto-music/vue-library/lib/components'
async function initData() {
  const [error, data] = await useRequest('getTopPlaylist')({})
  if (error) return
  playlists.value = data.playlists
}

function handleToPlaylist(e) {
  console.log(e)
}

onMounted(() => {
  initData()
})
</script>

<template>
  <div>
    <h1>test</h1>
    <div class="content">
      <my-component
        v-for="playlist in playlists"
        :key="playlist.id"
        :playlist="playlist"
        @to-playlist="handleToPlaylist"
      ></my-component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
}
</style>
