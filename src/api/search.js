import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import { axiosUtils } from '../common/js/request'

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function search (query, page = 1, zhida = 1, perpage = 20) {
  const url = '/api/soso/fcgi-bin/search_for_qq_cp?'
  const data = {
    _: 1610934810821,
    g_tk: 5381,
    uin: '',
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: zhida,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all'
  }

  return axiosUtils(url, data)
}
