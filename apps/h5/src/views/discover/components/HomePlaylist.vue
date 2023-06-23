<script setup lang="ts">
import { onMounted, ref, unref } from 'vue'
import type { GetRelatedPlaylistParams, IRelativePlaylistItem } from '@pluto-music/api'
import { useRequest } from '/@/utils/useRequest'
import PlaylistItem from '/@/components/playlist-item/index.vue'

const cateHot = {
  title: '最热',
  order: 'hot',
}
const cateNew = {
  title: '最新',
  order: 'new',
}
const activeOrder = ref('hot')
const loading = ref(false)
const activePlaylist = ref<Partial<IRelativePlaylistItem>[]>([])

const itemWidth = document.body.clientWidth * 0.25
const contentHeight = `calc(${unref(itemWidth) + 36}px)`

async function initData(params: GetRelatedPlaylistParams) {
  console.log(params)
  loading.value = true
  const [error, data] = await useRequest('getTopPlaylist')(params)
  loading.value = false

  if (error)
    return
  activePlaylist.value = data.playlists.map(v => ({
    id: v.id,
    name: v.name,
    description: v.description,
    coverImgUrl: v.coverImgUrl,
    playCount: v.playCount,
  }))
}

function handleSelect(order: string) {
  console.log('click', order)
  if (unref(activeOrder) === order)
    return
  activeOrder.value = order
  initData({ order: unref(activeOrder), limit: 10 })
}

onMounted(() => {
  initData({ order: unref(activeOrder), limit: 10 })
})
</script>

<template>
  <section class="playlist">
    <h2 class="playlist-title">
      <span class="playlist-title__info">精选歌单</span>
      <span
        class="playlist-title__item"
        :class="{ 'playlist-title__item--active': cateHot.order === activeOrder }"
        @click="handleSelect(cateHot.order)"
      >{{ cateHot.title }}</span>
      <span
        class="playlist-title__item"
        :class="{ 'playlist-title__item--active': cateNew.order === activeOrder }"
        @click="handleSelect(cateNew.order)"
      >{{ cateNew.title }}</span>

      <router-link
        class="playlist-title__more"
        tag="span"
        to="/playlist-square"
      >
        查看更多
      </router-link>
    </h2>

    <transition name="fade">
      <ul
        ref="content"
        class="playlist-content"
        :style="{ height: contentHeight }
        "
      >
        <PlaylistItem
          v-for="item of activePlaylist"
          :id="item.id"
          :key="item.id"
          class="playlist-item"
          :width="`${itemWidth}px`"
          :img="item.coverImgUrl"
          :desc="item.description || item.name"
          :playcount="item.playCount"
        />
      </ul>
    </transition>
  </section>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';

.playlist {
  box-sizing: border-box;
  position: relative;
  padding: 0 .1rem;
  &-title {
    position: relative;
    height: .5rem;
    line-height: .5rem;
    font-size: $font--medium;
    &__info {
      font-weight: 600;
    }
    &__item {
      margin: 0 .1rem;
      font-size: $font--small;
      color: #aaa;
      &--active {
        font-weight: bold;
        color: #000;
      }
    }
    &__more {
      position: absolute;
      right: 0;
      font-size: $font--small;
    }
  }
  &-content__wrapper {
    position: relative;
    overflow: hidden;
  }
  &-content {
    /* display: inline-flex; */
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
  }
  &-item {
    flex-shrink: 0;
    &:not(:last-child) {
      margin-right: .1rem;
    }
  }
}
</style>
