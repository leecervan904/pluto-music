<template>
  <div class="poster">
    <div class="wrapper">
      <img :src="`${listInfo.coverImgUrl}?param=400y400`" alt="" />
    </div>
    <div class="desc">
      <div class="title">{{ listInfo.name }}</div>
      <div class="info">
        <i class="poster__info-icon"></i>
        <span class="info-update">最近更新：{{ time }}</span>
        <span class="info-frequency">（{{ updateFrequency }}）</span>
      </div>
      <div class="btn">
        <btn-bar v-bind="$attrs">
          <template #collect>
            <span>({{ listInfo.subscribedCount }})</span>
          </template>
          <template #share>
            <span>({{ listInfo.shareCount }})</span>
          </template>
          <template #comment>
            <span>({{ listInfo.commentCount }})</span>
          </template>
        </btn-bar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getMonthAndDay } from '/@/utils'
import BtnBar from '/@/components/base/BtnBar.vue'

export default defineComponent({
  components: {
    BtnBar,
  },
  props: {
    listInfo: {
      type: Object,
      default: () => {},
    },
    songList: {
      type: Array,
      default: () => [],
    },
    updateFrequency: String,
  },
  computed: {
    time() {
      return getMonthAndDay(this.listInfo.updateTime)
    },
  },
})
</script>

<style lang="scss" scoped>
/* @import '@/styles/variables.scss'; */

.poster {
  position: relative;
  padding: 40px;
  .wrapper {
    float: left;
    box-sizing: border-box;
    width: 158px;
    height: 158px;
    padding: 3px 0 0 3px;
    border: 1px solid $textInfoLight;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .desc {
    margin-left: 187px;
    width: 473px;
    height: 113px;
    margin-top: 15px;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: $fontMiddle;
    }
    .info {
      margin-top: 5px;
      height: 13px;
      line-height: 13px;
      font-size: $fontMin;
      .poster__info-icon {
        float: left;
        width: 13px;
        height: 13px;
      }
      .info-update {
        margin-left: 5px;
      }
      .info-frequency {
        margin-left: 5px;
        color: $textLinkDefault;
      }
    }
    .btn {
      margin-top: 30px;
    }
  }
}
</style>
