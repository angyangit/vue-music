import originJsonp from 'jsonp'
import store from '../../store/index'
import { SET_LOADING } from '../../store/mutation-types'

export default function jsonp (url, data, option) {
  store.commit(SET_LOADING, true)
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      store.commit(SET_LOADING, false)
      console.log('jsonp', err, data)
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param (data) {
  let url = ''
  for (var k in data) {
    const value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
