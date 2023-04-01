import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag } from '../../model'

export interface GetSongUrlParams {
  id: IdTag
}

export interface GetSongUrlResult {
  code: number
  data: Array<{
    id: number
    url: string
    [key: string]: unknown
  }>
}

/**
 * 获取歌曲 URL 地址
 * @param {number | string} id
 */
export const getSongUrl = (params: GetSongUrlParams) => {
  return (instance: RequestInstance): Promise<GetSongUrlResult> => {
    return instance.request({
      url: RequestPath.GET_SONG_URL,
      method: RequestMethod.GET,
      params,
    })
  }
}
