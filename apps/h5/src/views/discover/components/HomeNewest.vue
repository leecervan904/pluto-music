<script setup lang="ts">
import { onMounted, ref } from 'vue'

import MultilineSwiper from '/@/components/multiline-swiper/index.vue'
import { formatArtists } from '/@/utils'
import { useRequest } from '/@/utils/useRequest'

const loading = ref(true)
const active = ref('album')
const list = ref([])

async function extractData(type: 'song' | 'album') {
  // this.loading = true
  active.value = type

  // if (this.$storage.hasCache(`home-new-${type}`)) {
  //   const { data } = this.$storage.getItem(`home-new-${type}`)
  //   this.loading = false
  //   this.list = Object.freeze([].concat(data))
  //   return
  // }

  const fn = type === 'song' ? useRequest('getTopSong') : useRequest('getAlbumNewest')

  const [error, data] = await fn()
  if (error)
    return

  let newData
  if (type === 'song')
    newData = data.data
  else
    newData = data.albums

  list.value = newData.slice(0, 9).map((v) => {
    const { id, name, description } = v
    const blurPicUrl
      = type === 'song' ? `${v.album.blurPicUrl}?param=200y200` : `${v.blurPicUrl}?param=200y200`
    const artists = formatArtists(v.artists)
    return { id, name, blurPicUrl, artists, description, type }
  })

  // this.$storage.setItem(`home-new-${type}`, this.list, true, {
  //   maxAge: 5 * 60 * 1000
  // })
}

onMounted(() => {
  extractData('song')
})
</script>

<template>
  <section class="newest">
    <h2 class="newest-title">
      <span
        class="newest-title__item newest-title_album"
        :class="{ bold: active !== 'song' }"
        @click="extractData('album')"
      >新碟</span>
      <span
        class="newest-title__item newest-title__song"
        :class="{ bold: active === 'song' }"
        @click="extractData('song')"
      >新歌</span>
    </h2>

    <MultilineSwiper :list="list" />
  </section>
</template>

<style lang="scss" scoped>
/* @import '/@/styles/variables.scss'; */

.newest {
  height: 2.75rem;
  &-title {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: $font--medium;
    &__item {
      margin: 0 0.1rem;
      &.bold {
        font-weight: bold;
      }
    }
  }
  &-content {
    position: relative;
    height: 100%;
  }
}
</style>
