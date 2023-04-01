import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag, IPlaylist } from '../../model'

export interface GetPlaylistDetailParams {
  id: IdTag
}

export interface GetPlaylistDetailResult {
  code: number
  playlist: IPlaylist
  [key: string]: any
}

/**
 * 歌单详情
 * @param {number} id
 */
export const getPlaylistDetail = (params: GetPlaylistDetailParams) => {
  return (
    instance: RequestInstance,
    transformConfig?: (...args: any[]) => any,
  ): Promise<GetPlaylistDetailResult> => {
    let config = {
      url: RequestPath.GET_PLAYLIST_DETAIL,
      method: RequestMethod.GET,
      params,
    }

    if (transformConfig) {
      config = transformConfig?.(config)
    }

    return instance.request(config)
  }
}
