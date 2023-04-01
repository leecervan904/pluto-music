import React from 'react'
import type { IPlaylist } from '@pluto-music/api'

export interface IPlaylistPosterProps {
  detail: IPlaylist
}

const PlaylistPoster: React.FC<IPlaylistPosterProps> = ({ detail }) => {
  return <h1>{detail.name}</h1>
}

export default PlaylistPoster
