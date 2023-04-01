<script setup lang="ts">
import { ref, onMounted, unref } from 'vue'
import { useRequest } from '/@/utils/useRequest'

const activeTab = ref(0)
const hotCate = ref([])
const isFirst = ref([])

const getPlaylistHot = async () => {
  const [error, data] = await useRequest('getPlaylistHot')()
  if (error) return
  const { tags } = data
  hotCate.value = tags.map(v => v.name)
  isFirst.value = hotCate.value.map(v => 1)
  isFirst.value[0] = 0
}


const handleTabSelect = tab => {

}

onMounted(() => {
  getPlaylistHot()
})
</script>

<template>
  <div class="pl-squares">
    <van-tabs class="pl-squares__tabs"
      v-model="activeTab"
      swipeable
      @click="handleTabSelect"
    >
      <van-tab
        v-for="item in hotCate"
        :key="item"
        :title="item"
      />
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>

</style>