<script setup lang="ts">
import { computed, onMounted, reactive, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRequest } from '/@/utils/useRequest'
import { useSearchStore } from '/@/store/module/search'
import { useLayoutStore } from '/@/store/module/layout'

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()
const layoutStore = useLayoutStore()

const defaultSearch = {
  text: '请输入搜索关键字',
  keywords: '',
  type: 1018,
}

const search = reactive({
  keywords: '', // 搜索关键字
  type: 1018, // 搜索类型
})

const inputAlign = ref('center')
// const paths = ref([['', 'discover', 'search']])
const path = computed(() => route.path.replace('/', '').trim())
const navTitle = computed(() => route.meta.title || '标题')
const hasSearch = computed(() => route.meta.showSearch)
const inSearchView = computed(() => /search/.test(path.value))

const showSearch = computed(() => searchStore.showSearch)

async function initSearch() {
  const [error, data] = await useRequest('getSearchDefault')()
  if (error)
    return
  defaultSearch.text = data.showKeyword
  defaultSearch.keywords = data.realkeyword
  defaultSearch.type = data.searchType
}

function handleFocus() {
  inputAlign.value = 'left'
  unref(showSearch) && searchStore.toggleSearch()
}

function handleCancel() {
  inputAlign.value = 'center'
  if (unref(showSearch)) {
    searchStore.toggleSearch()
  }
  else {
    // 隐藏搜索结果，跳转到首页
    router.replace('/')
  }
}

function handleSearch() {
  const keywords = search.keywords || defaultSearch.keywords
  // 隐藏搜索页面，显示搜索结果
  searchStore.toggleSearch()
  if (unref(inSearchView))
    router.replace({ name: 'search', params: { keywords } })
  else
    router.push({ name: 'search', params: { keywords } })
}

function handleShowConfig() {
  layoutStore.toggleShowConfig(true)
}

function handleGoBack() {
  unref(inSearchView) && searchStore.toggleSearch()
  router.goBack()
}

onMounted(() => {
  initSearch()
})
</script>

<template>
  <div class="navbar">
    <transition name="slideOut-left">
      <div
        v-show="!showSearch && !inSearchView"
        class="navbar-left"
      >
        <svg-icon
          v-if="path === 'discover' || path === ''"
          icon-class="config"
          @click="handleShowConfig"
        />
        <!-- fixup：这里的 stop 防止事件冒泡到父元素，否则会触发 v-coming(原因未知?) -->
        <svg-icon v-else icon-class="back" @click.stop="handleGoBack" />
      </div>
    </transition>

    <div class="navbar-center">
      <!-- path is '/discover' || '/search/:keywords' -->
      <van-search
        v-if="hasSearch"
        v-model="search.keywords"
        class="navbar-search"
        :input-align="inputAlign"
        maxlength="20"
        shape="round"
        :placeholder="defaultSearch.text"
        @focus="handleFocus"
        @search="handleSearch"
      />
      <!-- other -->
      <h2 v-else class="navbar-title">
        {{ navTitle }}
      </h2>
    </div>

    <div class="navbar-right">
      <transition name="slideIn-left">
        <div
          v-if="(inSearchView || showSearch)"
          key="text"
          class="navbar-right__text"
          @click="handleCancel"
        >
          <span class="navbar-right__cancel">取消</span>
        </div>
        <div
          v-else
          key="img"
          class="navbar-right__img"
          @click="handleShowConfig"
        >
          <SvgIcon icon-class="voice" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';

.navbar {
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  &-left {
    width: $navbar__height;
    text-align: center;
    line-height: $navbar__height;
    font-size: $font--large;
  }
  &-center {
    flex: 1;
    .navbar-title {
      line-height: $navbar__height;
      text-align: center;
      font-size: $font--large;
      font-weight: 600;
    }
    .navbar-search {
      height: $navbar__height;
    }
  }
  &-right {
    position: relative;
    width: $navbar__height;
    &__img {
      position: absolute;
      width: .5rem;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      font-size: 20px;
    }
    &__text {
      position: absolute;
      width: 100%;
      line-height: $navbar__height;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
