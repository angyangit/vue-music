<template>
  <div class='rank-view-root'>
    <scroll-view
      class='rank-scroll'
      :reqData='rankList'>
      <ul class='rank-warper'>
        <li
          class='rank-item'
          v-for='rank in rankList'
          :key='rank.id'
          @click='selectRank(rank)'>
          <div class='img-warper'>
            <img
              class='rank-img'
              :src='rank.picUrl'>
          </div>
          <ul class='song-warper'>
            <li
              class='song-item'
              v-for='(song,index) in rank.songList'
              :key='index'>
              {{getSongTitle(song,index)}}
            </li>
          </ul>
        </li>
      </ul>
    </scroll-view>
    <transition
      name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getTopList } from '../api/rank'
import { ERR_OK } from '../api/config'
import ScrollView from '../components/ScrollView'
import { mapMutations } from 'vuex'
import { SET_RANK } from '../store/mutation-types'
// id: 26
// listenCount: 19700000
// picUrl: "http://y.gtimg.cn/music/photo_new/T003R300x300M000004GRRGd1UoRsL.jpg"
// songList: Array(3)
// topTitle: "巅峰榜·热歌"
// type: 0
export default {
  name: 'Rank',
  components: {
    ScrollView
  },
  computed: {},
  data () {
    return {
      rankList: []
    }
  },
  created () {
    this._getTopList()
  },
  methods: {
    getSongTitle (song, index) {
      return index + ' ' + song.songname
    },
    _getTopList () {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.rankList = res.data.topList
          console.log('rankList', this.rankList)
        }
      })
    },
    selectRank (rank) {
      console.log(rank)
      this.$router.push(`/rank/${rank.id}`)
      this.setRank(rank)
    },
    ...mapMutations({
      setRank: SET_RANK
    })
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .rank-view-root
    top: 95px
    left: 0
    right: 0
    bottom: 0
    position: fixed

    .rank-scroll
      position: absolute
      top: 0
      height: 100%
      bottom: 0
      overflow: hidden
      width: 100%

      .rank-warper
        padding: 0 10px

        .rank-item
          padding-bottom: 10px
          padding-top: 10px
          border-radius: 4px
          width: 100%

          .img-warper
            width: 130px
            height: 130px
            float: left
            box-shadow: 0px 4px 6px 4px rgba(0, 0, 0, 0.6)
            border-radius: 6px

            .rank-img
              border-radius: 6px
              width: 100%
              height: 100%

          .song-warper
            height: 120px
            vertical-align: middle
            margin-top: 5px
            background-color: $color-white

            .song-item
              font-size: 16px
              white-space: nowrap
              text-overflow: ellipsis
              overflow: hidden
              color: $color-text-l
              padding-left: 10px
              line-height: 30px
</style>
