<template>
  <div class="header">
    <div class="title">{{ title }}</div>
    <ul v-show="list.length" class="list">
      <router-link
        v-for="(item, i) of divideList"
        :key="i"
        class="item"
        :to="`/discover/playlist?cate=${item}`"
        >{{ item }}</router-link
      >
    </ul>
    <div class="more">
      <router-link :to="morePath" class="more-text">更多</router-link>
      <span class="more-arrow"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { addSeparator } from '/@/utils'

export default defineComponent({
  name: 'CategoryHeader',
  props: {
    title: {
      type: String,
      default: '标题',
    },
    list: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    morePath: {
      type: String,
      default: '/',
    },
  },
  computed: {
    divideList() {
      return addSeparator(this.list)
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 33px;
  padding: 0 10px 0 34px;
  line-height: 33px;
  font-size: $fontMiddle;
  background: url('../../../public/img/icons/index.png') no-repeat -225px -156px;
  border-bottom: 2px solid $bdcTitle;
  .title {
    @include hoverText(pointer, none);
  }
  .list {
    display: flex;
    margin-left: 20px;
    font-size: $fontMin;
    .item:nth-child(even) {
      margin: 0 10px;
      font-weight: bold;
      color: $titleDivide;
    }
    .item:nth-child(odd) {
      color: $titleSub;
      @include hoverText();
    }
  }
  .more {
    position: absolute;
    font-size: $fontMin;
    vertical-align: middle;
    color: $titleMore;
    right: 10px;
    .more-text {
      display: inline-block;
      @include hoverText();
    }
    .more-arrow {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      background: url('../../../public/img/icons/index.png') no-repeat 0 -238px;
    }
  }
}
</style>
