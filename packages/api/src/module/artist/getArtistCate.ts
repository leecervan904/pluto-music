import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, WithPageQuery } from '../../types'
import { IdTag } from '../../model'

interface GetArtistCateBaseParams {
  cat?: IdTag
  initial?: string
}

export interface IArtistCateItem {
  albumSize: number
  alias: string[]
  id: IdTag
  img1v1Id: number
  img1v1Id_str: string
  img1v1IdUrl: string
  musicSize: number
  name: string
  picId: number
  picId_str: string
  picUrl: string
  [k: string]: any
}

export type GetArtistCateParams = WithPageQuery<GetArtistCateBaseParams>

export interface GetArtistCateResult {
  artists: IArtistCateItem[]
}

export const getArtistCate = (
  params: GetArtistCateParams = { cat: 1001, initial: '', limit: 100 },
) => {
  return (instance: RequestInstance): Promise<GetArtistCateResult> => {
    return instance.request({
      url: RequestPath.GET_ARTIST_CATE,
      method: RequestMethod.GET,
      params,
    })
  }
}
