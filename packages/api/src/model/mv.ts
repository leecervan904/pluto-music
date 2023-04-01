import { IdTag } from "./common";
import { IArtist } from "./Role";

export interface IMV {
  id: IdTag
  name: string
  status: number
  artist: IArtist
  imgurl16v9: string
  artistName: string
  imgUrl: string
  duration: number
  playCount: number
  publishTime: string
  subed: boolean
}
