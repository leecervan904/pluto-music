import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, Nullable } from '../../types'
import { IdTag } from '../../model'

export interface GetRelatedAllvideoParams {
  id: IdTag
}

export interface IRelatedAllvideo {
  alg: string
  type: number
  title: string
  durationms: number
  creator: {
    userId: IdTag
    userName: string
  }[]
  playTime: number
  coverUrl: string
  vid: string
  aliaName: Nullable<any>
  transName: Nullable<any>
  matkTypes: unknown[]
  liveRoom: Nullable<any>
}

export interface GetRelatedAllvideoResult {
  code: number
  message: string
  data: IRelatedAllvideo[]
}

export const getRelatedAllvideo = (params: GetRelatedAllvideoParams) => {
  return (instance: RequestInstance): Promise<GetRelatedAllvideoResult> => {
    return instance.request({
      url: RequestPath.GET_RELATED_ALLVIDEO,
      method: RequestMethod.GET,
      params,
    })
  }
}
