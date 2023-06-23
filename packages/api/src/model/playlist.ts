import type { Nullable } from '../types'
import type { IPlayListCreator } from './Role'
import type { ISong, IdTag } from './common'

// 歌单信息
export interface IPlaylist {
  id: IdTag
  name: string
  coverImgId: number
  coverImgUrl: string // 封面图片
  adType?: number
  userId: number
  createTime: number // 创建时间戳
  updateTime: number // 更新时间戳
  trackUpdateTime: number // 歌曲更新时间戳
  trackNumberUpdateTime: number //
  status: number
  highQuality: boolean
  newImported: boolean
  trackCount: number // 歌曲数目
  specialType: number
  privacy: number
  commentThreadId: string
  playCount: number // 播放数
  subscribedCount: number // 订阅数
  shareCount: number // 分享数
  commentCount: number // 评论数
  cloudTrackCount: number

  ordered: boolean
  description: string // 描述
  tags: string[] // 标签
  updateFrequency: Nullable<string>
  backgroundCoverId: number
  backgroundCoverUrl: Nullable<string>
  titleImage: number
  titleImageUrl: Nullable<string>
  englishTitle: Nullable<string>
  officialPlaylistType: Nullable<string>
  creator: IPlayListCreator
  tracks: ISong[]
  trackIds: Array<{ id: IdTag }>

  algTags: string[]

  desc?: string

  [key: string]: any
}
