<template>
  <div class="p-lyric">
    <div class="p-lyric__voice"></div>
    <div
      ref="content"
      class="p-lyric__content"
      :style="{ padding: `${contentPaddingTop} 20px` }"
    >
      <p class="lyric-line"
        v-for="(line, i) of lyric"
        :key="i"
      >{{ line.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, unref } from 'vue'
import { useRequest, addClass, removeClass } from '/@/utils'

const props = defineProps({
  songId: { type: [Number, String], require: true },
  ct: { type: Number, require: true },
})

const lyric = ref([])
const contentPaddingTop = ref(0) // content 上下 padding
const currentLine = ref(null) // 当前播放的行
const scrollImmediate = ref(true) // 是否立即滚动，当 touchmove 滚动歌词时，该值应该为 false
const scrollDelay = 3000 // 滚动的延迟，当不再 touchmove 滚动歌词时，下一次自动滚动的延迟
const scrollTimer = null // 下一次滚动的 timer
const content = ref<HTMLElement | null>(null)
const times = computed(() => unref(lyric).map(v => v.time))

const initData = async () => {
  const [error, data] = await useRequest('getLyric')({ id: props.songId })
  if (error) return
  if (!data.lrc) {
    lyric.value = [{ time: 0, text: '暂时没有歌词' }]
  } else {
    lyric.value = extractLyric(data.lrc.lyric).filter(v => v.text)
  }
  // this.scroll.scrollTop()
}

/**
 * lyric is a string.
 * return like [{ time: 89122, text: 'some lyric...' }, ...]
 */
const extractLyric = (lyric) => {
  return lyric.split('\n').map(v => {
    const patch = v.split(']')
    const time = patch[0] && decodeLyricTime(patch[0].substr(1))
    const text = patch[1] && patch[1].trim()
    // console.log({ time, text })
    return { time, text }
  })
}

const decodeLyricTime = (time) => {
  const times = time.replace('.', ':').split(':').map(Number)
  return (times[0] * 60 * 1000) + (times[1] * 1000) + times[2]
}

const handleLyricScroll = () => {
  // 必须引用 this.ct，否则在循环中它的值会变化
  const ct = props.ct
  let index = 0
  // 从 1 开始遍历，未超出 times[i] 时，保留之前的 index
  for (let i = 1, len = unref(times).length; i < len; i++) {
    if (ct < times.value[i]) {
      index = i - 1
      break
    }
    // fixed：确保最后一句歌曲会停留到播放完毕
    if (i === len - 1) {
      index = i
    }
  }
  // currentLine.value = this.$refs[this.times[index]][0]
}

onMounted(() => {
  initData()
  // this.$nextTick(_ => {
  //   this.contentPaddingTop = this.scroll.$el.clientHeight / 2 + 'px'
  //   // 添加事件，touchmove 滚动歌词后的一段事件内不会自动滚动(不知道为什么 flick 不生效)
  //   this.scroll.getScroll().on('touchEnd', () => {
  //     this.timer && clearTimeout(this.timer)
  //     this.scrollImmediate = false
  //     this.timer = setTimeout(() => {
  //       this.scroll.scrollToElement(this.currentLine, 500, true, true)
  //       this.scrollImmediate = true
  //     }, this.scrollDelay)
  //   })
  // })
})

watch(
  () => props.ct,
  handleLyricScroll,
)

watch(
  () => props.songId,
  (newVal) => {
    console.log(newVal)
    initData()
  },
)

watch(
  () => currentLine.value,
  (newEl, oldEl) => {
    // 动态修改类名
    oldEl && removeClass(oldEl, 'is-current')
    addClass(newEl, 'is-current')
    if (scrollImmediate.value) {
      console.log('will scroll')
      // this.$refs.scroll.scrollToElement(newEl, 500, true, true)
    }

  }
)
</script>

<style lang="scss" scoped>
.p-lyric {
  display: flex;
  flex-direction: column;
  /* height: 0; */
  /* background-color: rgba(0, 0, 0, .4); */
  height: 300px;
  overflow-y: auto;
  &__voice {
    height: .4rem;
  }
  .content-wrapper {
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
    height: 0;
  }
  &__content {
    // Todo: 使用 gradient 制作上下模糊渐变
    .lyric-line {
      padding: .1rem 0;
      line-height: .2rem;
      white-space: wrap;
      text-align: center;
      font-size: .14rem;
      color: #9d9d9d;
      transition: all .3s;
      &.is-current {
        color: #fff;
        font-size: .16rem;
      }
    }
  }
}
</style>
