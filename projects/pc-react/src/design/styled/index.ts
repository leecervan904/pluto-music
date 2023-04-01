import styled, { css } from 'styled-components'

export const ellipsis = css`
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 超出显示省略号 */
  white-space: nowrap; /* 不换行 */
`

export const EllipsisMultiple = styled.div<{ line: number }>`
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 超出显示省略号 */
  display: -webkit-box; /* 或 display: -webkit-inline-box */
  -webkit-box-orient: vertical; /* 垂直朝向 */
  -webkit-line-clamp: ${(props) => props.line}; /* 指定行数 */
`

export const imgWrapper = css<{ percent?: number; rounded?: number }>`
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: ${(props) => (props.percent || 100) + '%'};
  border-radius: ${(props) => (props.rounded || 5) + 'px'};
  img {
    width: 100%;
  }
`
