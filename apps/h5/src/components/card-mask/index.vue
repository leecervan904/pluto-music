<template>
  <div class="mask-wrapper" :style="wrapperStyles">
    <div class="bg" :style="bgStyles"></div>
    <div class="bg-mask" :style="maskStyles"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-card-mask',
  props: {
    borderRadius: {
      type: String,
      default: '5px',
    },
    color: {
      type: String,
      default: 'rgba(0, 0, 0, .8)',
    },
    src: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: '50%',
    },
    size: {
      type: String,
      default: 'cover',
    },
    repeat: {
      type: String,
      default: 'no-repeat',
    },
    blur: {
      type: String,
      default: '10px',
    },
  },
  computed: {
    wrapperStyles() {
      return {
        borderRadius: this.borderRadius,
      }
    },
    bgStyles() {
      return !this.src
        ? {}
        : {
            background: `url(${this.src})`,
            backgroundPosition: this.position,
            backgroundReapeat: this.repeat,
            backgroundSize: this.size,
            filter: `blur(${this.blur})`,
          }
    },
    maskStyles() {
      return {
        background: this.color,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mask-wrapper {
  position: relative;
  overflow: hidden;

  .bg,
  .bg-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .bg {
    z-index: -2;
  }

  .bg-mask {
    z-index: -1;
    background: rgba($color: #000000, $alpha: 0.5);
  }

  .content {
    width: 100%;
    height: 100%;
  }
}
</style>
