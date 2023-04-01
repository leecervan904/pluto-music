import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, WithPageQueryNew, Nullable } from '../../types'
import { IdTag } from '../../model'

export enum CommentTypeEnum {
  SONG = 0,
  MV = 1,
  PLAYLIST = 2,
  ALBUM = 3,
  RADIO_PROGRAM = 4,
  VIDEO = 5,
  DYNAMIC = 6,
  RADIO = 7,
}

export enum CommentSortTypeEnum {
  RECOMMEND = 1,
  HOT = 2,
  TIME = 3,
}

export interface GetCommentBaseParams {
  id: IdTag
  type: CommentTypeEnum
  sortType?: CommentSortTypeEnum
  // 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
  cursor?: number
}

export type GetCommentMusicParams = WithPageQueryNew<GetCommentBaseParams>

export interface ICommentItemNew {
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

export interface GetCommentMusicResult {
  code: number
  data: {
    commentsTitle: string
    currentCommentTitle: string
    currentComment: Nullable<any>
    hasMore: boolean
    cursor: IdTag
    sortType: CommentSortTypeEnum
    totalCount: number
    replyCount: number
    comments: ICommentItemNew[]
  }
}

export const getComment = ({
  id,
  type,
  sortType = CommentSortTypeEnum.RECOMMEND,
  cursor,
  pageNo = 1,
  pageSize = 20,
}: GetCommentMusicParams) => {
  return (instance: RequestInstance): Promise<GetCommentMusicResult> => {
    return instance.request({
      url: RequestPath.GET_COMMENT,
      method: RequestMethod.GET,
      params: {
        id,
        type,
        sortType,
        cursor,
        pageNo,
        pageSize,
      },
    })
  }
}
