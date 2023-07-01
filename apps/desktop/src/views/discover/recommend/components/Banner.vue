<script setup lang="ts">
import type { IBannerItem } from '@pluto-music/api'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRequest } from '/@/utils/useRequest'

const router = useRouter()

const banners = ref<IBannerItem[]>([])

async function initData() {
  const [error, data] = await useRequest('getBanner')()
  if (error) {
    console.log(error)
    return
  }
  banners.value = data.banners
}

function handleClick(item: IBannerItem) {
  if (item.url)
    return window.open(item.url as string)

  if (item.song) {
    // return this.$store.dispatch('player/changeSong', { song: item.song })
  }

  if (item.encodeId)
    return router.push(`/album/${item.encodeId}`)
}

onMounted(() => {
  initData()
})
</script>

<template>
  <a-carousel autoplay>
    <div v-for="item in banners" :key="item.pic" @click="handleClick(item)">
      <div class="overflow-hidden w-full h-0 pb-35/100 rounded-10px">
        <img class="w-full rounded-10px" :src="item.pic" :alt="item.pic">
      </div>
    </div>
  </a-carousel>
</template>
