import * as API from '@pluto-music/api'
import type { AxiosError } from 'axios'
import type { ResponseType } from './request'
import service from './request'

type APIAllKey = typeof API

type APIMethod = {
  [K in keyof APIAllKey as APIAllKey[K] extends (...args: any[]) => any ? K : never]: APIAllKey[K]
}

type APIMethodKey = keyof APIMethod

/**
 * type narrow
 *   - 泛型类型可以收窄类型
 */
export function useRequest<Name extends APIMethodKey>(api: APIMethodKey & Name) {
  return (...data: Parameters<APIMethod[Name]>) => {
    // @ts-expect-error A spread argument must either have a tuple type or be passed to a rest parameter.
    return API[api](...data)(service) as ResponseType<
      ReturnPromiseType<ReturnType<APIMethod[Name]>>,
      AxiosError
    >
  }
}
