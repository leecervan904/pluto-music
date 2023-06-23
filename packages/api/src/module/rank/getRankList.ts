import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { IPlaylist, IdTag } from '../../model'

interface GetRankListParams {
  id: IdTag
}

interface GetRankListResult {
  code: number
  playlist: IPlaylist
  privileges: unknown[]
}

/**
 * 获取指定榜单的详细信息 getBillboard
 * @param {number|string} id
 */
export function getRankList(params: GetRankListParams) {
  return (instance: RequestInstance): Promise<GetRankListResult> => {
    return instance.request({
      url: RequestPath.GET_RANK_LIST,
      method: RequestMethod.GET,
      params,
    })
  }
}
