import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { IdTag } from '../../model'

export interface IToplistDetailItem {
  id: IdTag
  name?: string
  description?: string
  coverImgUrl?: string
  tracks?: unknown[]
  [key: string]: any
}

export interface GetToplistDetailResult {
  code: number
  list: IToplistDetailItem[]
}

/**
 * 所有排行榜详情
 */
export function getToplistDetail() {
  return (instance: RequestInstance): Promise<GetToplistDetailResult> => {
    return instance.request({
      url: RequestPath.GET_TOPLIST_DETAIL,
      method: RequestMethod.GET,
    })
  }
}
