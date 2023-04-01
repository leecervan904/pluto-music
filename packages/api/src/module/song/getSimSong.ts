import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag, ISong } from '../../model'

interface GetSimSongParams {
  id: IdTag
}

export interface GetSimSongResult {
  code: number
  songs: ISong[]
  [key: string]: unknown
}

// 相似音乐
export const getSimSong = (params: GetSimSongParams) => {
  return (instance: RequestInstance): Promise<GetSimSongResult> => {
    return instance.request({
      url: RequestPath.GET_SIM_SONG,
      method: RequestMethod.GET,
      params,
    })
  }
}
