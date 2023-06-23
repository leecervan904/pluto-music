<script lang="tsx">
import { defineComponent, unref } from 'vue'
import { useVirtualList } from '@vueuse/core'
import VueTypes from 'vue-types'

export default defineComponent({
  name: 'virtual-scroller',
  props: {
    data: VueTypes.array.def([]),
    itemHeight: VueTypes.number.def(22),
    height: VueTypes.number.isRequired,
  },
  emits: [],
  setup(props, { slots, emit }) {
    const { list, containerProps, wrapperProps } = useVirtualList(
      props.data,
      {
        itemHeight: props.itemHeight,
      }
    )

    return () => {
      const renderChildren = () => {
        return unref(list).map(v => (
          <div class="scroller-item">
            {slots.default?.(v)}
          </div>
        ))
      }

      return (
        <div class="scroller" {...{
          ...containerProps,
          style: {
            height: `${props.height}px`
          }
        }}>
          <div class="scroller-wrapper" {...wrapperProps}>
            {renderChildren()}
          </div>
        </div>
      )
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
