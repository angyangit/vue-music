import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_ORGINLIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    // index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.CHANGE_SONG, !state.changeSong)
}

export const changeItem = function ({commit, state}, item) {
  commit(types.CHANGE_ITEM, item)
  // commit(types.SET_ORGINLIST, state)
  commit(types.SET_CURRENT_INDEX, item.index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
