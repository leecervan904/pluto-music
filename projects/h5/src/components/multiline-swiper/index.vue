<template>
  <van-swipe
    :width="width"
    :loop="false"
    :show-indicators="false"
    :stop-propagation="false">
    <van-swipe-item v-for="(list, li) of swiperList" :key="li">
      <line-item v-for="(item, ii) of list" :key="ii"
        :item="item"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
// import { mapGetters } from 'vuex'
import { groupByNum } from '/@/utils'
import LineItem from './components/LineItem.vue'

export default {
  name: 'multiline-swiper',
  props: {
    list: { type: Array, require: true }
  },
  components: {
    LineItem
  },
  computed: {
    // ...mapGetters(['bodyWidth']),
    width () {
      return document.body.clientWidth - 30
    },
    swiperList () {
      return groupByNum(this.list, 3)
    }
  }
}
</script>
