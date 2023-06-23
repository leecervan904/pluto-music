<template>
  <div class="svg-progress">
    <img v-show="songPicUrl"
      class="svg-progress--pic"
      :src="`${songPicUrl}?param=100y100`"
      alt="song pic"
    >
    <div class="svg-progress--circle">
      <svg viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" :r="r"
          transform="rotate(-90, 15, 15)" fill="none"
          :stroke="stroke"
          :stroke-width="strokeWidth"
          :stroke-dasharray="dasharray"
          :stroke-dashoffset="dashoffset"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, unref } from 'vue'
import { usePlayerStore } from '/@/store/module/player'

const playerStore = usePlayerStore()

const r = 13
const stroke = 'rgba(255, 0, 0, .6)'
const strokeWidth = 5
const dasharray= 2 * Math.PI * r
let timer = null

const ct = ref(0)
const songDt = computed(() => playerStore.songDt)
const audio = computed(() => playerStore.audio)
const isPlay = computed(() => playerStore.isPlay)
const songPicUrl = computed(() => playerStore.songPicUrl)
const dashoffset = computed(() => unref(ct) ? dasharray * (1 - unref(ct) * 1000 / unref(songDt)!) : dasharray)

const start = () => {
  stop()
  timer = setInterval(() => {
    ct.value = unref(audio)!.currentTime
  }, 1000)
}

const stop = () => {
  timer && clearInterval(timer)
}

watch(
  () => isPlay.value,
  (newVal) => {
    if (newVal) {
      start()
    } else {
      stop()
    }
  }
)

onMounted(() => {
  unref(isPlay) && start()
})

onUnmounted(() => {
  stop()
})
</script>

<style lang="scss" scoped>
.svg-progress {
  position: relative;

  &--pic {
    /* z-index: -1; */
    position: absolute;
    top: .01rem;
    left: .01rem;
    width: .28rem;
    border-radius: 50%;
  }

  &--circle {
    width: 100%;
    height: 100%;
  }
}
</style>
