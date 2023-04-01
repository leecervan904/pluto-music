<script setup lang="ts">
import { ref } from 'vue'

const menu = [
  { label: '个性推荐', to: '/discover/recommend' },
  { label: '歌单', to: '/discover/playlist' },
  { label: '排行榜', to: '/discover/rank' },
  { label: '歌手', to: '/discover/artist' },
  { label: '最新音乐', to: '/discover/new-song' },
]

const search = ref('')
const handleSearch = () => {}
</script>

<script lang="ts">
export default {
  mounted() {
    console.log(this.$route.path)
  },
}
</script>

<template>
  <div class="app-header__left">
    <div class="h-50px lh-50px bg-red-400 pointer" @click="$router.go(-1)">back</div>
  </div>

  <div class="app-header__right">
    <div class="app-header__right-nav">
      <router-link
        v-for="item in menu"
        :key="item.label"
        class="app-header__right-nav-item"
        :class="{ 'is-active': $route.path.startsWith(item.to) }"
        :to="item.to"
        >{{ item.label }}</router-link
      >
    </div>

    <div class="app-header__right-search">
      <a-input-search
        v-model:value="search"
        placeholder="input search text"
        style="width: 200px"
        @search="handleSearch"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header__left {
  width: 200px;
}
.app-header__right {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  line-height: 50px;
  &-nav {
    &-item {
      color: #ccc;
      &.is-active {
        color: #000;
      }
      &:not(:first-child) {
        margin-left: 20px;
      }
    }
  }
  &-search {
    display: flex;
    align-items: center;
  }
}
</style>
