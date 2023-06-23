<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    customRenderer: Function,
  },
  setup(props) {
    return () => {
      return <div class="bg-red-400">{props.customRenderer?.() || 'default content'}</div>
    }
  },
})
</script>
