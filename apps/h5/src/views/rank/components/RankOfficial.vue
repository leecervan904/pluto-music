<script>
export default {
  name: 'RankOfficial',
  props: {
    title: { type: String, require: true },
    rank: { type: Array, default: () => [] },
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
        v-for="(item, index) of rank" :key="index"
        class="item" tag="div"
        :to="`/ranklist/${item.id}`"
      >
        <div class="poster-wrapper">
          <div class="item-poster">
            <img
              class="img"
              :src="`${item.coverImgUrl}?param=200y200`"
              :alt="item.name"
            >
          </div>
        </div>
        <div class="item-toplist">
          <p v-for="(row, ri) of item.tracks" :key="ri" class="toplist-row">
            <span class="row-order">{{ ri + 1 }}.</span>
            {{ row.first }} = {{ row.second }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import '/@/styles/mixins';

.title {
  height: .4rem;
  line-height: .4rem;
  font-size: $font--large-s;
  font-weight: 600;
}

.item {
  display: flex;
  justify-content: space-between;
  margin-bottom: .1rem;

  .poster-wrapper {
    width: 30%;

    .item-poster {
      overflow: hidden;
      height: 0;
      padding-bottom: 100%;
      background-color: #ccc;
      border-radius: .1rem;

      .img {
        width: 100%;
      }
    }
  }

  &-toplist {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 65%;
    padding: .1rem .05rem .1rem;
    font-size: $font--medium-s;

    .toplist-row {
      @include ellipsis();
    }
  }
}
</style>
