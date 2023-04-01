import { http } from '../utils/http'

async function getTopPlaylist() {
  const [error, data] = await http('getTopPlaylist')({})
  if (error) {
    console.log(error)
  }
  return data
}

async function PlaylistSquare() {
  const data = await getTopPlaylist()

  return (
    <div>
      <div className="w-7/10 m-auto overflow-hidden">
        <div className="text-3xl font-bold underline bg-red-400">推荐歌单</div>

        <div className="flex flex-wrap justify-between">
          {(data?.playlists || []).map((v) => (
            <div className="w-40" key={v.id}>
              <img className="w-full" src={`${v.coverImgUrl}?param=200y200`} alt={v.name} />
              <div>{v.name}</div>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PlaylistSquare
