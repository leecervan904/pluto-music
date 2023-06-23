<template>
  <div class="album">
    <div class="header">
      <h2 class="header-title">热门新碟</h2>
    </div>
    <div class="content hot">
      <div v-for="(item, i) of newest" :key="i" class="content-item">
        <new-disc-card :album="item" size="lg" tt-size="m" />
      </div>
    </div>
    <div class="header">
      <h2 ref="refAllAlbum" class="header-title">全部新碟</h2>
      <ul class="header-cate">
        <li
          v-for="(item, i) of allCates"
          :key="i"
          class="header-cate-item"
          @click="handleChangeArea(item.area)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="content all">
      <div v-for="(item, i) of newestAll" :key="i" class="content-item">
        <new-disc-card :album="item" size="lg" tt-size="m" />
      </div>
    </div>

    <base-pagination ref="refPagination" :pages="pages" @change-page="handleChangePage" />
  </div>
</template>

<script setup lang="ts">
import type { IAlbumDetail } from '@pluto-music/api'
import type { SimpleAlbum } from './typing'
import { ref, computed, onMounted, unref } from 'vue'
import { useRequest } from '/@/utils'

import BasePagination from '/@/components/base/Pagination.vue'
import NewDiscCard from '/@/components/base/NewDiscCard.vue'

const refPagination = ref<InstanceType<typeof BasePagination> | null>(null)
const refAllAlbum = ref<HTMLElement | null>(null)
const area = ref<string>('ALL')
const allCates = [
  { title: '全部', area: 'ALL' },
  { title: '华语', area: 'ZH' },
  { title: '欧美', area: 'EA' },
  { title: '韩国', area: 'KR' },
  { title: '日本', area: 'JP' },
]
const newest = ref<SimpleAlbum[]>([])
const newestAll = ref<SimpleAlbum[]>([])
const limit = 35
const total = ref(0)
const pages = computed(() => Math.ceil(total.value / limit))

// 提取 albums 的关键数据
function extractAlbums(albums: IAlbumDetail[]): SimpleAlbum[] {
  return albums.map((v) => ({
    name: v.name,
    picUrl: `${v.picUrl}?param=130x130`,
    id: v.id,
    artists: v.artists,
  }))
}

// 热门新碟
async function getNewestData() {
  const [error, data] = await useRequest('getAlbumNewest')()
  if (error) return
  newest.value = extractAlbums(data.albums.slice(0, 10))
}

// 全部热门新碟
async function getAlbumNewData(page = 1) {
  const [error, data] = await useRequest('getTopAlbum')({
    limit,
    offset: (page - 1) * limit,
    area: unref(area),
  })
  if (error) return
  newestAll.value = extractAlbums(data.albums)
  total.value = data.total
}

async function getInitialData() {
  getNewestData()
  getAlbumNewData()
}

function handleChangeArea(val: string) {
  refPagination.value!.resetPage()
  area.value = val
  getAlbumNewData()
}

async function handleChangePage(page: number) {
  await getAlbumNewData(page)
  refAllAlbum.value!.scrollIntoView({ behavior: 'smooth' })
}

onMounted(getInitialData)
</script>

<style lang="scss" scoped>
.album {
  box-sizing: border-box;
  padding: 40px;
  .header {
    height: 42px;
    line-height: 42px;
    border-bottom: 2px solid $bdcTitle;
    .header-title {
      float: left;
      font-size: $fontLarge;
    }
    .header-cate {
      float: left;
      margin-left: 20px;
      margin-top: 5px;
      font-size: $fontMin;
      color: $inputInfo;
      .header-cate-item {
        float: left;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
        &:nth-child(even) {
          margin: 0 10px;
        }
      }
    }
  }
  .content {
    overflow: hidden;
    margin-top: 20px;
    .content-item {
      float: left;
      margin: 0 27px 20px 0;
    }
  }
}
</style>
