<script setup lang="ts">
import { ICommentItem } from '@pluto-music/api'
import { PropType } from 'vue'

defineProps({
  comment: {
    type: Object as PropType<ICommentItem>,
    default: null,
  },
})
</script>

<template>
  <div class="comment-item">
    <div class="comment-item__avatar">
      <img
        class="img"
        :src="`${comment.user.avatarUrl}?param=50y50`"
        :alt="comment.user.nickname"
      />
    </div>
    <div class="comment-item__content">
      <div class="comment-item__content-main">
        <span class="main-user">{{ comment.user.nickname }}</span
        >:
        <span class="main-content">{{ comment.content }}</span>
      </div>
      <div class="comment-item__content-footer">
        <span class="footer-time">{{ comment.timeStr }}</span>
        <span class="footer-control">
          <span class="footer-control__liked">点赞({{ comment.likedCount }})</span>
          <span class="footer-control__sep">|</span>
          <span class="footer-control__reply">回复</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  font-size: 16px;
  &__avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    .img {
      width: 100%;
    }
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    line-height: 18px;
    &-main {
      flex: 1;
      flex-direction: column;
      .main-user {
        margin-right: 5px;
        color: rgb(30, 169, 239);
      }
    }
    &-footer {
      margin-top: 10px;
      height: 20px;
      line-height: 20px;
      display: flex;
      justify-content: space-between;
      .footer-time {
        color: #666;
      }
      .footer-control {
        &__liked {
        }
        &__sep {
          margin: 0 5px;
          color: #ccc;
        }
        &__reply {
        }
      }
    }
  }
}
</style>
