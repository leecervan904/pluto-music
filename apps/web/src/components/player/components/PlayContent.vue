<template>
  <div v-if="songId" class="pc">
    <div class="pc-header">
      <div class="header-left">
        <h3 class="header-title">播放列表(92)</h3>
        <div class="header-ctrl">
          <span class="header-ctrl__collect">
            <i class="icon header-ctrl__collect__icon"></i>收藏全部
          </span>
          <span class="line"></span>
          <span class="header-ctrl__clear" @click="handleClearPlaylist()">
            <i class="icon header-ctrl__clear__icon"></i>清除
          </span>
        </div>
      </div>
      <div class="header-right">
        <div class="title">{{ songName }}</div>
        <span class="header-right__close" @click="handleCloseContent"></span>
      </div>
    </div>
    <div class="pc-wrapper">
      <ul class="wr-left">
        <li
          v-for="(item, i) of playlist"
          :key="i"
          :class="['song', { 'song-play': item.id === songId }]"
          @click="handleToPlay(item)"
        >
          <span v-show="item.id === songId" class="song-tag"></span>
          <h4 class="song-name">{{ item.name }}</h4>
          <span class="song-ctrl">
            <i class="ctrl-icon song-ctrl__icon-collect" @click.stop="handleShowAbout()"></i>
            <i class="ctrl-icon song-ctrl__icon-share" @click.stop="handleShowAbout()"></i>
            <i class="ctrl-icon song-ctrl__icon-download" @click.stop="handleShowAbout()"></i>
            <i class="ctrl-icon song-ctrl__icon-delete" @click.stop="handleDelete(item)"></i>
          </span>
          <span class="song-singer">{{ getSingers(item.ar) }}</span>
          <span class="song-duration">{{ getDuration(item.dt) }}</span>
          <span class="song-from"></span>
        </li>
      </ul>

      <div ref="lyricWrapper" class="wr-right">
        <ul ref="content" class="lyric">
          <li
            v-for="(item, i) of lyrics"
            :key="i"
            :class="['lyric-item', { 'lyric-item-active': i === 1 }]"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISong } from '@pluto-music/api'
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '/@/store/module/player'
import { useRequest, getSingers, getDuration } from '/@/utils'

defineProps({
  currentTime: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['close'])

const playerStore = usePlayerStore()

const { songId, songName, playlist } = storeToRefs(playerStore)

const lyric = ref('')
const lyrics = computed(() => lyric.value.split('\n').map((v) => v.replace(/[\[\]\d\:\.]+/, '')))

async function initialData() {
  const [error, data] = await useRequest('getLyric')({ id: songId.value as number })
  if (error) return
  lyric.value = data.lrc.lyric || ''
}

onMounted(() => {
  if (songId.value) {
    initialData()
  }
})

function handleCloseContent() {
  emits('close')
}
function handleToPlay(item: ISong) {
  playerStore.playSong(item)
}
function handleClearPlaylist() {
  playerStore.clearPlaylist()
}
function handleDelete(item: ISong) {
  playerStore.deleteFromPlaylist(item)
}
function handleShowAbout() {
  // playerStore.commit('SHOW_ABOUT_SITE')
}

watch(songId, initialData)
</script>

<style lang="scss" scoped>
.pc {
  background-color: #000;
  color: $textLight;
  border-radius: 10px;
  .pc-header {
    height: 41px;
    .header-left {
      box-sizing: border-box;
      float: left;
      width: 580px;
      height: 41px;
      padding-left: 25px;
      line-height: 41px;
      .header-title {
        float: left;
        font-weight: bold;
        font-size: $fontMinL;
      }
      .header-ctrl {
        float: right;
        margin-right: 25px;
        font-size: $fontMin;
        color: $textLinkDefault;
        &__collect,
        &__clear {
          float: left;
          margin: 0 10px;
          .icon {
            float: left;
            width: 16px;
            height: 15px;
            margin-top: 12px;
            margin-right: 5px;
          }
        }
        .line {
          float: left;
          height: 15px;
          margin: 12px 5px 5px 5px;
          @include divideLine();
        }
      }
    }
    .header-right {
      position: relative;
      float: left;
      width: 402px;
      .title {
        line-height: 41px;
        text-align: center;
      }
      &__close {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
      }
    }
  }
  .pc-wrapper {
    display: flex;
    height: 260px;
    font-size: $fontMin;
    color: $textLinkDefault;
    .wr-left {
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 8px;
        background-color: rgba(0, 0, 0, 0.05);
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
      }
      float: left;
      width: 580px;
      height: 259px;
      background-color: rgba(0, 0, 0, 0.3);
      .song {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding-left: 30px;
        &-play {
          color: $textLight;
        }
        &:hover {
          cursor: pointer;
          color: $textLight;
          .song-ctrl {
            visibility: visible;
          }
        }
        .song-tag {
          position: absolute;
          width: 10px;
          height: 13px;
          top: 6px;
          left: 10px;
        }
        .song-name {
          float: left;
          width: 280px;
          @include ellipse();
        }
        .song-ctrl {
          visibility: hidden;
          float: left;
          width: 88px;
          height: 28px;
          .ctrl-icon {
            float: left;
            width: 16px;
            height: 16px;
          }
        }
        .song-singer {
          float: left;
          width: 80px;
          @include ellipse();
        }
        .song-duration {
          float: left;
          width: 45px;
          margin-left: 10px;
          @include ellipse();
        }
        .song-from {
          float: left;
          width: 14px;
          height: 16px;
          margin: 6px 10px;
        }
      }
    }
    .wr-right {
      flex: 1;
      overflow-y: scroll;
      position: relative;
      width: 402px;
      height: 259px;
      &::-webkit-scrollbar {
        width: 8px;
        background-color: rgba(0, 0, 0, 0.05);
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
      }
      .lyric {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        top: 100px;
        padding-bottom: 130px;
        transition: all 0.2s;
        .lyric-item {
          display: block;
          text-align: center;
          line-height: 30px;
          padding: 3px 10px;
          &-active {
            color: $textLight;
            font-size: $fontMinL;
          }
        }
      }
    }
  }
}
</style>
