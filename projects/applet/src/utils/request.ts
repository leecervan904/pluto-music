export type UniAppRequestError = Error

export type ResponseType<T = any, E = any> = Promise<[null, T] | [E, null]>

export interface IResponseData<T = any> {
  data: T
}

/**
 * 这里的类型没什么必要，我所需要的类型都在 useRequest 中重写了
 */
export const request = async <T = any>(config: UniApp.RequestOptions): Promise<any> => {
  return new Promise(async (resolve) => {
    try {
      const res = (await uni.request(config)) as unknown as IResponseData<T>
      resolve([null, res.data])
    } catch (err) {
      resolve([err, null])
    }
  })
}

export const service = {
  request,
}
