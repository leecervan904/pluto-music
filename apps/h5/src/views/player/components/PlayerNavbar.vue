<template>
  <div class="navbar">
    <div class="navbar-left">
      <svg-icon icon-class="back" @click="$emit('hide-player')"></svg-icon>
    </div>
    <div class="navbar-center">
      <h2 class="title">{{ songName }}</h2>
      <p class="singer">{{ artists }}</p>
    </div>
    <div class="navbar-right" @click="$emit('show-comment')">
      <SvgIcon icon-class="comment" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'player-navbar',
  props: {
    songName: { type: String, default: '' },
    artists: { type: String, default: '' }
  },
}
</script>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import '/@/styles/mixins.scss';

.navbar {
  display: flex;
  justify-content: space-between;
  height: .5rem;
  @media (max-height: 600px) {
    height: .4rem;
  }
  text-align: center;
  background-color: transparent;

  &-left {
    width: .5rem;
    line-height: .5rem;
    @media (max-height: 600px) {
      width: .4rem;
      line-height: .4rem;
    }
    font-size: $font--large;
  }

  &-center {
    flex: 1;
    width: 0;

    .title {
      line-height: .35rem;
      @media (max-height: 600px) {
        line-height: .25rem;
      }
      font-size: $font--medium-s;
      @include ellipsis();
    }

    .singer {
      font-size: $font--small-s;
      color: #d2d2d2;
      @include ellipsis();
    }
  }

  &-right {
    width: .5rem;
    line-height: .5rem;
    font-size: .25rem;
    @media (max-height: 600px) {
      width: .4rem;
      line-height: .4rem;
    }
  }
}
</style>
