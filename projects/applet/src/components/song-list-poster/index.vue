<template>
  <view class="playlist-poster">
    <view class="playlist-poster__wrapper">
      <view
        class="playlist-poster__img"
        :style="{ width: `${750 * 0.3}rpx`, height: `${750 * 0.3}rpx` }"
      >
        <image class="img" lazy-load alt="img" mode="aspectFit" :src="detail?.coverImgUrl"></image>
      </view>
      <view class="playlist-poster__content">
        <view class="content-title">{{ detail?.name }}</view>
      </view>
    </view>
    <view class="playlist-poster__desc">{{ detail?.description }}</view>
  </view>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { PlaylistDetail } from './typing'

export default defineComponent({
  props: {
    detail: {
      type: Object as PropType<Partial<PlaylistDetail>>,
      default: () => ({}),
    },
  },
  mounted() {
    console.log('123')
  },
})
</script>

<style lang="scss" scoped>
.playlist-poster {
  padding: 5px 10px 10px;
  &__wrapper {
    display: flex;
  }
  &__img {
    flex-shrink: 0;
    overflow: hidden;
    margin-right: 10px;
    border-radius: 5px;
    background-color: #ccc;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  &__content {
    flex: 1;
  }
  &__desc {
    font-size: 14px;
  }
}
</style>
