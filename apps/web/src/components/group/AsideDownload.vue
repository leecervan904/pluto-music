<script lang="tsx">
import { defineComponent } from 'vue'
import AsideItem from './AsideItem.vue'

export default defineComponent({
  components: { AsideItem },
  setup() {
    return () => (
      <AsideItem
        class="download"
        v-slots={{
          title: () => <span>网易云音乐多端下载</span>,
          after: () => <p class="info">同步歌单，随时畅听320k好音乐</p>,
          default: () => (
            <>
              <div class="device ios"></div>
              <div class="device win"></div>
              <div class="device android"></div>
            </>
          ),
        }}
      />
    )
  },
})
</script>

<style lang="scss" scoped>
.download {
  .device {
    float: left;
    height: 60px;
    &:hover {
      cursor: pointer;
    }
  }
  .ios {
    width: 42px;
    background: url('../../../public/img/icons/ios_1.png');
    &:hover {
      background: url('../../../public/img/icons/ios_2.png');
    }
  }
  .win {
    width: 80px;
    margin: 0 8px;
    background: url('../../../public/img/icons/win_1.png');
    &:hover {
      background: url('../../../public/img/icons/win_2.png');
    }
  }
  .android {
    width: 42px;
    background: url('../../../public/img/icons/android_1.png');
    &:hover {
      background: url('../../../public/img/icons/android_2.png');
    }
  }
  .info {
    margin-top: 10px;
    color: $inputInfo;
  }
}
</style>
