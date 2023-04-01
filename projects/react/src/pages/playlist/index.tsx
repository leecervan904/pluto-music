import type { IPlaylist, ISong } from '@pluto-music/api'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from '/@/utils'
import PlaylistPoster from './PlaylistPoster'
import SongList from './SongList'

function Playlist() {
  const { id } = useParams<{ id: string }>()
  const [detail, setDetail] = useState<IPlaylist>({} as IPlaylist)
  const [songList, setSongList] = useState<ISong[]>([])

  async function initialData() {
    const [error, data] = await useRequest('getPlaylistDetail')({ id: id! })
    if (error) return
    setTimeout(() => {
      setDetail(data.playlist)
      setSongList(data.playlist.tracks)
    }, 1000)
  }

  useEffect(() => {
    initialData()
  }, [id])

  return (
    <React.Suspense fallback={<h1>loading...</h1>}>
      <div>
        <h1>playlist view - {id}</h1>
        <PlaylistPoster detail={detail} />
        <SongList list={songList} />
      </div>
    </React.Suspense>
  )
}

export default Playlist
