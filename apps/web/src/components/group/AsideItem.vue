<template>
  <div class="aside-item">
    <h3 class="title">
      <slot name="title" />
    </h3>
    <div class="content">
      <slot />
    </div>
    <slot name="after" />
  </div>
</template>

<style lang="scss" scoped>
.aside-item {
  box-sizing: border-box;
  padding: 20px 40px 10px 30px;
  font-size: $fontMin;
  .title {
    height: 23px;
    margin-bottom: 20px;
    line-height: 23px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    .title-more {
      float: right;
      font-weight: normal;
      @include hoverText();
    }
  }
  .content {
    overflow: hidden;
  }
}
</style>
