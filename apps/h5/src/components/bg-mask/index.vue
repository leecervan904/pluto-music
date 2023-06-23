<script>
export default {
  name: 'BaseMask',
  props: {
    background: { type: String, default: 'transparent' },
    bgImage: { type: String, default: '' },
    blur: { type: String, default: '30px' },
  },
  computed: {
    maskStyles() {
      const background = this.bgImage ? `url(${this.bgImage}) no-repeat center` : this.background

      return {
        background,
        filter: `blur(${this.blur})`,
      }
    },
  },
}
</script>

<template>
  <div class="mask" :style="maskStyles">
    <div class="mask-cover" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.mask {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
