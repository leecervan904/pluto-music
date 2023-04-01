import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance, WithPageQuery } from '../../types'
import { IdTag, IRelativePlaylistItem } from '../../model'

interface CollectPlaylistUsersBaseParams {
  id: IdTag
}

type CollectPlaylistUsersParams = WithPageQuery<CollectPlaylistUsersBaseParams>

export interface ICollectPlaylistSubscriber {
  nickname: string
  avatarUrl: string
  [k: string]: any
}

export interface GetCollectPlaylistResult {
  code: number
  playlists: IRelativePlaylistItem[]
  subscribers: ICollectPlaylistSubscriber[]
  [key: string]: unknown
}

/**
 * 最近收藏歌单的用户
 * @param {Number} id
 * @param {Number} limit
 */
export const getCollectPlaylistUsers = ({ id, limit = 30 }: CollectPlaylistUsersParams) => {
  return (instance: RequestInstance): Promise<GetCollectPlaylistResult> => {
    return instance.request({
      url: RequestPath.GET_COLLECT_PLAYLIST_USERS,
      method: RequestMethod.GET,
      params: { id, limit },
    })
  }
}
