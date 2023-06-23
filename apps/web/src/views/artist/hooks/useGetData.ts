import type {
  GetArtistDescResult,
  GetArtistsResult,
  IAlbumDetail,
  IArtist,
  IMV,
} from '@pluto-music/api'
import { type ComputedRef, onMounted, ref, shallowRef, unref, watch } from 'vue'
import { useRequest } from '/@/utils'

export function useGetArtists(id: ComputedRef<string>) {
  const albumSize = ref(0)
  const mvSize = ref(0)
  const musicSize = ref(0)
  const detail = shallowRef<Nullable<GetArtistsResult>>(null)

  async function getArtists() {
    const [error, data] = await useRequest('getArtists')({ id: unref(id) })
    if (error)
      return
    albumSize.value = data.artist.albumSize
    mvSize.value = data.artist.mvSize
    musicSize.value = data.artist.musicSize
    detail.value = data
  }

  onMounted(() => {
    getArtists()
  })

  watch(id, getArtists)

  return {
    detail,
    albumSize,
    musicSize,
    mvSize,
  }
}

export function useGetArtistAlbum(id: ComputedRef<string>) {
  const albums = shallowRef<IAlbumDetail[]>([])

  async function getAlbum(page = 1) {
    const [error, data] = await useRequest('getArtistAlbum')({
      id: unref(id),
      limit: 12,
      offset: (page - 1) * 12,
    })
    if (error)
      return
    albums.value = data.hotAlbums
  }

  onMounted(() => {
    getAlbum()
  })

  watch(id, () => getAlbum())

  return {
    albums,
    getAlbum,
  }
}

export function useGetArtistMv(id: ComputedRef<string>) {
  const mvs = shallowRef<IMV[]>([])

  async function getMv(page = 1) {
    const [error, data] = await useRequest('getArtistMv')({
      id: unref(id),
      limit: 12,
      offset: (page - 1) * 12,
    })
    if (error)
      return
    mvs.value = data.mvs
  }

  onMounted(() => {
    getMv()
  })

  watch(id, () => getMv())

  return { mvs, getMv }
}

export function useGetArtistDesc(id: ComputedRef<string>) {
  const desc = shallowRef<Nullable<GetArtistDescResult>>(null)

  async function getArtistDesc() {
    const [error, data] = await useRequest('getArtistDesc')({ id: unref(id) })
    if (error)
      return
    desc.value = data
  }

  onMounted(() => {
    getArtistDesc()
  })

  watch(id, () => getArtistDesc())

  return { desc }
}

export function useGetTopArtists(id: ComputedRef<string>) {
  const topArtists = shallowRef<IArtist[]>([])

  async function getTopArtists() {
    const [error, data] = await useRequest('getTopArtists')({ limit: 6 })
    if (error)
      return
    topArtists.value = data.artists
  }

  onMounted(getTopArtists)

  return {
    topArtists,
  }
}
