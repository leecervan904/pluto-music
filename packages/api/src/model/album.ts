import type { IArtist } from '../model'

export interface IAlbumDetail {
  paid: boolean
  onSale: boolean
  mark: number
  copyrightId: number
  picId: number
  picUrl: string
  blurPicUrl: string
  picId_str: string | number
  alias: string[]
  artists: IArtist[]
  artist: IArtist
  pic: number
  publishTime: number
  company: string
  briefDesc: string // 简介
  description: string // 描述
  subscribedCount: number
  tags: string
  status: number
  subType: string
  name: string
  id: number | string
  type: string
  size: number
  desc: string
  // 其他信息
  info: {
    resourceType: number
    resourceId: number
    commentCount: number
    likedCount: number
    shareCount: number
    [key: string]: unknown
  }
  [key: string]: unknown
}
