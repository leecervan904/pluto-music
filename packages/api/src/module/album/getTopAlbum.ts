import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, WithPageQuery } from '../../types'
import { IAlbumDetail } from '../../model'

interface BaseParams {
  area?: string
}

export type GetTopAlbumParams = WithPageQuery<BaseParams>

export interface GetTopAlbumResult {
  code: number
  total: number
  albums: IAlbumDetail[]
}

/**
 * 新碟上架
 * @param {Number} limit
 * @param {Number} offset
 */
export const getTopAlbum = (params: GetTopAlbumParams = { area: 'ALL' }) => {
  return (instance: RequestInstance): Promise<GetTopAlbumResult> => {
    return instance.request({
      url: RequestPath.GET_TOP_ALBUM,
      method: RequestMethod.GET,
      params,
    })
  }
}
