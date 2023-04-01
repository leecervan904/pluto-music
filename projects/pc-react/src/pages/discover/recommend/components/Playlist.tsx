import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import type { IRelativePlaylistItem } from '@pluto-music/api'
import { useRequest } from '/@/utils'
import PlaylistItem from '/@/components/PlaylistItem'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .playlist-item {
    width: 18%;
  }
`

export default function HotPlaylist() {
  const [playlists, setPlaylists] = useState<IRelativePlaylistItem[]>([])

  const navigate = useNavigate()
  function onClick(id: number | string) {
    navigate(`/playlist/${id}`)
  }

  async function initialData() {
    const [error, data] = await useRequest('getPersonalized')({ limit: 10 })
    if (error) return
    setPlaylists(data.result)
  }

  useEffect(() => {
    initialData()
  }, [])

  return (
    <Container>
      {playlists.map((info) => (
        <div className="playlist-item">
          <PlaylistItem info={info} key={info.id} onClick={onClick} />
        </div>
      ))}
    </Container>
  )
}
