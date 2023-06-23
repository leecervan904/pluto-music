import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { GetCommentQuery, GetCommentResult } from '../../model'

export function getAlbumComment({
  id,
  before,
  offset = 0,
  limit = 20,
}: GetCommentQuery) {
  return (instance: RequestInstance): Promise<GetCommentResult> => {
    return instance.request({
      url: RequestPath.GET_ALBUM_COMMENT,
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
