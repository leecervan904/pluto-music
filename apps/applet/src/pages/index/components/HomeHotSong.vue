<script setup lang="ts">
import { shallowRef, onMounted, unref } from 'vue'
import { IToplistDetailItem } from '@pluto-music/api/src/index.js'
import { useRequest, storage, toplistKey, bodyWidth } from '/@/utils'

import RankListCard from '/@/components/rank-list-card/index.vue'

// 需要展示的排行榜的 id
const ids = [3779629, 2884035, 3778678, 19723756]

const toplist = shallowRef<IToplistDetailItem[]>()

const initData = async () => {
  if (!storage.has(toplistKey)) {
    const [error, data] = await useRequest('getToplistDetail')()
    if (error) return
    const { list } = data
    storage.setItem(toplistKey, list, true, {
      maxAge: 10 * 60 * 1000,
    })
    extractData(list)
  } else {
    const data = storage.getItem(toplistKey)
    extractData(data)
  }
}

const extractData = (data: IToplistDetailItem[]) => {
  toplist.value = data
    .filter(v => ids.includes(v.id))
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
      <van-swipe class="hot-content__swiper"
        :loop="false"
        :width="bodyWidth"
        :show-indicators="false"
        :stop-propagation="false">
        <van-swipe-item class="hot-content__item" v-for="item of toplist" :key="item.id">
          <rank-list-card
            :info="item"
            :coverImgUrl="item.coverImgUrl"
            :tracks.sync="item.tracks"
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
    height: .5rem;
    line-height: .5rem;
    font-size: $font--medium;
    font-weight: 600;
    &__item {
      margin: 0 .1rem;
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
      padding: .1rem;
    }
  }
}
</style>
