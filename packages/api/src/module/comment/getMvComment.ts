import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { GetCommentQuery, GetCommentResult } from '../../model'

export function getMvComment({
  id,
  before,
  offset = 0,
  limit = 20,
}: GetCommentQuery) {
  return (instance: RequestInstance): Promise<GetCommentResult> => {
    return instance.request({
      url: RequestPath.GET_PLAYLIST_COMMENT,
      method: RequestMethod.GET,
      params: {
        id,
        before,
        offset,
        limit,
      },
    })
  }
}
