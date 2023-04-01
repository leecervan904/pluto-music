<template>
  <div class="container">
    <category-header :title="title" :more-path="morePath" />
    <div class="content">
      <bill-category-item v-for="i of bill" :id="i" :key="i" class="column" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryHeader from '/@/components/base/CategoryHeader.vue'
import BillCategoryItem from './BillCategoryItem.vue'

const title = '榜单'
const morePath = '/discover/toplist'
const bill = [19723756, 3779629, 2884035]
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  .content {
    height: 474px;
    margin-top: 20px;
    .column {
      box-sizing: border-box;
      display: inline-block;
      width: 229px;
      border: 1px solid $bdcDefault;
    }
  }
}
</style>
