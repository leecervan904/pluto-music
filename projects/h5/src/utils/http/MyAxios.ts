import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import axios from 'axios'
// import { Axios } from './Axios'

interface IResponse {
  status: string
  message: string
  data: unknown
}

function handelAuthError(status: string) {
  const authErrMap: any = {
    '10031': '登录失效，需要重新登录', // token 失效
    '10032': '您太久没登录，请重新登录~', // token 过期
    '10033': '账户未绑定角色，请联系管理员绑定角色',
    '10034': '该用户未注册，请联系管理员注册用户',
    '10035': 'code 无法获取对应第三方平台用户',
    '10036': '该账户未关联员工，请联系管理员做关联',
    '10037': '账号已无效',
    '10038': '账号未找到',
  }

  if (authErrMap.hasOwnProperty(status)) {
    console.log('error', authErrMap[status])

    return false
  }

  return true
}

function handleGeneralError(status: string, message: string) {
  if (status !== '0') {
    // console.log('error', message)
    return false
  }

  return true
}

export interface IResponseData<T> {
  data: T
}

export class MyAxios {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig = {}) {
    // super(config)
    this.instance = axios.create({
      baseURL: import.meta.env.BASE_URL,
      timeout: 5000,
      ...config,
    })

    this.setupRequestInterceptor()
    this.setupResponseInterceptor()
  }

  private setupRequestInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        config.url = `/api${config.url}`
        // 1. 请求头设置

        // 2. 验证信息设置
        if (config.headers) {
          config.headers['token'] = localStorage.getItem('__TOKEN__') || ''
        }

        return config
      },
      (error) => {
        console.log('[Request Interceptor]:', error)
        return error
      },
    )
  }

  private setupResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => {
        const { status } = response
        const data = response.data as IResponse
        // 1. 网络错误处理
        if (status !== 200) {
          return Promise.reject(data.data)
        }

        // 2. 授权错误处理
        handelAuthError(data.status)

        // 3. 普通错误处理
        handleGeneralError(data.status, data.message)

        return data
      },
      (error) => {
        console.log('[Response Interceptor]:', error)
        return error
      },
    )
  }

  // request<T = any>(config: AxiosRequestConfig): Promise<[null, IResponseData<T>] | [AxiosError, null]> {
  //   return new Promise((resolve, reject) => {
  //     this.instance.request<IResponseData<T>>(config)
  //       .then((res) => {
  //         resolve([null, res.data])
  //       })
  //       .catch((error) => {
  //         reject([error, null])
  //       })
  //   })
  // }
  request<T = any>(config: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.instance.request<IResponseData<T>>(config)
        .then((res) => {
          resolve([null, res])
        })
        .catch((error) => {
          reject([error, null])
        })
    })
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  uploadFile(url: string, config: AxiosRequestConfig) {
    console.log('upload')
    return this.instance.get(url, config)
  }

  uploadFormData(url: string, config: AxiosRequestConfig) {
    console.log('form data')
    return this.instance.get(url, config)
  }

  beforeRequest() {
    console.log('before request')
  }

  afterResponse() {
    console.log('after response')
  }
}
