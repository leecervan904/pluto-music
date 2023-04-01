import { RequestInstance } from '../../types'
import { IdTag } from '../../model'
import { RequestMethod, RequestPath } from '../../constants'

export interface IBannerItem {
  pic: string
  titleColor: string
  typeTitle: string
  encodeId: IdTag
  targetId: IdTag
  targetType: number
  url?: string
  [key: string]: unknown
}

export interface GetBannerResult {
  code: number
  banners: IBannerItem[]
}

export interface GetBannerParams {
  type?: string
}

// 首页轮播
export function getBanner(params: GetBannerParams = { type: '2' }) {
  return (
    instance: RequestInstance,
    callbackConfig?: (...args: any[]) => any,
  ): Promise<GetBannerResult> => {
    let config = {
      url: RequestPath.GET_BANNER,
      method: RequestMethod.GET,
      params,
    }

    if (callbackConfig) {
      config = callbackConfig?.(config)
    }

    return instance.request(config)
  }
}
