import { defineStore } from 'pinia'
import type { ISong } from '@pluto-music/api/src'
import { useRequest } from '/@/utils/useRequest'

import { useLayoutStore } from './layout'

export enum PlayMode {
  LOOP = 0,
  SINGLE = 1,
  RANDOM = 2,
}

export interface PlayerStoreState {
  isPlay: boolean
  audio: Nullable<HTMLAudioElement>
  playMode: PlayMode
  song: Nullable<ISong>
  showPlaylist: boolean
  playlist: ISong[]
  playlistId: Nullable<string | number>
}

const handleGetRandomSong = (playlist: ISong[], songId: number | string) => {
  if (playlist.length === 1) return playlist[0]
  const length = playlist.length
  const currentIndex = playlist.findIndex((v) => v.id === songId)
  let randomIndex = currentIndex
  // 简单判断逻辑：只要下一首不是当前播放的即可
  while (randomIndex === currentIndex) {
    randomIndex = Math.floor(Math.random() * length)
  }

  return playlist[randomIndex]
}

const handleGetSongDetail = async (songId: number | string) => {
  const [error, data] = await useRequest('getSongDetail')({ id: songId })
  if (error) {
    console.log('[error] - get song detail', songId)
    throw new Error('[error] - get song detail')
  }

  return data.songs[0]
}

const handleGetSongUrl = async (songId: string | number) => {
  const [error, data] = await useRequest('getSongUrl')({ id: songId })
  if (error) {
    console.log('[error] - get song url', songId)
    throw new Error('[error] - get song url')
  }

  const url = data.data[0].url
  return url
}

const isSongExist = (playlist: ISong[], songId: string | number) => {
  return playlist.some((v) => v.id === songId)
}

let isAudioInitialized = false

export const usePlayerStore = defineStore({
  id: 'player',
  state: (): PlayerStoreState => ({
    isPlay: false,
    audio: null,
    playMode: PlayMode.LOOP,
    song: null,
    showPlaylist: false,
    playlist: [],
    playlistId: null,
  }),
  getters: {
    songId: (state) => state.song?.id,
    songName: (state) => state.song?.name,
    songAr: (state) => state.song?.ar,
    songDt: (state) => state.song?.dt,
    songUrl: (state) => state.song?.url,
    songPicUrl: (state) => state.song?.al?.picUrl,
    getAudio(): Nullable<HTMLAudioElement> {
      return this.audio
    },
  },
  actions: {
    initPlayer() {
      console.log('init player', isAudioInitialized)
      if (isAudioInitialized) return
      try {
        this.audio?.play()
        this.audio?.pause()
      } catch (error) {
        console.log('initialize player')
      }
      isAudioInitialized = true
    },
    setAudio(audio: HTMLAudioElement) {
      this.audio = audio
    },
    setCurrentSong(song: ISong) {
      this.song = song
    },
    addToPlaylist(song: ISong) {
      if (this.playlist.some((v) => v.id === song.id)) {
        return
      }
      this.playlist.push(song)
    },
    togglePlayMode() {
      if (this.playMode === PlayMode.LOOP) {
        this.playMode = PlayMode.SINGLE
      } else if (this.playMode === PlayMode.SINGLE) {
        this.playMode = PlayMode.RANDOM
      } else {
        this.playMode = PlayMode.LOOP
      }
    },
    togglePlayPrev() {
      if (this.playMode === PlayMode.RANDOM) {
        const nextSong = handleGetRandomSong(this.playlist, this.songId!)
        this.playSong(nextSong)
      } else {
        const index = this.playlist.findIndex((v) => v.id === this.songId)
        // 处理边界：当前播放为播放列表第一首时，切换到最后一首
        const prevSong =
          index === 0 ? this.playlist[this.playlist.length - 1] : this.playlist[index - 1]
        this.playSong(prevSong)
      }
    },
    togglePlayNext() {
      if (this.playMode === PlayMode.RANDOM) {
        const nextSong = handleGetRandomSong(this.playlist, this.songId!)
        this.playSong(nextSong)
      } else {
        const index = this.playlist.findIndex((v) => v.id === this.songId)
        // 处理边界：当前播放为最后一首时，切换到第一首
        const nextSong =
          index === this.playlist.length - 1 ? this.playlist[0] : this.playlist[index + 1]
        this.playSong(nextSong)
      }
    },
    togglePlay() {
      // 没有 songId(即播放列表为空)时不能播放
      // Todo：有些歌曲没有版权，需要兼容
      if (!this.songId) {
        console.log('error - 播放列表为空')
        // Toast.fail({
        //   message: '播放列表为空!\n快去添加喜欢的歌曲吧~',
        //   closeOnClick: true,
        //   className: 'toast--fail'
        // })
        return
      }
      if (this.isPlay) {
        this.audio?.pause()
      } else {
        this.audio?.play()
      }
      this.isPlay = !this.isPlay
    },
    toggleShowPlaylist(val: boolean) {
      this.showPlaylist = val
    },
    async playSong(
      song: ISong | string | number | undefined = undefined,
      toPlayer = true,
      addToPlaylist = true,
    ) {
      if (!song) {
        this.togglePlayNext()
        return
      }

      let realSong = song
      if (typeof song !== 'object') {
        realSong = await handleGetSongDetail(song)
      }

      const layoutStore = useLayoutStore()

      if (typeof realSong === 'object') {
        // 歌曲正在播放，切换到播放界面
        if (realSong.id === this.songId && !layoutStore.showPlayer) {
          layoutStore.toggleShowPlayer(true)
          return
        }

        const url = await handleGetSongUrl(realSong.id)
        realSong.url = url
        if (!url) {
          console.log('暂无资源')
          return
        }

        // 添加到播放列表
        addToPlaylist && !isSongExist(this.playlist, realSong.id) && this.addToPlaylist(realSong)
        // 提交歌曲信息
        this.setCurrentSong(realSong)
        // 保证歌曲会播放
        !this.isPlay && this.togglePlay()
      }

      // 最后，切换到播放界面
      toPlayer && layoutStore.toggleShowPlayer(true)

      // this.song = song
      // this.audio?.play()
    },
    updatePlaylist(playlist: ISong[], playlistId: number | string) {
      if (this.playlistId === playlistId) return
      this.playlist = playlist
      this.playlistId = playlistId
      this.playSong()
    },
  },
})
