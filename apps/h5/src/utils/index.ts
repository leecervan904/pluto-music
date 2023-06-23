export * from './storage'
export * from './useRequest'
export * from './symbol'
export * from './dom'

export const bodyWidth = document.body.clientWidth

/**
 * 将歌手列表格式化为 a/b/c 的形式
 * @param {array} ar
 * @returns string
 */
export function formatArtists(ar: { name: string; [key: string]: unknown }[]) {
  return ar.map(v => v.name).join('/')
}

/**
 * 将数组分割为二维数组，它的子数组最大元素数为 num
 * @param {array} arr
 * @param {number} num
 */
export function groupByNum(arr: unknown[], num: number) {
  const len = arr.length
  if (num >= len)
    return arr

  const res = []
  let start = 0
  while (start < len) {
    res.push(arr.slice(start, start + num))
    start += num
  }

  return res
}

/**
 * 返回歌曲时间的字符串显示
 * @param {integer} dt
 * @returns string
 */
export function formatDuration(dt: number) {
  // 228285 -> 229
  let sec: string | number = Math.ceil(dt / 1000)
  let minutes: string | number = Math.floor(sec / 60)
  sec = sec - minutes * 60

  minutes = minutes ? (minutes >= 10 ? String(minutes) : `0${minutes}`) : '00'
  sec = sec ? (sec >= 10 ? String(sec) : `0${sec}`) : '00'

  return `${minutes}:${sec}`
}

/**
 * 返回： 10月29日
 * @param {Date} time
 */
export function formatUpdateTime(time: number) {
  const date = new Date(time)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

/**
 * 返回 2020-10-30
 * @param {Date} time
 */
export function formatPublishTime(time: number) {
  const date = new Date(time)
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${date.getFullYear()}-${month}-${day}`
}

/**
 * 格式化次数
 * @param {Number} count
 */
export function formatCount(count: number) {
  if (count > 100000000)
    return `${Math.floor(count / 100000000)}亿`
  else if (count > 100000)
    return `${Math.floor(count / 10000)}万`

  return count
}

export const upper = (val: string) => val.toUpperCase()
export const upperFirst = (val: string) => val.replace(/\w/, v => v.toUpperCase())
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
}
