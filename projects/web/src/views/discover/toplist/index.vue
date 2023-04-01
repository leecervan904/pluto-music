<template>
  <div class="toplist">
    <sidebar v-model:id="currentId" />
    <rank-list v-model:id="currentId" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
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

<style lang="scss" scoped>
.toplist {
  display: flex;
}
</style>
