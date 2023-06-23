<script setup lang="ts">
import type { ISong } from '@pluto-music/api'
import { withDefaults } from 'vue'
import { useLayoutStore } from '/@/store/module/layout'
import { usePlayerStore } from '/@/store/module/player'
</script>

<script lang="ts">
import { formatArtists } from '/@/utils'

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

const layoutStore = useLayoutStore()
const playerStore = usePlayerStore()

/** 不提交 action，而是委托祖先组件完成
 * play-song: 播放歌曲
 * update-playlist: 更新整个播放列表
 */
function onPlaySong() {
  console.log('Select song:', props.song)
  const song = props.song.al && props.song.ar ? props.song : props.song.id
  playerStore.playSong(song)
  layoutStore.toggleShowPlayer(true)
  // playerStore.playSong('update-playlist')
}

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

<template>
  <div class="m-song-item" @click.stop="onPlaySong">
    <!-- 序号 -->
    <div v-show="order" class="song-order">
      <p class="song-order__num" :class="{ hot: order < 4 }">
        {{ formatedOrder }}
      </p>
      <p class="song-order__change">
        - {{ 0 }}
      </p>
    </div>

    <!-- 主要信息 -->
    <div class="song-info">
      <p v-show="name" class="song-info__name">
        <span>{{ name }}</span>
        <span v-show="alia && aliaPost" class="name-alia">（{{ alia }}）</span>
      </p>
      <p class="song-info__detail">
        <span v-show="ar" class="detail-ar">{{ ar }}</span>
        <span v-show="alName" class="detail-sep"> - </span>
        <span v-show="alName" class="detail-al">{{ alName }}</span>
      </p>
      <p v-show="alia && !aliaPost" class="song-info__alia">
        {{ alia }}
      </p>
    </div>

    <!-- mv-icon -->
    <div v-if="song.mv" class="song-mv" @click.stop="handlePlayMv">
      <svg-icon icon-class="mv-tag" />
    </div>

    <!-- more-icon -->
    <div v-coming="''" class="song-more" @click.stop="onShowMore">
      <svg-icon icon-class="more-vertical" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import '/@/styles/mixins.scss';

.m-song-item {
  display: flex;
  align-items: center;
  padding: 0.05rem 0;
  border-bottom: 1px solid #eee;

  /* order */
  .song-order {
    width: 0.4rem;
    text-align: center;

    &__num,
    &__change {
      height: 0.2rem;
      line-height: 0.2rem;
    }

    &__num {
      font-size: $font--medium-s;
      &.hot {
        color: $color-palette-red;
      }
    }

    &__change {
      font-size: $font--small-s;
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
      height: 0.25rem;
      line-height: 0.2rem;
      font-size: $font--medium-s;

      .name-alia {
        color: #ccc;
      }
    }

    &__detail {
      height: 0.2rem;
      line-height: 0.2rem;
      font-size: $font--small-s;
      color: #aaa;

      .detail-ar {
      }
      .detail-sep {
      }
      .detail-al {
      }
    }

    &__alia {
      height: 0.2rem;
      line-height: 0.2rem;
      font-size: $font--small-s;
      color: #aaa;
    }
  }

  /* mv-icon, more-icon */
  .song-mv,
  .song-more {
    width: 0.35rem;
    /* height: .35rem; */
    height: 100%;
    line-height: 0.35rem;
    text-align: center;
    font-size: $font--medium-s;
  }
}
</style>
