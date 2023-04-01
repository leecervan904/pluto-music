<script setup lang="ts">
import type { IMV } from '@pluto-music/api'
import { type PropType } from 'vue'
import { useRouter } from 'vue-router'
import Pagination from '/@/components/base/Pagination.vue'

const router = useRouter()

defineProps({
  mvs: {
    type: Array as PropType<IMV[]>,
    default: () => [],
  },
})

function handleToMv(id: string | number) {
  router.push({
    name: 'mv',
    query: { id },
  })
}
</script>

<template>
  <div class="artist-mv">
    <div class="artist-mv__content">
      <div v-for="mv in mvs" :key="mv.id" class="content-item" @click="handleToMv(mv.id)">
        <div class="content-item__wrapper">
          <img class="img" :src="mv.imgurl16v9" :alt="mv.name" />
        </div>
        <div class="content-item__name">
          <span>{{ mv.name }}</span>
        </div>
      </div>
    </div>

    <Pagination v-bind="$attrs" />
  </div>
</template>

<style lang="scss" scoped>
.artist-mv {
  font-size: 20px;
  &__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .content-item {
      margin-bottom: 20px;
      width: 137px;
      &__wrapper {
        overflow: hidden;
        width: 137px;
        height: 0;
        padding-bottom: 56.25%;
        .img {
          width: 100%;
        }
      }
      &__name {
        margin-top: 5px;
        font-size: 14px;
        @include ellipse;
      }
    }
  }
}
</style>
