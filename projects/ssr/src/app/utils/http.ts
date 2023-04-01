import * as API from '@pluto-music/api'

type ResponseType<T = any, E = any> = Promise<[null, T] | [E, null]>

type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : never

interface IResponseData<T> {
  data: T
}

interface IRequestConfig {
  url: string
}

type APIAllKey = typeof API

type APIMethod = {
  [K in keyof APIAllKey as APIAllKey[K] extends (...args: any[]) => any ? K : never]: APIAllKey[K]
}

type APIMethodKey = keyof APIMethod

const instance = {
  request: async (config: IRequestConfig) => {
    // console.log(config)
    try {
      const data = await fetch(config.url).then((res) => res.json())
      return [null, data]
    } catch (err) {
      return [err, null]
    }
  },
}

/**
 * type narrow
 *   - 泛型类型可以收窄类型
 */
export function http<Name extends APIMethodKey>(api: APIMethodKey & Name) {
  return (...data: Parameters<APIMethod[Name]>) => {
    const callbackConfig = (config: { url: string }) => {
      config.url = `http://localhost:3000${config.url}`
      return config
    }
    // @ts-expect-error A spread argument must either have a tuple type or be passed to a rest parameter.
    return API[api](...data)(instance, callbackConfig) as ResponseType<
      ReturnPromiseType<ReturnType<APIMethod[Name]>>
    >
  }
}
