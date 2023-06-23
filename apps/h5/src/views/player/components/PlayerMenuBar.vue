<template>
  <div class="p-menu-bar">
    <div class="p-menu-bar_item p-menu-bar_like">
      <SvgIcon icon-class="like" />
    </div>
    <div class="p-menu-bar_item p-menu-bar_download">
      <SvgIcon icon-class="download" />
    </div>
    <div class="p-menu-bar_item p-menu-bar_voice-tube">
      <SvgIcon icon-class="voice-tube" />
    </div>
    <div class="p-menu-bar_item p-menu-bar_comment">
      <SvgIcon icon-class="comment" />
    </div>
    <div class="p-menu-bar_item p-menu-bar_more-vertical">
      <SvgIcon icon-class="more-vertical" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@/styles/variables.scss';

.p-menu-bar {
  display: flex;
  justify-content: space-between;
  /* background-color: #ccc; */

  &_item {
    width: .5rem;
    line-height: .5rem;
    font-size: $font--large;
    text-align: center;
  }
}
</style>
