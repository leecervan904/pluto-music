<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { PlayMode, usePlayerStore } from '/@/store/module/player'
import { getSingers } from '/@/utils'

import ProgressBar from './components/ProgressBar.vue'
import PlayContent from './components/PlayContent.vue'

const router = useRouter()
const playerStore = usePlayerStore()

const playbar = ref<HTMLElement | null>(null)
const refAudio = ref<HTMLAudioElement | null>(null)

onMounted(() => {
  playerStore.setAudio(refAudio.value!)
})

const { songId, songName, songUrl, songPicUrl, songAr, songDt, playlist, playMode, isPlay, ctime }
  = storeToRefs(playerStore)

const singers = computed(() => getSingers(songAr.value))

const isBarLock = ref(false)
const isShowPlayContent = ref(false) // 是否显示播放窗口
const isShowVoice = ref(false) // 是否显示音量控制

const playbarLockCls = computed(() => {
  return ['icon', isBarLock.value ? 'playbar__right-bg--lock' : 'playbar__right-bg--open']
})

const mainCtrlCls = computed(() => {
  return [
    'ctrl-play',
    'playbar__play',
    !isPlay.value ? 'playbar__play--paused' : 'playbar__play--playing',
  ]
})

const nowModeCls = computed(() => {
  switch (playMode.value) {
    case PlayMode.LOOP:
      return 'playbar__mode--list-cycle'
    case PlayMode.RANDOM:
      return 'playbar__mode--random-play'
    case PlayMode.SINGLE:
      return 'playbar__mode--single-cycle'
    default:
      return 'playbar__mode--list-cycle'
  }
})

const handlePlay = playerStore.togglePlay
const handlePlayPrev = playerStore.togglePlayPrev
const handlePlayNext = playerStore.togglePlayNext
const handleChangePlayMode = playerStore.togglePlayMode
// 播放时间改变时
const handleTimeupdate = playerStore.onTimeUpdate
// 子组件改变播放时间
function handleBarUpdate(time: number) {
  playerStore.setCTime(time, true)
}

function handleShowAbout() {}
function handleShowPlayContent() {
  isShowPlayContent.value = !isShowPlayContent.value
}
function handleChangeVoice() {
  isShowVoice.value = !isShowVoice.value
}
function toSongView() {
  router.push({ path: '/song', query: { id: songId.value } })
}
function handleLock() {
  isBarLock.value = !isBarLock.value
}
</script>

<template>
  <div ref="playbar" class="playbar" :class="[{ 'is-locked': isBarLock }]">
    <div class="right-bg playbar__right-bg">
      <span :class="playbarLockCls" @click="handleLock" />
    </div>
    <div class="right-scroll playbar__right-scroll" />
    <div class="left-bg playbar__left-bg" />
    <div class="content">
      <div class="main-ctrl">
        <span class="ctrl-prev playbar__prev" @click="handlePlayPrev" />
        <span :class="mainCtrlCls" @click="handlePlay" />
        <span class="ctrl-next playbar__next" @click="handlePlayNext(false)" />
      </div>
      <div class="song-info">
        <div class="info-pic">
          <img v-if="songPicUrl" class="pic" :src="`${songPicUrl}?param=50y50`">
          <a href="#" class="info-href playbar__song-link" @click="toSongView" />
        </div>
        <div class="info-gp">
          <div class="info-title">
            <a class="info-title-name" @click="toSongView">{{ songName }}</a>
            <a class="info-title-singer">{{ singers }}</a>
            <a v-show="songName" class="info-title-icon playbar__song-from">&nbsp;</a>
          </div>
          <ProgressBar :duration="songDt" :current-time="ctime" @update="handleBarUpdate" />
        </div>
      </div>
      <div class="more-ctrl">
        <div class="voice-column" :class="[{ 'voice-column-shown': isShowVoice }]">
          <div class="column-line" />
          <div class="column-btn" />
        </div>
        <a href="#" class="ctrl-voice playbar__voice" @click.prevent="handleChangeVoice" />
        <a href="#" class="ctrl-mode" :class="[nowModeCls]" @click.prevent="handleChangePlayMode" />
        <a class="ctrl-list playbar__list" @click="handleShowPlayContent">
          <em>{{ playlist.length }}</em>
        </a>
      </div>
      <div class="other-options">
        <a href="#" class="op-collect playbar__collect" @click="handleShowAbout" />
        <a href="#" class="op-share playbar__share" @click="handleShowAbout" />
      </div>
    </div>
    <div class="audio-wrapper">
      <audio
        ref="refAudio"
        controls
        :src="songUrl"
        @timeupdate="handleTimeupdate"
        @ended="handlePlayNext(true)"
      >
        <source src="" type="">
      </audio>
    </div>

    <transition name="slide">
      <PlayContent
        v-show="isShowPlayContent"
        class="play-wrapper"
        :current-time="ctime"
        @close="handleShowPlayContent"
      />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.playbar {
  z-index: 99;
  position: fixed;
  bottom: -43px;
  width: 100%;
  height: 53px;
  transition: all 0.5s;
  &.is-locked {
    bottom: 0;
  }
  &:hover {
    bottom: 0 !important;
  }
  .right-bg {
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 67px;
    .icon {
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .right-scroll {
    position: absolute;
    top: -1px;
    right: 0px;
    width: 15px;
    height: 54px;
  }
  .left-bg {
    height: 53px;
    margin-right: 67px;
  }
}
.content {
  z-index: 99;
  position: absolute;
  top: 6px;
  left: 50%;
  margin-left: -490px;
  width: 980px;
  height: 47px;
  .main-ctrl {
    float: left;
    padding-top: 6px;
    width: 137px;
    height: 42px;
    .ctrl-prev {
      float: left;
      width: 28px;
      height: 28px;
      margin-top: 5px;
      margin-right: 8px;
    }
    .ctrl-play {
      float: left;
      width: 36px;
      height: 36px;
      margin-right: 8px;
    }
    .ctrl-next {
      float: left;
      width: 28px;
      height: 28px;
      margin-top: 5px;
      margin-right: 8px;
    }
  }
  .song-info {
    .info-pic {
      position: relative;
      float: left;
      margin: 6px 15px 0 0;
      width: 34px;
      height: 34px;
      .pic {
        width: 100%;
      }
      .info-href {
        position: absolute;
        top: 0;
        left: 0;
        width: 34px;
        height: 35px;
      }
    }
    .info-gp {
      float: left;
      .info-title {
        width: 100%;
        height: 28px;
        line-height: 28px;
        a {
          float: left;
          margin-right: 10px;
          font-size: $fontMin;
          &:not(:last-child):hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .info-title-name {
          color: $textLight;
        }
        .info-title-singer {
          color: $inputInfo;
        }
        .info-title-icon {
          width: 14px;
          height: 15px;
          margin: 7px 0 0 3px;
        }
      }
    }
  }
  .other-options {
    float: right;
    .op-collect,
    .op-share {
      float: left;
      width: 25px;
      height: 25px;
      margin: 11px 2px 0 0;
    }
  }
  .more-ctrl {
    position: relative;
    float: right;
    .voice-column {
      display: none;
      position: absolute;
      width: 32px;
      height: 113px;
      top: -112px;
      left: -3px;
      background: url('../../../public/img/icons/playbar.png') 0 -503px;
      &-shown {
        display: block;
      }
      .column-line {
        position: absolute;
        width: 4px;
        height: 0px; // max: 100px
        left: 14px;
        bottom: 9px;
        background: url('../../../public/img/icons/playbar.png') -40px bottom;
      }
      .column-btn {
        position: absolute;
        width: 18px;
        height: 19px;
        left: 7px;
        bottom: 0;
        background: url('../../../public/img/icons/iconall.png') -40px -250px;
        &:hover {
          background: url('../../../public/img/icons/iconall.png') -40px -280px;
        }
      }
    }
    .ctrl-voice,
    .ctrl-mode {
      float: left;
      width: 25px;
      height: 25px;
      margin: 11px 2px 0 0;
    }
    .ctrl-list {
      float: left;
      width: 59px;
      height: 25px;
      margin: 11px 2px 0 0;
      line-height: 26px;
      text-indent: 29px;
      font-size: $fontMin;
      color: $homeLogin;
      &:hover {
        cursor: pointer;
        color: $textLight;
      }
    }
  }
}
.audio-wrapper {
  visibility: hidden;
  position: absolute;
  top: -60px;
}

.playbar {
  .play-wrapper {
    z-index: 10;
    position: absolute;
    top: -295px;
    width: 982px;
    height: 300px;
    margin-left: 50%;
    left: -491px;
  }
}

.slide-enter,
.slide-leave-to {
  transform: translateY(300px);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-out;
}
</style>
