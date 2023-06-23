<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import type { IToplistDetailItem } from '@pluto-music/api'
import { bodyWidth, storage, toplistKey, useRequest } from '/@/utils'

import RankListCard from '/@/components/rank-list-card/index.vue'

// 需要展示的排行榜的 id
const ids = [3779629, 2884035, 3778678, 19723756]

const toplist = shallowRef<IToplistDetailItem[]>()

async function initData() {
  if (!storage.has(toplistKey)) {
    const [error, data] = await useRequest('getToplistDetail')()
    if (error)
      return
    const { list } = data
    storage.setItem(toplistKey, list, true, {
      maxAge: 10 * 60 * 1000,
    })
  }
  const data = storage.getItem(toplistKey)
  extractData(data)
}

function extractData(data: IToplistDetailItem[]) {
  toplist.value = data
    .filter(v => ids.includes(v.id as number))
    .map(v => ({
      id: v.id,
      name: v.name,
      coverImgUrl: v.coverImgUrl,
      tracks: v.tracks,
    }))
}

onMounted(() => {
  initData()
})
</script>

<template>
  <section class="hot">
    <h2 class="hot-title">
      <span class="hot-title__item">热歌风向标</span>
    </h2>

    <div class="hot-content">
      <van-swipe
        class="hot-content__swiper"
        :loop="false"
        :width="bodyWidth"
        :show-indicators="false"
        :stop-propagation="false"
      >
        <van-swipe-item v-for="item of toplist" :key="item.id" class="hot-content__item">
          <RankListCard
            v-model:tracks="item.tracks"
            :info="item"
            :cover-img-url="item.coverImgUrl"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';

.hot {
  height: 3rem;
  &-title {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: $font--medium;
    font-weight: 600;
    &__item {
      margin: 0 0.1rem;
    }
  }
  &-content {
    box-sizing: border-box;
    height: 2.5rem;
    &__swiper {
      height: 100%;
    }
    &__item {
      box-sizing: border-box;
      padding: 0.1rem;
    }
  }
}
</style>
