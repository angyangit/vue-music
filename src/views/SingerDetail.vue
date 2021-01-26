<template>
  <!--  <transition name="slide" mode='out-in'>-->
  <music-list-view
    :title='getTitle'
    :bgImg='getBgImg'
    :songList='songList'/>
  <!--  </transition>-->
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../api/singer'
import { ERR_OK } from '../api/config'
import { createSongInfo } from '../common/js/SongInfo'
import MusicListView from '../components/MusicListView'

export default {
  name: 'SingerDetail',
  components: { MusicListView },
  data () {
    return {
      songList: []
    }
  },
  computed: {
    getTitle () {
      return this.getSinger.name
    },
    getBgImg () {
      return this.getSinger.avatar
    },
    ...mapGetters([
      'getSinger'
    ])

  },
  created () {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail () {
      if (!this.getSinger.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.getSinger.id).then(res => {
        console.log('getSingerDetail', res)
        if (res.code === ERR_OK) {
          this.songList = this._handlerSongList(res.data.list)
        }
      })
    },
    _handlerSongList (list) {
      const res = []
      list.forEach(item => {
        const { musicData } = item
        if (musicData.songid && musicData.songmid) {
          res.push(createSongInfo(musicData))
        }
      })
      return res
    }
  }
}
</script>

<style scoped lang='sass'>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

    .slide-enter, .slide-leave-to
      transform: translate3d(100%, 0, 0)
</style>
