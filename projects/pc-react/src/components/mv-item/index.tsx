import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { IPersonalizedMvItem } from '@pluto-music/api'
import { ellipsis } from '/@/design/styled'
import PlayCount from '/@/components/badge/PlayCount'

interface IMvItemProps {
  mv: IPersonalizedMvItem
  onClick?: (id: number | string) => void
}

const Container = styled.div`
  .poster-wrapper {
    position: relative;
  }
  .poster {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 56.2%;
    border-radius: 5px;
    cursor: pointer;
    .img {
      width: 100%;
    }
  }
  .info {
    margin-top: 5px;
    &-name {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      cursor: pointer;
    }
    &-artist {
      ${ellipsis}
      font-size: 12px;
      color: #ccc;
      .artist-sep {
        margin: 0 2px;
      }
    }
  }
`

const MvItem: React.FC<IMvItemProps> = ({ mv }) => {
  const genArtists = () => {
    const { artists } = mv
    const len = artists.length
    const list = []
    for (let i = 0; i < len; i++) {
      list.push(
        <Link className="artist-name" to={`/artist/${artists[i].id}`} key={artists[i].id}>
          {artists[i].name}
        </Link>,
      )
      if (i !== len - 1) {
        list.push(
          <span className="artist-sep" key={i}>
            /
          </span>,
        )
      }
    }
    return list
  }

  return (
    <Container>
      <div className="poster-wrapper">
        <div className="poster">
          <img className="img" src={mv.picUrl} alt={mv.name} />
        </div>
        <PlayCount playCount={mv.playCount} />
      </div>
      <div className="info">
        <div className="info-name">
          <Link to={`/mv/${mv.id}`}>{mv.name}</Link>
        </div>
        <div className="info-artist">{genArtists()}</div>
      </div>
    </Container>
  )
}

export default MvItem
