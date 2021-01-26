import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
import { axiosUtils } from '../common/js/request'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList () {
  const url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// type: 1
// json: 1
// utf8: 1
// onlysong: 0
// new_format: 1
// disstid: 7591776820
// g_tk_new_20200303: 5381
// g_tk: 5381
// loginUin: 0
// hostUin: 0
// format: json
// inCharset: utf8
// outCharset: utf-8
// notice: 0
// platform: yqq.json

export function getSongList (disstid) {
  const url = '/api/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: disstid,
    g_tk_new_20200303: 5381,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json'
  }
  return axiosUtils(url, data)

  // return axios.get(url, {
  //   params: data
  // }).then((res) => {
  //   return Promise.resolve(res.data)
  // })
}

export function getSongList1 (disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}
