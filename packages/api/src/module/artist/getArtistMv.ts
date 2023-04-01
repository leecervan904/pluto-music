import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, WithPageQuery } from '../../types'
import { IdTag, IMV } from '../../model'

export interface GetArtistMvBaseParams {
  id: IdTag
}

export interface GetArtistMvResult {
  hasMore: boolean
  time: number
  mvs: IMV[]
}

export type GetArtistMvParams = WithPageQuery<GetArtistMvBaseParams>

export const getArtistMv = (
  params: GetArtistMvParams,
) => {
  return (instance: RequestInstance): Promise<GetArtistMvResult> => {
    return instance.request({
      url: RequestPath.GET_ARTIST_MV,
      method: RequestMethod.GET,
      params,
    })
  }
}
