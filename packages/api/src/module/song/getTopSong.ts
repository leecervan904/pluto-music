import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'

/**
 * 全部:0
 * 华语:7
 * 欧美:96
 * 日本:8
 * 韩国:16
 */
enum TopSongType {
  ALL = 0,
  CN = 7,
  EA = 96,
  JP = 8,
  KU = 16,
}

interface GetTopSongParams {
  type: TopSongType
}

interface GetTopSongResult {}

/**
 * 新歌速递
 * @param {number} type
 */
export function getTopSong(params: GetTopSongParams = { type: TopSongType.CN }) {
  return (instance: RequestInstance): Promise<GetTopSongResult> => {
    return instance.request({
      url: RequestPath.GET_TOP_SONG,
      method: RequestMethod.GET,
      params,
    })
  }
}
