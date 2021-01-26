import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_LOADING] (state, loading) {
    console.log('loading', loading, state)
    state.loading = loading
  },
  [types.SET_PLAYING_STATUS] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULLSCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCELIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAYING_MODE] (state, mode) {
    state.playingMode = mode
  },
  [types.SET_CURRENTINDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_RECOMMENDSONG] (state, item) {
    state.recommendSong = item
  },
  [types.SET_RANK] (state, item) {
    state.rank = item
  },
  [types.SET_SEARCH_HISTORY] (state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.SET_HISTORY_SONG_LIST] (state, historySongList) {
    state.historySongList = historySongList
  },
  [types.SET_FAVORITE_SONG_LIST] (state, favSongList) {
    state.favSongList = favSongList
  }
}
export default mutations
