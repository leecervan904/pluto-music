import { useState, useEffect } from 'react'
import { MyComponent, defineCustomElements } from '@pluto-music/react-library'
import { IRelativePlaylistItem } from '@pluto-music/api'
import { useRequest } from '/@/utils'

defineCustomElements()

function NotFound() {
  const [playlists, setPlaylists] = useState<IRelativePlaylistItem[]>([])

  useEffect(() => {
    async function initData() {
      const [error, data] = await useRequest('getTopPlaylist')({})
      if (error) return
      setPlaylists(data.playlists)
    }

    initData()
  })

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {playlists.map((v) => (
        <MyComponent key={v.id} playlist={v} />
      ))}
    </div>
  )
}

export default NotFound
