<template>
  <div class="desc-wrapper">
    <div class="rank-poster">
      <!-- 封面图 -->
      <div class="left">
        <div class="img-wrapper">
          <img :src="`${detail.coverImgUrl}?param=200y200`" :alt="detail.name" />
        </div>
      </div>
      <div class="right">
        <p class="right-para title">{{ detail.name }}</p>
        <!-- 发行时间 || 更新时间 -->
        <p v-if="detail.type === 'album'" class="right-para publish-time">
          发行时间：{{ formatedPublishTime }}
        </p>
        <p v-else class="right-para update-time">最近更新：{{ formatedUpdateTime }}</p>
        <!-- 歌手 || 创建者 -->
        <p v-if="detail.type === 'album'" class="right-para artists">
          <span class="artists-tag">歌手:</span>
          <span class="artists-name">{{ formatedArtists }}</span>
          <svg-icon icon-class="caret-right" class="artists-caret"></svg-icon>
        </p>
        <p v-else class="right-para creator">
          <span class="creator-avatar">
            <img :src="detail.avatarUrl" :alt="detail.nickname" />
          </span>
          <span class="creator-name">{{ detail.nickname }}</span>
        </p>
        <!-- 描述信息 -->
        <p class="right-para desc">{{ detail.description }}</p>
      </div>
    </div>

    <div class="rank-menubar">
      <div v-coming="''" class="menu-item menu-comment">
        <svg-icon icon-class="comment"></svg-icon>
        <p class="menu-item-desc">{{ detail.commentCount }}</p>
      </div>
      <div v-coming="''" class="menu-item menu-share">
        <svg-icon icon-class="share"></svg-icon>
        <p class="menu-item-desc">{{ detail.shareCount }}</p>
      </div>
      <div v-coming="''" class="menu-item menu-download">
        <svg-icon icon-class="download"></svg-icon>
        <p class="menu-item-desc">下载</p>
      </div>
      <div v-coming="''" class="menu-item menu-select-multi">
        <svg-icon icon-class="select-multi"></svg-icon>
        <p class="menu-item-desc">多选</p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatArtists, formatUpdateTime, formatPublishTime } from '/@/utils'

export default {
  name: 'SongListPoster',
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    formatedArtists() {
      return formatArtists(this.detail.artists)
    },
    formatedUpdateTime() {
      return formatUpdateTime(this.detail.updateTime)
    },
    formatedPublishTime() {
      return formatPublishTime(this.detail.publishTime)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import '/@/styles/mixins.scss';

.desc-wrapper {
  position: relative;
  z-index: 9;
  box-sizing: border-box;
  width: 100%;
  height: 0;
  padding: 0 0.1rem 80%;
  background-color: rgba(0, 0, 0, 0.7);
  /* 海报及描述 */
  .rank-poster {
    display: flex;
    justify-content: space-between;
    padding: 0.15rem 0;
    color: #fff;
    .left {
      width: 40%;
      .img-wrapper {
        overflow: hidden;
        height: 0;
        padding-bottom: 100%;
        border-radius: 0.05rem;

        img {
          width: 100%;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      width: 55%;
      .right-para {
        @include multi-ellipsis(2);
      }
      .title {
        height: 0.4rem;
        line-height: 0.2rem;
        font-size: $font--medium-s;
        font-weight: bold;
      }
      .update-time,
      .publish-time {
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: $font--small-s;
      }
      .publish-time {
        color: #d1d1d1;
      }
      .artists {
        height: 0.3rem;
        line-height: 0.3rem;
        &-tag,
        &-caret {
          font-size: $font--small;
          color: #d1d1d1;
        }
        &-name {
          margin-left: 0.05rem;
          font-size: $font--small;
        }
      }
      .creator {
        flex: 1;
        display: flex;
        &-avatar {
          overflow: hidden;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 50%;
          img {
            width: 100%;
          }
        }
        &-name {
          flex: 1;
          height: 0.3rem;
          margin-left: 0.05rem;
          line-height: 0.3rem;
          font-size: $font--small-s;
          @include ellipsis();
        }
      }
      .desc {
        height: 0.25rem;
        line-height: 0.25rem;
        font-size: $font--small-s;
        color: #d1d1d1;
      }
    }
  }

  /* 操作列表 */
  .rank-menubar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    height: 0.75rem;
    padding: 0.1rem 0;
    color: #fff;
    .menu-item {
      width: 0.5rem;
      height: 0.5rem;
      text-align: center;
      font-size: 0.25rem;
      &-desc {
        margin-top: 0.05rem;
        font-size: 0.1rem;
      }
    }
  }
}
</style>
