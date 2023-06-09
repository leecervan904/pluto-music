<script lang="ts">
import { defineComponent } from 'vue'
import { usePlayerStore } from '/@/store/module/player'
import { picUrlFormat, useRequest } from '/@/utils'

export default defineComponent({
  name: 'PlayListCard',
  props: {
    info: {
      type: Object,
      default: () => ({
        playCount: 8000,
        name: '珍藏在光影中的...',
      }),
    },
    titleEllipsis: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const playerStore = usePlayerStore()
    const handlePlayAll = async () => {
      const [error, data] = await useRequest('getPlaylistDetail')({ id: props.info.id })
      if (error)
        return

      const { trackIds, id } = data.playlist
      const [error2, data2] = await useRequest('getSongDetail')({ id: trackIds.map(v => v.id) })
      if (error2)
        return

      playerStore.updatePlaylist(data2.songs, id)
    }

    return {
      handlePlayAll,
    }
  },
  computed: {
    playCount() {
      const count = this.info.playCount
      return count > 100000 ? `${Math.floor(count / 10000)}万` : count
    },
    picUrl() {
      // info 传入的图片键名不一定
      const picUrl = this.info.picUrl || this.info.coverImgUrl
      return picUrlFormat(picUrl, 140, 140)
    },
  },
})
</script>

<template>
  <div class="content">
    <div class="wrapper">
      <img :src="picUrl" class="img">
      <router-link :to="`/playlist?id=${info.id}`" class="img-link" />
      <div class="info">
        <span class="info-headset" />
        <span class="info-count">{{ playCount }}</span>
        <span class="info-play" @click="handlePlayAll" />
      </div>
    </div>
    <router-link :to="`/playlist?id=${info.id}`" class="title">
      <p class="title-name" :class="[titleEllipsis ? 'ellipsis' : '']">
        {{ info.name }}
      </p>
    </router-link>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 140px;
  .wrapper {
    position: relative;
    height: 140px;
    background-color: #ccc;
    .img {
      width: 140px;
    }
    .img-link {
      position: absolute;
      left: 0;
      top: 0;
      width: 140px;
      height: 140px;
      background: url('../../../public/img/icons/coverall.png') no-repeat 0 0;
    }
    .info {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 27px;
      font-size: $fontMin;
      color: $textInfoLight;
      background: url('../../../public/img/icons/coverall.png') no-repeat 0 -537px;
      .info-headset {
        float: left;
        width: 14px;
        height: 11px;
        margin: 9px 5px 9px 10px;
        background: url('../../../public/img/icons/iconall.png') no-repeat 0 -24px;
      }
      .info-count {
        float: left;
        margin-top: 9px;
      }
      .info-play {
        position: absolute;
        right: 10px;
        bottom: 5px;
        width: 16px;
        height: 17px;
        background: url('../../../public/img/icons/iconall.png') no-repeat 0 0;
        &:hover {
          cursor: pointer;
          background: url('../../../public/img/icons/iconall.png') no-repeat 0 -60px;
        }
      }
    }
  }
  .title {
    margin: 8px 0 3px;
    font-size: $fontMinL;
    line-height: 1.4;
    font-family: $ffDefault;
    @include hoverText();
    .title-name {
    }
    .ellipsis {
      @include ellipse();
    }
  }
  a {
    @include hoverText();
  }
}
</style>
