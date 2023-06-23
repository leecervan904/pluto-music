<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import type { ISong } from '@pluto-music/api'
import { usePlayerStore } from '/@/store/module/player'
import { formatArtists } from '/@/utils'

interface PropsType {
  showPlaylist: boolean
  songId: number | string
  playlist: ISong[]
}

withDefaults(defineProps<PropsType>(), {
  showPlaylist: false,
  songId: 0,
  playlist: () => [],
})

const playerStore = usePlayerStore()

const isShow = computed({
  get() {
    return playerStore.showPlaylist
  },
  set(val) {
    playerStore.toggleShowPlaylist(val)
  },
})

function handlePlaySong(song: ISong) {
  playerStore.playSong(song, false)
}

function handleRemoveSong(songId: number | string) {
  // playerStore.removeSong(songId)
}
</script>

<template>
  <van-popup
    v-model:show="isShow"
    class="player-playlist"
    :style="{ height: '70%', padding: '0 20px 20px', background: 'transparent' }"
    round
    overlay
    position="bottom"
  >
    <div class="player-playlist__wrapper">
      <div class="pl-title">
        <span>当前播放</span>
        <span class="pl-title__count">({{ playlist.length }})</span>
      </div>
      <div class="pl-menu">
        <div class="pl-menu__left" />
      </div>
      <div class="pl-list">
        <p
          v-for="item of playlist"
          :key="item.id"
          class="pl-list__item"
          :class="{ 'is-play': item.id === songId }"
          @click="handlePlaySong(item)"
        >
          <svg-icon
            v-show="item.id === songId"
            class="item-sound"
            icon-class="sound"
          />
          <span class="item-name">{{ item.name }}</span>
          <span class="item-separator">-</span>
          <span class="item-ar">{{ formatArtists(item.ar) }}</span>
          <svg-icon
            class="item-close"
            icon-class="close"
            @click.stop="handleRemoveSong(item.id)"
          />
        </p>
      </div>
      <div class="pl-footer" @click="$emit('update:showPlaylist', false)">
        关 闭
      </div>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
@import '/@/styles/mixins.scss';

:deep(.player-playlist) {
  height: 300px;
}
.player-playlist {
  box-sizing: border-box;
  /* height: 70%; */
  height: 300px;
  font-size: .14rem;
  color: #000;
  padding: 0 .2rem .1rem;
  &__wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: .2rem;
  }

  .pl-title {
    box-sizing: border-box;
    height: .4rem;
    padding: 0 .1rem;
    line-height: .4rem;
    font-size: .18rem;
    color: #000;
    vertical-align: middle;
    /* background-color: #ccc; */
    &__count {
      font-size: .14rem;
      color: #ccc;
    }
  }
  .pl-list-wrapper {
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
    height: 0;
    padding: 0 .1rem;
  }
  .pl-list {
    color: #000;
    &__item {
      box-sizing: border-box;
      display: flex;
      padding: 0 5px;
      height: .4rem;
      line-height: .4rem;
      font-size: 14px;
      &.is-play {
        .item-name, .item-separator, .item-ar {
          color: red !important;
        }
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgb(225, 225, 225);
      }
      .item-sound {
        color: red;
        margin-right: 5px;
        font-size: .18rem;
      }
      .item-name {
        max-width: 60%;
        @include ellipsis();
      }
      .item-separator {
        width: 10px;
        text-align: center;
      }
      .item-ar {
        flex: 1;
        font-size: .12rem;
        color: #868686;
        @include ellipsis();
      }
      .item-close {
        font-size: .16rem;
        color: #868686;
      }
    }
  }
  .pl-footer {
    height: .4rem;
    line-height: .4rem;
    font-size: .20rem;
    text-align: center;
    border-top: 1px solid rgb(225, 225, 225);
  }
}
</style>
