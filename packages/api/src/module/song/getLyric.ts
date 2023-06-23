import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { IdTag } from '../../model'

export interface ILyricInfo {
  version: number
  lyric: string
}

export interface ILyricUser {
  id: number
  status: number
  demand: number
  userid: number
  nickname: string
  uptime: number
}

export interface GetLyricResult {
  code: number
  qfy: boolean
  sfy: boolean
  sgc: boolean
  lyricUser?: ILyricUser
  lrc: ILyricInfo
  tlyric: ILyricInfo
  klyric: ILyricInfo
  romalrc: ILyricInfo
  // [key: string]: unknown
}

interface GetLyricParams {
  id: IdTag
}

/**
 * 获取歌词
 * @param {Number} id
 */
export function getLyric(params: GetLyricParams) {
  return (instance: RequestInstance): Promise<GetLyricResult> => {
    return instance.request({
      url: RequestPath.GET_LYRIC,
      method: RequestMethod.GET,
      params,
    })
  }
}
