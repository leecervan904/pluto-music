<script setup lang="ts">
import { type ComputedRef, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteQuery } from '/@/hooks/useRouteQuery'
import {
  useGetArtistAlbum,
  useGetArtistDesc,
  useGetArtistMv,
  useGetArtists,
  useGetTopArtists,
} from './hooks/useGetData'
import { ArtistTabEnum } from './typing'

import AsideDownload from '/@/components/group/AsideDownload.vue'
import AsideTopArtists from '/@/components/group/AsideTopArtists.vue'
import ArtistPoster from './components/ArtistPoster.vue'
import ArtistHot from './components/ArtistHot.vue'
import ArtistAlbum from './components/ArtistAlbum.vue'
import ArtistMv from './components/ArtistMv.vue'
import ArtistDesc from './components/ArtistDesc.vue'

const router = useRouter()

const id = useRouteQuery('id') as ComputedRef<string>
const activeTab = ref<ArtistTabEnum>(ArtistTabEnum.HOT)

const { ceil } = Math
const { detail, albumSize, mvSize } = useGetArtists(id)
const { albums, getAlbum } = useGetArtistAlbum(id)
const { mvs, getMv } = useGetArtistMv(id)
const { desc } = useGetArtistDesc(id)
const { topArtists } = useGetTopArtists(id)

function handleToArtist(id: string | number) {
  router.push(`/artist?id=${id}`)
}
</script>

<template>
  <div class="artist">
    <div class="content">
      <ArtistPoster v-model="activeTab" :artist="detail?.artist" />
      <ArtistHot v-if="activeTab === ArtistTabEnum.HOT" :song-list="detail?.hotSongs" />
      <ArtistAlbum
        v-if="activeTab === ArtistTabEnum.ALBUM"
        :albums="albums"
        :pages="ceil(albumSize / 12)"
        @change-page="getAlbum"
      />
      <ArtistMv
        v-if="activeTab === ArtistTabEnum.MV"
        :mvs="mvs"
        :pages="ceil(mvSize / 12)"
        @change-page="getMv"
      />
      <ArtistDesc v-if="activeTab === ArtistTabEnum.DESC" :desc="desc" />
    </div>

    <div class="aside">
      <AsideTopArtists :artists="topArtists" @to-artist="handleToArtist" />
      <AsideDownload />
    </div>
  </div>
</template>

<style scoped lang="scss">
.artist {
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  .content {
    box-sizing: border-box;
    width: 710px;
    min-height: $minMainAppHeight;
    padding: 40px 30px;
    border-right: 1px solid $bdcDefault;
    .main {
      .main-info {
        float: left;
        width: 415px;
        margin-left: 25px;
        font-size: $fontMin;
      }
    }
  }
  .aside {
    width: 270px;
  }
}
</style>
