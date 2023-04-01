<template>
  <!-- <keep-alive :exclude="excludePath"> -->
    <router-view v-slot="{ Component }">
      <transition :name="transitionName" :mode="transitionMode">
        <component :is="Component" />
      </transition>
    </router-view>
  <!-- </keep-alive> -->
</template>

<script lang="ts">
import { ref, computed, watch, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'app-main',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const excludePath = ['playlist', 'ranklist', 'album', 'playlist-square', 'search']
    const transitionName = ref<'route-forward' | 'route-back'>('route-forward')
    const transitionMode = computed(() => router.transitionName === 'route-back'
      ? 'in-out'
      : 'out-in'
    )

    watch(
      () => route.path,
      () => {
        transitionName.value = router.transitionName
      }
    )

    return {
      excludePath,
      transitionName,
      transitionMode,
    }
  },
})
</script>
