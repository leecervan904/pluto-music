import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

export abstract class Axios {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL: import.meta.env.BASE_URL,
      timeout: 5000,
      ...config,
    })

    // this.setupRequestInterceptor()
    // this.setupResponseInterceptor()
  }

  // abstract setupRequestInterceptor(): void

  // abstract setupResponseInterceptor(): void

  abstract get(...arg: unknown[]): Promise<unknown>

  abstract post(...arg: unknown[]): Promise<unknown>

  abstract uploadFile(url: string, config: AxiosRequestConfig): Promise<AxiosResponse>

  abstract uploadFormData(url: string, config: AxiosRequestConfig): Promise<AxiosResponse>

  async beforeRequest() {
    console.log('before request')
  }

  async afterResponse() {
    console.log('after response')
  }
}
