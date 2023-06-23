<script setup lang="ts">
import type { IToplistDetailItem } from '@pluto-music/api'
import { computed, onMounted, reactive, unref } from 'vue'
import { type IRankCate, useRankStore } from '/@/store/module/rank'
import { useRequest } from '/@/utils/useRequest'

import RankMenu from './components/RankMenu.vue'
import RankOfficial from './components/RankOfficial.vue'

const rankStore = useRankStore()

const rank = reactive<Record<keyof IRankCate, Partial<IToplistDetailItem>>>({
  recommend: {},
  official: {},
  special: {},
  global: {},
  region: {},
  style: {},
  other: {},
})

const cate = computed(() => rankStore.cate)

async function initData() {
  // 读取缓存或重新请求数据
  // console.log('In rank: 缓存失效，重新请求 toplist.')
  const [error, data] = await useRequest('getToplistDetail')()
  if (error)
    return
  extractData(data.list)

  // 保存至 localStorage，有效时间为 10 分钟
  // this.$storage.setItem('toplist', list, {
  //   ctime: Date.now(),
  //   maxAge: 10 * 60 * 1000
  // })

  // if (!this.$storage.hasCache('toplist')) {
  // } else {
  //   this.extractData(this.$storage.getItem('toplist').data)
  // }
}

function extractData(data: IToplistDetailItem[]) {
  // 提取数据，保存至 rank
  for (const key in rank) {
    if (rank.hasOwnProperty(key)) {
      rank[key as keyof IRankCate] = data
        .filter(v => unref(cate)[key as keyof IRankCate].includes(v.id as number))
    }
  }
}

onMounted(() => {
  initData()
})
</script>

<template>
  <div ref="container" class="rank">
    <RankMenu title="榜单推荐" :rank="rank.recommend" />
    <RankOfficial title="官方榜" :rank="rank.official" />
    <RankMenu title="特色榜" :rank="rank.special" />
    <RankMenu title="全球榜" :rank="rank.global" />
    <RankMenu title="地区榜" :rank="rank.region" />
    <RankMenu title="曲风榜" :rank="rank.style" />
    <RankMenu title="更多榜单" :rank="rank.other" />
  </div>
</template>

<style lang="scss" scoped>
.rank {
  padding: 0 .1rem 0;
}
</style>
