import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { ISong, IdTag } from '../../model'

interface GetSongDetailParams {
  id: IdTag | IdTag[]
}

export interface GetSongDetailResult {
  code: number
  songs: ISong[]
}

/**
 * 获取歌曲详情，支持同时获取多个
 * @param {number | array} id
 */
export function getSongDetail(params: GetSongDetailParams) {
  const ids = Array.isArray(params.id) ? params.id.join(',') : params.id

  return (
    instance: RequestInstance,
    callbackConfig?: (...args: any[]) => any,
  ): Promise<GetSongDetailResult> => {
    let config = {
      url: RequestPath.GET_SONG_DETAIL,
      method: RequestMethod.GET,
      params: { ids },
    }

    if (callbackConfig)
      config = callbackConfig?.(config)

    return instance.request(config)
  }
}
