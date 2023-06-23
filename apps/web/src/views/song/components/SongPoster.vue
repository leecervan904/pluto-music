<script lang="ts">
import type { ISong } from '@pluto-music/api'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { getSingers } from '/@/utils'
import BtnBar from '/@/components/base/BtnBar.vue'

export default defineComponent({
  components: {
    BtnBar,
  },
  props: {
    detail: {
      type: Object as PropType<ISong>,
      required: true,
    },
  },
  emits: ['to-artist', 'to-album'],
  computed: {
    singers() {
      return getSingers(this.detail?.ar || [])
    },
  },
  methods: {
    toArtistView(id: string | number) {
      this.$emit('to-artist', id)
    },
    toAlbumView(id: string | number) {
      this.$emit('to-album', id)
    },
  },
})
</script>

<template>
  <div class="poster">
    <div class="poster-header">
      <div class="poster-header__icon" />
      <div class="header-title">
        <h2 class="title-main">
          {{ detail?.name }}
          <span class="poster-header__mv" />
        </h2>
        <h3 v-if="detail?.alia.length" class="title-sub">
          {{ detail?.alia[0] }}
        </h3>
      </div>
    </div>

    <div class="poster-desc">
      <p>
        歌手：<a href="#" @click.prevent="toArtistView(detail.ar[0].id)">{{ singers }}</a>
      </p>
      <p>
        所属专辑：<a href="#" @click.prevent="toAlbumView(detail.al.id)">{{ detail?.al.name }}</a>
      </p>
    </div>
    <div class="poster-btn">
      <BtnBar :detail="detail" v-bind="$attrs">
        <template #comment>
          <span>(123)</span>
        </template>
      </BtnBar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.poster {
  .poster-header {
    overflow: hidden;
    &__icon {
      float: left;
      width: 54px;
      height: 24px;
    }
    .header-title {
      float: left;
      margin-left: 10px;
      .title-main {
        height: 32px;
        line-height: 32px;
        font-size: $fontLarge;
        .poster-header__mv {
          display: inline-block;
          width: 21px;
          height: 18px;
        }
      }
      .title-sub {
        height: 17px;
        margin-top: 2px;
        line-height: 17px;
        color: $titleDivide;
        font-size: $fontMinL;
      }
    }
  }
  .poster-desc {
    margin-top: 10px;
    line-height: 25px;
  }
  .poster-btn {
    padding-top: 10px;
  }
}
</style>
