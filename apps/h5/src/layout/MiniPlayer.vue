<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '/@/store/module/layout'
import { usePlayerStore } from '/@/store/module/player'
import { formatArtists } from '/@/utils'

const layoutStore = useLayoutStore()
const playerStore = usePlayerStore()

const {
  isPlay,
  songName,
  songAr,
} = storeToRefs(playerStore)

const handleTogglePlay = () => {
  playerStore.togglePlay()
}

const handleShowPlaylist = () => {
  playerStore.toggleShowPlaylist(true)
}

const handleShowPlayer = async () => {
  layoutStore.toggleShowPlayer(true)
}
</script>

<template>
  <div class="mini-player" @click="handleShowPlayer">
    <div class="mini-player__album">
      <SvgProgress />
    </div>

    <div class="mini-player__song">
      <div v-if="songName">
        <span class="title">{{ songName }}</span>
        <span> - </span>
        <span class="artist">{{ formatArtists(songAr) }}</span>
      </div>
    </div>

    <div class="mini-player__control" @click.stop="handleTogglePlay">
      <SvgIcon v-if="isPlay" icon-class="pause" />
      <SvgIcon v-else icon-class="play" />
    </div>

    <div class="mini-player__playlist" @click.stop="handleShowPlaylist">
      <SvgIcon icon-class="config" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/mixins.scss';

.mini-player {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  &__album {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: darkorchid;
  }

  &__song {
    flex: 1;
    padding: 0 5px;
    font-size: 14px;
    @include ellipsis();
    .title {

    }
    .artist {
      color: #615a5a;
    }
  }

  &__control {
    width: 30px;
  }

  &__playlist {
    margin-left: 10px;
    width: 30px;
  }
}
</style>
