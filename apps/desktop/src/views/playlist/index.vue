<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import { computed, onMounted, shallowRef, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { IPlaylist, ISong } from '@pluto-music/api'
import { getDuration } from '@pluto-music/shared'
import { useRequest } from '/@/utils/useRequest'

const route = useRoute()
const router = useRouter()

const playlistId = computed(() => route.query.id)
const detail = shallowRef<IPlaylist>()
const songList = shallowRef<ISong[]>([]) // 歌单的所有歌曲
const columns: TableColumnsType = [
  {
    title: '',
    // dataIndex: 'name',
    key: '$index',
    customRender: ({ text, record, index }) => index + 1,
  },
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '歌手',
    // dataIndex: 'name',
    key: 'singers',
  },
  {
    title: '专辑',
    // dataIndex: 'al.name',
    key: 'album',
  },
  {
    title: '时长',
    dataIndex: 'dt',
    key: 'dt',
  },
]

async function initData() {
  const [error, data] = await useRequest('getPlaylistDetail')({ id: unref(playlistId) })
  if (error)
    return
  detail.value = data.playlist
  songList.value = data.playlist.tracks
  console.log(songList.value)
}

onMounted(initData)
</script>

<template>
  <div>
    <div class="flex mb-20px">
      <div class="overflow-hidden rounded-10px">
        <div class="w-200px h-0 pb-1/1">
          <img class="w-100/100" :src="detail?.coverImgUrl">
        </div>
      </div>

      <div class="flex-1 px-10px">
        <h3>{{ detail?.name }}</h3>
        <div class="multi-ellipsis-2">
          简介：{{ detail?.description }}
        </div>
      </div>
    </div>

    <a-table
      :columns="columns"
      :data-source="songList"
      :row-class-name="(_record, index) => (index % 2 === 0 ? 'table-striped' : null)"
    >
      <template #headerCell="{ column }">
        <span>{{ column.title }}</span>
      </template>

      <template #bodyCell="{ column, record }">
        <div v-if="column.key === 'singers'">
          <span v-for="item in record.artists || record.ar || []" :key="item.id">
            {{ item.name }} /
          </span>
        </div>

        <div v-else-if="column.key === 'album'">
          <span>{{ record.al?.name }}</span>
        </div>

        <div v-else-if="column.key === 'dt'">
          <span>{{ getDuration(record.dt || 0) }}</span>
        </div>

        <span v-if="column.key === 'name'">
          {{ record[column.key] }}
        </span>
      </template>
    </a-table>
  </div>
</template>
