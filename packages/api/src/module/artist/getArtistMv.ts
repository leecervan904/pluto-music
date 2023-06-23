import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance, WithPageQuery } from '../../types'
import type { IMV, IdTag } from '../../model'

export interface GetArtistMvBaseParams {
  id: IdTag
}

export interface GetArtistMvResult {
  hasMore: boolean
  time: number
  mvs: IMV[]
}

export type GetArtistMvParams = WithPageQuery<GetArtistMvBaseParams>

export function getArtistMv(params: GetArtistMvParams) {
  return (instance: RequestInstance): Promise<GetArtistMvResult> => {
    return instance.request({
      url: RequestPath.GET_ARTIST_MV,
      method: RequestMethod.GET,
      params,
    })
  }
}
