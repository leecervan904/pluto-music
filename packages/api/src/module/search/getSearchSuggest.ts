import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, Nullable } from '../../types'
import { IdTag } from '../../model'

export interface IBaseArtist {
  id: IdTag
  name: string
  accountId: number
  picUrl: string
  picId: IdTag
  img1v1Url: string
  img1v1: IdTag
  alias: string[]
  albumSize: number
  trans: Nullable<string> // 性别？
}

export interface IBaseAlbum {
  id: IdTag
  name: string
  artist: IBaseArtist
  size: number
  copyrightId: IdTag
  publishTime: number
  status: number
  picId: number
  mark: number
}

export interface IBaseSong {
  id: IdTag
  name: string
  artists: IBaseArtist[]
  album: IBaseAlbum
  alias: string[]
  duration: number
  copyrightId: number
  status: number
  rtype: number
  ftype: number
  mvid: number
  fee: number
  rUrl: Nullable<string>
  mark: number
}

export interface IBasePlaylist {
  id: IdTag
  name: string
  coverImgUrl: Nullable<string>
  creator: Nullable<string>
  subscribed: boolean
  userId: number
  trackCount: number
  playCount: number
  bookCount: number
  specialType: number
  officialTags: Nullable<string[]>
  action: Nullable<unknown>
  actionType: Nullable<number>
  recommendText: Nullable<string>
  score: Nullable<number>
  description: Nullable<string>
  highQuality: boolean
}

export interface ISearchResult {
  albums: IBaseAlbum[]
  artists: IBaseArtist[]
  songs: IBaseSong[]
  playlists: IBasePlaylist[]
  order: string[]
  mvs: any[]
}

interface GetSearchSuggestParams {
  keywords: string[]
}

export interface GetSearchSuggestResult {
  code: number
  result: ISearchResult
  [key: string]: unknown
}

/**
 * 获取搜索建议
 * @param {String} keywords
 * @param {String} type
 */
export const getSearchSuggest = (params: GetSearchSuggestParams) => {
  return (instance: RequestInstance): Promise<GetSearchSuggestResult> => {
    return instance.request({
      url: RequestPath.GET_SEARCH_SUGGEST,
      method: RequestMethod.GET,
      params,
    })
  }
}
