<script>
import { formatDuration, getOffsetLeft } from '/@/utils'

export default {
  name: 'PlayerProgressBar',
  props: {
    ct: { type: Number, require: true },
    songDt: { type: Number, require: true },
  },
  data() {
    return {
      ctTemp: 0, // 拖动进度条时显示的当前播放时间，ms
      dtBarLeft: 0, // 进度条左侧相对视窗左侧的位置
      dtBarWidth: 0, // 进度条总长度，dtBarLeft + dtBarWidth = dtBarRight
      dotInitLeft: 0, // dot 的初始 left
      isDrag: false, // 是否拖动更改进度条
    }
  },
  computed: {
    dtBar() {
      return this.$refs.dtBar
    },
    ctBar() {
      return this.$refs.ctBar
    },
    dot() {
      return this.$refs.dot
    },
    formattedDt() {
      return formatDuration(this.songDt)
    },
    formattedCt() {
      return formatDuration(Math.floor(this.ctTemp))
    },
    playRatio() {
      // drag 时，引用的是 ctTemp
      return this.isDrag
        ? this.ctTemp / this.songDt
        : this.ct / this.songDt
    },
    // style
    ctBarStyle() {
      return {
        width: `${this.playRatio * this.dtBarWidth}px`,
      }
    },
    dotStyle() {
      return {
        left: `${this.playRatio * this.dtBarWidth + this.dotInitLeft}px`,
      }
    },
  },
  watch: {
    ct(newVal) {
      if (!this.isDrag)
        this.ctTemp = newVal
    },
  },
  mounted() {
    this.$nextTick((_) => {
      this.getDomSize()
    })
  },
  methods: {
    // 获取进度条相关的盒子尺寸
    getDomSize() {
      this.dtBarWidth = this.dtBar.offsetWidth
      // console.log(this.dtBarWidth)
      this.dtBarLeft = getOffsetLeft(this.dtBar, this.$refs.progress)
      this.dotInitLeft = parseInt(getComputedStyle(this.dot).left)
      // console.log('dotInitLeft:', this.dotInitLeft)
      // console.log(`dtBarLeft: ${this.dtBarLeft}, dtBarWidth: ${this.dtBarWidth}`)
    },
    // 进度条相关，顺序: touhcstart -> touchmove -> touchend -> click
    onDotTouchStart() {
      console.log('dot touch start------')
      this.isDrag = true
    },
    onDotTouchMove(e) {
      // console.log('dot touch move')
      const point = e.touches[0]
      const { pageX } = point
      // 相对于进度条左侧的偏移量
      const positionX = pageX - this.dtBarLeft
      // 控制 dot 只能在进度条中
      if (positionX > 0 && positionX < this.dtBarWidth)
        this.ctTemp = (positionX / this.dtBarWidth) * this.songDt
    },
    onDotTouchEnd() {
      console.log('dot touch end--------')
      this.isDrag = false
      // 设置播放时间
      this.$emit('update-time', this.ctTemp)
    },
  },
}
</script>

<template>
  <div ref="progress" class="p-progress-bar">
    <!-- 左侧时间 -->
    <div class="p-progress-bar_left" :class="{ 'is-drag': isDrag }">
      {{ formattedCt }}
    </div>
    <div class="p-progress-bar_main">
      <!-- 进度条：全时长 -->
      <div ref="dtBar" class="main-duration" :class="{ 'is-drag': isDrag }">
        <!-- 在 wrapper 添加事件让 touch 的范围更大，即时 dot 很小也易于操作 -->
        <div
          ref="dot" class="main-dot-wrapper" :style="dotStyle"
          @touchstart.stop.prevent="onDotTouchStart"
          @touchmove.stop.prevent="onDotTouchMove"
          @touchend.stop.prevent="onDotTouchEnd"
        >
          <!-- 视觉小圆点 -->
          <div class="mini-dot" :class="{ 'is-drag': isDrag }" />
        </div>
        <!-- 进度条：播放时长 -->
        <div ref="ctBar" class="main-current" :class="{ 'is-drag': isDrag }" :style="ctBarStyle" />
      </div>
    </div>
    <!-- 右侧时间 -->
    <div class="p-progress-bar_right">
      {{ formattedDt }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';

.p-progress-bar {
  display: flex;
  height: .25rem;

  &_left, &_right {
    width: .4rem;
    line-height: .25rem;
    text-align: center;
    font-size: $font--small-s;
    color: #aaa;
  }

  &_left.is-drag {
    color: #fff;
    text-shadow: 1px 1px 2px #fff;
  }

  &_main {
    flex: 1;
    position: relative;

    .main-duration {
      position: relative;
      width: 100%;
      height: .02rem;
      margin-top: .11rem;
      background-color: #ccc;
      border-radius: .01rem;

      &.is-drag {
        box-shadow: 0px 0px 1px 1px #ccc;
      }
    }

    .main-dot-wrapper {
      z-index: 11;
      box-sizing: border-box;
      position: absolute;
      top: -.14rem;
      left: -.15rem;
      width: .3rem;
      height: .3rem;
      /* background-color: rgba(0, 0, 0, .4); */

      .mini-dot {
        z-index: 12;
        box-sizing: border-box;
        position: absolute;
        top: .1rem;
        left: .1rem;
        width: .1rem;
        height: .1rem;
        background-color: #fff;
        border-radius: 50%;

        &.is-drag {
          box-shadow: 0px 0px 1px 1px #fff;
        }
      }
    }

    .main-current {
      z-index: 10;
      position: absolute;
      width: 0;
      height: .02rem;
      background-color: #da3a3a;
      border-radius: .01rem;
      /* transition: width 1s; */

      &.is-drag {
        box-shadow: 0px 0px 1px 1px #da3a3a;
      }
    }
  }
}
</style>
