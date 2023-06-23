<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLayoutStore } from '../store/module/layout';

const layoutStore = useLayoutStore()
const checked = ref(false)
const showConfig = computed({
  get() {
    return layoutStore.showConfig
  },
  set(val) {
    layoutStore.toggleShowConfig(val)
  },
})
</script>

<template>
  <van-popup
    class="app-config"
    v-model:show="showConfig"
    position="left"
    :style="{ width: '80%', height: '100%' }"
  >
    <div class="title">
      设置
    </div>

    <van-cell-group inset>
      <van-cell title="深色模式">
        <template #right-icon>
          <van-switch v-model="checked" size="16px" active-color="#eb0d21" />
        </template>
      </van-cell>
    </van-cell-group>
  </van-popup>
</template>

<style lang="scss" scoped>
.title {
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
</style>

<style lang="scss">
.app-config {
  background-color: #1d1e21;
}
</style>