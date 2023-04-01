import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styled from 'styled-components'

const items: MenuProps['items'] = [
  {
    label: <Link to="/discover/recommend">个性推荐</Link>,
    key: 'discover/recommend',
  },
  {
    label: <Link to="/discover/playlist">歌单</Link>,
    key: 'discover/playlist',
  },
  {
    label: <Link to="/discover/ranking">排行榜</Link>,
    key: 'discover/ranking',
  },
  {
    label: <Link to="/discover/artist">歌手</Link>,
    key: 'discover/artist',
  },
  {
    label: <Link to="/discover/song">最新音乐</Link>,
    key: 'discover/song',
  },
]

const HeaderSidebarContainer = styled.div`
  text-align: right;
  span {
    margin: 0 10px;
  }
`

const HeaderSidebar = () => (
  <HeaderSidebarContainer>
    <LeftOutlined />
    <RightOutlined />
  </HeaderSidebarContainer>
)

function DefaultLayout() {
  const [current, setCurrent] = useState('/discover/recommend')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <Layout className="app-layout">
      <Layout.Header className="app-layout__header">
        <Layout className="app-layout__header-sidebar">
          <Layout.Sider theme="light">
            <HeaderSidebar />
          </Layout.Sider>
          <Layout.Content className="app-layout__header-nav">
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
          </Layout.Content>
        </Layout>
      </Layout.Header>

      <Layout className="app-layout__main">
        <Layout.Sider className="app-layout__main-sidebar" theme="light">
          侧边栏
        </Layout.Sider>
        <Layout.Content className="app-layout__main-content">
          <Outlet></Outlet>
        </Layout.Content>
      </Layout>

      <Layout.Footer className="app-layout__footer">播放器控制栏</Layout.Footer>
    </Layout>
  )
}

export default DefaultLayout
