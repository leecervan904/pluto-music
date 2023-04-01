import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag, ISong } from '../../model'

export interface GetArtistsParams {
  id: IdTag
}

export interface IArtistsArtist {
  alias: string[]
  picId: IdTag
  briefDesc: string
  musicSize: number
  albumSize: number
  mvSize: number
  picUrl: string
  img1v1Url: string
  picId_str: string
  img1v1Id_str: string
  name: string
  trans: string
  id: IdTag
  publishTime: number
}

export interface GetArtistsResult {
  more: boolean
  hotSongs: ISong[]
  artist: IArtistsArtist
}

export const getArtists = (
  params: GetArtistsParams,
) => {
  return (instance: RequestInstance): Promise<GetArtistsResult> => {
    return instance.request({
      url: RequestPath.GET_ARTISTS,
      method: RequestMethod.GET,
      params,
    })
  }
}
