import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { GetCommentQuery, GetCommentResult } from '../../model'

export const getSongComment = ({
  id,
  before,
  offset = 0,
  limit = 20,
}: GetCommentQuery) => {
  return (instance: RequestInstance): Promise<GetCommentResult> => {
    return instance.request({
      url: RequestPath.GET_SONG_COMMENT,
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
