<template>
  <van-swipe
    class="swiper"
    :style="{ height: `${bodyWidth * 0.39}px` }"
    :autoplay="3000"
    indicator-color="#dd001b"
  >
    <van-swipe-item
      v-for="(item, index) of banners"
      :key="index"
      class="swiper-item"
      @click.stop="handleClick(item)"
    >
      <img laze-render :src="item.pic" :alt="item.typeTitle" />
      <span class="item-tag" :style="{ background: item.titleColor }">{{ item.typeTitle }}</span>
    </van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
import type { IBannerItem } from '@pluto-music/api/src/index.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRequest } from '/@/utils/useRequest'

const router = useRouter()

const banners = ref<IBannerItem[]>([])

const bodyWidth = document.body.clientWidth

const initData = async () => {
  const [error, data] = await useRequest('getBanner')()
  if (error) {
    console.log(error)
    return
  }
  banners.value = data.banners
}

const handleClick = (item: IBannerItem) => {
  if (item.url) {
    return window.open(item.url as string)
  }

  if (item.song) {
    // return this.$store.dispatch('player/changeSong', { song: item.song })
  }

  if (item.encodeId) {
    return router.push(`/album/${item.encodeId}`)
  }
}

onMounted(() => {
  // console.log('mounted')
  initData()
})
</script>

<style lang="scss" scoped>
/* 使用了两层 padding-bottom 为图片占位，并保证容器的高度 */
.swiper {
  overflow: hidden;
  width: 100%;
  /* height: 0; */
  /* padding-bottom: 39%; */
  &-item {
    overflow: hidden;
    width: 100%;
    /* height: 0; */
    /* 这个 3.9% 有待理解 */
    /* padding-bottom: 3.9%; */
    /* padding-bottom: 12%; */
    box-sizing: border-box;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    border-radius: 0.1rem;
    img {
      width: 100%;
      border-radius: 0.1rem;
    }
    .item-tag {
      position: absolute;
      right: 0.1rem;
      bottom: 0.08rem;
      padding: 0.03rem 0.06rem;
      color: #fff;
      font-size: 12px;
      background-color: #32d3ff;
      border-radius: 0.1rem 0 / 0.1rem 0;
    }
  }
}
</style>
