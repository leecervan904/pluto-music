<template>
  <div class="ms">
    <div class="ms-header">搜索结果：</div>
    <ul class="ms-list">
      <!-- 单曲 -->
      <li v-if="searchResult.songs" class="list-item">
        <h3 class="title-left">
          <i class="title-left__icon-song"></i>
          <em>单曲</em>
        </h3>
        <ul class="sub-list">
          <li v-for="(item, i) of searchResult.songs" :key="i" class="sub-item">
            <router-link :to="`/song?id=${item.id}`"
              >{{ item.name }} - {{ getSingers(item.artists) }}</router-link
            >
          </li>
        </ul>
      </li>
      <!-- 歌手 -->
      <li v-if="searchResult.artists" class="list-item">
        <h3 class="title-left">
          <i class="title-left__icon-singer"></i>
          <em>歌手</em>
        </h3>
        <ul class="sub-list">
          <li v-for="(item, i) of searchResult.artists" :key="i" class="sub-item">
            {{ item.name }}
          </li>
        </ul>
      </li>
      <!-- 专辑 -->
      <li v-if="searchResult.albums" class="list-item">
        <h3 class="title-left">
          <i class="title-left__icon-album"></i>
          <em>专辑</em>
        </h3>
        <ul class="sub-list">
          <li v-for="(item, i) of searchResult.albums" :key="i" class="sub-item">
            <router-link :to="`/album?id=${item.id}`"
              >{{ item.name }} - {{ item.artist.name }}</router-link
            >
          </li>
        </ul>
      </li>
      <!-- 视频 -->
      <li v-if="searchResult.mvs" class="list-item">
        <h3 class="title-left">
          <i class="title-left__icon-video"></i>
          <em>视频</em>
        </h3>
        <ul class="sub-list">
          <li v-for="(item, i) of searchResult.mvs" :key="i" class="sub-item">
            {{ item.name }} - {{ getSingers(item.artists) }}
          </li>
        </ul>
      </li>
      <!-- 歌单 -->
      <li v-if="searchResult.playlists" class="list-item">
        <h3 class="title-left">
          <a class="title-left__icon-playlist"></a>
          <em>歌单</em>
        </h3>
        <ul class="sub-list">
          <li v-for="(item, i) of searchResult.playlists" :key="i" class="sub-item">
            <router-link :to="`/playlist?id=${item.id}`">{{ item.name }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ISearchResult } from '@pluto-music/api'
import type { PropType } from 'vue'
import { getSingers } from '/@/utils'

defineProps({
  searchResult: {
    type: Object as PropType<ISearchResult>,
    default: () => {},
  },
})
</script>

<style lang="scss" scoped>
.ms {
  overflow: hidden;
  width: 240px;
  font-size: $fontMin;
  background-color: $bgDefault;
  border: 2px solid $bdcDefault;
  border-radius: 5px;
  .ms-header {
    height: 17px;
    padding: 11px 10px;
    line-height: 17px;
    border-bottom: 1px solid $bdcDefault;
  }
  .ms-list {
    .list-item {
      float: left;
      &:last-child {
        .sub-list {
          border-bottom: none;
        }
      }
      &:nth-child(even) {
        .sub-list {
          background-color: $bgTableLight;
        }
      }
      .title-left {
        box-sizing: border-box;
        padding: 8px;
        float: left;
        width: 65px;
      }
      .sub-list {
        box-sizing: border-box;
        float: left;
        padding: 5px 0 5px 8px;
        width: 175px;
        line-height: 25px;
        border-left: 1px solid $bdcDefault;
        border-bottom: 1px solid $bdcDefault;
        .sub-item {
          padding-right: 5px;
          @include ellipse();
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
