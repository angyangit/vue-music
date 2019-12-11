<template>
  <div class="home-hot-detail">
    <cube-scroll>
      <div class="top" v-bind:style="bgStyle">
        <i @click="goBack" class="icon-back"></i>
        <h1 class="top-name">{{this.singer.name}}</h1>
      </div>
      <ul v-if="songArr.length>0">
        <li class="song-item" v-for="(item,index) in songArr" :key="index" @click="selectSong({id:item.mid,index})">
          <img class="song-img" :src="item.image"/>
          <div class="singer-top">
            <h1 class="song-name">{{item.name}}</h1>
            <h1 class="singer-time">{{item.album}}</h1>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getSongList} from "api/server"
  import {createSong} from "common/bean/song"

  export default {
    computed: {
      ...mapGetters([
        'singer'
      ]),
      bgStyle() {
        return `background: url(${this.singer.avatar}) no-repeat center ;background-size: cover`
      }
    },
    props: {},
    data() {
      return {
        songArr: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      ...mapActions([
        'selectPlay'
      ]),
      _getSongList() {
        if (!this.singer.id) {
          this.$router.push('/hot')
          return
        }
        getSongList(this.singer.id).then(res => {
          this.songArr = this._handlerSongs(res.singerSongList.data.songList)
        })
      },
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      _handlerSongs(list) {
        let ret = []
        list.forEach((item, index) => {
          let {songInfo} = item
          if (songInfo.mid) {
            ret.push(createSong(songInfo, index))
          }
        })
        return ret
      },
      selectSong(song) {
        this.selectPlay({
          list: this.songArr,
          index: song.index
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'common/stylus/variable'
  .home-hot-detail
    height: 100%
    width: 100%
    position fixed
    top 0
    z-index 999
    background-color white
    .top
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      .icon-back
        position absolute
        top 10px
        font-size 20px
        z-index 1000
        color white
        left 10px
      .top-name
        position absolute
        top 10px
        width: 100%
        font-size 18px
        font-weight 800
        color white
        text-align center
    .song-item
      padding 10px
      display flex
      border-bottom 1px solid #f1f1f1
      .song-img
        width: 50px
        height: 50px
      .singer-top
        display flex
        flex-direction column
        margin-left 20px
        justify-content space-between
        .song-name
          font-size 20px
          font-weight 800
          color $color-text
        .singer-time
          font-size 16px
          color $color-text-mid
</style>
