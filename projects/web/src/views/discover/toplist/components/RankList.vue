<template>
  <div class="list">
    <rank-list-poster
      v-if="listInfo"
      :list-info="listInfo"
      :song-list="songList"
      :update-frequency="updateFrequency"
      @play-all="handlePlayAll"
    />

    <div class="list-main">
      <div class="list-title">
        <span class="title-main">歌曲列表</span>
        <span class="title-sub">{{ trackCount }}首歌</span>
        <span class="title-play"
          >播放： <em class="title-play-count">{{ playCount }}</em
          >次
        </span>
      </div>
      <rank-list-table :song-list="songList" />
    </div>
  </div>
</template>

<script lang="ts">
import type { ISong } from '@pluto-music/api'
import { ref, reactive, watchEffect, defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '/@/store/module/common'
import { useRequest } from '/@/utils'

import RankListTable from './RankListTable.vue'
import RankListPoster from './RankListPoster.vue'
import { usePlayerStore } from '/@/store/module/player'

export default defineComponent({
  name: 'ToplistView',
  components: {
    RankListTable,
    RankListPoster,
  },
  props: {
    id: { type: [Number, String], require: true, default: '' },
  },
  emits: ['update:id'],
  setup(props) {
    const commonStore = useCommonStore()
    const playerStore = usePlayerStore()

    const { toIdx, featureRank, globalRank } = storeToRefs(commonStore)

    const listInfo = reactive({
      name: '',
      id: '',
      coverImgUrl: '',
      updateTime: 0,
      updateFrequency: '每日更新',
      subscribedCount: 0,
      shareCount: 0,
      commentCount: 0,
    })
    const trackCount = ref(0)
    const playCount = ref(0)
    const songList = ref<ISong[]>([])

    async function initialData(id: string | number) {
      // 判断是否从路由跳转而来
      // emit('update', id)
      // 获取排行榜的歌曲列表
      const [error, data] = await useRequest('getRankList')({ id })
      if (error) return
      const detail = data.playlist
      listInfo.name = detail.name
      listInfo.id = detail.id + ''
      listInfo.coverImgUrl = detail.coverImgUrl
      listInfo.updateTime = detail.updateTime
      listInfo.updateFrequency = detail.updateFrequency || listInfo.updateFrequency
      listInfo.subscribedCount = detail.subscribedCount
      listInfo.shareCount = detail.shareCount
      listInfo.commentCount = detail.commentCount

      trackCount.value = detail.trackCount
      playCount.value = detail.playCount
      songList.value = detail.tracks
    }

    function handlePlayAll() {
      playerStore.updatePlaylist(songList.value, listInfo.id)
    }

    watchEffect(() => {
      initialData(props.id)
    })

    return {
      toIdx,
      listInfo,
      trackCount,
      playCount,
      featureRank,
      globalRank,
      songList,
      initialData,
      handlePlayAll,
    }
  },
  computed: {
    idx() {
      return this.toIdx[`id_${this.id}`]
    },
    updateFrequency() {
      const oid =
        this.featureRank.find((v) => v.id === this.id) ||
        this.globalRank.find((v) => v.id === this.id)
      return oid ? oid.updateFrequency : '每天更新'
    },
  },
})
</script>

<style lang="scss" scoped>
.list {
  width: 740px;
  .list-main {
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 0 40px;
    .list-title {
      height: 35px;
      line-height: 35px;
      font-size: $fontMin;
      border-bottom: 2px solid $bdcTitle;
      .title-main {
        float: left;
        font-size: $fontMiddle;
      }
      .title-sub {
        float: left;
        margin-left: 10px;
      }
      .title-play {
        float: right;
        .title-play-count {
          color: $bgSubHeader;
        }
      }
    }
  }

  // loading
}
</style>
