import { playMode } from '../common/js/config'
import { loadSearch, loadHistorySongList, loadFavorite } from '../common/js/cache'

const state = {
  loading: false,
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  playingMode: playMode.sequence,
  currentIndex: -1,
  recommendSong: {},
  rank: {},
  searchHistory: loadSearch(),
  historySongList: loadHistorySongList(),
  favSongList: loadFavorite()
}

export default state
