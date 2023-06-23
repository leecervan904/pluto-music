import { AppStorage } from '/@/utils/storage'

/**
 * 绑定 /@/utils/storage
 */
export function useStorage<T = any>(
  type: 'local' | 'session' = 'local',
  key: string,
  value: T,
) {
  const storage = new AppStorage(type)

  return {

  }
}
