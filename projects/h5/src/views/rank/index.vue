<template>
  <div class="rank" ref="container">
    <rank-menu title="榜单推荐" :rank="rank.recommend" />
    <rank-official title="官方榜" :rank="rank.official" />
    <rank-menu title="特色榜" :rank="rank.special" />
    <rank-menu title="全球榜" :rank="rank.global" />
    <rank-menu title="地区榜" :rank="rank.region" />
    <rank-menu title="曲风榜" :rank="rank.style" />
    <rank-menu title="更多榜单" :rank="rank.other" />
  </div>
</template>

<script setup lang="ts">
import type { IToplistDetailItem } from '@pluto-music/api'
import { reactive, computed, onMounted, unref } from 'vue'
import { useRankStore, type IRankCate } from '/@/store/module/rank'
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

const initData = async () => {
  // 读取缓存或重新请求数据
  // console.log('In rank: 缓存失效，重新请求 toplist.')
  const [error, data] = await useRequest('getToplistDetail')()
  if (error) return
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

const extractData = (data: IToplistDetailItem[]) => {
  // 提取数据，保存至 rank
  for (const key in rank) {
    if (rank.hasOwnProperty(key)) {
      rank[key as keyof IRankCate] = data
        .filter(v => unref(cate)[key  as keyof IRankCate].includes(v.id as number))
    }
  }
}

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.rank {
  padding: 0 .1rem 0;
}
</style>
