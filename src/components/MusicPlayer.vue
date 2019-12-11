<template>
  <div class="music-player" v-show="playList.length>0">
    <div v-show="fullScreen" class="music-full">
      <div class="full-warper" :style="fullBg">
      </div>
      <div class="header">
        <p class="song-name">{{currentSong.name}}</p>
        <p class="song-singer">{{currentSong.singer}}</p>
        <i class="icon-arrow-down icon-nomal" @click="screenChange(false)"/>
      </div>
      <div class="content-warper">
        <img class="cd-img" :src="currentSong.image" alt="">
        <p class="lyc">hahaha</p>
      </div>
      <div class="ball-warper">
        <span class="nomal-ball"/>
        <span class="active-ball"/>
      </div>
      <div class="play-control">
        <div class="play-progress-warper">
        </div>
        <div class="play-btn-warper">
          <i class="icon-nomal" :class="getPlayMode"/>
          <i class="icon-nomal icon-pre-song" @click="prePlay"/>
          <i class="icon-nomal font-big" :class="getPlayState" @click="togglePlay"/>
          <i class="icon-nomal icon-next-song" @click="nextPlay"/>
          <i class="icon-nomal" :class="getFav"/>
        </div>
      </div>
    </div>
    <div v-show="!fullScreen" class="music-min" @click="screenChange(true)">
      <div class="min-warper">
        <img class="avatar" :src="currentSong.image"/>
        <div class="content">
          <p class="song-name">{{currentSong.name}}</p>
          <p class="song-singer">{{currentSong.singer}}</p>
        </div>
        <i class="icon-nomal" :class="getPlayState"/>
        <i class="icon-nomal" :class="getPlayMode"/>
      </div>
    </div>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"/>
  </div>
</template>

<script>
  import {playerMixin} from 'common/js/mixin'

  export default {
    mixins: [playerMixin],
    props: {},
    computed: {
      fullBg() {
        return `background: url(${this.currentSong.image})`
      }
    },
    data() {
      return {
        songReady: false,
        currentTime: '',
        lyricArr: {},
        lyricStr: ''
      }
    },
    methods: {
      screenChange(flag) {
        this.setFullScreen(flag)
      },
      error() {
        this.songReady = true
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      end() {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  .music-player
    .music-full
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 1000
      background-color #333
      display flex
      flex-direction column
      .full-warper
        height: 100%
        opacity: 0.6
        position absolute
        top 0
        left 0
        width 100%
        filter: blur(20px)
      .header
        position relative
        width: 100%
        height: 70px
        .song-name
          font-size 22px
          color white
          text-align center
          line-height 40px
          top 0
          font-size 800
          position absolute
          width: 100%
        .song-singer
          font-size 14px
          color white
          text-align center
          top 40px
          position absolute
          width: 100%
        .icon-nomal
          color white
          position absolute
          line-height 40px
          font-weight 800
          font-size 25px
          left 10px
      .content-warper
        z-index 10
        flex 1
        text-align center
        .cd-img
          border 10px solid #555
          border-radius 50%
          width: 70%
        .lyc
          color white
          line-height 40px
      .ball-warper
        z-index 10
        margin 10px auto
        .nomal-ball
          width: 8px
          height: 8px
          background-color white
          border-radius 4px
          display inline-block
          margin 0 5px
        .active-ball
          display inline-block
          width: 20px
          height: 8px
          background-color white
          border-radius 4px
          margin 0 5px
      .play-control
        z-index 10
        margin-bottom 30px
        .play-btn-warper
          display flex
          height: 60px
          justify-content space-around
          .icon-nomal
            margin 0 10px
            color $color-theme
            font-weight 800
            font-size 30px
            line-height 60px
          .font-big
            font-size 40px
    .music-min
      position: fixed
      left: 0
      right: 0
      bottom: 0
      z-index: 1000
      background: white
      border 1px solid #eee
      height: 60px
      width: 100%
      .min-warper
        padding 10px
        display flex
        .avatar
          width: 40px
          height: 40px
          border 1px solid #eee
          border-radius 20px
        .content
          flex 1
          display flex
          flex-direction column
          justify-content space-between
          margin-left 15px
          .song-name
            font-size 18px
            color $color-text-main
          .song-singer
            font-size 14px
            color $color-text-mid
        .icon-nomal
          line-height 40px
          margin 0 10px
          color $color-theme
          font-weight 800
          font-size 30px
</style>
