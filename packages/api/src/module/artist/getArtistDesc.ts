import { RequestMethod, RequestPath } from '../../constants'
import { RequestInstance } from '../../types'
import { IdTag } from '../../model'

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

export const getArtistDesc = (
  params: GetArtistDescParams,
) => {
  return (instance: RequestInstance): Promise<GetArtistDescResult> => {
    return instance.request({
      url: RequestPath.GET_ARTIST_DESC,
      method: RequestMethod.GET,
      params,
    })
  }
}
