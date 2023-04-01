<template>
  <div class="album">
    <img class="album-img" :src="al?.picUrl + '?param=150y150'" />
    <div class="album__mask"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  al: Object,
})
</script>

<style lang="scss" scoped>
.album {
  position: relative;
  float: left;
  width: 205px;
  height: 205px;
  text-align: center;
  line-height: 205px;
  .album-img {
    width: 130px;
    margin-top: 39px;
    margin-left: -1px;
  }
  .album__mask {
    z-index: 10;
    position: absolute;
    top: 1px;
    left: -1px;
    width: 205px;
    height: 205px;
  }
}
</style>
