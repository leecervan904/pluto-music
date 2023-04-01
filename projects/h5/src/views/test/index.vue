<script setup lang="ts">
import { ref, h } from 'vue'
import { Motion, Presence } from 'motion/vue'
import { useLayoutStore } from '/@/store/module/layout'
import Example from './Example.vue'

const layoutStore = useLayoutStore()

const show = ref(false)
const handleClick = () => {
  layoutStore.toggleShowMiniPlayer()
}

const genTitle = () => h('h1', null, ['hello world'])
</script>

<template>
  <div>
    <h1>test</h1>

    <Example :custom-renderer="genTitle" />
    <Example :custom-renderer="() => 'hello'" />

    <div>
      <van-button @click="handleClick">toggle</van-button>
    </div>

    <!-- <div class="parent"> -->
    <Teleport to="body">
      <Presence>
        <Motion
          v-show="show"
          :initial="{ opacity: 0, x: -100, y: 100 }"
          :animate="{ opacity: 1, x: 0, y: 0 }"
          :exit="{ opacity: 0, x: -100, y: 100 }"
        >
          <div class="box">
            <van-button @click="show = !show">toggle</van-button>
          </div>
        </Motion>
      </Presence>
    </Teleport>
    <!-- </div> -->

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="scss" scoped>
.parent {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.box {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #ace;
}
</style>
