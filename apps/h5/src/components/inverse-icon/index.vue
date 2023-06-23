<script>
export default {
  name: 'InverseIcon',
  props: {
    isActive: { type: Boolean, require: true },
    padding: { type: String, default: 'auto' },
    activeColor: { type: String, default: 'red' },
    inactiveColor: { type: String, default: '#fff' },
  },
}
</script>

<template>
  <span
    class="icon-wrapper"
    :style="{
      padding,
      background: isActive ? activeColor : inactiveColor,
      color: isActive ? inactiveColor : '#aaa',
    }"
  >
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.icon-wrapper {
  padding: 0;
  border-radius: 50%;
  transition: padding, background 0.2s;
}
</style>
