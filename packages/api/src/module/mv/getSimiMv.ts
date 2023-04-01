import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, WithResponseCodeMessage, Nullable } from '../../types'
import { IdTag, IArtist } from '../../model'

export interface GetSimiMvParams {
  mvid: IdTag
}

export interface ISimiMvItem {
  id: IdTag
  cover: string
  name: string
  playCount: number
  briefDesc: Nullable<string>
  desc: Nullable<string>
  artistName: string
  duration: number
  mark: number
  artist: IArtist[]
  alg: string
}

export interface GetSimiMvData {
  mvs: ISimiMvItem[]
}

export type GetSimiMvResult = WithResponseCodeMessage<GetSimiMvData>

export const getSimiMv = (params: GetSimiMvParams, ...args: any[]) => {
  return (instance: RequestInstance): Promise<GetSimiMvResult> => {
    return instance.request({
      url: RequestPath.GET_SIMI_MV,
      method: RequestMethod.GET,
      params,
      ...args,
    })
  }
}
