<template>
  <div class="pl-squares">
    <!-- <nav-bar class="pl-squares__title" :title="title"></nav-bar> -->

    <van-tabs class="pl-squares__tabs"
      v-model="active"
      swipeable
      @click="onTabSelect">
      <van-tab v-for="item in hotCate" :key="item"
        :title="item"/>
    </van-tabs>

    <swiper class="pl-squares__swiper"
      ref="mySwiper"
      :options="swiperOptions">
      <swiper-slide
        v-for="(cate, index) in hotCate"
        :key="cate"
        class="swiper-item"
        @scroll.passive="onScroll"
      >
        <!-- 第一次渲染后便缓存组件 -->
        <keep-alive>
          <div v-if="index !== active && isFirst[index]" class="swiper-loading">滑动加载...</div>
          <VirtualScroller v-else :cat="cate"/>
        </keep-alive>
      </swiper-slide>
    </swiper>

    <!-- <tab-bar></tab-bar> -->
  </div>
</template>

<script lang="ts">
// import { mapGetters } from 'vuex'
// import NavBar from '@/layout/components/NavBar'
// import TabBar from '@/layout/components/TabBar'
// import InfiniteScroll from './components/InfiniteScroll'
import { useRequest } from '/@/utils/useRequest'
import VirtualScroller from './Scroller.vue'

export default {
  name: 'palylist-square',
  components: {
    // NavBar,
    // TabBar,
    // InfiniteScroll,
    VirtualScroller,
  },
  data () {
    return {
      swiperOptions: {
        spaceBetween: 20,
        pagination: '.swiper-pagination',
        on: {
          slideChange: _ => {
            const activeIndex = this.swiper.activeIndex
            this.onSwiperChange(activeIndex)
          }
        }
      },
      loading: true,
      active: 0, // tab 和 swiper 共同维护
      hotCate: [], // tab 列表
      playlists: [], // 当前 tab 下的 playlist
      isFirst: [] // 状态，判断每个 slide 组件是否第一次挂载
    }
  },
  mounted () {
    console.log('square mounted...')
    this.extractPlaylistHot()
  },
  activated () {
    // 销毁外层 scroll
    this.$emit('destroyScroll')
  },
  computed: {
    // ...mapGetters(['bodyWidth']),
    bodyWidth() {
      return document.body.clientWidth
    },
    title () {
      return this.$route.meta.title
    },
    showLoading () {
      return 1
    },
    itemWidth () {
      return Math.floor(this.bodyWidth / 3.5)
    },
    swiper () {
      return this.$refs.mySwiper.swiperInstance
    },
    content () {
      return this.$refs.mySwiper.$el
    }
  },
  methods: {
    // 点击 tab 触发数据请求
    onTabSelect (index) {
      this.swiper.slideTo(index)
    },
    // 滑动 swiper 触发数据请求
    onSwiperChange (index) {
      this.active = index
    },
    onScroll () {
      console.log('scroll...')
    },
    async extractPlaylistHot () {
      const [error, data] = await useRequest('getPlaylistHot')()
      if (error) return
      const { tags } = data
      this.hotCate = tags.map(v => v.name)
      this.isFirst = this.hotCate.map(v => 1)
      this.isFirst[0] = 0
    }
  },
  watch: {
    active (newVal, oldVal) {
      if (this.isFirst[newVal]) {
        this.isFirst[newVal] = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pl-squares {
  box-sizing: border-box;
  position: relative;
  /* padding-bottom: .5rem; */
  &__title {
    z-index: 99;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
  }
  &__tabs {
    z-index: 99;
    position: fixed;
    top: .5rem;
    /* top: 0; */
  }
  &__swiper {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    padding: .5rem .1rem 0;
    .swiper-item {
      overflow: scroll;
    }
    .swiper-loading {
      text-align: center;
      font-size: 16px;
      line-height: 20px;
    }
  }
}
</style>
