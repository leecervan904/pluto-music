import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { IArtist, IdTag } from '../../model'

export interface IPersonalizedMvItem {
  id: IdTag
  type: number
  name: string
  copywriter: Nullable<string>
  picUrl: string
  canDislike: boolean
  duration: number
  playCount: number
  subed: boolean
  artists: IArtist[]
  artistName: string
  artistId: IdTag
  alg: string
}

export interface GetPersonalizedMvResult {
  code: number
  category: number
  result: IPersonalizedMvItem[]
}

export function getPersonalizedMv() {
  return (instance: RequestInstance): Promise<GetPersonalizedMvResult> => {
    return instance.request({
      url: RequestPath.GET_PERSONALIZED_MV,
      method: RequestMethod.GET,
    })
  }
}
