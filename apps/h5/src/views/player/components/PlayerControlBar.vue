<template>
  <div class="p-ctrl-bar">
    <div class="p-ctrl-bar_item p-ctrl-bar_cycle">
      <svg-icon :icon-class="iconPlayMode" @click="togglePlayMode"/>
    </div>
    <div class="p-ctrl-bar_item p-ctrl-bar_prev">
      <svg-icon icon-class="prev" @click="togglePlayPrev"/>
    </div>
    <div class="p-ctrl-bar_item p-ctrl-bar_play">
      <svg-icon :icon-class="iconPlayOrPause" @click="togglePlay"/>
    </div>
    <div class="p-ctrl-bar_item p-ctrl-bar_next">
      <svg-icon icon-class="next" @click="togglePlayNext"/>
    </div>
    <div class="p-ctrl-bar_item p-ctrl-bar_list">
      <svg-icon icon-class="song-list" @click="handleToggleShowPlaylist"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue'
import { usePlayerStore, PlayMode } from '/@/store/module/player'

const playerStore = usePlayerStore()
const isPlay = computed(() => playerStore.isPlay)
// const audio = computed(() => playerStore.getAudio)
const playMode = computed(() => playerStore.playMode)
// const songId = computed(() => playerStore.songId)
const iconPlayOrPause = computed(() => unref(isPlay) ? 'pause' : 'play')
const iconPlayMode = computed(() => {
  if (unref(playMode) === PlayMode.LOOP) return 'play-loop'
  return unref(playMode) === PlayMode.SINGLE
    ? 'play-single'
    : 'play-random'
})

const togglePlayMode = () => {
  playerStore.togglePlayMode()
}
const togglePlayPrev = () => {
  playerStore.togglePlayPrev()
  // this.$emit('reset-ct')
}
const togglePlayNext = () => {
  playerStore.togglePlayNext()
  // this.$emit('reset-ct')
}
const togglePlay = () => {
  playerStore.togglePlay()
}
const handleToggleShowPlaylist = () => {
  playerStore.toggleShowPlaylist(!playerStore.showPlaylist)
}
</script>

<style lang="scss" scoped>
.p-ctrl-bar {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: 1rem;
  padding: .25rem 0;
  font-size: .3rem;
  color: #fff;

  @media (max-height: 600px) {
    height: .7rem;
    padding: .1rem;
  }

  &_item {
    width: .5rem;
    line-height: .5rem;
    text-align: center;
  }

  &_play {
    font-size: .5rem;
  }
}
</style>
