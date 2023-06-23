<template>
  <div>
    <recycle-scroller class="playlist-scroller"
      ref="refScroller"
      :items="playlists"
      :item-size="itemSize"
      :buffer="600"
      key-filed="id"
      page-mode
      emit-update
      @resize="onResize"
      @update="onUpdate">

      <template v-slot="{ item }">
        <div class="playlist-row">
          <PlaylistItem class="playlist-item"
            v-for="(cell, index) of item.list" :key="index"
            :width="itemWidth + 'px'"
            :id="cell.id"
            :img="cell.coverImgUrl"
            :playcount="cell.playCount"
            :desc="cell.description"/>
        </div>
      </template>

      <template #after>
        <LoadingSpinner v-show="loading"
          width="30px"
          height="30px"
          color="rgb(238, 10, 36)"
          itemWidth="8%"/>
        <div v-if="!loading && !hasMore"
          class="playlist-nomore">
          <p>没有更多数据了</p>
        </div>
      </template>
    </recycle-scroller>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, unref } from 'vue'
import { useRequest } from '/@/utils/useRequest'

import PlaylistItem from '/@/components/playlist-item/index.vue'
import LoadingSpinner from '/@/components/loading-spinner/index.vue'

const props = defineProps({
  cat: { type: String, default: '' }
})

const loading = ref(true)
const cache = ref([]) // 所有歌单
const playlists = ref([]) // 以 3 个为一组的二维数组
const hasMore = ref(true) // 是否还有更多的数据可以请求

const limit = 30 // 每次请求加载的数据
const threshold = 200 // 距离底部的阈值，此时将触发一次数据的请求(由于 update 事件的触发间隔较大，建议此值不要小于 itemSize)
const bodyWidth = document.body.clientWidth
const itemWidth = bodyWidth * 0.3
const itemSize = itemWidth * 1.5

const refScroller = ref<HTMLElement | null>(null)

const onUpdate = (start, end) => {
  const scrollTop = unref(refScroller)?.getScroll?.()?.end
  if (unref(hasMore) &&
      !unref(loading) && // 保证仅触发一次
      scrollTop > 1000 && // 该事件会自动刷新一次，设置一个阈值判定当滚动后才触发
      scrollTop + threshold >= itemSize * unref(playlists).length
  ) {
    console.log('scrollTop is %d, now to fetch data...', scrollTop)
    getPlaylist(props.cat, unref(cache).length)
  }
}

const onResize = () => {
  console.log('size change, now size: ', unref(cache).length)
}
// 每行 3 个歌单，需要将数据拆分为对象数组
const to3ColList = (playlists) => {
  const ret = []
  for (let i = 0, l = playlists.length; i < l; i += 3) {
    const list = playlists.slice(i, i + 3)
    ret.push({ list, id: i })
  }
  return ret
}

const getPlaylist = (cat: string) => {
  loading.value = true
  setTimeout(async () => {
    const [error, data] = await useRequest('getTopPlaylist')({
      cat,
      limit,
      offset: unref(cache).length
    })
    if (error) {
      loading.value = false
      // this.$toast.fail({
      //   text: '数据加载错误!'
      // })
      return
    }

    hasMore.value = data.more
    cache.value = data.playlists
    playlists.value = to3ColList(cache.value)
    loading.value = false
  }, 500)
}

onMounted(() => {
  getPlaylist(props.cat)
})
</script>

<style lang="scss" scoped>
.playlist {
  &-scroller {
    width: 100%;
    height: 100%;
  }
  &-row {
    display: flex;
    justify-content: space-between;
  }
  &-nomore {
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    font-size: 14px;
    color: #ccc;
  }
}
</style>
