<script setup lang="ts">
import type { ISong } from '@pluto-music/api'
import { withDefaults } from 'vue'
import SongItem from '/@/components/song-item/index.vue'
import ListTitle from './components/ListTitle.vue'

interface Props {
  count: number
  collect: number
  tracks: ISong[]
}

withDefaults(defineProps<Props>(), {
  count: 0,
  collect: 0,
  tracks: () => [],
})
</script>

<template>
  <div class="song-list">
    <ListTitle :count="count" :collect="collect" @play-all="$emit('play-all')" />

    <div class="song-list__main">
      <SongItem
        v-for="(song, index) of tracks"
        :key="index"
        :order="index + 1"
        :song="song"
        alia-post
        v-on="$attrs"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.song-list {
  position: relative;
  &__main {
    background-color: #fff;
  }
}
</style>
