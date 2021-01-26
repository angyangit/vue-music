import { mapGetters } from 'vuex'

export const playMixin = {
  computed: {
    ...mapGetters(['getPlayList'])
  },
  mounted () {
    this.handlerPlayingListUIUpdate(this.getPlayList)
  },
  activated () {
    this.handlerPlayingListUIUpdate(this.getPlayList)
  },
  method: {
    handlerPlayingListUIUpdate () {
      throw new Error('component must implement handlePlaylist method')
    }
  },
  watch: {
    getPlayList (newList) {
      this.handlerPlayingListUIUpdate(newList)
    }
  }

}
