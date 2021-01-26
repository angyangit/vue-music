<template>
  <music-list-view
    :title='getTitle'
    :bgImg='getBgImg'
    :songList='songList'/>
</template>

<script>
import { getSongList } from '../api/recommend'
import { mapGetters, mapMutations } from 'vuex'
import { createSongInfoByRecommed } from '../common/js/SongInfo'
import MusicListView from '../components/MusicListView'
import { SET_LOADING } from '../store/mutation-types'

export default {
  name: 'RecommendDetail',
  components: {
    MusicListView
  },
  computed: {
    getTitle () {
      return this.getRecommendSong.dissname
    },
    getBgImg () {
      return this.getRecommendSong.imgurl
    },
    ...mapGetters([
      'getRecommendSong'
    ])
  },
  data () {
    return {
      songList: []
    }
  },
  created () {
    this._getSonglist()
  },
  methods: {
    _getSonglist () {
      console.log(this.getRecommendSong)
      if (!this.getRecommendSong.dissid) {
        this.$router.push('/recommend')
        return
      }
      this.showLoading(true)
      getSongList(this.getRecommendSong.dissid).then((res) => {
        this.songList = this._handlerSongList(res.cdlist[0].songlist.splice(0, 20))
      })
    },
    _handlerSongList (list) {
      const res = []
      list.forEach(item => {
        if (item.mid && item.mid) {
          res.push(createSongInfoByRecommed(item))
        }
      })
      return res
    },
    ...mapMutations({
      showLoading: SET_LOADING
    })

  }

}
</script>

<style scoped lang='sass'>
  .recommend-detail-root
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: #7e8c8d
    position: fixed

</style>
