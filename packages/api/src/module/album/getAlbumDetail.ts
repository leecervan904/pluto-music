import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag, ISong, IAlbumDetail } from '../../model'

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
export const getAlbumDetail = (params: GetAlbumDetailParams) => {
  return (instance: RequestInstance): Promise<GetAlbumDetailResult> => {
    return instance.request({
      url: RequestPath.GET_ALBUM_DETAIL,
      method: RequestMethod.GET,
      params,
    })
  }
}
