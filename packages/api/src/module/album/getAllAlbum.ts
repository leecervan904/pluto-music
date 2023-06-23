import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance, WithPageQuery } from '../../types'
import type { IAlbumDetail, IArtist, IdTag } from '../../model'

export type GetAllAlbumParams = WithPageQuery<{ id: IdTag }>

export interface GetAllAlbumResult {
  code: number
  more: boolean
  artist: IArtist
  hotAlbums: IAlbumDetail[]
}

/**
 * 歌手的全部专辑
 * @param {Number} id
 * @param {Number} limit
 */
export function getAllAlbum({ id, limit = 50 }: GetAllAlbumParams) {
  return (instance: RequestInstance): Promise<GetAllAlbumResult> => {
    return instance.request({
      url: RequestPath.GET_ALL_ALBUM,
      method: RequestMethod.GET,
      params: { id, limit },
    })
  }
}
