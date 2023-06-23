<template>
  <view class="list-title">
    <view class="left" @click="$emit('play-all')">
      <view class="icon-wrapper">
        <svg-icon icon-class="play"></svg-icon>
      </view>
      <view class="play-all">
        <strong>播放全部</strong>
        <em class="count">(共{{ count }}首)</em>
      </view>
    </view>

    <view v-coming="''" class="right">
      <view class="content">
        <svg-icon icon-class="add"></svg-icon>
        收藏<span v-show="collect" class="count">({{ collect }})</span>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    count: {
      type: Number,
      default: 0,
    },
    collect: {
      type: Number,
      default: 0,
    },
  },
  emits: ['play-all'],
})
</script>

<style lang="scss" scoped>
.list-title {
  position: relative;
  z-index: 10;
  top: 0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 0.5rem;
  margin-top: -0.5rem;
  @media (max-height: 600px) {
    margin-top: -0.35rem;
  }
  border-radius: 0.2rem 0.2rem 0 0 / 0.2rem 0.2rem 0 0;
  background-color: #fff;
  .left {
    flex: 1;
    display: flex;
    line-height: 0.5rem;
    .icon-wrapper {
      width: 0.4rem;
      text-align: center;
      font-size: 0.2rem;
    }
    .play-all {
      font-size: 14px;
      .count {
        vertical-align: 0.02rem;
        font-size: 12px;
        color: #ccc;
      }
    }
  }
  .right {
    box-sizing: border-box;
    min-width: 0.5rem;
    margin: 0.075rem;
    .content {
      box-sizing: border-box;
      padding: 0.075rem;
      line-height: 0.2rem;
      color: #fff;
      font-size: 12px;
      border-radius: 0.2rem;
      background-color: #d62c39;
      .count {
        font-size: 12px;
        vertical-align: 0.01rem;
      }
    }
  }
}
</style>
