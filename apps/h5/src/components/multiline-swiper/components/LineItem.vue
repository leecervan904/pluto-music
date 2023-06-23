<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '/@/store/module/player'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const playerStore = usePlayerStore()
const isActive = computed(() => props.item.id === playerStore.songId)

function onSelect() {
  // if (this.item.type === 'song') {
  //   this.$store.dispatch('player/changeSong', { song: this.item.id, toPlayer: false })
  // }
  if (props.item.type === 'album')
    router.push({ path: `/album/${props.item.id}` })
}
</script>

<template>
  <div class="line-item" @click="onSelect">
    <div class="line-item__left">
      <img :src="item.blurPicUrl" :alt="item.name">
    </div>

    <div class="line-item__center">
      <p class="line-item__center-info">
        <span class="line-item__center-info__name">{{ item.name }}</span>
        <span class="line-item__center-info__separator">-</span>
        <span class="line-item__center-info__singer">{{ item.artists }}</span>
      </p>
      <p class="line-item__center-desc">
        {{ item.description || '暂无描述' }}
      </p>
    </div>

    <div v-show="item.type !== 'album'" class="line-item__right">
      <svg-icon v-if="!isActive" icon-class="play" />
      <svg-icon v-else icon-class="sound" />
    </div>
  </div>
</template>

<style lang="scss">
@import '/@/styles/variables.scss';

.toast--fail {
  font-size: $font--medium-s;
  color: #fc6c6c;
}
.toast--success {
  font-size: $font--medium-s;
  color: aqua;
}
</style>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';
@import '/@/styles/mixins.scss';

.line-item {
  box-sizing: border-box;
  display: flex;
  height: 0.75rem;
  padding: .075rem 0;
  &__left {
    overflow: hidden;
    max-width: .6rem;
    margin-left: .1rem;
    border-radius: .05rem;
    img {
      width: 100%;
    }
  }
  &__center {
    flex: 1;
    overflow: hidden;
    padding: .05rem 0;
    white-space: nowrap;
    line-height: .275rem;
    margin-left: .05rem;
    &-info {
      display: flex;
      font-size: $font--medium-s;
      &__separator {
        margin: 0 .05rem;
      }
      &__name {
        max-width: 50%;
        font-weight: bold;
        @include ellipsis();
      }
      &__singer {
        flex: 1;
        font-size: $font--small;
        @include ellipsis();
      }
    }
    &-desc {
      font-size: $font--small;
      @include ellipsis();
    }
  }
  &__right {
    min-width: .4rem;
    line-height: .6rem;
    text-align: center;
    font-size: .2rem;
    color: $color-palette-red;
  }
}
</style>
