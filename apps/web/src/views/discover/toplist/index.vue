<script lang="ts">
import { defineComponent, ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import RankList from './components/RankList.vue'

export default defineComponent({
  name: 'Toplist',
  components: {
    Sidebar,
    RankList,
  },
  setup() {
    const currentId = ref(19723756)

    return {
      currentId,
    }
  },
})
</script>

<template>
  <div class="toplist">
    <Sidebar v-model:id="currentId" />
    <RankList v-model:id="currentId" />
  </div>
</template>

<style lang="scss" scoped>
.toplist {
  display: flex;
}
</style>
