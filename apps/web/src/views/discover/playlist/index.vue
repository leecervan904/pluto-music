<template>
  <div class="playlist">
    <div class="header">
      <h2 class="header-title">{{ cate }}</h2>
      <div ref="refSelect" class="header-category" @click="toggleShowCategory">
        <span class="header-category-name">选择分类</span>
        <i class="playlist__down-arrow-icon"></i>
      </div>
      <div class="playlist__header-hot">热门</div>
    </div>
    <!-- 歌单分类组件 -->
    <playlist-category
      v-show="showCategory"
      ref="refCategory"
      :categories="categories"
      :cate="cate"
      @hide-category="hideCategory"
    />
    <!-- 内容区域 -->
    <div class="content">
      <playlist-card
        v-for="(item, i) of playlists"
        :key="i"
        class="item"
        :info="item"
        title-ellipsis
      >
        <p class="slot-creator">
          <em class="creator-by">by</em>
          <a class="creator-name" @click="handleShowAbout()">{{ item.creator.nickname }}</a>
        </p>
      </playlist-card>
    </div>

    <base-pagination :pages="pages" @change-page="handleChangePage" />
  </div>
</template>

<script setup lang="ts">
// TODO: 封装一个 useClickOutside
import { ref, computed, watch, onMounted, onUnmounted, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { useRequest, addSeparator, boxOffsetLeft, boxOffsetTop, isChild } from '/@/utils'

import PlaylistCard from '/@/components/base/PlaylistCard.vue'
import BasePagination from '/@/components/base/Pagination.vue'
import PlaylistCategory from './components/PlaylistCategory.vue'
import type { GetPlaylistCatlistResult, IRelativePlaylistItem } from '@pluto-music/api'
import type { ICategoryItem } from './typing'

// 将得到的分类信息格式化
function toClassify(cate: GetPlaylistCatlistResult) {
  const { sub } = cate
  const ret = Object.values(cate.categories).map((v, i) => {
    let subs = sub.filter((sv) => sv.category === i).map((smv) => smv.name)
    subs = addSeparator(subs)
    return { name: v, subs }
  })
  return ret
}

const route = useRoute()

const refSelect = ref<HTMLElement | null>(null)
const refCategory = ref<InstanceType<typeof PlaylistCategory> | null>(null)
const categories = ref<ICategoryItem[]>([])
const playlists = ref<IRelativePlaylistItem[]>([])
const cate = computed(() => route.query.cate || '全部') as unknown as ComputedRef<string>

const showCategory = ref(false) // 显示分类
// titleEllipsis: true // 歌单组件参数，单行标题
const total = ref(0)
const pages = computed(() => Math.ceil(total.value / limit)) // 歌单页数
const limit = 35 // 每页的歌单总数/偏移
const isOuterArea = ref(false) // 确保只对 outerArea 求值一次
const outerArea = ref({
  // 分类组件的坐标区间
  rangeX: [0, 0],
  rangeY: [0, 0],
})

async function initialData() {
  // 获取歌单分类信息
  const [error, data] = await useRequest('getPlaylistCatlist')()
  if (error) return
  categories.value = toClassify(data)
}

async function getPlaylists(page = 1) {
  const [error, data] = await useRequest('getTopPlaylist')({
    cat: cate.value,
    offset: (page - 1) * limit,
    limit,
  })
  if (error) return
  playlists.value = data.playlists
  total.value = data.total
}

function getOuterArea() {
  const cate = refCategory.value!.$el
  // bug：修改了 showCategory 为 true后，组件的 display 属性依然为 none
  // 解决方法为手动设置其 display 属性为 block
  cate.style.display = 'block'
  const offsetX = boxOffsetLeft(cate)
  const offsetY = boxOffsetTop(cate)
  const width = cate.clientWidth
  const height = cate.clientHeight
  outerArea.value['rangeX'] = [offsetX, offsetX + width]
  outerArea.value['rangeY'] = [offsetY, offsetY + height]
  isOuterArea.value = true
}

function toggleShowCategory() {
  showCategory.value = !showCategory.value
  // 确保 outerArea 只会求值一次
  if (!isOuterArea.value && showCategory.value) {
    console.log('calculating outerArea.')
    getOuterArea()
  }
}

// 隐藏歌单分类选项
function hideCategory() {
  showCategory.value = false
}

function handleClickOuter(event: MouseEvent) {
  // 歌单分类未打开时
  if (!showCategory.value) {
    return
  }
  // 点击了选择分类按钮时
  if (isChild(refSelect.value!, event.target as HTMLElement)) {
    return
  }
  // 点击区域在 outerArea 外时
  const ex = event.pageX
  const ey = event.pageY
  if (
    ex < outerArea.value.rangeX[0] ||
    ex > outerArea.value.rangeX[1] ||
    ey < outerArea.value.rangeY[0] ||
    ey > outerArea.value.rangeY[1]
  ) {
    console.log('hide category...')
    hideCategory()
  }
}

// 切换页码时
async function handleChangePage(page: number) {
  await getPlaylists(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleShowAbout() {
  // this.$store.commit('SHOW_ABOUT_SITE')
}

onMounted(async () => {
  await initialData()
  await getPlaylists()
  // 添加全局事件监听(事件捕获)，这样不会阻止歌单的点击
  window.addEventListener('click', handleClickOuter, true)
})
onUnmounted(() => {
  // 删除全局事件监听
  window.removeEventListener('click', handleClickOuter, true)
})

watch(cate, () => {
  getPlaylists()
})
</script>

<style lang="scss" scoped>
.playlist {
  position: relative;
  padding: 40px;
  .header {
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid $bdcTitle;
    .header-title {
      float: left;
      height: 40px;
      font-size: $fontLarge;
    }
    .header-category {
      float: left;
      height: 26px;
      margin-top: 4px;
      margin-left: 10px;
      padding: 0 10px;
      line-height: 26px;
      border: 2px solid $bdcDefault;
      border-radius: 5px;
      font-size: $fontMin;
      @include hoverText();
      .header-category-name {
        color: $textLinkBlue;
      }
      .playlist__down-arrow-icon {
        float: right;
        width: 8px;
        height: 5px;
        margin-left: 5px;
        margin-top: 10px;
      }
    }
    .playlist__header-hot {
      float: right;
      margin-top: 2px;
      width: 46px;
      height: 29px;
      border-radius: 3px;
      line-height: 29px;
      text-align: center;
      font-size: $fontMin;
      color: $textLight;
    }
  }
  .content {
    overflow: hidden;
    .item {
      float: left;
      margin-left: 50px;
      margin-top: 30px;
      &:nth-child(5n + 1) {
        margin-left: 0;
      }
      .slot-creator {
        font-size: $fontMin;
        @include ellipse();
        .creator-by {
          margin-right: 5px;
          color: $titleDivide;
        }
        .creator-name {
          color: $titleMore;
        }
      }
    }
  }
}
</style>
