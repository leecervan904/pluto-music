import { IArtist } from '@pluto-music/api'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ellipsis } from '/@/design/styled'

const Container = styled.div`
  ${ellipsis}
  font-size: 12px;
  color: #ccc;
  .artist-name {
  }
  .artist-sep {
    margin: 0 2px;
  }
`

const Artists: React.FC<{ artists: IArtist[] }> = ({ artists }) => {
  const genArtists = () => {
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

  return <Container>{genArtists()}</Container>
}

export default Artists
