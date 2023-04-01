// 歌单创建者
export interface IPlayListCreator {
  nickname: string
  userId: number
  userType: number
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string // 背景图片
  backgroundImgIdStr: number
  authority: number
  mutual: boolean
  expertTags: string[]
  province: number // 省份 id
  city: number // 城市 id
  defaultAvatar: boolean
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  birthday: number
  vipType: number
  [key: string]: unknown
}

// 歌手信息
export interface IArtist {
  id: number
  name: string
  alias: string[]
  [key: string]: unknown
}
