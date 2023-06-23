<script setup lang="ts">
import { GetMvDetailData, CommentTypeEnum } from '@pluto-music/api'
import { ref, shallowRef, onMounted, unref } from 'vue'
import { useRouteQuery } from '/@/hooks/useRouteQuery'
import { useRequest } from '/@/utils'
import Comment from '/@/components/comment/index.vue'

const id = useRouteQuery('id') as unknown as string

const mvUrl = ref('')
const detail = shallowRef<Nullable<GetMvDetailData>>(null)

async function initData() {
  const [error, data] = await useRequest('getMvDetail')({ mvid: unref(id) })
  if (error) return
  // console.log(data)
  detail.value = data.data
}

async function getMvUrl() {
  const [error, data] = await useRequest('getMvUrl')({ id: unref(id) })
  if (error) return
  mvUrl.value = data.data.url
}

onMounted(() => {
  initData()
  getMvUrl()
})
</script>

<template>
  <div class="mv">
    <div class="content">
      <div class="mv-title">
        <span class="mv-title__main">{{ detail?.name }}</span>
        <span class="mv-title__sub">{{ detail?.artists[0].name }}</span>
      </div>
      <div class="mv-content">
        <video class="mv-container" controls :src="mvUrl"></video>
      </div>
      <div>
        <Comment :id="id" :type="CommentTypeEnum.MV" />
      </div>
    </div>
    <div class="aside"></div>
  </div>
</template>

<style lang="scss" scoped>
.mv {
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  .content {
    box-sizing: border-box;
    width: 710px;
    min-height: $minMainAppHeight;
    padding: 40px 30px;
    border-right: 1px solid $bdcDefault;
    .mv-title {
      margin-bottom: 5px;
      &__main {
        margin-right: 10px;
        font-size: 26px;
        color: #333;
      }
      &__sub {
        font-size: 16px;
        color: #666;
      }
    }
    .mv-content {
      width: 640px;
      height: 360px;
      .mv-container {
        width: 100%;
      }
    }
  }
  .aside {
    width: 270px;
  }
}
</style>
