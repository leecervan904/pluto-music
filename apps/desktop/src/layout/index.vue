<script setup lang="ts">
import Header from './Header.vue'
</script>

<template>
  <div class="app-layout">
    <div class="app-header">
      <Header />
    </div>

    <div class="app-main">
      <!-- <div class="app-sidebar">sidebar</div> -->
      <div class="app-content">
        <router-view />
      </div>
    </div>

    <div class="app-footer">
      footer
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .app-header {
    display: flex;
    height: 50px;
    box-shadow: 0px 1px 20px 2px #ccc;
  }
  .app-footer {
    height: 50px;
    box-shadow: 0px -1px 20px 2px #ccc;
  }
  .app-main {
    flex: 1;
    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    /* height: calc(100vh - 100px); */
    .app-sidebar {
      position: sticky;
      width: 200px;
      top: 0;
      left: 0;
      box-shadow: 1px 0px 20px 2px #ccc;
    }
    .app-content {
      /* width: calc(100% - 200px); */
      width: 100%;
      padding: 20px;
    }
  }
}
</style>
