import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'

export interface GetAllRankDetailResult {}

/**
 * 获取所有榜单简介
 */
export function getAllRankDetail() {
  return (instance: RequestInstance): Promise<GetAllRankDetailResult> => {
    return instance.request({
      url: RequestPath.GET_ALL_RANK_DETAIL,
      method: RequestMethod.GET,
    })
  }
}
