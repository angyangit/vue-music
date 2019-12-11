import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, playing) {
    state.playing = playing
  },
  [types.SET_FULLSCREEN](state, fullScreen) {
    state.fullScreen = fullScreen
  },
  [types.SET_PLAYLIST](state, playList) {
    state.playList = playList
  },
  [types.SET_ORGINLIST](state, orginList) {
    state.orginList = orginList
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },
  [types.SET_CURRENT_SONG](state, currentSong) {
    state.currentSong = currentSong
  },
  [types.CHANGE_ITEM](state, item) {
    state.playList[item.index].url = item.url
  },
  [types.CHANGE_SONG](state, flag) {
    state.changeSong = flag
  }
}
export default mutations
