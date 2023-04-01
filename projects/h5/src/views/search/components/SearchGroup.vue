<template>
    <div class="s-group">
      <!-- loading -->
      <div class="s-group__loading" v-if="loading">
        <LoadingSpinner
          width="30px"
          height="30px"
          color="rgb(238, 10, 36)"
          itemWidth="8%"
        />
      </div>

      <!-- 相关搜索 -->
      <div class="s-group__block s-group__related" v-show="!!simQuerys">
        <div class="s-group__title">相关搜索</div>
        <div class="related-content">
          <span class="related-item"
            v-for="item in simQuerys" :key="item.keyword"
            @click="$emit('update:keywords', item.keyword)">
            {{ item.keyword }}
          </span>
        </div>
      </div>

      <!-- 单曲 -->
      <div class="s-group__block s-group__song" v-show="song.songs.length">
        <div class="s-group__title">单曲</div>
        <song-item
          v-for="item in song.songs" :key="item.id"
          :song=item
          @play-song="playSong"/>
        <div class="s-group__footer" @click="$emit('slide-to', 1)">{{ song.moreText }} ></div>
      </div>

      <!-- 歌单 -->
      <div class="s-group__block s-group__playlist" v-show="playList.playLists.length">
        <div class="s-group__title">歌单</div>
        <search-playlist-item
          v-for="item in playList.playLists" :key="item.id"
          :playlist=item />
        <div class="s-group__footer" @click="$emit('slide-to', 2)">{{ playList.moreText }} ></div>
      </div>

      <!-- 歌手 -->
      <div class="s-group__block s-group__artists" v-show="artist.artists.length">
        <div class="s-group__title">歌手</div>
        <search-artist-item
          v-for="item in artist.artists" :key="item.id"
          :artist=item />
        <div class="s-group__footer" @click="$emit('slide-to', 3)">{{ artist.moreText }} ></div>
      </div>

      <!-- 专辑 -->
      <div class="s-group__block s-group__album" v-show="album.albums.length">
        <div class="s-group__title">专辑</div>
        <search-album-item
          v-for="item in album.albums" :key="item.id"
          :album=item />
        <div class="s-group__footer" @click="$emit('slide-to', 4)">{{ album.moreText }} ></div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, unref } from 'vue'
import { useRequest } from '/@/utils'

import SongItem from '/@/components/song-item/index.vue'
import SearchPlaylistItem from './SearchPlaylistItem.vue'
import SearchAlbumItem from './SearchAlbumItem.vue'
import SearchArtistItem from './SearchArtistItem.vue'

const props = defineProps({
  keywords: { type: String, require: true }
})

const loading = ref(false)
const simQuerys = ref(null)
const playList = ref({ playLists: [] })
const album = ref({ albums: [] })
const artist = ref({ artists: [] })
const song = ref({ songs: [] })

const initData = async () => {
  loading.value = true
  const [error, data] = await useRequest('getSearch')({ keywords: props.keywords })
  loading.value = false

  if (error) return

  simQuerys.value = data.result.sim_query.sim_querys
  playList.value = data.result.playList
  album.value = data.result.album
  artist.value = data.result.artist
  song.value = Object.freeze(data.result.song)

  // this.$nextTick(_ => {
  //   this.$refs.scroll.refresh()
  // })
}

const playSong =  (song) => {
  // this.$store.dispatch('player/changeSong', { song })
}

onMounted(() => {
  initData()
})

watch(() => props.keywords, initData)
</script>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import '/@/styles/mixins.scss';

.scroll-wrapper {
  overflow: hidden;
  height: calc(100vh - 1.44rem);
  height: calc(var(--vh, 1vh) * 100 - 1.44rem);
}

.s-group {
  box-sizing: border-box;
  /* fixed: better-scroll 忽略了上下的 margin/padding */
  padding: .1rem;
  font-size: $font--medium;
  &__loading {
    box-sizing: border-box;
    height: .5rem;
    padding: .1rem 0;
  }
  &__block {
    box-sizing: border-box;
    padding: 0 .1rem;
    background-color: #fff;
    border-radius: .1rem;

    /* fixed: better-scroll 忽略了上下的 margin/padding */
    &:not(:last-child) {
      margin-bottom: .2rem;
    }
  }
  &__title {
    height: .4rem;
    line-height: .4rem;
  }
  &__footer {
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    font-size: 12px;
    color: #aaa;
    border-top: 1px solid #ccc;
  }
  &__related {
    .related-content {
      display: flex;
      flex-wrap: wrap;
    }
    .related-item {
      box-sizing: border-box;
      margin: 0 .1rem .1rem 0;
      padding: .1rem .12rem;
      font-size: $font--small;
      background-color: #f6f6f6;
      border-radius: .15rem;
    }
  }
}
</style>
