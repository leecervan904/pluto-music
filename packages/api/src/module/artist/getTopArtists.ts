import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance, WithPageQuery } from '../../types'
import type { IArtist } from '../../model'

export type GetTopArtistsQuery = WithPageQuery<{}>

export interface GetTopArtistsResult {
  code: number
  more: boolean
  artists: IArtist[]
}

export function getTopArtists(params: GetTopArtistsQuery) {
  return (instance: RequestInstance): Promise<GetTopArtistsResult> => {
    return instance.request({
      url: RequestPath.GET_TOP_ARTIST,
      method: RequestMethod.GET,
      params,
    })
  }
}
