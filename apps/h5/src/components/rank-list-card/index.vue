<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue'
import { formatArtists, getPlaylistDetailKey, storage } from '/@/utils'
import { useRequest } from '/@/utils/useRequest'
import { usePlayerStore } from '/@/store/module/player'
import type { GetPlaylistDetailResult } from '@pluto-music/api'

import CardMask from '/@/components/card-mask/index.vue'

const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
})

const playerStore = usePlayerStore()
const songId = computed(() => playerStore.songId)

const name = ref('')
const tracks = ref([])
const bgImage = computed(() => unref(tracks).length ? `${unref(tracks)[0].picUrl}?param=400y400` : '')

function initData() {
  const playlistDetailKey = getPlaylistDetailKey(props.info.id)
  if (storage.has(playlistDetailKey)) {
    const data = storage.getItem<GetPlaylistDetailResult>(playlistDetailKey)!
    name.value = data.playlist.name
    extractTracks(data.playlist)
  }
  else {
    setTimeout(async () => {
      const [error, data] = await useRequest('getPlaylistDetail')({ id: props.info.id })
      if (error)
        return
      storage.setItem(playlistDetailKey, data, true, { maxAge: 10 * 60 * 1000 })
      const { playlist } = data
      name.value = playlist.name
      extractTracks(playlist)
    }, 1000)
  }
}

function extractTracks(playlist) {
  const tempTracks = playlist.tracks
    .slice(0, 3)
    .map((v) => {
      const second = formatArtists(v.ar)
      return {
        id: v.id,
        first: v.name,
        second,
        picUrl: v.al.picUrl,
      }
    })
  tracks.value = Object.freeze([].concat(tempTracks))
}

function playSong(song) {
  // const tracks = this.$storage.getItem(`toplist-${this.info.id}`).data.tracks
  // this.$store.dispatch('player/updatePlaylist', {
  //   tracks,
  //   playlistId: this.info.id
  // })
  // this.$store.dispatch('player/changeSong', { song, toPlayer: false })
}

onMounted(() => {
  initData()
})
</script>

<template>
  <CardMask
    :src="bgImage"
    color="rgba(0, 0, 0, .7)"
    blur="2px"
  >
    <div class="ranklist-card">
      <router-link
        class="ranklist-card__title" tag="div"
        :to="`/ranklist/${info.id}`"
      >
        <span>{{ name }}</span>
        <svg-icon icon-class="caret-right" />
      </router-link>

      <div class="ranklist-card__list">
        <div
          v-for="(item, i) of tracks" :key="i" class="list-item"
          @click="playSong(item.id)"
        >
          <div class="list-item__left">
            <img
              :src="`${item.picUrl}?param=50y50`"
              :alt="info.name"
            >
          </div>

          <div class="list-item__center">
            <span class="info__order">{{ i + 1 }}</span>
            <span class="info__name">{{ item.first }}</span>
            <span class="info__separator">-</span>
            <span class="info__artists">{{ item.second }}</span>
          </div>

          <div class="list-item__right">
            <svg-icon v-if="item.id === songId" class="list-item__right--red" icon-class="sound" />
            <span v-else>新</span>
          </div>
        </div>
      </div>
    </div>
  </CardMask>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import '/@/styles/mixins.scss';

.ranklist-card {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 2.25rem;
  padding: 0 .1rem .1rem;
  border-radius: .1rem;
  color: #fff;

  &__title {
    height: .5rem;
    line-height: .5rem;
    color: #fff;
    text-align: center;
    font-size: $font--medium;
  }

  &__list {

    .list-item {
      display: flex;
      height: .5rem;
      margin-bottom: .05rem;

      &__left {
        width: .5rem;
        border-radius: .05rem;
        overflow: hidden;
        img {
          width: 100%;
        }
      }

      &__center {
        flex: 1;
        display: flex;
        // fix: 防止子元素超出宽度
        overflow: hidden;
        line-height: .5rem;
        font-size: $font--small;

        // info is a prefix
        .info {
          &__order {
            width: .25rem;
            text-align: center;
          }

          &__name {
            max-width: 35%;
            @include ellipsis();
          }

          &__separator {
            margin: 0 .05rem;
          }

          &__artists {
            flex: 1;
            font-size: $font--small-s;
            color: #ccc;
            @include ellipsis();
          }
        }
      }

      &__right {
        width: .25rem;
        line-height: .5rem;
        text-align: center;
        font-size: $font--small;

        &--red {
          color: $color-palette-red;
          font-size: $font--medium;
        }
      }
    }
  }
}
</style>
