import { axiosUtils } from '../common/js/request'

export function getMvList () {
  const url = '/uyqq/cgi-bin/musicu.fcg?'
  const data = {
    '-': 'mvlib22278981050000746',
    g_tk: 5381,
    sign: 'zzayr4o34a7mmni0sqrcc7620d52be3920c5d6a819c1a511659',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      comm: { ct: 24 },
      mv_tag:
        {
          module: 'MvService.MvInfoProServer',
          method: 'GetAllocTag',
          param: {}
        },
      mv_list: {
        module: 'MvService.MvInfoProServer',
        method: 'GetAllocMvInfo',
        param: {
          start: 0,
          size: 20,
          version_id: 7,
          area_id: 15,
          order: 1
        }
      }
    }
  }
  return axiosUtils(url, data)
}

export function getMvInfo (vid) {
  const url = '/uyqq/cgi-bin/musicu.fcg?'
  const mvparm = {
    g_tk: 5381,
    uin: 0,
    ct: 23,
    cv: 0,
    format: 'json',
    callback: 'qmv_jsonp_2',
    data: {
      getMVInfo: {
        module: 'video.VideoDataServer',
        method: 'get_video_info_batch',
        param: {
          vidlist: [vid],
          required: ['vid', 'sid', 'gmid', 'type', 'name', 'cover_pic', 'video_switch', 'msg'],
          from: 'h5.mvplay'
        }
      },
      getMVUrl: {
        module: 'gosrf.Stream.MvUrlProxy',
        method: 'GetMvUrls',
        param: {
          vids: [vid],
          from: 'h5.mvplay'
        },
        request_typet: 10001
      }
    },
    _: 1610763986278,
    platform: 'h5'
  }
  return axiosUtils(url, mvparm)
}
