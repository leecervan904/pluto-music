import { Navigate, useRoutes, type RouteObject } from 'react-router-dom'
import Layout from '/@/layout'
import DiscoverRecommend from '/@/pages/discover/recommend'
import DiscoverRanking from '/@/pages/discover/ranking'
import PlaylistView from '/@/pages/playlist'
import Notfound from '/@/pages/404'
import Test from '/@/pages/test'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to="/discover/recommend" />,
      },
      {
        path: '/discover/recommend',
        element: <DiscoverRecommend />,
      },
      {
        path: '/discover/ranking',
        element: <DiscoverRanking />,
      },
      {
        path: '/playlist/:id',
        element: <PlaylistView />,
      },
    ],
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/404',
    element: <Notfound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
]

const Router = () => useRoutes(routes)

export default Router
