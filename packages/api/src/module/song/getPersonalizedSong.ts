import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { ISong, IdTag } from '../../model'

export interface IPersonalizedSongItem {
  id: IdTag
  type: number
  name: string
  copywriter: Nullable<string>
  picUrl: string
  canDislike: boolean
  alg: string
  song: ISong
}

export interface GetPersonalizedSongResult {
  code: number
  category: number
  result: IPersonalizedSongItem[]
}

export function getPersonalizedSong() {
  return (instance: RequestInstance): Promise<GetPersonalizedSongResult> => {
    return instance.request({
      url: RequestPath.GET_PERSONALIZED_SONG,
      method: RequestMethod.GET,
    })
  }
}
