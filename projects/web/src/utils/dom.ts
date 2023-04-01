export const boxOffsetLeft = (element: HTMLElement) => {
  let total = element.offsetLeft
  let current = element.offsetParent as HTMLElement
  while (current !== null) {
    total += current.offsetLeft
    current = current.offsetParent as HTMLElement
  }
  return total
}

export const boxOffsetTop = (element: HTMLElement) => {
  let total = element.offsetTop
  let current = element.offsetParent as HTMLElement
  while (current !== null) {
    total += current.offsetTop
    current = current.offsetParent as HTMLElement
  }
  return total
}

export const isChild = (parent: HTMLElement, child: HTMLElement) => {
  let current: HTMLElement | null = child
  while (current) {
    if (parent === current) {
      return true
    }
    current = current.parentNode as HTMLElement
  }
  return false
}
