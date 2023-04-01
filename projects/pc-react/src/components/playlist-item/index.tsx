import React, { MouseEvent } from 'react'
import type { IRelativePlaylistItem } from '@pluto-music/api'
import styled from 'styled-components'
import { PlayCircleOutlined } from '@ant-design/icons'
import { EllipsisMultiple, imgWrapper } from '/@/design/styled'
import PlayCount from '/@/components/badge/PlayCount'

export interface IPlaylistItemProps {
  playlist: IRelativePlaylistItem
  onPlayAll?: (id: string | number) => void
}

const Container = styled.div`
  padding-bottom: 20px;
  cursor: pointer;
  .playlist-wrapper {
    position: relative;
    ${imgWrapper};
  }
  .playlist-playcount {
    position: absolute;
    top: 3px;
    right: 5px;
  }
  .playlist-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 5px;
    &__creator {
      font-size: 12px;
      color: #fff;
    }
    &__play {
      opacity: 0;
      font-size: 30px;
      color: #cd332b;
      transition: opacity 0.2s;
    }
  }
  &:hover {
    .playlist-info__play {
      opacity: 1;
    }
  }
`

const PlaylistItem: React.FC<IPlaylistItemProps> = ({ playlist, onPlayAll }) => {
  const handlePlay = (e: MouseEvent) => {
    e.stopPropagation()
    onPlayAll && onPlayAll(playlist.id)
  }

  return (
    <Container percent={100}>
      <div className="playlist-wrapper">
        <img src={playlist.coverImgUrl + '?param=300y300'} />
        {/* <div className="playlist-playcount"></div> */}
        <PlayCount playCount={playlist.playCount} />
        <div className="playlist-info">
          <div className="playlist-info__creator">{playlist.creator.nickname}</div>
          <div className="playlist-info__play" onClick={handlePlay}>
            <PlayCircleOutlined />
          </div>
        </div>
      </div>
      <EllipsisMultiple line={2}>{playlist.name}</EllipsisMultiple>
    </Container>
  )
}

export default PlaylistItem
