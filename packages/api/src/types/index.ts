export interface PageQuery {
  limit?: number
  offset?: number
}

export type Nullable<T> = T | null

export type WithPageQuery<T> = T & PageQuery

export interface PageQueryNew {
  pageNo?: number
  pageSize?: number
}

export type WithPageQueryNew<T> = T extends any ? T & PageQueryNew : never

export interface WithResponseCodeMessage<T> {
  code?: number | string
  message?: Nullable<string>
  data: T
}

export interface RequestOptions {
  url: string
  method: 'GET' | 'POST' | 'DELETE' | 'PUT'
  params?: any
  data?: any
  [key: string]: unknown
}

export interface RequestInstance {
  request: (args: RequestOptions) => Promise<any>
}
