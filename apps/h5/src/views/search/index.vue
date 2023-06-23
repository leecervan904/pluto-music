<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SearchGroup from './components/SearchGroup.vue'
import SearchView from './components/SearchView.vue'

interface ITabItem {
  title: string
  name: string
  active: number
  type: number
}

const route = useRoute()
const router = useRouter()

const tabs = ref<ITabItem[]>([
  { title: '综合', name: 'group', active: 1, type: 1018 },
  { title: '单曲', name: 'song', active: 0, type: 1 },
  { title: '歌单', name: 'playlist', active: 0, type: 1000 },
  { title: '歌手', name: 'artist', active: 0, type: 100 },
  { title: '专辑', name: 'album', active: 0, type: 10 },
  /* { title: '歌词', type: 1006 },
  { title: '电台', type: 1009 },
  { title: '用户', type: 1014 } */
])
const active = ref(0)
const loading = ref(true)
const refSwiper = ref<HTMLElement | null>(null)

const keywords = computed({
  get() {
    return route.params.keywords as string
  },
  set(val) {
    router.replace(`/search/${val}`)
  },
})

function handleTabSelect(item: ITabItem) {
  const idx = unref(tabs).findIndex(v => v.title === item.title)
  tabs.value[idx].active = 1
  unref(refSwiper)!.swipeTo(idx)
}
</script>

<template>
  <div class="search-result">
    <van-tabs v-model="active" @click-tab="handleTabSelect">
      <van-tab v-for="tab in tabs" :key="tab.type" :title="tab.title" />
    </van-tabs>

    <div
      :style="{
        overflowY: 'auto',
        height: `calc(100vh - 144px)`,
      }"
    >
      <van-swipe
        ref="refSwiper"
        class="swiper"
        :loop="false"
        :show-indicators="false"
      >
        <van-swipe-item class="swiper-item">
          <keep-alive>
            <SearchGroup v-if="tabs[0].active" v-model:keywords="keywords" @slide-to="handleTabSelect" />
            <div v-else class="loading" />
          </keep-alive>
        </van-swipe-item>

        <van-swipe-item v-for="tab of tabs.slice(1)" class="swiper-item">
          <keep-alive>
            <SearchView v-if="tab.active" :type="tab.name" :keywords="keywords" />
            <div v-else class="loading" />
          </keep-alive>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  &-item {
    box-sizing: border-box;
    padding: 0 .1rem;
    &:nth-child(1) {
      padding: 0 .05rem;
      background-color: #eee;
    }
  }
}

:deep(.van-swipe) {
  overflow-y: auto;
}

:deep(.van-swipe-item) {
  overflow-y: auto;
}
</style>
