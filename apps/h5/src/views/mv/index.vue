<script setup lang="ts">
import { shallowRef, computed, watchEffect, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { GetMvDetailData, ISimiMvItem } from '@pluto-music/api'
import { useRequest } from '/@/utils/useRequest'

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id as string)
const detail = shallowRef<GetMvDetailData>()
const related = shallowRef<ISimiMvItem[]>([])

const getMvDetail = async () => {
  const [error, data] = await useRequest('getMvDetail')({
    mvid: unref(id)
  })
  if (error) return
  // console.log(data.data)
  detail.value = data.data
}

const getMvUrl = async () => {
  const [error, data] = await useRequest('getMvUrl')({
    id: unref(id)
  })
  if (error) return
  // console.log(data.data.url)
  detail.value!.url = data.data.url
}

const getRelatedVideo = async () => {
  const [error, data] = await useRequest('getSimiMv')({
    mvid: unref(id)
  })
  if (error) return
  // console.log(data)
  related.value = data.data.mvs
}

const initData = async () => {
  await getMvDetail()
  await getMvUrl()
  await getRelatedVideo()
}

const handlePlayMv = (vid: number | string) => {
  router.replace(`/mv/${vid}`)
}

watchEffect(() => {
  if (unref(id)) {
    initData()
  }
})
</script>

<template>
  <div class="mv">
    <div class="mv-container">
      <video class="mv-container__video"
        controls
        playsinline
        :src="detail?.url"
        :poster="detail?.cover">
      </video>
    </div>

    <div class="mv-info">
      <div class="mv-info__card">
        <div class="owner">
          <div class="owner-avatar">
            <!-- <img src="" alt="" class="img"> -->
          </div>
          <div class="owner-info">
            <div class="owner-info__nickname">{{ detail?.artistName }}</div>
            <div class="owner-info__desc"></div>
          </div>
        </div>

        <div class="title">{{ detail?.name }}</div>
        <div class="song"></div>
        <div class="desc">{{ detail?.desc }}</div>
      </div>

      <div class="mv-info__control">
        <div class="p-menu-bar_item p-menu-bar_like">
          <SvgIcon icon-class="like" />
        </div>
        <div class="p-menu-bar_item p-menu-bar_download">
          <SvgIcon icon-class="download" />
        </div>
        <div class="p-menu-bar_item p-menu-bar_comment">
          <SvgIcon icon-class="comment" />
        </div>
        <div class="p-menu-bar_item p-menu-bar_more-vertical">
          <SvgIcon icon-class="more-vertical" />
        </div>
      </div>

      <div class="mv-info__related">
        <div class="item" v-for="item in related" @click="handlePlayMv(item.id)">
          <div class="item-left">
            <div class="item-left__wrapper">
              <img class="img" :src="item.cover" alt="">
            </div>
          </div>
          <div class="item-right">
            <div class="item-right__title">{{ item.name }}</div>
            <div class="item-right__info">
              <div class="item-right__creator">{{ item.artistName }}</div>
              <div class="item-right__play">{{ item.playCount }} 播放</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mv {
  box-sizing: border-box;
  width: 100%;
  /* padding: 0 .2rem; */

  &-container {
    &__video {
      width: 100%;
      height: auto;
      /* border-radius: .05rem; */
    }
  }

  &-info {
    overflow-y: auto;
    height: 300px;
    /* background-color: #ccc; */
  }
}

.mv-info__card {
  margin: 10px 0;

  .owner {
    display: flex;
    &-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      .img {
        width: 100%;
      }
    }
    &-info {
      &__nickname {
        font-size: 14px;
      }
      &__desc {
        font-size: 12px;
        color: #ccc;
      }
    }
  }
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .song {
    color: #ace;
  }
  .desc {
    font-size: 12px;
    color: #ccc;
  }
}

.mv-info__control {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  /* background-color: #ccc; */

  &_item {
    width: .5rem;
    line-height: .5rem;
    /* font-size: $font--large; */
    text-align: center;
  }
}

.mv-info__related {
  margin: 10px;
  /* background-color: #000; */
  .item {
    display: flex;
    margin: 10px 0;
    &-left {
      width: 40%;
      &__wrapper {
        overflow: hidden;
        border-radius: 6px;
        .img {
          width: 100%;
        }
      }
    }
    &-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 10px;
      color: #ccc;
      font-size: 12px;
      &__title {
        color: #000;
        font-size: 14px;
      }
      &__creator {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
