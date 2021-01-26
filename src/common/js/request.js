import axios from 'axios'
import store from '../../store'
import { SET_LOADING } from '../../store/mutation-types'
import { ERR_OK } from '../../api/config'

export function axiosUtils (url, data) {
  store.commit(SET_LOADING, true)
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data
    }).then((res) => {
      store.commit(SET_LOADING, false)
      if (res.data.code === ERR_OK) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch((err) => {
      store.commit(SET_LOADING, false)
      reject(err)
    })
  })
}
