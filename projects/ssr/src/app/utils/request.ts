export type ResponseType<T = any, E = any> = Promise<[null, T] | [E, null]>

export interface IResponseData<T> {
  data: T
}

const instance = {
  request: () => {},
}

/**
 * 这里的类型定义似乎没什么必要？
 * 我所需要的类型都在 useRequest 中重写了
 */
const request = async <T = any>(
  config: AxiosRequestConfig,
): Promise<ResponseType<IResponseData<T>, AxiosError>> => {
  return new Promise(async (resolve) => {
    try {
      const res = await instance.request<IResponseData<T>>(config)
      resolve([null, res.data])
    } catch (err) {
      resolve([err as AxiosError, null])
    }
  })
}

export { instance }
