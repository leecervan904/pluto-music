<script setup lang="ts">
import { type PropType } from 'vue'
import type { GetArtistDescResult } from '@pluto-music/api'

defineProps({
  desc: {
    type: Object as PropType<Nullable<GetArtistDescResult>>,
    default: null,
  },
})
</script>

<template>
  <div class="artist-desc">
    <div class="artist-desc__tag">陈奕迅简介</div>
    <div class="artist-desc__brief">{{ desc?.briefDesc }}</div>
    <div v-for="item in desc?.introduction" :key="item.ti" class="artist-desc__item">
      <div class="artist-desc__item-title">{{ item.ti }}</div>
      <div class="artist-desc__item-content">
        <div
          v-for="(row, i) in item.txt.split('\n')"
          :key="i"
          class="artist-desc__item-content__row"
        >
          {{ row }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin title {
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.artist-desc {
  font-size: 14px;
  color: #666;
  line-height: 20px;
  &__tag {
    display: flex;
    align-items: center;
    @include title;
    &::before {
      display: inline-block;
      content: '';
      width: 4px;
      height: 16px;
      margin-right: 6px;
      background-color: #b90f0f;
    }
  }
  &__brief {
    text-indent: 2em;
  }
  &__item {
    &-title {
      @include title;
    }
    &-content {
      &__row {
        margin: 5px 0;
      }
    }
  }
}
</style>
