import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag, IRelativePlaylistItem } from '../../model'

interface GetRelatedPlaylistParams {
  id: IdTag
}

export interface GetRelatedPlaylistResult {
  code: number
  playlists: IRelativePlaylistItem[]
  [key: string]: unknown
}

/**
 * 相关歌单推荐 getRelativePlaylist
 */
export const getRelatedPlaylist = (params: GetRelatedPlaylistParams) => {
  return (
    instance: RequestInstance,
    callbackConfig?: (...args: any[]) => any,
  ): Promise<GetRelatedPlaylistResult> => {
    let config = {
      url: RequestPath.GET_RELATED_PLAYLIST,
      method: RequestMethod.GET,
      params,
    }

    if (callbackConfig) {
      config = callbackConfig?.(config)
    }

    return instance.request(config)
  }
}
