<script>
import { mapGetters } from 'vuex'
import scrollMixin from '@/mixins/scroll'

export default {
  name: 'HomeSearch',
  mixins: [scrollMixin],
  data() {
    return {
      history: [], // 历史搜索
      hotSearch: [], // 热搜
      historyScrollOption: {
        scrollX: true,
        scrollY: false,
        click: true,
      },
    }
  },
  computed: {
    ...mapGetters(['showSearch']),
  },
  watch: {
    showSearch(newVal) {
      newVal && this.initHotSearch()
    },
  },
  mounted() {
    console.log('search mounted...')
    this.initHotSearch()
  },
  methods: {
    initHotSearch() {
      this.$api.getSearchHotDetail().then((res) => {
        // console.log(res.data.data)
        this.hotSearch = [].concat(res.data.data)
        this.history = this.hotSearch.slice(0, 10)
        this.$nextTick((_) => {
          this.$refs.scroll.refresh()
          this.$refs.scroll2.refresh()
        })
      })
    },
    onSearch(item) {
      // console.log(item)
      this.$router.push({ name: 'search', params: { keywords: item.searchWord } })
      this.$store.dispatch('search/hideSearch')
    },
  },
}
</script>

<template>
  <div v-show="showSearch" class="home-search">
    <div class="home-search__history">
      <div class="history-title">
        历史
      </div>
      <base-scroll
        ref="scroll" class="history-content__wrapper"
        :options="historyScrollOption"
        :data="history"
      >
        <div class="history-content">
          <span
            v-for="item in history"
            :key="item.score" class="history-content__item"
            @click="onSearch(item)"
          >{{ item.searchWord }}</span>
        </div>
      </base-scroll>
      <div class="history-clear">
        <svg-icon icon-class="trash" />
      </div>
    </div>

    <div class="home-search__hot">
      <div class="hot-title">
        热搜榜
      </div>
      <base-scroll
        ref="scroll2" class="hot-content__wrapper"
        :options="scrollOptions"
        :data="hotSearch"
      >
        <div class="hot-content">
          <p
            v-for="(item, index) in hotSearch"
            :key="index" class="hot-content__item"
            @click="onSearch(item)"
          >
            <span class="item-order" :class="{ 'is-front': index < 3 }">{{ index + 1 }}</span>
            <span class="item-name">{{ item.searchWord }}</span>
            <img v-show="item.iconType" class="item-icon" :src="item.iconUrl" :alt="item.searchWord">
          </p>
        </div>
      </base-scroll>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import '/@/styles/mixins.scss';

.home-search {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  z-index: 99;
  top: .5rem;
  right: 0;
  bottom: .5rem;
  left: 0;
  padding: 0 .1rem;
  font-size: $font--medium;
  background-color: #fff;
  &__history {
    display: flex;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    .history-title {
      width: .4rem;
      box-shadow: 8px 0px 15px 5px #fff;
    }
    .history-content__wrapper {
      position: relative;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
    }
    .history-content {
      position: absolute;
      &__item {
        box-sizing: border-box;
        padding: .06rem .1rem;
        margin-left: .1rem;
        font-size: $font--small-s;
        background-color: #eee;
        border-radius: .1rem;
      }
    }
    .history-clear {
      width: .3rem;
      text-align: right;
      color: #ccc;
      font-size: 20px;
      box-shadow: -8px 0px 15px 5px #fff;
    }
  }
  &__hot {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 0;
    .hot-title {
      /* BUG: 不知道怎么回事，明明没有涉及层叠问题，却要添加 z-index */
      z-index: 1;
      height: .5rem;
      line-height: .5rem;
      background-color: #fff;
      box-shadow: 0px 1px 3px 1px #eee;
    }
    .hot-content__wrapper {
      flex: 1;
      height: 0;
    }
    .hot-content {
      overflow: hidden;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      /* height: 0; */
      &__item {
        flex-shrink: 1;
        display: flex;
        align-items: center;
        width: 50%;
        height: .4rem;
        line-height: .4rem;
        .item-order {
          display: inline-block;
          width: .25rem;
          color: #ccc;
          &.is-front {
            color: red;
          }
        }
        .item-name {
          float: 1;
          font-size: $font--medium-s;
          @include ellipsis();
        }
        .item-icon {
          margin-left: .05rem;
          width: .12rem;
          height: .1rem;
        }
      }
    }
  }
}
</style>
