<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    lyric: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const refLyric = ref<HTMLElement | null>(null)
    const showAllLyric = ref(false)
    const lyrics = computed(() =>
      props.lyric.split('\n').map(v => v.replace(/[\[\]\d\:\.]+/, '')),
    )
    const lyricControlIcon = computed(() =>
      showAllLyric.value ? 'ctrl-down-icon' : 'ctrl-up-icon',
    )

    function handleShowLyric() {
      if (showAllLyric.value)
        refLyric.value!.style.height = '299px'
      else
        refLyric.value!.style.height = 'auto'

      showAllLyric.value = !showAllLyric.value
    }

    return {
      refLyric,
      showAllLyric,
      lyrics,
      lyricControlIcon,
      handleShowLyric,
    }
  },
})
</script>

<template>
  <div class="lyric">
    <div ref="refLyric" class="lyric-main">
      <p v-for="(item, i) of lyrics" :key="i">
        {{ item }}
      </p>
    </div>
    <p class="lyric-ctrl" @click="handleShowLyric">
      <em v-if="!showAllLyric" class="ctrl-text">展开</em>
      <em v-else class="ctrl-text">收起</em>
      <i class="ctrl-icon" :class="[showAllLyric ? 'ctrl-icon--down' : 'ctrl-icon--up']" />
    </p>
  </div>
</template>

<style lang="scss" scoped>
.lyric {
  margin-top: 35px;
  line-height: 23px;
  .lyric-main {
    overflow: hidden;
    height: 295px;
  }
  .lyric-ctrl {
    &:hover {
      cursor: pointer;
    }
    .ctrl-text {
      color: $textLinkBlueLight;
    }
    .ctrl-icon {
      display: inline-block;
      width: 11px;
      height: 8px;
      margin-left: 5px;
    }
  }
}
</style>
