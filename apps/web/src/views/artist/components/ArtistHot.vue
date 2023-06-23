<script setup lang="ts">
import type { PropType } from 'vue'
import type { ISong } from '@pluto-music/api'
import SongListTable from '/@/components/base/SongListTable.vue'

defineProps({
  songList: {
    type: Array as PropType<ISong[]>,
    default: () => [],
  },
})
</script>

<template>
  <div>
    <SongListTable :song-list="songList" :show-play-count="false" />
  </div>
</template>

<style lang="scss" scoped></style>
