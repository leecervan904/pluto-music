<script setup lang="ts">
import type { IAlbumDetail } from '@pluto-music/api'
import { onMounted, ref, shallowRef } from 'vue'
import { useRequest } from '/@/utils'

import CategoryHeader from '/@/components/base/CategoryHeader.vue'
import NewDiscCard from '/@/components/base/NewDiscCard.vue'

const albums = shallowRef<IAlbumDetail[]>([])
const currentList = ref('first')
const transitionName = ref('')

async function initialData() {
  const [error, data] = await useRequest('getAlbumNewest')()
  if (error)
    return
  albums.value = data.albums.slice(0, 10)
}

function handleShowList(choose: string) {
  transitionName.value = choose === 'prev' ? 'next' : 'prev'
  currentList.value = currentList.value === 'first' ? 'second' : 'first'
}

onMounted(initialData)
</script>

<template>
  <div class="new-cate">
    <CategoryHeader title="新碟上架" more-path="/discover/album" />
    <div class="content">
      <div class="wrapper">
        <transition :name="transitionName">
          <ul v-show="currentList === 'first'" class="list">
            <li v-for="(item, i) of albums.slice(0, 5)" :key="i" class="item">
              <NewDiscCard :album="item" />
            </li>
          </ul>
        </transition>

        <transition :name="transitionName">
          <ul v-show="currentList === 'second'" class="list">
            <li v-for="(item, i) of albums.slice(5, 10)" :key="i" class="item">
              <NewDiscCard :album="item" />
            </li>
          </ul>
        </transition>
      </div>

      <span class="new-cate__prev" @click="handleShowList('prev')">&nbsp;</span>
      <span class="new-cate__next" @click="handleShowList('next')">&nbsp;</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.new-cate {
  position: relative;
  width: 100%;
  .content {
    position: relative;
    margin: 20px 0 37px 0;
    border: 1px solid $bdcDefault;
    background-color: $bgContent;
    .wrapper {
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      height: 186px;
      margin: 0 20px 0 20px;
      .list {
        list-style: none;
        padding-inline-start: 0;
        position: absolute;
        top: 20px;
        bottom: 20px;
        .item {
          display: inline-block;
          margin-left: 11px;
        }
      }
    }
    .new-cate__prev,
    .new-cate__next {
      position: absolute;
      width: 17px;
      height: 17px;
      top: 71px;
      &:hover {
        cursor: pointer;
      }
    }
    .new-cate__prev {
      left: 5px;
    }
    .new-cate__next {
      right: 5px;
    }
  }
}

// transition
.next-enter-from {
  transform: translateX(-670px);
}
.next-leave-to {
  transform: translateX(670px);
}
.next-enter-active,
.next-leave-active {
  transition: all 0.8s ease;
}

.prev-enter-from {
  transform: translateX(670px);
}
.prev-leave-to {
  transform: translateX(-670px);
}
.prev-enter-active,
.prev-leave-active {
  transition: all 0.8s ease;
}
</style>
