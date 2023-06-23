import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance, WithPageQuery } from '../../types'
import type { IRelativePlaylistItem, IdTag } from '../../model'

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
export function getCollectPlaylistUsers({ id, limit = 30 }: CollectPlaylistUsersParams) {
  return (instance: RequestInstance): Promise<GetCollectPlaylistResult> => {
    return instance.request({
      url: RequestPath.GET_COLLECT_PLAYLIST_USERS,
      method: RequestMethod.GET,
      params: { id, limit },
    })
  }
}
