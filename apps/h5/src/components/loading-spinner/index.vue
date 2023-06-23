<script>
export default {
  name: 'BaseLoadingSpinner',
  props: {
    width: { type: String, default: '50px' },
    height: { type: String, default: '40px' },
    itemWidth: { type: String, default: '15%' },
    color: { type: String, default: '#333' },
  },
  computed: {
    spinnerStyles() {
      return {
        width: this.width,
        height: this.height,
      }
    },
    rectStyles() {
      return {
        width: this.itemWidth,
        backgroundColor: this.color,
      }
    },
  },
}
</script>

<template>
  <div class="spinner" :style="spinnerStyles">
    <div
      v-for="i in 5"
      :key="i"
      class="rect"
      :style="rectStyles"
    />
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  text-align: center;
  /* border: 1px solid #ccc; */
  & > div {
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }
  & .rect:nth-child(2) {
    animation-delay: -1.1s;
  }
  & .rect:nth-child(3) {
    animation-delay: -1.0s;
  }
  & .rect:nth-child(4) {
    animation-delay: -0.9s;
  }
  & .rect:nth-child(5) {
    animation-delay: -0.8s;
  }
}

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>
