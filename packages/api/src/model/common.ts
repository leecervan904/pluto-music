import { IArtist } from './Role'

// 请求结果
export type Res<T> = T & {
  code: number
}

// 分页参数
// 扩展分页参数
export type ReqPageParams<T> = T & {
  skip?: number
  limit?: number
}

// id
export type IdTag = number | string

// 专辑信息
export interface IAlbum {
  id: IdTag
  name: string
  picUrl: string // 图片 url
  pic_str?: string // 图片名
  pic?: number
  publishTime: number
  [key: string]: any
}

// 歌曲信息
export interface ISong {
  id: IdTag // id
  name: string // 歌名
  dt: number // 时长

  ar: IArtist[] // 歌手列表
  artists: IArtist[] // 歌手列表, new
  alias: string[] // 歌名别名

  al: IAlbum // 专辑

  djId: number
  mv: number // 是否有 mv
  publishTime: number //

  version: number // 版本

  url?: string // 播放地址

  [key: string]: unknown
}

// 相关歌单
export interface IRelativePlaylistItem {
  id: IdTag
  name: string
  picUrl?: string
  coverImgUrl?: string
  description: string
  playCount: number
  creator: {
    userId: IdTag
    nickname: string
  }
  // [key: string]: unknown
}

// 订阅者
export interface ISubscriber {
  userId: string | number
  avatarUrl: string
  subscribeTime: number // 订阅时间戳
  signature: string
  vipType: number
  [key: string]: unknown
}

// 收藏者 getCollectPlaylistUsers
export interface IGetCollectPlaylistUsers {
  code: number
  subscribers: ISubscriber[]
  total: number
  more: boolean
}
