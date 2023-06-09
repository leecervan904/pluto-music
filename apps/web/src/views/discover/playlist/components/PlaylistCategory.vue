<script setup lang="ts">
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import type { ICategoryItem } from '../typing'

const props = defineProps({
  categories: {
    type: Array as PropType<ICategoryItem[]>,
    default: () => [],
  },
  cate: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['hide-category'])

const router = useRouter()

function changeCategory(cate: string) {
  if (cate !== props.cate)
    router.push({ path: '/discover/playlist', query: { cate } })

  emit('hide-category')
}
</script>

<template>
  <div class="category">
    <div class="category-header">
      <span class="category-header-all" @click="changeCategory('全部')">全部风格</span>
      <i class="category__up-icon" />
    </div>
    <div class="category-content">
      <dl v-for="(cateItem, ci) of categories" :key="ci" class="category__content-wrapper">
        <dt class="cate-tag">
          <i class="cate-tag-icon" />
          <span>{{ cateItem.name }}</span>
        </dt>
        <dd class="cate-list">
          <span
            v-for="(item, i) of cateItem.subs"
            :key="i"
            class="cate-item"
            @click="changeCategory(item)"
          >{{ item }}</span>
        </dd>
      </dl>
    </div>
    <div class="dd-divide" />
  </div>
</template>

<style lang="scss" scoped>
.category {
  z-index: 99;
  position: absolute;
  left: 10px;
  top: 90px;
  width: 700px;
  background-color: #fff;
  border: 1px solid $bdcDefault;
  border-radius: 5px;
  box-shadow: 0px -1px 10px $bdcDefault, 1px 0px 10px $bdcDefault, 0px 1px 10px $bdcDefault,
    -1px 0px 10px $bdcDefault;
  .category-header {
    position: relative;
    height: 40px;
    margin: 0 30px;
    .category-header-all {
      line-height: 50px;
      padding: 3px 10px;
      background-color: $bgContent;
      border: 1px solid $bdcDefault;
      border-radius: 3px;
      font-size: $fontMin;
      @include hoverText();
    }
    .category__up-icon {
      display: inline-block;
      position: absolute;
      top: -11px;
      left: 85px;
      width: 24px;
      height: 11px;
    }
  }
  .category-content {
    margin-top: 10px;
    padding: 0 30px 20px;
    background-color: $bgContent;
    border-top: 1px solid $bdcDefault;
    .category__content-wrapper {
      overflow: hidden;
      font-size: $fontMin;
      .cate-tag {
        float: left;
        width: 70px;
        height: 28px;
        margin: 0 -100px 0 0;
        padding-top: 15px;
        font-weight: bold;
        .cate-tag-icon {
          float: left;
          width: 23px;
          height: 23px;
          margin-top: -6px;
          margin-right: 10px;
        }
      }
      .cate-list {
        float: left;
        margin-left: 80px;
        padding: 8px 15px 0;
        line-height: 24px;
        .cate-item {
          float: left;
          margin-right: 10px;
          white-space: nowrap;
          color: $titleMain;
          @include hoverText();
          &:nth-child(even) {
            color: $homeDefault;
          }
        }
      }
    }
  }
  .dd-divide {
    position: absolute;
    top: 50px;
    left: 110px;
    bottom: 0;
    width: 1px;
    background-color: $bdcDefault;
  }
}
</style>
