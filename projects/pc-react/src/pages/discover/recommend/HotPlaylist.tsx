import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import type { IRelativePlaylistItem } from '@pluto-music/api'
import { useRequest } from '/@/utils'
import PlaylistItem from '/@/components/PlaylistItem'

const Container = styled.div`
  width: 600px;
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`

export default function HotPlaylist() {
  const [playlists, setPlaylists] = useState<IRelativePlaylistItem[]>([])

  const navigate = useNavigate()
  function onClick(id: number | string) {
    console.log('click', id)
    navigate(`/playlist/${id}`)
  }

  async function initialData() {
    const [error, data] = await useRequest('getPersonalized')({ limit: 8 })
    if (error) return
    setPlaylists(data.result)
  }

  useEffect(() => {
    initialData()
  }, [])

  return (
    <Container>
      {playlists.map((info) => (
        <PlaylistItem info={info} key={info.id} onClick={onClick} />
      ))}
    </Container>
  )
}
