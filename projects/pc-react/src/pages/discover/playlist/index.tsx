import { IRelativePlaylistItem } from '@pluto-music/api'
import { useEffect, useState } from 'react'
import { useRequest } from '/@/utils'
import styled from 'styled-components'
import PlaylistItem from '/@/components/playlist-item/index'

const Container = styled.div`
  .playlist-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &__item {
      width: 22%;
    }
  }
`

function DiscoverPlaylist() {
  const [cat, setCat] = useState('全部')
  const [playlists, setPlaylists] = useState<IRelativePlaylistItem[]>([])

  const getData = async () => {
    const [error, data] = await useRequest('getTopPlaylist')({ cat })
    if (error) return
    setPlaylists(data.playlists)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <div>poster</div>
      <div>tabs</div>
      <div className="playlist-content">
        {playlists.map((playlist) => (
          <div className="playlist-content__item" key={playlist.id}>
            <PlaylistItem playlist={playlist} />
          </div>
        ))}
      </div>
    </Container>
  )
}

export default DiscoverPlaylist
