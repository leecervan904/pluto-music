<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '/@/store/module/layout'

import { Motion, Presence } from 'motion/vue'
import AppMain from './AppMain.vue'
import NavBar from './navbar/index.vue'
// import TabBar from './TabBar.vue'
import MiniPlayer from './MiniPlayer.vue'

const layoutStore = useLayoutStore()
const {
  showNavbar,
  // showTabbar,
  showMiniPlayer,
} = storeToRefs(layoutStore)
</script>

<template>
  <Presence>
    <Motion
      v-show="showNavbar"
      :initial="{ opacity: 0, y: -50 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: -50 }"
    >
      <div id="app-navbar">
        <NavBar />
      </div>
    </Motion>
  </Presence>

  <div
    id="app-main"
  >
    <AppMain />
  </div>

  <Presence>
    <Motion
      v-show="showMiniPlayer"
      :initial="{ opacity: 0, y: 50 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: 50 }"
    >
      <div id="app-mini-player">
        <MiniPlayer />
      </div>
    </Motion>
  </Presence>

  <!-- <Presence>
    <Motion
      v-show="showTabbar"
      :initial="{ opacity: 0, y: 50 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: 50 }"
    >
      <div id="app-tabbar">
        <TabBar />
      </div>
    </Motion>
  </Presence> -->
</template>
