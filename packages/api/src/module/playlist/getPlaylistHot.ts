import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'

export interface GetPlaylistHotResult {
  code: number
  tags: unknown[]
}

/**
 * 歌单详情
 * @param {number} id
 */
export function getPlaylistHot() {
  return (instance: RequestInstance): Promise<GetPlaylistHotResult> => {
    return instance.request({
      url: RequestPath.GET_PLAYLIST_HOT,
      method: RequestMethod.GET,
    })
  }
}
