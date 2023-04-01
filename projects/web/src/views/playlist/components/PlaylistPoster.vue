<template>
  <div class="poster">
    <div class="poster-img">
      <div class="img-wrapper">
        <img v-show="detail?.coverImgUrl" :src="detail?.coverImgUrl + '?param=200y200'" />
      </div>
    </div>
    <div class="poster-info">
      <div class="info-header">
        <div class="poster-info__header-icon"></div>
        <h2 class="header-title">{{ detail?.name }}</h2>
      </div>
      <p class="info-create">
        <span class="create-item ctor-pic">
          <img :src="creatorPic" />
        </span>
        <a href="#" class="create-item ctor-name">{{ creatorName }}</a>
        <span class="create-item create-time">
          <em>{{ createTime }}</em> 创建
        </span>
      </p>
      <div class="info-btn">
        <btn-bar v-bind="$attrs">
          <template #collect>
            <span>({{ detail?.subscribedCount }})</span>
          </template>
          <template #share>
            <span>({{ detail?.shareCount }})</span>
          </template>
          <template #comment>
            <span>({{ detail?.commentCount }})</span>
          </template>
        </btn-bar>
      </div>
      <div class="info-tag">
        <span class="tag-name">标签：</span>
        <span v-for="(tag, i) of detail?.tags" :key="i" class="tag-item">{{ tag }}</span>
      </div>
      <div class="info-desc">
        介绍：
        <p v-for="(item, i) of desc" :key="i" class="desc-item">{{ item }}</p>
      </div>
      <p v-show="shortDesc.length !== fullDesc.length" class="desc-ctrl" @click="handleShowAll">
        <em v-if="!showAll" class="ctrl-text">展开</em>
        <em v-else class="ctrl-text">收起</em>
        <i :class="['ctrl-icon', showAll ? 'ctrl-icon--down' : 'ctrl-icon--up']"></i>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPlaylist } from '@pluto-music/api'
import { ref, computed, type PropType } from 'vue'
import { dateFormat } from '/@/utils'

import BtnBar from '/@/components/base/BtnBar.vue'

const props = defineProps({
  detail: {
    type: Object as PropType<IPlaylist>,
    default: () => ({}),
  },
})

const showAll = ref(false)

const creatorPic = computed(() => {
  return props.detail?.creator ? `${props.detail.creator.avatarUrl}?param=40y40` : ''
})
const creatorName = computed(() => {
  return props.detail?.creator ? props.detail.creator.nickname : ''
})
const createTime = computed(() => {
  return props.detail?.createTime ? dateFormat(props.detail.createTime) : '1970-01-01'
})
const shortDesc = computed(() => {
  if (!props.detail?.desc) return ''
  if (props.detail.desc?.length <= 100) {
    return fullDesc.value
  }
  return props.detail.desc.slice(0, 97).concat('...').split('\n')
})
const fullDesc = computed(() => {
  if (!props.detail?.desc) return ''
  return props.detail.desc.split('\n').concat('')
})
const desc = computed(() => {
  return showAll.value ? fullDesc.value : shortDesc.value
})

const handleShowAll = () => {
  showAll.value = !showAll.value
}
</script>

<style lang="scss" scoped>
.poster {
  overflow: hidden;
  width: 640px;
  margin-bottom: 30px;
  .poster-img {
    float: left;
    .img-wrapper {
      padding: 3px;
      img {
        width: 100%;
      }
      border: 1px solid #ccc;
    }
  }
  .poster-info {
    float: left;
    width: 400px;
    margin-left: 25px;
    font-size: $fontMin;
    .info-header {
      overflow: hidden;
      line-height: 32px;
      .poster-info__header-icon {
        float: left;
        width: 72px;
        height: 24px;
        margin-top: 4px;
      }
      .header-title {
        float: left;
        width: 320px;
        margin-left: 5px;
        font-size: $fontMiddle;
      }
    }
    .info-create {
      height: 35px;
      line-height: 35px;
      margin: 5px 0;
      .create-item {
        float: left;
      }
      .ctor-pic {
        width: 35px;
        height: 35px;
        img {
          width: 35px;
        }
      }
      .ctor-name {
        margin-left: 10px;
      }
      .create-time {
        margin-left: 15px;
      }
    }
    .info-btn {
      padding-top: 10px;
    }
    .info-tag {
      margin: 10px 0 5px 0;
      .tag-item {
        display: inline-block;
        margin-right: 10px;
        height: 22px;
        line-height: 22px;
        padding: 2px 6px;
        border: 1px solid #ccc;
        border-radius: 8px;
      }
    }
    .info-desc {
      margin-top: 4px;
      line-height: 18px;
      color: $info;
      .desc-item {
        margin-bottom: 15px;
      }
    }
    .desc-ctrl {
      float: right;
      &:hover {
        cursor: pointer;
      }
      .ctrl-text {
        color: $textLinkBlueLight;
      }
      .ctrl-icon {
        display: inline-block;
        width: 11px;
        height: 8px;
        margin-left: 5px;
      }
    }
  }
}
</style>
