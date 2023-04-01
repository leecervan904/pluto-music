<template>
  <router-link class="pl-item" tag="div" :to="`/playlist/${playlist.id}`">
    <div class="item-img__wrapper">
      <img
        :src="`${playlist.coverImgUrl}?param=100y100`"
        :alt="playlist.name">
    </div>
    <div class="item-info">
      <p class="item-info__name">{{ playlist.name }}</p>
      <p class="item-info__more">
        {{ playlist.trackCount }} 首音乐
        by {{ playlist.creator && playlist.creator.nickname }}
        播放 {{ formatCount(playlist.playCount) }}次
      </p>
    </div>
  </router-link>
</template>

<script>
import { formatCount } from '/@/utils'

export default {
  name: 'search-playlist',
  props: {
    playlist: { type: Object, require: true }
  },
  methods: {
    formatCount (count) {
      return formatCount(count)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/@/styles/mixins.scss';

.pl-item {
  display: flex;
  height: .5rem;
  margin-bottom: .1rem;
  font-size: 14px;
  .item-img__wrapper {
    flex-shrink: 0;
    overflow: hidden;
    width: .5rem;
    height: .5rem;
    border-radius: .1rem;
    background-color: #ccc;
    img {
      width: 100%;
    }
  }
  .item-info {
    flex: 1;
    width: 0;
    box-sizing: border-box;
    padding-left: .1rem;
    &__name {
      height: .3rem;
      line-height: .3rem;
      @include ellipsis();
    }
    &__more {
      height: .2rem;
      line-height: .2rem;
      font-size: 12px;
      color: #aaa;
      @include ellipsis();
    }
  }
}
</style>
