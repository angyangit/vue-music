<template>
  <section class='music-list-root'>
    <top-bar :title='title' :bgTransOpacity='bgTransOpacity'/>
    <section
      class='bgimg-warper'
      :style='setBgImg'
      ref='bgImg'>
      <section class="filter" ref="filter"/>
    </section>
    <section class='bg-scroll-warper' ref='bgScrollWarper'/>
    <scroll-view
      class='song-scroll-warper'
      ref='songScrollView'
      :reqData='songList'
      :scrollListener='true'
      :probeType='3'
      @scrollListener='scrollListener'>
      <song-list
        :songList='songList'
        @songSelect='songSelect'
        :rank='rank'
      />
    </scroll-view>
  </section>
</template>

<script>
import TopBar from '../components/TopBar'
import SongList from './SongList'
import ScrollView from './ScrollView'
import { prefixStyle } from '../common/js/dom'
import { mapActions } from 'vuex'
import { playMixin } from '../common/js/mixin'

const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

const RESERVED_HEIGHT = 40

export default {
  name: 'MusicListView',
  mixins: [playMixin],
  components: {
    TopBar,
    SongList,
    ScrollView
  },
  data () {
    return {
      bgTransOpacity: 0
    }
  },
  props: {
    bgImg: {
      type: String,
      default: ''
    },
    songList: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setBgImg () {
      return `background-image: url(${this.bgImg})`
    }
  },
  mounted () {
    this.imageHeight = this.$refs.bgImg.clientHeight
    this.minTransHeight = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.songScrollView.$el.style.top = `${this.$refs.bgImg.clientHeight}px`
    this.$refs.songScrollView.refresh()
  },
  methods: {
    handlerPlayingListUIUpdate (playList) {
      const bottom = playList.length > 0 ? 70 : 0
      this.$refs.songScrollView.$el.style.bottom = `${bottom}px`
    },
    scrollListener (pos) {
      const scollY = pos.y
      const realTranslateY = Math.max(this.minTransHeight, scollY)

      let zIndex = 0
      let scale = 0
      let blur = 0
      const percent = Math.abs(scollY / this.imageHeight)

      if (scollY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
        scale = 1
        this.bgTransOpacity = Math.abs(scollY / this.imageHeight)
        if (this.bgTransOpacity >= 1 || Math.abs(scollY) > Math.abs(this.imageHeight) - RESERVED_HEIGHT) {
          this.bgTransOpacity = 1
        }
      }
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      this.$refs.bgScrollWarper.style[transform] = `translate3d(0,${realTranslateY}px,0)`
      if (scollY < this.minTransHeight) {
        this.$refs.bgImg.style.paddingTop = 0
        this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`
      } else {
        this.$refs.bgImg.style.paddingTop = '70%'
        this.$refs.bgImg.style.height = 0
      }
      this.$refs.bgImg.style[transform] = `scale(${scale})`
      this.$refs.bgImg.style.zIndex = zIndex
    },
    songSelect (song, index) {
      console.log('songSelect', this.songList)
      this.selectPlayAction({
        list: this.songList,
        index: index
      })
    },
    ...mapActions([
      'selectPlayAction'
    ])
  }
}
</script>

<style scoped lang='sass'>
  @import "../common/style/variable"
  .music-list-root
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1001
    background-color: #F0F0F0

    .bgimg-warper
      width: 100%
      height: 0
      padding-top: 70%
      position: relative
      transform-origin: top
      background-size: cover

      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        backdrop-filter: blur(10)
        height: 100%
        background: rgba(7, 17, 27, 0.4)

    .bg-scroll-warper
      position: relative
      width: 100%
      height: 100%
      top: 0

    .song-scroll-warper
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      z-index: 10
      width: 100%
</style>
