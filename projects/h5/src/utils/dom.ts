/**
 * add class(es)
 * @param {HTMLElement} el
 * @param {String | Array} className
 */
export const addClass = (el: HTMLElement, className: string | string[]) => {
  const classes = el.getAttribute('class') || ''
  if (typeof className === 'string') {
    return el.setAttribute('class', classes.concat(` ${className}`))
  }
  if (Array.isArray(className)) {
    return el.setAttribute('class', classes.concat(` ${className.join(' ')}`))
  }
}

/**
 * remove class(es)
 * @param {HTMLElement} el
 * @param {String | Array} className
 */
export const removeClass = (el: HTMLElement, className: string | string[]) => {
  const classes = (el.getAttribute('class') || '').split(' ')
  if (typeof className === 'string') {
    return el.setAttribute('class', classes.filter(v => v !== className).join(' '))
  }
  if (Array.isArray(className)) {
    className.forEach(v => {
      const index = classes.findIndex(v)
      if (index > -1) {
        classes.splice(index, 1)
      }
    })

    return el.setAttribute('class', classes.join(' '))
  }
}

/**
 * 返回节点相对于其祖先元素的左侧偏移
 * @param {HTMLElemtne} el
 * @param {HTMLElement} ancestor
 */
export const getOffsetLeft = (el: HTMLElement, ancestor?: Element) => {
  let left = el.offsetLeft
  const parent = el.offsetParent

  if (parent && parent !== ancestor) {
    left += getOffsetLeft(parent)
  }

  return left
}

/**
 * 返回节点相对于其祖先元素的顶部偏移
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 */
export const getOffsetTop = (el, ancestor) => {
  let top = el.offsetTop
  const parent = el.offsetParent

  if (parent && parent !== ancestor) {
    top += getOffsetTop(parent)
  }

  return top
}

/**
 * 返回节点相对于根元素的偏移
 * @param {HTMLElement} el
 */
export const getOffsetRoot = (el) => {
  let left = el.offsetLeft
  let top = el.offsetTop
  const parent = el.offsetParent

  if (parent) {
    const [cLeft, cTop] = getOffsetRoot(parent)
    left += cLeft
    top += cTop
  }

  return [left, top]
}
