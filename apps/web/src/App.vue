<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '/@/store/module/common'
import { usePlayerStore } from '/@/store/module/player'
import { useRequest } from '/@/utils'
import Player from '/@/components/player/index.vue'

const commonStore = useCommonStore()
const playerStore = usePlayerStore()

const handleInitialPlayer = playerStore.initPlayer

const { featureRank, globalRank } = storeToRefs(commonStore)

async function initialData() {
  const [error, data] = await useRequest('getToplistDetail')()
  if (error)
    return
  featureRank.value = data.list.slice(0, 4)
  globalRank.value = data.list.slice(4)
  // let featureRank = this.$storage.getLocalStorage('featureRank')
  // let globalRank = this.$storage.getLocalStorage('globalRank')
  // if (featureRank && globalRank) {
  //   // get data from storage, and save to store
  //   this.$store.dispatch('updateToplistDetail', {
  //     featureRank,
  //     globalRank,
  //   })
  // } else {
  //   // fetch new data and save to store, update storage
  //   this.$api
  //     .getToplistDetail()
  //     .then((res) => {
  //       const data = res.data.list
  //       featureRank = data.slice(0, 4)
  //       globalRank = data.slice(4)
  //       this.$store.dispatch('updateToplistDetail', {
  //         featureRank,
  //         globalRank,
  //       })
  //       this.$storage.setLocalStorage('featureRank', featureRank, 300)
  //       this.$storage.setLocalStorage('globalRank', globalRank, 300)
  //     })
  //     .catch(console.log)
  // }
}

onMounted(initialData)
</script>

<template>
  <div class="app-wrapper" @click.once="handleInitialPlayer">
    <router-view />
    <Player />
  </div>
</template>

<style lang="scss" scoped>
#app {
  position: relative;
  background-color: rgb(245, 245, 245);
  .about-btn {
    z-index: 99;
    position: fixed;
    top: 0;
    right: 0;
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgb(80, 195, 126);
    color: #fff;
    &:hover {
      cursor: pointer;
      background-color: rgb(14, 117, 55);
    }
  }
}
</style>
