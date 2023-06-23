import { RequestMethod, RequestPath } from '../../constants'
import type { Nullable, RequestInstance, WithResponseCodeMessage } from '../../types'
import type { IdTag } from '../../model'

export interface GetMvUrlParams {
  id: IdTag
  // 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
  r?: number
}

export interface GetMvUrlData {
  id: IdTag
  url: string
  r: number
  size: number
  md5: string
  expi: number
  fee: number
  mvFee: number
  st: number
  promotionVo: Nullable<unknown>
  msg: string
}

export type GetMvUrlResult = WithResponseCodeMessage<GetMvUrlData>

export function getMvUrl({
  id,
  r = 1080,
}: GetMvUrlParams, ...args: any[]) {
  return (instance: RequestInstance): Promise<GetMvUrlResult> => {
    return instance.request({
      url: RequestPath.GET_MV_URL,
      method: RequestMethod.GET,
      params: {
        id,
        r,
        ...args,
      },
    })
  }
}
