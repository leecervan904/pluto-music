<template>
  <router-link class="al-item" tag="div" :to="`/album/${album.id}`">
    <div class="left">
      <img
        :src="`${album.picUrl}?param=100y100`"
        :alt="album.name">
    </div>
    <div class="right">
      <p class="name">
        <span>{{  album.name }}</span>
        <span class="name-alia" v-show="album.alias.length">（{{  album.alias[0] }}）</span>
      </p>
      <p class="ar">
        <span class="ar-name">{{ formatArtists(album.artists) }} </span>
        <span class="ar-date">{{ formatPublishTime(album.publishTime) }}</span>
      </p>
    </div>
  </router-link>
</template>

<script>
import { formatArtists, formatPublishTime } from '/@/utils'

export default {
  name: 'search-album',
  props: {
    album: { type: Object, require: true }
  },
  methods: {
    formatArtists (ar) {
      return formatArtists(ar)
    },
    formatPublishTime (date) {
      return formatPublishTime(date)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/@/styles/mixins.scss';

.al-item {
  display: flex;
  height: .5rem;
  margin: .1rem 0;
  font-size: 14px;
  .left {
    overflow: hidden;
    flex-shrink: 0;
    width: .5rem;
    border-radius: .1rem;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    width: 0;
    margin-left: .1rem;
    .name {
      height: .3rem;
      line-height: .3rem;
      @include ellipsis();
      &-alia {
        color: #ccc;
      }
    }
    .ar {
      display: flex;
      height: .2rem;
      line-height: .2rem;
      font-size: 12px;
      span {
        display: inline-block;
      }
      &-name {
        flex: 1;
        width: 0;
        max-width: calc(100% - .5rem);
        @include ellipsis();
      }
      &-date {
        min-width: .5rem;
        margin-left: .05rem;
        color: #ccc;
      }
    }
  }
}
</style>
