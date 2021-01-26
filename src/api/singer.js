import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })
  return jsonp(url, data, options)
}

export function getSongPlayCheckInfo (mid) {
  const url = '/uyqq/cgi-bin/musics.fcg'

  const data = Object.assign({}, commonParams, {
    '-': 'getplaysongvkey8977259334328229',
    platform: 'yqq.json',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    sign: 'zzash8j7oirkarc1cgp43d65febd283fad5aae83f32de1e8eaa',
    format: 'json',
    data: {
      req: {
        module: 'CDN.SrfCdnDispatchServer',
        method: 'GetCdnDispatch',
        param: {
          guid: '5878296281',
          calltype: 0,
          userip: ''
        }
      },
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '5878296281',
          songmid: ['00390cuQ14GAOf'],
          songtype: [0],
          uin: '0',
          loginflag: 1,
          platform: '20'
        }
      },
      comm: {
        uin: 0,
        format: 'json',
        ct: 24,
        cv: 0
      }
    }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingPlayInfo (mid) {
  const url = '/uyqq/cgi-bin/musicu.fcg?'
  const data = {
    g_tk: 5381,
    '-': 'getplaysongvkey3192223764244566',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param:
          {
            guid: '1497421650',
            songmid: [mid],
            songtype: [0],
            uin: '0',
            loginflag: 1,
            platform: '20'
          }
      },
      comm: {
        uin: 0,
        format: 'json',
        ct: 24,
        cv: 0
      }
    }
  }
  return axios.get(url, {
    params: data
  }).then((response) => {
    return Promise.resolve(response.data)
  }).catch((e) => {
    console.log(e)
  })
}

// 歌词 url:https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg?nobase64=1&musicid=278469889&-=jsonp1&g_tk_new_20200303=1302390519&g_tk=1302390519&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0
// nobase64: 1
// musicid: 278469889
// -: jsonp1
// g_tk_new_20200303: 1302390519
// loginUin: 0
// hostUin: 0
// platform: yqq.json
// needNewCode: 0
// https://c.y.qq.com/
export function getLyric (mid) {
  const url = '/api/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg'

  const data = {
    '-': 'MusicJsonCallback_lrc',
    pcachetime: 1610439925170,
    songmid: mid,
    g_tk_new_20200303: 249400094,
    g_tk: 249400094,
    loginUin: 582821422,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
