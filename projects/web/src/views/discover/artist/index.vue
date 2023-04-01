<template>
  <div class="ar">
    <ArtistSidebar @change="handleChangeCate" />

    <section class="ar-content">
      <div class="ar-content-header">
        <h4 class="header-title">{{ activeCate.name }}</h4>
        <span v-show="isHeaderMore" class="header-more">更多 &gt;</span>
      </div>

      <Alphabet ref="refAlphabet" @change="handleChangeAlpha" />

      <div class="ar-content-main">
        <div class="main-top10">
          <div
            v-for="(ar, index) of artists.slice(0, 10)"
            :key="index"
            class="main-top10-item"
            @click="handleToArtist(ar)"
          >
            <span :title="`${ar.name}的音乐`">
              <img :src="`${ar.picUrl}?param=130y130`" :alt="`${ar.name}的音乐`" class="item-pic" />
            </span>
            <p class="item-info">
              <span class="item-info-name">{{ ar.name }}</span>
              <span v-show="ar.accountId" class="item-info-home"></span>
            </p>
          </div>
        </div>
        <div class="main-list">
          <div
            v-for="(ar, index) of artists.slice(10)"
            :key="index"
            class="main-list-item"
            @click="handleToArtist(ar)"
          >
            <span class="main-list-item-name">{{ ar.name }}</span>
            <span>
              <span v-show="ar.accountId" class="main-list-item-home"></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { IArtistCateItem } from '@pluto-music/api'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRequest } from '/@/utils'
import useSearch from './hooks/useSearch'
import type { ICateItem } from './typing'

import Alphabet from './components/Alphabet.vue'
import ArtistSidebar from './components/Sidebar.vue'

const router = useRouter()
const { activeCate, artists, form } = useSearch()

const refAlphabet = ref<InstanceType<typeof Alphabet> | null>(null)
const isHeaderMore = computed(() => activeCate.value.name === '推荐歌手')

const getArtistList = async () => {
  const [error, data] = await useRequest('getArtistCate')({ ...form })
  if (error) return
  artists.value = data.artists
}

const handleChangeAlpha = (alpha: string) => {
  form.initial = alpha
  getArtistList()
}

const handleChangeCate = (cate: ICateItem) => {
  activeCate.value = cate
  form.type = cate.type
  form.area = cate.area
  form.initial = ''
  if (refAlphabet.value) {
    refAlphabet.value!.reset()
  }
  getArtistList()
}

const handleToArtist = (ar: IArtistCateItem) => {
  router.push({
    name: 'artist',
    query: {
      id: ar.id,
    },
  })
}
</script>

<style lang="scss" scoped>
.ar {
  overflow: hidden;
  box-sizing: border-box;

  .ar-content {
    box-sizing: border-box;
    position: relative;
    float: left;
    width: 800px;
    min-height: 1000px;
    padding: 40px;
    border-left: 1px solid #ccc;
    .ar-content-header {
      height: 40px;
      margin-bottom: 20px;
      line-height: 40px;
      border-bottom: 2px solid rgb(194, 12, 12);
      .header-title {
        float: left;
        font-size: 24px;
      }
      .header-more {
        float: right;
        font-size: 12px;
      }
    }
    .ar-content-main {
      margin-top: 20px;
      .main-top10 {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .main-top10-item {
          width: 130px;
          height: 154px;
          margin-bottom: 20px;
          a {
            display: inline-block;
            width: 130px;
            height: 130px;
          }
          .item-pic {
            width: 100%;
          }
          .item-info {
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            &-name {
            }
            &-home {
              float: right;
              width: 17px;
              height: 18px;
              margin-top: 6px;
              background-image: url('../../../../../public/img/icons/icon.png');
              background-position: 0 -740px;
            }
          }
        }
      }
      .main-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        &-item {
          overflow: hidden;
          width: 130px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          &-name {
            float: left;
          }
          &-home {
            float: left;
            width: 17px;
            height: 18px;
            margin-top: 6px;
            margin-left: 3px;
            background-image: url('../../../../../public/img/icons/icon.png');
            background-position: 0 -740px;
          }
        }
      }
    }
  }
}
</style>
