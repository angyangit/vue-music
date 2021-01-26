<template>
  <transition name="fade">
    <section class='play-list-pop' v-show='showPlayListPop' @click='dismis'>
      <transition name="slide">
        <section
          v-show='showPlayListPop'
          class='play-list-pop-warper' @click.stop>
          <section class='play-list-pop-head'>
            <i class="icon icon-mode" :class="iconMode"
               @click.stop='toggleMode'></i>
            <span class='mode-name'>{{getPlayModeName}}</span>
            <span class="clear" @click="showHistoryClearDialog">
          <i class="icon icon-clear"></i>
        </span>
          </section>
          <scroll-view
            ref='scrollViewPop'
            :reqData='getPlaySequenceList'
            class='play-list-content'>
            <section class='song-warper'>
              <transition-group name="list" tag="ul">
                <li
                  ref='listItem'
                  class='play-list-content-item'
                  v-for='(item,index) in getPlaySequenceList'
                  :key='item.id'
                  @click.stop='selectItem(item,index)'>
                 <span class='play-status'>
                   <i class='icon-play'
                      v-show='showStatus(item,index)'
                      @click.stop='togglePlayStatus'
                      :class='getPlayStatusIcon'></i></span>
                  <span class='song-name'> {{item.name}}</span>
                  <span class='song-delete' @click.stop='deleteItem(item)'>
                     <i class='icon-delete'></i>
                  </span>
                  <span class='song-favorite'
                        @click='saveFavoriteSong(item)'>
                      <i class='icon-fav'
                         :class='getFavActive(item)'></i>
                  </span>
                </li>
              </transition-group>
              <section class='add-song-warper' @click='openAddSongPop'>
                <span class='btn-add-song'>+ 添加歌曲到队列</span>
              </section>
            </section>
          </scroll-view>
          <h1 class='dismiss-pop'
              @click='dismis'>关闭
          </h1>
        </section>
      </transition>
      <confirm-dialog
        title='播放列表'
        content='是否清空播放列表数据'
        :showDialog='isShowHistoryClearDialog'
        @dialogCancel='dialogCancel'
        @dialogConfirm='dialogConfirm'
      />
      <add-song-list-view ref='addSongPop'/>
    </section>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from '../common/js/config'
import ScrollView from './ScrollView'
import ConfirmDialog from '../components/ConfirmDialog'
import { SET_CURRENTINDEX, SET_PLAYING_MODE, SET_PLAYING_STATUS, SET_PLAYLIST } from '../store/mutation-types'
import { shuffle } from '../common/js/util'
import AddSongListView from '../views/AddSongListView'

export default {
  name: 'PlayListPop',
  data () {
    return {
      showPlayListPop: false,
      isShowHistoryClearDialog: false
    }
  },
  components: {
    ScrollView,
    ConfirmDialog,
    AddSongListView
  },
  computed: {
    iconMode () {
      return this.getPlayingMode === playMode.sequence ? 'icon-sequence' : this.getPlayingMode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    getPlayStatusIcon () {
      return this.getPlayingStatus ? ' icon-pause' : ' icon-playing'
    },
    getPlayModeName () {
      return this.getPlayingMode === playMode.sequence ? '顺序播放' : this.getPlayingMode === playMode.loop ? '循环播放' : '随机播放'
    },
    ...mapGetters([
      'getPlayingMode',
      'getPlaySequenceList',
      'getPlayingStatus',
      'getCurrentSong',
      'getPlayList',
      'getFavoriteSongList'
    ])
  },
  methods: {
    getFavActive (song) {
      const index = this.getFavoriteSongList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1 ? 'icon-favorite' : 'icon-not-favorite'
    },
    openAddSongPop () {
      this.$refs.addSongPop.show()
    },
    show () {
      this.showPlayListPop = true
      this.$refs.scrollViewPop.refresh()
      setTimeout(() => {
        this.scrollCurrentSong(this.getCurrentSong)
      }, 20)
    },
    dismis () {
      this.showPlayListPop = false
    },
    showHistoryClearDialog () {
      this.isShowHistoryClearDialog = true
    },
    dialogCancel () {
      this.isShowHistoryClearDialog = false
    },
    dialogConfirm () {
      this.isShowHistoryClearDialog = false
      this.showPlayListPop = false
      this.deleteSongList()
    },
    showStatus (item) {
      return this.getCurrentSong.id === item.id
    },
    selectItem (item, index) {
      if (this.getPlayingMode === playMode.random) {
        index = this.getPlayList.findIndex((song) => {
          return item.id === song.id
        })
        console.log('selectItem', index)
      }
      console.log('selectItem11', index)
      this.setCurentIndex(index)
      this.setPlayStatus(true)
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
      this.setCurentIndex(index)
    },
    togglePlayStatus () {
      this.$emit('popTogglePlayStatus')
    },
    scrollCurrentSong (song) {
      if (!this.showPlayListPop) return
      const index = this.getPlaySequenceList.findIndex((item) => {
        return item.id === song.id
      })
      console.log('scrollCurrentSong', this.$refs.listItem[index])
      this.$refs.listItem[index] && this.$refs.scrollViewPop.scrollToElement(this.$refs.listItem[index], 300)
    },
    deleteItem (song) {
      this.deleteSong(song)
    },
    ...mapMutations({
      setCurentIndex: SET_CURRENTINDEX,
      setPlayMode: SET_PLAYING_MODE,
      setPlaySongList: SET_PLAYLIST,
      setPlayStatus: SET_PLAYING_STATUS
    }),
    saveFavoriteSong (song) {
      const index = this.getFavoriteSongList.findIndex((item) => {
        return item.id === song.id
      })
      if (index > -1) {
        this.delFavoriteList(song)
      } else {
        this.addFavoriteList(song)
      }
      this.getFavActive(song)
    },
    ...mapActions([
      'deleteSong',
      'deleteSongList',
      'delFavoriteList',
      'addFavoriteList'])
  },
  watch: {
    getCurrentSong (newSong, oldSong) {
      if (!newSong.id || newSong.id === oldSong.id) return
      this.scrollCurrentSong(newSong)
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .play-list-pop
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1002
    background-color: rgba(0, 0, 0, .4)
    width: 100%
    position: fixed

    .play-list-pop-warper
      left: 0
      bottom: 0
      width: 100%
      box-sizing: border-box
      background: #eee
      position: absolute

      .play-list-pop-head
        padding: 0 10px
        vertical-align: middle
        line-height: 40px
        border-bottom: 1px solid #ddd
        font-size: 16px

        .icon-mode
          line-height: 40px

        .mode-name
          vertical-align: top
          margin-left: 10px
          display: inline-block

        .icon
          font-size: 18px

        .clear
          line-height: 40px
          float: right

      .play-list-content
        overflow: hidden
        padding: 0 10px
        max-height: 50vh

        .play-list-content-item
          line-height: 35px
          height: 35px
          border-bottom: 0.5px solid #e3e3e3
          width: 100%
          overflow: hidden

          &.list-enter-active, &.list-leave-active
            transition: all 0.2s

          &.list-enter, &.list-leave-to
            opacity: 0
            height: 0

          .play-status
            display: inline-block
            color: $color-theme
            width: 20px
            height: 100%
            vertical-align: top
            line-height: 35px

            .icon-play
              line-height: 35px

          .song-name
            display: inline-block
            height: 35px
            line-height: 35px
            white-space: nowrap
            color: $color-text-l
            text-overflow: ellipsis
            overflow: hidden
            font-size: 14px

          .song-favorite
            float: right
            display: inline-block
            color: $color-theme
            margin-right: 20px
            line-height: 35px

          .song-delete
            float: right
            display: inline-block
            line-height: 35px

            .icon-delete
              color: $color-theme
              font-size: 12px

      .add-song-warper
        height: 40px
        position: relative

        .btn-add-song
          position: absolute
          left: 50%
          top: 50%
          transform: translate3d(-50%, -50%, 0)
          height: 25px
          margin: 0 auto
          line-height: 25px
          color: $color-theme
          text-align: center
          display: inline-block
          padding: 0 10px
          font-size: 10px
          border-radius: 12px
          border: 1px solid $color-theme

      .dismiss-pop
        height: 40px
        line-height: 40px
        border-top: 1px solid #e3e3e3
        text-align: center
        color: $color-text
        font-size: 16px
        width: 100%

  .fade-enter-active, .fade-leave-active
    transition: all .3s ease

  .fade-enter, .fade-leave-to
    opacity: 0

  .slide-enter-active, .slide-leave-active
    transition: all .3s ease

  .slide-enter, .slide-leave-to
    transform: translateY(100%)

  .icon-favorite
    color: red
</style>
