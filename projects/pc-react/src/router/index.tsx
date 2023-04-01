import { Navigate, useRoutes, type RouteObject } from 'react-router-dom'
import Layout from '/@/layout'
import DiscoverRecommend from '/@/pages/discover/recommend'
import DiscoverPlaylist from '/@/pages/discover/playlist'
import DiscoverRanking from '/@/pages/discover/ranking'
import DiscoverArtist from '/@/pages/discover/artist'
import DiscoverSong from '/@/pages/discover/song'
import Playlist from '/@/pages/playlist'
import Notfound from '/@/pages/404'

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
        path: '/discover/artist',
        element: <DiscoverArtist />,
      },
      {
        path: '/discover/playlist',
        element: <DiscoverPlaylist />,
      },
      {
        path: '/discover/song',
        element: <DiscoverSong />,
      },
    ],
  },
  {
    path: '/playlist/:id',
    element: <Playlist />,
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
