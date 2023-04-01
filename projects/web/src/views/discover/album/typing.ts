import type { IAlbumDetail } from '@pluto-music/api'

export type SimpleAlbum = Pick<IAlbumDetail, 'name' | 'picUrl' | 'id' | 'artists'>
