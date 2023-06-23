<script setup lang="ts">
import type { IAlbumDetail } from '@pluto-music/api'
import { PropType } from 'vue'
import NewDiscCard from '/@/components/base/NewDiscCard.vue'
import Pagination from '/@/components/base/Pagination.vue'

defineProps({
  albums: {
    type: Array as PropType<IAlbumDetail[]>,
    default: () => [],
  },
})
</script>

<template>
  <div class="album">
    <div class="album-content">
      <NewDiscCard
        v-for="album of albums"
        :key="album.id"
        class="album-content__item"
        :album="album"
        size="lg"
      />
    </div>

    <Pagination v-bind="$attrs" />
  </div>
</template>

<style lang="scss" scoped>
.album {
  &-content {
    flex-wrap: wrap;
    justify-content: space-between;
    display: flex;
    &__item {
    }
  }
}
</style>
