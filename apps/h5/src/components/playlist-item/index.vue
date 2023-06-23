<template>
  <router-link class="pl-item" tag="li"
    :to="`/playlist/${id}`"
    :style="{ width: width }">
    <div class="pl-item__img">
      <div class="pl-item__playcount">
        <svg-icon icon-class="play-pure" class="playcount-prefix"></svg-icon>
        <span class="playcount">{{ filterCount }}</span>
      </div>
      <img
        :src="`${img}?param=200y200`" alt="img" />
    </div>
    <div class="pl-item__desc">{{ desc }}</div>
  </router-link>
</template>

<script>
export default {
  name: 'playlist-item',
  props: {
    id: { type: Number, required: true },
    img: { type: String, required: true },
    playcount: { type: Number, default: 0 },
    desc: { type: String, default: '' },
    width: { type: String, default: '1rem' }
  },
  computed: {
    filterCount() {
      let count = this.playcount
      if (count > 100000000) {
        return `${Math.floor(count / 100000000)}亿`
      } else if (count > 100000) {
        return `${Math.floor(count / 10000)}万`
      }
      return count
    }
  },
  methods: {
    onClick (id) {
      // :to="`/playlist/${id}`"
      console.log('click item...')
      // this.$router.push({ path: `/playlist/${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import '/@/styles/mixins.scss';

.pl-item {
  // fix: inline-block 在 ios 下出现错乱
  position: relative;
  list-style: none;
  &__img {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: .05rem;
    background-color: #ccc;
    img {
      width: 100%;
    }
  }
  &__playcount {
    position: absolute;
    top: .05rem;
    right: .05rem;
    color: #fff;
    font-size: $font--small;
    .playcount {}
    .playcount-prefix {}
  }
  &__desc {
    height: 36px;
    line-height: 18px;
    font-size: $font--small;
    @include multi-ellipsis(2)
  }
}
</style>
