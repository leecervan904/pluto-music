import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'

export type ResponseType<T = any, E = any> = Promise<[null, T] | [E, null]>

export interface IResponseData<T> {
  data: T
}

const instance = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? 'https://api.music.lizhiwen.online' : '/api',
  timeout: 5000,
})

/**
 * 这里的类型定义似乎没什么必要？
 * 我所需要的类型都在 useRequest 中重写了
 */
async function request<T = any>(config: AxiosRequestConfig): Promise<ResponseType<IResponseData<T>, AxiosError>> {
  return new Promise(async (resolve) => {
    try {
      const res = await instance.request<IResponseData<T>>(config)
      resolve([null, res.data])
    }
    catch (err) {
      resolve([err as AxiosError, null])
    }
  })
}

export default {
  request,
}
