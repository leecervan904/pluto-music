import type { IRelativePlaylistItem } from '@pluto-music/api'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export type PlaylistItem = Omit<IRelativePlaylistItem, 'creator'>

export default defineComponent({
  props: {
    playlist: {
      type: Object as PropType<PlaylistItem>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="flex flex-col mb-20px cursor-pointer">
        <div class="overflow-hidden w-full h-0 pb-1/1 rounded-5px">
          <img class="w-full" src={props.playlist.coverImgUrl} alt={props.playlist.name} />
        </div>
        <div class="mt-5px lh-20px multi-ellipsis-2 text-brand-primary">{props.playlist.name}</div>
      </div>
    )
  },
})
