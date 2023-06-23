<script setup lang="ts">
import { computed, nextTick, onMounted, ref, unref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '/@/store/module/layout'
import { usePlayerStore } from '/@/store/module/player'
import { formatArtists } from '/@/utils'

import PlayerNavbar from './components/PlayerNavbar.vue'
import PlayerAlbum from './components/PlayerAlbum.vue'
import PlayerLyric from './components/PlayerLyric.vue'

// import PlayerMenuBar from './components/PlayerMenuBar.vue'
import PlayerProgressBar from './components/PlayerProgressBar.vue'
import PlayerControlBar from './components/PlayerControlBar.vue'
import PlayerPlaylist from './components/PlayerPlaylist.vue'

const router = useRouter()
const playerStore = usePlayerStore()
const layoutStore = useLayoutStore()

const ct = ref(0) // 当前播放时间(currentTime * 1000)，单位为 ms
const audio = ref<HTMLAudioElement | null>(null)
const showPlaylist = ref(false) // 是否显示播放列表
const showLyric = ref(false) // 是否显示歌词

const showPlayer = computed(() => layoutStore.showPlayer)
const songId = computed(() => playerStore.songId)
const songUrl = computed(() => playerStore.songUrl)
const songName = computed(() => playerStore.songName)
const songAr = computed(() => playerStore.songAr)
const songPicUrl = computed(() => playerStore.songPicUrl)
const songDt = computed(() => playerStore.songDt)
const playlist = computed(() => playerStore.playlist)
const formattedAr = computed(() => unref(songAr)?.length ? `${formatArtists(unref(songAr))} >` : '')

watchEffect(() => {
  console.log('songId:', songId.value)
})

function handleHidePlayer() {
  layoutStore.toggleShowPlayer(false)
  showLyric.value = false
}

function handleShowComment() {
  router.push(`/comment/${unref(songId)}`)
  setTimeout(() => {
    layoutStore.toggleShowPlayer(false)
  }, 200)
}

function handleEnded() {
  playerStore.togglePlayNext()
}

// 不能在计算属性中获取 currentTime，这是一种变通：通过监听 timeupdate 事件，单位为 s
function handleTimeUpdate() {
  ct.value = (audio.value?.currentTime || 0) * 1000
}

function handleUpdateTime(ct: number) {
  audio.value!.currentTime = ct / 1000
}

function handleResetCt() {
  ct.value = 0
}

onMounted(() => {
  nextTick(() => {
    playerStore.setAudio(unref(audio) as HTMLAudioElement)
  })
})
</script>

<template>
  <div class="player" :class="{ 'is-show': showPlayer }">
    <BgMask :bg-image="songPicUrl" />

    <audio
      ref="audio"
      class="audio"
      autoplay
      :src="songUrl"
      @ended="handleEnded"
      @timeupdate="handleTimeUpdate"
    />

    <PlayerNavbar
      :song-name="songName"
      :artists="formattedAr"
      @hide-player="handleHidePlayer"
      @show-comment="handleShowComment"
    />

    <keep-alive>
      <div v-if="!showLyric" class="p-content-wrapper">
        <PlayerAlbum
          :img-url="songPicUrl"
          :name="songName"
          @click.native="showLyric = true"
        />
        <!-- <PlayerMenuBar /> -->
      </div>

      <PlayerLyric
        v-else
        :song-id="songId"
        :ct="ct"
        @click.native="showLyric = false"
      />
    </keep-alive>

    <PlayerProgressBar
      class="p-progress-bar"
      :ct="ct"
      :song-dt="songDt"
      @update-time="handleUpdateTime"
    />

    <PlayerControlBar
      @reset-ct="handleResetCt"
    />

    <Teleport to="body">
      <PlayerPlaylist
        v-model:showPlaylist="showPlaylist"
        :playlist="playlist"
        :song-id="songId"
      />
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/mixins.scss';

.player {
  z-index: 999;
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  transform: translateX(100%);
  background-color: #2f2f2f;
  transition: all .3s;
  &.is-show {
    transform: translate3d(0, 0, 0);
  }
  /* 隐藏 audio 元素 */
  .audio {
    position: absolute;
    visibility: hidden;
  }
}
</style>

<style lang="scss">
.p {
  &-Navbar {}
  &-content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    .p-album {
      flex: 1;
    }
    .p-menu-bar {
      height: .5rem;
    }
  }
  &-lyric {
    flex: 1;
  }
  &-progress-bar {
    /* padding: 0 .1rem; */
  }
  &-ctrl-bar {}
}
</style>
