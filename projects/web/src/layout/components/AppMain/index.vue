<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 980px;
  min-height: $minMainAppHeight;
  margin: 0 auto;
  border-left: 1px solid $bdcDefault;
  border-right: 1px solid $bdcDefault;
  background-color: $bgDefault;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
