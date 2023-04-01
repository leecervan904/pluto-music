import { IPersonalizedSongItem } from '@pluto-music/api'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRequest } from '/@/utils'
import SongItem from '/@/components/song-item'

const Container = styled.div`
  display: flex;
  .box {
    width: 50%;
    .song-item {
      padding: 10px;
      border-radius: 5px;
      transition: background-color 0.2s;
      &:hover {
        background-color: #ace;
      }
    }
  }
`

export default function PersonalizedSong() {
  const [songs, setSongs] = useState<IPersonalizedSongItem[]>([])

  const getData = async () => {
    const [error, data] = await useRequest('getPersonalizedSong')()
    if (error) return
    setSongs(data.result)
  }

  const genSongList = (list: IPersonalizedSongItem[]) => {
    return list.map((song, i) => (
      <div className="song-item">
        <SongItem song={song} order={i + 1} key={song.id} />
      </div>
    ))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <div className="box">{genSongList(songs.slice(0, 5))}</div>
      <div className="box">{genSongList(songs.slice(5, 10))}</div>
    </Container>
  )
}
