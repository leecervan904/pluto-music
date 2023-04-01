import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'

export interface GetSearchDefaultResult {}

/**
 * 获取默认搜索关键字
 */
export const getSearchDefault = () => {
  return (instance: RequestInstance): Promise<GetSearchDefaultResult> => {
    return instance.request({
      url: RequestPath.GET_SEARCH_DEFAULT,
      method: RequestMethod.GET,
    })
  }
}
