<template>
  <section class='mine-root' @click.stop>
    <div class='header'>
      <span @click.stop='back' class='back'><i class='icon-back'></i></span>
      <section class='tab-warper'>
         <span class='item-tab'
               :class='{"tab-active":isFav}'
               @click='favClick'>我喜欢的</span>
        <span class='item-tab'
              :class='{"tab-active":!isFav}'
              @click='nearPlayClick'>最近播放</span>
      </section>
      <section class='list-warper'>
        <fav-song-list
          ref='favSongListView'
          @favSongSelect='favSongSelect'
          v-show='isFav'/>
        <history-song-list
          @historySongSelect='historySongSelect'
          ref='historySongListView'
          v-show='!isFav'/>
      </section>
    </div>
    <top-tip ref='topTip' @click='topTipClick'>
      <div class='top-tip-warper'>
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放列表</span>
        </div>
      </div>
    </top-tip>
  </section>
</template>

<script>
import HistorySongList from '../components/HistorySongList'
import { mapActions } from 'vuex'
import TopTip from '../components/TopTip'
import FavSongList from '../components/FavSongList'

export default {
  name: 'Mine',
  components: {
    HistorySongList,
    TopTip,
    FavSongList
  },
  data () {
    return {
      isFav: true
    }
  },
  mounted () {
    this.$refs.favSongListView.show()
  },
  methods: {
    back () {
      this.$router.back()
    },
    favClick () {
      this.isFav = true
      this.$refs.favSongListView.show()
    },
    nearPlayClick () {
      this.isFav = false
      this.$refs.historySongListView.show()
    },
    historySongSelect (song) {
      this.insertSong(song)
      this.$refs.topTip.show()
    },
    favSongSelect (song) {
      this.insertSong(song)
      this.$refs.topTip.show()
    },
    topTipClick () {
      this.$refs.topTip.hide()
    },
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .mine-root
    position: fixed
    top: 0
    bottom: 0
    z-index: 1004
    background-color: white
    z-index: 100
    width: 100%

    .header
      margin-top: 10px
      line-height: 30px

      .back
        font-size: 16px
        margin-left: 10px
        color: $color-theme
        float: left

      .tab-warper
        margin: 0 auto
        height: 30px
        width: 160px
        display: flex
        line-height: 30px

        .item-tab
          flex-grow: 1
          text-align: center
          display: inline-block
          font-size: 14px
          border: 1px solid #ccc
          color: $color-text

          &:first-child
            border-right: 0
            border-radius: 5px 0 0 5px

          &:last-child
            border-left: 0
            border-radius: 0 5px 5px 0

        .tab-active
          color: white
          border: 1px solid $color-theme
          font-weight: 700
          background-color: $color-theme

    .list-warper
      top: 40px
      left: 0
      right: 0
      bottom: 0
      position: absolute

    .top-tip-warper
      line-height: 40px
      height: 40px
      width: 100%
      background-color: rgba(200, 200, 200, 1)

      .tip-title
        display: inline-block
        position: absolute
        left: 50%
        height: 100%
        overflow: hidden
        transform: translateX(-50%)
        font-size: 14px

        .icon-ok
          color: $color-theme

        .text
          text-align: center
          padding-left: 10px
          color: $color-theme

</style>
