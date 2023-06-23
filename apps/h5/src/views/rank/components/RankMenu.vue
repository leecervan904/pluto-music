<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'RankMenu',
  props: {
    title: { type: String, require: true },
    rank: { type: Array, default: () => [] },
  },
  computed: {
    // ...mapGetters(['bodyWidth']),
    itemWidth() {
      return `${document.body.clientWidth * 0.3}px`
    },
  },
}
</script>

<template>
  <div>
    <h2 class="title">
      {{ title }}
    </h2>
    <div class="list">
      <router-link
        v-for="(item, index) of rank" :key="index" class="item"
        tag="div" :style="{ width: itemWidth }"
        :to="`/ranklist/${item.id}`"
      >
        <div class="item-wrapper">
          <div class="img-wrapper">
            <img
              v-show="item.coverImgUrl" class="img"
              :src="`${item.coverImgUrl}?param=200y200`"
              :alt="item.name"
            >
          </div>
          <p class="item-name">
            {{ item.name }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';

.title {
  height: .4rem;
  line-height: .4rem;
  font-size: $font--large-s;
  font-weight: 600;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: auto;

  .item {
    &-wrapper {
      width: 100%;
      margin-bottom: .1rem;
    }

    .img-wrapper {
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      border-radius: .1rem;
      background-color: #ccc;
      .img {
        width: 100%;
      }
    }

    &-name {
      height: .5rem;
      line-height: .25rem;
      font-size: $font--medium-s;
    }
  }
}
</style>
