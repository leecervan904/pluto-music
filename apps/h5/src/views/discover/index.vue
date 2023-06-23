<template>
  <div class="discover" ref="discover">
    <HomeSwiper />
    <HomeRecommend />
    <HomePlaylist />
    <HomeNewest />
    <HomeHotSong />
    <!-- <HomeDj /> -->
  </div>
</template>

<script setup lang="ts">
import HomeSwiper from './components/HomeSwiper.vue'
import HomeRecommend from './components/HomeRecommend.vue'
import HomePlaylist from './components/HomePlaylist.vue'
import HomeNewest from './components/HomeNewest.vue'
import HomeHotSong from './components/HomeHotSong.vue'
// import HomeDj from './components/HomeDj.vue'
</script>

<style lang="scss" scoped>
.discover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
