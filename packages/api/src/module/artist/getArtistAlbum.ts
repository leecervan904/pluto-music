import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance, WithPageQuery } from '../../types'
import type { IAlbumDetail, IArtist, IdTag } from '../../model'

export interface GetArtistAlbumBaseParams {
  id: IdTag
}

export interface GetArtistAlbumResult {
  artist: IArtist
  hotAlbums: IAlbumDetail[]
  more: boolean
}

export type GetArtistAlbumParams = WithPageQuery<GetArtistAlbumBaseParams>

export function getArtistAlbum(params: GetArtistAlbumParams) {
  return (instance: RequestInstance): Promise<GetArtistAlbumResult> => {
    return instance.request({
      url: RequestPath.GET_ARTIST_ALBUM,
      method: RequestMethod.GET,
      params,
    })
  }
}
