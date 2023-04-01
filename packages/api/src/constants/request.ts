export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
}

export enum RequestPath {
  // common
  GET_BANNER = '/banner',
  GET_PERSONALIZED = '/personalized',

  // album
  GET_ALBUM_DETAIL = '/album',
  GET_ALBUM_NEWEST = '/album/newest',
  GET_ALL_ALBUM = '/artist/album',
  GET_TOP_ALBUM = '/album/new',

  // artist
  GET_ARTIST_CATE = '/artist/list',
  GET_ARTISTS = '/artists',
  GET_ARTIST_MV = '/artist/mv',
  GET_ARTIST_ALBUM = '/artist/album',
  GET_ARTIST_DESC = '/artist/desc',
  GET_ARTIST_DETAIL = '/artist/detail',
  GET_SIMI_ARTIST = '/simi/artist',
  GET_TOP_ARTIST = '/top/artists',

  // playlist
  GET_COLLECT_PLAYLIST_USERS = '/playlist/subscribers',
  GET_PLAYLIST_CATLIST = '/playlist/catlist',
  GET_PLAYLIST_DETAIL = '/playlist/detail',
  GET_PLAYLIST_HOT = '/playlist/hot',
  GET_RELATED_PLAYLIST = '/related/playlist',
  GET_SIM_PLAYLIST = '/simi/playlist',
  GET_TOP_PLAYLIST = '/top/playlist',

  // rank
  GET_ALL_RANK_DETAIL = '/toplist',
  GET_RANK_LIST = '/playlist/detail',
  GET_TOPLIST_DETAIL = '/toplist/detail',

  // search
  GET_SEARCH = '/search',
  GET_SEARCH_DEFAULT = '/search/default',
  GET_SEARCH_HOT_DETAIL = '/search/hot/detail',
  GET_SEARCH_MULTIMATCH = '/search/multimatch',
  GET_SEARCH_SUGGEST = '/search/suggest',

  // song
  GET_LYRIC = '/lyric',
  GET_SIM_SONG = '/simi/song',
  GET_SONG_DETAIL = '/song/detail',
  GET_SONG_URL = '/song/url',
  GET_TOP_SONG = '/top/song',
  GET_PERSONALIZED_SONG = '/personalized/newsong',

  // comment
  GET_COMMENT = '/comment/new',
  GET_MV_COMMENT = '/comment/mv',
  GET_PLAYLIST_COMMENT = '/comment/playlist',
  GET_ALBUM_COMMENT = '/comment/album',
  GET_SONG_COMMENT = '/comment/music',
  GET_COMMENT_FLOOR = '/comment/floor',

  // mv
  GET_MV_URL = '/mv/url',
  GET_MV_DETAIL = '/mv/detail',
  GET_VIDEO_GROUP = '/video/group',
  GET_SIMI_MV = '/simi/mv',
  GET_PERSONALIZED_MV = '/personalized/mv',
  GET_RELATED_ALLVIDEO = '/related/allvideo',
}
