<script>
import InverseIcon from '/@/components/inverse-icon/index.vue'

export default {
  name: 'AppTabbar',
  components: { InverseIcon },
  data() {
    return {
      active: 0,
    }
  },
}
</script>

<template>
  <van-tabbar
    v-model="active"
    class="tabbar"
    active-color="red"
    inactive-color="#aaa"
  >
    <van-tabbar-item replace to="/">
      <span>发现</span>
      <template #icon="props">
        <InverseIcon :is-active="props.active" padding="2px 3px">
          <svg-icon icon-class="netcloud-music" class="icon" :class="[props.active ? 'active' : 'inactive']" />
        </InverseIcon>
      </template>
    </van-tabbar-item>

    <van-tabbar-item>
      <span>设置</span>
      <template #icon="props">
        <InverseIcon :is-active="props.active" padding="2px 3px">
          <svg-icon icon-class="config" class="icon" :class="[props.active ? 'active' : 'inactive']" />
        </InverseIcon>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.icon {
  font-size: .18rem;
}
</style>
