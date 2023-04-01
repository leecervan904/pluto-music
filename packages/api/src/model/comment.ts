import { WithPageQuery, Nullable } from '../types'
import { IdTag } from './common'

export interface GetCommentBaseQuery {
  id: IdTag
  before?: number // 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
}

export type GetCommentQuery = WithPageQuery<GetCommentBaseQuery>

export interface ICommentItem {
  status: number
  user: any
  beReplied: unknown[]
  content: string
  richContent: Nullable<string>
  time: number
  timeStr: string
  likedCount: number
  commentId: number
  parentCommentId: number
  liked: boolean
  ipLocation: {
    ip: Nullable<string>
    location: Nullable<string>
    userId: Nullable<number>
  }
  [key: string]: unknown
}

export interface GetCommentResult {
  code: number
  total: number
  commentsTitle: string
  moreHot: boolean
  more: boolean
  comments: ICommentItem[]
  hotComments: ICommentItem[]
}
