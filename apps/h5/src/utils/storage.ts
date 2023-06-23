export interface IAppStorageData<T> {
  expiresIn?: number
  weight?: number
  data: T
}

function serialize<T = any>(val: T) {
  return JSON.stringify(val)
}

function deserialize<T>(val: string): IAppStorageData<T> | null {
  try {
    return JSON.parse(val) as IAppStorageData<T>
  } catch (e) {
    return null
  }
}

export class AppStorage {
  instance: typeof localStorage | typeof sessionStorage | null = null
  constructor(
    type: 'local' | 'session' = 'local', // 存储类型
  ) {
    this.instance = type === 'local' ? window.localStorage : window.sessionStorage
  }

  /**
   * @param removeExpires 自动删除过期数据
   */
  has(key: string, removeExpires = true) {
    const item = this.instance!.getItem(key)
    if (!item) return false

    if (removeExpires) {
      const res = deserialize(item)
      if (res?.expiresIn && res.expiresIn < Date.now()) {
        this.instance!.removeItem(key)
      }
    }

    return this.instance!.getItem(key) !== null
  }

  getItem<T = any>(key: string, removeExpires = true): T | null {
    if (!this.has(key, removeExpires)) return null
    const store = this.instance!.getItem(key)
    const res = deserialize<T>(store!)
    if (!res) return null
    return res.data
  }

  setItem<T = any>(
    key: string,
    value: T,
    isCache = false,
    options: {
      maxAge?: number,
      weight?: number,
    }
  ) {
    const data: IAppStorageData<T> = {
      data: value
    }

    if (isCache) {
      data.expiresIn = Date.now() + (options.maxAge || 60 * 1000)
      data.weight = options.weight || 0
    }

    this.instance!.setItem(key, serialize(data))
  }

  removeItem(key: string) {
    this.instance!.removeItem(key)
  }

  clear() {
    this.instance!.clear()
  }
}

export const storage = new AppStorage()
