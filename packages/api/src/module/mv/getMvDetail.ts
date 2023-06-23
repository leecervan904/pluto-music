import { RequestMethod, RequestPath } from '../../constants'
import type { Nullable, RequestInstance, WithResponseCodeMessage } from '../../types'
import type { IArtist, IdTag } from '../../model'

export interface GetMvDetailParams {
  mvid: IdTag
}

export interface IMvBrs {
  size: number
  br: number
  point: number
}

export interface GetMvDetailData {
  id: IdTag
  name: string
  artistId: IdTag
  artistName: string
  briefDesc: string
  desc: string
  cover: string
  coverId_str: string
  playCount: number
  subCount: number
  commentCount: number
  duration: number
  nType: number
  publishTime: string
  price: Nullable<any>
  brs: IMvBrs[]
  artists: IArtist[]
  commentThreadId: string
  videoGroup: unknown[]
  url?: string
}

export type GetMvDetailResult = WithResponseCodeMessage<GetMvDetailData>

export function getMvDetail(params: GetMvDetailParams, ...args: any[]) {
  return (instance: RequestInstance): Promise<GetMvDetailResult> => {
    return instance.request({
      url: RequestPath.GET_MV_DETAIL,
      method: RequestMethod.GET,
      params,
      ...args,
    })
  }
}
