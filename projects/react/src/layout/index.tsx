import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'

const items: MenuProps['items'] = [
  {
    label: <Link to="/discover/recommend">热门推荐</Link>,
    key: '/discover/recommend',
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/discover/ranking">排行榜</Link>,
    key: '/discover/ranking',
    icon: <AppstoreOutlined />,
  },
]

function Layout() {
  const [current, setCurrent] = useState('/discover/recommend')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <>
      <header>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </header>
      <section>
        <Outlet></Outlet>
      </section>
    </>
  )
}

export default Layout
