export const getSinger = state => state.singer
export const getLoadingState = state => state.loading
export const getPlayingStatus = state => state.playing
export const getFullScreen = state => state.fullScreen
export const getPlayList = state => state.playList
export const getPlaySequenceList = state => state.sequenceList
export const getPlayingMode = state => state.playingMode
export const getCurrentIndex = state => state.currentIndex
export const getCurrentSong = state => {
  return state.playList[state.currentIndex] || {}
}
export const getRecommendSong = state => state.recommendSong
export const getRank = state => state.rank
export const getSearchHistory = state => state.searchHistory
export const getHistorySongList = state => state.historySongList
export const getFavoriteSongList = state => state.favSongList
