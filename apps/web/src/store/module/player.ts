import { defineStore } from 'pinia'
import { PlayMode, genPlayerStore } from '@pluto-music/vue-vendor'
import { useRequest } from '/@/utils'

export { PlayMode }

async function getSongDetail(songId: number | string) {
  const [error, data] = await useRequest('getSongDetail')({ id: songId })
  if (error)
    console.log('[error] - get song detail', songId)
    // throw new Error('[error] - get song detail')

  return data.songs[0]
}

async function getSongUrl(songId: string | number) {
  const [error, data] = await useRequest('getSongUrl')({ id: songId })
  if (error)
    console.log('[error] - get song url', songId)
    // throw new Error('[error] - get song url')

  const url = data.data[0].url
  return url

  // try {
  //   const res = await axios.get(`https://api.music.lizhiwen.online/song/url`, {
  //     params: {
  //       id: songId,
  //     },
  //   })
  //   // console.log(res.data)
  //   return res.data.data[0].url
  // } catch (err) {
  //   console.log(err)
  // }
}

export const usePlayerStore = genPlayerStore({
  define: defineStore,
  getSongDetail,
  getSongUrl,
})
