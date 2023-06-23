<template>
  <van-tabbar class="tabbar"
    v-model="active"
    active-color="red"
    inactive-color="#aaa">
    <van-tabbar-item replace to="/">
      <span>发现</span>
      <template #icon="props">
        <inverse-icon :is-active="props.active" :padding="'2px 3px'">
          <svg-icon icon-class="netcloud-music" :class="['icon', props.active ? 'active' : 'inactive']"/>
        </inverse-icon>
      </template>
    </van-tabbar-item>

    <van-tabbar-item>
      <span>设置</span>
      <template #icon="props">
        <inverse-icon :is-active="props.active" :padding="'2px 3px'">
          <svg-icon icon-class="config" :class="['icon', props.active ? 'active' : 'inactive']"/>
        </inverse-icon>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import InverseIcon from '/@/components/inverse-icon/index.vue'

export default {
  name: 'app-tabbar',
  components: { InverseIcon },
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: .18rem;
}
</style>
