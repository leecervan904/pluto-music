<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCommonStore } from '/@/store/module/common'
import SidebarItem from './SidebarItem.vue'

const commonStore = useCommonStore()
const { featureRank, globalRank } = storeToRefs(commonStore)
</script>

<template>
  <div class="cate">
    <SidebarItem title="云音乐特色榜" :rank="featureRank" v-bind="$attrs" />
    <SidebarItem title="全球媒体榜" :rank="globalRank" v-bind="$attrs" />
  </div>
</template>

<style lang="scss" scoped>
.cate {
  width: 240px;
  padding-top: 40px;
  border-right: 1px solid $bdcDefault;
  background-color: $bgContentLight;
}
</style>
