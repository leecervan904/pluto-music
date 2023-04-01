<template>
  <aside class="ar-sidebar">
    <div v-for="cate of singerCate" :key="cate.title" class="cate">
      <h4 class="cate-title">{{ cate.title }}</h4>
      <ul class="cate-list">
        <li
          v-for="item of cate.list"
          :key="item.name"
          class="cate-item"
          :class="{ active: item.name === activeCate.name }"
          @click="changeCate(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ICateItem, ICateList } from '../typing'

const singerCate: ICateList[] = [
  {
    title: '推荐',
    list: [
      { name: '推荐歌手', type: -1, area: -1 },
      { name: '入驻歌手', type: -1, area: -1 },
    ],
  },
  {
    title: '华语',
    list: [
      { name: '华语男歌手', type: 1, area: 7 },
      { name: '华语女歌手', type: 2, area: 7 },
      { name: '华语组合/乐队', type: 3, area: 7 },
    ],
  },
  {
    title: '欧美',
    list: [
      { name: '欧美男歌手', type: 1, area: 96 },
      { name: '欧美女歌手', type: 2, area: 96 },
      { name: '欧美组合/乐队', type: 3, area: 96 },
    ],
  },
  {
    title: '日本',
    list: [
      { name: '日本男歌手', type: 1, area: 8 },
      { name: '日本女歌手', type: 2, area: 8 },
      { name: '日本组合/乐队', type: 3, area: 8 },
    ],
  },
  {
    title: '韩国',
    list: [
      { name: '韩国男歌手', type: 1, area: 16 },
      { name: '韩国女歌手', type: 2, area: 16 },
      { name: '韩国组合/乐队', type: 3, area: 16 },
    ],
  },
  {
    title: '其他',
    list: [
      { name: '其他男歌手', type: 1, area: 0 },
      { name: '其他女歌手', type: 2, area: 0 },
      { name: '其他组合/乐队', type: 3, area: 0 },
    ],
  },
]

const emit = defineEmits(['change'])

const activeCate = ref<ICateItem>(singerCate[0].list[0])

const changeCate = (cate: ICateItem) => {
  if (cate === activeCate.value) return
  activeCate.value = cate
}

watch(
  activeCate,
  (newVal) => {
    emit('change', newVal)
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.ar-sidebar {
  box-sizing: border-box;
  float: left;
  width: 180px;
  padding-top: 50px;
  .cate {
    padding-left: 20px;
    .cate-title {
      margin: 10px 0;
      font-size: 16px;
      font-weight: bold;
    }
    .cate-list {
      padding-inline-start: 0;
      list-style: none;
      font-size: 16px;
      color: #333;
      .cate-item {
        padding: 6px 0;
        text-indent: 1em;
        &.active {
          color: #c20c0c;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
