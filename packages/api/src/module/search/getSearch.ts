import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'

export enum SearchTypeEnum {
  SONG = 1,
  ALBUM = 10,
  ARTIST = 100,
  PLAYLIST = 1000,
  USER = 1002,
  MV = 1004,
  LYRIC = 1006,
  RADIO = 1009,
  VIDEO = 1014,
  COMPOSITE = 1018,
}

export interface GetSearchParams {
  keywords?: string
  limit?: number
  offset?: number
  type?: SearchTypeEnum
}

export interface GetSearchResult {
  code: number
  result: unknown
}

/**
 * 获取搜索结果
 * type: 1(单曲), 10(专辑), 100(歌手), 1000(歌单), 1002(用户)
 *       1004(MV), 1006(歌词), 1009(电台), 1014(视频), 1018(综合)
 * @param {String} keywords
 * @param {Number} limit
 * @param {Number} offset
 * @param {Number} type
 */
export function getSearch({
  keywords,
  limit = 30,
  offset = 0,
  type = SearchTypeEnum.COMPOSITE,
}: GetSearchParams) {
  const params: GetSearchParams = {
    keywords,
    type,
  }

  if (type !== SearchTypeEnum.COMPOSITE) {
    params.limit = limit
    params.offset = offset
  }

  return (instance: RequestInstance): Promise<GetSearchResult> => {
    return instance.request({
      url: RequestPath.GET_SEARCH,
      method: RequestMethod.GET,
      params,
    })
  }
}
