import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { IAlbumDetail, ISong, IdTag } from '../../model'

export interface GetAlbumDetailParams {
  id: IdTag
}

export interface GetAlbumDetailResult {
  code: number
  songs: ISong[]
  album: IAlbumDetail
  [key: string]: unknown
}

/**
 * 专辑内容
 * @param {Number} id
 */
export function getAlbumDetail(params: GetAlbumDetailParams) {
  return (instance: RequestInstance): Promise<GetAlbumDetailResult> => {
    return instance.request({
      url: RequestPath.GET_ALBUM_DETAIL,
      method: RequestMethod.GET,
      params,
    })
  }
}
