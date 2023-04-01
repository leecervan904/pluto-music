import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IAlbumDetail } from '../../model'

export interface GetAlbumNewestResult {
  code: number
  albums: IAlbumDetail[]
}

/**
 * 最新专辑
 */
export function getAlbumNewest() {
  return (instance: RequestInstance): Promise<GetAlbumNewestResult> => {
    return instance.request({
      url: RequestPath.GET_ALBUM_NEWEST,
      method: RequestMethod.GET,
    })
  }
}
