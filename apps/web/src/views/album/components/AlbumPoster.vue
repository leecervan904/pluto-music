<script setup lang="ts">
import type { IAlbumDetail } from '@pluto-music/api'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { dateFormat, getSingers } from '/@/utils'

import BtnBar from '/@/components/base/BtnBar.vue'

const props = defineProps({
  detail: {
    type: Object as PropType<IAlbumDetail>,
    default: () => ({}),
  },
})

const singers = computed(() => getSingers(props.detail?.artists || []))
const publishDate = computed(() => dateFormat(props.detail?.publishTime))
</script>

<template>
  <div class="poster">
    <div class="poster-img">
      <div class="poster-img__mask" />
      <img :src="`${detail?.picUrl}?param=177y177`">
    </div>
    <div class="poster-info">
      <div class="info-header">
        <div class="poster-info__icon" />
        <h2 class="header-title">
          {{ detail?.name }}
        </h2>
      </div>
      <p class="info-about info-singer">
        歌手：<span v-for="(item, i) of singers" :key="i">{{ item }}</span>
      </p>
      <p class="info-about info-date">
        发行时间：{{ publishDate }}
      </p>
      <p class="info-about info-company">
        发行公司：{{ detail?.company }}
      </p>
      <div class="info-btn">
        <BtnBar v-bind="$attrs">
          <template #share>
            <span>({{ detail?.info.shareCount }})</span>
          </template>
          <template #comment>
            <span>({{ detail?.info.commentCount }})</span>
          </template>
        </BtnBar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.poster {
  overflow: hidden;
  width: 640px;
  margin-bottom: 20px;
  .poster-img {
    float: left;
    width: 209px;
    &__mask {
      position: absolute;
      width: 209px;
      height: 177px;
    }
    img {
      width: 177px;
    }
  }
  .poster-info {
    float: left;
    width: 400px;
    margin-left: 25px;
    font-size: $fontMin;
    .info-header {
      overflow: hidden;
      height: 32px;
      line-height: 32px;
      .poster-info__icon {
        float: left;
        width: 54px;
        height: 24px;
        margin-top: 4px;
      }
      .header-title {
        float: left;
        margin-left: 10px;
        font-size: $fontMiddle;
      }
    }
    .info-about {
      height: 18px;
      margin-top: 4px;
      line-height: 18px;
    }
    .info-singer {
    }
    .info-date {
    }
    .info-company {
    }
    .info-btn {
      padding-top: 15px;
    }
  }
  .sub-info {
  }
}
</style>
