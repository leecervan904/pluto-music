<template>
  <view class="m-song-item" @click.stop="onPlaySong">
    <!-- 序号 -->
    <view v-show="order" class="song-order">
      <view class="song-order__num" :class="{ hot: order < 4 }">{{ formatedOrder }}</view>
      <view class="song-order__change">- {{ 0 }}</view>
    </view>

    <!-- 主要信息 -->
    <view class="song-info">
      <view v-show="name" class="song-info__name">
        <text>{{ name }}</text>
        <text v-show="alia && aliaPost" class="name-alia">（{{ alia }}）</text>
      </view>
      <view class="song-info__detail">
        <text v-show="ar" class="detail-ar">{{ ar }}</text>
        <text v-show="alName" class="detail-sep"> - </text>
        <text v-show="alName" class="detail-al">{{ alName }}</text>
      </view>
      <view v-show="alia && !aliaPost" class="song-info__alia">{{ alia }}</view>
    </view>

    <!-- mv-icon -->
    <view v-if="song.mv" class="song-mv" @click.stop="handlePlayMv">
      <svg-icon icon-class="mv-tag"></svg-icon>
    </view>

    <!-- more-icon -->
    <view class="song-more" @click.stop="onShowMore">
      <svg-icon icon-class="more-vertical"></svg-icon>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { ISong } from '@pluto-music/api'
import { withDefaults } from 'vue'
// import { useLayoutStore } from '/@/store/module/layout'
// import { usePlayerStore } from '/@/store/module/player'

interface Props {
  // 歌曲序号
  order: number
  // alia 是否紧跟歌曲名
  aliaPost: boolean
  song: ISong
}

const props = withDefaults(defineProps<Props>(), {
  order: 0,
  aliaPost: false,
  song: () =>
    ({
      id: 0,
      name: '',
      ar: [],
      al: {},
      alia: [],
    } as unknown as ISong),
})

// const layoutStore = useLayoutStore()
// const playerStore = usePlayerStore()

/** 不提交 action，而是委托祖先组件完成
 * play-song: 播放歌曲
 * update-playlist: 更新整个播放列表
 */
const onPlaySong = () => {
  console.log('Select song:', props.song)
  const song = props.song.al && props.song.ar ? props.song : props.song.id
  // playerStore.playSong(song)
  // layoutStore.toggleShowPlayer(true)
  // playerStore.playSong('update-playlist')
}
</script>

<script lang="ts">
import { formatArtists } from '@pluto-music/shared'

export default {
  computed: {
    id() {
      return this.song.id
    },
    name() {
      return this.song.name
    },
    ar() {
      const ar = this.song.ar || this.song.artists
      return formatArtists(ar)
    },
    alId() {
      const al = this.song.al || this.song.album
      return al.id
    },
    alName() {
      const al = this.song.al || this.song.album
      return al.name
    },
    alia() {
      const alia = this.song.alia || this.song.alias
      return alia[0]
    },
    formatedOrder() {
      return this.order < 10 ? `0${this.order}` : this.order
    },
  },
  methods: {
    handlePlayMv() {
      this.$router.push(`/mv/${this.song.mv}`)
    },
    onShowMore() {},
  },
}
</script>

<style lang="scss" scoped>
.m-song-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #eee;

  /* order */
  .song-order {
    width: 60rpx;
    text-align: center;

    &__num,
    &__change {
      height: 20rpx;
      line-height: 20rpx;
    }

    &__num {
      font-size: 14px;
      &.hot {
        /* color: $color-palette-red; */
        color: red;
      }
    }

    &__change {
      /* font-size: $font--small-s; */
      font-size: 14px;
      color: #ccc;
    }
  }

  /* content */
  .song-info {
    overflow: hidden; // fix-bug：设置超出文本显示省略号无效
    flex: 1;
    &__name,
    &__detail,
    &__alia {
      @include ellipsis();
    }

    &__name {
      height: 30px;
      line-height: 30px;
      /* font-size: $font--medium-s; */
      font-size: 12px;

      .name-alia {
        color: #ccc;
      }
    }

    &__detail {
      height: 30px;
      line-height: 30px;
      /* font-size: $font--small-s; */
      font-size: 14px;
      color: #aaa;

      .detail-ar {
      }
      .detail-sep {
      }
      .detail-al {
      }
    }

    &__alia {
      height: 20rpx;
      line-height: 20rpx;
      font-size: 14px;
      color: #aaa;
    }
  }

  /* mv-icon, more-icon */
  .song-mv,
  .song-more {
    width: 35rpx;
    /* height: .35rem; */
    height: 100%;
    line-height: 35rpx;
    text-align: center;
    font-size: 14px;
  }
}
</style>
