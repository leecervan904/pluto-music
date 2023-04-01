import type { IPlaylist } from '@pluto-music/api'

export type PlaylistDetail = Pick<
  IPlaylist,
  'id' | 'name' | 'coverImgUrl' | 'description' | 'trackCount' | 'playCount' | 'coverImgUrl'
>
