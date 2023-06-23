<script setup lang="ts">
import type { IArtistsArtist } from '@pluto-music/api'
import { withDefaults } from 'vue'
import { ArtistTabEnum } from '../typing'

withDefaults(
  defineProps<{
    artist: Nullable<IArtistsArtist>
    modelValue: ArtistTabEnum
  }>(),
  {
    artist: null,
    modelValue: ArtistTabEnum.HOT,
  },
)

const emits = defineEmits(['update:modelValue'])

const tabs = [
  { label: '热门作品', value: ArtistTabEnum.HOT },
  { label: '所有专辑', value: ArtistTabEnum.ALBUM },
  { label: '相关MV', value: ArtistTabEnum.MV },
  { label: '艺人介绍', value: ArtistTabEnum.DESC },
]

function handleChangeTab(tab: ArtistTabEnum) {
  console.log('click', tab)
  emits('update:modelValue', tab)
}
</script>

<template>
  <div class="artist-poster">
    <div class="artist-poster__title">
      <span class="artist-poster__title-main">{{ artist?.name }}</span>
      <span class="artist-poster__title-sub">{{ artist?.alias.join(';') }}</span>
    </div>

    <div class="artist-poster__avatar">
      <img class="img" :src="`${artist?.img1v1Url}?param=640y300`" :alt="artist?.name">
    </div>
    <div class="artist-poster__tabs">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        class="artist-poster__tabs-item"
        :class="{ active: tab.value === modelValue }"
        @click="handleChangeTab(tab.value)"
      >
        {{ tab.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.artist-poster {
  margin-bottom: 20px;
  font-size: 16px;
  &__title {
    &-main {
      font-size: 26px;
      margin-right: 10px;
    }
    &-sub {
      font-size: 16px;
      color: #ccc;
    }
  }
  &__avatar {
    position: relative;
    .img {
      width: 100%;
    }
  }
  &__tabs {
    display: flex;
    &-item {
      box-sizing: border-box;
      width: 140px;
      padding: 10px 0;
      text-align: center;
      border: 1px solid #ccc;
      &:hover {
        cursor: pointer;
      }
      &:not(:first-child) {
        border-left: none;
      }
      &.active {
        border-top-color: brown;
        border-bottom-color: transparent;
      }
    }
  }
}
</style>
