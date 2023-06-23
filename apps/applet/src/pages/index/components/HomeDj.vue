<template>
  <section class="dj">
    <h2 class="dj-title">
      <span class="dj-title__main">电台</span>
      <span
        class="dj-title__item dj-title__hot"
        :class="{ bold: active === 'hot' }"
        @click="extractDjData('hot')"
        >最热</span
      >
      <span
        class="dj-title__item dj-title_new"
        :class="{ bold: active !== 'hot' }"
        @click="extractDjData('new')"
        >最新</span
      >
    </h2>

    <transition name="fade">
      <base-scroll
        ref="scroll"
        v-loading="loading"
        class="dj-content__wrapper"
        :options="scrollOptions"
        :data="activeList"
        m-loading-text="加载中..."
        m-loading-vertical="20px"
        m-loading-background="#fff"
      >
        <ul ref="content" class="dj-content" :style="{ height: contentHeight }">
          <li
            v-for="item of activeList"
            :key="item.id"
            v-coming="'电台'"
            class="dj-content__item"
            :style="{ width: itemWidth + 'px' }"
          >
            <div class="item-image">
              <img
                v-lazy="`${item.picUrl}?param=200y200`"
                :src="`${item.picUrl}?param=200y200`"
                :alt="item.name"
              />
            </div>
            <div class="item-title">{{ item.name }}</div>
            <div class="item-desc">{{ item.rcmdtext }}</div>
          </li>
        </ul>
      </base-scroll>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeDj',
  data() {
    return {
      loading: false,
      active: 'hot',
      activeList: [],
      scrollOptions: {
        scrollX: true,
        scrollY: false,
      },
    }
  },
  computed: {
    ...mapGetters(['bodyWidth']),
    itemWidth() {
      return this.bodyWidth * 0.25
    },
    contentHeight() {
      // item 使用了 padding-bottom 占位，不能设置高度；通过设置其父元素高度来定高
      return `calc(${this.itemWidth}px + .5rem)`
    },
    scroll() {
      return this.$refs.scroll
    },
  },
  mounted() {
    this.extractDjData('hot')
  },
  beforeUnmount() {
    this.scroll && this.scroll.destroy()
  },
  methods: {
    extractDjData(type) {
      if (this.active === type && this.activeList.length) return
      this.loading = true
      this.active = type
      this.$api.getToplistDj({ type }).then((res) => {
        const { toplist } = res.data
        this.loading = false
        this.activeList = toplist.map((v) => ({
          id: v.id,
          name: v.name,
          picUrl: v.picUrl,
          rcmdtext: v.rcmdtext,
        }))
        this.scroll && this.scroll.scrollTo(0, 0, 100)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.dj {
  box-sizing: border-box;
  padding: 0 0.1rem;
  &-title {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: $font--medium;
    &__main {
      font-weight: 600;
    }
    &__item {
      margin: 0 0.1rem;
      font-size: $font--medium-s;
      color: #aaa;
      &.bold {
        font-weight: 600;
        color: #000;
      }
    }
  }
  &-content__wrapper {
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  &-content {
    display: inline-flex;
    flex-direction: row;
    &__item {
      &:not(:last-child) {
        margin-right: 0.1rem;
      }
      .item-image {
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        border-radius: 0.05rem;
        background-color: #ccc;
        img {
          width: 100%;
        }
      }
      .item-title {
        height: 0.2rem;
        line-height: 0.2rem;
        font-size: $font--medium-s;
        @include ellipsis();
      }
      .item-desc {
        height: 0.3rem;
        line-height: 0.15rem;
        font-size: $font--small;
        color: #878787;
        @include multi-ellipsis(2);
      }
    }
  }
}
</style>
