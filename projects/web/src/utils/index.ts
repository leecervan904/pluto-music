export * from './request'
export * from './useRequest'
export * from './dom'

export const getDuration = (duration: number) => {
  const minutes = Math.floor(duration / (60 * 1000))
  const seconds = Math.floor((duration - 60 * 1000 * minutes) / 1000)
  let res = minutes > 9 ? `${minutes}:` : `0${minutes}:`
  res += seconds > 9 ? `${seconds}` : `0${seconds}`
  return res
}

export const addSeparator = (arr: string[], sep = '|') => {
  return arr.join(`%%%${sep}%%%`).split('%%%')
}

export const getSingers = (arr: Array<{ name: string }>) => {
  if (!Array.isArray(arr)) return ''
  return arr.map((v) => v.name).join('/')
}

export const getMonthAndDay = (time: number) => {
  const match = new Date(time).toLocaleDateString().split(/\W/)
  return `${match[1]}月${match[2]}日`
}

export const dateFormat = (time: number) => {
  const match = new Date(time).toLocaleDateString().split(/\W/)
  const month = match[1].length === 2 ? match[1] : `0${match[1]}`
  const day = match[2].length === 2 ? match[2] : `0${match[2]}`
  return `${match[0]}-${month}-${day}`
}

export const picUrlFormat = (url: string, x: number, y: number) => {
  return `${url}?param=${x}x${y}`
}

export const fillArray = (count: number, start = 1) => {
  return new Array(count).fill(null).map((v, i) => start + i)
}

export const pageChanges = (currPage: number, maxPage: number) => {
  // 不需要显示省略号
  if (maxPage < 10) {
    return fillArray(maxPage, 1)
  }
  let pages: Array<number | '...' | 'prev' | 'next'> = [1]
  // 省略号先出现在距离 currPage 较远的一端
  if (currPage - 1 <= maxPage - currPage) {
    // 判断是否在前端添加 '...'
    if (currPage <= 5) {
      pages = pages.concat(fillArray(7, 2))
    } else {
      pages.push('...')
      pages = pages.concat(fillArray(7, currPage - 3))
    }
    // 尾部始终添加 '...'
    pages.push('...', maxPage)
  } else {
    // eslint-disable-next-line no-lonely-if
    // 前端始终添加 '...'
    pages.push('...')
    // 判断是否在尾部添加 '...'
    if (maxPage - currPage < 5) {
      pages = pages.concat(fillArray(7, maxPage - 7))
    } else {
      pages = pages.concat(fillArray(7, currPage - 3))
      pages.push('...')
    }
    pages.push(maxPage)
  }

  return pages
}
