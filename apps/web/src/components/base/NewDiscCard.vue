<script lang="ts">
import { type PropType, computed, defineComponent } from 'vue'
import { usePlayerStore } from '/@/store/module/player'
import { addSeparator, useRequest } from '/@/utils'
import type { IAlbumDetail } from '@pluto-music/api'

type TTSize = 'xm' | 'm' | 'l'

export default defineComponent({
  name: 'NewDiscCard',

  props: {
    album: {
      type: Object as PropType<Partial<IAlbumDetail>>,
      default: () => {},
    },
    size: {
      type: String,
      default: 'md',
    },
    ttSize: {
      type: String as PropType<TTSize>,
      default: 'xm',
    },
  },

  setup(props) {
    const playerStore = usePlayerStore()

    const fontSize = {
      xm: '12px',
      m: '14px',
      l: '16px',
    }
    const fontSizeStyle = computed(() => fontSize[props.ttSize])

    const handlePlayAll = async () => {
      const [error, data] = await useRequest('getAlbumDetail')({ id: props.album.id as string })
      if (error)
        return
      playerStore.updatePlaylist(data.songs, data.album.id)
    }

    return {
      fontSizeStyle,
      handlePlayAll,
    }
  },

  computed: {
    artists() {
      const artists = this.album.artists!.map(v => v.name)
      return addSeparator(artists, '/')
    },
  },

  methods: {
    handleShowAbout() {
      // this.$store.commit('SHOW_ABOUT_SITE')
    },
  },
})
</script>

<template>
  <div class="card" :class="[`card-${size}`]">
    <router-link :to="`/album?id=${album.id}`" class="card-wrapper" :class="[`card-wrapper-${size}`]">
      <img
        class="card-img" :class="[`card-img-${size}`]"
        :src="`${album.picUrl}?param=300y300`"
        alt=""
      >
      <span class="play-icon" :class="[`play-icon-${size}`]" @click.stop.prevent="handlePlayAll" />
    </router-link>
    <span
      class="card-link" :class="[`card-link-${size}`]"
      @click="$router.push(`/album?id=${album.id}`)"
    />
    <p class="card-title" :style="fontSizeStyle">
      <router-link :to="`/album?id=${album.id}`">
        {{ album.name }}
      </router-link>
    </p>
    <p class="card-artists">
      <span v-for="(item, i) of artists" :key="i" class="singer" @click="handleShowAbout()">
        {{ item }}
      </span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
/*
xm:
md: 100x100
lg: 130x130
*/
.card {
  display: inline-block;
  position: relative;
  &-#{sm} {
    // background-color: #ccc;
  }
  &-#{md} {
    width: 118px;
    height: 150px;
  }
  &-#{lg} {
    width: 153px;
    height: 178px;
  }
  &:hover {
    .play-icon {
      display: block;
    }
  }
}

.card-wrapper {
  position: relative;
  &-#{sm} {
    background-color: #ccc;
  }
  &-#{md} {
    height: 100px;
  }
  &-#{lg} {
    height: 130px;
  }
}

.card-img {
  &-#{sm} {
    // background-color: #ccc;
  }
  &-#{md} {
    width: 100px;
  }
  &-#{lg} {
    width: 130px;
  }
  box-shadow: $discBoxShadow;
}

.card-link {
  position: absolute;
  top: 0;
  left: 0;
  &:hover {
    cursor: pointer;
  }
  &-#{sm} {
    // background-color: #ccc;
  }
  &-#{md} {
    width: 118px;
    height: 100px;
    background: url('../../../public/img/icons/coverall.png') no-repeat 0 -570px;
  }
  &-#{lg} {
    width: 153px;
    height: 130px;
    background: url('../../../public/img/icons/coverall.png') no-repeat 0 -845px;
  }
}

.play-icon {
  z-index: 10;
  display: none;
  position: absolute;
  background-color: #ccc;
  &-#{md} {
    right: 10px;
    bottom: 10px;
    width: 22px;
    height: 22px;
    background: url('../../../public/img/icons/iconall.png') no-repeat 0 -85px;
    &:hover {
      cursor: pointer;
      background: url('../../../public/img/icons/iconall.png') no-repeat 0 -110px;
    }
  }
  &-#{lg} {
    right: 10px;
    bottom: 10px;
    width: 28px;
    height: 28px;
    background: url('../../../public/img/icons/iconall.png') no-repeat 0 -140px;
    &:hover {
      cursor: pointer;
      background: url('../../../public/img/icons/iconall.png') no-repeat 0 -170px;
    }
  }
}

.card-title,
.card-artists {
  height: 18px;
  line-height: 18px;
  font-size: $fontMin;
  @include ellipse();
}

.card-title {
  @include hoverText();
}

.card-artists {
  color: $textInfo;
  .singer {
    &:nth-child(odd) {
      @include hoverText();
    }
  }
}
</style>
