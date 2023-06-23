<template>
  <div class="ar-item">
    <div class="left">
      <img
        :src="`${artist.img1v1Url}?param=200y200`"
        :alt="artist.name">
    </div>
    <div class="center">
      <p>{{  artist.name }}</p>
    </div>
    <div class="right">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-artists',
  props: {
    artist: { type: Object, require: true }
  }
}
</script>

<style lang="scss" scoped>
.ar-item {
  display: flex;
  height: .5rem;
  margin: .1rem 0;
  font-size: 14px;
  .left {
    overflow: hidden;
    width: .5rem;
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
  .center {
    flex: 1;
    margin-left: .1rem;
    line-height: .5rem;
  }
  .right {
    width: .5rem;
  }
}
</style>
