<script lang="ts">
import type { ISong } from '@pluto-music/api'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '/@/store/module/player'
import { getDuration } from '/@/utils'

export default defineComponent({
  name: 'RankListTable',
  props: {
    songList: {
      type: Array as PropType<ISong[]>,
      default: () => [],
    },
  },
  emits: ['play', 'add-playlist', 'to-artist'],
  setup() {
    const router = useRouter()
    const playerStore = usePlayerStore()

    const handleToArtist = (id: string | number) => {
      router.push({ name: 'artist', query: { id } })
    }

    const handleAddToPlaylist = (song: ISong) => {
      playerStore.addToPlaylist(song)
    }

    const handlePlay = (song: ISong) => {
      playerStore.playSong(song)
    }

    return {
      getDuration,
      handleToArtist,
      handlePlay,
      handleAddToPlaylist,
      handleShowAbout: () => {},
    }
  },
})
</script>

<template>
  <table v-show="songList.length" class="table">
    <thead>
      <tr class="header">
        <th class="th-indent" />
        <th class="th-title">
          标题
        </th>
        <th class="th-duration">
          时长
        </th>
        <th class="th-singers">
          歌手
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) of songList" :key="i" class="song">
        <td class="td-indent">
          <span class="td-indent-order">{{ i + 1 }}</span>
          <span class="td-indent-update">
            <em class="td-indent__icon-default">0</em>
            <!-- <em class="td-indent__icon-new"></em> -->
            <!-- <em class="td-indent__icon-up">9</em> -->
            <!-- <em class="td-indent__icon-down">12</em> -->
          </span>
        </td>
        <td class="td-title">
          <span v-show="i < 3" class="td-title-img">
            <img :src="`${item.al.picUrl}?param=50y50`" alt="">
          </span>
          <div class="td-title-more">
            <span class="td-title__icon-play" @click="handlePlay(songList[i])">&nbsp;</span>
            <span class="td-title-name">
              <router-link :to="`/song?id=${item.id}`" class="td-title-name-main">{{
                item.name
              }}</router-link>
              <em v-show="item.alia.length" class="td-title-name-sub">- ({{ item.alia[0] }})</em>
            </span>
            <span
              v-if="item.mv > 0"
              class="td-title__icon-mv"
              @click="$router.push(`/mv?id=${item.mv}`)"
            >&nbsp;</span>
          </div>
        </td>
        <td class="td-duration">
          <span class="td-duration-time">{{ getDuration(item.dt) }}</span>
          <div class="td-duration__options">
            <span class="td-duration__options__icon-add" @click="handleAddToPlaylist(item)" />
            <span class="td-duration__options__icon-collect" @click="handleShowAbout" />
            <span class="td-duration__options__icon-share" @click="handleShowAbout" />
            <span class="td-duration__options__icon-download" @click="handleShowAbout" />
          </div>
        </td>
        <td class="td-singers">
          <span v-for="(singer, index) of item.ar" :key="index" @click="handleToArtist(singer.id)">
            <em href="" class="td-singers-name" @click="handleShowAbout">{{ singer.name }}</em>
            <em v-show="index < item.ar.length - 1" class="td-singers-devide"> / </em>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
/* @import '@/styles/variables.scss'; */
/* @import '@/styles/mixins.scss'; */

table,
th,
td {
  box-sizing: border-box;
}
.table {
  border: 1px solid $bdcDefault;
  border-top: none;
  font-size: $fontMin;
  thead {
    tr.header {
      height: 35px;
      border-bottom: 1px solid $bdcDefault;
      th.th-indent {
        width: 78px;
      }
      th.th-title {
        width: 310px;
      }
      th.th-duration {
        width: 90px;
      }
      th.th-singers {
        width: 180px;
      }
      th:not(:first-child) {
        padding-left: 7px;
        border-left: 1px solid $bdcDefault;
      }
    }
  }
  tbody {
    tr:nth-child(odd) {
      background-color: $bgTableLight;
    }
    td {
      padding-left: 7px;
      height: 30px;
    }
  }
}

.song {
  /* 前三个条目 */
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    .td-title > .td-title-more {
      margin-top: 15px;
    }
  }
  /* 鼠标悬停时显示额外的选项 */
  &:hover {
    .td-duration .td-duration-time {
      display: none;
    }
    .td-duration > .td-duration__options {
      display: block;
    }
  }
  span {
    float: left;
  }
  .td-indent {
    .td-indent-order,
    .td-indent-update {
      margin-left: 8px;
      height: 17px;
      line-height: 17px;
    }
    .td-indent-update {
      margin-left: 16px;
      font-size: $fontExtraMin;
      em {
        float: left;
        height: 17px;
      }
      .td-indent__icon-default {
        width: 14px;
        padding-left: 8px;
        padding-top: 1px;
        color: $textLinkDefault;
      }
      .td-indent__icon-new {
        width: 16px;
      }
      .td-indent__icon-up {
        width: 14px;
        padding-left: 8px;
        color: $bgSubHeader;
      }
      .td-indent__icon-down {
        width: 14px;
        padding-left: 8px;
        color: $bgSubHeader;
      }
    }
  }
  .td-title {
    padding: 15px 5px;
    .td-title-img {
      margin-right: 10px;
      img {
        width: 50px;
      }
    }
    .td-title-more {
      height: 20px;
      line-height: 20px;
      .td-title__icon-play {
        width: 17px;
        height: 17px;
        margin-right: 8px;
      }
      .td-title-name {
        max-width: 180px;
        height: 17px;
        @include ellipse();
        .td-title-name-main {
          @include hoverText();
        }
        .td-title-name-sub {
          color: $textLinkDefault;
        }
      }
      .td-title__icon-mv {
        width: 23px;
        height: 17px;
        margin-left: 5px;
      }
    }
  }
  .td-duration {
    position: relative;
    &__options {
      display: none;
      margin-top: 5px;
      height: 20px;
      &__icon-add {
        width: 13px;
        height: 13px;
      }
      &__icon-collect {
        width: 18px;
        height: 16px;
        margin-left: 3px;
      }
      &__icon-share {
        width: 18px;
        height: 16px;
        margin-left: 3px;
      }
      &__icon-download {
        width: 18px;
        height: 16px;
        margin-left: 3px;
      }
    }
  }
  .td-singers {
    span {
      float: none;
    }
    max-width: 170px;
    color: $textLinkDefault;
    @include ellipse();
    .td-singers-name {
      @include hoverText();
    }
  }
}
</style>
