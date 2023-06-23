<script lang="tsx">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import VueType from 'vue-types'
import type { ICommentItem } from '@pluto-music/api'

import SvgIcon from '/@/components/svg-icon/index.vue'

export default defineComponent({
  components: {
    SvgIcon,
  },
  props: {
    comment: {
      type: Object as PropType<ICommentItem>,
      required: true,
    },
    hideReply: VueType.bool.def(false),
  },
  emits: ['show-reply'],
  setup(props, { emit }) {
    return () => (
      <div class="comment-item">
        <div class="comment-item__info">
          <div class="comment-item__info-avatar">
            <img class="avatar" src={props.comment.user.avatarUrl} alt={props.comment.user.nickname} />
          </div>
          <div class="comment-item__info-name">
            <div class="nickname">{props.comment.user.nickname}</div>
            <div class="time">
              <span class="time-str">
                {props.comment.timeStr}
              </span>
              <span class="time-loc">
                {props.comment.ipLocation?.location}
              </span>
            </div>
          </div>
          <div class="comment-item__info-liked">
            <span class="count">{props.comment.likedCount}</span>
            <SvgIcon icon-class="comment" />
          </div>
        </div>
        <div class="comment-item__content">
          <div class="content">{props.comment.content}</div>

          {
            !props.hideReply
              ? <div class="reply" onClick={() => emit('show-reply', props.comment.commentId)}>{props.comment.replyCount}条回复 &gt;</div>
              : null
          }
        </div>
      </div>
    )
  },
})
</script>

<style lang="scss" scoped>
.comment-item {
  &__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    &-avatar {
      box-sizing: border-box;
      overflow: hidden;
      margin: 0 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      .avatar {
        width: 100%;
      }
    }
    &-name {
      flex: 1;
      .nickname {
        font-size: 16px;
      }
      .time {
        margin-top: 5px;
        font-size: 14px;
        color: #ccc;
        &-str {
          margin-right: 5px;
        }
      }
    }
    &-liked {
      /* width: 50px; */
      margin-right: 10px;
      .count {
        margin-right: 5px;
      }
    }
  }

  &__content {
    margin-bottom: 10px;
    padding: 10px 10px 10px 50px;
    font-size: 14px;
    .reply {
      margin-top: 10px;
      color: deepskyblue;
    }
  }
}
</style>
