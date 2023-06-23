<script lang="ts">
import type { IToplistDetailItem } from '@pluto-music/api'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: { type: String },
    rank: { type: Array as PropType<IToplistDetailItem[]>, default: () => [] },
    id: { type: Number, require: true },
  },
  emits: ['update:id'],
  methods: {
    handleChangeRank(id: number | string) {
      this.$emit('update:id', id)
    },
  },
})
</script>

<template>
  <div class="wrapper">
    <h1 class="cate-title">
      {{ title }}
    </h1>
    <div class="cate-list">
      <div
        v-for="(item, i) of rank"
        :key="i"
        class="card" :class="[{ 'cate-item-active': item.id == id }]"
        @click="handleChangeRank(item.id)"
      >
        <div class="img">
          <img :src="`${item.coverImgUrl}?param=100y100`" :alt="item.name">
        </div>
        <div class="desc">
          <p class="name">
            {{ item.name }}
          </p>
          <p class="info">
            {{ item.updateFrequency }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  .cate-title {
    margin-top: 20px;
    padding: 0 10px 12px;
    font-size: $fontMinL;
    font-weight: bold;
  }
  .cate-list {
    .card {
      display: flex;
      padding: 10px 0 10px 20px;
      @include hoverBg($bgFooter);
      .img {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
        }
      }
      .desc {
        flex: 1;
        margin-left: 8px;
        .name,
        .info {
          height: 20px;
          line-height: 20px;
          font-size: $fontMin;
        }
        .info {
          color: $textLinkDefault;
        }
      }
    }
  }
  .cate-item-active {
    background-color: $bgTableDark;
  }
}
</style>
