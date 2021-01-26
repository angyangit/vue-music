<template>
  <scroll-view
    @click.stop
    class='song-scroll-warper'
    ref='historySongScrollView'
    :reqData='getHistorySongList'>
    <div>
      <song-list
        :songList='getHistorySongList'
        @songSelect='songSelect'
      />
      <no-result-view v-show='!getHistorySongList||!getHistorySongList.length'/>
    </div>
  </scroll-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SongList from './SongList'
import ScrollView from './ScrollView'
import SongInfo from '../common/js/SongInfo'
import NoResultView from '../components/NoResultView'

export default {
  name: 'HistorySongList',
  components: {
    SongList,
    ScrollView,
    NoResultView
  },
  computed: {
    ...mapGetters(['getHistorySongList'])
  },
  methods: {
    songSelect (song, index) {
      this.insertSong(new SongInfo(song))
      this.$emit('historySongSelect', song)
    },
    show () {
      setTimeout(() => {
        this.$refs.historySongScrollView.refresh()
      }, 20)
    },
    ...mapActions([
      'insertSong'
    ])
  }

}
</script>

<style scoped lang='sass'>
  .song-scroll-warper
    overflow: hidden
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

</style>
