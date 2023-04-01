<script setup lang="ts">
import type { IRelativePlaylistItem, ISong } from '@pluto-music/api'
import type { PropType } from 'vue'
import { getSingers } from '/@/utils'
import AsideItem from './AsideItem.vue'

defineProps({
  relativePlaylist: {
    type: Array as PropType<IRelativePlaylistItem[]>,
    default: () => [],
  },
  similarSong: {
    type: Array as PropType<ISong[]>,
    default: () => [],
  },
})

const emit = defineEmits(['to-playlist', 'to-song', 'play-song'])

const handleShowAbout = () => {}
const handleToPlaylist = (id: number | string) => {
  emit('to-playlist', id)
}
const handleToSong = (id: number | string) => {
  emit('to-song', id)
}
const handlePlaySong = (song: ISong) => {
  emit('play-song', song)
}
</script>

<template>
  <AsideItem class="relative-playlist">
    <template #title>
      <span>包含这首歌的歌单</span>
    </template>

    <div v-for="(item, i) of relativePlaylist" :key="i" class="item">
      <div class="item-avatar">
        <img :src="item.coverImgUrl + '?param=50y50'" />
      </div>
      <div class="item-info">
        <p class="info-name" @click="handleToPlaylist(item.id)">
          {{ item.name }}
        </p>
        <p class="info-creator">
          <em>by</em>
          <em v-show="item.creator" class="creator-name" @click="handleShowAbout">{{
            item.creator.nickname
          }}</em>
        </p>
      </div>
    </div>
  </AsideItem>

  <AsideItem class="similar-song">
    <template #title>
      <span>相似歌曲</span>
    </template>

    <div v-for="(item, i) of similarSong" :key="i" class="item">
      <div class="item-info">
        <p class="info-name" @click="handleToSong(item.id)">{{ item.name }}</p>
        <p class="info-singers">
          <span class="singer-item" @click="handleShowAbout">{{ getSingers(item.artists) }}</span>
        </p>
      </div>
      <div class="item-ctrl">
        <span class="ctrl-play" @click="handlePlaySong(item)"></span>
        <span class="ctrl-add"></span>
      </div>
    </div>
  </AsideItem>
</template>

<style lang="scss" scoped>
.similar-song {
  .item {
    height: 30px;
    margin-bottom: 10px;
    line-height: 30px;
    .item-info {
      float: left;
      width: 150px;
      .info-name,
      .info-singers {
        height: 15px;
        line-height: 15px;
        @include ellipse();
      }
      .info-name {
        @include hoverText();
      }
      .info-singers {
        color: $inputInfo;
        .singer-item {
          &:hover {
            @include hoverText();
          }
        }
      }
    }
    .item-ctrl {
      float: right;
      width: 40px;
      .ctrl-play,
      .ctrl-add {
        float: left;
        width: 10px;
        height: 11px;
        margin: 10px 0 0 10px;
        &:hover {
          cursor: pointer;
        }
      }
      .ctrl-play {
        background: url('../../../public/img/icons/icon2.png') no-repeat -69px -455px;
      }
      .ctrl-add {
        background: url('../../../public/img/icons/icon2.png') no-repeat -87px -454px;
      }
    }
  }
}
.relative-playlist {
  .item {
    overflow: hidden;
    height: 50px;
    margin-bottom: 15px;
    .item-avatar {
      float: left;
      width: 50px;
      height: 50px;
      background-color: #ccc;
    }
    .item-info {
      float: left;
      width: 140px;
      margin-left: 10px;
      .info-name,
      .info-creator {
        height: 25px;
        line-height: 25px;
        @include ellipse();
      }
      .info-name {
        font-size: $fontMinL;
        @include hoverText();
      }
      .info-creator {
        color: $titleSub;
        .creator-name {
          margin-left: 5px;
          @include hoverText();
        }
      }
    }
  }
}
</style>
