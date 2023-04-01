<script setup lang="ts">
import type { PropType } from 'vue'
import AsideItem from './AsideItem.vue'
import type { IHomeHoster, IHomeSinger } from '/@/store/module/common'

defineProps({
  loginInfo: Boolean,
  inSingers: {
    type: Array as PropType<IHomeSinger[]>,
    default: () => [],
  },
  hotPlayers: {
    type: Array as PropType<IHomeHoster[]>,
    default: () => [],
  },
})

const handleShowAbout = () => {}
</script>

<template>
  <div v-if="loginInfo" class="login-info">
    <p class="info-desc">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
    <a class="info-btn">用户登录</a>
  </div>

  <AsideItem class="in-singers">
    <template #title>
      入驻歌手
      <em class="title-more" @click="handleShowAbout">查看全部&gt;</em>
    </template>
    <template #after>
      <div class="footer">
        <p class="footer-text" @click="handleShowAbout">申请成为音乐人</p>
      </div>
    </template>

    <div v-for="(item, i) of inSingers" :key="i" class="item">
      <div class="item-pic">
        <img :src="item.avatar" />
      </div>
      <div class="item-info">
        <p class="info-name">{{ item.name }}</p>
        <p class="info-desc">{{ item.desc }}</p>
      </div>
    </div>
  </AsideItem>

  <AsideItem class="hot-players">
    <template #header>
      <span>热门主播</span>
    </template>

    <div v-for="(item, i) of hotPlayers" :key="i" class="item">
      <div class="item-avatar">
        <img :src="item.avatar" />
      </div>
      <div class="item-info">
        <p class="info-name">
          {{ item.name }}
          <i class="info-name-sup"></i>
        </p>
        <p class="info-desc">{{ item.desc }}</p>
      </div>
    </div>
  </AsideItem>
</template>

<style lang="scss" scoped>
.login-info {
  width: 250px;
  height: 126px;
  background: url('../../../public/img/icons/index.png') no-repeat 0 0;
  .info-desc {
    margin: 0 auto;
    padding: 16px;
    line-height: 22px;
    font-size: 12px;
  }
  .info-btn {
    display: block;
    margin: 0 auto;
    width: 100px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    text-shadow: 0 1px 0 $loginBtnShadow;
    color: $textLight;
    background: url('../../../public/img/icons/index.png') no-repeat 0 -195px;
    &:hover {
      cursor: pointer;
    }
  }
}

.in-singers {
  padding: 15px 20px 10px 20px;
  .item {
    float: left;
    margin-bottom: 14px;
    border: 1px solid $bdcDefault;
    .item-pic {
      float: left;
      width: 62px;
      height: 62px;
      background-color: #ccc;
    }
    .item-info {
      float: left;
      box-sizing: border-box;
      width: 145px;
      height: 62px;
      padding-left: 14px;
      background-color: $bgUserCard;
      .info-name {
        height: 40px;
        line-height: 40px;
        font-size: $fontMinL;
        font-weight: bold;
      }
      .info-desc {
        font-size: $fontMin;
        @include ellipse();
      }
    }
    &:hover {
      .item-info {
        background-color: $bgTableLight;
      }
    }
  }
  .footer {
    height: 31px;
    text-align: center;
    line-height: 31px;
    background-color: $bgContentLight;
    border: 1px solid #ccc;
    border-radius: 5px;
    @include hoverBg($bgDefault);
    .footer-text {
      height: 31px;
      font-weight: bold;
    }
  }
}

.hot-players {
  padding: 15px 20px 10px 20px;
  .item {
    overflow: hidden;
    height: 40px;
    margin-bottom: 15px;
    .item-avatar {
      float: left;
      width: 40px;
      height: 40px;
      background-color: #ccc;
    }
    .item-info {
      float: left;
      width: 150px;
      margin-left: 5px;
      .info-name,
      .info-desc {
        height: 20px;
        line-height: 20px;
        @include ellipse();
      }
      .info-name {
        .info-name-sup {
          display: inline-block;
          width: 11px;
          height: 13px;
          vertical-align: middle;
          background: url('../../../public/img/icons/icon.png') no-repeat 0 1px;
        }
      }
      .info-desc {
        color: $info;
      }
    }
  }
}
</style>
