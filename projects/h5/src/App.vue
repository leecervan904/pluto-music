<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { usePlayerStore } from '/@/store/module/player'
import Player from '/@/views/player/index.vue'

import Layout from '/@/layout/index.vue'
import AppConfig from '/@/layout/AppConfig.vue'

const playerStore = usePlayerStore()
const handleInitPlayer = () => [playerStore.initPlayer()]

function setVh () {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })
}

onBeforeMount(setVh)
</script>

<template>
  <div
    id="app-wrapper"
    @click.once="handleInitPlayer"
    @touchstart.once="handleInitPlayer"
  >
    <Layout />

    <Player />

    <AppConfig />
  </div>
</template>
