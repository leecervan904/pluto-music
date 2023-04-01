import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag, IPlaylist } from '../../model'

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
export const getRankList = (params: GetRankListParams) => {
  return (instance: RequestInstance): Promise<GetRankListResult> => {
    return instance.request({
      url: RequestPath.GET_RANK_LIST,
      method: RequestMethod.GET,
      params,
    })
  }
}
