import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RightOutlined } from '@ant-design/icons'
import Swiper from './components/Swiper'
import Playlist from './components/Playlist'
import Mv from './components/Mv'
import Song from './components/Song'

const PanelContainer = styled.div`
  margin-top: 30px;
  .header {
    padding: 10px 0;
    font-size: 18px;
  }
`

const withRoute = (Comp: React.FC) => {
  return ({ title, to }: { title: string; to?: string }) => (
    <PanelContainer>
      <div className="header">
        <span className="header-link">
          {to ? <Link to={to}>{title}</Link> : <span>{title}</span>}
          <RightOutlined />
        </span>
      </div>
      <Comp />
    </PanelContainer>
  )
}

const PlaylistPanel = withRoute(Playlist)
const MvPanel = withRoute(Mv)
const SongPanel = withRoute(Song)

function DiscoverRecommend() {
  return (
    <div>
      <Swiper />
      <PlaylistPanel title="推荐歌单" to="/discover/playlist" />
      <SongPanel title="最新音乐" to="/discover/song" />
      <MvPanel title="推荐MV" to="/discover/mv" />
    </div>
  )
}

export default DiscoverRecommend
