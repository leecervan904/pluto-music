import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, Nullable } from '../../types'
import { IdTag } from '../../model'

export interface ICatItem {
  name: string
  resourceCount: number
  imgId: IdTag
  imgUrl: Nullable<string>
  type: number
  category: number
  resourceType: number
  hot: boolean
  activity: boolean
}

export interface GetPlaylistCatlistResult {
  code: number
  categories: string[]
  all: ICatItem
  sub: ICatItem[]
  [key: string]: unknown
}

/**
 * 歌单分类 getCategoryList
 */
export const getPlaylistCatlist = () => {
  return (instance: RequestInstance): Promise<GetPlaylistCatlistResult> => {
    return instance.request({
      url: RequestPath.GET_PLAYLIST_CATLIST,
      method: RequestMethod.GET,
    })
  }
}
