import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'

export interface GetSearchHotDetailResult {}

/**
 * 获取热搜(详细)
 */
export const getSearchHotDetail = () => {
  return (instance: RequestInstance): Promise<GetSearchHotDetailResult> => {
    return instance.request({
      url: RequestPath.GET_SEARCH_HOT_DETAIL,
      method: RequestMethod.GET,
    })
  }
}
