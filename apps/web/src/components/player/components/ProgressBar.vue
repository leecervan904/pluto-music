<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import { boxOffsetLeft as getBoxOffsetLeft, getDuration } from '/@/utils'

const props = defineProps({
  duration: {
    type: Number,
    default: 0,
  },
  currentTime: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update'])

const refBar = ref<HTMLElement | null>(null)
const refReady = ref<HTMLElement | null>(null)
const refCurrent = ref<HTMLElement | null>(null)
const refBtn = ref<HTMLElement | null>(null)
const btnDrag = ref(false) // 标记是否正在拉拽进度条

const barWidth = computed(() => unref(refBar)!.clientWidth)
const barOffsetLeft = computed(() => getBoxOffsetLeft(unref(refBar)!))
const currentTimeFormat = computed(() => getDuration(props.currentTime))
const durationFormat = computed(() => getDuration(props.duration))

function btnMouseDown() {
  btnDrag.value = true
}
function btnMouseUp() {
  btnDrag.value = false
}

// 单击进度条时
function handleClickChange(event: MouseEvent) {
  let barCurrentWidth = event.clientX - unref(barOffsetLeft)
  barCurrentWidth = barCurrentWidth > unref(barWidth) ? unref(barWidth) : barCurrentWidth
  const time = ((barCurrentWidth / unref(barWidth)) * props.duration) / 1000
  // 向父组件传参，更新 currentTime，这个 currentTime 会再次响应至该组件，触发 watch 更新进度条
  emit('update', time)
}

// 拉拽进度条时
function handlePullChange(event: MouseEvent) {
  if (!unref(btnDrag))
    return

  // 获取拉拽过程中的变化，溢出处理
  let barCurrentWidth = event.clientX - unref(barOffsetLeft)
  barCurrentWidth = barCurrentWidth > unref(barWidth) ? unref(barWidth) : barCurrentWidth
  // console.log(barCurrentWidth);
  // 更新进度条样式，这里不用设置 currentTime：因为该事件结束时会触发 handleClickChange 事件，更新 currentTime
  unref(refCurrent)!.style.width = `${barCurrentWidth}px`
}

watch(
  () => props.currentTime,
  () => {
    // 自动播放时才会动, 拉拽时不会动
    if (!unref(btnDrag)) {
      const barCurrentWidth = (props.currentTime / props.duration) * unref(barWidth)
      // console.log(this.currentTime, barCurrentWidth);
      unref(refCurrent)!.style.width = `${barCurrentWidth}px`
    }
  },
)
</script>

<template>
  <div class="bar">
    <div
      ref="refBar"
      class="bar-bg"
      @click="handleClickChange"
      @mousemove="handlePullChange"
      @mouseup="btnMouseUp()"
      @mouseleave="btnMouseUp()"
    >
      <div ref="refReady" class="bar-bg__ready" />
      <div ref="refCurrent" class="bar-bg__current">
        <span
          ref="refBtn"
          class="bar-bg__current__ctrl"
          @mousedown="btnMouseDown()"
          @mouseup="btnMouseUp()"
        />
      </div>
    </div>
    <div class="bar-time">
      <span class="bar-time-current">{{ currentTimeFormat }}</span>
      <span class="bar-time-divide">/</span>
      <span class="bar-time-all">{{ durationFormat }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bar {
  position: relative;
  width: 608px;
  height: 12px;
  .bar-bg {
    position: relative;
    float: left;
    width: 493px;
    height: 9px;
    &__ready {
      position: absolute;
      width: 0;
      height: 9px;
    }
    &__current {
      position: absolute;
      width: 0;
      height: 9px;
      &__ctrl {
        position: absolute;
        top: -7px;
        right: -11px;
        width: 22px;
        height: 24px;
      }
    }
  }
  .bar-time {
    position: absolute;
    right: 25px;
    line-height: 10px;
    color: $inputInfo;
    font-size: $fontMin;
    .bar-time-current {
      color: $homeDefault;
    }
    .bar-time-divide {
      margin: 0 5px;
    }
  }
}
</style>
