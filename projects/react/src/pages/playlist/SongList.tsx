import React from 'react'
import type { ISong } from '@pluto-music/api'

export interface ISongListProps {
  list: ISong[]
}

const SongList: React.FC<ISongListProps> = ({ list }) => {
  return (
    <div>
      {list.map((v) => (
        <div key={v.id}>
          <h3>
            {v.name} - {v.ar[0].name}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default SongList
