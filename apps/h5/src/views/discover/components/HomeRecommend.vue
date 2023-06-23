<template>
  <div class="recommend">
    <router-link class="recommend-item"
      v-for="item of recommend" :key=item.icon
      :to="item.path">
      <div class="item-icon">
        <svg-icon :icon-class="item.icon"></svg-icon>
      </div>
      <p class="item-title">{{ item.title }}</p>
    </router-link>

    <div class="recommend-item">
      <div class="item-icon">
        <svg-icon icon-class="radio"></svg-icon>
      </div>
      <p class="item-title">电台</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-recommend',
  data () {
    return {
      recommend: [
        { icon: 'dayly', title: '每日推荐', path: '/rank' },
        { icon: 'playlist', title: '歌单', path: '/playlist-square' },
        { icon: 'ranklist', title: '排行榜', path: '/rank' }
        // { icon: 'radio', title: '电台', path: '/test' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';

.recommend {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: .1rem;
  &-item {
    width: 25%;
    .item-icon {
      box-sizing: border-box;
      margin: auto;
      width: 50px;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 25px;
      text-align: center;
      border-radius: 50%;
      background-color: $color-palette-red;
    }
    .item-title {
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: $font--medium-s;
    }
  }
}
</style>
