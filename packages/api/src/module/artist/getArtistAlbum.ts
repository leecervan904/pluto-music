import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, WithPageQuery } from '../../types'
import { IAlbumDetail, IArtist, IdTag } from '../../model'

export interface GetArtistAlbumBaseParams {
  id: IdTag
}

export interface GetArtistAlbumResult {
  artist: IArtist
  hotAlbums: IAlbumDetail[]
  more: boolean
}

export type GetArtistAlbumParams = WithPageQuery<GetArtistAlbumBaseParams>

export const getArtistAlbum = (
  params: GetArtistAlbumParams,
) => {
  return (instance: RequestInstance): Promise<GetArtistAlbumResult> => {
    return instance.request({
      url: RequestPath.GET_ARTIST_ALBUM,
      method: RequestMethod.GET,
      params,
    })
  }
}
