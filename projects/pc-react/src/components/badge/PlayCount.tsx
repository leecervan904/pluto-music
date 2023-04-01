import React from 'react'
import styled from 'styled-components'
import { PlayCircleOutlined } from '@ant-design/icons'
import { formattedPlayCount } from '@pluto-music/shared'

export interface IPlayCountBadgeProps {
  playCount: number
}

const Container = styled.div`
  z-index: 9;
  position: absolute;
  top: 3px;
  right: 5px;
  font-size: 12px;
  color: ${(props) => props.theme?.color || '#fff'};
  .count {
    margin-left: 3px;
  }
`

const PlayCountBadge: React.FC<IPlayCountBadgeProps> = ({ playCount }) => {
  return (
    <Container>
      <PlayCircleOutlined />
      <span className="count">{formattedPlayCount(playCount)}</span>
    </Container>
  )
}

export default PlayCountBadge
