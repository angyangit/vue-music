import * as types from './mutation-types'
import {
  saveSearch,
  deleteSearch,
  clearSearch,
  addHistorySongList,
  saveFavorite,
  deleteFavorite
} from '../common/js/cache'
import { playMode } from '../common/js/config'
import { shuffle } from '../common/js/util'

export const selectPlayAction = ({ commit, state }, { list, index }) => {
  console.log('selectPlayAction', list)
  commit(types.SET_SEQUENCELIST, list)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_PLAYING_STATUS, true)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_CURRENTINDEX, index)
}

export const insertSong = function ({ commit, state }, song) {
  const playlist = state.playList.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  const currentSong = playlist[currentIndex]
  const fpIndex = findIndex(playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  const currentSIndex = findIndex(sequenceList, currentSong) + 1
  const fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCELIST, sequenceList)
  commit(types.SET_CURRENTINDEX, currentIndex)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATUS, true)
}

export const saveSearchHistory = ({ commit, state }, searchKey) => {
  commit(types.SET_SEARCH_HISTORY, saveSearch(searchKey))
}

export const deleteSearchHistory = function ({ commit }, pos) {
  console.log('deleteSearchHistory', pos)
  commit(types.SET_SEARCH_HISTORY, deleteSearch(pos))
}

export const clearSearchHistory = function ({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const deleteSong = function ({ commit, state }, song) {
  const playlist = state.playList.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  const pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  const sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCELIST, sequenceList)
  commit(types.SET_CURRENTINDEX, currentIndex)
  if (!playlist.length) {
    commit(types.SET_PLAYING_STATUS, false)
  } else {
    commit(types.SET_PLAYING_STATUS, true)
  }
}

export const deleteSongList = function ({ commit }) {
  commit(types.SET_CURRENTINDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCELIST, [])
  commit(types.SET_PLAYING_STATUS, false)
}

export const addHistoryList = ({ commit, state }, song) => {
  commit(types.SET_HISTORY_SONG_LIST, addHistorySongList(song))
}

export const addFavoriteList = ({ commit, state }, song) => {
  console.log('addFavoriteList', song)
  commit(types.SET_FAVORITE_SONG_LIST, saveFavorite(song))
}
export const delFavoriteList = ({ commit, state }, song) => {
  commit(types.SET_FAVORITE_SONG_LIST, deleteFavorite(song))
}
