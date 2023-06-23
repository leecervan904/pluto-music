import { RequestMethod, RequestPath } from '../../constants'
import type { Nullable, RequestInstance, WithPageQuery } from '../../types'
import type { IdTag } from '../../model'
import type { ICommentItemNew } from './getComment'
import { CommentTypeEnum } from './getComment'

export interface GetCommentFloorBaseParams {
  id: IdTag
  parentCommentId: IdTag
  type: CommentTypeEnum
  // 分页参数,取上一页最后一项的 time 获取下一页数据
  time?: number
}

export type GetCommentFloorParams = WithPageQuery<GetCommentFloorBaseParams>

export interface GetCommentFloorResult {
  code: number
  message: string
  data: {
    ownerComment: ICommentItemNew
    currentComment: Nullable<ICommentItemNew>
    comments: ICommentItemNew[]
    bestComments: ICommentItemNew[]
    hasMore: boolean
    totalCount: number
    time: number
  }
}

export function getCommentFloor({
  limit = 20,
  type = CommentTypeEnum.SONG,
  ...args
}: GetCommentFloorParams) {
  return (instance: RequestInstance): Promise<GetCommentFloorResult> => {
    return instance.request({
      url: RequestPath.GET_COMMENT_FLOOR,
      method: RequestMethod.GET,
      params: {
        limit,
        type,
        ...args,
      },
    })
  }
}
