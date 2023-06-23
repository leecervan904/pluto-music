import type { ISong } from '@pluto-music/api'
import { defineStore } from 'pinia'

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
  playlist: ISong[]
  playlistId: Nullable<string | number>
  ctime: number
}

const innerGetRandomSong = (playlist: ISong[], songId: number | string) => {
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

const isSongExist = (playlist: ISong[], songId: string | number) => {
  return playlist.some((v) => v.id === songId)
}

interface IGenPlayerStoreOption {
  define: typeof defineStore
  id?: string
  getSongDetail: (songId: number | string) => Promise<ISong>
  getSongUrl: (songId: number | string) => Promise<string>
  getRandomSong?: (playlist: ISong[], songId: number | string) => ISong
}

export const genPlayerStore = ({
  define,
  id,
  getSongDetail,
  getSongUrl,
  getRandomSong = innerGetRandomSong,
}: IGenPlayerStoreOption) => {
  let isAudioInitialized = false

  return define({
    id: id || 'player',
    state: (): PlayerStoreState => ({
      isPlay: false,
      audio: null,
      playMode: PlayMode.LOOP,
      song: null,
      playlist: [],
      playlistId: null,
      // 当前播放时间
      ctime: 0,
    }),
    getters: {
      songId: (state) => state.song?.id,
      songName: (state) => state.song?.name,
      songAr: (state) => state.song?.ar || [],
      songDt: (state) => state.song?.dt,
      songUrl: (state) => state.song?.url,
      songPicUrl: (state) => state.song?.al?.picUrl,
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
      onTimeUpdate() {
        this.setCTime(this.audio!.currentTime * 1000)
      },
      setCTime(time: number, play = false) {
        this.ctime = time
        if (play) {
          this.audio!.currentTime = this.ctime
        }
      },
      setAudio(audio: HTMLAudioElement) {
        this.audio = audio
      },
      setCurrentSong(song: ISong) {
        this.song = song
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
          const nextSong = getRandomSong(this.playlist, this.songId!)
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
        console.log('play next...')
        if (this.playMode === PlayMode.RANDOM) {
          const nextSong = getRandomSong(this.playlist, this.songId!)
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
      async playSong(song: ISong | string | number | undefined = undefined, addToPlaylist = true) {
        if (!song) {
          this.togglePlayNext()
          return
        }

        let realSong = song
        if (typeof song !== 'object') {
          realSong = await getSongDetail(song)
        }

        if (typeof realSong === 'object') {
          const url = await getSongUrl(realSong.id)
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
          // !this.isPlay && this.togglePlay()
        }
      },
      updatePlaylist(playlist: ISong[], playlistId: number | string) {
        if (this.playlistId === playlistId) return
        this.playlist = playlist
        this.playlistId = playlistId
        this.playSong()
      },
      clearPlaylist() {
        this.audio!.pause()
        this.isPlay = false
        this.playlist = []
        this.playlistId = null
        this.song = null
      },
      addToPlaylist(song: ISong) {
        if (this.playlist.some((v) => v.id === song.id)) {
          return
        }
        this.playlist.push(song)
      },
      deleteFromPlaylist(song: ISong) {
        const idx = this.playlist.findIndex((v) => v.id === song.id)
        if (idx > -1) {
          this.playlist.splice(idx, 1)
        }
      },
    },
  })
}
