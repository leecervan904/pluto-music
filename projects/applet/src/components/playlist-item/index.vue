<template>
  <view class="pl-item" tag="li" :style="{ width: width }" @click="$emit('to-playlist', id)">
    <view class="pl-item__img" :style="{ width, height: width }">
      <view class="pl-item__playcount">
        <svg-icon icon-class="play-pure" class="playcount-prefix"></svg-icon>
        <text class="playcount">{{ filterCount }}</text>
      </view>
      <image class="img" lazy-load :src="`${img}?param=200y200`" alt="img" mode="aspectFit"></image>
    </view>
    <view class="pl-item__desc">{{ desc }}</view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlaylistItem',
  props: {
    id: { type: [Number, String], required: true },
    img: { type: String, default: '' },
    playcount: { type: [Number, String], default: 0 },
    desc: { type: String, default: '' },
    width: { type: String, default: '1rem' },
  },
  emits: ['to-playlist'],
  computed: {
    filterCount() {
      let count = this.playcount
      if (count > 100000000) {
        return `${Math.floor(+count / 100000000)}亿`
      } else if (count > 100000) {
        return `${Math.floor(+count / 10000)}万`
      }
      return count
    },
  },
})
</script>

<style lang="scss" scoped>
.pl-item {
  // fix: inline-block 在 ios 下出现错乱
  position: relative;
  list-style: none;
  &__img {
    .img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }
  &__playcount {
    position: absolute;
    top: 0.05rem;
    right: 0.05rem;
    color: #fff;
    font-size: 12px;
    .playcount {
    }
    .playcount-prefix {
    }
  }
  &__desc {
    height: 36px;
    line-height: 18px;
    font-size: 12px;
    @include multi-ellipsis(2);
  }
}
</style>
