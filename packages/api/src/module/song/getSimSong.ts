import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { ISong, IdTag } from '../../model'

interface GetSimSongParams {
  id: IdTag
}

export interface GetSimSongResult {
  code: number
  songs: ISong[]
  [key: string]: unknown
}

// 相似音乐
export function getSimSong(params: GetSimSongParams) {
  return (instance: RequestInstance): Promise<GetSimSongResult> => {
    return instance.request({
      url: RequestPath.GET_SIM_SONG,
      method: RequestMethod.GET,
      params,
    })
  }
}
