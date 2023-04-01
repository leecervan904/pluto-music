import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag } from '../../model'

export interface IPersonalizedItem {
  id: IdTag
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
}

export interface GetPersonalizedParams {
  limit: number
}

export interface GetPersonalizedResult {
  code: number
  category: number
  hasTaste: boolean
  result: IPersonalizedItem[]
}

// 首页推荐歌单
export const getPersonalized = (params: GetPersonalizedParams) => {
  return (instance: RequestInstance): Promise<GetPersonalizedResult> => {
    return instance.request({
      url: RequestPath.GET_PERSONALIZED,
      method: RequestMethod.GET,
      params,
    })
  }
}
