<script setup lang="ts">
import type { IAlbum } from '@pluto-music/api'
import type { PropType } from 'vue'
import { dateFormat } from '/@/utils'
import AsideItem from './AsideItem.vue'

defineProps({
  albumLikes: {
    type: Array,
    default: () => [],
  },
  ownAlbums: {
    type: Array as PropType<IAlbum[]>,
    default: () => [],
  },
})

const emit = defineEmits(['to-album'])

const handleToAlbum = (album: IAlbum) => {
  emit('to-album', album.id)
}
const getFormatTime = (time: number) => dateFormat(time)
const handleShowAbout = () => {}
</script>

<template>
  <AsideItem class="album-likes">
    <template #title>
      <span>喜欢这个专辑的人</span>
    </template>

    <div v-for="i of 8" :key="i" class="item">
      <img src="../../../public/img/icons/user_default.jpg" @click="handleShowAbout" />
    </div>
  </AsideItem>

  <AsideItem class="own-albums">
    <template #title>
      Ta 的其他热门专辑
      <em class="title-more" @click="handleShowAbout">全部&gt;</em>
    </template>

    <div v-for="item of ownAlbums" :key="item.id" class="item" @click="handleToAlbum(item)">
      <div class="item-avatar">
        <img :src="item.picUrl + '?param=50y50'" />
      </div>
      <div class="item-info">
        <p class="info-name">{{ item.name }}</p>
        <p class="info-date">{{ getFormatTime(item.publishTime) }}</p>
      </div>
    </div>
  </AsideItem>
</template>

<style lang="scss" scoped>
.content {
  box-sizing: border-box;
  padding: 20px 40px 10px 30px;
  font-size: $fontMin;
  .title {
    height: 23px;
    margin-bottom: 20px;
    line-height: 23px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    .title-more {
      float: right;
      font-weight: normal;
      @include hoverText();
    }
  }
  .list {
    overflow: hidden;
  }
}
.own-albums {
  .item {
    overflow: hidden;
    height: 50px;
    margin-bottom: 15px;
    &:hover {
      cursor: pointer;
    }
    .item-avatar {
      float: left;
      width: 50px;
      height: 50px;
      background-color: #ccc;
    }
    .item-info {
      float: left;
      width: 140px;
      margin-left: 5px;
      .info-name,
      .info-date {
        height: 25px;
        line-height: 25px;
        @include ellipse();
      }
      .info-name {
        font-size: $fontMinL;
        @include hoverText();
      }
    }
  }
}
.album-likes {
  .item {
    float: left;
    width: 40px;
    height: 40px;
    margin-left: 12px;
    margin-bottom: 12px;
    background-color: #ccc;
    &:nth-child(1),
    &:nth-child(5) {
      margin-left: 0;
    }
  }
}
</style>
