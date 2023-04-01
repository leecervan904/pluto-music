import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag, IRelativePlaylistItem } from '../../model'

export interface GetSimPlaylistParams {
  id: IdTag
}

export interface GetSimPlaylistResult {
  code: number
  playlists: IRelativePlaylistItem[]
  [key: string]: unknown
}

/**
 * 相似歌单
 * @param {Number} id
 */
export const getSimPlaylist = (params: GetSimPlaylistParams) => {
  return (instance: RequestInstance): Promise<GetSimPlaylistResult> => {
    return instance.request({
      url: RequestPath.GET_SIM_PLAYLIST,
      method: RequestMethod.GET,
      params,
    })
  }
}
