import helper from 'api/helpers'
import jsonp from 'common/js/jsonp'

export function getRecommendBanner() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  }
  const options = {
    param: 'jsonpCallback'
  }

  return jsonp(url, data, options)
}

export function getRecommmend() {
  // const url = 'api/cgi-bin/musicu.fcg?'
  const url = 'api/getRecommmend'
  const data = {
    cgiKey: 'GetHomePage',
    '-': '1573637219524',
    data: {
      'comm': {
        'g_tk': 5381,
        'uin': '',
        'format': 'json',
        'inCharset': 'utf-8',
        'outCharset': 'utf-8',
        'notice': 0,
        'platform': 'h5',
        'needNewCode': 1
      },
      'MusicHallHomePage': {
        'module': 'music.musicHall.MusicHallPlatform',
        'method': 'MobileWebHome',
        'param': {'ShelfId': [101, 102, 161]}
      },
      'hotkey': {
        'module': 'tencent_musicsoso_hotkey.HotkeyService',
        'method': 'GetHotkeyForQQMusicMobile',
        'param': {'remoteplace': 'txt.miniapp.wxada7aab80ba27074', 'searchid': '1559616839293'}
      }
    }
  }
  return helper.get({url, data})
}

export function getRanking() {
  /**
   * https://u.y.qq.com/cgi-bin/musicu.fcg?_=1574230237795&data={%22comm%22:{%22g_tk%22:5381,%22uin%22:582821422,%22format%22:%22json%22,%22inCharset%22:%22utf-8%22,%22outCharset%22:%22utf-8%22,%22notice%22:0,%22platform%22:%22h5%22,%22needNewCode%22:1,%22ct%22:23,%22cv%22:0},%22topList%22:{%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:{}}}
   * @type {string}
   */
  // const url = 'api/cgi-bin/musicu.fcg?'
  const url = 'api/getRanking'
  const data = {
    '-': '1573637219524',
    data: {
      "comm": {
        "g_tk": 5381,
        "uin": 582821422,
        "format": "json",
        "inCharset": "utf-8",
        "outCharset": "utf-8",
        "notice": 0,
        "platform": "h5",
        "needNewCode": 1,
        "ct": 23,
        "cv": 0
      },
      "topList": {
        "module": "musicToplist.ToplistInfoServer",
        "method": "GetAll",
        "param": {}
      }
    }
  }
  return helper.get({url, data})
}

export function getRankingDetail(topId, period) {
  /**
   * https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI23229537678951417&g_tk=5381&loginUin=582821422&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A4%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222019-11-20%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D
   * * @type {string}
   */
  const url = 'api/cgi-bin/musicu.fcg?'
  const data = {
    '-': 'getUCGI7038683958086078',
    g_tk: 5381,
    loginUin: 582821422,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      "detail": {
        "module": "musicToplist.ToplistInfoServer",
        "method": "GetDetail",
        "param": {"topId": topId, "offset": 0, "num": 20, "period": period}
      },
      "comm": {"ct": 24, "cv": 0}
    }
  }
  return helper.get({url, data})
}

export function getSingerList() {
  /**
   * https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI23229537678951417&g_tk=5381&loginUin=582821422&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A4%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222019-11-20%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D
   * * @type {string}
   */
  const url = 'api/cgi-bin/musicu.fcg?'
  const data = {
    '-': 'getUCGI21038675370621762',
    g_tk: 5381,
    loginUin: 582821422,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      "comm": {"ct": 24, "cv": 0},
      "singerList": {
        "module": "Music.SingerListServer",
        "method": "get_singer_list",
        "param": {"area": -100, "sex": -100, "genre": -100, "index": -100, "sin": 0, "cur_page": 1}
      }
    }
  }
  return helper.get({url, data})
}

export function getSingerListJsonp(pageNum, pageSize) {
  const url = 'apc/v8/fcg-bin/v8.fcg'

  const data = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: pageSize,
    pagenum: pageNum,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  }
  const options = {
    param: 'jsonpCallback'
  }

  return jsonp(url, data, options)
}

export function getSearchLoveTip() {
  /**
   * https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI23229537678951417&g_tk=5381&loginUin=582821422&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A4%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222019-11-20%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D
   * * @type {string}
   */
  const url = 'apc/splcloud/fcgi-bin/gethotkey.fcg?'
  const data = {
    g_tk: 5381,
    loginUin: 582821422,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }
  return helper.get({url, data})
}

export function getSearchSimple(key) {
  /**
   * https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI23229537678951417&g_tk=5381&loginUin=582821422&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A4%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222019-11-20%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D
   * * @type {string}
   */
  const url = 'apc/splcloud/fcgi-bin/smartbox_new.fcg?'
  const data = {
    is_xml: 0,
    key: key,
    g_tk: 5381,
    loginUin: 582821422,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }
  const options = {
    param: 'jsonpCallback'
  }
  return jsonp(url, data, options)
}

export function getSearchClient(key, tag) {
  const url = 'apc/soso/fcgi-bin/client_search_cp?'
  const common = {
    ct: 24,
    qqmusic_ver: 1298,
    aggr: 0,
    catZhida: 1,
    lossless: 0,
    p: 1,
    n: 10,
    w: key,
    g_tk: 5381,
    loginUin: 582821422,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }
  const song = {
    remoteplace: 'txt.yqq.song',
    searchid: 54791353100210790,
    t: 0,
    aggr: 1,
    cr: 1,
    flag_qc: 0
  }
  const ablum = {
    remoteplace: 'txt.yqq.album',
    searchid: 85418593113252357,
    sem: 10,
    t: 8
  }
  const mv = {
    remoteplace: 'txt.yqq.mv',
    searchid: 133402672091539061,
    sem: 1,
    t: 12
  }
  let data = {}
  let target = {}
  if (tag === 'song') {
    target = song
  } else if (tag === 'ablum') {
    target = ablum
  } else if (tag === 'mv') {
    target = mv
  }
  data = Object.assign(target, common)
  console.log("parm==>", data)

  return helper.get({url, data})
}

export function getSongList(singerMid) {
  const url = 'api/cgi-bin/musicu.fcg?'
  const data = {
    g_tk: 5381,
    '-': 'getSingerSong07967918462176682',
    loginUin: '582821422',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      "comm": {"ct": 24, "cv": 0},
      "singerSongList": {
        "method": "GetSingerSongList",
        "param": {"order": 1, "singerMid": singerMid, "begin": 0, "num": 20},
        "module": "musichall.song_list_server"
      }
    }
  }

  return helper.get({url, data})
}

export function getSongPlayUrl(singerMid) {
  const url = 'api/cgi-bin/musicu.fcg?'
  const data = {
    '-': 'getplaysongvkey8601338410848023',
    g_tk: 5381,
    loginUin: 582821422,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      "req": {
        "module": "CDN.SrfCdnDispatchServer",
        "method": "GetCdnDispatch",
        "param": {"guid": "1497421650", "calltype": 0, "userip": ""}
      },
      "req_0": {
        "module": "vkey.GetVkeyServer",
        "method": "CgiGetVkey",
        "param": {
          "guid": "1497421650",
          "songmid": [singerMid],
          "songtype": [0],
          "uin": "582821422",
          "loginflag": 1,
          "platform": "20"
        }
      },
      "comm": {"uin": 582821422, "format": "json", "ct": 24, "cv": 0}
    }
  }

  return helper.get({url, data})
}

export function getLyric(mid) {
  /**
   *  https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=222035392&songtype=0&_=1570845554082&jsonpCallback=jsonp1 */
  const url = 'apc/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const data = {
    g_tk: 1928093487,
    inCharset: 'utf - 8',
    outCharset: 'utf - 8',
    notice: 0,
    format: 'json',
    songmid: '002PttbC4ShLBP',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: new Date().getTime()
  }
  return helper.get({url, data}, true)
}
