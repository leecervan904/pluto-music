import type { RequestInstance, WithPageQuery } from '../../types'
import type { IRelativePlaylistItem } from '../../model'
import { RequestPath, RequestMethod } from '../../constants'

export enum GetRelatedPlaylistParamsOrderType {
  /** 按最新 */
  NEW = 'new',

  /** 按热度 */
  HOT = 'hot',
}

export interface GetRelatedPlaylistBaseParams {
  /** 分类 */
  cat?: string

  /** 排序方式 */
  order?: GetRelatedPlaylistParamsOrderType
}

export type GetTopPlaylistParams = WithPageQuery<GetRelatedPlaylistBaseParams>

export interface GetTopPlaylistResult {
  code: number
  playlists: IRelativePlaylistItem[]
  total: number
  [key: string]: unknown
}

/**
 * 获取歌单分类
 * @param {String} params.cat 分类
 * @param {Number} params.limit
 * @param {Number} params.offset
 */
export const getTopPlaylist = ({
  cat = '全部',
  order = GetRelatedPlaylistParamsOrderType.HOT,
  limit = 20,
  offset = 0,
  ...other
}: GetTopPlaylistParams) => {
  return (
    instance: RequestInstance,
    callbackConfig?: (...args: any[]) => any,
  ): Promise<GetTopPlaylistResult> => {
    let config = {
      url: RequestPath.GET_TOP_PLAYLIST,
      method: RequestMethod.GET,
      params: {
        cat,
        order,
        limit,
        offset,
        ...other,
      },
    }

    if (callbackConfig) {
      config = callbackConfig?.(config)
    }

    return instance.request(config)
  }
}
