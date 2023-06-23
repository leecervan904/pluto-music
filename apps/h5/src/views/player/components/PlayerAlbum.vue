<script lang="ts">
import { computed, defineComponent } from 'vue'
import { usePlayerStore } from '/@/store/module/player'

export default defineComponent({
  name: 'PlayerAlbum',
  props: {
    imgUrl: { type: String, default: '' },
    name: { type: String, default: '' },
  },
  setup() {
    const playerStore = usePlayerStore()
    const isPlay = computed(() => playerStore.isPlay)

    return {
      isPlay,
    }
  },
})
</script>

<template>
  <div class="p-album">
    <div class="p-album-wrapper">
      <div class="p-album-mask">
        <div class="p-album-track">
          <div class="p-album-img-wrapper">
            <img
              ref="img" class="p-album-img"
              :class="{ 'is-play': isPlay }"
              :src="`${imgUrl}?param=400y400`"
              :alt="name"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-album {
  &-wrapper {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  &-mask {
    position: relative;
    overflow: hidden;
    width: 80%;
    height: 0;
    padding-bottom: 80%;
    margin-left: 10%;
    background-color: rgba(255, 255, 255, .2);
    border-radius: 50%;
  }
  &-track {
    overflow: hidden;
    position: absolute;
    width: 94%;
    height: 0;
    padding-bottom: 94%;
    margin: 3%;
    background: radial-gradient(#333, #222, #000);
    border-radius: 50%;
  }
  &-img-wrapper {
    overflow: hidden;
    position: absolute;
    width: 70%;
    height: 0;
    padding-bottom: 70%;
    margin: 15%;
    background-color: rgba(255, 255, 255, .2);
    border-radius: 50%;
    .p-album-img {
      width: 100%;
      border-radius: 50%;
      transform: translate3d(0, 0, 0);
      animation: album-rotate 30s linear .5s infinite paused;
      &.is-play {
        animation-play-state: running;
      }
    }
  }
}

@keyframes album-rotate {
  0% { transform: rotateZ(0deg); }
  100% { transform: rotateZ(360deg); }
}
</style>
