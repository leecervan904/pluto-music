<template>
  <div class="cate">
    <sidebar-item title="云音乐特色榜" :rank="featureRank" v-bind="$attrs" />
    <sidebar-item title="全球媒体榜" :rank="globalRank" v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCommonStore } from '/@/store/module/common'
import SidebarItem from './SidebarItem.vue'

const commonStore = useCommonStore()
const { featureRank, globalRank } = storeToRefs(commonStore)
</script>

<style lang="scss" scoped>
.cate {
  width: 240px;
  padding-top: 40px;
  border-right: 1px solid $bdcDefault;
  background-color: $bgContentLight;
}
</style>
