import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'

interface GetSearchMultimatchParams {
  keywords: string[]
}

export interface GetSearchMultimatchResult {}

/**
 * 获取搜索多重匹配
 * @param {String} keywords
 */
export function getSearchMultimatch(params: GetSearchMultimatchParams) {
  return (instance: RequestInstance): Promise<GetSearchMultimatchResult> => {
    return instance.request({
      url: RequestPath.GET_SEARCH_MULTIMATCH,
      method: RequestMethod.GET,
      params,
    })
  }
}
