<script lang="ts">
import type { IBannerItem } from '@pluto-music/api'
import { computed, defineComponent, onMounted, onUnmounted, ref, unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRequest } from '/@/utils'

export default defineComponent({
  name: 'HomeCarousel',
  emits: ['update:current-mask'],
  setup(props, { emit }) {
    const router = useRouter()

    let timer: TimerId = null
    const active = ref(0)
    const banner = ref<IBannerItem[]>([])
    const bgMask = computed(() => unref(banner)[unref(active)]?.pic)

    async function initialData() {
      const [error, data] = await useRequest('getBanner')()
      if (error)
        return
      banner.value = data.banners
      start()
    }

    function start() {
      timer = setInterval(() => {
        handleControl('next')
      }, 4000)
    }

    function stop() {
      timer && clearInterval(timer)
    }

    function handleControl(tag: 'prev' | 'next' | number) {
      if (typeof tag === 'number')
        active.value = tag
      else if (tag === 'prev')
        active.value = active.value === 0 ? banner.value.length - 1 : active.value - 1
      else if (tag === 'next')
        active.value = active.value === banner.value.length - 1 ? 0 : active.value + 1
    }

    function handleDownload() {
      window.open('https://music.163.com/#/download')
    }

    function toView(item: IBannerItem) {
      const { targetType, targetId, url } = item
      if (targetType === 3000)
        window.open(url)
      else if (targetType === 1)
        router.push({ path: '/song', query: { id: targetId } })
      else if (targetType === 10)
        router.push({ path: '/album', query: { id: targetId } })
    }

    watch(bgMask, (newVal) => {
      emit('update:current-mask', newVal)
    })

    onMounted(() => {
      initialData()
    })

    onUnmounted(() => {
      stop()
    })

    return {
      timer,
      active,
      banner,
      bgMask,
      start,
      stop,
      initialData,
      handleDownload,
      toView,
      handleControl,
    }
  },
})
</script>

<template>
  <div class="carousel" @mouseenter="stop" @mouseleave="start">
    <div class="content">
      <div class="img-wrapper">
        <transition-group name="fade">
          <div
            v-for="(item, i) of banner"
            v-show="i === active"
            :key="i"
            class="img-item"
            @click="toView(item)"
          >
            <img key="img" :src="item.pic">
          </div>
        </transition-group>

        <div class="content__prev" @click="handleControl('prev')">
&nbsp;
        </div>
        <div class="content__next" @click="handleControl('next')">
&nbsp;
        </div>
        <div class="content-paganation">
          <span
            v-for="i of banner.length"
            :key="i"
            class="pag-dot" :class="[i - 1 === active ? 'pag-dot-active' : 'none']"
            @click="handleControl(i - 1)"
          />
        </div>
      </div>
      <div class="content__download" @click="handleDownload()">
        <p class="download-desc">
          PC 安卓 iPhone WP iPad Mac 六大客户端
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s 0.8s;
}

.carousel {
  width: 100%;
  background-color: $bdcCarousel;
  .content {
    position: relative;
    width: 982px;
    margin: 0 auto;
    color: $textLight;
    .img-wrapper {
      position: relative;
      float: left;
      width: 730px;
      height: 285px;
      .img-item {
        position: absolute;
        img {
          width: 100%;
          height: 285px;
        }
      }
      .content__prev,
      .content__next {
        position: absolute;
        width: 37px;
        height: 63px;
        line-height: 63px;
        text-align: center;
        color: $textLight;
        @include hoverBg(rgba(0, 0, 0, 0.1));
      }
      .content__prev {
        left: -60px;
        top: 100px;
      }
      .content__next {
        left: 1005px;
        top: 100px;
      }
      .content-paganation {
        position: absolute;
        left: 300px;
        bottom: 10px;
        .pag-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 5px 8px;
          border-radius: 50%;
          background-color: $bgPagination;
          @include hoverBg($bgPaginationActive);
        }
        .pag-dot-active {
          background-color: $bgPaginationActive;
        }
      }
    }
    .content__download {
      position: relative;
      margin-left: 730px;
      width: 252px;
      height: 285px;
      &:hover {
        cursor: pointer;
      }
      .download-desc {
        position: absolute;
        bottom: 8px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: $fontMin;
        color: $inputInfo;
      }
    }
  }
}
</style>
