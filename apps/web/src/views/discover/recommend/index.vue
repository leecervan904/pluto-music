<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '/@/store/module/common'

import AsideDownload from '/@/components/group/AsideDownload.vue'
import AsideRecommend from '/@/components/group/AsideRecommend.vue'
import HomeCarousel from './components/HomeCarousel.vue'
import HotCategory from './components/HotCategory.vue'
import NewCategory from './components/NewCategory.vue'
import BillCategory from './components/BillCategory.vue'

const commonStore = useCommonStore()

const { homeSinger, homeHoster } = storeToRefs(commonStore)
const currentMask = ref('')
</script>

<template>
  <div class="recommend">
    <div class="carousel-mask" :style="{ background: `url(${currentMask}) repeat-x center` }" />
    <HomeCarousel v-model:current-mask="currentMask" class="carousel" />

    <div class="content">
      <div class="content-left">
        <HotCategory />
        <NewCategory />
        <BillCategory />
      </div>

      <div class="content-right">
        <AsideRecommend login-info :in-singers="homeSinger" :hot-players="homeHoster" />
        <AsideDownload />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommend {
  /* position: relative; */
  .carousel {
    width: 100%;
    height: 285px;
  }
  .carousel-mask {
    /* z-index: 0; */
    overflow: hidden;
    position: absolute;
    top: $headerHeight;
    left: 0;
    right: 0;
    height: 285px;
    filter: blur(50px);
  }
  .content {
    box-sizing: border-box;
    overflow: hidden;
    .content-left {
      box-sizing: border-box;
      float: left;
      width: 730px;
      padding: 20px 20px 40px 20px;
      border-right: 1px solid $bdcDefault;
    }
    .content-right {
      float: left;
      width: 250px;
    }
  }
}
</style>
