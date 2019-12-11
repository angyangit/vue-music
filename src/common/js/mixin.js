import {mapGetters, mapMutations, mapActions} from 'vuex'
import * as Mode from 'common/js/config'
import {SET_FULLSCREEN, SET_PLAYING_STATE, SET_CURRENT_INDEX, SET_CURRENT_SONG, CHANGE_SONG} from "store/mutation-types"
import {getSongPlayUrl, getLyric} from "api/server"

export const playerMixin = {
  computed: {
    getPlayState() {
      return this.playing ? 'icon-play' : 'icon-pause'
    },
    getPlayMode() {
      if (this.mode === Mode.random) {
        return 'icon-suji'
      } else if (this.mode === Mode.loop) {
        return 'icon-loop'
      } else {
        return 'icon-leibiao'
      }
    },
    getFav() {
      return 'icon-like'
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'playing',
      'mode',
      'currentSong',
      'changeSong',
      'currentIndex'
    ])
  },
  methods: {
    ...mapMutations({
      setFullScreen: SET_FULLSCREEN,
      setPlayingState: SET_PLAYING_STATE,
      setCurrentIndex: SET_CURRENT_INDEX,
      setCurrentSong: SET_CURRENT_SONG,
      changeSongM: CHANGE_SONG
    }),
    ...mapActions([
      'selectPlay',
      'changeItem'
    ]),
    ready() {
      this.songReady = true
    },
    prePlay() {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        this.changeSongM(!this.changeSong)
        if (!this.playing) {
          this.togglePlay()
        }
      }
      this.songReady = false
    },
    nextPlay() {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        this.changeSongM(!this.changeSong)
        if (!this.playing) {
          this.togglePlay()
        }
      }
      this.songReady = false
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlayingState(true)
    },
    togglePlay() {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    _getSongPlayUrl(song) {
      getSongPlayUrl(song.mid).then(res => {
        if (res.req_0.code === 0) {
          let playUrl = res.req_0.data.sip[1] + res.req_0.data.midurlinfo[0].purl
          this.changeItem({index: song.id, url: playUrl})
          this.changeSongM(!this.changeSong)
        }
      })
    }
  },
  watch: {
    playing(playState) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        playState ? audio.play() : audio.pause()
      })
    },
    changeSong(flag) {
      let song = this.currentSong
      if (song.url === '') {
        this._getSongPlayUrl(song)
      } else {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
        }, 1000)
      }
      if (this.lyricArr) {
        for (let key in this.lyricArr) {
          if (key === song.mid) {
            this.lyricStr = this.lyricArr[key]
            return
          }
        }
      }
      getLyric(song.mid).then(res => {
        console.log('getLyric=>', song.mid)
        this.lyricArr[song.mid] = res.lyric
        this.lyricStr = res.lyric
      })
    }
  }
}
