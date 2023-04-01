import type { IPersonalizedSongItem } from '@pluto-music/api'
import React from 'react'
import styled from 'styled-components'
import { PlayCircleOutlined } from '@ant-design/icons'
import Artists from '/@/components/Artists'
import { ellipsis } from '/@/design/styled'

export interface ISongItemProps {
  order: number | string
  song: IPersonalizedSongItem
}

const Container = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  .item-poster {
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
    width: 20%;
    height: 0;
    padding-bottom: 20%;
    border-radius: 5px;
    .img {
      width: 100%;
    }
  }
  .item-order {
    padding: 0 10px;
  }
  .item-info {
    flex: 1;
    /* ${ellipsis} */
    &__name {
      &-alias {
        margin-left: 5px;
        color: #aaa;
      }
    }
  }
  .item-play {
    padding: 0 10px;
    font-size: 16px;
    color: #cd332b;
  }
`

const SongItem: React.FC<ISongItemProps> = ({ song, order }) => {
  return (
    <Container>
      <div className="item-poster">
        <img className="img" src={song.picUrl + '?param=200y200'} />
      </div>
      <div className="item-order">{order}</div>
      <div className="item-info">
        <div className="item-info__name">
          <span>{song.name}</span>
          {song.song.alias.length ? (
            <span className="item-info__name-alias">({song.song.alias[0]})</span>
          ) : null}
        </div>
        <div className="item-info__artists">
          <Artists artists={song.song.artists} />
        </div>
      </div>
      <div className="item-play">
        <PlayCircleOutlined />
      </div>
    </Container>
  )
}

export default SongItem
