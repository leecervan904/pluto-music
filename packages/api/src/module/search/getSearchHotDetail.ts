import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'

export interface GetSearchHotDetailResult {}

/**
 * 获取热搜(详细)
 */
export function getSearchHotDetail() {
  return (instance: RequestInstance): Promise<GetSearchHotDetailResult> => {
    return instance.request({
      url: RequestPath.GET_SEARCH_HOT_DETAIL,
      method: RequestMethod.GET,
    })
  }
}
