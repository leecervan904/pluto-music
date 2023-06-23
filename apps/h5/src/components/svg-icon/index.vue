<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      require: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      return this.className ? `svg-icon ${this.className}` : 'svg-icon'
    },
  },
}
</script>

<template>
  <span>
    <svg :class="svgClass" aria-hidden="true" v-on="$attrs">
      <use :xlink:href="iconName" />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
