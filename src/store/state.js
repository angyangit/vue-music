import * as mode from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  orginList: [],
  mode: mode.sequence,
  currentIndex: -1,
  currentSong: {},
  changeSong: true
}
export default state
