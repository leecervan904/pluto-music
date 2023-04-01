<template>
  <div id="base-alphabet-cate">
    <span
      v-for="(item, i) of list"
      :key="item"
      :class="['item', { 'item-active': i === activeIndex }]"
      @click="handleClick(i, item)"
    >
      <span>{{ item }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['change'])

const activeIndex = ref(0)

const list = computed(() => {
  let a = 65
  const a2z = new Array(26).fill(null).map(() => String.fromCharCode(a++))
  a2z.unshift('热门')
  a2z.push('其他')
  return a2z
})

const reset = () => {
  activeIndex.value = 0
}

const handleClick = (i: number, item: string) => {
  if (activeIndex.value === i) return
  activeIndex.value = i
  if (i === 0 || i === 27) {
    emit('change', '')
  } else {
    emit('change', item)
  }
}

defineExpose({
  reset,
})
</script>

<style lang="scss" scoped>
#base-alphabet-cate {
  display: flex;
  margin: 5px 0;
  justify-content: space-between;
  .item {
    padding: 5px;
    font-size: $fontMinL;
    border-radius: 3px;
    &:hover {
      cursor: pointer;
      background-color: $bgSubHeader;
      span {
        color: $textLight;
      }
    }
  }
  .item-active {
    background-color: $bgSubHeader;
    span {
      color: $textLight;
    }
  }
}
</style>
