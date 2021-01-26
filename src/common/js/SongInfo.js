import { getLyric, getSingPlayInfo } from '../../api/singer'
import { Base64 } from 'js-base64'
import { ERR_OK } from '../../api/config'

export default class SongInfo {
  constructor ({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    // this.url = url
  }

  getSongUrl () {
    if (this.url) {
      return Promise.resolve(this.url)
    }
    const mid = this.mid
    return new Promise((resolve, reject) => {
      getSingPlayInfo(mid).then(res => {
        if (res.code === ERR_OK) {
          const data = res.req_0.data
          const fileName = data.midurlinfo[0].filename
          const vkey = data.midurlinfo[0].vkey
          this.url = `https://isure.stream.qqmusic.qq.com/${fileName}?guid=1497421650&vkey=${vkey}&fromtag=66&uin=0`
          resolve(this.url)
        } else {
          reject(new Error('url error'))
        }
      })
    })
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    const mid = this.mid
    return new Promise((resolve, reject) => {
      getLyric(mid).then(res => {
        if (res.code === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('lyric error'))
        }
      })
    })
  }
}

export function createSongInfo (musicData) {
  return new SongInfo({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: ''
  })
}

export function createSongInfoByRecommed (item) {
  return new SongInfo({
    id: item.id,
    mid: item.mid,
    singer: filterSinger(item.singer),
    name: item.name,
    album: item.album.name,
    duration: item.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`,
    url: ''
  })
}

export function filterSinger (singers) {
  if (!singers || !singers.length || !Array.isArray(singers)) {
    return ''
  }
  const res = []
  singers.forEach(singer => {
    res.push(singer.name)
  })
  return res.join(' | ')
}
