import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag, ISong } from '../../model'

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

export type GetPersonalizedSongResult = {
  code: number
  category: number
  result: IPersonalizedSongItem[]
}

export const getPersonalizedSong = () => {
  return (instance: RequestInstance): Promise<GetPersonalizedSongResult> => {
    return instance.request({
      url: RequestPath.GET_PERSONALIZED_SONG,
      method: RequestMethod.GET,
    })
  }
}
