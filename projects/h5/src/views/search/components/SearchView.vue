<template>
  <div class="s-al">
    <!-- fixed: 使用 index 保证 key 唯一 -->
    <component
      :is="componentItem"
      v-for="item of list"
      :[type]=item
      @play-song="playSong"
    />

    <div class="pullup-tips" v-show="hasMore">
      <LoadingSpinner v-show="loading"
        width="30px"
        height="30px"
        color="rgb(238, 10, 36)"
        itemWidth="8%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, unref } from 'vue'
import { SearchTypeEnum } from '@pluto-music/api'
import { useRequest } from '/@/utils'
import { upper, upperFirst, sleep } from '/@/utils'

import SongItem from '/@/components/song-item/index.vue'
import PlaylistItem from './SearchPlaylistItem.vue'
import ArtistItem from './SearchArtistItem.vue'
import AlbumItem from './SearchAlbumItem.vue'

const comp = {
  SongItem,
  PlaylistItem,
  ArtistItem,
  AlbumItem,
}

const props = defineProps({
  type: {
    type: String,
    required: true,
    validate: (val: string) => ['song', 'playlist', 'artist', 'album'].includes(val)
  },
  keywords: { type: String, require: true }
})

const loading = ref(false) // 是否正在加载
const count = ref(0) // 可以加载的总数
const list = ref([]) // 当前加载的列表

const hasMore = computed(() => unref(count) === 0 ? true : unref(list).length < unref(count))
const componentItem = computed(() => comp[upperFirst(props.type) + 'Item'])

const initData = async () => {
  loading.value = true
  const [error, data] = await useRequest('getSearch')({
    type: SearchTypeEnum[upper(props.type)],
    limit: 20,
    offset: unref(list).length,
    keywords: props.keywords
  })
  await sleep(2000)
  loading.value = false

  if (error) return
  // 冻结属性，提高性能
  const appendList = data.result[`${props.type}s`].map(v => Object.freeze(v))
  list.value = appendList
  count.value = data.result[`${props.type}Count`]
}

const playSong = (song) => {
  // this.$store.dispatch('player/changeSong', { song })
}

onMounted(() => {
  initData()
})

watch(
  () => props.keywords,
  () => {
    loading.value = true
    count.value = 0
    list.value = []
    initData()
  }
)
</script>

<style lang="scss">
.scroll-wrapper {
  overflow: hidden;
  height: calc(100vh - 1.44rem);
  height: calc(var(--vh, 1vh) * 100 - 1.44rem);
}

.pullup-tips {
  box-sizing: border-box;
  height: .5rem;
  padding: .1rem 0;
  /* background-color: #ccc; */
}
</style>
