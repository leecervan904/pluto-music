export const getDuration = (duration: number) => {
  const minutes = Math.floor(duration / (60 * 1000))
  const seconds = Math.floor((duration - 60 * 1000 * minutes) / 1000)
  let res = minutes > 9 ? `${minutes}:` : `0${minutes}:`
  res += seconds > 9 ? `${seconds}` : `0${seconds}`
  return res
}

/**
 * 将歌手列表格式化为 a/b/c 的形式
 * @param {array} ar
 * @returns string
 */
export const formatArtists = (ar: { name: string; [key: string]: unknown }[]) => {
  return ar.map((v) => v.name).join('/')
}

/**
 * 将数值格式化为 12万 1亿 的形式
 * @param count number
 */
export const formattedPlayCount = (count: number) => {
  if (count < 10000) return `${count}`
  if (count < 100_000_000) return `${Math.floor(count / 10000)}万`
  return `${Math.floor(count / 100_000_000)}亿`
}
