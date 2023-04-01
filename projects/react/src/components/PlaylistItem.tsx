import type { IRelativePlaylistItem } from '@pluto-music/api'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 140px;
`

const Wrapper = styled.div`
  position: relative;
  height: 140px;
  background-color: #ccc;
`

const ImgMask = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 140px;
  height: 140px;
  background: url('../../../public/img/icons/coverall.png') no-repeat 0 0;
`

const Info = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 27px;
  font-size: 14px;
  color: #fff;
  background: url('../../../public/img/icons/coverall.png') no-repeat 0 -537px;
`

const InfoHeadset = styled.div`
  float: left;
  width: 14px;
  height: 11px;
  margin: 9px 5px 9px 10px;
  background: url('../../../public/img/icons/iconall.png') no-repeat 0 -24px;
`

const InfoCount = styled.div`
  margin-top: 3px;
  float: left;
`

const InfoPlay = styled.span`
  position: absolute;
  right: 10px;
  bottom: 5px;
  width: 16px;
  height: 17px;
  background: url('../../../public/img/icons/iconall.png') no-repeat 0 0;
  &:hover {
    cursor: pointer;
    background: url('../../../public/img/icons/iconall.png') no-repeat 0 -60px;
  }
`

const Ellipsis = styled.div<{
  line: number
}>`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${(props) => props.line || 1};
  -webkit-box-orient: vertical;
`

export interface IPlaylistItemProps {
  info: IRelativePlaylistItem
  onClick: (id: number | string) => void
}

const PlaylistItem: React.FC<IPlaylistItemProps> = ({ info, onClick }) => {
  const formattedPlayCount = (count: number) =>
    count > 100000 ? `${Math.floor(count / 10000)}万` : count

  return (
    <Container onClick={() => onClick(info.id)}>
      <Wrapper>
        <img src={info.picUrl} style={{ width: '140px' }} />
        <ImgMask></ImgMask>
        <Info>
          <InfoHeadset></InfoHeadset>
          <InfoCount>{formattedPlayCount(info.playCount)}</InfoCount>
          <InfoPlay></InfoPlay>
        </Info>
      </Wrapper>
      <Ellipsis line={2}>{info.name}</Ellipsis>
    </Container>
  )
}

export default PlaylistItem
