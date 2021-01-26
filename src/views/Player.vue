<template>
  <section class='player-root' v-show='getPlayList.length'>
    <transition name='full'
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                v-on:leave="leave"
                v-on:after-leave="afterLeave">
      <section class='full-player-root' v-show='getFullScreen'>
        <section class='full-bg-warpper'>
          <img class='bg-img' :src='getCurrentSong.image'>
        </section>
        <section class='full-middle-warper'
                 @touchstart.prevent='touchStart'
                 @touchmove.prevent='touchMove'
                 @touchend='touchEnd'
                 ref='middleWarper'>
          <section class='middle-left'
                   ref='middleLeft'>
            <section class='full-top-warper'>
              <i class='icon-back' @click='back'/>
              <h1 class='title' v-html='getCurrentSong.name'></h1>
              <h2 class='des' v-html='getCurrentSong.singer'></h2>
            </section>
            <section class='cd-warper'>
              <section class='cd-img-warper' ref='cdWraper'>
                <section class='img-warper' :class='getCdRotate'>
                  <img class='cd-img' :src='getCurrentSong.image'>
                </section>
              </section>
            </section>
            <section class='lyric-warper'>
              <h2 class='des'>{{this.activeLyricTxt}}</h2>
            </section>
          </section>
          <section class='middle-right'
                   ref='middleRight'>
            <section class='full-top-warper'>
              <i class='icon-back' @click='back'/>
              <h1 class='title' v-html='getCurrentSong.name'></h1>
            </section>
            <section class='lyric-full-warper'>
              <scroll-view v-if='currentLyric'
                           class='lyric-scroll'
                           eventPassthrough='horizontal'
                           :reqData='currentLyric&&currentLyric.lines'
                           ref='lyricScrollview'>
                <div class='lyric-list'>
                  <p class='lyric-txt'
                     ref='lyricLine'
                     :class='{ "lyric-active":currentLineNum===index}'
                     v-for='(item,index) in currentLyric.lines'
                     :key='index'>{{item.txt}}</p>
                </div>
              </scroll-view>
            </section>
          </section>
        </section>
        <section class='full-buttom-warper'>
          <div class="dot-wrapper">
            <span class="dot dot-left" :class="{'dot-active':middleCurrentShow==='cd'}"></span>
            <span class="dot" :class="{'dot-active':middleCurrentShow==='lyric'}"></span>
          </div>
          <section class='durtion-warper'>
            <span class='cur-time'>{{currentTime}}</span>
            <span class='total-time'>{{songDurtion}}</span>
            <section class='progress-warper'>
              <div class='progress-content'>
                <progress-bar :progressPercent='progressPercent'
                              @changeProgress='changeProgress'/>
              </div>
            </section>
          </section>
          <section class='full-play-control-warper'>
            <i class='icon-play'
               :class='getPlayModeIcon'
               @click='toggleMode'></i>
            <i class='icon-play icon-prev'
               @click='prevPlay'></i>
            <i class='icon-play icon-big'
               :class='getPlayStatusIcon'
               @click='togglePlayStatus'></i>
            <i class='icon-play icon-next'
               @click='nextPlay'></i>
            <i class='icon-play'
               :class='getFavActive'
               @click='saveFavoriteSong'></i>
          </section>
        </section>
      </section>
    </transition>
    <transition name='min'>
      <section class='min-player-root' v-show='!getFullScreen' @click='toFullScreen'>
        <div class='circle-warper'>
          <circle-progress-bar :progressPercent='progressPercent'>
            <section class='img-warper' :class='getCdRotate'>
              <img class='cd-img' :src='getCurrentSong.image'>
            </section>
          </circle-progress-bar>
        </div>
        <section class='min-player-container'>
          <i class='icon-play'
             :class='getPlayStatusIcon'
             @click.stop='togglePlayStatus'></i>
          <i class='icon-play icon-next'
             @click.stop='nextPlay'></i>
          <i class='icon-play icon-playlist'
             @click.stop='showPlayListPop'></i>
        </section>
        <section class='info-root'>
          <h1 class='name'>{{getCurrentSong.name}}</h1>
          <h1 class='singer'>{{getCurrentSong.singer}}</h1>
        </section>
      </section>
    </transition>
    <play-list-pop ref='playListPop'
                   @popTogglePlayStatus='popTogglePlayStatus'/>
    <audio ref='audio'
           :src='songUrl'
           @error='audioError'
           @loadedmetadata='readPlaying'
           @timeupdate='songTimeUpdate'
           @ended='ended'
           @canplay='canplay'
           @durationchange='durationchange'/>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import {
  SET_FULLSCREEN,
  SET_PLAYLIST,
  SET_PLAYING_STATUS,
  SET_CURRENTINDEX,
  SET_PLAYING_MODE,
  SET_SEQUENCELIST
} from '../store/mutation-types'
import animations from 'create-keyframe-animation'
import { prefixStyle } from '../common/js/dom'
import moment from 'moment'
import ProgressBar from '../components/ProgressBar'
import CircleProgressBar from '../components/CircleProgressBar'
import { playMode } from '../common/js/config'
import { shuffle } from '../common/js/util'
import Lyric from 'lyric-parser'
import ScrollView from '../components/ScrollView'
import PlayListPop from '../components/PlayListPop'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
  name: 'Player',
  data () {
    return {
      readPlay: false,
      currentTime: 0,
      songDurtion: 0,
      curSongDurtion: 0,
      progressPercent: 0,
      middleCurrentShow: 'cd',
      currentLyric: null,
      currentLineNum: 0,
      activeLyricTxt: '',
      songUrl: ''
    }
  },
  components: {
    ScrollView,
    ProgressBar,
    CircleProgressBar,
    PlayListPop
  },
  computed: {
    getFavActive () {
      const index = this.getFavoriteSongList.findIndex((item) => {
        return item.id === this.getCurrentSong.id
      })
      return index > -1 ? 'icon-favorite' : 'icon-not-favorite'
    },
    getPlayStatusIcon () {
      return this.getPlayingStatus ? ' icon-pause' : ' icon-playing'
    },
    getCdRotate () {
      return this.getPlayingStatus ? 'cd-play' : 'cd-play cd-pause'
    },
    getPlayModeIcon () {
      return this.getPlayingMode === playMode.sequence ? 'icon-sequence' : this.getPlayingMode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'getPlayingStatus',
      'getFullScreen',
      'getPlayList',
      'getPlayingMode',
      'getCurrentIndex',
      'getCurrentSong',
      'getPlaySequenceList',
      'getFavoriteSongList'
    ])
  },
  created () {
    this.touch = {}
  },
  methods: {
    touchStart (e) {
      const touchStartX = e.touches[0].pageX
      const touchStartY = e.touches[0].pageY
      this.touch.touchStartX = touchStartX
      this.touch.touchStartY = touchStartY
      this.touch.init = true
    },
    touchMove (e) {
      if (!this.touch.init) return
      const touchStartX = e.touches[0].pageX
      const touchStartY = e.touches[0].pageY
      const deltaX = touchStartX - this.touch.touchStartX
      const deltaY = touchStartY - this.touch.touchStartY
      if (Math.abs(deltaX) < Math.abs(deltaY)) return
      console.log(deltaX)
      let transWidth = deltaX
      if (this.middleCurrentShow === 'cd') {
        if (deltaX > 0) return
      } else {
        if (deltaX < 0) return
        transWidth = -window.innerWidth + deltaX
      }
      this.touch.offsetWidth = deltaX
      this.touch.percent = Math.abs(deltaX / window.innerWidth)
      this.$refs.middleWarper.style[transform] = `translateX(${transWidth}px)`
      if (this.middleCurrentShow === 'cd') {
        this.$refs.middleLeft.style.opacity = 1 - this.touch.percent * 2
        this.$refs.middleRight.style.opacity = this.touch.percent * 2
      } else {
        this.$refs.middleLeft.style.opacity = this.touch.percent * 2
        this.$refs.middleRight.style.opacity = 1 - this.touch.percent * 2
      }
      this.$refs.middleWarper.style[transitionDuration] = 0
      this.$refs.middleLeft.style[transitionDuration] = 0
      this.$refs.middleRight.style[transitionDuration] = 0
    },
    touchEnd () {
      if (this.touch.percent > 0.2) {
        if (this.middleCurrentShow === 'cd') {
          if (this.touch.offsetWidth > 0) return
          this.$refs.middleLeft.style.opacity = 0
          this.$refs.middleRight.style.opacity = 1
          this.$refs.middleWarper.style[transform] = `translateX(${-window.innerWidth}px)`
          this.$refs.middleWarper.style[transitionDuration] = '500ms'
          this.$refs.middleLeft.style[transitionDuration] = '500ms'
          this.$refs.middleRight.style[transitionDuration] = '500ms'
          this.middleCurrentShow = 'lyric'
        } else {
          if (this.touch.offsetWidth < 0) return
          this.$refs.middleWarper.style[transform] = 'translateX(0px)'
          this.$refs.middleLeft.style.opacity = 1
          this.$refs.middleRight.style.opacity = 0
          this.$refs.middleWarper.style[transitionDuration] = '500ms'
          this.$refs.middleLeft.style[transitionDuration] = '500ms'
          this.$refs.middleRight.style[transitionDuration] = '500ms'
          this.middleCurrentShow = 'cd'
        }
      } else {
        if (this.middleCurrentShow === 'cd') {
          this.$refs.middleLeft.style.opacity = 1
          this.$refs.middleRight.style.opacity = 0
          this.$refs.middleWarper.style[transform] = 'translateX(0px)'
          this.$refs.middleWarper.style[transitionDuration] = '500ms'
        } else {
          this.$refs.middleLeft.style.opacity = 0
          this.$refs.middleRight.style.opacity = 1
          this.$refs.middleWarper.style[transform] = `translateX(${-window.innerWidth}px)`
          this.$refs.middleWarper.style[transitionDuration] = '500ms'
        }
      }
      this.touch.init = false
    },
    back () {
      this.setFullScreen(false)
    },
    toFullScreen () {
      this.setFullScreen(true)
    },
    ...mapMutations(
      {
        setFullScreen: SET_FULLSCREEN,
        setPlaySongList: SET_PLAYLIST,
        setPlayStatus: SET_PLAYING_STATUS,
        setCurrentIndex: SET_CURRENTINDEX,
        setPlayMode: SET_PLAYING_MODE,
        setSequenceList: SET_SEQUENCELIST
      }
    ),
    enter (el, done) {
      const { transX, tranY, scale } = this.getCdAnimInfo()
      const points = {
        0: {
          transform: `translate3d(${transX}px,${tranY}px,0) scale(${scale})`
        },
        80: {
          transform: 'translate3d(0,0,0) scale(1.2)'
        },
        100: {
          transform: 'translate3d(0,0,0) scale(1)'
        }
      }

      animations.registerAnimation({
        name: 'cdAnim',
        animation: points,
        presets: {
          duration: 500,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWraper, 'cdAnim', done)
      console.log('enter')
    },
    afterEnter () {
      animations.unregisterAnimation('cdAnim')
      this.$refs.cdWraper.style.animation = ''
      console.log('afterEnter')
    },
    leave (el, done) {
      const { transX, tranY, scale } = this.getCdAnimInfo()
      this.$refs.cdWraper.style.transition = 'all 0.5s'
      this.$refs.cdWraper.style[transform] = `translate3d(${transX}px,${tranY}px,0) scale(${scale})`
      this.$refs.cdWraper.addEventListener('transitionend', done)
      console.log('leave')
    },
    afterLeave (el) {
      this.$refs.cdWraper.style.transition = ''
      this.$refs.cdWraper.style[transform] = ''
      console.log('afterLeave')
    },
    getCdAnimInfo () {
      const marginLeft = 10
      const marginBottom = 10
      const marginTop = 70
      const targetWidth = 50
      const originWidth = window.innerWidth * 0.8
      const scale = targetWidth / originWidth
      const transX = -(window.innerWidth / 2 - targetWidth / 2 - marginLeft)
      const tranY = window.innerHeight - marginTop - targetWidth / 2 - marginBottom
      return {
        scale,
        transX,
        tranY
      }
    },
    _getSongUrl () {
      this.getCurrentSong.getSongUrl().then(res => {
        console.log('_getSongUrl', res)
        if (!res) return
        this.songUrl = res
        this._getLyric()
      }).catch(() => {
        this.currentLyric = null
        this.currentLineNum = 0
        this.activeLyricTxt = ''
      })
      // setTimeout(() => {
      //   console.log('setTimeout', this.readPlay)
      //   if (!this.readPlay) {
      //     this.readPlay = true
      //     this.startPlay()
      //   }
      // }, 3000)
    },
    _getLyric () {
      this.getCurrentSong.getLyric().then(res => {
        this.currentLyric = new Lyric(res, this.handlerLyric)
        if (this.setPlayStatus) {
          this.currentLyric.play()
        }
      }).catch(() => {
        this.currentLyric = null
        this.currentLineNum = 0
        this.activeLyricTxt = ''
      })
    },
    handlerLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        const lineEl = this.$refs.lyricLine[lineNum - 5]
        lineEl && this.$refs.lyricScrollview.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricScrollview.scrollTo(0, 0, 1000)
      }
      this.activeLyricTxt = txt
    },
    resetPlaylist (url) {
      const playlist = this.getPlayList
      // const newPlayList = JSON.parse(JSON.stringify(playlist))
      const curSong = playlist[this.getCurrentIndex]
      curSong.url = url
      this.setPlaySongList(playlist)
      this.setSequenceList(playlist)
      console.log(playlist, curSong, this.getPlayList)
    },
    togglePlayStatus () {
      console.log('togglePlayStatus')
      this.setPlayStatus(!this.getPlayingStatus)
      // this.playControl()
      if (!this.readPlay) return
      this.getPlayingStatus ? this.$refs.audio.play() : this.$refs.audio.pause()
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    toggleMode () {
      const mode = (this.getPlayingMode + 1) % 3
      this.setPlayMode(mode)
      let list = this.getPlaySequenceList
      if (playMode.random === this.getPlayingMode) {
        list = shuffle(list)
      }
      this.resetCurrentIndex(list)
      this.setPlaySongList(list)
    },
    resetCurrentIndex (list) {
      const index = list.findIndex(item => {
        return item.id === this.getCurrentSong.id
      })
      this.setCurrentIndex(index)
    },
    prevPlay () {
      if (!this.readPlay) return
      const currentIndex = this.getCurrentIndex
      const playList = this.getPlayList
      if (currentIndex > 0) {
        this.setCurrentIndex(currentIndex - 1)
      } else {
        this.setCurrentIndex(playList.length - 1)
      }
      if (!this.getPlayingStatus) {
        this.togglePlayStatus()
      }
      this.readPlay = false
    },
    nextPlay () {
      if (!this.readPlay) return
      const currentIndex = this.getCurrentIndex
      const playList = this.getPlayList
      if (currentIndex > playList.length - 2) {
        this.setCurrentIndex(0)
      } else {
        this.setCurrentIndex(currentIndex + 1)
      }
      if (!this.getPlayingStatus) {
        this.togglePlayStatus()
      }
      this.readPlay = false
    },
    ended () {
      if (playMode.loop === this.getPlayingMode) {
        this.loop()
      } else {
        this.nextPlay()
      }
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlayStatus(true)
    },
    readPlaying () {
      console.log('readPlaying loadedmetadata ', this.readPlay)
      if (!this.readPlay) {
        this.readPlay = true
        this.startPlay()
      }
    },
    durationchange (e) {
      console.log('durationchange', e)
      if (!this.readPlay) {
        this.readPlay = true
        this.startPlay()
      }
    },
    canplay () {
      console.log('canplay')
      if (!this.readPlay) {
        this.readPlay = true
        this.startPlay()
      }
    },
    startPlay () {
      console.log('startPlay', this.getPlayingStatus)
      this.getPlayingStatus ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    audioError () {
      console.log('audioError')
      this.readPlay = true
    },
    songTimeUpdate (e) {
      let resCurTime = 0
      let resDurTime = 0
      if (e.target.duration) {
        this.curSongDurtion = e.target.duration
        resDurTime = e.target.duration
      }
      if (e.target.currentTime) {
        resCurTime = e.target.currentTime
      }
      const currTime = this.formatDuration(resCurTime)
      const totalTime = this.formatDuration(resDurTime)
      this.currentTime = currTime
      this.songDurtion = totalTime
      this.progressPercent = Number.parseFloat((e.target.currentTime / e.target.duration).toFixed(2))
    },
    formatDuration (duration) {
      const durationNew = Math.ceil(duration)
      const minutes = moment.duration(durationNew, 'seconds').minutes()
      let seconds = moment.duration(durationNew, 'seconds').seconds()
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${minutes}:${seconds}`
    },
    changeProgress (percent) {
      const currentTime = this.curSongDurtion * percent
      console.log(percent, this.curSongDurtion, currentTime)
      this.$refs.audio.currentTime = currentTime
      if (!this.getPlayingStatus) {
        this.togglePlayStatus()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    showPlayListPop () {
      console.log('showPlayListPop')
      this.$refs.playListPop.show()
    },
    popTogglePlayStatus () {
      this.togglePlayStatus()
    },
    saveFavoriteSong () {
      const index = this.getFavoriteSongList.findIndex((item) => {
        return item.id === this.getCurrentSong.id
      })
      if (index > -1) {
        this.delFavoriteList(this.getCurrentSong)
      } else {
        this.addFavoriteList(this.getCurrentSong)
      }
    },
    ...mapActions(['addHistoryList', 'addFavoriteList', 'delFavoriteList'])
  },
  watch: {
    getCurrentSong (newSong, oldSong) {
      this.readPlay = false
      console.log('getCurrentSong 00 ', newSong, oldSong)
      if (newSong.id === oldSong.id && newSong.url === oldSong.url) return
      console.log('getCurrentSong 00 ', newSong)
      if (!newSong || !newSong.mid) {
        return
      }
      console.log('handlerLyric22', this.currentLyric)
      this.addHistoryList(newSong)
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentLineNum = 0
        this.activeLyricTxt = ''
      }
      if (!newSong.url) {
        this._getSongUrl()
      }
    },
    getPlayingStatus () {
      // this.playControl()
      console.log('getPlayingStatus', this.readPlay, this.getPlayingStatus)
      if (!this.readPlay) return
      this.getPlayingStatus ? this.$refs.audio.play() : this.$refs.audio.pause()
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .player-root

    .full-enter-active, .full-leave-active
      transition-delay: 1s
      transition: all .5s ease

      .full-top-warper, .full-buttom-warper
        transition: all .5s cubic-bezier(0.26, 0.18, 0.82, 1.32)

    .full-enter, .full-leave-to
      opacity: 0

      .full-top-warper, .full-buttom-warper
        transform: translateY(-100%)

    .min-enter-active, .min-leave-active
      transition: all .5s
      transition-delay: 2s

    .min-enter, .min-leave-to
      transform: translateY(100%)

    .icon-play
      font-size: 30px
      color: $color-theme

    .icon-favorite
      color: red

    .full-player-root
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      background-color: $color-white
      z-index: 150

      .full-bg-warpper
        position: absolute
        top: 0
        left: 0
        bottom: 0
        right: 0
        z-index: -1
        opacity: 0.7
        filter: blur(10px)

        .bg-img
          width: 100%
          height: 100%

      .full-top-warper
        position: relative

        .icon-back
          position: absolute
          top: 0
          left: 0
          line-height: 40px
          padding: 0 10px
          font-size: 18px
          transform: rotate(-90deg)
          color: $color-theme

        .title
          color: $color-theme
          font-weight: 700
          text-align: center
          line-height: 40px
          font-size: 18px

        .des
          color: $color-text-l
          text-align: center
          line-height: 30px
          font-size: 16px

      .full-middle-warper
        position: fixed
        width: 100%
        top: 0
        bottom: 0
        white-space: nowrap

        .middle-left
          position: relative
          height: 100%
          box-sizing: border-box
          display: inline-block
          vertical-align: top
          width: 100%

          .cd-warper
            position: absolute
            width: 70%
            left: 15%
            padding-top: 70%

            .cd-img-warper
              position: absolute
              left: 0
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid #eee
              border-radius: 50%
              top: 0

              .img-warper
                border-radius: 50%
                width: 100%

                &.cd-play
                  animation: rotate 20s linear infinite

                &.cd-pause
                  animation-play-state: paused

                .cd-img
                  height: 100%
                  border-radius: 50%
                  width: 100%

        .lyric-warper
          position: absolute
          width: 100%
          text-align: center
          bottom: 25%

          .des
            color: $color-theme
            font-size: 16px
            font-weight: 700
            white-space: pre-wrap

      .middle-right
        display: inline-block
        width: 100%
        background: rgba(0, 0, 0, .7)
        vertical-align: top
        height: 100%

        .lyric-full-warper
          width: 100%
          height: 100%
          box-sizing: border-box
          padding: 20px 20px 200px 20px

          .lyric-scroll
            overflow: hidden
            width: 100%
            height: 100%

          .lyric-txt
            font-size: 14px
            color: $color-white
            white-space: pre-wrap
            line-height: 25px

          .lyric-active
            color: $color-theme
            font-size: 18px
            font-weight: 700

      .full-buttom-warper
        position: absolute
        bottom: 10px
        width: 100%

        .dot-wrapper
          text-align: center

          .dot
            width: 10px
            height: 10px
            display: inline-block
            border-radius: 50%
            background: white

          .dot-left
            margin-right: 10px

          .dot-active
            width: 20px
            border-radius: 5px
            height: 10px
            background: $color-theme

        .durtion-warper
          height: 50px
          width: 100%
          position: relative
          line-height: 50px

          .cur-time
            color: $color-text
            text-align: right
            width: 30px
            float: left

          .progress-warper
            position: relative
            top: 0
            height: 100%
            overflow: hidden

            .progress-content
              padding: 0 10px
              width: 100%
              position: absolute
              box-sizing: border-box
              transform: translateY(-50%)
              top: 50%

          .total-time
            float: right
            color: $color-text
            text-align: left
            width: 30px

        .full-play-control-warper
          display: flex
          justify-content: space-around

          .icon-play
            line-height: 50px
            height: 50px

          .icon-big
            font-size: 45px

    .min-player-root
      z-index: 1001
      bottom: 0
      transition-delay: 0.5ms
      left: 0
      height: 70px
      width: 100%
      background-color: white
      border-top: 1px solid #f1f1f1
      line-height: 70px
      box-shadow: 0 0 5px 5px #eee
      position: fixed

      .info-root
        overflow: hidden
        display: flex
        padding: 10px 0 10px 10px
        flex-direction: column

        .name
          font-size: 14px
          line-height: 25px
          height: 25px
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
          color: $color-text

        .singer
          font-size: 12px
          line-height: 25px
          color: $color-text-l

      .circle-warper
        float: left
        margin-left: 20px
        margin-top: 5px
        width: 60px
        height: 60px

      .img-warper
        width: 50px
        height: 50px
        position: absolute
        top: 5px
        left: 5px
        border-radius: 50%

        &.cd-play
          animation: rotate 20s linear infinite

        &.cd-pause
          animation-play-state: paused

        .cd-img
          border-radius: 50%
          width: 50px

      .min-player-container
        display: flex
        align-items: center
        height: 100%
        width: 50%
        justify-content: space-around
        float: right

      @keyframes rotate
        0%
          transform: rotate(0)
        100%
          transform: rotate(360deg)
</style>
