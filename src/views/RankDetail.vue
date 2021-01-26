<template>
  <music-list-view
    :title='getTitle'
    :bgImg='getBgImg'
    :songList='songList'
    :rank='true'/>
</template>

<script>
import { getMusicList } from '../api/rank'
import { mapGetters } from 'vuex'
import { createSongInfo } from '../common/js/SongInfo'
import MusicListView from '../components/MusicListView'
import { ERR_OK } from '../api/config'

export default {
  name: 'RankDetail',
  components: {
    MusicListView
  },
  computed: {
    getTitle () {
      return this.getRank.topTitle
    },
    getBgImg () {
      return this.getRank.picUrl
    },
    ...mapGetters([
      'getRank'
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
      console.log(this.getRank)
      if (!this.getRank.id) {
        this.$router.push('/recommend')
        return
      }
      getMusicList(this.getRank.id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.songList = this._handlerSongList(res.songlist)
        }
      })
    },
    _handlerSongList (list) {
      const res = []
      list.forEach(item => {
        const info = item.data
        if (info.songmid && info.songid) {
          res.push(createSongInfo(info))
        }
      })
      return res
    }
  }

}
</script>

<style scoped lang='sass'>

</style>
