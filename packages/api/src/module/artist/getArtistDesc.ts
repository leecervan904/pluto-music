import { RequestMethod, RequestPath } from '../../constants'
import type { RequestInstance } from '../../types'
import type { IdTag } from '../../model'

export interface GetArtistDescParams {
  id: IdTag
}

export interface IArtistDescIntroductionItem {
  ti: string
  txt: string
}

export interface IArtistDescTopicDataItem {
  [k: string]: any
}

export interface GetArtistDescResult {
  introduction: IArtistDescIntroductionItem[]
  count: number
  briefDesc: string
  topicData: IArtistDescTopicDataItem[]
}

export function getArtistDesc(params: GetArtistDescParams) {
  return (instance: RequestInstance): Promise<GetArtistDescResult> => {
    return instance.request({
      url: RequestPath.GET_ARTIST_DESC,
      method: RequestMethod.GET,
      params,
    })
  }
}
